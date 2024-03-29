const terser = require("terser");
const fs = require("fs");
const process = require("process");
const prompt = require("prompt-sync")();
const qrcode = require("qrcode");

const args = process.argv.slice(2);

const loc = args.length >= 1 ? args[0] : prompt("Enter the location to your config file: ");
const correctionLevel = (args.length >= 2 ? args[1] : prompt("Enter the error correction level you want (L, M, Q, H): ")).toLowerCase();
const loc_folder = loc.slice(0, loc.lastIndexOf('/'))
async function LoadCode() {
	const Modes = {
		Null: 0,

		CodeHead: "code:",
		Code: 1,

		ExtHead: "external:",
		Ext: 2
	}

	const lines = fs.readFileSync(loc, 'utf8').split('\n');
	for (const i in lines)
		lines[i] = lines[i].replace('\r', '');
	lines.pop();
	let mode = Modes.Null;
	const header = "data:text/html,<!DOCTYPE html><body></body><script>"
	const tail = "</script>"
	let code = ""
	for (const line of lines)
		switch (line.toLowerCase().trim()) {
			case Modes.CodeHead:
				mode = Modes.Code;
				break;
			case Modes.ExtHead:
				mode = Modes.Ext;
				break;
			default:
				switch (mode) {
					case Modes.Null:
						console.log("The config file's mode wasn't set!");
						process.exit();
						break;
					case Modes.Code:
						code += fs.readFileSync(`${loc_folder}/${line}`, 'utf8');
						break;
					case Modes.Ext:
						code += await (await fetch(line)).text();
						break;
				}
				break;
		}
	return header + (await terser.minify(code, {toplevel: true})).code + tail;
}

const buildDir = `${loc_folder}/build`;
if (!fs.existsSync(buildDir)) {
	fs.mkdirSync(buildDir);
}

LoadCode().then((res) => {
	console.log(`Output:\n\t${res}`);
	console.log(`The files outputted from your build are in ${buildDir}`)
	fs.writeFileSync(`${buildDir}/a.code`, res);
	fs.writeFileSync(`${buildDir}/a.html`, res.substring(15));
	qrcode.toFile(`${buildDir}/qrcode.svg`, res, {
		errorCorrectionLevel: correctionLevel,
		type: "svg"
	}, function(err, data) {
		if (err) 
			throw err;
		if (data !== undefined)
			console.log(data);
	});
})
