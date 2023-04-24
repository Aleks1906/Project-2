<template>
    <div class="view-main-content">
      <h1 class="view-main-content-heading">Fragen erstellen</h1>
      <form>
        <div>
          <input id="fragestellung" type="text" v-model="frageFragestellung" required placeholder="Frage" class="view-main-content-textfield">
        </div>
        
        <div>
          <input id="antworten" type="text" v-model="frageAntwortoptionen" required placeholder="Antwortoptionen" class="view-main-content-textfield">
        </div>
        <button @click="addFrage()" :disabled="addingFrage" class="view-main-content-advanceBtn">Frage hinzufügen</button>
      </form>

      <button  @click="this.$router.push('/umfrageWurdeErstellt'), sessionReset()" class="view-main-content-advanceBtn">Fertig (SessionStorage löschen!)</button>
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
  import { ref, computed, onMounted, resolveDirective } from 'vue'
  import { doc, addDoc, collection, setDoc} from 'firebase/firestore';
  import { db } from '@/firebase'
  const umfragenCollectionRef = collection(db, 'AlleUmfragen', sessionStorage.getItem('EMailAdmin'), 'Umfragen')
  const frageFragestellung = ref('')
  const frageAntwortoptionen = ref('')
  const addingFrage = ref(false)

  const addFrage = async () => {
    addingFrage.value = true
    try {
      console.log("")
      const umfrageDocRef = doc(umfragenCollectionRef, sessionStorage.getItem('umfragenName'))
      const fragenCollectionRef = collection(umfrageDocRef, 'Fragen')
      console.log("FragenCollectionRef: " + fragenCollectionRef)
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
/*
  const addFrage = async () => {
    const selected = []
    console.log("")
    const umfrageDocRef = doc(umfragenCollectionRef, sessionStorage.getItem('umfragenName'))
        const fragenCollectionRef = collection(umfrageDocRef, 'Fragen')
        console.log("FragenCollectionRef: " + fragenCollectionRef)
        await addDoc(fragenCollectionRef, {
           question: frageFragestellung.value,
           options: frageAntwortoptionen.value,
           selected: selected
        })
    }
*/
    const sessionReset = () => {
        sessionStorage.removeItem('umfragenName')
    }
    
</script>