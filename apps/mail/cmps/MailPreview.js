import { mailService } from '../services/mail.service.js'
import LongTxt from '../../../cmps/LongTxt.js'
import { eventBusService } from '../../../services/event-bus.service.js'

export default {
  name: 'MailPreview',
  props: ['mail'],
  template: `
    <article @mouseout="hideIcons" @mouseover="showIcons" :class="isRead + ' ' + isSelected + ' ' + isStarred + ' ' + isImportant + ' mail-preview'">
  <div class="btns-container">
    <input @change="selectMail(mail.isSelected)"  v-model="mail.isSelected" type="checkbox">
    <div @click="star" class="star-icon icon">★</div>
    <div @click="important" class="important-icon-container" ><img class="important-icon icon" src="assets/img/mailImg/icons/importantArrow.png">
</div>
    
  </div>
         <h2 class="mail-from">from: {{ mail.from }}</h2> 
         <p class="mail-body">{{mail.body}}</p>
         <div v-if="isHovered"  class="hidden-icons-container">
            <div @click="removeMail" class="btn-remove"> 
              <img src="assets/img/mailImg/icons/trash.png" class="icon trash-icon">
     </div>
     <div @click="markAsRead" class="btn-readUnread">
     <img :class="isRead +'-icon icon'" :src="'assets/img/mailImg/icons/'+isRead + '.png'">

     </div>
    
    
    </div>
         <span v-if="!this.isHovered" class="mail-timestamp">sent at: {{mail.sentAt}}</span>
        </article>
    `,
  data() {
    return {
      isHovered: null,
    }
  },
  methods: {
    markAsRead() {
      this.mail.isRead = !this.mail.isRead
      eventBusService.emit('update', this.mail)
      this.$emit('readUnread', this.mail.isRead)
    },
    star() {
      this.mail.isStarred = !this.mail.isStarred
      eventBusService.emit('update', this.mail)
    },
    important() {
      this.mail.isImportant = !this.mail.isImportant
      eventBusService.emit('update', this.mail)
    },
    selectMail(isSelected) {
      this.$emit('selectMail', isSelected)
      eventBusService.emit('update', this.mail)
    },
    removeMail() {
      this.mail.folder = 'trash'
      eventBusService.emit('update', this.mail)
    },
    showIcons() {
      this.isHovered = true
    },
    hideIcons() {
      this.isHovered = false
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
    isImportant() {
      if (this.mail.isImportant) return 'important'
      else return ''
    },
  },

  components: {
    LongTxt,
  },
}
