let textData = `Your text will look like this. Made by Vijay.`;
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

const STYLE_NAMES = ['Style 2', 'Style 3', 'Style 1'];

function updateStyleBadge() {
    const badge = document.getElementById('styleBadge');
    if (badge) badge.textContent = STYLE_NAMES[change] || ('Style ' + (change + 1));
}

function incrementor() {
    change = (change + 1) % fonts.length;
    updateStyleBadge();
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
    updateStyleBadge();
}

function draw() {
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

// ---------------------------------------------------------
// BMC Support Dialog
// ---------------------------------------------------------
const BMC_UPI_ID   = 'vijaygupta1818@ptyes';
const BMC_UPI_NAME = 'Vijay Gupta';
const BMC_TN       = 'vijay.tools support';

function buildUpiIntent(amount) {
    const params = new URLSearchParams({ pa: BMC_UPI_ID, pn: BMC_UPI_NAME, cu: 'INR', tn: BMC_TN });
    if (amount) params.set('am', String(amount));
    return `upi://pay?${params.toString()}`;
}

function wireSupportDialog() {
    const dialog  = document.getElementById('supportDialog');
    const copyBtn = document.getElementById('supportCopyBtn');
    const amt49   = document.getElementById('amount49');
    const amt99   = document.getElementById('amount99');
    if (!dialog) return;

    if (amt49) amt49.href = buildUpiIntent(49);
    if (amt99) amt99.href = buildUpiIntent(99);

    const open = () => {
        dialog.classList.add('open');
        dialog.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };
    const close = () => {
        dialog.classList.remove('open');
        dialog.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    document.querySelectorAll('[data-open="support"], #supportFab').forEach(el => {
        el.addEventListener('click', open);
    });
    dialog.addEventListener('click', e => {
        if (e.target.closest('[data-close]')) close();
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && dialog.classList.contains('open')) close();
    });

    if (copyBtn) {
        const icon = document.getElementById('supportCopyIcon');
        const original = icon ? icon.innerHTML : '';
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(BMC_UPI_ID);
                copyBtn.classList.add('copied');
                if (icon) icon.innerHTML = '<polyline points="20 6 9 17 4 12"/>';
                setTimeout(() => {
                    copyBtn.classList.remove('copied');
                    if (icon) icon.innerHTML = original;
                }, 2000);
            } catch {
                // clipboard not available — silently ignore
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', wireSupportDialog);
