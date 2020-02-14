<template lang="html">
  <form class="container border shadow  mx-auto">
      <div class="form-group">
          <input type="email" v-model="email" placeholder="Enter email">
      </div>
      <div class="form-group">
          <input type="password" v-model="password" placeholder="Password">
      </div>
       <div class="form-check">
            <button @click="signUp" class="btn btn-primary">Sign UP</button>
        </div>
       <router-link to="/login">Volver al login</router-link>
  </form>    
</template>

<script lang="js">
import firebase from 'firebase'
  export default  {
    name: 'registro',
    props: [],
    mounted () {

    },
    data () {
      return {
        email:'',
        password:''
      }
    },
     methods: {
        signUp: function () {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                function () {
                    this.$router.replace("/privado")
                },
                function (err) {
                    alert('Vaya ' + err.message)
                }
            );
        }
    },

    computed: {

    }
}
</script>

<style scoped>
  
  .container {
    padding: 30px;
    margin-top: 150px;
    width: 75%;
}
</style>
