//Dependencies
var fs = require('fs');
var mime = require('mime');
var path = require('path');

'use strict';

function openFolderDialog (fileHandlecb){
	var inputField = document.querySelector('#folderSelector');
	inputField.addEventListener('change', function () {
		var folderPath = this.value;
		//alert('Folder path is' + folderPath);
		fileHandlecb(folderPath); //fileHandlecb is a callback
	}, false);
	inputField.click();
}

function bindSelectFolderClick (fileHandlecb){
	var button = document.querySelector('#select_folder');
	button.addEventListener('click', function () {
		//alert('clicked on the button');
		openFolderDialog(fileHandlecb);
	});
}

function hideSelectFolderButton (){
	var button  = document.querySelector('#select_folder');
	button.style.display = 'none';
}

function findAllFiles (folderPath, fileHandlecb){
	fs.readdir(folderPath, function (err, files) {
		if (err) { return fileHandlecb(err, null); }
		fileHandlecb(null, files);
	});

	var imageMimeTypes = [
		'image/bmp',
	    'image/gif',
	    'image/jpeg',
	    'image/png',
	    'image/pjpeg',
	    'image/tiff',
	    'image/webp',
	    'image/x-tiff',
	    'image/x-windows-bmp'
	];
}

function findImageFiles (files, folderPath, fileHandlecb) {
	var imageFiles = [];
	files.forEach(function (file) {
		var fullFilePath = path.resolve(folderPath,file);
		var extension = mime.lookup(fullFilePath);
		if (imageMimeTypes.indexOf(extension) !== -1){
			imageFiles.push({name: file, path: fullFilePath});
		}
		if (files.indexOf(file) == files.length-1){
			fileHandlecb(imageFiles);
		}
	});
}

function addImageToPhotosArea (file){
	var photosArea = document.getElementById('photoes');
		var template = document.querySelector('#photo-template');
		template.content.querySelector('img').src = file.path;
		template.content.querySelector('img').setAttribute('data-name', file.name);
	var clone = window.document.importNode(template.content, true);
		photosArea.appendChild(clone);	
}

window.onload = function (){
	bindSelectFolderClick(function (folderPath){
		hideSelectFolderButton();
		findAllFiles(folderPath, function (err, files){
			//console.log(err);
			//console.log(files);
			if (!err) {
				findImageFiles(files, folderPath, function (imageFiles){
					console.log(imageFiles);
				});
			}
		});
	});
	//Add the function soon to complete the heirarchy of function coupling.
};