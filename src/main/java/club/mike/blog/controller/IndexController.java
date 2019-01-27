package club.mike.blog.controller;

import club.mike.blog.common.util.Utils;
import club.mike.blog.common.vo.SysResult;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/")
public class IndexController {
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


}
