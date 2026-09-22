from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from accounts.models import User
from queues.models import QueueToken
from appointments.models import Appointment
from django.utils import timezone

class AdminDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = timezone.now().date()
        
        total_customers = User.objects.filter(role='ROLE_CUSTOMER').count()
        todays_appointments = Appointment.objects.filter(date=today).count()
        waiting_tokens = QueueToken.objects.filter(status='WAITING').count()
        completed_tokens = QueueToken.objects.filter(status='COMPLETED').count()
        
        data = {
            'totalCustomers': total_customers,
            'todaysAppointments': todays_appointments,
            'waitingTokens': waiting_tokens,
            'completedTokens': completed_tokens,
        }
        return Response(data)
