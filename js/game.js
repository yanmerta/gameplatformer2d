setGame("1200x600");
game.folder = "assets";

var dataGambar = {
  logo: "start.png",
  startBtn: "start3.png",
  cover: "bg10.png",
  playBtn: "play5.png",
  maxBtn: "maxBtn.png",
  minBtn: "minBtn.png",
  idle: "Idle.png",
  run: "Run.png",
  jump: "jump.png",
  fall: "Fall.png",
  hit: "Hit.png",
  tileset: "Terrain 1.png",
  bg: "bg7.png",
  bgLevel1: "bg7.png",
  bgLevel2: "bg1.png",
  bgLevel3: "bg6.png",
  bgLevel4: "bg7.png",
  bgLevel5: "bg9.png",
  item1: "Pineapple.png",
  item2: "Apple.png",
  musuh1Idle: "Idlemusuh4.png",
  musuh1Run: "Runmusuh4.png",
  musuh1Hit: "Hitmusuh4.png",
  bendera: "flag.png",
  musicOn: "hati.png",
  musicOff: "pause.png",
  BG: "By.png",
  hati: "heart.png",
  gameover: "gameover2.png",
  playagain: "playagain2.png",
  win: "win.png",
};

var suara = {
  suara: "music.mp3",
  suaraMati: "kill-enemy.wav",
  suaraKarakterMati: "mario-die.wav",
  suaraAmbilItem: "coin.wav",
  suaraDisentuhMusuh: "power-up.wav",
  suaraFinish: "stage-clear.wav",
  backsound: "backsound.mp3",
  gameover: "gameover.mp3",
};
var quizData = [
  {
    question: "Pertanyaan 1: Apa warna langit?",
    options: ["Merah", "Biru", "Hijau", "Kuning"],
    correctAnswer: "Biru", // Indeks jawaban yang benar
  },
  {
    question: "Pertanyaan 2: Berapakah 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4", // Indeks jawaban yang benar
  },
  {
    question: "Pertanyaan 3: Siapakah penemu bola lampu?",
    options: [
      "Isaac Newton",
      "Thomas Edison",
      "Albert Einstein",
      "Marie Curie",
    ],
    correctAnswer: "Thomas Edison",
  },
  {
    question: "Pertanyaan 4: Apa ibukota Indonesia?",
    options: ["Jakarta", "Surabaya", "Bandung", "Yogyakarta"],
    correctAnswer: "Jakarta",
  },
  {
    question: "Pertanyaan 5: Apa nama planet terdekat dengan Matahari?",
    options: ["Mars", "Jupiter", "Venus", "Mercury"],
    correctAnswer: "Mercury",
  },
];

var backsound = new Audio("assets/music.mp3");
// backsound.autoplay = true;
backsound.loop = true;
function startBacksound() {
  backsound.play();
}

function stopBacksound() {
  backsound.pause();
  backsound.currentTime = 0;
}

var backsound2 = new Audio("assets/backsound.mp3");
// backsound.autoplay = true;
backsound2.loop = true;
function startBacksound2() {
  backsound2.play();
}

function stopBacksound2() {
  backsound2.pause();
  backsound2.currentTime = 0;
}

loading(dataGambar, suara, startScreen);

function startScreen() {
  hapusLayar("#000000");
  gambarFull(dataGambar.logo);
  // tampilkanGambar(dataGambar.logo, 600, 250);

  var startBtn = tombol(dataGambar.startBtn, 600, 430);
  if (tekan(startBtn)) {
    startBacksound2();
    jalankan(halamanCover);
  }
}

function halamanCover() {
  hapusLayar("#000000");
  gambarFull(dataGambar.cover);

  var playBtn = tombol(dataGambar.playBtn, 1150, 450);
  if (tekan(playBtn)) {
    stopBacksound2();
    setAwal();
    jalankan(gameLoop);
  }
  resizeBtn(1150, 40);
}

function setAwal() {
  game.hero = setSprite(dataGambar.idle, 32, 32);
  game.skalaSprite = 2;
  game.hero.animDiam = dataGambar.idle;
  game.hero.animLompat = dataGambar.jump;
  game.hero.animJalan = dataGambar.run;
  game.hero.animJatuh = dataGambar.fall;
  game.hero.animMati = dataGambar.hit;
  game.skalaSprite = 2;
  setPlatform(this["map_" + game.level], dataGambar.tileset, 32, game.hero);
  game.gameOver = ulangiPermainan;
  setPlatformItem(1, dataGambar.item1);
  setPlatformItem(2, dataGambar.item2);
  var musuh1 = {};
  musuh1.animDiam = dataGambar.musuh1Idle;
  musuh1.animJalan = dataGambar.musuh1Run;
  musuh1.animMati = dataGambar.musuh1Hit;
  setPlatformEnemy(1, musuh1);
  setPlatformTrigger(1, dataGambar.bendera);
}
var jumlahHati = 5;
function ulangiPermainan() {
  game.aktif = true;
  setAwal();
  mainkanSuara(dataSuara.suaraKarakterMati); // Suara karakter mati
  game.score = 0; // Set skor ke nol ketika pemain mati (diperbaiki di sini)
  jalankan(gameLoop);
  jumlahHati--;
  if (jumlahHati == 0) {
    setTimeout(mainkanSuara(dataSuara.gameover), 2000);
    jalankan(gameOverScreen);
    stopBacksound();
  }
}
function gameOverScreen() {
  hapusLayar("#2E4374");
  gambarFull(dataGambar.gameover);
  var startBtn = tombol(dataGambar.playagain, 600, 350);
  if (tekan(startBtn)) {
    stopBacksound();
    location.reload();
  }
}
function gameWinScreen() {
  hapusLayar("#2E4374");
  gambarFull(dataGambar.win);
  var startBtn = tombol(dataGambar.playagain, 600, 350);
  if (tekan(startBtn)) {
    location.reload();
  }
}

function lanjutPermainan() {
  game.aktif = true;
  game.score = 0;
  game.score2 = 0;
  setAwal();
  jalankan(gameLoop);
}

function gameLoop() {
  hapusLayar();

  // Mengatur latar belakang berdasarkan level saat ini
  if (game.level === 1) {
    latar(dataGambar.bgLevel1, 0.5, 0);
  } else if (game.level === 2) {
    latar(dataGambar.bgLevel2, 0.5, 0);
  } else if (game.level === 3) {
    latar(dataGambar.bgLevel3, 0.5, 0);
  } else if (game.level === 4) {
    latar(dataGambar.bgLevel4, 0.5, 0);
  } else if (game.level === 5) {
    latar(dataGambar.bgLevel4, 0.5, 0);
  }
  var kecepatanGerak = 2;

  if (game.kanan) {
    gerakLevel(game.hero, kecepatanGerak, 0); // Menggerakkan karakter ke kanan
  } else if (game.kiri) {
    gerakLevel(game.hero, -kecepatanGerak, 0); // Menggerakkan karakter ke kiri
  }
  if (game.atas) {
    gerakLevel(game.hero, 0, -10); // Melakukan lompat
  }
  // Tambahkan kondisi untuk level berikutnya jika diperlukan
  buatLevel();
  cekItem();
  var soundBtnOff = tombol(dataGambar.musicOff, 30, 40); // Posisi dan ukuran tombol disesuaikan
  var soundBtnOn = tombol(dataGambar.musicOn, 90, 37); // Posisi dan ukuran tombol disesuaikan
  let startX = 970;
  let spacing = 50;
  for (let i = 0; i < jumlahHati; i++) {
    tombol(dataGambar.hati, startX, 30); // Posisi dan ukuran tombol
    startX += spacing;
  }

  if (tekan(soundBtnOff)) {
    stopBacksound();
    // console.log("tess");
    // mainkanSuara(dataSuara.suara);
  }

  if (tekan(soundBtnOn)) {
    startBacksound();
  }

  teks("Level: " + game.level, 20, 80, "Calibri-bold-20pt-left-Biru"); // Mengubah posisi teks level agar lebih tinggi
  teks(game.score, 20, 110, "Calibri-bold-20pt-left-putih"); // Mengubah posisi teks skor agar lebih tinggi
}

function cekItem() {
  if (game.itemID > 0) {
    tambahScore(10 * game.itemID);
    game.itemID = 0;
    mainkanSuara(dataSuara.suaraAmbilItem); // Suara musuh mengambil item
  }
  if (game.musuhID != 0) {
    tambahScore(25);
    game.musuhID = 0;
    mainkanSuara(dataSuara.suaraMati); // Suara musuh mati
  }
  if (game.triggerID == 1) {
    game.triggerID = 0;
    game.aktif = false;

    var quizIndex = Math.floor(Math.random() * quizData.length); // Pilih pertanyaan secara acak
    var question = quizData[quizIndex].question;
    var options = quizData[quizIndex].options;
    var correctAnswer = quizData[quizIndex].correctAnswer;

    // Menonaktifkan kontrol karakter
    game.kanan = false;
    game.kiri = false;
    game.atas = false;

    var userAnswer = prompt(question + "\n" + options.join("\n"));

    if (userAnswer !== null) {
      if (userAnswer === correctAnswer) {
        // Jawaban benar
        var overlay = document.createElement("div");
        overlay.classList.add("overlay");

        var messageBox = document.createElement("div");
        messageBox.classList.add("message-box");
        messageBox.innerHTML =
          "<p style='color: green;'>Jawaban Anda benar! Lanjut ke level selanjutnya.</p>";

        var okButton = document.createElement("button");
        okButton.classList.add("ok-button");
        okButton.textContent = "OK";
        okButton.addEventListener("click", function () {
          // Kembalikan kontrol karakter
          game.kanan = false;
          game.kiri = false;
          game.atas = false;

          // Lanjut ke level selanjutnya
          game.level++;
          // mainkanSuara(dataSuara.suara);

          setTimeout(function () {
            if (game.level == 6) {
              // Additional action when level is 6
              jalankan(gameWinScreen);
            } else {
              lanjutPermainan();
            }
          });

          // Hilangkan overlay
          document.body.removeChild(overlay);
        });

        messageBox.appendChild(okButton);
        overlay.appendChild(messageBox);
        document.body.appendChild(overlay);

        // Mainkan suara finish (opsional)
        mainkanSuara(dataSuara.suaraFinish);
      } else {
        // Jawaban salah
        var overlay = document.createElement("div");
        overlay.classList.add("overlay");

        var messageBox = document.createElement("div");
        messageBox.classList.add("message-box");
        messageBox.innerHTML =
          "<p style='color: red;'>Jawaban Anda salah. Permainan diulang dari awal.</p>";

        var okButton = document.createElement("button");
        okButton.classList.add("ok-button");
        okButton.textContent = "OK";
        okButton.addEventListener("click", function () {
          // Kembalikan kontrol karakter
          game.kanan = false;
          game.kiri = false;
          game.atas = false;

          // Atur level kembali ke awal
          game.level = 1;
          ulangiPermainan();

          // Hilangkan overlay
          document.body.removeChild(overlay);
        });

        messageBox.appendChild(okButton);
        overlay.appendChild(messageBox);
        document.body.appendChild(overlay);
      }
    }
  }
}
