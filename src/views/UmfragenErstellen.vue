<template>
    <div class="view-main-content">
      <h1 class="view-main-content-heading">Umfrage erstellen</h1>
      <form>
        <div>
          <input type="text" id="umfrage-name" v-model="umfrageName" required placeholder="Gib der Umfrage einen Namen" class="view-main-content-textfield">
        </div>
        <br>
        <RouterLink to="/fragenErstellen" @click="addUmfrage()">
          Fragen erstellen
        </RouterLink>
        
        <RouterLink to="/erstelleUmfrageAusTemplate" @click="addUmfrage()">
          Erstelle aus einem Template
        </RouterLink>
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

  import { ref } from 'vue'
  import { doc, collection, setDoc} from 'firebase/firestore';
  import { db } from '@/firebase'
  const umfrageName = ref('')
  const umfragenCollectionRef = collection(db, 'AlleUmfragen', sessionStorage.getItem('EMailAdmin'), 'Umfragen')


  const addUmfrage = async () => {
        /*
        neues (Umfragen-) Dokument in der entsprechenden Collection erstellen
        Name des Dokumentes = Eingabe in dem Input-Feld 
        */
        const umfrageDocRef = doc(umfragenCollectionRef, umfrageName.value)
        await setDoc(umfrageDocRef, {})
        sessionStorage.setItem('umfragenName', umfrageName.value)
        console.log(sessionStorage.getItem('umfragenName'))
    }

  </script>
  