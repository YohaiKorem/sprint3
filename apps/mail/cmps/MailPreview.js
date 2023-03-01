import { mailService } from '../services/mail.service.js'
import LongTxt from '../../../cmps/LongTxt.js'

export default {
  name: 'MailPreview',
  props: ['mail'],
  template: `
    <article :class="isRead + ' mail-preview'">
  <div class="btns-container">
    <div @click="markAsRead">Mark as {{(isRead === 'read') ? 'unread' : 'read'}}</div>
    <div @click="star">★</div>
    <div @click="mail.folder='trash'" class="btn-remove"> <img src="assets/img/mailImg/icons/trash.png" class="icon trash-icon"> </div>
  </div>
  <!-- <RouterLink class="mail-preview" :to="'mail/' + mail.id">        </RouterLink> -->

         <h2 class="mail-from">from: {{ mail.from }}</h2> 
         <LongTxt :txt="mail.body"/>
         <span class="mail-timestamp">sent at: {{mail.sentAt}}</span>
        </article>
    `,

  methods: {
    markAsRead() {
      this.mail.isRead = !this.mail.isRead
      mailService.save(this.mail)
    },
    star() {
      this.mail.isStarred = !this.mail.isStarred
      mailService.save(this.mail)
    },
  },
  computed: {
    isRead() {
      if (this.mail.isRead) return 'read'
      else return 'unread'
    },
    isStarred() {
      if (this.mail.isStarred) return 'starred'
      else return ''
    },
  },
  components: {
    LongTxt,
  },
}
