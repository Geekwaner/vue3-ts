import { useIntersectionObserver } from '@vueuse/core';
import dayjs from 'dayjs';
import moment from 'moment';
import { ref, onUnmounted, computed } from 'vue';

// 🔔核心单词解释：
//   useIntersectionObserver   检查元素是否进入可视区函数
//   target                    目标元素，🎯需配合模板 ref 使用
//   isIntersecting            是否进入可视区(布尔值)
//   stop                      用于停止检测的函数
export const useObserver = (fn?: () => void) => {
  const target = ref(null);
  const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
    // 写业务代码
    // console.log('isIntersecting目标是否进入可视区 -----> ', isIntersecting);
    if (isIntersecting) {
      // console.log('目标进入了可视区，停止监听 ');
      // 实现业务代码
      fn && fn();
      stop();
    }
  });

  return { target };
};

/*
  hooks 和 utils 的职责划分
  hooks 有使用限制，用来存放业务代码，必须运行在 .vue 的页面中
  utils 没有使用限制，存放全局工具函数，可以运行在任何 js 地方
*/

/*
  倒计时封装
  1. 把业务代码全部复制到 useCounter 函数里面
  2. 把需要用到的业务数据返回出去
  3. useCounter 抽离到 hooks/index 里面
  4. 其他页面引进 useCounter 函数，调用即可获取所需要的 数据

*/
export const useCounter = () => {
  const count = ref(0);

  // 配合 ts 设置0，定时器类型本质是数字
  let timer = 0;
  const start = (time = 60) => {
    // 一开始时候，就判断，有定时器，就不要执行后面的代码了
    if (count.value) return;
    //防止订单超时还开启定时器
    if (time <= 0) return;

    count.value = time;
    timer = setInterval(() => {
      count.value--;
      console.log('count.value -----> ', count.value);

      // 到0时，清理定时器
      if (count.value <= 0) {
        clearInterval(timer);
      }
    }, 1000);
  };

  const timeFormat = computed(() => {
    // return moment.unix(count.value).format('mm分ss秒');
    return dayjs.unix(count.value).format('mm分ss秒');
  });

  // 优化：离开页面时，清理定时器
  onUnmounted(() => clearInterval(timer));

  return { count, start, timeFormat };
};

//  { useObserver, useCounter }
