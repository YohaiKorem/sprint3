import MailPreview from './MailPreview.js'

export default {
  name: 'MailList',
  props: ['mails'],
  template: `<section class="mail-list">
    <ul class="clean-list">
        <li v-for="mail in mails" :key="mail.id">
        <MailPreview :mail="mail"/>
        </li>
    </ul>
  </section>`,
  components: {
    MailPreview,
  },
}
