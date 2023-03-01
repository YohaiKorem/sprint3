import { noteService } from '../services/note.service.js'
import NoteTxt from './NoteTxt.js'

export default {
  name: 'NoteEdit',
  template: `
      <section class="note-edit" v-if="note" :style="styleNote">
        <div class=modal>
          <h2>Edit Note:</h2>
          <img v-if="note.info.url" src="note.info.url" />
          <div contenteditable="true" @input="note.info.title">{{note.info.title}}</div>
          <div contenteditable="true" @input="note.info.txt">{{note.info.txt}}</div>
          <div class="tool-box flex justify-center">
          <div class="btn-bg-color" @click.prevent="choose-color"></div>
          <div class="btn-remove" @click.prevent="remove"></div>
        </div>
        </div>
        <RouterLink :to="'/keep'">
        <div class="modal-overlay"></div>
        </RouterLink>
      </section>
  `,

  data() {
    return {
      note: null,
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
        backgroundColor: this.note.style.backgroundColor || 'white',
      }
    }
  },

  created() {
    const { noteId } = this.$route.params
    noteService.get(noteId).then((note) => {
      (this.note = note)
    })
  },

  components: {
    NoteTxt,
  },
}