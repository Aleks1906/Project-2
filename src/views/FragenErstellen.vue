<template>
      <div>
    <h1>Fragen erstellen</h1>
    <form>
      <div>
        <label for="fragestellung">Fragestellung:</label>
        <input id="fragestellung" type="text" v-model="frageFragestellung" required>
      </div>
      <br>
      <div>
        <label for="antworten">Antwortoptionen:</label>
        <input id="antworten" type="text" v-model="frageAntwortoptionen" required>
      </div>
      <br>
      <button @click="addFrage()" :disabled="addingFrage">Frage hinzufügen</button>
    </form>

    <button  @click="this.$router.push('/umfrageWurdeErstellt'), sessionReset()">Fertig (SessionStorage löschen!)</button>
  </div>
</template>

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