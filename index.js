const screenshot = require('screenshot-desktop');
let fs = require('fs');
const path = require('path');
const { imageHash }= require('image-hash');
const sharp = require('sharp');

const imagesFolderPath = 'G:/IT/Git/dotaDraftOCR/heroes_img';
const screenshotPath = 'G:/IT/Git/dotaDraftOCR/sharpImage.png';

const cropCoordinates = {
  width: 115, height: 65, left: 211, top: 7
};

screenshot().then((img) =>{
    fs.writeFileSync("screenshot.png", img);
    console.log("screenshot good");

    sharp(img)
      .extract(cropCoordinates)
      .toFile("sharpImage.png");
    console.log("sharpImage good");
});

function findMatchingImages(screenshotPath, imagesFolderPath) {
    const screenshotData = fs.readFileSync(screenshotPath);
    const imageFiles = fs.readdirSync(imagesFolderPath);
    const matchingImages = [];
    let hash = null;
    let hashImage = null;
    let count = 0;
    const heroesHashes = {};
    getImageHash(screenshotPath, 16, true).then(data => {
      hash = data;
      console.log("hash1 " + hash);
    for (const imageFile of imageFiles) {
      const imagePath = path.join(imagesFolderPath, imageFile);
      const imageData = fs.readFileSync(imagePath);  
      let imageID = imageFile.split(".");

        getImageHash(imagePath, 16, true).then(data => {
          let distance = hammingDistance(hash, data);
          if (distance < 35) {
            console.log("distance " + distance);
            console.log('"'+imageID[0]+'": "'+data+'",');
            hashImage = data;
            return data;
          }
          heroesHashes[imageID[0]] = data;
        }).catch(error => {
        console.error(error);
      });   
     }
    }).catch(error => {
      console.error(error);
    });
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


findMatchingImages(screenshotPath, imagesFolderPath);
