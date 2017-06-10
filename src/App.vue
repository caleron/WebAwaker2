<template>
  <v-app>
    <v-navigation-drawer persistent clipped v-model="drawer" light enable-resize-watcher class="pt-3">
      <drawer-menu></drawer-menu>
    </v-navigation-drawer>
    <v-toolbar class="indigo" light>
      <v-toolbar-side-icon light @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Toolbar</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon light>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
    <main>
      <v-container fluid class="pa-0" id="main-container">
        <router-view></router-view>
      </v-container>
    </main>
    <v-footer class="indigo" id="main-footer">
      <player-bar></player-bar>
    </v-footer>
  </v-app>
</template>

<script>
  import PlayerBar from './components/PlayerBar.vue'
  import DrawerMenu from './components/DrawerMenu.vue'
  import { initSocket } from './services/connect'

  initSocket()

  export default {
    name: 'app',
    data () {
      return {
        drawer: true
      }
    },
    components: {
      PlayerBar,
      DrawerMenu
    }
  }
</script>

<style lang="scss">
  $footer-height: 55px;

  #main-container {
    min-height: calc(100vh - 56px - #{$footer-height});
  }

  #main-footer {
    height: $footer-height;
  }

  a {
    text-decoration: none;
  }
</style>
