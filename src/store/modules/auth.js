import axios from "axios";

const state = {
  user: null,
  posts: null,
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  StateUser: (state) => state.user,
};

const actions = {
  async Register({dispatch}, form) {

    await axios.post(`${process.env.VUE_APP_AUTH_LINK}/auth/signup`, form)
    let UserForm = new FormData()
    UserForm.append('email', form.email)
    UserForm.append('password', form.password)
    await dispatch('LogIn', UserForm)
  },

  async LogIn({commit}, user) {

    const auth = await axios.post(`${process.env.VUE_APP_AUTH_LINK}/auth/signin`,
    {
      email: user.get("email"),
      password: user.get("password")
    })
    const idToken = auth.data.payload.signIn.IdToken
    axios.defaults.headers.common['Authorization'] = `Bearer ${idToken}`;

    const user_res = await axios.get(`${process.env.VUE_APP_USER_LINK}/user/me`)
    await commit("setUser", user_res.data.payload.user);
    await commit("setToken", user.get("idToken"));
  },


  async LogOut({ commit }) {
    let user = null;
    commit("logout", user);
  },
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },

  setToken(state, token) {
    state.token = token;
  },

  logout(state) {
    state.user = null;
    state.dogs = null
    state.favorites = null
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
