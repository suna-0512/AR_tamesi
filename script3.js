var image = document.querySelector('#snap');
var take_photo_btn = document.querySelector('#take-photo');
var delete_photo_btn = document.querySelector('#delete-photo');
var download_photo_btn = document.querySelector('#download-photo');

//スナップショットを撮る
function takeSnapshot(video) {
	var Canvas = document.createElement("canvas");
	var Context = Canvas.getContext("2d");
	var width = video.videoWidth;
	var height = video.videoHeight;
	var aScene = document.querySelector("a-scene").components.screenshot.getCanvas("perspective");

	console.log("ascene="+aScene)
	console.log("video="+video)

	result = Canvas.toDataURL('image/png');
	console.log("result="+result)

	console.log(width)


	Context.drawImage(video, 0, 0, 1000,1000);

	Context.drawImage(aScene, 0, 0, 1000,1000);

	return result
}




//スナップショットボタン
take_photo_btn.addEventListener("click", function (e) {
	e.preventDefault();
	var video = document.querySelector('video');
	var snap = takeSnapshot(video);

	//スナップショット表示.
	image.setAttribute('src', snap);
	image.classList.add('visible');

	// 削除ボタンと保存ボタン有効
	delete_photo_btn.classList.remove("disabled");
	download_photo_btn.classList.remove("disabled");

	// 保存ボタンにスナップショットを渡す
	download_photo_btn.href = snap;

	console.log("videosnap="+video)
	console.log("snap="+snap)
});

//削除ボタン
delete_photo_btn.addEventListener("click", function(e){

	e.preventDefault();

	// スナップショットを隠す
	image.setAttribute('src', "");
	image.classList.remove("visible");

	// 削除ボタンと保存ボタン無効
	delete_photo_btn.classList.add("disabled");
	download_photo_btn.classList.add("disabled");

});

