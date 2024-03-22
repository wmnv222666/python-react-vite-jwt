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
    )  # 调整列表显示的字段顺序
    prepopulated_fields = {
        "slug": ("title",),
    }

    def display_image(self, obj):
        return obj.image.url if obj.image else None

    display_image.short_description = "Image"

    fields = (
        "title",
        "excerpt",
        "content",
        "category",
        "author",
        "status",
        "image",  # 添加image字段
    )
    readonly_fields = ("id",)  # 将id字段设为只读


admin.site.register(models.Category)
