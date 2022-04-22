from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response


from base.models import Vet
#from base.products import products
from base.serializers import VetSerializer 

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getVets(request):
        vets=Vet.objects.all()
        serializer= VetSerializer(vets,many=True)
        return Response(serializer.data)    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createVet(request):
        user = request.user
        data = request.data
        vet=Vet.objects.create(
                User=user,
                title=data['title'],
                fee=data['fee'],
                experience=data['experience'],
                qualification=data['qualification'],
                latitude = data['latitude'],
                longitude = data['longitude'],
        )
        serializer= VetSerializer(vet,many=False)
        return Response(serializer.data)    

@api_view(['POST'])
def uploadImage(request):
        data = request.data
        vet_id= data['vet_id']
        vet=Vet.objects.get(_id=vet_id)
        
        vet.image= request.FILES.get('image')
        vet.save()
        print("ye he            ",vet)
        return Response("image was uploaded")    
