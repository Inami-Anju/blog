package club.mike.blog.common.util;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.junit.Test;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

/**
 * 爬虫功能，获得热点
 */
@Component
public class Creepy {
//https://www.cnblogs.com/zhangyinhua/p/8037599.html
//https://www.yiibai.com/jsoup/jsoup-quick-start.html
    public List<String> getTencent(){
        Document document = null;
        List<String> list=new ArrayList();
        try {
            //注意别用parse方法
            document = Jsoup.connect("https://www.qq.com/?pgv_ref=qqbrowserpc").get();
        } catch (IOException e) {
            e.printStackTrace();
        }
        //System.out.println(document);
        Elements links = document.select("li[bosszone~=jrht_*]");
        //links = links.select("bosszone~=jrht_4");
        for (Element element:links){
            //好麻烦啊，第一个信息只有1个A标签，所以要用last方法
            //System.out.println(element.select("a").last().text());
            String s=element.select("a").last().text();
            list.add(s);
        }

        return list;
    }

    /**获得ins的首页*/
    public Document getIns() throws IOException {
        Document document = null;
        URL url=new URL("https://www.veryins.com/");
        HttpURLConnection connection = (HttpURLConnection)url.openConnection();
        connection.setRequestProperty("User-Agent", "Mozilla/4.0 (compatible; MSIE 5.0; Windows NT; DigExt)");
        document = Jsoup.parse(connection.getInputStream(), "UTF-8", "https://www.veryins.com/");
        return document;
    }
}
