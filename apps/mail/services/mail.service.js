'use strict'

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }

_createMails()

export const mailService = {
  loggedinUser,
  query,
  get,
  remove,
  save,
  getEmptyMail,
}

function query(folder = 'inbox') {
  return storageService.query(MAIL_KEY).then((mails) => {
    mails = mails.filter((mail) => {
      return mail.folder === folder
    })
    return mails
  })
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId).then(_setNextPrevmailId)
}

function remove(mailId) {
  return storageService.remove(MAIL_KEY, mailId)
}

function save(mail, append = false) {
  if (mail.id) {
    return storageService.put(MAIL_KEY, mail)
  } else {
    return storageService.post(MAIL_KEY, mail, append)
  }
}

function getEmptyMail(
  from = '',
  to = '',
  subject = '',
  body = '',
  sentAt = null
) {
  return {
    id: '',
    subject,
    body,
    isSelected: false,
    isRead: false,
    isStarred: false,
    isImportant: false,
    folder: 'inbox',
    sentAt,
    removedAt: null,
    from,
    to,
    labels: ['important', 'social'],
  }
}

function _createMails() {
  let mails = utilService.loadFromStorage(MAIL_KEY)
  if (!mails || !mails.length) {
    mails = []

    mails.push(
      _createMail(
        'Yaron Biton',
        'Yohai Korem',
        'Sprint3',
        'please teach me how to use vue amazingly like you',
        utilService.getRandomDate()
      )
    )
    mails.push(
      _createMail(
        'Sharon Frenkel',
        'Ori Krispel',
        'Sprint3',
        'You are a CSS genius, you > Kevin Powell',
        utilService.getRandomDate()
      )
    )
    mails.push(
      _createMail(
        'Yuval Schmukler',
        'Yohai & Ori',
        'Sprint3',
        'You guys were my favourite team all along',
        utilService.getRandomDate()
      )
    )
    mails.push(
      _createMail(
        'Tripadvisor',
        loggedinUser.email,
        'Take another look:Coding Academy',
        'We make it easy, open + see',
        utilService.getRandomDate()
      )
    )
    for (let i = 0; i < 120; i++) {
      mails.push(
        _createMail(
          'LoremIpsumDaily',
          loggedinUser.email,
          'Your daily dose of dolor',
          utilService.makeLorem(),
          utilService.getRandomDate()
        )
      )
    }

    utilService.saveToStorage(MAIL_KEY, mails)
  }
}

function _createMail(
  from = loggedinUser.email,
  to = 'myBestFriend@gmail.com',
  subject = 'sprint3',
  body = utilService.makeLorem(),
  sentAt = null
) {
  const mail = getEmptyMail(from, to, subject, body, sentAt)
  mail.id = utilService.makeId()
  return mail
}

function _setNextPrevmailId(mail) {
  return storageService.query(MAIL_KEY).then((mails) => {
    const mailIdx = mails.findIndex((currmail) => currmail.id === mail.id)
    mail.nextmailId = mails[mailIdx + 1] ? mails[mailIdx + 1].id : mails[0].id
    mail.prevmailId = mails[mailIdx - 1]
      ? mails[mailIdx - 1].id
      : mails[mails.length - 1].id
    return mail
  })
}
