import NoteTxt from './NoteTxt.js'

export default {
  name: 'NotePreview',
  props: ['note'],
  template: `
      <article class="note-preview" :style="styleNote">
        <component :is="note.type" :info="note.info" />
        <div class="tool-box flex justify-center">
          <div class="btn-bg-color" @click="choose-color"></div>
          <div class="btn-remove" @click="remove"></div>
        </div>
      </article>
  `,

  computed: {
    styleNote() {
      return {
        backgroundColor: this.note.style.backgroundColor,
      }
    }
  },

  methods: {
    remove() {
      this.$emit('removeNote', this.note.id)
    }
  },

  components: {
    NoteTxt,
  },
}