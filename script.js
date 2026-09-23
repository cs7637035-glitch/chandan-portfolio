// ======================================================
// STUDENT MANAGEMENT SYSTEM
// COMPLETE FIXED SCRIPT.JS
// ======================================================


// ======================================================
// MAIN ELEMENTS
// ======================================================

const openModalBtn =
    document.getElementById("openModalBtn");

const studentModal =
    document.getElementById("studentModal");

const closeModalBtn =
    document.getElementById("closeModalBtn");

const cancelModalBtn =
    document.getElementById("cancelModalBtn");

const studentForm =
    document.getElementById("studentForm");

const studentTable =
    document.getElementById("studentTable");

const searchStudent =
    document.getElementById("searchStudent");

const noResults =
    document.getElementById("noResults");

const totalStudents =
    document.getElementById("totalStudents");


// ======================================================
// EDIT STUDENT ELEMENTS
// ======================================================

const editStudentModal =
    document.getElementById("editStudentModal");

const closeEditModalBtn =
    document.getElementById("closeEditModalBtn");

const cancelEditModalBtn =
    document.getElementById("cancelEditModalBtn");

const editStudentForm =
    document.getElementById("editStudentForm");

let editingRow = null;


// ======================================================
// ADMIN ELEMENTS
// ======================================================

const adminProfile =
    document.getElementById("adminProfile");

const adminMenu =
    document.getElementById("adminMenu");

const settingsBtn =
    document.getElementById("settingsBtn");

const changePasswordBtn =
    document.getElementById("changePasswordBtn");

const themeBtn =
    document.getElementById("themeBtn");

const logoutBtn =
    document.getElementById("logoutBtn");

const adminSettingsPanel =
    document.getElementById("adminSettingsPanel");

const closeAdminSettings =
    document.getElementById("closeAdminSettings");

const editAdminProfileBtn =
    document.getElementById("editAdminProfileBtn");

const adminEditForm =
    document.getElementById("adminEditForm");

const saveAdminProfile =
    document.getElementById("saveAdminProfile");

const adminName =
    document.getElementById("adminName");

const adminEmail =
    document.getElementById("adminEmail");


// ======================================================
// LOCAL STORAGE KEYS
// ======================================================

const STORAGE_KEY =
    "studentManagementData";

const ADMIN_NAME_KEY =
    "adminName";

const ADMIN_EMAIL_KEY =
    "adminEmail";

const ADMIN_PASSWORD_KEY =
    "adminPassword";

const ADMIN_THEME_KEY =
    "adminTheme";


// ======================================================
// OPEN ADD STUDENT MODAL
// ======================================================

if (openModalBtn) {

    openModalBtn.addEventListener(
        "click",
        function () {

            if (studentModal) {

                studentModal.classList.add("show");

            }

        }
    );

}


// ======================================================
// CLOSE ADD STUDENT MODAL
// ======================================================

function closeStudentModal() {

    if (studentModal) {

        studentModal.classList.remove("show");

    }

    if (studentForm) {

        studentForm.reset();

    }

}


if (closeModalBtn) {

    closeModalBtn.addEventListener(
        "click",
        closeStudentModal
    );

}


if (cancelModalBtn) {

    cancelModalBtn.addEventListener(
        "click",
        closeStudentModal
    );

}


// ======================================================
// GENERATE STUDENT ID
// ======================================================

function generateStudentId() {

    if (!studentTable) {

        return "ST001";

    }


    const rows =
        studentTable.querySelectorAll("tr");

    let highestNumber = 0;


    rows.forEach(function (row) {

        const idCell =
            row.children[0];

        if (!idCell) {

            return;

        }


        const id =
            idCell.textContent.trim();

        const number =
            parseInt(
                id.replace("ST", "")
            );


        if (
            !isNaN(number) &&
            number > highestNumber
        ) {

            highestNumber = number;

        }

    });


    return (
        "ST" +
        String(highestNumber + 1)
            .padStart(3, "0")
    );

}


// ======================================================
// UPDATE TOTAL STUDENTS
// ======================================================

function updateStudentCount() {

    if (!studentTable || !totalStudents) {

        return;

    }


    const rows =
        studentTable.querySelectorAll("tr");


    let count = 0;


    rows.forEach(function (row) {

        if (row.children.length >= 8) {

            count++;

        }

    });


    totalStudents.textContent =
        count;

}


// ======================================================
// GET STUDENTS FROM TABLE
// ======================================================

function getStudentsFromTable() {

    if (!studentTable) {

        return [];

    }


    const rows =
        studentTable.querySelectorAll("tr");

    const students = [];


    rows.forEach(function (row) {

        if (row.children.length < 9) {

            return;

        }


        const nameElement =
            row.children[1]
                ?.querySelector(
                    ".student-name-text"
                );


        if (!nameElement) {

            return;

        }


        students.push({

            id:
                row.children[0]
                    .textContent
                    .trim(),

            name:
                nameElement
                    .textContent
                    .trim(),

            email:
                row.children[2]
                    .textContent
                    .trim(),

            phone:
                row.children[3]
                    .textContent
                    .trim(),

            course:
                row.children[4]
                    .textContent
                    .trim(),

            year:
                row.children[5]
                    .textContent
                    .trim(),

            attendance:
                row.children[6]
                    .textContent
                    .replace("%", "")
                    .trim(),

            status:
                row.children[7]
                    .textContent
                    .trim() || "Active"

        });

    });


    return students;

}


// ======================================================
// SAVE STUDENTS
// ======================================================

function saveStudents() {

    const students =
        getStudentsFromTable();


    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(students)
    );

}


// ======================================================
// CREATE STUDENT ROW
// ======================================================

function createStudentRow(student) {

    const row =
        document.createElement("tr");


    row.innerHTML = `

        <td>
            ${escapeHTML(student.id)}
        </td>

        <td>

            <div class="student-name">

                <div class="student-avatar">
                    ${escapeHTML(
                        student.name
                            .charAt(0)
                            .toUpperCase()
                    )}
                </div>

                <span class="student-name-text">
                    ${escapeHTML(student.name)}
                </span>

            </div>

        </td>

        <td>
            ${escapeHTML(student.email)}
        </td>

        <td>
            ${escapeHTML(student.phone)}
        </td>

        <td>
            ${escapeHTML(student.course)}
        </td>

        <td>
            ${escapeHTML(student.year)}
        </td>

        <td>
            ${escapeHTML(student.attendance)}%
        </td>

        <td>

            <span class="status active-status">
                ${escapeHTML(student.status || "Active")}
            </span>

        </td>

        <td>

            <button
                class="edit-btn"
                type="button">
                Edit
            </button>

            <button
                class="delete-btn"
                type="button">
                Delete
            </button>

        </td>

    `;


    return row;

}


// ======================================================
// LOAD STUDENTS
// ======================================================

function loadStudents() {

    if (!studentTable) {

        return;

    }


    const savedStudents =
        localStorage.getItem(
            STORAGE_KEY
        );


    studentTable.innerHTML = "";


    if (!savedStudents) {

        updateStudentCount();

        return;

    }


    try {

        const students =
            JSON.parse(savedStudents);


        if (!Array.isArray(students)) {

            updateStudentCount();

            return;

        }


        students.forEach(function (student) {

            const row =
                createStudentRow(student);

            studentTable.appendChild(row);

        });


        updateStudentCount();

    }

    catch (error) {

        console.error(
            "LocalStorage error:",
            error
        );

    }

}


// ======================================================
// ADD STUDENT
// ======================================================

if (studentForm) {

    studentForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const nameElement =
                document.getElementById(
                    "studentName"
                );

            const emailElement =
                document.getElementById(
                    "studentEmail"
                );

            const phoneElement =
                document.getElementById(
                    "studentPhone"
                );

            const courseElement =
                document.getElementById(
                    "studentCourse"
                );

            const yearElement =
                document.getElementById(
                    "studentYear"
                );

            const attendanceElement =
                document.getElementById(
                    "studentAttendance"
                );


            if (
                !nameElement ||
                !emailElement ||
                !phoneElement ||
                !courseElement ||
                !yearElement ||
                !attendanceElement
            ) {

                alert(
                    "Student form fields not found."
                );

                return;

            }


            const name =
                nameElement.value.trim();

            const email =
                emailElement.value.trim();

            const phone =
                phoneElement.value.trim();

            const course =
                courseElement.value.trim();

            const year =
                yearElement.value.trim();

            const attendance =
                attendanceElement.value.trim();


            if (
                !name ||
                !email ||
                !phone ||
                !course ||
                !year ||
                !attendance
            ) {

                alert(
                    "Please fill all student details."
                );

                return;

            }


            const attendanceNumber =
                Number(attendance);


            if (
                isNaN(attendanceNumber) ||
                attendanceNumber < 0 ||
                attendanceNumber > 100
            ) {

                alert(
                    "Attendance must be between 0 and 100."
                );

                return;

            }


            const student = {

                id:
                    generateStudentId(),

                name:
                    name,

                email:
                    email,

                phone:
                    phone,

                course:
                    course,

                year:
                    year,

                attendance:
                    attendanceNumber,

                status:
                    "Active"

            };


            const row =
                createStudentRow(student);


            if (studentTable) {

                studentTable.appendChild(row);

            }


            saveStudents();

            updateStudentCount();

            updateAttendanceSection();

            updateCourseCounts();

            updateReports();

            closeStudentModal();


            alert(
                "Student added successfully!"
            );

        }
    );

}


// ======================================================
// SEARCH STUDENT
// ======================================================

if (searchStudent) {

    searchStudent.addEventListener(
        "input",
        function () {

            if (!studentTable) {

                return;

            }


            const searchValue =
                searchStudent.value
                    .toLowerCase()
                    .trim();


            const rows =
                studentTable.querySelectorAll("tr");


            let foundStudent = false;


            rows.forEach(function (row) {

                const nameElement =
                    row.children[1]
                        ?.querySelector(
                            ".student-name-text"
                        );


                if (!nameElement) {

                    return;

                }


                const studentName =
                    nameElement
                        .textContent
                        .toLowerCase()
                        .trim();


                const studentEmail =
                    row.children[2]
                        ?.textContent
                        .toLowerCase()
                        .trim() || "";


                const studentPhone =
                    row.children[3]
                        ?.textContent
                        .toLowerCase()
                        .trim() || "";


                const studentCourse =
                    row.children[4]
                        ?.textContent
                        .toLowerCase()
                        .trim() || "";


                const matches =
                    studentName.includes(searchValue) ||
                    studentEmail.includes(searchValue) ||
                    studentPhone.includes(searchValue) ||
                    studentCourse.includes(searchValue);


                if (matches) {

                    row.style.display = "";

                    foundStudent = true;

                }

                else {

                    row.style.display = "none";

                }

            });


            if (
                searchValue !== "" &&
                !foundStudent
            ) {

                if (noResults) {

                    noResults.style.display =
                        "block";

                }

            }

            else {

                if (noResults) {

                    noResults.style.display =
                        "none";

                }

            }

        }
    );

}


// ======================================================
// EDIT STUDENT - OPEN MODAL
// ======================================================

if (studentTable) {

    studentTable.addEventListener(
        "click",
        function (event) {

            if (
                !event.target.classList
                    .contains("edit-btn")
            ) {

                return;

            }


            editingRow =
                event.target.closest("tr");


            if (!editingRow) {

                return;

            }


            const name =
                editingRow.children[1]
                    .querySelector(
                        ".student-name-text"
                    )
                    .textContent
                    .trim();


            const email =
                editingRow.children[2]
                    .textContent
                    .trim();


            const phone =
                editingRow.children[3]
                    .textContent
                    .trim();


            const course =
                editingRow.children[4]
                    .textContent
                    .trim();


            const year =
                editingRow.children[5]
                    .textContent
                    .trim();


            const attendance =
                editingRow.children[6]
                    .textContent
                    .replace("%", "")
                    .trim();


            const editName =
                document.getElementById(
                    "editStudentName"
                );

            const editEmail =
                document.getElementById(
                    "editStudentEmail"
                );

            const editPhone =
                document.getElementById(
                    "editStudentPhone"
                );

            const editCourse =
                document.getElementById(
                    "editStudentCourse"
                );

            const editYear =
                document.getElementById(
                    "editStudentYear"
                );

            const editAttendance =
                document.getElementById(
                    "editStudentAttendance"
                );


            if (editName) {
                editName.value = name;
            }

            if (editEmail) {
                editEmail.value = email;
            }

            if (editPhone) {
                editPhone.value = phone;
            }

            if (editCourse) {
                editCourse.value = course;
            }

            if (editYear) {
                editYear.value = year;
            }

            if (editAttendance) {
                editAttendance.value = attendance;
            }


            if (editStudentModal) {

                editStudentModal.classList.add(
                    "show"
                );

            }

        }
    );

}


// ======================================================
// CLOSE EDIT MODAL
// ======================================================

function closeEditModal() {

    if (editStudentModal) {

        editStudentModal.classList.remove(
            "show"
        );

    }


    if (editStudentForm) {

        editStudentForm.reset();

    }


    editingRow = null;

}


if (closeEditModalBtn) {

    closeEditModalBtn.addEventListener(
        "click",
        closeEditModal
    );

}


if (cancelEditModalBtn) {

    cancelEditModalBtn.addEventListener(
        "click",
        closeEditModal
    );

}


// ======================================================
// SAVE EDITED STUDENT
// ======================================================

if (editStudentForm) {

    editStudentForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            if (!editingRow) {

                return;

            }


            const editName =
                document.getElementById(
                    "editStudentName"
                );

            const editEmail =
                document.getElementById(
                    "editStudentEmail"
                );

            const editPhone =
                document.getElementById(
                    "editStudentPhone"
                );

            const editCourse =
                document.getElementById(
                    "editStudentCourse"
                );

            const editYear =
                document.getElementById(
                    "editStudentYear"
                );

            const editAttendance =
                document.getElementById(
                    "editStudentAttendance"
                );


            const name =
                editName?.value.trim() || "";

            const email =
                editEmail?.value.trim() || "";

            const phone =
                editPhone?.value.trim() || "";

            const course =
                editCourse?.value.trim() || "";

            const year =
                editYear?.value.trim() || "";

            const attendance =
                editAttendance?.value.trim() || "";


            if (
                !name ||
                !email ||
                !phone ||
                !course ||
                !year ||
                !attendance
            ) {

                alert(
                    "Please fill all student details."
                );

                return;

            }


            const attendanceNumber =
                Number(attendance);


            if (
                isNaN(attendanceNumber) ||
                attendanceNumber < 0 ||
                attendanceNumber > 100
            ) {

                alert(
                    "Attendance must be between 0 and 100."
                );

                return;

            }


            const nameContainer =
                editingRow.children[1]
                    .querySelector(
                        ".student-name"
                    );


            if (nameContainer) {

                nameContainer.innerHTML = `

                    <div class="student-avatar">
                        ${escapeHTML(
                            name
                                .charAt(0)
                                .toUpperCase()
                        )}
                    </div>

                    <span class="student-name-text">
                        ${escapeHTML(name)}
                    </span>

                `;

            }


            editingRow.children[2]
                .textContent = email;

            editingRow.children[3]
                .textContent = phone;

            editingRow.children[4]
                .textContent = course;

            editingRow.children[5]
                .textContent = year;

            editingRow.children[6]
                .textContent =
                attendanceNumber + "%";


            saveStudents();

            updateStudentCount();

            updateAttendanceSection();

            updateCourseCounts();

            updateReports();

            closeEditModal();


            alert(
                "Student details updated successfully!"
            );

        }
    );

}


// ======================================================
// DELETE STUDENT
// ======================================================

if (studentTable) {

    studentTable.addEventListener(
        "click",
        function (event) {

            if (
                !event.target.classList
                    .contains("delete-btn")
            ) {

                return;

            }


            const row =
                event.target.closest("tr");


            if (!row) {

                return;

            }


            const nameElement =
                row.children[1]
                    ?.querySelector(
                        ".student-name-text"
                    );


            const studentName =
                nameElement
                    ? nameElement.textContent.trim()
                    : "this student";


            const confirmDelete =
                confirm(
                    "Delete " +
                    studentName +
                    "?"
                );


            if (!confirmDelete) {

                return;

            }


            row.remove();

            saveStudents();

            updateStudentCount();

            updateAttendanceSection();

            updateCourseCounts();

            updateReports();


            alert(
                "Student deleted successfully!"
            );

        }
    );

}


// ======================================================
// DYNAMIC ATTENDANCE
// ======================================================

function updateAttendanceSection() {

    const attendanceGrid =
        document.getElementById(
            "attendanceGrid"
        );


    if (
        !attendanceGrid ||
        !studentTable
    ) {

        return;

    }


    const rows =
        studentTable.querySelectorAll("tr");


    attendanceGrid.innerHTML = "";


    rows.forEach(function (row) {

        if (row.children.length < 8) {

            return;

        }


        const nameElement =
            row.children[1]
                ?.querySelector(
                    ".student-name-text"
                );


        if (!nameElement) {

            return;

        }


        const studentName =
            nameElement.textContent.trim();


        const attendance =
            parseFloat(
                row.children[6]
                    .textContent
                    .replace("%", "")
                    .trim()
            ) || 0;


        let message;


        if (attendance >= 90) {

            message =
                "Excellent attendance";

        }

        else if (attendance >= 75) {

            message =
                "Good attendance";

        }

        else {

            message =
                "⚠ Low attendance";

        }


        const card =
            document.createElement("div");


        card.className =
            "attendance-card";


        card.innerHTML = `

            <div class="attendance-top">

                <strong>
                    ${escapeHTML(studentName)}
                </strong>

                <span>
                    ${attendance}%
                </span>

            </div>

            <div class="progress">

                <div
                    class="progress-bar"
                    style="width:${attendance}%">
                </div>

            </div>

            <small>
                ${message}
            </small>

        `;


        attendanceGrid.appendChild(card);

    });

}


// ======================================================
// DYNAMIC COURSE COUNTS
// ======================================================

function updateCourseCounts() {

    if (!studentTable) {

        return;

    }


    const rows =
        studentTable.querySelectorAll("tr");


    let bca = 0;
    let mca = 0;
    let bba = 0;


    rows.forEach(function (row) {

        if (row.children.length < 8) {

            return;

        }


        const course =
            row.children[4]
                .textContent
                .trim()
                .toUpperCase();


        if (course === "BCA") {

            bca++;

        }

        else if (course === "MCA") {

            mca++;

        }

        else if (course === "BBA") {

            bba++;

        }

    });


    const bcaCount =
        document.getElementById(
            "bcaCount"
        );

    const mcaCount =
        document.getElementById(
            "mcaCount"
        );

    const bbaCount =
        document.getElementById(
            "bbaCount"
        );


    if (bcaCount) {

        bcaCount.textContent =
            bca;

    }


    if (mcaCount) {

        mcaCount.textContent =
            mca;

    }


    if (bbaCount) {

        bbaCount.textContent =
            bba;

    }

}


// ======================================================
// DYNAMIC REPORTS
// ======================================================

function updateReports() {

    if (!studentTable) {

        return;

    }


    const rows =
        studentTable.querySelectorAll("tr");


    let total = 0;

    let totalAttendance = 0;

    let active = 0;

    let lowAttendance = 0;


    rows.forEach(function (row) {

        if (row.children.length < 8) {

            return;

        }


        total++;


        const attendance =
            parseFloat(
                row.children[6]
                    .textContent
                    .replace("%", "")
                    .trim()
            ) || 0;


        totalAttendance +=
            attendance;


        const status =
            row.children[7]
                .textContent
                .trim()
                .toLowerCase();


        if (
            status.includes("active")
        ) {

            active++;

        }


        if (
            attendance < 75
        ) {

            lowAttendance++;

        }

    });


    let averageAttendance = 0;


    if (total > 0) {

        averageAttendance =
            Math.round(
                totalAttendance / total
            );

    }


    const reportTotalStudents =
        document.getElementById(
            "reportTotalStudents"
        );

    const reportAverageAttendance =
        document.getElementById(
            "reportAverageAttendance"
        );

    const reportActiveStudents =
        document.getElementById(
            "reportActiveStudents"
        );

    const reportLowAttendance =
        document.getElementById(
            "reportLowAttendance"
        );


    if (reportTotalStudents) {

        reportTotalStudents.textContent =
            total;

    }


    if (reportAverageAttendance) {

        reportAverageAttendance.textContent =
            averageAttendance + "%";

    }


    if (reportActiveStudents) {

        reportActiveStudents.textContent =
            active;

    }


    if (reportLowAttendance) {

        reportLowAttendance.textContent =
            lowAttendance;

    }

}


// ======================================================
// SIDEBAR ACTIVE LINK
// ======================================================

const navLinks =
    document.querySelectorAll(
        ".sidebar nav a"
    );


navLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        function () {

            navLinks.forEach(
                function (item) {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            this.classList.add(
                "active"
            );

        }
    );

});


// ======================================================
// ADMIN PROFILE DROPDOWN
// ======================================================

if (adminProfile && adminMenu) {

    adminProfile.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            adminMenu.classList.toggle(
                "show"
            );


            adminProfile.classList.toggle(
                "active"
            );

        }
    );

}


// ======================================================
// ADMIN SETTINGS OPEN
// ======================================================

if (
    settingsBtn &&
    adminSettingsPanel
) {

    settingsBtn.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            adminSettingsPanel.classList.add(
                "show"
            );


            if (adminMenu) {

                adminMenu.classList.remove(
                    "show"
                );

            }


            if (adminProfile) {

                adminProfile.classList.remove(
                    "active"
                );

            }

        }
    );

}


// ======================================================
// CLOSE ADMIN SETTINGS
// ======================================================

if (closeAdminSettings) {

    closeAdminSettings.addEventListener(
        "click",
        function () {

            if (adminSettingsPanel) {

                adminSettingsPanel.classList.remove(
                    "show"
                );

            }

        }
    );

}


// ======================================================
// ADMIN SETTINGS OUTSIDE CLICK
// ======================================================

if (adminSettingsPanel) {

    adminSettingsPanel.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                adminSettingsPanel
            ) {

                adminSettingsPanel.classList.remove(
                    "show"
                );

            }

        }
    );

}


// ======================================================
// LOAD ADMIN PROFILE
// ======================================================

function loadAdminProfile() {

    const savedName =
        localStorage.getItem(
            ADMIN_NAME_KEY
        );


    const savedEmail =
        localStorage.getItem(
            ADMIN_EMAIL_KEY
        );


    const finalName =
        savedName || "Administrator";


    const finalEmail =
        savedEmail || "admin@gmail.com";


    if (adminName) {

        adminName.value =
            finalName;

    }


    if (adminEmail) {

        adminEmail.value =
            finalEmail;

    }


    const adminStrong =
        document.querySelector(
            ".admin-info strong"
        );


    const adminSmall =
        document.querySelector(
            ".admin-info small"
        );


    if (adminStrong) {

        adminStrong.textContent =
            finalName;

    }


    if (adminSmall) {

        adminSmall.textContent =
            finalEmail;

    }


    // Create default profile only once

    if (!savedName) {

        localStorage.setItem(
            ADMIN_NAME_KEY,
            finalName
        );

    }


    if (!savedEmail) {

        localStorage.setItem(
            ADMIN_EMAIL_KEY,
            finalEmail
        );

    }

}


// ======================================================
// EDIT ADMIN PROFILE
// ======================================================

if (editAdminProfileBtn) {

    editAdminProfileBtn.addEventListener(
        "click",
        function () {

            loadAdminProfile();


            if (adminEditForm) {

                adminEditForm.classList.toggle(
                    "show"
                );

            }

        }
    );

}


// ======================================================
// SAVE ADMIN PROFILE
// ======================================================

if (saveAdminProfile) {

    saveAdminProfile.addEventListener(
        "click",
        function () {

            const name =
                adminName
                    ? adminName.value.trim()
                    : "";


            const email =
                adminEmail
                    ? adminEmail.value.trim()
                    : "";


            if (!name) {

                alert(
                    "Please enter Admin Name."
                );

                return;

            }


            if (!email) {

                alert(
                    "Please enter Admin Email."
                );

                return;

            }


            localStorage.setItem(
                ADMIN_NAME_KEY,
                name
            );


            localStorage.setItem(
                ADMIN_EMAIL_KEY,
                email
            );


            const adminStrong =
                document.querySelector(
                    ".admin-info strong"
                );


            const adminSmall =
                document.querySelector(
                    ".admin-info small"
                );


            if (adminStrong) {

                adminStrong.textContent =
                    name;

            }


            if (adminSmall) {

                adminSmall.textContent =
                    email;

            }


            if (adminEditForm) {

                adminEditForm.classList.remove(
                    "show"
                );

            }


            alert(
                "✅ Admin profile saved permanently!"
            );

        }
    );

}


// ======================================================
// CHANGE PASSWORD
// ======================================================

if (changePasswordBtn) {

    changePasswordBtn.addEventListener(
        "click",
        function () {

            const currentPassword =
                localStorage.getItem(
                    ADMIN_PASSWORD_KEY
                );


            /*
             First time:
             Default password = admin123
            */

            const actualPassword =
                currentPassword || "admin123";


            const oldPassword =
                prompt(
                    "Enter current password:"
                );


            if (oldPassword === null) {

                return;

            }


            if (
                oldPassword !==
                actualPassword
            ) {

                alert(
                    "❌ Current password is incorrect."
                );

                return;

            }


            const newPassword =
                prompt(
                    "Enter your new password:"
                );


            if (newPassword === null) {

                return;

            }


            if (
                newPassword.trim() === ""
            ) {

                alert(
                    "Password cannot be empty."
                );

                return;

            }


            if (
                newPassword.length < 6
            ) {

                alert(
                    "Password must be at least 6 characters."
                );

                return;

            }


            const confirmPassword =
                prompt(
                    "Confirm your new password:"
                );


            if (confirmPassword === null) {

                return;

            }


            if (
                newPassword !==
                confirmPassword
            ) {

                alert(
                    "❌ Passwords do not match."
                );

                return;

            }


            localStorage.setItem(
                ADMIN_PASSWORD_KEY,
                newPassword
            );


            alert(
                "🔐 Password changed successfully!"
            );


            if (adminMenu) {

                adminMenu.classList.remove(
                    "show"
                );

            }


            if (adminProfile) {

                adminProfile.classList.remove(
                    "active"
                );

            }

        }
    );

}


// ======================================================
// THEME TOGGLE
// ======================================================

if (themeBtn) {

    themeBtn.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "light-theme"
            );


            const isLight =
                document.body.classList.contains(
                    "light-theme"
                );


            localStorage.setItem(
                ADMIN_THEME_KEY,
                isLight
                    ? "light"
                    : "dark"
            );


            const icon =
                themeBtn.querySelector("span");


            if (icon) {

                icon.textContent =
                    isLight
                        ? "☀️"
                        : "🌙";

            }


            if (adminMenu) {

                adminMenu.classList.remove(
                    "show"
                );

            }


            if (adminProfile) {

                adminProfile.classList.remove(
                    "active"
                );

            }

        }
    );

}


// ======================================================
// LOAD SAVED THEME
// ======================================================

function loadSavedTheme() {

    const savedTheme =
        localStorage.getItem(
            ADMIN_THEME_KEY
        );


    if (
        savedTheme === "light"
    ) {

        document.body.classList.add(
            "light-theme"
        );

    }


    if (
        savedTheme === "dark"
    ) {

        document.body.classList.remove(
            "light-theme"
        );

    }


    if (themeBtn) {

        const icon =
            themeBtn.querySelector("span");


        if (icon) {

            icon.textContent =
                savedTheme === "light"
                    ? "☀️"
                    : "🌙";

        }

    }

}


// ======================================================
// LOGOUT
// ======================================================

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (!confirmLogout) {

                return;

            }


            if (adminMenu) {

                adminMenu.classList.remove(
                    "show"
                );

            }


            if (adminProfile) {

                adminProfile.classList.remove(
                    "active"
                );

            }


            alert(
                "🚪 Logout successful!"
            );


            window.location.href =
                "#dashboard";

        }
    );

}


// ======================================================
// ESCAPE KEY
// ======================================================

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Escape") {

            return;

        }


        if (
            studentModal &&
            studentModal.classList.contains(
                "show"
            )
        ) {

            closeStudentModal();

        }


        if (
            editStudentModal &&
            editStudentModal.classList.contains(
                "show"
            )
        ) {

            closeEditModal();

        }


        if (
            adminSettingsPanel &&
            adminSettingsPanel.classList.contains(
                "show"
            )
        ) {

            adminSettingsPanel.classList.remove(
                "show"
            );

        }


        if (
            adminMenu &&
            adminMenu.classList.contains(
                "show"
            )
        ) {

            adminMenu.classList.remove(
                "show"
            );


            if (adminProfile) {

                adminProfile.classList.remove(
                    "active"
                );

            }

        }

    }
);


// ======================================================
// ESCAPE HTML
// ======================================================

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ======================================================
// INITIAL LOAD
// ======================================================

loadAdminProfile();

loadSavedTheme();

loadStudents();

updateStudentCount();

updateAttendanceSection();

updateCourseCounts();

updateReports();


// ======================================================
// END OF SCRIPT.JS
// ======================================================


/* =========================================================
   SYSTEM SETTINGS
========================================================= */

const openSystemSettings =
    document.getElementById("openSystemSettings");

const systemSettingsModal =
    document.getElementById("systemSettingsModal");

const closeSystemSettings =
    document.getElementById("closeSystemSettings");

const notificationsToggle =
    document.getElementById("notificationsToggle");

const autoRefreshToggle =
    document.getElementById("autoRefreshToggle");

const backupDataBtn =
    document.getElementById("backupDataBtn");

const clearStudentDataBtn =
    document.getElementById("clearStudentDataBtn");

const resetSettingsBtn =
    document.getElementById("resetSettingsBtn");


/* ================= OPEN SYSTEM SETTINGS ================= */

if (openSystemSettings && systemSettingsModal) {

    openSystemSettings.addEventListener(
        "click",
        function () {

            systemSettingsModal.classList.add("show");

        }
    );

}


/* ================= CLOSE SYSTEM SETTINGS ================= */

if (closeSystemSettings && systemSettingsModal) {

    closeSystemSettings.addEventListener(
        "click",
        function () {

            systemSettingsModal.classList.remove("show");

        }
    );

}


/* ================= CLOSE BY OUTSIDE CLICK ================= */

if (systemSettingsModal) {

    systemSettingsModal.addEventListener(
        "click",
        function (event) {

            if (event.target === systemSettingsModal) {

                systemSettingsModal.classList.remove("show");

            }

        }
    );

}


/* ================= NOTIFICATIONS ================= */

const NOTIFICATION_KEY =
    "systemNotifications";

if (notificationsToggle) {

    const savedNotification =
        localStorage.getItem(NOTIFICATION_KEY);

    notificationsToggle.checked =
        savedNotification !== "off";


    notificationsToggle.addEventListener(
        "change",
        function () {

            localStorage.setItem(
                NOTIFICATION_KEY,
                notificationsToggle.checked
                    ? "on"
                    : "off"
            );

        }
    );

}


/* ================= AUTO REFRESH ================= */

const AUTO_REFRESH_KEY =
    "systemAutoRefresh";

if (autoRefreshToggle) {

    const savedAutoRefresh =
        localStorage.getItem(AUTO_REFRESH_KEY);

    autoRefreshToggle.checked =
        savedAutoRefresh === "on";


    autoRefreshToggle.addEventListener(
        "change",
        function () {

            localStorage.setItem(
                AUTO_REFRESH_KEY,
                autoRefreshToggle.checked
                    ? "on"
                    : "off"
            );

        }
    );

}


/* ================= BACKUP STUDENT DATA ================= */

if (backupDataBtn) {

    backupDataBtn.addEventListener(
        "click",
        function () {

            const data =
                localStorage.getItem(STORAGE_KEY) || "[]";

            const blob =
                new Blob(
                    [data],
                    {
                        type: "application/json"
                    }
                );

            const url =
                URL.createObjectURL(blob);

            const link =
                document.createElement("a");

            link.href = url;

            link.download =
                "student-management-backup.json";

            link.click();

            URL.revokeObjectURL(url);

            alert(
                "Student data backup downloaded successfully."
            );

        }
    );

}


/* ================= CLEAR STUDENT DATA ================= */

if (clearStudentDataBtn) {

    clearStudentDataBtn.addEventListener(
        "click",
        function () {

            const confirmDelete =
                confirm(
                    "Are you sure you want to delete all student records?"
                );

            if (!confirmDelete) {
                return;
            }


            localStorage.removeItem(STORAGE_KEY);


            if (studentTable) {

                studentTable.innerHTML = "";

            }


            updateStudentCount();
            updateAttendanceSection();
            updateCourseCounts();
            updateReports();


            alert(
                "All student data has been cleared."
            );

        }
    );

}


/* ================= RESET SETTINGS ================= */

if (resetSettingsBtn) {

    resetSettingsBtn.addEventListener(
        "click",
        function () {

            const confirmReset =
                confirm(
                    "Reset administrator settings to default?"
                );

            if (!confirmReset) {
                return;
            }


            localStorage.removeItem(
                ADMIN_NAME_KEY
            );

            localStorage.removeItem(
                ADMIN_EMAIL_KEY
            );

            localStorage.removeItem(
                ADMIN_PASSWORD_KEY
            );

            localStorage.removeItem(
                ADMIN_THEME_KEY
            );

            localStorage.removeItem(
                NOTIFICATION_KEY
            );

            localStorage.removeItem(
                AUTO_REFRESH_KEY
            );


            loadAdminProfile();
            loadSavedTheme();


            alert(
                "Settings reset successfully.\n\nDefault password: admin123"
            );

        }
    );

}