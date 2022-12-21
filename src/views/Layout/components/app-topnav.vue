<script setup lang="ts">
import { useMemberStore } from '@/store';
import { toRefs } from 'vue';

const member = useMemberStore();
// 注意使用toRefs解构出来的 profile 是ref对象
const { profile } = toRefs(member);
const { nickname, account, mobile } = toRefs(profile.value);
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="member.isLogin">
          <li>
            <a href="javascript:;"
              ><i class="iconfont icon-user"></i>
              {{ nickname || account || mobile }}
            </a>
          </li>
          <li><a href="javascript:;">退出登录</a></li>
        </template>

        <template v-else>
          <li><RouterLink to="/login">请先登录</RouterLink></li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li>
          <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="less">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
