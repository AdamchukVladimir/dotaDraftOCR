function findMatchingImages(screenshotPath, imagesFolderPath) {
    return new Promise((resolve, reject) => {
      const screenshotData = fs.readFileSync(screenshotPath);
      const imageFiles = fs.readdirSync(imagesFolderPath);
      const matchingImages = [];
      let hash = null;
      let hashImage = null;
      let count = 0;
      const heroesHashes = {};
  
      getImageHash(screenshotPath, 16, true)
        .then(data => {
          hash = data;
          console.log("hash1 " + hash);
          const promises = [];
  
          for (const imageFile of imageFiles) {
            const imagePath = path.join(imagesFolderPath, imageFile);
            const imageData = fs.readFileSync(imagePath);
            let imageID = imageFile.split(".");
  
            const promise = getImageHash(imagePath, 16, true)
              .then(data => {
                let distance = hammingDistance(hash, data);
                if (distance < 40) {
                  console.log("distance " + distance);
                  console.log('"' + imageID[0] + '": "' + data + '",');
                  hashImage = data;
                }
                heroesHashes[imageID[0]] = data;
              })
              .catch(error => {
                console.error(error);
              });
  
            promises.push(promise);
          }
  
          Promise.all(promises)
            .then(() => {
              resolve(hashImage);
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  }