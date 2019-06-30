<template>
  <v-timeline>
    <v-timeline-item
      v-for="(item, key) in timeLineItems"
      :key="key"
      color="red lighten-2"
      large
    >
      <template v-slot:opposite>
        <span></span>
      </template>
      <v-card class="elevation-2">
        <v-card-title class="headline">{{ item.title }}</v-card-title>
        <v-card-text v-html="item.context">
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>
<script>
export default {
  data() {
    return {
      timeLineItems: [
        {
          title: '技能考试 ',
          context: '考试地点：武汉职业技术学院<br>考试时间：4月14日-4月22日'
        },
        {
          title: '技能成绩公布',
          context: '查询地址：http://kscx.hbee.edu.cn:9012/gk/zzjx2019<br>公布时间：5月10日左右'
        },
        {
          title: '文化考试',
          context: '考试地点：各市自行分配。<br>考试时间：6月7日'
        },
        {
          title: '文化成绩公布',
          context: '查询地址：http://www.hbea.edu.cn<br>公布时间：6月23日'
        },
        {
          title: '填报志愿',
          context: '填报地址：http://tbzy.hubzs.com.cn/<br>填报时间：6月23日-6月28日'
        },
        {
          title: '投档完成&投档线公布',
          context: '公布地址：http://zsxx.e21.cn<br>公布时间：7月21日左右'
        }
      ]
    }
  },
  activated() {
      this.$store.state.tbTitle = '高考时间线'
    }
}
</script>
