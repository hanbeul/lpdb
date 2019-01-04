<template>
  <div class="plate-stream">
    <h1>Plate Stream Component Loaded!</h1>
    <div v-for="plate in plates" :key="plate._id">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
          {{ plate.best_plate_number }}
          </p>
          <a href="#" class="card-header-icon" aria-label="more options">
            <span class="icon">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </a>
        </header>
        <div class="card-content">
          <div class="content">
            <br>
            {{ plate.timestamp | moment('MMMM Do YYYY, h:mm a') }}
          </div>
        </div>
        <footer class="card-footer">
          <a href="#" class="card-footer-item">Save</a>
          <a href="#" class="card-footer-item">Edit</a>
          <a href="#" class="card-footer-item">Delete</a>
        </footer>
      </div>
    </div>

    
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
