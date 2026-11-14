export type SlideKind = 'cover' | 'intro' | 'question' | 'agenda' | 'section' | 'beta' | 'annihilation' | 'gamma' | 'interactions' | 'isotopes' | 'cyclotron' | 'fdg' | 'scanner' | 'crystals' | 'sensors' | 'ring' | 'electronics' | 'reconstruction' | 'end';
export interface SlideData { id: string; kind: SlideKind; title: string; subtitle?: string; section: number; kicker: string; points?: string[] }
export const sections = [
  { number: '01', title: 'Principes physiques', subtitle: 'De la matière aux photons', index: 4 },
  { number: '02', title: 'Le radiotraceur', subtitle: 'Production & parcours biologique', index: 9 },
  { number: '03', title: 'L’appareil de TEP', subtitle: 'Détection & reconstruction', index: 13 },
];
export const slides: SlideData[] = [
  { id:'titre',kind:'cover',title:'La TEP',subtitle:'De la désintégration radioactive à l’image',section:0,kicker:'TOMOGRAPHIE PAR ÉMISSION DE POSITONS' },
  { id:'role',kind:'intro',title:'Voir la fonction, pas seulement la forme.',subtitle:'La TEP révèle l’activité métabolique des tissus.',section:0,kicker:'INTRODUCTION',points:['Oncologie · repérer et suivre les tumeurs','Cardiologie · évaluer la viabilité du myocarde','Neurologie · explorer le métabolisme cérébral'] },
  { id:'question',kind:'question',title:'Comment l’appareil transforme-t-il une désintégration radioactive en image ?',section:0,kicker:'LA QUESTION CENTRALE' },
  { id:'sommaire',kind:'agenda',title:'Un signal. Trois étapes.',subtitle:'Du phénomène physique à l’image médicale.',section:0,kicker:'LE PARCOURS' },
  { id:'physique',kind:'section',title:'Principes physiques',subtitle:'De la désintégration aux photons gamma.',section:1,kicker:'PARTIE 01' },
  { id:'beta',kind:'beta',title:'Tout commence dans le noyau.',subtitle:'Un noyau instable émet un positon et un neutrino.',section:1,kicker:'RADIOACTIVITÉ β⁺',points:['Un proton devient un neutron','Le positon e⁺ est l’antiparticule de l’électron','Le neutrino emporte une partie de l’énergie'] },
  { id:'annihilation',kind:'annihilation',title:'Une rencontre qui devient lumière.',subtitle:'Le positon ralentit dans les tissus, puis rencontre un électron.',section:1,kicker:'L’ANNIHILATION',points:['Un parcours court, de l’ordre du millimètre','La paire e⁺ / e⁻ disparaît','La masse est convertie en énergie : E = mc²'] },
  { id:'gamma',kind:'gamma',title:'Deux photons. Une même origine.',subtitle:'L’annihilation émet deux photons gamma presque opposés.',section:1,kicker:'LA SIGNATURE PHYSIQUE' },
  { id:'interactions',kind:'interactions',title:'Le trajet n’est pas toujours direct.',subtitle:'Les interactions dans la matière influencent la qualité de l’image.',section:1,kicker:'PHOTONS & MATIÈRE' },
  { id:'traceur',kind:'section',title:'Le radiotraceur',subtitle:'Produire un isotope. Suivre le métabolisme.',section:2,kicker:'PARTIE 02' },
  { id:'isotopes',kind:'isotopes',title:'Une course contre le temps.',subtitle:'La demi-vie guide la production, le transport et l’examen.',section:2,kicker:'CHOISIR LE RADIOÉLÉMENT' },
  { id:'cyclotron',kind:'cyclotron',title:'Accélérer pour produire.',subtitle:'Le cyclotron propulse des particules vers une cible enrichie.',section:2,kicker:'LE CYCLOTRON',points:['Une source fournit les ions','Les « dees » accélèrent, le champ magnétique courbe','Le bombardement de la cible produit l’isotope'] },
  { id:'fdg',kind:'fdg',title:'Du fluor à la cellule.',subtitle:'Le ¹⁸F-FDG, analogue du glucose, suit l’activité métabolique.',section:2,kicker:'SYNTHÈSE & INJECTION',points:['Le FDG entre dans les cellules par les transporteurs du glucose','Phosphorylé, il reste majoritairement piégé','La fixation reflète l’activité métabolique, sans être spécifique du cancer'] },
  { id:'appareil',kind:'section',title:'L’appareil de TEP',subtitle:'Détecter, synchroniser, reconstruire.',section:3,kicker:'PARTIE 03' },
  { id:'structure',kind:'scanner',title:'Autour du patient, la détection.',subtitle:'Trois composants, une géométrie précise.',section:3,kicker:'STRUCTURE GÉNÉRALE' },
  { id:'cristaux',kind:'crystals',title:'Du gamma à la lumière visible.',subtitle:'Les cristaux scintillateurs convertissent l’énergie déposée en lumière.',section:3,kicker:'LES CRISTAUX SCINTILLATEURS' },
  { id:'photodetecteurs',kind:'sensors',title:'La lumière devient un signal.',subtitle:'Les photodétecteurs convertissent les photons lumineux en impulsions électriques.',section:3,kicker:'LES PHOTODÉTECTEURS' },
  { id:'anneau',kind:'ring',title:'Un anneau pour toutes les directions.',subtitle:'Des blocs détecteurs entourent le patient et captent les photons en coïncidence.',section:3,kicker:'LES BLOCS DÉTECTEURS',points:['Cristaux et photodétecteurs regroupés en blocs','Une couverture angulaire autour du patient','Deux détections définissent une ligne de réponse'] },
  { id:'electronique',kind:'electronics',title:'Reconnaître les bonnes paires.',subtitle:'L’électronique sélectionne l’énergie et synchronise les événements.',section:3,kicker:'L’ÉLECTRONIQUE DE TRAITEMENT' },
  { id:'reconstruction',kind:'reconstruction',title:'Des lignes à une image.',subtitle:'L’ordinateur reconstruit la distribution du radiotraceur.',section:3,kicker:'LE SYSTÈME INFORMATIQUE',points:['Acquisition de nombreuses lignes de réponse (LOR)','Corrections : atténuation, diffusion, coïncidences fortuites','Reconstruction itérative de la distribution d’activité'] },
  { id:'merci',kind:'end',title:'Merci.',subtitle:'Questions ?',section:0,kicker:'DE LA PHYSIQUE À L’IMAGE' },
];
export const isotopeRows = [ {name:'¹⁸F',minutes:110,label:'≈ 110 min'}, {name:'¹¹C',minutes:20,label:'≈ 20 min'}, {name:'¹⁵O',minutes:2,label:'≈ 2 min'}, {name:'⁶⁸Ga',minutes:68,label:'≈ 68 min'} ];
export const crystalRows = [ ['LSO','≈ 7,4','≈ 26 000','≈ 40','TEP rapide / TOF'], ['BGO','≈ 7,13','≈ 8 000','≈ 300','Forte absorption'], ['LYSO','≈ 7,2','≈ 30 000','≈ 40','TEP moderne / TOF'] ];
export function boundSlide(index:number) { return Math.min(slides.length-1,Math.max(0,index)); }
