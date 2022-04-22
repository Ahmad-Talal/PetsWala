from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response


from base.models import Vet,Appointment
from base.serializers import AppointmentSerializer 
from rest_framework import status

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createAppointment(request,pk):
        try:
            data = request.data
            user = request.user

            appointment = Appointment.objects.create(
                user = user,
                phonenumber = data['phonenumber'],
                date = data['date'],
                assign = pk,
            )
            serializer= AppointmentSerializer(appointment,many=False)
            return Response({'detail':'appointment Sent successfully!!'},)    
        except:
            return Response({'detail':'appointment was not Sent'},
                status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def pendingAppointments(request):

        try:
            #data = request.data
            # user = request.user

            # appointments = Appointment.objects.gall(user=user)
            appointments = Appointment.objects.all()
            print(11)
            # for i in appointments:
            #     print(i.name)
            serializer= AppointmentSerializer(appointments,many=True)
            #appointments = Appointment.objects.all()

            return Response(serializer.data)    
        except:
            return Response({'detail':'appointment was not Sent'},
                status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def statusAppointment(request,pk):

        try:
            data = request.data
            appointment = Appointment.objects.get(_id=pk)
            print(11)
            appointment.status = data['status']
            appointment.delete()
            # for i in appointments:
            #     print(i.name)
            serializer= AppointmentSerializer(appointment,many=False)
            #appointments = Appointment.objects.all()

            return Response(serializer.data)    
        except:
            return Response({'detail':'appointment was deleted'},
                status=status.HTTP_400_BAD_REQUEST)