<template>
  <div class="register">
    <div>
      <form @submit.prevent="submit">
        <div>
          <label for="email">Email:</label>
          <input type="email" name="email" v-model="form.email" />
        </div>
        <div>
          <label for="name">Name:</label>
          <input type="text" name="name" v-model="form.name" />
        </div>
        <div>
          <label for="lastname">Last Name:</label>
          <input type="text" name="lastname" v-model="form.lastname" />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" name="password" v-model="form.password" />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
    <p v-if="showError" id="error">User already exists</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Register",
  components: {},
  data() {
    return {
      form: {
        email: "",
        name: "",
        lastname: "",
        password: "",
      },
      showError: false
    };
  },
  methods: {
    ...mapActions(["Register"]),
    async submit() {
      try {
        await this.Register({
          email: this.form.email,
          password: this.form.password,
          name: this.form.name,
          lastname: this.form.lastname
        });
        this.$router.push("/");
        this.showError = false
      } catch (error) {
        this.showError = true
      }
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

button[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  cursor: pointer;
  border-radius: 30px;
}

button[type="submit"]:hover {
  background-color: #45a049;
}

input {
  margin: 5px;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  padding: 10px;
  border-radius: 30px;
}
#error {
  color: red;
}
</style>
