<template>
    <h1>Übersicht aller Umfragen</h1>

    <div v-for="umfragenarray in umfragen">
        <div v-for="umfrage in umfragenarray">
            {{ umfrage }}
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

    onMounted(() => {
        onSnapshot(umfragenCollectionRef, (querySnapshot) => {
            const allAdmins = []
            querySnapshot.forEach((doc) => {
                
                console.log("All Aminds " + doc.id)
                allAdmins.push(doc.id)
                console.log( "allAdmins" + allAdmins)
            })
            admins.value = allAdmins
            console.log("Admins.value " + admins.value)
            admins.value.forEach((admin) => {
                const allSurveys = []
                const adminCollectionRef = collection(db, 'AlleUmfragen', admin, 'Umfragen')
                console.log("Admincollectionref " + adminCollectionRef)
                onSnapshot(adminCollectionRef, (querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        allSurveys.push(doc.id)
                        
                    })
                    umfragen.value.push(allSurveys)
                })
            })
        })
    })
</script>