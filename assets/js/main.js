

document.addEventListener("DOMContentLoaded", function() {
	// SideBar Handler
	var sideBar = document.getElementById("sidebar");
	var openSidebar = document.getElementById("openSideBar");
	var closeSidebar = document.getElementById("closeSideBar");

	if (sideBar && openSidebar && closeSidebar) {
		var isOpen = false;

		// Function to open the sidebar
		function openSideBar() {
			sideBar.classList.remove("-translate-x-full");
			sideBar.classList.add("translate-x-0");
			isOpen = true;
		}

		// Function to close the sidebar
		function closeSideBar() {
			sideBar.classList.add("-translate-x-full");
			sideBar.classList.remove("translate-x-0");
			isOpen = false;
		}

		function isChildOrSelf(elem, parentId) {
			var currentNode = elem;
			while (currentNode !== null && currentNode.id !== parentId) {
				currentNode = currentNode.parentElement;
			}
			return currentNode !== null;
		}

		document.addEventListener('click', function(event) {
			if (isChildOrSelf(event.target, 'openSideBar')) {
				if (!isOpen) {
					openSideBar();
				} else {
					closeSideBar();
				}
			} else if (isChildOrSelf(event.target, 'closeSideBar')) {
				closeSideBar();
			} else if (event.target !== sideBar && !sideBar.contains(event.target) && event.target !== openSidebar) {
				closeSideBar();
			}
		});
	}
});

// Dropdown Handler
function dropdownHandler(element) {
	let single = element.getElementsByTagName("ul")[0];
	single.classList.toggle("hidden");
}

// Get all menu items and submenus
const menuItems = document.querySelectorAll("[data-d2c-dropdown]");
const subMenus = document.querySelectorAll("[data-d2c-dropdownItem]");
menuItems.forEach((menuItem, index) => {
	menuItem.addEventListener("click", () => {
		const submenu = subMenus[index];
		submenu.classList.toggle("hidden");
		submenu.classList.toggle("active");
		menuItem.classList.toggle("active");
		menuItem.href = "javascript:void(0);";
		menuItems.forEach((otherMenuItem, otherIndex) => {
			if (otherIndex !== index) {
				const otherSubmenu = subMenus[otherIndex];
				otherSubmenu.classList.add("hidden");
				otherMenuItem.classList.remove("active");
				otherSubmenu.classList.remove("active");
			}
		});
	});
});


// Dropdown
const dropdownBtns = document.querySelectorAll(
	'.dropdown > [data-dropdown-label="btn"]'
);
const showMenus = document.querySelectorAll(
	'.dropdown [data-dropdown-item="item"]'
);

dropdownBtns.forEach((dropdownBtn, index) => {
	dropdownBtn.addEventListener("click", (event) => {
		const dropdownMenu = showMenus[index];
		dropdownMenu.classList.toggle("hidden");
		// Prevent the event from propagating to the document body
		event.stopPropagation();
	});
});

// // Add event listener to hide dropdowns when clicking outside
document.body.addEventListener('click', (event) => {
	dropdownBtns.forEach((dropdownBtn, index) => {
		const dropdownMenu = showMenus[index];
		// Check if the click target is not inside the dropdown
		if (dropdownMenu && !dropdownMenu.contains(event.target) && event.target !== dropdownBtn) {
			dropdownMenu.classList.add('hidden');
		}
	});
});

// Tabs
document.querySelectorAll('.tabs-container').forEach(function(container) {
    var buttons = container.querySelectorAll(".tab-button");
    buttons.forEach(function(button) {
        button.onclick = function() {
            var tabId = button.getAttribute("data-d2c-tab");
            openTab(container, tabId);
        };
    });

    // Initially open the first tab in each set
    var firstTabId = buttons[0].getAttribute("data-d2c-tab");
    openTab(container, firstTabId);
});

function openTab(container, tabId) {
    var tabContents = container.querySelectorAll(".tab-content");
    tabContents.forEach(function(tabContent) {
        tabContent.classList.add("hidden");
        tabContent.style.opacity = 0; // Initially set opacity to 0
    });

    var tabButtons = container.querySelectorAll(".tab-button");
    tabButtons.forEach(function(button) {
        button.classList.remove("active");
    });

    var tabElement = container.querySelector(`#${tabId}`);
    if (tabElement) {
        tabElement.classList.remove("hidden");
        // Use setTimeout to ensure the opacity transition starts after setting display to block
        setTimeout(function() {
            tabElement.style.opacity = 1;
        }, 200);
    }

    var tabButton = container.querySelector(`[data-d2c-tab="${tabId}"]`);
    if (tabButton) {
        tabButton.classList.add("active");
    }
}

// accordion
const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach((header) => {
	header.addEventListener("click", () => {
		const accordionContent = header.nextElementSibling;
		const isOpen = accordionContent.style.maxHeight !== "";

		accordionHeaders.forEach((otherHeader) => {
			const otherAccordionContent = otherHeader.nextElementSibling;
			otherAccordionContent.style.maxHeight = "";
			otherHeader.classList.remove("active"); // Remove 'active' class from all headers
			otherHeader.querySelector(".fas").classList.remove("fa-chevron-up");
			otherHeader.querySelector(".fas").classList.add("fa-chevron-down");
		});

		if (!isOpen) {
			accordionContent.style.maxHeight = `${accordionContent.scrollHeight + 32}px`;
			header.classList.add("active"); // Add 'active' class to the clicked header
			header.querySelector(".fas").classList.remove("fa-chevron-down");
			header.querySelector(".fas").classList.add("fa-chevron-up");
		}
	});
});

// counter
document.addEventListener("DOMContentLoaded", () => {
	const counters = document.querySelectorAll('[data-target]');
	const duration = 1000; // Duration in milliseconds

	counters.forEach(counter => {
		const target = +counter.getAttribute('data-target');
		animateCounter(counter, 0, target, duration);
	});

	function animateCounter(element, start, end, duration) {
		let startTime;

		function updateCounter(currentTime) {
			if (!startTime) startTime = currentTime;
			const progress = Math.min((currentTime - startTime) / duration, 1);
			element.textContent = Math.floor(progress * (end - start) + start);
			if (progress < 1) requestAnimationFrame(updateCounter);
		}

		requestAnimationFrame(updateCounter);
	}
});



// global dropdown
// dropdown
const dropdownBtnsMain = document.querySelectorAll('.dropdown-btn');
const dropdownMenus = document.querySelectorAll('.dropdown-menu');

dropdownBtnsMain.forEach((btn, index) => {
    btn.addEventListener('click', function() {
        dropdownMenus[index].classList.toggle('hidden');
    });

    // Close dropdown when clicking outside of it
    document.addEventListener('click', function(event) {
        const isClickInside = btn.contains(event.target) || dropdownMenus[index].contains(event.target);
        if (!isClickInside) {
            dropdownMenus[index].classList.add('hidden');
        }
    });
});

// wow animation initialize
wow = new WOW(
	{
	boxClass:     'wow',      // default
	animateClass: 'animated', // default
	offset:       0,          // default
	mobile:       true,       // default
	live:         true        // default
  }
  )
wow.init();

// Preloader Js
// Set initial opacity
$(".preloader").css("opacity", 1);

// Delay execution for 2 seconds
setTimeout(function() {
    // Set opacity to 0
    $(".preloader").css("opacity", 0);
    // After a short delay (for the fade-out effect to complete), set display to none
    setTimeout(function() {
        $(".preloader").css("display", "none");
    }, 300); // Adjust the delay to match the fade-out duration
}, 300);



// <!-- 
//     Template Name: {{ AiHealthX —Tailwind Healthcare Apps Landing Page }}
//     Template URL: {{ https://designtocodes.com/product/aihealthx-tailwind-healthcare-apps-landing-page }}
//     Description: {{ Upgrade your landing page level with AiHealthX—Tailwind Healthcare Apps Landing Page! It delivers a modern, efficient template for healthcare apps. }}
//     Author: DesignToCodes
//     Author URL: https://www.designtocodes.com
//     Text Domain: {{ AiHealthX | App Landing Page }}
//  -->

