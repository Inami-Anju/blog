package club.mike.blog.controller;

import club.mike.blog.common.vo.SysResult;
import club.mike.blog.service.CommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
@RequestMapping("/common")
public class CommonController {
    @Autowired
    CommonService commonService;
    @RequestMapping("/post")
    public SysResult postCommon(){
        try {

        return new SysResult();
        }catch (Exception e){
            e.printStackTrace();
        }
        return new SysResult();
    }
}
