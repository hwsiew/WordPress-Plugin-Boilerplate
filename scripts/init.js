/**
 * 	This script handles the initialization for WordPress plugin development  
 * 		- setup plugin folder with respective files name and content with project name
 * 		- output .env file for docker with configuration variables
 */
const fs 	   	= require('fs');
const path 		= require("path");
const readline 	= require("readline");
const rl 		= readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const prompt 	= require('prompt-sync')();

require('dotenv').config(); // read environment variables from .env

/* helper functions to recursively get all files in a directory */

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

/* end helper functions */

// warning for reinitializing the project
if ('plugin-name' !== process.env.SLUG){
	const proceed = prompt('Project had previously initialized before. Do you want to proceed? [y/N]');
	if ('y' !== proceed.toLowerCase()){
		process.exit(0);
	}
}

// question to ask for input
rl.question("What is the plugin name? (default: wp plugin starter)", function(project) {
	rl.question("What is the database name? (default: wordpress) ", function(db_name) {
		rl.question("Database user name? (default: dbuser) ", function(db_user) {
			rl.question("Database user password? (default: dbpassword) ", function(db_pswd) {

				// default value if not set
				if ( !project ) project = 'wp plugin starter';
				if ( !db_name ) db_name = 'wordpress';
				if ( !db_user ) db_user = 'dbuser';
				if ( !db_pswd ) db_pswd = 'dbpassword';

				// plugin name to plugin-name
				let project_slug = project.replace(/\s+/g, '-').toLowerCase();
				// plugin name to plugin_name
				let project_name = project.replace(/[-|\s]+/g, '_').toLowerCase();

				let token 	  = project_name.split('_');
				// Plugin_Name to Example_Me
				let project_name_capitalize = token.map( w => w[0].toUpperCase() + w.slice(1) ).join('_');
				// PLUGIN_NAME_ to EXAMPLE_ME_
				let project_name_uppercase = token.map( w => w.toUpperCase() ).join('_') + '_';

				// content of .env
				let content = `NAME=${project}\n`; 
				content += `SLUG=${project_slug}\n`;
				content += `DB_NAME=${db_name}\n`;
				content += `DB_USER=${db_user}\n`;
				content += `DB_PASSWORD=${db_pswd}\n`;

				// current setting from .env
				let env_name = process.env.NAME.replace(/[-|\s]+/g, '_').toLowerCase();
				let env_slug = process.env.SLUG;
				let env_name_capitalize = env_name.split('_').map( w => w[0].toUpperCase() + w.slice(1) ).join('_');
				let env_name_uppercase  = env_name.split('_').map( w => w.toUpperCase() ).join('_') + '_';

				try {
					
					// write env file
					fs.writeFileSync('.env', content);
					
					// rename plugin dir
					let default_dir    = process.env.SLUG;
					fs.renameSync(default_dir, project_slug);

					// get all files in plugin dir
					let files = getFilesRecursively(project_slug);

					let slug_pattern = new RegExp(env_slug, "g");

					files
					.map( file => {

						// replace content with new project name
						let data = fs.readFileSync( file, {encoding:'utf8'} );
						let replacement = data.replace(new RegExp(env_name, "g"), project_name);
						replacement = replacement.replace(slug_pattern, project_slug);
						replacement = replacement.replace(new RegExp(env_name_capitalize, "g"), project_name_capitalize);
						replacement = replacement.replace(new RegExp(env_name_uppercase, "g"), project_name_uppercase);
		
						fs.writeFileSync(file, replacement);

						return file; // unchange for chaining only 
					})
					.filter(function(file){

						// filter files which unchange name
 						return file.match(slug_pattern);
					})
					.forEach( file => {

						// rename files with project name
      					let	newFilePath = file.replace(slug_pattern, project_slug);
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