<template lang="html">
<form class="container border shadow  mx-auto">
    <div class="form-group">
        <input type="email" v-model="email" placeholder="Enter email">
    </div>
    <div class="form-group">
        <input type="password" v-model="password" placeholder="Password">
    </div>
    <div class="form-group">
        <button v-on:click="login" class="btn btn-primary">Iniciar Sesion</button>
    </div>
    <div class="form-group">
        <button @click="googleLogin" class="btn btn-success">
            <img alt="Google" src="../assets/google-logo.png">
        </button>
        <button @click="twitterLogin" class="btn btn-secondary">
            <img class="imgs" alt="Twitter" src="../assets/twitter.png">
        </button>
    </div>
    <router-link to="/registro">Registrate</router-link>
</form>
</template>

<script lang="js">
import firebase from 'firebase';
export default {
    name: 'login',
    props: [],
    mounted() {
    },
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        login: function () {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
                alert("Conectado")
                this.$router.replace("/privado")
            });
        },
        googleLogin: function () {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(() => {
                this.$router.replace('/privado')
            }).catch(function (error) {
                alert(error.message)
            });
        },
        twitterLogin: function () {
            var provider = new firebase.auth.TwitterAuthProvider();
            firebase.auth().signInWithPopup(provider).then(() => {
                this.$router.replace('/privado')
            }).catch(function (error) {
                alert(error.message)
            });
        },
    },
    computed: {
    }
}
</script>

<style scoped>
img {
    width: 4rem;
    height: 2rem;
}
.container {
    padding: 30px;
    margin-top: 150px;
    width: 75%;
}
</style>