from django.urls import path
from . import views

urlpatterns = [
    path("", views.custom_login, name="login")
]

