import { eventBusService } from '../../../services/event-bus.service.js'
import { mailService } from '../services/mail.service.js'

export default {
  name: 'MailFolderList',
  template: `
      <ul class="clean-list folder-list">
        <li @click="setFolder('inbox')">Inbox</li>
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
      mails: [],
    }
  },
  methods: {
    setFolder(folder) {
      let folderMails = this.mails.filter((mail) => {
        return mail.folder === folder
      })

      this.$emit('setFolder', folderMails)
    },
  },
  created() {
    mailService.query().then((mails) => {
      this.mails = mails
    })
    eventBusService.on('folderChange', () => {
      mailService.query().then((mails) => {
        this.mails = mails
      })
    })
  },
  mounted() {
    this.setFolder('inbox')
  },
}
