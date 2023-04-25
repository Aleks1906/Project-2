<template>
    <div class="view-main-content">
      <h1 class="view-main-content-heading">Fragen erstellen</h1>
      <form>
        <div>
          <input id="fragestellung" type="text" v-model="frageFragestellung" required placeholder="Frage" class="view-main-content-textfield">
        </div>
        
        <div>
          <input id="antworten" type="text" v-model="frageAntwortoptionen" required placeholder="Antwortoptionen - Optionen mit Semikolon trennen" class="view-main-content-textfield">
        </div>
        <button @click="addFrage()" :disabled="addingFrage" class="view-main-content-advanceBtn">Frage hinzufügen</button>
      </form>
      <RouterLink to="/umfrageWurdeErstellt" @click="sessionReset()">
        Fertig
      </RouterLink>
  </div>
</template>

<style scoped>
  .view-main-content form {
    display: flex;
    flex-direction: column;
    width: 35vw;
  }

  .view-main-content form input {
    width: 100%;
  }
  .view-main-content .view-main-content-advanceBtn {
    width: 15vw;
  }
</style>

<script setup>
  import { ref } from 'vue'
  import { doc, addDoc, collection} from 'firebase/firestore';
  import { db } from '@/firebase'
  const umfragenCollectionRef = collection(db, 'AlleUmfragen', sessionStorage.getItem('EMailAdmin'), 'Umfragen')
  const frageFragestellung = ref('')
  const frageAntwortoptionen = ref('')
  const addingFrage = ref(false)

  const addFrage = async () => {
    /*
    Frage erstellen und in Firebase Collection eintragen
    Die Fragestellung und Antwortoptionen entsprechen den Eingaben in den Input Feldern
    */
    addingFrage.value = true
    try {
      console.log("")
      const umfrageDocRef = doc(umfragenCollectionRef, sessionStorage.getItem('umfragenName'))
      const fragenCollectionRef = collection(umfrageDocRef, 'Fragen')
      console.log("FragenCollectionRef: " + fragenCollectionRef)

      //Antwortoptionen werden in diesem Format angegeben: Ja;Nein -> Daher ist hier ein split bei ; nötig
      const optionsArray = frageAntwortoptionen.value.split(';').map(option => option.trim());
      await addDoc(fragenCollectionRef, {
        question: frageFragestellung.value,
        options: optionsArray,
        selected: []
      })
    } catch (error) {
      console.error(error)
    } finally {
      addingFrage.value = false
    }
    frageFragestellung.value = ''
    frageAntwortoptionen.value = ''
  }

    const sessionReset = () => {
        sessionStorage.removeItem('umfragenName')
    }
    
</script>