<template>
    <h1>Übersicht aller Umfragen</h1>
    <div v-for="(umfragenarray, index) in umfragen" :key="index">
      <div v-for="(umfrage) in umfragenarray" >
        <button @click="writeToSessionStorage(umfrage, hilfeAdmins[index][0]), this.$router.push('/beantworten')">
          {{ umfrage }} - {{ hilfeAdmins[index][0]}}
          <!-- irgendwie müssen wir hier diese beiden Werte mitgeben, damit bei der Beantwortung die richtige Route ausgewählt wird.-->
        </button>
      </div>
    </div>
</template>
  
<script setup>
    import { ref, computed, onMounted, resolveDirective } from 'vue'
    import {collection, onSnapshot, doc, updateDoc, FieldValue, arrayUnion, getFirestore} from 'firebase/firestore';
    import { db } from '@/firebase'
 
    const umfragenCollectionRef = collection(db,'AlleUmfragen')
    const admins = ref([])
    const umfragen = ref([])
    const hilfeAdmins = ref([])

    onMounted(() => {
    onSnapshot(umfragenCollectionRef, (querySnapshot) => {
      const allAdmins = []
      const allSurveys = []
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

    const writeToSessionStorage = (umfrage, admin) => {
        sessionStorage.setItem('umfrageBeantworten', umfrage);
        sessionStorage.setItem('adminBeantworten', admin);
    }
</script>