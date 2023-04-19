<template>
    <footer>
        <div id="imprint">
            <router-link to="/imprint">Impressum</router-link>
            <router-link to="/index">Datenschutz</router-link>
        </div>
        <div id="copyright">
            Erstellt für PROJEKT2 von: <br>
            Joshua Höhn, <br>
            Jakob Oehlberg, <br>
            Aleksandar Trifonov, <br>
            Yannik Vogler, <br>
            Dominik Schulze

        </div>
    </footer>

</template>

<script>
export default {
  name: 'FooterView',
  components: 'FooterView'
}
</script>

<style scoped>
/* == IMPRINT == */
footer {
    width: 100%;
    height: 25vh;
    display: flex;
    flex-direction: row;
    background-color: rgba(96, 96, 96, .4);
}

footer #imprint {
    height: 100%;
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 5%;
    justify-content: center;
}

footer #copyright {
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    text-align: right;
    padding-right: 5%;
}

footer #imprint a:first-of-type {
    margin-bottom: 2em;
}
</style>