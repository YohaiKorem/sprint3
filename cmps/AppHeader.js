export default {
    template: `
        <header class="app-header flex align-center justify-between">
            <h1 class="logo">AppSus</h1>
            <nav>
                <router-link to="/">Home</router-link> | 
                <router-link to="/keep">Keep</router-link> | 
                <router-link to="/mail">Mail</router-link> | 
                <router-link to="/about">About</router-link>
            </nav>
        </header>
    `,
}
