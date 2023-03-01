import { mailService } from '../services/mail.service.js'
import MailPreview from './MailPreview.js'
export default {
  name: 'MailList',
  props: ['mails'],
  template: `<section class="mail-list">
    <ul class="clean-list flex flex-column">
      
        <li v-for="mail in mails" :key="mail.id" :class="isRead ? 'read' + ' mail-item' : 'unread' + ' mail-item' ">
           
        <MailPreview @readUnread="readUnread" :mail="mail"/>
        
        </li>
    </ul>
  </section>`,
  data() {
    return { isRead: false }
  },
  methods: {
    readUnread(isRead) {
      this.isRead = isRead
    },
  },
  components: {
    MailPreview,
  },
}
