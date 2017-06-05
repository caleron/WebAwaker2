/**
 * Created by Patrick on 04.06.2017.
 */
import { Status } from '../helpers/Status'
import { showAlert } from '../helpers/util'
import { Command } from '../helpers/command'

let status = new Status()

let hostName
// timestamp in ms
let connectTime = 0
let socket

export function init () {
  if (document.location.hostname === 'localhost') {
    hostName = '192.168.1.102'
  } else {
    hostName = document.location.hostname
  }
  connect()
}

function connect () {
  if (socket !== undefined && socket.readyState === WebSocket.OPEN) {
    return
  }

  updateConnectionStatus('Connecting...')
  connectTime = Date.now()
  socket = new WebSocket('ws://' + hostName + ':4733')

  socket.onopen = onOpen
  socket.onclose = onClose
  socket.onmessage = onMessage
  socket.onerror = onError
}

function onOpen () {
  console.log('open')
  updateConnectionStatus('Connected')
  showAlert('Verbunden', 'Verbindung hergestellt.', 'success')
  sendMessage(new Command().getLibrary())
}

function onMessage (e) {
  let answer = JSON.parse(e.data)
  console.log(answer)
  let newTrack = connect.status.updateStatus(answer)
  if (answer.type === 'library') {

  }
  if (answer.type === 'library' || answer.type === 'status') {
    if (newTrack) {
    }
  }
  if (answer.type === 'config') {
  }
}

function onClose (e) {
  showAlert('Fehler', 'Verbindung getrennt. Verbinde neu...', 'danger')

  updateConnectionStatus('Disconnected')

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
  let msg = JSON.stringify(command)
  console.log(msg)
  socket.send(msg)
}

function updateConnectionStatus (status) {

}
