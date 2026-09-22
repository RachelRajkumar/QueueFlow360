from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('ROLE_ADMIN', 'Admin'),
        ('ROLE_STAFF', 'Staff'),
        ('ROLE_CUSTOMER', 'Customer'),
    )
    
    # name is in frontend formData, so we'll map first_name/last_name to it, or just use a custom 'name' field
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='ROLE_CUSTOMER')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'name']

    def __str__(self):
        return self.email
