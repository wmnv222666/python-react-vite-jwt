from django.contrib import admin
from . import models


@admin.register(models.Post)
class PostAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "id",
        "status",
        "display_image",
        "author",
        "slug",
    )
    prepopulated_fields = {
        "slug": ("title",),
    }

    def display_image(self, obj):
        return obj.image.url if obj.image else None

    display_image.short_description = "Image"

    readonly_fields = ("id",)


admin.site.register(models.Category)
