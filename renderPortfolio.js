async function loadPortfolio() {
    try {
        const response = await fetch("works.json");
        const data = await response.json();
        const container = document.querySelector(".portfolio-grid");
        data.forEach(item => {
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

            filterItems(filter);
        })
    })
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

loadPortfolio();
