// カメラ画像が撮れる＋保存できるが、ARは写真に映らない

async function main () {
  try {
		//HTMLから取得
    const video = document.querySelector('#video') // <1>
    const button = document.querySelector('#button')
    const image = document.querySelector('#image')

		//ここでユーザーのデバイスカメラからの情報を取得
    const stream = await navigator.mediaDevices.getUserMedia({ // <2>
      video: {
        facingMode: 'user',   //内カメ?
        //facingMode: 'environment',  //外カメ?
      },
      audio: false,
    })

		//
    video.srcObject = stream // <3>		//メディアソースを提供するオブジェクトを設定または取得

    const [track] = stream.getVideoTracks()
    const settings = track.getSettings()
    const {width, height} = settings // <4>


		//撮影ボタンが押されたときの処理
    button.addEventListener('click', event => { // <5>
      const canvas = document.createElement('canvas') // <6>
      canvas.setAttribute('width', width)	//id=canvasの要素の、widthという属性をwidth(変数)に指定する
      canvas.setAttribute('height', height)

      const context = canvas.getContext('2d')
      context.drawImage(video, 0, 0, width, height) // <7>

      const dataUrl = canvas.toDataURL('image/png') // <8>
      image.setAttribute('src', dataUrl) // <9>

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