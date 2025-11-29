export type Category = "Health" | "Education" | "Agriculture" | "Revenue" | "Public Works" | "Other";

export const categories: { id: Category; en: string; mr: string; hi: string }[] = [
  { id: "Health", en: "Health", mr: "आरोग्य", hi: "स्वास्थ्य" },
  { id: "Education", en: "Education", mr: "शिक्षण", hi: "शिक्षा" },
  { id: "Agriculture", en: "Agriculture", mr: "कृषी", hi: "कृषि" },
  { id: "Revenue", en: "Revenue", mr: "महसूल", hi: "राजस्व" },
  { id: "Public Works", en: "Public Works", mr: "सार्वजनिक बांधकाम", hi: "लोक निर्माण" },
  { id: "Other", en: "More", mr: "इतर", hi: "और" },
];

export const districts = [
  {
    name: "Ahmednagar",
    talukas: ["Ahmednagar", "Akole", "Jamkhed", "Karjat", "Kopargaon", "Nagar", "Nevasa", "Parner", "Pathardi", "Rahata", "Rahuri", "Sangamner", "Shevgaon", "Shrirampur"]
  },
  {
    name: "Akola",
    talukas: ["Akola", "Akot", "Balapur", "Barshi Takli", "Murtijapur", "Patur", "Telhara"]
  },
  {
    name: "Amravati",
    talukas: ["Amravati", "Anjangaon Surji", "Bhatkuli", "Chandur Bazar", "Chandur Railway", "Chikhaldara", "Churni", "Daryapur", "Dasarkhed", "Dharni", "Dhamangaon Railway", "Morshi", "Nandgaon Khandeshwar", "Teosa", "Warud"]
  },
  {
    name: "Aurangabad",
    talukas: ["Aurangabad", "Gangapur", "Kannad", "Khultabad", "Paithan", "Phulambri", "Sillod", "Soegaon", "Vaijapur"]
  },
  {
    name: "Beed",
    talukas: ["Beed", "Ambejogai", "Ashti", "Georai", "Kaij", "Majalgaon", "Parli", "Patoda", "Shirur", "Wadvani", "Wadwani"]
  },
  {
    name: "Bhandara",
    talukas: ["Bhandara", "Lakhandur", "Lakhni", "Mohadi", "Pauni", "Sakoli", "Tumsar"]
  },
  {
    name: "Buldhana",
    talukas: ["Buldhana", "Chikhli", "Deolgaon Raja", "Jalgaon Jamod", "Khamgaon", "Lonar", "Malkapur", "Mehkar", "Motala", "Nandura", "Sangrampur", "Shegaon", "Sindkhed Raja"]
  },
  {
    name: "Chandrapur",
    talukas: ["Chandrapur", "Bhadravati", "Ballarpur", "Bramhapuri", "Chimur", "Corporal", "Gadchiroli", "Gondpipri", "Jivati", "Mul", "Nagbhir", "Pombhurna", "Rajura", "Saoli", "Sindewahi", "Warora"]
  },
  {
    name: "Dhule",
    talukas: ["Dhule", "Sakri", "Shirpur", "Sindkhede"]
  },
  {
    name: "Gadchiroli",
    talukas: ["Gadchiroli", "Aheri", "Armori", "Bhamragad", "Chamorshi", "Desaiganj (Vadasa)", "Dhanora", "Etapalli", "Korchi", "Kurkheda", "Mulchera", "Sironcha"]
  },
  {
    name: "Gondia",
    talukas: ["Gondia", "Amgaon", "Arjuni Morgaon", "Deori", "Goregaon", "Sadak Arjuni", "Salekasa", "Tirora"]
  },
  {
    name: "Hingoli",
    talukas: ["Hingoli", "Aundha (Nagnath)", "Basmat", "Kalamnuri", "Sengaon"]
  },
  {
    name: "Jalgaon",
    talukas: ["Jalgaon", "Amalner", "Bhadgaon", "Bhusawal", "Chalisgaon", "Chopda", "Dharangaon", "Erandol", "Faizpur", "Jamner", "Muktainagar", "Pachora", "Parola", "Raver", "Yawal"]
  },
  {
    name: "Jalna",
    talukas: ["Jalna", "Ambad", "Bhokardan", "Ghansawangi", "Jafrabad", "Mantha", "Partur"]
  },
  {
    name: "Kolhapur",
    talukas: ["Kolhapur", "Ajra", "Bhudargad", "Chandgad", "Gaganbawda", "Hatkanangle", "Kagal", "Karvir", "Panhala", "Radhanagari", "Shahuwadi", "Shirol"]
  },
  {
    name: "Latur",
    talukas: ["Latur", "Ahmadpur", "Ausa", "Chakur", "Deoni", "Jalkot", "Nilanga", "Renapur", "Shirur Anantpal", "Udgir"]
  },
  {
    name: "Mumbai City",
    talukas: ["Mumbai City"]
  },
  {
    name: "Mumbai Suburban",
    talukas: ["Andheri", "Borivali", "Kurla"]
  },
  {
    name: "Nagpur",
    talukas: ["Nagpur Urban", "Nagpur Rural", "Bhiwapur", "Hingna", "Kamptee", "Katol", "Kuhi", "Mauda", "Narkhed", "Parseoni", "Ramtek", "Saoner", "Umred"]
  },
  {
    name: "Nanded",
    talukas: ["Nanded", "Ardhapur", "Bhokar", "Biloli", "Degloor", "Dharmabad", "Hadgaon", "Himayatnagar", "Kandhar", "Kinwat", "Loha", "Mahoor", "Mudkhed", "Mukhed", "Naigaon (Khairgaon)", "Umri"]
  },
  {
    name: "Nandurbar",
    talukas: ["Nandurbar", "Akkalkuwa", "Akrani", "Dhadgaon", "Nawapur", "Shahada", "Taloda"]
  },
  {
    name: "Nashik",
    talukas: ["Nashik", "Baglan", "Chandvad", "Deola", "Dindori", "Igatpuri", "Kalwan", "Malegaon", "Nandgaon", "Niphad", "Peint", "Sinnar", "Surgana", "Trimbakeshwar", "Yeola"]
  },
  {
    name: "Osmanabad",
    talukas: ["Osmanabad", "Bhoom", "Kalamb", "Lohara", "Omerga", "Paranda", "Tuljapur", "Washi"]
  },
  {
    name: "Palghar",
    talukas: ["Palghar", "Dahanu", "Jawhar", "Mokhada", "Talasari", "Vasai", "Vikramgad", "Wada"]
  },
  {
    name: "Parbhani",
    talukas: ["Parbhani", "Gangakhed", "Jintur", "Manwath", "Palam", "Pathri", "Purna", "Sailu", "Sonpeth"]
  },
  {
    name: "Pune",
    talukas: ["Pune City", "Ambegaon", "Baramati", "Bhor", "Daund", "Haveli", "Indapur", "Junnar", "Khed", "Mawal", "Mulshi", "Purandar", "Shirur", "Velhe"]
  },
  {
    name: "Raigad",
    talukas: ["Alibag", "Karjat", "Khalapur", "Mahad", "Mangaon", "Mhasla", "Murud", "Panvel", "Pen", "Poladpur", "Roha", "Shrivardhan", "Sudhagad", "Tala", "Uran"]
  },
  {
    name: "Ratnagiri",
    talukas: ["Ratnagiri", "Chiplun", "Dapoli", "Guhagar", "Khed", "Lanja", "Mandangad", "Rajapur", "Sangameshwar"]
  },
  {
    name: "Sangli",
    talukas: ["Sangli", "Atpadi", "Jath", "Kadegaon", "Khanapur", "Miraj", "Palus", "Shirala", "Tasgaon", "Walwa"]
  },
  {
    name: "Satara",
    talukas: ["Satara", "Jaoli", "Khandala", "Khatav", "Koregaon", "Man", "Mahabaleshwar", "Patan", "Phaltan", "Wai"]
  },
  {
    name: "Sindhudurg",
    talukas: ["Kudal", "Devgad", "Dodamarg", "Kankavli", "Malvan", "Sawantwadi", "Vengurla", "Vaibhavwadi"]
  },
  {
    name: "Solapur",
    talukas: ["Solapur North", "Solapur South", "Akkalkot", "Barshi", "Karmala", "Madha", "Malshiras", "Mangalvedhe", "Mohol", "North Solapur", "Pandharpur", "Sangole", "South Solapur"]
  },
  {
    name: "Thane",
    talukas: ["Thane", "Ambernath", "Bhiwandi", "Kalyan", "Murbad", "Shahapur", "Ulhasnagar"]
  },
  {
    name: "Wardha",
    talukas: ["Wardha", "Arvi", "Ashti", "Deoli", "Hinganghat", "Karanja", "Samudrapur", "Seloo"]
  },
  {
    name: "Washim",
    talukas: ["Washim", "Karanja", "Malegaon", "Mangrulpir", "Manora", "Risod"]
  },
  {
    name: "Yavatmal",
    talukas: ["Yavatmal", "Arni", "Babhulgaon", "Darwha", "Digras", "Ghatanji", "Kalamb", "Kelapur", "Mahagaon", "Maregaon", "Ner", "Pandharkawada", "Pusad", "Ralegaon", "Umarkhed", "Wani", "Zari-Jamani"]
  }
];
