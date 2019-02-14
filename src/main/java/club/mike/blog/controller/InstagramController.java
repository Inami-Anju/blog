package club.mike.blog.controller;

import club.mike.blog.common.util.Creepy;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
@RequestMapping("/instagram")
public class InstagramController extends BaseController {

    @Autowired
    Creepy creepy;
    @RequestMapping("/i")
    public void showInsIndex(HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println("进入showInsIndex");
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
        Document ins = creepy.getIns();
        //试试存个redis进去，太笨了，还是生成html存在本地
        //https://blog.csdn.net/yinbucheng/article/details/72809009
        response.getWriter().println(ins);

    }
}
