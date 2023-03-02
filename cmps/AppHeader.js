export default {
    template: `
        <header class="app-header flex align-center justify-between">
            <router-link class="flex" to="/">
                <img width="28" src="../assets/img/favicon.png" />
                <h1 class="logo">AppSus</h1>
            </router-link>
            <nav>
                <router-link to="/">Home</router-link> | 
                <router-link to="/keep">Keep</router-link> | 
                <router-link to="/mail">Mail</router-link> 
            </nav>
        </header>
    `,
}
