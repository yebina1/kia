const trimTabs = document.querySelectorAll('.trim_selector .trim_tab');
const trimVisual = document.querySelector('.trim_selector .trim_visual');
const trimName = document.querySelector('.trim_selector .trim_name');
const trimPrice = document.querySelector('.trim_selector .trim_price');
const trimChipList = document.querySelector('.trim_selector .trim_chip_list');
const trimInfo = document.querySelector('.trim_selector .trim_info');

const trimData = {
  'light-rwd': {
    image: './trim_visual_base.png',
    name: 'Light RWD',
    price: '$54,900',
    chips: ['230 Miles w', '800V Charging', '76.1 kWh Battery', '7-Passenger Seating'],
    cards: [
      {
        title: 'Charging & Battery',
        items: ['230 mi EPA-est. range', '76.1 kWh battery', 'NACS charge port', '800V charging architecture']
      },
      {
        title: 'Cabin Tech',
        items: ['Dual 12.3-in displays', 'Wireless Apple CarPlay & Android Auto', 'Digital Key 2.0 + Fingerprint Module', 'Wireless charger + 6 USB-C ports']
      },
      {
        title: 'Safety',
        items: ['Forward Collision-Avoidance Assist', 'Rear-view camera', 'Tire-Pressure Monitoring System', 'Over-the-Air updates']
      },
      {
        title: 'Comfort & Utility',
        items: ['7-passenger seating', '19-in alloy wheels', 'Heated & ventilated front seats', 'Smart Power liftgate']
      }
    ]
  },
  'light-long-range-rwd': {
    image: './trim_visual_1_photo.png',
    name: 'Light Long Range RWD',
    price: '$59,900',
    chips: ['304 miles w', 'Rear-Wheel Drive', '99.8 kWh Battery', 'Heat pump'],
    cards: [
      {
        title: 'Charging & Battery',
        items: ['304 mi EPA-est. range', '99.8 kWh battery', 'NACS charge port', '800V charging architecture']
      },
      {
        title: 'Cabin Tech',
        items: ['Dual 12.3-in displays', 'Wireless Apple CarPlay & Android Auto', 'Digital Key 2.0 + Fingerprint Module', 'Wireless charger + 6 USB-C ports']
      },
      {
        title: 'Safety',
        items: ['Highway Driving Assist 2', 'Blind-Spot View Monitor', 'Parking Distance Warning', 'Navigation-based Smart Cruise']
      },
      {
        title: 'Comfort & Utility',
        items: ['2nd-row bench seating', '20-in alloy wheels', 'Power liftgate', 'Roof rails + extra cargo utility']
      }
    ]
  },
  'wind-awd': {
    image: './trim_visual_2_photo.png',
    name: 'Wind AWD',
    price: '$63,900',
    chips: ['280 miles w', 'Dual Motor AWD', '99.8 kWh Battery', 'Towing prep'],
    cards: [
      {
        title: 'Charging & Battery',
        items: ['280 mi EPA-est. range', '99.8 kWh battery', 'Dual-motor AWD', 'NACS + 800V architecture']
      },
      {
        title: 'Cabin Tech',
        items: ['Dual 12.3-in displays', 'Wireless Apple CarPlay & Android Auto', 'Digital Key 2.0 + Fingerprint Module', 'Wireless charger + USB-C ports']
      },
      {
        title: 'Safety',
        items: ['Highway Driving Assist 2', 'Surround View Monitor', 'Blind-Spot View Monitor', 'Parking Collision-Avoidance Assist']
      },
      {
        title: 'Comfort & Utility',
        items: ['2nd-row captain\'s chairs', '20-in alloy wheels', 'Heated + ventilated front seats', 'Smart power liftgate']
      }
    ]
  },
  'land-awd': {
    image: './trim_visual_3_photo.png',
    name: 'Land AWD',
    price: '$69,900',
    chips: ['280 miles w', 'Dual Motor AWD', '19-in+ features', 'Boosted comfort'],
    cards: [
      {
        title: 'Charging & Battery',
        items: ['280 mi EPA-est. range', '99.8 kWh battery', 'NACS charge port', '800V fast charging']
      },
      {
        title: 'Cabin Tech',
        items: ['Dual sunroofs', 'Premium connected services', 'Digital rearview mirror', 'Advanced parking cameras']
      },
      {
        title: 'Safety',
        items: ['Highway Driving Assist 2', 'Forward / side parking assist', 'Surround View Monitor', 'Remote Smart Parking Assist']
      },
      {
        title: 'Comfort & Utility',
        items: ['Premium relaxation seats', '2nd-row captain\'s chairs', 'Ambient lighting', 'Power outlet + extra storage']
      }
    ]
  },
  'gt-line-awd': {
    image: './trim_visual_4_photo.png',
    name: 'GT-Line AWD',
    price: '$71,900',
    chips: ['270 miles w', 'Dual Motor AWD', '21-in wheels', 'Turbo comfort'],
    cards: [
      {
        title: 'Charging & Battery',
        items: ['270 mi EPA-est. range', '99.8 kWh battery', 'Boost AWD performance', '800V charging architecture']
      },
      {
        title: 'Cabin Tech',
        items: ['Meridian premium audio', 'Augmented navigation display', 'Digital Key 2.0 + Fingerprint Module', 'Wireless charger + USB-C ports']
      },
      {
        title: 'Safety',
        items: ['Highway Driving Assist 2', 'Remote Smart Parking Assist 2', 'Forward / blind-spot safety tech', 'Parking collision assist']
      },
      {
        title: 'Comfort & Utility',
        items: ['21-in alloy wheels', 'Relaxation front seats', 'Suede + premium interior details', 'Hands-free smart liftgate']
      }
    ]
  }
};

const renderTrimCards = (cards) => {
  trimInfo.innerHTML = cards.map((card) => `
    <article class="trim_card">
      <h3 class="trim_card_title">${card.title}</h3>
      <span class="trim_card_line"></span>
      <ul class="trim_card_list">
        ${card.items.map((item) => `<li class="trim_card_item">${item}</li>`).join('')}
      </ul>
    </article>
  `).join('');
};

const renderTrimChips = (chips) => {
  if (!chips.length) {
    trimChipList.innerHTML = '';
    trimChipList.classList.add('is_empty');
    return;
  }

  trimChipList.classList.remove('is_empty');
  trimChipList.innerHTML = chips.map((chip) => `<li class="trim_chip_item">${chip}</li>`).join('');
};

const setTrim = (trimKey) => {
  const currentTrim = trimData[trimKey];
  if (!currentTrim) return;

  trimTabs.forEach((tab) => {
    const isActive = tab.dataset.trim === trimKey;
    tab.classList.toggle('on', isActive);
    tab.setAttribute('aria-selected', isActive);
  });

  trimVisual.style.setProperty('--trim-bg', `url('${currentTrim.image}')`);
  trimName.textContent = currentTrim.name;

  if (currentTrim.price) {
    trimPrice.textContent = currentTrim.price;
    trimPrice.classList.remove('is_empty');
  } else {
    trimPrice.textContent = '';
    trimPrice.classList.add('is_empty');
  }

  renderTrimChips(currentTrim.chips);
  renderTrimCards(currentTrim.cards);
};

trimTabs.forEach((tab) => {
  tab.addEventListener('click', function () {
    setTrim(this.dataset.trim);
  });
});

setTrim('light-rwd');

const interiorButtons = document.querySelectorAll('.interior .interior_hotspot');
const interiorPanel = document.querySelector('.interior .interior_panel');
const interiorPanelImg = document.querySelector('.interior .interior_panel_img');
const interiorPanelClose = document.querySelector('.interior .interior_panel_close');

const interiorData = {
  'spacious-3-row': {
    image: './but1.png',
    alt: 'Spacious 3-Row Room for everyone panel'
  },
  'meridian-audio': {
    image: './but2.png',
    alt: 'Meridian Audio Premium sound panel'
  },
  'panoramic-display-rear': {
    image: './but3.png',
    alt: 'Panoramic Display Dual 12.3-in screens panel'
  },
  'power-front-seats': {
    image: './but4.png',
    alt: 'Power Front Seats Easy seat adjustment panel'
  },
  'panoramic-display-front': {
    image: './but5.png',
    alt: 'Panoramic Display Wide intuitive view panel'
  }
};

const closeInteriorPanel = () => {
  if (!interiorPanel) return;

  interiorPanel.classList.remove('is_open');
  interiorButtons.forEach((button) => button.classList.remove('is-active'));

  window.setTimeout(() => {
    if (!interiorPanel.classList.contains('is_open')) {
      interiorPanel.hidden = true;
      interiorPanelImg.removeAttribute('src');
      interiorPanelImg.setAttribute('alt', '');
    }
  }, 280);
};

const openInteriorPanel = (panelKey) => {
  const currentPanel = interiorData[panelKey];
  if (!currentPanel || !interiorPanel) return;

  interiorButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.panel === panelKey);
  });

  interiorPanelImg.src = currentPanel.image;
  interiorPanelImg.alt = currentPanel.alt;
  interiorPanel.hidden = false;

  requestAnimationFrame(() => {
    interiorPanel.classList.add('is_open');
  });
};

interiorButtons.forEach((button) => {
  button.addEventListener('click', function () {
    openInteriorPanel(this.dataset.panel);
  });
});

if (interiorPanelClose) {
  interiorPanelClose.addEventListener('click', closeInteriorPanel);
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeInteriorPanel();
  }
});


const driverAssistVideo = document.querySelector('.driver_assist .driver_assist_video');

if (driverAssistVideo) {
  const playDriverAssistVideo = () => {
    const playPromise = driverAssistVideo.play();

    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        driverAssistVideo.controls = true;
      });
    }
  };

  driverAssistVideo.muted = true;
  driverAssistVideo.defaultMuted = true;
  driverAssistVideo.playsInline = true;

  if (document.readyState === 'complete') {
    playDriverAssistVideo();
  } else {
    window.addEventListener('load', playDriverAssistVideo, { once: true });
  }
}
