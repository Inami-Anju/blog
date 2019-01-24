package club.mike.blog.common.vo;


import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.util.Date;

@TableName
public class Comment {
    @TableId
    private Long id;
    private Long uid;
    private String comment;
    private Date createTime;
}
