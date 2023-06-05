// kanda
const works = document.getElementsByClassName("work");
let rank = [];

// 全てのcheckboxに対して希望順位を変更する度に発火するようにする
for (let i = 0; i < works.length; i++) {
  const checkbox = works[i].querySelector('input[type="checkbox"]');
  checkbox.nextElementSibling.remove();
  works[i].firstElementChild.firstElementChild.nextElementSibling.remove();
  checkbox.addEventListener("change", (e) => {
    resetRank();

    const rankInfo = {
      index: i,
      rank: rank.length + 1,
    };

    if (e.target.checked) {
      addRank(rankInfo);
    } else {
      removeRank(rankInfo);
    }

    reflectRank();
  });
}

// 新たにcheckした際に発火 Comp
function addRank(rankInfo) {
  rank.push(rankInfo);
}

// checkを取り消した際に発火
function removeRank(rankInfo) {
  rank = rank.filter((rankItem) => rankItem.index !== rankInfo.index);
  sortRank();
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
    works[i].lastElementChild.lastElementChild.textContent = "";
  }
}

// rankに応じた文字列をDOMに反映する
function reflectRank() {
  rank.forEach((rankItem) => {
    works[rankItem.index].firstElementChild.lastElementChild.textContent =
      "第" + rankItem.rank + "志望";
  });
}
