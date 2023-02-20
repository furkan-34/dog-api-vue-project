<template>
  <div class="container">
    <div v-if="User">
      <p>Welcome {{ User.name }} {{ User.family_name }}</p>
    </div>
    <div>
        <div>
          <br><br>
        <div v-if="Favorites.length" class="gallery">
          <div class="gallery-panel"
              v-for="fav in Favorites"
              :key="fav.identifier">
              <div style="border-radius: 0.75rem; position: relative;">
                <img :src="fav.image" @click="onClickImg" style="height: 200px; object-fit: cover;">
              </div>
              
          </div>
        </div>
        <div v-else>
           There is no favorites 😢
        </div>


      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";


export default {
  name: "Dogs",
  components: {},
  data() {
    return {
      breeds: [],
      dogs: []
    };
  },
  created: function() {
    this.setFavorites()
  },
  computed: {
    ...mapGetters({ User: "StateUser",Favorites: "StateFavorites" }),
  },
  methods: {
    ...mapActions(["removeFavoriteDog", "setFavorites"]), 

    async onChange(event) {
      await this.ListDogs(event.target.value)
    },
    async onClickImg (event) {	
      await this.addFavoriteDog(event.target.currentSrc)
    }
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}

label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}


  .gallery {
    display: grid;
    /* grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    grid-gap: 1rem;
    max-width: 30rem;
    margin: 5rem auto;
    padding: 0 5rem; */
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }
  @media (max-width: 640px) {
    .gallery {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  }
  @media (min-width: 641px) {
    .gallery {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @media (min-width: 1025px) {
    .gallery {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }


  /* .gallery-panel img {
    width: 30%;
    height: 12vw;
    object-fit: cover;
    border-radius: 0.75rem;
  } */

  .gallery-panel img {
    width: 100%;
  }
</style>
