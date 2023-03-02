import {
  showErrorMsg,
  showSuccessMsg,
} from '../../../services/event-bus.service.js'
import { utilService } from '../../../services/util.service.js'
import { mailService } from '../services/mail.service.js'
export default {
  name: 'MailEdit',
  template: `
  <section class="mail-edit">
<!-- <button @click="test">test</button> -->
<header class="mail-header">
  <h2>New Message</h2>
  <div class="btns-container-mail">

    <div class="icon">_</div>
    <div class="icon">↕</div>
    <div @click="closeMail" class="icon close-mail">X</div>
  </div>
</header>
<form @submit.prevent="send" class="mail-form">
  <div class="mail-to-container">
    <!-- <label for="mail-to-input">To</label> -->
    <input v-model="this.mail.to" type="text" name="mail-to-input" placeholder="Recipients">
  </div>
  <div class="mail-subject-container">
    <!-- <label for="mail-subject-input"></label> -->
    <input v-model="this.mail.subject" type="text" name="mail-subject-input" placeholder="Subject">
  </div>
  <textarea v-model="this.mail.body" name="mail-body"  cols="30" rows="10"></textarea>
<button class="send-mail-btn">Send</button>
</form>    
  </section>

  `,
  data() {
    return {
      mail: {},
      saveInterval: setInterval(this.saveDraft, 3000),
    }
  },
  created() {
    const { mailId } = this.$route.params
    if (!mailId) {
      let newMail = mailService.getEmptyMail()
      mailService.save(newMail).then((mail) => (this.mail = mail))
      return
    }
    mailService.get(mailId).then((mail) => {
      this.mail = mail
    })
  },
  computed: {
    mailId() {
      return this.$route.params.mailId
    },
  },
  methods: {
    send() {
      this.mail.from = mailService.loggedinUser.email
      this.mail.folder = 'sent'
      this.mail.sentAt = Date.now()
      mailService
        .save(this.mail)
        .then((savedMail) => {
          showSuccessMsg('eMail Sent')
          this.$router.push('/mail')
        })
        .catch((err) => {
          showErrorMsg('Failed to send Email')
        })
    },
    saveDraft() {
      this.mail.from = mailService.loggedinUser.email
      this.mail.folder = 'draft'
      mailService.save(this.mail)
    },
    loadMail() {
      mailService.get(this.mailId).then((mail) => (this.mail = mail))
    },
    closeMail() {
      this.$router.push('/mail')
    },
  },
  unmounted() {
    clearInterval(this.saveInterval)
  },
}
