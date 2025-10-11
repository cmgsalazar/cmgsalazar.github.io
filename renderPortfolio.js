// let portfolio = []

// let perItem = document.getElementsByClassName("portfolio-item");
// let imgLink = document.getElementsByClassName("portfolio-link");
// let textBlock = document.getElementsByClassName("portfolio-info");
// let publisher = document.getElementsByClassName("portfolio-publisher");
// let hed = document.getElementsByClassName("portfolio-title");
// let subject = document.getElementsByClassName("portfolio-subject");


// <div class="portfolio-item data">
// <a href="https://cmgsalazar.github.io/newmarkj/illegal-dumping" target="_blank" class="portfolio-link">
// <img src="assets/illegal-dumping.jpg" alt="">
// </a>
// <div class="portfolio-info">
//     <div><span class="portfolio-publisher">Mott Haven Herald</span><p class="portfolio-title"><a href="https://cmgsalazar.github.io/newmarkj/illegal-dumping" target="_blank">BID wants more cameras in The Hub to curb illegal dumping</a></p></div>
//     <div class="portfolio-subject">Local Accountability &bull; Python, GIS &bull; Multimedia </div>
// </div>


///////////////////


async function loadPortfolio() {
    try {
        const response = await fetch("works.json");
        const data = await response.json();
        const container = document.querySelector(".portfolio-grid");
        data.forEach(item => {
            const div = document.createElement("div");
            div.className = `portfolio-item ${item.type.join(" ")}`;
            div.dataset.featured = item.featured || false; // saves the featured key from JSON
            div.innerHTML = `
                <a href=${item.link} target="_blank" class="portfolio-link">
                <img src=${item.img_src} alt=${item.img_alt}>
                </a>
                <div class="portfolio-info">
                    <span class="portfolio-publisher">${item.publisher}</span>
                    <p class="portfolio-title"><span class="portfolio-category ${item.category}">${item.category}</span><a href=${item.link} target="_blank">${item.title}</a></p>
                    <span class="portfolio-subject">${item.subject.join(', ')}</span>
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
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            const filter = button.getAttribute("data-filter");
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


// document.addEventListener("DOMContentLoaded", loadPortfolio);



// ////////////////

// // Load and render portfolio
// async function loadPortfolio() {
//     try {
//         const response = await fetch('works.json');
//         const data = await response.json();
//         renderPortfolio(data.portfolio);
//         setupFilters(data.portfolio);
//     } catch (error) {
//         console.error('Error loading portfolio:', error);
//     }
// }

// // Render portfolio items
// function renderPortfolio(items) {
//     const grid = document.querySelector('.portfolio-grid');
//     grid.innerHTML = ''; // Clear existing items
    
//     items.forEach(item => {
//         // Skip items without links
//         if (!item.link) return;
        
//         // Create portfolio item element
//         const portfolioItem = document.createElement('div');
//         portfolioItem.className = 'portfolio-item';
        
//         // Add type classes for filtering
//         item.type.forEach(type => {
//             portfolioItem.classList.add(type);
//         });
        
//         // Add featured class if applicable
//         if (item.featured) {
//             portfolioItem.classList.add('featured');
//         }
        
//         // Format subjects for display
//         const subjects = item.subject.map(formatSubject).join(' &bull; ');
        
//         // Build HTML
//         portfolioItem.innerHTML = `
//             <a href="${item.link}" target="_blank" class="portfolio-link">
//                 <img src="${item.img_src}" alt="${item.img_alt}">
//             </a>
//             <div class="portfolio-info">
//                 <div>
//                     <span class="portfolio-publisher">${item.publisher}</span>
//                     <p class="portfolio-title">
//                         <a href="${item.link}" target="_blank">${item.title}</a>
//                     </p>
//                 </div>
//                 <div class="portfolio-subject">${subjects}</div>
//             </div>
//         `;
        
//         grid.appendChild(portfolioItem);
//     });
// }

// // Format subject names to title case
// function formatSubject(subject) {
//     return subject
//         .split(' ')
//         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(' ');
// }

// // Setup filter buttons
// function setupFilters(items) {
//     const buttons = document.querySelectorAll('.tabs .button');
    
//     buttons.forEach(button => {
//         button.addEventListener('click', () => {
//             // Update active button
//             buttons.forEach(btn => btn.classList.remove('active'));
//             button.classList.add('active');
            
//             // Filter items
//             const filter = button.dataset.filter;
//             filterPortfolio(items, filter);
//         });
//     });
// }

// // Filter portfolio items
// function filterPortfolio(items, filter) {
//     let filteredItems = items;
    
//     if (filter === 'featured') {
//         filteredItems = items.filter(item => item.featured);
//     } else if (filter === 'data graphics') {
//         filteredItems = items.filter(item => 
//             item.type.includes('data') || item.type.includes('graphic')
//         );
//     } else if (filter !== 'all') {
//         filteredItems = items.filter(item => item.type.includes(filter));
//     }
    
//     renderPortfolio(filteredItems);
// }

// // Initialize on page load
// document.addEventListener('DOMContentLoaded', loadPortfolio);