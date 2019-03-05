<template>
    <div class="ex2">
        <h5><i>Hint: For the sake of testing convenience, you can fetch the images without entering anything in the input fields. Fetching the images will block the page as that's the purpose of the this exercise.</i></h5>
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
let { blocking } = require('../server_sim.js').default

export default {
    name: "Exercise8_2",
    components: {
        StudentTable
    },
    data () {
      return {
        username: '',
        password: '',
        token: '',
        higherToken: '',
        image0: '',
        image1: '',
        image2: ''
      }
    },
    methods: {
        progressBar() {
            NProgress.inc(0.3)
            if (NProgress.status == 0.994) {
                NProgress.done()
            }
        },
        getImgs() {
            NProgress.set(0.1)
            this.token = blocking.validate(this.username, this.password)
            this.higherToken = blocking.authorize(this.token) 
            for (let i = 0; i < 3; i++) {
                this['image' + i] = i == 0 ? blocking.secret(i, this.token) : blocking.secret(i, this.higherToken)
                this.progressBar()
            }
            NProgress.done()
        }
    }
}
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
