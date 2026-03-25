document.addEventListener("DOMContentLoaded", () => {
  const heroSection = document.getElementById("heroSection");
  const heroTitle = document.getElementById("heroTitle");
  const heroCarImage = document.getElementById("heroCarImage");
  const heroModelStage = document.getElementById("heroModelStage");
  const heroTrimStage = document.getElementById("heroTrimStage");
  const heroCatalog = document.getElementById("heroCatalog");
  const heroTrimHeader = document.getElementById("heroTrimHeader");
  const heroTrimTitle = document.getElementById("heroTrimTitle");
  const heroTrimGrade = document.getElementById("heroTrimGrade");
  const heroTrimPrice = document.getElementById("heroTrimPrice");
  const heroTrimLease = document.getElementById("heroTrimLease");
  const heroTrimImage = document.getElementById("heroTrimImage");
  const heroTrimCards = document.getElementById("heroTrimCards");
  const heroTopTabs = document.getElementById("heroTopTabs");
  const viewModelButton = document.getElementById("viewModelButton");
  const nextColorButton = document.getElementById("nextColorButton");
  const topTabButtons = Array.from(
    document.querySelectorAll(".hero_top_tabs button")
  );
  const prevBtn = document.getElementById("prevCar");
  const nextBtn = document.getElementById("nextCar");
  const startStepButton = document.getElementById("startStepButton");
  const progressFill = document.getElementById("heroProgressFill");
  const stepButtons = Array.from(
    document.querySelectorAll(".hero_bottom_tabs button")
  );
  const categoryOrder = topTabButtons.map((button) => button.dataset.category);
  const defaultBackgroundImage = "../kia/img/sub01_build/build_bg.png";
  const trimStageData = {
    Sportage: {
      grade: "X-Line AWD",
      price: "$33,390 Starting MSRP*",
      lease: "$379 / 36 mo est. lease payments*",
      trims: ["LX FWD", "EX FWD", "X-Line AWD", "X-Pro Prestige AWD"]
    },
    "Sorento Hybrid": {
      grade: "Prestige AWD",
      price: "$38,690 Starting MSRP*",
      lease: "$429 / 36 mo est. lease payments*",
      trims: [
        "EX FWD",
        "SX Prestige FWD",
        "EX AWD",
        "Prestige AWD"
      ]
    },
    EV6: {
      grade: "GT-Line AWD",
      price: "$42,900 Starting MSRP*",
      lease: "$529 / 36 mo est. lease payments*",
      trims: ["Light RWD", "Wind RWD", "GT-Line AWD", "GT AWD"]
    },
    EV9: {
      grade: "Land AWD",
      price: "$68,900 Starting MSRP*",
      lease: "$648 / 36 mo est. lease payments*",
      trims: [
        {
          name: "Light RWD",
          details: [
            "$54,900 Starting MSRP*",
            "NACS Charging Port",
            "7-Passenger Seating w/ 2nd-row Bench Seat"
          ]
        },
        {
          name: "Light Long Range RWD",
          details: [
            "$57,900 Starting MSRP*",
            "7-Passenger Seating or 6-Passenger Option",
            "Homelink Rearview Mirror & Power Sunroof*",
            "Front & Rear Parking Sensors*"
          ]
        },
        {
          name: "Wind AWD",
          details: [
            "$63,900 Starting MSRP*",
            "379 hp & 443 lb.-ft. of torque (Dual Motor)",
            "Dual Sunroofs & Driver's Memory System",
            "Blind-Spot & 360° Surround View Monitor*",
            "Included All-Wheel Drive"
          ]
        },
        {
          name: "Land AWD",
          details: [
            "$68,900 Starting MSRP*",
            "Meridian Premium Audio System*",
            "Self-Leveling Rear Susp. & 5,000 lb. Towing*",
            "Available Nightfall Edition Package",
            "Included All-Wheel Drive"
          ]
        },
        {
          name: "GT-Line AWD",
          details: [
            "$71,900 Starting MSRP*",
            "0-60 mph in 4.5 seconds*",
            "Head-Up Display & 21-in. Alloy Wheels*",
            "Parking Collision-Avoidance Assist Systems*",
            "Included All-Wheel Drive"
          ]
        }
      ]
    },
    K4: {
      grade: "GT-Line Turbo",
      price: "$25,190 Starting MSRP*",
      lease: "$299 / 36 mo est. lease payments*",
      trims: ["LXS", "EX", "GT-Line", "GT-Line Turbo"]
    }
  };

  function getFallbackTitle(imagePath) {
    if (!imagePath) {
      return "Vehicle";
    }

    const fileName = imagePath.split("/").pop()?.split(".")[0] || "Vehicle";
    return fileName
      .replace(/[_-]+/g, " ")
      .replace(/\b\w/g, (character) => character.toUpperCase());
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatCarTitleMarkup(title) {
    const trimmedTitle = title?.trim() || "";
    const matchedTitle = trimmedTitle.match(/^(.*?)(?:\s*)(\d+)$/);

    if (!matchedTitle) {
      return escapeHtml(trimmedTitle);
    }

    const [, label, suffix] = matchedTitle;
    const variantClass = `hero_title_suffix_${trimmedTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "")}`;

    return `${escapeHtml(label)}<span class="hero_title_suffix ${variantClass}">${escapeHtml(
      suffix
    )}</span>`;
  }

  function getTitleKey(title) {
    return (title || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");
  }

  function renderTrimCards(title) {
    if (!heroTrimCards) {
      return;
    }

    const trimData = trimStageData[title] || trimStageData.EV9;
    heroTrimCards.innerHTML = trimData.trims
      .map(
        (trimItem, index) => {
          const normalizedTrim =
            typeof trimItem === "string"
              ? {
                  name: trimItem,
                  details: [trimData.price, trimData.grade, "More details coming soon"]
                }
              : trimItem;

          return `
          <article class="hero_trim_card${index === selectedTrimIndex ? " selected" : ""}${index === 0 ? " expanded" : ""}" data-trim-index="${index}">
            <div class="hero_trim_card_head">
              <strong>${escapeHtml(normalizedTrim.name)}</strong>
              <button type="button" class="hero_trim_select_btn" aria-pressed="${index === selectedTrimIndex ? "true" : "false"}">
                ${index === selectedTrimIndex ? "Selected" : "Select"}
              </button>
            </div>
            <div class="hero_trim_card_details">
              <ul>
                ${normalizedTrim.details
                  .map((detail) => `<li>${escapeHtml(detail)}</li>`)
                  .join("")}
              </ul>
            </div>
            <button type="button" class="hero_trim_more_btn" aria-expanded="${index === 0 ? "true" : "false"}">
              More
            </button>
          </article>
        `;
        }
      )
      .join("");
  }

  function setSelectedTrimCard(targetIndex) {
    if (!heroTrimCards) {
      return;
    }

    const trimCards = Array.from(heroTrimCards.querySelectorAll(".hero_trim_card"));
    selectedTrimIndex = targetIndex;

    trimCards.forEach((card, index) => {
      const isSelected = index === selectedTrimIndex;
      card.classList.toggle("selected", isSelected);

      const selectButton = card.querySelector(".hero_trim_select_btn");
      if (selectButton) {
        selectButton.textContent = isSelected ? "Selected" : "Select";
        selectButton.setAttribute("aria-pressed", isSelected ? "true" : "false");
      }
    });
  }

  function toggleTrimDetails(targetIndex) {
    if (!heroTrimCards) {
      return;
    }

    const trimCards = Array.from(heroTrimCards.querySelectorAll(".hero_trim_card"));
    const targetCard = trimCards[targetIndex];

    if (!targetCard) {
      return;
    }

    const willExpand = !targetCard.classList.contains("expanded");
    targetCard.classList.toggle("expanded", willExpand);

    const moreButton = targetCard.querySelector(".hero_trim_more_btn");
    if (moreButton) {
      moreButton.setAttribute("aria-expanded", willExpand ? "true" : "false");
    }
  }

  const catalog = heroCatalog
    ? Array.from(heroCatalog.querySelectorAll(".hero_category_panel")).reduce(
        (accumulator, panel) => {
          const categoryKey = panel.dataset.category;
          const cars = Array.from(panel.querySelectorAll("li")).map((item) => {
            const titleElement = item.querySelector("h1, h2, h3, h4, h5, h6");
            const imageElement = item.querySelector("img");
            const carImage = item.dataset.carImage || imageElement?.getAttribute("src");
            const title =
              item.dataset.title ||
              titleElement?.textContent?.trim() ||
              imageElement?.dataset.title ||
              imageElement?.getAttribute("alt") ||
              getFallbackTitle(carImage);
            const alt = imageElement?.getAttribute("alt") || item.dataset.alt || title;

            return {
              title,
              carImage,
              bgImage: item.dataset.bgImage || defaultBackgroundImage,
              alt
            };
          });

          accumulator[categoryKey] = cars;
          return accumulator;
        },
        {}
      )
    : {};

  let currentCategory =
    topTabButtons.find((button) => button.classList.contains("active"))?.dataset
      .category || "ev";
  let currentCars = catalog[currentCategory] || [];
  let currentIndex = 0;
  let isAnimating = false;
  let currentStep = 0;
  let selectedTrimIndex = 0;

  function syncArrowState() {
    const availableCategoryCount = categoryOrder.filter(
      (categoryKey) => (catalog[categoryKey] || []).length > 0
    ).length;
    const shouldShowArrows =
      currentCars.length > 1 || availableCategoryCount > 1;
    prevBtn.style.display = shouldShowArrows ? "" : "none";
    nextBtn.style.display = shouldShowArrows ? "" : "none";
  }

  function renderCar(index) {
    const currentCar = currentCars[index];

    if (!currentCar) {
      return;
    }

    heroTitle.innerHTML = formatCarTitleMarkup(currentCar.title);
    heroTitle.className = "hero_title";
    const titleKey = getTitleKey(currentCar.title);

    if (titleKey) {
      heroTitle.classList.add(`hero_title_${titleKey}`);
    }

    heroSection.style.backgroundImage = `url("${currentCar.bgImage}")`;
    heroCarImage.src = currentCar.carImage;
    heroCarImage.alt = currentCar.alt;

    if (heroTrimTitle && heroTrimImage) {
      const trimData = trimStageData[currentCar.title] || trimStageData.EV9;
      heroTrimTitle.innerHTML = formatCarTitleMarkup(currentCar.title);
      heroTrimTitle.className = "hero_trim_title";

      if (titleKey) {
        heroTrimTitle.classList.add(`hero_title_${titleKey}`);
      }

      heroTrimGrade.textContent = trimData.grade;
      heroTrimPrice.textContent = trimData.price;
      heroTrimLease.textContent = trimData.lease;
      heroTrimImage.src = currentCar.carImage;
      heroTrimImage.alt = currentCar.alt;
      renderTrimCards(currentCar.title);
    }
  }

  function syncProgressPosition() {
    if (!progressFill || !stepButtons.length) {
      return;
    }

    const progressTrack = document.querySelector(".hero_progress_track");
    const firstButton = stepButtons[0];
    const lastButton = stepButtons[stepButtons.length - 1];
    const activeButton = stepButtons[currentStep];

    if (!progressTrack || !firstButton || !lastButton || !activeButton) {
      return;
    }

    const trackStart = firstButton.offsetLeft;
    const trackEnd = lastButton.offsetLeft + lastButton.offsetWidth;
    const trackWidth = Math.max(trackEnd - trackStart, 0);
    const activeEnd = activeButton.offsetLeft + activeButton.offsetWidth;
    const fillWidth =
      currentStep === stepButtons.length - 1
        ? trackWidth
        : Math.max(activeEnd - trackStart, 0);

    progressTrack.style.left = `${trackStart}px`;
    progressTrack.style.width = `${trackWidth}px`;
    progressFill.style.left = `${trackStart}px`;
    progressFill.style.width = `${fillWidth}px`;
  }

  function updateSteps(stepIndex) {
    currentStep = stepIndex;

    stepButtons.forEach((button, index) => {
      const isActive = index === currentStep;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    syncProgressPosition();

    if (heroTrimHeader) {
      const shouldShowTrimHeader = currentStep >= 1;
      heroTrimHeader.classList.toggle("is-visible", shouldShowTrimHeader);
      heroTrimHeader.setAttribute(
        "aria-hidden",
        shouldShowTrimHeader ? "false" : "true"
      );
    }

    if (heroModelStage && heroTrimStage) {
      const isTrimStage = currentStep >= 1;
      heroModelStage.classList.toggle("is-hidden", isTrimStage);
      heroTrimStage.classList.toggle("is-visible", isTrimStage);
      heroTrimStage.setAttribute("aria-hidden", isTrimStage ? "false" : "true");
      startStepButton?.classList.toggle("is-hidden", isTrimStage);
      heroTopTabs?.classList.toggle("is-hidden", isTrimStage);
    }

    if (startStepButton) {
      startStepButton.textContent =
        currentStep === stepButtons.length - 1 ? "Send" : "Start";
    }
  }

  function setCategory(categoryKey) {
    const nextCars = catalog[categoryKey] || [];

    if (!nextCars.length) {
      return;
    }

    currentCategory = categoryKey;
    currentCars = nextCars;
    currentIndex = 0;
    selectedTrimIndex = 0;

    topTabButtons.forEach((button) => {
      const isActive = button.dataset.category === currentCategory;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    renderCar(currentIndex);
    syncArrowState();
  }

  function getAdjacentCategory(direction) {
    if (!categoryOrder.length) {
      return null;
    }

    const currentCategoryPosition = categoryOrder.indexOf(currentCategory);

    if (currentCategoryPosition === -1) {
      return null;
    }

    for (let offset = 1; offset <= categoryOrder.length; offset += 1) {
      const nextPosition =
        direction === "next"
          ? (currentCategoryPosition + offset) % categoryOrder.length
          : (currentCategoryPosition - offset + categoryOrder.length) %
            categoryOrder.length;
      const nextCategoryKey = categoryOrder[nextPosition];

      if ((catalog[nextCategoryKey] || []).length > 0) {
        return nextCategoryKey;
      }
    }

    return null;
  }

  function changeCar(direction) {
    if (isAnimating || !currentCars.length) {
      return;
    }

    isAnimating = true;

    const exitClass =
      direction === "next" ? "is-sliding-out-left" : "is-sliding-out-right";
    const enterClass =
      direction === "next" ? "is-sliding-in-right" : "is-sliding-in-left";

    heroCarImage.classList.remove(
      "is-sliding-out-left",
      "is-sliding-out-right",
      "is-sliding-in-left",
      "is-sliding-in-right"
    );
    heroCarImage.classList.add(exitClass);

    window.setTimeout(() => {
      if (direction === "next") {
        if (currentIndex < currentCars.length - 1) {
          currentIndex += 1;
        } else {
          const nextCategoryKey = getAdjacentCategory("next");

          if (nextCategoryKey && nextCategoryKey !== currentCategory) {
            currentCategory = nextCategoryKey;
            currentCars = catalog[currentCategory] || [];
            currentIndex = 0;

            topTabButtons.forEach((button) => {
              const isActive = button.dataset.category === currentCategory;
              button.classList.toggle("active", isActive);
              button.setAttribute("aria-selected", isActive ? "true" : "false");
            });
          } else {
            currentIndex = 0;
          }
        }
      } else if (currentIndex > 0) {
        currentIndex -= 1;
      } else {
        const previousCategoryKey = getAdjacentCategory("prev");

        if (previousCategoryKey && previousCategoryKey !== currentCategory) {
          currentCategory = previousCategoryKey;
          currentCars = catalog[currentCategory] || [];
          currentIndex = Math.max(currentCars.length - 1, 0);

          topTabButtons.forEach((button) => {
            const isActive = button.dataset.category === currentCategory;
            button.classList.toggle("active", isActive);
            button.setAttribute("aria-selected", isActive ? "true" : "false");
          });
        } else {
          currentIndex = Math.max(currentCars.length - 1, 0);
        }
      }

      renderCar(currentIndex);
      syncArrowState();

      heroCarImage.classList.remove(exitClass);
      heroCarImage.classList.add(enterClass);

      window.setTimeout(() => {
        heroCarImage.classList.remove(enterClass);
        isAnimating = false;
      }, 380);
    }, 220);
  }

  topTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setCategory(button.dataset.category);
    });
  });

  prevBtn.addEventListener("click", () => {
    changeCar("prev");
  });

  nextBtn.addEventListener("click", () => {
    changeCar("next");
  });

  stepButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      updateSteps(index);
    });
  });

  if (startStepButton) {
    startStepButton.addEventListener("click", () => {
      const nextStep =
        currentStep < stepButtons.length - 1 ? currentStep + 1 : currentStep;
      updateSteps(nextStep);
    });
  }

  viewModelButton?.addEventListener("click", () => {
    updateSteps(0);
  });

  nextColorButton?.addEventListener("click", () => {
    updateSteps(Math.min(2, stepButtons.length - 1));
  });

  heroTrimCards?.addEventListener("click", (event) => {
    const selectTrigger = event.target.closest(".hero_trim_select_btn");
    const moreTrigger = event.target.closest(".hero_trim_more_btn");
    const trigger = selectTrigger || moreTrigger;

    if (!trigger) {
      return;
    }

    const card = trigger.closest(".hero_trim_card");
    const trimIndex = Number(card?.dataset.trimIndex);

    if (Number.isNaN(trimIndex)) {
      return;
    }

    if (selectTrigger) {
      setSelectedTrimCard(trimIndex);
      return;
    }

    if (moreTrigger) {
      toggleTrimDetails(trimIndex);
    }
  });

  window.addEventListener("resize", () => {
    syncProgressPosition();
  });

  setCategory(currentCategory);
  updateSteps(currentStep);
});
