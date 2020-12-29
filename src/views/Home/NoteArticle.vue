<template>
  <div class="noteList">
    <van-nav-bar
      title="详情"
      left-arrow
      @click-left="onClickLeft"
    />    
    <div class="noteItem">
        <div class="con">
            <div class="title">{{noteArticle.title}}</div>
            <div class="time">{{ noteArticle.inputtime}}</div>
            <div class="des">{{noteArticle.content}}</div>
        </div>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant';
export default {
  name:'NoteArticle',
  components:{
    [NavBar.name]:NavBar
  },
  props:{},
  data(){
    return {
      member:this.$store.state.member,
      memberAuth:this.$store.state.member_auth,
      noteArticle:{}    
    }
  },
  watch:{},
  computed:{
    NoteId(){
        return this.$route.query.id
     }
  },
  methods:{
    onClickLeft(){
      this.$router.go(-1);
    },    
    getNoteArticle(){
      const that = this;
     that.axios.get("/api&appsecret=PHPCMF3458092B107BA&api_auth_code="+that.memberAuth+"&api_auth_uid="+that.member.uid+"&s=note&app=note&c=show&m=index&id="+that.NoteId).then(
        function (res) {
          console.log(res)
          that.noteArticle = res.data.data
        }
      ).catch(function (err) {
        console.log("请求失败" + err);
      })
    }
  },
  created(){},
  mounted(){
    this.getNoteArticle()
  }
}
</script>
<style lang="less" scoped>
.noteList {
  .noteItem {
    padding: 15px;
    .con{
      .title {
        font-size: 15px;
        padding:15px;
        color:#000;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border-radius: 10px;
        background: #fff;
        box-shadow: 0 8px 10px #999;        
      }
      .des {
        line-height: 20px;
        font-size: 13px;
        color:#666;
        padding:15px;
        border-radius: 10px;
        background: #fff;
        box-shadow: 0 8px 10px #999;        
      }
      .time {
        margin:15px 0;
        font-size: 12px;
        color:#666;
        padding:15px;
        border-radius: 10px;
        background: #fff;
        box-shadow: 0 8px 10px #999;        
      }
    }
  }
}
</style>