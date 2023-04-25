<template>
  <div class="view-main-content">
    <h1 class="view-main-content-heading">Übersicht aller Templates</h1>

    <div id="template-container">

      <div v-for="(template, index) in templates" :key="index" id="template" class="textbox">
          <h2 class="view-main-content-heading">{{ template }} </h2> 
          <p>Dieses Template enthält folgende Fragen: </p>
        <div v-for="(frage) in fragen[index]" >
          <p>
              {{ frage}}
          </p>
        </div>
        <RouterLink to="/umfrageWurdeErstellt" @click="createFrageInFirebase(template)">
          Template auswählen
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.view-main-content {
  padding-left: 0;
  margin: 0 10%;
  width: 80%;
}
#template-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

#template-container #template {
  width: 45%;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  min-height: 50vh;
}

#template > * {
  margin-left: 2.5rem;
}

#template h2 {
  padding-top: 2rem;
}


#template-container #template > p {
  margin-bottom: 1.5rem;
}

#template-container #template > div p {
  margin-bottom: .5rem;
}

#template-container #template button {
  margin-top: 1.5em;
  width: 30%;
  align-self: ends;
}

</style>
  
<script setup>
    import { ref, onMounted } from 'vue'
    import {collection, onSnapshot, addDoc, getDocs} from 'firebase/firestore';
    import { db } from '@/firebase'
 
    const templateCollectionRef = collection(db,'Templates')

    const templates = ref([])
    const fragen = ref([])
    const hilfeTemplates = ref([])

    onMounted(() => {
    //Templates und die entsprechenden Fragen aus Firebase laden 
    onSnapshot(templateCollectionRef, (querySnapshot) => {
      const helperTemplates = []
      querySnapshot.forEach((doc) => {
        helperTemplates.push(doc.id)
      })
      templates.value = helperTemplates

      templates.value.forEach((template, index) => {
        const fragenInTemplateRef = collection(db, 'Templates', template, 'Fragen')
        onSnapshot(fragenInTemplateRef, (querySnapshot) => {
          const questions = []
          const helper = []
          querySnapshot.forEach((doc) => {
            questions.push(doc.data().question)
            console.log(doc.data().question)
          })
          hilfeTemplates.value[index] = helper
          fragen.value[index] = questions
          console.log(fragen.value)
        })
      }) 
    })
  })

    const createFrageInFirebase = async (template) => {
      /*
      Diese Methode kopiert Daten aus der entsprechenden Template Collection und 
      fügt sie in die Fragen-Collection der erstellten Umfrage ein
      */
        sessionStorage.setItem('ausgewähltesTemplate', template);
        const ausgewähltesTemplate = sessionStorage.getItem('ausgewähltesTemplate')
        const umfragenName = sessionStorage.getItem('umfragenName')
        const EMailAdmin = sessionStorage.getItem('EMailAdmin')

        const zielRef = collection(db,'AlleUmfragen', EMailAdmin, 'Umfragen', umfragenName, 'Fragen')
        const quellenRef = collection(db, 'Templates', ausgewähltesTemplate, 'Fragen')

        const querySnapshot = await getDocs(quellenRef)
        querySnapshot.forEach((doc) => {
        //Neues Dokument in der Ziel-Collection mit den gleichen Daten
         addDoc(zielRef, doc.data());
        });
    }
</script>