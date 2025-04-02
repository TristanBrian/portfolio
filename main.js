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
function typeWriter(text, element, speed = 50) {
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

const terminalText = "Welcome to my portfolio! I'm a web developer with a passion for creating interactive experiences.";
const terminalElement = document.getElementById('terminal');
const runningText = "Hello! I'm Brian Kioko, a passionate web developer and cybersecurity specialist.";
const runningTextElement = document.getElementById('running-text');

typeWriter(terminalText, terminalElement, 50);
typeWriter(runningText, runningTextElement, 50);

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