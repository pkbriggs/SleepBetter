QUIZ_QUESTIONS = [
  "During which part of sleep do people dream?",
  "How long is one sleep cycle?",
  "How long should it take a well rested, healthy adult to fall asleep?",
  "How much sleep does the average 25-55 year old person need?",
  "How long has sleep been a highly researched topic?",
  "What is the most common cause of sleep disruption?",
  "Which of the following does NOT happen when you sleep?",
  "What percent of American adults sleep less than 7 hours per night?",
  "How many auto crashes are caused by drowsy drivers every year?",
  "What percent of their life does the average person spend sleeping?"
]

QUIZ_POTENTIAL_ANSWERS = [
  ["REM Sleep", "Non-REM Sleep", "Deep Sleep", "Polygraphic Sleep"],
  ["30 minutes", "1 hour", "90 minutes", "8 hours"],
  ["0-5 minutes", "5-10 minutes", "15-20 minutes", "30-45 minutes"],
  ["4-5 hours", "7-8 hours", "6-7 hours", "9-10 hours"],
  ["Since the 1950s", "Since 200 B.C.", "Since the 1800s", "Since the 1920s"],
  ["Nightmares", "Stress", "Noise", "Sleep apnea"],
  ["Your brain recharges", "Your cells repair themselves", "Your body releases important hormones", "Your brain turns off"],
  ["5 percent", "15 percent", "30 percent", "45 percent"],
  ["10,000 crashes", "25,000 crashes", "50,000 crashes", "100,000 crashes"],
  ["1/3", "1/4", "1/2", "2/5"]
]

QUIZ_ANSWERS = [
  "1",
  "3",
  "3",
  "2",
  "1",
  "4",
  "4",
  "3",
  "4",
  "1"
]

INNER_PROGRESS_BAR_MAX_LENGTH = 294
INNER_PROGRESS_BAR_INCREMENT = INNER_PROGRESS_BAR_MAX_LENGTH / QUIZ_QUESTIONS.length

class @Quiz
  constructor: ->
    # initialize variables
    @num_questions_correct = 0
    @num_questions_incorrect = 0
    @current_question_num = 0

    @init_event_handlers()

  init_event_handlers: ->
    console.log "Initializing event handlers"
    $(".next_button").click =>
      console.log "Have a click"
      @record_user_answer()
      if @current_question_num < QUIZ_QUESTIONS.length - 1 # -1 because we are 0-indexed here
        @show_next_question()
      else
        @show_end_quiz()

  get_correct_answer_for_curr_question: ->
    return QUIZ_ANSWERS[@current_question_num]

  record_user_answer: ->
    console.log "Recording user answer"
    checked_radio_button = $("input[name=answer]:checked")
    users_answer = checked_radio_button.val()
    correct_answer = @get_correct_answer_for_curr_question()
    if users_answer == correct_answer
      console.log "Correct answer!"
      @num_questions_correct += 1
    else
      console.log "Incorrect answer!"
      @num_questions_incorrect += 1
    checked_radio_button.prop 'checked', false

  update_progress_bar: ->
    # Update the bar
    current_width = $(".bar_progress").width()
    new_width = current_width + INNER_PROGRESS_BAR_INCREMENT
    $(".bar_progress").width(new_width)

    # Update the text ("X% complete")
    percent_complete = Math.ceil((@num_questions_incorrect + @num_questions_correct) / QUIZ_QUESTIONS.length * 100)
    $(".progress_bar_text_number").text(percent_complete)

  show_next_question: ->
    console.log "Showing next question"
    @current_question_num += 1
    @update_progress_bar()

    # Update the question
    $(".quiz_question").text(QUIZ_QUESTIONS[@current_question_num])

    # Update the potential answers
    $(".response_1_text").text(QUIZ_POTENTIAL_ANSWERS[@current_question_num][0])
    $(".response_2_text").text(QUIZ_POTENTIAL_ANSWERS[@current_question_num][1])
    $(".response_3_text").text(QUIZ_POTENTIAL_ANSWERS[@current_question_num][2])
    $(".response_4_text").text(QUIZ_POTENTIAL_ANSWERS[@current_question_num][3])

  show_end_quiz: ->
    fraction_correct = "#{@num_questions_correct}/#{QUIZ_QUESTIONS.length}"
    swal
      "title": "Good job!",
      "text": "You got #{fraction_correct} questions correct! Next, we're going to view your specialized learning 'roadmap' so you can begin your sleep journey!",
      "type": "success"
    , ->
      window.location.href = "/roadmap.html"
    # $(".quiz_question").text "Congratulations!"
    # $(".post_quiz_num_correct").text @num_questions_correct
    # $(".post_quiz_total_num_questions").text QUIZ_QUESTIONS.length
    # $(".post_quiz_message").css "display": "block"


$(document).ready ->
  new Quiz()
