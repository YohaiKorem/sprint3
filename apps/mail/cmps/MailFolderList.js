export default {
  name: 'MailFolderList',
  template: `
      <ul class="clean-list folder-list">
        <li @click="setTrash">Trash</li> 
        <li @click="setSent">Sent</li> 
        <li @click="setImportant">Important</li> 
        <li @click="setSpam">Spam</li>
        <li @click="setDrafts">Drafts</li>
        <li @click="setStarred">Starred</li>
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
