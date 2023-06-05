// 各ラジオボタンの選択肢が変更されたときに実行される関数
function validateChoices() {
  const radio1 = document.querySelector('input[name="radio-1"]:checked').value;
  const radio2 = document.querySelector('input[name="radio-2"]:checked')?.value;
  let question2 = document.getElementById("question2");
  let radios2 = document.querySelectorAll('input[name="radio-2"]');

  // 「特になし」を選択した場合、「２位はどこですか？」という質問を灰色にし、選択できないようにする
  if (radio1 == "特になし") {
    question2.style.color = "grey";
    for (let i = 0; i < radios2.length; i++) {
      radios2[i].disabled = true;
    }
  } else {
    question2.style.color = "black";
    for (let i = 0; i < radios2.length; i++) {
      radios2[i].disabled = false;
    }
  }

  // 同じ選択肢は選択できないようにする
  // ただし、「特になし」が選択され、第二の選択肢が無効化されている場合はこのチェックをスキップする
  if (radio2 !== undefined && radio1 == radio2) {
    alert("同じ選択肢を選択することはできません。");
    return false;
  }
  return true;
}

// 各ラジオボタンの選択肢に上記の関数を適用
let radios = document.querySelectorAll('input[type="radio"]');
for (let i = 0; i < radios.length; i++) {
  radios[i].addEventListener("change", function (e) {
    let flag = validateChoices();
    if (!flag) {
      e.target.checked = false;
    }
  });
}
