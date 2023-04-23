<template>
    <div>
        Derzeit laufende Umfragen, welche von {{ nameUserLaden() }} erstellt wurden: 
    </div>

    <div v-for="umfrage in umfragenNamen">
            <button @click="writeToSessionStorage(umfrage), this.$router.push('/umfragenDetailÜbersicht')"> 
                {{ umfrage }}
             </button>
    </div>
</template>

<script setup>
    import { ref, computed, onMounted, resolveDirective } from 'vue'
    import {collection, onSnapshot, doc, updateDoc, FieldValue, arrayUnion, getFirestore, QuerySnapshot} from 'firebase/firestore';
    import { db } from '@/firebase'
    const nameUserLaden = () => {
        username = sessionStorage.getItem('EMailAdmin')
        return username
    }

    let username = ''
    const umfragenNamen = ref([])
    const EMailAdmin = sessionStorage.getItem('EMailAdmin')
    const umfragenCollectionRef = collection(db,'AlleUmfragen', EMailAdmin, 'Umfragen')
    //const umfragenCollectionRef2 = collection('AlleUmfragen').doc(sessionStorage.getItem('EMailAdmin'))

    onMounted(() => {
         onSnapshot(umfragenCollectionRef, (querySnapshot) => {
            const namen = []
            querySnapshot.forEach((doc) => {
                namen.push(doc.id)
            })
            umfragenNamen.value = namen
            //console.log("onMounted aufgerufen?" + namen[0])
            //umfragenNamen.value[index] = namen
            //console.log("Wert von Umfragen Value: " + umfragenNamen.value)
            
            let ausgabe = ''
            if(namen.length != undefined){
                console.log("namenAnzeigen aufgerufen" + namen.value)
                for (let x = 0; x < namen.length; x++) {
                    console.log("Komme ich hierhin?!!")
                    //ausgabe = ausgabe + '<br>' + '<a href= "/umfragenDetailÜbersicht">' + namen[x] + '</a>' + '<br> <br> <br>'
                    //ausgabe = ausgabe + '<br>' + '<router-link to="/umfragenDetailÜbersicht" custom v-slot="{navigate}">' + '<button @click="navigate()" role = "link">' + namen[x] + '</button> </router-link>' + '<br> <br> <br>'
                    //ausgabe = ausgabe + '<br>' + '<router-link to="/umfragenDetailÜbersicht" v-slot="{ navigate }">' + 
                    //'<button @click="navigate" role="link">' + namen[x] + '</button> </router-link>'
                    //ausgabe = ausgabe + '<br>' + '<RouterLink to="/umfragenDetailÜbersicht" id="change-to-register">' + namen[x] + '</RouterLink>'
                    ausgabe = ausgabe + '<br>' + '<button @click="this.$router.push(\'/umfragenDetailÜbersicht\')">' + namen[x] + '</button>' + '<br>'
                }
            } else {
                ausgabe = "Noch keine Umfragen vorhanden"
            }
            //document.getElementById('übersicht').innerHTML = ausgabe
            console.log("Ausgabe: " +  ausgabe)
        })
        //return ausgabe
    })

    const writeToSessionStorage = (umfrage, admin) => {
        sessionStorage.setItem('umfrageAuswerten', umfrage);
    }
</script>