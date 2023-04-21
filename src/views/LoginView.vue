<template>
  <div id="login-site">
    <div id="login-container">
      <h1>Anmelden</h1>
      <form>
        <input type="email" id="email" name="email" placeholder="E-Mail Adresse" v-model="login.email" required>
        <input type="password" id="password" name="password" placeholder="Passwort" v-model="login.password" required>
        <button type="button" @click="signIn">Anmelden</button>
        <RouterLink to="/register" id="change-to-register">Noch keinen Account?</RouterLink>
      </form>
    </div>
  </div>
  </template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import  { app } from '@/firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
let isAdmin = false

export default {
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    signIn() {
      const auth = getAuth(app);
      signInWithEmailAndPassword(auth, this.login.email, this.login.password)
        .then((user) => {
          console.log(user + 'Erfolgreich angemeldet!');
          sessionStorage.setItem('isAdmin', true);
          //location.reload();
          console.log(sessionStorage.getItem('isAdmin'))
          this.$router.push('/');
          // Erfolgreich angemeldet
        })
        .catch((error) => {
          console.log(error.message + 'Fehler!');
          // Anmeldung fehlgeschlagen
        });
    },
  },
};
export {
  isAdmin
}


</script>

<style>
#login-site {
  width: 100%;
  min-height: 65vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#login-container {
  display: flex;
  flex-direction: column;
  height: 50%;
  width: 40%;
}

#login-container h1 {
  text-align: left;
}

#login-container form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

#login-container form * {
  border-radius: 15px;
  border: none;
}

#login-container form input {
  margin-bottom: 2em;
  width: 45%;
  height: 3vh;
  padding-left: 15px;
}

#login-container form button {
width: 45%;
height: 4vh;
transition: 800ms;
background: none;
border: 3px solid var(--text_dark_background);
color: var(--text_dark_background);
font-weight: 700;
font-size: 13px;
}

#login-container form button:hover {
scale: .95;
scale: .95;
border: 3px solid var(--polly_accent_yellow);
color: var(--polly_accent_yellow);
transition: 300ms;
}

#login-container form #change-to-register {
  width: 45%;
  margin-top: 1em;
  font-weight: 500;
}

#login-container form #change-to-register:hover {
  scale: 1;
  text-decoration: underline;
}

</style>