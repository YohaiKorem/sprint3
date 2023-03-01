import { noteService } from '../services/note.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import AddNote from '../cmps/AddNote.js'
import NoteFilter from '../cmps/NoteFilter.js'
import NoteList from '../cmps/NoteList.js'

export default {
  name: 'noteIndex',
  template: `
      <section class="note-index flex flex-column align-center">
        <NoteFilter @filter="setFilterBy"/>
        <AddNote @saveNote="onSaveNote"/>
        <NoteList :notes="notes"  v-if="notes" @removeNote="onRemoveNote"/>
      </section>

      <router-view></router-view>
  `,

  data() {
    return {
      notes: null,
      filterBy: {},
    }
  },

  methods: {
    onRemoveNote(noteId) {
      noteService.remove(noteId)
        .then(() => {
          const idx = this.notes.findIndex(note => note.id === noteId)
          this.notes.splice(idx, 1)
          showSuccessMsg('Note Removed')
        })
        .catch(err => {
          showErrorMsg('Note remove failed')
        })
    },
    onSaveNote(newNote) {
      console.log('new note:', newNote)
      noteService.save(newNote)
        .then(() => {
          this.notes.unshift(newNote)
          showSuccessMsg('Note Added')
        })
        .catch(err => {
          showErrorMsg('Note add failed')
        })

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
      .then(notes => {
        this.notes = notes
      })
  },

  emits: ['removeNote', 'updateNote'],

  components: {
    NoteFilter,
    NoteList,
    AddNote,
  }
}