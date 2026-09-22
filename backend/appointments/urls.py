from django.urls import path
from .views import CustomerAppointmentCreateView, CustomerAppointmentHistoryView, CustomerAppointmentCancelView, AdminAppointmentListView

urlpatterns = [
    path('admin/appointments', AdminAppointmentListView.as_view(), name='admin_appointment_history'),
    path('customer/appointments', CustomerAppointmentCreateView.as_view(), name='customer_create_appointment'),
    path('customer/appointments/<int:pk>/cancel', CustomerAppointmentCancelView.as_view(), name='customer_cancel_appointment'),
    path('appointments/my', CustomerAppointmentHistoryView.as_view(), name='customer_appointment_history'),
]
