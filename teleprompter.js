document.addEventListener("DOMContentLoaded", function() {
    // Array of texts to type
    const texts = [
      "hello?",
      "is anyone there?",
      "nnnnnnngggggggg. NNNNN- GGGGR -RRRAAAAHHHHHHHH",
      "anyways-",
      "sorry, one sec-",
      "**incomprehensible**",
      "yeah, i agree with that.",
      "...",
      "♪♪",
      "♪♪",
      "✄ ✄ ✄ ✄ ✄ ✄ ✄ ✄",
      "t̵͙̀e̶̝̕s̵̡̓t̴̤͘ī̸͖n̷͖̆g̵͕̽ ̵̢̓c̸̲̿u̵̜͋s̸͕̍r̶̙̚s̷͓̉ē̴̻ḑ̶̀ ̷̩̓t̵͎͋e̷͈͋ẋ̸͉ṯ̷̑",
      "[you, thinking] where do i click?",
      "**static**",
      // "time for a long story now, just so that i can see how this thing renders; so once i was eating dinner and eshan wanted a cig and to my surprise, he wanted to head to jubilee! it was 10 minutes to 11 so we rushed and then i got chocolate milk and-"
      "lorem ipsum and a truckload of capsicum."
    ];
  
    // Function to get a random text from the array
    function getRandomText() {
      const randomIndex = Math.floor(Math.random() * texts.length);
      return texts[randomIndex];
    }

      // Function to generate a random delay using a noise function
  function getRandomDelay() {
    return Math.floor(Math.random() * 300) + 200; // Random delay between 200ms and 500ms
  }

  
    // Function to type the text word by word
    function typeText(text) {
      const container = document.querySelector(".blah");
      const words = text.split(" ");
      let index = 0;
  
      function type() {
        if (index < words.length) {
          container.textContent += (index > 0 ? " " : "") + words[index];
          index++;
          setTimeout(type, getRandomDelay()); // Use random delay for typing speed
        } else {
          // Clear the text after a delay and type a new one
          setTimeout(() => {
            container.textContent = "";
            typeText(getRandomText());
          }, 2000); // Adjust delay before typing new text
        }
      }
  
      type();
    }
  
    // Start typing the first random text
    typeText(getRandomText());
  });