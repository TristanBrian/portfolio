document.addEventListener('DOMContentLoaded', () => {
    const cvButton = document.getElementById('downcv-button');
    if (cvButton) {
        cvButton.addEventListener('click', () => {
            window.location.href = 'https://drive.google.com/file/d/162b2Y6eZwnm6ApHdOVWSJcZG1TAWtvyI/view?usp=sharing';
        });
    }

    // Form submission handler
    document.addEventListener('DOMContentLoaded', function() {
        const contactForm = document.getElementById('contact-form');
        const submitBtn = document.getElementById('submitBtn');
        const formStatus = document.getElementById('formStatus');
      
        contactForm.addEventListener('submit', async function(e) {
          e.preventDefault();
          
          // Validate form
          if (!validateForm()) return;
          
          // Disable button during submission
          submitBtn.disabled = true;
          submitBtn.classList.add('loading');
          
          try {
            const formData = new FormData(contactForm);
            const response = await fetch('/api/contact', {
              method: 'POST',
              body: formData,
              headers: {
                'Accept': 'application/json'
              }
            });
            
            const result = await response.json();
            
            if (response.ok) {
              showStatus('Message sent successfully!', 'success');
              contactForm.reset();
            } else {
              throw new Error(result.message || 'Failed to send message');
            }
          } catch (error) {
            console.error('Error:', error);
            showStatus('There was an error sending your message. Please try again later.', 'error');
          } finally {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
          }
        });
      
        function validateForm() {
          let isValid = true;
          const name = document.getElementById('name').value.trim();
          const email = document.getElementById('email').value.trim();
          const message = document.getElementById('message').value.trim();
          
          // Validate name
          if (name === '') {
            showError('name-error', 'Please enter your name');
            isValid = false;
          } else {
            hideError('name-error');
          }
          
          // Validate email
          if (email === '') {
            showError('email-error', 'Please enter your email');
            isValid = false;
          } else if (!isValidEmail(email)) {
            showError('email-error', 'Please enter a valid email');
            isValid = false;
          } else {
            hideError('email-error');
          }
          
          // Validate message
          if (message === '') {
            showError('message-error', 'Please enter your message');
            isValid = false;
          } else if (message.length < 10) {
            showError('message-error', 'Message should be at least 10 characters');
            isValid = false;
          } else {
            hideError('message-error');
          }
          
          return isValid;
        }
      
        function isValidEmail(email) {
          const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return re.test(email);
        }
      
        function showError(elementId, message) {
          const element = document.getElementById(elementId);
          element.textContent = message;
          element.style.display = 'block';
        }
      
        function hideError(elementId) {
          const element = document.getElementById(elementId);
          element.style.display = 'none';
        }
      
        function showStatus(message, type) {
          formStatus.textContent = message;
          formStatus.className = type;
          formStatus.style.display = 'block';
          
          // Hide status after 5 seconds
          setTimeout(() => {
            formStatus.style.display = 'none';
          }, 5000);
        }
      });    

    // Particles.js configuration
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#00ff00'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00ff00',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                repulse: {
                    distance: 100,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });

    // Typing effect for terminal
    function typeWriter(text, element, speed = 70) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    }); 

   // Initialize particles.js
    const particlesElement = document.getElementById('particles-js');
    if (particlesElement) {
        particlesJS.load('particles-js', 'particles.json', function() {
            console.log('callback - particles.js config loaded');
        });
    }

    // Initialize counter
    const counterElement = document.getElementById('counter');
    if (counterElement) {
        setupCounter(counterElement);
    }

    // Function to set up the counter
    function setupCounter(element) {
        let counter = 0;
        const setCounter = (count) => {
            counter = count;
            element.innerHTML = `Count is ${counter}`;
        }
        element.addEventListener('click', () => setCounter(counter + 1));
        setCounter(0);
    } 
});
