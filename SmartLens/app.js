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

window.onload = function (){
	bindSelectFolderClick(function (folderPath){
		hideSelectFolderButton();
	});
	//Add the function soon to complete the heirarchy of function coupling.
};