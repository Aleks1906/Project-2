<template>
    <div class="view-main-content">
      <h1 class="view-main-content-heading">Umfrage erstellen</h1>
      <form>
        <div>
          <input type="text" id="umfrage-name" v-model="umfrageName" required placeholder="Gib der Umfrage einen Namen" class="view-main-content-textfield">
        </div>
        <br>
        <button @click="this.$router.push('/fragenErstellen'), addUmfrage()" class="view-main-content-advanceBtn">Fragen erstellen</button>
        <button @click="this.$router.push('/erstelleUmfrageAusTemplate'), addUmfrage()" class="view-main-content-advanceBtn">Erstelle aus einem Template</button>
      </form>
    </div>
  </template>

  <style scoped>
    input {
      min-width: 15vw;
      margin-top: 1.5rem;
    }

    button:first-of-type {
      margin-right: 2rem;
    }
  </style>
  
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
  