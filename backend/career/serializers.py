from rest_framework import serializers

from participant.models import Participant
from .models import Brand, Position, Application


class PositionSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ['id', 'title']


class BrandWithPositionsSerializer(serializers.ModelSerializer):
    positions = serializers.SerializerMethodField()

    class Meta:
        model = Brand
        fields = ['id', 'name', 'logo', 'positions']

    def get_positions(self, obj):
        positions = obj.position_set.all()
        return PositionSimpleSerializer(positions, many=True).data


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id', 'name', 'logo']


class PositionDetailSerializer(serializers.ModelSerializer):
    brand = BrandSerializer()

    class Meta:
        model = Position
        fields = ['id', 'title', 'markdown', 'brand']


class ApplicationSerializer(serializers.ModelSerializer):
    position = PositionSimpleSerializer()

    class Meta:
        model = Application
        fields = ['id', 'position', 'cover_letter', 'created_at']


class ApplicationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['position', 'cover_letter']

    def validate(self, attrs):
        user = self.context['request'].user
        try:
            participant = Participant.objects.get(user=user)
        except Participant.DoesNotExist:
            raise serializers.ValidationError("Participant not found for this user.")

        if Application.objects.filter(participant=participant, position=attrs['position']).exists():
            raise serializers.ValidationError("You have already applied for this position.")

        return attrs

    def create(self, validated_data):
        user = self.context['request'].user
        participant = Participant.objects.get(user=user)
        application = Application.objects.create(
            participant=participant,
            **validated_data
        )
        return application
