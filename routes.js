import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'
// KEEP
import NoteIndex from './apps/keep/pages/NoteIndex.js'
import NoteDetails from './apps/keep/pages/NoteDetails.js'

// MAIL
import MailIndex from './apps/mail/pages/MailIndex.js'
import MailEdit from './apps/mail/pages/MailEdit.js'
import MailDetails from './apps/mail/cmps/MailDetails.js'
import TrashPreview from './apps/mail/cmps/TrashPreview.js'
import SpamPreview from './apps/mail/cmps/SpamPreview.js'

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
      component: MailEdit,
    },
    {
      path: '/mail/edit/:mailId?',
      component: MailEdit,
    },
    {
      path: '/mail/trash',
      component: TrashPreview,
    },
    {
      path: '/mail/spam',
      component: SpamPreview,
    },
  ],
}

export const router = createRouter(routerOptions)
