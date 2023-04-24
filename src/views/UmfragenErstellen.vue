<template>
    <div>
      <h1>Umfrage erstellen</h1>
      <form>
        <div>
          <label for="umfrage-name">Name der Umfrage:</label>
          <input type="text" id="umfrage-name" v-model="umfrageName" required>
        </div>
        <br>
        <button @click="this.$router.push('/fragenErstellen'), addUmfrage()">Fragen erstellen</button>
        <button @click="this.$router.push('/erstelleUmfrageAusTemplate'), addUmfrage()">Erstelle aus einem Template</button>
      </form>
    </div>
  </template>
  
  <script setup>

  import { ref, computed, onMounted, resolveDirective } from 'vue'
  import { doc, addDoc, collection, setDoc} from 'firebase/firestore';
  import { db } from '@/firebase'
  const umfrageName = ref('')
  const umfragenCollectionRef = collection(db, 'AlleUmfragen', sessionStorage.getItem('EMailAdmin'), 'Umfragen')


  const addUmfrage = async () => {
        // create a new document with ID "Test3" in the "Umfragen" collection
        const umfrageDocRef = doc(umfragenCollectionRef, umfrageName.value)
        await setDoc(umfrageDocRef, {})
        sessionStorage.setItem('umfragenName', umfrageName.value)
        console.log(sessionStorage.getItem('umfragenName'))
        /*
        const fragenCollectionRef = collection(umfrageDocRef, 'Fragen')
        await addDoc(fragenCollectionRef, {})
        */
    }

  </script>
  