// グローバル変数の初期化
let jobCheckboxes = Array.from(
  document.querySelectorAll('.work input[type="checkbox"]')
);
let chosenJobIndices = [];
let originalLabels = [];
let originalValues = [];

// 関数定義
function resetChosenJobs() {
  chosenJobIndices = [];
}

function enableAllJobs() {
  jobCheckboxes.forEach((job) => {
    job.disabled = false;
  });
}

function disableNoInterestCheckbox() {
  const noInterestCheckbox = jobCheckboxes.find(
    (job) => job.value === "この求人には興味なし"
  );
  noInterestCheckbox.checked = false;
  noInterestCheckbox.disabled = true;
}

function addJobToChosen(index) {
  chosenJobIndices.push(index);
}

function removeJobFromChosen(index) {
  const chosenIndex = chosenJobIndices.indexOf(index);
  if (chosenIndex > -1) {
    chosenJobIndices.splice(chosenIndex, 1);
  }
}

function enableNoInterestIfNoJobsChosen() {
  if (chosenJobIndices.length === 0) {
    const noInterestCheckbox = jobCheckboxes.find(
      (job) => job.value === "この求人には興味なし"
    );
    noInterestCheckbox.disabled = false;
  }
}

function updateJobLabelsAndValues() {
  jobCheckboxes.forEach((jobCheckbox, i) => {
    const label = jobCheckbox.parentNode.querySelector(
      ".wpcf7-list-item-label"
    );
    const chosenIndex = chosenJobIndices.indexOf(i);
    const labelWrapper = document.createElement("span");
    labelWrapper.textContent = originalLabels[i];

    if (chosenIndex > -1) {
      const rankSpan = document.createElement("span");
      rankSpan.textContent = chosenIndex + 1;
      rankSpan.style.color = "#5999E8";
      labelWrapper.prepend(rankSpan);
      jobCheckbox.value = originalValues[i] + ` 第${chosenIndex + 1}希望`;
    } else {
      jobCheckbox.value = originalValues[i];
    }

    label.textContent = "";
    label.prepend(labelWrapper);
  });
}

// メインのコード
jobCheckboxes.forEach((jobCheckbox, i) => {
  const label = jobCheckbox.parentNode.querySelector(".wpcf7-list-item-label");
  originalLabels[i] = label.textContent;
  originalValues[i] = jobCheckbox.value;

  jobCheckbox.addEventListener("change", function () {
    if (this.value === "この求人には興味なし" && this.checked) {
      resetChosenJobs();
      enableAllJobs();
    } else if (this.checked) {
      disableNoInterestCheckbox();
      addJobToChosen(i);
    } else {
      removeJobFromChosen(i);
      enableNoInterestIfNoJobsChosen();
    }
    updateJobLabelsAndValues();
  });
});
