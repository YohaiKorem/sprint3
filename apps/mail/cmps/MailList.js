import { mailService } from '../services/mail.service.js'
import MailPreview from './MailPreview.js'
export default {
  name: 'MailList',
  props: ['mails'],
  template: `<section class="mail-list">
    <ul class="clean-list flex flex-column">
      
        <li v-for="mail in mails" :key="mail.id" class="mail-item">
           
        <MailPreview @selectMail="selectMail" @readUnread="readUnread" :mail="mail"/>
        
        </li>
    </ul>
  </section>`,
  data() {
    return {
      isRead: false,
      isSelected: false,
    }
  },
  methods: {
    readUnread(isRead) {
      this.isRead = isRead
    },
    selectMail(isSelected) {
      this.isSelected = isSelected
    },
  },
  components: {
    MailPreview,
  },
}
