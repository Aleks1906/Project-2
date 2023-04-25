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
      </section>
      <section v-else>
              <h2>Die Umfrage wurde beendet!</h2>
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
    import { ref, computed, onMounted } from 'vue'
    import {collection, onSnapshot, doc, updateDoc} from 'firebase/firestore';
  
    import { db } from '@/firebase'
    const questions = ref([{}]) //Enthält alle Fragen einer Umfrage, an der Teilgenommen wird

    //Pfad zu dem entsprechenden Eintrag mit der Umfrage / den Fragen in Firebase
    const umfragenCollectionRef = collection(db,'AlleUmfragen', sessionStorage.getItem('adminBeantworten'), 'Umfragen', sessionStorage.getItem('umfrageBeantworten'), 'Fragen')
    
    const quizCompleted = ref(false)//Zeigt an, ob Quiz beendet wurde 
    const currentQuestion = ref(0) //Zeiger, der auf die aktuelle Frage verweist

    //Laden aller Fragen aus Firebase
    onMounted(() => {
      onSnapshot(umfragenCollectionRef, (querySnapshot) => {
      const fbQuestions = []
      querySnapshot.forEach((doc) => {
        //Fragenobjekt erstellen
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
      questions.value = fbQuestions //Entstandene Fragenobjekte kopieren
      })
    })

    //Holt aus questions die aktuell zu beantwortende Frage
    const getCurrentQuestion = computed(() => {
      let question = questions.value[currentQuestion.value]
      question.index = currentQuestion.value
      return question
    })

    //Setzt die angegebene Antwort
    const SetAnswer = (e) => {
      questions.value[currentQuestion.value].selectedLocal = e.target.value
      e.target.value = null
    }
  
     async function setSelected (id, auswahl, selectedArray) {
      //Aktualisieren des zwischengespeicherten Arrays mit neuem Wert 
      selectedArray[selectedArray.length - 1] = auswahl
      //Dokument in Firebase mit aktualisierem Array überschreuben
      await updateDoc(doc(umfragenCollectionRef, id),{
        selected: selectedArray
      })
    }

    //Falls es noch Fragen gibt, Index currentQuestion erhöhen
    const NextQuestion = () => {
      if (currentQuestion.value < questions.value.length - 1) {
        currentQuestion.value++
        return
      }
      
      quizCompleted.value = true //wenn keine Frage, dann ist die Umfrage beendet
    }
  </script>