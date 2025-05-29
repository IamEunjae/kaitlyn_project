# models.py
from django.db import models


class Reservation(models.Model):
    student1 = models.CharField(max_length=20, blank=True)
    student2 = models.CharField(max_length=20, blank=True)
    student3 = models.CharField(max_length=20, blank=True)
    student4 = models.CharField(max_length=20, blank=True)
    student5 = models.CharField(max_length=20, blank=True)
    student6 = models.CharField(max_length=20, blank=True)
    time1 = models.BooleanField(default=False)
    time2 = models.BooleanField(default=False)
    time3 = models.BooleanField(default=False)
    time4 = models.BooleanField(default=False)
    time5 = models.BooleanField(default=False)
    time6 = models.BooleanField(default=False)
    time7 = models.BooleanField(default=False)
    time8 = models.BooleanField(default=False)
    time9 = models.BooleanField(default=False)
    time10 = models.BooleanField(default=False)
    time11 = models.BooleanField(default=False)
    time12 = models.BooleanField(default=False)
    time13 = models.BooleanField(default=False)
    room_number = models.IntegerField()


class Room(models.Model):
    room_number = models.IntegerField()
    time1 = models.BooleanField(default=False)
    time2 = models.BooleanField(default=False)
    time3 = models.BooleanField(default=False)
    time4 = models.BooleanField(default=False)
    time5 = models.BooleanField(default=False)
    time6 = models.BooleanField(default=False)
    time7 = models.BooleanField(default=False)
    time8 = models.BooleanField(default=False)
    time9 = models.BooleanField(default=False)
    time10 = models.BooleanField(default=False)
    time11 = models.BooleanField(default=False)
    time12 = models.BooleanField(default=False)
    time13 = models.BooleanField(default=False)
