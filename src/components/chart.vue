<template>
  <v-layout justify-center>
    <v-flex xs12>
      <v-container fluid grid-list-md>
        <v-card class="mx-auto" :color="theme.tone" dark>
          <v-card-title>
            <v-icon large left>
              loyalty
            </v-icon>
            <span class="title font-weight-light">MyCollection</span>
          </v-card-title>
          <v-card-text class="headline font-weight-bold" v-if="isLogin">
            <div id="favRatioDiv" style="width:100%;height: 250px;">share</div>
            <v-data-table :headers="headers" :items="favRatio" light class="elevation-1" hide-actions>
              <template slot="items" slot-scope="props">
                <td class="text-xs-center">{{ props.item.name }}</td>
                <td class="text-xs-center">{{ props.item.value }}</td>
              </template>
            </v-data-table>
            <!-- {{ favRatio }} -->
            <!-- "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well." -->
          </v-card-text>
          <v-card-text class="headline font-weight-bold" v-else>
              未登录，请登录或注册后使用此功能~
          </v-card-text>

          <v-card-actions>
            <v-list-tile class="grow">
              <v-list-tile-avatar color="grey darken-3">
                <v-img class="elevation-6" :src="isLogin ? `http://q1.qlogo.cn/g?b=qq&nk=${userData.qq}&s=640`:`0`"></v-img>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ isLogin ? userData.username: 'error' }}</v-list-tile-title>
              </v-list-tile-content>

              <v-layout align-center justify-end>
                <v-icon class="mr-1">favorite</v-icon>
                <span class="subheading mr-2">{{ favCount }}</span>
                <span class="mr-1">·</span>
                <v-icon class="mr-1">opacity</v-icon>
                <span class="subheading">{{ isLogin ? favRatio.length: 0 }}</span>
              </v-layout>
            </v-list-tile>
          </v-card-actions>
        </v-card>
      </v-container>

    </v-flex>
  </v-layout>
</template>
<script>
  import {
    mapState
  } from 'vuex'
  export default {
    name: 'chart',
    data: () => ({
      favRatio: [],
      headers: [{
          text: '分类',
          align: 'center',
          sortable: false,
          value: 'name'
        },
        {
          text: '计数',
          value: 'value',
          align: 'center'
        }
      ]
    }),
    activated() {
        if(this.isLogin)
            this.setFavRatio()
      this.$store.state.tbTitle = '统计图'
    },
    computed: {
      ...mapState([
        'userData',
        'theme',
        // ''

      ]),
      favCount() {
        let count = 0
        for (let i = 0; i < this.favRatio.length; i++)
          count = count + this.favRatio[i].value
        return count
      },
      isLogin() {
          return this.userData.username && this.userData.token
      }
    },
    methods: {
      setFavRatio: function () {
        let mainUrl = this.$store.state.mainUrl
        let url = mainUrl + "user/getFavRatio"
        this.$store.state.showLoading = true
        this.axios.get(url, {
          params: {
            usr: this.$store.state.userData.username,
            token: this.$store.state.userData.token,
          }
        }).then(rsp => {
          this.favRatio = rsp.data.data
          this.$store.state.showLoading = false
          var myChart = echarts.init(document.getElementById('favRatioDiv'));
          window.onresize = myChart.resize;
          var options = {
            series: [{
              name: '收藏统计图',
              type: 'pie',
              radius: '50%',
              data: this.favRatio,
              label: {

                normal: {
                  textStyle: {
                    color: 'white',
                    fontWeight: 400,
                    fontSize: 16
                  },
                  show: true,
                  formatter: '{c}#{b}'
                }
              },
            }]
          };
          myChart.setOption(options);
        }).catch(function (rsp) {
          this.$store.state.showLoading = false
          this.$store.dispatch('networkErr')
        })

      }
    }
  }

</script>
