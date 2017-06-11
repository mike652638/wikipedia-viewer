# WIKIPEDIA-VIEWER

A simple search shell by making use of AJAX to fetch data from MediaWiki API, inspired by <a href = "https://www.freecodecamp.cn/challenges/build-a-wikipedia-viewer" target="_blank">Task on FreeCodeCamp</a>.<br>

Main Functions/Features:
1. Listening to "oninput" and "onclick" events of search box, once keyword changes detected or search box are clicked, a responsive window will appear just below the search box showing a list of relative searches, which are fetched and handled from mediaWiki server by using $.ajax() method;

2. After selecting a keyword or phrase, click the "Search" button or hit the "Enter" key, you will find the demo changes from main page to the results page, with search box hovering on the top, index indicating total relative searches found and time spent, below which comes the main part, listing 10 relevant result pannels, in each pannel, there would be keyword phrase(with clickable link to wiki), short description, page info and link to contribution of phrase editing, etc.

3. By default there are only 10 results shown after the searching process, under the 10th result pannel, there would be two optional buttons, "AUTO LOADING(when the page approaches the bottom each time)" or "CLICK TO LOAD MORE(the next 10 results)".

4. Loading animations were also added to the demo so that users can get warm notifications or tips when fetching data from wiki server and the loading process is in progress.

5. The demo has been applied with CSS media query and even jQuery $().css() method to achieve responsive designs in most platforms and different size of screens, which have been simulated and tested in Chrome developer tools.

6. Considering the special restrictions to wikipedia by GFW in China mainland, a link to downloadable VPN tool (Shadowsocks with valid account I bought myself) was added to the demo, you may find the link at the top-right corner of the main page, the confirm window after ajax failed or in the loading animation tips ...

This Demo is very simple since it's one of my practicing projects when learning Front-end Developments from scratch, it can be viewed @ <a target="_blank" href = "https://www.mike652638.com/demo/wiki.html">My Website Demo Page-Wiki</a><br>.
Any issues or bugs report are always welcome, helpful commits will be much appreciated :)

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

<h2>维基词条索引</h2>

这个小页面是本人基于<a href = "https://www.freecodecamp.cn/challenges/build-a-wikipedia-viewer" target="_blank">FreeCodeCamp上的实践项目</a>完成的, 主要运用AJAX从维基百科开放的服务器接口获取数据信息实现关键词匹配和网页布局。<br>

主要功能/特色:

1. 监听搜索输入框的"oninput"和"onclick"事件, 一旦检测到搜索框中关键词变化或者点击了搜索框, 搜索框中的值将会被传递给ajax query并触发$.ajax()方法, 从mediaWiki的服务器请求与搜索词相关的词条, 数据返回后提取并展示在搜索框下方.
(注: 监听oninput事件时会遇到一个小BUG: 百度输入法输入中文时, 汉字还未输入到搜索框而处于打拼音候选词状态时会不断触发oninput, 我在这里的解决方案是通过if($($(this)).val().charCodeAt(0))!== 32 && !isNaN($($(this)).val().charCodeAt(0)))){...} 排除这种特殊情况, 如果你有更好的解决方案, 可以跟我分享哦 :)

2. 选定输入词后, 点击"搜索"按钮或按"回车键", 可以进入搜索结果页(搜索框悬停至页面顶部, 下滑页面时自动隐藏), 成功返回搜索结果后显示搜索到的相关词条总数及总耗时, 紧随其后的是页面的主要部分, 展示搜索到的相关词条版块(其中包括可点击跳转的词条名称, 词条简述, 页面信息及"参与编辑"的跳转链接);

3. 默认情况下每次搜索返回10个相关词条, 页面最下方有"开启自动加载"(开启后每当页面滑动到距离底部200像素时即触发$.ajax()方法,加载后10个相关条目)和"(手动)加载更多"功能;

4. 考虑到ajax请求和返回数据需要花费一定的时间, 页面中加入了"正在加载, 请稍候..."的提示信息和进度条动画, ajax返回成功后(success回调)进度条自动隐藏并替换为返回的结果页;

5. 这个小页面运用了CSS的媒体查询及jQuery的$().css()方法, 尽可能做到对不同平台不同尺寸屏幕的兼容(已在Chrome浏览器的开发者模式中模拟测试); 

6. 考虑到中国大陆特殊的网络限制, 本页面用到的维基接口可能无法顺利调用, 因此我在页面(主页右上角, ajax返回超时的确认框以及加载提示信息中)置入了科学上网工具下载链接(内含SS和个人购买的有效账号);

这个小页面是我自学前端时实践的一个小项目, 实现起来并不难, 您可以进入<a target="_blank" href = "https://www.mike652638.com/demo/wiki.html">我的网站DEMO展示页-维基词条</a>查看在线效果, 随时欢迎您提出任何问题, 建议或反馈 :) <br>

<a target="_blank" href = "https://www.mike652638.com/demo/wiki.html"><img src="https://www.mike652638.com/demo/wiki/screenshots/wikiScrSht-pc.jpg" alt="wikipedia-viewer-screenshot" /></a>
