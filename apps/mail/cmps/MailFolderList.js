import { eventBusService } from '../../../services/event-bus.service.js'
import { mailService } from '../services/mail.service.js'

export default {
  name: 'MailFolderList',
  template: `
  <aside class="mail-folder-list">
    <h1>{{folder}}</h1>
    <ul class="clean-list folder-list">
      <li @click="setFolder('inbox')"><div class="inside-folder-item-container">Inbox<img class="icon" src="assets/img/mailImg/icons/inbox.png"></div> </li> 
      <span>{{unreadMailsCount}}</span>
      <li @click="setFolder('trash')"><div class="inside-folder-item-container">Trash<img class="icon" src="assets/img/mailImg/icons/trash.png"></div> </li> 
      <li @click="setFolder('sent')"><div class="inside-folder-item-container">Sent<img class="icon" src="assets/img/mailImg/icons/sent.png"></div></li> 
      <li @click="setFolder('important')"><div class="inside-folder-item-container">Important<img class="icon" src="assets/img/mailImg/icons/important.svg"></div></li> 
      <li @click="setFolder('spam')"><div class="inside-folder-item-container">Spam<img class="spam-icon" src="assets/img/mailImg/icons/spam.png" alt=""></div> </li>
      <li @click="setFolder('drafts')"><div class="inside-folder-item-container">Drafts<img class="icon" src="assets/img/mailImg/icons/draft.png"></div></li>
      <li @click="setFolder('starred')"><div class="inside-folder-item-container">Starred<img class="icon" src="assets/img/mailImg/icons/star.png"></div> </li>
    </ul>
  </aside>
    `,
  data() {
    return {
      folder: '',
      unreadMailsCount: null,
    }
  },
  methods: {
    setFolder(folder) {
      this.folder = folder
      this.$emit('setFolder', folder)
    },
  },
  // created() {
  //   this.setFolder('inbox')
  // },
}
