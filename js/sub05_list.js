(() => {
  const filterButtons = Array.from(document.querySelectorAll('.filter_nav button[data-target]'));
  const sections = Array.from(document.querySelectorAll('.vehicle_group[data-filter]'));
  const openCompareButton = document.querySelector('.open_compare');
  const familyToggle = document.querySelector('footer .f_fam > strong');

  if (!filterButtons.length || !sections.length) {
    return;
  }

  const setActiveButton = (targetId) => {
    filterButtons.forEach((button) => {
      const isActive = button.dataset.target === targetId;
      button.classList.toggle('on', isActive);
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selector = button.dataset.target;
      const target = document.querySelector(selector);

      if (!target) return;

      const headerOffset = 150;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth',
      });

      setActiveButton(selector);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const targetId = `#${entry.target.id}`;
        setActiveButton(targetId);
      });
    },
    {
      rootMargin: '-40% 0px -45% 0px',
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));

  if (openCompareButton) {
    openCompareButton.addEventListener('click', () => {
      const evSection = document.querySelector('#ev');
      if (!evSection) return;

      window.scrollTo({
        top: evSection.getBoundingClientRect().top + window.scrollY - 150,
        behavior: 'smooth',
      });
    });
  }

  if (familyToggle) {
    familyToggle.addEventListener('click', () => {
      const container = familyToggle.closest('.f_fam');
      if (!container) return;
      container.classList.toggle('on');
    });
  }
})();
