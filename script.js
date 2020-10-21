let textData = `Your Text will Look like this`;
let img, myFont;
let fonts = ['F3', 'F2', 'F1'];
let change = 1;

let xaxis = 20;
let yaxis = 20;
let pageNum = 1;
let fontsize = 0.35;
let w = 700;
let linespacing = 70;
let F3 = [];

let dataAvailable = Array.from(new Array(94), (x, i) => i + 32);
dataAvailable.splice(64, 1); 


function incrementor() {
	change = (change + 1) % fonts.length;
	
	changeFont();
}

function textChanged(text) {
	textData = text;
	loop();
}

function preload() {
	changeFont();
	loadPage();
	loop();
}

function setup() {
	canvas = createCanvas(750, 1000);
	canvas.parent('contributing');
	rectMode(CORNER);
	noLoop();
}

function draw() {
	//background(255);
	image(img, 0, 0, width, height);
	textSize(fontsize);
	fill('#264180');
	if (linespacing) textLeading(linespacing);
	pos = createVector(xaxis, yaxis);

	

	for (var i = 0; i <= textData.length; i++) {
		if (pos.x >= xaxis + w || textData[i] == '\n') {
			pos.x = xaxis;
			pos.y += linespacing * fontsize;
		}
		if ('textImage' + textData[i] in F3) {
			if (textData[i])
				image(
					F3['textImage' + textData[i]],
					pos.x,
					pos.y,
					F3['textImage' + textData[i]].width * fontsize,
					F3['textImage' + textData[i]].height * fontsize
				);
			pos.x += F3['textImage' + textData[i]].width * fontsize;
		}
	}
}

function changeFont() {
	dataAvailable.forEach((i) => {
		try {
			console.log(str(fonts[change]) + '/' + str(i) + '_t.png');
			F3['textImage' + String.fromCharCode(i)] = loadImage(
				str(fonts[change]) + '/' + str(i) + '_t.png'
			);
		} catch (error) {}
	});
	loop();
}

function loadPage() {
	img = loadImage('page.jpg');
	loop();
}
