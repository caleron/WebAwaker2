<template>
  <v-app>
    <v-navigation-drawer persistent clipped v-model="drawer" light enable-resize-watcher class="pt-3">
      <drawer-menu></drawer-menu>
    </v-navigation-drawer>
    <toolbar @toggle="toggleDrawer"></toolbar>
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
  import Toolbar from './components/Toolbar.vue'
  import { status } from './services/connect'

  export default {
    data () {
      return {
        drawer: true
      }
    },
    methods: {
      toggleDrawer () {
        this.drawer = !this.drawer
      }
    },
    computed: {
      playPosition () {
        return status.playPosition
      }
    },
    components: {
      PlayerBar,
      DrawerMenu,
      Toolbar
    }
  }
</script>

<style lang="scss">
  $footer-height: 55px;

  #main-container {
    margin-bottom: $footer-height;
    min-height: calc(100vh - 56px - #{$footer-height});
  }

  #main-footer {
    height: $footer-height;
    width: 100%;
    position: fixed;
    bottom: 0;
  }

  a {
    text-decoration: none;
  }
</style>
