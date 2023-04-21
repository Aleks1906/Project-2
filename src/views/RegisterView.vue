<template>
    <div id="register-site">
        <div id="register-container">
            <h1>Registrieren</h1>
            <form>
                <input type="email" id="new_email" name="new_email" placeholder="E-Mail Adresse" v-model="register.email" required>
                <input type="password" id="new_password" name="new_password" placeholder="Passwort" v-model="register.password" required>
                <button type="button" @click="signUp">Registrieren</button>
                <RouterLink to="/login" id="change-to-login">Hast du schon einen Account?</RouterLink>
            </form>
            

        </div>
    </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import  { app } from '@/firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


export default {
    data() {
      return {
        register: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      signUp() {
      const auth = getAuth(app);
      createUserWithEmailAndPassword(auth, this.register.email, this.register.password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log(user);

        // Erfolgreich registriert
      })
      .catch(error => {
        console.log(error.message);
        // Registrierung fehlgeschlagen
      });
     } 
      /*
      signUp() {
        console.log("2")
        firebase.auth().createUserWithEmailAndPassword(this.register.email, this.register.password)
          .then(user => {
            console.log(user);
            // Erfolgreich registriert
            
          })
          .catch(error => {
            console.log(error.message);
            // Registrierung fehlgeschlagen
          });
      } */
    }
}
</script>

<style>
#register-site {
    width: 100%;
    min-height: 65vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#register-container {
    display: flex;
    flex-direction: column;
    height: 50%;
    width: 40%;
}

#register-container h1 {
    text-align: left;
}

#register-container form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

#register-container form * {
    border-radius: 15px;
    border: none;
}

#register-container form input {
    margin-bottom: 2em;
    width: 45%;
    height: 3vh;
    padding-left: 15px;

}



#register-container form button {
  width: 45%;
  height: 4vh;
  transition: 800ms;
  background: none;
  border: 3px solid var(--text_dark_background);
  color: var(--text_dark_background);
  font-weight: 700;
  font-size: 13px;
}

#register-container form button:hover {
  scale: .95;
  scale: .95;
  border: 3px solid var(--polly_accent_yellow);
  color: var(--polly_accent_yellow);
  transition: 300ms;
  }

#register-container form #change-to-login {
  width: 45%;
  margin-top: 1em;
  font-weight: 500;
}
#register-container form #change-to-login:hover {
  scale: 1;
  text-decoration: underline;
}


</style>