from django.urls import path
from reservation import views

urlpatterns = [path("reservation/", views.reservation_room_view, name="reservation")]