from django.urls import path
from base.views import vet_views as views

urlpatterns=[

    path('',views.getVets,name='vets'), 
    path('create/',views.createVet,name='createVet'),
    path('pic/',views.uploadImage,name='image'),
]


