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
    <div class="icon">X</div>
  </div>
</header>
<form class="mail-form">
  <div class="mail-to-container">
    <!-- <label for="mail-to-input">To</label> -->
    <input type="text" name="mail-to-input" placeholder="Recipients">
  </div>
  <div class="mail-subject-container">
    <!-- <label for="mail-subject-input"></label> -->
    <input type="text" name="mail-subject-input" placeholder="Subject">
  </div>
  <textarea name="mail-body"  cols="30" rows="10"></textarea>
</form>    
  </section>

  `,
  data() {
    return {
      mail: {},
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
    test() {
      console.log(this.mail)
    },
    loadMail() {
      mailService.get(this.mailId).then((mail) => (this.mail = mail))
    },
  },
}
