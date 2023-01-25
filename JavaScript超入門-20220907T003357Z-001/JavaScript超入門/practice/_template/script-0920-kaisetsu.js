'use strict';
/*
    form
        input(チェックイン日)
        input(泊数)
        input(チェックアウト日)
    /form
    のHTMLから操作する設計。
    チェックイン日と泊数からチェックアウト日を算出したい。
    なお滞在期間のデフォルト値は1と設定してます。
*/

/*
    １.基本素材定義＆画面読み込み時の処理
        ・チェックイン日(date_cin)
        ・泊数(kikan)を引数としてdate_cinからチェックアウト日を計算するファンクション(date_cout(kikan))
        を宣言。
        代入処理で使う位置のエレメントを取得。
        初期値で現在時刻に設定してdate_cinらをinputに代入
    ２.自動で反映されるギミック作り
        ・チェックイン日と泊数に変化が起きたら、ファンクション(formupdate)を実行します、という記述
        ・formupdateはこんな関数ですよ、という記述


*/
window.onload = function(){
    //１.基本素材定義&画面読み込み時の処理
     let date_cin = new Date();//date_cin(checkinの略)に今の日付を設定
    function date_cout(kikan=1){
        let day = new Date(date_cin);//date_cinをdayにコピー
        day.setDate(day.getDate()+kikan);//getDateで「コピーしたdayから日付データを取得」⇒「kikanを足す」⇒setDateで結果をdayに代入
        return day;//作ったdayを返す⇒これでdate_coutがチェックイン日+kikanした日付になる。
    }

    let day_start = document.getElementById('checkin_date');//input(チェックイン日)のエレメントを取得
    let day_end = document.getElementById('checkout_date');//input(チェックアウト日)のエレメントを取得
    //let rktn = document.getElementById('rktn_copy');//formエレメントを取得
    let kikan;//後で使うので空定義。
    dayset();//下で定義してるファンクション。date_cinとdate_coutをinputに代入するためのファンクション。
    let taizai = document.getElementById('rktn_tzkkn');
    /*---------------------------ここでひと段落～ページロード時の処理が完了--------------------------*/

    
    //２.
    day_start.addEventListener('change',formupdate);
    taizai.addEventListener('change',formupdate);
    /* ↑input(チェックイン日)＆宿泊日数(tzkkn)に変更が加わるたびに、ファンクションformupdate（下記↓）を実行する */

    function formupdate(event){
        event.preventDefault();
        kikan = Number(taizai.value);//泊数をkikanとして取得　
        date_cin = new Date(day_start.value);//inputに入力された日付をdate_cinに代入　※日付データっぽい形してるから、日付として受け取ってくれる
        dayset();//date_cinが更新された状態で、代入ファンクションを実行
    }


    //３.
/*　
    fatefix_i2o ⇒ "sozai"[仮引数]として渡された日付データから年月日を引っ張り出し、inputの要求するYYYY-MM-DD型に変換するファンクション
    dayset(下記)から呼び出す。
    padStart(n,"x")は文字列の先頭からn文字まで取り出します、足りなかったらxを入れて埋めます。という記述。
    getMonthで取り出したmonthやdateは数値データなので、
    ＄｛「String(Month)で文字列にしたやつ」に「padStart処理をして～」｝
    って書き方になってます。
    最終的に`(年)ハイフン（0埋めした月)ハイフン(0埋めした日)`という文字列を返すファンクションです。
*/
    function datefix_i2o(sozai){
        let year = sozai.getFullYear();
        let month = sozai.getMonth() +1;
        let date = sozai.getDate();
        return `${year}-${String(month).padStart(2,"0")}-${String(date).padStart(2,"0")}`;
    }
/*
    dayset ⇒ input(チェックイン日)のvalueは、日付データdate_cinをsozaiにdatefix_i2oをかけたものだよ；
            　input(チェックアウト日)のvalueは日付データ「kikanを代入したdate_coutファンクションの結果」をsozaiにdatefix_i2oをかけたものだよ；
*/
    function dayset(){
        day_start.value = datefix_i2o(date_cin);
        day_end.value = datefix_i2o(date_cout(kikan));
    }
}
