export default {
    template: `
        <section class="home-page">
            <div class="slogen-wrapper flex flex-column flex-start">
                <h1>AppSus - Two essential services, one powerful app</h1>
                <h2>Stay organized and connected with our notes and email service</h2>
                <div class="btn-group flex justify-start">
                    <RouterLink class="btn-google" :to="'/mail'">Start with Gmail</RouterLink>
                    <RouterLink class="btn-google" :to="'/keep'">Start with Keep</RouterLink>
                </div>
            </div>
            <img src="../assets/img/googleHomePage.webp" />
        </section>
    `,
}
