var app = getApp();
const baseConfig = require('./config.js')




//随机打乱数组
function randomdata(arr) {
  var array = arr;
  let len = array.length;
  for (let i = len - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  console.log(array);
}

//获得到n的随机数
// var rand = Math.floor(Math.random() * (n)) + 1;


//从数组随机取一个值
function haveone(arr) {
  var arr = arr;
  var item = arr[Math.floor(Math.random() * arr.length)];
  console.log(item)
}


//随机打乱数组
function havemobansome() {
  var array = baseConfig.moban;
  let len = array.length;
  for (let i = len - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  console.log(array);
  return array;
}




//从数组随机取多个值(count表示取几个值）
function havebannersome() {
  var arr = baseConfig.banner;
  var num = arr.length;
  if (num < 4) {
    var count = num;
  }
  else if (num >= 4 && num < 7) {
    var count = num - 1;
  }
  else if (num >= 7 && num < 10) {
    var count = num - 2;
  }
  else {
    var count = 8;
  }
  var shuffled = arr.slice(0),
    i = arr.length,
    min = i - count,
    temp,
    index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  //console.log(shuffled.slice(min)) 
  return shuffled.slice(min)
}









module.exports = {
  randomdata: randomdata,
  haveone: haveone,
  havemobansome: havemobansome,
  havebannersome: havebannersome,
}