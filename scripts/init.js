/**
 * This script handles the initialization for WordPress plugin development  
 * 	- setup plugin folder with respective files name and content with project name
 * 	- output .env file for docker with configuration variables
 */

const fs 	   	= require('fs');
const path 		= require("path");
const readline 	= require("readline");
const rl 		= readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const isDirectory = file => fs.statSync(file).isDirectory();
const getDirectories = file => fs.readdirSync(file).map(name => path.join(file, name)).filter(isDirectory);

const isFile = file => fs.statSync(file).isFile();  
const getFiles = file => fs.readdirSync(file).map(name => path.join(file, name)).filter(isFile);

const getFilesRecursively = (file) => {
    let dirs = getDirectories(file);
    let files = dirs
        .map(dir => getFilesRecursively(dir)) // go through each directory
        .reduce((a,b) => a.concat(b), []);    // map returns a 2d array (array of file arrays) so flatten
    return files.concat(getFiles(file));
};

// question to ask for input
rl.question("What is the plugin name? (default: wp-dev)", function(project) {
	rl.question("What is the database name? (default: wordpress) ", function(db_name) {
		rl.question("Database user name? (default: dbuser) ", function(db_user) {
			rl.question("Database user password? (default: dbpassword) ", function(db_pswd) {

				// default value if not set
				if ( !project ) project = 'wp dev';
				if ( !db_name ) db_name = 'wordpress';
				if ( !db_user ) db_user = 'dbuser';
				if ( !db_pswd ) db_pswd = 'dbpassword';

				// plugin name to plugin-name
				let name_dash = project.replace(/\s+/g, '-').toLowerCase();
				// plugin name to plugin_name
				let name_underscore = project.replace(/[-|\s]+/g, '_').toLowerCase();
				
				let token 	  = name_underscore.split('_');
				// Plugin_Name to Example_Me
				let cap_first = token.map( w => w[0].toUpperCase() + w.slice(1) ).join('_');
				// PLUGIN_NAME_ to EXAMPLE_ME_
				let cap_whole = token.map( w => w.toUpperCase() ).join('_') + '_';

				// content of .env
				let content = `PROJECT=${name_dash}\n`;
				content += `DB_NAME=${db_name}\n`;
				content += `DB_USER=${db_user}\n`;
				content += `DB_PASSWORD=${db_pswd}\n`;

				try {
					
					// write env file
					fs.writeFileSync('.env', content);

					let default_dir    = 'plugin-name';
					fs.renameSync(default_dir, name_dash);

					let files = getFilesRecursively(name_dash);

					files
					.map( file => {
						// replace content with new project name
						let data = fs.readFileSync( file, {encoding:'utf8'} );
						let replacement = data.replace(/plugin_name/g, name_underscore);
						replacement = replacement.replace(/plugin-name/g, name_dash);
						replacement = replacement.replace(/Plugin_Name/g, cap_first);
						replacement = replacement.replace(/PLUGIN_NAME_/g, cap_whole);
						fs.writeFileSync(file, replacement);

						return file; // unchange for chaining only 
					})
					.filter(function(file){
						// filter files which unchange name
 						return file.match(/plugin-name/g);
					})
					.forEach( file => {
						// rename files with project name
      					let	newFilePath = file.replace(/plugin-name/g, name_dash);
						fs.renameSync(file, newFilePath);
					});


				} catch (err){
					console.error('Error::Failed to initialize project. Please try again...');
					console.log(err);
				}

				rl.close();
			});
		});
	});
});

rl.on("close", function() {
    console.log("\nEnjoy development !!!");
    process.exit(0);
});