from django.contrib import admin
from .models import Prisma, Panorama


class PanoramaAdmin(admin.ModelAdmin):
    list_display = (
        "hostname",
        "ipv4_address",
        "ipv6_address",
    )


class PrismaAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "tsg",
        "client_id",
    )


admin.site.register(Panorama, PanoramaAdmin)
admin.site.register(Prisma, PrismaAdmin)
