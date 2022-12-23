<script setup lang="ts">
import { message } from '@/components/XtxUI';
import { useMemberStore } from '@/store';
import type { QQUserInfo } from '@/types';
import { reactive } from 'vue';

// keepAlive 会把 form 的数据保留下来
const form = reactive({
  mobile: '15915876393',
  code: '123456',
});

const { userInfo, unionId } = defineProps<{
  userInfo: QQUserInfo;
  unionId: string;
}>();

const member = useMemberStore();
const loginSocialBind = () => {
  const data = {
    unionId,
    ...form,
  };
  member.loginSocialBind(data);
};

const sendCode = () => {
  // 校验手机号码是否正确
  if (!/^1[3-9]\d{9}$/.test(form.mobile)) {
    message({ text: '手机号码格式错误~', type: 'warn' });
    return;
  }
  message({ type: 'success', text: '手机号码校验通过' });
  member.sentCode({ mobile: form.mobile });
};
</script>

<template>
  <div class="xtx-form">
    <div class="user-info">
      <img :src="userInfo?.data?.figureurl_2" alt="" />
      <p>
        Hi，{{ userInfo?.data?.nickname }}
        欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~
      </p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input
          class="input"
          type="text"
          v-model="form.mobile"
          placeholder="绑定的手机号"
        />
      </div>
      <div class="error"></div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <input
          class="input"
          type="text"
          placeholder="短信验证码"
          v-model="form.code"
        />
        <span class="code" @click="sendCode">发送验证码</span>
      </div>
      <div class="error"></div>
    </div>
    <a href="javascript:;" class="submit" @click="loginSocialBind">立即绑定</a>
  </div>
</template>

<style scoped lang="less">
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 25px;
  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }
  p {
    padding-left: 10px;
  }
}
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
}
</style>
