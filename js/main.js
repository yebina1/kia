/* section.ev6 */
const $segments = [
  { type: "hold", duration: 0.5 },
  { type: "overlap", duration: 1 },
  { type: "hold", duration: 0.3 },
  { type: "overlap", duration: 1 },
  { type: "hold", duration: 0.3 },
  { type: "photo", duration: 0.8, photo: 0 },
  { type: "overlap", duration: 1 },
  { type: "hold", duration: 0.3 },
  { type: "photo", duration: 0.8, photo: 1 },
  { type: "overlap", duration: 1 },
  { type: "hold", duration: 0.3 },
  { type: "photo", duration: 0.8, photo: 2 },
  { type: "overlap", duration: 1 },
  { type: "hold", duration: 0.3 },
  { type: "photo", duration: 0.8, photo: 3 },
  { type: "hold", duration: 0.5 },
];

const $totalDuration = $segments.reduce((sum, seg) => sum + seg.duration, 0);

const $segmentStarts = [];
let $cum = 0;
for (const $seg of $segments) {
  $segmentStarts.push($cum);
  $cum += $seg.duration;
}

const $overlapIndices = $segments
  .map((seg, i) => (seg.type === "overlap" ? i : -1))
  .filter((i) => i >= 0);

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

const $layerOverlapMap = [-1, 0, 1, 2, 3, 4];

let $progress = 0;
let $rafId = null;
let $scrollTimeout = null;

function getMainLayerClip(overlapIdx) {
  if (overlapIdx < 0) return "inset(0% 0% 0% 0%)";

  const $segIdx = $overlapIndices[overlapIdx];
  if ($segIdx === undefined) return "inset(0% 100% 0% 0%)";

  const $start = $segmentStarts[$segIdx];
  const $dur = $segments[$segIdx].duration;
  const $localP = Math.max(0, Math.min(1, ($progress - $start) / $dur));
  const $rightInset = (1 - $localP) * 100;

  return `inset(0% ${$rightInset}% 0% 0%)`;
}

function getMainLayerOpacity(layerIndex) {
  if (layerIndex < 2) return 1;

  const currentOverlapIdx = $layerOverlapMap[layerIndex];
  const nextOverlapIdx = currentOverlapIdx + 1;
  const nextSegIdx = $overlapIndices[nextOverlapIdx];

  if (nextSegIdx !== undefined) {
    const nextStart = $segmentStarts[nextSegIdx];
    if ($progress >= nextStart) {
      const fadeDur = 0.4;
      if ($progress < nextStart + fadeDur) {
        return 1 - (($progress - nextStart) / fadeDur);
      }
      return 0;
    }
  } else if (layerIndex === 5) {
    const lastPhotoIdx = 3;
    const pSeg = $segments.find((s) => s.type === "photo" && s.photo === lastPhotoIdx);
    
    if (pSeg) {
      const pSegIdx = $segments.indexOf(pSeg);
      const pStart = $segmentStarts[pSegIdx];
      const pEnd = pStart + pSeg.duration;
      
      const holdMargin = 0.2; 
      const fadeOutDur = 0.3; 
      
      if ($progress > pEnd + holdMargin) {
        if ($progress < pEnd + holdMargin + fadeOutDur) {
          return 1 - (($progress - (pEnd + holdMargin)) / fadeOutDur);
        }
        return 0;
      }
    }
  }
  return 1;
}

function getPhotoOpacity(photoIdx) {
  const $seg = $segments.find((s) => s.type === "photo" && s.photo === photoIdx);
  if (!$seg) return 0;

  const $segIdx = $segments.indexOf($seg);
  const $start = $segmentStarts[$segIdx];
  const $end = $start + $seg.duration;

  const holdMargin = 0.2;
  const fadeOutDur = 0.3;

  if ($progress >= $start + 0.01 && $progress <= $end + holdMargin) return 1;
  if ($progress >= $start && $progress < $start + 0.01) {
    return ($progress - $start) / 0.01;
  }

  if ($progress > $end + holdMargin && $progress < $end + holdMargin + fadeOutDur) {
    return 1 - (($progress - ($end + holdMargin)) / fadeOutDur);
  }

  return 0;
}

function updateLayers() {
  for (let $i = 0; $i < $mainLayers.length; $i++) {
    const $clip = getMainLayerClip($layerOverlapMap[$i]);
    $mainLayers[$i].style.clipPath = $clip;
    
    const $opacity = getMainLayerOpacity($i);
    $mainLayers[$i].style.opacity = $opacity;
  }

  for (let $i = 0; $i < $photoLayers.length; $i++) {
    const $opacity = getPhotoOpacity($i);
    $photoLayers[$i].style.opacity = $opacity;
    $photoLayers[$i].style.pointerEvents = $opacity > 0 ? "auto" : "none";
  }

  $scrollIndicator.style.opacity = $progress < 0.3 ? 1 : 0;
}

function handleScroll() {
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
  
}

window.addEventListener("scroll", handleScroll, { passive: true });
window.addEventListener("resize", handleScroll, { passive: true });
handleScroll();


/* section.match */
function handleScroll() {
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
}

window.addEventListener("scroll", handleScroll, { passive: true });
window.addEventListener("resize", handleScroll, { passive: true });
handleScroll();

const $intro = document.querySelector('.intro');
const $options = document.querySelectorAll('section[class*="option"]');

function initLenis() {
  const $lenis = new Lenis();
  window.$mainLenis = $lenis;
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
    });
  }
}

function setupOptionScroll() {
  const optionsArr = gsap.utils.toArray('section[class*="option"]');

  optionsArr.forEach(($sec, index) => {
    const isLastCard = index === optionsArr.length - 1;
    ScrollTrigger.create({
      trigger: $sec,
      start: 'top top',
      end: isLastCard ? '+=100vh' : 'top top',
      endTrigger: isLastCard ? null : optionsArr[optionsArr.length - 1],
      pin: true,
      pinSpacing: isLastCard,
    });
  });

  optionsArr.forEach(($sec, index) => {
    if (index < optionsArr.length - 1) {
      ScrollTrigger.create({
        trigger: optionsArr[index + 1],
        start: 'top bottom',
        end: 'top top',
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

initLenis();
setupIntroScroll();
setupOptionScroll();

function setupRailWidth() {
    const $stage = document.querySelector(".belt_stage");
    const $railItems = document.querySelectorAll(".rail_item");
    if (!$stage || !$railItems.length) return;

    const $stageWidth = $stage.getBoundingClientRect().width;
    document.documentElement.style.setProperty("--belt-stage-width", `${$stageWidth}px`);
    $railItems.forEach(($item) => {
        $item.style.width = `${$stageWidth}px`;
    });
}

let $beltLoopState = [];

function stopBeltLoops() {
    $beltLoopState.forEach(($state) => {
        cancelAnimationFrame($state.rafId);
    });
    $beltLoopState = [];
}

function setupLoopTrack(trackSelector) {
    const $track = document.querySelector(trackSelector);
    if (!$track) return;

    const $beltSpeed = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--belt-speed")
    ) || 180;
    const $computedStyle = getComputedStyle($track);
    const $gapValue = $computedStyle.gap || $computedStyle.columnGap || "0";
    const $gap = Number.isFinite(Number.parseFloat($gapValue)) ? Number.parseFloat($gapValue) : 0;
    const $state = {
        offset: 0,
        lastTime: 0,
        rafId: 0,
        speed: $beltSpeed,
        track: $track,
        gap: $gap,
    };

    function step(time) {
        if (!$state.lastTime) {
            $state.lastTime = time;
        }

        const $deltaTime = (time - $state.lastTime) / 1000;
        $state.lastTime = time;
        $state.offset -= $state.speed * $deltaTime;

        let $firstItem = $state.track.firstElementChild;
        while ($firstItem) {
            const $firstWidth = $firstItem.getBoundingClientRect().width + $state.gap;
            if (!$firstWidth) break;
            if ($state.offset > -$firstWidth) break;

            $state.offset += $firstWidth;
            $state.track.appendChild($firstItem);
            $firstItem = $state.track.firstElementChild;
        }

        $state.track.style.transform = `translate3d(${$state.offset}px, 0, 0)`;
        $state.rafId = requestAnimationFrame(step);
    }

    $state.rafId = requestAnimationFrame(step);
    $beltLoopState.push($state);
}

function setupPartnerBelt() {
    stopBeltLoops();
    setupRailWidth();
    setupLoopTrack(".rail_track");
    setupLoopTrack(".car_track");
}

window.addEventListener("load", setupPartnerBelt);
window.addEventListener("DOMContentLoaded", setupPartnerBelt);
window.addEventListener("resize", setupPartnerBelt);


/* section.review */
const $reviewSection = document.querySelector('.review');
const $reviewCon = document.querySelector('.review_con');
const $lists = document.querySelectorAll('.review_con ul');
const $items = document.querySelectorAll('.review_con li');
const $modal = document.querySelector('.modal');
const $reviewFirstList = $lists[0];

let $currentScroll = 0;
let $step = 276;
let $maxScroll = 0;
let $isWaiting = false;
let $modalShown = false;
let $isCaptured = false;
let $lockedScrollY = 0;
let $reviewScrollTop = 0;
let $captureLockedUntil = 0;
let $releasePending = false;

const $scrollLockTime = 700;
const $modalCloseDelay = 300;
const $captureTolerance = 80;
const $wheelNoiseThreshold = 45;

function updateReviewMetrics() {
    if (!$reviewFirstList) return;

    const $listItems = [...$reviewFirstList.children];
    if ($listItems.length < 2) {
        $step = 0;
        $maxScroll = 0;
        return;
    }

    $step = Math.round($listItems[1].offsetTop - $listItems[0].offsetTop);
    $maxScroll = Math.max(0, ($listItems.length - 1) * $step);
}

function syncReviewLists() {
    $lists.forEach(($list) => {
        $list.style.transform = `translateY(${-1 * $currentScroll}px)`;
    });
}

function checkActive() {
    const $activeIndex = $step > 0 ? Math.round($currentScroll / $step) : 0;

    $lists.forEach(($list) => {
        const $listItems = [...$list.children];
        const $safeIndex = Math.min($activeIndex, $listItems.length - 1);

        $listItems.forEach(($item, $index) => {
            $item.classList.toggle('on', $index === $safeIndex);
        });
    });
}

function getReviewScrollTop() {
    const $sectionRect = $reviewSection.getBoundingClientRect();
    return Math.round(window.scrollY + $sectionRect.top);
}

function isReviewInCaptureZone() {
    const $sectionRect = $reviewSection.getBoundingClientRect();

    return $sectionRect.top <= $captureTolerance && $sectionRect.bottom > window.innerHeight / 2;
}

function stopLenis() {
    if (window.$mainLenis && typeof window.$mainLenis.stop === 'function') {
        window.$mainLenis.stop();
    }
}

function startLenis() {
    if (window.$mainLenis && typeof window.$mainLenis.start === 'function') {
        window.$mainLenis.start();
    }
}

function lockPageScroll($scrollTop) {
    $lockedScrollY = $scrollTop;
    stopLenis();
    document.documentElement.classList.add('review_locked');
    document.body.classList.add('review_locked');
}

function unlockPageScroll($nextScrollY) {
    document.documentElement.classList.remove('review_locked');
    document.body.classList.remove('review_locked');
    window.scrollTo({ top: $nextScrollY, behavior: 'auto' });
    requestAnimationFrame(() => {
        startLenis();
    });
}

function captureReview() {
    $reviewScrollTop = getReviewScrollTop();

    if (Math.abs(window.scrollY - $reviewScrollTop) > 1) {
        window.scrollTo({ top: $reviewScrollTop, behavior: 'auto' });
    }

    $isCaptured = true;
    $releasePending = false;
    lockPageScroll($reviewScrollTop);
    syncReviewLists();
    checkActive();
}

function releaseReview(isDown) {
    const $targetScrollY = isDown
        ? $reviewScrollTop + $captureTolerance + 2
        : Math.max(0, $reviewScrollTop - $captureTolerance - 2);

    $captureLockedUntil = Date.now() + 900;
    $isCaptured = false;
    $isWaiting = false;
    $releasePending = false;
    unlockPageScroll($targetScrollY);
}

function showModal() {
    $modal.classList.add('show');
}

function hideModal() {
    $modal.classList.remove('show');
}

function handleReviewWheel(e) {
    if (!$reviewSection || !$reviewCon || !$reviewFirstList) return;

    const $wheelDelta = Math.abs(e.deltaY);
    const isDown = e.deltaY > 0;

    if ($wheelDelta < $wheelNoiseThreshold) {
        if ($isCaptured) {
            e.preventDefault();
        }
        return;
    }

    if (!$isCaptured && Date.now() < $captureLockedUntil) return;

    if (!$isCaptured && isReviewInCaptureZone()) {
        e.preventDefault();
        captureReview();
        return;
    }

    if (!$isCaptured) return;

    e.preventDefault();

    if ($isWaiting) return;

    if ($modal.classList.contains('show')) {
        $isWaiting = true;

        setTimeout(() => {
            hideModal();
            $modalShown = false;
            $releasePending = true;

            setTimeout(() => {
                $isWaiting = false;
            }, $modalCloseDelay);
        }, $modalCloseDelay);

        return;
    }

    if (isDown && $currentScroll >= $maxScroll && $releasePending) {
        releaseReview(true);
        return;
    }

    if (!isDown && $currentScroll <= 0) {
        releaseReview(false);
        return;
    }

    if (isDown) {
        if ($currentScroll >= $maxScroll) {
            showModal();
            $modalShown = true;
            $releasePending = false;
            $isWaiting = true;

            setTimeout(() => {
                $isWaiting = false;
            }, $scrollLockTime);

            return;
        }

        $currentScroll = Math.min($currentScroll + $step, $maxScroll);
    } else {
        $currentScroll = Math.max($currentScroll - $step, 0);
        $releasePending = false;

        if ($currentScroll < $maxScroll) {
            $modalShown = false;
        }
    }

    $isWaiting = true;
    syncReviewLists();
    checkActive();

    setTimeout(() => {
        $isWaiting = false;
    }, $scrollLockTime);
}

window.addEventListener('wheel', handleReviewWheel, { passive: false });
window.addEventListener('resize', () => {
    updateReviewMetrics();
    syncReviewLists();
    checkActive();
}, { passive: true });
window.addEventListener('load', () => {
    updateReviewMetrics();
    syncReviewLists();
    checkActive();
});
