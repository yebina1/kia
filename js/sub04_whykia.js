const heroCanvas = document.getElementById("heroCanvas");
const heroSection = document.querySelector(".hero_section");
const heroTitle = document.querySelector(".hero_title");

if (heroCanvas && heroSection) {
    const MOBILE_BREAKPOINT = 900;
    const ctx = heroCanvas.getContext("2d");
    const stars = {
        near_star: { width: 3, speed: 0.2, count: 50, parallax: 42 },
        mid_star: { width: 2, speed: 0.1, count: 100, parallax: 24 },
        far_star: { width: 1, speed: 0.025, count: 350, parallax: 10 }
    };

    let starArray = [];
    const pointer = { x: 0, y: 0 };
    const currentPointer = { x: 0, y: 0 };

    function syncCanvasSize() {
        heroCanvas.width = heroSection.clientWidth;
        heroCanvas.height = heroSection.clientHeight;
    }

    function Star(x, y, width, speed, parallax) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.speed = speed;
        this.parallax = parallax;
        this.color = "#ffffff";

        this.draw = function () {
            const drawX = this.x + (currentPointer.x * this.parallax);
            const drawY = this.y + (currentPointer.y * this.parallax);

            ctx.fillStyle = this.color;
            ctx.fillRect(drawX, drawY, this.width, this.width);
        };

        this.update = function () {
            if (this.x > heroCanvas.width) {
                this.x = -this.width;
            }

            this.x += this.speed;
            this.draw();
        };
    }

    function createStars(config) {
        for (let i = 0; i < config.count; i += 1) {
            const x = Math.random() * Math.max(heroCanvas.width - config.width, 1);
            const y = Math.random() * Math.max(heroCanvas.height - config.width, 1);
            starArray.push(new Star(x, y, config.width, config.speed, config.parallax));
        }
    }

    function initStars() {
        syncCanvasSize();
        starArray = [];
        createStars(stars.near_star);
        createStars(stars.mid_star);
        createStars(stars.far_star);
    }

    function animateStars() {
        ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
        currentPointer.x += (pointer.x - currentPointer.x) * 0.055;
        currentPointer.y += (pointer.y - currentPointer.y) * 0.055;

        for (const star of starArray) {
            star.update();
        }

        window.requestAnimationFrame(animateStars);
    }

    function updatePointer(event) {
        if (window.innerWidth <= MOBILE_BREAKPOINT) {
            resetPointer();
            return;
        }

        const rect = heroSection.getBoundingClientRect();
        const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
        const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;

        pointer.x = normalizedX * 3.15;
        pointer.y = normalizedY * 3.15;
    }

    function resetPointer() {
        pointer.x = 0;
        pointer.y = 0;
    }

    function handleResize() {
        if (window.innerWidth <= MOBILE_BREAKPOINT) {
            resetPointer();
        }

        initStars();
    }

    window.addEventListener("resize", handleResize);
    heroSection.addEventListener("mousemove", updatePointer);
    heroSection.addEventListener("mouseleave", resetPointer);

    initStars();
    animateStars();
}

if (heroTitle) {
    const WAVE_THRESH = 1.35;
    const CHAR_MULT = 1;
    const ANIM_STEP = 70;
    const WAVE_BUF = 3;

    function createAsciiShift(element, options = {}) {
        let originalText = element.textContent;
        let originalChars = originalText.split("");
        let isAnimating = false;
        let cursorPos = 0;
        let waves = [];
        let animationFrameId = null;
        let isHovering = false;
        let originalWidth = null;

        const config = {
            dur: 700,
            chars: ". · - _",
            preserveSpaces: true,
            spread: 1.85,
            ...options
        };

        function updateCursorPos(event) {
            const rect = element.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const length = originalText.length;
            const nextPos = Math.round((x / rect.width) * length);
            cursorPos = Math.max(0, Math.min(nextPos, length - 1));
        }

        function cleanupWaves(time) {
            waves = waves.filter((wave) => time - wave.startTime < config.dur);
        }

        function calcWaveEffect(charIndex, time) {
            let shouldAnimate = false;
            let resultChar = originalChars[charIndex];

            for (const wave of waves) {
                const age = time - wave.startTime;
                const progress = Math.min(age / config.dur, 1);
                const distance = Math.abs(charIndex - wave.startPos);
                const maxDistance = Math.max(wave.startPos, originalChars.length - wave.startPos - 1);
                const radius = (progress * (maxDistance + WAVE_BUF)) / config.spread;

                if (distance <= radius) {
                    shouldAnimate = true;
                    const intensity = Math.max(0, radius - distance);

                    if (intensity <= WAVE_THRESH && intensity > 0) {
                        const scrambledIndex =
                            (distance * CHAR_MULT + Math.floor(age / ANIM_STEP)) % config.chars.length;
                        resultChar = config.chars[scrambledIndex];
                    }
                }
            }

            return { shouldAnimate, char: resultChar };
        }

        function generateScrambledText(time) {
            return originalChars
                .map((char, index) => {
                    if (config.preserveSpaces && char === " ") {
                        return " ";
                    }

                    const result = calcWaveEffect(index, time);
                    return result.shouldAnimate ? result.char : char;
                })
                .join("");
        }

        function stopAnimation() {
            element.textContent = originalText;
            element.classList.remove("is_ascii_active");

            if (originalWidth !== null) {
                element.style.width = "";
                originalWidth = null;
            }

            isAnimating = false;
        }

        function startAnimation() {
            if (isAnimating) {
                return;
            }

            if (originalWidth === null) {
                originalWidth = element.getBoundingClientRect().width;
                element.style.width = originalWidth + "px";
            }

            isAnimating = true;
            element.classList.add("is_ascii_active");

            function animate() {
                const time = Date.now();
                cleanupWaves(time);

                if (!waves.length) {
                    stopAnimation();
                    return;
                }

                element.textContent = generateScrambledText(time);
                animationFrameId = window.requestAnimationFrame(animate);
            }

            animationFrameId = window.requestAnimationFrame(animate);
        }

        function startWave(startPos) {
            waves.push({
                startPos,
                startTime: Date.now(),
                id: Math.random()
            });

            if (!isAnimating) {
                startAnimation();
            }
        }

        function playIntroWave() {
            const centerIndex = Math.max(Math.floor(originalChars.length / 2), 0);
            startWave(centerIndex);
        }

        function handleEnter(event) {
            isHovering = true;
            updateCursorPos(event);
            startWave(cursorPos);
        }

        function handleMove(event) {
            if (!isHovering) {
                return;
            }

            const previousPos = cursorPos;
            updateCursorPos(event);

            if (cursorPos !== previousPos) {
                startWave(cursorPos);
            }
        }

        function handleLeave() {
            isHovering = false;
        }

        element.addEventListener("mouseenter", handleEnter);
        element.addEventListener("mousemove", handleMove);
        element.addEventListener("mouseleave", handleLeave);

        window.setTimeout(playIntroWave, 450);
    }

    createAsciiShift(heroTitle);
}

document.addEventListener("DOMContentLoaded", () => {
    const shell = document.getElementById("storyHistory");
    const frame = shell?.querySelector(".story_frame");
    const introCircle = document.getElementById("introCircle");
    const txtStage = shell?.querySelector(".txt_stage");
    const lead = document.getElementById("txtHistory1");
    const stmt = document.getElementById("txtHistory2");
    const movementStage = document.getElementById("movementStage");
    const visionTitle = movementStage?.querySelector(".vision_title");
    const visionTxt = movementStage?.querySelector(".vision_txt");
    const needsStage = document.getElementById("needsStage");
    const needsTxt = needsStage?.querySelector(".needs_txt");
    const needsLines = Array.from(needsStage?.querySelectorAll(".needs_line") || []);
    const progressBar = document.getElementById("progressBar");
    const sceneTag = document.getElementById("sceneTag");

    if (!shell || !frame || !introCircle || !txtStage || !lead || !stmt || !movementStage || !visionTitle || !visionTxt || !needsStage || !needsTxt || !needsLines.length) {
        return;
    }

    window.setTimeout(() => {
        lead.classList.add("is_animated");
        stmt.classList.add("is_animated");
    }, 100);

    const TOTAL = 6;
    const STORY_VERTICAL_SHIFT = -24;
    let activeSceneIndex = 0;
    let rafId = 0;
    let storyTrigger = null;

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function lerp(start, end, progress) {
        return start + (end - start) * progress;
    }

    function easeOutCubic(progress) {
        return 1 - Math.pow(1 - progress, 3);
    }

    function easeInOutQuart(progress) {
        return progress < 0.5
            ? 8 * Math.pow(progress, 4)
            : 1 - Math.pow(-2 * progress + 2, 4) / 2;
    }

    function getRingTargetScale() {
        const baseSize = introCircle.offsetWidth || 1;
        const viewportDiameter = Math.max(window.innerWidth, window.innerHeight);
        return Math.max((viewportDiameter * 2.7) / baseSize, 1);
    }

    function renderProgress(progress) {
        const timeline = progress * (TOTAL - 1);
        const ringTargetScale = getRingTargetScale();
        const baseRingSize = introCircle.offsetWidth || 1;
        activeSceneIndex = clamp(Math.round(timeline), 0, TOTAL - 1);

        const stmtIn = clamp((timeline - 0.54) / 0.52, 0, 1);
        const circleIn = clamp((timeline - 1.36) / 0.32, 0, 1);
        const circleGrow = clamp((timeline - 1.58) / 1.92, 0, 1);
        const circleOut = clamp((timeline - 3.18) / 0.56, 0, 1);
        const movementIn = clamp((timeline - 2.02) / 0.92, 0, 1);
        const movementOut = clamp((timeline - 3.92) / 0.26, 0, 1);
        const needsIn = clamp((timeline - 4.26) / 0.26, 0, 1);
        const circleAppear = easeOutCubic(circleIn);
        const circleExpand = easeInOutQuart(circleGrow);
        const circleFade = easeOutCubic(circleOut);
        const circleExitScale = lerp(1, 1.18, circleFade);
        const ringScale = lerp(0.88, ringTargetScale, Math.pow(circleExpand, 1.12));
        const ringDiameter = baseRingSize * ringScale;
        const textFadeByRing = clamp((ringDiameter - (window.innerWidth * 0.6)) / (window.innerWidth * 0.12), 0, 1);
        const focusIn = clamp((circleGrow - 0.12) / 0.32, 0, 1);
        const diffuseOut = clamp((circleGrow - 0.52) / 0.38, 0, 1);
        const ringBlur = lerp(18, 1.2, easeOutCubic(focusIn)) + lerp(0, 9, easeOutCubic(diffuseOut)) + lerp(0, 4, circleFade);
        const textFade = easeOutCubic(textFadeByRing);
        const leadDim = easeOutCubic(stmtIn);
        const leadOpacity = 1 - textFade;
        const stmtOpacity = easeOutCubic(stmtIn) * (1 - textFade);
        const movementOpacity = easeOutCubic(movementIn) * (1 - easeOutCubic(movementOut));
        const movementReveal = easeOutCubic(clamp((timeline - 2.02) / 0.88, 0, 1));
        const movementExit = easeOutCubic(movementOut);
        const needsOpacity = needsIn > 0 ? easeOutCubic(needsIn) : 0;
        const needsReveal = easeOutCubic(clamp((timeline - 4.26) / 0.42, 0, 1));
        const movementTextIn = easeOutCubic(clamp((timeline - 2.1) / 0.82, 0, 1));
        const textStageVisible = timeline < 3.02;
        const leadVisible = textStageVisible;
        const stmtVisible = textStageVisible && timeline >= 0.54;
        const movementVisible = timeline >= 1.98 && timeline < 4.2;
        const needsVisible = timeline >= 4.26;

        introCircle.style.opacity = Math.max(0, Math.min(1, circleAppear * (1 - circleFade) * 1)).toFixed(3);
        introCircle.style.transform =
            `translate(-50%, calc(-50% + ${STORY_VERTICAL_SHIFT}px)) scale(${(ringScale * circleExitScale).toFixed(4)})`;
        introCircle.style.filter = `blur(${ringBlur.toFixed(2)}px)`;

        txtStage.style.display = textStageVisible ? "block" : "none";
        txtStage.style.visibility = textStageVisible ? "visible" : "hidden";

        const leadDisplayOpacity = leadVisible ? leadOpacity : 0;
        lead.style.display = leadVisible ? "block" : "none";
        lead.style.opacity = leadDisplayOpacity.toFixed(3);
        lead.style.transform = `translate(-50%, ${lerp(0, -42, textFade).toFixed(2)}px)`;
        lead.style.color = leadDim > 0 ? "var(--kia-white2)" : "var(--text_main)";
        lead.style.visibility = leadDisplayOpacity <= 0.05 ? "hidden" : "visible";

        const stmtDisplayOpacity = stmtVisible ? stmtOpacity : 0;
        stmt.style.display = stmtVisible ? "block" : "none";
        stmt.style.opacity = stmtDisplayOpacity.toFixed(3);
        stmt.style.transform = `translate(-50%, ${lerp(36, -24, clamp((stmtIn * 0.4) + (textFade * 0.6), 0, 1)).toFixed(2)}px)`;
        stmt.style.visibility = stmtDisplayOpacity <= 0.05 ? "hidden" : "visible";

        const movementDisplayOpacity = movementVisible ? movementOpacity : 0;
        movementStage.style.display = movementVisible ? "flex" : "none";
        movementStage.style.opacity = movementDisplayOpacity.toFixed(3);
        movementStage.style.transform = `translateY(${STORY_VERTICAL_SHIFT}px) scale(${lerp(1.06, 0.985, movementExit).toFixed(4)})`;
        movementStage.style.filter = `blur(${(lerp(18, 0, movementReveal) + lerp(0, 16, movementExit)).toFixed(2)}px)`;
        movementStage.style.visibility = movementDisplayOpacity <= 0.05 ? "hidden" : "visible";
        visionTitle.style.opacity = movementDisplayOpacity.toFixed(3);
        visionTitle.style.letterSpacing = `${lerp(0.42, 0.02, movementReveal).toFixed(3)}em`;
        visionTitle.style.filter = `blur(${lerp(14, 0, movementReveal).toFixed(2)}px)`;
        visionTitle.style.textShadow = `0 0 ${lerp(36, 6, movementReveal).toFixed(1)}px rgba(255, 255, 255, ${lerp(0.28, 0.08, movementReveal).toFixed(3)})`;
        visionTxt.style.opacity = (movementDisplayOpacity * movementTextIn).toFixed(3);
        visionTxt.style.transform = `translateY(${lerp(22, 0, movementTextIn).toFixed(2)}px)`;
        visionTxt.style.filter = `blur(${lerp(16, 0, movementTextIn).toFixed(2)}px)`;

        const visibleNeedsOpacity = needsVisible && movementDisplayOpacity <= 0.005 ? needsOpacity : 0;

        needsStage.style.display = needsVisible ? "flex" : "none";
        needsStage.style.opacity = visibleNeedsOpacity.toFixed(3);
        needsStage.style.transform = `translateY(${STORY_VERTICAL_SHIFT}px) scale(${lerp(1.28, 1, needsReveal).toFixed(4)})`;
        needsStage.style.filter = `blur(${lerp(56, 0, needsReveal).toFixed(2)}px)`;
        needsStage.style.visibility = visibleNeedsOpacity <= 0.05 ? "hidden" : "visible";
        needsTxt.style.opacity = visibleNeedsOpacity.toFixed(3);
        needsTxt.style.transform = "translateY(0px)";
        needsLines.forEach((line, index) => {
            const stagger = clamp((needsReveal - (index * 0.09)) / 0.91, 0, 1);
            const lineReveal = easeOutCubic(stagger);
            line.style.opacity = visibleNeedsOpacity <= 0.05 ? "0" : (visibleNeedsOpacity * lineReveal).toFixed(3);
            line.style.filter = `blur(${lerp(54 - (index * 4), 0, lineReveal).toFixed(2)}px)`;
            line.style.transform = `scaleX(${lerp(1.72 - (index * 0.06), 1, lineReveal).toFixed(4)}) scaleY(${lerp(1.14, 1, lineReveal).toFixed(4)})`;
        });

        if (visibleNeedsOpacity <= 0.001) {
            needsStage.style.filter = "blur(56px)";
            needsLines.forEach((line, index) => {
                line.style.opacity = "0";
                line.style.filter = `blur(${54 - (index * 4)}px)`;
                line.style.transform = `scaleX(${(1.72 - (index * 0.06)).toFixed(4)}) scaleY(1.14)`;
            });
        }

        lead.style.color = "var(--text_main)";
        stmt.style.color = "var(--text_main)";
        visionTitle.style.color = "var(--text_main)";
        visionTxt.style.color = "var(--text_sub)";
        needsTxt.style.color = "var(--text_main)";

        if (progressBar) {
            progressBar.style.height = (progress * 100).toFixed(1) + "%";
        }

        if (sceneTag) {
            sceneTag.textContent =
                String(activeSceneIndex + 1).padStart(2, "0") + " / " + String(TOTAL).padStart(2, "0");
        }
    }

    function renderFromScroll() {
        if (window.innerWidth <= 900 || storyTrigger) {
            return;
        }

        const start = shell.offsetTop;
        const end = start + shell.offsetHeight - window.innerHeight;
        const maxScroll = Math.max(end - start, 1);
        const scrollTop = window.scrollY;
        const clamped = clamp(scrollTop - start, 0, maxScroll);
        renderProgress(clamped / maxScroll);
    }

    function setupStoryTrigger() {
        if (!window.gsap || !window.ScrollTrigger || window.innerWidth <= 900) {
            shell.classList.remove("is_gsap_pin");
            storyTrigger = null;
            renderFromScroll();
            return;
        }

        window.gsap.registerPlugin(window.ScrollTrigger);

        if (storyTrigger) {
            storyTrigger.kill();
            storyTrigger = null;
        }

        shell.classList.add("is_gsap_pin");

        storyTrigger = window.ScrollTrigger.create({
            trigger: shell,
            start: "top top",
            end: () => `+=${window.innerHeight * (TOTAL - 1)}`,
            pin: frame,
            pinSpacing: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
                renderProgress(self.progress);
            }
        });

        window.ScrollTrigger.refresh();
    }

    renderProgress(0);
    setupStoryTrigger();

    window.addEventListener("resize", () => {
        if (rafId) {
            window.cancelAnimationFrame(rafId);
        }

        rafId = window.requestAnimationFrame(() => {
            rafId = 0;
            setupStoryTrigger();
        });
    });

    window.addEventListener("scroll", () => {
        renderFromScroll();
    }, { passive: true });
});

document.addEventListener("DOMContentLoaded", () => {
    const solutionSection = document.getElementById("solutionSection");
    const solutionInner = solutionSection?.querySelector(".solution_inner");
    const dragArea = solutionSection?.querySelector(".container");
    const solutionList = solutionSection?.querySelector(".solution_list");
    const solutionProgress = solutionSection?.querySelector(".con");

    if (!solutionSection || !solutionInner || !solutionList || !dragArea) {
        return;
    }

    solutionList.classList.add("solution_media_list");
    const textTrack = solutionList.cloneNode(true);
    textTrack.classList.remove("solution_media_list");
    textTrack.classList.add("solution_text_list");

    Array.from(textTrack.children).forEach((slide) => {
        const img = slide.querySelector("img");
        if (img) {
            img.remove();
        }

        const spacer = document.createElement("div");
        spacer.className = "solution_text_spacer";
        slide.insertBefore(spacer, slide.firstChild);
    });

    dragArea.appendChild(textTrack);

    const slides = Array.from(solutionList.children);
    const textSlides = Array.from(textTrack.children);

    if (!slides.length) {
        return;
    }

    const state = {
        current: 0,
        on: 0,
        off: 0,
        lastOne: 0,
        lastTwo: 0,
        dragging: false,
        sideOffset: 0,
        maxOffset: 0,
        mode: "mobile",
        desktopTrigger: null,
        desktopOffsets: []
    };

    const DESKTOP_BREAKPOINT = 901;
    const SOLUTION_DESKTOP_HOLD = 0.16;

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function lerp(start, end, progress) {
        return (1 - progress) * start + (progress * end);
    }

    function getClientX(event) {
        if ("touches" in event) {
            return event.touches[0]?.clientX ?? event.changedTouches[0]?.clientX ?? 0;
        }

        return event.clientX;
    }

    function updateProgress() {
        if (!solutionProgress) {
            return;
        }

        const currentOffset = state.mode === "desktop" ? state.lastOne : state.lastTwo;
        const scale = state.maxOffset > 0 ? currentOffset / state.maxOffset : 0;
        solutionProgress.style.setProperty("--solution-progress-scale", scale.toFixed(4));

        if (state.mode === "desktop") {
            const segmentCount = Math.max(slides.length - 1, 1);
            const segmentProgress = scale * segmentCount;
            let leftLine = 0;
            let rightLine = 1;

            if (slides.length <= 2) {
                leftLine = clamp(scale, 0, 1);
                rightLine = clamp(1 - scale, 0, 1);
            } else if (segmentProgress <= 1) {
                leftLine = clamp(0.06 + (segmentProgress * 0.94), 0, 1);
                rightLine = 1;
            } else if (segmentProgress < segmentCount - 1) {
                leftLine = 1;
                rightLine = 1;
            } else {
                leftLine = 1;
                rightLine = clamp(segmentCount - segmentProgress, 0, 1);
            }

            solutionProgress.style.setProperty("--solution-dot-ratio", "0.5");
            solutionProgress.style.setProperty("--solution-left-line", leftLine.toFixed(4));
            solutionProgress.style.setProperty("--solution-right-line", rightLine.toFixed(4));
            return;
        }

        solutionProgress.style.setProperty("--solution-dot-ratio", "0");
        solutionProgress.style.setProperty("--solution-left-line", "0");
        solutionProgress.style.setProperty("--solution-right-line", "1");
    }

    function updateSlideFocus() {
        const areaRect = dragArea.getBoundingClientRect();
        const centerX = areaRect.left + (areaRect.width / 2);
        const focusRange = Math.max(areaRect.width * 0.42, 1);

        slides.forEach((slide, index) => {
            const rect = slide.getBoundingClientRect();
            const slideCenter = rect.left + (rect.width / 2);
            const distance = Math.abs(centerX - slideCenter);
            const normalized = clamp(1 - (distance / focusRange), 0, 1);
            const eased = Math.pow(normalized, 1.35);

            slide.style.setProperty("--slide-focus", eased.toFixed(4));
            textSlides[index]?.style.setProperty("--slide-focus", eased.toFixed(4));
        });
    }

    function updateBounds() {
        const viewportWidth = dragArea.clientWidth;
        const firstSlideWidth = slides[0]?.getBoundingClientRect().width || viewportWidth;

        if (state.mode === "desktop") {
            state.sideOffset = 0;
            state.desktopOffsets = slides.map((slide) => {
                const slideWidth = slide.getBoundingClientRect().width || viewportWidth;
                const centeredOffset = slide.offsetLeft - Math.max((viewportWidth - slideWidth) / 2, 0);
                return clamp(centeredOffset, 0, Math.max(solutionList.scrollWidth - viewportWidth, 0));
            });
            state.maxOffset = state.desktopOffsets[state.desktopOffsets.length - 1] || 0;
        } else {
            state.sideOffset = Math.max((viewportWidth - firstSlideWidth) / 2, 0);
            state.maxOffset = Math.max(solutionList.scrollWidth - firstSlideWidth, 0);
            state.desktopOffsets = [];
        }

        state.current = clamp(state.current, 0, state.maxOffset);
        state.lastOne = clamp(state.lastOne, 0, state.maxOffset);
        state.lastTwo = clamp(state.lastTwo, 0, state.maxOffset);
        solutionList.style.transform = `translate3d(${(state.sideOffset - state.lastOne).toFixed(2)}px, 0, 0)`;
        textTrack.style.transform = `translate3d(${(state.sideOffset - state.lastTwo).toFixed(2)}px, 0, 0)`;
        updateProgress();
        updateSlideFocus();
    }

    function snapToNearestSlide() {
        if (!slides.length) {
            return;
        }

        let nearestOffset = 0;
        let nearestDistance = Number.POSITIVE_INFINITY;

        slides.forEach((slide) => {
            const offset = clamp(slide.offsetLeft, 0, state.maxOffset);
            const distance = Math.abs(state.current - offset);

            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestOffset = offset;
            }
        });

        state.current = nearestOffset;
    }

    function render() {
        state.lastOne = lerp(state.lastOne, state.current, 0.085);
        state.lastTwo = lerp(state.lastTwo, state.current, 0.08);

        if (state.mode === "desktop") {
            solutionList.style.transform =
                `translate3d(${(-state.lastOne).toFixed(2)}px, 0, 0)`;
            textTrack.style.transform =
                `translate3d(${(-state.lastOne).toFixed(2)}px, 0, 0)`;
            updateProgress();
            updateSlideFocus();
            window.requestAnimationFrame(render);
            return;
        }

        const diff = state.current - state.lastOne;
        const acc = diff / Math.max(dragArea.clientWidth, 1);
        const bounce = 1 - Math.abs(acc * 0.25);
        const skew = acc * 7.5;
        const tiltY = acc * 10;
        const tiltX = -Math.abs(acc * 6.5);

        solutionList.style.transform =
            `translate3d(${(state.sideOffset - state.lastOne).toFixed(2)}px, 0, 0) rotateX(${tiltX.toFixed(3)}deg) rotateY(${tiltY.toFixed(3)}deg) scaleY(${bounce.toFixed(4)}) skewX(${skew.toFixed(3)}deg)`;
        textTrack.style.transform =
            `translate3d(${(state.sideOffset - state.lastTwo).toFixed(2)}px, 0, 0) rotateX(${(tiltX * 0.55).toFixed(3)}deg) rotateY(${(tiltY * 0.4).toFixed(3)}deg) scaleY(${bounce.toFixed(4)})`;

        updateProgress();
        updateSlideFocus();
        window.requestAnimationFrame(render);
    }

    function onPointerDown(event) {
        if (state.mode !== "mobile") {
            return;
        }

        state.dragging = true;
        state.on = getClientX(event);
        state.off = state.current;
        solutionList.classList.add("is_dragging");
        event.preventDefault();
    }

    function onPointerMove(event) {
        if (!state.dragging || state.mode !== "mobile") {
            return;
        }

        const pointerX = getClientX(event);
        state.current = state.off - (pointerX - state.on);
        state.current = clamp(state.current, 0, state.maxOffset);
    }

    function stopDragging() {
        if (!state.dragging || state.mode !== "mobile") {
            return;
        }

        state.dragging = false;
        solutionList.classList.remove("is_dragging");
        snapToNearestSlide();
    }

    function destroyDesktopScroll() {
        if (state.desktopTrigger) {
            state.desktopTrigger.kill();
            state.desktopTrigger = null;
        }
    }

    function setupDesktopScroll() {
        if (!window.gsap || !window.ScrollTrigger) {
            return;
        }

        window.gsap.registerPlugin(window.ScrollTrigger);
        destroyDesktopScroll();

        state.desktopTrigger = window.ScrollTrigger.create({
            trigger: solutionSection,
            start: "top top",
            end: () => `+=${window.innerHeight * Math.max(slides.length + 0.55, 2.35)}`,
            pin: solutionInner,
            pinSpacing: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onRefresh: (self) => {
                const progress = clamp(self.progress / (1 - SOLUTION_DESKTOP_HOLD), 0, 1);
                state.current = progress * state.maxOffset;
            },
            onUpdate: (self) => {
                const progress = clamp(self.progress / (1 - SOLUTION_DESKTOP_HOLD), 0, 1);
                state.current = progress * state.maxOffset;
            }
        });
    }

    function applySolutionMode() {
        const nextMode = window.innerWidth >= DESKTOP_BREAKPOINT ? "desktop" : "mobile";

        if (nextMode === state.mode && !(nextMode === "desktop" && !state.desktopTrigger)) {
            updateBounds();

            if (state.mode === "desktop" && window.ScrollTrigger) {
                window.ScrollTrigger.refresh();
            }

            return;
        }

        state.mode = nextMode;
        state.dragging = false;
        solutionList.classList.remove("is_dragging");
        solutionSection.classList.toggle("is_desktop_scroll", state.mode === "desktop");
        solutionSection.classList.toggle("is_mobile_drag", state.mode === "mobile");

        if (state.mode === "desktop") {
            state.lastOne = state.current;
            state.lastTwo = state.current;
            updateBounds();
            setupDesktopScroll();
            return;
        }

        destroyDesktopScroll();
        state.current = clamp(state.current, 0, state.maxOffset);
        state.lastOne = state.current;
        state.lastTwo = state.current;
        updateBounds();
    }

    dragArea.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", stopDragging);
    dragArea.addEventListener("dragstart", (event) => {
        event.preventDefault();
    });
    dragArea.addEventListener("touchstart", (event) => {
        if (state.mode !== "mobile") {
            return;
        }

        state.dragging = true;
        state.on = getClientX(event);
        state.off = state.current;
        solutionList.classList.add("is_dragging");
    }, { passive: true });
    window.addEventListener("touchmove", (event) => {
        if (!state.dragging || state.mode !== "mobile") {
            return;
        }

        const pointerX = getClientX(event);
        state.current = state.off - (pointerX - state.on);
        state.current = clamp(state.current, 0, state.maxOffset);
    }, { passive: true });
    window.addEventListener("touchend", stopDragging);
    window.addEventListener("mouseleave", stopDragging);

    window.addEventListener("resize", applySolutionMode);

    applySolutionMode();
    render();
});

document.addEventListener("DOMContentLoaded", () => {
    const partnerSection = document.getElementById("partnerSection");

    if (!partnerSection || !window.gsap || !window.ScrollTrigger || window.innerWidth <= 900) {
        return;
    }

    window.gsap.registerPlugin(window.ScrollTrigger);

    const cards = Array.from(partnerSection.querySelectorAll(".partner_card"));
    const partnerHeading = partnerSection.querySelector(".partner_heading");
    const partnerCardsContainer = partnerSection.querySelector(".partner_cards_container");
    const partnerScrollDownButton = document.getElementById("partnerScrollDownButton");
    const PARTNER_HOLD_PROGRESS = 0.18;

    const smoothStep = (progress) => progress * progress * (3 - (2 * progress));
    const setPartnerCardsToInitialState = () => {
        cards.forEach((card, index) => {
            const innerCard = card.querySelector(".partner_flip_inner");
            const wrapper = card.querySelector(".partner_card_wrapper");
            const tiltShell = card.querySelector(".partner_tilt_shell");
            const images = Array.from(card.querySelectorAll(".partner_face img"));

            window.gsap.set(card, {
                opacity: 1,
                x: "0%",
                y: "0px",
                rotate: 0,
                scale: 1,
            });

            window.gsap.set(innerCard, {
                rotationY: 0,
            });

            card.classList.remove("is_floating", "is_interactive", "is_open", "is_label_visible");
            wrapper?.classList.remove("is_hovered", "is_open");

            if (tiltShell) {
                tiltShell.style.transform = "rotateX(0deg) rotateY(0deg)";
            }

            images.forEach((img) => {
                img.style.transform = "translateX(0px) translateY(0px) scale(1.04)";
            });
        });

        partnerCardsContainer?.classList.remove("has_open_card");
    };

    const closeAllPartnerCards = () => {
        cards.forEach((card) => {
            card.classList.remove("is_open");
            card.classList.remove("is_label_visible");
            const wrapper = card.querySelector(".partner_card_wrapper");
            const tiltShell = card.querySelector(".partner_tilt_shell");
            const images = Array.from(card.querySelectorAll(".partner_face img"));

            wrapper?.classList.remove("is_hovered", "is_open");

            if (tiltShell) {
                tiltShell.style.transform = "rotateX(0deg) rotateY(0deg)";
            }

            images.forEach((img) => {
                img.style.transform = "translateX(0px) translateY(0px) scale(1.04)";
            });
        });

        partnerCardsContainer?.classList.remove("has_open_card");
    };

    const applyPartnerScene = (progress) => {
        const normalizedProgress = window.gsap.utils.clamp(0, 1, progress / (1 - PARTNER_HOLD_PROGRESS));
        const clampedProgress = window.gsap.utils.clamp(0, 1, normalizedProgress);
        const headingProgress = window.gsap.utils.clamp(0, 1, (clampedProgress - 0.5) / 0.22);
        const headingEase = smoothStep(headingProgress);
        const shouldShowPartnerScrollButton = clampedProgress > 0.02 && clampedProgress < 0.68;

        partnerScrollDownButton?.classList.toggle("is_visible", shouldShowPartnerScrollButton);

        if (partnerHeading) {
            window.gsap.set(partnerHeading, {
                opacity: headingEase,
                xPercent: -50,
                y: window.gsap.utils.interpolate(180, 0, headingEase),
            });
        }

        cards.forEach((card, index) => {
            const delay = index * 0.42;
            const cardStart = 0.22 + (delay * 0.03);
            const cardDuration = 0.74 - (delay * 0.045);
            const cardProgress = window.gsap.utils.clamp(
                0,
                1,
                (clampedProgress - cardStart) / cardDuration
            );

            const innerCard = card.querySelector(".partner_flip_inner");
            const shouldFloat = cardProgress >= 0.98;
            const isInteractive = cardProgress >= 0.98;

            let y;
            if (cardProgress < 0.62) {
                const normalizedProgress = cardProgress / 0.62;
                const eased = smoothStep(normalizedProgress);
                y = window.gsap.utils.interpolate("0px", "260px", eased);
            } else if (cardProgress < 0.86) {
                const normalizedProgress = (cardProgress - 0.62) / 0.24;
                const eased = smoothStep(normalizedProgress);
                y = window.gsap.utils.interpolate("260px", "72px", eased);
            } else if (cardProgress < 1) {
                const normalizedProgress = (cardProgress - 0.86) / 0.14;
                const eased = smoothStep(normalizedProgress);
                y = window.gsap.utils.interpolate("72px", "0px", eased);
            } else {
                y = "0px";
            }

            let scale;
            if (cardProgress < 0.46) {
                const normalizedProgress = cardProgress / 0.46;
                const eased = smoothStep(normalizedProgress);
                scale = window.gsap.utils.interpolate(0.82, 0.72, eased);
            } else if (cardProgress < 0.72) {
                const normalizedProgress = (cardProgress - 0.46) / 0.26;
                const eased = smoothStep(normalizedProgress);
                scale = window.gsap.utils.interpolate(0.72, 0.94, eased);
            } else if (cardProgress < 1) {
                const normalizedProgress = (cardProgress - 0.72) / 0.28;
                const eased = smoothStep(normalizedProgress);
                scale = window.gsap.utils.interpolate(1.02, 1.14, eased);
            } else {
                scale = 1.14;
            }

            let x;
            let rotate;
            let rotationY;

            if (cardProgress < 0.62) {
                x = index === 0 ? "0%" : index === 1 ? "0%" : "0%";
                rotate = 0;
                rotationY = 0;
            } else if (cardProgress < 1) {
                const normalizedProgress = (cardProgress - 0.62) / 0.38;
                const eased = smoothStep(normalizedProgress);
                x = window.gsap.utils.interpolate(
                    "0%",
                    "0%",
                    eased
                );
                rotate = window.gsap.utils.interpolate(
                    0,
                    0,
                    eased
                );
                rotationY = eased * 180;
            } else {
                x = "0%";
                rotate = 0;
                rotationY = 180;
            }

            window.gsap.set(card, {
                opacity: 1,
                y: y,
                x: x,
                rotate: rotate,
                scale: scale,
            });

            window.gsap.set(innerCard, {
                rotationY: rotationY,
            });

            card.classList.toggle("is_floating", shouldFloat);
            card.classList.toggle("is_interactive", isInteractive);
            card.classList.toggle("is_label_visible", cardProgress >= 0.98 && !card.classList.contains("is_open"));

            if (!isInteractive) {
                const wrapper = card.querySelector(".partner_card_wrapper");
                const tiltShell = card.querySelector(".partner_tilt_shell");
                const images = Array.from(card.querySelectorAll(".partner_face img"));

                wrapper?.classList.remove("is_hovered");

                if (tiltShell) {
                    tiltShell.style.transform = "rotateX(0deg) rotateY(0deg)";
                }

                images.forEach((img) => {
                    img.style.transform = "translateX(0px) translateY(0px) scale(1.04)";
                });

                card.classList.remove("is_open");
                card.classList.remove("is_label_visible");
                wrapper?.classList.remove("is_open");
            }
        });
    };

    window.ScrollTrigger.create({
        trigger: partnerSection,
        start: "top top",
        end: () => `+=${window.innerHeight * 5.1}`,
        pin: partnerSection.querySelector(".partner_sticky"),
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onEnter: () => applyPartnerScene(0),
        onEnterBack: () => applyPartnerScene(0),
        onLeave: () => partnerScrollDownButton?.classList.remove("is_visible"),
        onLeaveBack: () => {
            applyPartnerScene(0);
        },
        onRefresh: (self) => {
            if (self.progress <= 0) {
                applyPartnerScene(0);
            } else {
                applyPartnerScene(self.progress);
            }
        },
        onUpdate: (self) => applyPartnerScene(self.progress),
    });

    applyPartnerScene(0);

    const partnerWrappers = Array.from(partnerSection.querySelectorAll(".partner_card_wrapper"));

    partnerWrappers.forEach((wrapper) => {
        const tiltShell = wrapper.querySelector(".partner_tilt_shell");
        const images = Array.from(wrapper.querySelectorAll(".partner_face img"));

        wrapper.addEventListener("mousemove", (event) => {
            const card = wrapper.closest(".partner_card");
            if (!card || !card.classList.contains("is_interactive") || card.classList.contains("is_open")) {
                return;
            }

            const rect = wrapper.getBoundingClientRect();
            const mouseX = event.clientX - rect.left - (rect.width / 2);
            const mouseY = event.clientY - rect.top - (rect.height / 2);
            const px = mouseX / rect.width;
            const py = mouseY / rect.height;

            wrapper.classList.add("is_hovered");

            if (tiltShell) {
                tiltShell.style.transform =
                    `rotateX(${(-py * 24).toFixed(2)}deg) rotateY(${(px * 24).toFixed(2)}deg)`;
            }

            images.forEach((img) => {
                img.style.transform =
                    `translateX(${(px * -34).toFixed(2)}px) translateY(${(py * -34).toFixed(2)}px) scale(1.06)`;
            });
        });

        wrapper.addEventListener("mouseleave", () => {
            const card = wrapper.closest(".partner_card");
            if (card?.classList.contains("is_open")) {
                return;
            }

            wrapper.classList.remove("is_hovered");

            if (tiltShell) {
                tiltShell.style.transform = "rotateX(0deg) rotateY(0deg)";
            }

            images.forEach((img) => {
                img.style.transform = "translateX(0px) translateY(0px) scale(1.04)";
            });
        });

        wrapper.addEventListener("click", (event) => {
            const card = wrapper.closest(".partner_card");
            if (!card || !card.classList.contains("is_interactive")) {
                return;
            }

            event.stopPropagation();

            const willOpen = !card.classList.contains("is_open");
            closeAllPartnerCards();

            if (willOpen) {
                card.classList.add("is_open");
                wrapper.classList.add("is_open");
                partnerCardsContainer?.classList.add("has_open_card");
            }
        });
    });

    document.addEventListener("click", (event) => {
        const clickedInsidePartnerCard = event.target instanceof Element && event.target.closest(".partner_card_wrapper");

        if (!clickedInsidePartnerCard) {
            closeAllPartnerCards();
        }
    });

    partnerScrollDownButton?.addEventListener("click", () => {
        window.scrollBy({
            top: window.innerHeight * 0.75,
            behavior: "smooth",
        });
    });
});
