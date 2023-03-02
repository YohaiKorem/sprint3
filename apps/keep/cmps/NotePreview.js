import { eventBusService } from '../../../services/event-bus.service.js'
import NoteTools from './NoteTools.js'
import NoteTxt from './NoteTxt.js'
import NoteImg from './NoteImg.js'

export default {
  name: 'NotePreview',
  props: ['note'],
  template: `
    <RouterLink :to="'/keep/edit/' + note.id">
      <article class="note-preview" :style="styleNote">
        <component :is="note.type" :info="note.info" />
        <NoteTools :note="note" @remove="remove" @updateImgUrl="updateImgUrl"/>
      </article>
    </RouterLink>
  `,

  data() {
    return {
      showColorPicker: false,
    }
  },

  methods: {
    remove() {
      eventBusService.emit('removeNote', this.note.id)
    },
    updateImgUrl(url) {
      this.note.info.imgUrl = url
      eventBusService.emit('updateNote', this.note)
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
    NoteTools,
    NoteTxt,
    NoteImg,
  },

  emits: ['removeNote']
}