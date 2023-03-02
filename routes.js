import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'
// KEEP
import NoteIndex from './apps/keep/pages/NoteIndex.js'
import NoteEdit from './apps/keep/cmps/NoteEdit.js'

// MAIL
import MailIndex from './apps/mail/pages/MailIndex.js'
import MailEdit from './apps/mail/pages/MailEdit.js'
import MailDetails from './apps/mail/cmps/MailDetails.js'

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
      name: 'keep',
      children: [
        {
          path: '/keep/edit/:noteId',
          component: NoteEdit,
          props: true,
          name: 'note-edit',
        },
      ],
    },
    // {
    //    path: '/keep/trash',
    //    component: keepTrash,
    //    name: 'keep-trash'
    // },

    // MAIL PATHS
    {
      path: '/mail',
      component: MailIndex,
      name: 'mail',
      children: [
        {
          path: '/mail/edit/',
          component: MailEdit,
          props: true,
          name: 'mail-edit',
        },
        {
          path: '/mail/edit/:mailId?',
          component: MailEdit,
        },
      ],
    },
    //  {
    //    path: '/mail/:mailId',
    //    component: MailEdit,
    //  },
  ],
}

export const router = createRouter(routerOptions)
