<template>
  <div class="view-main-content">
    <div id="option-container">
    <button class="view-main-content-advanceBtn"
    @click="umfrageAuswerten()"
        > 
        {{getName()}}
        {{ 
        ' auswerten'
        }}
    </button>

    <RouterLink to="/" @click="umfrageLöschen()">
      {{getName()}} löschen
    </RouterLink>
  </div>

    <div id="auswertung">
    </div>
  </div>
</template>
  
<style scoped>
.view-main-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: space-around;
}

.view-main-content #option-container {
  display: flex;
  flex-direction: row;
  width: 30%;
  justify-content: space-around;
}

.view-main-content #delete-btn:hover {
  border-color: red;
  color: red;
}

.view-main-content #auswertung {
  align-self: flex-start;
  padding-left: 4rem;
}


</style>
  
<script setup>
  import { ref, computed, onMounted } from 'vue'
  import {collection, onSnapshot, doc, deleteDoc, getDocs} from 'firebase/firestore';

  import { db } from '@/firebase'
  const questions = ref([{}])
  const umfragenCollectionRef = collection(db,'AlleUmfragen', sessionStorage.getItem('EMailAdmin'), 'Umfragen', sessionStorage.getItem('umfrageAuswerten'), 'Fragen')
  const deleteRef = doc(db,'AlleUmfragen', sessionStorage.getItem('EMailAdmin'), 'Umfragen', sessionStorage.getItem('umfrageAuswerten'))
  const quizCompleted = ref(false)
  const currentQuestion = ref(0)
  
  /*
    onMounted(), getCurrentQuestion(), NextQuestion()
    funktionieren nach dem gleichen Prinzip wie in BeantwortenView.vue
  */

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
    //Antworten bei einer einer Frage zählen 
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
    /*
      Antworten, die Anzahl der entsprechenden Auswahl und die Fragestellung
      für jede Frage zusammen in den String ausgabe schreiben. Dieser wird
      anschließend mit innerHTML in das div mit der id Auswertung geschrieben.
    */
    currentQuestion.value = 0
    let anzahlFragen = questions.value.length
    let ergebnis = []
    let ausgabe = ""
    for(let x = 0; x < anzahlFragen; x++){
      let antworten = countAnswers()
      ergebnis.push([...antworten])
      ausgabe = ausgabe + "<br> <br> Frage " + (x+1) + ": "+  getCurrentQuestion.value.question + "<br><br><br>Auswahlmöglichkeiten: "
      for(let z = 0; z < getCurrentQuestion.value.options.length; z++){
        ausgabe = ausgabe + "<br>" +  getCurrentQuestion.value.options[z] + ", Anzahl ausgewählt: " + ergebnis[x][z] + 
        "<br>"
      }
      document.getElementById('auswertung').innerHTML = ausgabe
      "<br"
      NextQuestion()
    }
    currentQuestion.value = 0
    console.log("Ergebnis: ", ergebnis)
    return ausgabe
  }

  const getName = () => {
    //übergibt den Namen der im Detail betrachteten Umfrage
      return sessionStorage.getItem('umfrageAuswerten')
  }

  const umfrageLöschen = async () => {
    //Entfernen einer Umfrage aus Firebase
      const questionSnapshot = await getDocs(umfragenCollectionRef);
      questionSnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
      });
      const querySnapshot = await deleteDoc(deleteRef);
  }
</script>