import { eventBusService } from '../../../services/event-bus.service.js'
import ColorPicker from './ColorPicker.js'
import NoteTxt from './NoteTxt.js'

export default {
  name: 'NotePreview',
  props: ['note'],
  template: `
    <RouterLink :to="'/keep/edit/' + note.id">
      <article class="note-preview" :style="styleNote">
        <component :is="note.type" :info="note.info" />
        <div class="tool-box flex justify-center">
          <div class="item btn-bg-color" title="background color" @click.stop.prevent="toggleColorPicker"></div>
          <ColorPicker ref="colorPicker" :note="note" @updateColor="updateColor" v-show="showColorPicker"/>
          <div class="item btn-remove" title="remove" @click.prevent="remove"></div>
        </div>
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
      this.$emit('removeNote', this.note.id)
    },

    updateColor(color) {
      this.note.style.backgroundColor = color
      eventBusService.emit('updateNote', this.note)
    },

    toggleColorPicker() {
      console.log('toggling bgc picker')
      this.showColorPicker = !this.showColorPicker
    },

    closeColorPicker(event) {
      if (this.showColorPicker && !this.$refs.colorPicker.$el.contains(event.target)) {
        this.showColorPicker = false
      }
    },

    //       async getImgUrl(ev) {
    //     const url = await noteService.createImg(ev)
    //     this.update('imgUrl', url)
    // },
  },

  computed: {
    styleNote() {
      return {
        backgroundColor: this.note.style.backgroundColor,
      }
    }
  },

  mounted() {
    document.addEventListener('click', this.closeColorPicker)
  },

  beforeUnmount() {
    document.removeEventListener('click', this.closeColorPicker)
  },

  components: {
    NoteTxt,
    ColorPicker,
  },
}