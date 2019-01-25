package club.mike.blog.mapper;

import club.mike.blog.common.vo.Comment;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.springframework.stereotype.Repository;

@Repository
//springboot项目需要在启动类上写出mapperscan，否则提示需要创建Bean--CommentMapper
public interface CommentMapper extends BaseMapper<Comment> {
    void test();
}
