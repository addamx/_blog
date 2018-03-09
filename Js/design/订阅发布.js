/*------------------------ES 2015------------------------------*/
function Publisher() {
  this.subscribers = []
}

Publisher.prototype.deliver = function(data) {
  this.subscribers.forEach(
    function(fn) {
      fn(data)
    }
  )
  return this
}

Function.prototype.subscriber = function(publisher) {
  var that = this
  var alreadyExists = publisher.subscribers.some(
    function(el) {
      return el === that
    }
  )
  if (!alreadyExists) {
    publisher.subscribers.push(this)
  }
  return this
}



/*------------------------ES 6------------------------------*/
class Publisher {
  constructor() {
    this.subscribers = [];
  }

  subscribe(fn) {
    const alreadyExited = this.subscribers.indexOf(fn) !== -1;
    alreadyExited || this.subscribers.push(fn);
  }

  delivery(data) {
    this.subscribers.forEach( fn => {
      fn(data)
    })
  }
}


/** Test */
var a = new Publisher();

a.subscribe(function(data) {
  console.log(data + '[1]');
})

var funb = function(data) {
  console.log(data + '[2]');
}

a.subscribe(funb);
a.subscribe(funb);

a.delivery('run-a ');