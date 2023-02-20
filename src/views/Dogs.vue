<template>
  <div class="container">
    <div v-if="User">
      <p>Welcome {{ User.name }} {{ User.family_name }}</p>
    </div>
    <div>
        <div>

          <select class="form-select"  @change="onChange($event)">
          <option v-for="breed in Breeds" :key="breed" :value="breed">
            {{ breed}}
          </option>
        </select>

        <br><br>

        <div v-if="Dogs" class="gallery">
          <div class="gallery-panel"
              v-for="dog in Dogs"
              :key="dog.image">
              <div style="border-radius: 0.75rem; position: relative;">
                <img :src="dog.image" @click="onClickImg" style="height: 200px; object-fit: cover;">
              
                  <svg  xmlns="http://www.w3.org/2000/svg" :fill="dog.fav" viewBox="0 0 24 24" strokeWidth={0} stroke="transparent" style="position: absolute; right: 8px; bottom: 8px; width: 24px; height: 24px; color: #fff;">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
              </div>
              
          </div>
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

    this.GetBreeds()
    this.setFavorites()
  },
  computed: {
    ...mapGetters({ User: "StateUser", Breeds: "StateBreeds", Dogs: "StateDogs", Favorites: "StateFavorites" }),
  },
  methods: {
    ...mapActions(["GetBreeds",  "ListDogs", "addFavoriteDog", "setFavorites"]),

    async onChange(event) {
      await this.ListDogs(event.target.value)
    },
    async onClickImg (event) {	
      await this.addFavoriteDog(event.target.currentSrc)
    },

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
