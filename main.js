// Simulator functionality
const faxSlider = document.getElementById('faxCount');
const emailSlider = document.getElementById('emailCount');
const timeSlider = document.getElementById('timePerOrder');
const faxValue = document.getElementById('faxValue');
const emailValue = document.getElementById('emailValue');
const timeValue = document.getElementById('timeValue');
const resultTime = document.getElementById('resultTime');
const resultCalls = document.getElementById('resultCalls');
const resultCost = document.getElementById('resultCost');

function calculate() {
  const fax = parseInt(faxSlider.value);
  const email = parseInt(emailSlider.value);
  const time = parseInt(timeSlider.value);

  // Update display values with comma formatting
  faxValue.textContent = fax.toLocaleString() + '枚';
  emailValue.textContent = email.toLocaleString() + '件';
  timeValue.textContent = time + '分';

  // Calculate results (年間)
  const totalOrders = fax + email;
  const totalMinutesMonth = totalOrders * time;
  const savedMinutesMonth = totalMinutesMonth * 0.9; // 90% reduction
  const savedHoursYear = Math.round((savedMinutesMonth / 60) * 12); // 年間
  const salesCallsYear = Math.round((savedMinutesMonth / 15) * 12); // 15 min per call, 年間
  const annualCost = Math.round((savedHoursYear * 2000) / 10000); // 2000 yen/hour

  // Update results
  resultTime.textContent = savedHoursYear.toLocaleString();
  resultCalls.textContent = '約' + salesCallsYear.toLocaleString();
  resultCost.textContent = '約' + annualCost;
}

faxSlider.addEventListener('input', calculate);
emailSlider.addEventListener('input', calculate);
timeSlider.addEventListener('input', calculate);

// Initial calculation
calculate();

// Smooth scroll for anchor links
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

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');

    // Close all other items in the same category
    const category = faqItem.closest('.faq-category');
    category.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('active');
    });

    // Toggle current item
    if (!isActive) {
      faqItem.classList.add('active');
    }
  });
});

// Open first FAQ item in each category by default
document.querySelectorAll('.faq-category').forEach(category => {
  const firstItem = category.querySelector('.faq-item');
  if (firstItem) {
    firstItem.classList.add('active');
  }
});

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

document.querySelectorAll('.problem-card, .solution-card, .usecase-card, .faq-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.6s ease-out';
  observer.observe(el);
});
