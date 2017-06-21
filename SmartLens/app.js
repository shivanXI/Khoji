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



function displayPhotoInFullView (photo){
	var filePath = photo.querySelector('img').src;
	var fileName = photo.querySelector('img').attributes[1].value;
	document.querySelector('#fullViewPhoto > img').src = filePath;
	document.querySelector('#fullViewPhoto > img').setAttribute('data-name', fileName);
	document.querySelector('#fullViewPhoto').style.display = 'block';
}


var filters = {
	original: function () {},

	grayscale: function (item) {
		item.saturation(-100);
		item.render();
	},
	sepia: function (item) {
		item.saturation(-100);
		item.vibrance(100);
		item.sepia(100);
		item.render();
	},
	sunburst: function (item) {
		item.brightness(21);
		item.vibrance(22);
		item.contrast(11);
		item.saturation(-18);
		item.exposure(18);
		item.sepia(17);
		item.render();
	},
	port: function (item) {
		item.vibrance(49);
		item.hue(6);
		item.gamma(0.6);
		item.stackBlur(2);
		item.contrast(11);
		item.saturation(19);
		item.exposure(2);
		item.noise(2);
		item.render();
	}
};


function applyFilter (){
	Caman('#image', function (){
		this.brightness(10);
		this.sepia(20);
		this.saturation(30);
		this.render();
	});
}

function backToGridView (){
	var canvas = document.querySelector('canvas');
	var image = document.createElement('img');
	image.setAttribute('id','image');
	canvas.parentNode.removeChild(canvas);
	var fullViewPhoto = document.querySelector('#fullViewPhoto');
	fullViewPhoto.insertBefore(image, fullViewPhoto.firstChild);
	document.querySelector('#fullViewPhoto').style.display = 'none';
}


function bindClickingOnAPhoto (photo){
	photo.onclick = function (){
		displayPhotoInFullView(photo);
	};
}


function bindClickingOnAllPhotos (){
	var photos = document.querySelector('.photo');
	for(var i=0;i<photos.length;i++){
		var photo = photos[i];
		bindClickingOnAPhoto(photo);
	}
}

window.onload = function (){
	bindSelectFolderClick(function (folderPath){
		hideSelectFolderButton();
		findAllFiles(folderPath, function (err, files){
			//console.log(err);
			//console.log(files);
			if (!err) {
				findImageFiles(files, folderPath, function (imageFiles){
					//console.log(imageFiles);
					imageFiles.forEach(function (file, index){
						addImageToPhotosArea(file);
						if(index === imageFiles.length-1){
							bindClickingOnAllPhotoes();
						}
					});
				});
			}
		});
	});
	//Add the function soon to complete the heirarchy of function coupling.
};