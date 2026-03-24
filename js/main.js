/* section.ev6 */
// ===== 세그먼트 정의 =====
// type: "overlap" = clip-path 좌→우 전환, "hold" = 유지, "photo" = 포토 등장
const $segments = [
  { type: "hold", duration: 0.5 },                // 0: img1 표시
  { type: "overlap", duration: 1 },                // 1: img2가 img1 위로 전환
  { type: "hold", duration: 0.3 },                 // 2: img2 유지
  { type: "overlap", duration: 1 },                // 3: img3가 img2 위로 전환
  { type: "hold", duration: 0.3 },                 // 4: img3 유지
  { type: "photo", duration: 0.8, photo: 0 },      // 5: photo4 등장
  { type: "overlap", duration: 1 },                // 6: img5가 img3 위로 전환
  { type: "hold", duration: 0.3 },                 // 7: img5 유지
  { type: "photo", duration: 0.8, photo: 1 },      // 8: photo6 등장
  { type: "overlap", duration: 1 },                // 9: img7가 img5 위로 전환
  { type: "hold", duration: 0.3 },                 // 10: img7 유지
  { type: "photo", duration: 0.8, photo: 2 },      // 11: photo8 등장
  { type: "overlap", duration: 1 },                // 12: img9가 img7 위로 전환
  { type: "hold", duration: 0.3 },                 // 13: img9 유지
  { type: "photo", duration: 0.8, photo: 3 },      // 14: photo10 등장
  { type: "hold", duration: 0.5 },                 // 15: 마지막 유지
];

// ===== 상수 계산 =====
const $totalDuration = $segments.reduce((sum, seg) => sum + seg.duration, 0);

// 각 세그먼트 시작 시점 계산
const $segmentStarts = [];
let $cum = 0;
for (const $seg of $segments) {
  $segmentStarts.push($cum);
  $cum += $seg.duration;
}

// overlap 타입 세그먼트 인덱스 목록
const $overlapIndices = $segments
  .map((seg, i) => (seg.type === "overlap" ? i : -1))
  .filter((i) => i >= 0);

// ===== DOM 요소 =====
const $container = document.getElementById("scroll_container");
const $mainLayers = [
  document.getElementById("layer_1"),
  document.getElementById("layer_2"),
  document.getElementById("layer_3"),
  document.getElementById("layer_4"),
  document.getElementById("layer_5"),
  document.getElementById("layer_6"),
];
const $photoLayers = [
  document.getElementById("photo_1"),
  document.getElementById("photo_2"),
  document.getElementById("photo_3"),
  document.getElementById("photo_4"),
];
const $scrollIndicator = document.getElementById("scroll_indicator");

// 각 메인 레이어의 overlap 인덱스 (-1은 베이스 레이어)
const $layerOverlapMap = [-1, 0, 1, 2, 3, 4];

// ===== 스크롤 진행도 =====
let $progress = 0;
let $rafId = null;
let $scrollTimeout = null;

// ===== 메인 레이어 clip-path 계산 =====
function getMainLayerClip(overlapIdx) {
  if (overlapIdx < 0) return "inset(0% 0% 0% 0%)"; // 베이스 레이어

  const $segIdx = $overlapIndices[overlapIdx];
  if ($segIdx === undefined) return "inset(0% 100% 0% 0%)";

  const $start = $segmentStarts[$segIdx];
  const $dur = $segments[$segIdx].duration;
  const $localP = Math.max(0, Math.min(1, ($progress - $start) / $dur));
  const $rightInset = (1 - $localP) * 100;

  return `inset(0% ${$rightInset}% 0% 0%)`;
}

// ===== 포토 레이어 opacity 계산 =====
function getPhotoOpacity(photoIdx) {
  const $seg = $segments.find((s) => s.type === "photo" && s.photo === photoIdx);
  if (!$seg) return 0;

  const $segIdx = $segments.indexOf($seg);
  const $start = $segmentStarts[$segIdx];
  const $end = $start + $seg.duration;

  if ($progress >= $start + 0.01 && $progress <= $end) return 1;
  if ($progress >= $start && $progress < $start + 0.01) {
    return ($progress - $start) / 0.01;
  }
  return 0;
}

// ===== 레이어 업데이트 =====
function updateLayers() {
  // 메인 레이어 clip-path 업데이트
  for (let $i = 0; $i < $mainLayers.length; $i++) {
    const $clip = getMainLayerClip($layerOverlapMap[$i]);
    $mainLayers[$i].style.clipPath = $clip;
  }

  // 포토 레이어 opacity 업데이트
  for (let $i = 0; $i < $photoLayers.length; $i++) {
    const $opacity = getPhotoOpacity($i);
    $photoLayers[$i].style.opacity = $opacity;
    $photoLayers[$i].style.pointerEvents = $opacity > 0 ? "auto" : "none";
  }

  // 스크롤 인디케이터
  $scrollIndicator.style.opacity = $progress < 0.3 ? 1 : 0;
}

// ===== 스냅 로직 =====
function applyScrollSnap() {
  const stablePoints = [];
  let cum = 0;
  stablePoints.push(cum);
  for (const seg of $segments) {
    cum += seg.duration;
    stablePoints.push(cum);
  }

  let closestP = stablePoints[0];
  let minDiff = Infinity;
  for (const p of stablePoints) {
    const diff = Math.abs($progress - p);
    if (diff < minDiff) {
      minDiff = diff;
      closestP = p;
    }
  }

  const $containerTop = $container.offsetTop;
  const $containerHeight = $container.offsetHeight;
  const $scrollable = $containerHeight - window.innerHeight;
  const targetScrollY = $containerTop + (closestP / $totalDuration) * $scrollable;

  if (Math.abs(window.scrollY - targetScrollY) < 5) return;

  window.scrollTo({
    top: targetScrollY,
    behavior: 'smooth'
  });
}

/* section.match */
// ===== 스크롤 이벤트 핸들러 =====
function handleScroll() {
  // 컨테이너의 전체 높이에서 뷰포트를 뺀 만큼이 스크롤 가능 거리
  const $containerTop = $container.offsetTop;
  const $containerHeight = $container.offsetHeight;
  const $scrollable = $containerHeight - window.innerHeight;
  const $scrolled = window.scrollY - $containerTop;
  const $p = Math.max(0, Math.min(1, $scrolled / $scrollable));
  $progress = $p * $totalDuration;

  if ($rafId) cancelAnimationFrame($rafId);
  $rafId = requestAnimationFrame(() => {
    updateLayers();
    $rafId = null;
  });

  if ($scrollTimeout) clearTimeout($scrollTimeout);
  $scrollTimeout = setTimeout(() => {
    applyScrollSnap();
  }, 150);
}

// ===== 초기화 =====
window.addEventListener("scroll", handleScroll, { passive: true });
window.addEventListener("resize", handleScroll, { passive: true });
handleScroll();

// 요소 선택
const $intro = document.querySelector('.intro');
const $options = document.querySelectorAll('section[class*="option"]');

function initLenis() {
  const $lenis = new Lenis();
  $lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => $lenis.raf(time * 20000));
  gsap.ticker.lagSmoothing(0);
}

function setupIntroScroll() {
  if ($intro) {
    ScrollTrigger.create({
      trigger: $intro,
      start: 'top top',
      end: '+=100%',
      // 다음 섹션이 자연스럽게 위로 올라와 덮이도록 처리
    });
  }
}

function setupOptionScroll() {
  const optionsArr = gsap.utils.toArray('section[class*="option"]');

  // (1) 각 option 섹션을 화면에 고정(pin)
  optionsArr.forEach(($sec, index) => {
    const isLastCard = index === optionsArr.length - 1;
    ScrollTrigger.create({
      trigger: $sec,
      start: 'top top',
      // 마지막 섹션은 pinSpacing을 주고, 그 외엔 다음 섹션이 올라올 수 있도록 처리
      end: isLastCard ? '+=100vh' : 'top top',
      endTrigger: isLastCard ? null : optionsArr[optionsArr.length - 1],
      pin: true,
      pinSpacing: isLastCard,
    });
  });

  // (2) 다음 option 섹션이 올라올 때, 현재 option 섹션을 축소 및 투명도 낮춤
  optionsArr.forEach(($sec, index) => {
    if (index < optionsArr.length - 1) {
      ScrollTrigger.create({
        trigger: optionsArr[index + 1], // 다음 섹션이 트리거
        start: 'top bottom', // 다음 섹션이 화면 밑에서 올라오기 시작할때
        end: 'top top',      // 다음 섹션이 화면 끝까지 다 올라왔을 때
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set($sec, {
            scale: 1 - progress * 0.25,      // 100% -> 75%
            opacity: 1 - progress,           // 1 -> 0
          });
        },
      });
    }
  });
}

// 실행
initLenis();
setupIntroScroll();
setupOptionScroll();