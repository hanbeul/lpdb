<template>
  <div class="home columns">
    <plate-stream class="column is-6" />
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
