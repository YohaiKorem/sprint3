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
      backgroundColor: '#FFF475'
    },
    info: {
      title: 'Yohai hamelech',
      txt: 'Fullstack Me Baby!'
    }
  },
  {
    id: 'n102',
    createdAt: 1112222,
    type: 'NoteTxt',
    isPinned: true,
    style: {
      backgroundColor: '#CCFF90'
    },
    info: {
      title: 'Yohai hagever',
      txt: 'wowww'
    }
  },
  {
    id: 'n103',
    type: 'NoteImg',
    isPinned: false,
    info: {
      imgUrl: 'http://some-img/me',
      title: 'Bobi and Me'
    },
    style: {
      backgroundColor: '#FFF475'
    }
  },
  // {
  //   id: 'n104',
  //   type: 'NoteTodos',
  //   isPinned: false,
  //   info: {
  //     title: 'Get my stuff together',
  //     todos: [{ txt: 'Driving license', doneAt: null }, { txt: 'Coding power', doneAt: 187111111 }]
  //   }
  // }
]

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

function createImg(ev) {
  return new Promise(resolve => {
    const reader = new FileReader()

    reader.onload = function (event) {
      let img = new Image()
      img.src = event.target.result

      resolve(img.src)
    }
    reader.readAsDataURL(ev.target.files[0])
  })
}

function getEmptyNote(info = { txt: '' }, type = 'NoteTxt') {
  return {
    createdAt: Date.now(),
    type: 'NoteTxt',
    isPinned: false,
    style: {
      backgroundColor: '#FFF475'
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

