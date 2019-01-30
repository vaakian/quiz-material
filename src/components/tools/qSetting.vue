<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-btn round rised block slot="activator" style="width: 273.4px">
          <v-icon>build</v-icon>抽题设置</v-btn>
      <v-card>
        <v-toolbar dark :color="$store.state.theme.tone">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Query Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="updateCG();$store.dispatch('randQuestion');dialog = false">完成</v-btn>
          </v-toolbar-items>
        </v-toolbar>
          <v-card class="mx" style="margin: 10px;">
            <v-toolbar card dense>
              <v-toolbar-title>
                <span class="subheading">抽题设置</span>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-toolbar>

            <v-card-text>
              <v-layout justify-space-between mb-3>
                  <p class="font-weight">抽题数</p>
                  <br>
                  <br>
                <v-flex text-xs-left>
                  <span class="display-3 font-weight-light" v-text="$store.state.questionOptions.count"></span>
                  <span class="subheading font-weight-light mr-1">count</span>
                </v-flex>
              </v-layout>
              <v-slider 
              v-model="$store.state.questionOptions.count"  
              always-dirty 
              min="10" max="200" 
              step="5"
              thumb-size="128"
              tick-size="7"
              style="margin:0 20px;"
              :color="$store.state.theme.tone"
              >
              
              </v-slider>

              <span class="font-weight">选择分类{{ cg }}</span>
                <v-flex xs12 sm12 d-flex>
                <v-select
                :items="items"
                label="选择抽题类别"
                solo
                style="margin: 0 20px;"
                v-model="cg"
                ></v-select>
            </v-flex>
            </v-card-text>


            <v-divider></v-divider>


        <v-list three-line subheader>
          <v-subheader>General</v-subheader>
          <v-list-tile avatar>
            <v-list-tile-action>
              <v-switch :color="$store.state.theme.tone" v-model="isfav" :disabled="!isLoged"></v-switch>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>从我的收藏抽题</v-list-tile-title>
              <v-list-tile-sub-title><span style="color: red" v-show="!isLoged">未登录，登陆后再用此功能~<br/></span>开启后从收藏随机抽题~</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile avatar>
            <v-list-tile-action>
              <v-switch :color="$store.state.theme.tone" v-model="$store.state.showAnswerBtn"></v-switch>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>考试模式</v-list-tile-title>
              <v-list-tile-sub-title>开启后不再提示选项是否正确，完成所有题目后系统将给出本次考试成绩~</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile avatar>
            <v-list-tile-action>
              <v-switch :color="$store.state.theme.tone" v-model="$store.state.hideGroupLink" @change="HideGroupLink"></v-switch>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>隐藏入群链接</v-list-tile-title>
              <v-list-tile-sub-title>屏蔽首页做题选项下的入群链接~</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
          </v-card>


        
      </v-card>
    </v-dialog>
  </v-layout>
</template>


<script>
  export default {
    data() {
      return {
        cg: '',
        dialog: false,
        sound: true,
        widgets: false,
        items: [
            '全部随机(default)',
            '万维随机',
            '乐学随机',
            '信息理论',
            '进制转换',
            '信息安全',
            '计算机系统',
            '计算机硬件',
            '程序设计',
            '计算机网络',
            '多媒体',
            'AI、IoT、云计算、大数据'
        ]
      }
    },
    computed: {
      isLoged() {
        var userData = this.$store.state.userData
        return userData.username && userData.token
      },
      isfav: {
        get() {
          return this.$store.state.questionOptions.isfav
        },
        set(value) {
          let val = value ? 1 : 0
          console.log(val)
          this.$store.state.questionOptions.isfav = val
        }
      }
    },
    methods: {
        updateCG() {
            var cgTable = {
                '全部随机(default)': 0,
                '万维随机': 200,
                '乐学随机': 10,
                '信息理论': 1,
                '进制转换': 2,
                '信息安全': 3,
                '计算机系统': 4,
                '计算机硬件': 5,
                '程序设计': 6,
                '计算机网络': 7,
                '多媒体': 8,
                'AI、IoT、云计算、大数据': 9
            }
            if(!cgTable[this.cg]) {
                this.$store.state.questionOptions.cg = 0
                return;
            }
            this.$store.state.questionOptions.cg = cgTable[this.cg]
        },
        HideGroupLink() {
          localStorage.setItem('hideGroupLink', this.$store.state.hideGroupLink)
        }
    }
  }

</script>
<style>
.v-slider__thumb {
    height: 40px;
    width: 40px;
}
</style>
