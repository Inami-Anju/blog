package club.mike.blog.common.util;

import redis.clients.jedis.Jedis;

public class Utils {
    public static void setJedisValue(String key,String value){
        Jedis jedis=new Jedis("106.13.53.108", 7000);
        jedis.set(key, value);
        jedis.close();
    }
    public static String getJedisValue(String key){
        Jedis jedis=new Jedis("106.13.53.108", 7000);
        String s = jedis.get(key);
        if (s==null){
            jedis.set(key, 0+"");
            s = jedis.get(key);
        }
        System.out.println(s);
        jedis.close();
        return s;
    }

}
