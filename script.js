// Custom cursor
  const cursor = document.getElementById('cursor');
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });
  document.querySelectorAll('a, .btn, .tag, .skill-group, .project-card, .stat-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('expand'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
  });

  // Nav scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

 
 
  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));

  // ── PROJECT SLIDER ──
  const track = document.getElementById('sliderTrack');
  const btnPrev = document.getElementById('arrowPrev');
  const btnNext = document.getElementById('arrowNext');
  
  let currentSlide = 0;

  function updateSlider() {
    if (!track) return;
    const cards = track.querySelectorAll('.project-card');
    // Mobile hiện 1, Desktop hiện 2
    const cardsPerView = window.innerWidth <= 768 ? 1 : 2; 
    const maxSlide = Math.ceil(cards.length / cardsPerView) - 1;

    // Đảm bảo không trượt quá giới hạn khi resize màn hình
    if (currentSlide > maxSlide) currentSlide = maxSlide;
    if (currentSlide < 0) currentSlide = 0;

    // Tính toán khoảng cách cần dịch chuyển
    const cardWidth = cards[0].offsetWidth;
    const gap = parseFloat(window.getComputedStyle(track).gap) || 24; // 1.5rem ~ 24px
    const moveAmount = currentSlide * cardsPerView * (cardWidth + gap);

    track.style.transform = `translateX(-${moveAmount}px)`;

    // Cập nhật trạng thái nút bấm
    btnPrev.disabled = currentSlide === 0;
    btnNext.disabled = currentSlide >= maxSlide || maxSlide <= 0;
  }

  if (btnPrev && btnNext) {
    btnPrev.addEventListener('click', () => { currentSlide--; updateSlider(); });
    btnNext.addEventListener('click', () => { currentSlide++; updateSlider(); });
    
    // Thêm hiệu ứng cursor to ra khi hover vào nút
    [btnPrev, btnNext].forEach(btn => {
      btn.addEventListener('mouseenter', () => cursor.classList.add('expand'));
      btn.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
    });
  }

  window.addEventListener('resize', updateSlider);
  
  // Khởi tạo slider sau khi DOM render xong
  setTimeout(updateSlider, 100);