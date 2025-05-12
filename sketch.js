let audioStarted = false;

function mousePressed() { // needed to get it to work in full screen mode
    // Start audio on user gesture
    if (!audioStarted) {
        userStartAudio();
        audioStarted = true;
    }
}

var mode = 0;
let mainloop; 
let Beat1,Beat2,Synth1
let playing = [false, false, false];
let volumeSliders = [];
let nyanCatImg; 
let nyanX = 0; nyanY = 0; nyanSpeed = 2;
let rainbowCats = [];
let fft, amp, prevAmp = 0;
let sounds = {};

function preload() {
  mainloop = loadSound('loop.mp3');
  Beat1= loadSound('beat1.mp3');
  Beat2= loadSound('beat2.mp3');
  Synth1= loadSound('syn1.mp3');
  
  popcatgif = createImg('popcat.gif');
  popcatpause = createImg('popcatpause.png');
  catgif2 = createImg('cat2.gif');
  catpause2 = createImg('cat21.gif');
  catgif3 = createImg('cat3.jpg');
  catpause3 = createImg('cat31.png');
  nyanCatImg = loadImage('rainbowcat.png');
  
  popcatgif.hide();
  popcatpause.hide();
  catgif2.hide();
  catpause2.hide();
  catgif3.hide();
  catpause3.hide();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  splash = new Splash();
  
  fft = new p5.FFT();
  amp = new p5.Amplitude();
  amp.setInput();
  
  mainloop.setLoop(true);
  mainloop.play();

  let yPos = displayHeight / 2 - 200;

  popcatgif.position(displayWidth / 4 - 100, yPos);
  popcatgif.size(200, 200);
  popcatgif.mousePressed(() => triggerSound(0));
  popcatpause.position(displayWidth / 4 - 100, yPos);
  popcatpause.size(200, 200);
  popcatpause.mousePressed(() => triggerSound(0));
  popcatpause.show();

  catgif2.position(displayWidth / 2 - 100, yPos);
  catgif2.size(200, 200);
  catgif2.mousePressed(() => triggerSound(1));
  catpause2.position(displayWidth / 2 - 100, yPos);
  catpause2.size(200, 200);
  catpause2.mousePressed(() => triggerSound(1));
  catpause2.show();

  catgif3.position((3 * displayWidth / 4) - 100, yPos);
  catgif3.size(200, 200);
  catgif3.mousePressed(() => triggerSound(2));
  catpause3.position((3 * displayWidth / 4) - 100, yPos);
  catpause3.size(200, 200);
  catpause3.mousePressed(() => triggerSound(2));
  catpause3.show();
  
  
  let xOffset = displayWidth / 4 - 50; 
  let ySlider = displayHeight / 2 + 50; 

for (let i = 0; i < 3; i++) {
  let slider = createSlider(0, 1, 0.5, 0.01);
  slider.position(xOffset + i * (displayWidth / 4), ySlider);
  volumeSliders.push(slider);
  }
  
}

function draw() {
  if (mouseIsPressed == true && splash.update() == true) {
    mode = 1;
  }
  
  if (mode == 1) {
    splash.hide();
  
    background(255);
    
    let level = amp.getLevel();
    let spectrum = fft.analyze(); 
    let energy = fft.getEnergy("bass");

    
if ((level > 0.15 && prevAmp <= 0.15) || energy > 200) {
  if (rainbowCats.length < 15) {
    let count = floor(map(level + energy / 255, 0.3, 1, 1, 3, true));
    for (let i = 0; i < count; i++) {
      rainbowCats.push(createRainbowCat());
    }
  }
}

    
  for (let i = rainbowCats.length - 1; i >= 0; i--) {
  let cat = rainbowCats[i];

  
  let spacing = i * 30;
  cat.x += map(energy, 0, 255, 1, 6); 
  cat.y = height / 2 + sin(frameCount * 0.1 + spacing) * 30 + level * 40; 
  image(nyanCatImg, cat.x, cat.y, 100 * cat.scale, 50 * cat.scale);

  if (cat.x > width + 100) {
    rainbowCats.splice(i, 1);
  }
}

    
    nyanY = map(energy, 0, 255, height / 2, height / 4);
    nyanX += map(energy, 0, 255, 1, 10); 
    if (nyanX > width) nyanX = -200;
    image(nyanCatImg, nyanX, nyanY, 200, 100);   

    
    textSize(24);
    fill(0);
    textAlign(CENTER);
    text('Click a cat to make sound!', width / 2, 40);

   
    Beat1.setVolume(volumeSliders[0].value());
    Beat2.setVolume(volumeSliders[1].value());
    Synth1.setVolume(volumeSliders[2].value());
  }
}   
  
function triggerSound(index) {
  playing[index] = !playing[index];

  if (index === 0) {
    if (playing[index]) {
      Beat1.loop();
      popcatpause.hide();
      popcatgif.show();
    } else {
      Beat1.stop();
      popcatgif.hide();
      popcatpause.show();
    }
  } else if (index === 1) {
    if (playing[index]) {
      Beat2.loop();
      catpause2.hide();
      catgif2.show();
    } else {
      Beat2.stop();
      catgif2.hide();
      catpause2.show();
    }
  } else if (index === 2) {
    if (playing[index]) {
      Synth1.loop();
      catpause3.hide();
      catgif3.show();
    } else {
      Synth1.stop();
      catgif3.hide();
      catpause3.show();
    }

    for (let i = 0; i < 3; i++) {
  rainbowCats.push(createRainbowCat());
}
  }
}


function createRainbowCat() {
  return {
    x: -100,
    y: random(height / 4, height / 2),
    speed: random(2, 6),
    scale: random(0.5, 1)
  };
}
