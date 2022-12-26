export const hideContact = (contact: string) => {
  // 写法1，slice实现
  // return contact.slice(0, 3) + '****' + contact.slice(-4);

  // 写法2，replace配合正则
  /*
    正则分组
    一般配合 replace 使用
    N个小括号用来分组，
    $1占位，代表第1个小括号的内容
    $2占位，代表第2个小括号的内容
    ...
    $N占位，代表第N个小括号的内容
  */
  return contact.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3');
};
