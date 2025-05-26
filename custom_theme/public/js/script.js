$(function () {
    $('.sidebar-toggle-btn').off('click');
    $(".layout-side-section").removeClass("col-lg-2");
    $(".layout-main-section-wrapper").removeClass("col");

    $('.sidebar-toggle-btn').on('click', function () {
        const $sideSection = $('.layout-side-section');
        if ($sideSection.hasClass('collapsed')) {
            $sideSection.removeClass('collapsed').animate({ 'margin-left': '0px' }, 250);
        } else {
            $sideSection.addClass('collapsed').animate({ 'margin-left': '-220px' }, 250);
        }
    })
});
