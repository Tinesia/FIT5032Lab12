<script setup>
import BHeader from './components/BHeader.vue'
import {useRoute} from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const header = computed(() => {
    return route.name !== 'CountBookAPI'
})

</script>

<template>
  <header v-if="header">
    <BHeader />
  </header>
  <main>
     <router-view></router-view>
  </main>
</template>
<style scoped>
</style>
