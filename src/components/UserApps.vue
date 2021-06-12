<template>
    <div>
        <br>
        <ul id="apps" class="list-group">
            <li class="list-group-item" v-for="appDto in apps" :key="appDto.id">
                <div>
                    <h5><a v-bind:href="`/app/${appDto.id}`">{{appDto.appName}}</a></h5>
                    <br>
                        <h5>Status: {{appDto.status}}</h5>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    import axios from 'axios'

    export default {
        name: 'UserApps',
        data: function () {
            return {
                apps: []
            }
        },
        mounted() {
            this.getApps()
        },
        methods: {
            getApps() {
                // if (window.localStorage.getItem("Authorization") !== null) {
                axios.get(window.hostname + '/profile/apps')
                    .then(function (response) {
                        this.apps = response.data;
                    }.bind(this));
            }
        }
    }
</script>

<style scoped>
    @import'~bootstrap/dist/css/bootstrap.css';
</style>