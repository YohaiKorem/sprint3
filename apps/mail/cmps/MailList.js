import MailPreview from './MailPreview.js'
import LongTxt from '../../../cmps/LongTxt.js'
export default {
  name: 'MailList',
  props: ['mails'],
  template: `<section class="mail-list">
    <ul class="clean-list flex flex-column">
        <li v-for="mail in mails" :key="mail.id" class="mail-item ">
           
        <MailPreview class="MailPreview" :mail="mail"/>
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
