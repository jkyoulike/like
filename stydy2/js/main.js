;(function(){
    var Event = new Vue();
    var alert_sound = document.getElementById('alert_sound');

    function copy(obj){
        return Object.assign({},obj);
    }
    Vue.component('task',{
        template:'#task-tpl',
        props:['todo'],
        methods:{
            action:function(name,params){
                Event.$emit(name,params);
            }
        }
    });
    new Vue({
        el:'#main',
        data:{
            list:[],
            current:[],
            last_id:0,//默认ID值为0
        },
        mounted:function(){
            var me = this;
            this.list = msg.get('list') || this.list;
            this.last_id= msg.get('last_id') ||this.last_id; //获取ID值

            setInterval(function(){
                me.check_alert();
            },2000);
            Event.$on('remove',function(id){
                if(id){
                    me.remove(id);
                }
            });
            Event.$on('toggle_complete',function(id){
                if(id){
                    me.toggle_complete(id);
                }
            });
            Event.$on('set_current',function(id){
                if(id){
                    me.set_current(id);
                }
            });
        },
        methods:{
            //添加
            add:function(){
                var is_update,id;

                var is_update =id = this.current.id;//5暂时还么有ID
                //判断是否更新，不是更新的就添加

                if(is_update){
                    //   var item =  this.list.find(function(item){  //变换findIndex
        
                    //   var index =  this.list.findIndex(function(item){  //变换findIndex
                    //         return item.id == is_update;     //优化 
                    //     });
                var index = this.this.find_index(id);

                Vue.set(this.list,index,copy(this.current));

                //  this.list[index] = copy(this.current);  //Object.assign({},this.current) 修改之后vue检测不到元素

               
                }else{

                    var title = this.current.title;
                    if(!title && title !==0 )return;  //current.title

                    var todo =copy(this.current);//拷贝数据 2 Object.assign({},this.current);
                    // console.log('this.current :', this.current);
                // this.list.push(this.current);//this.current是引用1  1
                this.last_id++;//ID自增+1
                msg.set('last_id',this.last_id);//将id值通过 set方法保存到local storage
                todo.id = this.last_id;
                
                this.list.push(todo);
                }
                this.reset_current(); //更新或添加数据后重置输入框
            },
            remove:function(id){
                var index = this.find_index(id);
                this.list.splice(index,1);//  this.list.splice(id,1); id替换成index
            },
           // next_id:function(){
               // return this.list.length +1;//6添加id
          //  },
            set_current:function(todo){
                this.current = copy(todo);//Object.assign({},todo);
            },
            reset_current:function(){
                this.set_current({});
            },
            find_index:function(id){
                return this.list.findIndex(function (item) {
                    return item.id == id;
                })
            },
            toggle_complete:function(id){
                var i = this.find_index(id);
                Vue.set(this.list[i],'completed',!this.list[i].complete);
                this.list[i].complete = !this.list[i].complete;
            },
            check_alert:function(){
                var me = this;
                this.list.forEach(function(row,i){
                    var alert_at = row.alert_at;
                    if(!alert_at || row.alert_confirmed)return;
                    
                    var alert_at=(new Date(alert_at)).getTime();
                    var now=(new Date()).getTime();
                    if(now>=alert_at){
                        alert_sound.onplay();
                        var confirmed = confirm(row.title);
                        Vue.set(me.list[i],'alert_confirmed',confirmed)
                    }
                     // console.log('row.alert_at',alert_at);
                        // console.log('row.now',now);
                        
                        // alert_sound.play();
                })
            }
        },
        watch:{
            list:{
                dee:true,
                handler:function (new_val,old_val){
                    if(new_val){
                        mes.set('list',new_val);
                    }else{
                        msg.set('list',[]);
                    }
                }
            }
        }
    });
})();