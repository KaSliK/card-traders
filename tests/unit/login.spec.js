import { shallowMount, createLocalVue } from '@vue/test-utils'
import Login from '@/views/Login'
import VueRouter from 'vue-router'
import vuetify from "vuetify"

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(vuetify)

const wrapper = shallowMount(Login, { localVue })
wrapper.setData({ email: 'cardTrader', password: 'password' })

describe('Login Front Tests', () => {
   test('is a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy()
   })
   it('wrapper has span in template', () => {
      expect(wrapper.html()).toContain('span')
   })
   it('wrapper has v-btn', () => {
      expect(wrapper.html()).toContain('v-btn')
   })
   test('button login is visible', () => {
      const button = wrapper.find('#login');
      expect(button.exists()).toBe(true);
   })
   it('button login has text', () => {
      const button = wrapper.find('#login');
      expect(button.text()).toBe('Zaloguj');
   })
   it('Does exist element with mt-4 class', () => {
      expect(wrapper.find('.mt-4').exists()).toBe(true)
   })
   it('wrapper check email data', () => {
      expect(wrapper.vm.email).toBe('cardTrader')
   })
   it('wrapper check password data', () => {
      expect(wrapper.vm.password).toBe('password')
   })
})
