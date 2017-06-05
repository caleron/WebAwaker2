<template>
  <v-list two-line>
    <template v-for="item in tracks">
      <v-divider v-if="item.divider" inset="true"></v-divider>
      <v-list-item v-bind:key="item.title" @click.stop="playTrack(item)">
        <v-list-tile avatar>
          <v-list-tile-avatar v-if="item.avatar">
            <img v-bind:src="item.avatar">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="item.title"></v-list-tile-title>
            <v-list-tile-sub-title>
              <span class='grey--text text--darken-2 pr-1'>{{item.album}}</span>{{ item.artist }}
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
  import { Command } from '../helpers/command'

  export default {
    props: ['tracks', 'playlistId', 'queue'],
    data () {
      return {}
    },
    methods: {
      playTrack (track) {
        if (this.queue) {
          Command.playTrackOfQueue(track.id)
        } else if (this.playlistId) {
          Command.playTrackOfPlaylist(this.playlistId, track.id)
        } else {
          Command.playId(track.id)
        }
      }
    }
  }
</script>
