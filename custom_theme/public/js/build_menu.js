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
    let menuContent = '';

}
