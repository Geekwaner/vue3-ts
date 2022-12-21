<script setup lang="ts">
import { message } from '@/components/XtxUI';
import { useMemberStore } from '@/store';
import { reactive, ref } from 'vue';

const form = reactive({
  account: '15915876393',
  password: '123456',
});

const isAgree = ref(true);

const member = useMemberStore();
const loginBtn = () => {
  if (!form.account) {
    message({ type: 'warn', text: '用户名不能为空~' });
    return;
  }
  // 正则的写法,留下demo，需要时候可以自行上网查找
  if (!/^\w{6,15}$/.test(form.password)) {
    message({ type: 'warn', text: '输入密码，6-15位~' });
    return;
  }

  if (!isAgree.value) {
    message({ type: 'warn', text: '请同意登录条款~' });
    return;
  }
  // message({ type: 'success', text: '校验通过，可以登录' });
  member.login(form);
};

/*
a 链接的 client_id ，填上自己申请的 appid
​a 链接的 redirect_uri，填上转码后的 回调地址, ​encodeURIComponent(申请到的回调地址)
*/
const href =
  'https://graph.qq.com/oauth2.0/authorize?response_type=token&scope=all&client_id=100556005&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback';
</script>

<template>
  <div class="account-box">
    <div class="form">
      <div class="form-item">
        <div class="input">
          <i class="iconfont icon-user"></i>
          <input
            type="text"
            placeholder="请输入用户名或手机号"
            v-model="form.account"
          />
        </div>
        <!-- 表单验证错误信息提示 -->
        <!-- <div class="error"><i class="iconfont icon-warning" />请输入手机号</div> -->
      </div>
      <div class="form-item">
        <div class="input">
          <i class="iconfont icon-lock"></i>
          <input
            type="password"
            placeholder="请输入密码"
            v-model="form.password"
          />
        </div>
      </div>
      <div class="form-item">
        <div class="agree">
          <XtxCheckBox v-model="isAgree" />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
      </div>
      <a href="javascript:;" class="btn" @click="loginBtn">登录</a>
    </div>
    <div class="action">
      <a :href="href">
        <img
          src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
          alt=""
        />
      </a>
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 20px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
