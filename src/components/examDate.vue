<template>
  <v-layout justify-center align-center>
    <v-container fluid grid-list-md>
    <v-card class="mx-auto" :color="$store.state.theme.tone" dark max-width="400">
      <v-card-title>
        <v-icon large left>
          date_range
        </v-icon>
        <span class="title font-weight-light">2020年06月07日)高考-文化</span>
      </v-card-title>
      <v-card-text class="display-1 font-weight-bold">
        <!-- <p class="heading font-weight-bold mx-4"> -->
          还剩：{{ leftDay }}天
      </v-card-text>
    </v-card>
    <br>
    <!-- <v-card class="mx-auto" :color="$store.state.theme.tone" dark max-width="400">
      <v-card-title>
        <v-icon large left>
          date_range
        </v-icon>
        <span class="title font-weight-light">2020年04月09日)高考-专业</span>
      </v-card-title>
      <v-card-text class="display-1 font-weight-bold">
          <span v-if="leftDay - 61 > 0">
              还剩：{{ leftDay - 61 }}天
          </span>
          <span v-else>
            已经考完啦！
          </span>
      </v-card-text>
    </v-card> -->
  <br>
    <v-card class="mx-auto" :color="$store.state.theme.tone" dark max-width="400">
      <v-card-title>
        <v-icon large left>
          date_range
        </v-icon>
        <span class="title font-weight-light">2020年04月14日)高考-专业</span>
      </v-card-title>
      <v-card-text class="display-1 font-weight-bold">
        <!-- <p class="heading font-weight-bold mx-4"> -->
          <span v-if="leftDay - 55 > 0">
              还剩：{{ leftDay - 55 }}天
          </span>
          <span v-else>
            已经考完啦！
          </span>
      </v-card-text>
    </v-card>
    <br>
    <v-card class="mx-auto" :color="$store.state.theme.tone" dark max-width="400">
      <v-card-title>
        <v-icon large left>
          date_range
        </v-icon>
        <span class="title font-weight-light">2020年04月22日)高考-专业</span>
      </v-card-title>
      <v-card-text class="display-1 font-weight-bold">
        <!-- <p class="heading font-weight-bold mx-4"> -->
         <span v-if="leftDay - 48 > 0">
              还剩：{{ leftDay - 48 }}天
          </span>
          <span v-else>
            已经考完啦！
          </span>
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
           let d69 = 1591486200000
            let now = new Date()
            let second =  d69 - now.getTime()
            return Math.floor(second/(24*3600*1000))
        }
    }
}
</script>
