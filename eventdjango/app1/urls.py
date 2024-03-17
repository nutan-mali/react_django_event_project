from django.urls import path
from app1 import views


urlpatterns = [
    path('event/', views.event, name = 'event'),
    # path('event_create/', views.event, name = 'event_create'),
]
