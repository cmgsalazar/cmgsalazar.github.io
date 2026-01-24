async function loadPortfolio() {
    try {
        const response = await fetch("works.json");
        const data = await response.json();
        
        // set up sample works grid
        const container = document.querySelector(".portfolio-grid");

        // set up dropdown for subjects
        const dropdown = document.getElementById("dropdown");
        const subjects = new Set();
        
        data.forEach(item => {
            item.subject.forEach(subj => subjects.add(subj)); // collects subjects

            const div = document.createElement("div");
            div.className = `portfolio-item ${item.type.join(" ")}`;
            div.dataset.featured = item.featured || false; // saves the featured key from JSON

            // widont variables
            const widontHed = widont(item.title, "html", 2);
            let widontDesc = widont(item.description, "html", 2);
            
            div.innerHTML = `
                <a href=${item.link} target="_blank" class="portfolio-link">
                <img src=${item.img_src} alt=${item.img_alt}>
                </a>
                <div class="portfolio-info">
                    <span class="portfolio-publisher">${item.publisher}</span>
                    <p class="portfolio-title"><span class="portfolio-category ${item.category}">${item.category}</span><a href=${item.link} target="_blank">${widontHed}</a></p>
                    <span class="portfolio-subject">${item.subject.join(', ')}</span>
                    <p class="portfolio-desc">${widontDesc}</p>
                </div>
            `
            container.appendChild(div);
        });

        // sort and populate dropdown
        Array.from(subjects).sort().forEach(subj => {
            const subjectText = subj.charAt(0).toUpperCase() + subj.slice(1);
            dropdown.add(new Option(subjectText, subj));
        });

        dropdown.addEventListener("change", (subj) => {
            const selectedSubject = subj.target.value;
            const buttons = document.querySelectorAll(".tabs button");
            buttons.forEach(btn => btn.classList.remove("active"));
            document.querySelector('.tabs button[data-filter="all"]').classList.add("active");
            filterSubject(selectedSubject);
        });

        setFilters(); // tabs function
        filterItems("featured"); // show featured by default
    
    } catch (error) {
        console.log(error);
    }
}

function setFilters() {
    const buttons = document.querySelectorAll(".tabs button");
    const header = document.getElementById("works-header");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            const filter = button.getAttribute("data-filter");

            // update header text, based on filter
            if (filter === "all") {
                header.textContent = "Select works";
            } else if (filter === "featured") {
                header.textContent = "Featured works";
            } else if (filter === "data graphics") {
                header.textContent = "Data + Graphics";
            } else if (filter === "investigation") {
                header.textContent = "Investigations";
            } else if (filter === "documentary") {
                header.textContent = "Documentaries";
            } else if (filter === "miscellaneous") {
                header.textContent = "Miscellaneous";
            }

            // reset dropdown to default
            dropdown.value = "";
            filterSubject("");
            filterItems(filter);
        });
    });
}

function filterItems(filter) {
    const projects = document.querySelectorAll(".portfolio-item");
    projects.forEach(project => {
        if (filter === "all") {
            project.classList.remove("hidden");
        } else if (filter === "featured") {
            if (project.dataset.featured === "true") {
                project.classList.remove("hidden");
            } else {
                project.classList.add("hidden");
            }
        } else if (filter === "data graphics") {
            if (project.classList.contains("data") || (project.classList.contains("graphics"))) {
                project.classList.remove("hidden");
            } else {
                project.classList.add("hidden");
            }
        } else {
            if (project.classList.contains(filter)) {
                project.classList.remove("hidden");
            } else {
                project.classList.add("hidden");
            }
        }
    });
}

function filterSubject(subject) {
    const projects = document.querySelectorAll(".portfolio-item");
    projects.forEach(project => {
        const subjectSpan = project.querySelector(".portfolio-subject");
        const subjectPerProject = subjectSpan.textContent.split(", ");
        
        if (subject === "") {
            project.classList.remove("hidden");
        } else if (subjectPerProject.includes(subject)) {
            project.classList.remove("hidden");
        } else {
            project.classList.add("hidden");
        }
    });
}

loadPortfolio();
