<template>
    <div class="main">
        <div class="container">
            <div>
                {{currentClass().className}}
            </div>
            <br>

            <div class="card">
                <p class="info">
                    {{currentClass().info}}
                </p>
            </div>

            <code>
                <div class="list-group-item" v-for="line in codeLines" :key="line.id">
                    {{remove(line)}}
                    <div v-if="flag">
                        <input type="text" class="form-control" v-model="words['{{line}}' + line.index]">
                    </div>
                </div>
            </code>
            <br>
        </div>

        <div class="buttons">
            <div v-if="currentIdx === classes.length-1">
                <input type="button" name="finish" id="finish" class="form-submit" style="background-color: red"
                       value="Finish" @click="finish"/>
            </div>
            &nbsp;
            &nbsp;

            <div>
                <input type="button" name="signin" id="signin" class="form-submit" value="Send" @click="send"/>
                &nbsp;
                <input type="button" name="next" id="next" class="form-submit" value="Next" @click="next"/>
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    import axios from 'axios'

    export default {
        name: 'App',
        data: function () {
            return {
                classes: [],
                currentIdx: null,
                words: [],
                codeLines: [],
                flag: false
            }
        },
        computed: {},
        mounted() {
            this.getAppInfo();
            this.currentClass();
        },
        methods: {
            send: function () {
                axios({
                    method: 'patch',
                    contentType: "application/json",
                    url: window.hostname + '/app/' + this.$route.params.id,
                    data: {
                        words: [this.words],
                        appClassName: this.classes[this.currentIdx].className,
                        code: this.classes[this.currentIdx].code
                    }
                }).then((response => {
                    // eslint-disable-next-line no-console
                    console.log(response);
                    this.currentIdx = this.currentIdx + 1;
                    // eslint-disable-next-line no-console
                    console.log(this.words)
                }));
            },
            getAppInfo() {
                if (window.localStorage.getItem("Authorization") !== null) {
                    axios({
                        url: window.hostname + '/app/' + this.$route.params.id,
                        method: "get",
                        headers: {
                            "Authorization": window.localStorage.getItem("Authorization")
                        }
                    }).then((response) => {
                        this.classes = response.data;
                        this.currentIdx = 0;
                    });
                } else {
                    window.location.href = '/login';
                }
            },
            currentClass() {
                this.codeLines = this.classes[this.currentIdx].code;
                return this.classes[this.currentIdx]
            },
            next() {
                this.currentIdx = this.currentIdx + 1;
                this.words = [];
                // eslint-disable-next-line no-console
                console.log(this.currentIdx + " index" + this.classes.length + " classes");
            },
            finish() {
                axios({
                    url: window.hostname + '/app/' + this.$route.params.id,
                    method: "post",
                    headers: {
                        "Authorization": window.localStorage.getItem("Authorization")
                    }
                }).then((response) => {
                    // eslint-disable-next-line no-console
                    console.log(response.data);
                    window.location.href = '/profile'
                });
            },
            check(line) {
                if (line.includes('${}')) {
                    return true
                }
            },
            remove(line) {
                if (line.includes('${}')) {
                    this.flag = true;
                    return line.replace('${}', '');
                } else {
                    this.flag = false;
                    return line;
                }
            }
        }
    }
</script>

<style scoped>
    .card {
        width: fit-content;
    }

    .info {
        margin: 10px;
    }

    .container {
        padding: 20px;
        margin-top: 5%;
        overflow: scroll;
        height: 600px;
    }

    .buttons {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .form-control {
        width: 100px;
    }
</style>