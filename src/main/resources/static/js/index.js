$(document).ready(function () {
    showComment();
    showVisitors();
    showTitles();
    connect();
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
            console.log("json.status="+json.status);
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
/*--------显示访问人数------------------------------------------------------------------------------------------------------------------*/
function showVisitors() {

    var url = "../visitor";
    $.ajax({
        "url": url,
        "type": "post",
        "dataType": "json",
        /*"processData": false,*/
        "success": function (json) {
            if (json.status == 200) {
                var visitors = json.data;
                new Vue({
                    el: '#app',
                    data: {
                        message: '',
                        count: visitors
                    }
                })
            } else if (json.status == 402) {
                alert("修改失败！" + json.message);
            } else {
                alert("莫名其妙！！！");
            }
        },
        "error": function (xhr, textStatus, errorThrown) {
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
/*--------显示爬虫热点信息------------------------------------------------------------------------------------------------------------------*/
    function showTitles() {
        var url = "../creepy";
        $.ajax({
            "url": url,
            "type": "post",
            "dataType": "json",
            /*"processData": false,*/
            "success": function (json) {
                if (json.status == 200) {
                    var hot = json.data;
                    console.log(hot);
                    $("#hot").empty();
                    var html = "";
                    for (var i = 0; i < hot.length; i++) {
                        var element = hot[i];
                        var temp = "<p>" + element + "</p>";
                        html = html + temp;
                    }
                    $("#hot").append(html);
                } else if (json.status == 402) {
                    alert("修改失败！" + json.message);
                } else {
                    alert("莫名其妙！！！");
                }
            },
            "error": function (xhr, textStatus, errorThrown) {
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
/*--------维护长连接------------------------------------------------------------------------------------------------------------------*/
function   connect() {
    var url = "../longPolling";
    $.ajax({
        "url": url,
        "type": "post",
        "dataType": "json",
        /*"processData": false,*/
        "success": function (json) {
            if (json.status == 200) {
                var html = json.data;
                console.log(html);
                $("#longPolling").append("完成了一个厂连接，扫描成功");
                //  /*connect();这里仅是跳转，没有会话功能 ，所以先不用递归
                //  注意注释的风格，注意加载的是缓存，导致修改没有生效
                //  */
                window.location.href=html;
            }else {
                alert("莫名其妙！！！");
            }
        },
        "error": function (xhr, textStatus, errorThrown) {
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
/*--------获得instagram------------------------------------------------------------------------------------------------------------------*/
$.ajax({
    type: "GET",
    dataType: "jsonp",
    cache: false,
    url: "https://api.instagram.com/v1/users/banksy/media/recent/?access_token=2253563781.137bf98.bd1c3693d2b84f80a7ab8d661f641437",
    success: function(response) {
        console.log('jfsdahuifhasudh')
        console.log(response);
        // placing the images on the page
        // for (var i = 0; i < 6; i++) {

        var html = '<a href="' + response.data[i].link + '" >'+
            '<img src="' + response.data[i].images.low_resolution.url + '" alt="thumbnail" /></a>';
        $("#instafeed").html(html);

        // }
    },

    error: function(data) {
        console.log('We have a problem!');
    }
});