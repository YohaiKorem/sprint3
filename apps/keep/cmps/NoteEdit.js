import { noteService } from '../services/note.service.js'
import { eventBusService } from '../../../services/event-bus.service.js'
import NoteTools from './NoteTools.js'

export default {
  name: 'NoteEdit',
  template: `
      <section class="note-edit" v-if="note">
        <div class="modal" :style="styleNote">
          <iframe v-if="note.info.videoUrl" width="650" height="350" :src="embedUrl" />
          <img v-if="note.info.imgUrl" :src="note.info.imgUrl" />
          <div class="editable-div" ref="title" contenteditable="true" @input="changeTitle">{{note.info.title}}</div>
          <ul ref="list" v-if="note.info.list">
            <li :class="{ done: item.isDone }" v-for="item in note.info.list" @click="TodoDone(item)">{{item.txt}}</li>
          </ul>
          <div class="editable-div" ref="txt" contenteditable="true" @input="changeTxt" v-if="!note.info.list">{{note.info.txt}}</div>
          <div class="tool-bar flex align-center justify-between">
            <NoteTools :note="note" v-if="note" @remove="removeNote" />
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
      showColorPicker: false,
    }
  },

  methods: {
    removeNote() {
      eventBusService.emit('removeNote', this.note.id)
      this.$router.push({ name: 'keep' })
    },

    TodoDone(item) {
      item.isDone = !item.isDone
      eventBusService.emit('updateNote', this.note)
    },

    changeTitle() {
      this.note.info.title = this.$refs.title.innerText
      eventBusService.emit('updateNote', this.note)
    },

    changeTxt() {
      this.note.info.txt = this.$refs.txt.innerText
      eventBusService.emit('updateNote', this.note)
    },
  },

  computed: {
    styleNote() {
      return {
        backgroundColor: this.note.style.backgroundColor
      }
    },
    embedUrl() {
      const videoId = this.note.info.videoUrl.split('v=')[1]
      return `https://www.youtube.com/embed/${videoId}`
    }
  },

  created() {
    const { noteId } = this.$route.params
    noteService.get(noteId).then((note) => {
      (this.note = note)
    })
  },

  components: {
    NoteTools,
  },
}