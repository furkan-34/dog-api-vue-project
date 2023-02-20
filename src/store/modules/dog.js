import axios from "axios";

const state = {
  user: null,
  posts: null,
};

const getters = {
  StateBreeds: (state) => state.breeds,
  StateDogs: (state) => state.dogs,
  StateFavorites: (state) => state.favorites,
};

const actions = {

  async GetBreeds({ commit }) {
    const response = await axios.get("/dogs/breeds");
    commit("setBreeds", response.data.payload.breeds);
  },

  
  async ListDogs({ commit, state }, dog) {

    const response = await axios.get(`/dogs/images?search=${dog}`);
    const dogs = response.data.payload.images.map(e => {return {image: e, fav: state.favorites.some(f => f.image == e) ? "red" : "white"}})
    console.log(response.data.payload.images)
    console.log(dogs)
    commit("setDogs", dogs);
  },

  async addFavoriteDog({ commit, state }, dog) {
    if (state.favorites.includes(dog)) return

    await axios.post(`/dogs/favorites`, {
      image: dog
    });
    commit("addFavoriteDog", dog);
  },

  async removeFavoriteDog({ commit }, identifier) {
    await axios.delete(`/dogs/favorites/${identifier}`);
    commit("removeFavoriteDog", identifier);
  },
  


  async setFavorites({ commit }) {
    const res = await axios.get(`dogs/favorites`)
    commit("setFavorites", res.data.payload.favorites);
  },
};

const mutations = {

  setBreeds(state, breeds) {
    state.breeds = breeds;
  },

  setDogs(state, dogs) {
    state.dogs = dogs;
  },

  
  addFavoriteDog(state, image) {

    const dogs = state.dogs
    state.favorites.push(image)
    dogs.forEach(dog => {
      if (dog.image == image) dog.fav = "red"
    });
    state.dogs = dogs
  },

  removeFavoriteDog(state, identifier) {
    state.favorites = state.favorites.filter(e => e.identifier != identifier)
  },

  setFavorites(state, favorites) {
    state.favorites = favorites
  },

};

export default {
  state,
  getters,
  actions,
  mutations,
};
