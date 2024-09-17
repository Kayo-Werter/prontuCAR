from django.db import models
from django.core.validators import FileExtensionValidator

class Document(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    upload_date = models.DateField(auto_now_add=True)
    file = models.FileField(null=True, blank=True, upload_to='documents/', validators=[FileExtensionValidator(allowed_extensions=['pdf'])])

    def __str__(self) -> str:
        return self.name

