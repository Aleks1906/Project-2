<template>
    <main class="app view-main-content">
      <h1 class="view-main-content-heading">Umfrage Kundenzufriedenheit</h1>
      <section class="quiz" v-if="!quizCompleted">
        <div class = "quiz-info">
          <span class="question">
             {{ getCurrentQuestion.question }} 
          </span>
          <div class="options">
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
  
        <button class="view-main-content-advanceBtn"
                  @click="setSelected(getCurrentQuestion.id, getCurrentQuestion.selectedLocal, getCurrentQuestion.selected), NextQuestion()" 
                  :disabled="getCurrentQuestion.selectedLocal == null">
                  {{ 
                      getCurrentQuestion.index == questions.length - 1 
                          ? 'Abschließen' 
                          : getCurrentQuestion.selectedLocal == null
                              ? 'Bitte wähle eine Antwort'
                              : 'Nächste Frage'
                  }}
              </button>
        <!-- <h3>{{ getCurrentQuestion.selected }}</h3> -->
      </section>
      <section v-else>
              <h2>Die Umfrage wurde beendet!</h2>
  
        <!-- Ende und Auswertung der Umfrage, muss eigene Datei UmfragenAuswerten.vue 
        <button
        @click="umfrageAuswerten()"
          > 
          {{ 
            'Umfrage auswerten'
          }}
        </button>
        <div id = "auswertung">
        </div>
        -->
          </section>
    </main>
  </template>
  
  <style scoped>
  .quiz {
    width: 80%;
    display: flex;
    flex-direction: column;
  }

  .quiz-info {
    height: 60%;
  }
  .question {
    font-size: 1.5rem;
  }

  .options {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
  }

  .option {
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .option input {
    margin-right: 1rem;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
  .option input[type="radio"]:checked {
    accent-color: var(--polly_accent_yellow);
  }
  .quiz button {
    width: 25%;
  }
  </style>
  
  <script setup>
    import { ref, computed, onMounted, resolveDirective } from 'vue'
    import {collection, onSnapshot, doc, updateDoc, FieldValue, arrayUnion, getFirestore} from 'firebase/firestore';
  
    import { db } from '@/firebase'
    const questions = ref([{}])
    const umfragenCollectionRef = collection(db,'AlleUmfragen', sessionStorage.getItem('adminBeantworten'), 'Umfragen', sessionStorage.getItem('umfrageBeantworten'), 'Fragen')
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

  //Die Methoden ab hier müssten in die eigene Datei UmfragenAuswerten.vue
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
  
        document.getElementById('auswertung').innerHTML = JSON.stringify(ausgabe)
        NextQuestion()
      }
      currentQuestion.value = 0
      console.log("Ergebnis: ", ergebnis)
      return ergebnis
    }
  </script>