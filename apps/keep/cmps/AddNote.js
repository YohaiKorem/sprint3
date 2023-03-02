import { noteService } from '../services/note.service.js'
import ColorPicker from './ColorPicker.js'
export default {
  name: 'AddNote',
  template: `
      <section ref="addNoteContainer" class="add-note-container" :style="styleNote">
        <form @submit.prevent="save">
          <input type="text" v-model="note.info.title" placeholder="Title" v-show="isWideMode"/>
          <input type="text" v-model="note.info.txt" placeholder="Take a note..." v-show="type === 'NoteTxt'" @focus="onFocus" />
          <input type="text" v-model="note.info.imgUrl" placeholder="Enter image URL..." v-show="type === 'NoteImg'" @focus="onFocus" />
          <input type="text" @input="saveTodoList" placeholder="Enter comma seperated list..." v-show="type === 'NoteTodo'" @focus="onFocus" />
        </form>
        <div class="types-wrapper flex justify-evenly" v-show="!isWideMode">
          <img class="item btn-text" @click="changeType('NoteTxt')" src="../../../assets/img/keep/text.svg" />
          <img class="item btn-img" @click="changeType('NoteImg')" src="../../../assets/img/keep/image.svg" />
          <img class="item btn-todo" @click="changeType('NoteTodo')" src="../../../assets/img/keep/todo.svg" />
        </div>
        <div class="tool-bar flex align-center justify-between" v-show="isWideMode">
          <article class="tool-box flex justify-center">
            <div class="item btn-bg-color" title="background color" @click.stop.prevent="toggleColorPicker"></div>
            <ColorPicker ref="colorPicker" :note="note" @updateColor="updateColor" v-show="showColorPicker"/>
            <label class="item btn-upload-img" for="image" title="upload image" @click.stop="changeType('NoteImg')">
              <input type="file" class="file-input btn" accept="image/png, image/jpeg"  name="image" id="image" @change="updateImgUrl" />
            </label>
        </article>
            <button class="btn-close clean-btn" @click="isWideMode = false">close</button>
        </div>
      </section>
  `,
  data() {
    return {
      type: 'NoteTxt',
      note: noteService.getEmptyNote(undefined, this.type),
      isWideMode: false,
      showColorPicker: false,
    }
  },

  methods: {
    changeType(type) {
      this.type = type
      this.note = noteService.getEmptyNote(this.note.info || undefined, this.type)
    },

    save() {
      this.$emit('saveNote', this.note)
      this.note = noteService.getEmptyNote()
    },

    updateImgUrl(ev) {
      const url = noteService.createImg(ev)
        .then(url => this.note.info.imgUrl = url)
    },

    saveTodoList(event) {
      let list = event.target.value.split(', ')
      list = list.map(item => {
        return {
          txt: item,
          isDone: false
        }
      })
      this.note.info.list = list
      console.log('note todo:', this.note)
    },

    toggleColorPicker() {
      this.showColorPicker = !this.showColorPicker
    },

    updateColor(color) {
      this.note.style.backgroundColor = color;
    },

    closeColorPicker(event) {
      if (this.showColorPicker && !this.$refs.colorPicker.$el.contains(event.target)) {
        this.showColorPicker = false
      }
    },

    onFocus() {
      this.isWideMode = true
    },

    closeWideMode(event) {
      console.log('check if cound be save...')
      if (this.isWideMode && !this.$refs.addNoteContainer.contains(event.target)) {
        this.isWideMode = false
        if (this.note.info.title || this.note.info.txt || this.note.info.imgUrl || this.note.info.list) {
          this.save()
        }
      }
    },
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
    document.removeEventListener('click', this.closeWideMode)
  },

  created() {
    document.addEventListener('click', this.closeWideMode)
  },

  components: {
    ColorPicker,
  },

  emits: ['saveNote'],

}