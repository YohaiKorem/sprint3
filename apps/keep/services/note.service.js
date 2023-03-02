import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = ' noteDB'
const demoNotes = [
  {
    id: 'n100',
    createdAt: Date.now(),
    type: 'NoteVideo',
    isPinned: true,
    style: {
      backgroundColor: '#FFFFFF'
    },
    info: {
      title: 'This is Coding Academy!',
      videoUrl: 'https://www.youtube.com/watch?v=FWy_LbhHtug'
    }
  },
  {
    id: 'n101',
    createdAt: Date.now(),
    type: 'NoteTxt',
    isPinned: true,
    style: {
      backgroundColor: '#FFF475'
    },
    info: {
      title: 'FRONT OR BACK?',
      txt: 'Fullstack Me Baby!'
    }
  },
  {
    id: 'n102',
    createdAt: Date.now(),
    type: 'NoteTodo',
    isPinned: true,
    style: {
      backgroundColor: '#ffffff'
    },
    info: {
      title: 'Gotta do',
      list: [{ txt: 'eat', isDone: false }, { txt: 'code', isDone: true }, { txt: 'sleep', isDone: false }, { txt: 'repeat', isDone: false }]
    }
  },
  {
    id: 'n103',
    createdAt: Date.now(),
    type: 'NoteImg',
    isPinned: false,
    style: {
      backgroundColor: '#CCFF90'
    },
    info: {
      imgUrl: 'https://c4.wallpaperflare.com/wallpaper/519/226/434/green-falls-river-wallpaper-preview.jpg',
      title: 'Where I wonna be right now',
    }
  },
  {
    id: 'n104',
    createdAt: Date.now(),
    type: 'NoteTxt',
    isPinned: true,
    style: {
      backgroundColor: '#F28B82'
    },
    info: {
      title: 'What is Lorem Ipsum?',
      txt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer'
    }
  },
  {
    id: 'n105',
    createdAt: Date.now(),
    type: 'NoteImg',
    isPinned: false,
    style: {
      backgroundColor: '#CBF0F8'
    },
    info: {
      imgUrl: 'https://observer.ug/images2/women/Bobi-Wine-and-Barbie-Share-First-Joint-Magazine-Cover.jpg',
      title: 'Bobi and Me'
    },
  },
]

_createNotes()

export const noteService = {
  query,
  get,
  remove,
  save,
  getEmptyNote,
  createImg,
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

function save(note, append = false) {
  if (note.id) {
    return storageService.put(NOTE_KEY, note)
  } else {
    return storageService.post(NOTE_KEY, note, append)
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
    type,
    isPinned: false,
    style: {
      backgroundColor: 'white'
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

// function _createNote(title, price = 20) {
//   const note = getEmptyNote(title, price)
//   note.id = utilService.makeId(11)
//   return note
// }

