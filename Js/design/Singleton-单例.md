# 单体模式
私有方法的一个缺点是占内存, 但由于单体对象只会被实例化一次, 所以创建私有方法很适合.

1. 模块模式
2. 惰性实例化
3. 分支

## 模块模式
类似字面量;

```js
Singleton = (function() {
  //Private members
  var privateAttr = false;

  function privateMethod() {
    console.log('privateMethod');
  }

  //Public members
  return {
    publiceAttr: true,
    publiceMethod: function() {
      console.log('publiceMethod');
    }
  }
})();
```

## 惰性实例化
具有唯一的实例化方法`getInstance`

```js
var Singleton = (function(){
  //保存唯一的实例
  var uniqueInstance;
  //构造函数
  function constructor(arg) {
    var privateAttr = arg;

    function privateMethod() {
      console.log('privateMethod');
    }
    
    return {
      publicAttr: 'privateAttr:' + privateAttr,
      publiceMethod: function() {
        privateMethod();
        console.log(privateAttr);
      }
    }
  }

  return {
    getInstance: function(arg) {
      if(!uniqueInstance) {
        uniqueInstance = constructor(arg);
      }
      return uniqueInstance;
    }
  }
})();

//使用
var s = Singleton.getInstance('Tom');
var z = Singleton.getInstance('Jim');
s === z; //true
z.publicAttr; //privateAttr: Tom

```

## 分支
根据环境条件生成需要的对象. 优点是减少执行过程中的判断(`if`), 一次生成需要的对象. 缺点是对象被创建保存在内存;

```js
//例1
var SingleByEnv = (function(){
  var objA = {
    method: function(){}
  }
  var objB = {
    method: function(){}
  }
  //nodejs环境返回objA, 否则返回objB
  return typeof global !== 'undefined' ? objA : objB;
})();

//例2
var simpleXhrFactory = (function(){
  var methods = [
    function() {
      return new XMLHttpRequest();
    },
    function() {
      return new ActiveXObject('Msxml2.XMLHTTP');
    },
    function() {
      return new ActiveXObject('Microsoft.XMLHTTP');
    }
  ];
  
  for(var i = 0, len = methods.length; i < len; i++) {
    try {
      results[i]();
    } catch(error) {
      continue;
    }
    this.createXhrObject = methods[i];
    return methods[i];
  }

  throw new Error('SimpleHandler: could not create an XHR object.');
})()
```
