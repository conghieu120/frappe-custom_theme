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
    $('.col-lg-2.layout-side-section')
        .removeClass("col-lg-2")
        .append(`
<div id="custom-module-menu">
    <h4 class="menu-title"></h4>
    <div class="menu-content">
        <ul class="nav nav-tabs" id="menuTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="custom-menu-tab" data-bs-toggle="tab" data-bs-target="#custom-menu-content" type="button" role="tab" aria-controls="custom-menu-content" aria-selected="true">Menu</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="custom-shortcuts-tab" data-bs-toggle="tab" data-bs-target="#custom-menu-shortcuts" type="button" role="tab" aria-controls="custom-menu-shortcuts" aria-selected="false">Shortcuts</button>
        </li>
        </ul>
        <div class="tab-content" id="menuTabContent">
            <div class="tab-pane fade show active" id="custom-menu-content" role="tabpanel" aria-labelledby="custom-menu-tab">menuuuuus</div>
            <div class="tab-pane fade" id="custom-menu-shortcuts" role="tabpanel" aria-labelledby="custom-shortcuts-tab">Shotcuts</div>
        </div>
    </div>
</div>
`);
}
