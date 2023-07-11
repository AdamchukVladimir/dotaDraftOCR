const screenshot = require('screenshot-desktop');
let fs = require('fs');
const path = require('path');
const { imageHash }= require('image-hash');

const imagesFolderPath = 'G:/IT/Git/GraphQL/krobelus/src/assets/hero_img';
const screenshotPath = 'G:/IT/Git/dotaDraftOCR/avatars/ursa.png';
const HeroesPhashPath = 'G:/IT/Git/dotaDraftOCR/HeroesPhash.json';
const HeroesPhashData = fs.readFileSync(HeroesPhashPath);

let PPhash = main();
console.log("PPhash "+ PPhash);
let count = 0;

async function main() {
  try {
    const result = await getImageHash(screenshotPath, 16, true);
    console.log(result); // Результат записан в переменную "result"
    count = count + 1;
  } catch (error) {
    console.error(error);
  }
}

  function hammingDistance(phash1, phash2) {
    let distance = 0;
    for (let i = 0; i < 64; i++) {
      if (phash1[i] !== phash2[i]) {
        distance++;
      }
    }
    return distance;
  }

  function getImageHash(imagePath, size, flag) {
    return new Promise((resolve, reject) => {
      imageHash(imagePath, size, flag, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

main();
console.log("count " + count);
