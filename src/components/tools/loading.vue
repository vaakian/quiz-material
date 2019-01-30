<template>
    <v-dialog
      v-model="$store.state.showLoading"
      persistent
      width="300"
      
    >
      <v-card
        :color="$store.state.theme.tone"
      >
        <v-card-text>
          Please stand by
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>
