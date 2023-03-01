export default {
  name: 'MailFIlter',
  template: `
    <section class="mail-filter">
        <input 
            v-model="criteria.txt"
            placeholder="Search"
            type="text" />
       <button @click="criteria.isTrash=true">Trash Folder</button>
    </section>
`,
  data() {
    return {
      criteria: {
        status: 'inbox/sent/trash/draft',
        txt: '',
        isRead: null,
        isStared: null,
        isTrash: null,
      },
    }
  },
  watch: {
    criteria: {
      handler() {
        // console.log('criteria changed', this.criteria)
        this.$emit('filter', this.criteria)
      },
      deep: true,
    },
  },
}
