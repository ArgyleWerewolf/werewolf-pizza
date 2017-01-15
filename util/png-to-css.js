const Jimp = require('jimp');
const tinycolor = require('tinycolor2');
const fs = require('fs');

const target = process.argv[2];
const pixelSize = process.argv[3] || 1;

const tryToCompactHex = function (color) {
  let result = color;
  if (color.length !== 6) {
    return result;
  }

  const slice = color.match(/.{1,1}/g);
  if (
    slice[0] === slice[1] &&
    slice[2] === slice[3] &&
    slice[4] === slice[5]
  ) {
    result = slice[0] + slice[2] + slice[4];
  }
  return result;
};

Jimp.read(target, function (err, image) {
  if (err) {
    throw err;
  }

  // make sure it's a PNG and store the filename for later
  const parts = target.split('.');
  if (parts[1] !== 'png') {
    return console.log('PNG images only, please');
  }

  const canvasHeight = pixelSize * image.bitmap.height;
  const canvasWidth = pixelSize * image.bitmap.width;

  let classes = 'i{position:absolute;display:inline-block;height:' +
  pixelSize + 'px;width:' + pixelSize + 'px;}';
  classes += '.c{position:relative;height:' + canvasHeight + 'px;width:' +
  canvasWidth + 'px;}';

  let spans = '';

  image.scan(0, 0, image.bitmap.width, image.bitmap.height,
  function (x, y, index) {

    const rgba = {
      r: this.bitmap.data[index],
      g: this.bitmap.data[index + 1],
      b: this.bitmap.data[index + 2],
      a: this.bitmap.data[index + 3]
    };

    const tc = tinycolor(rgba);

    if (tc.getAlpha() === 0) {
      return;
    }

    let color = tc.toHex();
    color = tryToCompactHex(color);

    classes += '.' + parts[0] + index + '{top:' + y * pixelSize + 'px;left:' + x * pixelSize +
    'px;background:#' + color + '}';
    spans += '<i class="' + parts[0] + index + '"/></i>';

  });

  // write the results to <filename>.css
  fs.writeFile(parts[0] + '.css', classes);

  // write an accompanying html file
  const html = '<html><head><style>@import "' + parts[0] + '.css";</style>' +
  '</head><body><div class="c">' + spans + '</div></body></html>';
  fs.writeFile(parts[0] + '.html', html);

});

