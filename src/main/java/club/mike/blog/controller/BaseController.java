package club.mike.blog.controller;

import club.mike.blog.common.vo.SysResult;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

public abstract class BaseController {
    @ExceptionHandler(Exception.class)
    @ResponseBody
    public SysResult handleException(Exception e) {
            return new SysResult(500, "服务器没有响应", null);
    }

}
