document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burgerBtn");
  const nav = document.getElementById("navLinks");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("active");
      nav.classList.toggle("active");
    });
  }

  const timelineScroll = document.querySelector('.timeline-scroll');

  if (timelineScroll) {
    let isDown = false;
    let startX;
    let scrollLeft;

    timelineScroll.addEventListener('mousedown', (e) => {
      isDown = true;
      timelineScroll.classList.add('dragging');
      startX = e.pageX - timelineScroll.offsetLeft;
      scrollLeft = timelineScroll.scrollLeft;
    });

    timelineScroll.addEventListener('mouseleave', () => {
      isDown = false;
      timelineScroll.classList.remove('dragging');
    });

    timelineScroll.addEventListener('mouseup', () => {
      isDown = false;
      timelineScroll.classList.remove('dragging');
    });

    timelineScroll.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - timelineScroll.offsetLeft;
      const walk = (x - startX) * 1.2;
      timelineScroll.scrollLeft = scrollLeft - walk;
    });
  }
});
