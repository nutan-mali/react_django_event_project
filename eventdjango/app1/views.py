
from .models import Event
from .serializers import EventSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
# from rest_framework.generics import ListAPIView,RetrieveUpdateDestroyAPIView,CreateAPIView
# from .permissions import IsOwnerOnly
# from rest_framework.permissions import IsAuthenticated
# from rest_framework import permissions
# from rest_framework.permissions import AllowAny


@api_view(['GET'])
def event(request):
    queryset  = Event.objects.all()
    print(queryset )
    serializer = EventSerializer(queryset , many=True)
    return Response(serializer.data)

@api_view(['POST'])
def event_create(request):
    if request.method == 'POST':
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    else:
        return Response({'detail': 'Method not allowed'}, status=405)
# @api_view(['POST'])
# def event_create(request):
#     serializer = EventSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=201)  # Return a successful response
#     return Response(serializer.errors, status=400)  # Return error response if data is not valid