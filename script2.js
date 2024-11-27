
async function main () {



//撮影ボタンが押されたときの処理
button.addEventListener('click', event => { // <5>


	// キャンパス要素を取得 (既に描画されている)
	var canvases = document.getElementsByClassName( "a-canvas" ) ;
	var canvas = canvases[0]
	console.log(canvases,canvas)

	// JPGにする場合 (第2引数は品質)
	var dataUrl = canvas.toDataURL( "image/jpg")


	//データの保存
	const a = document.createElement("a");// a要素の作成
	a.href = dataUrl // href属性のセット
	a.download = "image.jpg";// ファイル名のセット
	a.click();// 疑似的にクリック

})


}

main()