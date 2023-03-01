import NotePreview from './NotePreview.js'


export default {
  name: 'NodeList',
  props: ['notes'],
  template: `
        <section class="note-list">
          <div v-for="note in notes" :key="note.id">
            <NotePreview :note="note" />
          </div>
        </section>
    `,
  methods: {
    remove(noteId) {
      this.$emit('remove', noteId)
    },

    updateInfo(noteId) {
      this.$emit('updateNote', noteId)
    },
  },
  components: {
    NotePreview,
  }
}