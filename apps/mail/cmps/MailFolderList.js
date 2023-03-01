export default {
  name: 'MailFolderList',
  template: `
      <button @click="sendMail" class="compose-mail">Send an Email</button> 
      <ul class="clean-list folder-list">
        <li @click="setTrash">Trash folder</li> 
        <li @click="setImportant">Important folder</li> 
        <li @click="setSpam">Spam folder</li>
        <li @click="setDrafts">Draft folder</li>
      </ul>
    `,
  methods: {
    sendMail() {
      console.log('mail sent')
    },
    setTrash() {
      console.log('trash')
    },
    setSpam() {
      console.log('spam')
    },
  },
}
