'use strict';

/**
 * Initialize all elements and event listeners
 */
const initialize = () => {
  // DOM elements
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");
  const filterBtns = document.querySelectorAll("[data-filter-btn]");
  const projectItems = document.querySelectorAll("[data-filter-item]");
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-select-value]");
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  /**
   * Toggle element active state
   */
  const toggleElement = (elem) => {
    elem.classList.toggle("active");
  };

  /**
   * Initialize page state
   */
  const initPage = () => {
    // Set first page as active by default
    pages[0].classList.add("active");
    navigationLinks[0].classList.add("active");
    
    // Initialize form button state
    if (form) {
      formBtn.setAttribute("disabled", "");
    }
  };

  /**
   * Handle sidebar toggle
   */
  if (sidebarBtn) {
    sidebarBtn.addEventListener("click", () => {
      toggleElement(sidebar);
    });
  }

  /**
   * Handle page navigation - Improved version
   */
  navigationLinks.forEach(link => {
    link.addEventListener("click", function() {
      const targetPage = this.getAttribute('data-nav-link');
      
      // Remove active class from all links and pages
      navigationLinks.forEach(navLink => {
        navLink.classList.remove("active");
      });
      pages.forEach(page => {
        page.classList.remove("active");
      });
      
      // Add active class to clicked link and target page
      this.classList.add("active");
      document.querySelector(`[data-page="${targetPage}"]`).classList.add("active");
      
      window.scrollTo(0, 0);
    });
  });

  /**
   * Handle form validation
   */
  if (form) {
    formInputs.forEach(input => {
      input.addEventListener("input", () => {
        if (form.checkValidity()) {
          formBtn.removeAttribute("disabled");
        } else {
          formBtn.setAttribute("disabled", "");
        }
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (form.checkValidity()) {
        alert("Message sent successfully!");
        form.reset();
        formBtn.setAttribute("disabled", "");
      }
    });
  }

  /**
   * Handle portfolio filtering
   */
  let lastClickedBtn = filterBtns[0];

  const filterProjects = (selectedValue) => {
    projectItems.forEach(item => {
      if (selectedValue === "all" || selectedValue === item.dataset.category) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  };

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", function() {
        const selectedValue = this.textContent.toLowerCase();
        selectValue.textContent = this.textContent;
        filterProjects(selectedValue);
        
        lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;
      });
    });
  }

  /**
   * Handle custom select functionality
   */
  if (select) {
    select.addEventListener("click", () => {
      toggleElement(select);
    });

    selectItems.forEach(item => {
      item.addEventListener("click", function() {
        const selectedValue = this.textContent.toLowerCase();
        selectValue.textContent = this.textContent;
        toggleElement(select);
        filterProjects(selectedValue);
      });
    });
  }

  // Close select when clicking outside
  document.addEventListener("click", (e) => {
    if (select && !select.contains(e.target)) {
      select.classList.remove("active");
    }
  });

  // Initialize the page
  initPage();
};

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", initialize);
