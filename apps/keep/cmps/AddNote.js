import { noteService } from '../services/note.service.js'

export default {
  name: 'AddNote',
  template: `
      <article class="add-note-container">
        <form @submit.prevent="save">
          <input type="text" v-model="note.info.title" placeholder="Title" />
          <input type="text" v-model="note.info.txt" placeholder="Take a note..." />
          <button>save</button>
        </form>
      </article>
  `,
  data() {
    return {
      type: 'NoteTxt',
      note: noteService.getEmptyNote(this.type, undefined),
    }
  },
  methods: {
    save() {
      this.note = noteService.getEmptyNote()
      this.$emit('saveNote', this.note)
      this.note = noteService.getEmptyNote()
    }
  },
  emits: ['saveNote'],
}