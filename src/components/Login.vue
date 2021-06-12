<template>
    <div class="main">
        <!-- Sing in  Form -->
        <section class="sign-in">
            <div class="container">
                <div class="signin-content">
                    <div class="signin-image">
                        <figure><img src="../assets/images/signin-image.jpg" alt="sing up image"></figure>
                        <router-link to="/signup" class="signup-image-link">Create an account</router-link>
                    </div>

                    <div class="signin-form">
                        <h2 class="form-title">Sign in</h2>
                        <form method="post" class="register-form" id="login-form">
                            <div class="form-group">
                                <label for="login"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="login" id="login" placeholder="Login" required="required"
                                       v-model="login"/>
                            </div>

                            <div class="form-group form-button">
                                <input type="button" name="signin" id="signin" class="form-submit" value="Log in"
                                       @click="submit"/>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Login',
        data: function () {
            return {
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
                    // if (response.status == 200){
                    // eslint-disable-next-line no-console
                    console.log(response.data);
                    window.localStorage.setItem("Authorization", response.data);
                    window.location.href = '/profile'
                    // }
                }));
            }
        },
        methods: {
            submit: function () {
                axios({
                    method: 'post',
                    contentType: "application/json",
                    url: window.hostname + '/login',
                    data: {login: this.login}
                }).then((response => {
                    // eslint-disable-next-line no-console
                    console.log(response);
                    if (response.status == 200) {
                        // eslint-disable-next-line no-console
                        console.log(response.data);
                        window.localStorage.setItem("Authorization", response.data);
                        window.location.href = '/profile'
                    }
                }));
            }
        }
    }
</script>

<style type="text/css">
    @import '../assets/style.css';
</style>
