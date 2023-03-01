import { noteService } from '../services/note.service.js'
import { eventBusService } from '../../../services/event-bus.service.js'

export default {
  name: 'NoteEdit',
  template: `
      <section class="note-edit" v-if="note">
        <div class="modal" :style="styleNote">
          <h2>Edit Note:</h2>
          <img v-if="note.info.url" src="note.info.url" />
          <div class="editable-div" ref="title" contenteditable="true" @input="changeTitle">{{note.info.title}}</div>
          <div class="editable-div" ref="txt" contenteditable="true" @input="changeTxt">{{note.info.txt}}</div>
          <div class="tool-bar flex align-center justify-between">
            <div class="tool-box flex justify-center">
              <div class="btn-bg-color" @click.prevent="choose-color"></div>
              <div class="btn-remove" @click.prevent="removeNote"></div>
            </div>
            <RouterLink :to="'/keep'">close</RouterLink>
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

    changeTitle() {
      this.note.info.title = this.$refs.title.innerText
      eventBusService.emit('updateNote', this.note)
    },

    changeTxt() {
      this.note.info.txt = this.$refs.txt.innerText
      eventBusService.emit('updateNote', this.note)
    },

    removeNote() {
      eventBusService.emit('removeNote', this.note.id)
      this.$router.push({ name: 'keep' })
    }
  },

  computed: {
    styleNote() {
      console.log(this.note.style.backgroundColor)
      return {
        backgroundColor: this.note.style.backgroundColor
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
  },
}