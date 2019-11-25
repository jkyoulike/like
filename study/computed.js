var app = new Vue({
    el:'#app',
    data:{
        math:60,
        physics:65,
        english:70,
    },
    computed:{
        sum:function(){
            return this.math + this.physics + this.english;
        },
        average:function(){
            return Math.round(this.sum/3)
        }
    }
})