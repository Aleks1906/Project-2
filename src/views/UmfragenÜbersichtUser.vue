<template>
    <div class="view-main-content">
      <h1 class="view-main-content-heading">Übersicht aller Umfragen</h1>
      <input type="text" v-model="searchQuery" placeholder="Umfragen durchsuchen" class="view-main-content-textfield">
      <div v-for="(umfragenarray, index) in filteredUmfragen" :key="index" id="umfragenContainer">
        <div v-for="(umfrage) in umfragenarray" id="umfragenTemplate">
          <RouterLink to="/beantworten" @click="writeToSessionStorage(umfrage, hilfeAdmins[index][0])">
            <p>
              <h2> {{ umfrage }} </h2>
              erstellt von: {{ hilfeAdmins[index][0]}}
            </p>  
          </RouterLink>
        </div>
      </div>
    </div>
  </template>

  <style scoped>
    button {
      color: var(--text_dark_background);
      font-weight: bold;
      background: transparent;
      border: 3px solid var(--text_dark_background);
      cursor: pointer;
      margin-bottom: 1em;
      padding: .7rem 1rem;
      border-radius: 10px;
      transition: 500ms;
    }

    button:hover {
      transform: scale(1.02);
      transition: 300ms;
      color: var(--polly_accent_yellow);
    }

    #umfragenContainer {
      width: 70%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    #umfragenTemplate {
      width: 45%;
    }

    #umfragenTemplate > button {
      width: 100%;
      height: 8rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }



    #umfragenTemplate h2 {
      margin-top: 0;
    }

    


  </style>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { collection, onSnapshot } from 'firebase/firestore'
  import { db } from '@/firebase'
  
  const umfragenCollectionRef = collection(db,'AlleUmfragen')
  const admins = ref([])
  const umfragen = ref([])
  const hilfeAdmins = ref([])
  const searchQuery = ref('')
  
  onMounted(() => {
    /*
    Laden der laufenden Umfragen und der jeweiligen Admins, von denen die Umfragen erstellt wurden
    */
    onSnapshot(umfragenCollectionRef, (querySnapshot) => {
      const allAdmins = []
      querySnapshot.forEach((doc) => {
        console.log("All Aminds " + doc.id)
        allAdmins.push(doc.id)
        console.log("allAdmins" + allAdmins)
      })
      admins.value = allAdmins
      console.log("Admins.value " + admins.value)
      admins.value.forEach((admin, index) => {
        const adminCollectionRef = collection(db, 'AlleUmfragen', admin, 'Umfragen')
        console.log("Admincollectionref " + adminCollectionRef)
        onSnapshot(adminCollectionRef, (querySnapshot) => {
          const surveys = []
          const helper = []
          querySnapshot.forEach((doc) => {
            surveys.push(doc.id)
            helper.push(admin)
          })
          hilfeAdmins.value[index] = helper
          umfragen.value[index] = surveys
          console.log("Hilfe Admins: " + hilfeAdmins.value)
          console.log("umfragen.value: " + umfragen.value)
          console.log("Admins: " + admins.value)
        })
      })
    })
  })
  
  const filteredUmfragen = computed(() => {
    //Umsetzung der Suchleiste
    const query = searchQuery.value.toLowerCase()
    if (query === '') {
      return umfragen.value
    } else {
      return umfragen.value.map((umfragenarray) => {
        return umfragenarray.filter((umfrage) => {
          return umfrage.toLowerCase().includes(query)
        })
      })
    }
  })
  
  const writeToSessionStorage = (umfrage, admin) => {
    /*
    Bei Click des Buttons mit dem Namen einer Umfrage wird diese Methode aufgerufen.
    In der BeantowortenView.vue wird auf die SessionStorage Items umfrageBeantworten und
    adminBeantworten zugegriffen. Auf Basis dieser Items wird der Pfad erstellt, welcher zu 
    der entsprechenden Umfrage führt -> Damit könnten die Umfrage und die Fragen geladen werden
    */
    sessionStorage.setItem('umfrageBeantworten', umfrage);
    sessionStorage.setItem('adminBeantworten', admin);
  }
  </script>
  