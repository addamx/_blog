var arr = [10,1,11,7,22,55,5000,4,7,0,9,8,6];

function swap(i, j, array) {
  var temp = array[j];
  array[j] = array[i];
  array[i] = temp;

  // ES6
  // [array[i], array[j]] = [array[j], array[i]];
}

/* ---------------冒泡排序: 内外正------------------- */
var bubbleSort = function (arr) {

  var len = arr.length;
  for (var i = 1; i < len; i++) {

    var isSwap = false;

    for (var j = 0; j < len - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(j, j + 1, arr)
        isSwap = true
      }
    }
    if (!isSwap) {
      break;
    }
  }
  return arr
}



console.log('冒泡排序(1):')
console.log(bubbleSort(arr))



/* ---------------双向冒泡排序------------------- */
var bothwayBubbleSort = function (arr){
  var st = 0, ed = arr.length - 1, isSwap = false;
  while(st < ed + 1) {
    //ed->st, 取最小值
    var i = ed;
    while (i > st) {
      if(arr[i] < arr[i-1]) {
        swap(arr[i], arr[i-1]);
        isSwap = true;
      }
      i--;
    }
    if(!isSwap){
      break;
    }
    st++;
    //st->ed, 取最大值
    for(var j = st; j < ed; j++){
      if(arr[i] > arr[i+1]) {
        swap(arr[i], arr[i+1]);
        isSwap = true;
      }
    }
    if(!isSwap){
      break;
    }
    ed--;
  }
  return arr;
}

console.log('\n')
console.log('双向冒泡排序:')
console.log(bothwayBubbleSort(arr))


/* ---------------直接插入法排序------------------- */
var directInsertionSort = function(array) {
  var length = array.length, index, current;
  var _r = 0;
  for (var i = 1; i < length; i++) {
    index = i - 1;         //待比较元素的下标
    current = array[i];     //当前元素
    while(index >= 0 && array[index] > current) { //前置条件之一:待比较元素比当前元素大
      array[index+1] = array[index];    //将待比较元素后移一位
      index--;  //游标前移一位
    }
    if(index+1 != i){                   //避免同一个元素赋值给自身
      array[index+1] = current;            //将当前元素插入预留空位
    }
  }
  return array;
}

console.log('\n')
console.log('直接插入法排序:')
console.log(directInsertionSort(arr)) //91




/* ---------------折半插入排序------------------ */

var binaryInsertionSort = function (array){
  var current, i, j, low, high, m;
  for(i = 1; i < array.length; i++){
    low = 0;
    high = i - 1;
    current = array[i];

    while(low <= high){            //步骤1&2: 递归的折半查找
      m = (low + high)>>1;
      if(array[i] >= array[m]){//值相同时, 切换到高半区，保证稳定性
        low = m + 1;        //插入点在高半区
      }else{
        high = m - 1;        //插入点在低半区
      }
    }
    for(j = i; j > low; j--){     //步骤3:插入位置之后的元素全部后移一位
      array[j] = array[j-1];
    }
    array[low] = current;         //步骤4:插入该元素
  }
  return array;
}

console.log('\n')
console.log('折半插入排序:')
console.log(binaryInsertionSort(arr))


/* ---------------希尔排序------------------ */
//直接插入排序就可以看做是步长为1的希尔排序
//形参增加步数gap(实际上就相当于gap替换了原来的数字1)
function directInsertionSort(array, gap) {
  gap = (gap == undefined) ? 1 : gap;       //默认从下标为1的元素开始遍历
  var length = array.length, index, current;
  for (var i = gap; i < length; i++) {
    index = i - gap;    //待比较元素的下标
    current = array[i];    //当前元素
    while(index >= 0 && array[index] > current) { //前置条件之一:待比较元素比当前元素大
      array[index + gap] = array[index];    //将待比较元素后移gap位
      index -= gap;                           //游标前移gap位
    }
    if(index + gap != i){                   //避免同一个元素赋值给自身
      array[index + gap] = current;            //将当前元素插入预留空位
    }
  }
  return array;
}

function shellSort(array){
  var length = array.length, gap = length>>1;
  while(gap > 0){
    directInsertionSort(array, gap); //按指定步长进行直接插入排序
    gap = gap>>1;
  }
  return array;
}


/* ---------------快速排序------------------ */
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  var pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1)[0];
  var left = [];
  var right = [];

  for(var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i])
    }
  }

  return quickSort(left).concat([pivot], quickSort(right));
}
