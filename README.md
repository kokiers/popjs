
# Toast

默认type:toast; 自动关闭弹窗。

type 为其他，需要手动关闭文字弹窗，可以传入回调函数。
```
var toastDemo = new Toast({text:'我的天啊啊好好 什么正文，中讲啦你开心吗哈哈哈哈哈'});
	toastDemo.create
```	

# Confirm

cover 为true 有弹窗遮罩背景。
关闭弹窗，可以传入回调函数。
```
var confDemo = new Confirm({content:'我的天啊啊好好 么正文，中讲啦你开心吗哈哈哈哈哈',title:'中奖通知',cancel:'放弃',sub:'领奖'});
	confDemo.create();
```





