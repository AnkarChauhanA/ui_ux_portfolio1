
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 50);
        });

        document.querySelectorAll('a, button, .skill-item, .portfolio-box').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursorFollower.style.transform = 'scale(1.5)';
                cursorFollower.style.borderColor = 'rgba(102, 126, 234, 0.6)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursorFollower.style.transform = 'scale(1)';
                cursorFollower.style.borderColor = 'rgba(102, 126, 234, 0.3)';
            });
        });

        function initTiltEffect() {
            const tiltCards = document.querySelectorAll('.tilt-card');
            
            tiltCards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                 
                    const xPercent = (x / rect.width) * 100;
                    const yPercent = (y / rect.height) * 100;
                    
                    
                    card.style.setProperty('--mouse-x', `${xPercent}%`);
                    card.style.setProperty('--mouse-y', `${yPercent}%`);
                    
                    // Calculate tilt angles (reduce intensity for subtle effect)
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = ((y - centerY) / centerY) * -15; // Max 15 degrees
                    const rotateY = ((x - centerX) / centerX) * 15;  // Max 15 degrees
                    
                    // Apply 3D transform with tilt
                    card.style.transform = `
                        perspective(1000px) 
                        rotateX(${rotateX}deg) 
                        rotateY(${rotateY}deg) 
                        translateZ(20px)
                        scale3d(1.02, 1.02, 1.02)
                    `;
                });
                
                card.addEventListener('mouseleave', () => {
                    // Reset transform and custom properties
                    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)';
                    card.style.setProperty('--mouse-x', '50%');
                    card.style.setProperty('--mouse-y', '50%');
                });
                
                card.addEventListener('mouseenter', () => {
                    // Smooth transition on enter
                    card.style.transition = 'none';
                });
                
                card.addEventListener('mouseleave', () => {
                    // Smooth transition on leave
                    card.style.transition = 'all 0.4s var(--ease-out-expo)';
                });
            });
        }

        // Initialize tilt effect
        initTiltEffect();

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        const menuIcon = document.querySelector('#menu-icon');
        const navbar = document.querySelector('.navbar');

        menuIcon.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Active navigation link
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.navbar a');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });

        // Typed.js effect for multiple text
        const textArray = ['Frontend Developer', 'UI/UX Designer', 'Web Developer', 'React Developer'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typeSpeed = 100;
        const deleteSpeed = 50;
        const delayBetweenWords = 2000;

        function typeEffect() {
            const currentText = textArray[textIndex];
            const multipleTextElement = document.querySelector('.multiple-text');
            
            if (isDeleting) {
                multipleTextElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                multipleTextElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let speed = isDeleting ? deleteSpeed : typeSpeed;

            if (!isDeleting && charIndex === currentText.length) {
                speed = delayBetweenWords;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % textArray.length;
            }

            setTimeout(typeEffect, speed);
        }

        // Start the typing effect
        typeEffect();

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.skill-item, .portfolio-box').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s var(--ease-out-expo)';
            observer.observe(el);
        });

        // Form submission feedback
        const form = document.querySelector('form');
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('.btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = 'Sending... <i class="bx bx-loader-alt bx-spin"></i>';
            submitBtn.style.opacity = '0.7';
            submitBtn.style.pointerEvents = 'none';
            
            // Reset after 3 seconds (you can adjust based on actual form submission)
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.style.pointerEvents = 'auto';
            }, 3000);
        });

        // Parallax effect for floating elements
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            document.querySelector('.mesh-gradient').style.transform = 
                `translate(${(mouseX - 0.5) * 20}px, ${(mouseY - 0.5) * 20}px)`;
        });

        // Performance optimization
        let ticking = false;
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    ticking = false;
                });
                ticking = true;
            }
        }

        // Smooth reveal animations
        const revealElements = document.querySelectorAll('.heading, .about-content, .skill-item, .portfolio-box');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            revealObserver.observe(el);
        });
