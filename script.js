// Error message constants
const ERROR_FULL_NAME_REQUIRED =
  "Full Name is required and should be at least 3 characters long.";
const ERROR_INVALID_EMAIL = "Please enter a valid email address.";
const ERROR_INVALID_PHONE = "Please enter a valid 10-digit phone number.";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/;

// Elements
let fullName = document.getElementById("fullname");
let email = document.getElementById("email");
let dob = document.getElementById("dob");
let phone = document.getElementById("phone");
let city = document.getElementById("city");
let country = document.getElementById("country");
let fullNameError = document.getElementsByClassName("fullname-error-msg");
let emailError = document.getElementsByClassName("email-error-msg");
let phoneError = document.getElementsByClassName("phone-error-msg");
const form = document.getElementsByClassName("form");
const submitBtn = document.getElementsByClassName("submit-btn");
// Event Listeners

fullName.addEventListener("blur", handleFullNameBlur);
email.addEventListener("blur", handleEmailBlur);
phone.addEventListener("blur", handlePhoneBlur);

fullName.addEventListener("input", validateForm);
email.addEventListener("input", validateForm);
phone.addEventListener("input", validateForm);

// Initial validation in case the form is pre-filled
validateForm();

// Initial contest data
let contestData = [
  {
    fullName: "Satyam Tripathi",
    email: "satyam123@gmail.com",
    gender: "Male",
    dob: "1998-11-21",
    phone: "0987654321",
    city: "Lucknow",
    country: "India",
  },
  {
    fullName: "Alex",
    email: "alex123@gmail.com",
    gender: "Male",
    dob: "1998-01-22",
    phone: "0927654321",
    city: "Paris",
    country: "USA",
  },
];

// Validate form on submit action
function validateForm() {
  const isFullNameValid = fullName.value.trim().length >= 3;
  const isEmailValid = emailPattern.test(email.value.trim());
  const isPhoneValid = phone.value.trim().length === 10;

  submitBtn[0].disabled = !(isFullNameValid && isEmailValid && isPhoneValid);
}

// Handle Full Name Validation
function handleFullNameBlur() {
  if (fullName.value.trim().length < 3) {
    fullNameError[0].textContent = ERROR_FULL_NAME_REQUIRED;
  } else {
    fullNameError[0].textContent = "";
  }
}

// Handle Email Validation
function handleEmailBlur() {
  if (!emailPattern.test(email.value.trim())) {
    emailError[0].textContent = ERROR_INVALID_EMAIL;
  } else {
    emailError[0].textContent = "";
  }
}

// Handle Phone Validation
function handlePhoneBlur() {
  if (phone.value.trim().length !== 10) {
    phoneError[0].textContent = ERROR_INVALID_PHONE;
  } else {
    phoneError[0].textContent = "";
  }
}

// Function to get the selected gender
function getSelectedGender() {
  const genderRadios = document.getElementsByName("Gender");
  // Iterate through the radio buttons
  for (let i = 0; i < genderRadios.length; i++) {
    // Check if the current radio button is checked
    if (genderRadios[i].checked) {
      // Return the value of the checked radio button
      return genderRadios[i].value;
    }
  }
  // Return null if no radio button is checked
  return null;
}

// Function to add data to the table
function addDataToTable() {
  // Get the table body (`<tbody>`) element
  const tableBody = document.getElementById("table-body");

  // Clear existing rows (if any) to prevent duplicates
  tableBody.innerHTML = "";

  // Iterate through the data array
  contestData.forEach((entry) => {
    // Create a row (`<tr>`) element
    const row = document.createElement("tr");

    // Create and append cell (`<td>`) elements for each data property
    Object.values(entry).forEach((value) => {
      // Create a cell (`<td>`) element
      const cell = document.createElement("td");

      // Set the cell's text content to the data value
      cell.textContent = value;

      // Append the cell to the row
      row.appendChild(cell);
    });

    // Create an action cell (`<td>`) for edit and delete buttons
    const actionCell = document.createElement("td");

    // Create the edit button
    const editButton = document.createElement("button");
    editButton.classList.add("icon-button");

    // Add an image icon to the edit button
    const editIcon = document.createElement("img");
    editIcon.src = "Images/edit-button.png"; // Replace with the path to your edit icon image
    editIcon.alt = "Edit"; // Provide alt text for accessibility
    editIcon.width = 16; // Adjust the size of the icon as needed
    editIcon.height = 16;
    editButton.appendChild(editIcon);

    // Add a click event listener to the edit button
    editButton.addEventListener("click", () => onEdit(entry));

    // Create the delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("icon-button");
    deleteButton.classList.add("margin-left");

    // Add an image icon to the delete button
    const deleteIcon = document.createElement("img");
    deleteIcon.src = "Images/delete.png"; // Replace with the path to your delete icon image
    deleteIcon.alt = "Delete"; // Provide alt text for accessibility
    deleteIcon.width = 16; // Adjust the size of the icon as needed
    deleteIcon.height = 16;
    deleteButton.appendChild(deleteIcon);

    // Add a click event listener to the delete button
    deleteButton.addEventListener("click", () => onDelete(entry));

    // Append the edit and delete buttons to the action cell
    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);

    // Append the action cell to the row
    row.appendChild(actionCell);

    // Append the row to the table body
    tableBody.appendChild(row);
  });
}

// Handle the submit button click
function onClickSubmit() {
  const personData = {
    fullName: fullName.value.trim(),
    email: email.value.trim(),
    gender: getSelectedGender() ? getSelectedGender() : "NA",
    dob: dob.value ? dob.value : "NA",
    phone: phone.value.trim(),
    city: city.value.trim() ? city.value.trim() : "NA",
    country: country.value,
  };
  const index = contestData.findIndex(
    (item) => item.email === email.value.trim()
  );

  if (index !== -1) {
    contestData[index] = personData;
  } else if (
    fullName.value.trim().length >= 3 &&
    emailPattern.test(email.value.trim()) &&
    phone.value.trim().length === 10
  ) {
    contestData.push(personData);
  }
  // Update the table with the new data
  addDataToTable();

  form[0].reset();
  validateForm();
}

// Handle the cancel button click
function onClickCancel() {
  form[0].reset();
  validateForm();
  fullNameError[0].textContent = "";
  emailError[0].textContent = "";
  phoneError[0].textContent = "";
}

// Handle the delete button click
function onDelete(entry) {
  // Display a browser alert asking the user to confirm the deletion
  const confirmation = confirm(
    "Are you sure you want to delete this context data?"
  );

  if (confirmation) {
    if (contestData.length === 1) {
      contestData = [];
    } else {
      // Find the index of the object to delete using findIndex()
      const indexToDelete = contestData.findIndex(
        (person) => person.email === entry.email
      );
      // Check if the object was found
      if (indexToDelete !== -1) {
        contestData.splice(indexToDelete, 1);
      }
    }
    addDataToTable(contestData);
  }
}

// Handle the edit button click
function onEdit(entry) {
  const maleRadioButton = document.getElementById("Male");
  const femaleRadioButton = document.getElementById("Female");

  fullName.value = entry.fullName;
  email.value = entry.email;
  if (entry.gender === "Male") {
    maleRadioButton.checked = true;
  } else if (entry.gender === "Female") {
    femaleRadioButton.checked = true;
  }
  dob.value = entry.dob;
  phone.value = entry.phone;
  city.value = entry.city ? entry.city : "";
  switch (entry.country) {
    case "India":
      country.selectedIndex = 0;
      break;
    case "USA":
      country.selectedIndex = 1;
      break;
    case "Singapore":
      country.selectedIndex = 2;
      break;
    case "UAE":
      country.selectedIndex = 3;
      break;
  }
  validateForm();
}
