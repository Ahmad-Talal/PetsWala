from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

@api_view(['POST'])
def createCharge(request):
    stripe.api_key = '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'


    data = request.data

    token = data['stripeToken']

    print("aawww    ,",token)

    charge = stripe.Charge.create(
    amount=999,
    currency='usd',
    description='Example charge',
    source=token,
    )