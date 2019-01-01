<template>
  <div class="plate-stream">
    <h1>Plate Stream Component Loaded!</h1>
    <ul v-for="plate in plates" :key="plate._id">
      <li>{{ plate.timestamp | moment('MMMM Do YYYY, h:mm a') }} : {{ plate.best_plate_number }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PlateStream',
  props: {
  }, 
  data: function() {
    return {
      plates: [],
    }
  },
  created: function() {
    console.log('Running init function!');
    fetch('http://localhost:3000/lpdb').then(response => response.json()).then(json => {
      this.plates = json;
    });
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
