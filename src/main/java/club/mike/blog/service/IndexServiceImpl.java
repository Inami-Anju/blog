package club.mike.blog.service;

import club.mike.blog.common.util.HttpClientService;
import club.mike.blog.common.vo.SysResult;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IndexServiceImpl implements IndexService {
    @Autowired
    private HttpClientService httpClient;
    @Autowired
    private ObjectMapper      objectMapper;
    @Override
    public String findArticle() {
        String url ="http://news-at.zhihu.com/api/2/news/latest";
        String sysJSON = httpClient.doGet(url);
        System.out.println(sysJSON);
        return sysJSON;

    }
}
