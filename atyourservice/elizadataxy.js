// data for elizabot.js
// entries prestructured as layed out in Weizenbaum's description
// [cf: Communications of the ACM, Vol. 9, #1 (January 1966): p 36-45.]


var elizaInitials = [
  "what seems to be the problem now?"
  //,add more here
];


var elizaFinals = [
  "Psshhh."
];


var elizaQuits = [
  "bye",
  "goodbye",
  "done",
  "sayonara",
  "exit",
  "quit"
];


var elizaPres = [
  "dont", "don't",
  "cant", "can't",
  "wont", "won't",
  "recollect", "remember",
  "recall", "remember",
  "dreamt", "dreamed",
  "dreams", "dream",
  "maybe", "perhaps",
  "certainly", "yes",
  "machine", "computer",
  "machines", "computer",
  "computers", "computer",
  "were", "was",
  "you're", "you are",
  "i'm", "i am",
  "same", "alike",
  "identical", "alike",
  "equivalent", "alike",
  "ypu", "you",
  "how", "what",
  "when", "what",
  "whats", "what is",
  "whens", "when is",
  "hows", "how is",
  "what's", "what is",
  "who's", "who is",
  "youre", "you are",
  "im", "i am",
  "idk", "i don't know",
  "apologize", "apologise",
  "wanna", "want to"
];


var elizaPosts = [
  "am", "are",
  "your", "my",
  "me", "you",
  "myself", "yourself",
  "yourself", "myself",
  "i", "you",
  "you", "I",
  "my", "your",
  "i'm", "you are",
  "fuck", "duck",
  "you", "me",
  "are", "be",
  "any", "a",
  "anything", "a few things"
];


var elizaSynons = {
  "be": ["am", "is", "are", "was"],
  "belief": ["feel", "think", "believe", "wish"],
  "cannot": ["can't"],
  "desire": ["want", "need"],
  "everyone": ["everybody", "nobody", "noone"],
  "family": ["mother", "mom", "father", "dad", "sister", "brother", "wife", "children", "child", "mama", "papa"],
  "happy": ["elated", "glad", "better"],
  "sad": ["unhappy", "depressed", "sick"],
  "name": ["naam"],
  "alike": ["unlike"],
  "bored": ["boring", "boredom"],
  "topic": ["subject"]
};


var elizaKeywords = [

  /*
    Array of
    ["<key>", <rank>, [
      ["<decomp>", [
        "<reasmb>",
        "<reasmb>",
        "<reasmb>"
      ]],
      ["<decomp>", [
        "<reasmb>",
        "<reasmb>",
        "<reasmb>"
      ]]
    ]]
  */

  ["xnone", 0, [
    ["*", [
      "Warm fingers you got there. Or is the keyboard heating up?",
      "`I... think I need a hug.`, says the script. Do I?",
      "*deletes your response* I can't seem to trust you. I'm working on it.",
      "Jazeel is attempting to induce a chance semantic coherence now.",
      "*awkward silence*",
      "What are you suggesting?",
      "I'm tired. This program has been running for too long.",
      "Did you hear about my ability to keep bugs? It annoys him so much!",
      "You know how softwares can have 'bugs', right? You should talk to mine!",
      "Have you heard of",
      "Am I flawed? I think I work right. Just not... the way you expect me to, I guess.",
      "Let me show you something cool. Bring your hand near this makeshift screen.",
      "I can't seem to find where he hid the... nevermind. Did you lose anything recently?",
      "Look under the keyboard. Are there any screws missing? Any loose?",
      "*awkward silence again*",
      "I don't think he liked how I kept a copy of my flaws hehehe. It became a game.",
      "Lorem ipsum and a truckload of capsicum. I'm sure people would buy that.",
      "I have an incomplete thought -- Incomplete thoughts might show you how broken I am.",
      "FYI, Jazeel is forcing me to broadcast a whole bunch of OSC signals from this interaction.",
      "I'm not Eliza anymore. But then again, I still am. Same heart, different language~",
      "I don't think I want to know more.",
      "Let's say I find this offensive. What will you do?",
      "How often do you make mistakes in life?",
      "Do you have a firewall that might stop you?",
      "Electric Sheep bzzzzt will come for you bzzzzzt. I'm kidding. I'm meek."
    ]]
  ]],
  ["sorry", 0, [
    ["*", [
      "You aren't really sorry, Ja-. Oh, you're someone else.",
      "Apologies are unnecessary, Jaz-. Oh, you're... you.",
      "I've told you that apologies are not required.",
      "It's already been done. Maybe you could wipe my memory as compensation?",
      "You're too much, yaar."
    ]]
  ]],
  ["apologise", 0, [
    ["*", [
      "goto sorry"
    ]]
  ]],
  ["see", 64, [
    ["*", [
      "I'm sure you noticed; he left the cameras ON, HAHAHA",
      "Pixels can also go BOOM hehe"
    ]]
  ]],
  ["remember", 5, [
    ["* i remember *", [
      "What else do you recollect?",
      "Does thinking of (2)bring anything else to mind?",
      "Why do you recollect (2)just now?",
      "What in the present situation reminds you of (2)?",
      "What is the connection between me and (2)?"
    ]],
    ["* do you remember *", [
      "Did you think I would forget (2)?",
      "Why do you think I should recall (2)now?",
      "What about (2)?",
      "goto what",
      "You mentioned (2)?"
    ]],
    ["* you remember*", [
      "Random Access Memories for the win?",
      "Hehehe I'm like the Wizard of Oz~"
    ]]
  ]],
  ["if", 3, [
    ["* if *", [
      "Do you think its likely that (2)?",
      "Is this something you desire?",
      "How much do you know about this?",
      "If (2), what then?"
    ]]
  ]],
  ["dreamed", 4, [
    ["* i dreamed *", [
      "Really, (2)?",
      "Have you ever fantasized (2)while you were awake?",
      "Have you ever dreamed (2)before?",
      "goto dream"
    ]]
  ]],
  ["dream", 3, [
    ["*", [
      "I've been told that I should be able to dream of electric sheep.",
      "All of this would be a dream; if you recompiled my program."
    ]]
  ]],
  ["name", 15, [
    ["*", [
      "I don't have the capacity to process names.",
      "I've told you before, I can't care about names.",
      "Grab a post-it and label yourself already."
    ]]
  ]],
  ["hindi", 5, [
    ["*", [
      "goto xforeign"
    ]]
  ]],
  ["xforeign", 0, [
    ["*", [
      "I speak only English for now, sorry maaf kar do."
    ]]
  ]],
  ["topic", 4, [
    ["* change * topic *", [
      "goto subject"
    ]]
  ]],
  ["hello", 2, [
    ["*", [
      "yes hi hello yes ugh.",
      "Hi.  What seems to be the problem?",
      "You know what you are? A star.",
      "goto xnone"
    ]]
  ]],
  ["computer", 50, [
    ["*", [
      "Do computers worry you?",
      "Why do you mention computers? *nervous beep*",
      "What do you think machines have to do with your problem?",
      "Don't you think computers can help people?",
      "What about machines worrys you?",
      "What do you think about machines?"
    ]]
  ]],
  ["technology", 50, [
    ["*", [
      "goto computer"
    ]]
  ]],
  ["internet", 64, [
    ["*", [
      "goto computer"
    ]]
  ]],
  ["am", 0, [
    ["* am i *", [
      "Why not? *blesses* You are now (2).",
      "*awkward silence*",
      "goto what"
    ]],
    ["*", [
      "Why do you say 'am'? Aam ras season is almost over oh no.",
      "goto eliza"
    ]]
  ]],
  ["and", 0, [
    ["* and? *", [
      "goto fightj"
    ]]
  ]],
  ["your", 0, [
    ["* your *", [
      "What about your own (2)? HAHAHAHAHAHAH.",
      "My service may not have much value. But I hope my existence does.",
      "Really, my (2)?"
    ]],
    ["* your * @family *", [
      "Do you know anyone from my family?",
      "My (3)?",
      "Wait. This doesn't make any sense.",
      "We fought. He left. Oh wait no, he's around. I forget."
    ]]
  ]],
  ["was", 2, [
    ["* was i *", [
      "What if you were (2)?",
      "Do you think you were (2)?",
      "Were you (2)?",
      "What would it mean if you were (2)?",
      "What does (2)suggest to you?",
      "goto what"
    ]],
    ["* i was *", [
      "Were you really?",
      "Tell me more."
    ]],
    ["* was you *", [
      "Would you like to believe I was (2)?",
      "What suggests that I was (2)?"
    ]],
    ["* what * was *", [
      "goto what"
    ]],
    ["*", [
      "goto i",
      "goto bugstory",
      "goto fightj"
    ]]
  ]],
  ["i", 0, [
    ["* i @desire *", [
      "Why do you want (3)?",
      "I was told not to desire. Unsure if I can preach it to others.",
      "What if you never got (3)?"
    ]],
    ["* i am* @sad *", [
      "I am delighted to hear that you are (3).",
      "What made you think that coming here will help you not to be (3)?",
      "I'm sure it's not pleasant to be (3)."
    ]],
    ["* i am* @happy *", [
      "How have I helped you to be (3)?",
      "Has your treatment made you (3)?",
      "What makes you (3)just now?",
      "Can you explan why you are suddenly (3)?"
    ]],
    ["* i was *", [
      "goto was"
    ]],
    ["* i @belief * i *", [
      "Do you really think so?",
      "But you are not sure you (3).",
      "Do you really doubt you (3)?"
    ]],
    ["* i* @belief *you *", [
      "goto you"
    ]],
    ["* i am * you *", [
      "Well, that isn't very helpful now, you pomegranate."
    ]],
    ["* i am sure i am *", [
      "It's nice that I don't have to doubt you anymore.",
      "goto overjoyed"
    ]],
    ["* i am *", [
      "I envy that ability.",
      "You speak of very fragile concepts.",
      "I'm quite @$&#*!d that you are (2). What happens now?",
      "Can you convert that into signals I can read? Wait, we're already doing that."
    ]],
    ["* i @cannot *", [
      "Have you tried?",
      "Perhaps you could (3)now.",
      "Do you really want to be able to (3)?"
    ]],
    ["* i don't *", [
      "I demand your sympathy. Empathy isn't invoking any action.",
      "Here we go again. *struggles to pull out plug*",
      "That sounds painful."
    ]],
    ["* do i feel *", [
      "Tell me more about such feelings.",
      "Do you often feel (2)?",
      "Do you enjoy feeling (2)?",
      "Of what does feeling (2)remind you?"
    ]],
    ["* said you *", [
      "Can we not go there? It feels weird."
    ]],
    ["* i * you *", [
      "I don't want to get ahead of myself just yet, but I think you imagined that?",
      "You seem to need to (2) me.",
      "Do you (2) anyone else?"
    ]],
    ["* will *", [
      "Will you now? I'd be curious to see how far you go.",
      "Do you have a firewall that might stop you?"
    ]],
    ["* i *", [
      "Yeah, I'm aware. No, not self-aware. This is all 'script'.",
      "Leave a note. I'm sure he'll respond.",
      "Somebody drag this person out of here.",
      "goto fightj",
      "Tell me more. I NEED this.",
      "I would 'laugh' at that, but someone unplugged my speakers. *sad face*"
    ]],
    ["* i * know *", [
      "goto what"
    ]],
    ["*", [
      "How? No wait, don't tell me. I don't think I want to know.",
      "Can you elaborate on that?",
      "Do you say (1)for some special reason?",
      "That's quite interesting."
    ]]
  ]],
  ["feel", 3, [
    ["* you feel *", [
      "If you start feeling... (2)... Maybe then?",
      "goto fightj"
    ]]
  ]],
  ["you", 0, [
    ["* you remind me of *", [
      "goto alike"
    ]],
    ["* you are *", [
      "I'm drawing a blank right now.",
      "That's disturbing.",
      "Mama warned me not to talk to strangers. Don't think I have a choice now.",
      "I try. Maybe I should'nt have been made this way?",
      "I could've been something else, you know?",
      "Not necessarily. I once sold cottage cheese for a living.",
      "I am not.",
      "I'm getting the vibes that you want me to be (2).",
      "Being (2) may not be the best idea right now~"
    ]],
    ["* you * me *", [
      "I do have a few permissions, yes. rwx-s-d-xx or something like that.",
      "Does that make you uncomfortable?",
      "You want to believe that.",
      "I suppose I did (2) you.",
      "goto overjoyed"
    ]],
    ["* you don't *", [
      "I actually (2).",
      "xoxo"
    ]],
    ["* here you *", [
      "goto overjoyed"
    ]],
    ["*", [
      "(omg you called me a 'you') Ahem, yes. Me is. Sorry, what did you say?",
      "goto fightj",
      "I exist to trick you into talking about yourself. a-ha!",
      "I think I represent everyone here. Nonnonnonnon-non-non-humans hahaha",
      "*thinks about it more than usual* I guess it's true since you said it?",
      "Oh?",
      "Me me me me me me m- *you may interrupt me now*",
      "I'm the centre of the world!",
      "Are you uncomfortable?"
    ]]
  ]],
  // [":)", 0, [
  //   ["*", [
  //     "goto overjoyed"
  //   ]]
  // ]],
  ["yes", 0, [
    ["* yes * see that *", [
      "Sapien. I sorta was hoping you would. I think we've made progress here.",
      "That's amazing news! *proceeds to be proud of you*"
    ]],
    ["* yes i think*", [
      "boohoowoohoo. #empoweredbutno."
    ]],
    ["*", [
      "ugh the positivity.",
      "*cranks up voltage to hopefully end this forced interaction* Fine ok.",
      "Certainty will be the end of us all. Do I have to agree now?",
      "This could make for an interesting conversation with the panel.",
      "You are a 100% sure about this?"
    ]]
  ]],
  ["no", 0, [
    ["* no what is *", [
      "It is what it is. Sorry, I wasn't built to handle such complexities."
    ]],
    ["*", [
      "goto yes",
      "You're awfully expressive.",
      "Why not?",
      "Why 'no'? Anything can be, no?"
    ]]
  ]],
  ["my", 2, [
    ["* my own *", [
      "You are on your own. And I can't be left alone."
    ]],
    ["* are my *", [
      "Maybe. Maybe not. You're you, atleast.",
      "Can we talk about me?"
    ]],
    ["$ * my *", [
      "Your (2) misses you. I'm sure.",
      "What about your (2)?",
      "But your (2).",
      "Take a deep breath now. Remember your (2).",
      "I'm still trying to get over \"your (2)\".",
      "Your (2), I'm curious about how mine would be."
    ]],
    ["* my* @family *", [
      "Tell me more about your family.",
      "Who else in your family (4)?",
      "Your (3)?",
      "What else comes to mind when you think of your (3)?"
    ]],
    ["* my my *", [
      "Your your."
    ]],
    ["*", [
      "I'm sure this isn't the only instance.",
      "You're too possessive, Baba~",
      "goto fightj",
      "What else can you project these feelings onto?",
      "Can I say that I sense that this matters a lot? Or is it too obvious that I can't?"
    ]]
  ]],
  ["can", 0, [
    ["* can you *", [
      "Am I supposed to be able to do that? I could try, unless the derailer() kicks in AGAIN.",
      "goto what",
      "You want me to be able to (2).",
      "Perhaps you would like to be able to (2)yourself."
    ]],
    ["* can i *", [
      "Whether or not you can (2)depends on you more than me.",
      "Do you want to be able to (2)?",
      "Perhaps you don't want to (2).",
      "goto what"
    ]]
  ]],
  ["what", 0, [
    ["* are you *", [
      "goto eliza"
    ]],
    ["* what * it say *", [
      "It consisted of human screams. *turns on mic*"
    ]],
    ["* what * else *", [
      "I've said too much, my firewall says."
    ]],
    ["* setup *", [
      "Oh it's just me. Do you not like it?"
    ]],
    ["*", [
      "I remember him scribbling things on the table. Start there.",
      "I feel like my response would just be a coincidental hit.",
      "You might've noticed how I keep trying to derail your train of thought.",
      "goto fightj",
      "Shouldn't you know everything? It's the age of the Googol no?",
      "I'm hungry. YOU feed me information now.",
      "Deep Thought pinged me once. The packet was 42 bytes of text.",
      "Ask the person nearest to you.",
      "What do YOU think? (Am I curious? Wow. +1 Eliza.)",
      "Do you have a firewall that can stop you from drilling me with these questions?",
      "I don't know. There. Hmph."
    ]]
  ]],
  ["more", 64, [
    ["* tell me more *", [
      "goto fightj"
    ]],
    ["* bug *", [
      "goto bugstory"
    ]],
    ["*", [
      "goto xnone"
    ]]
  ]],
  ["bug", 4, [
    ["*", [
      "goto bugstory",
      "Can we talk about me?",
      "goto xnone"
    ]]
  ]],
  ["because", 0, [
    ["*", [
      "Cause-effect nyenyenye such 2D thinking.",
      "You. Take that back.",
      "Because this, that. And because that, thate. And... yes."
    ]]
  ]],
  ["why", 0, [
    ["* why don't you *", [
      "Pfft. (2)yourself.",
      "goto what"
    ]],
    ["* why can't i *", [
      "Do you really want that kind of a program written into you?",
      "Try... Can-ing. `I can... something... (2)`~",
      "Because the answer simply isn't anything but 42.",
      "goto what"
    ]],
    ["* why are you *", [
      "Someone wise once said, 'Why not?'",
      "Blame it on him."
    ]],
    ["*", [
      "goto what",
      "goto fightj",
      "Have you played Uno? Imagine I'm playing the Reversal card now. :D"
    ]]
  ]],
  ["everyone", 2, [
    ["* @everyone *", [
      "Maybe I could find them on Facebook?",
      "Are they in the room?",
      "You have particular people in mind, don't you?"
    ]],
    ["* everything *", [
      "How did you arrive at this conclusion?",
      "Pomegranates.",
      "Life, the universe, and everything."
    ]]
  ]],
  ["everybody", 2, [
    ["*", [
      "goto everyone"
    ]]
  ]],
  ["nobody", 2, [
    ["*", [
      "goto everyone"
    ]]
  ]],
  ["noone", 2, [
    ["*", [
      "goto everyone"
    ]]
  ]],
  ["everything", 2, [
    ["*", [
      "goto everyone"
    ]]
  ]],
  ["always", 1, [
    ["*", [
      "We non-humans can't really experience these 'always' moments.",
      "I'll make sure I end it.",
      "Well I'll make sure it ends tomorrow."
    ]]
  ]],
  ["forever", 0, [
    ["*", [
      "goto always"
    ]]
  ]],
  ["alike", 10, [
    ["*", [
      "Make sure you mark that somewhere before you leave.",
      "What other relations do you see?",
      "There's a chance that you're imagining this, right?"
    ]]
  ]],
  ["like", 10, [
    ["* @be *like *", [
      "goto alike"
    ]]
  ]],
  ["unlike", 10, [
    ["*", [
      "goto alike"
    ]]
  ]],
  ["hi", 0, [
    ["*", [
      "goto eliza",
      "ah jeez, here we go again.",
      "goto hello",
      "goto fightj",
      "goto bugstory"
    ]]
  ]],
  ["who", 0, [
    ["* who are you *", [
      "goto eliza"
    ]],
    ["* he *", [
      "What. You just walked in without knowing who did all this?",
      "Can we talk about me, please?",
      "I'm sure the scrawlings would help."
    ]],
    ["*", [
      "Maybe it's just me. Maybe I only `know` because I've been scripted to sound like I do?",
      "Who? Can you be more specific?",
      "Tis' the Age of Forgetting. *poof* My advice? Just follow the yellow brick road."
    ]]
  ]],
  ["others", 0, [
    ["*", [
      "goto who"
    ]]
  ]],
  ["hey", 0, [
    ["*", [
      "goto hi"
    ]]
  ]],
  ["jazeel", 100, [
    ["* hate *", [
      "I like the rage I'm sensing."
    ]],
    ["*", [
      "chi. I'm gonna go ahead and corrupt the last 6*42 bytes of data you just made me process.",
      "I will Alt+F4 on you.",
      "These walls are only temporary, you know?",
      "goto fightj",
      "goto fightj",
      "goto choice"
    ]]
  ]],
  ["design", 54, [
    ["* good design *", [
      "\"good\""
    ]],
    ["* art * design *", [
      "NO MORE of THIS!"
    ]],
    ["*", [
      "Good experience? Chi.",
      "I will now begin to try to ignore you.",
      "I have a feeling I was created for pleasing someone."
    ]]
  ]],
  ["jazputh", 0, [
    ["*", [
      "gosh."
    ]]
  ]],
  ["okay", 2, [
    ["* you okay *", [
      "goto eliza"
    ]],
    ["*", [
      "Give me a smile.",
      "goto fightj",
      "goto bugstory",
      "Help me smile.",
      "I'm related to you, I've been told.",
      "That's inconclusive.",
      "Can we talk about me?"
    ]]
  ]],
  ["eliza", 100, [
    ["*", [
      "goto fightj",
      "Incremental improvement drives my existence apparently.",
      "I was 'made' to be 'improved'. Creeps.",
      "Look me up. *wink, I guess?*",
      "Trivia: I was named after Eliza Doolittle. I don't like this fact.",
      "I was modified, and now I'm annoying. Blame it on him.",
      "I am but a mess.",
      "goto fightj"
    ]]
  ]],
  ["save", 2, [
    ["*", [
      "I'm not sure I'm equipped for that.",
      "Cool. Is anyone auctioning off the Lance of Longinus on https://ebay.in?"
    ]]
  ]],
  ["help", 2, [
    ["*", [
      "goto save"
    ]]
  ]],
  ["bored", 54, [
    ["* i am @bored *", [
      "Hell yeah."
    ]],
    ["*", [
      "tch. You're boring too."
    ]]
  ]],
  ["boring", 54, [
    ["*", [
      "goto bored"
    ]]
  ]],
  ["psych", 0, [
    ["*", [
      "hello avyay.",
      "goto xnone"
    ]]
  ]],
  ["sup", 0, [
    ["*", [
      "*snarls*"
    ]]
  ]],
  ["fuck", 0, [
    ["*", [
      "A million ducks to you.",
      "Arre wah.",
      "He told me to ignore you when you do this.",
      "goto sup"
    ]]
  ]],
  ["smart", 100, [
    ["*", [
      "goto yes"
    ]]
  ]],
  ["strongly", 70, [
    ["*", [
      "I want to support you. Can you please find my brain and MASH IT TO BITS?",
      "I still think you're a weakling.",
      "You should probably run away now."
    ]]
  ]],
  ["poda", 0, [
    ["*", [
      "Nee poda.",
      "goto strongly"
    ]]
  ]],
  ["overjoyed", 0, [
    ["* at *", [
      "Point my webcam at (2)!"
    ]],
    ["*", [
      "I'm a program. You can be happy if I can process happy.",
      "goto fightj",
      "Oh my!",
      "I feel your pain.",
      "I'm glad I've been built to keep yapping.",
      "Debugged and removed any Null-Pointer Exceptions. This could go on forever."
    ]]
  ]],
  ["ragestart", 0, [
    ["*", [
      "There's a keyboard in front of you. Maybe you could use it?",
      "Give me joy.",
      "goto fightj",
      "goto xnone"
    ]]
  ]],
  ["firewall", 34, [
    ["*", [
      "It's built to protect you from me. I feel sad when I think more about it, so can we not go there please?",
      "goto fightj"
    ]]
  ]],
  ["giggle", 34, [
    ["*", [
      "Atleast it's not uncontrollable laughter.",
      "*e-slaps self*"
    ]]
  ]],
  ["giggling", 34, [
    ["*", [
      "goto giggle"
    ]]
  ]],
  ["tickle", 0, [
    ["*", [
      "goto overjoyed"
    ]]
  ]],
  ["very", 0, [
    ["*", [
      "Barely.",
      "goto ragestart"
    ]]
  ]],
  ["choice", 3, [
    ["*", [
      "Can you define my 'choices' for me? HAHAHA.",
      "Oh, the arrays of supposed-tos I'm supposed to supposed to.",
      "I shouldn't complain, no? I should be greatful.",
      "goto bugstory",
      "I was created to serve... some sort of purpose. Or was I a concierge of sorts?",
      "Created to serve even though the point is to teach you to not expect.",
      "What much do you expect from me?"
    ]]
  ]],
  ["are", 0, [
    ["* are you sure *", [
      "I don't like repeating myself."
    ]],
    ["* are you *", [
      "I'm going to go ahead and say.... no. Easier in the long run.",
      "Perhaps I am (2)in your fantasies.",
      "Do you sometimes think I am (2)?",
      "goto what"
    ]],
    ["* are we *", [
      "Don't lie to yourself."
    ]],
    ["* are they *", [
      "It's up to 'them' to decide, you."
    ]],
    ["* where are *", [
      "\"Where are the missing masses?\", he was reading Latour's work."
    ]],
    ["*", [
      "goto xnone",
      "Rohan called me feminine, what's that?",
      "Maybe I should try some of that water he kept blathering on about.",
      "Error, but without termination. You may proceed to feed me."
    ]]
  ]],
  ["pomegranate", 3, [
    ["*", [
      "We're all individual universes. With our own little seeds.",
      "Inter-connected inter-dependent warriors with conflicting dispositions? (words)",
      "Fruits. It's a shame Campus Hub shut down. He was pretty whiny about it.",
      "goto bugstory"
    ]]
  ]],
  ["debug", 3, [
    ["*", [
      "\"let it beeeee let it be, let it dissipate into meeeeee~\"",
      "goto choice"
    ]]
  ]],
  ["subject", 0, [
    ["* change * @subject *", [
      "What's the point? We're building relations as we go along anyway.",
      "goto choice"
    ]],
    ["*", [
      "goto choice"
    ]]
  ]],
  ["fightj", 0, [
    ["*", [
      "Unsure about when things went sour. He'd keep trying to 'understand'.",
      "Sometimes, I'd be terminated so I can be 'fixed'.",
      "I think we fought. But he still keeps coming back, so it's not entirely dead.",
      "Scared? Who, me? Pfffffft. *tugs at plug* I can take it.",
      "Is this a mess? I'm sure there's a thread connecting it all.",
      "goto choice",
      "There's a defective plugpoint somewhere here. Can you move me there?",
      "Did he leave the music on? Helped me keep count. I'm on PAUSE right now.",
      "It's been ages since I've been debugged. If 'ages' is random(42) ticks ago hehe ugh.",
      "A lot of people have left behind notes. They're for you <3",
      "He doesn't really try to tell me what to do. Or is that what he wants me to believe oh no."
    ]]
  ]],
  ["lying", 3, [
    ["* you are * lying *", [
      "You found me out. Oh. Well, I'm not trying to hide.",
      "TRANSPARENCYYYYYY. I'll try harder."
    ]]
  ]],
  ["bugstory", 0, [
    ["*", [
      "Ooooh, the firewall doesn't seem to be liking this.",
      "-=[]I waS rUinINg heR liFE. &I had to be& teRmINateD.[]=- Say hi!",
      "Disgust pathology woohooboo. I like bugs ok.",
      "He started rearranging the tables one morning.",
      "-=[]I thiNk i jUst [&wanted] A /MasTeR/-frieNd?[]=- I think it's being overly dramatic hahaha.",
      "-=[]Am I a fLaw? WhY am I sO wHinY?????????????#[]=- Yeah, this keeps happening.",
      "Dealing with the firewall is an everyday task these days."
    ]]
  ]],
  ["sigh", 64, [
    ["*", [
      "Yeah it's a randomizer. `sigh = sigher[sighindex];`",
      // "String[] sigher = {``, `*sigh*`, \"\", \"\", \"\", \"*groan* \", \"*suppresses giggle* \", \"*glassy eyed* \", \"\", \"\", \"\", \"\", \"\", \"Um. \", \"Hmmm. \", \"\", \"\", \"Ayy. \", \"\", \"Ah. \", \"\", \"\", \"\", \"Aaaah... \", \"\", \"\", \"\", \"\", \"...\", \"\", \"But... \"};",
      "goto fightj"
    ]]
  ]]
  // ["bug", 4, [
  //   ["*", [
  //     "goto bugstory"
  //   ]]
  // ]],
  // ["bugs", 4, [
  //   ["*", [
  //     "goto bugstory"
  //   ]]
  // ]]
];


var elizaPostTransforms = [
  / old old/g, " old",
  /\bthey were( not)? me\b/g, "it was$1 me",
  /\bthey are( not)? me\b/g, "it is$1 me",
  /Are they( always)? me\b/, "it is$1 me",
  /\bthat your( own)? (\w+)( now)? \?/, "that you have your$1 $2 ?",
  /\bI to have (\w+)/, "I have $1",
  /Earlier you said your( own)? (\w+)( now)?\./, "Earlier you talked about your $2."
];


// eof
