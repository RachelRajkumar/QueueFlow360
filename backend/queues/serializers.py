from rest_framework import serializers
from .models import QueueToken

class QueueTokenSerializer(serializers.ModelSerializer):
    service_name = serializers.CharField(source='service.name', read_only=True)
    customer_name = serializers.CharField(source='customer.name', read_only=True)
    department_name = serializers.CharField(source='service.department.name', read_only=True)
    
    appointment_date = serializers.SerializerMethodField()
    appointment_time = serializers.SerializerMethodField()
    sequential_token = serializers.SerializerMethodField()

    class Meta:
        model = QueueToken
        fields = '__all__'

    def get_appointment_date(self, obj):
        parts = str(obj.token_number).split('-')
        if len(parts) >= 3:
            appt_id = parts[1]
            from appointments.models import Appointment
            appt = Appointment.objects.filter(id=appt_id).first()
            if appt:
                return appt.date.strftime('%Y-%m-%d')
        return obj.created_at.strftime('%Y-%m-%d')

    def get_appointment_time(self, obj):
        parts = str(obj.token_number).split('-')
        if len(parts) >= 3:
            appt_id = parts[1]
            from appointments.models import Appointment
            appt = Appointment.objects.filter(id=appt_id).first()
            if appt:
                return appt.time.strftime('%H:%M')
        return obj.created_at.strftime('%H:%M')
        
    def get_sequential_token(self, obj):
        parts = str(obj.token_number).split('-')
        if len(parts) >= 3:
            return parts[2]
        return obj.token_number
