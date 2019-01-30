<template>
  <div id="msg">
    <v-snackbar 
    color="deep-purple"
    v-model="$store.state.msg['show']" :multi-line="true"
      :timeout="$store.state.msg.timeout" :top="true">
      {{ $store.state.msg['text'] }}
      <v-btn color="pink" flat @click="$store.state.msg['show'] = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>
<style>
.v-snack {
    /* margin-top: 300px; */
}
</style>
