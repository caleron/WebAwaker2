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
      <v-list-item :key="i" v-else>
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
    </template>
  </v-list>
</template>

<script>

  export default {
    name: 'app',
    data () {
      return {
        items: [
          {icon: 'music_note', text: 'Library'},
          {divider: true},
          {heading: 'Playlists'},
          {icon: 'queue_music', text: 'Queue'},
          {divider: true},
          {heading: 'System'},
          {icon: 'lightbulb_outline', text: 'Light'},
          {icon: 'power_settings_new', text: 'Power'},
          {icon: 'settings', text: 'Settings'}
        ]
      }
    }
  }
</script>
