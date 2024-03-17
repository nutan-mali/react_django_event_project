# Import necessary modules and classes
from .models import Event
from .serializers import EventSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt

# Define a view using the @api_view decorator to handle GET and POST requests
@api_view(['GET', 'POST'])
def event(request):
    if request.method == 'GET':
        # Fetch all Event objects from the database
        queryset = Event.objects.all()
        # Serialize the queryset using EventSerializer
        serializer = EventSerializer(queryset, many=True)
        # Return serialized data in the response
        return Response(serializer.data)
    elif request.method == 'POST':
        # Deserialize request data using EventSerializer
        serializer = EventSerializer(data=request.data)
        # Check if the data is valid
        if serializer.is_valid():
            # Save the valid data to the database
            serializer.save()
            # Return the serialized data in the response with status code 201 (Created)
            return Response(serializer.data, status=201)
        # Return errors if the data is invalid with status code 400 (Bad Request)
        return Response(serializer.errors, status=400)
