import { noteService } from '../services/note.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import { eventBusService } from '../../../services/event-bus.service.js'
import AddNote from '../cmps/AddNote.js'
import NoteFilter from '../cmps/NoteFilter.js'
import NoteEdit from '../cmps/NoteEdit.js'
import NoteList from '../cmps/NoteList.js'

export default {
  name: 'noteIndex',
  template: `
      <section class="note-index flex flex-column align-center">
        <NoteFilter @filter="setFilterBy"/>
        <AddNote @saveNote="onSaveNote"/>
        <NoteList :notes="notes"  v-if="notes" @removeNote="onRemoveNote"/>
      </section>

      <router-view @calll=""></router-view>
  `,

  data() {
    return {
      notes: null,
      filterBy: {},
    }
  },

  methods: {
    calll() {
      console.log('IM the parent')
    },
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
    },
    updateNote(note) {
      noteService.save(note)
        .then(() => {
          noteService.query()
            .then(notes => {
              this.notes = notes
            })
        })
        .catch(err => {
          showErrorMsg('Note update failed')
        })
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

    eventBusService.on('updateNote', this.updateNote)
    eventBusService.on('removeNote', this.onRemoveNote)
  },

  emits: ['removeNote', 'updateNote'],

  components: {
    NoteFilter,
    NoteList,
    AddNote,
    NoteEdit,
  }
}