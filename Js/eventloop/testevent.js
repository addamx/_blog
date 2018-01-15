setImmediate(function () {
  console.log(1);
}, 0);
setTimeout(function () {
  console.log(2);
}, 0);
new Promise(function (resolve) {
  console.log(3);
  resolve();
  console.log(4);
}).then(function () {
  console.log(5);
});
console.log(6);
process.nextTick(function () {
  console.log(7);
});
console.log(8);

// 作者：何幻
// 链接：https://www.zhihu.com/question/36972010/answer/71338002
// 来源：知乎
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。