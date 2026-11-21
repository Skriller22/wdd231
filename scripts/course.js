const courseList = document.querySelector("#course-list");
const creditTotal = document.querySelector("#course-credits");
const filters =document.querySelectorAll(".course-filter");

let courses = [];

function displayCourses(subject) {
    const visible = subject === "all"
        ? courses
        : courses.filter(course => course.subject === subject);

    courseList.innerHTML = "";
    visible.forEach(course => {
        const item = document.createElement("button");
        item.textContent = `${course.subject} ${course.number}`;
        item.title = course.name;
        item.dataset.subject = course.subject;
        item.dataset.number = course.number;
        item.dataset.certificate = course.certificate;
        item.dataset.technology = course.Technology;
        item.classList.toggle("completed", course.completed);
        courseList.appendChild(item);
    });

    const totalCredits = visible.reduce((sum, course) => sum + course.credits, 0);
    creditTotal.textContent = `The total credits for courses listed above is ${totalCredits}`;
}

function loadCourseDescription(course) {
    const modal = document.querySelector("#course-modal");
    modal.querySelector(".modal-title").textContent = `${course.subject} ${course.number}: ${course.name}`;
    modal.querySelector(".modal-body").innerHTML = `
        <p>${course.credits} credits</p>
        <p><strong>Certificate:</strong> ${course.certificate || "None"}</p>
        <p>${course.description}</p>
        <p><strong>Technology:</strong> ${course.Technology}</p>
    `;
    modal.showModal();
}

courseList.addEventListener("click", event => {
    if (event.target.tagName === "BUTTON") {
        const { subject, number } = event.target.dataset;
        const course = courses.find(c => c.subject === subject && String(c.number) === number);
        if (course) {
            loadCourseDescription(course);
        }
    }
});

async function loadCourses() {
    try {
        const response = await fetch("data/courses.json");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        courses = await response.json();
        displayCourses("all");
    } catch (error) {
        console.error("Could not load courses:", error);
        courseList.textContent = "Courses are unavailable right now.";
    }
}

filters.forEach(filter => {
    filter.addEventListener("click", () => {
        displayCourses(filter.id.replace("course-", ""));
    });
});

loadCourses();
