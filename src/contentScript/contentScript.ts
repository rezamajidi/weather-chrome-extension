chrome.runtime.sendMessage("from the contentScript", (res) => {
  console.log(res)
})