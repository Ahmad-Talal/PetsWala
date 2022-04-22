from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response


from base.models import *
from base.serializers import *
from django.db.models import Q


# Create your views here.

@api_view(['POST'])
def SellerView(request):
        data = request.data
        user = request.user
        seller = Seller(
            User=user,
            contact=data["contact"],
            NIC=data["NIC"],
            company_name=data["company_name"],
            coverImage=data["image"],
            address=data["address"],
            summary=data["summary"],
            Image=data["Image"],
        )
        seller.save()
        data = SellerSerializers(seller)
        return Response({"Response": data.data})   

@api_view(['GET'])
def getSellerInfo(request, name):
        seller = Seller.objects.get(company_name=name)
        data = SellerSerializers(seller)
        return Response({"RESPONSE": data.data}) 

@api_view(['POST'])
def SearchView(request):
        data = request.data
        user = request.user
        search = data.get("SEARCH", "")
        product = Product.objects.filter(
            Q(name__icontains=search)
            & (Q(price__gte=data["min"]) & Q(price__lte=data["max"]))
        )
        data = ProductSerializer(product, many=True)

        return Response({"RESPONSE": data.data})


