from django.db import models

from participant.models import Participant


class Brand(models.Model):
    name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='brands/logos/')

    def __str__(self):
        return self.name


class Position(models.Model):
    title = models.CharField(max_length=255)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    markdown = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} at {self.brand.name}"


class Application(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    position = models.ForeignKey(Position, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.participant} -> {self.position}"
