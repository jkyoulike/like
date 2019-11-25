;(function(){
    'use strick';
    function copy(obj){
        return Object.assign({},obj);
    }


   new Vue({
    el:'#main',
    data:{
        list:[],
        current:{}
    },
    mounted: function(){
       this.list = msg.get('list') || this.list;
    },
    // mou:function () {
    //     this.list =  msg.get('list') || this.list;
    // },
    //
     methods:{
        //添加
        add: function(){
            var is_update,id;


            var is_update =id = this.current.id;  //5暂时还么有ID
                //判断是否更新，不是更新的就添加
            if(is_update){
            //   var item =  this.list.find(function(item){  //变换findIndex

            //   var index =  this.list.findIndex(function(item){  //变换findIndex
            //         return item.id == is_update;     //优化 
            //     });
                var  index = this.find_index(id);

                Vue.set( this.list,index,copy(this.current));

            //  this.list[index] = copy(this.current);  //Object.assign({},this.current) 修改之后vue检测不到元素

        console.log('this.list :', this.list);
            }else{

                var title = this.current;
                if(!title && title !== 0  ) return;   //current.title
    
                var todo =copy(this.current);//拷贝数据 2 Object.assign({},this.current);
                // console.log('this.current :', this.current);
                // this.list.push(this.current);//this.current是引用1  1
              
                todo.id = this.next_id(); //7 添加ID
              
                this.list.push(todo);   //3

                console.log('this.list :', this.list);

            }

            this.reset_current(); //更新或添加数据后重置输入框
        },

        // update:function(){},

        // 删除
        remove: function(id){
            // var index = this.list.findIndex();  //用方法替换优化
            var index = this.find_index(id);
            this.list.splice(index,1);   //  this.list.splice(id,1); id替换成index
          
        },
        next_id:function(){
            return this.list.length +1;  //6添加id
        },
        set_current: function(todo){
            this.current = copy(todo) ; //Object.assign({},todo);
        },
        reset_current: function(){
            this.set_current({});
        },
        find_index:function (id) {
            return this.list.findIndex(function (item) {
                return item.id =id;
            })
        }
    
    },
    watch:{
        list:{      
            deep:true,
            handler: function (new_val,old_val) {
                if(new_val){
                   msg.set('list',new_val);
                }else{
                    msg.set('list',[]);
                }
                
            }
        }
    }

   });

})();