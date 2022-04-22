from django.urls import path
from base.views import stripe_views as views
# from rest_framework_simplejwt.views import(
#     TokenObtainPairView,
# )


urlpatterns=[
   
    path('charge/',views.createCharge,name='charge'), 
]