const Jimp = require("jimp");
const fs = require('fs');

const target = process.argv[2];
const pixel_size = process.argv[3] || 1;
const color_mode = process.argv[4] || 'hex';

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

  let classes = '.p{position:absolute;display:inline-block;height:' + pixel_size + 'px;width:' + pixel_size + 'px;}';
      classes+= '.c{position:relative;height:' + pixel_size * image.bitmap.height + 'px;width:' + pixel_size * image.bitmap.width + 'px;}'
  let spans = '';

  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, index) {

    let color, value;

    const rgba = {
      r: this.bitmap.data[index],
      g: this.bitmap.data[index + 1],
      b: this.bitmap.data[index + 2],
      a: this.bitmap.data[index + 3]
    };

    value = Jimp.rgbaToInt(rgba.r, rgba.g, rgba.b, rgba.a).toString(16).slice(0, -2);
    if (value.length == 4) { value = '00' + value; }
    color = "#" + value;

    classes += '.' + parts[0] + '-' + index + '{top:' + y + 'px;left:' + x + 'px;background:' + color + '}';
    spans +='<i class="p ' + parts[0] + '-' + index + '"></i>';

  });

  // write the results to <filename>.css
  fs.writeFile(parts[0] + ".css", classes, function(err) {
    if(err) {
      return console.log(err);
    }
  });

  // write an accompanying html file
  const html = '<html><head><style>@import "' + parts[0] + '.css";</style></head><body><div class="c">' + spans + '</div></body></html>';
  fs.writeFile(parts[0] + ".html", html, function(err) {
    if(err) {
      return console.log(err);
    }
  });

});

