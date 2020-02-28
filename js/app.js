var BASE64_MARKER = ';base64,';
var LZMA64_MARKER = ';bxze64,';

function compressDataURI(dataURI, callback) {
  var base64Index = dataURI.indexOf(BASE64_MARKER);
  var base64 = dataURI.substring(base64Index + BASE64_MARKER.length);
  stringToZip(base64ToByteArray(base64), function(result) {
    callback(dataURI.substring(0, base64Index) + LZMA64_MARKER + result)    
  })
}

function base64ToByteArray(base64) {
  var raw = window.atob(base64);
  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));
  for(i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}

function stringToZip(string, callback) {
  LZMA.compress(string, 9, function(result, error) {
    if (error) console.error(error);
    var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(result)));
    return callback(base64String);
  });
}

var htmlcode = atob(b64code);
//document.write(htmlcode.replace('ENTERSEEDKEY', seed));

function getMicroWalletCode() {
	newSeed = document.getElementById('seed').value;
	return htmlcode.replace('ENTERSEEDKEY', newSeed);
}

function getIttyBittyURL(encoded) {
	return 'https://itty.bitty.site/#/' + encoded;
}

var button = document.getElementById('buildWallet');
button.addEventListener("click", function() {
	walletHtml = getMicroWalletCode();
	stringToZip(walletHtml, function(result) {
		//console.log(getIttyBittyURL(result));
		urlEncoded = getIttyBittyURL(result);
		document.getElementById('resultURL').value = urlEncoded;
		//new QRCode(document.getElementById("qrcode"), urlEncoded);
		document.getElementById('qrcode').src = "https://zxing.org/w/chart?cht=qr&chs=256x256&chld=L|1&choe=UTF-8&chl=" + urlEncoded;
	});
});


var button2 = document.getElementById('openURLwallet');
button2.addEventListener("click", function() {
	document.location.href = document.getElementById('resultURL').value;
});
