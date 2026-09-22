from django.db import models
from django.conf import settings
from services.models import Service

class QueueToken(models.Model):
    STATUS_CHOICES = (
        ('WAITING', 'Waiting'),
        ('CALLED', 'Called'),
        ('SERVING', 'Serving'),
        ('COMPLETED', 'Completed'),
        ('SKIPPED', 'Skipped'),
    )

    token_number = models.CharField(max_length=20, unique=True)
    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='WAITING')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.token_number} - {self.status}"
