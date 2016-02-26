var reset_progress;

reset_progress = function() {
  return swal({
    "title": "Reset Progress?",
    "text": "Are you sure you want to do this? You will lose all your progress.",
    "type": "warning",
    "showCancelButton": true,
    "confirmButtonColor": "#FC7460",
    "confirmButtonText": "Yes, do it!",
    "closeOnConfirm": true
  }, function() {
    localStorage.removeItem("basics-progress");
    localStorage.removeItem("essentials-progress");
    localStorage.removeItem("dreaming-progress");
    localStorage.removeItem("disorders-progress");
    localStorage.removeItem("current-stop");
    return location.reload();
  });
};

$(document).ready(function() {
  var basics_progress, current_stop, disorders_progress, dreaming_progress, essentials_progress;
  $(".reset_progress_button").click(function() {
    return reset_progress();
  });
  if (window.localStorage) {
    current_stop = localStorage.getItem("current-stop");
    if (!current_stop) {
      current_stop = "0";
    }
    $(".roadmap_image").attr("src", "img/roadmap_" + current_stop + ".png");
    $(".floating_button").addClass("stop" + current_stop);
    $(".stop" + current_stop + "_container").addClass("current_stop");
    basics_progress = localStorage.getItem("basics-progress");
    if (basics_progress) {
      $(".basics_topics_completed").text(basics_progress);
    }
    essentials_progress = localStorage.getItem("essentials-progress");
    if (essentials_progress) {
      $(".essentials_topics_completed").text(essentials_progress);
    }
    dreaming_progress = localStorage.getItem("dreaming-progress");
    if (dreaming_progress) {
      $(".dreaming_topics_completed").text(dreaming_progress);
    }
    disorders_progress = localStorage.getItem("disorders-progress");
    if (disorders_progress) {
      $(".disorders_topics_completed").text(disorders_progress);
    }
    if (current_stop === "0") {
      return $(".floating_button").attr("href", "basics/importance.html");
    } else if (current_stop === "1") {
      return $(".floating_button").attr("href", "essentials/sleep-debt.html");
    } else if (current_stop === "2") {
      return $(".floating_button").attr("href", "dreaming/purpose-of-dreaming.html");
    } else if (current_stop === "3") {
      return $(".floating_button").attr("href", "disorders/insomnia.html");
    } else if (current_stop === "4") {
      return $(".floating_button").click(function() {
        return reset_progress();
      });
    }
  } else {
    return $(".roadmap_image").attr("src", "img/roadmap_0.png");
  }
});
