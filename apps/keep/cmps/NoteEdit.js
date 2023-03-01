export default {
  name: 'NoteEdit',
  props: ['note'],
  template: `
      <section class="note-edit">
        <div class=modal>
          <h2>edit note</h2>
        </div>
        
        <RouterLink :to="'/keep'">
        <div class="modal-overlay"></div>
        </RouterLink>
      </section>
  `,

  data() {
    return {
    }
  },

  methods: {
    remove() {
      this.$emit('removeNote', this.note.id)
    }
  },

  computed: {
    styleNote() {
      return {
        backgroundColor: this.note.style.backgroundColor,
      }
    }
  },

  components: {
  },
}