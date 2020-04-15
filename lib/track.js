export const track = function (name, payload) {
  const {heap} = window
  
  if (!heap) return

  heap.track(name, payload)
}