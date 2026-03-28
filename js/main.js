/* section.best */
const $vehicles = [
    {
        name: "Sportage",
        backText: "SPORTAGE",
        backHtml: "SPOR-<br>TAGE",
        backSize: "220px",
        backSpacing: "-0.08em",
        backClassName: "is-sportage",
        image: "./img/main/best/sportage.png",
        alt: "Kia Sportage",
        specs: {
            horsepower: "190 HP",
            efficiency: "29-39 MPG",
            torque: "195 LB-FT",
            engine: "1,999 CC"
        }
    },
    {
        name: "Sorento",
        backText: "SORENTO",
        backHtml: "SOREN<br>TO",
        backSize: "220px",
        backSpacing: "-0.08em",
        backClassName: "is-sorento",
        image: "./img/main/best/sorento.png",
        alt: "Kia Sorento",
        specs: {
            horsepower: "227 HP",
            efficiency: "34–37 MPG",
            torque: "258 LB-FT",
            engine: "1,598 CC"
        }
    },
    {
        name: "Seltos",
        backText: "SELTOS",
        backHtml: "SELTOS",
        backSize: "320px",
        backSpacing: "-0.08em",
        backClassName: "is-seltos",
        image: "./img/main/best/seltos.png",
        alt: "Kia Seltos",
        specs: {
            horsepower: "190 HP",
            efficiency: "25–26 MPG",
            torque: "195 LB-FT",
            engine: "1,598 CC"
        }
    },
    {
        name: "K4",
        backText: "K4",
        backHtml: "K4",
        backSize: "420px",
        backSpacing: "-0.08em",
        backClassName: "is-k4",
        image: "./img/main/best/k4.png",
        alt: "Kia K4",
        specs: {
            horsepower: "190 HP",
            efficiency: "26–30 MPG",
            torque: "195 LB-FT",
            engine: "1,598 CC"
        }
    },
    {
        name: "Telluride",
        backText: "TELLURIDE",
        backHtml: "TELLU-<br>RIDE",
        backSize: "220px",
        backSpacing: "-0.1em",
        backClassName: "is-telluride",
        image: "./img/main/best/telluride.png",
        alt: "Kia Telluride",
        specs: {
            horsepower: "291 HP",
            efficiency: "20–22 MPG",
            torque: "262 LB-FT",
            engine: "3,778 CC"
        }
    }
];

const $showcase = document.querySelector(".best_showcase");
const $backText = document.querySelector(".best_back_text");
const $backTextGlass = $backText ? $backText.querySelector(".glass") : null;
const $cards = Array.from(document.querySelectorAll(".best_car_card"));
const $specValues = document.querySelectorAll(".best_spec_value");
const $bestSection = document.querySelector(".best");

const MOVE_DURATION = 900;
const TEXT_DELAY = 500;
const ENTER_DELAY = Math.max(0, TEXT_DELAY - MOVE_DURATION);
const SLOT_REVEAL_DELAY = 260;

let $currentIndex = 0;
let $isAnimating = false;
let $delayTimer = null;
let $hasActivatedSpecCount = false;

if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
}

function getLoopedIndex(index) {
    return (index + $vehicles.length) % $vehicles.length;
}

function splitSpecValue(value) {
    const $trimmedValue = value.trim();
    const $lastSpaceIndex = $trimmedValue.lastIndexOf(" ");

    if ($lastSpaceIndex === -1) {
        return { number: $trimmedValue, unit: "" };
    }

    return {
        number: $trimmedValue.slice(0, $lastSpaceIndex),
        unit: $trimmedValue.slice($lastSpaceIndex + 1)
    };
}

function formatAnimatedNumber(value) {
    return Math.max(0, Math.floor(value)).toLocaleString("en-US");
}

function animateSpecNumber($element, targetText) {
    if (!$element) {
        return;
    }

    const $matches = [...targetText.matchAll(/\d[\d,]*/g)];

    if (!$matches.length || !window.gsap) {
        $element.textContent = targetText;
        return;
    }

    const $sources = $matches.map((match) => ({
        raw: match[0],
        value: parseInt(match[0].replace(/,/g, ""), 10) || 0
    }));
    const $state = { values: new Array($sources.length).fill(0) };

    gsap.killTweensOf($state.values);
    gsap.to($state.values, {
        duration: 1.2,
        ease: "power2.out",
        endArray: $sources.map((item) => item.value),
        onUpdate() {
            let $text = targetText;

            $sources.forEach((item, index) => {
                $text = $text.replace(item.raw, formatAnimatedNumber($state.values[index]));
            });

            $element.textContent = $text;
        },
        onComplete() {
            $element.textContent = targetText;
        }
    });
}

function updateSpecNumbers(index, shouldAnimate = false) {
    const $currentVehicle = $vehicles[index];

    $specValues.forEach(($item) => {
        const $specKey = $item.dataset.spec;
        const $specValue = splitSpecValue($currentVehicle.specs[$specKey]);
        const $number = $item.querySelector(".best_spec_number");
        const $unit = $item.querySelector(".best_spec_unit");

        if ($number) {
            if (shouldAnimate) {
                animateSpecNumber($number, $specValue.number);
            } else {
                $number.textContent = $specValue.number;
            }
        }

        if ($unit) {
            $unit.textContent = $specValue.unit;
        }
    });
}

function renderTextContent(index, shouldAnimateSpecs = false) {
    const $currentVehicle = $vehicles[index];

    if ($backTextGlass) {
        $backTextGlass.innerHTML = $currentVehicle.backHtml || $currentVehicle.backText;
        $backTextGlass.style.fontSize = $currentVehicle.backSize;
        $backTextGlass.style.letterSpacing = $currentVehicle.backSpacing;
        $backTextGlass.className = "glass";

        if ($currentVehicle.backClassName) {
            $backTextGlass.classList.add($currentVehicle.backClassName);
        }
    }

    updateSpecNumbers(index, shouldAnimateSpecs);
}

function setCard(card, slot, vehicleIndex) {
    const $vehicle = $vehicles[vehicleIndex];
    const $image = card.querySelector(".best_car_image");

    card.dataset.slot = slot;
    card.dataset.vehicleIndex = String(vehicleIndex);
    card.classList.remove("main", "best_car_card_left", "best_car_card_main", "best_car_card_right", "is-hidden-card", "is-floating");
    card.classList.add(`best_car_card_${slot}`);
    card.classList.toggle("main", slot === "main");

    if (slot === "main") {
        card.classList.add("best_car_card_main");
        card.setAttribute("aria-label", "Current vehicle");
    } else {
        card.setAttribute("aria-label", `Show ${slot === "left" ? "previous" : "next"} vehicle`);
    }

    if ($image) {
        $image.src = $vehicle.image;
        $image.alt = $vehicle.alt;
    }

    clearFloating(card);
}

function renderState(index) {
    setCard($cards[0], "left", getLoopedIndex(index - 1));
    setCard($cards[1], "main", index);
    setCard($cards[2], "right", getLoopedIndex(index + 1));
    renderTextContent(index);
}

function getFrameRect(card) {
    const $frame = card.querySelector(".best_car_frame");
    return ($frame || card).getBoundingClientRect();
}

function getCardRect(card) {
    return card.getBoundingClientRect();
}

function setFloating(card, rect) {
    card.classList.add("is-floating");
    card.style.left = `${rect.left}px`;
    card.style.top = `${rect.top}px`;
    card.style.width = `${rect.width}px`;
    card.style.height = `${rect.height}px`;
}

function clearFloating(card) {
    card.classList.remove("is-floating");
    card.classList.remove("is-entering-main");
    card.classList.remove("is-leaving-main");
    card.classList.remove("is-delayed-reveal");
    card.style.removeProperty("left");
    card.style.removeProperty("top");
    card.style.removeProperty("width");
    card.style.removeProperty("height");
    card.style.removeProperty("transition");
}

function animateCardToRect(card, targetRect) {
    return new Promise((resolve) => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                card.style.transition = [
                    `left ${MOVE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                    `top ${MOVE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                    `width ${MOVE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                    `height ${MOVE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`
                ].join(", ");
                card.style.left = `${targetRect.left}px`;
                card.style.top = `${targetRect.top}px`;
                card.style.width = `${targetRect.width}px`;
                card.style.height = `${targetRect.height}px`;
            });
        });

        window.setTimeout(resolve, MOVE_DURATION);
    });
}

function wait(ms) {
    return new Promise((resolve) => {
        $delayTimer = window.setTimeout(resolve, ms);
    });
}

async function animateTransition(direction) {
    if ($isAnimating) {
        return;
    }

    const $leftCard = $cards.find((card) => card.dataset.slot === "left");
    const $mainCard = $cards.find((card) => card.dataset.slot === "main");
    const $rightCard = $cards.find((card) => card.dataset.slot === "right");

    if (!$leftCard || !$mainCard || !$rightCard) {
        return;
    }

    const $clickedCard = direction === "left" ? $leftCard : $rightCard;
    const $oppositeCard = direction === "left" ? $rightCard : $leftCard;
    const $nextIndex = getLoopedIndex($currentIndex + (direction === "left" ? -1 : 1));
    const $nextLeftIndex = getLoopedIndex($nextIndex - 1);
    const $nextRightIndex = getLoopedIndex($nextIndex + 1);

    const $mainRect = getCardRect($mainCard);
    const $mainFrameRect = getFrameRect($mainCard);
    const $clickedRect = getFrameRect($clickedCard);
    const $oppositeRect = getFrameRect($oppositeCard);

    $isAnimating = true;
    $showcase.classList.add("is-transitioning");
    $backText.classList.add("is-emphasized");

    renderTextContent($nextIndex, $hasActivatedSpecCount);

    setFloating($mainCard, $mainRect);
    $mainCard.classList.add("is-leaving-main");
    $mainCard.classList.remove("main", "best_car_card_main");
    $mainCard.classList.add("is-hidden-card");

    if (direction === "left") {
        $oppositeCard.classList.add("is-hidden-card");
    } else {
        $oppositeCard.classList.add("is-hidden-card");
    }

    await animateCardToRect($mainCard, $oppositeRect);

    $mainCard.classList.remove("is-hidden-card");

    await wait(ENTER_DELAY);

    if (direction === "left") {
        $oppositeCard.classList.add("is-delayed-reveal");
        setCard($oppositeCard, "left", $nextLeftIndex);
    } else {
        $oppositeCard.classList.add("is-delayed-reveal");
        setCard($oppositeCard, "right", $nextRightIndex);
    }

    window.setTimeout(() => {
        $oppositeCard.classList.remove("is-delayed-reveal");
    }, SLOT_REVEAL_DELAY);

    setFloating($clickedCard, $clickedRect);
    $clickedCard.classList.add("is-entering-main");
    $clickedCard.classList.add("is-hidden-card");

    await animateCardToRect($clickedCard, $mainFrameRect);

    $currentIndex = $nextIndex;

    setCard($cards[0], "left", $nextLeftIndex);
    setCard($cards[1], "main", $nextIndex);
    setCard($cards[2], "right", $nextRightIndex);

    $backText.classList.remove("is-emphasized");
    $showcase.classList.remove("is-transitioning");
    $isAnimating = false;
}

function handleCardClick(event) {
    const $card = event.currentTarget;
    const $slot = $card.dataset.slot;

    if ($slot === "main") {
        return;
    }

    animateTransition($slot);
}

if ($showcase && $backText && $backTextGlass && $cards.length === 3 && $specValues.length) {
    renderState($currentIndex);
    $cards.forEach((card) => {
        card.addEventListener("click", handleCardClick);
    });

    if (window.ScrollTrigger && $bestSection) {
        ScrollTrigger.create({
            trigger: $bestSection,
            start: "top 55%",
            onEnter() {
                $hasActivatedSpecCount = true;
                updateSpecNumbers($currentIndex, true);
            },
            onLeaveBack() {
                $hasActivatedSpecCount = false;
                $specValues.forEach(($item) => {
                    const $number = $item.querySelector(".best_spec_number");

                    if ($number) {
                        $number.textContent = "0";
                    }
                });
            }
        });
    }
}

/* section.ev6 */
const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const mix = (a, b, t) => a + (b - a) * t;
const sstep = (a, b, v) => {
  const t = clamp((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

function initEv6Scene() {
  const section = document.getElementById("scrollScene");
  const scene = document.getElementById("scene");
  const bgTrack = document.getElementById("bgTrack");
  const bg1Img = document.getElementById("bg1Img");
  const bg2Img = document.getElementById("bg2Img");
  const carWrap = document.getElementById("carWrap");
  const solidCar = document.getElementById("solidCar");
  const xrayCar = document.getElementById("xrayCar");
  const dashMask = document.getElementById("dashMask");
  const luggageMask = document.getElementById("luggageMask");
  const seatingMask = document.getElementById("seatingMask");
  const carpetsMask = document.getElementById("carpetsMask");
  const detailsLayer = document.getElementById("detailsLayer");
  const dashPhotoCard = document.getElementById("dashPhotoCard");
  const luggagePhotoCard = document.getElementById("luggagePhotoCard");
  const seatingPhotoCard = document.getElementById("seatingPhotoCard");
  const carpetsPhotoCard = document.getElementById("carpetsPhotoCard");
  const root = document.documentElement;

  const requiredNodes = [
    section,
    bgTrack,
    bg2Img,
    carWrap,
    solidCar,
    xrayCar,
    dashMask,
    luggageMask,
    seatingMask,
    carpetsMask,
    detailsLayer,
    dashPhotoCard,
    luggagePhotoCard,
    seatingPhotoCard,
    carpetsPhotoCard,
  ];

  if (requiredNodes.some((node) => !node)) {
    console.warn("[ev6_ver2] Scene init skipped because required elements are missing.");
    return;
  }

  let rafId = null;
  document.body.style.backgroundColor = "";

  function render() {
    const total = Math.max(section.offsetHeight - window.innerHeight, 1);
    const passed = clamp(-section.getBoundingClientRect().top, 0, total);
    const p = passed / total;
    const vh = window.innerHeight;

    const baseEnd = 0.49;
    const baseP = clamp(p / baseEnd);

    const enterP = sstep(0.03, 0.24, baseP);
    const cruiseP = sstep(0.24, 0.46, baseP);
    const panelPushP = sstep(0.46, 0.68, baseP);
    const morphP = sstep(0.72, 0.84, baseP);

    const trackY = Math.round(mix(0, -vh, panelPushP));
    bgTrack.style.transform = `translate3d(0, ${trackY}px, 0)`;

    const bg1InnerY = mix(0, -vh * 0.03, sstep(0.06, 0.46, baseP));
    const bg2InnerY = mix(vh * 0.035, 0, panelPushP);
    const bg1Scale = mix(1.02, 1.0, panelPushP);
    const bg2Scale = mix(1.04, 1.0, panelPushP);

    if (bg1Img) {
      bg1Img.style.transform = `translate3d(0, ${Math.round(bg1InnerY)}px, 0) scale(${bg1Scale * 1.002})`;
    }
    bg2Img.style.transform = `translate3d(0, ${Math.round(bg2InnerY)}px, 0) scale(${bg2Scale * 1.002})`;

    const carHeight = carWrap.offsetHeight;
    const startY = carHeight * 1.18 + vh * 0.18;
    const enterY = mix(startY, -vh * 0.04, enterP);
    const cruiseY = mix(0, -vh * 0.04, cruiseP);
    const settleY = mix(0, -vh * 0.08, panelPushP);
    const y = enterY + cruiseY + settleY;

    const approachScale = mix(1.12, 1.0, enterP);
    const shrinkScale = mix(1.0, 0.5, panelPushP);
    const holdScale = approachScale * shrinkScale;
    carWrap.style.transform = `translate(-50%, -100%) translate3d(0, ${y}px, 0) scale(${holdScale})`;

    const solidVisibleP = sstep(0.05, 0.14, baseP);
    const solidOpacity = solidVisibleP * (1 - morphP);
    const solidBlur = mix(18, 0, solidVisibleP);
    const solidShadowY = mix(84, 32, panelPushP);
    const solidShadowBlur = mix(120, 56, panelPushP);
    solidCar.style.opacity = String(solidOpacity);
    solidCar.style.filter = `drop-shadow(0 ${solidShadowY}px ${solidShadowBlur}px rgba(0,0,0,0.45)) blur(${solidBlur}px)`;

    const xrayOpacity = morphP;
    const xrayBlur = mix(8, 0.6, morphP);
    const xrayGlow = mix(8, 26, morphP);
    const xrayBrightness = mix(1.0, 1.08, morphP);
    xrayCar.style.opacity = String(xrayOpacity);
    xrayCar.style.filter = `drop-shadow(0 0 ${xrayGlow}px rgba(255,255,255,0.16)) blur(${xrayBlur}px) brightness(${xrayBrightness})`;

    const bodyBlend = sstep(0.56, 0.74, baseP);
    const ev6Background = bodyBlend < 0.5 ? "#000000" : "#252941";
    section.style.backgroundColor = ev6Background;
    if (scene) {
      scene.style.backgroundColor = ev6Background;
    }

    const bg2StageP = clamp((p - baseEnd) / (1 - baseEnd));

    const dashReveal = sstep(0.05, 0.15, bg2StageP);
    const dashFadeOut = sstep(0.22, 0.26, bg2StageP);
    const dashVisible = dashReveal > 0.001 ? 1 - dashFadeOut : 0;
    dashMask.style.opacity = String(dashVisible);
    dashMask.style.clipPath = `inset(${(1 - dashReveal) * 100}% 0 0 0)`;

    const luggageReveal = sstep(0.31, 0.40, bg2StageP);
    const luggageFadeOut = sstep(0.47, 0.51, bg2StageP);
    const seatReveal = sstep(0.56, 0.65, bg2StageP);
    const seatFadeOut = sstep(0.72, 0.76, bg2StageP);
    const carpetReveal = sstep(0.81, 0.90, bg2StageP);

    const luggageVisible = luggageReveal > 0.001 ? 1 - luggageFadeOut : 0;
    luggageMask.style.opacity = String(luggageVisible);
    luggageMask.style.clipPath = `inset(${(1 - luggageReveal) * 100}% 0 0 0)`;

    const seatVisible = seatReveal > 0.001 ? 1 - seatFadeOut : 0;
    seatingMask.style.opacity = String(seatVisible);
    seatingMask.style.clipPath = `inset(${(1 - seatReveal) * 100}% 0 0 0)`;

    const carpetVisible = carpetReveal > 0.001 ? carpetReveal : 0;
    carpetsMask.style.opacity = String(carpetVisible);
    carpetsMask.style.clipPath = `inset(${(1 - carpetReveal) * 100}% 0 0 0)`;

    const anyDetailsOn = bg2StageP >= 0.11;
    detailsLayer.style.opacity = anyDetailsOn ? "1" : "0";
    detailsLayer.style.transform = anyDetailsOn ? "translate3d(0, 0, 0)" : "translate3d(0, 18px, 0)";

    const dashPhotoOpacity = sstep(0.11, 0.16, bg2StageP) * (1 - sstep(0.22, 0.26, bg2StageP));
    const nextPhotoOpacity = sstep(0.37, 0.42, bg2StageP) * (1 - sstep(0.47, 0.51, bg2StageP));
    const seatPhotoOpacity = sstep(0.62, 0.67, bg2StageP) * (1 - sstep(0.72, 0.76, bg2StageP));
    const carpetPhotoOpacity = sstep(0.87, 0.92, bg2StageP);

    dashPhotoCard.style.opacity = String(dashPhotoOpacity);
    dashPhotoCard.style.transform = `translate3d(0, ${dashPhotoOpacity > 0 ? 0 : 18}px, 0) scale(${dashPhotoOpacity > 0 ? 1 : 0.76})`;
    luggagePhotoCard.style.opacity = String(nextPhotoOpacity);
    luggagePhotoCard.style.transform = `translate3d(0, ${nextPhotoOpacity > 0 ? 0 : 18}px, 0) scale(${nextPhotoOpacity > 0 ? 1 : 0.76})`;
    seatingPhotoCard.style.opacity = String(seatPhotoOpacity);
    seatingPhotoCard.style.transform = `translate3d(0, ${seatPhotoOpacity > 0 ? 0 : 18}px, 0) scale(${seatPhotoOpacity > 0 ? 1 : 0.76})`;
    carpetsPhotoCard.style.opacity = String(carpetPhotoOpacity);
    carpetsPhotoCard.style.transform = `translate3d(0, ${carpetPhotoOpacity > 0 ? 0 : 18}px, 0) scale(${carpetPhotoOpacity > 0 ? 1 : 0.76})`;

    const dashFocusOn = bg2StageP >= 0.11 && bg2StageP < 0.22;
    const luggageFocusOn = bg2StageP >= 0.37 && bg2StageP < 0.47;
    const seatingFocusOn = bg2StageP >= 0.62 && bg2StageP < 0.72;
    const carpetFocusOn = bg2StageP >= 0.87;

    root.style.setProperty("--dash-grow", dashFocusOn ? "1" : "0");
    root.style.setProperty("--luggage-grow", luggageFocusOn ? "1" : "0");
    root.style.setProperty("--seating-grow", seatingFocusOn ? "1" : "0");
    root.style.setProperty("--carpet-grow", carpetFocusOn ? "1" : "0");
    root.style.setProperty("--photo-scale", "1");
    root.style.setProperty("--photo-opacity", "1");
    root.style.setProperty("--photo-y", "0px");
  }

  function requestRender() {
    if (rafId) {
      return;
    }

    rafId = window.requestAnimationFrame(() => {
      render();
      rafId = null;
    });
  }

  window.addEventListener("scroll", requestRender, { passive: true });
  window.addEventListener("resize", requestRender);
  window.addEventListener("load", requestRender);
  requestRender();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initEv6Scene, { once: true });
} else {
  initEv6Scene();
}


/* section.match */
let $rafId = null;

function handleScroll() {
  if (
    typeof $container === "undefined" ||
    !$container ||
    typeof $totalDuration === "undefined" ||
    typeof updateLayers !== "function"
  ) {
    return;
  }

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

function setupIntroPin() {
  const $firstOption = document.querySelector('.option01');

  if (!$intro || !$firstOption) {
    return;
  }

  ScrollTrigger.create({
    trigger: $intro,
    start: 'top top',
    end: 'top top',
    endTrigger: $firstOption,
    pin: true,
    pinSpacing: false,
  });
}

function setupOptionScroll() {
  const optionsArr = gsap.utils.toArray('section[class*="option"]');

  optionsArr.forEach(($sec, index) => {
    const isLastCard = index === optionsArr.length - 1;
    const nextSection = optionsArr[index + 1];
    ScrollTrigger.create({
      trigger: $sec,
      start: 'top top',
      end: isLastCard ? '+=100vh' : 'top top',
      endTrigger: isLastCard ? null : nextSection,
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
setupIntroPin();
setupOptionScroll();

function setupMatchCursor() {
  const $cards = document.querySelectorAll('.match section[class*="option"] .bottom>ul.cars>li');
  const canUseCustomCursor = window.matchMedia('(pointer: fine)').matches;

  if (!$cards.length || !canUseCustomCursor) return;

  const $cursor = document.createElement('div');
  const $label = document.createElement('span');

  $cursor.className = 'match-cursor';
  $label.textContent = 'Explore';
  $cursor.appendChild($label);
  document.body.appendChild($cursor);

  function moveCursor(event) {
    $cursor.style.left = `${event.clientX}px`;
    $cursor.style.top = `${event.clientY}px`;
  }

  function showCursor(event) {
    moveCursor(event);
    $cursor.classList.add('is-visible');
  }

  function hideCursor() {
    $cursor.classList.remove('is-visible');
    $cursor.classList.remove('is-active');
  }

  function activateCursor() {
    $cursor.classList.add('is-active');
  }

  function deactivateCursor() {
    $cursor.classList.remove('is-active');
  }

  $cards.forEach(($card) => {
    $card.addEventListener('pointerenter', showCursor);
    $card.addEventListener('pointermove', moveCursor);
    $card.addEventListener('pointerleave', hideCursor);
    $card.addEventListener('pointerdown', activateCursor);
    $card.addEventListener('pointerup', deactivateCursor);
    $card.addEventListener('pointercancel', deactivateCursor);
  });

  window.addEventListener('blur', hideCursor);
  window.addEventListener('scroll', hideCursor, { passive: true });
  window.addEventListener('pointerup', deactivateCursor);
}

setupMatchCursor();

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
