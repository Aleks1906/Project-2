<template>
      <div>
    <h1>Fragen erstellen</h1>
    <form>
      <div>
        <label>Fragestellung:</label>
        <input type="text" v-model="frageFragestellung">
      </div>
      <br>
      <div>
        <label>Antwortoptionen:</label>
        <input type="text" v-model="frageAntwortoptionen">
      </div>
      <br>
      <button @click="addFrage()">Frage hinzufügen</button>
    </form>

    <button  @click="this.$router.push('/'), sessionReset()">Fertig (SessionStorage löschen!)</button>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, resolveDirective } from 'vue'
  import { doc, addDoc, collection, setDoc} from 'firebase/firestore';
  import { db } from '@/firebase'
  const umfragenCollectionRef = collection(db, 'AlleUmfragen', sessionStorage.getItem('EMailAdmin'), 'Umfragen')

  const addFrage = async () => {
    console.log("")
    const umfrageDocRef = doc(umfragenCollectionRef, sessionStorage.getItem('umfragenName'))
        const fragenCollectionRef = collection(umfrageDocRef, 'Fragen')
        console.log("FragenCollectionRef: " + fragenCollectionRef)
        await addDoc(fragenCollectionRef, {
            question: frageFragestellung.value,
            options: frageAntwortoptionen.value
        })
    }

    const sessionReset = () => {
        sessionStorage.removeItem('umfragenName')
    }
</script>