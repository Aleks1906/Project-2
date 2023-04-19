<!-- eslint-disable vue/require-v-for-key -->
<template>
    <main class="app">
      <h1>Umfrage Kundenzufriedenheit</h1>
      <section class="quiz" v-if="!quizCompleted">
        <div class = "quiz-info">
          <span class="question">
             {{ getCurrentQuestion.question }} 
          </span>
          <div class="options">
            // eslint-disable-next-line vue/require-v-for-key
            <label 
                      v-for="(option, index) in getCurrentQuestion.options" 
                      :for="'option' + index" 
                      :class="`option ${
                          getCurrentQuestion.selected[getCurrentQuestion.selected.length - 1] != null &&
                          index != getCurrentQuestion.selected[getCurrentQuestion.selected.length - 1]
                              ? 'disabled'
                              : ''
                      }`">
                      <input 
                          type="radio" 
                          :id="'option' + index" 
                          :name="getCurrentQuestion.index" 
                          :value="index" 
                          v-model="getCurrentQuestion.selected[getCurrentQuestion.selected.length - 1]" 
                          :disabled="getCurrentQuestion.selected[getCurrentQuestion.selected.length - 1]"
                          @change="SetAnswer" 
                      />
                      <span>{{ option }}</span>
                  </label>
          </div>
        </div>
  
        <button 
                  @click="setSelected(getCurrentQuestion.id, getCurrentQuestion.selectedLocal, getCurrentQuestion.selected), NextQuestion()" 
                  :disabled="!getCurrentQuestion.selected">
                  {{ 
                      getCurrentQuestion.index == questions.length - 1 
                          ? 'Finish' 
                          : getCurrentQuestion.selected == null
                              ? 'Select an option'
                              : 'Next question'
                  }}
              </button>
        <!-- <h3>{{ getCurrentQuestion.selected }}</h3> -->
      </section>
      <section v-else>
              <h2>Die Umfrage wurde beendet!</h2>
  
        <!-- Ende und Auswertung der Umfrage -->
        <button
        @click="umfrageAuswerten()"
          > 
          {{ 
            'Umfrage auswerten'
          }}
        </button>
        <div id = "auswertung">
        </div>
          </section>
    </main>
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
    import {collection, onSnapshot, doc, updateDoc, FieldValue, arrayUnion, getFirestore} from 'firebase/firestore';
  
    import { db } from '@/firebase'
    const questions = ref([{}])
    const umfragenCollectionRef = collection(db,'Umfragen')
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
    const SetAnswer = (e) => {
      questions.value[currentQuestion.value].selectedLocal = e.target.value
      e.target.value = null
      //e.target.value müsste die Option sein, welche man anklickt
    }
  
     async function setSelected (id, auswahl, selectedArray) {
      //Aktualisieren des zwischengespeicherten Arrays mit neuem Wert 
      selectedArray[selectedArray.length - 1] = auswahl
      //Dokument in Firebase mit aktualisierem Array überschreuben
      await updateDoc(doc(umfragenCollectionRef, id),{
        selected: selectedArray
      })
    }
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
        /*
        Hier wird jedes Mal eine Kopie des antworten-Arrays erstellt und in das ergebnis-Array eingefügt, indem der spread-Operator ... verwendet wird. 
        Dadurch erhältst du ein verschachteltes Array, wie du es erwartet hast.
        */
        ergebnis.push([...antworten])
        ausgabe = ausgabe + " <br> <br> Frage " + (x+1) + ": "+  getCurrentQuestion.value.question + "<br>Auswahlmöglichkeiten: "
        for(let z = 0; z < getCurrentQuestion.value.options.length; z++){
          ausgabe = ausgabe + "<br>" +  getCurrentQuestion.value.options[z] + ", Anzahl ausgewählt: " + ergebnis[x][z]
        }
  
        document.getElementById('auswertung').innerHTML = JSON.stringify(ausgabe)
        NextQuestion()
      }
  
      currentQuestion.value = 0
  
      
      console.log("Ergebnis: ", ergebnis)
      /*
      document.getElementById('auswertung').innerHTML = JSON.stringify("Frage 2: " +  getCurrentQuestion.value.question + " Auswahlmöglichkeiten: " + 
      getCurrentQuestion.value.options[0] +  getCurrentQuestion.value.options[1] + getCurrentQuestion.value.options[2] + 
      + "Ergebnisse: " + ergebnis[1])
      */
      return ergebnis
    }
  </script>