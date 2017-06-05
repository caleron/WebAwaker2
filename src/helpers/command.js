/**
 * Created by Patrick on 04.06.2017.
 */
import { sendMessage } from '../services/connect'
/**
 * Wrapper-Klasse zur Serialisierung mit JSON.
 * @constructor
 */

export const Command = {
  /**
   * Startet die Wiedergabe.
   * @returns {Command}
   */
  play () {
    this.send(
      {
        action: commands.PLAY
      })
  },

  /**
   * Spielt einen Track im Kontext der AllTracks-PlayList ab.
   * @param {Number} trackId Die ID des Tracks
   * @returns {Command}
   */
  playId (trackId) {
    this.send(
      {
        action: commands.PLAY_ID,
        trackId: trackId
      })
  },

  /**
   * Springt zu einer Position bei der Wiedergabe
   * @param {Number} position Die Zielposition
   * @returns {Command}
   */
  playFromPosition (position) {
    this.send(
      {
        action: commands.PLAY_FROM_POSITION,
        position: position
      })
  },

  /**
   * Pausiert die Wiedergabe
   * @returns {Command}
   */
  pause () {
    this.send(
      {
        action: commands.PAUSE
      })
  },

  /**
   * Stoppt die Wiedergabe.
   * @returns {Command}
   */
  stop () {
    this.send(
      {
        action: commands.STOP
      })
  },

  /**
   * Wechselt zwischen Play und Pause.
   * @returns {Command}
   */
  togglePlayPause () {
    this.send(
      {
        action: commands.TOGGLE_PLAY_PAUSE
      })
  },

  /**
   * Spielt den nächsten Titel ab.
   * @returns {Command}
   */
  playNext () {
    this.send(
      {
        action: commands.PLAY_NEXT
      })
  },

  /**
   * Spielt den vorigen Titel ab.
   * @returns {Command}
   */
  playPrevious () {
    this.send(
      {
        action: commands.PLAY_PREVIOUS
      })
  },

  /**
   * Setzt den Shuffle-Modus.
   * @param {Boolean} shuffle True oder False
   * @returns {Command}
   */
  setShuffle (shuffle) {
    this.send(
      {
        action: commands.SET_SHUFFLE,
        shuffle: shuffle
      })
  },

  /**
   * Setzt den Wiederholungsmodus. "none" für keine Wiederholung, "track" für Datei wiederholen und "all" für alles
   * Wiederholen.
   * @param {String} mode Der Wiederholungsmodus.
   * @returns {Command}
   */
  setRepeatMode (mode) {
    this.send(
      {
        action: commands.SET_REPEAT_MODE,
        repeatMode: mode
      })
  },

  /**
   * Setzt die Lautstärke
   * @param {Number} volume Lautstärke als Zahl von 0 bis 100
   * @returns {Command}
   */
  setVolume (volume) {
    this.send(
      {
        action: commands.SET_VOLUME,
        volume: volume
      })
  },

  /**
   * Erstellt eine neue Playlist.
   * @param {String} name Der Name der neuen Playlist.
   * @returns {Command}
   */
  createPlaylist (name) {
    this.send(
      {
        action: commands.CREATE_PLAYLIST,
        name: name
      })
  },

  /**
   * Löscht eine Playlist.
   * @param {Number} playlistId Die ID der zu löschenden Playlist.
   * @returns {Command}
   */
  removePlaylist (playlistId) {
    this.send(
      {
        action: commands.REMOVE_PLAYLIST,
        playlistId: playlistId
      })
  },

  /**
   * Fügt eine Trackmenge zu einer Playlist hinzu.
   * @param {Number} playlistId Die ID der Playlist
   * @param {Array} trackIds Die ID-Liste der Tracks.
   * @returns {Command}
   */
  addTracksToPlaylist (playlistId, trackIds) {
    this.send(
      {
        action: commands.ADD_TRACKS_TO_PLAYLIST,
        playlistId: playlistId,
        idList: trackIds
      })
  },

  /**
   * Entfernt eine Trackmenge von einer Playlist.
   * @param {Number} playlistId Die ID der Playlist
   * @param {Array} trackIds Die ID-Liste der Tracks
   * @returns {Command}
   */
  removeTracksFromPlaylist (playlistId, trackIds) {
    this.send(
      {
        action: commands.REMOVE_TRACKS_FROM_PLAYLIST,
        playlistId: playlistId,
        idList: trackIds
      })
  },

  /**
   * Ruft den aktuellen Status ab.
   * @returns {Command}
   */
  getStatus () {
    this.send(
      {
        action: commands.GET_STATUS
      })
  },

  /**
   * Spielt eine Playlist ab.
   * @param {Number} playlistId Die ID der Playlist.
   * @returns {Command}
   */
  playPlaylist (playlistId) {
    this.send(
      {
        action: commands.PLAY_PLAYLIST,
        playlistId: playlistId
      })
  },

  /**
   * Spielt einen Track aus einer Playlist ab und setzt die Playlist als aktiv.
   * @param {Number} playlistId Die ID der Playlist
   * @param {Number} trackId Die ID des Tracks
   * @returns {Command}
   */
  playTrackOfPlaylist (playlistId, trackId) {
    this.send(
      {
        action: commands.PLAY_TRACK_OF_PLAYLIST,
        playlistId: playlistId,
        trackId: trackId
      })
  },

  /**
   * Ruft die gesamte Mediathek ab.
   * @returns {Command}
   */
  getLibrary () {
    this.send(
      {
        action: commands.GET_LIBRARY
      })
  },

  /**
   * Setzt die Farbe
   * @param {Number} color Farbe als RGB-Integer
   * @returns {Command}
   */
  setColor (color) {
    this.send(
      {
        action: commands.SET_COLOR,
        color: color,
        smooth: false
      })
  },

  /**
   * Setzt die Farbe.
   * @param {Number} red Rot von 0 bis 255
   * @param {Number} green Grün von 0 bis 255
   * @param {Number} blue Blau von 0 bis 255
   * @returns {Command}
   */
  setRGBColor (red, green, blue) {
    this.send(
      {
        action: commands.SET_RGBCOLOR,
        red: red,
        green: green,
        blue: blue,
        smooth: false
      })
  },

  /**
   * Setzt die Helligkeit der weißen LED's
   * @param {Number} brightness Die Helligkeit als Zahl zwischen 0 und 100
   * @returns {Command}
   */
  setWhiteBrightness (brightness) {
    this.send(
      {
        action: commands.SET_WHITE_BRIGHTNESS,
        brightness: brightness,
        smooth: false
      })
  },

  /**
   * Setzt die Helligkeit von Animationen.
   * @param {Number} brightness Die Helligkeit als Zahl zwischen 0 und 100
   * @returns {Command}
   */
  setAnimationBrightness (brightness) {
    this.send(
      {
        action: commands.SET_ANIMATION_BRIGHTNESS,
        brightness: brightness,
        smooth: false
      })
  },

  /**
   * Setzt den Farbmodus
   * @param {String} mode Einer der folgenden Strings: custom, colorCircle, music
   * @returns {Command}
   */
  setColorMode (mode) {
    this.send(
      {
        action: commands.SET_COLOR_MODE,
        colorMode: mode
      })
  },

  /**
   * Fährt den Raspberry herunter.
   * @returns {Command}
   */
  shutdownRaspi () {
    this.send(
      {
        action: commands.SHUTDOWN_RASPI
      })
  },

  /**
   * Startet den Raspberry neu.
   * @returns {Command}
   */
  rebootRaspi () {
    this.send(
      {
        action: commands.REBOOT_RASPI
      })
  },

  /**
   * Startet die Serveranwendung neu.
   * @returns {Command}
   */
  rebootServer () {
    this.send(
      {
        action: commands.REBOOT_RASPI
      })
  },

  /**
   * Beendet die Serveranwendung.
   * @returns {Command}
   */
  shutdownServer () {
    this.send(
      {
        action: commands.SHUTDOWN_RASPI
      })
  },

  /**
   * Ruft den Wert einer Konfigurationsoption ab.
   * @param {String} name Der Name der Option
   * @returns {Command}
   */
  getConfig (name) {
    this.send(
      {
        action: commands.GET_CONFIG,
        name: name
      })
  },

  /**
   * Setzt eine Konfigurationsoption
   * @param {String} name Der Name
   * @param {String} value Der Wert
   * @returns {Command}
   */
  setConfig (name, value) {
    this.send(
      {
        action: commands.SET_CONFIG,
        name: name,
        value: value
      })
  },

  /**
   * Ruft die Liste der derzeitigen Einstellungen ab.
   * @returns {Command}
   */
  getConfigList () {
    this.send(
      {
        action: commands.GET_CONFIG_LIST
      })
  },

  /**
   * Ruft eine Liste aller möglichen Optionen ab.
   * @returns {Command}
   */
  getConfigOptions () {
    this.send(
      {
        action: commands.GET_CONFIG_OPTIONS
      })
  },

  /**
   * Erstellt eine Playlist aus IDs und spielt diese ab.
   *
   * @param {int[]} list
   * @param {String} name
   * @param {int} [startId]
   * @returns {Command}
   */
  playIdList (list, name, startId) {
    this.send(
      {
        action: commands.PLAY_ID_LIST,
        idList: list,
        name: name,
        trackId: startId !== undefined ? startId : -1
      })
  },

  /**
   * Fügt einen Track der Warteschlange hinzu.
   * @param {Array} trackIds
   * @returns {Command}
   */
  addTracksToQueue (trackIds) {
    this.send(
      {
        action: commands.ADD_TRACKS_TO_QUEUE,
        idList: trackIds
      })
  },

  /**
   * Entfernt Tracks von der Warteschlange.
   * @param {Array} trackIds
   * @returns {Command}
   */
  removeTracksFromQueue (trackIds) {
    this.send(
      {
        action: commands.REMOVE_TRACKS_FROM_QUEUE,
        idList: trackIds
      })
  },

  /**
   * Spielt den angegebenen Song aus der Queue.
   * @param trackId ID des Tracks
   * @returns {Command}
   */
  playTrackOfQueue (trackId) {
    this.send(
      {
        action: commands.PLAY_TRACK_OF_QUEUE,
        trackId: trackId
      })
  },

  /**
   * Spielt als nächstes den angegebenen Track ab.
   * @param {int} id
   * @returns {Command}
   */
  playTrackNext (id) {
    this.send(
      {
        action: commands.PLAY_TRACK_NEXT,
        trackId: id
      })
  },

  /**
   * Sendet den Befehl ab.
   * Das selbe wie <code>connect.send(command)</code>
   */
  send (obj) {
    if (obj.action.length === 0) {
      throw new Error('Befehl nicht gesetzt!')
    }
    sendMessage(obj)
  }
}

/**
 * Objekt mit allen verfügbaren Befehlen.
 *
 * @type {{PLAY: string, PLAY_ID: string, PLAY_FROM_POSITION: string, PAUSE: string, STOP: string, TOGGLE_PLAY_PAUSE:
 *     string, CHECK_FILE: string, PLAY_NEXT: string, PLAY_PREVIOUS: string, SET_SHUFFLE: string, SET_REPEAT_MODE:
 *     string, SET_VOLUME: string, SET_WHITE_BRIGHTNESS: string, SET_ANIMATION_BRIGHTNESS: string, SET_COLOR_MODE:
 *     string, SET_COLOR: string, SET_RGBCOLOR: string, CHANGE_VISUALIZATION: string, CREATE_PLAYLIST: string,
 *     REMOVE_PLAYLIST: string, ADD_TRACKS_TO_PLAYLIST: string, REMOVE_TRACKS_FROM_PLAYLIST: string, PLAY_PLAYLIST:
 *     string, PLAY_TRACK_OF_PLAYLIST: string, GET_STATUS: string, GET_LIBRARY: string, SEND_STRING: string,
 *     SHUTDOWN_SERVER: string, SHUTDOWN_RASPI: string, REBOOT_RASPI: string, REBOOT_SERVER: string, GET_CONFIG:
 *     string, SET_CONFIG: string, GET_CONFIG_LIST: string, GET_CONFIG_OPTIONS: string, PLAY_ID_LIST: string,
 *     ADD_TRACKS_TO_QUEUE: string, REMOVE_TRACKS_FROM_QUEUE: string, PLAY_TRACK_NEXT: string, PLAY_TRACK_OF_QUEUE:
 *     string}}
 */
const commands = {
  PLAY: 'play',
  PLAY_ID: 'playId',
  PLAY_FROM_POSITION: 'playFromPosition',
  PAUSE: 'pause',
  STOP: 'stop',
  TOGGLE_PLAY_PAUSE: 'togglePlayPause',
  CHECK_FILE: 'checkFile',
  PLAY_NEXT: 'playNext',
  PLAY_PREVIOUS: 'playPrevious',
  SET_SHUFFLE: 'setShuffle',
  SET_REPEAT_MODE: 'setRepeatMode',
  SET_VOLUME: 'setVolume',
  SET_WHITE_BRIGHTNESS: 'setWhiteBrightness',
  SET_ANIMATION_BRIGHTNESS: 'setAnimationBrightness',
  SET_COLOR_MODE: 'setColorMode',
  SET_COLOR: 'setColor',
  SET_RGBCOLOR: 'setRGBColor',
  CHANGE_VISUALIZATION: 'changeVisualization',
  CREATE_PLAYLIST: 'createPlaylist',
  REMOVE_PLAYLIST: 'removePlaylist',
  ADD_TRACKS_TO_PLAYLIST: 'addTracksToPlaylist',
  REMOVE_TRACKS_FROM_PLAYLIST: 'removeTracksFromPlaylist',
  PLAY_PLAYLIST: 'playPlaylist',
  PLAY_TRACK_OF_PLAYLIST: 'playTrackOfPlaylist',
  GET_STATUS: 'getStatus',
  GET_LIBRARY: 'getLibrary',
  SEND_STRING: 'sendString',
  SHUTDOWN_SERVER: 'shutdownServer',
  SHUTDOWN_RASPI: 'shutdownRaspi',
  REBOOT_RASPI: 'rebootRaspi',
  REBOOT_SERVER: 'rebootServer',
  GET_CONFIG: 'getConfig',
  SET_CONFIG: 'setConfig',
  GET_CONFIG_LIST: 'getConfigList',
  GET_CONFIG_OPTIONS: 'getConfigOptions',
  PLAY_ID_LIST: 'playIdList',
  ADD_TRACKS_TO_QUEUE: 'addTracksToQueue',
  REMOVE_TRACKS_FROM_QUEUE: 'removeTracksFromQueue',
  PLAY_TRACK_NEXT: 'playTrackNext',
  PLAY_TRACK_OF_QUEUE: 'playTrackOfQueue'
}
