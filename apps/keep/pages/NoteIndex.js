import { noteService } from '../services/note.service.js'
import { eventBusService } from '../../../services/event-bus.service.js'
import NoteFilter from '../cmps/NoteFilter.js'
import NoteList from '../cmps/NoteList.js'

export default {
  name: 'noteIndexCmp',
  template: `
      <section class="Note-index">
        <NoteFilter @filter="setFilterBy"/>
        <NoteList />
    </section>
  <h1>Hello Keep</h1>`,

  data() {
    return {
      notes: null,
    }
  },
  methods: {
    removeNote(noteId) {
      noteService.remove(noteId)
        .then(() => {
          const idx = this.notes.findIndex(note => note.id === noteId)
          this.notes.splice(idx, 1)
          eventBusService.emit('show-msg', { txt: 'Note removed', type: 'success' })
        })
        .catch(err => {
          eventBusService.emit('show-msg', { txt: 'Note remove failed', type: 'error' })
        })
    },
    onSaveNote(newNote) {
      this.notes.unshift(newNote)
    },
    setFilterBy(filterBy) {
      this.filterBy = filterBy
    }
  },
  computed: {
    filteredNotes() {
      const regex = new RegExp(this.filterBy.title, 'i')
      return this.notes.filter(note => regex.test(note.title))
    }
  },
  created() {
    noteService.query()
      .then(notes => this.notes = notes)
  },
  components: {
    NoteFilter,
    NoteList,
  }
}