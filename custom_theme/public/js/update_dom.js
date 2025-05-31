$(function() {
    $('header div.container').addClass("custom-navbar").removeClass("container");
    $('.custom-navbar').prepend('<span class="nav-menu-icon"> <i class="fa-solid fa-bars"></i> </span>');

    $('.page-body').removeClass("container");
    $('.sidebar-child-item.nested-container.hidden').removeClass("hidden");
    $('.row.layout-main').removeClass("row");
    const pageHeaderTitle = $('.page-head').detach();
    $('.layout-main-section-wrapper').prepend(pageHeaderTitle);
    updateMenu();

    $('#custom-menu-tab').on("click", function () {
        $(this).attr("aria-selected", "true");
        $('#custom-shortcuts-tab').attr("aria-selected", "false").removeClass("active");
        $('#custom-menu-tab').addClass("active");
        $('#custom-menu-content').addClass("show active");
        $('#custom-menu-shortcuts').removeClass("show active");
    });
    $('#custom-shortcuts-tab').on("click", function () {
        $(this).attr("aria-selected", "true");
        $('#custom-menu-tab').attr("aria-selected", "false").removeClass("active");
        $('#custom-shortcuts-tab').addClass("active");
        $('#custom-menu-content').removeClass("show active");
        $('#custom-menu-shortcuts').addClass("show active");
    });

});

function updateMenu() {
    const mainMenu = $('.col-lg-2.layout-side-section');
    mainMenu
        .removeClass("col-lg-2")
        .append(`
<div id="custom-module-menu">
    <h4 class="menu-title"></h4>
    <div class="menu-content">
    </div>
</div>
`);
}
