<template>
  <v-list two-line>
    <template v-for="item in albums">
      <v-divider v-if="item.divider" inset="true"></v-divider>
      <v-list-item v-bind:key="item.title" @click.stop="showAlbum(item)">
        <v-list-tile avatar>
          <v-list-tile-avatar v-if="item.avatar">
            <img v-bind:src="item.avatar">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="item.album"></v-list-tile-title>
            <v-list-tile-sub-title>
              {{ item.artist }}
            </v-list-tile-sub-title>
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
      albums () {
        if (!this.serverStatus) {
          return []
        }
        return this.serverStatus.getAlbums()
      }
    }
  }
</script>
