<template>
  <v-app>
    <Header></Header>
    <nuxt></nuxt>
    <Dialog></Dialog>
  </v-app>
</template>

<script>
import Dialog from '@/components/Dialog'
export default {
  components: {
    Dialog
  }
}
</script>
<style lang="scss">
* {
  font-family: 'Kanit', sans-serif;
}
</style>