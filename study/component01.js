var alert_component={
    template: '<button @click="on_click">弹一下</button>',
    methods:{
        on_click:function(){
            alert('Hele!');
        }
    }
}


new Vue({
    el:'#app1',
    components:{
         alert:alert_component
    }

})
