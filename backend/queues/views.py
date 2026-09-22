from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import QueueToken
from .serializers import QueueTokenSerializer
from django.shortcuts import get_object_or_404

class WaitingQueueListView(generics.ListAPIView):
    serializer_class = QueueTokenSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return QueueToken.objects.filter(status='WAITING').order_by('created_at')

class CallNextTokenView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        service_id = request.data.get('service_id')
        if not service_id:
            return Response({'error': 'service_id is required'}, status=status.HTTP_400_BAD_REQUEST)
            
        next_token = QueueToken.objects.filter(status='WAITING', service_id=service_id).order_by('created_at').first()
        if next_token:
            next_token.status = 'CALLED'
            next_token.save()
            return Response(QueueTokenSerializer(next_token).data)
        return Response({'message': 'No waiting tokens for this service'}, status=status.HTTP_404_NOT_FOUND)

def _sync_appointment_status(token_number, new_status):
    parts = str(token_number).split('-')
    if len(parts) >= 3:
        appt_id = parts[1]
        from appointments.models import Appointment
        appt = Appointment.objects.filter(id=appt_id).first()
        if appt:
            appt.status = new_status
            appt.save()

class CompleteTokenView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, tokenNumber):
        token = get_object_or_404(QueueToken, token_number=tokenNumber)
        token.status = 'COMPLETED'
        token.save()
        _sync_appointment_status(token.token_number, 'COMPLETED')
        return Response(QueueTokenSerializer(token).data)

class SkipTokenView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, tokenNumber):
        token = get_object_or_404(QueueToken, token_number=tokenNumber)
        token.status = 'SKIPPED'
        token.save()
        _sync_appointment_status(token.token_number, 'CANCELLED')
        return Response(QueueTokenSerializer(token).data)

class CurrentlyServingTokensView(generics.ListAPIView):
    serializer_class = QueueTokenSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return QueueToken.objects.filter(status='CALLED')
