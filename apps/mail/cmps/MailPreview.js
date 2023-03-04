import { mailService } from '../services/mail.service.js'
import LongTxt from '../../../cmps/LongTxt.js'
import { eventBusService } from '../../../services/event-bus.service.js'
import { utilService } from '../../../services/util.service.js'
export default {
  name: 'MailPreview',
  props: ['mail'],
  template: `
    <article @click.self="editMail" @mouseout="hideIcons" @mouseover="showIcons" :class="isRead + ' ' + isSelected + ' ' + isStarred + ' ' + isImportant + ' mail-preview'">
  <div class="btns-container">
    <input @change.stop="selectMail(mail.isSelected)"  v-model="mail.isSelected" type="checkbox">
    <div @click="star" class="star-icon icon">★</div>
    <div @click="important" class="important-icon-container" >
    <img class="icon inportant-icon" src="assets/img/mailImg/icons/important.svg" alt="">
</div>
    
  </div>
         <h2 class="mail-from">from: {{ mail.from }}</h2> 
         <p class="mail-body">{{mail.body}}</p>
         <div v-if="isHovered"   class="hidden-icons-container">
          <div @click="archive" class="archive-btn">
          <img src="assets/img/mailImg/icons/archive.svg" class="icon trash-icon">
          </div>
         
         <div @click="removeMail" class="btn-remove"> 
              <img src="assets/img/mailImg/icons/trash.png" class="icon trash-icon">
     </div>
     <div @click="markAsRead" class="btn-readUnread">
     <img :class="isRead +'-icon icon'" :src="'assets/img/mailImg/icons/'+isRead + '.png'">
     </div>
    </div>
         <span v-if="!this.isHovered" class="mail-timestamp">   
       {{ this.date}}
        </span>

        </article>
    `,
  data() {
    return {
      isHovered: null,
    }
  },
  methods: {
    clear() {
      utilService.clearLocalStorage()
    },
    time() {
      let date = new Date(this.mail.sentAt)
      let month = date.getMonth()
      let day = date.getUTCDate()
      const monthName = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]
      console.log(monthName[month], day)
    },
    editMail() {
      this.$router.push(`/mail/edit/${this.mail.id}`)
    },
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
    archive() {
      this.mail.folder = 'archive'
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
    date() {
      let date = new Date(this.mail.sentAt)
      let month = date.getMonth()
      let day = date.getUTCDate()
      const monthName = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]
      return `${monthName[month]} ${day}`
    },
  },

  components: {
    LongTxt,
  },
}
