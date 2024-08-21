document.getElementById('registrationForm').onsubmit = function(event) {
    event.preventDefault();

    const validUsername = validateUsername();
    const validEmail = validateEmail();
    const validPhoneNumber = validatePhoneNumber();
    const validZipCode = validateZipCode();
    const validGender = validateGender();
    const validOccupation = validateOccupation();
    const validCompany = validateCompany();
    const validCountry = validateCountry();
    const validState = validateState();
    const validDOB = validateDateOfBirth();
    const validImageupload = validateImageUpload();

    if (!validUsername || !validEmail || !validPhoneNumber || !validZipCode || !validGender
        || !validOccupation || !validCompany || !validCountry || !validState || !validDOB
        || !validImageupload)
    {
        return;
    }

    const rowId = document.getElementById('currentEditRow').value;
    if (rowId) {
        updateRow();
    } else {
        addToTable();
    }

    document.getElementById('registrationForm').reset();
    document.getElementById('imagePreview').style.display = 'none';
};

function addToTable() {
    const formData = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        zipcode: document.getElementById('zipcode').value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        occupation: document.getElementById('occupation').value,
        company: document.getElementById('company').value,
        country: document.getElementById('country').value,
        state: document.getElementById('state').value,
        dob: document.getElementById('dob').value,
        image: document.getElementById('imagePreview').src
    };

    const table = document.getElementById('dataTable');
    const newRow = table.insertRow();

    newRow.id = `row-${table.rows.length}`;

    newRow.insertCell(0).innerText = formData.username;
    newRow.insertCell(1).innerText = formData.email;
    newRow.insertCell(2).innerText = formData.phone; 
    newRow.insertCell(3).innerText = formData.zipcode;
    newRow.insertCell(4).innerText = formData.gender;
    newRow.insertCell(5).innerText = formData.occupation;
    newRow.insertCell(6).innerText = formData.company;
    newRow.insertCell(7).innerText = formData.country;
    newRow.insertCell(8).innerText = formData.state;
    newRow.insertCell(9).innerText = formData.dob;
    newRow.insertCell(10).innerHTML = `<img src="${formData.image}" style="width:50px; height:50px;">`;

    const editCell = newRow.insertCell(11);
    const deleteCell = newRow.insertCell(12);

    editCell.innerHTML = `<button onclick="editRow(this)">Edit</button>`;
    deleteCell.innerHTML = `<button onclick="deleteRow(this)">Delete</button>`;
}

function editRow(button) {
    const row = button.parentElement.parentElement;
    const cells = row.getElementsByTagName('td');

    document.getElementById('username').value = cells[0].innerText;
    document.getElementById('email').value = cells[1].innerText;
    document.getElementById('phone').value = cells[2].innerText;
    document.getElementById('zipcode').value = cells[3].innerText;
    document.querySelector(`input[name="gender"][value="${cells[4].innerText}"]`).checked = true;
    document.getElementById('occupation').value = cells[5].innerText;
    document.getElementById('company').value = cells[6].innerText;
    document.getElementById('country').value = cells[7].innerText;
    document.getElementById('state').value = cells[8].innerText;
    document.getElementById('dob').value = cells[9].innerText;
    document.getElementById('imagePreview').src = cells[10].querySelector('img').src;
    document.getElementById('imagePreview').style.display = 'block';

    document.getElementById('currentEditRow').value = row.id;
}

function deleteRow(button) {
    const row = button.parentElement.parentElement;
    row.remove();
}

function updateRow() {
    const rowId = document.getElementById('currentEditRow').value;
    const row = document.getElementById(rowId);

    if (!row) {
        console.error(`No row found with ID: ${rowId}`);
        return;
    }

    const cells = row.getElementsByTagName('td');

    cells[0].innerText = document.getElementById('username').value;
    cells[1].innerText = document.getElementById('email').value;
    cells[2].innerText = document.getElementById('phone').value;
    cells[3].innerText = document.getElementById('zipcode').value;
    cells[4].innerText = document.querySelector('input[name="gender"]:checked').value;
    cells[5].innerText = document.getElementById('occupation').value;
    cells[6].innerText = document.getElementById('company').value;
    cells[7].innerText = document.getElementById('country').value;
    cells[8].innerText = document.getElementById('state').value;
    cells[9].innerText = document.getElementById('dob').value;
    cells[10].innerHTML = `<img src="${document.getElementById('imagePreview').src}" style="width:50px; height:50px;">`;
}

function validateUsername() {
    const username = document.getElementById("username").value;
    const wrongUsername = /^[a-zA-Z\s]+$/;
    const element = document.getElementById("usernameError");
    if (username.trim() === '') {
        element.style.display = "block";
        element.innerText = "Username is required";
        return false;
    } else if (!wrongUsername.test(username)) {
        element.style.display = "block";
        element.innerText = "Username should not contain numbers or special characters";
        return false;
    } else {
        element.innerText = '';
        element.style.display = "none";
        return true;
    }
}

function validateEmail() {
    const email = document.getElementById("email").value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const element = document.getElementById("emailError");
    if (email.trim() === '') {
        element.style.display = "block";
        element.innerText = "Email is required";
        return false;
    } else if (!emailPattern.test(email)) {
        element.style.display = "block";
        element.innerText = "Invalid email address";
        return false;
    } else {
        element.innerText = '';
        element.style.display = "none";
        return true;
    }
}

function validateZipCode() {
    const zipcode = document.getElementById("zipcode").value;
    const zipPattern = /^\d{5,6}$/;
    const element = document.getElementById("zipError");
    if (zipcode.trim() === '') {
        element.style.display = "block";
        element.innerText = "Zipcode is required";
        return false;
    } else if (!zipPattern.test(zipcode)) {
        element.style.display = "block";
        element.innerText = "Invalid zipcode";
        return false;
    } else {
        element.innerText = '';
        element.style.display = "none";
        return true;
    }
}

function validateGender() {
    const gender = document.querySelector('input[name="gender"]:checked');
    const element = document.getElementById("genderError");
    if (!gender) {
        element.style.display = "block";
        element.innerText = "Gender is required";
        return false;
    } else {
        element.innerText = '';
        element.style.display = "none";
        return true;
    }
}

function validateOccupation() {
    const occupation = document.getElementById("occupation").value;
    const occupationPattern = /^[a-zA-Z\s]+$/;
    const element = document.getElementById("occupationError");

    if (occupation.trim() === '') {
        element.style.display = "block";
        element.innerText = "Occupation is required";
        return false;
    } 
    else if (!occupationPattern.test(occupation)) {
        element.style.display = "block";
        element.innerText = "Check Occupation";
        return false;
    } 
    else {
        element.innerText = '';
        element.style.display = "none";
        return true;
    }
}

function validateCompany() {
    const company = document.getElementById("company").value;
    const companyPattern = /^[a-zA-Z0-9\s]+$/;
    const element = document.getElementById("companyError");

    if (company.trim() === '') {
        element.style.display = "block";
        element.innerText = "Company name is required";
        return false;
    } 
    else if (!companyPattern.test(company)) {
        element.style.display = "block";
        element.innerText = "Company name should contain only letters, numbers, and spaces";
        return false;
    } 
    else {
        element.innerText = '';
        element.style.display = "none";
        return true;
    }
}

function validatePhoneNumber() {
    const phoneNumber = document.getElementById("phone").value;
    const checkPhoneNumber = /^\d+$/;
    const phoneElement = document.getElementById("phoneError");

    if (phoneNumber.trim() === '') {
        phoneElement.style.display = "block";
        phoneElement.innerText = "Phone number is required";
        return false;
    } 
    else if (!checkPhoneNumber.test(phoneNumber)) {
        phoneElement.style.display = "block";
        phoneElement.innerText = "Phone number should contain only digits";
        return false;
    } 
    else if (phoneNumber.length > 10) {
        phoneElement.style.display = "block";
        phoneElement.innerText = "Phone number should not be more than 10 digits";
        return false;
    } 
    else {
        phoneElement.style.display = "none";
        phoneElement.innerText = '';
        return true;
    }
}

function validateCountry() {
    const country = document.getElementById("country").value;
    const countryPattern = /^[a-zA-Z\s]+$/;
    const element = document.getElementById("countryError");

    if (country.trim() === '') {
        element.style.display = "block";
        element.innerText = "Country is required";
        return false;
    } 
    else if (!countryPattern.test(country)) {
        element.style.display = "block";
        element.innerText = "Country should contain only letters and spaces";
        return false;
    } 
    else {
        element.innerText = '';
        element.style.display = "none";
        return true;
    }
}

function validateState() {
    const state = document.getElementById("state").value;
    const statePattern = /^[a-zA-Z\s]+$/;
    const element = document.getElementById("stateError");

    if (state.trim() === '') {
        element.style.display = "block";
        element.innerText = "State is required";
        return false;
    } 
    else if (!statePattern.test(state)) {
        element.style.display = "block";
        element.innerText = "State should contain only letters and spaces";
        return false;
    } 
    else {
        element.innerText = '';
        element.style.display = "none";
        return true;
    }

}

function validateDateOfBirth(){
    const dateOfBirth = document.getElementById("dob").value;
    const checkdateOfBirth = document.getElementById("dateOfError");
    if(dateOfBirth.trim() === ''){
        checkdateOfBirth.style.display = "block";
        checkdateOfBirth.innerText = "DOB is Required";
        return false;
    }
    else{
        checkdateOfBirth.style.display = "none";
        checkdateOfBirth.innerText = '';
        return true;
    }
}

function validateImageUpload(){
    const imageupload = document.getElementById("imageUpload").value;
    const imageuploadelement = document.getElementById("imageUploadError");
    if(imageupload.trim() === ''){
        imageuploadelement.style.display = "block";
        imageuploadelement.innerText = "Image is Required";
        return false;
    }
    else{
        imageuploadelement.style.display = "none";
        imageuploadelement.innerText = '';
        return true;
    }
}

function previewImage(event) {
    const file = event.target.files[0];
    const preview = document.getElementById("imagePreview");
    const reader = new FileReader();

    reader.onload = function() {
        preview.src = reader.result;
        preview.style.display = "block";
    };

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
        preview.style.display = "none";
    }
}

