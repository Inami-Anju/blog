package club.mike.blog.service;

import club.mike.blog.common.vo.Comment;
import club.mike.blog.mapper.CommentMapper;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    CommentMapper commentMapper;
    @Override
    public void addComment(Comment comment) {
        comment.setCreateTime(new Date());
        commentMapper.insert(comment );
    }

    @Override
    public List<Comment> showComments() {
        Wrapper<Comment>wrapper=new QueryWrapper<>();
        ((QueryWrapper<Comment>) wrapper).orderByDesc("create_time");
        return commentMapper.selectList(wrapper);
    }
}
