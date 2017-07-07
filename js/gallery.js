var data = [{
    img: '1.JPG',
    caption: '那么多的美好时光',
    desc: '还是很庆幸<br>学生时候咬牙买了这相机<br>后来无数的美好瞬间<br>都有了时光的见证<br>凝固成记忆里不褪色的美丽'
}, {
    img: '2.JPG',
    caption: '多多，最好的礼物',
    desc: '领证是个计划外的举措<br>没有鲜花钻戒和晚宴烛光下的承诺<br>你问我想要什么来纪念这一刻<br>于是我们有了多多<br>从此有了暴跳如雷，大笑出声<br>和一份深深的的牵挂'
}, {
    img: '3.JPG',
    caption: '两两相望',
    desc: '两两相望，<br>多么诗意的场合，<br>或者执手相看泪眼，<br>或者看那眼底藏不住的暖和温柔，<br>为毛到了我们这里，<br>却成了看谁绷不住先笑出声的较量?'
}, {
    img: '4.JPG',
    caption: '啊，虐了一把狗',
    desc: '你在亲吻我手背,<br>我们都忽略了,<br>多多在一旁的回眸,<br>看它那小背影隐约透出几分寂寥，<br>啊，不经意间，<br>我们活生生演绎了一把，<br>什么叫做虐狗'
}, {
    img: '5.JPG',
    caption: '当我披上嫁衣',
    desc: '最是那一回头的温柔'
}, {
    img: '6.JPG',
    caption: '这张磊少好文艺',
    desc: '最是那一回头的温柔'
}, {
    img: '7.JPG',
    caption: '春光莫辜负',
    desc: '最是那一回头的温柔'
}, {
    img: '8.JPG',
    caption: '细嗅那一抹香',
    desc: '最是那一回头的温柔'
}, {
    img: '9.JPG',
    caption: '说好不分离',
    desc: '最是那一回头的温柔'
}, {
    img: '10.JPG',
    caption: '磊少和我',
    desc: '最是那一回头的温柔'
}, {
    img: '11.JPG',
    caption: '磊少和我',
    desc: '最是那一回头的温柔'
}, {
    img: '12.JPG',
    caption: '磊少和我',
    desc: '最是那一回头的温柔'
}, {
    img: '13.JPG',
    caption: '磊少和我',
    desc: '最是那一回头的温柔'
}, {
    img: '14.JPG',
    caption: '磊少和我',
    desc: '最是那一回头的温柔'
}, {
    img: '15.JPG',
    caption: '磊少和我',
    desc: '最是那一回头的温柔'
}, {
    img: '16.JPG',
    caption: '磊少和我',
    desc: '最是那一回头的温柔'
}];
var $gallery = $('#gallery');
//产生min与max之间的随机数
function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}
//获取画廊区域的位置和坐标
function measureGallery() {
    var result = { left: {}, right: {} };
    var galleryWidth = $gallery.outerWidth();
    var galleryHeight = $gallery.outerHeight();
    var photoWidth = $('.photo').outerWidth();
    var photoHeight = $('.photo').outerHeight();
    result.left.x = [-photoWidth / 2, galleryWidth / 2 - photoWidth];
    result.right.x = [galleryWidth / 2, galleryWidth - photoWidth / 2];
    result.left.y = result.right.y = [-photoHeight / 2, galleryHeight - photoHeight / 2];
    return result;
}

//加载所有的图片元素
function renderPhoto() {
    var template = $gallery.html();
    var html = [];
    var regExp = /\{\{(\w+)\}\}/g;
    for (var index = 0; index < data.length; index++) {
        var curStr = template.replace(regExp, function(all, str1) {
            var val = data[index][str1];
            if (str1 === 'index') {
                val = index;
            } else if (val.indexOf('JPG') >= 0) {
                val = './images/2017/' + val;
            }
            return val;

        })
        html.push(curStr);
    }
    $gallery.html(html.join(''));

}
//随机分布图片的位置
//centerIndex为中间图片的索引
function layoutPhotos(centerIndex) {
    var range = measureGallery();
    var $photos = $('.photo');
    for (var index = 0, len = $photos.length; index < len; index++) {
        var $curPhoto = $photos.eq(index);
        $curPhoto.removeClass('photo-center photo-front photo-back');
        if (index !== centerIndex) {
            //随机分配在左边或者右边
            var direct = Math.random() <= 0.5 ? 'left' : 'right';
            var x = randomRange(range[direct]['x'][0], range[direct]['x'][1]);
            var y = randomRange(range[direct]['y'][0], range[direct]['y'][1]);
            var deg = randomRange(-120, 120);
            var zIndex = Math.ceil(randomRange(1, 10));
            $curPhoto.css({ 'left': x + 'px', 'top': y + 'px', 'transform': 'rotate(' + deg + 'deg)', 'z-index': zIndex });
        } else {
            $curPhoto.removeAttr('style');
            $curPhoto.addClass('photo-center');
        }
    }

}
var timeId;

function autoPlay() {
    timeId = setInterval(function() {
        centerIndex = randomRange(0, data.length - 1) | 0;
        layoutPhotos(centerIndex);
    }, 4000);
}

function stopPlay() {
    if (timeId) {
        clearInterval(timeId);
    }
}

function initEvent() {
    $gallery.on('mouseover', function() {
        stopPlay();
    });
    $gallery.on('mouseout', function() {
        autoPlay();
    });

    $gallery.on('click', '.photo', function(e) {
        var index = parseInt($(e.target).parents('.photo').attr('index'));
        if (index !== centerIndex) {
            layoutPhotos(index);
            centerIndex = index;
        } else {
            $('.photo-center').toggleClass('photo-front').toggleClass('photo-back');
        }
    });

}

renderPhoto();
var centerIndex = randomRange(0, data.length - 1) | 0;
layoutPhotos(centerIndex);
initEvent();
autoPlay();
