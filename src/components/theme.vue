
<template>
  <v-layout justify-center align-center>
    <v-container fluid grid-list-md>
    <v-card class="mx-auto" :color="$store.state.theme.tone" dark max-width="400">
      <v-card-title>
        <v-icon large left>
          face
        </v-icon>
        <span class="title font-weight-light">Theme</span>
      </v-card-title>

      <v-card-text class="headline font-weight-bold">
        <p class="display-1 font-weight-light">当前主题
          <v-chip :color="$store.state.theme.tone + ' lighten-1'">
            <v-avatar>
              <v-icon>account_circle</v-icon>
            </v-avatar> {{ toneNow.replace('theme--dark','') }}
          </v-chip>
        </p>
      <v-flex xs12 sm6>
        <v-select solo :items="themes" :color="$store.state.theme.tone" label="选择颜色" v-model="tone"></v-select>
      </v-flex>
      </v-card-text>

      <v-card-actions>
        <v-list-tile class="grow">
          <v-list-tile-avatar color="grey darken-3">
            <v-img class="elevation-6" :src="`http://q1.qlogo.cn/g?b=qq&nk=${$store.state.userData.qq}&s=640`"></v-img>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ $store.state.userData.username }}</v-list-tile-title>
          </v-list-tile-content>

          <v-layout align-center justify-end>
            <v-icon class="mr-1">favorite</v-icon>
            <span class="subheading mr-2">12346</span>
            <span class="mr-1">·</span>
            <v-icon class="mr-1">share</v-icon>
            <span class="subheading">9876</span>
          </v-layout>
        </v-list-tile>
      </v-card-actions>
    </v-card>
    </v-container>
  </v-layout>
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
