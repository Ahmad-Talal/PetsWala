from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response


from base.models import Product
#from base.products import products
from base.serializers import ProductSerializer 


@api_view(['GET'])
def getR(request):
        content = [{'kind': 'analytics#gaData', 'id': 'https://www.googleapis.com/analytics/v3/data/ga?ids=ga:199125879&dimensions=ga:browser,ga:sourceMedium&metrics=ga:users,ga:revenuePerTransaction&start-date=2019-01-01&end-date=2019-01-10&max-results=1000000', 'query': {'start-date': '2019-01-01', 'end-date': '2019-01-10', 'ids': 'ga:199125879', 'dimensions': 'ga:browser,ga:sourceMedium', 'metrics': ['ga:users', 'ga:revenuePerTransaction'], 'start-index': 1, 'max-results': 10000}, 'itemsPerPage': 10000, 'totalResults': 0, 'selfLink': 'https://www.googleapis.com/analytics/v3/data/ga?ids=ga:199125879&dimensions=ga:browser,ga:sourceMedium&metrics=ga:users,ga:revenuePerTransaction&start-date=2019-01-01&end-date=2019-01-10&max-results=1000000', 'profileInfo': {'profileId': '199125879', 'accountId': '126294108', 'webPropertyId': 'UA-126294108-8', 'internalWebPropertyId': '206104664', 'profileName': '全部网站数据', 'tableId': 'ga:199125879'}, 'containsSampledData': False, 'columnHeaders': [{'name': 'ga:browser', 'columnType': 'DIMENSION', 'dataType': 'STRING'}, {'name': 'ga:sourceMedium', 'columnType': 'DIMENSION', 'dataType': 'STRING'}, {'name': 'ga:users', 'columnType': 'METRIC', 'dataType': 'INTEGER'}, {'name': 'ga:revenuePerTransaction', 'columnType': 'METRIC', 'dataType': 'CURRENCY'}], 'totalsForAllResults': {'ga:users': '0', 'ga:revenuePerTransaction': '0.0'}}]
        # serializer= ProductSerializer(content,many=True)
        return Response(content) 

@api_view(['GET'])
def getProducts(request):
        products=Product.objects.all()
        serializer= ProductSerializer(products,many=True)
        return Response(serializer.data)    

@api_view(['GET'])
def getProduct(request, pk):
        product=Product.objects.get(_id=pk)
        serializer= ProductSerializer(product,many=False)
        return Response(serializer.data) 

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProduct(request):
        user = request.user
        data = request.data
        product=Product.objects.create(
            user = user,
            name = data['name'],
            description = data['description'],
            price = data['price'],
            countInStock = data['countInStock'],
        )
        serializer= ProductSerializer(product,many=False)
        return Response(str(product._id)) 

@api_view(['PUT'])
def putImage(request,pk):

        product =  Product.objects.get(_id=pk)
        product.image = request.FILES.get('image')
        product.save()
        return Response("Image was uploaded")
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
        product=Product.objects.get(_id=pk)
        product.delete()
        return Response('product deleted')         
