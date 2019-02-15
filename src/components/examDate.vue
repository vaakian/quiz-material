<template>
  <v-layout justify-center align-center>
    <v-container fluid grid-list-md>
    <v-card class="mx-auto" :color="$store.state.theme.tone" dark max-width="400">
      <v-card-title>
        <v-icon large left>
          date_range
        </v-icon>
        <span class="title font-weight-light">2019年06月09日)高考-文化</span>
      </v-card-title>
      <v-card-text class="display-1 font-weight-bold">
        <!-- <p class="heading font-weight-bold mx-4"> -->
          还剩：{{ leftDay }}天
      </v-card-text>
    </v-card>
    <br>
    <v-card class="mx-auto" :color="$store.state.theme.tone" dark max-width="400">
      <v-card-title>
        <v-icon large left>
          date_range
        </v-icon>
        <span class="title font-weight-light">2019年04月09日)高考-专业</span>
      </v-card-title>
      <v-card-text class="display-1 font-weight-bold">
        <!-- <p class="heading font-weight-bold mx-4"> -->
          还剩：{{ leftDay - 61 }}天
      </v-card-text>
    </v-card>
  <br>
    <v-card class="mx-auto" :color="$store.state.theme.tone" dark max-width="400">
      <v-card-title>
        <v-icon large left>
          date_range
        </v-icon>
        <span class="title font-weight-light">2019年04月15日)高考-专业</span>
      </v-card-title>
      <v-card-text class="display-1 font-weight-bold">
        <!-- <p class="heading font-weight-bold mx-4"> -->
          还剩：{{ leftDay - 55 }}天
      </v-card-text>
    </v-card>
    <br>
    <v-card class="mx-auto" :color="$store.state.theme.tone" dark max-width="400">
      <v-card-title>
        <v-icon large left>
          date_range
        </v-icon>
        <span class="title font-weight-light">2019年04月22日)高考-专业</span>
      </v-card-title>
      <v-card-text class="display-1 font-weight-bold">
        <!-- <p class="heading font-weight-bold mx-4"> -->
          还剩：{{ leftDay - 48 }}天
      </v-card-text>
    </v-card>
    </v-container>
  </v-layout>
</template>
<script>
export default {
    data: () => ({
        
    }),
    activated() {
      this.$store.state.tbTitle = '倒计时'
    }, 
    computed: {
        leftDay() {
           let d69 = 1560036600000
            let now = new Date()
            let second =  d69 - now.getTime()
            return Math.floor(second/(24*3600*1000))
        }
    }
}
</script>
