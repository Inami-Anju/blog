package club.mike.blog.controller;

import club.mike.blog.common.vo.Comment;
import club.mike.blog.common.vo.SysResult;
import club.mike.blog.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
@RequestMapping("/common")
public class CommentController {
    @Autowired
    CommentService commentService;
    @RequestMapping("/post")
    public SysResult postCommon(Comment comment){
        try {
            commentService.addComment(comment);
        return new SysResult();
        }catch (Exception e){
            e.printStackTrace();
        }
        return new SysResult();
    }
}
