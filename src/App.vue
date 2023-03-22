<template>
  <div class="todo">
    <div class="title has-text-centred">
      ToDo
    </div>

    <form
      @submit.prevent="addTodo"
    >
        <div class="field has-addons mb-5">
          <div class="control">
            <input v-model="newTodoContent" class="input" type="text" placeholder="Add a todo">
          </div>
        <div class="control">
          <button :disabled="!newTodoContent" class="button is-info">
            Add
          </button>
        </div>
      </div>
    </form>

    <div
      v-for="todo in todos" 
      class="card mb-5"
      :class="{ 'has-background-success-light' : todo.done }"
    >
      <div class="card-content">
        <div class="content">

          <div class="columns is-mobile is-vcentered">
            <div class="column" :class="{ 'has-text-success line-throught' : todo.done}">
              {{ todo.content }}
            </div>

            <div class="column is-5 has-text-right">
              <button 
              @click="toggleDone(todo.id)"
              class="button" 
              :class="todo.done ? 'is-success' : 'is-light'">
                &check;
              </button>

              <button @click="deleteTodo(todo.id)" class="button is-danger ml-2">
                &cross;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  /* 
    Imports
  */
 import { ref, onMounted } from 'vue'
 import { collection, onSnapshot, addDoc, doc, deleteDoc,
   updateDoc, query, orderBy, limit } from 'firebase/firestore'
 import { db } from '@/firebase'

/*
  firebase refs
*/
const todosCollectionRef = collection(db,'todos')
const todosCollectionQuery = query(todosCollectionRef, orderBy('date', 'desc'))

 /*
    todos
 */
const todos = ref([
/*  
  {
    id: 'id1',
    content: 'Test',
    done: false
  },
  {
    id: 'id2',
    content: 'Test2',
    done: true
  }
*/ 

])

/*
  get todos from Firebase
*/
onMounted(() => {
  onSnapshot(todosCollectionQuery, (querySnapshot) => {
  const fbTodos = []
  querySnapshot.forEach((doc) => {
    const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done
      }
      fbTodos.push(todo)
  })
  todos.value = fbTodos
  })
})

/*
  add todo
*/
const newTodoContent = ref('')

const addTodo = () => {
    addDoc(todosCollectionRef, {
    content: newTodoContent.value,
    done: false,
    date: Date.now()
  });
  newTodoContent.value = ''
}

/*
  Delete todo
*/
const deleteTodo = id => {
  deleteDoc(doc(todosCollectionRef, id))
}

/*
  Toggle Done
*/
const toggleDone = id => {
  const index = todos.value.findIndex(todo => todo.id === id)
  updateDoc(doc(todosCollectionRef, id), {
    done: !todos.value[index].done
  })
}  
</script>

<style>
@import 'bulma/css/bulma.min.css';

.todo {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}

.line-throught{
  text-decoration: line-through;
}
</style>