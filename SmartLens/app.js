//Dependencies
var fs = require('fs');
var mime = require('mime');
var path = require('path');
var gui = require('nw.gui');

var photoData = null;

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
		template.content.querySelector('img').src = 'images/blank.png';
		template.content.querySelector('img').setAttribute('data-echo', file.path);
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


function applyFilter (filterName){
	Caman('#image', function (){
		/*this.brightness(10);
		this.sepia(20);
		this.saturation(30);
		this.render();*/
		this.reset();
		filters[filterName](this);
	});
}



function saveToDisk (){
	var photoSaver = document.querySelector('#photoSaver');
	var canvas = document.querySelector('canvas');
	photoSaver.setAttribute('nwsaveas','Copy of' + canvas.attributes['data-name'].value);
	photoData = canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
	photoSaver.click();
}


function bindSavingToDisk (){
	var photoSaver  = document.querySelector('#photoSaver');
	photoSaver.addEventListener('change', function () {
		var filePath = this.value;
		fs.writefile(filepath, photoData, 'base64', function (err){
			if (err) { alert('Please try again ! Error generated while saving memory:',err.message);}
			photoData = null;	
		});
	});
}


function backToGridView (){
	var canvas = document.querySelector('canvas');
	if(canvas){
			var image = document.createElement('img');
			image.setAttribute('id','image');
			canvas.parentNode.removeChild(canvas);
			var fullViewPhoto = document.querySelector('#fullViewPhoto');
			fullViewPhoto.insertBefore(image, fullViewPhoto.firstChild);
	}
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


function clearArea () {
	document.getElementById('photoes').innerHTML = '';
}


function loadAnotherFolder (){
	openFolderDialog(function (folderPath) {
		findAllFiles(folderPath, function(err, files){
			if (!err) {
				clearArea();
				echo.init({
					offset: 0;
					throttle: 0;
					unload: false
				});
				findImageFiles(files, folderPath, function (imageFiles) {
					imageFiles.forEach(function (file, index) {
						addImageToPhotosArea(file);
						if (index === imageFiles.length-1){
							echo.render();
							bindClickingOnAllPhotos();
							bindSavingToDisk();
						}
					});
				});
			}
		});
	});
}


function loadMenu (){
	var menuBar = new gui.Menu({type:'member'});
	var menuItems = new gui.Menu();

	menuItems.append(new gui.MenuItem({ label: 'Load Another Folder', click: loadAnotherFolder }));
	var fileMenu = new gui.MenuItem({
		label: 'File',
		submenu: menuItems
	});

	if (process.platform === 'darwin') {

		// Load MacOSX application menu
		menuBar.createMacBuiltin('SmartLens');
		menuBar.insert(fileMenu, 1);
	} else {

		// Load Windows/Linux application menu
		menuBar.append(fileMenu, 1);
	}

	gui.Window.get().menu = menuBar;
}


window.onload = function (){

	echo.init({    //Initialisation for lazy loading of memories
		offset: 0,
		throttle: 0,
		unload: false
	});

	bindSelectFolderClick(function (folderPath){
		loadMenu();
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
							echo.render(); //rendering function for triggering of lazy-loading
							bindClickingOnAllPhotoes();
							bindSavingToDisk();
						}
					});
				});
			}
		});
	});
	//Add the function soon to complete the heirarchy of function coupling.
};