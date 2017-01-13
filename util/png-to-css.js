const Jimp = require("jimp");
const fs = require('fs');

const target = process.argv[2];
const colormode = process.argv[3] || 'hex';
const pixel_size = process.argv[4] || 1;

if (!target) {
  return console.log('no input image specified!');
}

Jimp.read(target, function (err, image) {
  if (err) throw err;

  // make sure it's a PNG and store the filename for later
  const parts = target.split('.');
  if (parts[1] !== 'png') {
    return console.log('PNG images only, please');
  }

  let pixels = '';

  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, index) {

    let color, value;

    const rgba = {
      r: this.bitmap.data[index],
      g: this.bitmap.data[index + 1],
      b: this.bitmap.data[index + 2],
      a: this.bitmap.data[index + 3]
    };
    if (colormode == 'rgb') {
      value = rgba.a + "," + rgba.g + "," + rgba.b;
      color = "rgb(" + value + ")";
    } else {
      value = Jimp.rgbaToInt(rgba.r, rgba.g, rgba.b, rgba.a).toString(16).slice(0, -2);
      if (value.length == 4) {
        value = '00' + value;
      }
      color = "#" + value;
    }

    pixels += x + 'px ' + y + 'px 0 ' + color + ',';

  });

  // write the results to <filename>.css
  const css = '.' + parts[0] + ' { height: ' + pixel_size + 'px; width: ' + pixel_size + 'px; box-shadow: ' + pixels.slice(0, -1) + ';}';
  fs.writeFile(parts[0] + ".css", css, function(err) {
    if(err) {
      return console.log(err);
    }
  });

  // write an accompanying html file
  const html = '<html><head><style>@import "' + parts[0] + '.css";</style></head><body><div class="' + parts[0] +'"></div></body></html>';
  fs.writeFile(parts[0] + ".html", html, function(err) {
    if(err) {
      return console.log(err);
    }
  });

});

