import type { Translation } from '@/constants/i18n'

export const ro: Translation = {
  seo: {
    title: 'Evo Studio — Salon de frumusețe în Chișinău',
    description:
      'Salon de frumusețe Evo Studio în Chișinău: sprâncene, gene, manichiură, păr și machiaj. Programări online, maeștri certificați, atmosferă elegantă.',
    ogTitle: 'Evo Studio — eleganță și grijă în fiecare detaliu',
  },
  nav: {
    services: 'Servicii',
    prices: 'Preț',
    about: 'Despre noi',
    team: 'Echipa',
    contact: 'Contact',
    book: 'Programare',
  },
  hero: {
    tag: 'Frumusețea stă în detalii',
    title_1: 'Studio de',
    title_em: 'îngrijire',
    title_2: 'impecabilă',
    subtitle:
      'Un spațiu unde fiecare detaliu este creat pentru frumusețea ta. Sprâncene, gene, unghii, păr și machiaj — abordare personală pentru fiecare cliență.',
    cta_primary: 'Programează-te',
    cta_secondary: 'Vezi prețurile',
    stat_1_v: '7+',
    stat_1_l: 'ani de activitate',
    stat_2_v: '15 000+',
    stat_2_l: 'cliente mulțumite',
    stat_3_v: '24',
    stat_3_l: 'tipuri de servicii',
  },
  services: {
    label: 'Serviciile noastre',
    title_1: 'Cinci direcții,',
    title_em: 'un singur spațiu',
    intro:
      'De la manichiură la machiaj — am adunat principalele direcții beauty într-un singur studio, pentru o îngrijire completă în aceeași estetică.',
    items: [
      {
        num: '01',
        title: 'Unghii',
        desc: 'Manichiură, pedichiură, extensii, design. Instrumente sterile, geluri premium.',
      },
      {
        num: '02',
        title: 'Păr',
        desc: 'Tunsori, vopsire, botox, keratină, coafuri. Restaurare blândă și schimbări spectaculoase.',
      },
      {
        num: '03',
        title: 'Sprâncene și gene',
        desc: 'Vopsire, laminare, corecție, extensii, botox. Privirea ta perfectă — grija noastră.',
      },
      {
        num: '04',
        title: 'Machiaj',
        desc: 'De zi, de seară, mireasă, vizaj pentru ședințe foto. Imagini memorabile.',
      },
    ],
    more: 'Detalii',
  },
  price: {
    label: 'Preț',
    title_1: 'Prețuri și',
    title_em: 'servicii',
    intro:
      'Prețuri actualizate pe direcții. Toate sumele sunt în lei moldovenești (MDL). Costul exact se confirmă la consultație.',
    tabs: ['Unghii', 'Păr', 'Sprâncene și gene', 'Machiaj'],
    categories: {
      nails: [
        { name: 'Manichiură clasică', desc: 'cu acoperire gel-lac', price: '000' },
        { name: 'Manichiură cu aparat', desc: 'tehnică combinată', price: '000' },
        { name: 'Pedichiură combinată', desc: 'cu acoperire', price: '000' },
        { name: 'Extensii de unghii', desc: 'gel / acril, o mână', price: '000' },
        { name: 'Înlăturarea acoperirii', desc: 'fără manichiură ulterioară', price: '000' },
        { name: 'Design o unghie', desc: 'cristale / pictură manuală', price: '00' },
      ],
      hair: [
        { name: 'Tuns femei', desc: 'cu coafură', price: '000' },
        { name: 'Vopsire într-o singură nuanță', desc: 'păr scurt', price: '000' },
        { name: 'Vopsire complexă', desc: 'airtouch / balayage / șatuș', price: '0 000' },
        { name: 'Botox pentru păr', desc: 'restaurare profundă', price: '000' },
        { name: 'Îndreptare cu keratină', desc: 'până la umeri', price: '0 000' },
        { name: 'Coafură de seară', desc: 'bucle / coc / împletituri', price: '000' },
      ],
      brows_lashes: [
        { name: 'Vopsire', desc: 'vopsea/henna + corecție', price: '300' },
        { name: 'Laminare + corecție + vopsire', desc: '', price: '400' },
        { name: 'Laminare + corecție', desc: '', price: '350' },
        { name: 'Corecție', desc: 'pensetă / ceară', price: '150' },
        { name: 'SPA / botox pentru sprâncene', desc: '', price: '100' },
        { name: 'Îndepărtarea firelor de păr', desc: 'o zonă', price: '50' },
        { name: 'Extensii classic', desc: 'volum 1D', price: '000' },
        { name: 'Extensii 2D / 3D', desc: 'volum spectaculos', price: '000' },
        { name: 'Laminare gene', desc: 'cu vopsire', price: '000' },
        { name: 'Botox pentru gene', desc: 'hrănire și îngrijire', price: '000' },
        { name: 'Înlăturare extensii', desc: '', price: '00' },
      ],
      makeup: [
        { name: 'Machiaj de zi', desc: 'ușor, natural', price: '000' },
        { name: 'Machiaj de seară', desc: 'accente și tuș', price: '000' },
        { name: 'Machiaj de mireasă', desc: 'cu probă', price: '0 000' },
        { name: 'Machiaj pentru ședință foto', desc: 'rezistent, pentru lumină', price: '000' },
        { name: 'Curs de automachiaj', desc: 'lecție individuală', price: '000' },
      ],
    },
    footnote:
      'Prețurile sunt orientative și urmează să fie actualizate. Costul final se stabilește la consultație.',
    unit: 'MDL',
  },
  about: {
    label: 'Despre studio',
    title_1: 'Evo —',
    title_em: 'evoluția',
    title_2: 'frumuseții tale',
    p1: 'Suntem un studio mic, de autor, unde procedurile beauty devin un ritual de îngrijire. Fiecare zonă de lucru este gândită în jurul confortului clientei: lumină caldă, muzică liniștită, instrumente sterile, cosmetice profesionale.',
    p2: 'Abordarea noastră — consultații individuale, recomandări sincere și rezultat pe care vrei să îl arăți. Lucrăm cu naturalețea ta, nu împotriva ei.',
    values: [
      { h: 'Individual', p: 'Fără șabloane — imagine pentru tine și stilul tău' },
      { h: 'Steril', p: 'Materiale de unică folosință, autoclav, sterilizator' },
      { h: 'Premium', p: 'Doar cosmetice profesionale verificate' },
      { h: 'Cu suflet', p: 'Pleci odihnită, nu obosită' },
    ],
  },
  team: {
    label: 'Echipa noastră',
    title_1: 'Echipa',
    title_em: 'de încredere',
    title_2: '',
    intro:
      'Fiecare maestru Evo este un specialist cu certificate, ani de experiență și pasiune pentru munca sa.',
    members: [
      {
        name: 'Victoria',
        role: 'Fondator / brow artist',
        bio: 'Maestru lider în sprâncene și gene. Peste 7 ani în industria beauty.',
        tags: ['Sprâncene', 'Gene'],
      },
      {
        name: 'Ana',
        role: 'Nail artist',
        bio: 'Manichiură, pedichiură, design. Certificate internaționale de nail-art.',
        tags: ['Manichiură', 'Design'],
      },
      {
        name: 'Maria',
        role: 'Hair stylist',
        bio: 'Colorist, expertă în vopsire complexă și restaurare.',
        tags: ['Vopsire', 'Tuns'],
      },
      {
        name: 'Elena',
        role: 'Make-up artist',
        bio: 'Looks de mireasă și de seară, machiaj pentru foto/video.',
        tags: ['Mireasă', 'Seară'],
      },
    ],
  },
  booking: {
    info_title: 'Sau scrie-ne direct',
    hours_h: 'Program',
    hours: 'Lun–Sâm: 09:00–20:00\nDuminică: 10:00–18:00',
    address_h: 'Adresa',
    address: 'Strada Nicolae Starostenco 25, Chișinău\nMD-2001, Moldova',
    phone_h: 'Telefon',
    phone_v: '+373 78 367 347',
    email_h: 'Email',
    email_v: 'hello@evostudio.md',
  },
  contact: {
    title: 'Te așteptăm cu drag',
    sub: 'Urmărește-ne pe Instagram — acolo ne inspirăm și anunțăm primii noutățile.',
    map_label: 'Hartă interactivă',
    rights: '© 2026 Evo Studio. Toate drepturile rezervate.',
  },
  intro_tagline: 'Frumusețea în detalii',
}
