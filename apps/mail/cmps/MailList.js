import MailPreview from './MailPreview.js'
export default {
  name: 'MailList',
  props: ['mails'],
  template: `<section class="mail-list">
    <ul class="clean-list flex flex-column">
      
        <li v-for="mail in mails" :key="mail.id" class="mail-item ">
           
        <MailPreview :mail="mail"/>
        
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
  },
}
