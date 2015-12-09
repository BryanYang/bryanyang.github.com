var lines = [
'# 这是h1',
'## 这是h2',
'----',
"So far we've `built` an app that renders correctly as a function of props and state flowing down the hierarchy. Now it's time to support data flowing the other way: the form components deep in the hierarchy need to update the state in FilterableProductTable",
"**React** makes this data flow explicit to make it easy to understand how your program works, but it does require a little more typing than traditional two-way data binding. React provides an add-on called ReactLink to make this pattern as convenient as two-way binding, but for the purpose of this post we'll keep everything explicit.",
'> ksdjf kj dsl klsdjfk jdksj klksdjkf',
'> 使用单一的一组 *.col-md-* 栅格类，`<p>就可以创建</p>`一个基本`<h>的栅格系</h>`统，在手机和平板设备上一开始是堆叠在一起的（超小屏幕到小屏幕这一范围），在桌面（中等）屏幕设备上变为水平排列。所有“列（column）必须放在 .row 内',

'```function(){\n\t var s = "112";\n}```',
'* Lorem ipsum dolor sit amet [This link](http://example.net/)',
'* Integer molestie lorem at massa',
'* Nulla volutpat aliquam velit',
'![img](build/img/xx.gif)'

];

React.render(
    React.createElement(Article, {author: "yanggaofei", lines: lines}),
    document.getElementById('article')
);

