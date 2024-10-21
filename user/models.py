from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.db import models
from django.utils import timezone


class BaseModelQuerySet(models.QuerySet):
    def delete(self):
        self.update(deleted_at=timezone.now(), is_active=False)


class BaseManager(models.Manager):
    def get_queryset(self):
        return BaseModelQuerySet(self.model, using=self._db).filter(deleted_at__isnull=True, is_active=True)


class BaseModel(models.Model):
    created_at = models.DateTimeField('Data de Criação', auto_now_add=True)
    updated_at = models.DateTimeField('Data de Modificação', auto_now=True)
    deleted_at = models.DateTimeField('Data de Deleção', editable=False, blank=True, null=True)
    is_active = models.BooleanField('Ativo', default=True)

    objects = BaseManager()

    class Meta:
        abstract = True

    def delete(self, **kwargs):
        self.is_active = False
        self.deleted_at = timezone.now()
        self.save()

    def hard_delete(self, **kwargs):
        super(BaseModel, self).delete(**kwargs)

    def recover(self):
        self.is_active = True
        self.deleted_at = None
        self.save()

class CustomUser(AbstractUser, BaseModel, PermissionsMixin):
    email = models.EmailField('Email', unique=True)
    phone = models.CharField('Telefone', max_length=15)
    address = models.OneToOneField('Address', on_delete=models.CASCADE, null=True, blank=True)


    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name', 'phone']


    def __str__(self):
        return self.username


class Address(models.Model):
    street = models.CharField(max_length=100, null=True, blank=True)
    number = models.CharField(max_length=10, null=True, blank=True, default="S/N")
    neighborhood = models.CharField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=100, null=True, blank=True)
    cep = models.CharField(max_length=10, null=True, blank=True)
    

    def __str__(self):
        return f' {self.street}, {self.number}, {self.neighborhood}, {self.city}, {self.state} - {self.cep}'
    