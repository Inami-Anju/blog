package club.mike.blog.service;

import club.mike.blog.common.vo.Comment;
import club.mike.blog.mapper.CommentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    CommentMapper commentMapper;
    @Override
    public void addComment(Comment comment) {
        commentMapper.insert(comment );
    }
}
