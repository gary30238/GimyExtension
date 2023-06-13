var startTime = document.querySelector('#startTime');
var endTime = document.querySelector('#endTime');

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#setStorage').addEventListener('click', function() {
    window.close();
    setStorage();
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function(tabs) {
      chrome.tabs.reload(tabs[0].id);
    });
  });
  startTime.addEventListener('change', function(e) {
    if (e.target.value < Number(startTime.min)) {
      startTime.value = ""
    } else if (e.target.value > Number(startTime.max)) {
      e.target.value = Number(startTime.max)
    }
  });
  endTime.addEventListener('change', function(e) {
    if (e.target.value < Number(endTime.min)) {
      endTime.value = ""
    } else if (e.target.value > Number(endTime.max)) {
      e.target.value = Number(endTime.max)
    }
  });
  getStorage();
});

function setStorage() {
  chrome.storage.sync.set({
    "start": startTime.value,
    "end": endTime.value
  }).then(() => {});
}

function getStorage() {
  chrome.storage.sync.get(['start'], res => {
    console.log(res.start)
    startTime.value = res.start
  })
  chrome.storage.sync.get(['end'], res => {
    console.log(res.end)
    endTime.value = res.end
  })
}

function delStorage(name) {
  StorageArea.remove([name], function() {});
}
