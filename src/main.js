/* import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { MotionPlugin} from '@vueuse/motion'


createApp(App).use(router)

//Creation of Animations with MotionPlugin
.use(MotionPlugin, {
    directives: {
        'pop-left-delay-enter': {
            initial: {
                opacity: 0, 
                x: -500,
            },
            enter: {
                opacity: 1,
                x: 0,
                transition: {
                    duration: 700,
                    delay: 700
                }
            },
        },
        'pop-right-delay-enter': {
            initial: {
                opacity: 0,
                x: 500,
            },
            enter: {
                opacity: 1,
                x: 0,
                transition: {
                    delay: 1200,
                    duration: 500
                }
                
            },
            
        },
        'pop-right-delay': {
            initial: {
                opacity: 0,
                x: 500,
            },
            visible: {
                opacity: 1,
                x: 0,
                transition: {
                    delay: 400,
                    duration: 500
                }
                
            },
            
        },
        'pop-bottom': {
            initial: {
                opacity: 0,
                y: 100,
            },
            visible: {
                opacity: 1,
                y: 0,
            },
            
        },
        'pop-left': {
            initial: {
                x: -200,
                opacity: 0
            },
            visible: {
                x: 0,
                opacity: 1,
                transition: {
                    delay: 300,
                    duration: 400
                }
            },
            
        },
        'pop-right': {
            initial: {
                x: 200,
                opacity: 0
            },
            visible: {
                x: 0,
                opacity: 1,
                transition: {
                    delay: 300,
                    duration: 400
                }
            },
            
        },
    },
})



.mount('#app')
 */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { MotionPlugin } from '@vueuse/motion'

/* import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC2yMsb0aN9VLldMnBG9wQexNK0XisbL84",
    authDomain: "polly-27e70.firebaseapp.com",
    projectId: "polly-27e70",
    storageBucket: "polly-27e70.appspot.com",
    messagingSenderId: "45120484644",
    appId: "1:45120484644:web:14ba4ed9161b206b08afb1"
};
 */


// Firebase-App initialisieren
/* const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
 */
/* //Datenbank überall in der App nutzbar machen:
export{
    db
} */

createApp(App)
  .use(router)
  .use(MotionPlugin, {
    directives: {
        'pop-left-delay-enter': {
            initial: {
                opacity: 0, 
                x: -500,
            },
            enter: {
                opacity: 1,
                x: 0,
                transition: {
                    duration: 700,
                    delay: 700
                }
            },
        },
        'pop-right-delay-enter': {
            initial: {
                opacity: 0,
                x: 500,
            },
            enter: {
                opacity: 1,
                x: 0,
                transition: {
                    delay: 1200,
                    duration: 500
                }
                
            },
            
        },
        'pop-right-delay': {
            initial: {
                opacity: 0,
                x: 500,
            },
            visible: {
                opacity: 1,
                x: 0,
                transition: {
                    delay: 400,
                    duration: 500
                }
                
            },
            
        },
        'pop-bottom': {
            initial: {
                opacity: 0,
                y: 100,
            },
            visible: {
                opacity: 1,
                y: 0,
            },
            
        },
        'pop-left': {
            initial: {
                x: -200,
                opacity: 0
            },
            visible: {
                x: 0,
                opacity: 1,
                transition: {
                    delay: 300,
                    duration: 400
                }
            },
            
        },
        'pop-right': {
            initial: {
                x: 200,
                opacity: 0
            },
            visible: {
                x: 0,
                opacity: 1,
                transition: {
                    delay: 300,
                    duration: 400
                }
            },
            
        },
    },
})

.mount('#app');
