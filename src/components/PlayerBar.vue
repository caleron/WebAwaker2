<template>
  <nav>
    <div>
      <v-icon class="deep-orange--text" @click="playPrevious">skip_previous</v-icon>
      <v-icon class="deep-orange--text" @click="togglePlayPause">{{togglePlayPauseIcon}}</v-icon>
      <v-icon class="deep-orange--text" @click="playNext">skip_next</v-icon>
    </div>
    <div class="center-box">
      <div class="playbar-title">
        <span>{{ title }}</span> - <span class="playbar-artist">{{ artist }}</span>
      </div>
      <div class="progress-box">
        <span>{{ playPositionStr }}</span>
        <v-slider v-on:input="positionChanged" v-model="playPosition" dark thumb-label
                  :max="trackLength" class="ma-0 px-3" :hide-details="true" style="flex-grow: 1;"></v-slider>
        <span>{{ trackLengthStr }}</span>
      </div>
    </div>
    <div>
      <v-icon class="deep-orange--text" @click="toggleShuffle">shuffle</v-icon>
      <v-icon class="deep-orange--text" @click="toggleRepeat">{{ repeatIcon }}</v-icon>
    </div>
  </nav>
</template>

<script>
  import { Command } from '../helpers/command'
  import { status } from '../services/connect'
  import { debounce, timeString } from '../helpers/util'

  let update = debounce((value) => {
    window.console.log('call')
    Command.playFromPosition(value)
  }, 500)

  export default {
    data () {
      return {}
    },
    computed: {
      playPosition () {
        return status.playPosition
      },
      playPositionStr () {
        return timeString(status.playPosition)
      },
      trackLength () {
        return status.trackLength
      },
      trackLengthStr () {
        return timeString(status.trackLength)
      },
      title () {
        return status.currentTitle
      },
      artist () {
        return status.currentArtist
      },
      repeatIcon () {
        return status.repeatMode === 'track' ? 'repeat_one' : 'repeat'
      },
      togglePlayPauseIcon () {
        return status.playing ? 'play_arrow' : 'pause'
      }
    },
    methods: {
      positionChanged (value) {
        status.playPositionTimer.stop()
        update(value)
      },
      positionChangeds (val, str, i) {
        window.console.log(val)
        window.console.log(str)
        window.console.log(i)
      },
      toggleShuffle () {
        Command.setShuffle(!status.shuffle)
      },
      toggleRepeat () {
        Command.setRepeatMode(status.getNextRepeatMode())
      },
      togglePlayPause () {
        Command.togglePlayPause()
      },
      playNext () {
        Command.playNext()
      },
      playPrevious () {
        Command.playPrevious()
      }
    }
  }
</script>

<style scoped="">
  .slider__thumb-container {
    transition: 1s ease !important;
  }

  .icon {
    font-size: 2.3em;
    cursor: pointer;
    height: 100%;
  }

  nav {
    flex-direction: row;
    display: flex;
    width: 80%;
    margin: auto !important;
  }

  .center-box {
    flex-grow: 1;
    padding: 0 5px 8px 5px;
  }

  .playbar-title {
    text-align: center;
    height: 10px;
  }

  .playbar-artist {

  }

  .progress-box {
    display: flex;
  }

  .progress-box > span {
    padding-top: 4px;
  }
</style>
