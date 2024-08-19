from django.db import models


class Document(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    upload_date = models.DateField(auto_now_add=True)

    def __str__(self) -> str:
        return self.name
