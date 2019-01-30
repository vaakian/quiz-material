<template>
  <div>
    <v-dialog v-model="$store.state.showNote" scrollable max-width="450px">
      <v-card>
        <v-card-title>查看&编辑便签
          <v-spacer></v-spacer>
          <v-chip :color="$store.state.theme.tone" text-color="white">
            <!-- <v-avatar class="teal" :color="$store.state.theme.tone">ID</v-avatar> -->
            <v-icon left>label</v-icon>
            {{ noteID }}
          </v-chip>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px; padding: 0">
          <v-flex>
            <v-textarea
            full-width 
            name="input-7-1" 
            height="272px" 
            v-model="$store.state.noteText" 
            :disabled="showLoading"
            ></v-textarea>
          </v-flex>
        </v-card-text>
        <v-divider></v-divider>
        <p class="mx-3 caption">
          <v-icon>warning</v-icon>
          如果想回头看看题目再继续便签，一定要先保存！</p>
        <v-card-actions>
          <v-btn :color="theme.tone" flat @click="$store.state.showNote = false">关闭</v-btn>
          <v-spacer></v-spacer>
          <v-btn :color="theme.tone" flat @click="$store.dispatch('addNote', noteID)">保存便签</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        
      }
    },
    computed: {
      ...mapState([
          'showLoading',
          'noteID',
          'theme'
        ]),
      // questionID() {
      //   return this.questions[this.qIndex].ID
      // }
    }
  }

</script>
