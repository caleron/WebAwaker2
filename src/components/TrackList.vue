<template>
  <v-list two-line>
    <template v-for="item in items">
      <v-divider v-if="item.divider" v-bind:inset="item.inset"></v-divider>
      <v-list-item v-else v-bind:key="item.title" @click.stop="showToast">
        <v-list-tile avatar>
          <v-list-tile-avatar v-if="item.avatar">
            <img v-bind:src="item.avatar">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="item.title"></v-list-tile-title>
            <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
  import { showAlert } from '../helpers/util'
  export default {
    data () {
      return {
        items: [
          {
            title: 'Brunch this weekend?',
            subtitle: "<span class='grey--text text--darken-2'>Ali Connors</span> — I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
          },
          {divider: true, inset: true},
          {
            title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
            subtitle: "<span class='grey--text text--darken-2'>to Alex, Scott, Jennifer</span> — Wish I could come, but I'm out of town this weekend."
          },
          {divider: true, inset: true},
          {
            title: 'Oui oui',
            subtitle: "<span class='grey--text text--darken-2'>Sandra Adams</span> — Do you have Paris recommendations? Have you ever been?"
          }
        ]
      }
    },
    methods: {
      showToast () {
        showAlert('hello', 'its me', 'success')
      }
    }
  }
</script>
