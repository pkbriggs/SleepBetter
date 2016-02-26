$(document).ready ->
  if window.localStorage
    # set the current stop
    current_stop = localStorage.getItem("current-stop")
    if !current_stop
      current_stop = 0
    $(".roadmap_image").attr "src", "img/roadmap_#{current_stop}.png"

    # set the progress trackers on the right
  else
    $(".roadmap_image").attr "src", "img/roadmap_0.png"
