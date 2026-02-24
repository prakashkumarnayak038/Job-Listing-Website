let currentPage = 1;
const jobsPerPage = 4;

const jobsContainer = document.getElementById("jobsContainer");
const searchInput = document.getElementById("searchInput");
const locationFilter = document.getElementById("locationFilter");
const categoryFilter = document.getElementById("categoryFilter");
const experienceFilter = document.getElementById("experienceFilter");
const resetBtn = document.getElementById("resetBtn");
const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");
const pageInfo = document.getElementById("pageInfo");

let jobsData = [
  {
    title:"Frontend Developer",
    company:"SPCL",
    location:"Pune",
    category:"IT",
    experience:"Mid-Level",
    description:"Build responsive websites using HTML, CSS and JavaScript."
  },
  {
    title:"Backend Developer",
    company:"CodeCraft",
    location:"Delhi",
    category:"IT",
    experience:"Senior",
    description:"Develop APIs and manage server-side logic."
  },
  {
    title:"Marketing Executive",
    company:"Tech Solutions",
    location:"Bhubaneswar",
    category:"Marketing",
    experience:"Fresher",
    description:"Handle digital marketing campaigns."
  },
  {
    title:"Account Manager",
    company:"TCS",
    location:"Mumbai",
    category:"IT",
    experience:"Fresher",
    description:"Analyze business data and reports."
  },
  {
    title:"Data Analyst",
    company:"Zoho",
    location:"Delhi",
    category:"IT",
    experience:"Fresher",
    description:"Analyze business data and reports."
  },
  {
    title:"UI/UX Designer",
    company:"Quera",
    location:"Bangalore",
    category:"Design",
    experience:"Mid-Level",
    description:"Design user-friendly interfaces."
  },
  {
    title:"HR",
    company:"Plaza",
    location:"Bangalore",
    category:"HR",
    experience:"Mid-Level",
    description:" Manage recruitment, employee relations.  "
  },
  {
    title:"Telecaller",
    company:"Skyline Solutions",
    location:"Bangalore",
    category:"Customer Support",
    experience:"Entry-Level",
    description:" explain services to customers."
  },
  
  
];

let filteredJobs = [...jobsData];

function displayJobs(jobs) {
  jobsContainer.innerHTML = "";

  if (jobs.length === 0) {
    jobsContainer.innerHTML = "<p>No jobs found.</p>";
    pageInfo.textContent = "";
    return;
  }

  const start = (currentPage - 1) * jobsPerPage;
  const end = start + jobsPerPage;
  const paginatedJobs = jobs.slice(start, end);

  paginatedJobs.forEach(job => {
    const card = document.createElement("div");
    card.classList.add("job-card");

    card.innerHTML = `
      <h3>${job.title}</h3>
      <p class="company">${job.company}</p>
      <p class="location">📍 ${job.location}</p>
      <p class="experience">Experience: ${job.experience}</p>
      <span class="category">${job.category}</span>

      <button class="view-btn"
        data-title="${job.title}"
        data-company="${job.company}"
        data-location="${job.location}"
        data-experience="${job.experience}"
        data-description="${job.description}">
        View More
      </button>

      <button class="save-btn"
        data-title="${job.title}"
        data-company="${job.company}"
        data-location="${job.location}"
        data-experience="${job.experience}"
        data-description="${job.description}">
        Save Job
      </button>
    `;

    jobsContainer.appendChild(card);
  });

  updatePaginationInfo(jobs.length);
}


function updatePaginationInfo(totalJobs) {
  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}


function filterJobs() {
  const searchValue = searchInput.value.toLowerCase();
  const locationValue = locationFilter.value;
  const categoryValue = categoryFilter.value;
  const experienceValue = experienceFilter.value;

  filteredJobs = jobsData.filter(job => {
    return (
      job.title.toLowerCase().includes(searchValue) &&
      (locationValue === "" || job.location === locationValue) &&
      (categoryValue === "" || job.category === categoryValue) &&
      (experienceValue === "" || job.experience === experienceValue)
    );
  });

  currentPage = 1;
  displayJobs(filteredJobs);
}


searchInput.addEventListener("input", filterJobs);
locationFilter.addEventListener("change", filterJobs);
categoryFilter.addEventListener("change", filterJobs);
experienceFilter.addEventListener("change", filterJobs);

resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  locationFilter.value = "";
  categoryFilter.value = "";
  experienceFilter.value = "";

  filteredJobs = [...jobsData];
  currentPage = 1;
  displayJobs(filteredJobs);
});


prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayJobs(filteredJobs);
  }
});

nextBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayJobs(filteredJobs);
  }
});


const modal = document.getElementById("jobModal");
const closeModal = document.getElementById("closeModal");

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("view-btn")) {
    document.getElementById("modalTitle").textContent = e.target.dataset.title;
    document.getElementById("modalCompany").textContent = e.target.dataset.company;
    document.getElementById("modalLocation").textContent = e.target.dataset.location;
    document.getElementById("modalExperience").textContent = e.target.dataset.experience;
    document.getElementById("modalDescription").textContent = e.target.dataset.description;

    modal.style.display = "flex";
  }
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});


document.addEventListener("click", function (e) {
  if (e.target.classList.contains("save-btn")) {

    const job = {
      title: e.target.dataset.title,
      company: e.target.dataset.company,
      location: e.target.dataset.location,
      experience: e.target.dataset.experience,
      description: e.target.dataset.description
    };

    let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

    const alreadySaved = savedJobs.some(j =>
      j.title === job.title && j.company === job.company
    );

    if (alreadySaved) {
      alert("Job already saved!");
      return;
    }

    savedJobs.push(job);
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));

    alert("Job saved successfully!");
  }
});


displayJobs(filteredJobs);