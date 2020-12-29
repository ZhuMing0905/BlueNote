import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    member:JSON.parse(localStorage.getItem("member")) || {},
    member_auth:localStorage.getItem("member_auth") || "",
    searchResult:[]
  },
  getters:{
    member(state){
      return state.member
    },
    member_auth(state){
      return state.member_auth
    },
    searchResult(state){
      return state.searchResult
    }
  },
  mutations: {
    setMember(state, v) {
      state.member = v;
    },
    setMemberAuth(state, v) {
      state.member_auth = v;
    },
    setSearchResult(state, v) {
      state.searchResult = v;
    }
  },
  actions: {
    setMember(context, v) {
      context.commit('setMember', v)
    },
    setMemberAuth(context, v) {
      context.commit('setMemberAuth', v)
    },
    setSearchResult(context, v) {
      context.commit('setSearchResult', v)
    }
  },
  modules: {}
});
