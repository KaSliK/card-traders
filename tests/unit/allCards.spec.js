import { shallowMount, createLocalVue } from '@vue/test-utils'
import AllCards from '@/views/AllCards'
import VueRouter from 'vue-router'
import vuetify from "vuetify"
import Getters from "../../src/store/index"

import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(vuetify)
localVue.use(Vuex)


describe('Login Front Tests', () => {
   let store
   let getters
   let wrapper
   beforeEach(() => {
      getters = {
         categories: () => {['categories', 'names']},
         subCategories: () => {['categories', 'names']},
         userCards: () => [{"id":1680,"name":"Chaeyoung 01 1","short":"Chaeyoung 01 1","description":"Chaeyoung the story begins photo: 1","category":{"id":1,"name":"Chaeyoung","created_at":null,"updated_at":null},"subcateogry":{"id":1,"name":"the story begins","created_at":null,"updated_at":null,"order":10,"style":"left"},"image":"http:\/\/ct.zobacztu.pl\/images\/1\/Chaeyoung-01-01.png"},{"id":1479,"name":"Chaeyoung 01 2","short":"Chaeyoung 01 2","description":"Chaeyoung the story begins photo: 2","category":{"id":1,"name":"Chaeyoung","created_at":null,"updated_at":null},"subcateogry":{"id":1,"name":"the story begins","created_at":null,"updated_at":null,"order":10,"style":"left"},"image":"http:\/\/ct.zobacztu.pl\/images\/1\/Chaeyoung-01-02.png"}]
      }
      store = new Vuex.Store({
         getters
      })
      wrapper = shallowMount(AllCards, { store, localVue })
   })
   test('is a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy()
   })

   it('Does exist element with justify-space-around class - it renders when has data?', () => {
      expect(wrapper.find('.justify-space-around').exists()).toBe(true)
   })

})
