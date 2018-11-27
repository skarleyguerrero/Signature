var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();
 
var config = {
  //  user: "vintageestatesdoral@amsweb.io",
    user: "realtybyaffinity@amsweb.io",
    password: "main123#",
 //   password: "HlmgiwA=g_KS",           
    host: "160.153.63.38",
    port: 21,
    localRoot: __dirname + '/public',
    remoteRoot: '/',
    // include: ['*', '**/*'],      // this would upload everything except dot files
    include: ['*', '**/*'],
    exclude: ['dist/**/*.map'],     // e.g. exclude sourcemaps
    deleteRemote: false              // delete existing files at destination before uploading
}

ftpDeploy.deploy(config)
    .then(res => console.log('finished'))
    .catch(err => console.log(err))