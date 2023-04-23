<template>
    <h1>Übersicht aller Umfragen</h1>
    <div v-for="(umfragenarray, index) in umfragen" :key="index">
      <div v-for="(umfrage, idx) in umfragenarray" :key="idx">
        <button @click="this.$router.push('/beantworten')">
          {{ umfrage }}
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
/*
    onMounted(() => {
        onSnapshot(umfragenCollectionRef, (querySnapshot) => {
            const allAdmins = []
            const allSurveys = []
            querySnapshot.forEach((doc) => {
                console.log("All Aminds " + doc.id)
                allAdmins.push(doc.id)
                console.log( "allAdmins" + allAdmins)
            })
            admins.value = allAdmins
            console.log("Admins.value " + admins.value)
            admins.value.forEach((admin) => {
                const adminCollectionRef = collection(db, 'AlleUmfragen', admin, 'Umfragen')
                console.log("Admincollectionref " + adminCollectionRef)
                onSnapshot(adminCollectionRef, (querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        allSurveys.push(doc.id)
                    })
                    console.log("allSurveys: " + allSurveys)
                    umfragen.value = allSurveys
                    console.log("umfragen.value: " + umfragen.value)
                })
            })
        })
    }) */
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
          querySnapshot.forEach((doc) => {
            surveys.push(doc.id)
          })
          console.log("Umfragen von Admin " + index + ": " + surveys)
          umfragen.value[index] = surveys
          console.log("umfragen.value: " + umfragen.value)
        })
      })
    })
  })

</script>