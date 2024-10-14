// Fungsi untuk mengecek apakah semua tombol dalam allButtons disetel ke display: none
let value = 5000;
let taruhan = 0;

const bank = document.getElementById("money");
const blackChip = document.getElementById("100");
const purpleChip = document.getElementById("500");
const goldChip = document.getElementById("1000");
const allIn = document.getElementById("all");
const centerDiv = document.getElementById("chipStackCenter");
const allButtons = document.querySelectorAll(".chip-button");
const containerDeal = document.getElementById("container-deal");
const mainLagiButton = document.getElementById("main-lagi-button");
const allInBtn = document.createElement("button");
const clearBet = document.createElement("button");

function openModal() {
  document.getElementById("gameOverModal").classList.remove("hidden");
  mainLagiButton.addEventListener("click", () => {
    mainLagi();
  });
}

function mainLagi() {
  value = 5000; // Reset uang
  taruhan = 0;
  bank.innerHTML = value;
  document.getElementById("gameOverModal").classList.add("hidden"); // Tutup modal
  allButtons.forEach((button) => {
    button.style.visibility = "visible"; // Mengembalikan semua tombol menjadi terlihat
  });
}

function replaceButton() {
  const parent = allIn.parentNode;
  if (parent) {
    parent.replaceChild(clearBet, allIn);
  }
}

function restoreButton() {
  const parent = clearBet.parentNode;
  if (parent) {
    parent.replaceChild(allIn, clearBet);
  }
}

function initializeBettingSystem() {
  const dealButton = document.createElement("button");
  dealButton.id = "dealButton";
  dealButton.className =
    "bg-red-950 text-white px-6 py-2 rounded-lg shadow-2xl transform active:translate-y-1 active:shadow-sm focus:outline-none transition duration-200 hover:scale-110";
  dealButton.innerText = "DEAL";

  function createChipClone(chip, amount) {
    const clone = chip.cloneNode(true);
    clone.classList.add(amount.toString());
    clone.style.position = "absolute";
    clone.style.transition = "all 0.5s ease-out";
    clone.style.pointerEvents = "none";

    const rect = chip.getBoundingClientRect();
    clone.style.left = `${rect.left}px`;
    clone.style.top = `${rect.top}px`;

    document.body.appendChild(clone);

    requestAnimationFrame(() => {
      clone.style.left = `${
        centerDiv.offsetLeft + centerDiv.offsetWidth / 2 - clone.offsetWidth / 2
      }px`;
      clone.style.top = `${
        centerDiv.offsetTop +
        centerDiv.offsetHeight / 2 -
        clone.offsetHeight / 2
      }px`;
    });

    clone.addEventListener("transitionend", () => {
      clone.style.pointerEvents = "auto";
    });

    return { clone, rect };
  }

  function updateChipVisibility() {
    if (value < 1000) {
      goldChip.style.visibility = "hidden";
      if (value < 500) {
        purpleChip.style.visibility = "hidden";
        if (value <= 0) {
          allButtons.forEach((button) => {
            button.style.visibility = "hidden";
          });
        }
      }
    }
  }

  function handleChipClick(chip, amount) {
    return () => {
      taruhan += amount;
      value_now = value;
      value -= amount;
      bank.innerHTML = value;
      console.log(value);

      if (value !== value_now && !document.getElementById("dealButton")) {
        containerDeal.appendChild(dealButton);
      }

      const { clone, rect } = createChipClone(chip, amount);

      updateChipVisibility();

      clone.addEventListener("click", () => {
        value += amount;
        taruhan -= amount;
        bank.innerHTML = value;
        clone.style.pointerEvents = "none";

        if (value === 5000) {
          dealButton.remove();
        }

        requestAnimationFrame(() => {
          clone.style.left = `${rect.left}px`;
          clone.style.top = `${rect.top}px`;
        });

        clone.addEventListener("transitionend", () => {
          clone.remove();
          if (value > 0) {
            blackChip.style.visibility = "visible";
            allIn.style.visibility = "visible";
            if (value >= 500) {
              purpleChip.style.visibility = "visible";
              if (value >= 1000) {
                goldChip.style.visibility = "visible";
              }
            }
          }
        });
      });
    };
  }

  blackChip.addEventListener("click", handleChipClick(blackChip, 100));
  purpleChip.addEventListener("click", handleChipClick(purpleChip, 500));
  goldChip.addEventListener("click", handleChipClick(goldChip, 1000));

  allInBtn.className =
    "chip-button bg-[url('all-in-btn.png')] bg-cover bg-center h-32 w-32 p-0 m-0 rounded-full transform transition duration-200 hover:scale-110";
  allInBtn.style.position = "absolute";
  allInBtn.style.top = "50%";
  allInBtn.style.left = "50%";
  allInBtn.style.transform = "translate(-50%, -50%)";

  centerDiv.style.position = "relative";

  clearBet.className =
    "chip-button bg-[url('clear-bet-btn.png')] bg-cover bg-center h-32 w-32 p-0 m-0 rounded-full transform transition duration-200 hover:scale-110";

  function replaceButton() {
    const parent = allIn.parentNode;
    if (parent) {
      parent.replaceChild(clearBet, allIn);
    }
  }

  function restoreButton() {
    const parent = clearBet.parentNode;
    if (parent) {
      parent.replaceChild(allIn, clearBet);
    }
  }

  clearBet.addEventListener("click", () => {
    value += 5000;
    bank.innerHTML = value;

    if (value === 5000) {
      dealButton.remove();
    }

    restoreButton();
    goldChip.style.visibility = "visible";
    purpleChip.style.visibility = "visible";
    blackChip.style.visibility = "visible";
    allInBtn.remove();
  });

  allIn.addEventListener("click", () => {
    taruhan += value;
    value -= value;
    bank.innerHTML = value;

    if (value !== 5000 && !document.getElementById("dealButton")) {
      containerDeal.appendChild(dealButton);
    }

    if (value <= 0) {
      goldChip.style.visibility = "hidden";
      purpleChip.style.visibility = "hidden";
      blackChip.style.visibility = "hidden";
      const allCloneButtons = document.querySelectorAll(
        ".\\31 00, .\\35 00, .\\31 000"
      );
      allCloneButtons.forEach((button) => {
        button.remove();
      });

      allInBtn.style.display = "inline-block";
      centerDiv.appendChild(allInBtn);
      replaceButton();
    } else {
      restoreButton();
    }
  });

  dealButton.addEventListener("click", () => {
    allButtons.forEach((button) => {
      button.style.display = "none";
    });

    allInBtn.style.display = "none";
    clearBet.style.display = "none";

    const allCloneButtons = document.querySelectorAll(
      ".\\31 00, .\\35 00, .\\31 000"
    );

    allCloneButtons.forEach((button) => {
      button.style.display = "none";
    });

    dealButton.remove();

    startGame();
  });
}

// Call the function to initialize the betting system once DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializeBettingSystem);

function startGame() {
  const body = document.querySelector("body");
  body.className = "play-body h-screen overflow-hidden flex flex-col";
  //   c = cube
  //   s = spade
  //   h = heart
  //   d = diamond

  let dek = [];
  const jenis = ["C", "D", "H", "S"];
  const wajah = ["A", "J", "Q", "K"];

  let poinPlayer = 0;
  let poinDealer = 0;

  const dealerPoinDiv = document.getElementById("dealer-poin-div");
  // Buat elemen h1
  const h1 = document.createElement("h1");
  // Buat teks "DEALER : "
  const dealerText = document.createTextNode("DEALER : ");
  dealerText.className = "text-white";
  // Buat elemen span dengan id "dealer-poin"
  const span = document.createElement("span");
  span.id = "dealer-poin";
  span.innerText = "0";
  // Gabungkan teks dan span ke dalam h1
  h1.appendChild(dealerText);
  h1.appendChild(span);
  // Tambahkan elemen h1 ke dalam dealerPoinDiv
  dealerPoinDiv.appendChild(h1);

  const playerPoinDiv = document.getElementById("player-poin-div");
  // Buat elemen h1
  const h1Player = document.createElement("h1");
  // Buat teks "PLAYER : "
  const playerText = document.createTextNode("PLAYER : ");
  // Buat elemen span dengan id "player-poin"
  const spanTextPlayer = document.createElement("span");
  spanTextPlayer.id = "player-poin";
  spanTextPlayer.innerText = "0"; // Inisialisasi nilai poin pemain
  // Gabungkan teks dan span ke dalam h1
  h1Player.appendChild(playerText);
  h1Player.appendChild(spanTextPlayer); // Ubah dari span ke spanTextPlayer
  // Tambahkan elemen h1 ke dalam playerPoinDiv
  playerPoinDiv.appendChild(h1Player);

  const buttonDiv = document.getElementById("button-div");
  const hitButton = document.createElement("button");
  hitButton.id = "button-hit"; // Menambahkan ID untuk identifikasi
  hitButton.className =
    "bg-red-950 text-white px-6 py-2 rounded-lg shadow-2xl transform active:translate-y-1 active:shadow-sm focus:outline-none transition duration-200 hover:scale-110";
  hitButton.innerText = "HIT";
  buttonDiv.appendChild(hitButton);

  const standButton = document.createElement("button");
  standButton.id = "button-stand"; // Menambahkan ID untuk identifikasi
  standButton.className =
    "bg-red-950 text-white px-6 py-2 rounded-lg shadow-2xl transform active:translate-y-1 active:shadow-sm focus:outline-none transition duration-200 hover:scale-110";
  standButton.innerText = "STAND";
  buttonDiv.appendChild(standButton);

  const cardDealer = document.getElementById("card-dealer");
  const cardPlayer = document.getElementById("card-player");
  let dealerPoin = document.getElementById("dealer-poin");
  let playerPoin = document.getElementById("player-poin");

  const acakDek = (dek) => {
    for (let i = dek.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // Pilih indeks acak
      [dek[i], dek[j]] = [dek[j], dek[i]]; // Tukar elemen dek[i] dengan dek[j]
    }
    return dek;
  };

  // Fungsi membuat dek baru
  const buatDek = () => {
    for (let i = 2; i <= 10; i++) {
      for (let jenisKartu of jenis) {
        dek.push(i + jenisKartu);
      }
    }

    for (let jenisKartu of jenis) {
      for (let esp of wajah) {
        dek.push(esp + jenisKartu);
      }
    }
    acakDek(dek);
    return dek;
  };

  //   mengambil kartu
  const ambilKartu = () => {
    if (dek.length === 0) {
      throw "Tidak ada kartu di dek";
    }
    const kartu = dek.pop();
    return kartu;
  };

  let nilaiKartu = (kartu, totalPoinSaatIni) => {
    let nilai = kartu.substring(0, kartu.length - 1);

    if (isNaN(nilai)) {
      // Jika kartu adalah "A", tentukan apakah 11 atau 1 lebih menguntungkan
      if (nilai === "A") {
        // Jika menambahkan 11 tidak melebihi 21, maka As bernilai 11, jika tidak, bernilai 1
        return totalPoinSaatIni + 11 <= 21 ? 11 : 1;
      } else {
        // J, Q, K bernilai 10
        return 10;
      }
    }

    // Jika kartu adalah angka, langsung kembalikan nilai angka tersebut
    return nilai * 1;
  };

  const giliranBandar = (poinMinimal) => {
    poinDealer += nilaiKartu(kartuDealer1, poinDealer);
    span.innerText = poinDealer;
    kartuDealer1Img.src = `cartas/${kartuDealer1}.png`;

    do {
      if (poinDealer >= 17) {
        break;
      }
      const kartu = ambilKartu();
      poinDealer += nilaiKartu(kartu, poinDealer);
      dealerPoin.innerText = poinDealer;

      const imgKartu = document.createElement("img");
      imgKartu.src = `cartas/${kartu}.png`;
      imgKartu.className = "w-28 h-52";

      cardDealer.appendChild(imgKartu);

      // Jika poin pemain sudah lebih dari 21, berhenti
      if (poinMinimal > 21) {
        break;
      }
    } while (poinDealer < 17); // Bandar terus mengambil kartu sampai mencapai 17 atau lebih
    console.log("poin dealer sekarang: " + poinDealer);

    setTimeout(() => {
      if (poinDealer === poinMinimal) {
        alert("Seri");
        taruhan = 0;
        cleanupBlackjackGame();
        if (value <= 0) {
          openModal();
        }
      } else if (poinMinimal > 21) {
        alert("Dealer menang");
        taruhan = 0;
        cleanupBlackjackGame();
        if (value <= 0) {
          openModal();
        }
      } else if (poinDealer > 21) {
        alert("Player menang");
        cleanupBlackjackGame();
        value += taruhan * 2;
        taruhan = 0;
        bank.innerHTML = value;
      } else if (poinDealer > poinMinimal) {
        alert("Dealer menang");
        taruhan = 0;
        cleanupBlackjackGame();
        if (value <= 0) {
          openModal();
        }
      } else if (poinMinimal > poinDealer) {
        alert("Player menang");
        cleanupBlackjackGame();
        value += taruhan * 2;
        taruhan = 0;
        bank.innerHTML = value;
      }
    }, 100);
  };

  // Event untuk tombol Ambil Kartu
  hitButton.addEventListener("click", () => {
    let kartu = ambilKartu(); // Mengambil kartu acak

    poinPlayer += nilaiKartu(kartu, poinPlayer); // Hitung nilai kartu dengan memperhitungkan As
    console.log(poinPlayer);

    spanTextPlayer.innerText = `${poinPlayer}`;

    let imgKartu = document.createElement("img");
    imgKartu.src = `cartas/${kartu}.png`;
    imgKartu.className = "w-28 h-52";
    cardPlayer.appendChild(imgKartu);

    if (poinPlayer > 21) {
      alert("Anda kalah");
      hitButton.disabled = true;
      standButton.disabled = true;
      taruhan = 0;
      cleanupBlackjackGame();
      if (value <= 0) {
        openModal();
      }
    } else if (poinPlayer === 21) {
      alert("21? Hebat");
      hitButton.disabled = true;
      standButton.disabled = true;
      cleanupBlackjackGame();
      value += taruhan * 2;
      taruhan = 0;
      bank.innerHTML = value;
    }
  });

  standButton.addEventListener("click", () => {
    giliranBandar(poinPlayer);
  });

  buatDek(dek);

  acakDek(dek);

  let kartuPemain1 = ambilKartu();

  let kartuPemain2 = ambilKartu();

  const kartuPemain1Img = document.createElement("img");
  kartuPemain1Img.src = `cartas/${kartuPemain1}.png`;
  kartuPemain1Img.className = "w-28 h-52";
  const kartuPemain2Img = document.createElement("img");
  kartuPemain2Img.src = `cartas/${kartuPemain2}.png`;
  kartuPemain2Img.className = "w-28 h-52";

  cardPlayer.appendChild(kartuPemain1Img);
  cardPlayer.appendChild(kartuPemain2Img);

  let kartuDealer1 = ambilKartu();

  let kartuDealer2 = ambilKartu();

  const kartuDealer1Img = document.createElement("img");
  kartuDealer1Img.src = `cartas/red_back.png`;
  kartuDealer1Img.className = "w-28 h-52";
  const kartuDealer2Img = document.createElement("img");
  kartuDealer2Img.src = `cartas/${kartuDealer2}.png`;
  kartuDealer2Img.className = "w-28 h-52";

  cardDealer.appendChild(kartuDealer1Img);
  cardDealer.appendChild(kartuDealer2Img);

  poinDealer += nilaiKartu(kartuDealer2, 0);
  // poinDealer += nilaiKartu(kartuDealer2, poinDealer);

  poinPlayer += nilaiKartu(kartuPemain1, 0);
  poinPlayer += nilaiKartu(kartuPemain2, poinPlayer);

  spanTextPlayer.innerText = poinPlayer;
  span.innerText = poinDealer;
}

function cleanupBlackjackGame() {
  // Reset global variables
  dek = [];
  poinPlayer = 0;
  poinDealer = 0;

  // Remove dealer poin div contents
  const dealerPoinDiv = document.getElementById("dealer-poin-div");
  dealerPoinDiv.innerHTML = "";

  // Remove player poin div contents
  const playerPoinDiv = document.getElementById("player-poin-div");
  playerPoinDiv.innerHTML = "";

  // Remove buttons
  const buttonDiv = document.getElementById("button-div");
  buttonDiv.innerHTML = "";

  // Clear dealer and player cards
  const cardDealer = document.getElementById("card-dealer");
  const cardPlayer = document.getElementById("card-player");
  cardDealer.innerHTML = "";
  cardPlayer.innerHTML = "";

  // Remove event listeners from hit and stand buttons
  const hitButton = document.getElementById("button-hit");
  const standButton = document.getElementById("button-stand");
  if (hitButton) {
    hitButton.removeEventListener("click", hitButtonHandler);
  }
  if (standButton) {
    standButton.removeEventListener("click", standButtonHandler);
  }

  // Reset poin displays
  const dealerPoin = document.getElementById("dealer-poin");
  const playerPoin = document.getElementById("player-poin");
  if (dealerPoin) dealerPoin.innerText = "0";
  if (playerPoin) playerPoin.innerText = "0";

  // Clear any remaining timeouts or intervals
  const highestTimeoutId = setTimeout(";");
  for (let i = 0; i < highestTimeoutId; i++) {
    clearTimeout(i);
  }

  allButtons.forEach((button) => {
    button.style.display = "inline-block"; // Mengembalikan semua tombol menjadi terlihat
  });
  allButtons.forEach((button) => {
    button.style.visibility = "visible"; // Mengembalikan semua tombol menjadi terlihat
  });

  restoreButton();
  clearBet.style.display = "inline-block";
  clearBet.style.visibility = "visible";
}

// Note: hitButtonHandler and standButtonHandler should be defined separately
// if you want to remove these event listeners specifically.
// For example:
// function hitButtonHandler() { /* ... */ }
// function standButtonHandler() { /* ... */ }

// Call this function when you want to clean up the game
// cleanupBlackjackGame();
