document.addEventListener("DOMContentLoaded", () => {
  const heroSection = document.getElementById("heroSection");
  const heroBgImage = document.getElementById("heroBgImage");
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
  const heroColorStage = document.getElementById("heroColorStage");
  const heroColorTitle = document.getElementById("heroColorTitle");
  const heroColorTrim = document.getElementById("heroColorTrim");
  const heroColorPrice = document.getElementById("heroColorPrice");
  const heroColorLease = document.getElementById("heroColorLease");
  const heroColorImage = document.getElementById("heroColorImage");
  const heroSeatPreview = document.getElementById("heroSeatPreview");
  const heroSeatPreviewImage = document.getElementById("heroSeatPreviewImage");
  const heroPackageStage = document.getElementById("heroPackageStage");
  const heroPackageTitle = document.getElementById("heroPackageTitle");
  const heroPackageTrim = document.getElementById("heroPackageTrim");
  const heroPackagePrice = document.getElementById("heroPackagePrice");
  const heroPackageLease = document.getElementById("heroPackageLease");
  const heroPackageImage = document.getElementById("heroPackageImage");
  const heroPackageCards = document.getElementById("heroPackageCards");
  const heroExteriorName = document.getElementById("heroExteriorName");
  const heroExteriorPrice = document.getElementById("heroExteriorPrice");
  const heroInteriorName = document.getElementById("heroInteriorName");
  const heroExteriorSwatches = document.getElementById("heroExteriorSwatches");
  const heroInteriorSwatches = document.getElementById("heroInteriorSwatches");
  const heroTrimCards = document.getElementById("heroTrimCards");
  const heroTopTabs = document.getElementById("heroTopTabs");
  const viewModelButton = document.getElementById("viewModelButton");
  const nextColorButton = document.getElementById("nextColorButton");
  const viewTrimButton = document.getElementById("viewTrimButton");
  const nextPackagesButton = document.getElementById("nextPackagesButton");
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
  const defaultBackgroundImage =
    heroSection?.dataset.defaultBg || "./img/sub01_build/build_bg.png";
  const packageStageData = {
    EV9: [
      {
        name: "7-Passenger Package",
        price: "$0",
        details: [
          "2nd-row bench seating for 7 passengers",
          "Flexible family-oriented cabin layout"
        ]
      },
      {
        name: "Nightfall Edition Package",
        price: "$1,500",
        details: [
          "Exclusive gloss black exterior accents",
          "Distinctive dark-finish wheel design"
        ]
      }
    ]
  };

  const trimStageData = {
    Sportage: {
      grade: "X-Line AWD",
      price: "$33,390 Starting MSRP*",
      lease: "$379 / 36 mo est. lease payments*",
      trims: [
        {
          name: "LX FWD",
          price: "$28,690 Starting MSRP*",
          lease: "$329 / 36 mo est. lease payments*",
          details: ["2.5L 4-cylinder Engine", "12.2-in. Instrument Display", "17-in. Alloy Wheels"]
        },
        {
          name: "EX FWD",
          price: "$30,490 Starting MSRP*",
          lease: "$349 / 36 mo est. lease payments*",
          details: ["Panoramic Sunroof", "Smart Power Liftgate", "SynTex Seat Trim"]
        },
        {
          name: "X-Line AWD",
          price: "$33,390 Starting MSRP*",
          lease: "$379 / 36 mo est. lease payments*",
          details: ["Active AWD", "19-in. Gloss Black Wheels", "X-Line Exterior Styling"]
        },
        {
          name: "X-Pro Prestige AWD",
          price: "$39,590 Starting MSRP*",
          lease: "$439 / 36 mo est. lease payments*",
          details: ["All-Terrain Tires", "Harman Kardon Premium Audio", "Ventilated Front Seats"]
        }
      ]
    },
    "Sorento Hybrid": {
      grade: "Prestige AWD",
      price: "$38,690 Starting MSRP*",
      lease: "$429 / 36 mo est. lease payments*",
      trims: [
        {
          name: "EX FWD",
          price: "$38,690 Starting MSRP*",
          lease: "$429 / 36 mo est. lease payments*",
          details: ["Turbo Hybrid Powertrain", "12.3-in. Touchscreen", "Digital Key 2"]
        },
        {
          name: "SX Prestige FWD",
          price: "$43,590 Starting MSRP*",
          lease: "$469 / 36 mo est. lease payments*",
          details: ["Bose Premium Audio", "360 Surround View Monitor", "Blind-Spot View Monitor"]
        },
        {
          name: "EX AWD",
          price: "$40,490 Starting MSRP*",
          lease: "$449 / 36 mo est. lease payments*",
          details: ["Torque-Vectoring AWD", "Heated Steering Wheel", "Smart Power Tailgate"]
        },
        {
          name: "Prestige AWD",
          price: "$46,890 Starting MSRP*",
          lease: "$499 / 36 mo est. lease payments*",
          details: ["Leather Seat Trim", "Dual Panoramic Displays", "Premium Interior Finish"]
        }
      ]
    },
    EV6: {
      grade: "GT-Line AWD",
      price: "$42,900 Starting MSRP*",
      lease: "$529 / 36 mo est. lease payments*",
      trims: [
        {
          name: "Light RWD",
          price: "$42,900 Starting MSRP*",
          lease: "$529 / 36 mo est. lease payments*",
          details: ["EPA-est. 232-mile range", "Rear-Wheel Drive", "Fast DC Charging"]
        },
        {
          name: "Wind RWD",
          price: "$48,700 Starting MSRP*",
          lease: "$569 / 36 mo est. lease payments*",
          details: ["EPA-est. 310-mile range", "Meridian Audio", "Heated Front Seats"]
        },
        {
          name: "GT-Line AWD",
          price: "$57,600 Starting MSRP*",
          lease: "$629 / 36 mo est. lease payments*",
          details: ["Dual Motor AWD", "Augmented Reality HUD", "20-in. Alloy Wheels"]
        },
        {
          name: "GT AWD",
          price: "$61,600 Starting MSRP*",
          lease: "$699 / 36 mo est. lease payments*",
          details: ["576 hp", "Electronically Controlled Suspension", "GT Interior Accents"]
        }
      ]
    },
    EV9: {
      grade: "Land AWD",
      price: "$68,900 Starting MSRP*",
      lease: "$648 / 36 mo est. lease payments*",
      trims: [
        {
          name: "Light RWD",
          price: "$54,900 Starting MSRP*",
          lease: "$548 / 36 mo est. lease payments*",
          image: "./img/sub01_build/trim_light.png",
          details: [
            "$54,900 Starting MSRP*",
            "NACS Charging Port",
            "7-Passenger Seating w/ 2nd-row Bench Seat"
          ]
        },
        {
          name: "Light Long Range RWD",
          price: "$57,900 Starting MSRP*",
          lease: "$578 / 36 mo est. lease payments*",
          image: "./img/sub01_build/trim_light.png",
          details: [
            "$57,900 Starting MSRP*",
            "7-Passenger Seating or 6-Passenger Option",
            "Homelink Rearview Mirror & Power Sunroof*",
            "Front & Rear Parking Sensors*"
          ]
        },
        {
          name: "Wind AWD",
          price: "$63,900 Starting MSRP*",
          lease: "$618 / 36 mo est. lease payments*",
          details: [
            "$63,900 Starting MSRP*",
            "379 hp & 443 lb.-ft. of torque (Dual Motor)",
            "Dual Sunroofs & Driver's Memory System",
            "Blind-Spot & 360 Surround View Monitor*",
            "Included All-Wheel Drive"
          ]
        },
        {
          name: "Land AWD",
          price: "$68,900 Starting MSRP*",
          lease: "$648 / 36 mo est. lease payments*",
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
          price: "$71,900 Starting MSRP*",
          lease: "$698 / 36 mo est. lease payments*",
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
      trims: [
        {
          name: "LXS",
          price: "$21,990 Starting MSRP*",
          lease: "$259 / 36 mo est. lease payments*",
          details: ["2.0L Engine", "12.3-in. Display", "Kia Connect"]
        },
        {
          name: "EX",
          price: "$23,990 Starting MSRP*",
          lease: "$279 / 36 mo est. lease payments*",
          details: ["Panoramic Display", "Heated Front Seats", "Wireless Charging"]
        },
        {
          name: "GT-Line",
          price: "$25,190 Starting MSRP*",
          lease: "$299 / 36 mo est. lease payments*",
          details: ["Sport Exterior Package", "18-in. Alloy Wheels", "Gloss Black Trim"]
        },
        {
          name: "GT-Line Turbo",
          price: "$28,090 Starting MSRP*",
          lease: "$339 / 36 mo est. lease payments*",
          details: ["1.6L Turbo Engine", "Multi-Link Rear Suspension", "GT-Line Interior"]
        }
      ]
    }
  };

  function hydrateEv9TrimDataFromHtml() {
    const trimCardElements = Array.from(
      document.querySelectorAll("#heroTrimCards .hero_trim_card")
    );

    if (!trimCardElements.length) {
      return;
    }

    trimStageData.EV9.trims = trimCardElements.map((card) => {
      const name = card.querySelector("strong")?.textContent?.trim() || "EV9 Trim";
      const imageElement = card.querySelector(".hero_trim_card_asset");
      const priceText =
        card.querySelector(".hero_trim_card_price")?.textContent?.trim();
      const leaseText =
        card.querySelector(".hero_trim_card_lease")?.textContent?.trim();
      const details = Array.from(card.querySelectorAll(".hero_trim_card_details li"))
        .map((item) => item.textContent?.trim())
        .filter(Boolean);

      return {
        name,
        price: priceText || details[0] || trimStageData.EV9.price,
        lease: leaseText || trimStageData.EV9.lease,
        image: imageElement?.getAttribute("src") || "./img/sub01_build/trim_light.png",
        alt: imageElement?.getAttribute("alt") || name,
        details
      };
    });
  }

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

  function getTrimDataForTitle(title) {
    return trimStageData[title] || trimStageData.EV9;
  }

  function getNormalizedTrim(trimData, trimItem, fallbackImage, fallbackAlt) {
    if (typeof trimItem !== "string") {
      return {
        ...trimItem,
        price: trimItem.price || trimData.price,
        lease: trimItem.lease || trimData.lease,
        image: trimItem.image || fallbackImage,
        alt: trimItem.alt || fallbackAlt
      };
    }

    return {
      name: trimItem,
      price: trimData.price,
      lease: trimData.lease,
      image: fallbackImage,
      alt: fallbackAlt,
      details: [trimData.price, trimData.grade, "More details coming soon"]
    };
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
  let selectedTrimIndex = null;
  let selectedExteriorIndex = 0;
  let selectedInteriorIndex = 0;
  let selectedPackages = new Set();

  function parseCurrencyValue(value) {
    const numericValue = Number(String(value || "").replace(/[^0-9.-]/g, ""));
    return Number.isFinite(numericValue) ? numericValue : 0;
  }

  function formatCurrencyValue(value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(value);
  }

  function getSelectedExteriorAdjustment() {
    const selectedExterior = getSelectedExteriorSwatch();
    return parseCurrencyValue(selectedExterior?.dataset.price || 0);
  }

  function getAdjustedPriceLabel(basePrice) {
    const adjustedPrice = parseCurrencyValue(basePrice) + getSelectedExteriorAdjustment();
    return `${formatCurrencyValue(adjustedPrice)} Starting MSRP*`;
  }

  function isEv9Selected() {
    return getCurrentCar()?.title === "EV9";
  }

  function getAllowedStep(stepIndex) {
    if (isEv9Selected()) {
      return stepIndex;
    }

    return Math.min(stepIndex, 0);
  }

  function syncEv9OnlyState() {
    const ev9Selected = isEv9Selected();

    stepButtons.forEach((button, index) => {
      const isLocked = !ev9Selected && index > 0;
      button.disabled = isLocked;
      button.setAttribute("aria-disabled", isLocked ? "true" : "false");
    });

    if (startStepButton) {
      startStepButton.disabled = !ev9Selected;
      startStepButton.setAttribute(
        "aria-disabled",
        !ev9Selected ? "true" : "false"
      );
    }

    if (!ev9Selected && currentStep > 0) {
      updateSteps(0);
    }
  }

  function getCurrentCar() {
    return currentCars[currentIndex] || null;
  }

  function getSelectedExteriorSwatch() {
    const swatches = heroExteriorSwatches
      ? Array.from(heroExteriorSwatches.querySelectorAll(".hero_color_swatch"))
      : [];

    return swatches[selectedExteriorIndex] || swatches[0] || null;
  }

  function getSelectedInteriorSwatch() {
    const swatches = heroInteriorSwatches
      ? Array.from(heroInteriorSwatches.querySelectorAll(".hero_color_swatch"))
      : [];

    return swatches[selectedInteriorIndex] || swatches[0] || null;
  }

  function getExteriorAssetFromSwatch(swatch) {
    const assetId = swatch?.dataset.imageId;

    if (!assetId) {
      return null;
    }

    return document.getElementById(assetId);
  }

  function getInteriorAssetFromSwatch(swatch) {
    const assetId = swatch?.dataset.imageId;

    if (!assetId) {
      return null;
    }

    return document.getElementById(assetId);
  }

  function getCurrentTrimItems(title) {
    const trimData = getTrimDataForTitle(title);
    const currentCar = getCurrentCar();

    return trimData.trims.map((trimItem) =>
      getNormalizedTrim(
        trimData,
        trimItem,
        currentCar?.carImage || "./img/sub01_build/trim_light.png",
        currentCar?.alt || title
      )
    );
  }

  function getCurrentPackages(title) {
    return packageStageData[title] || packageStageData.EV9 || [];
  }

  function applySelectedTrim(title) {
    if (!heroTrimTitle || !heroTrimImage) {
      return;
    }

    const trimData = getTrimDataForTitle(title);
    const trimItems = getCurrentTrimItems(title);
    const selectedTrim =
      selectedTrimIndex === null
        ? trimItems[0] || null
        : trimItems[selectedTrimIndex] || trimItems[0] || null;
    const titleKey = getTitleKey(title);

    heroTrimTitle.innerHTML = formatCarTitleMarkup(title);
    heroTrimTitle.className = "hero_trim_title";

    if (titleKey) {
      heroTrimTitle.classList.add(`hero_title_${titleKey}`);
    }

    heroTrimGrade.textContent = selectedTrim?.name || trimData.grade;
    heroTrimPrice.textContent = getAdjustedPriceLabel(
      selectedTrim?.price || trimData.price
    );
    heroTrimLease.textContent = selectedTrim?.lease || trimData.lease;
    heroTrimImage.src = selectedTrim?.image || "./img/sub01_build/trim_light.png";
    heroTrimImage.alt = selectedTrim?.alt || title;

    if (heroColorTitle && heroColorImage) {
      heroColorTitle.innerHTML = formatCarTitleMarkup(title);
      heroColorTitle.className = "hero_color_title";

      if (titleKey) {
        heroColorTitle.classList.add(`hero_title_${titleKey}`);
      }

      heroColorTrim.textContent = selectedTrim?.name || trimData.grade;
      heroColorPrice.textContent = getAdjustedPriceLabel(
        selectedTrim?.price || trimData.price
      );
      heroColorLease.textContent = selectedTrim?.lease || trimData.lease;
      heroColorImage.src = selectedTrim?.image || "./img/sub01_build/trim_light.png";
      heroColorImage.alt = selectedTrim?.alt || title;
    }

    if (heroPackageTitle && heroPackageImage) {
      heroPackageTitle.innerHTML = formatCarTitleMarkup(title);
      heroPackageTitle.className = "hero_package_title";

      if (titleKey) {
        heroPackageTitle.classList.add(`hero_title_${titleKey}`);
      }

      heroPackageTrim.textContent = selectedTrim?.name || trimData.grade;
      heroPackagePrice.textContent = getAdjustedPriceLabel(
        selectedTrim?.price || trimData.price
      );
      heroPackageLease.textContent = selectedTrim?.lease || trimData.lease;
      heroPackageImage.src = selectedTrim?.image || "./img/sub01_build/trim_light.png";
      heroPackageImage.alt = selectedTrim?.alt || title;
    }
  }

  function syncColorStageSelections() {
    const exteriorSwatches = heroExteriorSwatches
      ? Array.from(heroExteriorSwatches.querySelectorAll(".hero_color_swatch"))
      : [];
    const interiorSwatches = heroInteriorSwatches
      ? Array.from(heroInteriorSwatches.querySelectorAll(".hero_color_swatch"))
      : [];

    exteriorSwatches.forEach((swatch, index) => {
      swatch.classList.toggle("is-selected", index === selectedExteriorIndex);
      swatch.setAttribute(
        "aria-pressed",
        index === selectedExteriorIndex ? "true" : "false"
      );
    });

    interiorSwatches.forEach((swatch, index) => {
      swatch.classList.toggle("is-selected", index === selectedInteriorIndex);
      swatch.setAttribute(
        "aria-pressed",
        index === selectedInteriorIndex ? "true" : "false"
      );
    });

    const selectedExterior = getSelectedExteriorSwatch();
    const selectedInterior = getSelectedInteriorSwatch();

    if (heroExteriorName && selectedExterior) {
      heroExteriorName.textContent = selectedExterior.dataset.name || "";
    }

    if (heroExteriorPrice && selectedExterior) {
      heroExteriorPrice.textContent = selectedExterior.dataset.price || "";
    }

    if (heroInteriorName && selectedInterior) {
      heroInteriorName.textContent = selectedInterior.dataset.name || "";
    }

    const currentCar = getCurrentCar();
    if (currentCar) {
      applySelectedTrim(currentCar.title);
    }

    const selectedInteriorAsset = getInteriorAssetFromSwatch(selectedInterior);

    if (heroSeatPreviewImage && selectedInteriorAsset) {
      heroSeatPreviewImage.src =
        selectedInteriorAsset.getAttribute("src") || heroSeatPreviewImage.src;
      heroSeatPreviewImage.alt =
        selectedInteriorAsset.getAttribute("alt") || heroSeatPreviewImage.alt;
    }

    const selectedExteriorAsset = getExteriorAssetFromSwatch(selectedExterior);

    if (selectedExteriorAsset && heroColorImage) {
      heroColorImage.src = selectedExteriorAsset.getAttribute("src") || heroColorImage.src;
      heroColorImage.alt = selectedExteriorAsset.getAttribute("alt") || heroColorImage.alt;
    }

    if (selectedExteriorAsset && heroPackageImage) {
      heroPackageImage.src =
        selectedExteriorAsset.getAttribute("src") || heroPackageImage.src;
      heroPackageImage.alt =
        selectedExteriorAsset.getAttribute("alt") || heroPackageImage.alt;
    }
  }

  function renderTrimCards(title) {
    if (!heroTrimCards) {
      return;
    }

    const trimItems = getCurrentTrimItems(title);
    heroTrimCards.innerHTML = trimItems
      .map(
        (trimItem, index) => `
          <article class="hero_trim_card${index === selectedTrimIndex ? " selected" : ""}${index === 0 ? " expanded" : ""}" data-trim-index="${index}">
            <div class="hero_trim_card_head">
              <strong>${escapeHtml(trimItem.name)}</strong>
              <button type="button" class="hero_trim_select_btn" aria-pressed="${index === selectedTrimIndex ? "true" : "false"}">
                Select
              </button>
            </div>
            <div class="hero_trim_card_details">
              <ul>
                ${trimItem.details
                  .map((detail) => `<li>${escapeHtml(detail)}</li>`)
                  .join("")}
              </ul>
            </div>
            <button type="button" class="hero_trim_more_btn" aria-expanded="${index === 0 ? "true" : "false"}">
              More
            </button>
          </article>
        `
      )
      .join("");
  }

  function renderPackageCards(title) {
    if (!heroPackageCards) {
      return;
    }

    const packages = getCurrentPackages(title);
    heroPackageCards.innerHTML = packages
      .map(
        (packageItem, index) => `
          <article class="hero_package_card" data-package-index="${index}">
            <div class="hero_package_card_top">
              <div class="hero_package_card_heading">
                <strong>${escapeHtml(packageItem.name)}</strong>
                <span>${escapeHtml(packageItem.price)}</span>
              </div>
              <button type="button" class="hero_package_add_btn" aria-pressed="${selectedPackages.has(index) ? "true" : "false"}">
                ${selectedPackages.has(index) ? "Added" : "Add +"}
              </button>
            </div>
            <div class="hero_package_card_details">
              <ul>
                ${packageItem.details
                  .map((detail) => `<li>${escapeHtml(detail)}</li>`)
                  .join("")}
              </ul>
            </div>
            <button type="button" class="hero_package_more_btn" aria-expanded="false">More</button>
          </article>
        `
      )
      .join("");
  }

  function setSelectedTrimCard(targetIndex) {
    if (!heroTrimCards) {
      return;
    }

    const trimCards = Array.from(heroTrimCards.querySelectorAll(".hero_trim_card"));
    selectedTrimIndex = selectedTrimIndex === targetIndex ? null : targetIndex;

    trimCards.forEach((card, index) => {
      const isSelected = index === selectedTrimIndex;
      card.classList.toggle("selected", isSelected);
      if (isSelected) {
        card.classList.add("expanded");
      }

      const selectButton = card.querySelector(".hero_trim_select_btn");
      if (selectButton) {
        selectButton.setAttribute("aria-pressed", isSelected ? "true" : "false");
      }

      const moreButton = card.querySelector(".hero_trim_more_btn");
      if (moreButton && isSelected) {
        moreButton.setAttribute("aria-expanded", "true");
      }
    });

    const currentCar = getCurrentCar();
    if (currentCar) {
      applySelectedTrim(currentCar.title);
      syncColorStageSelections();
    }
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

    if (heroBgImage) {
      heroBgImage.src = currentCar.bgImage;
    }

    heroCarImage.src = currentCar.carImage;
    heroCarImage.alt = currentCar.alt;

    if (heroTrimTitle && heroTrimImage) {
      renderTrimCards(currentCar.title);
      applySelectedTrim(currentCar.title);
    }

    renderPackageCards(currentCar.title);
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
    currentStep = getAllowedStep(stepIndex);

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

    if (heroModelStage && heroTrimStage && heroColorStage && heroPackageStage) {
      const isModelStage = currentStep === 0;
      const isTrimStage = currentStep === 1;
      const isColorStage = currentStep === 2;
      const isPackageStage = currentStep >= 3;

      heroModelStage.classList.toggle("is-hidden", !isModelStage);
      heroTrimStage.classList.toggle("is-visible", isTrimStage);
      heroTrimStage.setAttribute("aria-hidden", isTrimStage ? "false" : "true");
      heroColorStage.classList.toggle("is-visible", isColorStage);
      heroColorStage.setAttribute("aria-hidden", isColorStage ? "false" : "true");
      heroPackageStage.classList.toggle("is-visible", isPackageStage);
      heroPackageStage.setAttribute(
        "aria-hidden",
        isPackageStage ? "false" : "true"
      );
      startStepButton?.classList.toggle("is-hidden", !isModelStage);
      heroTopTabs?.classList.toggle("is-hidden", !isModelStage);
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
    selectedTrimIndex = null;
    selectedExteriorIndex = 0;
    selectedInteriorIndex = 0;
    selectedPackages = new Set();

    topTabButtons.forEach((button) => {
      const isActive = button.dataset.category === currentCategory;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    renderCar(currentIndex);
    syncArrowState();
    syncEv9OnlyState();
    syncColorStageSelections();
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
            selectedTrimIndex = null;
            selectedExteriorIndex = 0;
            selectedInteriorIndex = 0;
            selectedPackages = new Set();

            topTabButtons.forEach((button) => {
              const isActive = button.dataset.category === currentCategory;
              button.classList.toggle("active", isActive);
              button.setAttribute("aria-selected", isActive ? "true" : "false");
            });
          } else {
            currentIndex = 0;
            selectedTrimIndex = null;
            selectedExteriorIndex = 0;
            selectedInteriorIndex = 0;
            selectedPackages = new Set();
          }
        }
      } else if (currentIndex > 0) {
        currentIndex -= 1;
        selectedTrimIndex = null;
        selectedExteriorIndex = 0;
        selectedInteriorIndex = 0;
        selectedPackages = new Set();
      } else {
        const previousCategoryKey = getAdjacentCategory("prev");

        if (previousCategoryKey && previousCategoryKey !== currentCategory) {
          currentCategory = previousCategoryKey;
          currentCars = catalog[currentCategory] || [];
          currentIndex = Math.max(currentCars.length - 1, 0);
          selectedTrimIndex = null;
          selectedExteriorIndex = 0;
          selectedInteriorIndex = 0;
          selectedPackages = new Set();

          topTabButtons.forEach((button) => {
            const isActive = button.dataset.category === currentCategory;
            button.classList.toggle("active", isActive);
            button.setAttribute("aria-selected", isActive ? "true" : "false");
          });
        } else {
          currentIndex = Math.max(currentCars.length - 1, 0);
          selectedTrimIndex = null;
          selectedExteriorIndex = 0;
          selectedInteriorIndex = 0;
          selectedPackages = new Set();
        }
      }

      renderCar(currentIndex);
      syncArrowState();
      syncEv9OnlyState();
      syncColorStageSelections();

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
    if (!isEv9Selected()) {
      return;
    }

    updateSteps(Math.min(2, stepButtons.length - 1));
  });

  viewTrimButton?.addEventListener("click", () => {
    updateSteps(1);
  });

  nextPackagesButton?.addEventListener("click", () => {
    updateSteps(Math.min(3, stepButtons.length - 1));
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

  heroExteriorSwatches?.addEventListener("click", (event) => {
    const swatch = event.target.closest(".hero_color_swatch");

    if (!swatch) {
      return;
    }

    const exteriorSwatches = Array.from(
      heroExteriorSwatches.querySelectorAll(".hero_color_swatch")
    );
    selectedExteriorIndex = exteriorSwatches.indexOf(swatch);
    syncColorStageSelections();
  });

  heroInteriorSwatches?.addEventListener("click", (event) => {
    const swatch = event.target.closest(".hero_color_swatch");

    if (!swatch) {
      return;
    }

    const interiorSwatches = Array.from(
      heroInteriorSwatches.querySelectorAll(".hero_color_swatch")
    );
    selectedInteriorIndex = interiorSwatches.indexOf(swatch);
    syncColorStageSelections();
  });

  heroPackageCards?.addEventListener("click", (event) => {
    const addTrigger = event.target.closest(".hero_package_add_btn");
    const moreTrigger = event.target.closest(".hero_package_more_btn");
    const card = event.target.closest(".hero_package_card");
    const packageIndex = Number(card?.dataset.packageIndex);

    if (Number.isNaN(packageIndex)) {
      return;
    }

    if (addTrigger) {
      if (selectedPackages.has(packageIndex)) {
        selectedPackages.delete(packageIndex);
      } else {
        selectedPackages.add(packageIndex);
      }

      renderPackageCards(getCurrentCar()?.title || "EV9");
      return;
    }

    if (moreTrigger) {
      const willExpand = !card.classList.contains("expanded");
      card.classList.toggle("expanded", willExpand);
      moreTrigger.setAttribute("aria-expanded", willExpand ? "true" : "false");
    }
  });

  window.addEventListener("resize", () => {
    syncProgressPosition();
  });

  hydrateEv9TrimDataFromHtml();
  setCategory(currentCategory);
  renderPackageCards(getCurrentCar()?.title || "EV9");
  syncColorStageSelections();
  syncEv9OnlyState();
  updateSteps(currentStep);
});
