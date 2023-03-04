import { mailService } from '../services/mail.service.js'
import { utilService } from '../../../services/util.service.js'
import MailList from '../cmps/MailList.js'
import MailFilter from '../cmps/MailFilter.js'
import MailFolderList from '../cmps/MailFolderList.js'
import {
  eventBusService,
  showErrorMsg,
  showSuccessMsg,
} from '../../../services/event-bus.service.js'
export default {
  name: 'MailIndex',
  template: `
<section class="mail-index">
  <RouterLink class="compose-mail-link" :to="'/mail/edit' ">
  <button  
  class="compose-mail">
   <img class="icon pencil-icon" src="assets/img/mailImg/icons/pencil.png">
   Compose</button>  
     </RouterLink>
     
     <!-- <div class="input-heading-container full">
<div class="btns-container">
  <h1>Your inbox</h1>
  <button @click="test">test</button>
  <button @click="clearStorage">clear</button>
</div> -->

<section v-if="!hasMails"  class="no-mails-modal">There are no mails in the {{folder}} folder</section>



<!-- </div> -->
  <MailFolderList @setFolder="setFolder"/>
    <MailFilter  @filter="setCriteria"/>
    <!-- <button @click="removeForEver" class="btn-delete-forever">delete forever</button> -->
    <MailList :mails="filteredMails"/> 
        <div @click="toggleMenu" v-if="isMenuOpen" class="modal-backdrop"></div>
      </section>
      <router-view />
`,
  data() {
    return {
      mails: [],
      criteria: {},
      folder: 'inbox',
      unreadMailsCount: 0,
      isMenuOpen: false,
      hasMails: null,
    }
  },
  created() {
    this.render(),
      eventBusService.on('update', (mail) => {
        // console.log(this.folder)
        mailService.save(mail).then(() => this.render())
      })
    eventBusService.on('toggleMenu', (isMenuOpen) => {
      this.isMenuOpen = isMenuOpen
    })
  },
  methods: {
    clearStorage() {
      utilService.clearLocalStorage()
    },
    removeMail(mailId) {
      mailService
        .remove(mailId)
        .then(() => {
          const idx = this.mails.findIndex((mail) => mail.id === mailId)
          this.mails.splice(idx, 1)

          showSuccessMsg('Mail removed')
        })
        .catch((err) => {
          showErrorMsg('failed to remove mail')
        })
    },
    removeForEver() {
      let selectedMails = this.mails.filter((mail) => mail.isSelected)
      selectedMails.forEach((selectedMail) => {
        this.removeMail(selectedMail.id)
      })
      // mailService.remove(selectedMail.id).then(() => {
      //   const idxs = []
      //   idxs.push(this.mails.findIndex((mail) => mail.id === selectedMail.id))
      //   idxs.forEach((idx) => this.mails.splice(idx, 1))
      // })
    },
    setFolder(folder) {
      this.folder = folder
      this.render()
    },
    setCriteria(criteria) {
      this.criteria = criteria
    },
    render() {
      mailService.query(this.folder).then((mails) => {
        !mails.length ? (this.hasMails = null) : (this.hasMails = true)
        let count = 0
        mails.forEach((mail) => {
          if (!mail.isRead) count++
        })

        this.unreadMailsCount = count
        eventBusService.emit('changeReadCount', this.unreadMailsCount)
        this.mails = mails
      })
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
      eventBusService.emit('toggleMenu', this.isMenuOpen)
    },
  },
  computed: {
    filteredMails() {
      const regex = new RegExp(this.criteria.txt, 'i')

      return this.mails.filter((mail) => regex.test(mail.body))
    },
  },
  watch: {
    unreadMailsCount() {
      let count = 0
      this.mails.forEach((mail) => {
        if (!mail.isRead) count++
      })
      return count
    },
  },

  components: {
    MailList,
    MailFilter,
    MailFolderList,
  },
}
