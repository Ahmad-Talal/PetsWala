from django.urls import path
from base.views import seller_views as views

urlpatterns = [
    path("seller/<str:name>/", views.getSellerInfo, name = "GetSellerInfo"),
    path('sellerForm/', views.SellerView, name="SellerForm"),
    path('search/', views.SearchView, name="SearchView")
]