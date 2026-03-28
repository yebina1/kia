const $gnbItems = document.querySelectorAll('header nav ul.gnb > li');

$gnbItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    const $clickedSubItem = e.target.closest('ul.sub > li');

    if ($clickedSubItem) return;

    $gnbItems.forEach((li) => {
      li.classList.remove('on');

      const subItems = li.querySelectorAll('ul.sub > li');
      subItems.forEach((sub) => sub.classList.remove('on'));
    });

    item.classList.add('on');
  });

  const $subItems = item.querySelectorAll('ul.sub > li');

  $subItems.forEach((subItem) => {
    subItem.addEventListener('click', () => {
      $subItems.forEach((li) => li.classList.remove('on'));
      subItem.classList.add('on');
    });
  });
});

const $header = document.querySelector('header');
let $lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const $currentScrollY = window.scrollY;

  if ($currentScrollY > 100 && $currentScrollY > $lastScrollY) {
    $header.classList.add('hide');
  } else {
    $header.classList.remove('hide');
  }

  $lastScrollY = $currentScrollY;
});

const $familySite = document.querySelector('footer .f_fam');
const $familyToggle = document.querySelector('footer .f_fam strong');

if ($familySite && $familyToggle) {
  $familyToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    $familySite.classList.toggle('on');
  });

  document.addEventListener('click', (e) => {
    if (!$familySite.contains(e.target)) {
      $familySite.classList.remove('on');
    }
  });
}
