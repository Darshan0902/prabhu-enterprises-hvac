from django.contrib import admin
from .models import AboutProject


@admin.register(AboutProject)
class AboutProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'year', 'start_date', 'end_date', 'days_to_complete', 'is_active')
    list_filter = ('is_active', 'start_date')
    search_fields = ('title', 'description')
    readonly_fields = ('days_to_complete', 'project_duration', 'time_taken_readable')
    fieldsets = (
        (None, {
            'fields': (
                        'title',
                        'year', 
                        'description',
                        'image',
                        'start_date',
                        'end_date',
                        'duration',
                        'time_taken',
                        'days_to_complete',
                    )
        }),
        ('Control', {
            'fields': ('order', 'is_active'),
        }),
    )
