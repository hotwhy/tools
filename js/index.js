let blobs = []
let imgUrl = 'url(./imgs/template1.jpg) no-repeat'

// 生成canvas图像
document.querySelector('#btn').onclick = function () {
  resetCanvases()
  let names = document.querySelector('#names').value
  let namesArr = names && names.split('\n').filter(item => {
    return !!item
  }).map(item => {
    return item.length > 7 ? `${item.substring(0, 7)}...` : item
  }) || []
  if (namesArr.length) {
    namesArr.forEach((item, i) => {
      let div = document.createElement("div")
      div.setAttribute('class', 'bg')
      div.setAttribute('style', `background: ${imgUrl}`)
      div.dataset.item = item
      div.id = `bg${i}`
      div.innerHTML = `<div><span>恭喜</span> <span class="names">${item}</span> <span>同学获得xx编程</span></div>`
      document.querySelector('.contents').appendChild(div)
    })
  }else {
    alert('请至少输入一个成员')
    return
  }
}

// 下载图片
document.querySelector('#btnDownLoad').onclick = function () {
  const bgs = document.querySelectorAll('.bg')
  if (!bgs.length) {
    alert('请先生成图片进行预览')
    return
  } else {
    bgs.forEach(item => {
      domtoimage.toBlob(item).then(function (blob) {
        fileName = item.dataset.item
        window.saveAs(blob, `${fileName}.png`);
      });
    })
  }
}


// 清空姓名
document.querySelector('#clearData').onclick = function () {
  document.querySelector('#names').value = ''
}

// 监听selectchange
document.querySelector('#temp').onchange = function () {

  const bgs = document.querySelectorAll('.bg')
  const val = this.value
  imgUrl = `url(./imgs/template${val}.jpg) no-repeat`
  bgs.forEach(item => {
    item.style.background = imgUrl
    item.style.backgroundSize = 'cover'
  })
}

// 移除所有canvas
function resetCanvases () {
  const canvases = document.querySelectorAll('.bg')
  const contents = document.querySelector('.contents')
  canvases.forEach(item => {
    contents.removeChild(item)
  })
}

