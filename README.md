# qr-cartridge
A basic build system including library importing from URLs for creating code that can be stored onto QR codes and ran directly off of them on the browser.

### Examples

There's a basic example for quickstarting [here](https://github.com/RandomGamingDev/qr-cartridge/tree/main/example)! <br/>
Another project that uses it is [qr-flappy-bird](https://github.com/RandomGamingDev/qr-flappy-bird) which is a very close recreation of flappy bird with assets and everything :D <br/>
Here's a video explaining how that project was made https://www.youtube.com/watch?v=CDMbnNxvrVM

### How to use

Simply create a directory containing a `.config` file with your filepaths to your code behind the `code:` tag and external libraries imported from URLs behind the `external:`. (btw don't indent the URLs or anything else just paste them in after the line with the tag)
Tags can be used multiple times and everything is imported in order.

Then simply download the dependencies using `npm install` and then execute `comp.cjs` using NodeJS and follow the instructions or use the CLI argv inputs like this: `node comp.cjs <config file location> <QR code error correction level>`
A `build` file will then be generated next to the config file containing everything you need.

Please Note: A few characters like `#` for instance will cut off the code at that point because of URL fragments.

### Use it anywhere!

Because of the incredibly small size of javascript when properly minified alongside the wide browser support and the fact that the browsers do all the heavy lifting this is one of the perfect ways to create QR codes for tiny applications that anyone could use without requiring the internet!
tbh if you're reading this the problem probably isn't that you don't have internet, but this project's a decently fun gimmick and it's really nice to see just how much you can fit onto a simple QR code :D
