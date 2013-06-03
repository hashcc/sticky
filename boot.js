$(function(){
  stick("h1");
});

function stick(target){
  props = getHeadingsPosition(target);
  // 最初の要素を吸着
  $(target).eq(0).addClass("fixed");
  $("body").css("paddingTop", $(target).eq(0).outerHeight()+"px");
  
  // 表示中のセクションに属する見出しを吸着処理
  $(window).scroll(function (){
    var current = $(window).scrollTop();
    for (var i=0; i<(getLength(props["offset"])-1); i++){
      // 各見出しの吸着開始、退歩位置、吸着終了位置
      var positions = {
        "start": props["offset"][i],
        "crush": props["offset"][i+1] - props["height"][i],
        "end": props["offset"][i+1]
      };
      
      //console.log(current);
      //console.log(positions);
      
      if (current > positions["start"] && current < positions["crush"]){
        // 上端が次の見出しを完全に超えた時
        $(target).eq(i).addClass("fixed");
        $(target).eq(i).css("top", "0px");
      } else if (current > positions["crush"] && current < positions["end"]){
        // 上端が見出しを超えてはいないけど、吸着された前の見出しがかぶっていて邪魔なのでどきますよ…
        var crushed_height = positions["crush"] - current; // かぶってる領域
        $(target).eq(i).addClass("fixed");
        $(target).eq(i).css("top", crushed_height+"px");
      } else{
        // 超えてない
        $(target).eq(i).removeClass("fixed");
      }
    }
  });
}

function getHeadingsPosition(elm){
  var props = {"offset": {}, "height": {}};
  var elements = $(elm);
  // 各見出し要素の位置を算定
  for (var i=0; i<elements.length; i++){
    props["height"][i] = elements.eq(i).outerHeight();
    props["offset"][i] = elements.eq(i).offset().top;
    if (i+1 == elements.length) props["offset"][(i+1)] = $(document).outerHeight();
  }
  props["offset"][0] = -1;
  return props;
}

function getLength(array) {
  var num = 0;
  for (var i in array){
    num++;
  }
  return num;
}
