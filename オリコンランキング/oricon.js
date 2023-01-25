'use strict';
$(document).ready(function(){
    let rowcol;
    $.ajax({url: 'oricon_top10.txt',dataType:'text'})
    .done(function(data){
        rowcol = data.split(/\r\n|\r|\n/);
        for(let item of rowcol){
            let line = item.split(",");
            line = `<tr>
                    <td>${line[0]}</td>
                    <td>${line[1]}</td>
                    <td>${line[2]}</td>
                    <td>${line[3]}</td>
                    <td>${line[4]}</td>
                    </tr>`
                    $('.list').append(line);
        }
    })
    .fail(function(){
        window.alert('読み込みエラー');
    })
})