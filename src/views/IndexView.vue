<template class="triangle">
    <nav>
        <a href="#vp-one" class="nav-links">Value 1</a>
        <a href="#vp-two" class="nav-links">Value 2</a>
        <a href="#happy-flow" class="nav-links">Demo</a>
        <a href="#pricing" class="nav-links">Preise</a>
        <a href="#cta" class="nav-links">Get Started</a>
    </nav>
    <section id="vp-one" >
        <div class="textbox" v-motion-pop-left-delay-enter>
            <h1 class="view-main-content-heading">Umfragen erstellen war noch nie so einfach!</h1>
            <p>Verabschieden Sie sich von langwierigen Umfrageerstellungsprozessen und willkürlichen Fragen. Mit unserer Webapp können Sie 
                im Handumdrehen professionelle und maßgeschneiderte Umfragen erstellen, die perfekt auf Ihre Branche zugeschnitten sind. Unsere 
                intuitiven Templates machen das Erstellen von Umfragen so einfach wie nie zuvor, und ermöglichen es Ihnen, sich auf das zu konzentrieren, 
                was wirklich zählt: die Ergebnisse.
            </p>
            <p>
                Ob Sie ein kleines Unternehmen oder ein großer Konzern sind, unsere Webapp ist die ideale Lösung, um wertvolle Feedbacks von Kunden, Mitarbeitern 
                oder der Öffentlichkeit zu sammeln. Unsere vorgefertigten Branchenvorlagen sind speziell auf die Bedürfnisse Ihrer Branche abgestimmt und lassen 
                sich mit wenigen Klicks anpassen. Mit unserem benutzerfreundlichen Erstellungstool können Sie Ihre Umfragen individuell gestalten und Ihre Kunden individuell
                ansprechen.
            </p>
        </div>
        <div id="desktop-mockup" v-motion-pop-right-delay-enter>
            <img src="./media/img/flying-mackbook-pro-(15-inch)-mockup-640f347a58781f2bd63d9ade@2x.png" alt="">
        </div>
    </section>

    <section id="vp-two">
        <div id="iphone-mockup" v-motion-pop-bottom>
            <img src="./media/img/iphone-13-mockup-640f434df2a9f49e3fa7074f@2x.png" alt="">
        </div>
        <div>
            <div class="textbox" v-motion-pop-right-delay>
                <h1 class="view-main-content-heading">Der Konkurrenz einen Schritt voraus mit unseren vorgefertigten Templates</h1>
                <p>Das Erstellen von Umfragen kann zu einer zeitaufwändigen und frustrierenden Aufgabe werden. Mit Polly haben Sie
                    jedoch die Möglichkeit, mit einem Klick neue Umfragen aus unseren vorgefertigten Templates zu erstellen.
                    Sie können aus einer Vielzahl von Umfragetypen auswählen, die speziell auf die Bedürfnisse Ihrer Branche zugeschnitten
                    sind. Egal, ob Sie ein Restaurantbesitzer sind, ein Arzt oder ein Einzelhändler - wir haben die passenden Umfragen für Sie!
                </p>
                <p>Unsere vorgefertigten Templates wurden von Experten entworfen und basieren auf bewährten Methoden und Best Practices. Das bedeutet, 
                    dass Sie sich keine Sorgen darüber machen müssen, ob Ihre Fragen sinnvoll und relevant sind - sie sind es bereits. Sie können die Vorlagen 
                    an Ihre Bedürfnisse anpassen, indem Sie Fragen hinzufügen oder entfernen, Antwortoptionen ändern und Ihr eigenes Branding hinzufügen.
                </p>
                <p>Probieren Sie es noch heute aus und erleben Sie die Vorteile der Verwendung von vorgefertigten Templates für Ihre Umfragen. Mit unserer Webapp 
                können Sie schnell und einfach Umfragen erstellen, die speziell auf Ihre Branche zugeschnitten sind, Zeit und Ressourcen sparen und wertvolle Feedbacks 
                sammeln, die Ihr Unternehmen voranbringen.
                </p>
            </div>
        </div>
    </section>

    <section id="happy-flow">
        <iframe src="https://www.youtube.com/embed/ZvjIJv4wr-M" title="Polly Happy Flow Video Player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </section>

    <section id="pricing">
        <div class="pricing-container textbox " v-motion-pop-left>
            <i class="fa-solid fa-handshake"></i>
            <h1>Basic</h1>
            <p>1 User pro Abonnement</p>
            <p>2 Templates</p>
            <p>bis zu 100 Responses</p>
            <p>15€/Monat</p>
            <router-link to="/register">Get started!</router-link>

        </div>
        <div class="pricing-container textbox">
            <i class="fa-solid fa-arrow-trend-up"></i>
            <h1>Plus</h1>
            <p>3 User pro Abonnement</p>
            <p>4 Templates</p>
            <p>bis 250 Responses</p>
            <p>30€/Monat</p>
            <router-link to="/register">Get started!</router-link>

        </div>
        <div class="pricing-container textbox" v-motion-pop-right>
            <i class="fa-solid fa-magic-wand-sparkles"></i>
            <h1>Premium</h1>
            <p>bis zu 5 User pro Abonnement</p>
            <p>Unlimited Templates</p>
            <p>Unlimited Responses</p>
            <p id="highlight">Branchenexperten als direkte Kundenberater</p>
            <p>50€/Monat</p>
            <router-link to="/register">Get started!</router-link>
        </div>
    </section>

    <section id="cta">
        <h1>Worauf warten Sie?</h1>
        <p>Beginnen Sie jetzt, Ihre Kunden besser zu verstehen und bringen Sie ihre Kundenbeziehungen auf das nächste Level! Der Einstieg ist dank unserer vorgefertigten
            Templates für jeden spielend einfach und schnell.
        </p>
        <router-link to="/register">Lassen Sie uns beginnen!</router-link>
    </section>
</template>

<script>

export default {
  name: 'IndexView',
  components: 'IndexView'
  }
</script>

<style>

/* == NAVIGATION == */
nav {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly ;
    align-items: center;
    width: 100%;
    height: 10vh;
    background: rgba(255, 255, 255, 0.4);
    box-shadow: 0px 4px 4px 1px rgba(0, 0, 0, 0.25);
}

nav .nav-links {
    padding: .5% 3%;
}
/* == VP1 == */
#vp-one {
    margin: 5% 0 10% 5%;
    display: flex;
    flex-direction: row;
}

#vp-one .textbox {
    width: 45%;
    height: 40%;
    padding: 1.5em;
}

#vp-one .textbox h1 {
    padding: 0 1.5em 0;
}

#vp-one .textbox p {
    padding: 0 2.5em 1em;
}

#vp-one #desktop-mockup {
    width: 75%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-self: flex-end;
    padding-top: 10%;
}

#vp-one #desktop-mockup img {
    width: auto;
    height: 65vh;
}

/* == VP2 == */
#vp-two {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
}

#vp-two #iphone-mockup {
    width: 45%;
    display:flex;
    justify-content: center;
    margin-bottom: -7.5em;
}

#vp-two #iphone-mockup img {
    width: auto;
    height: 100%;
}

#vp-two div {
    width: 55%;
}
#vp-two div .textbox {
    width: 80%;
    margin-top: 2em;
    padding: 2em;
}

/* == HAPPY FLOW == */
#happy-flow  {
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

#happy-flow iframe {
    width: 60%;
    height: 80vh;
    margin-top: 5em;
    margin-bottom: 5em;
}

/* == PRICING == */
#pricing {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
}

#pricing .pricing-container {
    width: 27.5vw;
    min-height: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    font-size: 1.3rem;
    transition: 700ms;
}

#pricing .pricing-container:hover {
    scale: 1.02;
    transition: 500ms;
}

#pricing .pricing-container i {
    font-size: 4rem;
    color: var(--polly_accent_yellow);
    margin-top: 12.5%;
    align-self: center;
}

#pricing .pricing-container h1 {
    font-size: 2.5em;
    margin-top: 4%;
    align-self: center;
    color: var(--polly_accent_yellow);
}

#pricing .pricing-container p {
    text-align: left;
    padding-left: 4rem;
}

#pricing .pricing-container #highlight {
    color: var(--polly_accent_yellow);
}

#pricing .pricing-container a {
    align-self: center;
    margin-top: 12.5%;
    padding: 4% 25%;
    background-color: var(--polly_accent_yellow);
    border-radius: 25px;
    font-weight: 700;
    margin-top: auto;
    margin-bottom: 2em;
}
#pricing .pricing-container a:link {
    transition: 600ms;
    background-color: #2B2B2B;
    border: none;
}
#pricing .pricing-container a:visited {
    background-color: #2B2B2B;
    transition: 600ms;
}
#pricing .pricing-container a:hover {
    background-color: var(--polly_accent_yellow);
    color: var(--text_light_background);
    transition: 400ms;
}
#pricing .pricing-container a:active {
    color: var(--text_light_background);
    transition: 600ms;
}

/* == CTA == */
#cta {
    width: 100%;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 5%;
}

#cta h1 {
    font-size: 5rem;
    color: var(--polly_accent_yellow);
}
#cta p {
    font-size: 1.5rem;
    text-align: center;
    padding: 0 22% 3rem;
}
</style>
