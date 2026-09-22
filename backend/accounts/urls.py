from django.urls import path
from .views import CustomTokenObtainPairView, RegisterView

urlpatterns = [
    path('login', CustomTokenObtainPairView.as_view(), name='login'),
    path('register', RegisterView.as_view(), name='register'),
]
