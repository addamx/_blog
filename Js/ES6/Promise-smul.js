'use strict';

/**
 * Promisee 作为状态机new Promise(fn(resolve, reject))
 * - state: PENDING, FULFILLED, REJECTED
 * - API: then(onresolve, onreject): 
 */

const PENDING = Symbol();
const FULFILLED = Symbol();
const REJECTED = Symbol();

function Promisee(fn) {
  // fn为要被Promise化的事务, 必须为函数
  if (typeof fn != 'function') {
    throw new Error('resolver should be a function!');
  }
  // 初始state为pending
  // value记录事务结果值
  // handler保存事务结束后的处理器(then,catch等api传入)
  let state = PENDING;
  let value = null;
  let handler = [];

  // 修改state为 fulfilled, 保存事务结果值, 执行处理器
  function fulfill(result) {
    state = FULFILLED;
    value = result;
    handler.forEach(next);
    handler = null;
  }
  // 修改state为 pending, 保存事务结果值, 执行处理器
  function reject(err) {
    state = REJECTED;
    value = err;
    handler.forEach(next);
    handler = null;
  }
  // 第一次
  function resolve(result) {
    try {
      console.log('result: ' + result)
      let then = typeof result.then == 'function' ? result.then : null;
      if (then) {
        then.bind(result)(resolve, reject);
        return;
      }
      fulfill(result);
    } catch (err) {
      reject(err);
    }
  }

  function next({ onFulfill, onReject }) {
    switch (state) {
      case FULFILLED:
        onFulfill && onFulfill(value);
        break;
      case REJECTED:
        onReject && onReject(value);
        break;
      case PENDING:
        handler.push({ onFulfill, onReject });
    }
  }


  this.then = function (onFulfill, onReject) {
    // 最后都应该返回一个新的Promise对象
    return new Promisee((resolve, reject) => {
      //交由next执行onFulfill/onReject的处理器
      next({
        onFulfill: (val) => {
          try {
            resolve(onFulfill(val));
          } catch (err) {

          }
        },
        onReject: (err) => {
          reject(onReject(val));
        }
      });
    });
  }

  //当new Promise(fn)时, 事务已经开始执行;
  //一般用闭包返回一个new Promise来控制触发: var aPromise = function(fn){return new Promise(fn);}
  fn(resolve, reject);
}


var test = function(){
  console.log('before init promise-fun');
  return new Promisee(function(resolve, reject){
    try {
      console.log('init promise-fun')
      setTimeout(() => {
        console.log('done promise-fun')
        resolve('resV');
      }, 1000);
    } catch (error) {
      reject('rejV');
    }
  })
}

test().then(function(v){
  console.log('onFulfill(1):' + v)
}).then(function(v){
  console.log('onFulfill(2):' + v)
})