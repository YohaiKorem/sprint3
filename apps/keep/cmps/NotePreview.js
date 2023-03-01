import NoteTxt from './NoteTxt.js'

export default {
  name: 'NotePreview',
  props: ['note'],
  template: `
    <RouterLink :to="'/keep/edit/' + note.id">
      <article class="note-preview" :style="styleNote">
        <component :is="note.type" :info="note.info" />
        <div class="tool-box flex justify-center">
          <div class="btn-bg-color" @click.prevent="choose-color"></div>
          <div class="btn-remove" @click.prevent="remove"></div>
        </div>
      </article>
    </RouterLink>
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