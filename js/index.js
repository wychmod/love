/**
 * @Author: St. <SuperMoo>
 * @Date:   2016-01-27-17.14
 *          2016-02-13-08.36
 *          2016-02-14-21.06
 * @Email:  st_sister@me.com
 * @Filename: app.js
* @Last modified by:   SuperMoo
* @Last modified time: 2017-02-06-15:30:07
 * @License: MIT
 */

$(() => {
    const defaultText = {
        from: '阿木',
        to: '-阿紫～',
        wish: '情人节快乐！'
    };

    const hashHandler = () => {
        let href = window.location.href;
        href = decodeURI(href);
        console.log(href);
        let array = [];
        if (href.indexOf('?') !== 0) {
            array = href.split('?');
            array = array[1].split(',')
        }

        console.log(array);

        let from = array[0] || defaultText.from;
        let to = array[1] || defaultText.to;
        let wish = array[2] || defaultText.wish;

        return {
            from: from,
            to: to,
            wish: wish,
        };
    };

    const d = new Date();
    const year = d.getFullYear();

    var dom = [{
        name: 'section5',
        text: `
        <div class="sectionIn">
            <p>
                献给<span id="hashTo"></span>, <br>
                <span id="hashWish"></span><br>
                来自<span id="hashFrom"></span><br>
                ${year}-02-14
            </p>
            <img src="img/qrcode.gif" width="220" height="220" class="qrcode" /> 扫码或微信长按二维码分享 <br>
            <div class="license">
                ／后面还有哦／
            </div>
        </div>
        `
    }, {
        name: 'section5',
        text: `
        <div class="sectionIn">
            <div class="btn2">
                <a href="do.html">
                我也想制作一个</a>
                </div>
            </div>
            <div class="btn">
                <a href="https://github.com/superwoods">
                访问超级木木的Github首页</a>
            </div>
            <div class="license">
                <a href="https://github.com/superwoods">
                本页面由 / 超级木木 / 木Studio 设计制作,
                我们使用MIT开源协议, 欢迎转载分享,
                但请您务必保留我们的署名, 感谢！</a>
            </div>
        </div>
        `
    }];

    // section5 & section6 添加dom
    $('#section5')[0].innerHTML = dom[0].text;
    $('#section6')[0].innerHTML = dom[1].text;

    const text = hashHandler();

    console.log(text);

    $('#hashTo').text(text.to);
    $('#hashWish').text(text.wish);
    $('#hashFrom').text(text.from);
    $('#title').text(text.to + text.wish);
    // $('title').append($('#hashTo').text() + '--来自' + $('#hashFrom').text());

    // 添加 jplayer 播放控件 dom
    $('body').append('<div id="jquery_jplayer_1" class="jp-jplayer"></div>' +
        '<div id="jp_container_1" class="jp-audio" role="application" aria-label="media player">' +
        '<button class="jp-play iconPlay" role="button" tabindex="0">play</button>' +
        '</div>');
    // 初始化 jPlayer
    $("#jquery_jplayer_1").jPlayer({
        ready: function(event) {
            $(this).jPlayer("setMedia", {
                mp3: 'media/Shayne-Ward-Until-You.mp3'
            });
            // 设置自动播放，iOS safari 受安全限制无效，wechat可以自动播放
            $(this).jPlayer("repeat");
            // $(this).jPlayer("play").jPlayer("repeat");
        },
        //swfPath: "js",
        supplied: "mp3",
        wmode: "window",
        useStateClassSkin: true,
        autoBlur: false,
        smoothPlayBar: true,
        keyEnabled: true,
        remainingDuration: true,
        toggleDuration: true,
        volume: 1
    });
});

// 当页面加载完毕时开始动画。
window.onload = function() {
    ani.init();
    updateSliderControl();
    addSmoothScrolling();
};

// 使用 onscroll 回调函数来更新 slider
window.onscroll = function() {
    updateSliderControl();
}

var ani = {
    init: function() {
        this.logo("#hvd");
        this.logo("#ani1");
        this.logo("#ani2");
        this.logo("#ani3");
    },
    logo: function(tag) {
        TweenMax.fromTo(tag, 2, {
            // from
            css: {
                y: 0,
            }
        }, {
            // to
            css: {
                y: "30px",
            },
            // 永久重复动画的选项
            repeat: -1,
            // 反转、重新运行动画的选项
            yoyo: true,
            // 改变 easing 类型
            ease: Sine.easeInOut
        });
    } //,
};

function updateSliderControl() {
    // 获得所有的 slider 链接
    var links = document.querySelectorAll("#slider-control a");
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        //console.log(link);
        var attr = link.getAttribute('href');
        // 获取被链接指向的部分
        var section = document.querySelector(attr);
        var sectionTop = section.offsetTop;
        var sectionBottom = sectionTop + window.innerHeight; //  section.offsetHeight
        // 检查 window.scrollY 是否在这部分中
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            //console.log(attr);
            link.className = "active";
            //event.preventDefault();
            //location.hash = attr;
            //console.log(link);
        } else {
            link.className = "";
        }
    }
}

// 网页滚动动画
function scrollToElement(element) {
    //声明变量topOfElement = element.offsetTop
    var topOfElement = element.offsetTop;
    // window 的动画滚动，使用TweenMax plugins
    TweenMax.to(window, 1, {
        scrollTo: {
            y: topOfElement,
        },
        ease: Sine.easeInOut
    });
}

function addSmoothScrolling() {
    var links = document.querySelectorAll("#slider-control a");
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        //if (typeof window.addEventListener === 'function'){
        // 闭包
        (function(_link) {
            //console.log('_link: ' + _link);
            //console.log(link);
            link.addEventListener('click', function(event) {
                /*
                  这里禁用了鼠标的点击事件, 会导致hash无法更新，
                  也就是说hash就没有作用了
                  动画是否可以考虑换一种逻辑方式，
                  利用hash的方式去执行窗体混动的动画呢？？？
                */
                event.preventDefault();
                var attr = _link.getAttribute('href');
                //console.log('href: ' + _link);
                scrollToElement(document.querySelector(attr));
                //location.hash = attr;
            });
        })(link);
    }
}
