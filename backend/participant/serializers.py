import base64
import re
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework import serializers

from core.serializers import WorkshopSerializer

from participant.models import (
    ModeOfAttendance, Participant, ParticipantInfo, Participation, 
    ParticipationPlan, ParticipationAttachment, Group, GroupMembership, Event
)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'password')

    def validate_password(self, value: str) -> str:
        return make_password(value)

class ParticipantSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Participant
        fields = ('user', 'info')

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        if User.objects.filter(email=user_data['email']).exists():
            raise serializers.ValidationError('User with this email already exists.')
        user_data['username'] = user_data['email'].replace('@', '_').replace('.', '_')
        user = User.objects.create(**user_data)
        participant = Participant.objects.create(user=user, **validated_data)
        participant.info = ParticipantInfo.objects.create()
        participant.save()
        participant.info.is_open_to_work = True
        participant.info.save()
        return participant


class ParticipantInfoSerializer(serializers.ModelSerializer):
    email = serializers.CharField(source='participant_set.first.user.email', read_only=True)

    class Meta:
        model = ParticipantInfo
        fields = ('__all__')

    def validate_national_code(self, value: str) -> str:
        if value == '':
            return value
        if re.match(r'^\d{8,10}$', value):
            if len(value) < 10:
                value = '0' * (10 - len(value)) + value
            temp = 0
            for i in range(9):
                temp += int(value[i]) * (10 - i)
            rem = temp % 11
            if (rem < 2 and int(value[9]) == rem) or (rem >= 2 and int(value[9]) == (11 - rem)):
                return value
            raise serializers.ValidationError({"error": "National Code is not valid."})
        raise serializers.ValidationError({"error": "National Code is not valid."})
    
    def validate_phone_number(self, value: str) -> str:
        if re.match(r'^(\+\d{1,3}|0)\d{10}$', value):
            return value
        raise serializers.ValidationError({"error": "Phone number is not valid."})
    
    def validate_gender(self, value: str) -> str:
        if value in ['M', 'F', 'O']:
            return value
        raise serializers.ValidationError({"error": "Gender is not valid."})
    
    def validate_grade(self, value: str) -> str:
        if value in ['B', 'M', 'P']:
            return value
        raise serializers.ValidationError({"error": "Grade is not valid."})

class ModeOfAttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModeOfAttendance
        fields = '__all__'

class ParticipationSerializer(serializers.ModelSerializer):
    plan = serializers.IntegerField(source='plan.id', read_only=True)
    license_key = serializers.CharField(source='spotplayer_license.license_key', read_only=True)
    
    class Meta:
        model = Participation
        fields = ('plan', 'license_key')

class ParticipationPlanSerializer(serializers.ModelSerializer):
    event = serializers.CharField(source='event.name', read_only=True)
    workshop = WorkshopSerializer()
    mode_of_attendance = ModeOfAttendanceSerializer()
    
    class Meta:
        model = ParticipationPlan
        fields = ('id', 'price', 'event', 'kind', 'workshop', 'mode_of_attendance')

class ParticipationAttachmentSerializer(serializers.ModelSerializer):
    UUID = serializers.CharField(source='attachment', read_only=True)
    plan = serializers.CharField(source='participation.plan', read_only=True)

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['UUID'] = base64.b64encode(ret['UUID'].encode('utf-8'))
        return ret

    class Meta:
        model = ParticipationAttachment
        fields = ['id', 'plan', 'description', 'date', 'UUID']

class FileSerializer(serializers.Serializer):
    attachment = serializers.CharField()

class GroupSerializer(serializers.ModelSerializer):
    secret_key = serializers.CharField(read_only=True)
    members = serializers.SerializerMethodField()

    class Meta:
        model = Group
        fields = ('name', 'secret_key', 'members')
        read_only_fields = ('secret_key',)

    def get_members(self, obj):
        members = obj.members.all().select_related('info', 'user')
        member_data = []
        for member in members:
            first_name = member.info.first_name if member.info else ''
            last_name = member.info.last_name if member.info else ''
            full_name = f"{first_name} {last_name}".strip() or None
            member_data.append({
                'email': member.user.email,
                'full_name': full_name
            })
        return member_data

    def validate(self, data):
        participant = Participant.objects.get(user=self.context['request'].user)
        event_id = self.context['view'].kwargs.get('event_id')
        
        if not Participation.objects.filter(participant=participant, plan__event_id=event_id).exists():
            raise serializers.ValidationError({"error": "You must be participating in this event to create a group."})
        
        if Group.objects.filter(owner=participant).exists() or Group.objects.filter(members=participant).exists():
            raise serializers.ValidationError({"error": "You are already a member or owner of another group."})
        
        return data

class GroupJoinSerializer(serializers.Serializer):
    secret_key = serializers.CharField(max_length=16)

    def validate(self, data):
        participant = Participant.objects.get(user=self.context['request'].user)
        event_id = self.context.get('event_id')
        
        if Group.objects.filter(owner=participant).exists() or Group.objects.filter(members=participant).exists():
            raise serializers.ValidationError({"error": "You are already a member or owner of another group."})
        
        try:
            group = Group.objects.get(secret_key=data['secret_key'])
        except Group.DoesNotExist:
            raise serializers.ValidationError({"error": "Invalid group secret key."})
        
        if group.members.count() >= 6:
            raise serializers.ValidationError({"error": "This group has reached its maximum capacity."})
        
        if not Participation.objects.filter(participant=participant, plan__event_id=event_id).exists():
            raise serializers.ValidationError({"error": "You must be participating in this event to join the group."})
        
        if group.event_id != event_id:
            raise serializers.ValidationError({"error": "This group does not belong to the specified event."})
        
        return data
