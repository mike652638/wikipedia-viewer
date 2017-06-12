var keyword,
    results,
    resultsSum = null,
    resultNum = 0,
    timeStart,
    timeEnd,
    timeSpent;

var isAutoLoad = "no",
    hasExed = "no",
    lastScrollHeight,
    lastScrollTop = 0;

var isSrchBtnPressed = "no";

function getWiki() {
    //url: "https://zh.wikipedia.org/w/api.php?action=query&list=search&srsearch=hello&prop=info&inprop=url&utf8=&format=json",
    //url: "https://zh.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + keyword + "&prop=info&inprop=url&utf8=&format=json",
    $.ajax({
        url: "https://zh.wikipedia.org//w/api.php",
        data: {
            action: "query",
            list: "search",
            format: "json",
            srsearch: keyword,
            sroffset: resultNum
        },
        dataType: "jsonp",
        success: function(responseData) {
            //console.log(JSON.stringify(responseData));
            results = responseData.query.search;
            resultsSum = responseData.query.searchinfo.totalhits;
            timeEnd = Date.parse(new Date());
            timeSpent = ((timeEnd - timeStart) / 1000).toFixed(1);
            if (results.length === 0) {
                showError(keyword);
            } else {
                /*两种情况下需要对返回结果做处理, 一种是搜索框输入时的关键词联想, 只需要提取相关条目的标题即可;
                另一种是点击了搜索按钮或按了回车键, 需要提取返回结果的全部信息, 用以展示在结果页*/
                if (isSrchBtnPressed === "yes") {
                    //如果是第一次加载结果页面, 则在结果页头部显示搜索到的结果总数和花费时间
                    if (resultNum === 0) {
                        sumResult(resultsSum, timeSpent);
                    }
                    //console.log(responseData.query.search[1].snippet);
                    for (var i in results) {
                        showResults(results[i].title, results[i].snippet, results[i].size, results[i].wordcount, results[i].timestamp, resultNum, i);
                        //console.trace("results[i] = " + results[i]);
                    }
                    isSrchBtnPressed = "no";
                } else {
                    for (var k = 0, n = Math.min(5, results.length); k < n; k++) {
                        showRelative(results[k].title, k);
                    }
                }
            }

            //console.log(responseData.continue);
            if (responseData.continue) {
                //console.log("Can be continued");
                resultNum = responseData.continue.sroffset;
            } else {
                $("#loadMore").html("已经到底啦");
            }
        },
        error: function() {
            showConfirm();
        }
    });
    //console.log("getWiki Done!");
}

//维基百科API返回的JSON数据是Unicode编码的, 需要先解码再提取数据
//编码解码方式参考http://blog.csdn.net/java2009cgh/article/details/11214081
function decode(unicodeStr) {
    return unescape(unicodeStr.replace(/\\(u[0-9a-fA-F]{4})/gm, '%$1'));
}
//console.log(decode("\u767e\u5ea6\u5168\u5bb6\u6876")); 解码为"百度全家桶"

function showError(keyword) {
    $("#resultList").html("抱歉, 未能匹配你搜索的词条<span style='color:#E74C3C; font-weight: bold'>" + keyword + "</span>;<br><br>你可尝试搜索其他关键词, 或者向我们反馈 ...");
}

function showConfirm() {
    var msg = confirm('抱歉, 无法从维基百科服务器获取信息, 您可能被墙了, 点击下方"确定"按钮可下载翻墙工具"科学上网"...');
    if (msg === true) {
        window.open('http://pan.baidu.com/s/1c28FK9U', 'newwindow');
    }
}

function sumResult(resultsSum, timeSpent) {
    if (resultsSum) {
        $("#resultList").append("<div class='resultsSum' id='resultsSum'>搜索到相关短语<span>" + resultsSum + "</span>条, 本次搜索花费时长<span>" + timeSpent + "</span>秒</div>");
    }
}

function showRelative(title, index) {
    if (title) {
        var titleLink = 'https://zh.wikipedia.org/wiki/' + encodeURI(title);
        //$("#rel" + index).html("<a class='titleLink' target = '_blank' href=" + titleLink + ">" + title + "</a>");
        $("#rel" + index).html(title);
    }
    $("#srchRelative").css("display", "block");
}

function showResults(title, desc, size, words, edit, page, index) {
    if (index) {
        //console.trace("index = " + index);
        //var resultId = 'resultSec' + index;
        $("#resultList").append("<div class='resultSec' id=" + 'resultSec' + page + index + "></div>");
    }

    //加if(title){}是为了搜索结果页避免出现undefined
    if (title) {
        var titleLink = 'https://zh.wikipedia.org/wiki/' + encodeURI(title);
        var editLink = 'https://zh.wikipedia.org/w/index.php?title=' + title + '&action=edit';
        $("#resultSec" + page + index).append("<a class='titleLink' target = '_blank' href=" + titleLink + "><b>" + ((resultNum / 10 + "" + (index - 0)) - 0 + 1) + '. ' + title + "</b></a><br>");
        $("#resultSec" + page + index).append("<div class='desc'>" + desc + "<a target = '_blank' href=" + titleLink + "> >> </a></div>");
        $("#resultSec" + page + index).append("<div class='edit'>页面大小: " + size / 1000 + "K, 字符总数: " + words + "<br>最后编辑时间: " + edit.replace(/T/, " ").replace(/Z/, " ") + "<br><a target='_blank' href=" + editLink + ">参与编辑" + "</a></div><br>");
        $("#loaderWrap").css("display", "none");
        $("#loaderNote").css("display", "none");
        $(".loadMore").css("display", "block"); //结果加载完成后, 最下方显示"搜索更多按钮"
    }
    $(".main").css("display", "none");
    $(".resultPage").css("display", "block");
}

$(document).ready(function() {
    //页面右上角源码提示条隐藏按钮
    $(".srcClose").click(function() {
        /*因为关闭按钮在a元素内, 点击关闭按钮的同时默认会先触发链接跳转再隐藏a链接,
        下面这种方法先让a元素href清空阻止跳转再将其隐藏*/
        $(this).parent().attr("href", "JavaScript:void(0)");
        $(this).parent().css("display", "none");
    });
    //主页面输入框搜索联想功能
    function getRelative(event) {
        var curIpt = $(this),
            iptVal = $($(this)).val(),
            iptChar = iptVal.charCodeAt(0);
        //js oninput监听中文输入时存在bug, 候选字状态也会触发
        //console.log(iptVal.length !== 1);
        //console.log($.trim(iptVal).length !== 0);
        //console.trace("$($(this)).val().charCodeAt(0) = " + iptVal.charCodeAt(0));
        // if (iptVal.length !== 1 && $.trim(iptVal).length !== 0) { 存在BUG:输入框只有一个汉字或字母时无法联想
        if (iptChar !== 32 && !isNaN(iptChar)) { //排除输入中文时候选词还没进输入框就不断触发js oninput事件
            //通过js判断当前点击的是哪个窗口, 从而将联想词汇的结果层移到它下面
            if ($(this)[0].id === "srchIpt") {
                //console.log("yes");
                //console.log(parseInt($(this).offset().left));
                $("#srchRelative").css({
                    "width": parseInt(curIpt.css("width")),
                    "top": parseInt(curIpt.offset().top) + 20,
                    "left": parseInt(curIpt.offset().left)
                });
            } else {
                //console.log("no");
                //console.log(parseInt(curIpt.css("width")) + 63);
                $("#srchRelative").css({
                    "width": parseInt(curIpt.css("width")) + 63,
                    "top": parseInt(curIpt.offset().top) + 14,
                    "left": parseInt(curIpt.offset().left)
                });
            }
            keyword = $("#srchIpt").val();
            timeStart = Date.parse(new Date());
            resultsSum = null;
            resultNum = 0;
            getWiki();
            //将选中的词条赋值进输入框
            $("#srchRelative li").click(function() {
                curIpt.val($(this).html());
                $("#srchRelative").css("display", "none");
            });
        }
    }
    $("#srchIpt")[0].oninput = getRelative;
    $("#srchIpt")[0].onclick = getRelative;
    $("#kywdIpt")[0].oninput = getRelative;
    $("#kywdIpt")[0].onclick = getRelative;

    /*$("#srchIpt")[0].onclick = function() {
        var iptVal = $("#srchIpt").val();
        //console.log(iptVal.length !== 1);
        //console.log($.trim(iptVal).length !== 0);
        if (iptVal.length !== 1 && $.trim(iptVal).length !== 0) {
            keyword = $("#srchIpt").val();
            getWiki();
        }
    };*/

    //在页面除了联想词li元素本身外的其他任意地方点击, 联想结果隐藏
    $("body").click(function() {
        if ($(this)[0].className !== "rel") {
            $("#srchRelative").css("display", "none");
        }
    });

    /*注意:之前用的下面这种方法, 跟上面的
    $("#srchRelative li").click(function() {
        curIpt.val($(this).html());
    });
    互相冲突, 导致联想的词条点击后无法进入输入框, 因为点击自身被隐藏了无法捕捉到*/
    /*$("#kywdIpt").blur(function() {
        //console.log("change");
        $("#srchRelative").css("display", "none");
    });*/

    $("#iptSrchBtn").click(function() {
        keyword = $("#srchIpt").val();
        $("#kywdIpt").val(keyword);
        isSrchBtnPressed = "yes";
        timeStart = Date.parse(new Date());
        resultNum = 0;
        if (keyword.length !== 0) {
            //appendLoader($("#rdmSrchBtn"));
            getWiki();
            appendLoader($("#iptPannel"));
        } else {
            alert("请输入搜索关键词...");
        }
    });

    $("#kywdBtn").click(function() {
        isSrchBtnPressed = "yes";
        if (keyword.length !== 0) {
            //如果在搜索结果页面换了其他搜索词, 再点击搜索按钮时, 需要先清除原搜索结果列表及重置一些状态
            if ($("#kywdIpt").val() !== keyword) {
                keyword = $("#kywdIpt").val();
            }
            timeStart = Date.parse(new Date());
            resultsSum = null;
            resultNum = 0;
            $(".loadMore").css("display", "none");
            $("#resultList").html("");
            $("#autoLoad").html("<span style='color: #000'>开启自动加载</span>");
            isAutoLoad = "no";
            hasExed = "no";
            appendLoader($("#iptPannel"));
            getWiki();
        } else {
            alert("请输入搜索关键词...");
        }
    });

    $(document).keypress(function(event) {
        var isMainPage = $(".main").css("display");
        if (event.keyCode === 13) {
            //alert("回车键");
            //console.log($(".main").css("display"));
            isSrchBtnPressed = "yes";
            timeStart = Date.parse(new Date());
            resultsSum = null;
            resultNum = 0;
            /**存在一个BUG: 主页搜索框输入文字会开启联想功能, 回车键同样会触发oninput事件, 需要隐藏词条联想框**/
            $("#srchRelative").css("display", "none");
            if (isMainPage === "block") {
                keyword = $("#srchIpt").val();
                $("#kywdIpt").val(keyword);
            } else {
                //如果在搜索结果页面换了其他搜索词, 再点击搜索按钮时, 需要先清除原搜索结果列表及重置一些状态
                if ($("#kywdIpt").val() !== keyword) {
                    keyword = $("#kywdIpt").val();
                }
                $(".loadMore").css("display", "none");
                $("#resultList").html("");
                $("#autoLoad").html("<span style='color: #000'>开启自动加载</span>");
                isAutoLoad = "no";
                hasExed = "no";
            }
            if (keyword.length !== 0) {
                appendLoader($("#iptPannel"));
                getWiki();

            } else {
                alert("请输入搜索关键词...");
            }
        }
    });

    function appendLoader(ele) {
        $("#loaderWrap").css("display", "block");
        $("#loaderNote").css("display", "block");
        $("#loaderWrap").insertAfter(ele);
        $("#loaderNote").insertAfter(ele);
    }

    function prependLoader(ele) {
        $("#loaderWrap").css("display", "block");
        $("#loaderWrap").insertBefore(ele);
    }

    $("#loadMore").click(function() {
        isSrchBtnPressed = "yes";
        prependLoader($("#autoLoad"));
        getWiki();
    });

    $("#autoLoad").click(function() {
        isSrchBtnPressed = "yes";
        if (isAutoLoad === "no") {
            $("#autoLoad").html("<span style='color: #FE0000'>自动加载功能已开启</span>");
            isAutoLoad = "yes";
            prependLoader($("#autoLoad"));
            getWiki();
            /*setTimeout(function() {
                $("#autoLoad").css("display", "none");
            }, 1000);*/
        } else {
            $("#autoLoad").html("<span style='color: #000'>开启自动加载</span>");
            isAutoLoad = "no";
        }
    });

    //"自动加载更多"功能开启时, 每当页面滚动至距离底部200px即自动加载更多搜索结果
    //参考http://www.jb51.net/article/42744.htm
    $(window).scroll(function(event) {
        var windowHeight = $(this).height(),
            scrollTop = $(this).scrollTop(),
            scrollHeight = $(document).height();

        /**检测到页面滑动时词条联想框应该隐藏掉, 因为它是绝对定位的, 会出现在页面半中央位置, 碍眼睛**/
        $("#srchRelative").css("display", "none");

        if (isAutoLoad === "yes" && scrollHeight - scrollTop - windowHeight <= 200) {
            if (hasExed === "no") {
                //console.log("The scroll is now less than 200px above the bottom");
                isSrchBtnPressed = "yes";
                prependLoader($("#autoLoad"));
                getWiki();

                hasExed = "yes";
                lastScrollHeight = scrollHeight;
            }
        }
        if (lastScrollHeight && scrollTop + windowHeight - lastScrollHeight >= 1000) {
            hasExed = "no";
        }

        //顺便监听页面滚动, 顶部搜索框在下滑时隐藏, 上滑时出现,
        //参考https://stackoverflow.com/questions/4326845/how-can-i-determine-the-direction-of-a-jquery-scroll-event
        if (scrollTop > lastScrollTop) {
            //console.log("页面下滑");
            $("#iptPannel").css("display", "none");
            $("#resultList").css("marginTop", "30px");
        } else {
            //console.log("页面上滑");
            $("#iptPannel").css("display", "block");
            $("#resultList").css("marginTop", "100px");
        }
        lastScrollTop = scrollTop;
    });
});
