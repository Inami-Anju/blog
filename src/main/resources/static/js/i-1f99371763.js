$(function () {
    $("#list").bootstrapGallery({caption: !0}), $("#loadMore").click(function (a) {
        var s = $("#list").attr("next-cursor");
        $("#loadMore").html('<div class="dropload-load"><span class="loading"></span>加载中...</div>'), $.ajax({
            type: "post", url: s, success: function (a) {
                var s = a.top_posts;
                for (var d in s) {
                    var i = s[d], t = i.thumbnail_src, c = i.display_src, l = i.caption ? i.caption : "",
                        o = $('<div class="col-xs-12 col-sm-6  col-md-4"></div>'), e = $(' <div class="item"></div>'),
                        n = $('<div class="img-wrap" data-src="' + c + '" data-code="' + i.code + '"><img class="thumb"   srcset="' + i.srcset + '" src="' + t + '" alt="' + l + '"></div> ');
                    i.is_video ? e.append('<img src="/images/videocam.png" class="videocam"></div>') : "GraphSidecar" == i.__typename && e.append('<img src="/images/sidecar.png" class="sidecar"></div>');
                    var p = $('<div class="item-body"></div>');
                    p.append(' <div class="caption ">' + l + "</div>"), p.append('  <div class="likes"> <div> <span class="h6">' + i.likes + '</span> likes</div> <span class="text-muted">' + i.date + "</span></div>"), e.append(n), e.append(p), o.append(e), $("#list").append(o), a.next ? ($("#list").attr("next-cursor", a.next), $("#loadMore").html('<button class="btn  btn-default btn-block btn-next" >加载更多</button>')) : $("#loadMore").html('<div class="dropload-down"><div class="dropload-noData">E N D</div></div>')
                }
            }, complete: function (a) {
                $("#list").bootstrapGallery({caption: !0})
            }
        })
    })
});