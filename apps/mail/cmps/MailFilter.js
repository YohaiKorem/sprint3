export default {
  name: 'MailFIlter',
  template: `
    <section class="mail-filter">
        <input 
        
            v-model="criteria.txt"
            placeholder="Search"
            type="text" >  <button  class="hidden-nav-btn" @click="openMenu()">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
            </button>

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
  methods: {
    openMenu() {},
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
