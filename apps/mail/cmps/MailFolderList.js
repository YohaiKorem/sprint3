import { eventBusService } from '../../../services/event-bus.service.js'
import { mailService } from '../services/mail.service.js'

export default {
  name: 'MailFolderList',
  template: `
  <h1>{{folder}}</h1>
      <ul class="clean-list folder-list">
        <li @click="setFolder('inbox')">Inbox</li> <span>{{unreadMailsCount}}</span>
        <li @click="setFolder('trash')">Trash</li> 
        <li @click="setFolder('sent')">Sent</li> 
        <li @click="setFolder('important')">Important</li> 
        <li @click="setFolder('spam')">Spam</li>
        <li @click="setFolder('drafts')">Drafts</li>
        <li @click="setFolder('starred')">Starred</li>
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
