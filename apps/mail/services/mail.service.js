'use strict'

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }

_createMails()

export const mailService = {
  query,
  get,
  remove,
  save,
  getEmptyMail,
}

function query(criteria = {}) {
  console.log(criteria)
  return storageService.query(MAIL_KEY).then((mails) => {
    // if (criteria.txt) {
    //   console.log(criteria)
    //   const regex = new RegExp(criteria.txt, 'i')
    //   mails = mails.filter((mail) => regex.test(mail.body))
    // }
    // if (criteria.isTrash) {
    //   mails.filter((mail) => (mail.isTrash = true))
    // }
    // if (filterBy.minSpeed) {
    //     mails = mails.filter(mail => mail.maxSpeed >= filterBy.minSpeed)
    // }
    return mails
  })
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId).then(_setNextPrevmailId)
}

function remove(mailId) {
  return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
  if (mail.id) {
    return storageService.put(MAIL_KEY, mail)
  } else {
    return storageService.post(MAIL_KEY, mail)
  }
}

function getEmptyMail(from = '', to = '', subject = '', body = '') {
  return {
    id: '',
    subject,
    body,
    isRead: false,
    isStarred: false,
    folder: 'inbox',
    sentAt: null,
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
    mails.push(_createMail('me', 'you', 'a subject', 'the mail content'))
    mails.push(_createMail('yohai', 'noa'))
    mails.push(_createMail())
    mails.push(_createMail())
    mails.push(_createMail())
    mails.push(_createMail())
    mails.push(_createMail())
    mails.push(_createMail())
    mails.push(_createMail())
    mails.push(_createMail())
    mails.push(_createMail())
    mails.push(_createMail())
    mails.push(_createMail())
    mails.push(_createMail())
    mails.push(_createMail())
    mails.push(_createMail())
    mails.push(_createMail())
    utilService.saveToStorage(MAIL_KEY, mails)
  }
}

function _createMail(
  from = loggedinUser.email,
  to = 'myBestFriend@gmail.com',
  subject = 'sprint3',
  body = utilService.makeLorem()
) {
  const mail = getEmptyMail(from, to, subject, body)
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
