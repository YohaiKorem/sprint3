import { mailService } from '../services/mail.service.js'
import { utilService } from '../../../services/util.service.js'
import MailList from '../cmps/MailList.js'
export default {
  name: 'MailIndex',
  template: `
<section class="mail-index">
    <h1>Your inbox</h1>
    <button @click="clearStorage">clear</button>
    <RouterLink to="/mail/edit">Send an Email</RouterLink>
    <!-- <MailFilter @filter="setFilterBy"/>-->
    <MailList 
        :mails="mails" 
        @remove="removeMail" /> 
        
</section>
`,
  data() {
    return {
      mails: null,
      filterBy: null,
    }
  },
  methods: {
    clearStorage() {
      utilService.clearLocalStorage()
    },
    removeMail(mailId) {
      console.log('mail removed')
    },
  },
  created() {
    mailService.query().then((mails) => {
      this.mails = mails
    })
  },
  components: {
    MailList,
  },
}
