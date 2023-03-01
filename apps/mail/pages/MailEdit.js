import { mailService } from '../services/mail.service.js'
export default {
  name: 'MailEdit',
  template: `
  <section class="mail-edit">

<div class="mail-heading">
  <h2>from: {{mail.from}}</h2>
<h2>sent at: {{mail.sentAt}}</h2>
  <small>to: {{mail.to}}</small>
</div>    
    <p>{{mail.body}}</p>
  </section>

  `,
  data() {
    return {
      mail: {},
    }
  },
  created() {
    this.loadMail()
  },
  computed: {
    mailId() {
      return this.$route.params.mailId
    },
  },
  methods: {
    loadMail() {
      mailService.get(this.mailId).then((mail) => (this.mail = mail))
    },
  },
}
