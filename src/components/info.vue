<template>
<v-layout justify-center align-center>
    <v-container fluid grid-list-md>
<v-card>
    <v-card-title>
      本页数据全部为计算机专业，不包含其他专业
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="输入校名关键词"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
  <v-data-table :headers="headers" :items="infoData" :search="search" light class="elevation-1" disable-initial-sort>
    <template slot="items" slot-scope="props">
      <td class="text-xs-center">
        <nobr>{{ props.item.name }}</nobr>
      </td>
      <td class="text-xs-center">
        <nobr>{{ levelTable[props.item.level] }}</nobr>
      </td>
      <td class="text-xs-center">{{ props.item.score ? props.item.score: '未招' }}</td>
      <td class="text-xs-center">{{ props.item.year }}</td>
    </template>
  </v-data-table>
  </v-card>
  </v-container>
  </v-layout>
</template>
<script>
  export default {
    data: () => ({
      infoData: [],
      search: '',
      levelTable: {
        1: '公)本科',
        2: '民)本科',
        3: '专科'
      },
      searchParams: {
        keyword: '',
        level: 0
      },
      headers: [{
          text: '校名',
          align: 'center',
          value: 'name',
        },
        {
          text: '类别',
          value: 'level',
          align: 'center'
        },
        {
          text: '投档线',
          value: 'score',
          align: 'center'
        },
        {
          text: '年份',
          value: 'year',
          align: 'center'
        }
      ]
    }),
    activated() {
      this.$store.state.tbTitle = '高考数据'
      this.updateInfo()
      
    },
    methods: {
      updateInfo() {
        this.$store.state.showLoading = true
        var request_url = this.$store.state.mainUrl + 'getSchool'
        this.axios.get(request_url, {
          params: this.searchParams
        }).then(rsp => {
          this.$store.state.showLoading = false
          if (rsp.data.status == 200) {
            
            this.infoData = rsp.data.data
          }
        }).catch(e => {
          this.$store.state.showLoading = false
        })
      }
    }
  }

</script>
