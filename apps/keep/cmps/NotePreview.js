import NoteTxt from './NoteTxt.js'

export default {
  name: 'NotePreview',
  props: ['note'],
  template: `
      <article class="note-preview" :style="styleNote">
            <component 
            :is="note.type" 
            :info="note.info"
             />
      </article>
  `,

  computed: {
    styleNote() {
      return {
        backgroundColor: this.note.style.backgroundColor,
      }
    }
  },
  components: {
    NoteTxt,
  },
}