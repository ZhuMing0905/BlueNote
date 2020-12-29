<template>
  <div class="noteList">
    <van-nav-bar
      title="首页"
      right-text="按钮"
      @click-right="onClickRight"
      :fixed="true"
      >
      <template #right>
        <van-icon name="weapp-nav" size="22" color="39a9ed"/>
      </template>  
    </van-nav-bar>
    <div class="newBuild" v-if="newBuildShow" :style="{paddingTop:(newBuildShow?'50px':'')}">
      <router-link :to="{ name: 'Note'}"><van-icon name="plus" size="40" color="#39a9ed"/></router-link>
    </div>
    <div class="noteList" :style="{paddingBottom:(handleShowChoose?'70px':''),paddingTop:(newBuildShow?'':'50px')}">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="finishedText"
        error-text="请求失败，点击重新加载"
        @load="pullupLoadMore"
        :immediate-check="immediateCheck"
      >
      <note-item :noteItemAll="noteList" :handleShow="handleShowChoose" @listUpdataHandle="listUpdata" @allCheckedHandle="allCheckedChoose"></note-item>
      </van-list>
    </div>
  </div>
</template>
<script>
import { NavBar,Icon,List } from 'vant';
import NoteItem from '../../components/NoteItem'
export default {
  name: "NoteList",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [List.name]: List,
    NoteItem
  },
  data(){
    return {
      member:this.$store.state.member,
      memberAuth:this.$store.state.member_auth,
      noteList:[],
      loading: false, // 是否处在加载状态
      finished: false, // 是否完成加载
      finishedText: '', // 加载完毕文本提示
      immediateCheck:true,
      page: 1, // 当前页码
      total: 0, // 总条数
      allChecked:false,
      handleShowChoose:false,
      newBuildShow:true
    }
  },
  watch: {
    member(val, oldVal) {
      console.log("inputVal = " + val + " , oldValue = " + oldVal)
    }
  },
  computed:{},  
  methods:{
    getNoteList () {
      const that = this;
      that.axios.get("/api&appsecret=PHPCMF3458092B107BA&api_auth_code="+that.memberAuth+"&api_auth_uid="+that.member.uid+"&s=member&app=note&c=home&m=index&catid=9&page="+that.page
      ).then(function (res) {
        res.data.data.list.forEach(m => {
          m.isChecked = that.allChecked;
        });
        if (res.status == 200) {
          that.total = res.data.data.total;
          that.total <= 3 ? that.newBuildShow = true : that.newBuildShow = false
          if (that.page == 1) { // 首次获取收据
            that.noteList = res.data.data.list 
          } else { // 下拉加载更多数据
            that.noteList = that.noteList.concat(res.data.data.list)
            that.loading = false
            that.finished = false;
          }
          if (res.data.data.list.length == 0) { // 无数据提示
            that.finished = true;
            that.finishedText = '暂无数据';
          } else if (that.noteList.length == that.total) {
            that.finished = true;
            that.finishedText = '没有更多啦';
          }
        } else { // 失败报错
        }          
      })
      .catch(function (err) {
        console.log(err);
      });
    },
    pullupLoadMore () {
      if(this.memberAuth !== ""){
        this.getNoteList();
        this.page++;
      }else{
        this.finished = true
      }
    },
    listUpdata(){
      this.noteList = []
      this.loading = true
      this.finished = false
      this.page = 1
      this.total = 0
      this.pullupLoadMore ()
    },
    allCheckedChoose(data){
      this.allChecked = data
    },
    onClickRight(){
      this.handleShowChoose = !this.handleShowChoose
    }
  },
  mounted(){
    // this.getNoteList()
  },
  
};

</script>
<style lang="less" scoped>
.noteList {
  .newBuild {
    margin: 40px 0 25px;
    text-align: center;
    a {
      padding:0 5px;
      border-radius: 5px;
      display: inline-block;
      border:2px solid #39a9ed;
      box-shadow:2px 2px 10px #333333;
      }
  }
}
</style>

