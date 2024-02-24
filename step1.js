const fs = require('fs');

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

const argv = process.argv;

Cat(argv[2]);
