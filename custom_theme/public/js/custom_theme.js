$(function () {
    frappe.call({
        method: "custom_theme.utils.get_active_theme_color",
        callback: function (r) {
            console.log("response", r)
            if (r.message) {
                const color = r.message;
                const navbar = document.querySelector(".navbar");
                if (navbar) {
                    navbar.style.backgroundColor = color;
                }
            }
        }
    });
});
