$(document).ready ->
  path = window.location.pathname
  if path == "/basics/importance.html"
    localStorage.setItem("basics-progress", "1")
  else if path == "/basics/what-is-sleep.html"
    localStorage.setItem("basics-progress", "2")
  else if path == "/basics/sleep-stages.html"
    localStorage.setItem("basics-progress", "3")
    localStorage.setItem("current-stop", "1")
  else if path == "/essentials/sleep-debt.html"
    localStorage.setItem("essentials-progress", "1")
  else if path == "/essentials/sleep-deprivation.html"
    localStorage.setItem("essentials-progress", "2")
  else if path == "/essentials/non-rem-sleep.html"
    localStorage.setItem("essentials-progress", "3")
  else if path == "/essentials/rem-sleep.html"
    localStorage.setItem("essentials-progress", "4")
    localStorage.setItem("current-stop", "2")
  else if path == "/dreaming/purpose-of-dreaming.html"
    localStorage.setItem("dreaming-progress", "1")
  else if path == "/dreaming/lucid-dreaming.html"
    localStorage.setItem("dreaming-progress", "2")
    localStorage.setItem("current-stop", "3")
  else if path == "/disorders/insomnia.html"
    localStorage.setItem("disorders-progress", "1")
  else if path == "/disorders/sleep-apnea.html"
    localStorage.setItem("disorders-progress", "2")
  else if path == "/disorders/narcolepsy.html"
    localStorage.setItem("disorders-progress", "3")
    localStorage.setItem("current-stop", "4")







