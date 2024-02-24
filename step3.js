const fs = require('fs');
const axios = require('axios'); // legacy way


function Cat(path, printFile, output)
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
        if(printFile)
        {
          console.log(`# no output, but ${output} contains contents of ${path}`);
          WriteFile(output, data);
        }
        else
        {
          console.log(`${data}`);
        }

      });
}

function WebCat(Url, printFile, output)
{
  // Make a request
  axios.get(Url)
    .then(function (response) {
      // handle success
        if(printFile)
        {
          console.log(`# no output, but ${output} contains ${Url}'s HTML`);
          WriteFile(output, response.data);
        }
        else
        {
          console.log(response.data);
        }
    })
    .catch(function (error) {
      // handle error
      console.log(`Error fetching ${Url}
      Error: ${error.message}`);
    });
}

function WriteFile(path, content)
{
  fs.writeFile(path, content, "utf8", function(err) {
    if (err) {
      console.error(`Couldn't write ${path}:
      Error: ${err.message}`);
      process.exit(1);
    }
  });
}


const argv = process.argv;
let source = "";
let outputFile = ""; 
let printFile = false;

if (argv[2].toLowerCase().startsWith("--out"))
{
  printFile = true;
  outputFile = argv[3];
  source = argv[4];
}
else
{
  source = argv[2];
}

if(source.toLowerCase().startsWith("http"))
{
  WebCat(source,printFile,outputFile);
}
else
{
  Cat(source,printFile,outputFile);
}


