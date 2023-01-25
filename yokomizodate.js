'use strict';
window.onload=function(){
    //滞在期間を取得(input type='number')
    let stay= document.getElementById('stay');
    //numberが変化したとき、関数updateを実行
    stay.addEventListener('change',update);
    //updateの中身
    function update(){
        //チェックイン日を取得
        let checkin = document.getElementById('checkin').value;
        //チェックイン日をsplitメソッドでそれぞれを-で要素に分け、配列に格納
        let array = checkin.split('-');
        //splitで配列の要素にしたものを、基準日に設定。それぞれを整数に変換。
        //チェックイン日に取得した月に関しては、0~11で数えるため-1しなければならない
        let next_day = new Date(
            Number(array[0]),
            Number(array[1]-1),
            Number(array[2])
        );
        //上記で設定した基準日(Dateオブジェクトで取得したもの)をgetDateで取得すると経過ミリ時間に変わる
        //setDateは引数(getDateで取得したもの+input numberで取得した値を足したもの)で取得した値に
        //Dateオブジェクトが入った変数next_dayを変更することができる
     let date = next_day.setDate(next_day.getDate()+Number(stay.value));
     console.log(date);
     //経過ミリ時間をYY-mm-ddの形に戻すにはもう一度Dateオブジェクトのインスタンスを生成し、引数に経過ミリ時間をとる
     let now = new Date(date);
     //変数nowの年月日を取得する、このときgetMonthはプラス1をしなければならない
     let day = now.getDate();
     let year = now.getFullYear();
     let month = now.getMonth()+1;
     //1桁だった場合、0をつける
     if(month<10){
        month = '0'+month;
     }

     if(day<10){
        day = '0'+day;
     }
     //変数にYY-mm-ddを代入して、チェックアウトに表示
     let lastday = year + '-' + month + '-' + day;
     document.getElementById('checkout').value = lastday;

    }
    //日付に関してはYY-mm-dd形式で読み込み,DOM操作で表示される際にYY/mm/ddの形式になる
}
