const fs = require('fs');
const path = require('path');

function walk(dir) {
  let files = [];
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      files = files.concat(walk(full));
    } else if (full.endsWith('.tsx') || full.endsWith('.ts')) {
      files.push(full);
    }
  }
  return files;
}

const allFiles = walk('src');

for (const file of allFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Fix name=Identifier
  content = content.replace(/\bname=([a-zA-Z0-9_-]+)/g, 'name="$1"');

  // Fix color=#hex
  content = content.replace(/\bcolor=(#[a-fA-F0-9]{3,8})/g, 'color="$1"');

  // Fix target-position=
  content = content.replace(/\btarget-position=\[([^\]]+)\]/g, 'target-position={[$1]}');

  // Fix attach=Identifier
  content = content.replace(/\battach=([a-zA-Z0-9_-]+)/g, 'attach="$1"');

  // Fix type=range or type=file
  content = content.replace(/\btype=(range|file|button|submit|checkbox|text)\b/g, 'type="$1"');

  // Fix accept=.glb,.gltf
  content = content.replace(/\baccept=(\.glb,\.gltf)/g, 'accept="$1"');

  // Fix key=louver- or key=tail-
  content = content.replace(/\bkey=(louver-[^\s>]+)/g, 'key="$1"');
  content = content.replace(/\bkey=(tail-[^\s>]+)/g, 'key="$1"');
  content = content.replace(/\bkey=(post-[^\s>]+)/g, 'key="$1"');
  content = content.replace(/\bkey=(stripe-[^\s>]+)/g, 'key="$1"');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated attributes in: ${file}`);
  }
}
console.log('Finished quote audit.');

