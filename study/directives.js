Vue.directive('pin',function(el,binding){
var pinned=binding.value;
var position=binding.modifiers;
var waring=binding.arg;
console.log('position:',position);

if(pinned){
    el.style.position='fixed';
    for(var key in position){
        if(position[key]){
            el.style[key]='10px';
        }
    }
    if(waring==='true'){
        el.style.background='yellow';
    }
}else{
    el.style.position='static';
}
}),

new Vue({
    el:'#app',
    data:{
        card1:{
            pinned:false,
        },
        card2:{
            pinned:false,
        }
    }
})