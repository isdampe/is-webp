const fs = require("fs");

const WEBP_SIGNATURE = [0x57, 0x45, 0x42, 0x50, 0x56, 0x50, 0x38];
const WEBP_SIGNATURE_START = 0x8;
const buffer = new Buffer.alloc(WEBP_SIGNATURE.length + WEBP_SIGNATURE_START);

/**
 * @param {Buffer} buffer The image buffer
 * @return {Boolean}
 */
const validateBuffer = (buffer) => {
	if (buffer.length < (WEBP_SIGNATURE.length + WEBP_SIGNATURE))
		return false;

	const upperBound = WEBP_SIGNATURE_START + WEBP_SIGNATURE.length;
	for (let i=WEBP_SIGNATURE_START; i<upperBound; ++i) {
		if (buffer[i] !== WEBP_SIGNATURE[i - WEBP_SIGNATURE_START])
			return false;
	}

	return true;
}

/**
 * @param {String} fp The filepath to check.
 * @return {Boolean}
 */
const test = async (fp) => {
	return new Promise((resolve, reject) => {
		const fd = fs.open(fp, "r", (err, fd) => {
			if (err) {
				reject(err);
				return;
			}

			fs.read(fd, buffer, 0, WEBP_SIGNATURE.length + WEBP_SIGNATURE_START, 0, 
				(err, bytesRead, buffer) => {
				
					try {
						let result = validateBuffer(buffer);
						resolve(result);
					} catch (e) {
						reject(e);
					}

					fs.close(fd, () => {;});

			});
		});
	});
};

/**
 * @param {String} fp The filepath to check.
 * @return {Boolean}
 */
const testSync = (fp) => {
	const fd = fs.openSync(fp, "r");
	fs.readSync(fd, buffer, 0, WEBP_SIGNATURE.length + WEBP_SIGNATURE_START);
	fs.closeSync(fd);

	const result = validateBuffer(buffer);

	return result;
};

module.exports = {test, testSync}
