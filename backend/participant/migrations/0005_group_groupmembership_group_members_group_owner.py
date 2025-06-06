# Generated by Django 4.2.7 on 2025-05-24 06:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0014_alter_postersessionimage_image_alter_speaker_image_and_more'),
        ('participant', '0004_alter_participationattachment_attachment'),
    ]

    operations = [
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('secret_key', models.CharField(max_length=16, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.event')),
            ],
        ),
        migrations.CreateModel(
            name='GroupMembership',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('joined_at', models.DateTimeField(auto_now_add=True)),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='participant.group')),
                ('participant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='participant.participant')),
            ],
            options={
                'unique_together': {('group', 'participant')},
            },
        ),
        migrations.AddField(
            model_name='group',
            name='members',
            field=models.ManyToManyField(related_name='joined_groups', through='participant.GroupMembership', to='participant.participant'),
        ),
        migrations.AddField(
            model_name='group',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='owned_groups', to='participant.participant'),
        ),
    ]
