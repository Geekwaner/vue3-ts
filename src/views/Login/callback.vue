<script setup lang="ts">
// 1. 检查用户是否已登录
if (QC.Login.check()) {
  // 2. 获取 QQ 用户唯一标识 openId
  QC.Login.getMe((openId) => {
    console.log('🗝️openId', openId);
  });
  // 3. 获取用户资料
  QC.api('get_user_info').success((res: unknown) => {
    console.log('😀获取用户资料', res);
  });
}
</script>

<template>
  <h1>callback-QQ登录回跳页面测试</h1>
</template>
