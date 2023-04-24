<template>
    <h1>Übersicht aller Templates</h1>
    <div v-for="(template, index) in templates" :key="index">
        <h2>{{ template }} </h2> 
        <p>Dieses Template enthält folgende Fragen: </p>
      <div v-for="(frage) in fragen[index]" >
        <p>
            {{ frage}}
         </p>
      </div>
      <button @click="createFrageInFirebase(template), this.$router.push('/umfrageWurdeErstellt')">
          Dieses Template auswählen
        </button>
        <br>
        ---------------------------------------------------------------------
    </div>
</template>
  
<script setup>
    import { ref, computed, onMounted, resolveDirective } from 'vue'
    import {collection, onSnapshot, doc, addDoc, updateDoc, FieldValue, arrayUnion, getFirestore, getDocs} from 'firebase/firestore';
    import { db } from '@/firebase'
 
    const templateCollectionRef = collection(db,'Templates')

    const templates = ref([])
    const fragen = ref([])
    const hilfeTemplates = ref([])

    onMounted(() => {
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
        sessionStorage.setItem('ausgewähltesTemplate', template);
        const ausgewähltesTemplate = sessionStorage.getItem('ausgewähltesTemplate')
        const umfragenName = sessionStorage.getItem('umfragenName')
        const EMailAdmin = sessionStorage.getItem('EMailAdmin')

        const zielRef = collection(db,'AlleUmfragen', EMailAdmin, 'Umfragen', umfragenName, 'Fragen')
        const quellenRef = collection(db, 'Templates', ausgewähltesTemplate, 'Fragen')

        const querySnapshot = await getDocs(quellenRef)
        querySnapshot.forEach((doc) => {
        // create new document in destination collection with same data
         addDoc(zielRef, doc.data());
        });
    }
</script>