var INNER_PROGRESS_BAR_INCREMENT, INNER_PROGRESS_BAR_MAX_LENGTH, QUIZ_ANSWERS, QUIZ_POTENTIAL_ANSWERS, QUIZ_QUESTIONS;

QUIZ_QUESTIONS = ["During which part of sleep do people dream?", "How long is one sleep cycle?", "How long should it take a well rested, healthy adult to fall asleep?", "How much sleep does the average 25-55 year old person need?", "How long has sleep been a highly researched topic?", "What is the most common cause of sleep disruption?", "Which of the following does NOT happen when you sleep?", "What percent of American adults sleep less than 7 hours per night?", "How many auto crashes are caused by drowsy drivers every year?", "What percent of their life does the average person spend sleeping?"];

QUIZ_POTENTIAL_ANSWERS = [["REM Sleep", "Non-REM Sleep", "Deep Sleep", "Polygraphic Sleep"], ["30 minutes", "1 hour", "90 minutes", "8 hours"], ["0-5 minutes", "5-10 minutes", "15-20 minutes", "30-45 minutes"], ["4-5 hours", "7-8 hours", "6-7 hours", "9-10 hours"], ["Since the 1950s", "Since 200 B.C.", "Since the 1800s", "Since the 1920s"], ["Nightmares", "Stress", "Noise", "Sleep apnea"], ["Your brain recharges", "Your cells repair themselves", "Your body releases important hormones", "Your brain turns off"], ["5 percent", "15 percent", "30 percent", "45 percent"], ["10,000 crashes", "25,000 crashes", "50,000 crashes", "100,000 crashes"], ["1/3", "1/4", "1/2", "2/5"]];

QUIZ_ANSWERS = ["1", "3", "3", "2", "1", "4", "4", "3", "4", "1"];

INNER_PROGRESS_BAR_MAX_LENGTH = 294;

INNER_PROGRESS_BAR_INCREMENT = INNER_PROGRESS_BAR_MAX_LENGTH / QUIZ_QUESTIONS.length;

this.Quiz = (function() {
  function Quiz() {
    this.num_questions_correct = 0;
    this.num_questions_incorrect = 0;
    this.current_question_num = 0;
    this.init_event_handlers();
  }

  Quiz.prototype.init_event_handlers = function() {
    console.log("Initializing event handlers");
    return $(".next_button").click((function(_this) {
      return function() {
        console.log("Have a click");
        _this.record_user_answer();
        if (_this.current_question_num < QUIZ_QUESTIONS.length - 1) {
          return _this.show_next_question();
        } else {
          return _this.show_end_quiz();
        }
      };
    })(this));
  };

  Quiz.prototype.get_correct_answer_for_curr_question = function() {
    return QUIZ_ANSWERS[this.current_question_num];
  };

  Quiz.prototype.record_user_answer = function() {
    var checked_radio_button, correct_answer, users_answer;
    console.log("Recording user answer");
    checked_radio_button = $("input[name=answer]:checked");
    users_answer = checked_radio_button.val();
    correct_answer = this.get_correct_answer_for_curr_question();
    if (users_answer === correct_answer) {
      console.log("Correct answer!");
      this.num_questions_correct += 1;
    } else {
      console.log("Incorrect answer!");
      this.num_questions_incorrect += 1;
    }
    return checked_radio_button.prop('checked', false);
  };

  Quiz.prototype.update_progress_bar = function() {
    var current_width, new_width, percent_complete;
    current_width = $(".bar_progress").width();
    new_width = current_width + INNER_PROGRESS_BAR_INCREMENT;
    $(".bar_progress").width(new_width);
    percent_complete = Math.ceil((this.num_questions_incorrect + this.num_questions_correct) / QUIZ_QUESTIONS.length * 100);
    return $(".progress_bar_text_number").text(percent_complete);
  };

  Quiz.prototype.show_next_question = function() {
    console.log("Showing next question");
    this.current_question_num += 1;
    this.update_progress_bar();
    $(".quiz_question").text(QUIZ_QUESTIONS[this.current_question_num]);
    $(".response_1_text").text(QUIZ_POTENTIAL_ANSWERS[this.current_question_num][0]);
    $(".response_2_text").text(QUIZ_POTENTIAL_ANSWERS[this.current_question_num][1]);
    $(".response_3_text").text(QUIZ_POTENTIAL_ANSWERS[this.current_question_num][2]);
    return $(".response_4_text").text(QUIZ_POTENTIAL_ANSWERS[this.current_question_num][3]);
  };

  Quiz.prototype.show_end_quiz = function() {
    var fraction_correct;
    fraction_correct = this.num_questions_correct + "/" + QUIZ_QUESTIONS.length;
    return swal({
      "title": "Good job!",
      "text": "You got " + fraction_correct + " questions correct! Next, we're going to view your specialized learning 'roadmap' so you can begin your sleep journey!",
      "type": "success"
    }, function() {
      return window.location.href = "/roadmap.html";
    });
  };

  return Quiz;

})();

$(document).ready(function() {
  return new Quiz();
});
