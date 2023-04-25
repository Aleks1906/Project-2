import App from './App.vue'
import router from './router'
import { MotionPlugin } from '@vueuse/motion'
import { createApp } from 'vue';


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
