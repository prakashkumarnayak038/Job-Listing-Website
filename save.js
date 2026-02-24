const savedJobsContainer = document.getElementById("savedJobsContainer");
const clearAllBtn = document.getElementById("clearAll");

function loadSavedJobs() {
  const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

  savedJobsContainer.innerHTML = "";

  if (savedJobs.length === 0) {
    savedJobsContainer.innerHTML = "<p style='text-align:center;'>No saved jobs found.</p>";
    return;
  }

  savedJobs.forEach((job, index) => {
    const card = document.createElement("div");
    card.classList.add("job-card");

    card.innerHTML = `
      <h3>${job.title}</h3>
      <p class="company">${job.company}</p>
      <p class="location">📍 ${job.location}</p>
      <p class="experience">Experience: ${job.experience}</p>
      <p>${job.description}</p>
      <button class="remove-btn" data-index="${index}">
        Remove
      </button>
    `;

    savedJobsContainer.appendChild(card);
  });
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-btn")) {
    let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    const index = e.target.dataset.index;

    savedJobs.splice(index, 1);
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));

    loadSavedJobs();
  }
});

clearAllBtn.addEventListener("click", () => {
  localStorage.removeItem("savedJobs");
  loadSavedJobs();
});

loadSavedJobs();