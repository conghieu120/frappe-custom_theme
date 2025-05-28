import frappe
from frappe.model.document import Document

class ThemePrimaryColor(Document):
    def before_save(self):
        if self.is_active:
            frappe.db.sql("""
                UPDATE `tabTheme Primary Color`
                SET is_active = 0
                WHERE name != %s
            """, (self.name,))
