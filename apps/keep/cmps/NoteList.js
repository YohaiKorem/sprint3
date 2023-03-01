import NotePreview from './NotePreview.js'

export default {
  props: ['notes'],
  template: `
        <section class="note-list">
            <ul>
                <li v-for="note in notes" :key="note.id">
                    <component :is="cmp.type" :info="cmp.info" @changeInfo="updateNote" />
                    <button class="btn-remove" @click="remove(note.id)">🗑</button>
                </li>
            </ul>
        </section>
    `,
  methods: {
    remove(noteId) {
      this.$emit('remove', noteId)
    },
  },
  components: {
    NotePreview,
  }
}