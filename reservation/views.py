from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponseRedirect
from .models import Reservation, Room
import json
from django.db.models import Q


def update_room_status():
    # Fetch all Room objects and reset all periods to False
    rooms = Room.objects.all()
    for room in rooms:
        room.time1 = False
        room.time2 = False
        room.time3 = False
        room.time4 = False
        room.time5 = False
        room.time6 = False
        room.time7 = False
        room.time8 = False
        room.time9 = False
        room.time10 = False
        room.time11 = False
        room.time12 = False
        room.time13 = False

        room.save()

    # Retrieve all reservations and update room status based on each reservation
    reservations = Reservation.objects.all()
    for reservation in reservations:
        room = Room.objects.get(room_number=reservation.room_number)

        # Update room periods based on the reservation's periods
        if reservation.time1:
            room.time1 = True
        if reservation.time2:
            room.time2 = True
        if reservation.time3:
            room.time3 = True
        if reservation.time4:
            room.time4 = True
        if reservation.time5:
            room.time5 = True
        if reservation.time6:
            room.time6 = True
        if reservation.time7:
            room.time7 = True
        if reservation.time8:
            room.time8 = True
        if reservation.time9:
            room.time9 = True
        if reservation.time10:
            room.time10 = True
        if reservation.time11:
            room.time11 = True
        if reservation.time12:
            room.time12 = True
        if reservation.time13:
            room.time13 = True 

        room.save()  # Save changes for each room after updating periods

    return JsonResponse({"status": "Rooms updated based on reservations"})


@csrf_exempt
def reservation_room_view(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect("http://127.0.0.1:8000/")

    current_student_id = request.user.student_id

    if request.method == "DELETE":
        reservation_data = json.loads(request.body)  # Load JSON data

        room_number = reservation_data.get("room_number")
        student_ids = [
            reservation_data.get("student1"),
            reservation_data.get("student2"),
            reservation_data.get("student3"),
            reservation_data.get("student4"),
            reservation_data.get("student5"),
            reservation_data.get("student6"),
        ]
        print(student_ids)

        # Delete the reservation
        Reservation.objects.filter(
            Q(room_number=room_number)
            & Q(student1__contains=str(student_ids[0]))
            & Q(time1=reservation_data.get("time1"))
            & Q(time2=reservation_data.get("time2"))
            & Q(time3=reservation_data.get("time3"))
            & Q(time4=reservation_data.get("time4"))
            & Q(time5=reservation_data.get("time5"))
            & Q(time6=reservation_data.get("time6"))
            & Q(time7=reservation_data.get("time7"))
            & Q(time8=reservation_data.get("time8"))
            & Q(time9=reservation_data.get("time9"))
            & Q(time10=reservation_data.get("time10"))
            & Q(time11=reservation_data.get("time11"))
            & Q(time12=reservation_data.get("time12"))
            & Q(time13=reservation_data.get("time13"))
        ).delete()

        #debug console
        print(current_student_id)
        print("deleted reservation w/ detail:")
        print(student_ids)

        # Update room status
        update_room_status()

        return JsonResponse({"status": "canceled"})

    if request.method == "GET" and request.headers.get("type") == "retrieve":
        print("GET recieved")
        current_student_id = request.user.student_id
        print(current_student_id)

        # Retrieve the reservation details for the logged-in student
        student_reservation = Reservation.objects.filter(
            Q(student1__contains=str(current_student_id))
            | Q(student2__contains=str(current_student_id))
            | Q(student3__contains=str(current_student_id))
            | Q(student4__contains=str(current_student_id))
            | Q(student5__contains=str(current_student_id))
            | Q(student6__contains=str(current_student_id))
        ).first()

        # Fetch all room statuses
        rooms = Room.objects.all()
        room_status = {
            room.room_number: {
                "time1": room.time1,
                "time2": room.time2,
                "time3": room.time3,
                "time4": room.time4,
                "time5": room.time5,
                "time6": room.time6,
                "time7": room.time7,
                "time8": room.time8,
                "time9": room.time9,
                "time10": room.time10,
                "time11": room.time11,
                "time12": room.time12,
                "time13": room.time13,
            }
            for room in rooms
        }

        if student_reservation:
            student1 = student_reservation.student1
            student2 = student_reservation.student2
            student3 = student_reservation.student3
            student4 = student_reservation.student4
            student5 = student_reservation.student5
            student6 = student_reservation.student6
            data = {
                "status": "reserved",
                "room_number": student_reservation.room_number,
                "student1": student1,
                "student2": student2,
                "student3": student3,
                "student4": student4,
                "student5": student5,
                "student6": student6,
                "time1": student_reservation.time1,
                "time2": student_reservation.time2,
                "time3": student_reservation.time3,
                "time4": student_reservation.time4,
                "time5": student_reservation.time5,
                "time6": student_reservation.time6,
                "time7": student_reservation.time7,
                "time8": student_reservation.time8,
                "time9": student_reservation.time9,
                "time10": student_reservation.time10,
                "time11": student_reservation.time11,
                "time12": student_reservation.time12,
                "time13": student_reservation.time13,
                "room_status": room_status,  # Include room status in the response
            }
        else:
            data = {
                "status": "notreserved",
                "room_status": room_status,
            }  # No reservation found, but include room status

        return JsonResponse(data)

    if request.method == "POST":

        reservation_data = json.loads(request.body)

        room_number = int(reservation_data.get("room_number"))
        time1 = bool(reservation_data.get("time1"))
        time2 = bool(reservation_data.get("time2"))
        time3 = bool(reservation_data.get("time3"))
        time4 = bool(reservation_data.get("time4"))
        time5 = bool(reservation_data.get("time5"))
        time6 = bool(reservation_data.get("time6"))
        time7 = bool(reservation_data.get("time7"))
        time8 = bool(reservation_data.get("time8"))
        time9 = bool(reservation_data.get("time9"))
        time10 = bool(reservation_data.get("time10"))
        time11 = bool(reservation_data.get("time11"))
        time12 = bool(reservation_data.get("time12"))
        time13 = bool(reservation_data.get("time13"))
        student_ids = [
            reservation_data.get("student1"),
            reservation_data.get("student2"),
            reservation_data.get("student3"),
            reservation_data.get("student4"),
            reservation_data.get("student5"),
            reservation_data.get("student6"),
        ]

        # If the student already has a reservation, cancel it
        # Create new reservation
        Reservation.objects.create(
            student1=student_ids[0],
            student2=student_ids[1],
            student3=student_ids[2],
            student4=student_ids[3],
            student5=student_ids[4],
            student6=student_ids[5],
            time1=time1,
            time2=time2,
            time3=time3,
            time4=time4,
            time5=time5,
            time6=time6,
            time7=time7,
            time8=time8,
            time9=time9,
            time10=time10,
            time11=time11,
            time12=time12,
            time13=time13,
            room_number=room_number,
        )

        #debug console
        print(current_student_id)
        print("created reservation w/ detail:")
        print(student_ids)

        # Update room status
        update_room_status()

        return JsonResponse({"status": "reserved"})

    # Retrieve the reservation details for the logged-in student


    context = {}
    context["student_id"] = request.user.student_id  # student_id 추가

    return render(request, "reservation/reservation.html", context)