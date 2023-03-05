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
      <section class="note-index">
        <section class="flex flex-column align-center gap">
          <NoteFilter @filter="setFilterBy"/>
          <AddNote v-show="!isTrash" @saveNote="onSaveNote"/>
          <button class="btn-empty clean-btn" v-show="isTrash" @click="onEmptyTrash">Empty trash</button>
          <NoteList :notes="filteredNotes" v-if="notes" @removeNote="onRemoveNote"/>
        </section>
        <aside class="sidebar flex flex-column"> 
          <button class="btn-notes clean-btn" @click="isTrash = false">
            <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" fill="#202124"></path></svg>
          </button>
          <button class="btn-trash clean-btn" @click="isTrash = true">
          <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z" fill="#5F6368"></path><path d="M9 8h2v9H9zm4 0h2v9h-2z" fill="#5F6368"></path></svg>
          </button>
        </aside>
      </section>

      <router-view/>
  `,

  data() {
    return {
      notes: null,
      filterBy: {},
      isTrash: false,
    }
  },

  methods: {
    onRemoveNote(noteId) {
      noteService.get(noteId)
        .then(note => {
          if (note.isRemoved) {
            this.onRemovePermamentlyNote(noteId)
            return
          }
          note.isRemoved = true
          this.updateNote(note)
        })
    },

    onRemovePermamentlyNote(noteId) {
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
    },

    onEmptyTrash() {
      let notes = this.notes.filter(note => note.isRemoved)
      if (!notes.length) return
      confirm('Are you sure you want to empty all notes in trash?')

      notes.forEach(note => {
        this.onRemovePermamentlyNote(note.id)
      })
    },

  },

  computed: {
    filteredNotes() {
      const regex = new RegExp(this.filterBy.txt, 'i')
      return this.notes.filter(note => note.isRemoved === this.isTrash && (regex.test(note.info.txt) || regex.test(note.info.title)))
    }
  },

  created() {
    noteService.query()
      .then(notes => {
        this.notes = notes
      })

    eventBusService.on('updateNote', this.updateNote)
    eventBusService.on('removeNote', this.onRemoveNote)
    eventBusService.on('duplicateNote', this.onSaveNote)
  },



  emits: ['removeNote', 'updateNote'],

  components: {
    NoteFilter,
    NoteList,
    AddNote,
    NoteEdit,
  }
}


