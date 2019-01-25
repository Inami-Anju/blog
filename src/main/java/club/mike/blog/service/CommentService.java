package club.mike.blog.service;

import club.mike.blog.common.vo.Comment;

import java.util.List;

public interface CommentService {
    void addComment(Comment comment);
    List<Comment> showComments();
}
