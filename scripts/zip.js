/**
 * This handle zipping plugin folder for distribution
 * 
 * @see https://www.npmjs.com/package/archiver
 */
const fs = require('fs');
const archiver = require('archiver');

require('dotenv').config(); 

const output = fs.createWriteStream(process.cwd() + `/${process.env.SLUG}.zip`);
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

output.on('close', function() {
	console.log(archive.pointer() + ' total bytes');
	console.log('archiver has been finalized and the output file descriptor has closed.');
});

output.on('end', function() {
	console.log('Data has been drained');
});

// good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on('warning', function(err) {
	if (err.code === 'ENOENT') {
	  // log warning
	  console.log(err)
	} else {
	  // throw error
	  throw err;
	}
});
  
 // good practice to catch this error explicitly
archive.on('error', function(err) {
	throw err;
});

// pipe archive data to the file
archive.pipe(output);

archive.glob(`${process.env.SLUG}/**/*`, {
	cwd:process.cwd(),
	skip:['**/*/src'] // folder to exclude
}).finalize();