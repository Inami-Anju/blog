package club.mike.blog.common.util;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

/**
 * 爬虫功能，获得热点
 */
public class Creepy {
//https://www.cnblogs.com/zhangyinhua/p/8037599.html
    void getTencent(){
        Document document = Jsoup.parse("https://www.qq.com/?pgv_ref=qqbrowserpc");
         Elements links = document.select("li[bosszone]");

    }
}
