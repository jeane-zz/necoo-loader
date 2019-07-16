import Vue from 'vue';
window.necooIndex = 0;
var app = new Vue({
    el: '#app',
    template: `<div>{{message}}</div>`,
    data: {
        message: 'Hello Vue!'
    }
});