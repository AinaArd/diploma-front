<template>
    <div>
        <div class="container">
            <div class="row">
                <ul id="apps" class="list-group">
                    <li class="list-group-item" v-for="courseDto in courses" :key="courseDto.id">
                        <div class="col-md-4 fadeInLeft wow animated">
                            <p>{{courseDto.title}}</p>
                        </div>
                        <div class="col-md-4  wow fadeInRight animated">
                            <p>{{courseDto.description}}</p>
                        </div>
                        <div class="col-md-4  wow fadeInDown animated">
                            <p><input type="button" name="signup" id="signup" class="form-submit" value="Sign up"
                                   @click="signup(courseDto.id)"/>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    import axios from 'axios'

    export default {
        name: "Courses",
        data: function () {
            return {
                courses: []
            }
        },
        mounted() {
            this.getCourses()
        },
        methods: {
            getCourses() {
                axios({
                    url: window.hostname + '/courses',
                    method: "get",
                    headers: {
                        "Authorization": window.localStorage.getItem("Authorization")
                    }
                }).then((response) => {
                    this.courses = response.data;
                });
            },
            signup(id) {
                axios({
                    url: window.hostname + '/courses/' + id,
                    method: "post",
                    headers: {
                        "Authorization": window.localStorage.getItem("Authorization")
                    },
                    data: {}
                }).then((response => {
                    // eslint-disable-next-line no-console
                    console.log(response.data);
                    if (response.status == 200) {
                        window.location.href = '/profile'
                    }
                }))
            }
        }
    }
</script>

<style type="text/css">
    @import '../assets/css/profile.css';
    @import '../assets/css/bootstrap.min.css';
    @import '../assets/css/owl.carousel.css';
    @import '../assets/css/owl.theme.default.css';
    @import '../assets/css/preloader.css';
    @import '../assets/css/responsive.css';
    @import '../assets/css/style.css';
    @import '../assets/style.css';
</style>