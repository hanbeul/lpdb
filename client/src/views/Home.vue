<template>
  <div class="home">
    <plate-stream />
  </div>
</template>

<script>
// @ is an alias to /src
import PlateStream from '@/components/PlateStream.vue'

export default {
  name: 'home',
  components: {
    PlateStream
  }
}
</script>
