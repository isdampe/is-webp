# is-webp - Check if a given file is a WebP image

## Usage

```javascript
const isWebP = require("is-webp");

const main = async () => {
	console.log(`Async result: ${await isWebP.testSync("image.jpg")}`);
	console.log(`Sync result: ${isWebP.testSync("image.jpg")}`);
}

main();

```
