from django.contrib import admin
from .models import Brand, Position, Participant, Application


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


@admin.register(Position)
class PositionAdmin(admin.ModelAdmin):
    list_display = ('title', 'brand')
    list_filter = ('brand',)
    search_fields = ('title',)


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('participant', 'position', 'get_brand')
    list_filter = ('position', 'position__brand')

    def get_brand(self, obj):
        return obj.position.brand

    get_brand.short_description = 'Brand'
    get_brand.admin_order_field = 'position__brand'
