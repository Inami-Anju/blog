package club.mike.blog;

import org.junit.Test;
import org.junit.runner.RunWith;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import redis.clients.jedis.Jedis;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BlogApplicationTests {

    @Test
    public void contextLoads() {
        //106.13.53.108 7000
        Jedis jedis=new Jedis("106.13.53.108", 7000);
        jedis.set("name", "tony");	//调用redis命令set
        String s = jedis.get("name");
        System.out.println(s);
        jedis.close();
    }

}

