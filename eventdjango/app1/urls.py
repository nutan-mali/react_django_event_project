from django.urls import path
from app1 import views


urlpatterns = [
    path('event/', views.CreateEvent.as_view() ),
]
