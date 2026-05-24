# ============================================
# ADMIN REGISTRATION FOR CLIENT MODEL
# ============================================
from django.contrib import admin
from .models import Client

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ['name', 'location', 'map_x', 'map_y', 'order', 'is_active']
    list_editable = ['order', 'is_active', 'map_x', 'map_y']
    list_filter = ['is_active']
    search_fields = ['name', 'location']