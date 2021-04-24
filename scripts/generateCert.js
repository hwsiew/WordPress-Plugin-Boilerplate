/**
 * Generate self signed certificte for nginx
 * 
 * reference: https://github.com/jfromaniello/selfsigned/issues/13 
 */

const selfsigned = require('selfsigned');
const fs 	   	 = require('fs');
const path 		 = require("path");

// Generate CA keypair with selfsigned itself
const rootCA = selfsigned.generate(
	[
	  { name: 'commonName', value: 'Development Certificate Authority' },
	  { name: 'countryName', value: 'MY' },
	  { name: 'organizationName', value: 'Actiweb Technology' }, 
	],
	{
	  keySize: 2048,
	  algorithm: 'sha256',
	  extensions: [
		{
		  name: 'basicConstraints',
		  cA: true,
		},
	  ]
	}
);

// Generate certificate signed by this CA
const pems = selfsigned.generate(
	[
	  { name: 'commonName',  value: 'My Cool Certs' },
	  { name: 'countryName', value: 'MY' },
	  { name: 'organizationName', value: 'Actiweb Technology' }, 
	],
	{
	  keySize: 2048,
	  ca: rootCA,
	  algorithm: 'sha256',
	  extensions: [
		{
		  name: 'basicConstraints',
		  cA: false,
		},
		{
		  name: "keyUsage",
		  keyCertSign: false,  // Must be set to false or Chrome won't accept this certificate otherwise
		  digitalSignature: true,
		  nonRepudiation: true,
		  keyEncipherment: true,
		  dataEncipherment: true,
		},
		{
		  name: "extKeyUsage",
		  serverAuth: true,
		  clientAuth: true,
		  codeSigning: true,
		  timeStamping: true,
		},
		{
		  name: "subjectAltName",
		  altNames: [
			{
			  // type 2 is DNS
			  type: 2,
			  value: "localhost",
			},
			{
			  type: 2,
			  value: "*.local",
			},
			{
			  // type 7 is IP
			  type: 7,
			  ip: "127.0.0.1",
			},
		  ],
		},
	  ],
	}
);

// default dir
let dir  =  path.resolve(__dirname, '../nginx/certs');

// write to files
fs.mkdir( dir , { recursive: true }, (err) => {

	if (err) throw err;

	fs.writeFileSync( path.join(dir, 'ca.crt') , rootCA.cert );
	fs.writeFileSync( path.join(dir, 'privkey.pem') , pems.private );
	fs.writeFileSync( path.join(dir, 'fullchain.pem') , pems.cert );

});

