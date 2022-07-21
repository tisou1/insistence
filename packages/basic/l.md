## js基础

### API
应用程序接口（Application Programming Interfaces（API））

- 浏览器API
- 第三方API


### 代码执行
- 解释代码  
  代码自上而下执行,且实时返回其结果.代码执行前不需要转化为求他形式
- 编译代码
  需要先将代码转化(编译)成另一种形式才能执行.比如c先编译成汇编语言,才能由计算机运行.

**javascript是轻量级的解释型语言**  
浏览器接收js代码后,以代码自身的文本格式运行它,但是会在运行的过程中将js代码编译成二进制格式,使得运行更快.js仍算一门解释型语言.

### js引入
- 内敛(写在标签上)
- script标签引入(外部)
  `<script src='index.js' async></script>`  
  async的作用是: 告知浏览器在遇到`<script>`时不要中断后续`HTML`内容的加载.
- 内部(js写在script标签之中)
  内部调用时`async`属性就没用了,旧方法是将`script`放在文档的底端(</body>标签之前,与之相邻)

### script标签上的defer和async属性
- ![实例](./assets/async%26defer.png "async和defer")

- 都是异步加载js
- 差别是js脚本下载完成后的执行时机,defer的执行更接近我们的要求(和放在`</body`)之前js代码执行差不多)
- defer会确定外部的执行顺序与写的顺序一致.async却不能保证
- async会在`load`事件之前执行,可能在`DOMContentLoaded`之前或者之后执行defer会在所有文档解析后,触发`DOMContentLoaded`前执行.(如果需要操作DOM就慎用async/defer)或者将`DOM`操作放在`DOMContentLoaded`中执行.


### load和DOMContentLoaded
- DOMContentLoaded —— 浏览器已完全加载 HTML，并构建了 DOM 树，但像 <img> 和样式表之类的外部资源可能尚未加载完成。
- load —— 浏览器不仅加载完成了 HTML，还加载完成了所有外部资源：图片，样式等。