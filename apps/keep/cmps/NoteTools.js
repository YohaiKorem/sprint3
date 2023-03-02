import { noteService } from '../services/note.service.js'
import { eventBusService } from '../../../services/event-bus.service.js'
import ColorPicker from './ColorPicker.js'

export default {
  name: 'NoteTools',
  props: ['note'],
  template: `
        <article class="toolbox flex justify-center">
          <div class="item btn-bg-color" title="background color" @click.stop.prevent="toggleColorPicker"></div>
          <ColorPicker ref="colorPicker" :note="note" @updateColor="updateColor" v-show="showColorPicker"/>
          <label class="item btn-upload-img" for="image" title="upload image" @click.stop>
            <input type="file" class="file-input btn" accept="image/png, image/jpeg"  name="image" id="image" @change="updateImgUrl" />
          </label>
          <div class="item btn-pin" title="pin note" @click.prevent="togglePinNote">
            <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0z"></path>
             <path fill="#000" d="M17 4v7l2 3v2h-6v5l-1 1-1-1v-5H5v-2l2-3V4c0-1.1.9-2 2-2h6c1.11 0 2 .89 2 2zM9 4v7.75L7.5 14h9L15 11.75V4H9z"></path>
            </svg>
          </div>
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

    togglePinNote() {
      this.note.isPinned = !this.note.isPinned
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