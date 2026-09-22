from django.urls import path
from .views import (
    AdminDepartmentListCreateView,
    AdminDepartmentDeleteView,
    AdminServiceListCreateView,
    AdminServiceDeleteView,
    CustomerDepartmentListView,
    CustomerServiceByDepartmentListView
)

urlpatterns = [
    # Admin URLs
    path('admin/departments', AdminDepartmentListCreateView.as_view(), name='admin_departments'),
    path('admin/departments/<int:pk>', AdminDepartmentDeleteView.as_view(), name='admin_delete_department'),
    path('admin/services', AdminServiceListCreateView.as_view(), name='admin_services'),
    path('admin/services/<int:pk>', AdminServiceDeleteView.as_view(), name='admin_delete_service'),

    # Customer URLs
    path('customer/departments', CustomerDepartmentListView.as_view(), name='customer_departments'),
    path('customer/services/department/<int:id>', CustomerServiceByDepartmentListView.as_view(), name='customer_services_by_dept'),
]
