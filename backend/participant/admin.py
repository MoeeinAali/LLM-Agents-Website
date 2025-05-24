from django.contrib import admin
from core.admin import ExportCSVMixin
import csv
from django.http import HttpResponse
from participant.models import *


@admin.register(Participant)
class ParticipantAdmin(admin.ModelAdmin, ExportCSVMixin):
    list_display = ('info', 'user', 'get_national_code')
    search_fields = ('info__first_name', 'info__last_name', 'user__email', 'info__national_code',)

    def get_national_code(self, obj):
        return obj.info.national_code

    get_national_code.short_description = "National Code"


@admin.register(Participation)
class ParticipationAdmin(admin.ModelAdmin):
    list_display = ('participant', 'participant_email', 'plan')
    list_filter = ('plan', 'plan__event__order',)
    autocomplete_fields = ('participant', 'info',)
    search_fields = ('participant__user__email', 'participant__info__national_code',)
    actions = ["export_data"]

    def participant_email(self, obj):
        return obj.participant.user.email if obj.participant and obj.participant.user else ""

    participant_email.short_description = "Email"

    def export_data(self, request, queryset):
        meta = self.model._meta
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename=participation_data.csv'
        writer = csv.writer(response)

        headers = [
            'Participation Id',
            'Email',
            'First Name',
            'Last Name',
            'National Code',
            'Phone Number',
            'Plan'
        ]
        writer.writerow(headers)

        for obj in queryset:
            row = [
                obj.id if obj.id else '',
                obj.participant.user.email if obj.participant and obj.participant.user else '',
                obj.participant.info.first_name if obj.participant and obj.participant.info else '',
                obj.participant.info.last_name if obj.participant and obj.participant.info else '',
                obj.participant.info.national_code if obj.participant and obj.participant.info else '',
                obj.participant.info.phone_number if obj.participant and obj.participant.info else '',
                str(obj.plan) if obj.plan else ''
            ]
            writer.writerow(row)

        return response

    export_data.short_description = "Export Registration Data As CSV"


@admin.register(ParticipantInfo)
class ParticipantInfoAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'national_code')
    search_fields = ('first_name', 'last_name',)

    def full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"


admin.site.register(ParticipationPlan)
admin.site.register(ParticipationAttachment)
admin.site.register(ModeOfAttendance)

class GroupMembershipInline(admin.TabularInline):
    model = GroupMembership
    extra = 0
    readonly_fields = ('joined_at',)
    autocomplete_fields = ['participant']
    raw_id_fields = ['participant']

@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    list_display = ('name', 'event', 'owner', 'get_member_count', 'created_at')
    list_filter = ('event', 'created_at')
    search_fields = ('name', 'owner__user__email', 'members__user__email')
    readonly_fields = ('secret_key', 'created_at')
    inlines = [GroupMembershipInline]
    autocomplete_fields = ['owner']
    raw_id_fields = ['event']

    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related(
            'members',
            'members__user',
            'members__info',
            'owner',
            'owner__user',
            'owner__info'
        )

    def get_member_count(self, obj):
        return obj.members.count()
    get_member_count.short_description = 'Member Count'

@admin.register(GroupMembership)
class GroupMembershipAdmin(admin.ModelAdmin):
    list_display = ('participant', 'group', 'joined_at')
    list_filter = ('joined_at', 'group__event')
    search_fields = ('participant__user__email', 'group__name')
    readonly_fields = ('joined_at',)
