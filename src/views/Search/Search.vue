<template>
  <div class="wrapper">
    <van-nav-bar
      title="搜索"> 
    </van-nav-bar>     
    <div class="search">
      <div class="searchBtn">
          <van-search v-model="value" @search="searchResult" @click.stop.native="searchFocus" placeholder="请输入搜索关键词" />
      </div>
      <div class="searchHistory" v-show="searchHistoryShow">
        <ul>
          <li v-for="(item,index) in searchHistoryList" :key="index" @click.stop="setSearchResult(item)" class="van-hairline--bottom"><i>{{index+1 | numberFilter}}.</i><p>{{item}}</p></li>
          <li class="clear" v-show="searchHistoryNone">暂无搜索记录</li>
          <li class="clear" v-show="!searchHistoryNone" @click.stop="clearHistoryItems">清除搜索记录</li>
        </ul>
      </div>
      <div class="searchResult">
        
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="finishedText"
        error-text="请求失败，点击重新加载"
        @load="searchResultMore"
        offset="50"
      >
      <ul>
      <li v-for="(item , index) in searchResultList" :key="index">
        <router-link :to="{path:'/article', name: 'Article', query: {id:item.id} }">{{index+1 | numberFilter}} - {{item.title}} - {{item.author}}</router-link>
      </li>
      </ul>
      </van-list>
        
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Search , Toast , List } from 'vant';
export default {
  name:'Search',
  components:{
    [NavBar.name]:NavBar,
    [Search.name]:Search,
    [Toast.name]:Toast,
    [List.name]:List
  },
  props:{},
  data(){
    return {
      member:this.$store.state.member,
      memberAuth:this.$store.state.member_auth,      
      value:"",
      searchHistoryShow:false,
      searchHistoryList: JSON.parse(localStorage.getItem("historyItems")) || [],
      searchHistoryNone:true,
      page:1,
      searchResultList:this.$store.state.searchResult,
      loading: false, // 是否处在加载状态
      finished: true, // 是否完成加载
      finishedText: '', // 加载完毕文本提示
      total: 0, // 总条数      
    }
  },
  watch:{},
  computed:{},
  methods:{
    watchScroll(){
      this.searchHistoryShow = false
    },
    searchFocus(){
      this.searchHistoryShow = true
      this.searchHistoryList.length == 0 ? this.searchHistoryNone = true : this.searchHistoryNone = false
    },
    searchResult(value){
      if(value == ""){
        this.$toast.fail("请输入的关键词");
        this.finished = true
      }else{
        this.appendKeywords(value)
        this.searchHistoryList.length == 0 ? this.searchHistoryNone = true : this.searchHistoryNone = false
        this.searchHistoryShow = false
        this.upSearchResult()  
      }
    },
    setSearchResult(value){
      this.value = value
      this.searchHistoryShow = false
      this.upSearchResult() 
      this.appendKeywords(value)
    },
    clearHistoryItems() {
      localStorage.removeItem('historyItems')
      this.searchHistoryList = []
      this.searchHistoryNone = true
      this.searchResultList = []
      this.$store.commit("setSearchResult",[])
    },
    appendKeywords(value) {
      var appendFlag = true
      if (this.searchHistoryList !== null && this.searchHistoryList !== undefined && this.searchHistoryList.length > 0) {
        this.searchHistoryList.forEach(function(currentValue,index,arr) {
          if (currentValue === value) {
            arr.splice(index,1)
            arr.unshift(value)
            appendFlag = false
            return
          }
        })
        if (appendFlag === true) {
          if (this.searchHistoryList.length >= 10) {
            this.searchHistoryList.unshift(value)
            this.searchHistoryList.pop()
          } else {
            this.searchHistoryList.unshift(value)
          }
          localStorage.setItem('historyItems', JSON.stringify(this.searchHistoryList))
        }
      } else {
        this.searchHistoryList = []
        this.searchHistoryList.push(value)
        localStorage.setItem('historyItems', JSON.stringify(this.searchHistoryList))
      }
    },
    getSearchList () {
      let that = this
      that.axios.get("/api&appsecret=PHPCMF3458092B107BA&api_auth_code="+that.memberAuth+"&api_auth_uid="+that.member.uid+"&s=note&c=search&pagesize=8&catid=9&uid="+that.member.uid+"&page="+that.page+"&keyword="+that.value
      ).then(function (res) {
        if (res.status == 200) {
          that.total = res.data.data.sototal;
          if (that.page == 1) { // 首次获取收据
            that.searchResultList = res.data.data.list 
            that.$store.dispatch('setSearchResult',that.searchResultList)
          } else { // 下拉加载更多数据
            that.searchResultList = that.searchResultList.concat(res.data.data.list)
            that.$store.dispatch('setSearchResult',that.searchResultList)
          }
          that.loading = false
          if (res.data.data.list.length == 0) { // 无数据提示
            that.finished = true;
            that.finishedText = '暂无数据';
          } else if (that.searchResultList.length == that.total) {
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
    searchResultMore () {
      if(this.memberAuth !== ""){
        this.getSearchList();
        this.page++;
      }else{
        this.finished = true
      }
    },
    upSearchResult(){
        this.searchResultList = []
        this.loading = true
        this.finished = false
        this.page = 1
        this.total = 0
        this.searchResultMore ()   
    }
  },
  created(){},
  mounted(){
    document.body.addEventListener('click',()=>{
        this.searchHistoryShow = false;
    },false),
    window.addEventListener('scroll', this.watchScroll, true)    
  }
}
</script>
<style lang="less" scoped>
.wrapper {
  .search {
    position: relative;
    padding:15px;
    .searchBtn {
      transition: all 0.2s ease-out 0s;
      width: 100%;
      height: 54px;
      display:flex;
      justify-content: center;
      align-items: center;
      .van-search {
        width: 100%;
      }
    }
    .searchHistory {
      position: absolute;
      left: 15px;
      right: 15px;
      top:69px;
      background: #fff;
      padding:0 10px 10px;
      li {
        background: #fff;
        padding:5px 10px;
        line-height: 20px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        font-size: 14px;
        color: #666;
        i {
          flex: 0 0 30px;
        }
        p{
          flex:1;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;          
        }
        &.clear {
          justify-content: center;
        }
      }
    }
    .searchResult{
      height: calc(100vh - 190px);
      overflow-x: auto;
      li{
        font-size: 15px;
        padding: 15px;
        color: #666;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border-radius: 10px;
        background: #fff;
        margin-top:15px;
        a {
          color: #666;
        }
      }
    }
  }
}
</style>