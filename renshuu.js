'use strict';
//空の配列用意
const a = [];

/*変数ボタンに指定されたセレクタの全ての要素を配列として返す
forEachの反復処理によって、
配列それぞれの要素に対して一度ずつ関数を実行することが出来きる
押したボタンのvalueを取得し,handleEventにより以下のファンクションを実行*/

const button = document.querySelectorAll('#btnid').forEach(function(button){
  button.addEventListener('click',{value:`${button.value}`,handleEvent: roll});
})
  


function roll(){
  //console.log(`${this.value}`);
  //空の配列に押したボタンのvalueを入れていく
  a.push(parseInt(`${this.value}`));
  //iに1を足し変数に代入、ループ処理がされるごとにscoreの値を増やしていく
  //score数に配列i番目の値を代入
    for(let i=0;i<a.length;i++){
    let sco = i + 1;
    let s = document.getElementById('score'+ sco);
    s.innerHTML = a[i];

    //2で割った余りが0なら、frameに現在のscoを足し、変数に代入
    //その変数にふたつの一つ前の配列の要素と現在の配列の要素
    //を足した合計を入れる
    //21フレームのため、その余りが0の場合、0の値の変数を用意
    let j = document.getElementById('frame'+sco);
     
    //最終フレーム　breakすることにより、下のif文が読み込まれないの
    //scoreの点数がそれぞれボタンで入力された点数になる、最終フレームはストライク、スペアの加算が無いため都合が良い
    if(sco % 21 === 0){
      sco-=1;
      j=document.getElementById('frame'+sco);
      j.innerHTML = a[i] + a[i-1] + a[i-2];
      if(a[i] === 10){
        s.innerHTML = 'X';
      }
        break;
      }
  

    //ガーター
    if(a[i]===0){
      s.innerHTML = 'G';
    } 
   
     //各フレームの2球目で決まってくる点数加算など
    if(sco % 2 ===0){ 
        j.innerHTML= (a[i-1]) + (a[i]);
    if(a[i-1] + a[i] === 10){
      s.innerHTML = '/';
      j.innerHTML = '/';
    }
     if(a[i-1]===10  && a[i] === 0){    
      s.innerHTML = 'X';
      j= document.getElementById('frame'+ sco);
      j.innerHTML = 'X';
     }
     if(a[i-3]===10 ){
      sco-=2;
      j= document.getElementById('frame'+ sco);
      j.innerHTML = a[i-1]+a[i]+10;
     }
     if(a[i-1]===10 && a[i]===10){
      s.innerHTML = 'X';
     }
     if(sco % 20 === 0 && a[i-1]+a[i]<10){
      sum();
      break;
    }
    //各フレーム1球目で決まってくる点数加算
  }else{
    if(a[i-2]<10 && a[i-2] + a[i-1] === 10){
      sco=sco-1;
      j= document.getElementById('frame'+ sco);
      j.innerHTML = a[i]+10;
    }
       //ストライク
 if(a[i] === 10){
    s.innerHTML = 'X';
  }//ターキーとった場合　2フレーム前のフレーム合計に20プラス
  if(a[i-4] === 10 && a[i-2]=== 10){
       sco-=3;
       j= document.getElementById('frame'+ sco);
       j.innerHTML = a[i]+20;
  } 
  if(a[19] === 10 && a[20] === 10 && a[21] === 10){
    j.innerHTML = 30;
  }

}

  
}
} 
 //合計スコアを出すボタンを用意、クリックしたらsumを実行
  let goukei = document.getElementById('goukei');
  goukei.addEventListener('click',sum);
 
 
 function sum(){
    // tdのクラスgoukeiを取得、複数の要素のため配列で取得しているので、それぞれのインデックス番号とvalueを取得
   let list = $("td[class=goukei]").map(function(index, val){
    //整数に直したvalueをテキストとして出す
     let kazu = parseInt($(val).text());
     //kazuが0より大きければ、値を返す
      if(kazu >= 0) {
        return kazu;
      } else {
        return null;
      }
    });
    //変数0を定義
    //配列それぞれのインデックス番号とvalueを取得してtotalに代入していく、それを合計として表示
    list.each(function(index, val){
       total = total + val;
       })
       $("#frame20").text(total)};



    
    //handleEvent function引数　 each val text map $[] return