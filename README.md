# wikipedia-viewer

A simple search shell by making use of AJAX to fetch data from MediaWiki API, inspired by <a href = "https://www.freecodecamp.cn/challenges/build-a-wikipedia-viewer" target="_blank">Task on FreeCodeCamp</a>.<br>

Main Functions/Features:
1. Listening to "oninput" and "onclick" events of search box, once keyword changes detected or search box are clicked, a responsive window will appear just below the search box showing a list of relative searches, which are fetched and handled from mediaWiki server by using $.ajax() method;

2. After selecting a keyword or phrase, click the "Search" button or hit the "Enter" key, you will find the demo changes from main page to the results page, with search box hovering on the top, total relative searches found and time spent, below which comes the main part, listing 10 relevant result pannels, in each pannel, there would be keyword phrase(with clickable link to wiki), short description, page info and link to contribution of phrase editing, etc.

3. By default there are only 10 results shown after the searching process, under the 10th result pannel, there would be two optional buttons, "AUTO LOADING(when the page approaches the bottom each time)" or "CLICK TO LOAD MORE(the next 10 results)".

4. Loading animations were also added to the demo so that users can get warm notifications or tips when fetching data from wiki server and the loading process is in progress.

5. The demo has been applied with CSS media query and even jQuery $().css() method to achieve responsive designs in most platforms and different size of screens, which have been simulated and tested in Chrome developer tools.

6. Considering the special restrictions to wikipedia by GFW in China mainland, a link to downloadable VPN tool (Shadowsocks with valid account I bought myself) was added to the demo, you may find the link at the top-right corner of the main page, the confirm window after ajax failed or in the loading animation tips ...

This Demo is very simple since it's one of my practicing projects when learning Front-end Developments from scratch, it can be viewed @ <a href = "https://www.mike652638.com/demo/wiki.html" target="_blank">My Website Demo Page</a><br>.
Any issues or bugs report are always welcome, meaningful commits will be much appreciated :)
