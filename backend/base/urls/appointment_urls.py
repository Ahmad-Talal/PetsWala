from django.urls import path
from base.views import appointment_views as views

urlpatterns=[   
    path('pending/',views.pendingAppointments,name='get_sppointment'),
    path('create/<str:pk>/',views.createAppointment,name='create_sppointment'),  
    path('update/<str:pk>/',views.statusAppointment,name='status_sppointment'),  
]


