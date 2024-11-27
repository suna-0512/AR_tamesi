// カメラ画像が撮れる＋保存できるが、ARは写真に映らない

async function main () {
  try {
		//HTMLから要素を取得
    const video = document.querySelector('#video') // <1>
    const image = document.querySelector('#image')
		const cameraBtn = document.querySelector('#cameraButton');

		//ここでユーザーのデバイスカメラからの情報を取得
    const stream = await navigator.mediaDevices.getUserMedia({ // <2>
			//取得する動画の詳細指定
      video: {  
        //facingMode: 'user',   //内カメ?
        facingMode: 'environment',  //外カメ?
      },

			//音声はfalse:取得しない
      audio: false,  
    })

		//取得した動画をHTML内のvideo要素のsrc=""属性に代入する
    video.srcObject = stream // <3>	

		//動画のサイズを取得
    const [track] = stream.getVideoTracks()
    const settings = track.getSettings()
    const {width, height} = settings // <4>


		//撮影ボタンが押されたときの処理
    cameraBtn.addEventListener('click', event => { // <5>

			//canvas要素を取得
      const canvas = document.createElement('canvas') // <6>

			//canvasの大きさを設定
      canvas.setAttribute('width', width)	//id=canvasの要素の、widthという属性をwidth(27行目で定義した変数)に指定する
      canvas.setAttribute('height', height)

			//2Dグラフィックを描画するためのメソッドやプロパティをもつオブジェクトを取得。
      const canv = canvas.getContext('2d')

			//キャンバス上にvideoを描画
      canv.drawImage(video, 0, 0, width, height) // <7>

			//canvas上に描画された画像をURLに
      const dataUrl = canvas.toDataURL('image/png') // <8>

			//撮った写真を画面上の<img>に表示させる
      image.setAttribute('src', dataUrl) // <9>

			//確認
			console.log(dataUrl)



			//データの保存
			const a = document.createElement("a");// a要素の作成
			a.href = dataUrl // href属性のセット
			a.download = "image.png";// ファイル名のセット
			a.click();// 疑似的にクリック

    })

  } catch (err) {
    console.error(err)
  }
}

main()