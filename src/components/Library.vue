<template>
  <v-tabs id="library-tabs" grow scroll-bars v-model="active" light>
    <v-tabs-bar slot="activators">
      <v-tabs-item href="'#library-tabs-tracks'" ripple>
        Tracks
      </v-tabs-item>
      <v-tabs-item href="'#library-tabs-artists'" ripple>
        Artists
      </v-tabs-item>
      <v-tabs-item href="'#library-tabs-albums'" ripple>
        Albums
      </v-tabs-item>
      <v-tabs-slider></v-tabs-slider>
    </v-tabs-bar>
    <v-tabs-content id="'library-tabs-tracks'">
      <track-list :tracks="tracks" :queue="true"></track-list>
    </v-tabs-content>
    <v-tabs-content id="'library-tabs-artists'">
      <artist-list :server-status="serverStatus"></artist-list>
    </v-tabs-content>
    <v-tabs-content id="'library-tabs-albums'">
      <album-list :server-status="serverStatus"></album-list>
    </v-tabs-content>
  </v-tabs>
</template>

<script>
  import TrackList from './TrackList.vue'
  import ArtistList from './ArtistList.vue'
  import AlbumList from './AlbumList.vue'
  import { status } from '../services/connect'

  export default {
    data () {
      return {
        active: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        serverStatus: status
      }
    },
    components: {
      TrackList,
      ArtistList,
      AlbumList
    },
    computed: {
      tracks () {
        if (status === undefined || status === null || status.tracks.size === 0) {
          return [{title: 'No Track found'}]
        }
        let arr = []
        for (let track of status.tracks.values()) {
          arr.push(track)
        }
//        return collectMapValues(this.serverStatus.tracks)
        return arr
      }
    }
  }
</script>
