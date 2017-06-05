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
      <track-list></track-list>
    </v-tabs-content>
    <v-tabs-content id="'library-tabs-artists'">
      <v-card flat>
        <v-card-text>{{ text }}</v-card-text>
      </v-card>
    </v-tabs-content>
    <v-tabs-content id="'library-tabs-albums'">
      <v-card flat>
        <v-card-text>{{ text }}</v-card-text>
      </v-card>
    </v-tabs-content>
  </v-tabs>
</template>

<script>
  import TrackList from './TrackList.vue'

  export default {
    data () {
      return {
        active: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    },
    components: {
      TrackList
    }
  }
</script>
