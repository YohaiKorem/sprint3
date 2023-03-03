import { mailService } from '../services/mail.service.js'
import MailFolderList from '../cmps/MailFolderList.js'
import MailFilter from '../cmps/MailFilter.js'
export default {
  name: 'MailDetails',
  template: `
  <section class="mail-details">
    <MailFilter/>
    <RouterLink :to="'/mail/edit' ">
  <button  
  class="compose-mail">
   <img class="icon pencil-icon" src="assets/img/mailImg/icons/pencil.png">
   Compose</button>  
     </RouterLink>

  <MailFolderList/>
  <div class="mail-container">
    <h1>{{mail.subject}}</h1> <span>{{mail.folder}}</span>
    <h3>{{mail.from}}</h3> <span>{{mail.to}}</span>
    <p>{{mail.body}}</p>
    <div class="btns-container">
      <button class="btn-reply">Reply</button>
      <button class="btn-forward">Forward</button>
    </div>
  </div>
  </section>
  `,
  data() {
    return {
      mail: {},
    }
  },
  created() {
    const { mailId } = this.$route.params

    mailService.get(mailId).then((mail) => {
      this.mail = mail
    })
  },
  computed: {
    mailId() {
      return this.$route.params.mailId
    },
  },
  components: {
    MailFolderList,
    MailFilter,
  },
}
