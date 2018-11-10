<template>
  <div class="container">
      <div class="header-content">
          <div class="count-down">
              <p>距离活动结束还有</p>
              <div class="time-wrapper">
                  <span class="big">{{leftTime.day}}</span><span> 天</span><span class="big">{{leftTime.hour}}</span><span> 时</span><span class="big">{{leftTime.min}}</span> 分<span class="big">{{leftTime.sec}}</span> 秒
              </div>
          </div>
      </div>
      <div class="first-content">
          <div class="open-wrapper">
              <div class="open-btn" @click="openBox">
              </div>
              <div class="text">
                  当前可开启:{{list.length}}次
              </div>
          </div>
      </div>
      <div class="three-content">
          <div class="source">
             source: <input type="number" max="2" min="1" v-model="actInfo.source" placeholder="输入存储位置">
          </div>
          <div class="act-name">
              name: <input type="text" maxlength="20" v-model="actInfo.name" placeholder="输入活动名字">
          </div>
          <div class="time">
              time: <input type="text" v-model="actInfo.time" placeholder="格式'2018/11/01 10:00:01'">
          </div>
          <div class="create-btn" @click="createTable">
              create act
          </div>
          <div class="status" v-if="status"> {{status}}</div>
      </div>
  </div>
</template>

<script type="text/babel">
    import axios from "axios"
  export default{
     data(){
       return {
           leftTime:{
               day:0,
               hour: 0,
               min: 0,
               sec: 0
           },
           timer: null,
           list: [],
           deadTime: Date.now(),
           actInfo:{
               scource: 1,
               name:'',
               time:"",
           },
           status: ''
       }
     },
     methods:{
       countDown(leftTime){
           let that = this;
           leftTime = Number(leftTime/1000);
           if(leftTime <=0 ){
               that.leftTime = {
                   day: 0,
                   hour: 0,
                   min: 0,
                   sec: 0,
               }
               return
           }
           let day = Math.floor( leftTime/(60*60*24)),
               hour = Math.floor((leftTime - day*60*60*24)/(60*60)),
               min = Math.floor((leftTime - day*60*60*24 -hour*60*60) /60),
               sec = Math.floor(leftTime - day*3600*24 - hour*3600 - min*60);
           that.leftTime = {
               day,
               hour,
               min,
               sec
           }
           leftTime --;
        that.timer = setTimeout(function () {
              that.countDown(leftTime*1000)
          },1000)
       },
      async openBox(){
           let that = this;
         let result = await  that.$http("http://10.38.164.87:10825/activityAutoPlatform/rank/102/rankInfo",{
               method: "get",
               params: {
                   uuid: '',
                   n: 3,
                   actId: 102,
                   rankType: 1,
                   needContribute: true,
                   rankName: 'total'
               }
           }).catch(() => ({data:{code:0,rank:[]}}));
         if(result.data.code === 0){
             that.list = result.data.rank
         }else{
             that.list = []
         }
       },
     async createTable(){
        let that = this;
        for(let key in that.actInfo){
            if(!that.actInfo[key]){
                document.getElementsByClassName('create-btn')[0].style.color ="red";
                return
            }
        }
         let result = await that.$http("http://10.235.224.115:7001/api/act/create",{
             method: "get",
             params: {
                actName: that.actInfo.name,
                deadTime: + new Date(that.actInfo.time),
                source: that.actInfo.source,
             }
         }).catch(() => ({data:{code:-1,msg:'error'}}))

         console.log(result.data)
         that.status = result.data.code >0 ? 'true': 'false';
         setTimeout(() =>{
             that.status = ''
         },2*1000)

     }
     },
    computed: {
      isLoading(){
       return false;
      },
      articleList() {
        return this.$store.state.articleList;
      }
    },
    // 与获取数据easywebpack自定义的  也可以是asyncData
    preFetch ({ state, dispatch, commit }) {
      return Promise.all([
        dispatch('FETCH_ARTICLE_LIST')
      ])
    },
    beforeMount() {
      return Promise.all([
        this.$store.dispatch('FETCH_ARTICLE_LIST')
      ]);
    },
    async mounted(){
         let that = this;
        that.$http.default.timeout = 10*1000;
        that.$http.default.validateStatus = function(status){
            return status >=200 && status <=304
        }
        let result = await that.$http("http://10.235.224.115:7001/api/act/findInfo",{
            method: 'get',
            params:{
                id: 1
            }
        }).catch(() => ({data:{data:{deadTime:Date.now(),actName: ''}}}));

        that.deadTime = result.data.data.deadTime;
         that.timer && clearTimeout(that.timer)
         that.countDown(that.deadTime - Date.now() )

    },
   async created(){

    }
  }
</script>
<style scoped lang="scss">
    @import "../asset/scss/common";
    @mixin bg-image($url){
        background: url(../asset/images/#{$url}) no-repeat center / 100% 100%;
    }
    div{
        box-sizing: border-box;
    }

    .container{
        width: 100%;
        padding: 0;
        margin: 0;
        font-size: __vw(32);
        color: #fff;
        background-color: #271A95;
    }
    .header-content{
        width: 100%;
        height: __vw(1250);
        @include bg-image("header-bg.png");
        padding-top: __vw(820);
        text-align: center;
        .count-down{
            width: __vw(525);
            margin: 0 auto;
            p{
                margin : __vw(10) 0;
            }
            .time-wrapper{
                display: flex;
                justify-content: center;
                align-items: center;
                flex-flow: row nowrap;
                .big{
                    font-size: __vw(44);
                    color: rebeccapurple;
                }
                span{
                    margin-left: __vw(10);
                }
            }
        }
    }
    .first-content{
        width: percentage(1000/1080);
        height: __vw(1540);
        margin: 0 auto;
        @include bg-image('one-bg.png');
        padding-top: __vw(810px);
        .open-wrapper{
            .open-btn{
                margin: 0 auto;
                width: __vw(324);
                height: __vw(95);
                @include bg-image('open_box.png');
            }
            .text{
                color: #FADE73;
                font-size: __vw(28);
                text-align: center;
                line-height: __vw(54);
                max-width: 90%;
                margin: 0 auto;
                @extend %text-ellipsis;
            }
        }
    }
    .three-content{
        width: 100%;
        height: __vw(1810);
        @include bg-image("three-bg.png");
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        input{
            width: __vw(500px);
            height: __vw(60px);
            outline: none;
            border: 1px solid black;
            color: black;
        }
        div{
            margin-bottom: __vw(10px);
        }
        .create-btn{
            width: __vw(200px);
            height:__vw(50px);
            border: 1px solid white;
            font-size:__vw(28);
            color: white;
            text-align: center;
            line-height: __vw(50);
        }
    }
</style>