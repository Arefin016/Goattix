document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // hero--slider
  $(".hero--slider").owlCarousel({
    loop: true,
    margin: 10,
    items: 1,
    dots: true,
    nav: false,
    autoplay: true,
  });

  // handleAccordion
  function handleAccordion() {
    let accordionHeader = document.querySelectorAll(".accordion-header");

    accordionHeader?.forEach((header) => {
      header.addEventListener("click", function () {
        const content = header.nextElementSibling;

        if (content.style.maxHeight) {
          content.style.maxHeight = null;
          content.style.marginTop = "0";
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
          content.style.marginTop = "22px";
        }

        header.classList.toggle("active");

        document
          .querySelectorAll(".accordion-content")
          .forEach((otherContent) => {
            if (otherContent !== content) {
              otherContent.style.maxHeight = null;
            }
          });

        document
          .querySelectorAll(".accordion-header")
          .forEach((otherHeader) => {
            if (otherHeader !== header) {
              otherHeader.classList.remove("active");
            }
          });
      });
    });
  }
  handleAccordion();

  // handle Quantity
  function handleQuantity() {
    let quantityWrapp = document.querySelectorAll(".quantity");
    if (quantityWrapp) {
      quantityWrapp.forEach((quantity) => {
        let plusBtn = quantity.querySelector(".plus");
        let minusBtn = quantity.querySelector(".minus");
        let inputElme = quantity.querySelector("input");
        // plusbtn
        plusBtn.addEventListener("click", function () {
          let currentValue = parseInt(inputElme.value);

          if (currentValue < 10) {
            inputElme.value = currentValue + 1;
            minusBtn.disabled = false;
          }
          if (parseInt(inputElme.value) >= 10) {
            plusBtn.disabled = true;
          }
        });

        // minus button
        minusBtn.addEventListener("click", function () {
          let currentValue = parseInt(inputElme.value);

          if (currentValue > 0) {
            inputElme.value = currentValue - 1;
            plusBtn.disabled = false;
          }
          if (parseInt(inputElme.value) <= 0) {
            minusBtn.disabled = true;
          }
        });
      });
    }
  }
  handleQuantity();
  // showPopup
  function showPopup(popElem, overlay) {
    if (popElem && overlay) {
      popElem.classList.add("opacity-100", "visible");
      overlay.classList.add("opacity-100", "visible");
      popElem.classList.remove("opacity-0", "invisible");
      overlay.classList.remove("opacity-0", "invisible");
    }
  }
  // hidePopup
  function hidePopup(popElem, overlay) {
    if (popElem && overlay) {
      popElem.classList.remove("opacity-100", "visible");
      overlay.classList.remove("opacity-100", "visible");
      popElem.classList.add("opacity-0", "invisible");
      overlay.classList.add("opacity-0", "invisible");
    }
  }
  // handleGetTicketPopup
  function handleGetTicketPopup() {
    let trigger = document.querySelector(".btn-getTicket");
    let popup = document.getElementById("getTicketPopup");
    let overlay = document.querySelector(".overlay");
    let closePopupBtn = document.querySelector(".close--getTicket");

    if (trigger) {
      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        showPopup(popup, overlay);
      });

      closePopupBtn?.addEventListener("click", () => {
        hidePopup(popup, overlay);
      });

      // Add event listener to close the popup when clicking outside
      document.addEventListener("click", function (event) {
        if (!popup.contains(event.target) && !trigger.contains(event.target)) {
          hidePopup(popup, overlay);
        }
      });
    }
  }
  handleGetTicketPopup();
  // handleCustomTab
  function handleCustomTab() {
    const tabLinks = document.querySelectorAll(".tab-link");
    const tabPanes = document.querySelectorAll(".tab-pane");

    tabLinks?.forEach((link) => {
      link?.addEventListener("click", function () {
        tabLinks.forEach((link) => link.classList.remove("active"));

        // Apply fade-out effect to all panes before switching
        tabPanes.forEach((pane) => {
          pane.classList.add("fade-out");
          pane.classList.remove("fade-in");
        });

        // Wait for the fade-out effect to complete, then switch tabs
        setTimeout(() => {
          tabPanes.forEach((pane) => pane.classList.add("hidden"));

          // Show the corresponding tab pane with a fade-in effect
          const tabId = link.getAttribute("data-tab");
          const activePane = document.getElementById(tabId);
          activePane.classList.remove("hidden");
          activePane.classList.remove("fade-out");
          activePane.classList.add("fade-in");
        }, 300);

        link.classList.add("active");
      });
    });
  }

  handleCustomTab();

  // handle experience toggle
  function handleExperienceToggle() {
    $(".trigger--btn").each(function () {
      $(this).on("click", function () {
        const expericenceCard = $(this).closest(".expericence-card");
        const currentCollapseContent =
          expericenceCard.find(".collapse--content");
        let svgIcon = $(this).find("svg");

        // Close any other open collapses
        $(".collapse--content").not(currentCollapseContent).slideUp();
        $(".my-event-single")
          .not($(this).closest(".my-event-single"))
          .removeClass("rounded-b-none");
        $(".trigger--btn svg")
          .not($(this).closest(".my-event-single"))
          .removeClass("rotate-180");
        // Toggle the current collapse content
        currentCollapseContent.slideToggle();

        const myEventSingle = $(this).closest(".my-event-single");
        // Add or remove the class with a delay
        if (myEventSingle.hasClass("rounded-b-xl")) {
          setTimeout(function () {
            myEventSingle.removeClass("rounded-b-xl");
            svgIcon.removeClass("rotate-180");
          }, 320); // Adjust the delay time as needed
        } else {
          myEventSingle.addClass("rounded-b-xl");
          svgIcon.addClass("rotate-180");
          svgIcon.addClass("duration-300");
        }
      });
    });
  }
  handleExperienceToggle();

  const phoneInputField = document.querySelector("#phone");
  if (phoneInputField) {
    const phoneInput = window.intlTelInput(phoneInputField, {
      initialCountry: "us",
      separateDialCode: true,
      preferredCountries: ["us", "gb", "ca"],
      utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });
  }

  // Initialize AOS (Animate On Scroll)
  AOS.init({
    once: true,
  });
  // Initialize niceSelect
  $("select").niceSelect();
});

//=== time and date relatex func ====//
// startDate Func
function starDateFunc() {
  console.log("clicked");

  document.addEventListener("DOMContentLoaded", function () {
    flatpickr(".start-date", {
      // Enable time picker
      dateFormat: "Y-m-d", // Date format with 12-hour time and AM/PM
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  flatpickr(".start-date", {
    // Enable time picker
    dateFormat: "Y-m-d", // Date format with 12-hour time and AM/PM
  });
});

// endDate Func

document.addEventListener("DOMContentLoaded", function () {
  flatpickr(`.end-date`, {
    // Enable time picker
    dateFormat: "Y-m-d", // Date format with 12-hour time and AM/PM
  });
});

// Start Time Picker
document.addEventListener("DOMContentLoaded", function () {
  flatpickr(".start-time", {
    enableTime: true, // Enable time picker
    noCalendar: true, // Disable calendar
    dateFormat: "h:i K", // 12-hour time format with AM/PM
    time_24hr: false, // 12-hour format
    minuteIncrement: 5, // Increment by 5 minutes
    defaultHour: 9, // Default hour (9 AM)
    defaultMinute: 0, // Default minute (00)
  });
});
// endTime Func

// End Time Picker
document.addEventListener("DOMContentLoaded", function () {
  flatpickr(".end-time", {
    enableTime: true, // Enable time picker
    noCalendar: true, // Disable calendar
    dateFormat: "h:i K", // 12-hour time format with AM/PM
    time_24hr: false, // 12-hour format
    minuteIncrement: 5, // Increment by 5 minutes
    defaultHour: 18, // Default hour (6 PM)
    defaultMinute: 30, // Default minute (30)
  });
});

//=== time and date relatex func ====//

//=== image upload related func ===//
const backgroundInput = document.getElementById("sm-background-image");
const imageContainerLabel = document.getElementById("sm-image-preview-label");
const imageNameContainer = document.getElementById("image-name-wrapper");
const bannerMainWrapper = document.getElementById("banner-main-wrapper");

// image up and prev func
function imageUploadAndPreview(
  fileInput,
  previewContainer,
  imageNameContainer
) {
  fileInput.addEventListener("change", () => {
    firstName = fileInput.files[0].name.split("-")[0].slice(0, 10);
    lastName =
      fileInput.files[0].name.split("-")[
        fileInput.files[0].name.split("-").length - 1
      ];

    shortName = firstName + "....." + lastName;

    imageNameContainer.style.display = "flex";
    imageNameContainer.children[0].innerHTML = shortName;

    let imageUrl = URL.createObjectURL(fileInput.files[0]);

    previewContainer.innerHTML = `<img style="object-fit: contain; width: 100%"; height: 100% class="w-ful h-full object-cover" src="${imageUrl}" alt="image"/>`;
  });
}

if (backgroundInput && imageContainerLabel && imageNameContainer) {
  imageUploadAndPreview(
    backgroundInput,
    imageContainerLabel,
    imageNameContainer
  );
}

if (imageNameContainer && bannerMainWrapper) {
  imageNameContainer.addEventListener("click", () => {
    console.log();
    bannerMainWrapper.children[1].children[1].style.display = "none";
    bannerMainWrapper.children[1].children[0].children[1].innerHTML = `<h4 class="text-sm text-gray-400 pb-1">
                  Choose a JPG, PNG, or GIF, file under 32 MB in size
                </h4>
                <h3 class="text-white">CHOOSE A IMAGE</h3>`;
  });
}

//=== image upload related func ===//

//=== append new element related func ====//
// create new event element
const createNewEventBtn = document.getElementById("create-new-venue");
const newEventSelector = document.getElementsByClassName("new-venue-selector");
const newEventParentContainer = document.getElementById(
  "new-venue-parent-container"
);

// add new organizer element
const createNewVenueBtn = document.getElementById("create-new-organizer");
const newVenueSelector = document.getElementsByClassName(
  "new-organizer-selector"
);
const newVenueParentContainer = document.getElementById(
  "new-organizer-parent-container"
);

// add new recurring event

// append new data func
function appendNewElementFunc(
  addBtn,
  appendChildElem,
  appendParentElem,
  target,
  extraclass1,
  extraclass2
) {
  addBtn.addEventListener("click", (event) => {
    starDateFunc();

    let newCreatedElement = document.createElement("li");

    newCreatedElement.classList.add(
      "w-full",
      "new-venue-selector",
      "mt-6",
      "venue-details",
      "h-full",
      "flex",
      "p-1",
      `${extraclass1}`,
      `${extraclass2}`
    );
    newCreatedElement.innerHTML = appendChildElem[0].innerHTML;

    appendParentElem.appendChild(newCreatedElement);
  });
}

// add new event
if (createNewEventBtn && newEventSelector && newEventParentContainer) {
  appendNewElementFunc(
    createNewEventBtn,
    newEventSelector,
    newEventParentContainer,
    ".start-date",
    "flex-col",
    "gap-5"
  );
}

// add new venue
if (createNewVenueBtn && newVenueSelector && newVenueParentContainer) {
  appendNewElementFunc(
    createNewVenueBtn,
    newVenueSelector,
    newVenueParentContainer,
    ".start-date",
    "flex-col",
    "gap-5"
  );
}

// add new recurring event

//=== append new element related func ====//

// change bottomAddBtn color
const bottomAddBtns = document.querySelectorAll(".bottom-add-btn");

if (bottomAddBtns) {
  bottomAddBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      bottomAddBtns.forEach((item) => {
        item.classList.remove("bottom-active-button");
        item.children[1].children[0].style.stroke = "black";
        item.children[1].children[1].style.stroke = "black";
      });
      btn.classList.add("bottom-active-button");
      btn.children[1].children[0].style.stroke = "white";
      btn.children[1].children[1].style.stroke = "white";
    });
  });
}

// recurring event
const recurringNewEventElements = document.getElementById(
  "recurring-event-wrapper"
);
const recurringEventCheckbox = document.getElementById(
  "recurring-event-checkbox"
);
const recurringParentDiv = document.getElementById("recurring-parent-div");
const addRecurringBtn = document.getElementById("add-recurring-event-btn");
const recurringEventNewElem = document.getElementsByClassName(
  "recurring-event-wrapper"
);

function checkboxAddElemFunc(targetElem, parentDiv, addBtn) {
  targetElem.addEventListener("change", (event) => {
    event.stopPropagation();
    if (targetElem.checked) {
      parentDiv.style.height = "100%";
      parentDiv.style.opacity = "100%";
      addBtn.style.opacity = "100%";
      setTimeout((addBtn.style.display = "flex"), 300);
    } else {
      parentDiv.style.height = "0rem";
      parentDiv.style.opacity = "0%";
      addBtn.style.opacity = "0%";
      setTimeout((addBtn.style.display = ""), 300);
    }
  });
}

if (addRecurringBtn && recurringParentDiv && recurringEventCheckbox) {
  checkboxAddElemFunc(
    recurringEventCheckbox,
    recurringParentDiv,
    addRecurringBtn
  );
}

if (addRecurringBtn && recurringEventNewElem && recurringParentDiv) {
  appendNewElementFunc(
    addRecurringBtn,
    recurringEventNewElem,
    recurringParentDiv,
    ".start-date",
    `flex-col`
  );
}

// add exception
const addExceptionCheckbox = document.getElementById("add-exception-checkbox");
const addExceptionParentDiv = document.getElementById(
  "add-exception-parent-div"
);
const addExceptionBtn = document.getElementById("add-acception-btn");
const addExceptionNewElement = document.getElementsByClassName(
  "add-acception-new-element"
);

if (addExceptionBtn && addExceptionCheckbox && addExceptionParentDiv) {
  checkboxAddElemFunc(
    addExceptionCheckbox,
    addExceptionParentDiv,
    addExceptionBtn
  );
}

if (addExceptionBtn && addExceptionNewElement && addExceptionParentDiv) {
  appendNewElementFunc(
    addExceptionBtn,
    addExceptionNewElement,
    addExceptionParentDiv,
    ".start-date",
    "row"
  );
}

// ticket setting banner wrapper
const settingBackgroundInput = document.getElementById(
  "ticket-setting-background-image-input"
);
const settingImageContainerLabel = document.getElementById(
  "ticket-setting-image-preview-label"
);
const settingImageNameContainer = document.getElementById(
  "ticket-setting-image-name-wrapper"
);
const settingBannerMainWraper = document.getElementById(
  "ticket-setting-banner-main-wrapper"
);

if (
  settingBackgroundInput &&
  settingImageContainerLabel &&
  settingImageNameContainer
) {
  imageUploadAndPreview(
    settingBackgroundInput,
    settingImageContainerLabel,
    settingImageNameContainer
  );
}

if (settingImageNameContainer && settingBannerMainWraper) {
  settingImageNameContainer.addEventListener("click", () => {
    console.log("image-namne");
    settingBannerMainWraper.children[1].children[1].style.display = "none";
    settingBannerMainWraper.children[1].children[0].children[1].innerHTML = `<h4 class="text-sm text-gray-400 pb-1">
                  Choose a JPG, PNG, or GIF, file under 32 MB in size
                </h4>
                <h3 class="text-white">CHOOSE A IMAGE</h3>`;
  });
}

// change tab
const addNewWrappers = document.querySelectorAll(".sm-add-new-wrapper");

bottomAddBtns.forEach((item, indexBtn) => {
  item.addEventListener("click", () => {
    addNewWrappers.forEach((item, indexWrapper) => {
      if (indexBtn === indexWrapper) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

const timezones = [
  { value: "UTC-12:00", label: "UTC-12:00" },
  { value: "UTC-11:00", label: "UTC-11:00" },
  { value: "UTC-10:00", label: "UTC-10:00" },
  { value: "UTC-09:00", label: "UTC-09:00" },
  { value: "UTC-08:00", label: "UTC-08:00" },
  { value: "UTC-07:00", label: "UTC-07:00" },
  { value: "UTC-06:00", label: "UTC-06:00" },
  { value: "UTC-05:00", label: "UTC-05:00" },
  { value: "UTC-04:00", label: "UTC-04:00" },
  { value: "UTC-03:00", label: "UTC-03:00" },
  { value: "UTC-02:00", label: "UTC-02:00" },
  { value: "UTC-01:00", label: "UTC-01:00" },
  { value: "UTC+00:00", label: "UTC+00:00" },
  { value: "UTC+01:00", label: "UTC+01:00" },
  { value: "UTC+02:00", label: "UTC+02:00" },
  { value: "UTC+03:00", label: "UTC+03:00" },
  { value: "UTC+04:00", label: "UTC+04:00" },
  { value: "UTC+05:00", label: "UTC+05:00" },
  { value: "UTC+06:00", label: "UTC+06:00" },
  { value: "UTC+07:00", label: "UTC+07:00" },
  { value: "UTC+08:00", label: "UTC+08:00" },
  { value: "UTC+09:00", label: "UTC+09:00" },
  { value: "UTC+10:00", label: "UTC+10:00" },
  { value: "UTC+11:00", label: "UTC+11:00" },
  { value: "UTC+12:00", label: "UTC+12:00" },
  { value: "UTC+13:00", label: "UTC+13:00" },
  { value: "UTC+14:00", label: "UTC+14:00" },
];

const timezoneSelect = document.getElementById("timezone");

timezones.forEach((timezone) => {
  const option = document.createElement("option");
  option.value = timezone.value;
  option.textContent = timezone.label;
  timezoneSelect?.appendChild(option);
});

// ===sidebar::start
const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const sidebarMenu = document.getElementById("menu-sidebar");

openMenu?.addEventListener("click", () => {
  if (sidebarMenu) {
    sidebarMenu.classList.remove("translate-x-full");
    sidebarMenu.classList.add("translate-x-0");
  }
});
closeMenu?.addEventListener("click", () => {
  if (openMenu) {
    sidebarMenu.classList.add("translate-x-full");
    sidebarMenu.classList.remove("translate-x-0");
  }
});

document.addEventListener("click", (e) => {
  if (!sidebarMenu.contains(e.target) && !openMenu.contains(e.target)) {
    sidebarMenu.classList.add("translate-x-full");
    sidebarMenu.classList.remove("translate-x-0");
  }
});
// ===sidebar::end

// video permission:start
document.addEventListener("DOMContentLoaded", function () {
  const cameraButton = document.getElementById("cameraButton");
  const videoContainer = document.getElementById("videoContainer");
  const videoElement = document.getElementById("video");
  const videoBtnContainer = document.getElementById(
    "requestPermissionContainer"
  );

  cameraButton.addEventListener("click", async () => {
    try {
      // Request access to the user's camera
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoElement.srcObject = stream;

      // Show the video container and hide the button
      videoBtnContainer.classList.add("hidden");
      videoContainer.classList.remove("hidden");
      cameraButton.classList.add("hidden");
    } catch (error) {
      alert("Camera access denied or unavailable.");
      console.error("Error accessing camera:", error);
    }
  });
});

// video permission:end
