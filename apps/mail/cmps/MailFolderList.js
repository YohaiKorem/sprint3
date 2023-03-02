import { eventBusService } from '../../../services/event-bus.service.js'
import { mailService } from '../services/mail.service.js'

export default {
  name: 'MailFolderList',
  template: `
  <h1>{{folder}}</h1>
      <ul class="clean-list folder-list">
        <li @click="setFolder('inbox')">Inbox<img class="icon" src="assets/img/mailImg/icons/inbox.png"></li> 
        <span>{{unreadMailsCount}}</span>
        <li @click="setFolder('trash')">Trash<img class="icon" src="assets/img/mailImg/icons/trash.png"></li> 
        <li @click="setFolder('sent')">Sent<img class="icon" src="assets/img/mailImg/icons/sent.png"></li> 
        <li @click="setFolder('important')">Important<img class="icon" src="assets/img/mailImg/icons/important.png"></li> 
        <li @click="setFolder('spam')">Spam<img class="spam-icon" src="assets/img/mailImg/icons/spam.png" alt=""> </li>
        <li @click="setFolder('drafts')">Drafts<img class="icon" src="assets/img/mailImg/icons/draft.png"></li>
        <li @click="setFolder('starred')">Starred<img class="icon" src="assets/img/mailImg/icons/star.png"> </li>
      </ul>
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
