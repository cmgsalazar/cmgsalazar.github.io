        let activeFilters = new Set();

        function toggleTag(tagElement, tag) {
            tagElement.classList.toggle('active');
            if (activeFilters.has(tag)) {
                activeFilters.delete(tag);
            } else {
                activeFilters.add(tag);
            }
            filterItems();
        }

        function filterItems() {
            const items = document.querySelectorAll('.item');
            items.forEach(item => {
                const tags = item.querySelectorAll('.tag');
                const itemTags = Array.from(tags).map(tag => tag.textContent.toLowerCase());
                const shouldShow = activeFilters.size === 0 || itemTags.some(tag => activeFilters.has(tag));
                item.style.display = shouldShow ? 'block' : 'none';
            });
        }

        // Back to Top button functionality
        const backToTopButton = document.getElementById("back-to-top");

        window.onscroll = function() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                backToTopButton.style.display = "block";
            } else {
                backToTopButton.style.display = "none";
            }
        };

        backToTopButton.onclick = function() {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        };

        // Mobile menu toggle
        const menuToggle = document.getElementById('menu-toggle');
        const nav = document.querySelector('nav');

        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
                nav.classList.remove('show');
            }
        });