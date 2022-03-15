window.onload = function(){
  let oCenter = document.querySelector('#tenters');
  window.onmousedown = function(){
    window.location.href="index.html";
  }
  console.log(oCenter);
  let oCenterT = oCenter.offsetTop;

  let time1,time2;
  function end (){
    oCenterT -= 1;
    if(oCenterT <= -22){
      clearInterval(time1)
      time2 = setInterval(str,20)
    }
    oCenter.style.top = oCenterT + 'px';
  }

  function str(){
    oCenterT+=1;
    if(oCenterT > 45){
      clearInterval(time2)
      time1 = setInterval(end,20)
    }
    oCenter.style.top = oCenterT + 'px';
  }
  time1 = setInterval(end,20)
  
}