// ===== EDIT ME: all event details live here =====
export const CONFIG = {
  eventStart: '2026-12-12T09:00:00+05:30', // countdown target (confirm start time)
  registerUrl: '#',                         // Unstop link
  brochureUrl: '#',                         // e.g. '/brochure.pdf' (put file in /public)
  pptTemplateUrl: '#',                      // e.g. '/template.pptx'
  instagramUrl: '#',
  contacts: [
    { name: 'Contact 1', phone: '+91XXXXXXXXXX' },
    { name: 'Contact 2', phone: '+91XXXXXXXXXX' }
  ],
  prizeTotal: '₹XX,XXX',
  prizes: [
    { place: '1st', medal: '🥇', amount: '₹XX,XXX', first: true },
    { place: '2nd', medal: '🥈', amount: '₹XX,XXX' },
    { place: '3rd', medal: '🥉', amount: '₹XX,XXX' }
  ],
  problems: {
    hw: [
      { title: 'Hardware Problem 1', desc: 'To be announced.' },
      { title: 'Hardware Problem 2', desc: 'To be announced.' },
      { title: 'Hardware Problem 3', desc: 'To be announced.' }
    ],
    sw: [
      { title: 'Software Problem 1', desc: 'To be announced.' },
      { title: 'Software Problem 2', desc: 'To be announced.' },
      { title: 'Software Problem 3', desc: 'To be announced.' }
    ]
  },
  timeline: [
    { when: 'TBA', title: 'Registrations open', desc: 'Register for free on Unstop.' },
    { when: 'TBA', title: 'Problem statements released', desc: '3 hardware + 3 software.' },
    { when: 'TBA', title: 'PPT submission deadline', desc: 'Online screening round.' },
    { when: 'TBA', title: 'Shortlist announced', desc: 'Selected teams invited to campus.' },
    { when: '12 Dec', title: 'Hackathon begins', desc: 'Check-in, opening ceremony, 24-hour build starts.' },
    { when: '13 Dec', title: 'Final presentations & judging', desc: 'Demos to the jury.' },
    { when: '13 Dec', title: 'Prize distribution & closing', desc: 'Winners announced.' }
  ],
  faq: [
    ['Who can participate?', 'Any college student currently enrolled in a recognised institution. This is an intercollege event, so teams from any college are welcome.'],
    ['What is the team size?', 'Teams of 2 to 4 members. [Confirm]'],
    ['Is there a registration fee?', 'No. Registration is completely free, and you register through Unstop.'],
    ['Can teams include members from different colleges?', 'Yes. [Confirm]'],
    ['Do we need a ready idea to register?', 'No. Problem statements are released later; the screening round needs a PPT on your approach.'],
    ['What should we bring?', 'Laptops, chargers, college ID, and hardware components for the hardware track. [Confirm]'],
    ['Will food and accommodation be provided?', 'Meals and snacks are provided during the 24 hours. [Confirm details]'],
    ['Will participants receive certificates?', 'Yes, all participants receive participation certificates. [Confirm]']
  ],
  organiserClub: '[Club / Department name]'
}
