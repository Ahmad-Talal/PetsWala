from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product , Order, OrderItem, ShippingAddress, Seller, Rescue,Report,Vet,Appointment

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    rescue = serializers.SerializerMethodField(read_only=True)
    vet = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model= User
        fields = ['id','_id', 'username', 'email','name','isAdmin','rescue','vet']

    def get_isAdmin(self,obj):
        return obj.is_staff

    def get__id(self,obj):
        return obj.id
    
    def get_name(self,obj):
        name = obj.first_name

        if name=='':
            name= obj.email
        return name  
    def rescue(self, obj):
        try:
            rescue = Rescue.objects.get(user = obj)
        except:
            rescue = None
        print(rescue)
        if rescue:
            return True
        return False 
    def vet(self, obj):
        try:
            vet = Vet.objects.get(User = obj)
        except:
            vet = None
        print(vet)
        if vet:
            return True
        return False     

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    rescue = serializers.SerializerMethodField(read_only=True)
    vet = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model= User
        fields = ['id','_id', 'username', 'email','name','isAdmin','token','rescue','vet']
    
    def get_token(self,obj):
        token =  RefreshToken.for_user(obj)
        return str(token.access_token)  

    def get_rescue(self, obj):
        # try:
        rescue = Rescue.objects.filter(User = obj)
        # except:
            # seller = None
        print(rescue)
        if rescue:
            return True
        return False
    def get_vet(self, obj):
        # try:
        vet = Vet.objects.filter(User = obj)
        # except:
            # seller = None
        print(vet)
        if vet:
            return True
        return False

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields='__all__'

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model= ShippingAddress
        fields='__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model= OrderItem
        fields='__all__'

class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model= Order 
        fields='__all__' 
    
    def get_orderItems(self,obj):
        items = obj.orderitem_set.all()      
        serializer = OrderItemSerializer(items,many=True)
        
        return serializer.data

    def get_shippingAddress(self,obj):
        try:
            address= ShippingAddressSerializer(
                obj.shippingaddress,many= False).data
        except:
            address= False     
        return address 

    def get_user(self,obj):
        user = obj.user   
        serializer = UserSerializer(user,many=False)
        
        return serializer.data    


class SellerSerializers(serializers.ModelSerializer):
    class Meta:
        model = Seller
        fields = [
            "contact",
            "NIC",
            "company_name",
            "coverImage",
            "address",
            "summary",
            "rating",
            "Image",
        ]

class RescueSerializer(serializers.ModelSerializer):
    class Meta:
        model= Rescue
        fields = [
            "location",
            "rating",
            "description",
            "image",
               ]


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model= Report
        fields='__all__'

class VetSerializer(serializers.ModelSerializer):
    class Meta:
        model= Vet
        fields='__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model= Appointment
        fields='__all__'