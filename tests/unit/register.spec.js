import { shallowMount, createLocalVue } from '@vue/test-utils'
import Login from '@/views/Register'
import VueRouter from 'vue-router'
import vuetify from "vuetify"

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(vuetify)

const wrapper = shallowMount(Login, { localVue })
wrapper.setData({ email: 'cardTrader', password: 'password' })

describe('Register tests in front', () => {
   test('is a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy()
   })
   it('wrapper has h1 element  in template', () => {
      expect(wrapper.html()).toContain('h1')
   })
   it('wrapper has v-btn', () => {
      expect(wrapper.html()).toContain('v-btn')
   })
   test('button register is visible', () => {
      const button = wrapper.find('#register');
      expect(button.exists()).toBe(true);
   })
   it('button register has text', () => {
      const button = wrapper.find('#register');
      expect(button.text()).toBe('Zarejestruj');
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
