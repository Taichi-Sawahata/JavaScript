'use strict';
//windowを開いたと同時に処理を行う
let list = document.getElementById('list');
let text = document.getElementById('text');

const task = function (e){
    //要素を追加する機能
    const add= document.createElement('li');
  if(e.key === 'Enter'){
    const show =  list.appendChild(add);
   show.textContent = text.value;
   text.value = '';
  }

   //要素に削除ボタンを付与する
   //削除ボタンクリックイベント機能と実行処理
    add.addEventListener('click',function(){
        list.removeChild(add);
        });
}

//追加ボタンクリックイベント
text.addEventListener('keydown',task,false);