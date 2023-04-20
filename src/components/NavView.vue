<template>
    <div id="header">
        <img src="../views/media/img/logo_yellow.png" alt="">
        <p>Polly - Slogan</p>

        <div id="login">
            <router-link to="/" id="home-button"><i class="fa-solid fa-house"></i></router-link>
            <router-link to="/beantworten">Mein Konto</router-link>
            <router-link to="/register">Login</router-link>

            <router-link v-if="true" to="/umfrageErstellen">Neue Umfrage</router-link>
            <router-link v-if="true" to="/umfragenÜbersicht">Umfragen einsehen</router-link>

        </div>
    </div>

</template>

<script>
export default {
  name: 'HeaderView',
  components: 'HeaderView'
}
</script>


<style scoped>
/* == HEADER == */
    #header {
        display: flex;
        flex-direction: row;
        font-weight: 700;
        height: 20%;
        width: 98%;
        padding: 2% 0% 2% 2%;
        color: var(--polly_accent_yellow);
    }

    #header img {
        width: 7.5%;
        height: auto;
    }

    #header p {
        display: flex;
        align-items: center;
        margin-left: .25em;
        font-size: 2em;
    }

    #header #login {
        width: 100%;
        display: flex;
        flex-direction: row ;
        justify-content: flex-end;
        align-items: center;
        padding-right: 2%;
    }

    #header #login a {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 2%;
        min-width: 70px;
        height: .5vh;
        border-radius: 100px;
        background: rgba(255,255,255, 0.2);
    }

    #header #login #home-button {
        border: none;
        background: transparent;
    }
    #header #login #home-button:hover {
        border: none;
        background: transparent;
        scale: 1;
    }

    #header #login #home-button i {
        font-size: 1.5em;
        margin-right: -7em;
    }
</style>



