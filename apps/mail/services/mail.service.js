'use strict'

import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const MAIL_KEY = 'mailDB'

_createMails()

export const mailService = {
  query,
  get,
  remove,
  save,
  getEmptyMail,
}

function query(filterBy = {}) {
  return storageService.query(MAIL_KEY).then((mails) => {
    if (filterBy.txt) {
      const regex = new RegExp(filterBy.txt, 'i')
      mails = mails.filter((mail) => regex.test(mail.body))
    }
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

function getEmptyMail(vendor = '', maxSpeed = 0) {
  return { id: '', vendor, maxSpeed }
}

function _createMails() {
  let mails = utilService.loadFromStorage(MAIL_KEY)
  if (!mails || !mails.length) {
    mails = []
    mails.push(_createMail('audu', 300))
    mails.push(_createMail('fiak', 120))
    mails.push(_createMail('subali', 100))
    mails.push(_createMail('mitsu', 150))
    utilService.saveToStorage(MAIL_KEY, mails)
  }
}

function _createMail(vendor, maxSpeed = 250) {
  const mail = getEmptyMail(vendor, maxSpeed)
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
