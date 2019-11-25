Vue.component('like',{
    
    //  '<button @click="toggle_like()">❤ {{like_count}} </button>'
    // `
    //      <button @click="toggle_like()">
    //      ❤ {{like_count}} 
    //      </button>   
    // `
    
    template:'#like-component-tpl' 
    , 
     data: function(){
        return{
            like_count:0,
            liked:false    //4.liked true 
             }       
        },


    methods:{
      toggle_like:function(){
        if(!this.liked){        // 1,liked= ture 
            this.like_count++;  // 2,+1
        }else{
            this.like_count--;  // 5,false
        }
                

         this.liked =!this.liked;  //3, ture   6，f

      }
    }
      
     
})

new Vue({
    el:'#app',

})