<template>
    <div class="main">
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
                    </li>
                </ul>
            </div>
        </div>
        &nbsp;
        <div class="buttons">
            <form ref="uploadForm" @submit.prevent="submit">
                <div class="form-group">
                    <label for="title"><i class="zmdi zmdi-email"></i></label>
                    <input type="text" name="title" id="title" placeholder="Title" required="required"
                           v-model="title"/>
                    &nbsp;
                    <label for="description"><i class="zmdi zmdi-lock"></i></label>
                    <input type="text" name="description" id="description" placeholder="Description"
                           v-model="description"
                           required="required"/>
                </div>
                <div class="form-group" style="position: relative; left: 150px">
                    <input type="file" ref="uploadProject" @change="onProjectUpload()" class="form-control form-submit"
                           value="Выберите файл"
                           required/>
                    &nbsp;
                    <input type="button" @click="startUpload" name="Upload" class="form-control" form-submit
                           value="Загрузить"/>
                </div>
            </form>
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
                courses: [],
                formData: null,
                title: null,
                description: null
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

            onProjectUpload() {
                let file = this.$refs.uploadProject.files[0];
                this.formData = new FormData();
                this.formData.append("file", new Blob([
                    file
                ], {
                    type: "multipart/form-data"
                }));
            },

            startUpload() {
                axios({
                    url: window.hostname + "/admin",
                    method: 'post',
                    data: {formData: this.formData, title: this.title, description: this.description},
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': window.localStorage.getItem("Authorization")
                    }
                }).then((response => {
                    // eslint-disable-next-line no-console
                    console.log(response.data);
                }));
            }
        }
    }
</script>

<style scoped>
    @import '../assets/css/profile.css';
    @import '../assets/css/bootstrap.min.css';
    @import '../assets/css/owl.carousel.css';
    @import '../assets/css/owl.theme.default.css';
    @import '../assets/css/preloader.css';
    @import '../assets/css/responsive.css';
    @import '../assets/css/style.css';
    @import '../assets/style.css';

    .main {
        margin-top: 50px;
        overflow: scroll;
        height: available;
    }

    .container {
        padding: 20px;
        margin-top: 5%;
        /*overflow: scroll;*/
        /*height: 500px;*/
    }

    .buttons {
        display: flex;
        /*align-items: center;*/
        /*justify-content: center;*/
        font-size: large;
        padding-bottom: 10px;
    }

    .form-group {
        position: relative;
        left: 50px;
    }
</style>