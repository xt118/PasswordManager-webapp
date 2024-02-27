<template>
  <div id="app">
    <template v-if="closeWelcomeScreen">
      <!-- <button id="csfh" @click="changeWelcomeScreen">RESET</button> -->
      <div id="home">
        <div id="title">Password Manager</div>
        <el-form :model="calculateionParameters" :rules="calculateionParameterRules" ref="calculateionParameters" label-width="120px">
          <el-form-item label="Domain" prop="domain">
            <el-input v-model="calculateionParameters.domain" spellcheck="false"></el-input>
          </el-form-item>
          <el-form-item label="AccountCode" prop="accountCode">
            <el-input v-model="calculateionParameters.accountCode" spellcheck="false"></el-input>
          </el-form-item>
          <div>
            <el-button type="primary" @click="onSubmit('calculateionParameters')">Calculate</el-button>
            <el-button @click="onReset('calculateionParameters')">Reset</el-button>
          </div>
        </el-form>
        <!-- <div>
          <div style="display: flex;">平台名称<el-input style="flex-grow: 1;" v-model="input" @input="testCalculation" placeholder="请输入内容"></el-input></div>
          <div>用户名</div>
        </div>
        <el-button>sdsd</el-button>
        <el-input v-model="input" @input="testCalculation" placeholder="请输入内容"></el-input>
        <div>密钥 {{ psw }}</div> -->
      </div>

      <!-- <div id="dtlb">
        <div v-for="(item, index) of items" class="dtlb_item" :key="index">
          <el-input :data-idx="index" v-model="item.key" @input="changDtlbItemValue" placeholder="名称"></el-input><el-input :data-idx="index" v-model="item.value" @input="changDtlbItemValue" placeholder="内容"></el-input>
          {{ index }}
          {{ item.key }}
        </div>
        <el-button @click="addDtlbItem">添加选项</el-button>
      </div> -->
    </template>
    <template v-else>
      <img alt="logo" src="./assets/logo.png" style="padding-top: 60px;">
      <WelcomeScreen msg="Welcome to Password Manager" description="This is a password manager that does not save passwords."/>
      <button @click="changeWelcomeScreen" style="margin-top: 30px">GET STARTED</button>
    </template>
  </div>
</template>

<script>
import WelcomeScreen from './components/WelcomeScreen.vue'
import Calculate from './utils/calculate'

export default {
  name: 'App',
  data() {
    return {
      closeWelcomeScreen: localStorage.getItem('closeWelcomeScreen') == 'true',
      input: "",
      psw: "",

      calculateionParameters: {
        domain: "",
        accountCode: ""
      },

      calculateionParameterRules: {
        domain: [
          { required: true, message: "Domain cannot be null", trigger: 'blur' }
        ],
        accountCode: [
          { required: true, message: "AccountCode cannot be null", trigger: 'blur' }
        ]
      },

      items: [
        { key: "域名", value: "" },
        { key: "域名", value: "" }
      ]
    }
  },
  methods: {
    changeWelcomeScreen() {
      let closeWelcomeScreen = localStorage.getItem('closeWelcomeScreen')
      localStorage.setItem('closeWelcomeScreen', closeWelcomeScreen == "false");
      console.log(localStorage.getItem('closeWelcomeScreen'));
      this.closeWelcomeScreen = localStorage.getItem('closeWelcomeScreen') == 'true';
    },
    testCalculation(value) {
      this.psw = Calculate.jm("acdwsx", value);
    },

    changDtlbItemValue(value) {
      console.log(value)
      console.log(JSON.stringify(this.items))
    },
    addDtlbItem() {
      this.items.push({ key: "", value: "" })
    },

    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证通过
          this.$prompt("Please enter the SecretKey", "Calculation", {
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel'
          }).then(({ value }) => {
            this.$alert(Calculate.jm(value, "" + this.calculateionParameters.domain.trim() + this.calculateionParameters.accountCode.trim()), "Calculation Result", { confirmButtonText: "Confirm" });
          }).catch(() => {
            // 取消输入 SecretKey
          });
        } else {
          return false;
        }
      });
    },
    onReset(formName) {
      this.$refs[formName].resetFields();
    }
  },
  components: {
    WelcomeScreen
  }
}
console.log(Calculate.jm("sdsdwdas", "sadasdsd"));
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#title {
  font-size: 20px;
  padding: 30px 0 50px 0;
}

button {
  color: black;
  padding: 10px 15px;
  letter-spacing: 2px;
  background-color: transparent;
  border-width: 2px;
  box-shadow: none;
  border-style: solid;
  border-color: black;
}
button:hover {
  border-color: #09f;
}

#csfh {
  position: absolute;
  top: 5px;
  right: 5px;
}

#home {
  max-width: 1200px;
  padding: 0 10px;
  margin: 0 auto;
}

#dtlb {
  background-color: #09f;
  padding: 20px;
}

.dtlb_item {
  display: flex;
  flex-direction: row;
  background-color: white;
}
</style>
