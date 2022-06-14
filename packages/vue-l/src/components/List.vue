<script setup lang="ts">
import { ref } from 'vue'
defineProps<{ list: Item[]}>()

interface Item {
  name: string
  id: string
}

</script>

<template>
     <div class='flex flex-col overflow-hidden bg-gray-300/10 rounded-xl'>
      <div key={item.id} v-for="(item, idx) in list" class='flex pa-3 hover:bg-gray-200/30 justify-between'>
        <span>{{item?.name}}</span>
        <button @click="$emit('onDelete', idx)" class="i-carbon-close text-red-700/30 hover:text-red-700/90 cursor-pointer w-24px h-24px" />
      </div>
    </div>
</template>

<style scoped>

</style>
