<template>
    <div class="view-main-content">
        <h1 class="view-main-content-heading">
            Derzeit laufende Umfragen von {{ nameUserLaden() }} 
        </h1>

        <div v-for="umfrage in umfragenNamen">

            <RouterLink to="/umfragenDetailÜbersicht" @click="writeToSessionStorage(umfrage)">
                {{ umfrage }}
            </RouterLink>
        </div>
    </div>  
</template>

<style scoped>

    .view-main-content .view-main-content-heading {
        margin-bottom: 3rem;
    }
    .view-main-content a:link,
    .view-main-content a:visited {
        padding: .75rem 2rem;
        border-radius: 10px;
    }


</style>

<script setup>
    import { ref, onMounted } from 'vue'
    import {collection, onSnapshot} from 'firebase/firestore';
    import { db } from '@/firebase'

    const nameUserLaden = () => {
        /*
        sorgt dafür, dass im HTML teil steht, für welchen Admin eine übersicht der Umfragen 
        aufgerufen wurde
        */
        username = sessionStorage.getItem('EMailAdmin')
        return username
    }

    let username = ''
    const umfragenNamen = ref([])
    const EMailAdmin = sessionStorage.getItem('EMailAdmin')
    const umfragenCollectionRef = collection(db,'AlleUmfragen', EMailAdmin, 'Umfragen')

    onMounted(() => {
        //holen der Umfragen des Admins aus Firebase 
         onSnapshot(umfragenCollectionRef, (querySnapshot) => {
            const namen = []
            querySnapshot.forEach((doc) => {
                namen.push(doc.id)
            })
            umfragenNamen.value = namen
        })
    })

    const writeToSessionStorage = (umfrage) => {
        //In der UmfragenDetailÜbersicht.vue wird bei getName() auf diesen SessionStorage eintrag zugegriffen
        sessionStorage.setItem('umfrageAuswerten', umfrage);
    }
</script>