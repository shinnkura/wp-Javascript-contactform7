//htmlからすべてのチェックボックスを取得
//チェックボックスの親要素のspan要素のテキストを取得
//そのチェックボックスの一つ一つを見ていくためのリストを作成
let works = Array.from(
  document.querySelectorAll('.work input[type="checkbox"]')
);

//選択した項目の順位を格納する配列
let rank = [];

//チェックボックスの元々のテキストを格納する配列
let originalText = [];

works.forEach((checkbox, i) => {
  const span = checkbox.parentNode.querySelector(".wpcf7-list-item-label");
  originalText[i] = span.textContent;

  checkbox.addEventListener("change", function () {
    // If the checkbox with "この求人には興味なし" is checked, uncheck and disable all others
    if (this.value === "この求人には興味なし" && this.checked) {
      works.forEach((otherCheckbox, j) => {
        if (i !== j) {
          otherCheckbox.checked = false;
          otherCheckbox.disabled = true;
        }
      });
      rank = [];
    }
    // If any other checkbox is checked, uncheck and disable the "この求人には興味なし" checkbox
    else if (this.checked) {
      works.forEach((otherCheckbox, j) => {
        if (otherCheckbox.value === "この求人には興味なし") {
          otherCheckbox.checked = false;
          otherCheckbox.disabled = true;
        }
      });
      rank.push(i);
    }
    // If a checkbox is unchecked, enable all checkboxes
    else {
      works.forEach((otherCheckbox) => {
        otherCheckbox.disabled = false;
      });
      const index = rank.indexOf(i);
      if (index > -1) {
        rank.splice(index, 1);
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

//「志望の保育園はどこですか？」
let works = Array.from(
  document.querySelectorAll('.work input[type="checkbox"]')
);
let rank = [];
let originalText = [];

works.forEach((checkbox, i) => {
  const span = checkbox.parentNode.querySelector(".wpcf7-list-item-label");
  originalText[i] = span.textContent;

  checkbox.addEventListener("change", function () {
    // 「この求人には興味なし」を選択した時、他の選択肢を選択できない
    if (this.value === "この求人には興味なし" && this.checked) {
      works.forEach((otherCheckbox, j) => {
        if (i !== j) {
          otherCheckbox.checked = false;
          otherCheckbox.disabled = true;
        }
      });
      rank = [];
    } // 「この求人には興味なし」以外の選択肢を選択したら、「この求人には興味なし」を選択できない
    else if (this.checked) {
      works.forEach((otherCheckbox, j) => {
        if (otherCheckbox.value === "この求人には興味なし") {
          otherCheckbox.checked = false;
          otherCheckbox.disabled = true;
        }
      });
      rank.push(i);
    } // もし選択肢のチェックを外したら、すべての選択肢を選択できるようにする
    else {
      works.forEach((otherCheckbox) => {
        otherCheckbox.disabled = false;
      });
      const index = rank.indexOf(i);
      if (index > -1) {
        rank.splice(index, 1);
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
