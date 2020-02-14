
<template lang="html">
<div class="container-fluid p-0 mt-0">
    <div class="row">
        <div class="col-12">
            <nav class="navbar navbar-dark bg-primary">
                <a href="/" class="navbar-brand">Ejemplo Vue+Firebase</a>
                {{usuario}}
                <button type="button" class="btn btn-secondary ml-auto" v-on:click="logout">Log out</button>

            </nav>
        </div>
    </div>
    <div class="row mt-5 ml-1 ">
        <div class="col-sm-4 mb-2">
            <div class="card">
                <div class="card-header">
                    Agrega una nueva tarea
                    <div class="card-body">
                        <form @submit.prevent="anadeNota">
                            <input type="text" class="form-control" v-model="nuevaNota.texto" placeholder="Texto">
                            <input type="file" @change="archivoSeleccionado" />
                            <button type="submit" class="btn btn-primary">Guardar Nota</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-7 text-center ">
            <table class="table table-dark p-0">
                <thead>
                    <tr>
                        <th scope="col">Autor</th>
                        <th scope="col">Texto</th>
                        <th scope="col">Url</th>
                    </tr>
                </thead>
                <tbody v-for="note in listaNotas" :key="note.texto">
                    <tr>
                        <td>{{note.texto}}</td>
                        <td>{{note.autor}}</td>
                        <td><a :href="note.archivo.url">{{note.archivo.nombre}} </a><button class="btn btn-secondary" v-on:click="borrarNota(note)">Borrar</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</template>

<script lang="js">
import {
    db
} from '../db.js'
import firebase from 'firebase';
export default {
    name: 'privado',
    props: [],
    mounted() {
    },
    components: {},
    data() {
        return {
            listaNotas: [],
            nuevaNota: {
                autor: "",
                texto: "",
                archivo: {
                    nombre: "",
                    url: ""
                }
            }
        }
    },
    firestore: {
        listaNotas: db.collection('notes'),
    },
    methods: {
        archivoSeleccionado: function (event) {
            this.archivo = event.target.files[0];
        },
        anadeNota: function () {
            firebase.storage().ref(this.archivo.name).put(this.archivo);
            firebase.storage().ref().child(this.archivo.name).getDownloadURL().then(
                url => {
                    if (this.nuevaNota.texto != " " && this.archivo != null) {
                        db.collection('notes').add({
                            texto: this.nuevaNota.texto,
                            autor: firebase.auth().currentUser.email,
                            archivo: {
                                nombre: this.archivo.name,
                                url: url
                            }
                        });
                        this.nuevaNota.texto = "";
                    }
                }
            )
        },
        borrarNota: function (note) {
            db.collection('notes').doc(note.id).delete()
            this.nuevaNota.Texto = ""
            this.nuevaNota.Autor = ""
        },
        logout: function () {
            firebase.auth().signOut().then(() => {
                this.$router.replace('login')
            })
        }
    },
    computed: {
        usuario: function () {
            return firebase.auth().currentUser.email
        }
    }
}
</script>

<style scoped>
</style>