// ---------------------------------------------------------------------------
// All site content lives here. Edit this file to update the page.
// Facts are sourced from Wikipedia (EN/ZH) and cited pages in README.md.
// ---------------------------------------------------------------------------

export const site = {
  name: 'Wang Churan',
  nameZh: '王楚然',
  role: 'Actress',
  place: 'Shanghai, China',
  born: '21 January 1999',
  tagline: 'Actress · Shanghai',
  intro: 'A fan-made archive of the actress Wang Churan.',
  emailPlaceholder: 'your@email.com',
};

export const heroMeta = [
  ['Born', '1999 · Shanghai'],
  ['Trained', 'Shanghai Theatre Academy'],
  ['Agency', 'Fosun Pictures'],
];

export const about = {
  heading: ['A quiet presence,', 'a long reach.'],
  lead: 'She arrived as a supporting cousin in a costume comedy and grew into one of the most recognisable faces of her generation — without ever quite playing the same woman twice.',
  paragraphs: [
    'Wang Churan was born in Shanghai on 21 January 1999 and grew up between Shanghai and Zibo, in Shandong province. She studied acting at the Shanghai Theatre Academy, after earlier training at its affiliated opera school, and was still a student when television came calling.',
    'Her screen debut came in 2017 as Liu Xiyin in the historical comedy Oh My General, a role that arrived with two soundtrack singles and a spin-off film. Wider recognition followed in 2020 with Serenade of Peaceful Joy, in which her Consort Zhang Bihan — ambitious, tender, impossible to ignore — became the performance people remembered.',
    'Since then she has moved between dynasties and genres: a palace cook in Royal Feast, a doctor in Have a Crush on You, a costumed heroine in The Longest Promise, and Xu Qin in Fireworks of My Heart. In 2024 she joined Joy of Life 2 and led Are You the One. In 2026 she appeared in the CCTV Spring Festival Gala as Wang Zhaojun in the segment 贺花神, and led How Dare You!?, Love Has Fireworks and Overdo.',
  ],
  facts: [
    ['Born', '21 January 1999 · Shanghai'],
    ['Raised', 'Shanghai & Zibo, Shandong'],
    ['Training', 'Shanghai Theatre Academy'],
    ['Agency', 'Fosun Pictures, since 2021'],
  ],
  recognition: [
    {
      year: '2024',
      text: 'Weibo Vision Conference — Rising Actor Award',
    },
    {
      year: '2024',
      text: '28th Asian Television Awards — Best Actress in a Digital Drama nominee, for Have a Crush on You',
    },
  ],
};

// image: file in /public/images used for the hover preview (decorative)
export const works = [
  {
    year: '2017',
    title: 'Oh My General',
    titleZh: '将军在上',
    role: 'Liu Xiyin',
    note: 'Screen debut · web series',
    image: 'oh_my_general',
  },
  {
    year: '2020',
    title: 'Serenade of Peaceful Joy',
    titleZh: '清平乐',
    role: 'Consort Zhang Bihan',
    note: 'Hunan TV',
    image: 'serenade',
  },
  {
    year: '2022',
    title: 'Royal Feast',
    titleZh: '尚食',
    role: 'Su Yuehua',
    note: 'Mango TV',
    image: 'royal_feast',
  },
  {
    year: '2023',
    title: 'Have a Crush on You',
    titleZh: '听说你喜欢我',
    role: 'Ruan Liuzheng',
    note: 'Lead · Tencent Video',
    image: 'have_a_crush',
  },
  {
    year: '2023',
    title: 'The Longest Promise',
    titleZh: '玉骨遥',
    role: 'Bai Xuelu',
    note: 'Tencent Video',
    image: 'longest_promise',
  },
  {
    year: '2023',
    title: 'Fireworks of My Heart',
    titleZh: '我的人间烟火',
    role: 'Xu Qin',
    note: 'Lead · Hunan TV',
    image: 'fireworks',
  },
  {
    year: '2024',
    title: 'Joy of Life 2',
    titleZh: '庆余年 第二季',
    role: 'Sang Wen',
    note: 'CCTV · Tencent Video',
    image: 'joy_of_life',
  },
  {
    year: '2024',
    title: 'Are You the One',
    titleZh: '柳舟记',
    role: 'Liu Miantang',
    note: 'Lead · Tencent Video',
    image: 'you_are_the_one',
  },
  {
    year: '2026',
    title: 'How Dare You!?',
    titleZh: '成何体统',
    role: 'Yu Wanyin / Wang Cuihua',
    note: 'Lead · iQIYI',
    image: 'how_dare_you',
  },
  {
    year: '2026',
    title: 'Love Has Fireworks',
    titleZh: '爱情有烟火',
    role: 'Qian Fei',
    note: 'Lead · CCTV · Tencent · iQIYI',
    image: 'love_has_fireworks',
  },
  {
    year: '2026',
    title: 'Overdo',
    titleZh: '这一秒过火',
    role: 'Ren Susu / Fang Mulan',
    note: 'Lead · iQIYI · Tencent Video',
    image: 'overdo',
  },
];

export const forthcoming = [
  {
    year: 'TBA',
    title: 'Hidden Shadow',
    titleZh: '烽影燃梅香',
    role: 'Mei Jiu / An Jiu',
    note: 'Youku',
    image: 'hidden_shadow',
  },
  {
    year: 'TBA',
    title: 'A Ming Dynasty Adventure',
    titleZh: '明月录',
    role: 'Wei Caiwei',
    note: 'Mango TV',
    image: 'ming_dynasty',
  },
  {
    year: 'TBA',
    title: 'Tales of the Floating World',
    titleZh: '浮生',
    role: 'Sha Luo',
    note: 'iQIYI',
    image: 'tales_of_floating',
  },
];

export const gallery = [
  {
    src: '/images/gallery-01.webp',
    width: 1080,
    height: 1440,
    alt: 'Wang Churan photographed in a silver beaded dress against a warm stone wall at golden hour',
    caption: 'Portrait study — 01',
    credit: 'Wikimedia Commons · CC0',
  },
  {
    src: '/images/gallery-02.webp',
    width: 960,
    height: 1280,
    alt: 'Wang Churan holding pale pink orchids against a rose-coloured studio backdrop',
    caption: 'Portrait study — 02',
    credit: 'Wikimedia Commons · CC0',
  },
  {
    src: '/images/gallery-03.webp',
    width: 1400,
    height: 1867,
    alt: 'Wang Churan in a gold sequinned dress, photographed backstage before an event',
    caption: 'Portrait study — 03',
    credit: 'Wikimedia Commons · CC0',
  },
  {
    src: '/images/gallery-04.webp',
    width: 1600,
    height: 1042,
    alt: 'Close-up portrait of Wang Churan in a pale satin dress against a textured grey wall',
    caption: 'Portrait study — 04',
    credit: 'Wikimedia Commons · CC0',
  },
];

export const quote = {
  label: 'A note from the archive',
  text: 'One face, a thousand lifetimes. A Song consort, a Republican-era daughter, a modern doctor — she moves between centuries without ever losing the same quiet gaze.',
  zh: '一人千面',
};

export const socials = [
  {
    platform: 'Weibo',
    handle: '@-王楚然-',
    url: 'https://weibo.com/u/3828809034',
    note: 'Main account',
  },
  {
    platform: 'Instagram',
    handle: '@churan00',
    url: 'https://www.instagram.com/churan00/',
    note: 'Official account',
  },
];

export const credits = [
  {
    file: '007fglHJly1ig7gp6p3kxj31jk223aol.jpg',
    used: 'Hero portrait, gallery 04',
    url: 'https://commons.wikimedia.org/wiki/File:007fglHJly1ig7gp6p3kxj31jk223aol.jpg',
  },
  {
    file: 'HVdtqRQasAACRp2.jpg',
    used: 'About portrait',
    url: 'https://commons.wikimedia.org/wiki/File:HVdtqRQasAACRp2.jpg',
  },
  {
    file: '8b5b7410ly1ij81gay5zpj20u0140q8y.jpg',
    used: 'Gallery 01',
    url: 'https://commons.wikimedia.org/wiki/File:8b5b7410ly1ij81gay5zpj20u0140q8y.jpg',
  },
  {
    file: '008nnop7gy1iir7mcxn59j348s5npe87.jpg',
    used: 'Gallery 02',
    url: 'https://commons.wikimedia.org/wiki/File:008nnop7gy1iir7mcxn59j348s5npe87.jpg',
  },
  {
    file: 'G8NEDpuasAA-pob.jpg',
    used: 'Gallery 03',
    url: 'https://commons.wikimedia.org/wiki/File:G8NEDpuasAA-pob.jpg',
  },
];
