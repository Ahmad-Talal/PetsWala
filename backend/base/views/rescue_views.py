from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response


from base.models import Rescue
#from base.products import products
from base.serializers import RescueSerializer 

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getRescueTeams(request):
        rescues=Rescue.objects.all()
        serializer= RescueSerializer(rescues,many=True)
        return Response(serializer.data)    

