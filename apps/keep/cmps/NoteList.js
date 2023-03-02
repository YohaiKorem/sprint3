import NotePreview from './NotePreview.js'


export default {
  name: 'NodeList',
  props: ['notes'],
  template: `
        <section class="note-list">
          <h2 v-show="getOtherNotes.length && getPinnedNotes.length">Pinned</h2>
          <section class="pinned-notes">
            <div v-for="note in getPinnedNotes" :key="note.id" >
              <NotePreview :note="note" @removeNote="remove" />
            </div>
          </section>

          <h2 v-show="getOtherNotes.length && getPinnedNotes.length">Others</h2>
          <section class="other-notes">
            <div v-for="note in getOtherNotes" :key="note.id">
              <NotePreview :note="note" @removeNote="remove" />
            </div>
          </section>
        </section>
    `,

  methods: {
    remove(noteId) {
      this.$emit('removeNote', noteId)
    },

    updateInfo(noteId) {
      this.$emit('updateNote', noteId)
    },
  },

  computed: {
    getPinnedNotes() {
      return this.notes.filter(note => note.isPinned)
    },

    getOtherNotes() {
      console.log('notes in list:', this.notes)
      return this.notes.filter(note => !note.isPinned)
    }
  },

  components: {
    NotePreview,
  },

  emits: ['saveNote'],
}