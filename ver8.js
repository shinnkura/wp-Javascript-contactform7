let jobs = Array.from(
  document.querySelectorAll('.work input[type="checkbox"]')
);
let chosen = [];
let originalLabel = [];
let originalValue = [];

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

const updateLabelsAndValues = () => {
  jobs.forEach((job, i) => {
    const label = job.parentNode.querySelector(".wpcf7-list-item-label");
    const chosenIndex = chosen.indexOf(i);
    if (chosenIndex > -1) {
      const rankSpan = document.createElement("span");
      const rank = ` 第${chosenIndex + 1}希望`;
      rankSpan.textContent = rank;
      rankSpan.style.color = "#f4c121";
      label.textContent = originalLabel[i];
      label.appendChild(rankSpan);
      job.value = originalValue[i] + rank;
    } else {
      label.textContent = originalLabel[i];
      job.value = originalValue[i];
    }
  });
};

jobs.forEach((job, i) => {
  const label = job.parentNode.querySelector(".wpcf7-list-item-label");
  originalLabel[i] = label.textContent;
  originalValue[i] = job.value;

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
    updateLabelsAndValues();
  });
});
