/**
 * 图片预加载:用闭包模拟局部作用域
 */
(function ($) {
    function PreLoad(imgs, options) {
        this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
        this.opts = $.extend({}, PreLoad.DEFAULTS, options);//合并
        this._unordered();//加下划线表面只在内部使用，不在外部调用

    }

    PreLoad.DEFAULTS = {
        each: null,//每一张图片加载完毕后执行
        all: null//所有图片加载完毕后执行
    };
    PreLoad.prototype._unordered = function () {//无序加载
        var imgs = this.imgs,
            opts = this.opts,
            count = 0,
            len = imgs.length;
        $.each(imgs, function (i, src) {
            if (typeof src != 'string') return;//如果src不是字符串后面不执行
            /*
             * 创建一个Image对象：var imgObj=new Image();
             * 定义Image对象的src: imgObj.src="xxx.jpg';
             * 这样做就相当于给浏览器缓存了一张图片。
             * */
            var imgObj = new Image();
            $(imgObj).on('load error', function () {
                // $progress.html(Math.round((count + 1) / len * 100) + '%');
                opts.each && opts.each(count);//如果opts.each存在则执行opts.each()
                if (count >= len - 1) {
                    opts.all && opts.all();
                }
                count++;
            });
            imgObj.src = src;
        });
    };
     $.extend({
        preload:function (imgs, opts) {
            new PreLoad(imgs,opts);
        }
     })
})(jQuery);