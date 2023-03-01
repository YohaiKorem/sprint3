export default {
  name: 'NoteFilter',
  template: `
      <section class="note-filter">
          <input 
              v-model="filterBy.title"
              @input="filter" 
              placeholder="Search"
              type="text" />
      </section>
  `,
  data() {
    return {
      filterBy: { title: '' }
    }
  },
  methods: {
    filter() {
      this.$emit('filter', this.filterBy)
    }
  }
}