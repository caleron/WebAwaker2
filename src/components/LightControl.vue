<template>
  <v-container fluid>
    <v-card>
      <v-card-text>
        <v-container fluid class="first-card">
          <v-layout row wrap>
            <v-slider label="White brightness:" dark v-bind:max="100" hide-details
                      v-model="status.whiteBrightness" thumb-label @input="changeWhiteBrightness"></v-slider>
          </v-layout>
          <v-layout row wrap>
            <v-slider label="Animation brightness:" dark v-bind:max="100" hide-details
                      v-model="status.animationBrightness" thumb-label @input="changeAnimationBrightness"></v-slider>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs2 class="pa-0">
              <label class="pt-4 color-mode-label" style="display: inline-block;">Color mode:</label>
            </v-flex>
            <v-flex xs10>
              <v-select :items="colorModes" v-model="currentColorMode" label="Select" dark single-line auto
                        @input="changeColorMode"></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
    <v-card class="mt-3">
      <v-card-row height="100px" v-bind:style="{ background: `rgb(${color.r}, ${color.g}, ${color.b})` }"></v-card-row>
      <v-card-text>
        <v-container fluid>
          <v-slider label="Red:" dark v-bind:max="255" v-model="color.r" thumb-label hide-details
                    :disabled="!colorSliderEnabled" @input="changeColor('r', $event)"></v-slider>
          <v-slider label="Green:" dark v-bind:max="255" v-model="color.g" thumb-label hide-details
                    :disabled="!colorSliderEnabled" @input="changeColor('g', $event)"></v-slider>
          <v-slider label="Blue:" dark v-bind:max="255" v-model="color.b" thumb-label hide-details
                    :disabled="!colorSliderEnabled" @input="changeColor('b', $event)"></v-slider>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import { status } from '../services/connect'
  import { Command } from '../helpers/command'
  import { colorModes } from '../helpers/Status'
  import { debounce } from '../helpers/util'

  export default {
    data () {
      return {
        status,
        colorModes
      }
    },
    created () {
      window.t = this
    },
    computed: {
      color () {
        // necessary for the color sliders
        return status.currentColor
      },
      colorSliderEnabled () {
        return status.getCurrentColorMode().key === 'custom'
      },
      currentColorMode: {
        // is v-model for the color mode selector (getter and setter required)
        get () {
          return status.getCurrentColorMode()
        },
        set (val) {
          status.colorMode = val.key
          Command.setColorMode(val.key)
        }
      }
    },
    methods: {
      changeColorMode (val) {
        Command.setColorMode(val.key)
      },
      changeColor: debounce((color, value) => {
        if (color === 'r') {
          Command.setRGBColor(value, status.currentColor.g, status.currentColor.b)
        } else if (color === 'g') {
          Command.setRGBColor(status.currentColor.r, value, status.currentColor.b)
        } else if (color === 'b') {
          Command.setRGBColor(status.currentColor.r, status.currentColor.g, value)
        }
      }, 100, true),
      changeWhiteBrightness: debounce((val) => {
        Command.setWhiteBrightness(val)
      }, 100, true),
      changeAnimationBrightness: debounce((val) => {
        Command.setAnimationBrightness(val)
      }, 100, true)
    }
  }
</script>

<style>
  .first-card .input-group--slider label {
    flex-basis: 200px;
  }

  .color-mode-label {
    font-size: 18px;
    color: black;
  }
</style>
