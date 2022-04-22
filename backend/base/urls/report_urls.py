from django.urls import path
from base.views import report_views as views

urlpatterns=[

    path('create/<str:pk>/',views.createReport,name='create_report'),  
]


