<!-- eslint-disable -->
<template>
  <NavView :key="$route.fullPath"></NavView>
  <router-view/>
  <FooterView></FooterView>
</template>

<script>
import NavView from './components/NavView.vue'
import FooterView from './components/FooterView.vue'

export default {
  name: 'App',
  components : {
    NavView,
    FooterView
  }
}
</script>
<style>
/* Import von Fontawesome für Icons */ 
@import "~@fortawesome/fontawesome-free/css/all.css";

/* Scrollbar */
::-webkit-scrollbar {
  width: 0;
  background-color: rgba(226, 226, 226, 0.06);
    
}
::-webkit-scrollbar-thumb {
    background: linear-gradient(#FFFFFF, #AD00FF);
    border-radius: 6px;
}

/* Allgemein */
:root {
    --background_gradient: #AD00FF;
    --polly_accent_purple: #FF00F5;
    --polly_accent_yellow: #FFDF53;
    --text_light_background: #2B2B2B;
    --text_dark_background: #FFFFFF;
}

html, body {
    background: linear-gradient(180deg, #AD00FF 22.92%, rgba(101, 0, 217, 0.9) 100%);
    font-family: 'Helvetica', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: var(--text_dark_background);
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
    overflow-x: hidden;
}

/* GENERELLES */
/* Links und Router-Link, sowie Button styling */
a:link,
.linkAndButton:link {
  color: var(--text_dark_background);
  text-decoration: none;
  padding: 1rem 2.5rem;
  border: 3px solid var(--text_dark_background);
  transition: 800ms;
  border-radius: 25px;
}
a:visited,
.linkAndButton:visited {            
  color: var(--text_dark_background);
  text-decoration: none;
  border: 3px solid var(--text_dark_background);
  transition: 800ms;
  padding: .75rem 2rem;

}
a:hover,
.linkAndButton:hover {
  color: var(--polly_accent_yellow);
  transition: 300ms;
  border: 3px solid var(--polly_accent_yellow)
}
a:active,
.linkAndButton:active {
        transition: 800ms;
    }


/* ALLGEMEINES */
.textbox {
  border-radius: 25px;
  background: rgba(255,255,255, 0.1);
  border-top: 1px solid rgba(255,255,255,0.5);
  border-left: 1px solid rgba(255,255,255,0.5); 
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  line-height: 1.5;
	box-shadow: 14px 9px 18px rgba(0, 0, 0, 0.5)  ; 
	-webkit-box-shadow: 14px 9px 18px rgba(0, 0, 0, 0.5)  ; 
	-moz-box-shadow: 14px 9px 18px rgba(0, 0, 0, 0.5)  ; 
}

/* VIEW Specific CSS */

.view-main-content {
  width: 70%;
  min-height: 55vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 15%;
  margin-bottom: 3rem;
}

.view-main-content-heading {
  margin-bottom: 1rem;
  color: var(--polly_accent_yellow);
}

.view-main-content-textfield {
  border: none;
  padding: .7rem 1rem;
  border-radius: 30px;
  margin-bottom: 2rem;
}

.view-main-content-advanceBtn {
  color: var(--text_dark_background);
  min-width: 10vw;
  font-weight: bold;
  background: transparent;
  border: 3px solid var(--text_dark_background);
  cursor: pointer;
  margin-bottom: 1em;
  padding: .7rem 1rem;
  border-radius: 30px;
  transition: 500ms;
}

.view-main-content-advanceBtn:hover {
  transform: scale(.98);
  transition: 300ms;
  color: var(--polly_accent_yellow);
  border-color: var(--polly_accent_yellow);
}


</style>
