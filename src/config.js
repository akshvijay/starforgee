// ===== EDIT ME: all event details live here =====
export const CONFIG = {
  eventStart: "2026-12-12T08:00:00+05:30", // Day 1 - build begins, 08:00 AM IST
  registerUrl: "https://unstop.com/o/qhl7WSP?lb=uses5hnA&utm_medium=Share&utm_source=aerosele58679&utm_campaign=Online_coding_challenge",
  brochureUrl: "#",                         // TODO: e.g. "/brochure.pdf" (put the file in /public)
  pptTemplateUrl: "/STARFORGE_TEMPLATE.pptx",
  psUrl: "/STARFORGE_PS.pdf",
  instagramUrl: "https://www.instagram.com/aess.bmsit?mdxt=MWM5dmQxaDdkM3pzOQ==",
  contacts: [
    { name: "Kishan", phone: "+919483113397", label: "+91 94831 13397" },
    { name: "Saksham", phone: "+917974347734", label: "+91 79743 47734" }
  ],
  prizeTotal: "₹65,000",
  prizes: [
    { place: "Overall Winner", amount: "₹25,000", first: true },
    { place: "Hardware Track Winner", amount: "₹15,000" },
    { place: "Software Track Winner", amount: "₹15,000" },
    { place: "Best Innovation", amount: "₹10,000" }
  ],
  perks: "Plus space-themed merchandise, certification and sponsor learning credits. Every participant gets a participation certificate.",

  problems: {
    hw: [
      {
        id: "HW-1", title: "Bandwidth-Capped Teleoperation",
        context: "A rover on the Moon or Mars is driven over a slow, limited link shared by video, telemetry and commands.",
        challenge: "Build a teleoperated rover that a person drives using a live camera feed, with all communication, video included, kept within a fixed bandwidth budget set by the organisers. A live meter shows usage against the cap. The rover must finish a marked obstacle course, and exceeding the cap lowers the score.",
        outcomes: [
          "A rover with motor control, a camera and a wireless link",
          "Real-time measurement and display of data usage",
          "Staying under the cap by adjusting video resolution and frame rate, compressing, or reducing telemetry",
          "Completing the course with few collisions, and stopping safely if the link drops"
        ]
      },
      {
        id: "HW-2", title: "Astronaut Vitals Wearable",
        context: "On long missions astronauts are far from a hospital, and small changes in heart rate, blood oxygen, temperature or activity can signal stress or illness.",
        challenge: "Build a wearable that measures pulse, SpO2, skin temperature and motion and sends the data wirelessly to a base display. It should learn each wearer's normal baseline and raise caution and warning alerts when readings move away from it, without false alarms from movement or a loose sensor.",
        outcomes: [
          "A small battery-powered wearable streaming over Bluetooth Low Energy or Wi-Fi to a live dashboard",
          "Baseline learning and tiered alerts, with unreliable readings flagged",
          "Reported battery life and accuracy against a reference device",
          "This is a prototype, not a medical device"
        ]
      },
      {
        id: "HW-3", title: "Reaction-Wheel Attitude Testbed",
        context: "A satellite has nothing to push against, so it turns itself using reaction wheels: speeding up a spinning wheel inside makes the satellite rotate the other way.",
        challenge: "Build a single-axis testbed: a platform on a low-friction bearing or suspension with a reaction wheel and control electronics. It should hold a commanded heading, turn to new angles on command and recover when pushed.",
        outcomes: [
          "A platform with motor and flywheel, driver, IMU and microcontroller",
          "A feedback controller such as PID",
          "Disturbance rejection shown by pushing the platform",
          "Plots of commanded angle, measured angle and wheel speed, with settling time, overshoot and steady-state error reported"
        ]
      },
      {
        id: "HW-4", title: "Debris Tracking Pan-Tilt",
        context: "Debris in orbit has to be found, followed and its next position predicted. A tracker that only reacts to where the object was will lag behind and lose it.",
        challenge: "Build a camera pan-tilt that detects and follows a moving object standing in for debris (such as a ball or LED target), estimates its angular rate, predicts its next position and shows a lock indicator on screen or with a laser pointer. It should survive short occlusions and reacquire the target.",
        outcomes: [
          "A two-axis pan-tilt with camera and controller",
          "Computer-vision detection converted into pan and tilt commands",
          "A filter such as a Kalman filter to predict motion, showing it reduces tracking error",
          "Reported error and lost-lock events over several runs at different speeds"
        ]
      },
      {
        id: "HW-5", title: "Lander-Orbiter Store-and-Forward Link",
        context: "A lander on another world often reaches Earth through an orbiter that is overhead for only a few minutes at a time, leaving long gaps with no link.",
        challenge: "Build two radio nodes, a lander and an orbiter, that can communicate only during scheduled contact windows. The lander stores data of different priorities (urgent alerts, science readings, images) and, when a window opens, sends the most important data first, confirms delivery and resends what was lost. A live display shows the link state, stored data and delivery progress.",
        outcomes: [
          "Two nodes with radios such as LoRa or ESP32 modules",
          "Contact schedule, storage, priority queues, acknowledgements and resending",
          "Interrupted transfers that resume instead of restarting",
          "A demo across several windows, including one with simulated packet loss"
        ]
      },
      {
        id: "HWO", title: "Hardware Open Innovation", open: true,
        context: "Have your own idea for a space-related hardware solution? Pick a real challenge in space exploration, satellite systems, rovers, or space habitats, and build a working hardware prototype for it.",
        challenge: "",
        outcomes: [
          "A clearly defined problem and who it helps",
          "A working physical prototype with sensing, control or communication built in",
          "Measured results such as accuracy, response time, power use or reliability",
          "A live demo that shows the prototype solving the problem"
        ]
      }
    ],
    sw: [
      {
        id: "SW-1", title: "Lunar Boulder Hazard Mapper",
        context: "Boulders are a major danger when landing on the Moon. A lander leg on a large rock can tip the vehicle, and a rover can get stuck in a boulder field. Orbiter images are sharp enough to show boulders, but there are too many to check by hand.",
        challenge: "Build a system that detects boulders in high-resolution lunar images, estimates their position and size, and produces a hazard map marking terrain as safe, caution or unsafe for a lander or rover.",
        outcomes: [
          "Train a model that finds boulders and report its accuracy on unseen images",
          "Convert pixel sizes to real sizes using the image resolution",
          "Build the hazard map from boulder size and density, with adjustable thresholds",
          "Show it on an interactive viewer with a confidence value for each detection"
        ]
      },
      {
        id: "SW-2", title: "Solar Flare Probability Forecaster",
        context: "Solar flares can disrupt radio communication and GPS and damage satellites and power grids. Forecasters need to know a day ahead whether a strong flare (M-class or X-class) is likely, and the probabilities need to be reliable.",
        challenge: "Build a model that predicts the chance of an M-class or stronger flare in the next 24 hours using historical X-ray flux and solar activity data, and compare it with a simple baseline that assumes tomorrow will look like today.",
        outcomes: [
          "Build a clean, time-ordered dataset and handle the rarity of flares",
          "Evaluate with Brier score, calibration and true skill statistic, and show the gain over the baseline",
          "Present the result on a live dashboard with the current flux, the 24-hour probability and a plain risk level"
        ]
      },
      {
        id: "SW-3", title: "Exoplanet Signal Hunter",
        context: "When a planet passes in front of its star, the star dims slightly at regular intervals. Kepler and TESS have recorded huge numbers of stars, but the signals are faint and easily confused with starspots, instrument noise and eclipsing binaries.",
        challenge: "Build a pipeline that cleans raw light curves, finds repeating dips and produces a ranked list of planet candidates with period, depth, duration and a confidence score, while flagging likely false positives.",
        outcomes: [
          "Remove trends and noise without erasing real transits",
          "Detect dips using Box Least Squares, machine learning or both",
          "Report accuracy on stars with known results",
          "Show each candidate's raw curve, cleaned curve and folded transit for quick checking"
        ]
      },
      {
        id: "SW-4", title: "Habitat Layout Creator",
        context: "A space habitat has to keep a crew healthy for weeks or years, and every cubic metre costs money. Poor layouts cause problems such as noisy exercise areas next to sleeping quarters, blocked exits or too little room per person.",
        challenge: "Build an interactive tool where users enter crew size, mission length and habitat shape, place zones (sleep, exercise, hygiene, food, work, medical, storage), and get automatic checks and a score for the layout.",
        outcomes: [
          "An easy editor for placing zones",
          "Checks for volume per crew member, conflicts between neighbouring zones, noise and emergency exit paths, with rules that change by crew size and mission length",
          "A score with improvement suggestions",
          "Ability to save and compare layouts"
        ]
      },
      {
        id: "SW-5", title: "Satellite Collision Risk Predictor",
        context: "Satellites and debris move at several kilometres per second, so a collision can destroy a satellite. Operators receive conjunction data messages (CDMs) warning of close approaches, with risk estimates updated every few hours, and must decide days ahead whether to manoeuvre. Most warnings are harmless, so dangerous events are rare.",
        challenge: "Build a model that predicts the final collision risk at closest approach using only messages received at least two days before, and turns it into a manoeuvre / no-manoeuvre recommendation with a confidence level.",
        outcomes: [
          "Create features from each event's message history",
          "Train with a time-respecting split and handle the class imbalance",
          "Compare against a simple baseline and report missed dangerous events against unnecessary manoeuvres",
          "Show the recommendation and risk history for each event"
        ]
      },
      {
        id: "SWO", title: "Software Open Innovation", open: true,
        context: "Have your own idea for a space-related software solution? Pick a real problem in space exploration, satellite operations, space weather, planetary science, or Earth observation, and build a software solution for it.",
        challenge: "",
        outcomes: [
          "A clearly defined problem and who it helps",
          "A working software prototype (model, tool, dashboard, simulation or app)",
          "Evidence that it works, such as accuracy, test results or a comparison with a baseline",
          "A clear demo that shows the idea end to end"
        ]
      }
    ]
  },

  timeline: [
    { when: "1 Nov", title: "Registrations & Round 1 open", desc: "Free registration on Unstop. Submit your abstract and pitch deck." },
    { when: "20 Nov · 11:59 PM IST", title: "Registration and submission deadline", desc: "Last day to register and upload your PPT, PPTX or PDF. Late or emailed entries are not accepted." },
    { when: "After 20 Nov", title: "Screening and shortlist", desc: "The technical committee reviews every deck and picks the teams for the offline finale." },
    { when: "12 Dec · 8:00 AM IST", title: "Hackathon begins (Day 1)", desc: "24-hour build at BMSIT&M with mentoring and mini-games." },
    { when: "13 Dec · 3:30 PM IST", title: "Demos & closing (Day 2)", desc: "Live demos to a panel of industry experts, then prizes and closing." }
  ],

  faq: [
    ["Who can participate?", "Everyone can apply. Teams of 3 to 4 members, and every team must include at least one girl (mandatory) to be eligible."],
    ["Is there a registration fee?", "No. Registration is completely free. You register on Unstop."],
    ["How does the selection work?", "Round 1 is online: submit an abstract and pitch deck (PPT, PPTX or PDF) on the official template by 20 Nov, 11:59 PM IST. The technical committee screens the entries on innovation, technical feasibility and architecture, and shortlists the top teams for the 24-hour offline hackathon at BMSIT&M."],
    ["Do we need to pick a track?", "Yes. Your proposal must say whether you are entering the Software or the Hardware track. Each track has 5 problem statements and 1 open innovation challenge."],
    ["Can we submit late or by email?", "No. Late or emailed entries are not accepted. Make sure your file is fully uploaded on Unstop before the deadline."],
    ["How are projects judged?", "Projects are judged live by a panel of industry experts through interactive demos on Day 2."],
    ["What do winners get?", "Overall Winner ₹25,000, Hardware Track Winner ₹15,000, Software Track Winner ₹15,000 and Best Innovation ₹10,000, plus space-themed merchandise, certification and sponsor learning credits."],
    ["Will participants receive certificates?", "Yes. Every participant gets a participation certificate."]
  ],
  organiserClub: "StarForge Organising Committee"
}
