import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public', 'products');

const moves = [
  ['kit-basico.jpeg', 'ap-bas/1.jpeg'],
  ['Pencil Generic Image.avif', 'ap-bas/2.avif'],
  ['Amarillo - 1Gen.avif', 'ap-bas/3.avif'],
  ['kit-ergonomico.jpeg', 'ap-erg/1.jpeg'],
  ['kit-pro.jpeg', 'ap-pro/1.jpeg'],
  ['Fundas Pencil.jpeg', 'ap-pro/2.jpeg'],
  ['Gris - Pro USB .avif', 'ap-pro/3.avif'],
  ['Negro - Pro USB .avif', 'ap-pro/4.avif'],
  ['puntas.jpeg', 'ap-anc/1.jpeg'],
  ['Negro - Wallet.jpeg', 'ms-wal/1.jpeg'],
  ['Negro 2 - Wallet.avif', 'ms-wal/2.avif'],
  ['Negro - Airpods Case.avif', 'ad-cas/1.avif'],
  ['Blanco - Airpods .png', 'ad-cas/2.png'],
  ['Negro - Funda Ipad.avif', 'ip-cov/1.avif'],
  ['Negro 2 - Funda Ipad.avif', 'ip-cov/2.avif'],
  ['Negro 3 - Funda Ipad.avif', 'ip-cov/3.avif'],
];

for (const [src, dest] of moves) {
  const destPath = path.join(publicDir, dest);
  const destDir = path.dirname(destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  const srcPath = path.join(publicDir, src);
  if (fs.existsSync(srcPath)) {
    fs.renameSync(srcPath, destPath);
    console.log(`Moved ${src} to ${dest}`);
  } else {
    console.log(`Source ${src} not found`);
  }
}
