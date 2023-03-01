import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = ' noteDB'
const demoNotes = [
  {
    id: 'n101',
    createdAt: 1112222,
    type: 'NoteTxt',
    isPinned: true,
    style: {
      backgroundColor: '#00d'
    },
    info: {
      txt: 'Fullstack Me Baby!'
    }
  },
  {
    id: 'n102',
    type: 'NoteImg',
    isPinned: false,
    info: {
      url: 'http://some-img/me',
      title: 'Bobi and Me'
    },
    style: {
      backgroundColor: '#00d'
    }
  },
  {
    id: 'n103',
    type: 'NoteTodos',
    isPinned: false,
    info: {
      title: 'Get my stuff together',
      todos: [{ txt: 'Driving license', doneAt: null }, { txt: 'Coding power', doneAt: 187111111 }]
    }
  }]

_createNotes()

export const noteService = {
  query,
  get,
  remove,
  save,
  getEmptyNote,
}

function query(filterBy = {}) {
  return storageService.query(NOTE_KEY).then((notes) => {
    if (filterBy.txt) {
      const regex = new RegExp(filterBy.txt, 'i')
      notes = notes.filter((note) => regex.test(note.title))
    }
    if (filterBy.maxPrice) {
      notes = notes.filter((note) => note.listPrice.amount <= filterBy.maxPrice)
    }
    return notes
  })
}

function get(noteId) {
  return storageService.get(NOTE_KEY, noteId)
    .then(_setNextPrevNoteId)
}

function remove(noteId) {
  return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTE_KEY, note)
  } else {
    return storageService.post(NOTE_KEY, note)
  }
}

function getEmptyNote(info = { txt: 'Fullstack Me Baby!' }, type = 'NoteTxt') {
  return {
    id: utilService.makeId(6),
    createdAt: Date.now(),
    type: 'NoteTxt',
    isPinned: false,
    style: {
      backgroundColor: '#ff0'
    },
    info,
  }
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY)
  if (!notes || !notes.length) {
    notes = demoNotes
    utilService.saveToStorage(NOTE_KEY, notes)
  }
}

function _createNote(title, price = 20) {
  const note = getEmptyNote(title, price)
  note.id = utilService.makeId(11)
  return note
}

// function _setNextPrevNoteId(note) {
//   return storageService.query(NOTE_KEY).then((notes) => {
//     const noteIdx = notes.findIndex((currNote) => currNote.id === note.id)
//     note.nextNoteId = notes[noteIdx + 1] ? notes[noteIdx + 1].id : notes[0].id
//     note.prevNoteId = notes[noteIdx - 1]
//       ? notes[noteIdx - 1].id
//       : notes[notes.length - 1].id
//     return note
//   })
// }
