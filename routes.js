import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'
// KEEP
import NoteIndex from './apps/keep/pages/NoteIndex.js'
import NoteDetails from './apps/keep/pages/NoteDetails.js'

// MAIL
import MailIndex from './apps/mail/pages/MailIndex.js'
import MailDetails from './apps/mail/pages/MailDetails.js'
const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/about',
      component: AboutUs,
    },
    // KEEP PATHS
    {
      path: '/keep',
      component: NoteIndex,
    },
    {
      path: '/keep/:noteId',
      component: NoteDetails,
    },
    // MAIL PATHS
    {
      path: '/mail',
      component: MailIndex,
    },
    {
      path: '/mail/:mailId',
      component: MailDetails,
    },
  ],
}

export const router = createRouter(routerOptions)
