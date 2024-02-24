const fs = require('fs');
const axios = require('axios'); // legacy way


function Cat(path)
{
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
          // handle possible error
          console.error(`Error reading ${path}:
          Error: ${err.message}`);
          // kill the process and tell the shell it errored
          process.exit(1);
        }
        // otherwise success
        console.log(`${data}`);
      });
}

function WebCat(Url)
{
  // Make a request
  axios.get(Url)
    .then(function (response) {
      // handle success
      console.log(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(`Error fetching ${Url}
      Error: ${error.message}`);
    });
}

const argv = process.argv;
const arg = argv[2];

if(arg.toLowerCase().startsWith("http"))
{
  WebCat(arg);
}
else
{
  Cat(arg);
}


