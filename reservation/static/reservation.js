const form = document.getElementById("reservation-form");
const submitButton = document.getElementById("reserve");
const cancelButton = document.getElementById("cancel");
const roomSelect = document.getElementById("room");
const checkboxes = {
  time1: document.getElementById("time1"),
  time2: document.getElementById("time2"),
  time3: document.getElementById("time3"),
  time4: document.getElementById("time4"),
  time5: document.getElementById("time5"),
  time6: document.getElementById("time6"),
  time7: document.getElementById("time7"),
  time8: document.getElementById("time8"),
  time9: document.getElementById("time9"),
  time10: document.getElementById("time10"),
  time11: document.getElementById("time11"),
  time12: document.getElementById("time12"),
  time13: document.getElementById("time13"),
};
const studentInputs = [
  document.getElementById("student1"),
  document.getElementsByName("student2")[0],
  document.getElementsByName("student3")[0],
  document.getElementsByName("student4")[0],
  document.getElementsByName("student5")[0],
  document.getElementsByName("student6")[0],
];

const apiURL = "http://127.0.0.1:8000/reservation/";



const retrieveCurrentReservation = () => {
  fetch(apiURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      type: "retrieve",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch current reservation");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);

      if (data.status === "reserved") {
        // Populate form with reservation data
        roomSelect.value = data.room_number;
        studentInputs[0].value = data.student1;
        studentInputs[1].value = data.student2;
        studentInputs[2].value = data.student3;
        studentInputs[3].value = data.student4;
        studentInputs[4].value = data.student5;
        studentInputs[5].value = data.student6;
        checkboxes.time1.checked = data.time1;
        checkboxes.time2.checked = data.time2;
        checkboxes.time3.checked = data.time3;
        checkboxes.time4.checked = data.time4;
        checkboxes.time5.checked = data.time5;
        checkboxes.time6.checked = data.time6;
        checkboxes.time7.checked = data.time7;
        checkboxes.time8.checked = data.time8;
        checkboxes.time9.checked = data.time9;
        checkboxes.time10.checked = data.time10;
        checkboxes.time11.checked = data.time11;
        checkboxes.time12.checked = data.time12;
        checkboxes.time13.checked = data.time13;

        if (!checkboxes.time1.checked) checkboxes.time1.disabled = true;
        if (!checkboxes.time2.checked) checkboxes.time2.disabled = true;
        if (!checkboxes.time3.checked) checkboxes.time3.disabled = true;
        if (!checkboxes.time4.checked) checkboxes.time4.disabled = true;
        if (!checkboxes.time5.checked) checkboxes.time5.disabled = true;
        if (!checkboxes.time6.checked) checkboxes.time6.disabled = true;
        if (!checkboxes.time7.checked) checkboxes.time7.disabled = true;
        if (!checkboxes.time8.checked) checkboxes.time8.disabled = true;
        if (!checkboxes.time9.checked) checkboxes.time9.disabled = true;
        if (!checkboxes.time10.checked) checkboxes.time10.disabled = true;
        if (!checkboxes.time11.checked) checkboxes.time11.disabled = true;
        if (!checkboxes.time12.checked) checkboxes.time12.disabled = true;
        if (!checkboxes.time13.checked) checkboxes.time13.disabled = true;

        cancelButton.style.display = "block";
        submitButton.style.display = "none";

        studentInputs.forEach((input) => {
          input.readOnly = true;
        });

        const roomStatus = data.room_status;
        Object.keys(roomStatus).forEach((roomNumber) => {
          const roomTime = roomStatus[roomNumber];
          for (let time = 1; time <= 13; time++) {
            const timeElement = document.getElementById(
              `room-${roomNumber}-${time}`
            );
            timeElement.style.backgroundColor = roomTime[`time${time}`]
              ? "lightcoral"
              : "lightgreen";
          }
        });
        cancelButton.style.display = "block";
        submitButton.style.display = "none";
      } else {
        const roomStatus = data.room_status;
        Object.keys(roomStatus).forEach((roomNumber) => {
          const roomTime = roomStatus[roomNumber];
          for (let time = 1; time <= 3; time++) {
            const timeElement = document.getElementById(
              `room-${roomNumber}-${time}`
            );
            timeElement.style.backgroundColor = roomTime[`time${time}`]
              ? "lightcoral"
              : "lightgreen";
          }
        });
        cancelButton.style.display = "none";
        submitButton.style.display = "block";
      }
      updateCheckboxesForRoom(roomSelect.value, data.room_status);
    })
    .catch((error) => {
      console.error("Error in retrieveCurrentReservation:", error);
    });
};

roomSelect.addEventListener("change", (event) => {
  // Check if any of the time checkboxes have been modified
  if (checkboxes.time1.checked || checkboxes.time2.checked || checkboxes.time3.checked || checkboxes.time4.checked || checkboxes.time5.checked || checkboxes.time6.checked || checkboxes.time7.checked || checkboxes.time8.checked || checkboxes.time9.checked || checkboxes.time10.checked || checkboxes.time11.checked || checkboxes.time12.checked || checkboxes.time13.checked) {
    alert("You cannot change the room after selecting any time.");
    event.preventDefault(); // Prevents the change event
    roomSelect.value = roomSelect.dataset.previousValue; // Restore the previous value
  } else {
    roomSelect.dataset.previousValue = roomSelect.value; // Store the new value
  }
});

document.addEventListener("DOMContentLoaded", () => {
  retrieveCurrentReservation();
  roomSelect.dataset.previousValue = roomSelect.value; // Store initial room value
});


function updateCheckboxesForRoom(roomNumber, roomStatus) {
  const roomTime = roomStatus[roomNumber];
  console.log(roomTime);

  // Update checkboxes for room time
  checkboxes.time1.disabled = roomTime.time1;
  checkboxes.time2.disabled = roomTime.time2;
  checkboxes.time3.disabled = roomTime.time3;
  checkboxes.time4.disabled = roomTime.time4;
  checkboxes.time5.disabled = roomTime.time5;
  checkboxes.time6.disabled = roomTime.time6;
  checkboxes.time7.disabled = roomTime.time7;
  checkboxes.time8.disabled = roomTime.time8;
  checkboxes.time9.disabled = roomTime.time9;
  checkboxes.time10.disabled = roomTime.time10;
  checkboxes.time11.disabled = roomTime.time11;
  checkboxes.time12.disabled = roomTime.time12;
  checkboxes.time13.disabled = roomTime.time13;


  // Apply styles based on availability
  checkboxes.time1.style.opacity = roomTime.time1 ? "1" : "0.4";
  checkboxes.time2.style.opacity = roomTime.time2 ? "1" : "0.4";
  checkboxes.time3.style.opacity = roomTime.time3 ? "1" : "0.4";
  checkboxes.time4.style.opacity = roomTime.time4 ? "1" : "0.4";
  checkboxes.time5.style.opacity = roomTime.time5 ? "1" : "0.4";
  checkboxes.time6.style.opacity = roomTime.time6 ? "1" : "0.4";
  checkboxes.time7.style.opacity = roomTime.time7 ? "1" : "0.4";
  checkboxes.time8.style.opacity = roomTime.time8 ? "1" : "0.4";
  checkboxes.time9.style.opacity = roomTime.time9 ? "1" : "0.4";
  checkboxes.time10.style.opacity = roomTime.time10 ? "1" : "0.4";
  checkboxes.time11.style.opacity = roomTime.time11 ? "1" : "0.4";
  checkboxes.time12.style.opacity = roomTime.time12 ? "1" : "0.4";
  checkboxes.time13.style.opacity = roomTime.time13 ? "1" : "0.4";
}

function gatherFormData() {
  const formData = {
    room_number: parseInt(roomSelect.value),
    student1: studentInputs[0].value,
    student2: studentInputs[1].value,
    student3: studentInputs[2].value,
    student4: studentInputs[3].value,
    student5: studentInputs[4].value,
    student6: studentInputs[5].value,
    time1: checkboxes.time1.checked,
    time2: checkboxes.time2.checked,
    time3: checkboxes.time3.checked,
    time4: checkboxes.time4.checked,
    time5: checkboxes.time5.checked,
    time6: checkboxes.time6.checked,
    time7: checkboxes.time7.checked,
    time8: checkboxes.time8.checked,
    time9: checkboxes.time9.checked,
    time10: checkboxes.time10.checked,
    time11: checkboxes.time11.checked,
    time12: checkboxes.time12.checked,
    time13: checkboxes.time13.checked,
  };
  console.log("Form Data:", formData);
  return formData;
}

const makeReservation = async () => {
  const reservationData = gatherFormData();
  fetch(apiURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservationData),
  })
    .then((response) => {
      if (!response.ok) {
        // JSON으로 파싱 전에 에러 응답 메시지를 확인하고, 적절히 처리합니다.
        throw new Error(
          `Server error: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log("got response");
      if (data.status === "reserved") {
      } else {
        console.error("Error", data);
      }
    })
    .catch((error) => {
      console.error("Error", error);
    });
};

const deleteReservation = async () => {
  const reservationData = gatherFormData();
  fetch(apiURL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservationData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete reservation");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error deleting reservation:", error);
      throw error; // Re-throw the error if you want to handle it later
    });
};

submitButton.addEventListener("click", async () => {
  if (
    studentInputs[0].value &&
    Object.values(checkboxes).some((checkbox) => checkbox.checked)
  ) {
    // Check if the first student input is not empty
    await makeReservation(); // Ensure makeReservation is awaited
    alert("Successfully reserved");
    location.reload();
  } else {
    alert("Please fill in the form.");
  }
});
cancelButton.addEventListener("click", async () => {
  deleteReservation();
  alert("Successfully canceled");
  location.reload();
});

document.addEventListener("DOMContentLoaded", () => {
  retrieveCurrentReservation();

  roomSelect.addEventListener("change", async (event) => {
    retrieveCurrentReservation();
  });
});