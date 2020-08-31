document.addEventListener("DOMContentLoaded", () => {
  var time_in_minutes = document.getElementById("work-time").value;
  var break_length = document.getElementById("break-time").value;
  var long_break_length = document.getElementById("long-break-time").value;
  var current_time = Date.parse(new Date());
  var pomodoroDeadline = new Date(current_time + time_in_minutes * 60 * 1000);
  const timeLeftDisplay = document.getElementById("time-left");
  const currentPhase = document.getElementById("current-phase");
  const submitBtn = document.getElementById("submit-button");
  const startBtn = document.getElementById("start-btn");
  var pomodoroCounter = 0;
  var isPomodoro = true;
  var start = false;
  var submitPress = false;
  let t = time_remaining(pomodoroDeadline);
  const quoteDisplay = document.getElementById("quote-text");
  const authorDisplay = document.getElementById("quote-author");
  var quoteZone = document.getElementById("quote");
  quoteZone.style.opacity = "0";

  const workQuotes = [
    "Concentrate all your thoughts upon the work in hand. The sun's rays do not burn until brought to a focus.",
    "Either you run the day or the day runs you.",
    "I’m a greater believer in luck, and I find the harder I work the more I have of it.",
    "When we strive to become better than we are, everything around us becomes better too.",
    "Opportunity is missed by most people because it is dressed in overalls and looks like work.",
    "You've got to get up every morning with determination if you're going to go to bed with satisfaction.",
    "Don’t judge each day by the harvest you reap but by the seeds that you plant.",
    "Just one small positive thought in the morning can change your whole day.",
    "One of the best pieces of advice I ever got was from a horse master. He told me to go slow to go fast. I think that applies to everything in life. We live as though there aren't enough hours in the day but if we do each thing calmly and carefully we will get it done quicker and with much less stress.",
    "Whether you think you can, or you think you can’t – you’re right.",
    "Time is an equal opportunity employer. Each human being has exactly the same number of hours and minutes every day. Rich people can't buy more hours. Scientists can't invent new minutes. And you can't save time to spend it on another day. Even so, time is amazingly fair and forgiving. No matter how much time you've wasted in the past, you still have an entire tomorrow.",
    "Don’t wish it were easier. Wish you were better.",
    "Do the hard jobs first. The easy jobs will take care of themselves.",
    "Developing a good work ethic is key. Apply yourself at whatever you do, whether you're a janitor or taking your first summer job because that work ethic will be reflected in everything you do in life.",
    "Happiness is not in the mere possession of money; it lies in the joy of achievement, in the thrill of creative effort.",
    "Success means doing the best we can with what we have. Success is the doing, not the getting; in the trying, not the triumph. Success is a personal standard, reaching for the highest that is in us, becoming all that we can be.",
    "The future depends on what you do today.",
    "Do more than is required. What is the distance between someone who achieves their goals consistently and those who spend their lives and careers merely following? The extra mile.",
    "The man who moves a mountain begins by carrying away small stones.",
    "Things may come to those who wait, but only the things left by those who hustle.",
    "Start by doing what’s necessary, then what’s possible; and suddenly you are doing the impossible.",
    "People rarely succeed unless they have fun in what they are doing.",
    "To think too long about doing a thing often becomes its undoing.",
    "Don't be afraid to give your best to what seemingly are small jobs. Every time you conquer one it makes you that much stronger. If you do the little jobs well, the big ones will tend to take care of themselves.",
    "Talent means nothing, while experience, acquired in humility and with hard work, means everything.",
    "You will never plough a field if you only turn it over in your mind.",
    "Don't wait. The time will never be just right.",
    "Success seems to be connected with action. Successful people keep moving. They make mistakes, but they don’t quit.",
    "You don’t have to see the whole staircase, just take the first step.",
    "Dreams can come true, but there is a secret. They're realized through the magic of persistence, determination, commitment, passion, practice, focus and hard work. They happen a step at a time, manifested over years, not weeks.",
    "This is the real secret of life — to be completely engaged with what you are doing in the here and now. And instead of calling it work, realize it is play.",
    "Motivation is a fire from within. If someone else tries to light that fire under you, chances are it will burn very briefly.",
    "Nothing in the world can take the place of perseverance. Talent will not; nothing is more common than unsuccessful people with talent. Genius will not; unrewarded genius is almost legendary. Education will not; the world is full of educated derelicts. Perseverance and determination alone are omnipotent.",
    "Try not to become a person of success, but rather try to become a person of value.",
    "The secret of getting ahead is getting started. The secret of getting started is breaking your complex overwhelming tasks into small manageable tasks, and then starting on the first one.",
    "Happiness is the real sense of fulfillment that comes from hard work.",
    "If I had eight hours to chop down a tree, I’d spend six hours sharpening my ax.",
    "Nothing is less productive than to make more efficient what should not be done at all.",
    "Let me tell you the secret that has led me to my goals: my strength lies solely in my tenacity.",
    "In a moment of decision, the best thing you can do is the right thing to do, the next best thing is the wrong thing, and the worst thing you can do is nothing.",
    "Luck is a matter of preparation meeting opportunity.",
    "It is not a daily increase, but a daily decrease. Hack away at the inessentials.",
    "Don’t be afraid of hard work. Nothing worthwhile comes easily. Don’t let others discourage you or tell you that you can’t do it. In my day I was told women didn’t go into chemistry. I saw no reason why we couldn’t.",
    "If you want to make an easy job seem mighty hard, just keep putting off doing it.",
    "It does not matter how slowly you go, so long as you do not stop.",
    "I am not a product of my circumstances. I am a product of my decisions.",
    "Plenty of men can do good work for a spurt and with immediate promotion in mind, but for promotion you want a man in whom good work has become a habit.",
    "Learn from the mistakes of others. You can’t live long enough to make them all yourselves.",
    "Attitude is a choice. Happiness is a choice. Optimism is a choice. Kindness is a choice. Giving is a choice. Respect is a choice. Whatever choice you make makes you. Choose wisely.",
    "Amateurs sit and wait for inspiration, the rest of us just get up and go to work.",
    "There are no shortcuts to any place worth going.",
    "I would visualize things coming to me. It would just make me feel better. Visualization works if you work hard. That’s the thing. You can’t just visualize and go eat a sandwich.",
    "If you don’t pay appropriate attention to what has your attention, it will take more of your attention than it deserves.",
    "A clay pot sitting in the sun will always be a clay pot. It has to go through the white heat of the furnace to become porcelain.",
    "Think of many things; do one.",
    "If something is wrong, fix it now. But train yourself not to worry, worry fixes nothing.",
    "Much of the stress that people feel doesn't come from having too much to do. It comes from not finishing what they started.",
    "Our greatest fear should not be of failure but of succeeding at things in life that don't really matter.",
    "The price of success is hard work, dedication to the job at hand, and the determination that whether we win or lose, we have applied the best of ourselves to the task at hand.",
    "Once you have commitment, you need the discipline and hard work to get you there.",
    "Whatever you do, do it with all your might. Work at it, early and late, in season and out of season, not leaving a stone unturned, and never deferring for a single hour that which can be done just as well as now.",
    "It isn’t the mountains ahead to climb that wear you out; it’s the pebble in your shoe.",
    "There is no traffic jam along the extra mile.",
    "Your ability to discipline yourself to set clear goals, and then to work toward them every day, will do more to guarantee your success than any other single factor.",
    "Follow effective actions with quiet reflection. From the quiet reflection will come even more effective action.",
  ];
  const personQuoted = [
    "Alexander Graham Bell",
    "Jim Rohn",
    "Thomas Jefferson",
    "Paulo Coelho",
    "Thomas Edison",
    "George Lorimer",
    "Robert Louis Stevenson",
    "Dalai Lama",
    "Viggo Mortensen",
    "Henry Ford",
    "Denis Waitley",
    "Jim Rohn",
    "Dale Carnegie",
    "Tyler Perry",
    "Franklin D. Roosevelt",
    "Zig Ziglar",
    "Mahatma Gandhi",
    "Gary Ryan Blair",
    "Confucius",
    "Abraham Lincoln",
    "Saint Francis",
    "Dale Carnegie",
    "Eva Young",
    "William Patten",
    "Patrick Suskind",
    "Irish Proverb",
    "Napoleon Hill",
    "Conrad Hilton",
    "Martin Luther King, Jr.",
    "Elbert Hubbard",
    "Alan Wilson Watts",
    "Stephen R. Covey",
    "Calvin Coolidge",
    "Albert Einstein",
    "Mark Twain",
    "Joseph Barbara",
    "Abraham Lincoln",
    "Peter Drucker",
    "Louis Pasteur",
    "Theodore Roosevelt",
    "Seneca",
    "Bruce Lee",
    "Gertrude B. Elion",
    "Olin Miller",
    "Confucius",
    "Stephen Covey",
    "Henry L. Doherty",
    "Chanakya",
    "Roy T. Bennett",
    "Stephen King",
    "Beverly Sills",
    "Jim Carrey",
    "David Allen",
    "Mildred Struven",
    "Portuguese proverb",
    "Ernest Hemingway",
    "David Allen",
    "Francis Chan",
    "Vince Lombardi",
    "Haile Gebrselassie",
    "Margaret Fuller",
    "Muhammad Ali",
    "Roger Staubach",
    "Brian Tracy",
    "Peter Drucker",
  ];
  var quotePresent = false;

  (() => {
    if (t.seconds === 0) {
      timeLeftDisplay.innerHTML = t.minutes + ":00";
    } else {
      timeLeftDisplay.innerHTML = t.minutes + ":" + t.seconds;
    }
  })();

  function generateDeadline(length) {
    current_time = Date.parse(new Date());
    pomodoroDeadline = new Date(current_time + length * 60 * 1000);
    run_clock(pomodoroDeadline);
  }

  function time_remaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    return {
      total: t,
      minutes: minutes,
      seconds: seconds,
    };
  }

  var timeinterval;
  function run_clock(endtime) {
    if (paused) return;
    function update_clock() {
      let t = time_remaining(endtime);
      if (t.seconds < 10) {
        timeLeftDisplay.innerHTML = t.minutes + ":0" + t.seconds;
      } else {
        timeLeftDisplay.innerHTML = t.minutes + ":" + t.seconds;
      }
      if (t.total <= 0) {
        if (isPomodoro) {
          pomodoroCounter++;
        }
        clearInterval(timeinterval);
        if (isPomodoro && pomodoroCounter % 4 === 0) {
          bellRing();
          isPomodoro = false;
          generateDeadline(long_break_length);
          currentPhase.innerHTML = "Take a long break!";
          return;
        }
        if (isPomodoro) {
          bellRing();
          isPomodoro = false;
          generateDeadline(break_length);
          currentPhase.innerHTML = "Take a short break!";
          return;
        } else {
          bellRing();
          isPomodoro = true;
          generateDeadline(time_in_minutes);
          currentPhase.innerHTML = "Productivity time!";
          generateQuote();
          return;
        }
      }
    }
    update_clock(); // run function once at first to avoid delay
    timeinterval = setInterval(update_clock, 1000);
  }

  var paused = false; // is the clock paused?
  var time_left; // time left on the clock when paused

  function pause_clock() {
    if (!paused) {
      paused = true;
      clearInterval(timeinterval); // stop the clock
      time_left = time_remaining(pomodoroDeadline).total; // preserve remaining time
      startBtn.innerHTML = "Resume";
      return;
    }
    if (paused) {
      paused = false;
      // update the deadline to preserve the amount of time remaining
      pomodoroDeadline = new Date(Date.parse(new Date()) + time_left);
      startBtn.innerHTML = "Pause";
      // start the clock
      run_clock(pomodoroDeadline);
      return;
    }
  }

  function generateQuote() {
    if (quotePresent) {
      quoteZone.style.opacity = "0";
    }
    setTimeout(function () {
      var x = Math.floor(Math.random() * 65);
      quoteDisplay.innerHTML = workQuotes[x];
      authorDisplay.innerHTML = personQuoted[x];
      quoteZone.style.opacity = "1";
    }, 2000);
    quotePresent = true;
  }

  submitBtn.addEventListener("click", () => {
    submitPress = true;
    time_in_minutes = document.getElementById("work-time").value;
    break_length = document.getElementById("break-time").value;
    long_break_length = document.getElementById("long-break-time").value;
    timeLeftDisplay.innerHTML = time_in_minutes + ":00";
    var inputForm = document.getElementById("length-input");
    inputForm.style.opacity = "0";
    setTimeout(function () {
      inputForm.remove();
    }, 1000);

    current_time = Date.parse(new Date());
    pomodoroDeadline = new Date(current_time + time_in_minutes * 60 * 1000);
    let t = time_remaining(pomodoroDeadline);
    if (t.seconds < 10) {
      timeLeftDisplay.innerHTML = t.minutes + ":0" + t.seconds;
    } else {
      timeLeftDisplay.innerHTML = t.minutes + ":" + t.seconds;
    }
  });
  // handle pause and resume button clicks
  startBtn.addEventListener("click", () => {
    if (start === false) {
      if (!submitPress) {
        var inputForm = document.getElementById("length-input");
        inputForm.style.opacity = "0";
        setTimeout(function () {
          inputForm.remove();
        }, 1000);
      }
      generateQuote();
      currentPhase.innerHTML = "Productivity time!";
      generateDeadline(time_in_minutes);
      start = true;
      startBtn.innerHTML = "Pause";
      return;
    }
    pause_clock();
  });

  function bellRing() {
    var audio = new Audio("http://soundbible.com/grab.php?id=2205&type=mp3");
    audio.play();
  }
});
