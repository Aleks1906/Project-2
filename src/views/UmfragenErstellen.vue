<template>
    <div class="view-main-content">
      <h1 class="view-main-content-heading">Umfrage erstellen</h1>
      <form>
        <div>
          <input type="text" id="umfrage-name" v-model="umfrageName" required placeholder="Gib der Umfrage einen Namen" class="view-main-content-textfield">
        </div>
        <RouterLink to="/fragenErstellen" @click="addUmfrage()" class="linkAndButton">
          Fragen erstellen
        </RouterLink>
        
        <RouterLink to="/erstelleUmfrageAusTemplate" @click="addUmfrage()" class="linkAndButton">
          Erstelle aus einem Template
        </RouterLink>
      </form>
    </div>
  </template>

  <style scoped>
  form {
    width: 100%;
  }

  input {
    width: 50%;
    margin-top: 1.5rem;
  }

  .linkAndButton {
    padding: .5rem 2rem;
    margin-right: 2em;
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
  