<template>
  <v-app id="example-1">
    <v-navigation-drawer persistent v-model="drawer" light enable-resize-watcher>
      <v-list class="pa-0">
        <v-list-item>
          <v-list-tile avatar tag="ul"></v-list-tile>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
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
      <v-container fluid class="pa-0">
        <router-view></router-view>
      </v-container>
    </main>
    <v-footer class="indigo">
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

<style>
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
