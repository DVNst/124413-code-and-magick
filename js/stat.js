'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var TEXT_GAP = 20;
var TEXT_HEIGHT = 20;

var BAR_WIDTH = 40;
var BAR_MAX_HEIGHT = 150;
var BAR_SPACE = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;

  var index = CLOUD_WIDTH / 14;
  var radian = (Math.PI / 180);

  ctx.beginPath();
  ctx.arc(x + CLOUD_WIDTH - index / 2, y + index / 2, index / 2, 0, radian * 360);
  ctx.moveTo(x + index * 2, y);
  ctx.lineTo(x + index * 10, y);
  ctx.arc(x + index * 10, y + index, index, radian * 270, radian * 360);
  ctx.arc(x + index * 10 + 50, y + index + 40, 42, radian * 240, radian * 30);
  ctx.arc(x + index * 10 + 90, y + index + 90, index, radian * 270, radian * 360);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT - index);
  ctx.arc(x + CLOUD_WIDTH - index, y + CLOUD_HEIGHT - index, index, 0, radian * 90);
  ctx.lineTo(x + index, y + CLOUD_HEIGHT);
  ctx.arc(x + index, y + CLOUD_HEIGHT - index, index, radian * 90, radian * 180);
  ctx.lineTo(x, y + index * 2);
  ctx.arc(x + index * 2, y + index * 2, index * 2, radian * 180, radian * 270);
  ctx.closePath();
  ctx.fill();
};

var getMaxElement = function (arr) {
  if (arr.length < 1) {
    return 0;
  }

  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandomColor = function (names) {
  return (names === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + Math.random() * 100 + '%, 50%)';
};

window.renderStatistics = (function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgba(255, 255, 255, 1)');
  ctx.stroke();

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура вы победили!', CLOUD_X + TEXT_GAP * 3, CLOUD_Y + TEXT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + TEXT_GAP * 2, CLOUD_Y + TEXT_GAP + TEXT_HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var barX = CLOUD_X + TEXT_GAP + (BAR_WIDTH + BAR_SPACE) * i;
    var barY = CLOUD_HEIGHT - TEXT_HEIGHT - GAP - BAR_MAX_HEIGHT * times[i] / maxTime;
    var barHeight = BAR_MAX_HEIGHT * times[i] / maxTime;

    ctx.fillStyle = '#000';
    ctx.fillText(names[i], barX, CLOUD_HEIGHT - GAP);
    ctx.fillText(Math.round(times[i]), barX, barY - GAP);

    ctx.fillStyle = getRandomColor(names[i]);
    ctx.fillRect(barX, barY, BAR_WIDTH, barHeight);
  }
});
