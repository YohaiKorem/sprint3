import MailPreview from './MailPreview.js'
import LongTxt from '../../../cmps/LongTxt.js'
export default {
  name: 'MailList',
  props: ['mails'],
  template: `<section class="mail-list">
    <ul class="clean-list">
        <li v-for="mail in mails" :key="mail.id">
            <button @click="mail.folder='trash'">Move to trash</button>
        <MailPreview :mail="mail"/>
        <LongTxt :txt="mail.body"/>
        </li>
    </ul>
  </section>`,
  methods: {
    // moveToTrash(mailId) {
    //   this.$emit('moveToTrash', mailId)
    // },
  },
  components: {
    MailPreview,
    LongTxt,
  },
}
