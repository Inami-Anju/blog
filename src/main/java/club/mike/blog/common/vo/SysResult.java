package club.mike.blog.common.vo;

import java.io.Serializable;

/**
 * 最重要的两个原因是：
 * 　　1、将对象的状态保存在存储媒体中以便可以在以后重新创建出完全相同的副本；
 * 　　2、按值将对象从一个应用程序域发送至另一个应用程序域。
 *
 * 　　实现serializable接口的作用是就是可以把对象存到字节流，然后可以恢复。所以你想如果你的对象没实现序列化怎么才能进行网络传输呢，要网络传输就得转为字节流，所以在分布式应用中，你就得实现序列化，如果你不需要分布式应用，那就没那个必要实现序列化。
 * ---------------------
 * 作者：wanan1001
 * 来源：CSDN
 * 原文：https://blog.csdn.net/weixin_42254857/article/details/80509810
 * 版权声明：本文为博主原创文章，转载请附上博文链接！
 */
public class SysResult implements Serializable {

}
