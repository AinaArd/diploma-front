<template>
    <div class="main">
        <section class="signup">
            <div class="container">
                <div class="signup-content">
                    <div class="signup-form">
                        <h2 class="form-title">Sign up</h2>
                        <form method="post" class="register-form" id="register-form">

                            <div class="form-group">
                                <label for="login"><i class="zmdi zmdi-email"></i></label>
                                <input type="text" name="login" id="login" placeholder="Login" required="required"
                                       v-model="login"/>
                            </div>
                            <div class=" form-group">
                                <label for="password"><i class="zmdi zmdi-lock"></i></label>
                                <input type="password" name="password" id="password" placeholder="Password"
                                       v-model="password"
                                       required="required"/>
                            </div>
                            <div class="form-group form-button">
                                <input type="button" name="signup" id="signup" class="form-submit" value="Register"
                                       @click="register"/>
                            </div>
                        </form>
                    </div>
                    <div class="signup-image">
                        <figure><img src="../assets/images/signup-image.jpg" alt="sing up image"></figure>
                        <router-link to="/login" class="signup-image-link">I am already member</router-link>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Registration',
        data: function () {
            return {
                password: '',
                login: ''
            }
        },
        mounted: function () {
            if (window.localStorage.getItem("Authorization") !== null) {
                axios({
                    url: window.hostname + "/login",
                    method: "post",
                    contentType: "application/json",
                    headers: {
                        "Authorization": window.localStorage.getItem("Authorization")
                    }
                }).then((response => {
                    if (response.status == 200) {
                        window.location.href = '/profile'
                    }
                }));
            }
        },
        methods: {
            register: function () {
                // eslint-disable-next-line no-console
                console.log(this.login);
                // eslint-disable-next-line no-console
                console.log(this.password);
                axios({
                    method: 'post',
                    contentType: "application/json",
                    url: window.hostname + '/signup',
                    data: {login: this.login, password: this.password}
                }).then((response => {
                    // eslint-disable-next-line no-console
                    console.log(response);
                    if (response.status == 200) {
                        window.location.href = '/login'
                    }
                }));
            }
        }
    }
</script>

<style type="text/css">
    @import '../assets/style.css';
</style>
