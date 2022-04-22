from django.urls import path
from base.views import product_views as views


urlpatterns=[
   
    path('',views.getProducts,name='products'),
    path('json/',views.getR,name='json-data'), 
    path('create/',views.createProduct,name='product-create'), 
 
    path('<str:pk>/',views.getProduct,name='product'), 
    
    path('image/<str:pk>/',views.putImage,name='product-image'), 
    path('delete/<str:pk>/',views.deleteProduct,name='product-delete'), 
]


