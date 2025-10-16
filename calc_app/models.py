from django.db import models
from django.utils import timezone

class CalculationHistory(models.Model):
    operation = models.CharField(max_length=100)
    inputs = models.CharField(max_length=200)
    result = models.CharField(max_length=200)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.operation} - {self.result}"

