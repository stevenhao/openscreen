// wrapper around localstorage to use it to make it implement a virtual dictionary:
// {
//   screenId: screenData,
// }

// overload []??? nahhhh
export default class Storage {
  // TODO LRU stuff because ummmmm 5MB isn't that much,
  // if you want to have multiple screens for some reason
  // (e.g. you messed up the first 4 times you tried to use the app)
  set(screenId, screenData) {
    const json = JSON.stringify(screenData)
    // TODO this might crash when we run out of space
    localStorage.setItem(screenId, json)
  }

  get(screenId, screenData) {
    const json = localStorage.getItem(screenId, screenData)
    return JSON.parse(json)
  }
}

