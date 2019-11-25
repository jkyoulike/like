;(function(){
    window.msg ={
        set: set,
        get: get,
    }


    //封装localStorage

    function set( key, val){
        localStorage.setItem(key, JSON.stringify(val));
    }
    function get(key){
        var json = localStorage.getItem(key);
        if(json){
            return JSON.parse(json);
        }
    }
})();

   ms.set('name',"TOme");
   var name =ms;get('name');
   console.log('name:',name);