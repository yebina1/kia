const recommendationTitles = {
    telluride_outdoor: "Outdoor & Adventure",
    sorento_outdoor: "Outdoor & Adventure",
    sportage_outdoo: "Outdoor & Adventure",
    ev9_family: "Family & Together",
    telluride_family: "Family & Together",
    carnival_family: "Family & Together",
    k4_urban: "Urban & Daily",
    seltos_urban: "Urban & Daily",
    niro_hybrid_urban: "Urban & Daily",
    ev9_electric: "Electric & Future",
    ev6_electric: "Electric & Future",
    niro_ev_electric: "Electric & Future"
};

const recommendationThemes = {
    telluride_outdoor: { accent: "#90a79e", soft: "rgba(144, 167, 158, 0.22)" },
    sorento_outdoor: { accent: "#90a79e", soft: "rgba(144, 167, 158, 0.22)" },
    sportage_outdoo: { accent: "#90a79e", soft: "rgba(144, 167, 158, 0.22)" },
    ev9_family: { accent: "#c2ab84", soft: "rgba(194, 171, 132, 0.2)" },
    telluride_family: { accent: "#c2ab84", soft: "rgba(194, 171, 132, 0.2)" },
    carnival_family: { accent: "#c2ab84", soft: "rgba(194, 171, 132, 0.2)" },
    k4_urban: { accent: "#8fa9c2", soft: "rgba(143, 169, 194, 0.2)" },
    seltos_urban: { accent: "#8fa9c2", soft: "rgba(143, 169, 194, 0.2)" },
    niro_hybrid_urban: { accent: "#8fa9c2", soft: "rgba(143, 169, 194, 0.2)" },
    ev9_electric: { accent: "#82c7bb", soft: "rgba(130, 199, 187, 0.2)" },
    ev6_electric: { accent: "#82c7bb", soft: "rgba(130, 199, 187, 0.2)" },
    niro_ev_electric: { accent: "#82c7bb", soft: "rgba(130, 199, 187, 0.2)" }
};

const MOBILE_HERO_IMAGES = {
    telluride_outdoor: { src: "img/sub02_recommended/outdoor_adventure/telluride_1.png", alt: "Telluride" },
    sorento_outdoor: { src: "img/sub02_recommended/outdoor_adventure/Sorento1.png", alt: "Sorento" },
    sportage_outdoo: { src: "img/sub02_recommended/outdoor_adventure/Sportage1.png", alt: "Sportage" },
    ev9_family: { src: "img/sub02_recommended/family_roadtrips/ev9.png", alt: "EV9" },
    telluride_family: { src: "img/sub02_recommended/family_roadtrips/Telluride1.png", alt: "Telluride" },
    carnival_family: { src: "img/sub02_recommended/family_roadtrips/Carnival1.png", alt: "Carnival" },
    k4_urban: { src: "img/sub02_recommended/city_commute/k41.png", alt: "K4" },
    seltos_urban: { src: "img/sub02_recommended/city_commute/Seltos1.png", alt: "Seltos" },
    niro_hybrid_urban: { src: "img/sub02_recommended/city_commute/Niro Hybrid1.png", alt: "Niro Hybrid" },
    ev9_electric: { src: "img/sub02_recommended/electric_eco/eV91.png", alt: "EV9" },
    ev6_electric: { src: "img/sub02_recommended/electric_eco/EV6.png", alt: "EV6" },
    niro_ev_electric: { src: "img/sub02_recommended/electric_eco/Niro EV1.png", alt: "Niro EV" }
};

const MOBILE_LAYOUT_BREAKPOINT = 820;
const DESKTOP_TAB_FRAME_PATHS = {
    outdoor: "img/sub02_recommended/tap/tab1.svg",
    family: "img/sub02_recommended/tap/tab2.svg",
    urban: "img/sub02_recommended/tap/tab3.svg",
    electric: "img/sub02_recommended/tap/tab4.svg"
};
const DESKTOP_GROUP_HERO_IMAGES = {
    outdoor: {
        images: [
            "img/sub02_recommended/outdoor/outdoor1.png",
            "img/sub02_recommended/outdoor/outdoor2.png",
            "img/sub02_recommended/outdoor/outdoor3.png",
            "img/sub02_recommended/outdoor/outdoor4.png",
            "img/sub02_recommended/outdoor/outdoor5.png"
        ],
        alt: "Outdoor visual"
    },
    family: {
        images: [
            "img/sub02_recommended/family/family1.png",
            "img/sub02_recommended/family/family2.png",
            "img/sub02_recommended/family/family3.png",
            "img/sub02_recommended/family/family4.png",
            "img/sub02_recommended/family/family5.png"
        ],
        alt: "Family visual"
    },
    urban: {
        images: [
            "img/sub02_recommended/electric/city1.png",
            "img/sub02_recommended/electric/city2.png",
            "img/sub02_recommended/electric/city3.png",
            "img/sub02_recommended/electric/city4.png",
            "img/sub02_recommended/electric/city5.png"
        ],
        alt: "Urban visual"
    },
    electric: {
        images: [
            "img/sub02_recommended/electric/city1.png",
            "img/sub02_recommended/electric/city2.png",
            "img/sub02_recommended/electric/city3.png",
            "img/sub02_recommended/electric/city4.png",
            "img/sub02_recommended/electric/city5.png"
        ],
        alt: "Electric visual"
    }
};
const DESKTOP_TAB_POINT_CENTERS = {
    outdoor: 54,
    family: 126,
    urban: 211,
    electric: 299.5
};
const MODAL_TRANSITION_MS = 420;
const MOBILE_SWIPE_THRESHOLD = 40;
const DESKTOP_SCROLL_LOCK_MS = 1100;
const MOBILE_DRAG_MAX_OFFSET = 72;
const DESKTOP_HERO_ROTATE_MS = 3200;

function isMobileViewport() {
    return window.innerWidth <= MOBILE_LAYOUT_BREAKPOINT;
}

document.addEventListener("DOMContentLoaded", () => {
    const recco = document.querySelector(".recco");
    const title = document.querySelector(".recco .tit h2");
    const desktopTabButtons = [...document.querySelectorAll(".tab_icon_button")];
    const mobileTabs = [...document.querySelectorAll(".mobile_tabs button")];
    const sections = [...document.querySelectorAll(".car_all section")];
    const carAll = document.querySelector(".car_all");
    const desktopVisual = document.querySelector(".vid");
    const modal = document.querySelector(".selection_modal");
    const modalCloseButton = document.querySelector(".selection_modal_close");
    const buildTrigger = document.querySelector(".build_trigger");
    const experimentalMode = recco?.classList.contains("recco--experimental");

    if (!recco || !sections.length || !carAll) {
        return;
    }

    const state = {
        activeIndex: 0,
        activeMobileGroup: "outdoor",
        currentMobileIndex: 0,
        isAnimating: false,
        lastDesktopNavigationAt: 0,
        releaseTimer: 0,
        touchStartX: 0,
        touchStartY: 0,
        touchDeltaX: 0,
        touchDeltaY: 0,
        touchTracking: false,
        activePointerId: null,
        modalCloseTimer: 0,
        desktopHeroTimer: 0,
        desktopHeroGroup: "",
        desktopHeroImageIndex: 0,
        desktopHeroVisibleLayer: 0,
        lastRenderedDesktopIndex: 0
    };

    normalizeFeatureBullets(sections);
    enhanceMobileCards(sections);
    initializeDesktopHeroVisual(desktopVisual);

    applyScrollLayout(recco, sections.length);
    renderSections(state.activeIndex, sections, title, recco, experimentalMode, desktopVisual, state);
    syncMobileGroup(state, sections, carAll, mobileTabs, title);

    window.addEventListener("resize", () => {
        applyScrollLayout(recco, sections.length);

        if (isMobileViewport()) {
            syncMobileGroup(state, sections, carAll, mobileTabs, title);
        } else {
            window.clearTimeout(state.releaseTimer);
            state.isAnimating = false;
            resetMobileState(sections, carAll);
            renderSections(state.activeIndex, sections, title, recco, experimentalMode, desktopVisual, state);
            updateDesktopTabVisual(getMobileGroup(sections[state.activeIndex].id));
        }
    });

    desktopTabButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const targetGroup = button.dataset.group;
            const targetIndex = sections.findIndex((section) => getMobileGroup(section.id) === targetGroup);

            if (targetIndex < 0) return;

            if (isMobileViewport()) {
                state.activeMobileGroup = targetGroup;
                state.currentMobileIndex = 0;
                syncMobileGroup(state, sections, carAll, mobileTabs, title);
                return;
            }

            if (targetIndex === state.activeIndex || isDesktopScrollLocked(state)) return;
            navigateDesktopToIndex(targetIndex, state, recco, sections, title, experimentalMode, desktopVisual);
        });
    });

    mobileTabs.forEach((button) => {
        button.addEventListener("click", () => {
            if (!isMobileViewport()) return;

            state.activeMobileGroup = button.dataset.group || "outdoor";
            state.currentMobileIndex = 0;
            syncMobileGroup(state, sections, carAll, mobileTabs, title);
        });
    });

    buildTrigger?.addEventListener("click", () => {
        const activeSection = sections[state.activeIndex];
        if (!activeSection) return;
        populateSelectionModal(activeSection, modal);
        openSelectionModal(modal, state);
    });

    sections.forEach((section) => {
        const mobileBuildButton = section.querySelector(".mobile_build");

        mobileBuildButton?.addEventListener("click", () => {
            populateSelectionModal(section, modal);
            openSelectionModal(modal, state);
        });
    });

    modalCloseButton?.addEventListener("click", () => {
        closeSelectionModal(modal, state);
    });

    carAll.addEventListener("touchstart", (event) => {
        if (!isMobileViewport()) return;
        beginMobileSwipeTracking(
            state,
            event.touches[0]?.clientX || 0,
            event.touches[0]?.clientY || 0
        );
    }, { passive: true });

    carAll.addEventListener("touchmove", (event) => {
        if (!isMobileViewport()) return;
        updateMobileSwipeTracking(
            state,
            event.touches[0]?.clientX || 0,
            event.touches[0]?.clientY || 0
        );
        applyMobileSwipeVisual(state, sections);
    }, { passive: true });

    carAll.addEventListener("touchend", () => {
        if (!isMobileViewport()) return;
        handleMobileSwipeEnd(state, sections, carAll, mobileTabs, title);
    }, { passive: true });

    carAll.addEventListener("touchcancel", () => {
        resetMobileSwipeTracking(state);
        clearMobileSwipeVisual(sections);
    }, { passive: true });

    carAll.addEventListener("pointerdown", (event) => {
        if (!isMobileViewport()) return;
        if (event.pointerType === "mouse" && event.button !== 0) return;

        state.activePointerId = event.pointerId;
        beginMobileSwipeTracking(state, event.clientX, event.clientY);
        carAll.setPointerCapture?.(event.pointerId);
    }, { passive: true });

    carAll.addEventListener("pointermove", (event) => {
        if (!isMobileViewport()) return;
        if (state.activePointerId !== event.pointerId) return;

        updateMobileSwipeTracking(state, event.clientX, event.clientY);
        applyMobileSwipeVisual(state, sections);
    }, { passive: true });

    carAll.addEventListener("pointerup", (event) => {
        if (!isMobileViewport()) return;
        if (state.activePointerId !== event.pointerId) return;

        carAll.releasePointerCapture?.(event.pointerId);
        state.activePointerId = null;
        handleMobileSwipeEnd(state, sections, carAll, mobileTabs, title);
    }, { passive: true });

    carAll.addEventListener("pointercancel", (event) => {
        if (state.activePointerId !== event.pointerId) return;

        carAll.releasePointerCapture?.(event.pointerId);
        state.activePointerId = null;
        resetMobileSwipeTracking(state);
        clearMobileSwipeVisual(sections);
    }, { passive: true });

    // Use native page scrolling on desktop and derive the visible card from scroll position.
    // This is more reliable than locking the wheel event, especially in IDE preview panes.
    window.addEventListener("wheel", () => {
        if (isMobileViewport()) return;
        window.clearTimeout(state.releaseTimer);
        state.isAnimating = false;
    }, { passive: true });

    window.addEventListener("scroll", () => {
        if (isMobileViewport() || isDesktopScrollLocked(state)) return;

        const stage = getStageRange(recco, sections.length);
        const currentScroll = window.scrollY;

        if (currentScroll < stage.start || currentScroll > stage.end) return;

        const nextIndex = clamp(
            Math.round((currentScroll - stage.start) / window.innerHeight),
            0,
            sections.length - 1
        );

        if (nextIndex !== state.activeIndex) {
            state.activeIndex = nextIndex;
            renderSections(state.activeIndex, sections, title, recco, experimentalMode, desktopVisual, state);
        }
    }, { passive: true });
});

function openSelectionModal(modal, state) {
    if (!modal) return;

    window.clearTimeout(state.modalCloseTimer);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function closeSelectionModal(modal, state) {
    if (!modal) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    window.clearTimeout(state.modalCloseTimer);
    state.modalCloseTimer = window.setTimeout(() => {
        document.body.classList.remove("modal-open");
    }, MODAL_TRANSITION_MS);
}

function handleMobileSwipeEnd(state, sections, carAll, mobileTabs, title) {
    if (!isMobileViewport()) return;

    const isHorizontalSwipe = Math.abs(state.touchDeltaX) > Math.abs(state.touchDeltaY);

    if (!state.touchTracking || !isHorizontalSwipe || Math.abs(state.touchDeltaX) < MOBILE_SWIPE_THRESHOLD) {
        resetMobileSwipeTracking(state);
        animateMobileSwipeBack(sections);
        return;
    }

    const visibleSections = sections.filter(
        (section) => section.dataset.mobileGroup === state.activeMobileGroup
    );

    if (!visibleSections.length) {
        resetMobileSwipeTracking(state);
        clearMobileSwipeVisual(sections);
        return;
    }

    const direction = state.touchDeltaX < 0 ? 1 : -1;
    state.currentMobileIndex = clamp(
        state.currentMobileIndex + direction,
        0,
        visibleSections.length - 1
    );

    resetMobileSwipeTracking(state);
    animateMobileSwipeBack(sections);
    syncMobileGroup(state, sections, carAll, mobileTabs, title);
}

function beginMobileSwipeTracking(state, startX, startY) {
    state.touchStartX = startX;
    state.touchStartY = startY;
    state.touchDeltaX = 0;
    state.touchDeltaY = 0;
    state.touchTracking = true;
}

function updateMobileSwipeTracking(state, currentX, currentY) {
    if (!state.touchTracking) return;

    state.touchDeltaX = currentX - state.touchStartX;
    state.touchDeltaY = currentY - state.touchStartY;
}

function resetMobileSwipeTracking(state) {
    state.touchDeltaX = 0;
    state.touchDeltaY = 0;
    state.touchTracking = false;
    state.activePointerId = null;
}

function applyMobileSwipeVisual(state, sections) {
    if (!isMobileViewport() || !state.touchTracking) return;

    const currentSection = getCurrentMobileSection(state, sections);
    if (!currentSection) return;

    const absX = Math.abs(state.touchDeltaX);
    const absY = Math.abs(state.touchDeltaY);

    if (absY > absX) {
        currentSection.style.transform = "";
        currentSection.style.opacity = "";
        return;
    }

    const clampedOffset = clamp(state.touchDeltaX, -MOBILE_DRAG_MAX_OFFSET, MOBILE_DRAG_MAX_OFFSET);
    const progress = Math.min(absX / 160, 1);

    currentSection.classList.add("is-dragging");
    currentSection.classList.remove("is-drag-resetting");
    currentSection.style.transform = `translateX(${clampedOffset}px)`;
    currentSection.style.opacity = String(1 - progress * 0.12);
}

function animateMobileSwipeBack(sections) {
    sections.forEach((section) => {
        if (!section.classList.contains("is-mobile-current")) return;

        section.classList.remove("is-dragging");
        section.classList.add("is-drag-resetting");
        section.style.transform = "";
        section.style.opacity = "";

        window.setTimeout(() => {
            section.classList.remove("is-drag-resetting");
        }, 220);
    });
}

function clearMobileSwipeVisual(sections) {
    sections.forEach((section) => {
        section.classList.remove("is-dragging");
        section.classList.remove("is-drag-resetting");
        section.style.transform = "";
        section.style.opacity = "";
    });
}

function getCurrentMobileSection(state, sections) {
    return sections.find((section) =>
        section.dataset.mobileGroup === state.activeMobileGroup &&
        Number(section.dataset.mobileIndex) === state.currentMobileIndex
    ) || null;
}

function normalizeFeatureBullets(sections) {
    sections.forEach((section) => {
        section.querySelectorAll(".txt_box b span").forEach((span) => {
            span.textContent = "\u2023";
        });

        section.querySelectorAll("ul li").forEach((item) => {
            const image = item.querySelector("img");
            const textBox = item.querySelector(".txt_box");
            const imageSrc = image?.getAttribute("src")?.trim();

            if (!imageSrc || !textBox) return;

            textBox.style.setProperty("--feature-card-image", `url("${imageSrc}")`);
            textBox.style.backgroundImage =
                `linear-gradient(180deg, rgba(48, 53, 56, 0.42) 0%, rgba(48, 53, 56, 0.82) 100%), url("${imageSrc}")`;
            textBox.style.backgroundPosition = "center center";
            textBox.style.backgroundSize = "cover";
            textBox.style.backgroundRepeat = "no-repeat";
        });
    });
}

function enhanceMobileCards(sections) {
    sections.forEach((section) => {
        const group = getMobileGroup(section.id);
        const indexInGroup = getIndexInMobileGroup(section, sections);
        const sourceImage = section.querySelector("ul li img");
        const heroImageConfig = MOBILE_HERO_IMAGES[section.id];
        const imageSrc = heroImageConfig?.src || sourceImage?.getAttribute("src")?.trim();
        const imageAlt = heroImageConfig?.alt || sourceImage?.getAttribute("alt")?.trim() || "";
        const titleText = recommendationTitles[section.id] || "Recommended";

        section.dataset.mobileGroup = group;
        section.dataset.mobileIndex = String(indexInGroup);

        if (!section.querySelector(".mobile_hero")) {
            const hero = document.createElement("div");
            hero.className = "mobile_hero";

            if (imageSrc) {
                const heroImage = document.createElement("img");
                heroImage.className = "mobile_hero_image";
                heroImage.src = imageSrc;
                heroImage.alt = imageAlt;
                hero.append(heroImage);
            }

            const heroTitle = document.createElement("p");
            heroTitle.className = "mobile_hero_title";
            heroTitle.textContent = titleText;
            hero.append(heroTitle);

            section.prepend(hero);
        }

        if (!section.querySelector(".mobile_dots")) {
            const dots = document.createElement("div");
            dots.className = "mobile_dots";

            for (let i = 0; i < 3; i += 1) {
                const dot = document.createElement("span");
                if (i === indexInGroup) {
                    dot.classList.add("is-active");
                }
                dots.append(dot);
            }

            const hero = section.querySelector(".mobile_hero");
            if (hero) {
                hero.insertAdjacentElement("afterend", dots);
            } else {
                section.prepend(dots);
            }
        }

        if (!section.querySelector(".mobile_build")) {
            const mobileBuildButton = document.createElement("button");
            mobileBuildButton.type = "button";
            mobileBuildButton.className = "mobile_build";
            mobileBuildButton.textContent = "Build It";

            const topArea = section.querySelector(".top");
            if (topArea) {
                topArea.append(mobileBuildButton);
            }
        }

    });
}

function populateSelectionModal(section, modal) {
    if (!section || !modal) return;

    const modalTitle = modal.querySelector("#selection-modal-title");
    const modalDescription = modal.querySelector(".selection_modal_desc p:last-child");
    const modalSpecs = modal.querySelector(".selection_modal_specs ul");
    const subtitle = section.querySelector(".title p")?.textContent?.trim();
    const heading = section.querySelector(".title h2")?.textContent?.trim();
    const description = section.querySelector(".top > p")?.textContent?.replace(/\s+/g, " ").trim();

    if (modalTitle) {
        modalTitle.textContent = subtitle && heading ? `${heading} (${subtitle})` : (heading || "Recommended");
    }

    if (modalDescription) {
        modalDescription.textContent = description || "";
    }

    if (modalSpecs) {
        modalSpecs.innerHTML = "";

        section.querySelectorAll("ul li .txt_box b").forEach((item) => {
            const spec = item.textContent?.replace(/\s+/g, " ").trim();
            if (!spec) return;

            const li = document.createElement("li");
            li.textContent = spec.replace(/^\u2023\s*/, "");
            modalSpecs.append(li);
        });
    }

}

function applyScrollLayout(recco, totalSections) {
    if (isMobileViewport()) {
        recco.style.minHeight = "auto";
        return;
    }

    recco.style.minHeight = `${window.innerHeight * totalSections}px`;
}

function isDesktopScrollLocked(state) {
    return state.isAnimating || Date.now() - state.lastDesktopNavigationAt < DESKTOP_SCROLL_LOCK_MS;
}

function navigateDesktopToIndex(targetIndex, state, recco, sections, title, experimentalMode, desktopVisual) {
    const safeIndex = clamp(targetIndex, 0, sections.length - 1);
    const stage = getStageRange(recco, sections.length);

    state.isAnimating = true;
    state.lastDesktopNavigationAt = Date.now();
    state.activeIndex = safeIndex;
    renderSections(state.activeIndex, sections, title, recco, experimentalMode, desktopVisual, state);

    window.scrollTo({
        top: stage.start + state.activeIndex * window.innerHeight,
        behavior: "smooth"
    });

    window.clearTimeout(state.releaseTimer);
    state.releaseTimer = window.setTimeout(() => {
        state.isAnimating = false;
    }, DESKTOP_SCROLL_LOCK_MS);
}

function getStageRange(recco, totalSections) {
    const start = window.scrollY + recco.getBoundingClientRect().top;
    const end = start + window.innerHeight * (totalSections - 1);
    return { start, end };
}

function renderSections(activeIndex, sections, title, recco, experimentalMode, desktopVisual, state) {
    sections.forEach((section, index) => {
        section.classList.toggle("is-past", index < activeIndex);
        section.classList.toggle("is-active", index === activeIndex);
        section.style.zIndex = String(sections.length - index);
    });

    const activeSection = sections[activeIndex];
    if (title) {
        title.textContent = recommendationTitles[activeSection.id] || "Recommended";
    }

    updateDesktopTabVisual(getMobileGroup(activeSection.id));
    updateDesktopHeroVisual(getMobileGroup(activeSection.id), desktopVisual, state);
    state.lastRenderedDesktopIndex = activeIndex;

    if (recco) {
        updateExperimentalState(activeIndex, sections, title, recco, experimentalMode);
    }
}

function initializeDesktopHeroVisual(desktopVisual) {
    if (!desktopVisual || desktopVisual.querySelector(".vid_hero_image")) return;

    for (let index = 0; index < 2; index += 1) {
        const heroImage = document.createElement("img");
        heroImage.className = `vid_hero_image ${index === 0 ? "is-base" : "is-overlay"}`;
        heroImage.alt = "";
        heroImage.loading = "eager";
        heroImage.decoding = "async";
        desktopVisual.append(heroImage);
    }
}

function updateDesktopHeroVisual(group, desktopVisual, state) {
    if (!desktopVisual || !state) return;

    const heroImages = [...desktopVisual.querySelectorAll(".vid_hero_image")];
    if (!heroImages.length) return;

    const heroConfig = DESKTOP_GROUP_HERO_IMAGES[group];

    if (!heroConfig?.images?.length) {
        stopDesktopHeroRotation(state);
        state.desktopHeroGroup = "";
        state.desktopHeroImageIndex = 0;
        heroImages.forEach((image) => {
            image.classList.remove("is-visible");
            image.removeAttribute("src");
            image.alt = "";
        });
        desktopVisual.classList.remove("has-hero-image");
        return;
    }

    if (state.desktopHeroGroup !== group) {
        state.desktopHeroGroup = group;
        state.desktopHeroImageIndex = 0;
        state.desktopHeroVisibleLayer = 0;

        heroImages.forEach((image, index) => {
            image.classList.toggle("is-visible", index === 0);
            image.alt = heroConfig.alt;
        });

        setDesktopHeroImage(heroImages[0], heroConfig.images[0], heroConfig.alt, desktopVisual);

        if (heroImages[1]) {
            heroImages[1].classList.remove("is-visible");
            heroImages[1].removeAttribute("src");
            heroImages[1].alt = heroConfig.alt;
        }

        if (heroConfig.images.length > 1) {
            startDesktopHeroRotation(desktopVisual, state, heroConfig);
        }
        return;
    }

    if (!state.desktopHeroTimer && heroConfig.images.length > 1) {
        startDesktopHeroRotation(desktopVisual, state, heroConfig);
    }
}

function setDesktopHeroImage(targetImage, src, alt, desktopVisual) {
    if (!targetImage || !src) return;

    targetImage.onload = () => {
        desktopVisual?.classList.add("has-hero-image");
    };

    targetImage.onerror = () => {
        targetImage.classList.remove("is-visible");
    };

    targetImage.alt = alt;
    targetImage.src = src;
}

function startDesktopHeroRotation(desktopVisual, state, heroConfig) {
    stopDesktopHeroRotation(state);

    state.desktopHeroTimer = window.setInterval(() => {
        rotateDesktopHeroImage(desktopVisual, state, heroConfig);
    }, DESKTOP_HERO_ROTATE_MS);
}

function stopDesktopHeroRotation(state) {
    if (!state?.desktopHeroTimer) return;

    window.clearInterval(state.desktopHeroTimer);
    state.desktopHeroTimer = 0;
}

function rotateDesktopHeroImage(desktopVisual, state, heroConfig) {
    const heroImages = [...desktopVisual.querySelectorAll(".vid_hero_image")];
    if (heroImages.length < 2 || !heroConfig?.images?.length) return;

    const nextIndex = (state.desktopHeroImageIndex + 1) % heroConfig.images.length;
    const nextLayer = state.desktopHeroVisibleLayer === 0 ? 1 : 0;
    const currentLayer = state.desktopHeroVisibleLayer;
    const incomingImage = heroImages[nextLayer];
    const outgoingImage = heroImages[currentLayer];

    setDesktopHeroImage(incomingImage, heroConfig.images[nextIndex], heroConfig.alt, desktopVisual);
    incomingImage.classList.add("is-visible");
    outgoingImage.classList.remove("is-visible");

    state.desktopHeroImageIndex = nextIndex;
    state.desktopHeroVisibleLayer = nextLayer;
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function getMobileGroup(sectionId) {
    if (sectionId.includes("outdoor") || sectionId.includes("outdoo")) return "outdoor";
    if (sectionId.includes("family")) return "family";
    if (sectionId.includes("urban")) return "urban";
    return "electric";
}

function updateDesktopTabVisual(group) {
    const tabFrame = document.querySelector(".tab_frame");
    const tabPoint = document.querySelector(".tab_point");
    const tabButtons = [...document.querySelectorAll(".tab_icon_button")];
    const safeGroup = DESKTOP_TAB_FRAME_PATHS[group] ? group : "outdoor";

    if (!tabFrame || !tabPoint || !tabButtons.length) return;

    tabFrame.src = DESKTOP_TAB_FRAME_PATHS[safeGroup];
    const pointCenter = DESKTOP_TAB_POINT_CENTERS[safeGroup] || DESKTOP_TAB_POINT_CENTERS.outdoor;
    const pointHeight = tabPoint.offsetHeight || 30;
    tabPoint.style.top = `${pointCenter - pointHeight / 2}px`;

    tabButtons.forEach((button) => {
        const iconIndex = button.dataset.icon;
        const isActive = button.dataset.group === safeGroup;
        const icon = button.querySelector("img");

        button.classList.toggle("is-active", isActive);

        if (icon && iconIndex) {
            icon.src = `img/sub02_recommended/tap/tab_icon${iconIndex}_${isActive ? "on" : "off"}.svg`;
        }
    });
}

function getIndexInMobileGroup(section, sections) {
    return sections
        .filter((item) => getMobileGroup(item.id) === getMobileGroup(section.id))
        .findIndex((item) => item.id === section.id);
}

function syncMobileGroup(state, sections, carAll, buttons, title) {
    if (!isMobileViewport()) {
        resetMobileState(sections, carAll);
        return;
    }

    buttons.forEach((button) => {
        button.classList.toggle("is-active", button.dataset.group === state.activeMobileGroup);
    });

    const visibleSections = sections.filter(
        (section) => section.dataset.mobileGroup === state.activeMobileGroup
    );

    const safeIndex = clamp(
        state.currentMobileIndex,
        0,
        Math.max(0, visibleSections.length - 1)
    );

    state.currentMobileIndex = safeIndex;

    sections.forEach((section) => {
        const matches = section.dataset.mobileGroup === state.activeMobileGroup;
        section.classList.toggle("is-mobile-hidden", !matches);
        section.classList.toggle("is-mobile-visible", matches);
        section.classList.toggle("is-mobile-current", false);
        section.style.display = "none";
        section.style.pointerEvents = "none";
    });

    if (!visibleSections.length) {
        carAll.style.height = "";
        return;
    }

    const currentSection = visibleSections[safeIndex];

    visibleSections.forEach((section, index) => {
        const isCurrent = index === safeIndex;
        section.classList.toggle("is-mobile-current", isCurrent);
        section.classList.remove("is-dragging", "is-drag-resetting");
        section.style.display = isCurrent ? "flex" : "none";
        section.style.pointerEvents = isCurrent ? "auto" : "none";
        section.style.transform = "";
        section.style.opacity = "";

        section.querySelectorAll(".mobile_dots span").forEach((dot, dotIndex) => {
            dot.classList.toggle("is-active", dotIndex === safeIndex);
        });
    });

    if (title) {
        title.textContent = recommendationTitles[currentSection.id] || "Recommended";
    }

    // Let the container grow with the current card so tablet widths do not collapse to 0px.
    carAll.style.height = "auto";
}

function resetMobileState(sections, carAll) {
    sections.forEach((section) => {
        section.classList.remove("is-mobile-hidden", "is-mobile-visible", "is-mobile-current");
        section.style.display = "";
        section.style.pointerEvents = "";
        section.style.minHeight = "";
    });

    if (carAll) {
        carAll.style.height = "";
    }
}

function updateExperimentalState(activeIndex, sections, title, recco, experimentalMode) {
    if (!experimentalMode || !recco || !title) return;

    const activeSection = sections[activeIndex];
    const theme = recommendationThemes[activeSection.id] || recommendationThemes.telluride_outdoor;
    const progress = sections.length === 1 ? 1 : activeIndex / (sections.length - 1);

    recco.style.setProperty("--exp-progress", String(progress));
    recco.style.setProperty("--exp-accent", theme.accent);
    recco.style.setProperty("--exp-accent-soft", theme.soft);

    title.classList.remove("is-shifting");
    window.requestAnimationFrame(() => {
        title.classList.add("is-shifting");
        window.setTimeout(() => {
            title.classList.remove("is-shifting");
        }, 240);
    });
}
