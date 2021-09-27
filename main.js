const tl = gsap.timeline();

const mouse_over = () => {
  gsap.to(".cta", {
    duration: 0.5,
    scale: 1.2,
    ease: "circ.out"
  });
};

const mouse_out = () => {
  gsap.to(".cta", {
    duration: 0.5,
    scale: 1,
    ease: "circ.out"
  });
};

const nav_to_craft = () => {
  window.open("https://craftww.com/", "_blank").focus();
};

/* FRAME 1 */
// "Logo animates in, followed by a quick shine of light, a glow, or some other accent to make the logo pop."

// Logo fades in
tl.from(".f1_logo", {
  duration: 1.5,
  autoAlpha: 0,
  scale: 0.3,
  ease: "circ.out",
  boxShadow: "120px 80px 40px 20px #0ff"
});

/* FRAME 2 */
// "Logo from first frame transitions into the logo on the zoomed in cup."

// Logo crossfades with zoomed in cup
tl.to(".f1_logo", {
  autoAlpha: 0,
  duration: 0.7,
  scale: 0.3,
  delay: 0.75,
  ease: "circ.in"
}).to(
  ".frame_2",
  { autoAlpha: 1, duration: 0.5, ease: "slow (0.7, 0.7, false)" },
  "-=2"
);

/* FRAME 3 */
// "Cup shrinks down to smaller size. Bubbles start to animate. The two lines of copy come in from the right with the second line starting slightly after the first."

// Bubble effect defined and paused, then played upon the smaller cup rendering
const bubbles = gsap.timeline({ repeat: -1, paused: true });

bubbles
  .to(".f3_bubbles", {
    duration: 1,
    autoAlpha: 0.5,
    ease: "sine.in"
  })
  .set(".f3_bubbles", {
    autoAlpha: 0,
    rotationY: -180
  })
  .to(".f3_bubbles", {
    duration: 1,
    autoAlpha: 0.5,
    ease: "sine.out"
  })
  .set(".f3_bubbles", {
    autoAlpha: 0
  });

// Zoomed in cup crossfades downwards with smaller cup
tl.to(".frame_2", {
  duration: 1,
  autoAlpha: 0,
  scale: 0.28,
  ease: "circ.out",
  y: "52"
}).to(
  ".f3_cup, .f3_logo",
  {
    duration: 1,
    autoAlpha: 1,
    ease: "circ.in",
    onStart: function () {
      bubbles.play();
    }
  },
  "-=1"
);

// Copy enters and exits
tl.to(".f3_copy1, .f3_copy2", {
  duration: 1,
  autoAlpha: 1,
  ease: "circ.in",
  x: "-100px",
  stagger: {
    from: "end",
    amount: 0.25
  }
}).to(
  ".f3_copy1, .f3_copy2",
  {
    duration: 1,
    autoAlpha: 0,
    ease: "circ.in",
    x: "-300px",
    stagger: 0.25
  },
  "+=2"
);

/* FRAME 4 */
// "The two lines of copy from Frame 3 exit to the left, with second line leaving a bit behind the first. The two words, making up the hashtag, come in from opposite sides at same time, as the cup slides up. CTA animates in and should grow/shrink slightly upon rollover/rollout."

// Frame 4 copy enters from both sides simultaneously
tl.fromTo(
  ".f4_copy1",
  {
    duration: 1,
    autoAlpha: 0,
    ease: "circ.in",
    x: "-300"
  },
  {
    duration: 1,
    autoAlpha: 1,
    ease: "circ.in",
    x: "-80"
  }
).fromTo(
  ".f4_copy2",
  {
    duration: 1,
    autoAlpha: 0,
    ease: "expo.in",
    x: "300"
  },
  {
    duration: 1,
    autoAlpha: 1,
    ease: "expo.in",
    x: "175"
  },
  "-=1"
);

// Cup moves slightly upward to make room for call to action
tl.to(
  ".f3_cup, .f3_logo",
  {
    duration: 1,
    y: -35,
    ease: "circ.in",
    onStart: function () {
      tl.to(
        ".f3_bubbles",
        {
          duration: 1,
          autoAlpha: 0.5,
          y: -37,
          ease: "circ.in"
        },
        "-=2.5"
      );
    }
  },
  "-=1"
);

// Call to action expands and retracts slightly on entry
tl.fromTo(
  ".cta",
  {
    autoAlpha: 0
  },
  {
    duration: 1,
    autoAlpha: 1,
    scale: 1.2,
    ease: "circ.out"
  }
).to(".cta", {
  duration: 0.5,
  scale: 1,
  onComplete: () => {
    console.log(tl.totalTime());
  }
});
