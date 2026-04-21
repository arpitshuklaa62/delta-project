const fs = require('fs');
let content = fs.readFileSync('./init/data.js', 'utf8');
// Replace geometry type field with geoJsonType
content = content.replace(/geometry: \{ type: "Point"/g, 'geometry: { geoJsonType: "Point"');
fs.writeFileSync('./init/data.js', content);
console.log('Updated all geometry objects in data.js');
