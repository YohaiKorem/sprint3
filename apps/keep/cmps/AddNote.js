import { noteService } from '../services/note.service.js'

export default {
  name: 'AddNote',
  template: `
      <article class="add-note-container">
        <form @submit.prevent="save" @blur="onBlur">
          <input type="text" v-model="note.info.title" placeholder="Title" v-show="showTitleInput"/>
          <input type="text" v-model="note.info.txt" placeholder="Take a note..." @focus="onFocus" />
        </form>
        <div class="types-wrapper flex justify-evenly">
          <img class="item btn-text" src="../../../assets/img/keep/text.svg" />
          <img class="item btn-img" src="../../../assets/img/keep/image.svg" />
          <img class="item btn-todo" src="../../../assets/img/keep/todo.svg" />
        </div>
      </article>
  `,
  data() {
    return {
      type: 'NoteTxt',
      note: noteService.getEmptyNote(this.type),
      showTitleInput: false,
    }
  },

  methods: {
    save() {
      this.note = noteService.getEmptyNote(this.note.info, this.type)
      this.$emit('saveNote', this.note)
      this.note = noteService.getEmptyNote()
    },
    onFocus() {
      this.showTitleInput = true
    },
    onBlur() {
      this.showTitleInput = false
    },
    emits: ['saveNote'],
  }
}