$(async function () {
    const route = frappe.get_route();
    let currentModule = route[1];
    const moduleMenuData = await getModuleContent(currentModule)
    console.log("Current route:", currentModule);
    console.log("moduleMenuData:", moduleMenuData);
    updateCustomMenu(currentModule, moduleMenuData)
    frappe.router.on("change", async () => {
        const route = frappe.get_route();
        currentModule = route[1];
        const moduleMenuData = await getModuleContent(currentModule)
        console.log("Chuyển đến:", currentModule);
        console.log("moduleMenuData:", moduleMenuData);
        updateCustomMenu(currentModule, moduleMenuData)
    });
})

function getModuleContent(module) {
    return new Promise(res => {
        frappe.call({
            method: "frappe.desk.desktop.get_desktop_page",
            args: {
                page: {
                    name: module
                }
            },
            callback: function(r) {
                res(r.message)
            }
        });
    });
}

function updateCustomMenu(moduleName='', moduleData) {
    $('#custom-module-menu .menu-title').text(moduleName);
    if (moduleData.cards?.items && moduleData.shortcuts?.items) {
        renderWorkspaceUI(moduleData);
    }
}

function renderWorkspaceUI(data) {
    const $container = $('#custom-module-menu .menu-content');
    $container.empty();

    // Tabs HTML
    const tabsHTML = `
        <ul class="nav nav-tabs" id="workspaceTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="menu-tab" data-bs-toggle="tab" data-bs-target="#menu" type="button" role="tab">Menu</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="shortcuts-tab" data-bs-toggle="tab" data-bs-target="#shortcuts" type="button" role="tab">Shortcuts</button>
            </li>
        </ul>
        <div class="tab-content mt-3" id="workspaceTabContent">
            <div class="tab-pane fade show active" id="menu" role="tabpanel"></div>
            <div class="tab-pane fade" id="shortcuts" role="tabpanel"></div>
        </div>
    `;

    $container.append(tabsHTML);

    $('#custom-module-menu #workspaceTab .nav-link').on('click', function() {
        $('#custom-module-menu #workspaceTab .nav-link.active').removeClass('active');
        $('#custom-module-menu #workspaceTabContent .tab-pane').removeClass('show active');
        $(this).addClass('active');
        const contentId = $(this).attr('data-bs-target');
        $(contentId).addClass('show active');
    })

    // Render Menu with Accordions
    const $menuPane = $('#menu');
    const accordionId = 'menuAccordion';
    const $accordion = $(`<div class="accordion" id="${accordionId}"></div>`);

    data.cards?.items?.forEach((card, index) => {
        const collapseId = `collapse-${index}`;
        const headingId = `heading-${index}`;
        const cardLabel = card.label || `Section ${index + 1}`;
        const $cardLinks = $('<div></div>');

        if (card.links && Array.isArray(card.links)) {
            card.links.forEach(link => {
                const linkLabel = link.label || link.link_to || link.name;
                $cardLinks.append(`
                    <div class="mb-2">
                        <a href="/app/${link.link_to.toLowerCase().replaceAll(' ','-')}" class="fw-semibold text-decoration-none">- ${linkLabel}</a>
                    </div>
                `);
            });
        }

        const accordionItem = `
            <div class="accordion-item">
                <h2 class="accordion-header" id="${headingId}">
                    <button class="accordion-button ${index > 0 ? 'collapsed' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="${index === 0}" aria-controls="${collapseId}">
                        ${cardLabel}
                    </button>
                </h2>
                <div id="${collapseId}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" aria-labelledby="${headingId}" data-bs-parent="#${accordionId}">
                    <div class="accordion-body">
                        ${$cardLinks.html()}
                    </div>
                </div>
            </div>
        `;

        $accordion.append(accordionItem);
    });

    // Render Shortcuts
    const $shortcutsPane = $('#shortcuts');
    data.shortcuts?.items?.forEach(item => {
        const label = item.label || item.link_to || item.name;
        const type = item.type || '';
        $shortcutsPane.append(`
            <div class="mb-2">
                <button data-link-to="${item.link_to.toLowerCase().replaceAll(' ','-')}" class="custom-btn custom-btn-outline-primary">${label}</button>
            </div>
        `);
    });

    $menuPane.append($accordion);

    $(`#workspaceTabContent #${accordionId} .accordion-button`).on('click', function () {
        const $button = $(this);
        const $collapse = $($button.data('bs-target'));

        if ($collapse.hasClass('show')) {
          $button.addClass('collapsed');
          $collapse.removeClass('show');
        } else {
          $(`#${accordionId} .accordion-button`).addClass('collapsed');
          $(`#${accordionId} .accordion-collapse`).removeClass('show');

          $button.removeClass('collapsed');
          $collapse.addClass('show');
        }
    });

    $('#workspaceTabContent .custom-btn.custom-btn-outline-primary').on('click', function() {
        const linkTo = $(this).attr('data-link-to');
        if (linkTo) {
            console.log("linkTo", linkTo)
            frappe.router.set_route(`/app/${linkTo}`);
        }
    })

}
