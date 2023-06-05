// kanda
const works = document.getElementsByClassName("content-block");
let rank = [];
let selectionOrder = 0;

// 全てのcheckboxに対して希望順位を変更する度に発火するようにする
for (let i = 0; i < works.length; i++) {
  const checkbox = works[i].querySelector('input[type="checkbox"]');
  checkbox.addEventListener("change", (e) => {
    resetRank();

    const rankInfo = {
      index: i,
      order: selectionOrder,
      rank: rank.length + 1,
    };

    if (e.target.checked) {
      addRank(rankInfo);
      selectionOrder++;
    } else {
      removeRank(rankInfo);
    }

    reflectRank();
  });
}

// 新たにcheckした際に発火 Comp
function addRank(rankInfo) {
  rank.push(rankInfo);
  rank.sort((a, b) => a.order - b.order);
  updateRank();
}

// checkを取り消した際に発火
function removeRank(rankInfo) {
  rank = rank.filter((rankItem) => rankItem.index !== rankInfo.index);
  rank.sort((a, b) => a.order - b.order);
  updateRank();
}

// rankが高い順にrank配列の要素を昇順にする
function sortRank() {
  rank.sort((a, b) => a.rank - b.rank);
}

// 配列の順序に沿ってrankを修正する
function updateRank() {
  for (let i = 0; i < rank.length; i++) {
    rank[i].rank = i + 1;
  }
}

// 前回のreflectRankの結果を初期化
function resetRank() {
  for (let i = 0; i < works.length; i++) {
    const label = works[i].querySelector('label');
    if (label.textContent.includes("第")) {
      label.textContent = label.textContent.split("第")[0];
    }
  }
}

// rankに応じた文字列をDOMに反映する
function reflectRank() {
  rank.forEach((rankItem) => {
    const label = works[rankItem.index].querySelector('label');
    label.textContent += " 第" + rankItem.rank + "志望";
  });
}
