import { noteService } from '../services/note.service.js'
import { eventBusService } from '../../../services/event-bus.service.js'
import ColorPicker from './ColorPicker.js'

export default {
  name: 'NoteTools',
  props: ['note'],
  template: `
        <article class="tool-box flex justify-center">
          <div class="item btn-bg-color" title="background color" @click.stop.prevent="toggleColorPicker"></div>
          <ColorPicker ref="colorPicker" :note="note" @updateColor="updateColor" v-show="showColorPicker"/>
          <label class="item btn-upload-img" for="image" title="upload image" @click.stop>
            <input type="file" class="file-input btn" accept="image/png, image/jpeg"  name="image" id="image" @change="updateImgUrl" />
          </label>
          <div class="item btn-remove" title="remove" @click.prevent="remove"></div>
        </article>
  `,

  data() {
    return {
      showColorPicker: false,
    }
  },
  methods: {

    remove() {
      this.$emit('remove', this.note.id)
    },

    updateColor(color) {
      this.note.style.backgroundColor = color
      eventBusService.emit('updateNote', this.note)
    },

    toggleColorPicker() {
      this.showColorPicker = !this.showColorPicker
    },

    closeColorPicker(event) {
      if (this.showColorPicker && !this.$refs.colorPicker.$el.contains(event.target)) {
        this.showColorPicker = false
      }
    },

    updateImgUrl(ev) {
      const url = noteService.createImg(ev)
        .then(url => {
          this.note.info.imgUrl = url
          eventBusService.emit('updateNote', this.note)
        })
    },
  },

  mounted() {
    document.addEventListener('click', this.closeColorPicker)
  },

  beforeUnmount() {
    document.removeEventListener('click', this.closeColorPicker)
  },

  components: {
    ColorPicker,
  },

  emits: ['updateImgUrl', 'remove'],
}