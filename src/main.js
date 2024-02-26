import Vue from 'vue'
import { Form, FormItem, Button, Input, MessageBox } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'

Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Button.name, Button);
Vue.component(Input.name, Input);

Vue.config.productionTip = false

Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$prompt = MessageBox.prompt;

new Vue({
  render: h => h(App),
}).$mount('#app')
