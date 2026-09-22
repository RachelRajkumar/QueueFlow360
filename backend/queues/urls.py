from django.urls import path
from .views import WaitingQueueListView, CallNextTokenView, CompleteTokenView, SkipTokenView, CurrentlyServingTokensView

urlpatterns = [
    path('queue/waiting', WaitingQueueListView.as_view(), name='waiting_queue'),
    path('queue/serving', CurrentlyServingTokensView.as_view(), name='serving_queue'),
    path('queue/call-next', CallNextTokenView.as_view(), name='call_next'),
    path('queue/complete/<str:tokenNumber>', CompleteTokenView.as_view(), name='complete_token'),
    path('queue/skip/<str:tokenNumber>', SkipTokenView.as_view(), name='skip_token'),
]
