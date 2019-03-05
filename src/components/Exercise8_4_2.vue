<template>
    <div class="ex3">
        <h5><i>Hint: For the sake of testing convenience, you can fetch the images without entering anything in the input fields</i></h5>
        <input type="text" v-model="username" placeholder="Username"/>
        <input type="text" v-model="password" placeholder="Password"/>
        <button @click="getImgs">Get</button>
        <div class="gallery">
            <img v-if="image0" v-bind:src="image0"/>
            <img v-if="image1" v-bind:src="image1"/>
            <img v-if="image2" v-bind:src="image2"/>
        </div>
        <student-table />
    </div>
</template>

<script>
import StudentTable from './StudentTable'
let { promise } = require("../server_sim.js").default
export default {
  name: "Exercise8_4_2",
  components: {
        StudentTable
  },
  data() {
    return {
      username: "",
      password: "",
      image0: "",
      image1: "",
      image2: ""
    };
  },
  methods: {
    progressBar() {
        NProgress.inc(0.3)
        if (NProgress.status == 0.994) {
            NProgress.done()
        }
    },
    async getImgs() {
        try {
            NProgress.set(0.1)
            const t = await promise.validate(this.username, this.password) // function exec is paused
            const ht = await promise.authorize(t) // function exec us paused
            for (let i = 0; i < 3; i++) {
                this["image" + i] = await (i == 0 ? promise.secret(i, t) : promise.secret(i, ht)) //async function exec is paused
                this.progressBar()
            }
        } catch (error) {
            console.log(`Error: ${error}`)
            NProgress.done()
        }
    }
  }
};
</script>

<style scoped>
    .gallery {
        position: relative;
        clear: both;
        margin-top: 5%;
        margin-bottom: 5%;
        height: 230px;
    }

    img {
        height: 100%;
        width: 25%;
    }
</style>
