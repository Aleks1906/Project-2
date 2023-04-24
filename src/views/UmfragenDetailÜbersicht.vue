<template>
    <button
    @click="umfrageAuswerten()"
        > 
        {{getName()}}
        {{ 
        ' auswerten'
        }}
    </button>

    <button @click="umfrageLöschen(), this.$router.push('/')">
        {{getName()}} löschen
    </button>

    <div id = "auswertung">
    </div>
</template>
  
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Monsterrat', sans-serif;
    }
    body {
      background-color: #3d1771;
      color: #FFF;
    }
  </style>
  
  <script setup>
    import { ref, computed, onMounted, resolveDirective } from 'vue'
    import {collection, onSnapshot, doc, deleteDoc, getDocs, updateDoc, FieldValue, arrayUnion, getFirestore} from 'firebase/firestore';
  
    import { db } from '@/firebase'
    const questions = ref([{}])
    const umfragenCollectionRef = collection(db,'AlleUmfragen', sessionStorage.getItem('EMailAdmin'), 'Umfragen', sessionStorage.getItem('umfrageAuswerten'), 'Fragen')
    const deleteRef = doc(db,'AlleUmfragen', sessionStorage.getItem('EMailAdmin'), 'Umfragen', sessionStorage.getItem('umfrageAuswerten'))
    //Wie greife ich auf EMailAdmin zu als normaler User?
    //Wie greife ich auf Umfrage zur Kundenzufriedenheit zu?
    const quizCompleted = ref(false)
    const currentQuestion = ref(0)
    
    onMounted(() => {
      onSnapshot(umfragenCollectionRef, (querySnapshot) => {
      const fbQuestions = []
      querySnapshot.forEach((doc) => {
          const frage = {
            id: doc.id,
            options: doc.data().options,
            question: doc.data().question,
            selected: doc.data().selected,
            selectedLocal: null
          }
          frage.selected.push(null)
          fbQuestions.push(frage)
        })
      questions.value = fbQuestions
      })
    })
    const getCurrentQuestion = computed(() => {
      let question = questions.value[currentQuestion.value]
      question.index = currentQuestion.value
      return question
    })

    const NextQuestion = () => {
      if (currentQuestion.value < questions.value.length - 1) {
        currentQuestion.value++
        return
      }
      
      quizCompleted.value = true
    }

    const countAnswers = () => {
      let len = getCurrentQuestion.value.options.length
      let len2 = getCurrentQuestion.value.selected.length
      let arr = new Array(len)
      for(let x = 0; x < len; x++){
        let count = 0
        for (let i = 0; i < len2; i++) {
          if(getCurrentQuestion.value.selected[i] === x.toString()){
            count++
          } 
        }
        arr[x] = count
      }
      return arr
    }
  
    const umfrageAuswerten = () => {
      currentQuestion.value = 0
      let anzahlFragen = questions.value.length
      let ergebnis = []
      let ausgabe = ""
      for(let x = 0; x < anzahlFragen; x++){
        let antworten = countAnswers()
        ergebnis.push([...antworten])
        ausgabe = ausgabe + " <br> <br> Frage " + (x+1) + ": "+  getCurrentQuestion.value.question + "<br>Auswahlmöglichkeiten: "
        for(let z = 0; z < getCurrentQuestion.value.options.length; z++){
          ausgabe = ausgabe + "<br>" +  getCurrentQuestion.value.options[z] + ", Anzahl ausgewählt: " + ergebnis[x][z]
        }
        document.getElementById('auswertung').innerHTML = ausgabe
        NextQuestion()
      }
      currentQuestion.value = 0
      console.log("Ergebnis: ", ergebnis)
      return ausgabe
    }

    const getName = () => {
        return sessionStorage.getItem('umfrageAuswerten')
    }
    const umfrageLöschen = async () => {
        const questionSnapshot = await getDocs(umfragenCollectionRef);
        questionSnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
        const querySnapshot = await deleteDoc(deleteRef);
    }
  </script>