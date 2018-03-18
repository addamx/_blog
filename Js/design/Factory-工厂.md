# 工厂模式
Interface/接口 在工厂模式中起重要的作用, 没有类型检查, 工厂模式生成的对象无法保证;

1. 简单工厂模式
2. 工厂模式

## 简单工厂模式
```js
var BicycleShop = function() {
  BicycleShop.prototype = {
    sellBicycle: function(model) {
      var bicycle = BicycleFactory.createBicycle(model);

      bicycle.assemble();
      bicycle.wash();

      return bicycle;
    }
  }
}
//需要的对象统一由对象工厂处理;
//需要对生成的对象做好接口检查;
var BicycleInterface = new Interface('Bicycle', ['assemble', 'wash', 'ride', 'repaire']);
var BicycleFactory = {
  createBicycle: function(model) {
    var bicycle;

    switch(model) {
      case 'shanghai':
        bicycle = new Shanghai();
        break;
      case 'moren':
      default:
        bicycle = new Moren();
    }
    Interface.ensureImplements(bicycle, BicycleInterface);
    return bicycle;
  }
}
```


## 工厂模式
真正的工厂模式的与简单工厂模式的区别: 它不是另外使用一个类(上面的BicycleFactory)或对象来创建需要的对象, 而是使用一个子类.





## 工厂模式**适用场合**
1. **动态实现**
创建一些用不同方式实现同一接口的对象

2. **节省设置开销**
把设置工作集中在工厂而不是各个类的构造函数; 
如可以在上面的`BicycleFactory`中添加生成的对象的初始化设置;

3. **用许多小型对象组成一个大对象**


## XHR: 简单工厂模式 + 专用型连接对象
前面使用单例模式实现了XHR方法, 下面使用工厂方法实现, 但由于不是单例, 所以要加一种避免重复运行检测代码的方法`memoizing`
```js
var SimpleHandler = function() {};
SimpleHandler.prototype = {
  request: function(method, url, callback, postVars) {
    var xhr = this.createXhrObject();
    xhr.onload = function() {
      (xhr.status == 200) ?
        callback.success(xhr.responseText, xhr.responseXML) :
        callback.failure(xhr.responseText, xhr.responseXML);
    }
    xhr.open(method, url, true);
    if(method !== 'POST') postVars = null;
    xhr.send(postVars);
  },
  // 简单工厂模式(一次性)
  createXhrObject: function() {
    var methods = [
      function() {return new XMLHttpRequest();},
      function() {return new ActiveXObject('Msxml2.XMLHTTP');},
      function() {return new ActiveXObject('Microsoft.XMLHTTP');}
    ];
    
    for(var i = 0, len = methods.length; i < len; i++) {
      try {
        results[i]();
      } catch(error) {
        continue;
      }
      //重载: Memoize the method
      this.createXhrObject = methods[i];
      return methods[i];
    }

    throw new Error('SimpleHandler: could not create an XHR object.');
  }
}



var QueuedHandler = function() {
  //新增属性;
  this.queue = [];
  this.requestInProgress = false;
  this.retryDelay = 5;
}
QueuedHandler.prototype = Object.setPrototypeOf(SimpleHandler.prototype);
QueuedHandler.prototype.request = function(method, url, callback, postVars, override) {
  if(this.requestInProgress && !override) {
    this.queue.push({
      method: method,
      url: url,
      callback: callback,
      postVars: postVars
    });
  } else {
    this.requestInProgress = true;
    var xhr = this.createXhrObject();
    var that = this;
    xhr.onload = function() {
      if (xhr.status === 200) {
        callback.success(xhr.responseText, xhr.responseXML);
        that.advanceQueue();
      } else {
        callback.failure(xhr.status);
        setTimeout(function() {
          that.request(method, url, callback, postVars, true)
        }, that.retryDelay * 1000)
      }
    }
    xhr.open(method, url, true);
    if(method !== 'POST') postVars = null;
    xhr.send(postVars);
  }
}  

QueuedHandler.prototype.advanceQueue = function() {
  if (this.queue.length === 0 ) {
    this.requestInProgress = false;
    return;
  }
  var req = this.queue.shift();
  this.request(req.method, req.url, req.callback, req.postVars, true);
}

```
