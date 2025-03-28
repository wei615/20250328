let seaweeds = []; // 儲存水草的陣列
let colors = ['#70d6ff', '#ff70a6', '#ff9770', '#ffd670', '#e9ff70']; // 水草顏色組合

function setup() { // 初始值設定
  // 創建畫布
  let canvas = createCanvas(windowWidth, windowHeight); // 畫布大小
  canvas.style('position', 'absolute'); // 設定畫布位置
  canvas.style('z-index', '1'); // 將畫布的 z-index 設置為 1，確保在 iframe 後面
  canvas.style('pointer-events', 'none'); // 禁用畫布的滑鼠事件，讓滑鼠事件穿透到 iframe

  // 創建 iframe
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.tku.edu.tw/'); // 設定 iframe 的內容
  iframe.style('position', 'absolute');
  iframe.style('top', '10%');
  iframe.style('left', '10%');
  iframe.style('width', '80%');
  iframe.style('height', '80%');
  iframe.style('border', 'none');
  iframe.style('z-index', '0'); // 將 iframe 的 z-index 設置為 0，確保在畫布後面

  initializeSeaweeds(); // 初始化水草
}

function initializeSeaweeds() {
  seaweeds = []; // 清空水草陣列
  let spacing = width / 60; // 計算水草之間的間距，讓它們平均分布
  for (let i = 0; i < 60; i++) { // 產生 60 條水草
    seaweeds.push({
      x: i * spacing + spacing / 2, // 平均分布在畫布寬度內
      height: random(100, 250), // 隨機高度介於 100 到 250
      swaySpeed: random(0.005, 0.02), // 每條水草的搖動速度
      color: color(random(colors) + '80'), // 隨機選擇顏色，加入透明度
      thickness: random(8, 20), // 隨機粗細，稍微增加粗度
    });
  }
}

function draw() { // 畫圖
  clear()
  //background(30); // 背景顏色改為淺黑色 (RGB: 30, 30, 30)
  blendMode(BLEND); // 設定混合模式，讓顏色重疊產生透明效果

  for (let seaweed of seaweeds) {
    let baseX = seaweed.x; // 水草的基底位置
    let baseY = height; // 水草的底部位置

    stroke(seaweed.color); // 設定水草顏色
    strokeWeight(seaweed.thickness); // 設定水草粗細
    noFill();

    beginShape();
    for (let y = 0; y > -seaweed.height; y -= 10) { // 調整枝節間距，減少密集度
      let swayAmplitude = 10 * (1 - abs(y) / seaweed.height); // 減少搖動幅度
      let sway = sin(frameCount * seaweed.swaySpeed + y * 0.1) * swayAmplitude; // 每個枝節有不同的相位偏移
      let x = baseX + sway; // 計算搖動後的 x 座標
      vertex(x, baseY + y);
    }
    endShape();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 調整畫布大小
  initializeSeaweeds(); // 重新初始化水草位置
}