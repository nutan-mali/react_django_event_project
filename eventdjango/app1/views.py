
from .models import Event
from .serializers import EventSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView,RetrieveUpdateDestroyAPIView,CreateAPIView
# from .permissions import IsOwnerOnly
# from rest_framework.permissions import IsAuthenticated
# from rest_framework import permissions
# from rest_framework.permissions import AllowAny


@api_view(['GET','POST'])
def event(request):
    if request.method == 'GET':
        queryset  = Event.objects.all()
        print(queryset )
        serializer = EventSerializer(queryset , many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(queryset )
            return Response(serializer.data, status=201)  # Created
        return Response(serializer.errors, status=400)  # Bad Request
