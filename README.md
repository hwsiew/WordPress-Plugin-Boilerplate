# WordPress Plugin Starter Kit

This project builds on top of the popular [WordPress Plugin Boilerplate](https://github.com/DevinVinson/WordPress-Plugin-Boilerplate) to ease the development of WordPress Plugin. While WordPress Plugin Boilerplate offers a standardized, organized, object-oriented foundation for building high-quality WordPress Plugins. This extends various common development/build tools to speed up your WordPress plugin development.

## Features

* The Boilerplate is based on the [Plugin API](http://codex.wordpress.org/Plugin_API), [Coding Standards](http://codex.wordpress.org/WordPress_Coding_Standards), and [Documentation Standards](https://make.wordpress.org/core/handbook/best-practices/inline-documentation-standards/php/).
* All classes, functions, and variables are documented so that you know what you need to change.
* The Boilerplate uses a strict file organization scheme that corresponds both to the WordPress Plugin Repository structure, and that makes it easy to organize the files that compose the plugin.
* The project includes a `.pot` file as a starting point for internationalization.
* Docker containers to easily create a local development environment
* and more to come...

## Prerequisites

This project uses common development stack, and your local machine needs the support of the following
* [Docker Desktop](https://www.docker.com/products/docker-desktop) - to create local development environment
* [Node.js](https://nodejs.org/en/) - npm dependency and scripts

## Installation

Clone this project to your local development machine and follow the instructions below to kick start your WordPress plugin development. 

1. run `npm install` - to install all dependency
2. run `npm run init` - to initialize the project such as, plugin name and etc.
3. run `npm run start` - to start the docker containers for local Wordpress.
4. go https://localhost on your prefer browser to complete wordpress installation.
5. login with the credentials you just created by going https://localhost/wp-admin
6. navigate to plugins section and activate 'WordPress Plugin Boilerplate'. Note: you may change the plugin name whatever you like.
7. you may then start building your awesome WordPress plugin in the folder name 'plugin-name' (example-me).
8. run `npm run stop` - to stop docker containers.

After running `npm run init`, plugin folder will be setup by replacing all folders and files with the following details. For example, when 'example me' is entered for plugin name. 

* rename files from `plugin-name` to `example-me`
* change `plugin_name` to `example_me`
* change `plugin-name` to `example-me`
* change `Plugin_Name` to `Example_Me`
* change `PLUGIN_NAME_` to `EXAMPLE_ME_`

It's safe to activate the plugin at this point. Because the Boilerplate has no real functionality there will be no menu items, meta boxes, or custom post types added until you write the code.

## WordPress.org Preparation

The original launch of this version of the boilerplate included the folder structure needed for using your plugin on WordPress.org. That folder structure has been moved to its own repo here: https://github.com/DevinVinson/Plugin-Directory-Boilerplate

## Recommended Tools

### i18n Tools

The WordPress Plugin Boilerplate uses a variable to store the text domain used when internationalizing strings throughout the Boilerplate. To take advantage of this method, there are tools that are recommended for providing correct, translatable files:

* [Poedit](http://www.poedit.net/)
* [makepot](http://i18n.svn.wordpress.org/tools/trunk/)
* [i18n](https://github.com/grappler/i18n)

Any of the above tools should provide you with the proper tooling to internationalize the plugin.

## License

The WordPress Plugin Boilerplate is licensed under the GPL v2 or later.

> This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License, version 2, as published by the Free Software Foundation.

> This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

> You should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA

A copy of the license is included in the root of the plugin’s directory. The file is named `LICENSE`.

## Important Notes

### Licensing

The WordPress Plugin Boilerplate is licensed under the GPL v2 or later; however, if you opt to use third-party code that is not compatible with v2, then you may need to switch to using code that is GPL v3 compatible.

For reference, [here's a discussion](http://make.wordpress.org/themes/2013/03/04/licensing-note-apache-and-gpl/) that covers the Apache 2.0 License used by [Bootstrap](http://twitter.github.io/bootstrap/).

### Includes

Note that if you include your own classes, or third-party libraries, there are three locations in which said files may go:

* `plugin-name/includes` is where functionality shared between the admin area and the public-facing parts of the site reside
* `plugin-name/admin` is for all admin-specific functionality
* `plugin-name/public` is for all public-facing functionality

Note that previous versions of the Boilerplate did not include `Plugin_Name_Loader` but this class is used to register all filters and actions with WordPress.

The example code provided shows how to register your hooks with the Loader class.
