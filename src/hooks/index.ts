import { useIntersectionObserver } from '@vueuse/core';
import { ref } from 'vue';

// 🔔核心单词解释：
//   useIntersectionObserver   检查元素是否进入可视区函数
//   target                    目标元素，🎯需配合模板 ref 使用
//   isIntersecting            是否进入可视区(布尔值)
//   stop                      用于停止检测的函数
export const useObserver = (fn?: () => void) => {
  const target = ref(null);
  const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
    // 写业务代码
    console.log('isIntersecting目标是否进入可视区 -----> ', isIntersecting);
    if (isIntersecting) {
      console.log('目标进入了可视区，停止监听 ');
      // 实现业务代码
      fn && fn();
      stop();
    }
  });

  return { target };
};

//  { useObserver }
