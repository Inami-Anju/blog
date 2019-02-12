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
import java.util.concurrent.CountDownLatch;

@Controller
@RequestMapping("/")
public class IndexController {
    @Autowired
    Creepy creepy;
    int a = 0;
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
    @RequestMapping("/longPolling")
    @ResponseBody
    public SysResult longPolling() throws InterruptedException {
       // while (true){
            //由于是单例模线程问题严重，所以应用在redis里
      //      if(a!=0)break;
      //  }
        CountDownLatch countDownLatch=new CountDownLatch(1);
        countDownLatch.await();
        System.out.println("break le ");
        return new SysResult("http://www.baidu.com");
    }
    @RequestMapping("/commit")
    @ResponseBody
    public SysResult commit(){

        return new SysResult();
    }


}
