package club.mike.blog.controller;

import club.mike.blog.common.util.Utils;
import club.mike.blog.common.vo.Comment;
import club.mike.blog.common.vo.SysResult;
import club.mike.blog.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.swing.*;
import java.util.List;

@RestController
@RequestMapping("/comment")
public class CommentController {
    @Autowired
    CommentService commentService;
    @RequestMapping("/post")
    //
    public SysResult postComment(Comment comment){
        try {
            System.out.println(comment);
            commentService.addComment(comment);
        return SysResult.oK();
        }catch (Exception e){
            e.printStackTrace();
        }
        return new SysResult();
    }


    /**
     *
     *
     * 没有返回正确的类型，应加responsebody
     * Whitelabel Error Page
     *
     * This application has no explicit mapping for /error, so you are seeing this as a fallback.
     *
     * Fri Jan 25 13:52:30 CST 2019
     * There was an unexpected error (type=Not Found, status=404).
     * No message available
     */

    /**
     * 这是对非springboot项目而言
     *      * * No converter found for return value of type
     *      没有注解驱动
     *      *      * .原因：这是因为springmvc默认是没有对象转换成json的转换器的，需要手动添加jackson依赖。
     */
    /**
     * boot项目应添加@JsonIgnoreProperties(ignoreUnknown=true)注解在实体类上
     * 但还有可能是实体类没有写get、set方法
     */
    @RequestMapping("/show")
    public SysResult showComments(){
        try {
            System.out.println("show");
            List<Comment> lists=commentService.showComments();
            SysResult sysResult=new SysResult(200, "OK", lists);
            System.out.println(sysResult);
            return sysResult;
        }catch (Exception e){
            e.printStackTrace();
        }
        return SysResult.build(201, "wrong");
    }



@RequestMapping("/visitor")
public SysResult showVisitors(){
        try {
            System.out.println("visitor");
            //不要使用tomcat相关的，因为不能再分布式项目中统计
            final String count = Utils.getJedisValue("count");
            SysResult sysResult=new SysResult(200, "OK",count);
            System.out.println(sysResult);
            return sysResult;
        }catch (Exception e){
            e.printStackTrace();
        }
        return SysResult.build(201, "wrong");
    }

}
