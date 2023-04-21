<template>
    <div>
        Derzeit laufende Umfragen, welche von {{ nameUserLaden() }} erstellt wurden: 
    </div>

    <button @click="namenAnzeigen()">Namen anzeigen</button>
    
    <div id="übersicht">
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
    let namen = []
 
    onMounted(() => {
        onSnapshot(umfragenCollectionRef, (querySnapshot) => {
            console.log("UmfragenCollectionRef: " + umfragenCollectionRef.path)
            console.log("Komme ich hierhin?!")
            querySnapshot.forEach((doc) => {
                namen.push(doc.id)
                console.log("Was ist die doc.id: " + doc.id)
            })
            console.log("onMounted aufgerufen?" + namen[0])
        })
        umfragenNamen.value = namen
    })

    const namenAnzeigen = () => {
        let ausgabe = ''
        if(umfragenNamen.value.length != undefined){
            console.log("namenAnzeigen aufgerufen" + umfragenNamen.value)
            for (let x = 0; x < umfragenNamen.value.length; x++) {
                console.log("Komme ich hierhin?!!")
            ausgabe = ausgabe + '<br>' + umfragenNamen.value[x]
            }
        } else {
            ausgabe = "Noch keine Umfragen vorhanden"
        }
        document.getElementById('übersicht').innerHTML = ausgabe
    }
</script>