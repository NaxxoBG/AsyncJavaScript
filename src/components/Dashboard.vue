<template>
  <div class="dashboard">
    <img class="logo" src="../assets/via-university-college-logo.png">
    <h1>{{ msg }}</h1>
    <h5><i>Hint: Hover over a button to toggle the exercise description</i></h5>
    <ul>
      <li>
        <button id="click2" @click="() => this.$router.push('/Exercise8_2')" @mouseover="onHover">Exercise 8.2</button>
      </li>
      <li>
        <button id="click3" @click="() => this.$router.push('/Exercise8_3')" @mouseover="onHover">Exercise 8.3</button>
      </li>
      <li>
        <button id="click4_1" @click="() => this.$router.push('/Exercise8_4_1')" @mouseover="onHover">Exercise 8.4.1</button>
      </li>
      <li>
        <button id="click4_2" @click="() => this.$router.push('/Exercise8_4_2')" @mouseover="onHover">Exercise 8.4.2</button>
      </li>
    </ul>
    <template v-if="this.on2">
      <h2>Description</h2>
      <p class="desc">
      The uploaded server_sim.js simulates calls to different servers with different response times. Download the code and write your own code in the same directory.
      You get access to a mock server facade by writing<br>
      <code> { blocking: server } = require(’./server_sim.js’)</code><br>
      The returned server object has 3 methods:<br>
      •	validate(username, password) – eventually returns a token for the current user. The other methods need this token passed in. The mock accepts all usernames and passwords.<br>
      •	authorize(token) – eventually returns a new token granting a higher access level than the previous token. The token has to be that same that validate() returns, or authorize() will throw an exception.<br>
      •	secret(number, token) – eventually returns the URL to an image. Number must be 0, 1, or 2, or secret() will throw an exception. The token must be the token from validate, or if the number is 1 or 2, the number from authorize(). Otherwise, the method will throw an exception.<br>
      Create a single page application that has fields for username and password, and a button that when pressed uses the server to get the three ”secret” urls and display them in "<img>" tags.
      You might want to get browserify to use require in the browser. (Alternatively, copy and paste from server_sim.js).
      </p>
    </template>

  <template v-if="this.on3">
    <h2>Description</h2>
    <p class="desc">
      If you replace the require line from exercise 8.2 with the following<br>
      <code> { callback: server } = require(’./server_sim.js’)</code><br>
      You will get access to a different server object, that doesn’t return the values, but requires you to provide a callback. The methods look like:<br>
      •	validate(username, password, callback) – like above, but eventually calls the callback with the token instead of returning it.<br>
      •	authorize(token, callback, onError) – like above, but eventually calls the callback with the new token instead of returning it, and calls onError with the exception instead of throwing it.<br>
      •	secret(number, token, callback, onError) – like above, but eventually calls the callback with the secret URL instead of returning it, and calls onError with an exception instead of throwing it.<br>
      Remake the application from exercise 8.2 using the new functions.<br>
    </p>
  </template>

  <template v-if="this.on4_1">
    <h2>Description</h2>
    <p class="desc">
      If you replace the require line from exercise 8.2 with the following<br>
      <code> { promise: server } = require(’./server_sim.js’)</code><br>
      This server has the same methods as in exercise 8.2, but instead of eventually returning a value, it immediately returns a promise that eventually resolves to a value.<br>
      Remake the application using this server. Make it so .then() is used on the promises.
    </p>
  </template>

  <template v-if="this.on4_2">
    <h2>Description</h2>
    <p class="desc">
      If you replace the require line from exercise 8.2 with the following<br>
      <code> { promise: server } = require(’./server_sim.js’)</code><br>
      This server has the same methods as in exercise 8.2, but instead of eventually returning a value, it immediately returns a promise that eventually resolves to a value.<br>
      Remake the application using this server. Make it so async/await are used.
    </p>
  </template>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      msg: "Exercise 8",
      on2: false,
      on3: false,
      on4_1: false,
      on4_2: false
    };
  },
  methods: {
    onHover(ev) {
      switch (ev.target.id) {
        case "click2":
          this.on2 ^= true;
          this.on3 = false;
          this.on4_1 = false;
          this.on4_2 = false;
          break;
        case "click3":
          this.on3 ^= true;
          this.on2 = false;
          this.on4_1 = false;
          this.on4_2 = false;
          break;
        case "click4_1":
          this.on4_1 ^= true;
          this.on2 = false;
          this.on3 = false;
          this.on4_2 = false;
          break;
        case "click4_2":
          this.on4_2 ^= true;
          this.on2 = false;
          this.on3 = false;
          this.on4_1 = false;
          break;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  margin: 2%;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

code {
  background: #f4f4f4;
  border: 1px solid #ddd;
  border-left: 3px solid #f36d33;
  color: #666;
  page-break-inside: avoid;
  font-family: monospace;
  font-size: 15px;
  max-width: 100%;
  margin-top: 1em;
  overflow: auto;
  padding: 0.5em 1.2em;
  display: block;
  word-wrap: break-word;
}

.desc {
  text-align: left;
  align-content: center;
  width: 50%;
  margin-left: 25%;
  margin-top: 30px;
  line-height: 1.35;
  overflow-y: scroll;
  max-height: 20%;
  height: 270px;
}

.dashboard {
  background-color: rgb(240, 240, 240);
  padding-bottom: 1%;
  border-radius: 70px;
}

.logo {
  margin-top: 5%;
}
</style>
