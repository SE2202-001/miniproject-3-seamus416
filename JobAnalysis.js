class Job {
    constructor(num, title, link, posted, type, level, time, skill, detail) {
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

    // Getters
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

    // Setters
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

    toString(){
        return "Job No: "+this._num +
        "\nTitle: "+this._title +
        "\nJob Page Link: "+this._link +
        "\nPosted: "+this._posted +
        "\nType: "+this._type +
        "\nLevel: "+this._level +
        "\nEstimated Time: "+this._time +
        "\nSkill: "+this._skill +
        "\nDetail: "+this._detail 
    }
}
const fileInput = document.getElementById("file-input");
const jobList = document.getElementById("job-list");
const listElement = document.getElementById("array-list");
const jobsArray = [];
const currentJobs = [];

fileInput.addEventListener("change", async (event) => {
    // Clear previous content
    jobList.innerHTML = "";
    listElement.innerHTML = "";
    jobsArray.length = 0; // Reset the array
  
    const file = event.target.files[0]; // Get the uploaded file
    if (!file) {
      alert("No file selected.");
      return;
    }
  
    try {
      // Read file content and parse JSON
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


  function filter(level, type, skill){
      currentJobs.length = 0;
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


  function displayJobs(filteredJobs) {
    listElement.innerHTML = ''; // Clear previous job list
  
    if (filteredJobs.length === 0) {
      listElement.innerHTML = "<p>No jobs match your criteria</p>";
    } else {
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


  const filterBtn = document.getElementById("filter-btn");

  filterBtn.addEventListener("click", () => {
    // Get selected values from dropdowns
    const level = document.getElementById("dropdown1").value;
    const type = document.getElementById("dropdown2").value;
    const skill = document.getElementById("dropdown3").value;

    filter(level, type, skill); // Call the filter function with selected values
  });



function sort(type){
  let sortedJobs = [...currentJobs];
    if(currentJobs.length == 0){
      sortedJobs = [...jobsArray];
    }
    switch(type){
      case "Title(A-Z)":
        sortedJobs.sort((a, b) => a.title.localeCompare(b.title));
      break;
      case "Title(Z-A)":
        sortedJobs.sort((a, b) => b.title.localeCompare(a.title));
      break;
      case  "Date Posted(newest first)":
        break;
      case "Date Posted(oldest first)":
        sortedJobs.reverse();
        break;
      default:
        break;
    }
    displayJobs(sortedJobs);

  }


  const sortBtn = document.getElementById("sort-btn");

  sortBtn.addEventListener("click", () => {
    // Get selected values from dropdowns
    const type = document.getElementById("dropdown4").value;

    sort(type);
  });