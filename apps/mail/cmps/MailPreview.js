import { mailService } from '../services/mail.service.js'
import LongTxt from '../../../cmps/LongTxt.js'

export default {
  name: 'MailPreview',
  props: ['mail'],
  template: `
    <article :class="isRead + ' ' + isSelected + ' ' + isStarred + ' mail-preview'">
  <div class="btns-container">
    <input @change="selectMail(mail.isSelected)"  v-model="mail.isSelected" type="checkbox">
    <!-- <div @click="markAsRead">Mark as {{(isRead === 'read') ? 'unread' : 'read'}}</div> -->
    <div @click="star" class="star-icon">★</div>
    <div @click="mail.folder='trash'" class="btn-remove"> <img src="assets/img/mailImg/icons/trash.png" class="icon trash-icon"> </div>
  </div>
  <!-- <RouterLink class="mail-preview" :to="'mail/' + mail.id">        </RouterLink> -->

         <h2 class="mail-from">from: {{ mail.from }}</h2> 
         <!-- <LongTxt :txt="mail.body"/> -->
         <p class="mail-body">{{mail.body}}</p>
         <span class="mail-timestamp">sent at: {{mail.sentAt}}</span>
        </article>
    `,

  methods: {
    markAsRead() {
      this.mail.isRead = !this.mail.isRead
      mailService.save(this.mail)
      this.$emit('readUnread', this.mail.isRead)
    },
    star() {
      this.mail.isStarred = !this.mail.isStarred
      mailService.save(this.mail)
    },
    selectMail(isSelected) {
      this.$emit('selectMail', isSelected)
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
    isSelected() {
      if (this.mail.isSelected) return 'selected'
      else return ''
    },
  },

  components: {
    LongTxt,
  },
}
