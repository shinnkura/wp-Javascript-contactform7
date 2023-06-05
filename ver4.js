let works = Array.from(
  document.querySelectorAll('.work input[type="checkbox"]')
);
let rank = [];
let originalText = [];

works.forEach((checkbox, i) => {
  const span = checkbox.parentNode.querySelector(".wpcf7-list-item-label");
  originalText[i] = span.textContent;

  checkbox.addEventListener("change", function () {
    // 「この求人には興味なし」を選択した時、他の選択肢も選択できる
    if (this.value === "この求人には興味なし" && this.checked) {
      works.forEach((otherCheckbox, j) => {
        if (i !== j) {
          otherCheckbox.disabled = false;
        }
      });
      rank = [];
    } // 「この求人には興味なし」以外の選択肢を選択したら、「この求人には興味なし」を非表示、そして「この求人には興味なし」のチェックを外す
    else if (this.checked) {
      works.forEach((otherCheckbox, j) => {
        if (otherCheckbox.value === "この求人には興味なし") {
          otherCheckbox.checked = false;
          otherCheckbox.parentNode.style.display = "none";
        }
      });
      rank.push(i);
    } // もし選択肢のチェックを外したら、すべての選択肢のチェックが外れるまで、「この求人には興味なし」を表示させない
    else {
      const index = rank.indexOf(i);
      if (index > -1) {
        rank.splice(index, 1);
      }
      if (rank.length === 0) {
        works.forEach((otherCheckbox) => {
          otherCheckbox.disabled = false;
          if (otherCheckbox.value === "この求人には興味なし") {
            otherCheckbox.parentNode.style.display = "block";
          }
        });
      }
    }

    works.forEach((checkbox, i) => {
      const span = checkbox.parentNode.querySelector(".wpcf7-list-item-label");
      const rankIndex = rank.indexOf(i);

      if (rankIndex > -1) {
        span.textContent = originalText[i] + ` 第${rankIndex + 1}志望`;
      } else {
        span.textContent = originalText[i];
      }
    });
  });
});
