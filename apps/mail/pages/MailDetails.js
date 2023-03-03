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
    <h1 class="details-mail-subject">{{mail.subject}}
       <span class="details-mail-folder">{{mail.folder}}</span>
      </h1> 
    <h4 class="details-mail-from">{{mail.from}}    <div class="details-mail-to">to {{mail.to}}</div>
</h4>
    <p class="details-mail-body">{{mail.body}}</p>
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
