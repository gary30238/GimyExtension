var bd, vd, iframe1, endTime;

function gimyFullscreen() {
  if (!document.fullscreen) {
    if (vd.requestFullscreen) {
      iframe1.requestFullscreen();
    } else if (vd.mozRequestFullScreen) {
      iframe1.mozRequestFullScreen();
    } else if (vd.webkitRequestFullScreen) {
      iframe1.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  }
}

var interval = setInterval(() => {

  bd = document.querySelector("body");
  vd = document.querySelector("#playerCnt > iframe").contentWindow.document.querySelector("#lelevideo");
  iframe1 = document.querySelector("#playerCnt > iframe");

  if (vd.readyState == 4) {

    console.log('start')
    bd.addEventListener('click',
      gimyFullscreen,
      false
    );
    chrome.runtime.sendMessage({
      text: "hey"
    }, function(response) {
      console.log("Response: ", response);
    });

    setTimeout(() => {
      console.log('finish')
      bd.removeEventListener('click',
        gimyFullscreen,
        false
      );
    }, 1000)
    chrome.storage.sync.get(['start'], res => {
      if (Number(res.start) >= 1) {
        vd.currentTime = Number(res.start)
      } else {
        chrome.storage.sync.remove(['start'], function() {});
      }
    })

    clearInterval(interval);
  } else {
    console.log('load')
  }
}, 5000)

setTimeout(() => {
  chrome.storage.sync.get(['end'], res => {
    var endClock = setInterval(() => {
      if (Number(res.end) >= 1) {
        if (vd.currentTime + Number(res.end) >= vd.duration) {
          document.querySelector("#next").click()
          clearInterval(endClock);
        }
      } else {
        chrome.storage.sync.remove(['end'], function() {});
        clearInterval(endClock);
      }
    }, 1000)
  })
}, 5000)
