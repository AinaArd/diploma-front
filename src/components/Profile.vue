<template>
    <div>
        <section class="services" id="SERVICE">
            <div class="container">
                <div class="row">
                    <div class="col-md-3 text-center">
                        <div class="single_service wow fadeInUp" data-wow-delay="1s">
                            <i class="icon-pencil"></i>
                            <a @click="editUserInfo"><h2>Edit profile</h2></a>
                            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa.</p>
                        </div>
                    </div>
                    <div class="col-md-3 text-center">
                        <div class="single_service wow fadeInUp" data-wow-delay="2s">
                            <i class="icon-gears"></i>
                            <h2>CHANGE ME</h2>
                            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa.</p>
                        </div>
                    </div>
                    <div class="col-md-3 text-center">
                        <div class="single_service wow fadeInUp" data-wow-delay="3s">
                            <i class="icon-camera"></i>
                            <a href="/profile/apps"><h2>My apps</h2></a>
                            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa.</p>
                        </div>
                    </div>
                    <div class="col-md-3 text-center">
                        <div class="single_service wow fadeInUp" data-wow-delay="4s">
                            <i class="icon-magnifying-glass"></i>
                            <a href="/courses"><h2>All courses</h2></a>
                            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="about_us_area" id="ABOUT">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 text-center">
                        <div class="about_title">
                            <h2>About Me</h2>
                            <img src="../assets/images/shape.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-md-4  wow fadeInRight animated">
                        <p class="about_us_p">Fullname: {{UserDto.fullName}}</p>
                    </div>
                    <div class="col-md-4  wow fadeInRight animated">
                        <ul id="courses">
                            <li v-for="course in courses" :key="course.id">
                                <p class="about_us_p">Course: {{course.title}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Profile',
        data: function () {
            return {
                UserDto: '',
                courses: []
            }
        },
        mounted() {
            if (window.localStorage.getItem("Authorization") !== null) {
                axios({
                    url: window.hostname + '/profile',
                    method: "get",
                    headers: {
                        "Authorization": window.localStorage.getItem("Authorization")
                    }
                }).then((response) => {
                    // eslint-disable-next-line no-console
                    console.log(response.data);
                    this.UserDto = response.data;
                    this.courses = this.UserDto.courses;
                });
            } else {
                window.location.href = '/login';
            }
        },
        methods: {
            editUserInfo: function () {

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