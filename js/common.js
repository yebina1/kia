const $gnbItems = document.querySelectorAll('header nav ul.gnb > li');

$gnbItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    const $clickedSubItem = e.target.closest('ul.sub > li');

    // sub li 클릭이면 gnb 로직 무시
    if ($clickedSubItem) return;

    // 이미 on이면 아무것도 안함
    if (item.classList.contains('on')) return;

    e.preventDefault();

    $gnbItems.forEach((li) => {
      li.classList.remove('on');

      // gnb 꺼질 때 sub도 초기화
      const subItems = li.querySelectorAll('ul.sub > li');
      subItems.forEach(sub => sub.classList.remove('on'));
    });

    item.classList.add('on');
  });

  const $subItems = item.querySelectorAll('ul.sub > li');

  $subItems.forEach((subItem) => {
    subItem.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      $subItems.forEach((li) => li.classList.remove('on'));
      subItem.classList.add('on');
    });
  });
});

// 스크롤 방향에 따라 header 숨김/표시
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
