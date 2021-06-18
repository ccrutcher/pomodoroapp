document.addEventListener('DOMContentLoaded', () => {
  var time_in_minutes = document.getElementById('work-time').value;
  var break_length = document.getElementById('break-time').value;
  var long_break_length = document.getElementById('long-break-time').value;
  var current_time = Date.parse(new Date());
  var pomodoroDeadline = new Date(current_time + time_in_minutes * 60 * 1000);
  const timeLeftDisplay = document.getElementById('time-left');
  const currentPhase = document.getElementById('current-phase');
  const submitBtn = document.getElementById('submit-button');
  const startBtn = document.getElementById('start-btn');
  var pomodoroCounter = 0;
  var isPomodoro = true;
  var start = false;
  var submitPress = false;
  let t = time_remaining(pomodoroDeadline);
  const quoteDisplay = document.getElementById('quote-text');
  const authorDisplay = document.getElementById('quote-author');
  var quoteZone = document.getElementById('quote');
  quoteZone.style.opacity = '0';

  const quotes = [
    {
      'author': 'Alexander Graham Bell',
      'quote':  "Concentrate all your thoughts upon the work in hand. The sun's rays do not burn until brought to a focus."
    },
    {
      'author': 'Jim Rohn',
      'quote':  'Either you run the day or the day runs you.'
    },
    {
      'author': 'Thomas Jefferson',
      'quote':  'I’m a greater believer in luck, and I find the harder I work the more I have of it.'
    },
    {
      'author': 'Paulo Coelho',
      'quote':  'When we strive to become better than we are, everything around us becomes better too.'
    },
    {
      'author': 'Thomas Edison',
      'quote':  'Opportunity is missed by most people because it is dressed in overalls and looks like work.'
    },
    {
      'author': 'George Lorimer',
      'quote':  "You've got to get up every morning with determination if you're going to go to bed with satisfaction."
    },
    {
      'author': 'Robert Louis Stevenson',
      'quote':  'Don’t judge each day by the harvest you reap but by the seeds that you plant.'
    },
    {
      'author': 'Dalai Lama',
      'quote':  'Just one small positive thought in the morning can change your whole day.'
    },
    {
      'author': 'Viggo Mortensen',
      'quote':  "One of the best pieces of advice I ever got was from a horse master. He told me to go slow to go fast. I think that applies to everything in life. We live as though there aren't enough hours in the day but if we do each thing calmly and carefully we will get it done quicker and with much less stress."
    },
    {
      'author': 'Henry Ford',
      'quote':  'Whether you think you can, or you think you can’t – you’re right.'
    },
    {
      'author': 'Denis Waitley',
      'quote':  "Time is an equal opportunity employer. Each human being has exactly the same number of hours and minutes every day. Rich people can't buy more hours. Scientists can't invent new minutes. And you can't save time to spend it on another day. Even so, time is amazingly fair and forgiving. No matter how much time you've wasted in the past, you still have an entire tomorrow."
    },
    {
      'author': 'Jim Rohn',
      'quote':  'Don’t wish it were easier. Wish you were better.'
    },
    {
      'author': 'Dale Carnegie',
      'quote':  'Do the hard jobs first. The easy jobs will take care of themselves.'
    },
    {
      'author': 'Tyler Perry',
      'quote':  "Developing a good work ethic is key. Apply yourself at whatever you do, whether you're a janitor or taking your first summer job because that work ethic will be reflected in everything you do in life."
    },
    {
      'author': 'Franklin D. Roosevelt',
      'quote':  'Happiness is not in the mere possession of money; it lies in the joy of achievement, in the thrill of creative effort.'
    },
    {
      'author': 'Zig Ziglar',
      'quote':  'Success means doing the best we can with what we have. Success is the doing, not the getting; in the trying, not the triumph. Success is a personal standard, reaching for the highest that is in us, becoming all that we can be.'
    },
    {
      'author': 'Mahatma Gandhi',
      'quote':  'The future depends on what you do today.'
    },
    {
      'author': 'Gary Ryan Blair',
      'quote':  'Do more than is required. What is the distance between someone who achieves their goals consistently and those who spend their lives and careers merely following? The extra mile.'
    },
    {
      'author': 'Confucius',
      'quote':  'The man who moves a mountain begins by carrying away small stones.'
    },
    {
      'author': 'Abraham Lincoln',
      'quote':  'Things may come to those who wait, but only the things left by those who hustle.'
    },
    {
      'author': 'Saint Francis',
      'quote':  'Start by doing what’s necessary, then what’s possible; and suddenly you are doing the impossible.'
    },
    {
      'author': 'Dale Carnegie',
      'quote':  'People rarely succeed unless they have fun in what they are doing.'
    },
    {
      'author': 'Eva Young',
      'quote':  'To think too long about doing a thing often becomes its undoing.'
    },
    {
      'author': 'William Patten',
      'quote':  "Don't be afraid to give your best to what seemingly are small jobs. Every time you conquer one it makes you that much stronger. If you do the little jobs well, the big ones will tend to take care of themselves."
    },
    {
      'author': 'Patrick Suskind',
      'quote':  'Talent means nothing, while experience, acquired in humility and with hard work, means everything.'
    },
    {
      'author': 'Irish Proverb',
      'quote':  'You will never plough a field if you only turn it over in your mind.'
    },
    {
      'author': 'Napoleon Hill',
      'quote':  "Don't wait. The time will never be just right."
    },
    {
      'author': 'Conrad Hilton',
      'quote':  'Success seems to be connected with action. Successful people keep moving. They make mistakes, but they don’t quit.'
    },
    {
      'author': 'Martin Luther King, Jr.',
      'quote':  'You don’t have to see the whole staircase, just take the first step.'
    },
    {
      'author': 'Elbert Hubbard',
      'quote':  "Dreams can come true, but there is a secret. They're realized through the magic of persistence, determination, commitment, passion, practice, focus and hard work. They happen a step at a time, manifested over years, not weeks."
    },
    {
      'author': 'Alan Wilson Watts',
      'quote':  'This is the real secret of life — to be completely engaged with what you are doing in the here and now. And instead of calling it work, realize it is play.'
    },
    {
      'author': 'Stephen R. Covey',
      'quote':  'Motivation is a fire from within. If someone else tries to light that fire under you, chances are it will burn very briefly.'
    },
    {
      'author': 'Calvin Coolidge',
      'quote':  'Nothing in the world can take the place of perseverance. Talent will not; nothing is more common than unsuccessful people with talent. Genius will not; unrewarded genius is almost legendary. Education will not; the world is full of educated derelicts. Perseverance and determination alone are omnipotent.'
    },
    {
      'author': 'Albert Einstein',
      'quote':  'Try not to become a person of success, but rather try to become a person of value.'
    },
    {
      'author': 'Mark Twain',
      'quote':  'The secret of getting ahead is getting started. The secret of getting started is breaking your complex overwhelming tasks into small manageable tasks, and then starting on the first one.'
    },
    {
      'author': 'Joseph Barbara',
      'quote':  'Happiness is the real sense of fulfillment that comes from hard work.'
    },
    {
      'author': 'Abraham Lincoln',
      'quote':  'If I had eight hours to chop down a tree, I’d spend six hours sharpening my ax.'
    },
    {
      'author': 'Peter Drucker',
      'quote':  'Nothing is less productive than to make more efficient what should not be done at all.'
    },
    {
      'author': 'Louis Pasteur',
      'quote':  'Let me tell you the secret that has led me to my goals: my strength lies solely in my tenacity.'
    },
    {
      'author': 'Theodore Roosevelt',
      'quote':  'In a moment of decision, the best thing you can do is the right thing to do, the next best thing is the wrong thing, and the worst thing you can do is nothing.'
    },
    {
      'author': 'Seneca',
      'quote':  'Luck is a matter of preparation meeting opportunity.'
    },
    {
      'author': 'Bruce Lee',
      'quote':  'It is not a daily increase, but a daily decrease. Hack away at the inessentials.'
    },
    {
      'author': 'Gertrude B. Elion',
      'quote':  'Don’t be afraid of hard work. Nothing worthwhile comes easily. Don’t let others discourage you or tell you that you can’t do it. In my day I was told women didn’t go into chemistry. I saw no reason why we couldn’t.'
    },
    {
      'author': 'Olin Miller',
      'quote':  'If you want to make an easy job seem mighty hard, just keep putting off doing it.'
    },
    {
      'author': 'Confucius',
      'quote':  'It does not matter how slowly you go, so long as you do not stop.'
    },
    {
      'author': 'Stephen Covey',
      'quote':  'I am not a product of my circumstances. I am a product of my decisions.'
    },
    {
      'author': 'Henry L. Doherty',
      'quote':  'Plenty of men can do good work for a spurt and with immediate promotion in mind, but for promotion you want a man in whom good work has become a habit.'
    },
    {
      'author': 'Chanakya',
      'quote':  'Learn from the mistakes of others. You can’t live long enough to make them all yourselves.'
    },
    {
      'author': 'Roy T. Bennett',
      'quote':  'Attitude is a choice. Happiness is a choice. Optimism is a choice. Kindness is a choice. Giving is a choice. Respect is a choice. Whatever choice you make makes you. Choose wisely.'
    },
    {
      'author': 'Stephen King',
      'quote':  'Amateurs sit and wait for inspiration, the rest of us just get up and go to work.'
    },
    {
      'author': 'Beverly Sills',
      'quote':  'There are no shortcuts to any place worth going.'
    },
    {
      'author': 'Jim Carrey',
      'quote':  'I would visualize things coming to me. It would just make me feel better. Visualization works if you work hard. That’s the thing. You can’t just visualize and go eat a sandwich.'
    },
    {
      'author': 'David Allen',
      'quote':  'If you don’t pay appropriate attention to what has your attention, it will take more of your attention than it deserves.'
    },
    {
      'author': 'Mildred Struven',
      'quote':  'A clay pot sitting in the sun will always be a clay pot. It has to go through the white heat of the furnace to become porcelain.'
    },
    {
      'author': 'Portuguese proverb',
      'quote':  'Think of many things; do one.',
    },
    {
      'author': 'Ernest Hemingway',
      'quote':  'If something is wrong, fix it now. But train yourself not to worry, worry fixes nothing.'
    },
    {
      'author': 'David Allen',
      'quote':  "Much of the stress that people feel doesn't come from having too much to do. It comes from not finishing what they started."
    },
    {
      'author': 'Francis Chan',
      'quote':  "Our greatest fear should not be of failure but of succeeding at things in life that don't really matter."
    },
    {
      'author': 'Vince Lombardi',
      'quote':  'The price of success is hard work, dedication to the job at hand, and the determination that whether we win or lose, we have applied the best of ourselves to the task at hand.'
    },
    {
      'author': 'Haile Gebrselassie',
      'quote':  'Once you have commitment, you need the discipline and hard work to get you there.'
    },
    {
      'author': 'Margaret Fuller',
      'quote': 'Whatever you do, do it with all your might. Work at it, early and late, in season and out of season, not leaving a stone unturned, and never deferring for a single hour that which can be done just as well as now.'
    },
    {
      'author': 'Muhammad Ali',
      'quote':  'It isn’t the mountains ahead to climb that wear you out; it’s the pebble in your shoe.'
    },
    {
      'author': 'Roger Staubach',
      'quote':  'There is no traffic jam along the extra mile.'
    },
    {
      'author': 'Brian Tracy',
      'quote':  'Your ability to discipline yourself to set clear goals, and then to work toward them every day, will do more to guarantee your success than any other single factor.'
    },
    {
      'author': 'Peter Drucker',
      'quote':  'Follow effective actions with quiet reflection. From the quiet reflection will come even more effective action.'
    }
  ];
  var quotePresent = false;

  (() => {
    if (t.seconds === 0) {
      timeLeftDisplay.innerHTML = t.minutes + ':00';
    } else {
      timeLeftDisplay.innerHTML = t.minutes + ':' + t.seconds;
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
        timeLeftDisplay.innerHTML = t.minutes + ':0' + t.seconds;
      } else {
        timeLeftDisplay.innerHTML = t.minutes + ':' + t.seconds;
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
          currentPhase.innerHTML = 'Take a long break!';
          return;
        }
        if (isPomodoro) {
          bellRing();
          isPomodoro = false;
          generateDeadline(break_length);
          currentPhase.innerHTML = 'Take a short break!';
          return;
        } else {
          bellRing();
          isPomodoro = true;
          generateDeadline(time_in_minutes);
          currentPhase.innerHTML = 'Productivity time!';
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
      startBtn.innerHTML = 'Resume';
      return;
    }
    if (paused) {
      paused = false;
      // update the deadline to preserve the amount of time remaining
      pomodoroDeadline = new Date(Date.parse(new Date()) + time_left);
      startBtn.innerHTML = 'Pause';
      // start the clock
      run_clock(pomodoroDeadline);
      return;
    }
  }

  function generateQuote() {
    if (quotePresent) {
      quoteZone.style.opacity = '0';
    }
    setTimeout(function () {
      var x = Math.floor(Math.random() * 65);
      quoteDisplay.innerHTML = quotes[x].quote;
      authorDisplay.innerHTML = quotes[x].author;
      quoteZone.style.opacity = '1';
    }, 2000);
    quotePresent = true;
  }

  submitBtn.addEventListener('click', () => {
    submitPress = true;
    time_in_minutes = document.getElementById('work-time').value;
    break_length = document.getElementById('break-time').value;
    long_break_length = document.getElementById('long-break-time').value;
    timeLeftDisplay.innerHTML = time_in_minutes + ':00';
    var inputForm = document.getElementById('length-input');
    inputForm.style.opacity = '0';
    setTimeout(function () {
      inputForm.remove();
    }, 1000);

    current_time = Date.parse(new Date());
    pomodoroDeadline = new Date(current_time + time_in_minutes * 60 * 1000);
    let t = time_remaining(pomodoroDeadline);
    if (t.seconds < 10) {
      timeLeftDisplay.innerHTML = t.minutes + ':0' + t.seconds;
    } else {
      timeLeftDisplay.innerHTML = t.minutes + ':' + t.seconds;
    }
  });
  // handle pause and resume button clicks
  startBtn.addEventListener('click', () => {
    if (start === false) {
      if (!submitPress) {
        var inputForm = document.getElementById('length-input');
        inputForm.style.opacity = '0';
        setTimeout(function () {
          inputForm.remove();
        }, 1000);
      }
      generateQuote();
      currentPhase.innerHTML = 'Productivity time!';
      generateDeadline(time_in_minutes);
      start = true;
      startBtn.innerHTML = 'Pause';
      return;
    }
    pause_clock();
  });

  function bellRing() {
    var audio = new Audio('http://soundbible.com/grab.php?id=2157&type=mp3');
    audio.play();
  }
});
