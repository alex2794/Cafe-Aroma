const zlib = require('zlib');
const fs = require('fs');

function crc32(buf) {
  let c = 0xffffffff;
  const table = [];
  for (let n = 0; n < 256; n++) {
    let x = n;
    for (let k = 0; k < 8; k++) x = (x & 1) ? (0xedb88320 ^ (x >>> 1)) : (x >>> 1);
    table[n] = x >>> 0;
  }
  for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
  const t = Buffer.from(type, 'ascii');
  const chunk = Buffer.concat([t, data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(chunk), 0);
  return Buffer.concat([len, chunk, crc]);
}

function createPNG(w, h, getPixel) {
  // png signature
  const sig = Buffer.from([137,80,78,71,13,10,26,10]);
  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w,0); ihdr.writeUInt32BE(h,4);
  ihdr[8]=8; ihdr[9]=6; // bit depth 8, color type 6 (RGBA)
  ihdr[10]=0; ihdr[11]=0; ihdr[12]=0;
  // raw
  const raw = Buffer.alloc(h * (1 + w*4));
  for (let y=0;y<h;y++){
    raw[y*(1+w*4)] = 0; // filter
    for (let x=0;x<w;x++){
      const idx = y*(1+w*4)+1+x*4;
      const [r,g,b,a] = getPixel(x,y,w,h);
      raw[idx]=r; raw[idx+1]=g; raw[idx+2]=b; raw[idx+3]=a;
    }
  }
  const idat = zlib.deflateSync(raw);
  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', idat);
  const iend = makeChunk('IEND', Buffer.alloc(0));
  return Buffer.concat([sig, ihdrChunk, idatChunk, iend]);
}

function pixel(x,y,w,h){
  // cream background
  let r=250,g=247,b=242,a=255;
  const cx=w/2, cy=h/2;
  const radius = Math.min(w,h)*0.28;
  const d = Math.hypot(x-cx, y-cy);
  if (d <= radius) {
    // accent circle
    r=139;g=94;b=60;
  }
  // inner dot
  const r2 = radius*0.42;
  if (Math.hypot(x-cx, y-cy) <= r2) {
    r=201;g=160;b=99;
  }
  return [r,g,b,a];
}

for (const size of [192,512]) {
  const buf = createPNG(size,size,pixel);
  fs.writeFileSync(`public/pwa-${size}x${size}.png`, buf);
  console.log('written', size);
}
// also favicon and apple touch
const fav = createPNG(64,64,pixel);
fs.writeFileSync('public/favicon.png', fav);
const apple = createPNG(180,180,pixel);
fs.writeFileSync('public/apple-touch-icon.png', apple);
console.log('done');
