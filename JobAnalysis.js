// Job class to represent a job posting with various properties
class Job {
  constructor(num, title, link, posted, type, level, time, skill, detail) {
      // Initialize job properties
      this._num = num; // Use underscore for private-like properties
      this._title = title;
      this._link = link;
      this._posted = posted;
      this._type = type;
      this._level = level;
      this._time = time;
      this._skill = skill;
      this._detail = detail;
  }

  // Getters to retrieve property values
  get num() {
      return this._num;
  }

  get title() {
      return this._title;
  }

  get link() {
      return this._link;
  }

  get posted() {
      return this._posted;
  }

  get type() {
      return this._type;
  }

  get level() {
      return this._level;
  }

  get time() {
      return this._time;
  }

  get skill() {
      return this._skill;
  }

  get detail() {
      return this._detail;
  }

  // Setters to update property values
  set num(value) {
      this._num = value;
  }

  set title(value) {
      this._title = value;
  }

  set link(value) {
      this._link = value;
  }

  set posted(value) {
      this._posted = value;
  }

  set type(value) {
      this._type = value;
  }

  set level(value) {
      this._level = value;
  }

  set time(value) {
      this._time = value;
  }

  set skill(value) {
      this._skill = value;
  }

  set detail(value) {
      this._detail = value;
  }

  // Convert job details to a string format for display
  toString() {
      return "Job No: " + this._num +
          "\nTitle: " + this._title +
          "\nJob Page Link: " + this._link +
          "\nPosted: " + this._posted +
          "\nType: " + this._type +
          "\nLevel: " + this._level +
          "\nEstimated Time: " + this._time +
          "\nSkill: " + this._skill +
          "\nDetail: " + this._detail;
  }

  // Get formatted posted time in minutes
  getFormattedPostedTime() {
      const timeParts = this.posted.split(" "); // Split time into value and unit
      const value = parseInt(timeParts[0]); // Extract the numeric part (e.g., "59")
      const unit = timeParts[1]; // Extract the unit (e.g., "minutes", "hour")

      let totalMinutes;
      if (unit.includes("minute")) {
          totalMinutes = value; // Already in minutes
      } else if (unit.includes("hour")) {
          totalMinutes = value * 60; // Convert hours to minutes
      } else if (unit.includes("day")) {
          totalMinutes = value * 24 * 60; // Convert days to minutes
      } else {
          throw new Error("Unsupported time unit in 'Posted' field");
      }

      return totalMinutes;
  }
}

// Elements for file input, job list, and array list
const fileInput = document.getElementById("file-input");
const jobList = document.getElementById("job-list");
const listElement = document.getElementById("array-list");
const jobsArray = [];
const currentJobs = [];

// Update dropdowns for filtering jobs based on level, type, and skill
function updateDropdowns() {
  const levelDropdown = document.getElementById("dropdown1");
  const typeDropdown = document.getElementById("dropdown2");
  const skillDropdown = document.getElementById("dropdown3");

  // Use Set to collect unique values for filters
  const levels = new Set();
  const types = new Set();
  const skills = new Set();

  jobsArray.forEach((job) => {
      levels.add(job.level);
      types.add(job.type);
      skills.add(job.skill);
  });

  // Helper function to populate a dropdown with options
  function populateDropdown(dropdown, options) {
      dropdown.innerHTML = ""; // Clear existing options
      const allOption = document.createElement("option");
      allOption.value = "All";
      allOption.textContent = "All";
      dropdown.appendChild(allOption);

      options.forEach((option) => {
          const opt = document.createElement("option");
          opt.value = option;
          opt.textContent = option;
          dropdown.appendChild(opt);
      });
  }

  // Populate dropdowns with levels, types, and skills
  populateDropdown(levelDropdown, Array.from(levels).sort());
  populateDropdown(typeDropdown, Array.from(types).sort());
  populateDropdown(skillDropdown, Array.from(skills).sort());
}

// File input change event listener
fileInput.addEventListener("change", async (event) => {
  // Clear previous content and reset jobs array
  jobList.innerHTML = "";
  listElement.innerHTML = "";
  jobsArray.length = 0;

  const file = event.target.files[0]; // Get the uploaded file
  if (!file) {
      alert("No file selected.");
      return;
  }

  try {
      // Read and parse the uploaded file
      const fileContent = await file.text();
      const jobData = JSON.parse(fileContent);

      // Create Job objects and populate jobsArray
      for (const job of jobData) {
          const jobObject = new Job(
              job["Job No"],
              job["Title"],
              job["Job Page Link"],
              job["Posted"],
              job["Type"],
              job["Level"],
              job["Estimated Time"],
              job["Skill"],
              job["Detail"]
          );
          jobsArray.push(jobObject);
      }

      // Update dropdown filters
      updateDropdowns();

      // Display job titles as buttons
      jobsArray.forEach((job) => {
          const button = document.createElement("button");
          button.textContent = job.title + " - " + job.type + "(" + job.level + ")"; // Use the getter
          button.style.margin = "5px";
          button.addEventListener("click", () => {
              alert(job.toString());
          });
          listElement.appendChild(button);
      });
  } catch (error) {
      console.error("Error loading file:", error);
      alert("Invalid JSON file. Please upload a valid file.");
  }
});

// Filter jobs based on level, type, and skill
function filter(level, type, skill) {
  currentJobs.length = 0; // Clear current jobs array
  jobsArray.forEach((job) => {
      // Check if job matches all selected filter criteria
      const matchesLevel = level === "All" || job.level === level;
      const matchesType = type === "All" || job.type === type;
      const matchesSkill = skill === "All" || job.skill === skill;

      // If all criteria match, add the job to currentJobs
      if (matchesLevel && matchesType && matchesSkill) {
          currentJobs.push(job);
      }
  });
  displayJobs(currentJobs);
}

// Display filtered or all jobs
function displayJobs(filteredJobs) {
  listElement.innerHTML = ''; // Clear previous job list

  // Display message if no jobs match the filters
  if (filteredJobs.length === 0) {
      const noJobsMessage = document.createElement("p");
      noJobsMessage.textContent = "No jobs available.";
      noJobsMessage.style.color = "black";
      listElement.appendChild(noJobsMessage);
  } else {
      // Display filtered jobs as buttons
      filteredJobs.forEach((job) => {
          const button = document.createElement("button");
          button.textContent = job.title + " - " + job.type + "(" + job.level + ")"; // Use the getter for title
          button.style.margin = "5px";
          button.addEventListener("click", () => {
              alert(job.toString());
          });
          listElement.appendChild(button);
      });
  }
}

// Filter button event listener
const filterBtn = document.getElementById("filter-btn");
filterBtn.addEventListener("click", () => {
  // Get selected values from dropdowns
  const level = document.getElementById("dropdown1").value;
  const type = document.getElementById("dropdown2").value;
  const skill = document.getElementById("dropdown3").value;

  // Call the filter function with selected values
  filter(level, type, skill);
});

// Sort jobs based on selected type
function sort(type) {
  let sortedJobs = [...currentJobs];
  if (currentJobs.length == 0) {
      sortedJobs = [...jobsArray];
  }
  switch (type) {
      case "Title(A-Z)":
          sortedJobs.sort((a, b) => a.title.localeCompare(b.title));
          break;
      case "Title(Z-A)":
          sortedJobs.sort((a, b) => b.title.localeCompare(a.title));
          break;
      case "Date Posted(newest first)":
          sortedJobs.sort((a, b) => a.getFormattedPostedTime() - (b.getFormattedPostedTime()));
          break;
      case "Date Posted(oldest first)":
          sortedJobs.sort((a, b) => b.getFormattedPostedTime() - (a.getFormattedPostedTime()));
          break;
      default:
          break;
  }
  displayJobs(sortedJobs);
}

// Sort button event listener
const sortBtn = document.getElementById("sort-btn");
sortBtn.addEventListener("click", () => {
  // Get selected sort type from dropdown
  const type = document.getElementById("dropdown4").value;

  // Call the sort function with selected type
  sort(type);
});
