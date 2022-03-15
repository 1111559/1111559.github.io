window.onload = function(){
  let link = document.createElement('link')
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = 'favicon.ico';
  document.getElementsByTagName('head')[0].appendChild(link);
  // 1, 获取元素
  let lis = document.querySelectorAll('.Gophers li');
  let oTop = document.querySelector('.top')
  let oBottom = document.querySelector('.bottom')
  let oTemplate =  document.querySelector('.template');
  let p1Span = document.querySelector('.p1 span');
  let p2Span = document.querySelector('.p2 span');
  let oEndSpan = document.querySelector('.endSpan');
  let oEnd = document.querySelector('.end');
  let oHistory = document.querySelector('.history');
  let oStart = document.querySelector('.start');
  let key = 0
  // 创建一个空数组
  let list = [];
  // 定义随机数的变量
  let randome; 
  // time0 老鼠开始
  // time1 老鼠向上运动
  // time2 老鼠向下运动
  // time3 打击老鼠之后向左颤抖
  // time4 打击老鼠之后向右颤抖
  // time5 锤子向下旋转运动
  // time6 锤子向上旋转运动
  // time7  倒计时定时器
  let time1,time2,time0,
      time3,time4,time5,
      time6,time7;
  // 创建地鼠运动
  function create(){
    let oImg = new Image();
    randome = getRandomInt(0,9);
    list.push(randome);
    oImg.src = './images/7f796d0f-e6d0-41cd-acd4-e22f7c322d4d.png';
    oImg.className = 'tenter';
    // 判断从一个洞频繁出现
    if(randome === list[list.length-2] || randome === list[list.length-3]){
      let rad = getRandomInt(0,randome);
      list.push(rad);
      randome = rad; 
    }
    // 地鼠随机从地洞窜出
    lis[randome].insertBefore(oImg,lis[randome].childNodes[2]);
    let oImgT = oImg.offsetTop;
    // 向上运动
    time1 = setInterval(function(){ 
      oImgT-=1;
      if(oImgT < -20){
        // 向上结束定时器，开启向下定时器
        time2 = setInterval(function(){
          oImgT+=1; 
          if(oImgT > 47){
            oImg.remove();
          }
          oImg.style.top = oImgT + 'px'
        },45)
      }
      oImg.style.top = oImgT + 'px'
    },20)
    // 点击地鼠
    oImg.onmousedown = function(event){
      // 创建音频
      let audio = document.createElement('audio');
      // 音频路径
      audio.src ='./vudio/796afc03-b6f1-4e85-9355-ee16decc5606.mp3';
      // 音频的播放
      audio.play()
      let e = event || window.event;
      let x = e.pageX;
      let y = e.pageY;
      let newBer;
      // 创建锤子
      let oHammer = new Image();
      // 修改锤子路径
      oHammer.src = './images/458fc5b4-acb5-4c5f-b048-913b9ab21a60.png';
      // 修改锤子的宽高
      oHammer.style.width = 80+'px';
      oHammer.style.height = 60 +'px'
      // 旋转锤子的角度
      oHammer.style.transform = 'rotate('+45+'deg)';
      // 定位锤子的位置
      oHammer.style.position = 'absolute';
      oHammer.style.top = y - 50 + 'px';
      oHammer.style.left = x + 'px';
      // 锤子的定时器
      time5 = setInterval(ends,1);
      let strs = oHammer.style.transform;
        // 使用正则表达式获取数值
        let numbera = strs.replace(/[^0-9]/ig,"")
      // 锤子打击
      function ends(){
        numbera-=1;
        if(numbera <= 0){
          newBer = numbera;
          // 关闭当前定时器
          clearInterval(time5);
          // 开启下一个定时器
          time6 = setInterval(stra,1);
        }
        oHammer.style.transform = 'rotate('+numbera+'deg)';
      }
      // 锤子抬起
      function stra(){
        newBer+=1;
        if(newBer >= 45){
          clearInterval(time6);
          oHammer.remove();
        }
        oHammer.style.transform = 'rotate('+newBer+'deg)';
      }
      // 打击地鼠修改图片路径
      let that = this;
      this.src = './images/74822211-c5d1-4e6c-b591-9e9b486f952c.png';
      // 判断是否是打击之后的图片如果是就关闭点击事件
      if(this.src){
        oImg.onmousedown = null;
      }
      this.style.transformOrigin = 'bottom';
      // 让打击之后的地鼠颤抖
      let oX = 0;
      function end(){
        oX-=1;
        if(oX < -5){
          time4 = setInterval(str,20);
        }
        that.style.transform = 'rotate('+oX+'deg)';
      }
      function str(){
        oX+=1;
        if(oX > 7){
          // 运动完之后把地鼠删除
          that.remove()
        }
        that.style.transform = 'rotate('+oX+'deg)';
      }
      // 地鼠颤抖
      time3 = setInterval(end,15);
      // 把创建的锤子添加到页面上
      oTemplate.append(oHammer);
      // 得分效果
      key++;
      // 本地存储经行判断
      if(key > localStorage.getItem('name')){
        localStorage.setItem('name',key)
      }
      // 获取本地存储为最高分数
      oHistory.innerHTML = localStorage.getItem('name')
      // 得分
      p2Span.innerHTML = key;
      // 结束得分
      oEndSpan.innerHTML = key;

    }
  }

  // 函数封装随机数
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
  // 老鼠动画开始
  time0 = setInterval(create,1200);
  // 时间倒计时结束
  function countdown(){
    p1Span.innerHTML--;
    if(p1Span.innerHTML <= 10){
      clearInterval(time0)
      time0 = setInterval(create,500);
    }
    // 如果定时器小于0就关闭该定时器
    if(p1Span.innerHTML <= 0){
      clearInterval(time7);
      clearInterval(time0);
      clearInterval(time1);
      clearInterval(time2);
      oEnd.style.display = 'block';
      // 背景变模糊
      oTop.style.filter = 'blur('+3+'px)';
      oBottom.style.filter = 'blur('+3+'px)'; 

      // 创建音频
      let audio = document.createElement('audio');
      // 音频路径
      audio.src ='./vudio/904b3a37-0628-412f-a294-5376b03ab06a.mp3';
      // 音频的播放
      audio.play();
    }
  }
  // 执行倒计时定时器
  time7 = setInterval(countdown,1000);
  // 开始点击事件
  oStart.onclick = function(){
    // 将盒子隐藏
    oEnd.style.display = 'none';
    // 将页面刷新
    location.reload();
  }
  // 获取本地存储数据
  oHistory.innerHTML = localStorage.getItem('name')
}