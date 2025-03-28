const path = require("path");
const httpStatus = require("http-status").status;
const MIME_TYPES = {
	".txt": "text/plain",
	".html": "text/html",
	".css": "text/css",
	".js": "text/javascript",

	".jpeg": "image/jpeg",
	".jpg": "image/jpeg",
	".png": "image/png",
	".gif": "image/gif",
	".svg": "image/svg+xml",

	".json": "application/json",
	".xml": "application/xml",
	".pdf": "application/pdf",
	".zip": "application/zip",
	".doc": "application/msword",
	".xls": "application/vnd.ms-excel",

	".mpeg": "video/mpeg",
	".mp4": "video/mp4",
};

function getFile(req, res) {
	const sFile = req.params.file;
	res.set("Content-Type", MIME_TYPES[path.extname(sFile)]);
	res.status(httpStatus.OK).sendFile(
		path.join(__dirname, "..", "public", sFile)
	);
}

module.exports = { getFile };
