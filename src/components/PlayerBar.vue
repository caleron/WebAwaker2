<template>
  <v-layout row wrap flex>
    <v-flex xs2 offset-xs1 style="display: flex">
      <v-spacer></v-spacer>
      <v-icon class="deep-orange--text">skip_previous</v-icon>
      <v-icon class="deep-orange--text">play_arrow</v-icon>
      <v-icon class="deep-orange--text">skip_next</v-icon>
    </v-flex>
    <v-flex xs6>
      <v-slider v-on:input="positionChanged" v-on:mouseup.native="mouseup" v-model="playProgress" dark thumb-label
                :max="200" class="ma-0"
                :hide-details="true"></v-slider>
    </v-flex>
    <v-flex xs2 style="display: flex">
      <v-icon class="deep-orange--text">shuffle</v-icon>
      <v-icon class="deep-orange--text">repeat</v-icon>
      <v-spacer></v-spacer>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        playProgress: 0,
        hello: 1
      }
    },
    methods: {
      positionChanged (value) {
        window.console.log(value)
      },
      mouseup (v) {
        window.console.log(v)
      }
    }
  }
</script>

<style scoped="">
  .icon {
    font-size: 2.3em;
    cursor: pointer;
  }
</style>
