'use strict';
function minus(){
    let money = document.getElementById('money').value;
    let hiyou = document.getElementById('hiyou').value;
    money = money-hiyou;
    document.getElementById('propo').value = money;
}

//Math.floor(Math.ceil(money))