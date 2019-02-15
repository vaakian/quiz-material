<template>
  <v-layout justify-center align-center>
    <v-container fluid grid-list-md>
    <v-card class="mx-auto" color="#26c6da" dark max-width="400">
      <v-card-title>
        <v-icon large left>
          face
        </v-icon>
        <span class="title font-weight-light">AboutDeveloper</span>
      </v-card-title>

      <v-card-text class="headline font-weight-bold">
        <p class="heading font-weight-bold mx-4">
          荆州人，<br>
          18年技能高考生，<br>
          计算机专业，<br>
          专业总分487，<br>
          文化总分没脸说，<br>
          现就读于湖北理工学院。</p>
        <p class="heading mx-4">不写介绍了hh</p>
      </v-card-text>

      <v-card-actions>
        <v-list-tile class="grow">
          <v-list-tile-avatar color="grey darken-3">
            <v-img class="elevation-6" src="http://q1.qlogo.cn/g?b=qq&nk=861729091&s=640"></v-img>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>:-(</v-list-tile-title>
          </v-list-tile-content>

          <v-layout align-center justify-end>
            <v-icon class="mr-1">favorite</v-icon>
            <span class="subheading mr-2">256</span>
            <span class="mr-1">·</span>
            <v-icon class="mr-1">remove_red_eye</v-icon>
            <span class="subheading">8547</span>
          </v-layout>
        </v-list-tile>
      </v-card-actions>
    </v-card>


    
    </v-container>
  </v-layout>
</template>
<script>
export default {
  activated() {
    this.$store.state.tbTitle = '关于作者'
  }
}
</script>
