from rest_framework import serializers
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
