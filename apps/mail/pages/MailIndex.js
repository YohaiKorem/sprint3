import { mailService } from '../services/mail.service.js'
import { utilService } from '../../../services/util.service.js'
import MailList from '../cmps/MailList.js'
import MailFilter from '../cmps/MailFilter.js'
import {
  showErrorMsg,
  showSuccessMsg,
} from '../../../services/event-bus.service.js'
export default {
  name: 'MailIndex',
  template: `
<section class="mail-index">
    <h1>Your inbox</h1>
    <button @click="test">test</button>
    <button @click="clearStorage">clear</button>
    <RouterLink to="/mail/edit">Send an Email</RouterLink>
    <MailFilter @filter="setCriteria"/>
    <MailList 
        :mails="filteredMails" 
        @remove="removeMail" /> 
        
</section>
`,
  data() {
    return {
      mails: [],
      criteria: {},
    }
  },
  created() {
    mailService.query().then((mails) => {
      this.mails = mails
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
    setCriteria(criteria) {
      this.criteria = criteria
      console.log(this.criteria)
    },
    test() {
      console.log(this.mails)
    },
  },
  computed: {
    filteredMails() {
      if (this.criteria.isTrash) {
        return this.mails.filter((mail) => mail.folder === 'trash')
      }

      const regex = new RegExp(this.criteria.txt, 'i')

      return this.mails.filter((mail) => regex.test(mail.body))
      //   mailService.query(this.criteria).then((mails) => console.log(mails))
    },
  },

  components: {
    MailList,
    MailFilter,
  },
}
