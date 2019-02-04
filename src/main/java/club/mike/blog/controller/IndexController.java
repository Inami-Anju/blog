package club.mike.blog.controller;

import club.mike.blog.common.util.Creepy;
import club.mike.blog.common.util.Utils;
import club.mike.blog.common.vo.SysResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
@RequestMapping("/")
public class IndexController {
    @Autowired
    Creepy creepy;
    @RequestMapping("/")
    public ModelAndView showIndex(){
        final String count = Utils.getJedisValue("count");
        final int i = Integer.parseInt(count);
        Utils.setJedisValue("count",i+1+"");
        return new ModelAndView("index.html");//视图名需写全
    }

    @RequestMapping("/visitor")
    @ResponseBody
    public SysResult visitor(){
        final String count = Utils.getJedisValue("count");
        return new SysResult(count);
    }

    @RequestMapping("/creepy")
    @ResponseBody
    public SysResult creepy(){
        final List<String> tencent = creepy.getTencent();
        return SysResult.oK(tencent);
    }
}
