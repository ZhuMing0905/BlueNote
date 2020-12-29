<template>
  <div class="noteListCon">
    <div class="noteItem" v-for="(item,index) in noteItemAll" :key="index">
        <div class="con">
          <router-link :to="{path:'/article', name: 'Article', query: {id:item.id} }">
            <div class="title">{{item.id}}-{{item.title}}</div>
            <div class="des">{{item.description}}</div>
            <div class="time">{{ item.inputtime | datafmt('YYYY年MM月DD日 HH:mm:ss') }}</div>
          </router-link>
          <div class="checkbox" v-show="handleShow">
              <van-checkbox v-model="item.isChecked" shape="square" icon-size="15px" @click="chooseChange(item.id)"></van-checkbox>
          </div>
        </div>
    </div>
    <div class="noteHandle" v-show="handleShow">
      <div class="noteHandleLeft">
        <van-checkbox v-model="allChecked" shape="square" icon-size="15px" @click="allChange">全选</van-checkbox>
      </div>
      <div class="noteHandleRight"><van-button type="primary" @click="moveId">草稿箱</van-button><van-button type="warning" @click="deleteId">确认删除</van-button></div>
    </div>
  </div>
</template>

<script>
import { Checkbox,Button,Toast } from 'vant';
export default {
  name:'NoteItem',
  components:{
    [Checkbox.name]:Checkbox,
    [Button.name]:Button,
    [Toast.name]:Toast
  },
  props:{
    noteItemAll:{
      type: Array
    },
    handleShow:{
      type:Boolean,
      required:false,
      default:false
    }
  },
  data(){
    return {
      member:this.$store.state.member,
      memberAuth:this.$store.state.member_auth,      
      allChecked : false,
      checkedId : []
    }
  },
  watch:{},
  computed:{},
  methods:{
    chooseChange(id){

        if (this.checkedId.indexOf(id) > -1) {
          this.remove(this.checkedId, id);
        } else {
          this.checkedId.push(id);
        }
      this.noteItemAll.length == this.checkedId.length?this.allChecked = true : this.allChecked = false
    },
    allChange(){
      if(!this.allChecked){
        this.noteItemAll.forEach(e => {
          e.isChecked = false;
        });
        this.checkedId = [];
      }else{
        this.noteItemAll.forEach(e=>{
          e.isChecked = true
          if(this.checkedId.indexOf(e.id) < 0){
            this.checkedId.push(e.id)
          }
        })
      }
      this.$emit('allCheckedHandle',this.allChecked)  
    },
    remove(arr, val) {
      let index = arr.indexOf(val);
      if (index > -1) {
        arr.splice(index, 1);
       }
     },
     moveId(){
      this.$router.push("/about")
     },
     deleteId(){
       const that = this;
       let ids = that.checkedId.join(',');
       if(that.checkedId.length == 0){
          that.$toast.fail("至少选择一条");
       }else{
          that.axios.get("/api&appsecret=PHPCMF3458092B107BA&api_auth_code="+that.memberAuth+"&api_auth_uid="+that.member.uid+"&s=member&app=note&c=home&m=del&id="+ids
            ).then(
              function (res) {
                console.log(res)
                if(res.data.code == 0){
                  that.$toast(res.data.msg);
                }else if(res.data.code > 0){
                  that.$toast.success(res.data.msg);
                  that.$emit('listUpdataHandle')  
                }
              }
            ).catch(function (err) {
              console.log("请求失败" + err);
            })
        }
     }
  },
  created(){},
  mounted(){}
}
</script>
<style lang="less" scoped>
.noteListCon {
  .noteItem {
    padding: 15px;
    .con{
      padding: 15px;
      border-radius: 10px;
      background: #fff;
      box-shadow: 0 8px 10px #999;
      position: relative;
      .title {
        font-size: 15px;
        color:#000;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .des {
        margin:10px 0 5px;
        line-height: 20px;
        font-size: 13px;
        color:#666;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .time {
        font-size: 12px;
        color:#666;
      }
      .checkbox{
        width: 40px;
        height: 40px;
        position:absolute;
        right:0;
        bottom:0;
        padding:10px 0 0 10px;
      }
    }
  }
  .noteHandle{
    position: fixed;
    left: 0;
    bottom:50px;
    width: 100%;
    background: #fff;
    padding: 15px;
    display: flex;
    justify-content:space-between;
    align-items: center;
    .noteHandleLeft {
      flex: 0 0 80px;
    }
    .noteHandleRight {
      display: flex;
      justify-content:space-between;
      flex:0 0 190px;
    }
  }
}
</style>