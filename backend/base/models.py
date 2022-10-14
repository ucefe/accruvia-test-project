from unittest.util import _MAX_LENGTH
from django.db import models

# Create your models here.
class Tweet(models.Model):
    username=models.CharField(max_length=10)
    tweet=models.CharField(max_length=50)
    created = models.DateTimeField(auto_now_add=False)