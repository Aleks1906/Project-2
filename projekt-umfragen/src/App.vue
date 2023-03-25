<template>
  <main class="app">
    <h1>Die Umfrage</h1>
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
						getCurrentQuestion.selected == index 
							? index == getCurrentQuestion.answer 
								? 'correct' 
								: 'wrong'
							: ''
					} ${
						getCurrentQuestion.selected != null &&
						index != getCurrentQuestion.selected
							? 'disabled'
							: ''
					}`">
					<input 
						type="radio" 
						:id="'option' + index" 
						:name="getCurrentQuestion.index" 
						:value="index" 
						v-model="getCurrentQuestion.selected" 
						:disabled="getCurrentQuestion.selected"
						@change="SetAnswer" 
					/>
					<span>{{ option }}</span>
				</label>
        </div>
      </div>

      <button 
				@click="setSelected(getCurrentQuestion.id, getCurrentQuestion.selected), NextQuestion()" 
				:disabled="!getCurrentQuestion.selected">
				{{ 
					getCurrentQuestion.index == questions.length - 1 
						? 'Finish' 
						: getCurrentQuestion.selected == null
							? 'Select an option'
							: 'Next question'
				}}
			</button>
    </section>

    <section v-else>
			<h2>Die Umfrage wurde beendet!</h2>
      
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
  import { ref, computed, onMounted } from 'vue'
  import {collection, onSnapshot, doc, updateDoc} from 'firebase/firestore'
  import { db } from '@/firebase'

  const questions = ref([{}])
  const umfragenCollectionRef = collection(db,'Umfragen')
  const quizCompleted = ref(false)
  const currentQuestion = ref(0)
  const auswahl = null

  onMounted(() => {
    onSnapshot(umfragenCollectionRef, (querySnapshot) => {
    const fbQuestions = []
    querySnapshot.forEach((doc) => {
        const frage = {
          id: doc.id,
          options: doc.data().options,
          question: doc.data().question,
          selected: doc.data().selected
        }
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
    questions.value[currentQuestion.value].selected = e.target.value
    e.target.value = null

    //e.target.value müsste die Option sein, welche man anklickt

  }

  const setSelected = (id, auswahl) => {
    updateDoc(doc(umfragenCollectionRef, id), {
    selected: auswahl
    });
  }

  const NextQuestion = () => {
    if (currentQuestion.value < questions.value.length - 1) {
      currentQuestion.value++
      return
    }
    
    quizCompleted.value = true
  }
</script>