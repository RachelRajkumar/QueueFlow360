from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Appointment
from .serializers import AppointmentSerializer
from queues.models import QueueToken

class CustomerAppointmentCreateView(generics.CreateAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        service = serializer.validated_data.get('service')
        date = serializer.validated_data.get('date')
        
        last_appointment = Appointment.objects.filter(
            service=service, 
            date=date
        ).order_by('-token_number').first()
        
        token_number = 1
        if last_appointment and last_appointment.token_number:
            token_number = last_appointment.token_number + 1
            
        appointment = serializer.save(customer=self.request.user, token_number=token_number)
        
        qt_token_string = f"T-{appointment.id}-{token_number}"
        QueueToken.objects.create(
            token_number=qt_token_string,
            customer=self.request.user,
            service=service,
            status='WAITING'
        )

class CustomerAppointmentHistoryView(generics.ListAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Appointment.objects.filter(customer=self.request.user).order_by('-date', '-time')

class CustomerAppointmentCancelView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        appointment = get_object_or_404(Appointment, pk=pk, customer=request.user)
        if appointment.status == 'CANCELLED':
            return Response({'message': 'Already cancelled'}, status=status.HTTP_400_BAD_REQUEST)
            
        appointment.status = 'CANCELLED'
        cancelled_token_number = appointment.token_number
        appointment.token_number = None
        appointment.save()
        
        qt_token_string = f"T-{appointment.id}-{cancelled_token_number}"
        try:
            qt = QueueToken.objects.get(token_number=qt_token_string)
            if qt.status == 'WAITING':
                qt.status = 'SKIPPED'
                qt.save()
        except QueueToken.DoesNotExist:
            pass

        if cancelled_token_number is not None:
            subsequent_appointments = Appointment.objects.filter(
                service=appointment.service,
                date=appointment.date,
                token_number__gt=cancelled_token_number
            ).order_by('token_number')
            
            for appt in subsequent_appointments:
                old_token = appt.token_number
                new_token = old_token - 1
                
                appt.token_number = new_token
                appt.save()
                
                old_qt_str = f"T-{appt.id}-{old_token}"
                new_qt_str = f"T-{appt.id}-{new_token}"
                try:
                    qt = QueueToken.objects.get(token_number=old_qt_str)
                    qt.token_number = new_qt_str
                    qt.save()
                except QueueToken.DoesNotExist:
                    pass
            
        return Response({'message': 'Appointment cancelled'})

class AdminAppointmentListView(generics.ListAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Appointment.objects.all().order_by('-date', '-time')
