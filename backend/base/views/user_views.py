from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User

from base.serializers import UserSerializer, UserSerializerWithToken      
from django.contrib.auth.hashers import make_password
from rest_framework import status

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView  

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Add custom claims
        serializer = UserSerializerWithToken(self.user).data

        for keys , values in serializer.items():
                data[keys] = values
        # ...

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
        data = request.data
        try:
                user = User.objects.create(
                        first_name= data['name'],
                        username= data['email'],
                        email= data['email'],
                        password= make_password(data['password'])
                )
                serializer = UserSerializerWithToken(user,many=False)
                return Response(serializer.data)
        except:
                message = {'detail' : 'User with this email already exists'}
                return Response (message,status=status.HTTP_400_BAD_REQUEST)          

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
        user=request.user
        serializer= UserSerializer(user,many=False)
        return Response(serializer.data)  

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateUserProfile(request):
        user=request.user
        serializer= UserSerializerWithToken(user,many=False)
        data =request.data

        user.first_name=data['name']
        user.username=data['email']
        user.email=data['email']

        if data['password'] != '':
                user.password= make_password(data['password'])
        user.save()
        
        return Response(serializer.data)  


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
        users=User.objects.all()
        serializer= UserSerializer(users,many=True)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserThroughID(request,pk):
        user=User.objects.get(id=pk)
        serializer= UserSerializer(user,many=False)
        return Response(serializer.data)     

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request,pk):
        user=User.objects.get(id=pk)
        
        data =request.data

        user.first_name= data['name']
        user.username= data['email']
        user.email= data['email']
        user.is_staff =data['is_Admin']
        user.save()

        serializer= UserSerializer(user,many=False)
        return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delUser(request,pk):
        userToDel=User.objects.get(id=pk)
        userToDel.delete()
        return Response("User Deleted...")