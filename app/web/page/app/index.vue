<template>
  <Layout :title="title">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </Layout>
</template>
<script type="text/babel">
  import Layout from 'component/layout/app/index.vue';
  export default {
      data(){
        return {
            title: '双十一狂欢'
        }
      },
    components: {
      Layout
    },
    computed:{

    },
    mounted(){

    },
    created(){

    }

  }
</script>
