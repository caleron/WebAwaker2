/**
 * Created by Patrick on 04.06.2017.
 */
import Vue from 'vue'
/**
 *
 * @param {String} title
 * @param {String} message
 * @param {String} type success, info, warning, danger
 */
export function showAlert (title, message, type) {
  let content = '<strong>' + title + '</strong><span class="pl-2">' + message + '</span>'

  switch (type) {
    case 'success':
      Vue.toasted.success(content)
      break
    case 'info':
      Vue.toasted.info(content)
      break
    case 'error':
      Vue.toasted.error(content)
      break
  }
}

/**
 * Konvertiert RGB-Komponenten in eine RGB-Integer.
 * @return {number}
 * @param  {Number} r Rot
 * @param  {Number} g Grün
 * @param  {Number} b Blau
 */
export function RGBtoColorInt (r, g, b) {
  return r << 16 | g << 8 | b
}

/**
 * Konvertiert eine RGB-Integer in RGB-Komponenten.
 * @param {Number} color
 * @returns {{r: number, g: number, b: number}}
 */
export function colorIntToRGB (color) {
  const r = color >> 16 & 0xFF
  const g = color >> 8 & 0xFF
  const b = color & 0xFF
  return {r: r, g: g, b: b}
}

/**
 * Gibt die Sekunden aufgeteilt in Stunden, Minuten und Sekunden als String zurück.
 * @param {number} seconds Die Anzahl an Sekunden.
 * @returns {string}
 */
export function timeString (seconds) {
  const hours = Math.floor(seconds / 3600)
  seconds = seconds - hours * 3600
  const mins = Math.floor(seconds / 60)
  seconds = seconds - mins * 60
  if (hours > 0) {
    return hours + ':' + leadingZero(mins) + ':' + leadingZero(seconds)
  } else {
    return mins + ':' + leadingZero(seconds)
  }
}

/**
 * Fügt eine führende Null zur Zahl hinzu.
 * @param {number} num
 * @returns {string}
 */
export function leadingZero (num) {
  if (num < 10) {
    return '0' + num
  }
  return num + ''
}

export function resetTransition (el) {
  el.addClass('notransition')
  window.setTimeout(function () {
    el.removeClass('notransition')
  }, 100)
}

/**
 * http://stackoverflow.com/a/979325/6655315
 * @param {String} field
 * @param {number} reverse
 * @param {Function|null} [primer]
 * @returns {Function}
 */
export function getSortFunc (field, reverse, primer) {
  let key = primer ? function (x) {
    return primer(x[field])
  } : function (x) {
    return x[field]
  }

  reverse = !reverse ? 1 : -1

  return function (a, b) {
    a = key(a)
    b = key(b)
    return reverse * ((a > b) - (b > a))
  }
}

/**
 * Klasse, die einen Timer darstellt.
 * @param fn    Im Intervall aufzurufende Funktion
 * @param time  Intervall in ms
 * @constructor
 */
export class Timer {
  constructor (callback, interval) {
    this.timer = false
    this.fn = callback
    this.time = interval
  }

  /**
   * Startet den Timer, falls er nicht läuft.
   */
  start () {
    if (!this.isRunning()) {
      this.timer = window.setInterval(this.fn, this.time)
    }
  }

  /**
   * Stoppt den Timer.
   */
  stop () {
    window.clearInterval(this.timer)
    this.timer = false
  }

  /**
   * Gibt true zurück, falls der Timer aktiv ist.
   * @returns {boolean}
   */
  isRunning () {
    return this.timer !== false
  }

  setRunning (run) {
    if (run) {
      this.start()
    } else {
      this.stop()
    }
  }
}

/**
 * Debouncing function taken from https://davidwalsh.name/javascript-debounce-function
 *
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * @param func the function to execute
 * @param wait time in ms to wait after the last call to trigger the given func
 * @param immediate
 * @returns {Function}
 */
export function debounce (func, wait, immediate) {
  let timeout
  return function () {
    let context = this
    let args = arguments

    const later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

/**
 *
 * @param {Map} map
 */
export function collectMapValues (map) {
  let arr = []
  for (let val of map.values()) {
    arr.push(val)
  }
  return arr
}

// Skript um kaspersky xhr zu blocken
window.setTimeoutOrig = window.setTimeout
window.setTimeout = function (f, del) {
  let lStack = Error().stack.toString()
  if (lStack.indexOf('kis.scr.kaspersky-labs.com') > 0) {
    return 0
  }
  window.setTimeoutOrig(f, del)
}
