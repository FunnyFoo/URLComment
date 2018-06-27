const chrome = window.chrome

export const queryTabs = config => {
  return new Promise((resolve, reject) => {
    try {
      chrome.tabs.query(config, tabs => {
        resolve(tabs)
      })
    } catch (e) {
      reject(e)
    }
  })
}
