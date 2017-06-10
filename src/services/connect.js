/**
 * Created by Patrick on 04.06.2017.
 */
import { Status } from '../helpers/Status'
import { showAlert } from '../helpers/util'
import { Command } from '../helpers/command'

/**
 *
 * @type {Status}
 */
export const status = new Status()

window.ss = status
let hostName
// timestamp in ms
let connectTime = 0
let socket

export function initSocket () {
  if (document.location.hostname === 'localhost') {
    hostName = '192.168.1.103'
  } else {
    hostName = document.location.hostname
  }
  connect()
}

function connect () {
  if (socket !== undefined && socket.readyState === WebSocket.OPEN) {
    return
  }

  setConnectionStatus('Connecting...')

  connectTime = Date.now()
  socket = new WebSocket('ws://' + hostName + ':4733')

  socket.onopen = onOpen
  socket.onclose = onClose
  socket.onmessage = onMessage
  socket.onerror = onError
}

function onOpen () {
  console.log('open')
  setConnectionStatus('Connected')
  showAlert('Verbunden', 'Verbindung hergestellt.', 'success')
  Command.getLibrary()
}

function onMessage (e) {
  let answer = JSON.parse(e.data)
  console.log(answer)
  status.updateStatus(answer)
}

function setConnectionStatus (value) {
  status.connectionStatus = value
}

function onClose (e) {
  showAlert('Fehler', 'Verbindung getrennt. Verbinde neu...', 'danger')

  setConnectionStatus('Disconnected')

  if (Date.now() - connectTime > 5000) {
    connect()
    console.log('direct reconnect')
  } else {
    let del = 5000 - (Date.now() - connectTime)
    console.log(del)
    window.setTimeout(connect, del)
  }
}

function onError (e) {
  console.log(e)
}

export function sendMessage (command) {
  console.log(command)
  let msg = JSON.stringify(command)
  console.log('sending ' + msg)
  socket.send(msg)
}
