const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];
const b64 = process.argv[3];

if (!filePath || !b64) {
  console.error('Usage: node tools/writer.cjs <filePath> <base64>');
  process.exit(1);
}

const content = Buffer.from(b64, 'base64').toString('utf8');
fs.mkdirSync(path.dirname(filePath), { recursive: true });
fs.writeFileSync(filePath, content, 'utf8');
console.log(`Successfully wrote ${filePath} (${content.length} chars)`);

