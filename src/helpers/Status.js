/**
 * Created by Patrick on 04.06.2017.
 */

import { colorIntToRGB, getSortFunc, RGBtoColorInt, showAlert } from './util'
export class Status {
  constructor () {
    this.type = ''
    this.fileNotFound = false
    this.colorMode = 'music' // custom; colorCircle; music
    this.currentColor = 0
    this.whiteBrightness = 0
    this.animationBrightness = 100
    this.currentTitle = ''
    this.currentAlbum = ''
    this.currentArtist = ''
    this.currentTrackId = -1
    /**
     * Keine Wiederholung "none", Datei wiederholen "track", Alles wiederholen "all"
     * @type {String}
     */
    this.repeatMode = 'all'
    this.shuffle = true
    this.volume = 70
    this.trackLength = 100
    this.playPosition = 0
    this.playing = false
    this.tracks = new Map()
    this.playLists = new Map()
    this.artists = new Map()
    this.albums = new Map()
    this.trackQueue = []
  }

  /**
   * Updated den Status und gibt true zurück, wenn ein neuer Track läuft.
   *
   * @param {Status} newStatus Der neue Status
   * @param {[Track]} newStatus.tracks Trackliste
   * @param {[Playlist]} newStatus.playLists Trackliste
   * @return {boolean}
   */
  updateStatus (newStatus) {
    let newTrack = false

    if (newStatus.type === 'config') {
      return false
    }

    // upload initiieren
    if (newStatus.type === 'file_status') {
      if (newStatus.fileNotFound) {
        showAlert('Fehler:', 'file not found', 'warning')
      }
    } else if (newStatus.type === 'status' || newStatus.type === 'library') {
      if (this.trackLength !== newStatus.trackLength || this.currentTitle !== newStatus.currentTitle ||
        this.currentArtist !== newStatus.currentArtist) {
        newTrack = true
      }

      this.colorMode = newStatus.colorMode
      this.currentColor = newStatus.currentColor
      this.whiteBrightness = newStatus.whiteBrightness
      this.animationBrightness = newStatus.animationBrightness
      this.repeatMode = newStatus.repeatMode
      this.shuffle = newStatus.shuffle
      this.volume = newStatus.volume

      this.currentTitle = newStatus.currentTitle
      this.currentAlbum = newStatus.currentAlbum
      this.currentArtist = newStatus.currentArtist
      this.currentTrackId = newStatus.currentTrackId
      this.trackLength = newStatus.trackLength
      this.playPosition = newStatus.playPosition
      this.playing = newStatus.playing

      // wenn TrackQueue noch nicht gesetzt ist, existiert noch kein playback
      if (newStatus.trackQueue) {
        this.trackQueue = newStatus.trackQueue.trackIdList
      }
    }

    if (newStatus.type === 'library') {
      // TODO only collect tracks, collect artists and albums only when needed in components
      let newTracks = new Map()
      let newArtists = new Map()
      let newAlbums = new Map()
      for (let track of newStatus.tracks) {
        // in tracks einfügen, mit ID als key
        newTracks.set(track.id, track)

        // in artists einfügen, mit Künstlername als key und Artist-Objekt als value
        if (track.artist.length > 0) {
          // create new artist if not exists
          if (!newArtists.has(track.artist)) {
            let artist = new Artist()
            artist.artist = track.artist
            newArtists.set(track.artist, artist)
          }

          newArtists.get(track.artist).trackList.push(track)
        }
        // in albums einfügen, mit Albumtitel als key und Album-Objekt als value
        if (track.album) {
          if (!newAlbums.has(track.album)) {
            let album = new Album()
            album.album = track.album
            album.artist = track.artist
            newAlbums.set(track.album, album)
          }
          newAlbums.get(track.album).trackList.push(track)
        }
      }
      this.albums = newAlbums
      this.tracks = newTracks
      this.artists = newArtists

      // Tracklisten bei Künstler und Alben sortieren
      let sortList = function (value) {
        value.trackList.sort(getSortFunc('title', 0))
      }

      this.artists.forEach(sortList)
      this.albums.forEach(sortList)

      // playlists einfügen
      let newPlaylists = new Map()
      let status = this

      for (let playList of newStatus.playLists) {
        playList.trackList = []
        playList.trackIdList.forEach(function (id) {
          playList.trackList.push(status.tracks.get(id))
        })
        newPlaylists.set(playList.id, playList)
      }
      this.playLists = newPlaylists
      this.playLists.forEach(sortList)
    }

    return newTrack
  }

  /**
   * Erstellt eine neue Farbe aus der aktuellen Farbe und den angegebenen Komponenten. Wenn eine Komponente <0 ist, wird
   * der aktuelle Wert des Status verwendet.
   * @param {number} r Rot
   * @param {number} g Grün
   * @param {number} b Blau
   * @returns {number}
   */
  getNewColor (r, g, b) {
    let currentColor = colorIntToRGB(this.currentColor)
    if (r < 0) {
      r = currentColor.r
    }
    if (g < 0) {
      g = currentColor.g
    }
    if (b < 0) {
      b = currentColor.b
    }
    return RGBtoColorInt(r, g, b)
  }

  getArtists () {
    let artistArray = []

    for (let track of this.tracks.values()) {
      // in artists einfügen, mit Künstlername als key und Artist-Objekt als value
      if (track.artist && track.artist.length > 0) {
        // search for existing artist
        let found = false
        for (let art of artistArray) {
          if (art.artist === track.artist) {
            found = true
            break
          }
        }
        // add new artist if not exists
        if (!found) {
          let artist = new Artist()
          artist.artist = track.artist
          artistArray.push(artist)
        }
      }
    }
    return artistArray
  }

  getAlbums () {
    let albumArray = []

    for (let track of this.tracks.values()) {
      // in artists einfügen, mit Künstlername als key und Artist-Objekt als value
      if (track.album && track.album.length > 0) {
        // search for existing artist
        let found = false
        for (let album of albumArray) {
          if (album.album === track.album) {
            found = true
            break
          }
        }
        // add new artist if not exists
        if (!found) {
          let album = new Album()
          album.album = track.album
          album.artist = track.artist
          albumArray.push(album)
        }
      }
    }
    return albumArray
  }
}

export function Track () {
  this.id = 0
  this.title = ''
  this.artist = ''
  this.album = ''
  this.trackLength = ''
}

export function Playlist () {
  this.id = 0
  this.name = ''
  /**
   * @type {Array.Number}
   */
  this.trackIdList = []
  /**
   *
   * @type {Array}
   */
  this.trackList = []
}

export function Album () {
  this.album = ''
  this.artist = ''
  this.trackList = []
}

export function Artist () {
  this.artist = ''
  this.trackList = []
}

export function Config () {
  this.name = ''
  this.value = ''
  this.config = []
  this.configOptions = []
}
