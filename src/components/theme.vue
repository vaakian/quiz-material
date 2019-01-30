<template>
  <div id="theme">
    <v-layout justify-center align-center row wrap>
      <p class="display-1 font-weight-light">当前主题
          <v-chip :color="$store.state.theme.tone">
            <v-avatar>
              <v-icon>account_circle</v-icon>
            </v-avatar> {{ toneNow.replace('theme--dark','') }}

          </v-chip>
        </p>
      <v-flex xs12 sm6>
        <v-select solo :items="themes" label="选择颜色" v-model="tone"></v-select>
      </v-flex>
    </v-layout>

  </div>
</template>
<script>
  export default {
    name: 'theme',
    data() {
      return {
        tone: this.$store.state.theme.tone,
        themes: [
          'primary',
          'pink',
          'red',
          'dark',
          'purple',
          'deep-purple',
          'indigo',
          'blue',
          'light-blue',
          'cyan',
          'teal',
          'green',
          'light-green',
          'lime',
          'yellow',
          'amber',
          'orange',
          'deep-orange',
          'brown',
          'blue-grey',
          'grey'
        ]
      }
    },
    activated() {
      this.$store.state.tbTitle = '切换主题'
    },
    computed: {
      toneNow() {
        this.updateTheme()
        localStorage.setItem('tone', this.tone)
        return this.tone
      }
    },
    methods: {
      updateTheme() {
        this.$store.state.theme.tone = this.tone + ' theme--dark'
      }
    }
  }

</script>
