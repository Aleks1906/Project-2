<template>
  <div id="login-site">
    <div id="login-container">
      <h1 class="view-main-content-heading">Anmelden</h1>
      <form>
        <input type="email" id="email" name="email" placeholder="E-Mail Adresse" v-model="login.email" required>
        <input type="password" id="password" name="password" placeholder="Passwort" v-model="login.password" required>

        <RouterLink to="/" @click="signIn" class="linkAndButton">
          Anmelden
        </RouterLink>
        <RouterLink to="/register" id="change-to-register">Noch keinen Account?</RouterLink>
      </form>
    </div>
  </div>
</template>

<script>
import 'firebase/auth';
import  { app } from '@/firebase'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
          sessionStorage.setItem('isAdmin', true);
          sessionStorage.setItem('EMailAdmin', this.login.email);
          console.log(sessionStorage.getItem('EMailAdmin') + " wurde erfolgreich angemeldet!")
          console.log(sessionStorage.getItem('isAdmin'))
          location.reload()
          // Erfolgreich angemeldet
        })
        .catch((error) => {
          console.log(error.message + 'Fehler!');
          alert("Es gab einen Fehler bei der Anmeldung: " + error.message);
          // Anmeldung fehlgeschlagen
        });
    },
  },
};



</script>