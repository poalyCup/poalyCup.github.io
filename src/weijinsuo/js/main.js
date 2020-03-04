/**
 * Created by Administrator on 2019/1/5.
 */
$(function () {


    function resize(){
        /* 获取屏幕宽度  */
        var pageWidth = $(window).width();
        /* 遍历每一个item   */
        $('#main_ad>.carousel-inner > .item').each(function (index, item) {
            var $item = $(item);
            /*  把DOM对象转成jq对象  */

            /* 屏幕宽度小于768  改变背景图  */
            /*  根据窗口大小获取对应的图片路劲  */
            var imgSrc = pageWidth < 768 ? $item.data('img-sm') : $item.data('img-lg');
            $item.css("backgroundImage", "url('" + imgSrc + "')");
            /**/

            if (pageWidth < 768) {
                $item.html("<img src='" + imgSrc + "'>")
            } else {
                $item.html("");
            }
        })
    }

    /*  当屏幕大小变化时，调用函数  */
    $(window).on('resize',resize).trigger('resize');

    // 提示框效果
    $('[data-toggle="tooltip"]').tooltip();
});