$(document).ready(function () {
    showComment();
});

/*--点击提交事件------------------------------------------------------------------------------------------------------------------------*/
$('#po').click(function(){
    var url = "../comment/post";
    var _comment =$("#inputcommon").val();
    var _uid=3;
    var data={comment:_comment,uid:_uid};
    $.ajax({
        "url": url,
        "data": data,
        "type": "post",
        "dataType": "json",
        "contentType": "application/x-www-form-urlencoded; charset=utf-8",
        /*"processData": false,*/
        "success": function(json) {
            alert(json.status);
            if (json.status == 200) {
                alert("添加成功！"+json.data);
               showComment();
            } else if (json.status == 402) {
                alert("修改失败！" + json.message);
            }else {
                alert("莫名其妙！！！");
            }
        }
    });
});
/*--------显示评论------------------------------------------------------------------------------------------------------------------*/
function showComment() {
/*Resource interpreted as Document but transferred with MIME type application/json*/
    var url = "../comment/show";
    $.ajax({
        "url": url,
        "type": "post",
        "dataType": "json",
        /*"processData": false,*/
        "success": function(json) {
            alert("json.status="+json.status);
            if (json.status == 200) {
                var data=json.data;
                $("#comment").empty();
                var html="";
                for (var i = 0; i < data.length; i++) {
                    var element = data[i];
                    var name=element.uid;
                    var com=element.comment;
                    var time=element.createTime;
                    var temp="<p>"+name+"</p>"
                    +"<p>"+com+"&nbsp;&nbsp;&nbsp;"+time+"</p><hr>";
                    html=html+temp;
                }
                
                 $("#comment").append(html);
            } else if (json.status == 402) {
                alert("修改失败！" + json.message);
            }else {
                alert("莫名其妙！！！");
            }
        },
        "error": function(xhr, textStatus, errorThrown) {
            // xhr：XMLHttpRequest类型的对象
            // - responseText：响应的文本
            // - readyState：状态，值为0~4
            // - status：响应码
            console.log("状态码：" + xhr.readyState);
            console.log("响应码：" + xhr.status);
            console.log("响应文本：" + xhr.responseText);
            console.log("textStatus=" + textStatus);
            console.log("errorThrown=" + errorThrown);
        }
    });

   
}
