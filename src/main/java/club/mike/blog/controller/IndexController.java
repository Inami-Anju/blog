package club.mike.blog.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/")
public class IndexController {
    @RequestMapping("/")
    public ModelAndView showIndex(){
        return new ModelAndView("index.html");//视图名需写全
    }

}
