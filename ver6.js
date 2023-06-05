let jobs = Array.from(
  document.querySelectorAll('.work input[type="checkbox"]')
);
let chosen = [];
let originalLabel = [];

const resetChosen = () => {
  chosen = [];
};

const enableAll = () => {
  jobs.forEach((job) => {
    job.disabled = false;
  });
};

const disableNoInterest = () => {
  const noInterest = jobs.find((job) => job.value === "この求人には興味なし");
  noInterest.checked = false;
  noInterest.disabled = true;
};

const addToChosen = (i) => {
  chosen.push(i);
};

const removeFromChosen = (i) => {
  const index = chosen.indexOf(i);
  if (index > -1) {
    chosen.splice(index, 1);
  }
};

const enableNoInterestIfNoneChosen = () => {
  if (chosen.length === 0) {
    const noInterest = jobs.find((job) => job.value === "この求人には興味なし");
    noInterest.disabled = false;
  }
};

const updateLabels = () => {
  jobs.forEach((job, i) => {
    const label = job.parentNode.querySelector(".wpcf7-list-item-label");
    const chosenIndex = chosen.indexOf(i);
    if (chosenIndex > -1) {
      label.textContent = originalLabel[i] + ` 第${chosenIndex + 1}志望`;
    } else {
      label.textContent = originalLabel[i];
    }
  });
};

jobs.forEach((job, i) => {
  const label = job.parentNode.querySelector(".wpcf7-list-item-label");
  originalLabel[i] = label.textContent;

  job.addEventListener("change", function () {
    if (this.value === "この求人には興味なし" && this.checked) {
      resetChosen();
      enableAll();
    } else if (this.checked) {
      disableNoInterest();
      addToChosen(i);
    } else {
      removeFromChosen(i);
      enableNoInterestIfNoneChosen();
    }
    updateLabels();
  });
});
