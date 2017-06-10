<template>
  <v-list dense>
    <template v-for="(item, i) in items">
      <v-layout row v-if="item.heading" align-center :key="i">
        <v-flex xs6>
          <v-subheader v-if="item.heading">
            {{ item.heading }}
          </v-subheader>
        </v-flex>
      </v-layout>
      <v-divider dark v-else-if="item.divider" class="my-4" :key="i"></v-divider>
      <router-link :to="item.link" v-else>
        <v-list-item :key="i" class="drawer-link">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-item>
      </router-link>
    </template>
  </v-list>
</template>

<script>

  export default {
    name: 'app',
    data () {
      return {
        items: [
          {icon: 'music_note', text: 'Library', link: '/'},
          {divider: true},
          {heading: 'Playlists'},
          {icon: 'queue_music', text: 'Queue', link: '/queue'},
          {divider: true},
          {heading: 'System'},
          {icon: 'lightbulb_outline', text: 'Light', link: '/light'},
          {icon: 'power_settings_new', text: 'Power', link: '/power'},
          {icon: 'settings', text: 'Settings', link: '/settings'}
        ]
      }
    }
  }
</script>

<style scoped>
  .router-link-exact-active > li {
    background: #1976d2;
  }

  .router-link-exact-active div, .router-link-exact-active i {
    color: white !important;
  }

  .drawer-link {
    transition: .3s cubic-bezier(.25,.8,.25,1);
  }
</style>
