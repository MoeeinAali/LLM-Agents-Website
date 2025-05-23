from core.models import Event, Workshop, UniqueUploadPath

from spotplayer.models import SpotPlayerCourse, SpotPlayerLicense

from django.contrib.auth.models import User
from django.db import models
import secrets


class ParticipantInfo(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other')
    )
    GRADE_CHOICES = (
        ('B', 'Bachelor'),
        ('M', 'Master'),
        ('P', 'PhD'),
    )

    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    national_code = models.CharField(max_length=10, blank=True)
    phone_number = models.CharField(max_length=15, blank=True)
    city = models.CharField(max_length=100, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=1, default='M', choices=GENDER_CHOICES)
    university = models.CharField(max_length=100, blank=True)
    major = models.CharField(max_length=100, blank=True)
    job = models.CharField(max_length=100, blank=True)
    is_open_to_work = models.BooleanField(default=False)
    fields_of_interest = models.TextField(blank=True)
    grade = models.CharField(max_length=1, default='B', choices=GRADE_CHOICES)
    introduction_method = models.TextField(blank=True)
    linkedin = models.CharField(max_length=100, blank=True)
    github = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name} - {self.national_code}'


class Participant(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    info = models.ForeignKey(ParticipantInfo, on_delete=models.SET_NULL, null=True, blank=True)
    password_reset_code = models.CharField(max_length=10, blank=True, null=True)

    def __str__(self):
        if self.info:
            return f'{self.info.first_name} {self.info.last_name} - {self.user.email}'
        else:
            return f'NO INFO - user: {self.user}'


class ModeOfAttendance(models.Model):
    name = models.CharField(max_length=50)
    is_national_code_required = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.name}'


class ParticipationPlan(models.Model):
    KIND_CHOICES = (
        ('W', 'Workshop'),
        ('M', 'Mode of Attendance')
    )

    price = models.IntegerField(default=0)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    kind = models.CharField(max_length=1, choices=KIND_CHOICES)
    workshop = models.ForeignKey(Workshop, on_delete=models.CASCADE, null=True, blank=True)
    mode_of_attendance = models.ForeignKey(ModeOfAttendance, on_delete=models.CASCADE, null=True, blank=True)
    spotplayer_course = models.ForeignKey(SpotPlayerCourse, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f'{self.event} - {self.workshop if self.kind == "W" else self.mode_of_attendance}'


class Participation(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    info = models.ForeignKey(ParticipantInfo, on_delete=models.SET_NULL, null=True, blank=True)
    plan = models.ForeignKey(ParticipationPlan, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    spotplayer_license = models.ForeignKey(SpotPlayerLicense, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f'{self.participant} - {self.plan}'


class ParticipationAttachment(models.Model):
    participation = models.ForeignKey(Participation, on_delete=models.CASCADE)
    attachment = models.FileField(upload_to=UniqueUploadPath('participation'), null=True, blank=True)
    description = models.TextField(blank=True)
    date = models.DateTimeField(auto_now_add=True)


class Group(models.Model):
    name = models.CharField(max_length=100)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    owner = models.ForeignKey(Participant, on_delete=models.SET_NULL, null=True, related_name='owned_groups')
    secret_key = models.CharField(max_length=16, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    members = models.ManyToManyField(Participant, related_name='joined_groups', through='GroupMembership')

    def __str__(self):
        return f'{self.name} - {self.event}'

    def save(self, *args, **kwargs):
        if not self.secret_key:
            self.secret_key = secrets.token_hex(8) 
        super().save(*args, **kwargs)


class GroupMembership(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('group', 'participant')

    def __str__(self):
        return f'{self.participant} in {self.group}'

    def save(self, *args, **kwargs):
        # Check if participant is already in another group
        if GroupMembership.objects.filter(participant=self.participant).exclude(id=self.id).exists():
            raise ValueError("Participant is already a member of another group")
        super().save(*args, **kwargs)
