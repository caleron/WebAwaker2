<template>
  <v-toolbar class="indigo" light>
    <v-toolbar-side-icon light @click.native.stop="toggleClick"></v-toolbar-side-icon>
    <v-toolbar-title>{{ status.connectionStatus }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon light>
      <v-icon>search</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
  import { status } from '../services/connect'

  export default {
    name: 'hello',
    data () {
      return {
        status
      }
    },
    methods: {
      toggleClick () {
        this.$emit('toggle')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
