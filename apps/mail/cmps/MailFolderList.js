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
      <li @click="setFolder('sent')"><div class="inside-folder-item-container">Sent
        <img class="icon sent-icon" 
        src="assets/img/mailImg/icons/sent.png">
      </div>
    </li>
<li @click="setFolder('archive')">

<div class="inside-folder-item-container">Archive
  <img class="icon" src="assets/img/mailImg/icons/archive.svg"></div>
 </li> 
      <li @click="setFolder('important')">
        <div class="inside-folder-item-container">
          Important
          <svg class="important-icon icon"  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path class="important-icon" fill-rule="evenodd" clip-rule="evenodd" d="M15.5 5C16.17 5 16.77 5.33 17.13 5.84L21.5 12L17.13 18.16C16.77 18.67 16.17 19 15.5 19L4.5 18.99C3.4 18.99 2.5 18.1 2.5 17V7C2.5 5.9 3.4 5.01 4.5 5.01L15.5 5ZM4.5 17H15.5L19.05 12L15.5 7H4.5V17Z" fill="black"/>
</svg>
          <!-- <img class="icon" src="assets/img/mailImg/icons/important.svg"> -->
        </div>
      </li> 
      <li @click="setFolder('spam')"><div class="inside-folder-item-container">Spam<img class="spam-icon" src="assets/img/mailImg/icons/spam.svg" alt=""></div> </li>
      <li @click="setFolder('drafts')"><div class="inside-folder-item-container">Drafts<img class="icon" src="assets/img/mailImg/icons/draft.png"></div></li>
      <li @click="setFolder('starred')"><div class="inside-folder-item-container">Starred <div class="star-inside-folder-list">★</div></div> </li>
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
