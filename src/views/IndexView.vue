<template class="triangle">
    <nav>
        <a href="#vp-one">Value 1</a>
        <a href="#vp-two">Value 2</a>
        <a href="#happy-flow">Demo</a>
        <a href="#pricing">Preise</a>
        <a href="#cta">Get Started</a>
    </nav>
    <section id="vp-one" >
        <div class="textbox" v-motion-pop-left-delay-enter>
            <h1>Action Title VP1</h1>
            <p>Steigern Sie die Zufriedenheit Ihrer Kunden und bleiben Sie wettbewerbsfähig - Vergleichen Sie 
                anonymisiert die Ergebnisse Ihrer Umfragen mit denen anderer Unternehmen, um zu erkennen, wo 
                Sie stehen und welche Maßnahmen Sie ergreifen können, um die Kundenzufriedenheit zu steigern.
                Steigern Sie die Zufriedenheit Ihrer Kunden und bleiben Sie wettbewerbsfähig - Vergleichen Sie 
                anonymisiert die Ergebnisse Ihrer Umfragen mit denen anderer Unternehmen, um zu erkennen, wo Sie 
                stehen und welche Maßnahmen Sie ergreifen können, um die Kundenzufriedenheit zu steigern.</p>
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
                <h1>Value Proposition 2</h1>
                <p>Sparen Sie Zeit und Ressourcen bei der Erstellung und Verwaltung von Umfragen - Nutzen Sie unsere 
                    intuitive Umfragen-App, um schnell und einfach professionelle Umfragen zu erstellen und zu verwalten. 
                    Die Daten werden automatisch in Echtzeit gesammelt und in Firebase gespeichert, sodass Sie jederzeit 
                    auf sie zugreifen und auswerten können.</p>
            </div>
        </div>
    </section>

    <section id="happy-flow">
        <iframe src="https://www.youtube.com/embed/BeKfyQZbwJA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </section>

    <section id="pricing">
        <div class="pricing-container textbox " v-motion-pop-left>
            <i class="fa-regular fa-star"></i>
            <h1>Starter</h1>
            <p>- Text 1</p>
            <p>- Text 2</p>
            <p>- Text 3</p>
            <a href="login.html">Get Started!</a>
        </div>
        <div class="pricing-container textbox">
            <i class="fa-regular fa-star"></i>
            <h1>Advanced</h1>
            <p>- Text 1</p>
            <p>- Text 2</p>
            <p>- Text 3</p>
            <p>- Text 4</p>
            <a href="login.html">Get Started!</a>
        </div>
        <div class="pricing-container textbox" v-motion-pop-right>
            <i class="fa-regular fa-star"></i>
            <h1>Premium</h1>
            <p>- Text 1</p>
            <p>- Text 2</p>
            <p>- Text 3</p>
            <p>- Text 4</p>
            <p>- Text 5</p>
            <a href="login.html">Get Started!</a>
        </div>
    </section>

    <section id="cta" class="triangle">
        CTA - coming soon...
    </section>
</template>

<script>

export default {
  name: 'IndexView',
  components: 'IndexView'
  }
</script>

<style>
/* == ScrollReveal with IntersectionObserver == */
.hidden_show_left {
    opacity: 0;
    transition: all 500ms;
    filter: blur(5px);
    transform: translateX(-100%);
}
.hidden_show_right {
    opacity: 0;
    transition: all 500ms;
    filter: blur(5px);
    transform: translateX(100%);
}

/* == NAVIGATION == */
nav {
    display: flex;
    flex-direction: row;
    justify-content: space-around ;
    align-items: center;
    width: 70%;
    height: 10vh;
    padding: 0 15% 0;
    /* background-color: rgba(96, 96, 96, .4);
    box-shadow: 0px 4px 10px 1px #050505; */
    background: rgba(255, 255, 255, 0.4);
    box-shadow: 0px 4px 4px 1px rgba(0, 0, 0, 0.25);
    font-weight: 700;
}

nav {
    display: flex;
    flex-direction: row;
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
    background-color: red;
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
    height: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
}

#pricing .pricing-container i {
    font-size: 2rem;
    color: var(--polly_accent_yellow);
    margin-top: 12.5%;
    align-self: center;
}

#pricing .pricing-container h1 {
    font-size: 2.5em;
    margin-top: 4%;
    align-self: center;
}

#pricing .pricing-container p {
    text-align: left;
    margin-left: 2em;
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
    color: var(--polly_accent_purple);
    transition: 400ms;
}
#pricing .pricing-container a:active {
    color: var(--text_light_background);
    transition: 600ms;
}

/* == CTA == */
#cta {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 5rem;
}

</style>
