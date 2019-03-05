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
import axios from 'axios'
let { callback } = require('../server_sim.js').default
export default {
    name: "Exercise8_3",
    components: {
        StudentTable
    },
    data () {
      return {
        username: '',
        password: '',
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
            callback.validate(this.username, this.password, t => {
                callback.authorize(t, ht => {
                    for (let i = 0; i < 3; i++) {
                        i == 0 ? callback.secret(i, t, src => {this['image' + i] = src; this.progressBar()}, err => {console.log(`Error: ${err}`); NProgress.done()}) : callback.secret(i, ht, src => {this['image' + i] = src; this.progressBar()}, err => {console.log(`Error: ${err}`); NProgress.done()})
                    }
                }, err => {
                    console.log(`Error: ${err}`)
                    NProgress.done()
                })
            })
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
