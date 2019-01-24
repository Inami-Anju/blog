$('#po').click(function(){
    var url = "../user/handle_change_info.do";
    var data =$("#inputcommon").val();
    alert(data);
    $.ajax({
        "url": url,
        "data": data,
        "type": "get",
        "dataType": "json",
        "contentType": false,
        "processData": false,
        "success": function(json) {
            if (json.state == 200) {
                alert("修改成功！"+json.data);
                if(json.data!=null){
                    $("#icon").attr("src","../"+json.data);
                }
            } else if (json.state == 402) {
                alert("修改失败！" + json.message);
            } else if (json.state == 408) {
                alert("上传头像失败！" + json.message);
            } else if (json.state == 502) {
                alert("严重错误！" + json.message);
            } else {
                alert("莫名其妙！！！");
            }
        }
    });
});
/*--------------------------------------------------------------------------------------------------------------------------*/