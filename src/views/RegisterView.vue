<template>
    <div id="register-site">
        <div id="register-container">
            <h1 class="view-main-content-heading">Registrieren</h1>
            <form>
                <input type="email" id="new_email" name="new_email" placeholder="E-Mail Adresse" v-model="register.email" required>
                <input type="password" id="new_password" name="new_password" placeholder="Passwort" v-model="register.password" required>

                <RouterLink to="/login" @click="signUp" class="linkAndButton">
                    Registrieren
                </RouterLink>
                <RouterLink to="/login" id="change-to-login">Hast du schon einen Account?</RouterLink>
            </form>
        </div>
    </div>
</template>

<script>
import 'firebase/compat/auth';
import  { app, db } from '@/firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const umfragenRef = collection(db, 'AlleUmfragen');
import { doc, collection, setDoc} from 'firebase/firestore';

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
      async signUp  () {
      const auth = getAuth(app);

      //Neuen Admin in der Collection AlleUmfragen erstellen
      const umfragenDoc = doc(umfragenRef, this.register.email);
      await setDoc(umfragenDoc, {});

      createUserWithEmailAndPassword(auth, this.register.email, this.register.password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log(user);
        alert("Die Registrierung war erfolgreich")
        // Erfolgreich registriert
      })
      .catch(error => {
        // Registrierung fehlgeschlagen
        console.log(error.message);
        alert("Die Registrierung war nicht erfolgreich: " + error.message)

      });
     },
    }
}
</script>

<style>
/* CSS für Login und Registrierung */
#register-site,
#login-site {
    width: 60%;
    margin: 0 20%;
    min-height: 65vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#register-container,
#login-container {
    display: flex;
    flex-direction: column;
    height: 50%;
    width: 40%;
    align-items: flex-start;
}

#register-container h1,
#login-container h1 {
    text-align: left;
}

#register-container form,
#login-container form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
}

#register-container form input,
#login-container form input {
    margin-bottom: 2em;
    width: 90%;
    height: 3vh;
    padding: .5em 1.5em;
    border: none;
    border-radius: 15px;
}

#register-container form #change-to-login,
#login-container form #change-to-register {
  width: 90%;
  margin-top: 1em;
  padding-left: 0;
  font-weight: 500;
}
#register-container form #change-to-login:link,
#register-container form #change-to-login:visited,
#login-container form #change-to-register:link,
#login-container form #change-to-register:link {
  border: none;
}
#register-container form #change-to-login:hover,
#login-container form #change-to-register:hover {
  scale: 1;
  text-decoration: underline;
}


</style>