import { mailService } from '../services/mail.service.js'

export default {
  name: 'MailPreview',
  props: ['mail'],
  template: `
  <div class="btns-container">
<button>★</button>
    <button @click="markAsRead">Mark as {{(isRead === 'read') ? 'unread' : 'read'}}</button>
    <button @click="mail.folder='trash'" class="btn-remove"> <img src="assets/img/mailImg/icons/trash.png" class="icon trash-icon"> </button>
  </div>
  <RouterLink class="mail-preview" :to="'mail/' + mail.id">
        <article :class="isRead + 'mail-preview'">
        <!-- <span class="mail-labels">{{mail.labels}}</span>   -->
         <h2 class="mail-from">from: {{ mail.from }}</h2> <span class="mail-timestamp">sent at: {{mail.sentAt}}</span>
            <!-- <h3 class="mail-to">to: {{ mail.to }}</h3> -->
            <!-- <p class="mail-cotent">{{mail.body}}</p> -->

        </article>
        </RouterLink>
    `,

  methods: {
    markAsRead() {
      this.mail.isRead = !this.mail.isRead
      mailService.save(this.mail)
    },
  },
  computed: {
    isRead() {
      if (this.mail.isRead) return 'read'
      else return 'unread'
    },
  },
}
