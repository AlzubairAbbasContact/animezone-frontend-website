// Main JavaScript for AnimeZone Website

$(document).ready(function() {
    // Smooth scrolling for anchor links
    $("a[href^='#']").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 70
            }, 800);
        }
    });

    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    // Modal functionality with Ajax content loading
    $("#more-info-btn").on('click', function() {
        // Load content from modal-content.html
        $("#modal-content").load("../html/modal-content.html", function() {
            // Show modal after content is loaded
            $("#animeInfoModal").modal('show');
        });
    });

    // Contact form submission
    $("#contact-form").on('submit', function(event) {
        event.preventDefault();
        
        // Form validation
        if (validateContactForm()) {
            // Simulate form submission (would be replaced with actual AJAX in production)
            setTimeout(function() {
                // Hide form or show success message
                $("#contact-form").trigger('reset');
                
                // Show toast notification
                showToast("Success!", "Thanks, your message has been sent! We'll get back to you soon.");
            }, 1000);
        }
    });

    // Login form validation
    $("#login-form").on('submit', function(event) {
        event.preventDefault();
        
        if (validateLoginForm()) {
            // Simulate login (would be replaced with actual authentication in production)
            alert("Login successful! Redirecting to dashboard...");
            // Redirect would happen here
        }
    });

    // Registration form validation
    $("#register-form").on('submit', function(event) {
        event.preventDefault();
        
        if (validateRegistrationForm()) {
            // Simulate registration (would be replaced with actual registration in production)
            alert("Registration successful! Please check your email to verify your account.");
            // Redirect would happen here
        }
    });

    // Image slider functionality (if not using a plugin)
    initializeImageSlider();
});

// Toast notification function
function showToast(title, message) {
    // Create toast container if it doesn't exist
    if ($('.toast-container').length === 0) {
        $('body').append('<div class="toast-container"></div>');
    }
    
    // Create toast element
    var toastHtml = `
        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="5000">
            <div class="toast-header">
                <strong class="me-auto">${title}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;
    
    // Append toast to container
    $('.toast-container').append(toastHtml);
    
    // Initialize and show the toast
    var toastElement = $('.toast').last()[0];
    var toast = new bootstrap.Toast(toastElement);
    toast.show();
    
    // Remove toast after it's hidden
    $(toastElement).on('hidden.bs.toast', function() {
        $(this).remove();
    });
}

// Contact form validation
function validateContactForm() {
    var isValid = true;
    var name = $("#contact-name").val().trim();
    var email = $("#contact-email").val().trim();
    var subject = $("#contact-subject").val().trim();
    var message = $("#contact-message").val().trim();
    
    // Reset previous error messages
    $(".invalid-feedback").hide();
    $(".form-control").removeClass("is-invalid");
    
    // Validate name
    if (name === "") {
        $("#contact-name").addClass("is-invalid");
        $("#contact-name").siblings(".invalid-feedback").show();
        isValid = false;
    }
    
    // Validate email
    if (email === "" || !isValidEmail(email)) {
        $("#contact-email").addClass("is-invalid");
        $("#contact-email").siblings(".invalid-feedback").show();
        isValid = false;
    }
    
    // Validate subject
    if (subject === "") {
        $("#contact-subject").addClass("is-invalid");
        $("#contact-subject").siblings(".invalid-feedback").show();
        isValid = false;
    }
    
    // Validate message
    if (message === "") {
        $("#contact-message").addClass("is-invalid");
        $("#contact-message").siblings(".invalid-feedback").show();
        isValid = false;
    }
    
    return isValid;
}

// Login form validation
function validateLoginForm() {
    var isValid = true;
    var email = $("#login-email").val().trim();
    var password = $("#login-password").val().trim();
    
    // Reset previous error messages
    $(".invalid-feedback").hide();
    $(".form-control").removeClass("is-invalid");
    
    // Validate email
    if (email === "" || !isValidEmail(email)) {
        $("#login-email").addClass("is-invalid");
        $("#login-email").siblings(".invalid-feedback").show();
        isValid = false;
    }
    
    // Validate password
    if (password === "") {
        $("#login-password").addClass("is-invalid");
        $("#login-password").siblings(".invalid-feedback").show();
        isValid = false;
    }
    
    return isValid;
}

// Registration form validation
function validateRegistrationForm() {
    var isValid = true;
    var username = $("#register-username").val().trim();
    var email = $("#register-email").val().trim();
    var password = $("#register-password").val().trim();
    var confirmPassword = $("#register-confirm-password").val().trim();
    
    // Reset previous error messages
    $(".invalid-feedback").hide();
    $(".form-control").removeClass("is-invalid");
    
    // Validate username
    if (username === "" || username.length < 3) {
        $("#register-username").addClass("is-invalid");
        $("#register-username").siblings(".invalid-feedback").show();
        isValid = false;
    }
    
    // Validate email
    if (email === "" || !isValidEmail(email)) {
        $("#register-email").addClass("is-invalid");
        $("#register-email").siblings(".invalid-feedback").show();
        isValid = false;
    }
    
    // Validate password
    if (password === "" || password.length < 8 || !isStrongPassword(password)) {
        $("#register-password").addClass("is-invalid");
        $("#register-password").siblings(".invalid-feedback").show();
        isValid = false;
    }
    
    // Validate confirm password
    if (confirmPassword === "" || confirmPassword !== password) {
        $("#register-confirm-password").addClass("is-invalid");
        $("#register-confirm-password").siblings(".invalid-feedback").show();
        isValid = false;
    }
    
    return isValid;
}

// Email validation helper
function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Password strength validation helper
function isStrongPassword(password) {
    // Password should have at least one uppercase letter, one lowercase letter, one number, and one special character
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

// Simple image slider functionality
function initializeImageSlider() {
    // This is a basic implementation. For a more robust solution, consider using a dedicated slider plugin.
    var currentSlide = 0;
    var slides = $(".gallery-slider .slide");
    
    if (slides.length === 0) return;
    
    // Show first slide
    $(slides[currentSlide]).addClass("active");
    
    // Next slide function
    function nextSlide() {
        $(slides[currentSlide]).removeClass("active");
        currentSlide = (currentSlide + 1) % slides.length;
        $(slides[currentSlide]).addClass("active");
    }
    
    // Previous slide function
    function prevSlide() {
        $(slides[currentSlide]).removeClass("active");
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        $(slides[currentSlide]).addClass("active");
    }
    
    // Set up click handlers for next/prev buttons
    $(".gallery-slider .next").on("click", function() {
        nextSlide();
    });
    
    $(".gallery-slider .prev").on("click", function() {
        prevSlide();
    });
    
    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);
}