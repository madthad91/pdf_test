// If absolute URL from the remote server is provided, configure the CORS
// header on that server.
var url = 'm.pdf';

// Disable workers to avoid yet another cross-origin issue (workers need
// the URL of the script to be loaded, and dynamically loading a cross-origin
// script does not work).
PDFJS.disableWorker = true;

// The workerSrc property shall be specified.
PDFJS.workerSrc = 'http://mozilla.github.io/pdf.js/build/pdf.worker.js';

// Asynchronous download of PDF
var loadingTask = PDFJS.getDocument(url); //can take url or base64 image as {data: pdfData}
loadingTask.promise.then(function(pdf) {
    console.log('PDF loaded');

    // Fetch the first page
    var pageNumber = 1;
    pdf.getPage(pageNumber).then(function(page) {
        console.log('Page loaded', page, Object.getOwnPropertyNames(page));

        var scale = 1.5;
        var viewport = page.getViewport(scale);

        // Prepare canvas using PDF page dimensions
        var canvas = document.getElementById('the-canvas');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        var renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        var renderTask = page.render(renderContext);
        renderTask.then(function() {
            console.log('Page rendered');
        });
    });
}, function(reason) {
    // PDF loading error
    console.error(reason);
});

function updateImage(a, idx) {
    console.log(a, idx, a.value);
    var val = a.value;
    var c = document.getElementById("the-canvas").getContext("2d");
    c.font = "24px Verdana";
    switch (idx) {
        case 1:
            c.fillText(val, 120, 450); // my namee
            break;
        case 2:
            c.fillText(val, 95, 610); //name print
            break;
        case 3:
            c.fillText(val, 630, 610); //date
            break;
        case 4:
            c.fillText(val, 95, 725); // email //height differential of 57.5
            break;
        case 5:
            c.fillText(val, 630, 725); // phone
            break;
        case 6:
            c.fillText(val, 95, 725); // email
            break;
        case 7:
            c.fillText(val, 95, 781.5); //street address
            break;
        case 8:
            c.fillText(val, 295, 781.5); //apt/suite
            break;
        case 9:
            c.fillText(val, 520, 781.5); //city
            break;
        case 10:
            c.fillText(val, 665, 781.5); //state
            break;
        case 11:
            c.fillText(val, 755, 781.5); //zip
            break;
        case 12:
            c.fillText(val, 95, 940); //witness name
            break;
        case 13:
            c.fillText(val, 630, 940); //witness date
            break;
            // c.fillText(val, 95, 997.5); //witness signature
        case 14:
            c.fillText(val, 95, 1055); //witness email
            break;
        case 15:
            c.fillText(val, 630, 1055); //witness phone
            break;
    }

    //c.drawImage(imageObj2, 0, 0, 82, 75);
}

function saveImg() {
    var c = document.getElementById("the-canvas");
    document.getElementById("res").src = c.toDataURL();
}

var canvas = document.getElementById('signatureCanvas');
var signaturePad = new SignaturePad(canvas);
var canvas2 = document.getElementById('signatureCanvas2');
var signaturePad2 = new SignaturePad(canvas2);

function clearCanvas() {
    signaturePad.clear();
}

function saveCanvas() {
    var sigImg = signaturePad.toDataURL();
    var image = new Image();
    image.onload = function() {
        var c = document.getElementById("the-canvas").getContext("2d");
        c.drawImage(image, 95, 638);
    };
    image.src = sigImg;
}

function clearCanvas2() {
    signaturePad2.clear();
}

function saveCanvas2() {
    var sigImg = signaturePad2.toDataURL();
    var image = new Image();
    image.onload = function() {
        var c = document.getElementById("the-canvas").getContext("2d");
        c.drawImage(image, 95, 963);
    };
    image.src = sigImg;
}