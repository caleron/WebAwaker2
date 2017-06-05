<template>
  <v-list>
    <template v-for="item in artists">
      <v-divider v-if="item.divider" inset="true"></v-divider>
      <v-list-item v-bind:key="item.artist" @click.stop="showAlbum(item)">
        <v-list-tile avatar>
          <v-list-tile-avatar v-if="item.avatar">
            <img v-bind:src="item.avatar">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="item.artist"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>

  export default {
    props: ['serverStatus'],
    data () {
      return {}
    },
    methods: {
      showAlbum (artist) {
      }
    },
    computed: {
      artists () {
        if (!this.serverStatus) {
          return []
        }
        return this.serverStatus.getArtists()
      }
    }
  }
</script>
