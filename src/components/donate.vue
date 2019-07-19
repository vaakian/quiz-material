<template>
  <div id="donate">
    <v-layout justify-center>
      <v-flex xs12 sm3>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex xs12>
              <p class="mx-2 title font-weight-regular text--center">小弟服务器扛不住了，大爷赏点儿吧~</p>
            </v-flex>
            <v-flex v-for="card in cards" v-bind="{ [`xs${card.flex}`]: true }" :key="card.title">
              <v-card raised style="border-radius: 13px; text-align: center" :color="card.color">
                <v-img :src="card.src" :height="card.height" :color="card.color">
                </v-img>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <span class="headline" style="color: white" v-html="card.title"></span>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
  export default {
    data: () => ({
      cards: [{
          title: '微信支付',
          src: '/static/qr_wepay.png',
          flex: 12,
          color: 'green',
        },
        {
          title: '支付宝',
          src: '/static/qr_alipay.png',
          flex: 12,
          color: 'light-blue'
        },
        {
          title: '支付宝搜索红包码<br><span style="color: #e7ee98">612333303</span>',
          src: '/static/redpack.png',
          flex: 12,
          color: '#d61528',
          //   height:'265',
        }
      ]
    }),
    activated() {
      this.$store.state.tbTitle = '打赏作者'
    }
  }

</script>
