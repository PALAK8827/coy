/**
 * 36 Realistic Mock Profiles for Coy Dating App
 * Diverse names, ages, colleges/cities, high quality portraits, bios, and interests.
 */
const mockProfiles = [
  {
    id: 1,
    name: "Sarah Jenkins",
    age: 23,
    photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    bio: "Architecture student by day, amateur sourdough baker by night. Looking for someone who can appreciate brutalist buildings and bad puns.",
    city_or_college: "Columbia University",
    interests: ["Architecture", "Baking", "Art Galleries", "Coffee Roasting", "Indie Rock"]
  },
  {
    id: 2,
    name: "Alex Rivera",
    age: 25,
    photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    bio: "UX designer obsessed with typography and third-wave espresso. Let's debate whether dark mode is a personality trait.",
    city_or_college: "San Francisco, CA",
    interests: ["UX Design", "Espresso", "Vinyl Records", "Bouldering", "Sci-Fi Books"]
  },
  {
    id: 3,
    name: "Priya Sharma",
    age: 22,
    photo_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    bio: "Neuroscience researcher fascinated by memory and sleep cycles. Teach me your favorite board game and I'll make you masala chai.",
    city_or_college: "UC Berkeley",
    interests: ["Neuroscience", "Chai", "Board Games", "Trail Running", "Podcasts"]
  },
  {
    id: 4,
    name: "Lucas Vance",
    age: 26,
    photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    bio: "Landscape photographer traveling in a converted van. Currently documenting national parks and perfecting camp cooking recipes.",
    city_or_college: "Denver, CO",
    interests: ["Photography", "Camping", "Van Life", "Acoustic Guitar", "Rock Climbing"]
  },
  {
    id: 5,
    name: "Emily Watson",
    age: 24,
    photo_url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    bio: "Fintech analyst who actually likes math. In my free time I train for half marathons and scout the best ramen spots in town.",
    city_or_college: "New York University",
    interests: ["Marathon", "Ramen", "Economics", "Pilates", "Museums"]
  },
  {
    id: 6,
    name: "Elena Rostova",
    age: 23,
    photo_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    bio: "Classical cellist transitioning into film composition. Tell me your top 3 soundtrack moments and let's go vinyl hunting.",
    city_or_college: "Juilliard School",
    interests: ["Cello", "Film Scores", "Classical Music", "Vintage Thrifting", "Poetry"]
  },
  {
    id: 7,
    name: "Daniel Kim",
    age: 27,
    photo_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    bio: "Startup product manager and street photographer. Looking for someone who doesn't mind walking 15,000 steps on a Saturday afternoon.",
    city_or_college: "Seattle, WA",
    interests: ["Street Photography", "Startups", "Matcha", "Snowboarding", "Japanese Food"]
  },
  {
    id: 8,
    name: "Jessica Miller",
    age: 24,
    photo_url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    bio: "Environmental scientist working on coastal conservation. Avid surfer and passionate about zero-waste living.",
    city_or_college: "UC San Diego",
    interests: ["Surfing", "Marine Biology", "Sustainability", "Scuba Diving", "Açaí Bowls"]
  },
  {
    id: 9,
    name: "Marcus Chen",
    age: 25,
    photo_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    bio: "AI researcher building generative models. Big fan of indie cinema, rock climbing, and making pasta from scratch.",
    city_or_college: "MIT",
    interests: ["Artificial Intelligence", "Indie Cinema", "Pasta Making", "Bouldering", "Synthwave"]
  },
  {
    id: 10,
    name: "Sophia Martinez",
    age: 22,
    photo_url: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80",
    bio: "Literature major writing a historical fiction novel. Coffee addict, collector of antique postcards, and fond of rainy afternoons.",
    city_or_college: "Boston University",
    interests: ["Creative Writing", "Antiques", "Espresso", "Bookstores", "Jazz"]
  },
  {
    id: 11,
    name: "Noah Davis",
    age: 26,
    photo_url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
    bio: "Civil engineer building green urban transit. Weekend cyclist, dog lover, and amateur pizza pizzaiolo.",
    city_or_college: "Chicago, IL",
    interests: ["Cycling", "Urban Planning", "Neapolitan Pizza", "Golden Retrievers", "Podcasts"]
  },
  {
    id: 12,
    name: "Hannah Lee",
    age: 23,
    photo_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    bio: "Graphic designer & ceramicist. If my hands aren't covered in clay, they're holding a cold brew or a camera.",
    city_or_college: "Rhode Island School of Design",
    interests: ["Ceramics", "Typography", "Cold Brew", "Exhibitions", "Film Photography"]
  },
  {
    id: 13,
    name: "Maya Patel",
    age: 24,
    photo_url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
    bio: "Pediatric resident surviving on dark chocolate and hospital laughter. Looking for someone genuine to decompress with after long shifts.",
    city_or_college: "Johns Hopkins University",
    interests: ["Medicine", "Yoga", "Baking", "True Crime", "Travel"]
  },
  {
    id: 14,
    name: "Oliver Wright",
    age: 27,
    photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
    bio: "Software architect who prefers hiking over screen time on weekends. Fluent in Python and sarcasm.",
    city_or_college: "Austin, TX",
    interests: ["Hiking", "Open Source", "Craft Beer", "Live Music", "Camping"]
  },
  {
    id: 15,
    name: "Zoe Kravitz",
    age: 22,
    photo_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    bio: "Fashion merchandising student with an unhealthy obsession with vintage boots and flea markets.",
    city_or_college: "Parsons School of Design",
    interests: ["Fashion", "Flea Markets", "Sushi", "Contemporary Art", "R&B Music"]
  },
  {
    id: 16,
    name: "Liam O'Connor",
    age: 25,
    photo_url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    bio: "Biomedical engineer and certified divemaster. Looking for adventure partner for impromptu weekend trips.",
    city_or_college: "Boston, MA",
    interests: ["Scuba", "Biotech", "Triathlon", "Acoustic Music", "Cooking"]
  },
  {
    id: 17,
    name: "Chloe Bennett",
    age: 24,
    photo_url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    bio: "Community organizer & botanical garden volunteer. Tell me about the weirdest fact you know.",
    city_or_college: "University of Washington",
    interests: ["Plants", "Gardening", "Trivia", "Biking", "Folk Music"]
  },
  {
    id: 18,
    name: "Ethan Walker",
    age: 26,
    photo_url: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80",
    bio: "Aerospace engineer dreaming about Mars rovers. I brew pour-over coffee like a mad scientist.",
    city_or_college: "Purdue University",
    interests: ["Space Exploration", "Pour-Over Coffee", "3D Printing", "Chess", "Stargazing"]
  },
  {
    id: 19,
    name: "Ava Dubois",
    age: 23,
    photo_url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
    bio: "Culinary arts graduate specializing in French pastry. Can and will bake fresh croissants on Sunday mornings.",
    city_or_college: "Culinary Institute of America",
    interests: ["Pastry Arts", "French Cinema", "Farmers Markets", "Wine Tasting", "Calligraphy"]
  },
  {
    id: 20,
    name: "Benjamin Scott",
    age: 27,
    photo_url: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=800&q=80",
    bio: "Documentary filmmaker currently shooting a story on urban beekeeping. High energy, loves karaoke.",
    city_or_college: "Los Angeles, CA",
    interests: ["Filmmaking", "Karaoke", "Beekeeping", "Vintage Cameras", "Thai Food"]
  },
  {
    id: 21,
    name: "Isabella Rossi",
    age: 22,
    photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    bio: "Art history major and museum docent. Believer that life is too short to drink mediocre wine.",
    city_or_college: "Florence, Italy / Stanford",
    interests: ["Renaissance Art", "Wine", "Travel", "Museums", "Italian Cooking"]
  },
  {
    id: 22,
    name: "James Wilson",
    age: 25,
    photo_url: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=800&q=80",
    bio: "Cybersecurity analyst by day, indie game developer by night. Looking for someone to co-op life with.",
    city_or_college: "Carnegie Mellon",
    interests: ["Game Dev", "Cybersecurity", "Synthesizers", "Anime", "Cat Rescues"]
  },
  {
    id: 23,
    name: "Mia Tanaka",
    age: 24,
    photo_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    bio: "Robotics engineer designing wearable prosthetics. I love bento design, pottery, and sci-fi anime.",
    city_or_college: "Georgia Tech",
    interests: ["Robotics", "Bento", "Anime", "Kickboxing", "Tech Gadgets"]
  },
  {
    id: 24,
    name: "Samuel Brooks",
    age: 28,
    photo_url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
    bio: "High school history teacher who loves trivia nights and road trips. I make an incredible grilled cheese.",
    city_or_college: "Philadelphia, PA",
    interests: ["History", "Trivia", "Road Trips", "Vinyl Records", "Board Games"]
  },
  {
    id: 25,
    name: "Olivia Zhang",
    age: 23,
    photo_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    bio: "Venture analyst focusing on clean tech. When not reading pitch decks, I'm playing tennis or painting watercolor landscapes.",
    city_or_college: "Harvard Business School",
    interests: ["Clean Energy", "Tennis", "Watercolor", "Podcasts", "Matcha Lattes"]
  },
  {
    id: 26,
    name: "Gabriel Santos",
    age: 26,
    photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    bio: "Brazilian Jiu-Jitsu instructor and acoustic guitarist. Lover of acai bowls, ocean breeze, and deep conversations.",
    city_or_college: "San Diego State",
    interests: ["Martial Arts", "BJJ", "Guitar", "Surfing", "Beach Volleyball"]
  },
  {
    id: 27,
    name: "Aisha Al-Mansoor",
    age: 24,
    photo_url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
    bio: "Human rights lawyer in training. Passionate about international affairs, strong espresso, and contemporary dance.",
    city_or_college: "Georgetown Law",
    interests: ["Human Rights", "Espresso", "Debate", "Dance", "World Cinema"]
  },
  {
    id: 28,
    name: "Tyler Reed",
    age: 25,
    photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    bio: "Woodworker & custom furniture maker. Patient, hands-on, and loves finding hidden gem coffee shops in every city.",
    city_or_college: "Portland, OR",
    interests: ["Woodworking", "Design", "Specialty Coffee", "Hiking", "Dogs"]
  },
  {
    id: 29,
    name: "Camila Fernandez",
    age: 23,
    photo_url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    bio: "Marketing strategist with a soft spot for indie bookstores and botanical illustrations. Let's find the best tacos.",
    city_or_college: "University of Miami",
    interests: ["Tacos", "Illustration", "Bookstores", "Salsa Dancing", "Beach Days"]
  },
  {
    id: 30,
    name: "Nathaniel Cole",
    age: 27,
    photo_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    bio: "Emergency room nurse. Calm under pressure, great listener, and always down for late-night diner runs.",
    city_or_college: "Chicago, IL",
    interests: ["Healthcare", "Running", "Live Comedy", "Cooking", "Late Diners"]
  },
  {
    id: 31,
    name: "Layla Hassan",
    age: 22,
    photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    bio: "Bioinformatics undergrad analyzing gene expressions. Lover of stargazing, cats, and experimental synth-pop.",
    city_or_college: "Cornell University",
    interests: ["Genomics", "Astronomy", "Cats", "Synth-Pop", "Board Games"]
  },
  {
    id: 32,
    name: "Devon Bailey",
    age: 25,
    photo_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    bio: "Sound designer for video games. Can distinguish 15 kinds of footstep sounds on gravel. Let's make a playlist together.",
    city_or_college: "Montreal / McGill",
    interests: ["Sound Design", "Electronic Music", "Gaming", "Synths", "Skiing"]
  },
  {
    id: 33,
    name: "Kaitlyn Moore",
    age: 24,
    photo_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    bio: "Veterinary student who will inevitably pet every dog we pass on the street. Sorry not sorry!",
    city_or_college: "UC Davis",
    interests: ["Veterinary Care", "Animals", "Kayaking", "Hiking", "Baking"]
  },
  {
    id: 34,
    name: "Julian Meyer",
    age: 26,
    photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
    bio: "Barista champion turned specialty coffee roaster. Let me brew you a single-origin Geisha that will change your life.",
    city_or_college: "Portland State",
    interests: ["Specialty Coffee", "Latte Art", "Cycling", "Indie Music", "Photography"]
  },
  {
    id: 35,
    name: "Serena Thorne",
    age: 23,
    photo_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    bio: "Philosophy graduate student contemplating the ethics of artificial intelligence. Loves tea houses and rainy train rides.",
    city_or_college: "Oxford / Yale",
    interests: ["Philosophy", "Tea Houses", "Ethics", "Writing", "Museums"]
  },
  {
    id: 36,
    name: "Brandon Hayes",
    age: 27,
    photo_url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    bio: "Civil litigation attorney who leaves work at work. Big fan of live standup comedy, golf, and grilling briskets.",
    city_or_college: "Dallas, TX",
    interests: ["Standup Comedy", "BBQ", "Golf", "Live Music", "Fitness"]
  }
];

// Profile IDs that have already liked the demo user (for demonstrating mutual matches)
const prelikedProfileIds = [1, 3, 6, 9, 13, 17, 22, 27];

module.exports = {
  mockProfiles,
  prelikedProfileIds
};
