
from rest_framework.generics import ListAPIView,RetrieveUpdateDestroyAPIView,CreateAPIView
from .models import Event
from .serializers import EventSerializer
from rest_framework.permissions import IsAuthenticated
# from rest_framework import permissions
# from .permissions import IsOwnerOnly
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

class CreateEvent(ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [AllowAny]
    # permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def filter_queryset(self, queryset):
        if self.request.user.is_authenticated:
            queryset = queryset.filter(user=self.request.user)
        else:
            queryset = queryset.none()  # Return an empty queryset for anonymous users
        return super().filter_queryset(queryset)
        # queryset = queryset.filter(user=self.request.user)
        # return super().filter_queryset(queryset)

class EventDetail(RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowAny]  # added
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    
    def filter_queryset(self, queryset):
        queryset = queryset.filter(user=self.request.user)
        return super().filter_queryset(queryset)
    
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([AllowAny])
def your_view(request):
    # Your view logic here
    if request.method == 'GET':
        queryset = Event.objects.all()
        serializer = EventSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)