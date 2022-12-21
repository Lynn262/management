import { createStore } from 'vuex'

import {getMenu} from '@/api/home'


interface State{
  menus:{}
}
export default createStore<State>({
  state() {
    return {
      menus:[]
    }
  },
  mutations: {
    updateMenus(state,menus){
      state.menus = menus
    }
  },
  actions: {
    getRolesMenus({commit}){
      return new Promise((resolve,reject)=>{
        getMenu({}).then(res =>{
          if(res.data.meta.status ===200){
            commit('updateMenus',res.data.data)
            resolve(res.data.data)
          }else{
            reject(res)
          }
        })
      })
    }
  },
  modules: {
  }
})
