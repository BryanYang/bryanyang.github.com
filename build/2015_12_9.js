var lines=['# 第一篇这篇博客','## 关于这篇博客的诞生','-------','2015年12月，才接触到React, 其实老早以前就看到相关的帖子，自己也曾去过React的首页去看官方文档。当时关于js 写 native APP 的帖子我都会点进去瞅瞅，React Native也是当时看到的，觉得很了不起，但是仔细想了之后，又发现存在一个问题，如果像我这样对Android一无所知的前端程序员，即使真的用官方Demo 运行起了 Android程序，如果程序异常，如何排查？哪怕最简单的错误。如果是对Android有过了解，写过原生App的程序来讲，同时兼具JS的功底，那么React应该确实是个不错的选择，毕竟人家脸谱网的程序都是全栈工程师。身兼多种学问。。','','后来项目说是要用React JS。没办法，只好看看，跟很多新人一样吧，带着Angular的经验去看React. 都会皱起眉头，这TM啥玩意儿啊。`JSX`?! ,什么鬼又是？为啥简单的前端现在变得好复杂？？','','俗话说，*将欲摧之，必先附之* 先学学它，再诋毁它~~~','','## 那么what\'s React?','* React 是用来渲染View的。跟angular没有可比性，二者是不同的东西。不同职责。','* 渲染View,没啥大不了，但是 React 通过 一个 内存Dom 来渲染，渲染前，先diff. 最小化渲染量','* 将html与js组合在一起，整个组件更具封闭性。All is component! 整个页面就是不同组件组合在一起'];
React.render(React.createElement(Article, {author: "yanggaofei", lines: lines}),document.getElementById("article"));