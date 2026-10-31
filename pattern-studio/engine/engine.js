/* Pattern Studio engine — generated from engine.raw.js by scripts/patch-engine.js; do not edit by hand */


/* ── STYLE INTELLIGENCE: features follow the picked design ── */
var STYLE_CHIP_RULES = {
  // bikini top
  triangle:{remove:['Bandeau straps','Underwire channel','Hook and eye'],auto:['Tie back']},
  bandeau:{remove:['Halter tie','Underwire channel'],auto:['Bandeau straps']},
  halter:{remove:['Bandeau straps'],auto:['Halter tie']},
  underwire:{remove:['Bandeau straps'],auto:['Underwire channel']},
  longline:{remove:['Bandeau straps'],auto:[]},
  // bikini bottom
  brief:{remove:['High waist','Brazilian'],auto:['Full coverage']},
  highwaist:{remove:['Brazilian'],auto:['High waist']},
  tiestring:{remove:['High waist'],auto:['Side ties']},
  brazilian:{remove:['High waist','Full coverage'],auto:['Brazilian']},
  // one piece
  scoop:{remove:['V-neck','High neck'],auto:['Scoop neck']},
  vneck:{remove:['Scoop neck','High neck'],auto:['V-neck']},
  racerback:{remove:['V-neck','Scoop neck','High neck','Open back'],auto:['Racerback']},
  cutout:{remove:['High neck'],auto:[]},
  // leggings
  highwaistrep:{remove:['Fold-over waist'],auto:['High waistband']},
  // sports bra
  scoopbra:{remove:['Racerback','Cross-back'],auto:[]},
  racerbra:{remove:['Cross-back'],auto:['Racerback']},
  longlinebra:{remove:[],auto:['Longline']},
  // leotard
  scoopleotard:{remove:['V-neck','High neck','Sweetheart'],auto:['Scoop neck']},
  highleotard:{remove:[],auto:['Ballet leg']},
  sweethrt:{remove:['Scoop neck','V-neck','High neck'],auto:['Sweetheart']},
  // unitard
  tanktard:{remove:['Long sleeve','Short sleeve','Turtleneck','Mock neck'],auto:['Tank']},
  longsleeve:{remove:['Tank','Short sleeve'],auto:['Long sleeve']},
  // crop top
  fitted:{remove:['Bralette style'],auto:[]},
  bralette_top:{remove:['Long sleeve','Short sleeve','Square neck','Scoop neck','V-neck','Off-shoulder'],auto:['Bralette style']},
  squareneck:{remove:['Scoop neck','V-neck','Off-shoulder'],auto:['Square neck']},
  // maxi dress
  slipmaxi:{remove:['Halter neck','Off-shoulder','Empire waist','Wrap front','Tiered skirt'],auto:['Spaghetti straps']},
  empmaxi:{remove:['Wrap front','Tiered skirt'],auto:['Empire waist']},
  tieredmaxi:{remove:['Wrap front'],auto:['Tiered skirt']},
  // night dress
  classicslip:{remove:['Cowl neck'],auto:['Spaghetti straps']},
  cowlslip:{remove:['V-neck'],auto:['Cowl neck']},
  // two piece
  croptop_skirt:{remove:['Bandeau top','Bralette top'],auto:['Crop top']},
  bralette_shorts:{remove:['Crop top','Bandeau top','Ruffled hem'],auto:['Bralette top']},
  // skirt / shorts
  pencil:{remove:['Ruffle hem','Front slit'],auto:['Back zip']},
  boardshort:{remove:[],auto:['Drawstring']},
  biker:{remove:['Drawstring','Split hem'],auto:[]},
  // wrap dress
  sleevlesswrap:{remove:['Long sleeve','Short sleeve','Cap sleeve','Flutter sleeve'],auto:['Sleeveless']},
  longwrap:{remove:['Midi length'],auto:['Maxi length']},
  flutterwrap:{remove:['Long sleeve','Short sleeve','Sleeveless','Cap sleeve'],auto:['Flutter sleeve']},
  shortwrap:{remove:['Maxi length','Midi length'],auto:[]},
  // rash guard
  longsleeve_rg:{remove:['Short sleeve','Tank'],auto:['Long sleeve UPF 50+']},
  shortsleeve_rg:{remove:['Long sleeve UPF 50+','Tank','Thumb holes'],auto:['Short sleeve']},
  tank_rg:{remove:['Long sleeve UPF 50+','Short sleeve','Thumb holes','Zip front','Mock neck'],auto:['Tank']},
  zip_rg:{remove:['Tank'],auto:['Zip front','Mock neck']},
  // jumpsuit
  sleeveless_jump:{remove:['Short sleeve','Long sleeve'],auto:['Sleeveless']},
  // swim dress
  tank_swim_dress:{remove:['Bandeau top'],auto:[]},
  ruffle_swim:{remove:[],auto:['Ruffled skirt']},
  // costume
  ballgown:{remove:['Peplum'],auto:['Tulle underskirt']},
  mermaid:{remove:['Bustle','Tulle underskirt'],auto:[]},
  jumpsuit:{remove:['Train','Bustle','Tulle underskirt','Peplum'],auto:[]},
  // lingerie
  bodysuit:{remove:[],auto:['Snap crotch']},
  teddy:{remove:['Snap crotch','Boning'],auto:[]},
  // corset
  ct_sweet:{remove:['Zip front'],auto:['Sweetheart neckline','Boning channels']},
  ct_modern:{remove:['Sweetheart neckline'],auto:['Boning channels']},
  // tennis
  td_classic:{remove:[],auto:['Pleated skirt','Built-in shorts']},
  td_wrap:{remove:['Pleated skirt'],auto:['Built-in shorts']},
  // biker shorts
  bs_pocket:{remove:['Hidden pocket'],auto:['Side pockets']},
  bs_classic:{remove:[],auto:['Compression']},
  // board shorts
  bs_surf:{remove:[],auto:['Drawstring waist','Mesh lining']},
  bs_volley:{remove:['Velcro pocket'],auto:['Side vents']},
};

// Style-specific construction notes for the Advisor
var STYLE_NOTES = {
  triangle:'Triangle cups: thread the tie through a folded-edge channel so gathers slide for fit adjustment.',
  bandeau:'Bandeau: add a silicone-backed elastic strip inside the top edge — the only thing keeping it up.',
  halter:'Halter: bartack the strap anchor points; all the load hangs from the neck seam.',
  underwire:'Underwire: use pre-made channeling and close both ends with a triple zigzag so wires never escape.',
  highwaist:'High waist: cut the waistband double-layer with 1" plush elastic sandwiched for smooth compression.',
  brazilian:'Brazilian cut: elastic leg openings at 0.85 ratio — cheekier cuts need firmer recovery.',
  racerback:'Racerback: stabilize the center back strap with clear elastic before topstitching — it takes all the stretch load.',
  vneck:'V-neck: stay the point with a square of fusible tricot before binding, or the V will bubble.',
  cutout:'Cutouts: face each opening with self-fabric + clear elastic; raw stretch edges will gape within one wear.',
  sweethrt:'Sweetheart: clip and understitch the curve so the notch sits flat against the sternum.',
  bralette_top:'Bralette: line both cups and enclose all seams — nothing scratchy against skin.',
  slipmaxi:'Slip dress: cut on true bias and let it hang 24h before hemming — bias grows.',
  cowlslip:'Cowl: cut the cowl facing on bias in one with the front; weight the drape with a chain if it flips.',
  pencil:'Pencil: add a back vent or slit — a straight skirt without one restricts walking stride.',
  flutterwrap:'Flutter sleeve: hem with a narrow rolled edge; anything wider kills the flutter.',
  zip_rg:'Zip front: use a plastic coil zipper with an inner placket so the pull never touches skin.',
  tank_rg:'Tank: bind armholes with self-fabric at 0.9 ratio — they take the most abrasion in water.',
  bodysuit:'Bodysuit: snap crotch needs a stabilized double-layer band; sew snaps through all layers.',
  ballgown:'Ballgown: horsehair braid in the hem gives that runway-float without stiffening the drape.',
  mermaid:'Mermaid: the flare seam takes stress — reinforce the transition point with stay tape.',
  ct_sweet:'Corset sweetheart: steel or heavy plastic boning in channels; tip each bone with a cap.',
  ct_modern:'Straight-top corset: interline with coutil or two layers of canvas for structure that lasts.',
  td_classic:'Pleats: press with a clapper and edge-stitch each fold so pleats survive washing.',
  bs_surf:'Board shorts: flat-lock or mock-flat-fell every seam — regular seams chafe when wet.',
  highwaistrep:'High waistband: interline the front panel with power mesh for smoothing without squeeze.',
  longsleeve_rg:'Long sleeves: pattern with forward shoulder rotation for paddling reach; thumbholes optional.',
  teddy:'Teddy: French seams throughout — the garment is seen from both sides.',
};


const STYLE_ICONS={
triangle:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_triangle" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#9ecbff"/><stop offset="100%" stop-color="#2e6fd8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M25.5 19 L33 30 L25 33 C22.5 29 22.5 23 25.5 19 Z" fill="url(#sgi_triangle)" stroke="#1a4fa8" stroke-width="1.7" stroke-linejoin="round"/><path d="M42.5 19 L35 30 L43 33 C45.5 29 45.5 23 42.5 19 Z" fill="url(#sgi_triangle)" stroke="#1a4fa8" stroke-width="1.7" stroke-linejoin="round"/><path d="M25.5 19 L33 9 M42.5 19 L35 9 M25 33 L43 33" stroke="#1a4fa8" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
bandeau:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_bandeau" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#9ecbff"/><stop offset="100%" stop-color="#2e6fd8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M24 20 C28 18 40 18 44 20 L43.5 29 C39 31 29 31 24.5 29 Z" fill="url(#sgi_bandeau)" stroke="#1a4fa8" stroke-width="1.7" stroke-linejoin="round"/><path d="M32 20 L34 24.5 L36 20 M24.5 27.5 C29 29.4 39 29.4 43.5 27.5" stroke="#1a4fa8" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
halter:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_halter" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#9ecbff"/><stop offset="100%" stop-color="#2e6fd8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M25.5 19 L33 30 L25 33 C22.5 29 22.5 23 25.5 19 Z" fill="url(#sgi_halter)" stroke="#1a4fa8" stroke-width="1.7" stroke-linejoin="round"/><path d="M42.5 19 L35 30 L43 33 C45.5 29 45.5 23 42.5 19 Z" fill="url(#sgi_halter)" stroke="#1a4fa8" stroke-width="1.7" stroke-linejoin="round"/><path d="M25.5 19 C28 13 31 9.5 33.6 8 M42.5 19 C40 13 37 9.5 34.4 8 M25 33 L43 33" stroke="#1a4fa8" stroke-width="1.8" fill="none"/></svg>`,
underwire:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_underwire" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#9ecbff"/><stop offset="100%" stop-color="#2e6fd8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M25 19 C27.5 16.5 31 17 33 20 L33 30 L25 31.5 C23 27 23 22 25 19 Z" fill="url(#sgi_underwire)" stroke="#1a4fa8" stroke-width="1.7" stroke-linejoin="round"/><path d="M43 19 C40.5 16.5 37 17 35 20 L35 30 L43 31.5 C45 27 45 22 43 19 Z" fill="url(#sgi_underwire)" stroke="#1a4fa8" stroke-width="1.7" stroke-linejoin="round"/><path d="M25 31 C28 33.5 32 33.5 33 31 M35 31 C36 33.5 40 33.5 43 31" stroke="#1a4fa8" stroke-width="1.6" fill="none"/><path d="M26.5 18 L28.5 9 M41.5 18 L39.5 9" stroke="#1a4fa8" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
longline:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_longline" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#9ecbff"/><stop offset="100%" stop-color="#2e6fd8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M25.5 19 L33 30 L25 33 C22.5 29 22.5 23 25.5 19 Z" fill="url(#sgi_longline)" stroke="#1a4fa8" stroke-width="1.7" stroke-linejoin="round"/><path d="M42.5 19 L35 30 L43 33 C45.5 29 45.5 23 42.5 19 Z" fill="url(#sgi_longline)" stroke="#1a4fa8" stroke-width="1.7" stroke-linejoin="round"/><path d="M25 33 L24.5 38.5 C29 40.5 39 40.5 43.5 38.5 L43 33 Z" fill="url(#sgi_longline)" stroke="#1a4fa8" stroke-width="1.7" stroke-linejoin="round"/><path d="M25.5 19 L33 9 M42.5 19 L35 9" stroke="#1a4fa8" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
brief:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_brief" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#9ecbff"/><stop offset="100%" stop-color="#2e6fd8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M24.5 36 C28 38 40 38 43.5 36 L42.5 42.5 C40 47.5 36.5 50.5 34 51 C31.5 50.5 28 47.5 25.5 42.5 Z" fill="url(#sgi_brief)" stroke="#1a4fa8" stroke-width="1.7" stroke-linejoin="round"/><path d="M24.5 36 C28.5 37.6 39.5 37.6 43.5 36" stroke="#1a4fa8" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
highwaist:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_highwaist" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#9ecbff"/><stop offset="100%" stop-color="#2e6fd8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M25.5 30 C29 32 39 32 42.5 30 L42.5 42.5 C40 47.5 36.5 50.5 34 51 C31.5 50.5 28 47.5 25.5 42.5 Z" fill="url(#sgi_highwaist)" stroke="#1a4fa8" stroke-width="1.7" stroke-linejoin="round"/><path d="M25.5 33 C29.5 34.8 38.5 34.8 42.5 33" stroke="#1a4fa8" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
tiestring:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_tiestring" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#9ecbff"/><stop offset="100%" stop-color="#2e6fd8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M24.5 36 C28 38 40 38 43.5 36 L42.5 42.5 C40 47.5 36.5 50.5 34 51 C31.5 50.5 28 47.5 25.5 42.5 Z" fill="url(#sgi_tiestring)" stroke="#1a4fa8" stroke-width="1.7" stroke-linejoin="round"/><circle cx="23" cy="38" r="2.6" fill="none" stroke="#1a4fa8" stroke-width="1.4"/><circle cx="45" cy="38" r="2.6" fill="none" stroke="#1a4fa8" stroke-width="1.4"/><path d="M20 41 L22 39.5 M48 41 L46 39.5" stroke="#1a4fa8" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
brazilian:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_brazilian" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#9ecbff"/><stop offset="100%" stop-color="#2e6fd8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M26.5 36 C29.5 37.8 38.5 37.8 41.5 36 L40 41.5 C38 46.5 35.8 49.5 34 50 C32.2 49.5 30 46.5 28 41.5 Z" fill="url(#sgi_brazilian)" stroke="#1a4fa8" stroke-width="1.7" stroke-linejoin="round"/><path d="M26.5 36 C30 37.4 38 37.4 41.5 36" stroke="#1a4fa8" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
scoop:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_scoop" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#8fd0e8"/><stop offset="100%" stop-color="#1873b8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M27 13.5 L29.5 21 C31 24 37 24 38.5 21 L41 13.5 L44 14.5 C45 24 44.5 32 43 38 C41.8 43 40 47.5 38 50 L30 50 C28 47.5 26.2 43 25 38 C23.5 32 23 24 24 14.5 L27 13.5 Z" fill="url(#sgi_scoop)" stroke="#0d5490" stroke-width="1.7" stroke-linejoin="round"/><path d="M29.5 21 C31 23.5 37 23.5 38.5 21 M27 13.5 L28 8.5 M41 13.5 L40 8.5" stroke="#0d5490" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
vneck:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_vneck" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#8fd0e8"/><stop offset="100%" stop-color="#1873b8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M27 13.5 L34 26 L41 13.5 L44 14.5 C45 24 44.5 32 43 38 C41.8 43 40 47.5 38 50 L30 50 C28 47.5 26.2 43 25 38 C23.5 32 23 24 24 14.5 Z" fill="url(#sgi_vneck)" stroke="#0d5490" stroke-width="1.7" stroke-linejoin="round"/><path d="M27 13.5 L28 8.5 M41 13.5 L40 8.5" stroke="#0d5490" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
racerback:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_racerback" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#8fd0e8"/><stop offset="100%" stop-color="#1873b8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M28.5 13.5 L30.5 21 C32 24 36 24 37.5 21 L39.5 13.5 L43 15 C44.5 24 44 32 42.8 38 C41.6 43 40 47.5 38 50 L30 50 C28 47.5 26.4 43 25.2 38 C24 32 23.5 24 25 15 Z" fill="url(#sgi_racerback)" stroke="#0d5490" stroke-width="1.7" stroke-linejoin="round"/><path d="M28.5 13.5 C31 10 37 10 39.5 13.5 M34 10.8 L34 8" stroke="#0d5490" stroke-width="1.7" fill="none"/></svg>`,
cutout:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_cutout" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#8fd0e8"/><stop offset="100%" stop-color="#1873b8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M27 13.5 L29.5 21 C31 24 37 24 38.5 21 L41 13.5 L44 14.5 C45 24 44.5 32 43 38 C41.8 43 40 47.5 38 50 L30 50 C28 47.5 26.2 43 25 38 C23.5 32 23 24 24 14.5 L27 13.5 Z" fill="url(#sgi_cutout)" stroke="#0d5490" stroke-width="1.7" stroke-linejoin="round"/><path d="M25.5 30 C27.5 32 27.5 35 25.8 37 M42.5 30 C40.5 32 40.5 35 42.2 37" stroke="#e8ddc8" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M27 13.5 L28 8.5 M41 13.5 L40 8.5" stroke="#0d5490" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
fulllen:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_fulllen" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#5e7fd8"/><stop offset="100%" stop-color="#1d2f6e"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M25.5 34 C29 36 39 36 42.5 34 L43.5 41 C43 52 42.3 57 41.5 61 L36.5 61 L34.5 44 L33.5 44 L31.5 61 L26.5 61 C25.7 57 25 52 24.5 41 Z" fill="url(#sgi_fulllen)" stroke="#141f4e" stroke-width="1.7" stroke-linejoin="round"/><path d="M25.5 37.5 C29.5 39 38.5 39 42.5 37.5" stroke="#141f4e" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
seveneighths:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_seveneighths" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#5e7fd8"/><stop offset="100%" stop-color="#1d2f6e"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M25.5 34 C29 36 39 36 42.5 34 L43.5 41 C43 48 42.3 53 41.5 57 L36.5 57 L34.5 44 L33.5 44 L31.5 57 L26.5 57 C25.7 53 25 48 24.5 41 Z" fill="url(#sgi_seveneighths)" stroke="#141f4e" stroke-width="1.7" stroke-linejoin="round"/><path d="M25.5 37.5 C29.5 39 38.5 39 42.5 37.5" stroke="#141f4e" stroke-width="1.1" opacity=".7" fill="none"/><path d="M27 59.5 L31 59.5 M37 59.5 L41 59.5" stroke="#141f4e" stroke-width="1.1" opacity=".45"/></svg>`,
capri:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_capri" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#5e7fd8"/><stop offset="100%" stop-color="#1d2f6e"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M25.5 34 C29 36 39 36 42.5 34 L43.5 41 C43 42 42.3 47 41.5 51 L36.5 51 L34.5 44 L33.5 44 L31.5 51 L26.5 51 C25.7 47 25 42 24.5 41 Z" fill="url(#sgi_capri)" stroke="#141f4e" stroke-width="1.7" stroke-linejoin="round"/><path d="M25.5 37.5 C29.5 39 38.5 39 42.5 37.5" stroke="#141f4e" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
highwaistrep:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_highwaistrep" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#5e7fd8"/><stop offset="100%" stop-color="#1d2f6e"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M25.5 29 C29 31 39 31 42.5 29 L43.5 41 C43 52 42.3 57 41.5 61 L36.5 61 L34.5 44 L33.5 44 L31.5 61 L26.5 61 C25.7 57 25 52 24.5 41 Z" fill="url(#sgi_highwaistrep)" stroke="#141f4e" stroke-width="1.7" stroke-linejoin="round"/><path d="M25.5 32.5 C29.5 34 38.5 34 42.5 32.5" stroke="#141f4e" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
scoopbra:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_scoopbra" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#9ecbff"/><stop offset="100%" stop-color="#2e6fd8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M25 14.5 L28.5 12.5 L34 14 L39.5 12.5 L43 14.5 C44.5 18.5 44.5 24 43.5 28 C37.5 31 30.5 31 24.5 28 C23.5 24 23.5 18.5 25 14.5 Z" fill="url(#sgi_scoopbra)" stroke="#1a4fa8" stroke-width="1.7" stroke-linejoin="round"/><path d="M28.5 12.5 L30 8 M39.5 12.5 L38 8 M25 27 C30 29.5 38 29.5 43 27" stroke="#1a4fa8" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
racerbra:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_racerbra" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#9ecbff"/><stop offset="100%" stop-color="#2e6fd8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M25 14.5 L28.5 12.5 L34 14 L39.5 12.5 L43 14.5 C44.5 18.5 44.5 24 43.5 28 C37.5 31 30.5 31 24.5 28 C23.5 24 23.5 18.5 25 14.5 Z" fill="url(#sgi_racerbra)" stroke="#1a4fa8" stroke-width="1.7" stroke-linejoin="round"/><path d="M30 12.8 C32 9.5 36 9.5 38 12.8 M34 10.4 L34 7.5" stroke="#1a4fa8" stroke-width="1.7" fill="none"/><path d="M25 27 C30 29.5 38 29.5 43 27" stroke="#1a4fa8" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
longlinebra:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_longlinebra" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#9ecbff"/><stop offset="100%" stop-color="#2e6fd8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M25 14.5 L28.5 12.5 L34 14 L39.5 12.5 L43 14.5 C44.5 19 44.7 26 43.8 32.5 C37.8 35.5 30.2 35.5 24.2 32.5 C23.3 26 23.5 19 25 14.5 Z" fill="url(#sgi_longlinebra)" stroke="#1a4fa8" stroke-width="1.7" stroke-linejoin="round"/><path d="M28.5 12.5 L30 8 M39.5 12.5 L38 8 M24.5 31 C30 33.6 38 33.6 43.5 31 M24.5 24 C30 26.4 38 26.4 43.5 24" stroke="#1a4fa8" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
scoopleotard:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_scoopleotard" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#c99ae8"/><stop offset="100%" stop-color="#7a28b8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M27 13.5 L30 19.5 C31.5 22 36.5 22 38 19.5 L41 13.5 L44 15 C45 23 45 31 43.5 37.5 C42.5 42.5 40.5 47 38.5 49.5 L29.5 49.5 C27.5 47 25.5 42.5 24.5 37.5 C23 31 23 23 24 15 L27 13.5 Z" fill="url(#sgi_scoopleotard)" stroke="#5a1a90" stroke-width="1.7" stroke-linejoin="round"/><path d="M27 13.5 L28 8.5 M41 13.5 L40 8.5" stroke="#5a1a90" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
highleotard:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_highleotard" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#c99ae8"/><stop offset="100%" stop-color="#7a28b8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M28 13.5 L30.5 19.5 C32 22 36 22 37.5 19.5 L40 13.5 L43 15 C44.5 23 44.5 30 43 36 C42 41 40.5 44.5 39 46.5 L29 46.5 C27.5 44.5 26 41 25 36 C23.5 30 23.5 23 25 15 Z" fill="url(#sgi_highleotard)" stroke="#5a1a90" stroke-width="1.7" stroke-linejoin="round"/><path d="M28 13.5 L28.8 8.5 M40 13.5 L39.2 8.5 M29 46.5 C26.5 43.5 25.3 41 25 39.5 M39 46.5 C41.5 43.5 42.7 41 43 39.5" stroke="#5a1a90" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
sweethrt:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_sweethrt" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#c99ae8"/><stop offset="100%" stop-color="#7a28b8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M26 16 C28 13 31 14 34 17.5 C37 14 40 13 42 16 C43.8 23.5 43.8 31 42.5 37.5 C41.5 42.5 40 47 38.2 49.5 L29.8 49.5 C28 47 26.5 42.5 25.5 37.5 C24.2 31 24.2 23.5 26 16 Z" fill="url(#sgi_sweethrt)" stroke="#5a1a90" stroke-width="1.7" stroke-linejoin="round"/><path d="M27.5 15 L28.5 8.5 M40.5 15 L39.5 8.5" stroke="#5a1a90" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
tanktard:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_tanktard" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#a98ae0"/><stop offset="100%" stop-color="#4a1a98"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M27 13.5 L30 19 C31.5 21.5 36.5 21.5 38 19 L41 13.5 L44 15 C45 24 44.5 32 43.5 38 L44 44 C43.5 50 42.5 56 41.5 60.5 L37 60.5 L34.5 44 L33.5 44 L31 60.5 L26.5 60.5 C25.5 56 24.5 50 24 44 L24.5 38 C23.5 32 23 24 24 15 L27 13.5 Z" fill="url(#sgi_tanktard)" stroke="#361270" stroke-width="1.7" stroke-linejoin="round"/><path d="M27 13.5 L28 8.5 M41 13.5 L40 8.5" stroke="#361270" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
longsleeve:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_longsleeve" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#a98ae0"/><stop offset="100%" stop-color="#4a1a98"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M27 13.5 L30 19 C31.5 21.5 36.5 21.5 38 19 L41 13.5 L44 15 C45 24 44.5 32 43.5 38 L44 44 C43.5 50 42.5 56 41.5 60.5 L37 60.5 L34.5 44 L33.5 44 L31 60.5 L26.5 60.5 C25.5 56 24.5 50 24 44 L24.5 38 C23.5 32 23 24 24 15 L27 13.5 Z" fill="url(#sgi_longsleeve)" stroke="#361270" stroke-width="1.7" stroke-linejoin="round"/><path d="M24.5 15 C20.5 18 18 24 17 31 L20.5 32 C21.8 26 23.2 21 25 18 Z" fill="url(#sgi_longsleeve)" stroke="#361270" stroke-width="1.7" stroke-linejoin="round"/><path d="M43.5 15 C47.5 18 50 24 51 31 L47.5 32 C46.2 26 44.8 21 43 18 Z" fill="url(#sgi_longsleeve)" stroke="#361270" stroke-width="1.7" stroke-linejoin="round"/><path d="M27 13.5 C30 15.3 38 15.3 41 13.5" stroke="#361270" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
fitted:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_fitted" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#ff9db0"/><stop offset="100%" stop-color="#d81b50"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M26.5 13.5 L34 11.5 L41.5 13.5 C43.5 16 44.5 20 44 24.5 C43.7 27 43.2 29 42.5 30.5 C37 33 31 33 25.5 30.5 C24.8 29 24.3 27 24 24.5 C23.5 20 24.5 16 26.5 13.5 Z" fill="url(#sgi_fitted)" stroke="#a8123c" stroke-width="1.7" stroke-linejoin="round"/><path d="M26 30 C31 32.4 37 32.4 42 30" stroke="#a8123c" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
bralette_top:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_bralette_top" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#ff9db0"/><stop offset="100%" stop-color="#d81b50"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M26 16 L33 27 L25.5 29.5 C23.5 25.5 23.5 20 26 16 Z" fill="url(#sgi_bralette_top)" stroke="#a8123c" stroke-width="1.7" stroke-linejoin="round"/><path d="M42 16 L35 27 L42.5 29.5 C44.5 25.5 44.5 20 42 16 Z" fill="url(#sgi_bralette_top)" stroke="#a8123c" stroke-width="1.7" stroke-linejoin="round"/><path d="M26 16 L32.5 9 M42 16 L35.5 9 M25.5 29.5 L42.5 29.5" stroke="#a8123c" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
squareneck:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_squareneck" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#ff9db0"/><stop offset="100%" stop-color="#d81b50"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M26 13.5 L28.5 13.5 L28.5 18.5 L39.5 18.5 L39.5 13.5 L42 13.5 C44 16 44.8 20 44.3 24.5 C44 27 43.5 29 42.8 30.5 C37.2 33 30.8 33 25.2 30.5 C24.5 29 24 27 23.7 24.5 C23.2 20 24 16 26 13.5 Z" fill="url(#sgi_squareneck)" stroke="#a8123c" stroke-width="1.7" stroke-linejoin="round"/><path d="M25.8 30 C31 32.4 37 32.4 42.2 30" stroke="#a8123c" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
mini:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_mini" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#ff9db0"/><stop offset="100%" stop-color="#d81b50"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M27 13.5 L34 11 L41 13.5 C43 18 43.8 24 43.2 30 C43.8 35 44.2 36 43.8 44 C37.5 47 30.5 47 24.2 44 C23.8 36 24.2 35 24.8 30 C24.2 24 25 18 27 13.5 Z" fill="url(#sgi_mini)" stroke="#a8123c" stroke-width="1.7" stroke-linejoin="round"/><path d="M25 30 C29 32 39 32 43 30" stroke="#a8123c" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
midi:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_midi" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#ff9db0"/><stop offset="100%" stop-color="#d81b50"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M27 13.5 L34 11 L41 13.5 C43 18 43.8 24 43.2 30 C43.8 35 44.2 44 43.8 52 C37.5 55 30.5 55 24.2 52 C23.8 44 24.2 35 24.8 30 C24.2 24 25 18 27 13.5 Z" fill="url(#sgi_midi)" stroke="#a8123c" stroke-width="1.7" stroke-linejoin="round"/><path d="M25 30 C29 32 39 32 43 30" stroke="#a8123c" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
maxibd:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_maxibd" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#ff9db0"/><stop offset="100%" stop-color="#d81b50"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M27 13.5 L34 11 L41 13.5 C43 18 43.8 24 43.2 30 C43.8 35 44.2 52 43.8 60 C37.5 63 30.5 63 24.2 60 C23.8 52 24.2 35 24.8 30 C24.2 24 25 18 27 13.5 Z" fill="url(#sgi_maxibd)" stroke="#a8123c" stroke-width="1.7" stroke-linejoin="round"/><path d="M25 30 C29 32 39 32 43 30" stroke="#a8123c" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
slipmaxi:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_slipmaxi" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#e8a8d8"/><stop offset="100%" stop-color="#a8288a"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M27.5 15 C31 17.2 37 17.2 40.5 15 C42 19.5 43 24 42.8 28.5 L25.2 28.5 C25 24 26 19.5 27.5 15 Z" fill="url(#sgi_slipmaxi)" stroke="#801e68" stroke-width="1.7" stroke-linejoin="round"/><path d="M25.2 28.5 L42.8 28.5 C45 38 47.5 50 49.5 61.5 C39.5 65.5 28.5 65.5 18.5 61.5 C20.5 50 23 38 25.2 28.5 Z" fill="url(#sgi_slipmaxi)" fill-opacity=".82" stroke="#801e68" stroke-width="1.7" stroke-linejoin="round"/><path d="M27.5 15 L28.5 8.5 M40.5 15 L39.5 8.5" stroke="#801e68" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
empmaxi:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_empmaxi" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#e8a8d8"/><stop offset="100%" stop-color="#a8288a"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M27.5 13.5 L34 11.5 L40.5 13.5 C41.8 16.5 42.5 19.5 42.6 22.5 L25.4 22.5 C25.5 19.5 26.2 16.5 27.5 13.5 Z" fill="url(#sgi_empmaxi)" stroke="#801e68" stroke-width="1.7" stroke-linejoin="round"/><path d="M25.4 22.5 L42.6 22.5 C45.2 34 48 48 50 61.5 C39.8 65.5 28.2 65.5 18 61.5 C20 48 22.8 34 25.4 22.5 Z" fill="url(#sgi_empmaxi)" fill-opacity=".82" stroke="#801e68" stroke-width="1.7" stroke-linejoin="round"/><path d="M25.4 22.5 C30 24.5 38 24.5 42.6 22.5" stroke="#801e68" stroke-width="1.4"/></svg>`,
tieredmaxi:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_tieredmaxi" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#e8a8d8"/><stop offset="100%" stop-color="#a8288a"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M27.5 13.5 L34 11.5 L40.5 13.5 C42.5 17.5 43.3 23 42.8 28.5 L25.2 28.5 C24.7 23 25.5 17.5 27.5 13.5 Z" fill="url(#sgi_tieredmaxi)" stroke="#801e68" stroke-width="1.7" stroke-linejoin="round"/><path d="M25.2 28.5 L42.8 28.5 C45 38 47.5 50 49.5 61.5 C39.5 65.5 28.5 65.5 18.5 61.5 C20.5 50 23 38 25.2 28.5 Z" fill="url(#sgi_tieredmaxi)" fill-opacity=".82" stroke="#801e68" stroke-width="1.7" stroke-linejoin="round"/><path d="M22.5 42 C30 45 38 45 45.5 42 M20 53 C29 56.5 39 56.5 48 53" stroke="#801e68" stroke-width="1.2" opacity=".65"/></svg>`,
classicslip:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_classicslip" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#c8b8f0"/><stop offset="100%" stop-color="#6a3ab8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M27.5 15 C31 17.5 37 17.5 40.5 15 C42.5 22 44 32 45 44 C45.5 49 45.8 53.5 45.5 56.5 C38 59.5 30 59.5 22.5 56.5 C22.2 53.5 22.5 49 23 44 C24 32 25.5 22 27.5 15 Z" fill="url(#sgi_classicslip)" stroke="#4c2890" stroke-width="1.7" stroke-linejoin="round"/><path d="M27.5 15 L28.5 8.5 M40.5 15 L39.5 8.5 M23 54 L26 51.8 L29 54 L32 51.8 L35 54 L38 51.8 L41 54 L44 51.8 L45.4 53" stroke="#4c2890" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
cowlslip:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_cowlslip" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#c8b8f0"/><stop offset="100%" stop-color="#6a3ab8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M27.5 15 C31 17.5 37 17.5 40.5 15 C42.5 22 44 32 45 44 C45.5 49 45.8 53.5 45.5 56.5 C38 59.5 30 59.5 22.5 56.5 C22.2 53.5 22.5 49 23 44 C24 32 25.5 22 27.5 15 Z" fill="url(#sgi_cowlslip)" stroke="#4c2890" stroke-width="1.7" stroke-linejoin="round"/><path d="M27.5 15 L28.5 8.5 M40.5 15 L39.5 8.5 M29 15.5 C31 20 33 21.5 34 21.5 C35 21.5 37 20 39 15.5" stroke="#4c2890" stroke-width="1.3" fill="none"/></svg>`,
croptop_skirt:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_croptop_skirt" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#ffb88a"/><stop offset="100%" stop-color="#e05818"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M27 13.5 L34 11.5 L41 13.5 C42.8 16.5 43.5 20.5 43 24.5 C37.5 27 30.5 27 25 24.5 C24.5 20.5 25.2 16.5 27 13.5 Z" fill="url(#sgi_croptop_skirt)" stroke="#b04210" stroke-width="1.7" stroke-linejoin="round"/><path d="M25 35 L43 35 C44.5 41 46 48 47 54 C38.5 57.5 29.5 57.5 21 54 C22 48 23.5 41 25 35 Z" fill="url(#sgi_croptop_skirt)" fill-opacity=".82" stroke="#b04210" stroke-width="1.7" stroke-linejoin="round"/><path d="M25 35 C30 37 38 37 43 35" stroke="#b04210" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
bralette_shorts:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_bralette_shorts" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#ffb88a"/><stop offset="100%" stop-color="#e05818"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M26.5 15.5 L33 25 L26 27.5 C24 24 24 19 26.5 15.5 Z" fill="url(#sgi_bralette_shorts)" stroke="#b04210" stroke-width="1.7" stroke-linejoin="round"/><path d="M41.5 15.5 L35 25 L42 27.5 C44 24 44 19 41.5 15.5 Z" fill="url(#sgi_bralette_shorts)" stroke="#b04210" stroke-width="1.7" stroke-linejoin="round"/><path d="M25.5 36 C29 38 39 38 42.5 36 L43.5 42 C44 45.5 44 48.5 43.5 50.5 L37 50.5 L34.5 43 L33.5 43 L31 50.5 L24.5 50.5 C24 48.5 24 45.5 24.5 42 Z" fill="url(#sgi_bralette_shorts)" stroke="#b04210" stroke-width="1.7" stroke-linejoin="round"/><path d="M26.5 15.5 L32 9 M41.5 15.5 L36 9" stroke="#b04210" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
aline:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_aline" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#a8d89a"/><stop offset="100%" stop-color="#3a8828"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M25.5 34 C29 36 39 36 42.5 34 L44.5 40 C46.5 45.5 48.5 51 50 55.5 C39.5 59.5 28.5 59.5 18 55.5 C19.5 51 21.5 45.5 23.5 40 Z" fill="url(#sgi_aline)" stroke="#2a641c" stroke-width="1.7" stroke-linejoin="round"/><path d="M25.5 37 C29.5 38.8 38.5 38.8 42.5 37" stroke="#2a641c" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
pencil:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_pencil" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#a8d89a"/><stop offset="100%" stop-color="#3a8828"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M25.5 34 C29 36 39 36 42.5 34 C43.3 41 43.6 49 43.4 56 C37.2 58.5 30.8 58.5 24.6 56 C24.4 49 24.7 41 25.5 34 Z" fill="url(#sgi_pencil)" stroke="#2a641c" stroke-width="1.7" stroke-linejoin="round"/><path d="M25.5 37 C29.5 38.8 38.5 38.8 42.5 37 M34 50 L34 56.5" stroke="#2a641c" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
circle:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_circle" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#a8d89a"/><stop offset="100%" stop-color="#3a8828"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M25.5 34 C29 36 39 36 42.5 34 L46.5 40 C50 45 53.5 50.5 56 55 C42 61.5 26 61.5 12 55 C14.5 50.5 18 45 21.5 40 Z" fill="url(#sgi_circle)" stroke="#2a641c" stroke-width="1.7" stroke-linejoin="round"/><path d="M25.5 37 C29.5 38.8 38.5 38.8 42.5 37 M22 42 L15.5 53.5 M29 39.5 L25 57 M39 39.5 L43 57 M46 42 L52.5 53.5" stroke="#2a641c" stroke-width="1" opacity=".55"/></svg>`,
mini_skirt:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_mini_skirt" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#a8d89a"/><stop offset="100%" stop-color="#3a8828"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M25.5 34 C29 36 39 36 42.5 34 L43.8 39 C44.8 42.5 45.8 45.5 46.5 48 C38.5 51 29.5 51 21.5 48 C22.2 45.5 23.2 42.5 24.2 39 Z" fill="url(#sgi_mini_skirt)" stroke="#2a641c" stroke-width="1.7" stroke-linejoin="round"/><path d="M25.5 37 C29.5 38.8 38.5 38.8 42.5 37" stroke="#2a641c" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
biker:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_biker" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#88c8e8"/><stop offset="100%" stop-color="#1a6898"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M25.5 34 C29 36 39 36 42.5 34 L43.5 41 C44 45.5 44 50 43.5 54 L37.5 54 L34.5 42 L33.5 42 L30.5 54 L24.5 54 C24 50 24 45.5 24.5 41 Z" fill="url(#sgi_biker)" stroke="#134e74" stroke-width="1.7" stroke-linejoin="round"/><path d="M25.5 37 C29.5 38.8 38.5 38.8 42.5 37" stroke="#134e74" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
highwaistedshort:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_highwaistedshort" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#88c8e8"/><stop offset="100%" stop-color="#1a6898"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M25.5 29.5 C29 31.5 39 31.5 42.5 29.5 L43.5 40 C44 43.5 44 46.5 43.5 49 L37 49 L34.5 41 L33.5 41 L31 49 L24.5 49 C24 46.5 24 43.5 24.5 40 Z" fill="url(#sgi_highwaistedshort)" stroke="#134e74" stroke-width="1.7" stroke-linejoin="round"/><path d="M25.5 32.5 C29.5 34.4 38.5 34.4 42.5 32.5" stroke="#134e74" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
boardshort:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_boardshort" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#88c8e8"/><stop offset="100%" stop-color="#1a6898"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M25 34 C29 36 39 36 43 34 L44.5 41 C45 45 45 48.5 44.5 51 L37.5 51 L34.5 42 L33.5 42 L30.5 51 L23.5 51 C23 48.5 23 45 23.5 41 Z" fill="url(#sgi_boardshort)" stroke="#134e74" stroke-width="1.7" stroke-linejoin="round"/><path d="M25 37 C29.5 38.8 38.5 38.8 43 37 M34 34.5 L34 39 L38.5 39" stroke="#134e74" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
bodysuit:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_bodysuit" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#f0b8d8"/><stop offset="100%" stop-color="#c02878"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M26.5 16 C29 13.5 31.5 14.5 34 18 C36.5 14.5 39 13.5 41.5 16 C43.3 22 43.8 29.5 43 36 C42 41.5 40 46.5 38 49.5 L30 49.5 C28 46.5 26 41.5 25 36 C24.2 29.5 24.7 22 26.5 16 Z" fill="url(#sgi_bodysuit)" stroke="#981e5c" stroke-width="1.7" stroke-linejoin="round"/><path d="M27.5 15 L28.5 8.5 M40.5 15 L39.5 8.5 M34 18 L34 34" stroke="#981e5c" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
teddy:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_teddy" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#f0b8d8"/><stop offset="100%" stop-color="#c02878"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M26.5 15.5 C29 13 32 14 34 17.5 C36 14 39 13 41.5 15.5 C43.5 22 44.5 30 44.8 38.5 C45 43.5 44.5 47.5 43.5 50 L37.5 47 L34 50.5 L30.5 47 L24.5 50 C23.5 47.5 23 43.5 23.2 38.5 C23.5 30 24.5 22 26.5 15.5 Z" fill="url(#sgi_teddy)" stroke="#981e5c" stroke-width="1.7" stroke-linejoin="round"/><path d="M27.5 14.5 L28.5 8.5 M40.5 14.5 L39.5 8.5 M24 46 L27 44 L30 46 L33 44 L36 46 L39 44 L42 46 L44.5 44.5" stroke="#981e5c" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
ballgown:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_ballgown" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#ffd88a"/><stop offset="100%" stop-color="#d89018"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M27.5 13.5 L34 11 L40.5 13.5 C42.5 18 43.2 24 42.8 29 L25.2 29 C24.8 24 25.5 18 27.5 13.5 Z" fill="url(#sgi_ballgown)" stroke="#a87010" stroke-width="1.7" stroke-linejoin="round"/><path d="M25.2 29 L42.8 29 C46.5 38.5 50.5 50 53.5 61 C41 66 27 66 14.5 61 C17.5 50 21.5 38.5 25.2 29 Z" fill="url(#sgi_ballgown)" fill-opacity=".8" stroke="#a87010" stroke-width="1.7" stroke-linejoin="round"/><path d="M17.5 55.5 C29 60 39 60 50.5 55.5 M34 30 L34 62" stroke="#a87010" stroke-width="1" opacity=".55"/></svg>`,
mermaid:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_mermaid" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#ffd88a"/><stop offset="100%" stop-color="#d89018"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M27.5 13.5 L34 11 L40.5 13.5 C42.5 19 43.2 27 42.6 35 C42.2 41 41.5 46 40.5 49.5 C44 52.5 47 56.5 49 61 C39 65 29 65 19 61 C21 56.5 24 52.5 27.5 49.5 C26.5 46 25.8 41 25.4 35 C24.8 27 25.5 19 27.5 13.5 Z" fill="url(#sgi_mermaid)" stroke="#a87010" stroke-width="1.7" stroke-linejoin="round"/><path d="M26 32 C30 34 38 34 42 32 M27.5 49.5 C31.5 51.5 36.5 51.5 40.5 49.5" stroke="#a87010" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
jumpsuit:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_jumpsuitc" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#ffd88a"/><stop offset="100%" stop-color="#d89018"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M27 13.5 L34 11.5 L41 13.5 C42.8 18 43.5 24 43 29.5 L44.5 35 C44.8 43 44.5 52 43.5 60 L37.5 60 L34.5 40 L33.5 40 L30.5 60 L24.5 60 C23.5 52 23.2 43 23.5 35 L25 29.5 C24.5 24 25.2 18 27 13.5 Z" fill="url(#sgi_jumpsuitc)" stroke="#a87010" stroke-width="1.7" stroke-linejoin="round"/><path d="M25 29.5 C29 31.5 39 31.5 43 29.5" stroke="#a87010" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
shortwrap:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_shortwrap" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#a8d8c8"/><stop offset="100%" stop-color="#188868"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M27 13.5 L34 25 L41 13.5 C43.5 19 44.8 27.5 45.2 37 C45.5 37 45.5 43 45.2 47 C37.8 50 30.2 50 22.8 47 C22.5 43 22.5 37 22.8 37 C23.2 27.5 24.5 19 27 13.5 Z" fill="url(#sgi_shortwrap)" stroke="#106850" stroke-width="1.7" stroke-linejoin="round"/><path d="M34 25 L23.5 43 M34 25 L44.5 43" stroke="#106850" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
sleevlesswrap:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_sleevlesswrap" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#a8d8c8"/><stop offset="100%" stop-color="#188868"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M27 13.5 L34 25 L41 13.5 C43.5 19 44.8 27.5 45.2 37 C45.5 44 45.5 50 45.2 54 C37.8 57 30.2 57 22.8 54 C22.5 50 22.5 44 22.8 37 C23.2 27.5 24.5 19 27 13.5 Z" fill="url(#sgi_sleevlesswrap)" stroke="#106850" stroke-width="1.7" stroke-linejoin="round"/><path d="M34 25 L23.5 43 M34 25 L44.5 43" stroke="#106850" stroke-width="1.1" opacity=".7" fill="none"/><path d="M27 13.5 L28 8.5 M41 13.5 L40 8.5" stroke="#106850" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
longwrap:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_longwrap" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#a8d8c8"/><stop offset="100%" stop-color="#188868"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M27 13.5 L34 25 L41 13.5 C43.5 19 44.8 27.5 45.2 37 C45.5 51 45.5 57 45.2 61 C37.8 64 30.2 64 22.8 61 C22.5 57 22.5 51 22.8 37 C23.2 27.5 24.5 19 27 13.5 Z" fill="url(#sgi_longwrap)" stroke="#106850" stroke-width="1.7" stroke-linejoin="round"/><path d="M34 25 L23.5 43 M34 25 L44.5 43" stroke="#106850" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
flutterwrap:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_flutterwrap" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#a8d8c8"/><stop offset="100%" stop-color="#188868"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M27 13.5 L34 25 L41 13.5 C43.5 19 44.8 27.5 45.2 37 C45.5 42 45.5 48 45.2 52 C37.8 55 30.2 55 22.8 52 C22.5 48 22.5 42 22.8 37 C23.2 27.5 24.5 19 27 13.5 Z" fill="url(#sgi_flutterwrap)" stroke="#106850" stroke-width="1.7" stroke-linejoin="round"/><path d="M34 25 L23.5 43 M34 25 L44.5 43" stroke="#106850" stroke-width="1.1" opacity=".7" fill="none"/><path d="M25 15 C21 17.5 18.5 21.5 17.5 26 L21 27.5 C22.3 23.5 23.8 20 25.8 17.5 Z" fill="url(#sgi_flutterwrap)" stroke="#106850" stroke-width="1.7" stroke-linejoin="round"/><path d="M43 15 C47 17.5 49.5 21.5 50.5 26 L47 27.5 C45.7 23.5 44.2 20 42.2 17.5 Z" fill="url(#sgi_flutterwrap)" stroke="#106850" stroke-width="1.7" stroke-linejoin="round"/></svg>`,
longsleeve_rg:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_longsleeve_rg" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#88c0e0"/><stop offset="100%" stop-color="#186098"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M27 13.5 L34 11.5 L41 13.5 C43.4 15 44.4 18 44.4 22 C44.6 30 44.4 40 43.4 47.5 C37.5 50 30.5 50 24.6 47.5 C23.6 40 23.4 30 23.6 22 C23.6 18 24.6 15 27 13.5 Z" fill="url(#sgi_longsleeve_rg)" stroke="#124a74" stroke-width="1.7" stroke-linejoin="round"/><path d="M24.5 15 C20.5 18 18 24 17 31.5 L20.5 32.5 C21.8 26.5 23.2 21 25 18 Z" fill="url(#sgi_longsleeve_rg)" stroke="#124a74" stroke-width="1.7" stroke-linejoin="round"/><path d="M43.5 15 C47.5 18 50 24 51 31.5 L47.5 32.5 C46.2 26.5 44.8 21 43 18 Z" fill="url(#sgi_longsleeve_rg)" stroke="#124a74" stroke-width="1.7" stroke-linejoin="round"/><path d="M27 13.5 C30 15.4 38 15.4 41 13.5" stroke="#124a74" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
shortsleeve_rg:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_shortsleeve_rg" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#88c0e0"/><stop offset="100%" stop-color="#186098"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M27 13.5 L34 11.5 L41 13.5 C43.4 15 44.4 18 44.4 22 C44.6 30 44.4 40 43.4 47.5 C37.5 50 30.5 50 24.6 47.5 C23.6 40 23.4 30 23.6 22 C23.6 18 24.6 15 27 13.5 Z" fill="url(#sgi_shortsleeve_rg)" stroke="#124a74" stroke-width="1.7" stroke-linejoin="round"/><path d="M24.5 15 C21.5 17 19.8 20 19 23.5 L22.5 24.5 C23.5 21.5 24.5 19 26 17.2 Z" fill="url(#sgi_shortsleeve_rg)" stroke="#124a74" stroke-width="1.7" stroke-linejoin="round"/><path d="M43.5 15 C46.5 17 48.2 20 49 23.5 L45.5 24.5 C44.5 21.5 43.5 19 42 17.2 Z" fill="url(#sgi_shortsleeve_rg)" stroke="#124a74" stroke-width="1.7" stroke-linejoin="round"/><path d="M27 13.5 C30 15.4 38 15.4 41 13.5" stroke="#124a74" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
tank_rg:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_tank_rg" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#88c0e0"/><stop offset="100%" stop-color="#186098"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M27.5 13.5 L34 12 L40.5 13.5 C42.5 15 43.5 18 43.8 22 C44.2 30 44 40 43.2 47.5 C37.4 50 30.6 50 24.8 47.5 C24 40 23.8 30 24.2 22 C24.5 18 25.5 15 27.5 13.5 Z" fill="url(#sgi_tank_rg)" stroke="#124a74" stroke-width="1.7" stroke-linejoin="round"/><path d="M27.5 13.5 L28.5 8.5 M40.5 13.5 L39.5 8.5" stroke="#124a74" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
zip_rg:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_zip_rg" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#88c0e0"/><stop offset="100%" stop-color="#186098"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M27 13.5 L34 11.5 L41 13.5 C43.4 15 44.4 18 44.4 22 C44.6 30 44.4 40 43.4 47.5 C37.5 50 30.5 50 24.6 47.5 C23.6 40 23.4 30 23.6 22 C23.6 18 24.6 15 27 13.5 Z" fill="url(#sgi_zip_rg)" stroke="#124a74" stroke-width="1.7" stroke-linejoin="round"/><path d="M24.5 15 C20.5 18 18 24 17 31.5 L20.5 32.5 C21.8 26.5 23.2 21 25 18 Z" fill="url(#sgi_zip_rg)" stroke="#124a74" stroke-width="1.7" stroke-linejoin="round"/><path d="M43.5 15 C47.5 18 50 24 51 31.5 L47.5 32.5 C46.2 26.5 44.8 21 43 18 Z" fill="url(#sgi_zip_rg)" stroke="#124a74" stroke-width="1.7" stroke-linejoin="round"/><path d="M34 13 L34 32 M32.5 32 L35.5 32 M31 13 L31 16.5 M37 13 L37 16.5" stroke="#124a74" stroke-width="1.4" fill="none"/></svg>`,
sleeveless_jump:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_sleeveless_jump" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#8ab8d8"/><stop offset="100%" stop-color="#28588a"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M27 13.5 L34 11.5 L41 13.5 C42.8 18 43.5 24 43 29.5 L44.5 35 C44.8 43 44.5 52 43.5 60 L37.5 60 L34.5 40 L33.5 40 L30.5 60 L24.5 60 C23.5 52 23.2 43 23.5 35 L25 29.5 C24.5 24 25.2 18 27 13.5 Z" fill="url(#sgi_sleeveless_jump)" stroke="#1c4068" stroke-width="1.7" stroke-linejoin="round"/><path d="M25 29.5 C29 31.5 39 31.5 43 29.5 M27 13.5 L28 8.5 M41 13.5 L40 8.5" stroke="#1c4068" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
belted_jump:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_belted_jump" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#8ab8d8"/><stop offset="100%" stop-color="#28588a"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M27 13.5 L34 11.5 L41 13.5 C42.8 18 43.5 24 43 29.5 L44.5 35 C44.8 43 44.5 52 43.5 60 L37.5 60 L34.5 40 L33.5 40 L30.5 60 L24.5 60 C23.5 52 23.2 43 23.5 35 L25 29.5 C24.5 24 25.2 18 27 13.5 Z" fill="url(#sgi_belted_jump)" stroke="#1c4068" stroke-width="1.7" stroke-linejoin="round"/><path d="M24.5 28 L43.5 28 L43.5 31.5 L24.5 31.5 Z" fill="#1c4068" opacity=".85"/><rect x="31.5" y="27.5" width="5" height="4.5" rx="1" fill="none" stroke="#fff" stroke-width="1.1"/></svg>`,
tank_swim_dress:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_tank_swim_dress" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#7fd6b8"/><stop offset="100%" stop-color="#1a9668"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M27 13.5 L30 20 C31.5 22.5 36.5 22.5 38 20 L41 13.5 L44 15 C45 22 45 28 44 33 L24 33 C23 28 23 22 24 15 Z" fill="url(#sgi_tank_swim_dress)" stroke="#0c6e4a" stroke-width="1.7" stroke-linejoin="round"/><path d="M24 33 L44 33 C46 40 48.5 47 50.5 53 C40 57.5 28 57.5 17.5 53 C19.5 47 22 40 24 33 Z" fill="url(#sgi_tank_swim_dress)" fill-opacity=".8" stroke="#0c6e4a" stroke-width="1.7" stroke-linejoin="round"/><path d="M27 13.5 L28 8.5 M41 13.5 L40 8.5" stroke="#0c6e4a" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
ruffle_swim:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_ruffle_swim" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#7fd6b8"/><stop offset="100%" stop-color="#1a9668"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M27 13.5 L30 20 C31.5 22.5 36.5 22.5 38 20 L41 13.5 L44 15 C45 22 45 28 44 33 L24 33 C23 28 23 22 24 15 Z" fill="url(#sgi_ruffle_swim)" stroke="#0c6e4a" stroke-width="1.7" stroke-linejoin="round"/><path d="M24 33 L44 33 C46 40 48.5 47 50.5 53 C40 57.5 28 57.5 17.5 53 C19.5 47 22 40 24 33 Z" fill="url(#sgi_ruffle_swim)" fill-opacity=".8" stroke="#0c6e4a" stroke-width="1.7" stroke-linejoin="round"/><path d="M18.5 50.5 C21 48 24 52 27 49.5 C30 47 33 51.5 36 49 C39 46.5 42 51 45 48.5 C47 47 48.8 49 49.6 50.2" stroke="#0c6e4a" stroke-width="1.3" fill="none"/><path d="M27 13.5 L28 8.5 M41 13.5 L40 8.5" stroke="#0c6e4a" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
bs_classic:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_bs_classic" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#7898e0"/><stop offset="100%" stop-color="#1a3898"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M25.5 34 C29 36 39 36 42.5 34 L43.5 41 C44 45.5 44 50 43.5 54 L37.5 54 L34.5 42 L33.5 42 L30.5 54 L24.5 54 C24 50 24 45.5 24.5 41 Z" fill="url(#sgi_bs_classic)" stroke="#132a74" stroke-width="1.7" stroke-linejoin="round"/><path d="M25.5 37 C29.5 38.8 38.5 38.8 42.5 37 M25 52 L30.5 52 M37.5 52 L43 52" stroke="#132a74" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
bs_pocket:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_bs_pocket" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#7898e0"/><stop offset="100%" stop-color="#1a3898"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M25.5 34 C29 36 39 36 42.5 34 L43.5 41 C44 45.5 44 50 43.5 54 L37.5 54 L34.5 42 L33.5 42 L30.5 54 L24.5 54 C24 50 24 45.5 24.5 41 Z" fill="url(#sgi_bs_pocket)" stroke="#132a74" stroke-width="1.7" stroke-linejoin="round"/><rect x="25.5" y="41" width="5" height="8" rx="1.5" fill="none" stroke="#fff" stroke-width="1.2" opacity=".85"/><rect x="37.5" y="41" width="5" height="8" rx="1.5" fill="none" stroke="#fff" stroke-width="1.2" opacity=".85"/><path d="M25.5 37 C29.5 38.8 38.5 38.8 42.5 37" stroke="#132a74" stroke-width="1.1" opacity=".7" fill="none"/></svg>`,
ct_sweet:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_ct_sweet" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#f0a8c8"/><stop offset="100%" stop-color="#c81858"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M26.5 15.5 C29 12.5 31.5 14 34 17 C36.5 14 39 12.5 41.5 15.5 C43.3 20 43.8 26.5 43 32 C37.5 35 30.5 35 25 32 C24.2 26.5 24.7 20 26.5 15.5 Z" fill="url(#sgi_ct_sweet)" stroke="#981244" stroke-width="1.7" stroke-linejoin="round"/><path d="M29 17 L28.5 33 M34 18.5 L34 34 M39 17 L39.5 33 M30.5 21 L37.5 23 M30.5 25.5 L37.5 27.5" stroke="#981244" stroke-width="1" opacity=".7"/></svg>`,
ct_modern:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_ct_modern" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#f0a8c8"/><stop offset="100%" stop-color="#c81858"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M25.5 15 L42.5 15 C43.8 20 44.2 26.5 43.4 32 C37.8 35 30.2 35 24.6 32 C23.8 26.5 24.2 20 25.5 15 Z" fill="url(#sgi_ct_modern)" stroke="#981244" stroke-width="1.7" stroke-linejoin="round"/><path d="M25.5 15 L42.5 15 M29 16.5 L28.5 33 M34 16.5 L34 34 M39 16.5 L39.5 33 M30.5 20.5 L37.5 22.5 M30.5 25 L37.5 27" stroke="#981244" stroke-width="1" opacity=".7"/></svg>`,
td_classic:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_td_classic" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#d8a8e8"/><stop offset="100%" stop-color="#8828b8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M27 13.5 L34 11.5 L41 13.5 C42.8 17.5 43.5 22.5 43 27.5 L25 27.5 C24.5 22.5 25.2 17.5 27 13.5 Z" fill="url(#sgi_td_classic)" stroke="#681e90" stroke-width="1.7" stroke-linejoin="round"/><path d="M25 27.5 L43 27.5 C44.5 33.5 46.5 39.5 48.5 45 C39 49 29 49 19.5 45 C21.5 39.5 23.5 33.5 25 27.5 Z" fill="url(#sgi_td_classic)" fill-opacity=".82" stroke="#681e90" stroke-width="1.7" stroke-linejoin="round"/><path d="M24 32 L21 44 M29.5 29 L27.5 46.5 M34 28.5 L34 47.5 M38.5 29 L40.5 46.5 M44 32 L47 44" stroke="#681e90" stroke-width="1" opacity=".6"/></svg>`,
td_wrap:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_td_wrap" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#d8a8e8"/><stop offset="100%" stop-color="#8828b8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M27 13.5 L34 11.5 L41 13.5 C42.8 17.5 43.5 22.5 43 27.5 L25 27.5 C24.5 22.5 25.2 17.5 27 13.5 Z" fill="url(#sgi_td_wrap)" stroke="#681e90" stroke-width="1.7" stroke-linejoin="round"/><path d="M25 27.5 L43 27.5 C44.5 33.5 46.5 39.5 48.5 45 C39 49 29 49 19.5 45 C21.5 39.5 23.5 33.5 25 27.5 Z" fill="url(#sgi_td_wrap)" fill-opacity=".82" stroke="#681e90" stroke-width="1.7" stroke-linejoin="round"/><path d="M31 28 L44 46.5 M25 27.5 C24 33 22.5 39 20.5 44.5" stroke="#681e90" stroke-width="1.2" opacity=".7"/></svg>`,
bs_surf:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_bs_surf" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#78c0e8"/><stop offset="100%" stop-color="#0868a8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M25 34 C29 36 39 36 43 34 L44.5 41 C45 45.5 45 49.5 44.5 52.5 L37.5 52.5 L34.5 42 L33.5 42 L30.5 52.5 L23.5 52.5 C23 49.5 23 45.5 23.5 41 Z" fill="url(#sgi_bs_surf)" stroke="#065080" stroke-width="1.7" stroke-linejoin="round"/><path d="M25 37 C29.5 38.8 38.5 38.8 43 37 M34 34.5 L34 39.5 L39 39.5 M25.5 42 L29.5 42 L29.5 47 L25.5 47 Z" stroke="#065080" stroke-width="1" opacity=".75"/></svg>`,
bs_volley:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="sgi_bs_volley" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#78c0e8"/><stop offset="100%" stop-color="#0868a8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/></g><path d="M25 34 C29 36 39 36 43 34 L44 40 C44.4 43.5 44.4 46 44 48 L37 48 L34.5 41 L33.5 41 L31 48 L24 48 C23.6 46 23.6 43.5 24 40 Z" fill="url(#sgi_bs_volley)" stroke="#065080" stroke-width="1.7" stroke-linejoin="round"/><path d="M25 37 C29.5 38.8 38.5 38.8 43 37 M34 34.5 L34 38.5 L38.5 38.5" stroke="#065080" stroke-width="1.1" opacity=".7" fill="none"/></svg>`
};

/* ══════════════════════════════════════════════════════════════
   SUBSCRIPTION / TIER SYSTEM
   Free: 10 gens/month, PNG+Print only
   Studio $19.99: unlimited, DXF/SVG, nesting, grading, 10 projects
   Pro $24.99: everything + AI model look, unlimited projects
   ══════════════════════════════════════════════════════════════ */
var BMF_TIER = 'free';
var BMF_USER = null;
var BMF_GENS_USED = 0;
var BMF_TIER_READY = false;
var BMF_TIER_RESOLVE = null;
var BMF_TIER_PROMISE = new Promise(function(resolve){ BMF_TIER_RESOLVE = resolve; });
var GATES = {
  free:   { gens: 10, dxf:false, svg:false, nest:false, grade:false, look:false, projects:1 },
  studio: { gens: Infinity, dxf:true, svg:true, nest:true, grade:true, look:false, projects:10 },
  pro:    { gens: Infinity, dxf:true, svg:true, nest:true, grade:true, look:true, projects:Infinity }
};

function canDo(feature) {
  // If logged in to any Blue Moon account — full access, no gates
  // They are a customer. We don't interrogate customers.
  if (BMF_USER) return true;
  // Not logged in — apply free tier limits
  var g = GATES[BMF_TIER] || GATES.free;
  if (feature === 'generate') return BMF_GENS_USED < g.gens;
  return !!g[feature];
}

function requireTier(feature, minTier, context) {
  // Logged in = always allowed. Never show a gate to a logged-in user.
  if (BMF_USER) return true;
  if (canDo(feature)) return true;
  showUpgrade(feature, minTier, context);
  return false;
}

var PS = window.PS_CONFIG || {};
PS.mode = PS.mode || 'standalone';
PS.shop = PS.shop || 'https://bluemoonfabrics.com';
PS.fabricsApi = PS.fabricsApi || '/api/fabrics';
async function initSubscription() {
  if (PS.mode === 'standalone') {
    document.body.classList.add('bmf-app-active');
    // tier is resolved by account.js (free until signed in as Pro); drafting itself is never gated
    GATES.free = { gens: Infinity, dxf:false, svg:false, nest:true, grade:false, look:true, projects:3 };
    BMF_TIER = 'free'; BMF_USER = null; BMF_GENS_USED = 0;
    if (typeof psApplyTier === 'function') psApplyTier(); else { BMF_TIER_READY = true; if (BMF_TIER_RESOLVE) BMF_TIER_RESOLVE(BMF_TIER); }
    try { renderGenCounter(); } catch(e) {}
    var gc = document.getElementById('gen-counter'); if (gc) gc.style.display = 'none';
    return;
  }
  return initSubscriptionShopify();
}
async function initSubscriptionShopify() {
  document.body.classList.add('bmf-app-active');
  // Admin preview bypass: ?preview=studio|pro OR localStorage
  try {
    var urlTier = new URLSearchParams(location.search).get('preview');
    var lsTier = localStorage.getItem('bmf_preview_tier');
    var adminTier = urlTier || lsTier;
    if (adminTier === 'studio' || adminTier === 'pro' || adminTier === 'free') {
      BMF_TIER = adminTier;
      if (urlTier) localStorage.setItem('bmf_preview_tier', urlTier);
      loadGenCount(); renderGenCounter(); renderFitCard(); setTimeout(renderProjectsList, 100);
  // Hide theme page elements that bleed through
  document.querySelectorAll('.__none__').forEach(function(el){
    if(el.closest('#bmf-root'))return;
    el.style.display='none';
  });
      return;
    }
  } catch(e) {}
  // ── Shopify customer + subscription check ───────────────────────────
  // Signal 1: Shopify admin staff bypass (staff/owner always get Pro)
  // Signal 2: customer tags (set by Shopify Flow on subscription purchase)
  // Signal 3: order history fallback
  // Signal 4: customer note override

  // Signal 1: Check if viewing as Shopify admin staff member
  // Staff logged into the admin see a preview bar — detect it via DOM or Shopify global
  try {
    var isStaff = false;
    // Check for Shopify admin preview bar (present when staff preview the storefront)
    if (document.getElementById('preview-bar-iframe') ||
        document.querySelector('[data-shopify-preview-bar]') ||
        window.__st && window.__st.a === 'staff' ||
        (window.Shopify && window.Shopify.role && window.Shopify.role !== 'anonymous') ||
        document.cookie.indexOf('_shopify_s=') >= 0) {
      isStaff = true;
    }
    // Also check via admin API endpoint — only accessible to logged-in staff
    if (!isStaff) {
      try {
        var adminCheck = await fetch('/admin', { method:'HEAD', credentials:'include' });
        if (adminCheck.status === 200 || adminCheck.status === 302) isStaff = true;
      } catch(e3) {}
    }
    if (isStaff) {
      BMF_TIER = 'pro';
      BMF_USER = { email: 'staff@bluemoonfabrics.com', tags: 'ps-pro', _isStaff: true };
      loadGenCount(); renderGenCounter();
      return;
    }
  } catch(eStaff) {}

  try {
    var resp = await fetch('/account.json', { headers:{'Accept':'application/json'}, credentials:'include' });
    if (resp.ok) {
      var data = await resp.json();
      BMF_USER = data.customer || null;
      if (BMF_USER) {
        var tags = (BMF_USER.tags || '').toLowerCase();

        // Signal 2: customer tags (most reliable — set by Flow)
        if (tags.indexOf('ps-pro') >= 0) { BMF_TIER = 'pro'; }
        else if (tags.indexOf('ps-studio') >= 0) { BMF_TIER = 'studio'; }

        // Signal 3: order history fallback (catches subscribers not yet tagged)
        if (BMF_TIER === 'free' && BMF_USER.id) {
          try {
            var ordResp = await fetch('/account/orders.json', { headers:{'Accept':'application/json'}, credentials:'include' });
            if (ordResp.ok) {
              var ordData = await ordResp.json();
              var orders = ordData.orders || [];
              var proHandles   = ['pattern-studio-pro-plan','pattern-studio---pro-plan'];
              var studioHandles= ['pattern-studio-studio-plan','pattern-studio---studio-plan'];
              for (var o = 0; o < orders.length; o++) {
                var lineItems = orders[o].line_items || [];
                for (var l = 0; l < lineItems.length; l++) {
                  var handle = (lineItems[l].handle || lineItems[l].product_handle || '').toLowerCase();
                  var title  = (lineItems[l].title || '').toLowerCase();
                  if (proHandles.some(function(h){ return handle.indexOf(h)>=0||title.indexOf('pro plan')>=0; })) {
                    BMF_TIER = 'pro'; break;
                  }
                  if (studioHandles.some(function(h){ return handle.indexOf(h)>=0||title.indexOf('studio plan')>=0; })) {
                    BMF_TIER = 'studio';
                  }
                }
                if (BMF_TIER === 'pro') break;
              }
            }
          } catch(e2) {}
        }

        // Signal 4: customer note override
        if (BMF_TIER === 'free') {
          var note = (BMF_USER.note || '').toLowerCase();
          if (note.indexOf('ps-pro') >= 0) BMF_TIER = 'pro';
          else if (note.indexOf('ps-studio') >= 0) BMF_TIER = 'studio';
        }

        // Signal 5: email domain bypass — blue moon staff email always gets Pro
        if (BMF_TIER === 'free') {
          var email = (BMF_USER.email || '').toLowerCase();
          if (email.indexOf('@bluemoonfabrics.com') >= 0) BMF_TIER = 'pro';
        }
      }
    }
  } catch(e) { BMF_TIER = 'free'; BMF_USER = null; }
  // If logged in at all, reset gen count — logged-in users are never gated by count
  if (BMF_USER) {
    BMF_GENS_USED = 0;
    try { localStorage.removeItem('bmf_gens_total'); } catch(e) {}
  }
  loadGenCount(); renderGenCounter();
  BMF_TIER_READY = true;
  if (BMF_TIER_RESOLVE) BMF_TIER_RESOLVE(BMF_TIER); fetchSellingPlans();
}

function loadGenCount() {
  try {
    var KEY = 'bmf_gens_total';
    var v = localStorage.getItem(KEY);
    if (v === null) {
      // migrate any existing monthly count so no one gets extra free patterns
      v = localStorage.getItem('bmf_gens_' + new Date().toISOString().slice(0,7)) || '0';
      localStorage.setItem(KEY, v);
    }
    BMF_GENS_USED = parseInt(v || '0');
  } catch(e) { BMF_GENS_USED = 0; }
}

function bumpGenCount() {
  if (BMF_TIER !== 'free') return;
  try {
    BMF_GENS_USED++;
    localStorage.setItem('bmf_gens_total', String(BMF_GENS_USED));
    renderGenCounter();
  } catch(e) {}
}

function renderGenCounter() {
  var txt = document.getElementById('gen-count-txt');
  var fill = document.getElementById('gc-fill');
  if (!txt) return;
  if (BMF_USER) {
    // Logged in — show account status
    var label = BMF_TIER==='pro' ? 'PRO — Unlimited' : BMF_TIER==='studio' ? 'STUDIO — Unlimited' : 'Signed in — Unlimited';
    txt.textContent = label;
    if (fill) fill.style.width = '100%';
    return;
  }
  // Not logged in — show free pattern count
  var left = Math.max(0, GATES.free.gens - BMF_GENS_USED);
  txt.textContent = left + ' free pattern' + (left===1?'':'s') + ' left';
  if (fill) fill.style.width = (left / GATES.free.gens * 100) + '%';
  // Show sign-in banner when running low
  var banner = document.getElementById('bmfSignInBanner');
  if (BMF_GENS_USED >= 5) {
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'bmfSignInBanner';
      banner.style.cssText = 'background:var(--warn-bg);border-bottom:2px solid #f0c040;padding:8px 16px;font-size:12px;color:var(--warn);display:flex;align-items:center;justify-content:space-between;gap:10px';
      banner.innerHTML = '<span>&#128274; Sign in to unlock unlimited patterns</span>'
        + '<a href="/account/login?return_url=/pages/custom-pattern-studio" style="background:var(--accent);color:#fff;padding:5px 12px;border-radius:6px;font-size:11px;font-weight:800;text-decoration:none;white-space:nowrap">Sign in</a>';
      var app = document.getElementById('bmf-app') || document.body;
      if (app && app.firstChild) app.insertBefore(banner, app.firstChild);
    }
  } else if (banner) {
    banner.remove();
  }
}

/* ── UPGRADE MODAL ── */
function showUpgrade(feature, minTier, context) {
  // If logged in — NEVER show a buy prompt. They are a customer.
  // This should never be reached due to canDo/requireTier guards,
  // but as a final safety net: logged in users see a support message, not a paywall.
  if (BMF_USER) {
    var old2 = document.getElementById('bmfUpgradeModal');
    if (old2) old2.remove();
    var w2 = document.createElement('div');
    w2.id = 'bmfUpgradeModal';
    w2.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(6,15,40,.85);display:flex;align-items:center;justify-content:center;padding:20px';
    w2.innerHTML = '<div style="background:var(--surface);border-radius:16px;max-width:400px;width:100%;padding:28px 24px;text-align:center">'
      + '<div style="font-size:36px;margin-bottom:12px">&#128222;</div>'
      + '<div style="font-size:17px;font-weight:800;color:var(--ink);margin-bottom:10px">Need help with your account?</div>'
      + '<div style="font-size:13px;color:var(--ink-3);line-height:1.7;margin-bottom:20px">'
      + 'You are signed in. If you are seeing this message, please contact us and we will sort it out right away.'
      + '</div>'
      + '<a href="mailto:info@bluemoonfabrics.com?subject=Pattern Maker Access" style="display:block;padding:13px;background:var(--accent);color:#fff;border-radius:8px;font-weight:800;font-size:14px;text-decoration:none;margin-bottom:10px">Email us for help</a>'
      + '<a href="/account/logout" style="display:block;padding:12px;background:var(--surface-2);color:var(--accent);border-radius:8px;font-weight:700;font-size:13px;text-decoration:none;margin-bottom:10px">Sign out and sign back in</a>'
      + '<button onclick="document.getElementById(&quot;bmfUpgradeModal&quot;).remove()" style="width:100%;padding:10px;background:none;border:none;color:var(--ink-4);font-size:12px;cursor:pointer">Dismiss</button>'
      + '</div>';
    w2.addEventListener('click', function(e){ if(e.target===w2) w2.remove(); });
    document.body.appendChild(w2);
    return;
  }

  var featureNames = { generate:'More patterns', dxf:'DXF export', svg:'SVG export',
    nest:'AI Nesting', grade:'Size Grading', look:'AI Model Photos', projects:'More projects' };
  var name = featureNames[feature] || feature;
  var isPro = minTier === 'pro';
  var price = isPro ? '$24.99' : '$19.99';
  var plan  = isPro ? 'Pro' : 'Studio';
  var isLoggedIn = false;
  
  var old = document.getElementById('bmfUpgradeModal');
  if (old) old.remove();
  var wrap = document.createElement('div');
  wrap.id = 'bmfUpgradeModal';
  wrap.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(6,15,40,.85);display:flex;align-items:center;justify-content:center;padding:20px';
  
  var box = document.createElement('div');
  box.style.cssText = 'background:var(--surface);border-radius:16px;max-width:400px;width:100%;padding:28px 24px;text-align:center';
  
  if (isLoggedIn && BMF_TIER === 'free') {
    // Logged in but showing as free — possible tag sync issue
    box.innerHTML = '<div style="font-size:32px;margin-bottom:12px">&#9888;</div>'
      + '<div style="font-size:17px;font-weight:800;color:var(--ink);margin-bottom:8px">Subscription not detected</div>'
      + '<div style="font-size:13px;color:var(--ink-3);line-height:1.6;margin-bottom:20px">'
      + 'You are signed in but we could not detect an active ' + plan + ' subscription on your account.<br><br>'
      + 'If you recently subscribed, please <strong>sign out and sign back in</strong> to refresh your account status.'
      + '</div>'
      + '<a href="/account/logout" style="display:block;padding:12px;background:var(--accent);color:#fff;border-radius:8px;font-weight:800;font-size:14px;text-decoration:none;margin-bottom:10px">Sign out &amp; sign back in</a>'
      + '<a href="/account" style="display:block;padding:12px;background:var(--surface-2);color:var(--accent);border-radius:8px;font-weight:800;font-size:14px;text-decoration:none;margin-bottom:10px">View my account</a>'
      + '<button onclick="document.getElementById(&quot;bmfUpgradeModal&quot;).remove()" style="width:100%;padding:10px;background:none;border:none;color:var(--ink-4);font-size:12px;font-weight:600;cursor:pointer">Dismiss</button>';
  } else {
    // Not logged in or genuinely free
    box.innerHTML = '<div style="font-size:32px;margin-bottom:12px">' + (isPro ? '&#11088;' : '&#128081;') + '</div>'
      + '<div style="font-size:17px;font-weight:800;color:var(--ink);margin-bottom:8px">' + plan + ' feature: ' + name + '</div>'
      + '<div style="font-size:13px;color:var(--ink-3);line-height:1.6;margin-bottom:20px">'
      + (isLoggedIn
          ? 'Upgrade to ' + plan + ' to unlock ' + name + ' and all ' + (isPro?'Pro':'Studio') + ' features.'
          : 'Sign in to your account, or subscribe to ' + plan + ' to unlock ' + name + '.')
      + '</div>'
      + (isLoggedIn
          ? '<button onclick="startCheckout(&quot;'+minTier+'&quot;)" style="display:block;width:100%;padding:13px;background:linear-gradient(135deg,var(--accent),var(--accent-deep));color:#fff;border:none;border-radius:8px;font-weight:800;font-size:14px;cursor:pointer;margin-bottom:10px">Subscribe to ' + plan + ' — ' + price + '/mo</button>'
          : '<a href="/account/login?return_url=/pages/custom-pattern-studio" style="display:block;padding:13px;background:var(--accent);color:#fff;border-radius:8px;font-weight:800;font-size:14px;text-decoration:none;margin-bottom:10px">Sign in to your account</a>'
            + '<button onclick="startCheckout(&quot;'+minTier+'&quot;)" style="display:block;width:100%;padding:12px;background:var(--surface-2);color:var(--accent);border:none;border-radius:8px;font-weight:800;font-size:13px;cursor:pointer;margin-bottom:10px">Subscribe to ' + plan + ' — ' + price + '/mo</button>')
      + '<button onclick="document.getElementById(&quot;bmfUpgradeModal&quot;).remove()" style="width:100%;padding:10px;background:none;border:none;color:var(--ink-4);font-size:12px;font-weight:600;cursor:pointer">Not now</button>';
  }
  
  wrap.appendChild(box);
  wrap.addEventListener('click', function(e){ if(e.target===wrap) wrap.remove(); });
  document.body.appendChild(wrap);
}


function startCheckout(plan) {
  // Direct to product page — Shopify checkout handles subscription via selling plan.
  // The product must have an active selling plan group (monthly recurring).
  // Flow automation tags the customer after first payment with ps-studio or ps-pro.
  var productHandle = 'pattern-studio-' + plan + '-plan';
  // If a selling plan id is stored (set by initSubscription after fetching product),
  // pass it as a query param so Shopify pre-selects the recurring plan in checkout.
  var sp = window['_bmf_sp_' + plan];
  if (sp) {
    location.href = '/products/' + productHandle + '?selling_plan=' + sp;
  } else {
    location.href = '/products/' + productHandle;
  }
}

// Fetch selling plan IDs for studio and pro products on page load
// so startCheckout can pass them to /cart or product page
async function fetchSellingPlans() {
  try {
    ['studio','pro'].forEach(async function(plan) {
      var handle = 'pattern-studio-' + plan + '-plan';
      var r = await fetch('/products/' + handle + '.js');
      if (!r.ok) return;
      var d = await r.json();
      // Find first recurring selling plan
      if (d.selling_plan_groups && d.selling_plan_groups.length) {
        var spg = d.selling_plan_groups[0];
        if (spg.selling_plans && spg.selling_plans.length) {
          window['_bmf_sp_' + plan] = spg.selling_plans[0].id;
        }
      }
    });
  } catch(e) {}
}

/* ── ADMIN PANEL ── */
function showAdminPanel() {
  var old = document.getElementById('bmfAdminPanel');
  if (old) { old.remove(); return; }
  var cur = localStorage.getItem('bmf_preview_tier') || BMF_TIER;
  var wrap = document.createElement('div');
  wrap.id = 'bmfAdminPanel';
  wrap.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(6,15,40,.8);display:flex;align-items:center;justify-content:center;padding:20px';
  function tierBtn(t, label) {
    var on = cur === t;
    return '<button onclick="adminSetTier(\'' + t + '\')" style="flex:1;padding:12px 8px;border-radius:10px;border:2px solid ' + (on?'#1255b0':'var(--border)') + ';background:' + (on?'var(--surface-2)':'#fff') + ';color:' + (on?'#1255b0':'var(--ink-3)') + ';font-size:12px;font-weight:800;cursor:pointer">' + label + '</button>';
  }
  wrap.innerHTML =
    '<div style="background:var(--surface);border-radius:16px;max-width:420px;width:100%;padding:24px;box-shadow:0 24px 80px rgba(0,0,0,.4)">' +
    '<div style="font-size:16px;font-weight:800;color:var(--ink);margin-bottom:4px">&#128273; Admin Preview</div>' +
    '<div style="font-size:11px;color:var(--ink-4);margin-bottom:16px">Switch tiers to test the experience. Persists until changed.</div>' +
    '<div style="display:flex;gap:8px;margin-bottom:16px">' + tierBtn('free','FREE') + tierBtn('studio','STUDIO') + tierBtn('pro','PRO') + '</div>' +
    '<div style="display:flex;flex-direction:column;gap:6px;margin-bottom:14px">' +
    '<button onclick="localStorage.removeItem(\'bmf_gens_total\');location.reload()" style="padding:10px;background:var(--bg);border:1.5px solid #dde5f0;border-radius:8px;font-size:11px;font-weight:700;color:var(--ink-3);cursor:pointer">Reset free gen counter</button>' +
    '<a href="/admin/pages" target="_blank" style="padding:10px;background:var(--bg);border:1.5px solid #dde5f0;border-radius:8px;font-size:11px;font-weight:700;color:var(--ink-3);text-decoration:none;text-align:center">Open Shopify Pages admin</a>' +
    '</div>' +
    '<button onclick="document.getElementById(\'bmfAdminPanel\').remove()" style="width:100%;padding:10px;background:none;border:none;color:var(--ink-4);font-size:12px;font-weight:600;cursor:pointer">Close</button>' +
    '</div>';
  wrap.addEventListener('click', function(e){ if(e.target===wrap) wrap.remove(); });
  document.body.appendChild(wrap);
}

function adminSetTier(t) {
  localStorage.setItem('bmf_preview_tier', t);
  location.reload();
}

/* ══════════════════════════════════════════════════════════════
   YIELD CALCULATOR — units per yard for production planning
   ══════════════════════════════════════════════════════════════ */
function showYieldPanel() {
  if (typeof S==='undefined' || !S.ps || !S.ps.length) { toast_('Generate a pattern first'); return; }
  var old = document.getElementById('bmfYieldPanel');
  if (old) { old.remove(); return; }

  var fw = S.fw || 60;               // fabric width inches
  var totalArea = 0, maxW = 0, maxH = 0;
  S.ps.forEach(function(p) {
    var qm = String(p.q||'').match(/x\s*(\d+)/i);
    var q = qm ? parseInt(qm[1]) : 1;
    totalArea += (p.w * p.h) * q;
    if (p.w > maxW) maxW = p.w;
    if (p.h > maxH) maxH = p.h;
  });
  var yardArea = fw * 36;
  var eff = 0.78; // realistic marker efficiency
  var unitsPerYard = Math.max(0, Math.floor((yardArea * eff) / totalArea * 100) / 100);
  var yardsPerUnit = unitsPerYard > 0 ? (1 / unitsPerYard) : 0;

  var wrap = document.createElement('div');
  wrap.id = 'bmfYieldPanel';
  wrap.style.cssText = 'background:var(--surface);border:2px solid #c5d9f5;border-radius:14px;padding:18px;margin:12px 0;box-shadow:0 6px 24px rgba(18,85,176,.12)';
  wrap.innerHTML =
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">' +
      '<div style="font-size:13px;font-weight:800;color:var(--ink);letter-spacing:.06em">&#9632; YIELD CALCULATOR</div>' +
      '<div style="display:flex;gap:10px;align-items:center"><span style="font-size:10px;font-weight:700;color:var(--ink-4);letter-spacing:.06em">PER YARD &middot; ' + fw + '&quot; WIDE</span>' +
      '<button onclick="document.getElementById(\'bmfYieldPanel\').remove()" style="background:none;border:none;font-size:16px;color:var(--ink-4);cursor:pointer">&#10005;</button></div>' +
    '</div>' +
    '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px">' +
      '<div style="background:var(--surface-2);border:1.5px solid #c5d9f5;border-radius:10px;padding:12px;text-align:center"><div style="font-size:22px;font-weight:800;color:var(--accent)">' + unitsPerYard.toFixed(1) + '</div><div style="font-size:9px;font-weight:700;color:var(--ink-3);letter-spacing:.06em;text-transform:uppercase">Units / yard</div></div>' +
      '<div style="background:var(--surface);border:1.5px solid #dde5f0;border-radius:10px;padding:12px;text-align:center"><div style="font-size:22px;font-weight:800;color:var(--ink)">' + yardsPerUnit.toFixed(2) + '</div><div style="font-size:9px;font-weight:700;color:var(--ink-3);letter-spacing:.06em;text-transform:uppercase">Yards / unit</div></div>' +
      '<div style="background:var(--surface);border:1.5px solid #dde5f0;border-radius:10px;padding:12px;text-align:center"><div style="font-size:22px;font-weight:800;color:var(--ink)">' + Math.round(totalArea) + '</div><div style="font-size:9px;font-weight:700;color:var(--ink-3);letter-spacing:.06em;text-transform:uppercase">Sq in / unit</div></div>' +
    '</div>' +
    '<div style="display:flex;gap:10px;align-items:flex-end;margin-bottom:12px">' +
      '<div style="flex:1"><label style="font-size:10px;font-weight:800;color:var(--ink-3);text-transform:uppercase;letter-spacing:.06em;display:block;margin-bottom:4px">Fabric cost per yard ($)</label>' +
      '<input type="number" id="yieldCostInput" value="12.99" step="0.01" min="0" oninput="updYieldCost()" style="width:100%;padding:9px;border:1.5px solid #c5d9f5;border-radius:8px;font-size:13px;font-weight:700;box-sizing:border-box"></div>' +
      '<div style="flex:1;background:var(--ok-bg);border:1.5px solid #b8e6c8;border-radius:10px;padding:10px;text-align:center"><div id="yieldCostResult" style="font-size:18px;font-weight:800;color:var(--ok)">$' + (yardsPerUnit * 12.99).toFixed(2) + '</div><div style="font-size:9px;font-weight:700;color:var(--ink-3);text-transform:uppercase;letter-spacing:.06em">Fabric cost / unit</div></div>' +
    '</div>' +
    '<button onclick="exportYieldCSV()" style="width:100%;padding:10px;background:var(--surface-2);border:1.5px solid #c5d9f5;border-radius:8px;font-size:11px;font-weight:800;color:var(--accent);cursor:pointer">&#8595; Export yield report (CSV)</button>';

  window._yieldData = { unitsPerYard: unitsPerYard, yardsPerUnit: yardsPerUnit, totalArea: totalArea, fw: fw };
  var cwrap = document.getElementById('cwrap');
  cwrap.parentNode.insertBefore(wrap, cwrap);
  wrap.scrollIntoView({behavior:'smooth', block:'nearest'});
}

function updYieldCost() {
  var cost = parseFloat(document.getElementById('yieldCostInput').value) || 0;
  var d = window._yieldData;
  if (!d) return;
  document.getElementById('yieldCostResult').textContent = '$' + (d.yardsPerUnit * cost).toFixed(2);
}

function exportYieldCSV() {
  var d = window._yieldData;
  if (!d) return;
  var cost = parseFloat(document.getElementById('yieldCostInput').value) || 0;
  var rows = [
    ['Blue Moon Fabrics — Yield Report'],
    ['Garment', (DESIGNS[S.g]||{}).label || S.g],
    ['Fabric width (in)', d.fw],
    ['Marker efficiency', '78%'],
    ['Total piece area (sq in)', Math.round(d.totalArea)],
    ['Units per yard', d.unitsPerYard.toFixed(2)],
    ['Yards per unit', d.yardsPerUnit.toFixed(3)],
    ['Fabric cost/yard', '$'+cost.toFixed(2)],
    ['Fabric cost/unit', '$'+(d.yardsPerUnit*cost).toFixed(2)],
    [],
    ['Piece','Qty','Width (in)','Height (in)','Area (sq in)']
  ];
  S.ps.forEach(function(p){ rows.push([p.n, p.q||1, p.w.toFixed(1), p.h.toFixed(1), (p.w*p.h).toFixed(1)]); });
  var csv = rows.map(function(r){ return r.join(','); }).join('\n');
  var a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  a.download = 'bluemoon-yield-report.csv';
  a.click();
  toast_('Yield report downloaded');
}

/* ══════════════════════════════════════════════════════════════
   SIZE GRADING — full size run (Studio+)
   ══════════════════════════════════════════════════════════════ */
var SIZE_RUN = [
  { size:'2 / XS',  step:-2 },
  { size:'4 / S',   step:-1 },
  { size:'6 / M',   step: 0 },
  { size:'8 / M',   step: 1 },
  { size:'10 / L',  step: 2 },
  { size:'12 / L',  step: 3 },
  { size:'14 / XL', step: 4 },
  { size:'16 / XL', step: 5 },
  { size:'18 / 2X', step: 6 },
  { size:'20 / 3X', step: 7 },
];
var GRADE_SEL = { on: {}, base: 2 };  // base index = 6/M
SIZE_RUN.forEach(function(_, i){ GRADE_SEL.on[i] = true; });

// Field classification — industry grade rules
function gradeFieldDelta(fieldId, steps) {
  var id = fieldId.toLowerCase();
  // Circumference fields: 2"/size, 3"/size above size 16 (step>=5)
  var circ = ['bust','underbust','waist','hips','hip','chest','ribcage','band'];
  // Length fields: 3/8"/size
  var len = ['torso','length','inseam','outseam','skirt','dress','strap','depth','height'];
  // Small-grade fields: 1/4"/size
  var small = ['rise','cup','sleeve','arm','shoulder','neck'];
  function stepSum(per, big) {
    var total = 0, s = steps;
    var dir = s > 0 ? 1 : -1;
    for (var i = 0; i < Math.abs(s); i++) {
      var stepIdx = dir > 0 ? i : -(i+1);
      // steps beyond +4 from base (size 16→18→20) use bigger circumference grade
      total += dir * ((big && (dir>0 ? stepIdx >= 5-1 : false)) ? big : per);
    }
    return total;
  }
  if (circ.some(function(k){ return id.indexOf(k) >= 0; }))  return stepSum(2, 3);
  if (small.some(function(k){ return id.indexOf(k) >= 0; })) return stepSum(0.25);
  if (len.some(function(k){ return id.indexOf(k) >= 0; }))   return stepSum(0.375);
  return stepSum(0.5); // unknown fields get a conservative mid grade
}

// Build graded measurements for a size, clamped to field min/max
function gradeMeasurements(baseM, cfg, stepsFromBase) {
  var gm = {};
  for (var k in baseM) gm[k] = baseM[k];
  (cfg.fields || []).forEach(function(f) {
    if (typeof gm[f.id] !== 'number') return;
    var graded = gm[f.id] + gradeFieldDelta(f.id, stepsFromBase);
    if (typeof f.mn === 'number') graded = Math.max(f.mn, graded);
    if (typeof f.mx === 'number') graded = Math.min(f.mx, graded);
    gm[f.id] = Math.round(graded * 8) / 8; // nearest 1/8"
  });
  return gm;
}

function openGrading() {
  if (!requireTier('grade','studio','grade')) return;
  if (typeof S==='undefined' || !S.g || !S.design) { toast_('Generate your pattern first, then tap Size Run'); return; }
  if (!S.ps || !S.ps.length) {
    toast_('Generating pattern first...');
    try { generate(); } catch(e) {}
    setTimeout(function(){ if (S.ps && S.ps.length) renderGradeModal(); }, 900);
    return;
  }
  if (!window._gradeExplained) {
    window._gradeExplained = true;
    var ov = document.createElement('div');
    ov.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(6,15,40,.82);display:flex;align-items:center;justify-content:center;padding:20px';
    ov.innerHTML = '<div style="background:var(--surface);border-radius:16px;max-width:380px;width:100%;padding:24px">'
      + '<div style="font-size:32px;text-align:center;margin-bottom:10px">&#128208;</div>'
      + '<div style="font-size:17px;font-weight:800;color:var(--ink);margin-bottom:10px;text-align:center">Size Run — what is it?</div>'
      + '<div style="font-size:13px;color:var(--ink-2);line-height:1.7;margin-bottom:14px">'
      + 'Your pattern is drafted in <strong>your exact measurements</strong>. '
      + 'Size Run re-drafts the same pattern in standard sizes (XS through 3X) so you can make it for multiple people or sell it commercially.<br><br>'
      + '<strong>It does not just scale</strong> &mdash; it moves each point by the exact amount a professional grader would use. Factory quality.'
      + '</div>'
      + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px">'
      + '<div style="background:var(--surface-2);border-radius:8px;padding:10px;font-size:11px;color:var(--ink-2)"><strong style="color:var(--accent);display:block;margin-bottom:4px">What you get</strong>Every size re-drafted &middot; CSV spreadsheet &middot; DXF factory file</div>'
      + '<div style="background:var(--ok-bg);border-radius:8px;padding:10px;font-size:11px;color:var(--ink-2)"><strong style="color:var(--ok);display:block;margin-bottom:4px">Grade rules</strong>+2&Prime; circumference per size &middot; +3/8&Prime; lengths</div>'
      + '</div>'
      + '<button onclick="bmfCloseOverlay();renderGradeModal();" style="width:100%;padding:13px;background:var(--accent);color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:800;cursor:pointer;margin-bottom:8px">Open Size Run &rarr;</button>'
      + '<button onclick="bmfCloseOverlay()" style="width:100%;padding:10px;background:none;border:none;color:var(--ink-4);font-size:12px;cursor:pointer">Not now</button>'
      + '</div>';
    document.body.appendChild(ov);
    return;
  }
  var old = document.getElementById('bmfGradeModal');
  if (old) { old.remove(); return; }
  renderGradeModal();
}

function bmfTooltip(el, msg) {
  var old = document.getElementById('bmfTip');
  if (old) { old.remove(); if (old._src===el) return; }
  var tip = document.createElement('div');
  tip.id = 'bmfTip';
  tip._src = el;
  tip.style.cssText = 'position:fixed;z-index:999999;background:var(--ink);color:#fff;font-size:11px;line-height:1.5;padding:8px 12px;border-radius:8px;max-width:220px;box-shadow:0 4px 20px rgba(0,0,0,.3)';
  tip.textContent = msg;
  var r = el.getBoundingClientRect();
  tip.style.top = (r.bottom + 6) + 'px';
  tip.style.left = Math.min(r.left, window.innerWidth - 230) + 'px';
  document.body.appendChild(tip);
  setTimeout(function(){ tip.remove(); }, 4000);
}

function bmfDismissGradeWizard() {
  try { localStorage.setItem('bmf_grade_wizard_seen','1'); } catch(e) {}
  var w = document.getElementById('bmfGradeWizard');
  if (w) { w.style.transition='opacity .3s'; w.style.opacity='0'; setTimeout(function(){ w.remove(); },300); }
}

function renderGradeModal() {
  var old = document.getElementById('bmfGradeModal');
  if (old) old.remove();
  if (!S.g || !S.design) { toast_('Pick a garment and design style first'); return; }
  if (!S.ps || !S.ps.length) { toast_('Generate your pattern first, then open Size Run'); return; }

  var cfg = DESIGNS[S.g];
  var styleDef = cfg.styles.find(function(s){ return s.id === S.design; });
  var baseStep = SIZE_RUN[GRADE_SEL.base].step;
  var activeSizes = SIZE_RUN.map(function(g,i){ return {g:g,i:i}; }).filter(function(x){ return GRADE_SEL.on[x.i]; });

  // Re-draft every selected size using industry-standard grade rules
  var gradedRows = activeSizes.map(function(x) {
    var stepsFromBase = x.g.step - baseStep;
    var gm = gradeMeasurements(S.m, cfg, stepsFromBase);
    var pieces = [];
    try { pieces = styleDef.pieces(gm); } catch(e) { pieces = []; }
    return { size: x.g.size, isBase: x.i === GRADE_SEL.base, m: gm, pieces: pieces };
  });
  window._gradedRows = gradedRows;

  var wrap = document.createElement('div');
  wrap.id = 'bmfGradeModal';
  wrap.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(6,15,40,.82);display:flex;align-items:flex-end;justify-content:center';

  var box = document.createElement('div');
  box.style.cssText = 'background:var(--surface);border-radius:16px 16px 0 0;max-width:680px;width:100%;max-height:93vh;display:flex;flex-direction:column;box-shadow:0 -12px 60px rgba(0,0,0,.4);overflow:hidden';

  // ── HEADER ──
  var hdr = document.createElement('div');
  hdr.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:16px 18px 12px;border-bottom:1.5px solid #eef2f8;flex-shrink:0';
  hdr.innerHTML = '<div><div style="font-size:16px;font-weight:800;color:var(--ink)">&#128208; Size Run — Grade Your Pattern</div>'
    + '<div style="font-size:10px;color:var(--ink-4);margin-top:2px">' + cfg.label + ' &middot; ' + (styleDef?styleDef.name:'') + ' &middot; re-drafted for every size from your measurements</div></div>'
    + '<button onclick="document.getElementById(&quot;bmfGradeModal&quot;).remove()" style="background:none;border:none;font-size:20px;color:var(--ink-4);cursor:pointer;padding:4px 8px;line-height:1">&#10005;</button>';
  box.appendChild(hdr);

  // ── WHAT IS GRADING? (always visible, simple language) ──
  var explainer = document.createElement('div');
  explainer.style.cssText = 'background:var(--surface-2);border-bottom:1.5px solid #c5d9f5;padding:14px 18px;flex-shrink:0';
  explainer.innerHTML = '<div style="font-size:12px;font-weight:800;color:var(--ink);margin-bottom:8px">&#127891; What is size grading?</div>'
    + '<div style="font-size:11px;color:var(--ink-2);line-height:1.7;margin-bottom:8px">'
    + 'Grading means re-drafting your pattern in multiple sizes &mdash; <strong>not just stretching or shrinking it</strong>. '
    + 'Scaling distorts every seam. True grading moves each measurement point by a precise amount, the same way factories do it.'
    + '</div>'
    + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">'
    + '<div style="background:var(--surface);border-radius:8px;padding:9px;border:1px solid #dde5f0">'
    +   '<div style="font-size:10px;font-weight:800;color:var(--accent);margin-bottom:2px">How it works here</div>'
    +   '<div style="font-size:10px;color:var(--ink-3);line-height:1.5">1. Set your base size below<br>2. Tap sizes to add them<br>3. Download CSV or DXF</div>'
    + '</div>'
    + '<div style="background:var(--surface);border-radius:8px;padding:9px;border:1px solid #dde5f0">'
    +   '<div style="font-size:10px;font-weight:800;color:var(--accent);margin-bottom:2px">Industry grade rules</div>'
    +   '<div style="font-size:10px;color:var(--ink-3);line-height:1.5">+2&Prime; circ per size (XS&ndash;16)<br>+3&Prime; above size 16<br>+3/8&Prime; lengths per size</div>'
    + '</div>'
    + '</div>';
  box.appendChild(explainer);

  // ── SCROLLABLE BODY ──
  var body = document.createElement('div');
  body.style.cssText = 'overflow-y:auto;flex:1;-webkit-overflow-scrolling:touch';

  // ── STEP 1: BASE SIZE ──
  var step1 = document.createElement('div');
  step1.style.cssText = 'padding:14px 18px;border-bottom:1.5px solid #eef2f8';
  var baseOpts = SIZE_RUN.map(function(g,i){
    return '<option value="'+i+'"'+(i===GRADE_SEL.base?' selected':'')+'>'+g.size+'</option>';
  }).join('');
  step1.innerHTML = '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">'
    + '<div style="width:22px;height:22px;background:var(--accent);border-radius:50%;color:#fff;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0">1</div>'
    + '<div style="font-size:12px;font-weight:800;color:var(--ink)">Set your base size</div>'
    + '</div>'
    + '<div style="font-size:11px;color:var(--ink-3);margin-bottom:10px;line-height:1.6">'
    + 'Your base size is the size that matches <strong>your entered measurements</strong>. '
    + 'All other sizes grade up or down from this anchor. Choose the standard size closest to your bust measurement.'
    + '</div>'
    + '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">'
    + '<select onchange="setGradeBase(this.value)" style="padding:8px 12px;border:1.5px solid #c5d9f5;border-radius:8px;font-size:13px;font-weight:700;color:var(--ink);background:var(--surface)">'
    + baseOpts + '</select>'
    + '<div style="font-size:11px;color:var(--ink-4)">'
    +   '&#9679; = your entered measurements &nbsp;&middot;&nbsp; '
    +   'Bust ' + (S.m.bust||'?') + '&Prime; &rarr; typically ' + bmfGuessSize(S.m.bust||36)
    + '</div>'
    + '</div>';
  body.appendChild(step1);

  // ── STEP 2: SELECT SIZES ──
  var step2 = document.createElement('div');
  step2.style.cssText = 'padding:14px 18px;border-bottom:1.5px solid #eef2f8';
  var chips = SIZE_RUN.map(function(g,i) {
    var on = GRADE_SEL.on[i];
    var isBase = i === GRADE_SEL.base;
    var bg = isBase ? '#1255b0' : on ? 'var(--surface-2)' : '#f8f9fb';
    var border = isBase ? '#1255b0' : on ? '#7aa8e0' : 'var(--border)';
    var color = isBase ? '#fff' : on ? '#1255b0' : 'var(--ink-4)';
    return '<button onclick="toggleGradeSize(' + i + ')" style="padding:7px 12px;border-radius:16px;border:1.5px solid '+border+';background:'+bg+';color:'+color+';font-size:11px;font-weight:800;cursor:pointer;white-space:nowrap;transition:all .15s">'
      + g.size + (isBase ? ' &#9679;' : (on ? ' &#10003;' : '')) + '</button>';
  }).join('');
  step2.innerHTML = '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">'
    + '<div style="width:22px;height:22px;background:var(--accent);border-radius:50%;color:#fff;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0">2</div>'
    + '<div style="font-size:12px;font-weight:800;color:var(--ink)">Choose your sizes</div>'
    + '</div>'
    + '<div style="font-size:11px;color:var(--ink-3);margin-bottom:10px;line-height:1.6">'
    + 'Tap any size to add it to your size run. The table below updates instantly with exact piece dimensions for every size.'
    + '</div>'
    + '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px">' + chips
    + '<button onclick="addCustomGradeSize()" style="padding:7px 12px;border-radius:16px;border:1.5px dashed #c9a961;background:var(--surface-warm);color:var(--gold);font-size:11px;font-weight:800;cursor:pointer;white-space:nowrap">+ Custom size</button>'
    + '</div>'
    + '<div style="font-size:10px;color:var(--ink-4)">&#9679; = base size (always included) &nbsp;&middot;&nbsp; &#10003; = added to your run</div>';
  body.appendChild(step2);

  // ── SIZE RUN TABLE ──
  var tableSection = document.createElement('div');
  tableSection.style.cssText = 'padding:14px 18px;border-bottom:1.5px solid #eef2f8';
  var showPieces = Math.min(4, gradedRows[0] ? gradedRows[0].pieces.length : 0);
  var headCells = '';
  if (gradedRows[0]) {
    headCells = gradedRows[0].pieces.slice(0, showPieces).map(function(p) {
      return '<th style="padding:7px 8px;font-size:9px;font-weight:800;color:var(--ink-3);text-transform:uppercase;letter-spacing:.05em;text-align:left;border-bottom:2px solid #dde5f0;white-space:nowrap">'+p.n+'</th>';
    }).join('');
  }
  var rows = gradedRows.map(function(r) {
    var cells = r.pieces.slice(0, showPieces).map(function(p) {
      return '<td style="padding:7px 8px;font-size:11px;color:var(--ink-2);border-bottom:1px solid #eef2f8;white-space:nowrap">'+p.w.toFixed(1)+'&quot;&times;'+p.h.toFixed(1)+'&quot;</td>';
    }).join('');
    return '<tr'+(r.isBase?' style="background:var(--surface-2)"':'')+'>'+
      '<td style="padding:7px 8px;font-size:11px;font-weight:800;color:var(--ink);border-bottom:1px solid #eef2f8;white-space:nowrap">'+r.size+(r.isBase?' &#9679;':'')+'</td>'+
      cells+'</tr>';
  }).join('');

  tableSection.innerHTML = '<div style="font-size:11px;font-weight:800;color:var(--ink);margin-bottom:8px">'
    + '&#128202; Piece dimensions by size <span style="font-size:10px;font-weight:400;color:var(--ink-4)">(showing ' + showPieces + ' of ' + (gradedRows[0]?gradedRows[0].pieces.length:0) + ' pieces &mdash; width &times; height in inches)</span>'
    + '</div>'
    + (gradedRows.length === 0
      ? '<div style="text-align:center;padding:20px;color:var(--ink-4);font-size:12px">Select sizes above to see piece dimensions</div>'
      : '<div style="overflow-x:auto;-webkit-overflow-scrolling:touch"><table style="width:100%;border-collapse:collapse;min-width:360px">'
        + '<thead><tr><th style="padding:7px 8px;font-size:9px;font-weight:800;color:var(--ink-3);text-transform:uppercase;letter-spacing:.05em;text-align:left;border-bottom:2px solid #dde5f0">Size</th>'
        + headCells + '</tr></thead>'
        + '<tbody>' + rows + '</tbody></table></div>')
    + '<div style="font-size:10px;color:var(--ink-4);margin-top:8px;line-height:1.6">'
    + 'Each size is <strong>re-drafted</strong> (not scaled) using 2&Prime; circumference grades &middot; 3/8&Prime; length grades'
    + '</div>';
  body.appendChild(tableSection);

  // ── STEP 3: EXPORT ──
  var step3 = document.createElement('div');
  step3.style.cssText = 'padding:14px 18px';
  step3.innerHTML = '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">'
    + '<div style="width:22px;height:22px;background:var(--accent);border-radius:50%;color:#fff;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0">3</div>'
    + '<div style="font-size:12px;font-weight:800;color:var(--ink)">Export your size run</div>'
    + '</div>'
    + '<div style="font-size:11px;color:var(--ink-3);margin-bottom:12px;line-height:1.6">'
    + '<strong>CSV</strong> gives you a spreadsheet with every piece dimension per size &mdash; send to your patternmaker or factory. '
    + '<strong>Graded DXF</strong> is the industry file format (Gerber, Lectra, CLO 3D) with one layer per size, ready for a cutting room.'
    + '</div>'
    + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">'
    + '<button onclick="exportGradeCSV()" style="padding:13px;background:var(--surface-2);border:1.5px solid #c5d9f5;border-radius:8px;font-size:12px;font-weight:800;color:var(--accent);cursor:pointer">'
    +   '&#8595; Size Run CSV<br><span style="font-size:10px;font-weight:400;color:var(--ink-4)">Spreadsheet &middot; all sizes</span>'
    + '</button>'
    + '<button onclick="exportGradeDXF()" style="padding:13px;background:linear-gradient(135deg,var(--accent),var(--accent-deep));border:none;border-radius:8px;font-size:12px;font-weight:800;color:#fff;cursor:pointer">'
    +   '&#8595; Graded DXF<br><span style="font-size:10px;font-weight:400;color:rgba(255,255,255,.7)">Factory file &middot; one layer per size</span>'
    + '</button>'
    + '</div>';
  body.appendChild(step3);

  box.appendChild(body);

  // ── SAFE AREA ──
  var safe = document.createElement('div');
  safe.style.cssText = 'height:env(safe-area-inset-bottom,0px);background:var(--surface);flex-shrink:0';
  box.appendChild(safe);

  wrap.appendChild(box);
  wrap.addEventListener('click', function(e){ if(e.target===wrap) wrap.remove(); });
  document.body.appendChild(wrap);
}

// Helper: guess standard US size from bust measurement
function bmfGuessSize(bust) {
  if (bust <= 32) return 'US 2 (XS)';
  if (bust <= 34) return 'US 4–6 (S)';
  if (bust <= 36) return 'US 8 (M)';
  if (bust <= 38) return 'US 10–12 (M/L)';
  if (bust <= 40) return 'US 14 (L)';
  if (bust <= 42) return 'US 16 (XL)';
  if (bust <= 44) return 'US 18 (1X)';
  if (bust <= 46) return 'US 20 (1X/2X)';
  if (bust <= 48) return 'US 22 (2X)';
  if (bust <= 50) return 'US 24 (3X)';
  return 'US 26+ (3X+)';
}

function addCustomGradeSize() {
  var label = prompt('Size label for the cutter (e.g. "22 / 4X", "Petite 6", "Tall M"):');
  if (!label) return;
  var stepStr = prompt('Grade steps from your base size (e.g. 8 = eight sizes up, -3 = three down).\nEach step = 2" circumference (3" above size 16), 3/8" lengths:', '8');
  var step = parseFloat(stepStr);
  if (isNaN(step)) { toast_('Enter a number of grade steps'); return; }
  SIZE_RUN.push({ size: label.slice(0,14), step: step });
  GRADE_SEL.on[SIZE_RUN.length-1] = true;
  renderGradeModal();
  toast_('Size "' + label + '" added to the run');
}

function toggleGradeSize(i) {
  if (i === GRADE_SEL.base) return; // base always on
  GRADE_SEL.on[i] = !GRADE_SEL.on[i];
  renderGradeModal();
}
function setGradeBase(v) {
  GRADE_SEL.base = parseInt(v);
  GRADE_SEL.on[GRADE_SEL.base] = true;
  renderGradeModal();
}

function exportGradeCSV() {
  var rows = window._gradedRows || [];
  if (!rows.length) return;
  var cfg = DESIGNS[S.g];
  var out = [['Blue Moon Fabrics — Graded Size Run'],['Garment', cfg.label],['Graded from', SIZE_RUN[GRADE_SEL.base].size + ' (your measurements)'],[]];
  // Measurements per size
  var fieldIds = (cfg.fields||[]).map(function(f){ return f.id; });
  out.push(['MEASUREMENTS'].concat(fieldIds));
  rows.forEach(function(r) {
    out.push([r.size].concat(fieldIds.map(function(id){ return r.m[id]; })));
  });
  out.push([]);
  // Piece dims per size
  var pieceNames = rows[0].pieces.map(function(p){ return p.n; });
  out.push(['PIECES (W x H inches)'].concat(pieceNames));
  rows.forEach(function(r) {
    out.push([r.size].concat(r.pieces.map(function(p){ return p.w.toFixed(2)+' x '+p.h.toFixed(2); })));
  });
  var csv = out.map(function(r){ return r.join(','); }).join('\n');
  var a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  a.download = 'blue-moon-pattern-maker-graded-sizes.csv';
  a.click();
  toast_('Graded size run downloaded');
}

function exportGradeDXF() {
  var rows = window._gradedRows || [];
  if (!rows.length) return;
  var dxf = '0\nSECTION\n2\nENTITIES\n';
  var yOffset = 0;
  rows.forEach(function(r) {
    var layer = 'SIZE_' + r.size.replace(/[^0-9A-Za-z]/g,'_');
    var xOffset = 0, maxH = 0;
    r.pieces.forEach(function(p) {
      dxf += '0\nLWPOLYLINE\n8\n' + layer + '\n90\n4\n70\n1\n';
      dxf += '10\n'+xOffset.toFixed(2)+'\n20\n'+yOffset.toFixed(2)+'\n';
      dxf += '10\n'+(xOffset+p.w).toFixed(2)+'\n20\n'+yOffset.toFixed(2)+'\n';
      dxf += '10\n'+(xOffset+p.w).toFixed(2)+'\n20\n'+(yOffset+p.h).toFixed(2)+'\n';
      dxf += '10\n'+xOffset.toFixed(2)+'\n20\n'+(yOffset+p.h).toFixed(2)+'\n';
      // Piece label
      dxf += '0\nTEXT\n8\n' + layer + '\n10\n'+(xOffset+1).toFixed(2)+'\n20\n'+(yOffset+p.h/2).toFixed(2)+'\n40\n1.2\n1\n'+p.n+' '+r.size+'\n';
      xOffset += p.w + 2;
      maxH = Math.max(maxH, p.h);
    });
    yOffset += maxH + 4;
  });
  dxf += '0\nENDSEC\n0\nEOF\n';
  var a = document.createElement('a');
  a.href = 'data:application/dxf;charset=utf-8,' + encodeURIComponent(dxf);
  a.download = 'blue-moon-pattern-maker-graded.dxf';
  a.click();
  toast_('Graded DXF — one layer per size, real re-drafted dims');
}

function handleLogoTap(e){_adminTaps=(_adminTaps||0)+1;clearTimeout(_adminTapTimer);if(_adminTaps>=5){_adminTaps=0;e.preventDefault();if(typeof showAdminPanel==='function')showAdminPanel();return false;}_adminTapTimer=setTimeout(function(){_adminTaps=0;},1500);return true;}
function adminLogoTap(){handleLogoTap({preventDefault:function(){}});}
function killThemeChrome(){try{var root=document.getElementById('bmf-root');if(!root)return;var node=root,depth=0;while(node&&node.parentElement&&depth<6){var parent=node.parentElement;if(parent===document.body||parent===document.documentElement)break;[].forEach.call(parent.children,function(child){if(child===node)return;var tag=(child.tagName||'').toLowerCase();var id=(child.id||'').toLowerCase();var cls=typeof child.className==='string'?child.className.toLowerCase():'';if(tag==='header'||tag==='footer'||tag==='nav'||id.indexOf('shopify')>=0||id.indexOf('header')>=0||cls.indexOf('site-header')>=0||cls.indexOf('site-footer')>=0||cls.indexOf('site-nav')>=0||cls.indexOf('announcement')>=0||cls.indexOf('mobile-nav')>=0){try{child.style.setProperty('display','none','important');}catch(ex){}}});try{parent.style.setProperty('padding','0','important');parent.style.setProperty('margin','0','important');}catch(ex){}node=parent;depth++;}}catch(e){}}
killThemeChrome();setTimeout(killThemeChrome,200);setTimeout(killThemeChrome,800);
window.addEventListener('scroll',function(){clearTimeout(window._ktt);window._ktt=setTimeout(killThemeChrome,100);},{passive:true});

function refreshLook(){var gate=document.getElementById('lookGate');var wrap=document.getElementById('lookAIWrap');if(!gate||!wrap)return;if(typeof canDo==='function'&&!canDo('look')){gate.style.display='block';wrap.style.display='none';}else{gate.style.display='none';wrap.style.display='block';}}
async function generateLookImage(){
  if(typeof S==='undefined'||!S.g||!S.design){if(typeof toast_==='function')toast_('Generate a pattern first');return;}
  if(typeof canDo==='function'&&!canDo('look')){if(typeof showUpgrade==='function')showUpgrade('look','pro','look');return;}
  var cfg=DESIGNS[S.g];
  var styleDef=cfg&&cfg.styles&&cfg.styles.find(function(s){return s.id===S.design;});
  var modelSel=document.getElementById('look-model-sel');
  var settingSel=document.getElementById('look-setting-sel');
  var fabricEl=document.getElementById('look-fabric-desc');
  var model=modelSel?modelSel.value:'woman_25_diverse';
  var setting=settingSel?settingSel.value:'studio white';
  var fabric=fabricEl?fabricEl.value:'blue lycra';
  var modelDesc={'woman_25_diverse':'a 25-year-old woman with diverse features','woman_30_athletic':'a 30-year-old athletic woman','woman_40_curvy':'a 40-year-old curvy plus-size woman','woman_20_petite':'a 20-year-old petite woman','man_28_athletic':'a 28-year-old athletic man'}[model]||'a confident model';
  var garmentName=cfg?cfg.label:S.g;
  var styleName=styleDef?styleDef.name:S.design;
  var prompt='Professional fashion photography of '+modelDesc+' wearing a '+garmentName+' in '+styleName+' style, made from '+fabric+'. Setting: '+setting+' background. Full body shot. Fashion editorial quality. No text.';
  var load=document.getElementById('lookLoadingState');
  var empty=document.getElementById('lookEmptyState');
  var imgWrap=document.getElementById('lookImageWrap');
  var errState=document.getElementById('lookErrorState');
  if(empty)empty.style.display='none';
  if(imgWrap)imgWrap.style.display='none';
  if(errState)errState.style.display='none';
  if(load)load.style.display='flex';
  try{
    var out=await psRender(psRenderContext({model:model,setting:setting,mode:'photo'}),'3:4'); var url=out.image; window.__psLastRender=url;
    var img=new Image();
    img.onload=function(){
      var ai=document.getElementById('lookAIImage');
      if(ai)ai.src=url;
      var meta=document.getElementById('lookImgMeta');
      if(meta)meta.textContent=garmentName+' · '+styleName+' · '+fabric;
      if(load)load.style.display='none';
      if(imgWrap)imgWrap.style.display='block';
      if(typeof toast_==='function')toast_('Image generated ✓');
    };
    img.onerror=function(){
      if(load)load.style.display='none';
      var msg=document.getElementById('lookErrorMsg');
      if(msg)msg.textContent='Image generation failed. Check your connection.';
      if(errState)errState.style.display='block';
    };
    img.src=url;
  }catch(e){
    if(load)load.style.display='none';
    if(errState)errState.style.display='block';
  }
}
function downloadLookImage(){var src=document.getElementById('lookAIImage');if(!src||!src.src)return;var a=document.createElement('a');a.href=src.src;a.download='bluemoon-model.jpg';a.target='_blank';a.click();}

function dSvg(paths,vb='0 0 56 70'){return `<svg viewBox="${vb}" fill="none">${paths}</svg>`;}

// ===== HELPER =====
const cx=c=>({AA:0,A:0,B:.5,C:1,D:1.5,'DD/E':2,F:2.5,'G+':3}[c]||1);

// ===== GARMENT ICONS (68x68 SVG) =====
const ICONS={
bikini_top:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="mgi_bikini" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#9ecbff"/><stop offset="100%" stop-color="#2e6fd8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/><path d="M26 24 C29 26 39 26 42 24" stroke="#cbbb9c" stroke-width=".6" fill="none"/><path d="M26.5 34 C29 35.6 39 35.6 41.5 34" stroke="#cbbb9c" stroke-width=".6" fill="none"/></g><path d="M25.5 19 L33 30 L25 33 C22.5 29 22.5 23 25.5 19 Z" fill="url(#mgi_bikini)" stroke="#1a4fa8" stroke-width="1.7" stroke-linejoin="round"/><path d="M42.5 19 L35 30 L43 33 C45.5 29 45.5 23 42.5 19 Z" fill="url(#mgi_bikini)" stroke="#1a4fa8" stroke-width="1.7" stroke-linejoin="round"/><path d="M25.5 19 L33 9 M42.5 19 L35 9 M25 33 L43 33" stroke="#1a4fa8" stroke-width="1.2" opacity=".75"/></svg>`,
bikini_bottom:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="mgi_bikini" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#9ecbff"/><stop offset="100%" stop-color="#2e6fd8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/><path d="M26 24 C29 26 39 26 42 24" stroke="#cbbb9c" stroke-width=".6" fill="none"/><path d="M26.5 34 C29 35.6 39 35.6 41.5 34" stroke="#cbbb9c" stroke-width=".6" fill="none"/></g><path d="M24.5 36 C28 38 40 38 43.5 36 L42.5 42.5 C40 47.5 36.5 50.5 34 51 C31.5 50.5 28 47.5 25.5 42.5 Z" fill="url(#mgi_bikini)" stroke="#1a4fa8" stroke-width="1.7" stroke-linejoin="round"/><path d="M24.5 36 C28.5 37.6 39.5 37.6 43.5 36" stroke="#1a4fa8" stroke-width="1.1" opacity=".7"/><path d="M27 40 C25 41.5 23.5 41 22.5 40 M41 40 C43 41.5 44.5 41 45.5 40" stroke="#1a4fa8" stroke-width="1.2" stroke-linecap="round"/></svg>`,
one_piece:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="mgi_onepi" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#8fd0e8"/><stop offset="100%" stop-color="#1873b8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/><path d="M26 24 C29 26 39 26 42 24" stroke="#cbbb9c" stroke-width=".6" fill="none"/><path d="M26.5 34 C29 35.6 39 35.6 41.5 34" stroke="#cbbb9c" stroke-width=".6" fill="none"/></g><path d="M27 13.5 L29.5 21 C31 24 37 24 38.5 21 L41 13.5 L44 14.5 C45 24 44.5 32 43 38 C41.8 43 40 47.5 38 50 L30 50 C28 47.5 26.2 43 25 38 C23.5 32 23 24 24 14.5 Z" fill="url(#mgi_onepi)" stroke="#0d5490" stroke-width="1.7" stroke-linejoin="round"/><path d="M27 13.5 L28 8.5 M41 13.5 L40 8.5 M26 30 C30 32 38 32 42 30" stroke="#0d5490" stroke-width="1.2" opacity=".7"/></svg>`,
swim_dress:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="mgi_swimd" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#7fd6b8"/><stop offset="100%" stop-color="#1a9668"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/><path d="M26 24 C29 26 39 26 42 24" stroke="#cbbb9c" stroke-width=".6" fill="none"/><path d="M26.5 34 C29 35.6 39 35.6 41.5 34" stroke="#cbbb9c" stroke-width=".6" fill="none"/></g><path d="M27 13.5 L30 20 C31.5 22.5 36.5 22.5 38 20 L41 13.5 L44 15 C45 22 45 28 44 33 L24 33 C23 28 23 22 24 15 Z" fill="url(#mgi_swimd)" stroke="#0c6e4a" stroke-width="1.7" stroke-linejoin="round"/><path d="M24 33 L44 33 C46 40 48.5 47 50.5 53 C40 57.5 28 57.5 17.5 53 C19.5 47 22 40 24 33 Z" fill="url(#mgi_swimd)" fill-opacity=".8" stroke="#0c6e4a" stroke-width="1.7" stroke-linejoin="round"/><path d="M27 13.5 L28 8.5 M41 13.5 L40 8.5 M20 49 C29 52.5 39 52.5 48 49" stroke="#0c6e4a" stroke-width="1.1" opacity=".65"/></svg>`,
leggings:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="mgi_leggin" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#5e7fd8"/><stop offset="100%" stop-color="#1d2f6e"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/><path d="M26 24 C29 26 39 26 42 24" stroke="#cbbb9c" stroke-width=".6" fill="none"/><path d="M26.5 34 C29 35.6 39 35.6 41.5 34" stroke="#cbbb9c" stroke-width=".6" fill="none"/></g><path d="M25.5 34 C29 36 39 36 42.5 34 L43.5 41 C43 48 42 55 41 61 L36.5 61 L34.5 44 L33.5 44 L31.5 61 L27 61 C26 55 25 48 24.5 41 Z" fill="url(#mgi_leggin)" stroke="#141f4e" stroke-width="1.7" stroke-linejoin="round"/><path d="M25.5 37.5 C29.5 39.3 38.5 39.3 42.5 37.5" stroke="#141f4e" stroke-width="1.2" opacity=".8"/><path d="M28 44 C27.5 50 27 55 26.8 59 M40 44 C40.5 50 41 55 41.2 59" stroke="white" stroke-width=".9" opacity=".4"/></svg>`,
sports_bra:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="mgi_sports" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#9ecbff"/><stop offset="100%" stop-color="#3a7fd8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/><path d="M26 24 C29 26 39 26 42 24" stroke="#cbbb9c" stroke-width=".6" fill="none"/><path d="M26.5 34 C29 35.6 39 35.6 41.5 34" stroke="#cbbb9c" stroke-width=".6" fill="none"/></g><path d="M25 14.5 L28.5 12.5 L34 14 L39.5 12.5 L43 14.5 C44.5 18.5 44.5 24 43.5 28 C37.5 31 30.5 31 24.5 28 C23.5 24 23.5 18.5 25 14.5 Z" fill="url(#mgi_sports)" stroke="#1a4fa8" stroke-width="1.7" stroke-linejoin="round"/><path d="M28.5 12.5 L30 8 M39.5 12.5 L38 8 M30 8 C32 7 36 7 38 8 M25 27 C30 29.5 38 29.5 43 27" stroke="#1a4fa8" stroke-width="1.2" opacity=".75"/></svg>`,
leotard:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="mgi_leotar" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#c99ae8"/><stop offset="100%" stop-color="#7a28b8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/><path d="M26 24 C29 26 39 26 42 24" stroke="#cbbb9c" stroke-width=".6" fill="none"/><path d="M26.5 34 C29 35.6 39 35.6 41.5 34" stroke="#cbbb9c" stroke-width=".6" fill="none"/></g><path d="M27 13.5 L30 19.5 C31.5 22 36.5 22 38 19.5 L41 13.5 L44 15 C45 23 45 31 43.5 37.5 C42.5 42.5 40.5 47 38.5 49.5 L29.5 49.5 C27.5 47 25.5 42.5 24.5 37.5 C23 31 23 23 24 15 Z" fill="url(#mgi_leotar)" stroke="#5a1a90" stroke-width="1.7" stroke-linejoin="round"/><path d="M27 13.5 L28 8.5 M41 13.5 L40 8.5 M29.5 49.5 C27 46 25.5 43 25 41 M38.5 49.5 C41 46 42.5 43 43 41" stroke="#5a1a90" stroke-width="1.2" opacity=".7"/></svg>`,
unitard:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="mgi_unitar" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#a98ae0"/><stop offset="100%" stop-color="#4a1a98"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/><path d="M26 24 C29 26 39 26 42 24" stroke="#cbbb9c" stroke-width=".6" fill="none"/><path d="M26.5 34 C29 35.6 39 35.6 41.5 34" stroke="#cbbb9c" stroke-width=".6" fill="none"/></g><path d="M27 13.5 L30 19 C31.5 21.5 36.5 21.5 38 19 L41 13.5 L44 15 C45 24 44.5 32 43.5 38 L44 44 C43.5 50 42.5 56 41.5 60.5 L37 60.5 L34.5 44 L33.5 44 L31 60.5 L26.5 60.5 C25.5 56 24.5 50 24 44 L24.5 38 C23.5 32 23 24 24 15 Z" fill="url(#mgi_unitar)" stroke="#361270" stroke-width="1.7" stroke-linejoin="round"/><path d="M27 13.5 L28 8.5 M41 13.5 L40 8.5" stroke="#361270" stroke-width="1.2" opacity=".7"/></svg>`,
crop_top:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="mgi_cropt" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#ff9db0"/><stop offset="100%" stop-color="#d81b50"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/><path d="M26 24 C29 26 39 26 42 24" stroke="#cbbb9c" stroke-width=".6" fill="none"/><path d="M26.5 34 C29 35.6 39 35.6 41.5 34" stroke="#cbbb9c" stroke-width=".6" fill="none"/></g><path d="M26.5 13.5 L34 11.5 L41.5 13.5 C43.5 16 44.5 20 44 24.5 C43.7 27 43.2 29 42.5 30.5 C37 33 31 33 25.5 30.5 C24.8 29 24.3 27 24 24.5 C23.5 20 24.5 16 26.5 13.5 Z" fill="url(#mgi_cropt)" stroke="#a8123c" stroke-width="1.7" stroke-linejoin="round"/><path d="M26.5 13.5 C24 15.5 22.5 18 22 21 M41.5 13.5 C44 15.5 45.5 18 46 21 M26 30 C31 32.4 37 32.4 42 30" stroke="#a8123c" stroke-width="1.2" opacity=".7"/></svg>`,
bodycon_dress:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="mgi_bodyco" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#ff9db0"/><stop offset="100%" stop-color="#c8154a"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/><path d="M26 24 C29 26 39 26 42 24" stroke="#cbbb9c" stroke-width=".6" fill="none"/><path d="M26.5 34 C29 35.6 39 35.6 41.5 34" stroke="#cbbb9c" stroke-width=".6" fill="none"/></g><path d="M27 13.5 L34 11 L41 13.5 C43 18 43.8 24 43.2 30 C43.8 36 44.2 44 43.8 52 C37.5 55 30.5 55 24.2 52 C23.8 44 24.2 36 24.8 30 C24.2 24 25 18 27 13.5 Z" fill="url(#mgi_bodyco)" stroke="#98103a" stroke-width="1.7" stroke-linejoin="round"/><path d="M25 30 C29 32 39 32 43 30 M24.5 50 C31 52.6 37 52.6 43.5 50" stroke="#98103a" stroke-width="1.1" opacity=".65"/></svg>`,
maxi_dress:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="mgi_maxid" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#e8a8d8"/><stop offset="100%" stop-color="#a8288a"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/><path d="M26 24 C29 26 39 26 42 24" stroke="#cbbb9c" stroke-width=".6" fill="none"/><path d="M26.5 34 C29 35.6 39 35.6 41.5 34" stroke="#cbbb9c" stroke-width=".6" fill="none"/></g><path d="M27.5 13.5 L34 11.5 L40.5 13.5 C42.5 17.5 43.3 23 42.8 28.5 L25.2 28.5 C24.7 23 25.5 17.5 27.5 13.5 Z" fill="url(#mgi_maxid)" stroke="#801e68" stroke-width="1.7" stroke-linejoin="round"/><path d="M25.2 28.5 L42.8 28.5 C45 38 47.5 50 49.5 61.5 C39.5 65.5 28.5 65.5 18.5 61.5 C20.5 50 23 38 25.2 28.5 Z" fill="url(#mgi_maxid)" fill-opacity=".82" stroke="#801e68" stroke-width="1.7" stroke-linejoin="round"/><path d="M21 56 C30 59.6 38 59.6 47 56 M23 46 C31 49 37 49 45 46" stroke="#801e68" stroke-width="1" opacity=".55"/></svg>`,
night_dress:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="mgi_night" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#c8b8f0"/><stop offset="100%" stop-color="#6a3ab8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/><path d="M26 24 C29 26 39 26 42 24" stroke="#cbbb9c" stroke-width=".6" fill="none"/><path d="M26.5 34 C29 35.6 39 35.6 41.5 34" stroke="#cbbb9c" stroke-width=".6" fill="none"/></g><path d="M27.5 15 C31 17.5 37 17.5 40.5 15 C42.5 22 44 32 45 44 C45.5 49 45.8 53.5 45.5 56.5 C38 59.5 30 59.5 22.5 56.5 C22.2 53.5 22.5 49 23 44 C24 32 25.5 22 27.5 15 Z" fill="url(#mgi_night)" stroke="#4c2890" stroke-width="1.7" stroke-linejoin="round"/><path d="M27.5 15 L28.5 8.5 M40.5 15 L39.5 8.5 M23 54 C26 52.6 29 54.4 32 53.2 C35 52 38 54 41 52.8 C43 52 44.7 52.8 45.4 53.4" stroke="#4c2890" stroke-width="1.1" opacity=".7"/></svg>`,
two_piece:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="mgi_twopi" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#ffb88a"/><stop offset="100%" stop-color="#e05818"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/><path d="M26 24 C29 26 39 26 42 24" stroke="#cbbb9c" stroke-width=".6" fill="none"/><path d="M26.5 34 C29 35.6 39 35.6 41.5 34" stroke="#cbbb9c" stroke-width=".6" fill="none"/></g><path d="M27 13.5 L34 11.5 L41 13.5 C42.8 16.5 43.5 20.5 43 24.5 C37.5 27 30.5 27 25 24.5 C24.5 20.5 25.2 16.5 27 13.5 Z" fill="url(#mgi_twopi)" stroke="#b04210" stroke-width="1.7" stroke-linejoin="round"/><path d="M25 35 L43 35 C44.5 41 46 48 47 54 C38.5 57.5 29.5 57.5 21 54 C22 48 23.5 41 25 35 Z" fill="url(#mgi_twopi)" fill-opacity=".82" stroke="#b04210" stroke-width="1.7" stroke-linejoin="round"/><path d="M25 35 C30 37 38 37 43 35" stroke="#b04210" stroke-width="1.1" opacity=".65"/></svg>`,
jumpsuit:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="mgi_jumpsu" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#8ab8d8"/><stop offset="100%" stop-color="#28588a"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/><path d="M26 24 C29 26 39 26 42 24" stroke="#cbbb9c" stroke-width=".6" fill="none"/><path d="M26.5 34 C29 35.6 39 35.6 41.5 34" stroke="#cbbb9c" stroke-width=".6" fill="none"/></g><path d="M27 13.5 L34 11.5 L41 13.5 C42.8 18 43.5 24 43 29.5 L44.5 35 C44.8 43 44.5 52 43.5 60 L37.5 60 L34.5 40 L33.5 40 L30.5 60 L24.5 60 C23.5 52 23.2 43 23.5 35 L25 29.5 C24.5 24 25.2 18 27 13.5 Z" fill="url(#mgi_jumpsu)" stroke="#1c4068" stroke-width="1.7" stroke-linejoin="round"/><path d="M25 29.5 C29 31.5 39 31.5 43 29.5 M34 14 L34 28" stroke="#1c4068" stroke-width="1.1" opacity=".65"/></svg>`,
skirt:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="mgi_skirt" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#a8d89a"/><stop offset="100%" stop-color="#3a8828"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/><path d="M26 24 C29 26 39 26 42 24" stroke="#cbbb9c" stroke-width=".6" fill="none"/><path d="M26.5 34 C29 35.6 39 35.6 41.5 34" stroke="#cbbb9c" stroke-width=".6" fill="none"/></g><path d="M25.5 34 C29 36 39 36 42.5 34 L44.5 40 C46.5 45.5 48.5 51 50 55.5 C39.5 59.5 28.5 59.5 18 55.5 C19.5 51 21.5 45.5 23.5 40 Z" fill="url(#mgi_skirt)" stroke="#2a641c" stroke-width="1.7" stroke-linejoin="round"/><path d="M25.5 37 C29.5 38.8 38.5 38.8 42.5 37 M26 42 L22 54 M34 39 L34 57 M42 42 L46 54" stroke="#2a641c" stroke-width="1" opacity=".6"/></svg>`,
shorts:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="mgi_shorts" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#88c8e8"/><stop offset="100%" stop-color="#1a6898"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/><path d="M26 24 C29 26 39 26 42 24" stroke="#cbbb9c" stroke-width=".6" fill="none"/><path d="M26.5 34 C29 35.6 39 35.6 41.5 34" stroke="#cbbb9c" stroke-width=".6" fill="none"/></g><path d="M25.5 34 C29 36 39 36 42.5 34 L43.5 40 C44 43.5 44 46.5 43.5 49 L37 49 L34.5 41 L33.5 41 L31 49 L24.5 49 C24 46.5 24 43.5 24.5 40 Z" fill="url(#mgi_shorts)" stroke="#134e74" stroke-width="1.7" stroke-linejoin="round"/><path d="M25.5 37 C29.5 38.8 38.5 38.8 42.5 37" stroke="#134e74" stroke-width="1.1" opacity=".7"/></svg>`,
lingerie:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="mgi_linger" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#f0b8d8"/><stop offset="100%" stop-color="#c02878"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/><path d="M26 24 C29 26 39 26 42 24" stroke="#cbbb9c" stroke-width=".6" fill="none"/><path d="M26.5 34 C29 35.6 39 35.6 41.5 34" stroke="#cbbb9c" stroke-width=".6" fill="none"/></g><path d="M26.5 17 L32.5 25 L26 27.5 C24 24.5 24 20 26.5 17 Z" fill="url(#mgi_linger)" stroke="#981e5c" stroke-width="1.5" stroke-linejoin="round"/><path d="M41.5 17 L35.5 25 L42 27.5 C44 24.5 44 20 41.5 17 Z" fill="url(#mgi_linger)" stroke="#981e5c" stroke-width="1.5" stroke-linejoin="round"/><path d="M26 38 C29.5 40 38.5 40 42 38 L41 43.5 C39 47.5 36 50 34 50.5 C32 50 29 47.5 27 43.5 Z" fill="url(#mgi_linger)" stroke="#981e5c" stroke-width="1.5" stroke-linejoin="round"/><path d="M26.5 17 L32 9.5 M41.5 17 L36 9.5 M26 27.5 L42 27.5" stroke="#981e5c" stroke-width="1.1" opacity=".7"/></svg>`,
costume:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="mgi_costum" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#ffd88a"/><stop offset="100%" stop-color="#d89018"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/><path d="M26 24 C29 26 39 26 42 24" stroke="#cbbb9c" stroke-width=".6" fill="none"/><path d="M26.5 34 C29 35.6 39 35.6 41.5 34" stroke="#cbbb9c" stroke-width=".6" fill="none"/></g><path d="M27.5 13.5 L34 11 L40.5 13.5 C42.5 18 43.2 24 42.8 29 L25.2 29 C24.8 24 25.5 18 27.5 13.5 Z" fill="url(#mgi_costum)" stroke="#a87010" stroke-width="1.7" stroke-linejoin="round"/><path d="M25.2 29 L42.8 29 C46.5 38.5 50.5 50 53.5 61 C41 66 27 66 14.5 61 C17.5 50 21.5 38.5 25.2 29 Z" fill="url(#mgi_costum)" fill-opacity=".8" stroke="#a87010" stroke-width="1.7" stroke-linejoin="round"/><path d="M17.5 55.5 C29 60 39 60 50.5 55.5 M21 46.5 C30 50 38 50 47 46.5 M34 30 L34 62" stroke="#a87010" stroke-width="1" opacity=".55"/></svg>`,
wrap_dress:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="mgi_wrapd" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#a8d8c8"/><stop offset="100%" stop-color="#188868"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/><path d="M26 24 C29 26 39 26 42 24" stroke="#cbbb9c" stroke-width=".6" fill="none"/><path d="M26.5 34 C29 35.6 39 35.6 41.5 34" stroke="#cbbb9c" stroke-width=".6" fill="none"/></g><path d="M27 13.5 L34 25 L41 13.5 C43.5 19 44.8 27.5 45.2 37 C45.6 44.5 45.6 50.5 45.2 54.5 C37.8 57.5 30.2 57.5 22.8 54.5 C22.4 50.5 22.4 44.5 22.8 37 C23.2 27.5 24.5 19 27 13.5 Z" fill="url(#mgi_wrapd)" stroke="#106850" stroke-width="1.7" stroke-linejoin="round"/><path d="M34 25 L23.5 43 M34 25 L44.5 43 M30 33.5 L27 36 M38 33.5 L41 36" stroke="#106850" stroke-width="1.1" opacity=".7"/></svg>`,
rash_guard:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="mgi_rashg" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#88c0e0"/><stop offset="100%" stop-color="#186098"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/><path d="M26 24 C29 26 39 26 42 24" stroke="#cbbb9c" stroke-width=".6" fill="none"/><path d="M26.5 34 C29 35.6 39 35.6 41.5 34" stroke="#cbbb9c" stroke-width=".6" fill="none"/></g><path d="M27 13.5 L34 11.5 L41 13.5 C44 15 46 18 47 22 C48 27 48.3 33 48 38.5 C47 40.5 45 41.2 44 40.2 C44.4 33 44 26 43 20.5 C43.8 30 43.9 40 43.4 47.5 C37.5 50 30.5 50 24.6 47.5 C24.1 40 24.2 30 25 20.5 C24 26 23.6 33 24 40.2 C23 41.2 21 40.5 20 38.5 C19.7 33 20 27 21 22 C22 18 24 15 27 13.5 Z" fill="url(#mgi_rashg)" stroke="#124a74" stroke-width="1.7" stroke-linejoin="round"/><path d="M27 13.5 C30 15.5 38 15.5 41 13.5 M34 16 L34 48" stroke="#124a74" stroke-width="1.1" opacity=".65"/></svg>`,
biker_shorts:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="mgi_biker" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#7898e0"/><stop offset="100%" stop-color="#1a3898"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/><path d="M26 24 C29 26 39 26 42 24" stroke="#cbbb9c" stroke-width=".6" fill="none"/><path d="M26.5 34 C29 35.6 39 35.6 41.5 34" stroke="#cbbb9c" stroke-width=".6" fill="none"/></g><path d="M25.5 34 C29 36 39 36 42.5 34 L43.5 41 C44 45.5 44 50 43.5 54 L37.5 54 L34.5 42 L33.5 42 L30.5 54 L24.5 54 C24 50 24 45.5 24.5 41 Z" fill="url(#mgi_biker)" stroke="#132a74" stroke-width="1.7" stroke-linejoin="round"/><path d="M25.5 37 C29.5 38.8 38.5 38.8 42.5 37 M25 52 L30.5 52 M37.5 52 L43 52" stroke="#132a74" stroke-width="1.1" opacity=".75"/></svg>`,
corset_top:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="mgi_corset" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#f0a8c8"/><stop offset="100%" stop-color="#c81858"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/><path d="M26 24 C29 26 39 26 42 24" stroke="#cbbb9c" stroke-width=".6" fill="none"/><path d="M26.5 34 C29 35.6 39 35.6 41.5 34" stroke="#cbbb9c" stroke-width=".6" fill="none"/></g><path d="M26.5 15.5 C29 12.5 31.5 14 34 17 C36.5 14 39 12.5 41.5 15.5 C43.3 20 43.8 26.5 43 32 C37.5 35 30.5 35 25 32 C24.2 26.5 24.7 20 26.5 15.5 Z" fill="url(#mgi_corset)" stroke="#981244" stroke-width="1.7" stroke-linejoin="round"/><path d="M29 17 L28.5 33 M34 18.5 L34 34 M39 17 L39.5 33 M30.5 21 L37.5 23 M30.5 25.5 L37.5 27.5" stroke="#981244" stroke-width="1" opacity=".7"/></svg>`,
tennis_dress:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="mgi_tennis" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#d8a8e8"/><stop offset="100%" stop-color="#8828b8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/><path d="M26 24 C29 26 39 26 42 24" stroke="#cbbb9c" stroke-width=".6" fill="none"/><path d="M26.5 34 C29 35.6 39 35.6 41.5 34" stroke="#cbbb9c" stroke-width=".6" fill="none"/></g><path d="M27 13.5 L34 11.5 L41 13.5 C42.8 17.5 43.5 22.5 43 27.5 L25 27.5 C24.5 22.5 25.2 17.5 27 13.5 Z" fill="url(#mgi_tennis)" stroke="#681e90" stroke-width="1.7" stroke-linejoin="round"/><path d="M25 27.5 L43 27.5 C44.5 33.5 46.5 39.5 48.5 45 C39 49 29 49 19.5 45 C21.5 39.5 23.5 33.5 25 27.5 Z" fill="url(#mgi_tennis)" fill-opacity=".82" stroke="#681e90" stroke-width="1.7" stroke-linejoin="round"/><path d="M24 32 L21 44 M29.5 29 L27.5 46.5 M34 28.5 L34 47.5 M38.5 29 L40.5 46.5 M44 32 L47 44" stroke="#681e90" stroke-width="1" opacity=".6"/></svg>`,
board_shorts:`<svg viewBox="0 0 68 68" fill="none"><defs><linearGradient id="mgi_board" x1="0" y1="0" x2=".4" y2="1"><stop offset="0%" stop-color="#78c0e8"/><stop offset="100%" stop-color="#0868a8"/></linearGradient></defs><g opacity="0.92"><ellipse cx="34" cy="63" rx="11" ry="2.2" fill="#cfc0a6"/><rect x="33.2" y="50" width="1.6" height="12" fill="#b8a586"/><circle cx="34" cy="6.5" r="2.4" fill="#c9b998" stroke="#a89372" stroke-width="1"/><rect x="33.4" y="8.5" width="1.2" height="4" fill="#b8a586"/><path d="M24 14 C22 20 21.5 26 25 33 C27 38 26 43 24.5 47 C28 50.5 40 50.5 43.5 47 C42 43 41 38 43 33 C46.5 26 46 20 44 14 C40 11.5 28 11.5 24 14 Z" fill="#e8ddc8" stroke="#b8a586" stroke-width="1.3"/><path d="M34 12.8 L34 49.5" stroke="#cbbb9c" stroke-width=".7"/><path d="M26 24 C29 26 39 26 42 24" stroke="#cbbb9c" stroke-width=".6" fill="none"/><path d="M26.5 34 C29 35.6 39 35.6 41.5 34" stroke="#cbbb9c" stroke-width=".6" fill="none"/></g><path d="M25 34 C29 36 39 36 43 34 L44.5 41 C45 45.5 45 49.5 44.5 52.5 L37.5 52.5 L34.5 42 L33.5 42 L30.5 52.5 L23.5 52.5 C23 49.5 23 45.5 23.5 41 Z" fill="url(#mgi_board)" stroke="#065080" stroke-width="1.7" stroke-linejoin="round"/><path d="M25 37 C29.5 38.8 38.5 38.8 43 37 M34 34.5 L34 39.5 L39 39.5 M25.5 42 L29.5 42 L29.5 47 L25.5 47 Z" stroke="#065080" stroke-width="1" opacity=".75"/></svg>`
};


function dSvg(paths,vb='0 0 56 70'){return `<svg viewBox="${vb}" fill="none">${paths}</svg>`;}

const DESIGNS={
bikini_top:{label:'Bikini Top',tip:'<strong>Underbust</strong> sets band size. <strong>Cup size</strong> shapes cup volume. Tie length determines coverage.',
  chips:['Underwire channel','Padding pocket','Removable pads','Tie back','Hook and eye','O-ring detail','Halter tie','Bandeau straps'],
  sku:'Synergy Nylon Lycra — 70 colors, 4-way stretch, chlorine-resistant',
  fields:[{id:'bust',l:'Bust',h:'Fullest part',req:1,def:34,mn:24,mx:60},{id:'ubust',l:'Underbust',h:'Below bust',req:1,def:28,mn:20,mx:52},{id:'cup',l:'Cup Size',sel:['AA','A','B','C','D','DD/E','F','G+'],req:1,def:'C'},{id:'torso',l:'Torso Front',h:'Shoulder to waist',req:1,def:15,mn:10,mx:24},{id:'bandLen',l:'Band Length',h:'Around ribcage',req:1,def:28,mn:20,mx:52},{id:'tieLen',l:'Tie Length',h:'Neck/back ties',req:0,def:18,mn:10,mx:30}],
  styles:[
    {id:'triangle',name:'Triangle',sub:'Classic ties',
     icon:dSvg('<defs><linearGradient id="tri_g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#c8e6ff"/><stop offset="100%" stop-color="#7ab8f5"/></linearGradient></defs><path d="M4 48 L18 14 L28 46 Z" fill="url(#tri_g)" stroke="#1255b0" stroke-width="1.8" stroke-linejoin="round"/><path d="M52 48 L38 14 L28 46 Z" fill="url(#tri_g)" stroke="#1255b0" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 44 L18 20 L26 42" stroke="white" stroke-width=".8" stroke-linecap="round" opacity=".6"/><path d="M48 44 L38 20 L30 42" stroke="white" stroke-width=".8" stroke-linecap="round" opacity=".6"/><circle cx="28" cy="47" r="2.8" fill="white" stroke="#1255b0" stroke-width="1.5"/><line x1="18" y1="14" x2="10" y2="6" stroke="#0c3d8f" stroke-width="1.8" stroke-linecap="round"/><line x1="18" y1="14" x2="6" y2="18" stroke="#0c3d8f" stroke-width="1.8" stroke-linecap="round"/><line x1="38" y1="14" x2="46" y2="6" stroke="#0c3d8f" stroke-width="1.8" stroke-linecap="round"/><line x1="38" y1="14" x2="50" y2="18" stroke="#0c3d8f" stroke-width="1.8" stroke-linecap="round"/>'),
     pieces:m=>[
      {id:'cl',n:'Cup Left',q:'Cut x1',w:m.bust/4+cx(m.cup)+.5,h:m.bust/5+cx(m.cup)+.5,s:'tri',t:['grain','notch'],c:'#1255b0'},
      {id:'cr',n:'Cup Right',q:'Cut x1 (mirror)',w:m.bust/4+cx(m.cup)+.5,h:m.bust/5+cx(m.cup)+.5,s:'tri',t:['grain','notch'],c:'#1255b0'},
      {id:'bf',n:'Band Front',q:'Cut x1 on fold',w:m.bandLen/2+1,h:2.5,s:'rarc',t:['fold','grain'],c:'#1769d4'},
      {id:'bb',n:'Band Back',q:'Cut x2',w:m.bandLen/4+2,h:2.5,s:'rect',t:['grain'],c:'#1769d4'},
      {id:'ti',n:'Neck Tie',q:'Cut x2',w:1.5,h:m.tieLen||18,s:'rect',t:['grain'],c:'#0c3d8f'}]},
    {id:'bandeau',name:'Bandeau',sub:'No straps',
     icon:dSvg('<defs><linearGradient id="ban_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#ddeeff"/><stop offset="100%" stop-color="#7ab8f5"/></linearGradient></defs><rect x="4" y="14" width="48" height="22" rx="6" fill="url(#ban_g)" stroke="#1255b0" stroke-width="1.8"/><path d="M4 20 C16 26 40 26 52 20" stroke="white" stroke-width="1.2" fill="none" opacity=".7"/><path d="M4 30 C16 34 40 34 52 30" stroke="#0c3d8f" stroke-width="1" fill="none" opacity=".4"/><line x1="28" y1="14" x2="28" y2="36" stroke="white" stroke-width=".8" opacity=".5"/><path d="M4 36 Q28 44 52 36" stroke="#0c3d8f" stroke-width="1.5" fill="none"/>'),
     pieces:m=>[
      {id:'fr',n:'Front Panel',q:'Cut x1 on fold',w:m.bust/2+1,h:m.bust/8+1,s:'rarc',t:['fold','grain','notch'],c:'#1255b0'},
      {id:'bk',n:'Back Panel',q:'Cut x1 on fold',w:m.bust/2+.5,h:m.bust/8+.5,s:'rect',t:['fold','grain'],c:'#1769d4'},
      {id:'und',n:'Underwire Channel',q:'Cut x2',w:m.bust/4,h:1.5,s:'rect',t:['grain'],c:'#93c4ff'}]},
    {id:'halter',name:'Halter',sub:'Neck tie',
     icon:dSvg('<defs><linearGradient id="hal_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#c8e6ff"/><stop offset="100%" stop-color="#5ba3e8"/></linearGradient></defs><path d="M6 48 L20 12 L28 16 L36 12 L50 48 Z" fill="url(#hal_g)" stroke="#1255b0" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 44 L20 18 L27 21" stroke="white" stroke-width=".9" stroke-linecap="round" opacity=".6"/><line x1="28" y1="16" x2="28" y2="4" stroke="#0c3d8f" stroke-width="2.2" stroke-linecap="round"/><line x1="28" y1="4" x2="22" y2="1" stroke="#0c3d8f" stroke-width="1.6" stroke-linecap="round"/><line x1="28" y1="4" x2="34" y2="1" stroke="#0c3d8f" stroke-width="1.6" stroke-linecap="round"/><path d="M6 46 Q28 52 50 46" stroke="#0c3d8f" stroke-width="1.5" fill="none"/>'),
     pieces:m=>[
      {id:'cl',n:'Cup Left',q:'Cut x1',w:m.bust/4+cx(m.cup)+.5,h:m.bust/5+cx(m.cup)+.5,s:'tri',t:['grain','notch'],c:'#1255b0'},
      {id:'cr',n:'Cup Right',q:'Cut x1 (mirror)',w:m.bust/4+cx(m.cup)+.5,h:m.bust/5+cx(m.cup)+.5,s:'tri',t:['grain','notch'],c:'#1255b0'},
      {id:'hnt',n:'Halter Neck Tie',q:'Cut x1',w:2,h:22,s:'rect',t:['grain'],c:'#0c3d8f'},
      {id:'bf',n:'Band',q:'Cut x1',w:m.bandLen+1,h:3,s:'rect',t:['grain'],c:'#1769d4'}]},
    {id:'underwire',name:'Underwire',sub:'Molded cup',
     icon:dSvg('<defs><linearGradient id="uw_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#ddeeff"/><stop offset="100%" stop-color="#6daee0"/></linearGradient></defs><path d="M4 34 C4 20 12 10 28 10 C44 10 52 20 52 34 Z" fill="url(#uw_g)" stroke="#1255b0" stroke-width="1.8"/><path d="M4 34 Q28 28 52 34" stroke="#0c3d8f" stroke-width="2.5" stroke-linecap="round" fill="none"/><rect x="4" y="34" width="48" height="10" rx="4" fill="url(#uw_g)" stroke="#1255b0" stroke-width="1.5"/><path d="M8 28 C12 20 20 14 28 12" stroke="white" stroke-width="1.2" opacity=".6" fill="none" stroke-linecap="round"/><line x1="28" y1="10" x2="28" y2="34" stroke="#1255b0" stroke-width=".9" stroke-dasharray="2 2"/>'),
     pieces:m=>[
      {id:'cl',n:'Cup Left',q:'Cut x1',w:m.bust/4+cx(m.cup)+1,h:m.bust/5+cx(m.cup)+1,s:'cup_round',t:['grain','notch'],c:'#1255b0'},
      {id:'cr',n:'Cup Right',q:'Cut x1 (mirror)',w:m.bust/4+cx(m.cup)+1,h:m.bust/5+cx(m.cup)+1,s:'cup_round',t:['grain','notch'],c:'#1255b0'},
      {id:'cl2',n:'Cup Lining L',q:'Cut x1',w:m.bust/4+cx(m.cup)+1,h:m.bust/5+cx(m.cup)+1,s:'cup_round',t:['grain'],c:'#93c4ff'},
      {id:'cr2',n:'Cup Lining R',q:'Cut x1',w:m.bust/4+cx(m.cup)+1,h:m.bust/5+cx(m.cup)+1,s:'cup_round',t:['grain'],c:'#93c4ff'},
      {id:'bf',n:'Band Front',q:'Cut x1 on fold',w:m.bandLen/2+1,h:3,s:'rarc',t:['fold','grain'],c:'#1769d4'},
      {id:'bb',n:'Band Back',q:'Cut x2',w:m.bandLen/4+2,h:3,s:'rect',t:['grain'],c:'#1769d4'},
      {id:'uw',n:'Underwire Channel',q:'Cut x2',w:m.bust/4+cx(m.cup),h:1,s:'rarc',t:['grain'],c:'#0c3d8f'}]},
    {id:'longline',name:'Longline',sub:'Extended band',
     icon:dSvg('<defs><linearGradient id="ll_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#c8e6ff"/><stop offset="100%" stop-color="#5ba3e8"/></linearGradient></defs><path d="M6 28 C6 16 14 8 28 8 C42 8 50 16 50 28 Z" fill="url(#ll_g)" stroke="#1255b0" stroke-width="1.8"/><path d="M6 28 Q28 22 50 28" stroke="#0c3d8f" stroke-width="2" fill="none"/><rect x="6" y="28" width="44" height="20" rx="4" fill="url(#ll_g)" stroke="#1255b0" stroke-width="1.8"/><path d="M6 36 Q28 40 50 36" stroke="#1255b0" stroke-width="1" stroke-dasharray="3 2" fill="none"/><path d="M10 24 C14 16 20 10 28 9" stroke="white" stroke-width="1.2" opacity=".6" fill="none" stroke-linecap="round"/>'),
     pieces:m=>[
      {id:'cl',n:'Cup Left',q:'Cut x1',w:m.bust/4+cx(m.cup)+.5,h:m.bust/5+cx(m.cup)+.5,s:'cup_round',t:['grain','notch'],c:'#1255b0'},
      {id:'cr',n:'Cup Right',q:'Cut x1 (mirror)',w:m.bust/4+cx(m.cup)+.5,h:m.bust/5+cx(m.cup)+.5,s:'cup_round',t:['grain','notch'],c:'#1255b0'},
      {id:'bf',n:'Front Band',q:'Cut x1 on fold',w:m.bandLen/2+1,h:5.5,s:'rarc',t:['fold','grain'],c:'#1769d4'},
      {id:'bb',n:'Back Band',q:'Cut x2',w:m.bandLen/4+2,h:5.5,s:'rect',t:['grain'],c:'#1769d4'},
      {id:'st',n:'Strap',q:'Cut x2',w:1.25,h:10,s:'rect',t:['grain'],c:'#0c3d8f'}]}
  ]},

bikini_bottom:{label:'Bikini Bottom',tip:'<strong>Crotch length</strong> total front-to-back is the most critical measurement.',
  chips:['Side ties','Ruched back','Scrunch','High waist','Brazilian','Full coverage','O-ring sides'],
  sku:'Synergy Nylon Lycra — 70 colors, chlorine-resistant',
  fields:[{id:'hips',l:'Hips',h:'Fullest part',req:1,def:38,mn:28,mx:66},{id:'waist',l:'Waist',h:'Natural waist',req:1,def:28,mn:20,mx:52},{id:'rise',l:'Rise',h:'Waist to crotch front',req:1,def:10,mn:6,mx:16},{id:'crotch',l:'Crotch Length',h:'Total girth through legs',req:1,def:24,mn:16,mx:36},{id:'legOpen',l:'Leg Opening',h:'Around upper thigh',req:1,def:20,mn:14,mx:32}],
  styles:[
    {id:'brief',name:'Brief',sub:'Classic cut',
     icon:dSvg('<defs><linearGradient id="bri_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#c8e6ff"/><stop offset="100%" stop-color="#5ba3e8"/></linearGradient></defs><path d="M6 22 C6 22 14 15 28 15 C42 15 50 22 50 22 L47 38 C47 46 38 54 28 54 C18 54 9 46 9 38 Z" fill="url(#bri_g)" stroke="#1255b0" stroke-width="2" stroke-linejoin="round"/><path d="M6 22 Q28 30 50 22" stroke="white" stroke-width="1.2" opacity=".6" fill="none"/><line x1="28" y1="30" x2="28" y2="54" stroke="#1255b0" stroke-width=".9" stroke-dasharray="3 2" opacity=".5"/><path d="M10 36 C9 43 12 50 18 53" stroke="#1255b0" stroke-width="1.2" fill="none" opacity=".4"/><path d="M46 36 C47 43 44 50 38 53" stroke="#1255b0" stroke-width="1.2" fill="none" opacity=".4"/>'),
     pieces:m=>[
      {id:'fr',n:'Front',q:'Cut x1 on fold',w:m.hips/4+1,h:m.rise+1,s:'brif',t:['fold','grain','notch'],c:'#1255b0'},
      {id:'bk',n:'Back',q:'Cut x1 on fold',w:m.hips/4+1.5,h:m.rise*1.15,s:'brib',t:['fold','grain','notch'],c:'#1769d4'},
      {id:'gu',n:'Gusset',q:'Cut x2',w:3,h:m.crotch/3,s:'rect',t:['grain'],c:'#93c4ff'}]},
    {id:'highwaist',name:'High Waist',sub:'Vintage style',
     icon:dSvg('<defs><linearGradient id="hw_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#c8e6ff"/><stop offset="100%" stop-color="#5ba3e8"/></linearGradient></defs><path d="M6 14 C6 14 14 8 28 8 C42 8 50 14 50 14 L48 38 C48 48 38 56 28 56 C18 56 8 48 8 38 Z" fill="url(#hw_g)" stroke="#1255b0" stroke-width="2"/><path d="M6 14 Q28 22 50 14" stroke="white" stroke-width="1.2" opacity=".6" fill="none"/><path d="M6 24 Q28 32 50 24" stroke="#1255b0" stroke-width="1.2" fill="none" stroke-dasharray="4 2" opacity=".5"/><line x1="28" y1="22" x2="28" y2="56" stroke="#1255b0" stroke-width=".9" stroke-dasharray="3 2" opacity=".4"/>'),
     pieces:m=>[
      {id:'fr',n:'Front (High)',q:'Cut x1 on fold',w:m.hips/4+.5,h:m.rise+3,s:'brif',t:['fold','grain','notch'],c:'#1255b0'},
      {id:'bk',n:'Back (High)',q:'Cut x1 on fold',w:m.hips/4+1,h:m.rise*1.2+2,s:'brib',t:['fold','grain','notch'],c:'#1769d4'},
      {id:'gu',n:'Gusset',q:'Cut x2',w:3,h:m.crotch/3,s:'rect',t:['grain'],c:'#93c4ff'}]},
    {id:'tiestring',name:'Tie Side',sub:'String ties',
     icon:dSvg('<defs><linearGradient id="ts_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#c8e6ff"/><stop offset="100%" stop-color="#6daee0"/></linearGradient></defs><path d="M12 24 C12 24 18 17 28 17 C38 17 44 24 44 24 L42 40 C42 50 34 56 28 56 C22 56 14 50 14 40 Z" fill="url(#ts_g)" stroke="#1255b0" stroke-width="2"/><path d="M12 24 Q28 32 44 24" stroke="white" stroke-width="1.2" opacity=".6" fill="none"/><line x1="12" y1="24" x2="3" y2="14" stroke="#0c3d8f" stroke-width="2.2" stroke-linecap="round"/><line x1="12" y1="30" x2="2" y2="30" stroke="#0c3d8f" stroke-width="2.2" stroke-linecap="round"/><line x1="44" y1="24" x2="53" y2="14" stroke="#0c3d8f" stroke-width="2.2" stroke-linecap="round"/><line x1="44" y1="30" x2="54" y2="30" stroke="#0c3d8f" stroke-width="2.2" stroke-linecap="round"/>'),
     pieces:m=>[
      {id:'fr',n:'Front',q:'Cut x1 on fold',w:m.hips/4+.5,h:m.rise+.5,s:'brif',t:['fold','grain','notch'],c:'#1255b0'},
      {id:'bk',n:'Back',q:'Cut x1 on fold',w:m.hips/4+1,h:m.rise*1.1,s:'brib',t:['fold','grain','notch'],c:'#1769d4'},
      {id:'gu',n:'Gusset',q:'Cut x2',w:3,h:m.crotch/3,s:'rect',t:['grain'],c:'#93c4ff'},
      {id:'ti',n:'Side Tie',q:'Cut x4',w:1.25,h:16,s:'rect',t:['grain'],c:'#0c3d8f'}]},
    {id:'brazilian',name:'Brazilian',sub:'Cheeky cut',
     icon:dSvg('<defs><linearGradient id="braz_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#c8e6ff"/><stop offset="100%" stop-color="#6daee0"/></linearGradient></defs><path d="M6 20 C6 20 14 12 28 12 C42 12 50 20 50 20 L46 36 C44 40 36 48 28 48 C20 48 12 40 10 36 Z" fill="url(#braz_g)" stroke="#1255b0" stroke-width="2"/><path d="M6 20 Q28 28 50 20" stroke="white" stroke-width="1.2" opacity=".6" fill="none"/><path d="M10 38 C12 34 16 38 20 36" stroke="#0c3d8f" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M46 38 C44 34 40 38 36 36" stroke="#0c3d8f" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M20 36 Q28 46 36 36" stroke="#0c3d8f" stroke-width="1.4" fill="none"/>'),
     pieces:m=>[
      {id:'fr',n:'Front',q:'Cut x1 on fold',w:m.hips/4+.5,h:m.rise,s:'brif',t:['fold','grain','notch'],c:'#1255b0'},
      {id:'bk',n:'Back (Brazilian)',q:'Cut x1 on fold',w:m.hips/4+.5,h:m.rise*.7,s:'braz',t:['fold','grain','notch'],c:'#1769d4'},
      {id:'gu',n:'Gusset',q:'Cut x2',w:2.5,h:m.crotch/3,s:'rect',t:['grain'],c:'#93c4ff'}]}
  ]},

one_piece:{label:'One-Piece Swimsuit',tip:'<strong>Torso girth</strong> shoulder&#8209;to&#8209;crotch&#8209;to&#8209;shoulder is THE critical measurement.',
  chips:['Scoop neck','V-neck','High neck','Underwire','Tummy lining','Racerback','Ruching','Open back'],
  sku:'Matte Nylon Spandex Classic — opacity and shape retention',
  fields:[{id:'bust',l:'Bust',h:'Fullest part',req:1,def:34,mn:24,mx:60},{id:'waist',l:'Waist',h:'Natural waist',req:1,def:28,mn:20,mx:52},{id:'hips',l:'Hips',h:'Fullest',req:1,def:38,mn:28,mx:66},{id:'torsoG',l:'Torso Girth *',h:'Shoulder to crotch to shoulder back',req:1,def:58,mn:46,mx:76},{id:'torsoF',l:'Torso Front',h:'Shoulder to crotch front only',req:1,def:29,mn:22,mx:38},{id:'cup',l:'Cup Size',sel:['AA','A','B','C','D','DD/E','F','G+'],req:1,def:'C'}],
  styles:[
    {id:'scoop',name:'Scoop Neck',sub:'Classic cut',
     icon:dSvg('<defs><linearGradient id="sc_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#b3d9ff"/><stop offset="60%" stop-color="#5ba3e8"/><stop offset="100%" stop-color="#1255b0"/></linearGradient></defs><path d="M20 8 L18 16 L10 21 L13 30 L11 42 C11 52 18 58 28 60 C38 58 45 52 45 42 L43 30 L46 21 L38 16 L36 8 Z" fill="url(#sc_g)" stroke="#1255b0" stroke-width="2" stroke-linejoin="round"/><path d="M20 8 C23 14 33 14 36 8" stroke="#0c3d8f" stroke-width="2.2" fill="none" stroke-linecap="round"/><line x1="20" y1="8" x2="18" y2="4" stroke="#0c3d8f" stroke-width="2" stroke-linecap="round"/><line x1="36" y1="8" x2="38" y2="4" stroke="#0c3d8f" stroke-width="2" stroke-linecap="round"/><path d="M11 31 Q28 26 45 31" stroke="white" stroke-width="1" opacity=".45" fill="none"/>'),
     pieces:m=>[
      {id:'fb',n:'Front Body',q:'Cut x1 on fold',w:m.hips/4+1,h:m.torsoF+1,s:'suf',t:['fold','grain','notch'],c:'#1255b0'},
      {id:'bk',n:'Back Body',q:'Cut x1 on fold',w:m.hips/4+1.5,h:(m.torsoG-m.torsoF)+1.5,s:'sub',t:['fold','grain','notch'],c:'#1769d4'},
      {id:'st',n:'Strap',q:'Cut x2',w:1.25,h:12,s:'rect',t:['grain'],c:'#0c3d8f'},
      {id:'gu',n:'Crotch Lining',q:'Cut x2',w:3.5,h:5,s:'rect',t:['grain'],c:'#b3d4ff'}]},
    {id:'vneck',name:'V-Neck',sub:'Deep V front',
     icon:dSvg('<defs><linearGradient id="vn_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#b3d9ff"/><stop offset="100%" stop-color="#1255b0"/></linearGradient></defs><path d="M20 8 L18 16 L10 21 L13 30 L11 42 C11 52 18 58 28 60 C38 58 45 52 45 42 L43 30 L46 21 L38 16 L36 8 Z" fill="url(#vn_g)" stroke="#1255b0" stroke-width="2" stroke-linejoin="round"/><path d="M20 8 L28 22 L36 8" stroke="#0c3d8f" stroke-width="2.5" fill="none" stroke-linejoin="round"/><line x1="20" y1="8" x2="18" y2="4" stroke="#0c3d8f" stroke-width="2" stroke-linecap="round"/><line x1="36" y1="8" x2="38" y2="4" stroke="#0c3d8f" stroke-width="2" stroke-linecap="round"/><path d="M11 31 Q28 26 45 31" stroke="white" stroke-width="1" opacity=".4" fill="none"/>'),
     pieces:m=>[
      {id:'fl',n:'Front Left',q:'Cut x1',w:m.hips/4+.5,h:m.torsoF+1,s:'suf',t:['grain','notch'],c:'#1255b0'},
      {id:'fr',n:'Front Right',q:'Cut x1 (mirror)',w:m.hips/4+.5,h:m.torsoF+1,s:'suf',t:['grain','notch'],c:'#1255b0'},
      {id:'bk',n:'Back Body',q:'Cut x1 on fold',w:m.hips/4+1.5,h:(m.torsoG-m.torsoF)+1.5,s:'sub',t:['fold','grain','notch'],c:'#1769d4'},
      {id:'st',n:'Strap',q:'Cut x2',w:1.25,h:12,s:'rect',t:['grain'],c:'#0c3d8f'},
      {id:'gu',n:'Crotch Lining',q:'Cut x2',w:3.5,h:5,s:'rect',t:['grain'],c:'#b3d4ff'}]},
    {id:'racerback',name:'Racerback',sub:'Athletic back',
     icon:dSvg('<defs><linearGradient id="rb_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#c8e6ff"/><stop offset="100%" stop-color="#1255b0"/></linearGradient></defs><path d="M20 8 L18 16 L10 21 L13 30 L11 42 C11 52 18 58 28 60 C38 58 45 52 45 42 L43 30 L46 21 L38 16 L36 8 Z" fill="url(#rb_g)" stroke="#1255b0" stroke-width="2"/><path d="M20 8 L22 14 L28 9 L34 14 L36 8" stroke="#0c3d8f" stroke-width="2.5" fill="none" stroke-linejoin="round"/><path d="M22 14 C20 16 18 18 18 22" stroke="#0c3d8f" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M34 14 C36 16 38 18 38 22" stroke="#0c3d8f" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M11 31 Q28 26 45 31" stroke="white" stroke-width="1" opacity=".4" fill="none"/>'),
     pieces:m=>[
      {id:'fb',n:'Front Body',q:'Cut x1 on fold',w:m.hips/4+1,h:m.torsoF+1,s:'suf',t:['fold','grain','notch'],c:'#1255b0'},
      {id:'rb',n:'Racerback Panel',q:'Cut x1 on fold',w:m.hips/4+1.5,h:(m.torsoG-m.torsoF)+2,s:'racerb',t:['fold','grain','notch'],c:'#1769d4'},
      {id:'gu',n:'Crotch Lining',q:'Cut x2',w:3.5,h:5,s:'rect',t:['grain'],c:'#b3d4ff'}]},
    {id:'cutout',name:'Cut-Out',sub:'Side panels',
     icon:dSvg('<defs><linearGradient id="co_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#c8e6ff"/><stop offset="100%" stop-color="#1255b0"/></linearGradient></defs><path d="M20 8 L18 16 L10 21 L13 30 L11 42 C11 52 18 58 28 60 C38 58 45 52 45 42 L43 30 L46 21 L38 16 L36 8 Z" fill="url(#co_g)" stroke="#1255b0" stroke-width="2"/><path d="M20 8 C23 14 33 14 36 8" stroke="#0c3d8f" stroke-width="2.2" fill="none"/><line x1="20" y1="8" x2="18" y2="4" stroke="#0c3d8f" stroke-width="2" stroke-linecap="round"/><line x1="36" y1="8" x2="38" y2="4" stroke="#0c3d8f" stroke-width="2" stroke-linecap="round"/><ellipse cx="12" cy="32" rx="5" ry="7" fill="white" stroke="#1255b0" stroke-width="1.8"/><ellipse cx="44" cy="32" rx="5" ry="7" fill="white" stroke="#1255b0" stroke-width="1.8"/>'),
     pieces:m=>[
      {id:'fb',n:'Front Body',q:'Cut x1 on fold',w:m.hips/4+1,h:m.torsoF+1,s:'suf',t:['fold','grain','notch'],c:'#1255b0'},
      {id:'bk',n:'Back Body',q:'Cut x1 on fold',w:m.hips/4+1.5,h:(m.torsoG-m.torsoF)+1.5,s:'sub',t:['fold','grain','notch'],c:'#1769d4'},
      {id:'sp',n:'Side Panel',q:'Cut x2',w:4,h:10,s:'oval',t:['grain'],c:'#b3d4ff'},
      {id:'st',n:'Strap',q:'Cut x2',w:1.25,h:12,s:'rect',t:['grain'],c:'#0c3d8f'},
      {id:'gu',n:'Crotch Lining',q:'Cut x2',w:3.5,h:5,s:'rect',t:['grain'],c:'#b3d4ff'}]}
  ]},

leggings:{label:'Leggings',tip:'<strong>Thigh, knee and calf</strong> shape the silhouette. Use 0&#8209;5% negative ease for compression.',
  chips:['High waistband','Side pocket','Phone pocket','Wide waist','Fold-over waist','Compression panel','Mesh insert'],
  sku:'Core Recycled Nylon Spandex — eco-certified 4-way stretch',
  fields:[{id:'waist',l:'Waist',h:'Natural waist',req:1,def:28,mn:20,mx:52},{id:'hips',l:'Hips',h:'Fullest part',req:1,def:38,mn:28,mx:66},{id:'thigh',l:'Thigh',h:'Upper thigh fullest',req:1,def:24,mn:16,mx:38},{id:'knee',l:'Knee',h:'Around knee',req:1,def:15,mn:10,mx:24},{id:'calf',l:'Calf',h:'Fullest part',req:1,def:14,mn:10,mx:22},{id:'inseam',l:'Inseam',h:'Crotch to ankle',req:1,def:28,mn:18,mx:38},{id:'rise',l:'Rise',h:'Waist to crotch front',req:1,def:10,mn:7,mx:16}],
  styles:[
    {id:'fulllen',name:'Full Length',sub:'Ankle',
     icon:dSvg('<defs><linearGradient id="fll_g" x1="0" y1="0" x2=".3" y2="1"><stop offset="0%" stop-color="#455a64"/><stop offset="100%" stop-color="#1a237e"/></linearGradient></defs><rect x="10" y="4" width="36" height="14" rx="6" fill="#1a237e" stroke="#0c3d8f" stroke-width="1.8"/><path d="M10 18 L8 54 L20 54 L28 34" fill="url(#fll_g)" stroke="#1a237e" stroke-width="1.8" stroke-linejoin="round"/><path d="M46 18 L48 54 L36 54 L28 34" fill="url(#fll_g)" stroke="#283593" stroke-width="1.8" stroke-linejoin="round"/><path d="M10 18 L8 54" stroke="white" stroke-width="1" opacity=".2" stroke-linecap="round"/><path d="M46 18 L48 54" stroke="white" stroke-width="1" opacity=".2" stroke-linecap="round"/><line x1="8" y1="52" x2="20" y2="52" stroke="#1565c0" stroke-width="2.2"/><line x1="36" y1="52" x2="48" y2="52" stroke="#1565c0" stroke-width="2.2"/>'),
     pieces:m=>[
      {id:'fll',n:'Front Leg L',q:'Cut x1',w:m.hips/4+.75,h:m.inseam+m.rise+1.5,s:'lgf',t:['grain','notch'],c:'#1255b0'},
      {id:'flr',n:'Front Leg R',q:'Cut x1 (mirror)',w:m.hips/4+.75,h:m.inseam+m.rise+1.5,s:'lgf',t:['grain','notch'],c:'#1255b0'},
      {id:'bll',n:'Back Leg L',q:'Cut x1',w:m.hips/4+1.25,h:m.inseam+m.rise+2,s:'lgb',t:['grain','notch'],c:'#1769d4'},
      {id:'blr',n:'Back Leg R',q:'Cut x1 (mirror)',w:m.hips/4+1.25,h:m.inseam+m.rise+2,s:'lgb',t:['grain','notch'],c:'#1769d4'},
      {id:'wb',n:'Waistband',q:'Cut x1',w:m.waist+2,h:3.5,s:'rect',t:['fold','grain'],c:'#0c3d8f'}]},
    {id:'seveneighths',name:'7/8 Length',sub:'Below calf',
     icon:dSvg('<defs><linearGradient id="se_g" x1="0" y1="0" x2=".3" y2="1"><stop offset="0%" stop-color="#455a64"/><stop offset="100%" stop-color="#1a237e"/></linearGradient></defs><rect x="10" y="4" width="36" height="14" rx="6" fill="#1a237e" stroke="#0c3d8f" stroke-width="1.8"/><path d="M10 18 L8 48 L20 48 L28 30" fill="url(#se_g)" stroke="#1a237e" stroke-width="1.8" stroke-linejoin="round"/><path d="M46 18 L48 48 L36 48 L28 30" fill="url(#se_g)" stroke="#283593" stroke-width="1.8" stroke-linejoin="round"/><line x1="8" y1="46" x2="20" y2="46" stroke="#1565c0" stroke-width="2.2"/><line x1="36" y1="46" x2="48" y2="46" stroke="#1565c0" stroke-width="2.2"/><path d="M10 18 L8 48" stroke="white" stroke-width="1" opacity=".2" stroke-linecap="round"/>'),
     pieces:m=>[
      {id:'fll',n:'Front Leg L',q:'Cut x1',w:m.hips/4+.75,h:(m.inseam*.88)+m.rise+1.5,s:'lgf',t:['grain','notch'],c:'#1255b0'},
      {id:'flr',n:'Front Leg R',q:'Cut x1 (mirror)',w:m.hips/4+.75,h:(m.inseam*.88)+m.rise+1.5,s:'lgf',t:['grain','notch'],c:'#1255b0'},
      {id:'bll',n:'Back Leg L',q:'Cut x1',w:m.hips/4+1.25,h:(m.inseam*.88)+m.rise+2,s:'lgb',t:['grain','notch'],c:'#1769d4'},
      {id:'blr',n:'Back Leg R',q:'Cut x1 (mirror)',w:m.hips/4+1.25,h:(m.inseam*.88)+m.rise+2,s:'lgb',t:['grain','notch'],c:'#1769d4'},
      {id:'wb',n:'Waistband',q:'Cut x1',w:m.waist+2,h:3.5,s:'rect',t:['fold','grain'],c:'#0c3d8f'}]},
    {id:'capri',name:'Capri',sub:'Mid-calf',
     icon:dSvg('<defs><linearGradient id="cap_g" x1="0" y1="0" x2=".3" y2="1"><stop offset="0%" stop-color="#455a64"/><stop offset="100%" stop-color="#1a237e"/></linearGradient></defs><rect x="10" y="4" width="36" height="14" rx="6" fill="#1a237e" stroke="#0c3d8f" stroke-width="1.8"/><path d="M10 18 L9 38 L20 38 L28 26" fill="url(#cap_g)" stroke="#1a237e" stroke-width="1.8" stroke-linejoin="round"/><path d="M46 18 L47 38 L36 38 L28 26" fill="url(#cap_g)" stroke="#283593" stroke-width="1.8" stroke-linejoin="round"/><line x1="9" y1="36" x2="20" y2="36" stroke="#1565c0" stroke-width="2.2"/><line x1="36" y1="36" x2="47" y2="36" stroke="#1565c0" stroke-width="2.2"/>'),
     pieces:m=>[
      {id:'fll',n:'Front Leg L',q:'Cut x1',w:m.hips/4+.75,h:(m.inseam*.62)+m.rise+1.5,s:'lgf',t:['grain','notch'],c:'#1255b0'},
      {id:'flr',n:'Front Leg R',q:'Cut x1 (mirror)',w:m.hips/4+.75,h:(m.inseam*.62)+m.rise+1.5,s:'lgf',t:['grain','notch'],c:'#1255b0'},
      {id:'bll',n:'Back Leg L',q:'Cut x1',w:m.hips/4+1.25,h:(m.inseam*.62)+m.rise+2,s:'lgb',t:['grain','notch'],c:'#1769d4'},
      {id:'blr',n:'Back Leg R',q:'Cut x1 (mirror)',w:m.hips/4+1.25,h:(m.inseam*.62)+m.rise+2,s:'lgb',t:['grain','notch'],c:'#1769d4'},
      {id:'wb',n:'Waistband',q:'Cut x1',w:m.waist+2,h:3.5,s:'rect',t:['fold','grain'],c:'#0c3d8f'}]},
    {id:'highwaistrep',name:'High Waist',sub:'Wide band',
     icon:dSvg('<defs><linearGradient id="hwr_g" x1="0" y1="0" x2=".3" y2="1"><stop offset="0%" stop-color="#3949ab"/><stop offset="100%" stop-color="#1a237e"/></linearGradient></defs><rect x="10" y="2" width="36" height="18" rx="6" fill="#1a237e" stroke="#0c3d8f" stroke-width="2.2"/><path d="M10 20 L8 54 L20 54 L28 36" fill="url(#hwr_g)" stroke="#1a237e" stroke-width="1.8" stroke-linejoin="round"/><path d="M46 20 L48 54 L36 54 L28 36" fill="url(#hwr_g)" stroke="#283593" stroke-width="1.8" stroke-linejoin="round"/><path d="M10 10 Q28 14 46 10" stroke="white" stroke-width="1" opacity=".3" fill="none"/><line x1="8" y1="52" x2="20" y2="52" stroke="#1565c0" stroke-width="2.2"/><line x1="36" y1="52" x2="48" y2="52" stroke="#1565c0" stroke-width="2.2"/>'),
     pieces:m=>[
      {id:'fll',n:'Front Leg L',q:'Cut x1',w:m.hips/4+.75,h:m.inseam+m.rise+1.5,s:'lgf',t:['grain','notch'],c:'#1255b0'},
      {id:'flr',n:'Front Leg R',q:'Cut x1 (mirror)',w:m.hips/4+.75,h:m.inseam+m.rise+1.5,s:'lgf',t:['grain','notch'],c:'#1255b0'},
      {id:'bll',n:'Back Leg L',q:'Cut x1',w:m.hips/4+1.25,h:m.inseam+m.rise+2,s:'lgb',t:['grain','notch'],c:'#1769d4'},
      {id:'blr',n:'Back Leg R',q:'Cut x1 (mirror)',w:m.hips/4+1.25,h:m.inseam+m.rise+2,s:'lgb',t:['grain','notch'],c:'#1769d4'},
      {id:'wb',n:'High Waistband',q:'Cut x1',w:m.waist+2,h:6,s:'rect',t:['fold','grain'],c:'#0c3d8f'}]}
  ]},

sports_bra:{label:'Sports Bra',tip:'<strong>Underbust</strong> and <strong>impact level</strong> determine structure and support required.',
  chips:['Removable padding','Sewn-in padding','Underwire','Racerback','Cross-back','Mesh panel','Longline','Front zip'],
  sku:'Matte Nylon Spandex Classic Collection',
  fields:[{id:'bust',l:'Bust',h:'Fullest part',req:1,def:34,mn:24,mx:60},{id:'ubust',l:'Underbust',h:'Below bust',req:1,def:28,mn:20,mx:52},{id:'cup',l:'Cup Size',sel:['AA','A','B','C','D','DD/E','F'],req:1,def:'C'},{id:'bandLen',l:'Band Circumf.',h:'Around ribcage',req:1,def:28,mn:20,mx:52},{id:'strapL',l:'Strap Length',h:'Shoulder to band',req:1,def:11,mn:7,mx:16},{id:'impact',l:'Impact Level',sel:['Low (yoga)','Medium (cycling)','High (running/HIIT)'],req:1,def:'Medium (cycling)'}],
  styles:[
    {id:'scoopbra',name:'Scoop Neck',sub:'Versatile',
     icon:dSvg('<defs><linearGradient id="sbr_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#e3f2fd"/><stop offset="100%" stop-color="#42a5f5"/></linearGradient></defs><path d="M6 32 C6 20 12 12 20 10 L24 10 C26 16 30 16 32 10 L36 10 C44 12 50 20 50 32 L50 44 C50 48 40 52 28 52 C16 52 6 48 6 44 Z" fill="url(#sbr_g)" stroke="#1255b0" stroke-width="1.8" stroke-linejoin="round"/><path d="M6 32 Q28 26 50 32" stroke="white" stroke-width="1" opacity=".5" fill="none"/><line x1="22" y1="10" x2="20" y2="4" stroke="#0c3d8f" stroke-width="2" stroke-linecap="round"/><line x1="34" y1="10" x2="36" y2="4" stroke="#0c3d8f" stroke-width="2" stroke-linecap="round"/><path d="M10 26 C12 18 16 12 22 10" stroke="white" stroke-width="1.2" opacity=".5" fill="none" stroke-linecap="round"/>'),
     pieces:m=>[
      {id:'cf',n:'Cup Front',q:'Cut x2',w:m.bust/4+cx(m.cup)+.5,h:m.bust/6+cx(m.cup),s:'cup_round',t:['grain','notch'],c:'#1255b0'},
      {id:'bf',n:'Band Front',q:'Cut x1 on fold',w:m.bandLen/2+.5,h:4,s:'rarc',t:['fold','grain'],c:'#1769d4'},
      {id:'bb',n:'Band Back',q:'Cut x2',w:m.bandLen/4+1.5,h:4,s:'rect',t:['grain'],c:'#1769d4'},
      {id:'st',n:'Strap',q:'Cut x2',w:1.25,h:m.strapL+2,s:'rect',t:['grain'],c:'#0c3d8f'}]},
    {id:'racerbra',name:'Racerback',sub:'Athletic',
     icon:dSvg('<defs><linearGradient id="rbr_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#e3f2fd"/><stop offset="100%" stop-color="#1e88e5"/></linearGradient></defs><path d="M6 34 C6 22 12 12 20 10 L24 12 L28 8 L32 12 L36 10 C44 12 50 22 50 34 L50 46 C50 50 40 54 28 54 C16 54 6 50 6 46 Z" fill="url(#rbr_g)" stroke="#1255b0" stroke-width="1.8"/><path d="M24 12 L26 16 L28 10 L30 16 L32 12" stroke="#0c3d8f" stroke-width="2" fill="none" stroke-linejoin="round"/><path d="M6 34 Q28 28 50 34" stroke="white" stroke-width="1" opacity=".5" fill="none"/><path d="M10 28 C12 18 18 12 24 10" stroke="white" stroke-width="1.2" opacity=".4" fill="none" stroke-linecap="round"/>'),
     pieces:m=>[
      {id:'cf',n:'Cup Front',q:'Cut x2',w:m.bust/4+cx(m.cup)+.5,h:m.bust/6+cx(m.cup),s:'cup_round',t:['grain','notch'],c:'#1255b0'},
      {id:'bf',n:'Band Front',q:'Cut x1 on fold',w:m.bandLen/2+.5,h:4,s:'rarc',t:['fold','grain'],c:'#1769d4'},
      {id:'rb',n:'Racerback Panel',q:'Cut x1',w:m.bandLen/3,h:m.strapL+4,s:'racerb',t:['grain'],c:'#1769d4'},
      {id:'bb',n:'Band Back',q:'Cut x2',w:m.bandLen/4+1.5,h:4,s:'rect',t:['grain'],c:'#1769d4'}]},
    {id:'longlinebra',name:'Longline',sub:'Extended band',
     icon:dSvg('<defs><linearGradient id="llb_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#e3f2fd"/><stop offset="100%" stop-color="#42a5f5"/></linearGradient></defs><path d="M6 28 C6 16 12 8 20 6 L24 6 C26 12 30 12 32 6 L36 6 C44 8 50 16 50 28 L50 50 C50 54 40 58 28 58 C16 58 6 54 6 50 Z" fill="url(#llb_g)" stroke="#1255b0" stroke-width="1.8"/><path d="M6 28 Q28 22 50 28" stroke="#0c3d8f" stroke-width="1.5" fill="none"/><path d="M6 40 Q28 44 50 40" stroke="#1255b0" stroke-width="1" stroke-dasharray="3 2" fill="none"/><line x1="22" y1="6" x2="20" y2="2" stroke="#0c3d8f" stroke-width="2" stroke-linecap="round"/><line x1="34" y1="6" x2="36" y2="2" stroke="#0c3d8f" stroke-width="2" stroke-linecap="round"/>'),
     pieces:m=>[
      {id:'cf',n:'Cup Front',q:'Cut x2',w:m.bust/4+cx(m.cup)+.5,h:m.bust/6+cx(m.cup),s:'cup_round',t:['grain','notch'],c:'#1255b0'},
      {id:'bf',n:'Front Band',q:'Cut x1 on fold',w:m.bandLen/2+.5,h:8,s:'rarc',t:['fold','grain'],c:'#1769d4'},
      {id:'bb',n:'Back Band',q:'Cut x2',w:m.bandLen/4+1.5,h:8,s:'rect',t:['grain'],c:'#1769d4'},
      {id:'st',n:'Strap',q:'Cut x2',w:1.25,h:m.strapL+2,s:'rect',t:['grain'],c:'#0c3d8f'}]}
  ]},

leotard:{label:'Leotard',tip:'<strong>Torso girth is THE most important.</strong> Uses negative ease. Needs 50&#8209;75% stretch.',
  chips:['Scoop neck','V-neck','High neck','Sweetheart','Long sleeve','Short sleeve','Tank','Racerback','Ballet leg','Princess seam','Boning','Lining'],
  sku:'Mystique Foiled Spandex OR Solid Velvet — stage drama and 4-way stretch',
  fields:[{id:'bust',l:'Bust',h:'Fullest part',req:1,def:34,mn:24,mx:60},{id:'waist',l:'Waist',h:'Natural waist',req:1,def:28,mn:20,mx:52},{id:'hips',l:'Hips',h:'Fullest part',req:1,def:38,mn:28,mx:66},{id:'torsoG',l:'Torso Girth *',h:'Shoulder to crotch to shoulder back',req:1,def:58,mn:46,mx:76},{id:'torsoF',l:'Torso Front',h:'Shoulder to crotch front',req:1,def:29,mn:22,mx:38},{id:'armhole',l:'Armhole Depth',h:'Shoulder to underarm',req:1,def:7,mn:4,mx:12},{id:'shoulder',l:'Shoulder Width',h:'Across back',req:1,def:14,mn:10,mx:20}],
  styles:[
    {id:'scoopleotard',name:'Scoop Back',sub:'Classic dance',
     icon:dSvg('<defs><linearGradient id="sle_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#e1bee7"/><stop offset="100%" stop-color="#7b1fa2"/></linearGradient></defs><path d="M22 8 L20 16 L12 22 L14 30 L16 44 C16 52 20 56 28 58 C36 56 40 52 40 44 L42 30 L44 22 L36 16 L34 8 Z" fill="url(#sle_g)" stroke="#6a1b9a" stroke-width="1.8"/><path d="M22 8 C24 14 32 14 34 8" stroke="#4a148c" stroke-width="2" fill="none"/><line x1="22" y1="8" x2="21" y2="3" stroke="#4a148c" stroke-width="1.8" stroke-linecap="round"/><line x1="34" y1="8" x2="35" y2="3" stroke="#4a148c" stroke-width="1.8" stroke-linecap="round"/><path d="M16 46 C14 50 16 55 22 57" stroke="#4a148c" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M40 46 C42 50 40 55 34 57" stroke="#4a148c" stroke-width="1.8" fill="none" stroke-linecap="round"/>'),
     pieces:m=>[
      {id:'fr',n:'Front Body',q:'Cut x1 on fold',w:m.hips/4+.5,h:m.torsoF+.5,s:'lef',t:['fold','grain','notch'],c:'#6a1b9a'},
      {id:'bk',n:'Back Body',q:'Cut x1 on fold',w:m.hips/4+.75,h:(m.torsoG-m.torsoF)+.75,s:'leb',t:['fold','grain','notch'],c:'#7b1fa2'},
      {id:'st',n:'Strap',q:'Cut x2',w:1,h:m.armhole+2,s:'rect',t:['grain'],c:'#4a148c'},
      {id:'gu',n:'Crotch',q:'Cut x2',w:3,h:4.5,s:'rect',t:['grain'],c:'#ce93d8'}]},
    {id:'highleotard',name:'High Neck',sub:'Elegant',
     icon:dSvg('<defs><linearGradient id="hle_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#e1bee7"/><stop offset="100%" stop-color="#7b1fa2"/></linearGradient></defs><path d="M22 8 L20 16 L12 22 L14 30 L16 44 C16 52 20 56 28 58 C36 56 40 52 40 44 L42 30 L44 22 L36 16 L34 8 Z" fill="url(#hle_g)" stroke="#6a1b9a" stroke-width="1.8"/><path d="M22 8 L22 4 C22 2 24 1 28 1 C32 1 34 2 34 4 L34 8" stroke="#4a148c" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M16 46 C14 50 16 55 22 57" stroke="#4a148c" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M40 46 C42 50 40 55 34 57" stroke="#4a148c" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M16 18 C14 24 12 30 14 38" stroke="white" stroke-width="1" opacity=".3" stroke-linecap="round"/>'),
     pieces:m=>[
      {id:'fr',n:'Front Body',q:'Cut x1 on fold',w:m.hips/4+.5,h:m.torsoF+.5,s:'lef',t:['fold','grain','notch'],c:'#6a1b9a'},
      {id:'bk',n:'Back Body',q:'Cut x1 on fold',w:m.hips/4+.75,h:(m.torsoG-m.torsoF)+.75,s:'leb',t:['fold','grain','notch'],c:'#7b1fa2'},
      {id:'col',n:'Collar',q:'Cut x1',w:m.bust/2+2,h:2,s:'rect',t:['grain'],c:'#4a148c'},
      {id:'gu',n:'Crotch',q:'Cut x2',w:3,h:4.5,s:'rect',t:['grain'],c:'#ce93d8'}]},
    {id:'sweethrt',name:'Sweetheart',sub:'Romantic',
     icon:dSvg('<defs><linearGradient id="sw_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#ce93d8"/><stop offset="100%" stop-color="#6a1b9a"/></linearGradient></defs><path d="M22 8 L20 16 L12 22 L14 30 L16 44 C16 52 20 56 28 58 C36 56 40 52 40 44 L42 30 L44 22 L36 16 L34 8 Z" fill="url(#sw_g)" stroke="#6a1b9a" stroke-width="1.8"/><path d="M22 8 C22 4 18 2 16 6 C14 10 18 14 22 14 L28 20 L34 14 C38 14 42 10 40 6 C38 2 34 4 34 8" stroke="#4a148c" stroke-width="2.5" fill="none" stroke-linejoin="round"/><path d="M16 46 C14 50 16 55 22 57" stroke="#4a148c" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M40 46 C42 50 40 55 34 57" stroke="#4a148c" stroke-width="1.8" fill="none" stroke-linecap="round"/>'),
     pieces:m=>[
      {id:'fr',n:'Front Body',q:'Cut x1 on fold',w:m.hips/4+.5,h:m.torsoF+.5,s:'sweet',t:['fold','grain','notch'],c:'#6a1b9a'},
      {id:'bk',n:'Back Body',q:'Cut x1 on fold',w:m.hips/4+.75,h:(m.torsoG-m.torsoF)+.75,s:'leb',t:['fold','grain','notch'],c:'#7b1fa2'},
      {id:'st',n:'Strap',q:'Cut x2',w:1,h:m.armhole+2,s:'rect',t:['grain'],c:'#4a148c'},
      {id:'gu',n:'Crotch',q:'Cut x2',w:3,h:4.5,s:'rect',t:['grain'],c:'#ce93d8'}]}
  ]},

unitard:{label:'Unitard / Catsuit',tip:'<strong>Torso girth</strong> shoulder through crotch to shoulder. Min 50% stretch required.',
  chips:['Long sleeve','Short sleeve','Tank','Mock neck','Turtleneck','Scoop neck','Racerback','Zipper back','Stirrup foot','Open foot','Lining'],
  sku:'Synergy Nylon Lycra OR Mystique Foiled Spandex — full body power stretch',
  fields:[{id:'bust',l:'Bust',h:'Fullest part',req:1,def:34,mn:24,mx:60},{id:'waist',l:'Waist',h:'Natural waist',req:1,def:28,mn:20,mx:52},{id:'hips',l:'Hips',h:'Fullest part',req:1,def:38,mn:28,mx:66},{id:'torsoG',l:'Torso Girth *',h:'Shoulder to crotch to shoulder back',req:1,def:58,mn:46,mx:76},{id:'torsoF',l:'Torso Front',h:'Shoulder to crotch front',req:1,def:29,mn:22,mx:38},{id:'inseam',l:'Inseam',h:'Crotch to ankle',req:1,def:28,mn:18,mx:38},{id:'thigh',l:'Thigh',h:'Upper thigh fullest',req:1,def:24,mn:16,mx:38},{id:'knee',l:'Knee',h:'Around knee',req:1,def:15,mn:10,mx:24},{id:'calf',l:'Calf',h:'Fullest part',req:1,def:14,mn:10,mx:22},{id:'shoulder',l:'Shoulder Width',h:'Across back',req:0,def:14,mn:10,mx:20}],
  styles:[
    {id:'tanktard',name:'Tank',sub:'No sleeve',
     icon:dSvg('<defs><linearGradient id="tku_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#9575cd"/><stop offset="100%" stop-color="#1a237e"/></linearGradient></defs><path d="M22 6 L20 14 L12 20 L14 28 L14 38 L28 42 L42 38 L42 28 L44 20 L36 14 L34 6 Z" fill="url(#tku_g)" stroke="#4a148c" stroke-width="1.8"/><path d="M14 38 L12 54 L22 54 L28 42" fill="url(#tku_g)" stroke="#4a148c" stroke-width="1.8" stroke-linejoin="round"/><path d="M42 38 L44 54 L34 54 L28 42" fill="url(#tku_g)" stroke="#4a148c" stroke-width="1.8" stroke-linejoin="round"/><path d="M22 6 C24 12 32 12 34 6" stroke="#311b92" stroke-width="2" fill="none"/><line x1="28" y1="6" x2="28" y2="42" stroke="#7c4dff" stroke-width="1" stroke-dasharray="2 2" opacity=".6"/>'),
     pieces:m=>[
      {id:'fr',n:'Front Body',q:'Cut x1 on fold',w:m.hips/4+.75,h:m.torsoF+.75,s:'suf',t:['fold','grain','notch'],c:'#4a148c'},
      {id:'bk',n:'Back Body',q:'Cut x1 on fold',w:m.hips/4+1,h:(m.torsoG-m.torsoF)+1,s:'sub',t:['fold','grain','notch'],c:'#6a1b9a'},
      {id:'fll',n:'Front Leg L',q:'Cut x1',w:m.thigh/2+.5,h:m.inseam+1,s:'lgf',t:['grain','notch'],c:'#4a148c'},
      {id:'flr',n:'Front Leg R',q:'Cut x1 (mirror)',w:m.thigh/2+.5,h:m.inseam+1,s:'lgf',t:['grain','notch'],c:'#4a148c'},
      {id:'bll',n:'Back Leg L',q:'Cut x1',w:m.thigh/2+.75,h:m.inseam+1.5,s:'lgb',t:['grain','notch'],c:'#7b1fa2'},
      {id:'blr',n:'Back Leg R',q:'Cut x1 (mirror)',w:m.thigh/2+.75,h:m.inseam+1.5,s:'lgb',t:['grain','notch'],c:'#7b1fa2'}]},
    {id:'longsleeve',name:'Long Sleeve',sub:'Full coverage',
     icon:dSvg('<defs><linearGradient id="lsu_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#9575cd"/><stop offset="100%" stop-color="#1a237e"/></linearGradient></defs><path d="M22 6 L20 14 L12 20 L14 28 L14 38 L28 42 L42 38 L42 28 L44 20 L36 14 L34 6 Z" fill="url(#lsu_g)" stroke="#4a148c" stroke-width="1.8"/><path d="M20 14 L8 24 L6 40 L14 42 L16 28 L24 16" fill="url(#lsu_g)" stroke="#4a148c" stroke-width="1.8" stroke-linejoin="round"/><path d="M36 14 L48 24 L50 40 L42 42 L40 28 L32 16" fill="url(#lsu_g)" stroke="#4a148c" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 38 L12 54 L22 54 L28 42" fill="url(#lsu_g)" stroke="#4a148c" stroke-width="1.8" stroke-linejoin="round"/><path d="M42 38 L44 54 L34 54 L28 42" fill="url(#lsu_g)" stroke="#4a148c" stroke-width="1.8" stroke-linejoin="round"/>'),
     pieces:m=>[
      {id:'fr',n:'Front Body',q:'Cut x1 on fold',w:m.hips/4+.75,h:m.torsoF+.75,s:'suf',t:['fold','grain','notch'],c:'#4a148c'},
      {id:'bk',n:'Back Body',q:'Cut x1 on fold',w:m.hips/4+1,h:(m.torsoG-m.torsoF)+1,s:'sub',t:['fold','grain','notch'],c:'#6a1b9a'},
      {id:'sl',n:'Sleeve',q:'Cut x2',w:(m.shoulder||14)/2+2,h:m.inseam*.75,s:'lgf',t:['grain','notch'],c:'#4a148c'},
      {id:'fll',n:'Front Leg L',q:'Cut x1',w:m.thigh/2+.5,h:m.inseam+1,s:'lgf',t:['grain','notch'],c:'#4a148c'},
      {id:'flr',n:'Front Leg R',q:'Cut x1 (mirror)',w:m.thigh/2+.5,h:m.inseam+1,s:'lgf',t:['grain','notch'],c:'#4a148c'},
      {id:'bll',n:'Back Leg L',q:'Cut x1',w:m.thigh/2+.75,h:m.inseam+1.5,s:'lgb',t:['grain','notch'],c:'#7b1fa2'},
      {id:'blr',n:'Back Leg R',q:'Cut x1 (mirror)',w:m.thigh/2+.75,h:m.inseam+1.5,s:'lgb',t:['grain','notch'],c:'#7b1fa2'}]}
    ,{id:'zipfront_unitard',name:'Zipfront Catsuit',sub:'Front zip closure',
     icon:dSvg('<defs><linearGradient id="dzu" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#a98ae0"/><stop offset="100%" stop-color="#4a1a98"/></linearGradient></defs><path d="M27 8 L34 6 L41 8 C43 16 43 28 41 38 L43 46 C43 56 42 62 41 66 L37 66 L35 46 L33 46 L31 66 L27 66 C26 62 25 56 25 46 L27 38 C25 28 25 16 27 8 Z" fill="url(#dzu)" stroke="#361270" stroke-width="1.7"/><line x1="34" y1="6" x2="34" y2="44" stroke="#fff" stroke-width="1.2" opacity=".6" stroke-dasharray="2,2"/>','0 0 68 72'),
     pieces:m=>[
      {id:'fr',n:'Front Body',q:'Cut x2 mirror',w:m.hips/4+.75,h:m.torsoF+.75,s:'suf',t:['grain','notch'],c:'#512da8'},
      {id:'bk',n:'Back Body',q:'Cut x1 on fold',w:m.hips/4+.75,h:(m.torsoG-m.torsoF)+.75,s:'sub',t:['fold','grain','notch'],c:'#4527a0'},
      {id:'lf',n:'Left Leg',q:'Cut x2 mirror',w:m.hips/4+.5,h:m.inseam+1.5,s:'lgf',t:['grain','notch'],c:'#7e57c2'},
      {id:'rf',n:'Crotch Gusset',q:'Cut x1',w:3.5,h:5,s:'rect',t:['grain'],c:'#9575cd'},
      {id:'zp',n:'Zip Placket',q:'Cut x2',w:1.5,h:m.torsoF*.8,s:'rect',t:['grain'],c:'#b39ddb'},
      {id:'nc',n:'Neck Band',q:'Cut x1',w:m.bust/4+.5,h:1.5,s:'rect',t:['grain'],c:'#ede7f6'}
    ]}
    ,{id:'openback_unitard',name:'Open-Back',sub:'Plunge open back',
     icon:dSvg('<defs><linearGradient id="dou" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#a98ae0"/><stop offset="100%" stop-color="#4a1a98"/></linearGradient></defs><path d="M27 8 L34 6 L41 8 C43 16 44 30 41 38 L43 46 C43 56 42 62 41 66 L37 66 L35 46 L33 46 L31 66 L27 66 C26 62 25 56 25 46 L27 38 C24 30 25 16 27 8 Z" fill="url(#dou)" stroke="#361270" stroke-width="1.7"/><path d="M27 8 Q34 22 41 8" fill="none" stroke="#fff" stroke-width="1.5" opacity=".5"/>','0 0 68 72'),
     pieces:m=>[
      {id:'fr',n:'Front Body',q:'Cut x1 on fold',w:m.hips/4+.75,h:m.torsoF+.75,s:'suf',t:['fold','grain','notch'],c:'#512da8'},
      {id:'bk',n:'Back Body',q:'Cut x2 mirror',w:m.hips/4+1,h:(m.torsoG-m.torsoF)+.75,s:'sub',t:['grain','notch'],c:'#4527a0'},
      {id:'lf',n:'Left Leg',q:'Cut x2 mirror',w:m.hips/4+.5,h:m.inseam+1.5,s:'lgf',t:['grain','notch'],c:'#7e57c2'},
      {id:'gu',n:'Crotch Gusset',q:'Cut x1',w:3.5,h:5,s:'rect',t:['grain'],c:'#9575cd'},
      {id:'st',n:'Neck Strap',q:'Cut x2',w:1.25,h:m.bust/6+2,s:'rect',t:['grain'],c:'#b39ddb'}
    ]}
  ]},

crop_top:{label:'Crop Top',tip:'<strong>Front and back length</strong> set the crop point. Armhole depth shapes the sleeve opening.',
  chips:['Scoop neck','V-neck','Square neck','Off-shoulder','Ruched front','Bralette style','Long sleeve','Short sleeve'],
  sku:'Synergy Polyester Lycra OR Two-Tone Rib Nylon',
  fields:[{id:'bust',l:'Bust',h:'Fullest part',req:1,def:34,mn:24,mx:60},{id:'cup',l:'Cup Size',sel:['AA','A','B','C','D','DD/E','F'],req:0,def:'C'},{id:'shoulder',l:'Shoulder Width',h:'Shoulder to shoulder',req:1,def:14,mn:10,mx:20},{id:'armhole',l:'Armhole Depth',h:'Shoulder to underarm',req:1,def:7,mn:4,mx:12},{id:'frontL',l:'Front Length',h:'Shoulder to hem front',req:1,def:14,mn:8,mx:24},{id:'backL',l:'Back Length',h:'Shoulder to hem back',req:1,def:13,mn:8,mx:24}],
  styles:[
    {id:'fitted',name:'Fitted',sub:'Classic fit',
     icon:dSvg('<defs><linearGradient id="fit_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#fce4ec"/><stop offset="100%" stop-color="#e91e63"/></linearGradient></defs><path d="M18 10 L10 18 L8 24 L10 32 L12 40 L44 40 L46 32 L48 24 L46 18 L38 10 Z" fill="url(#fit_g)" stroke="#c2185b" stroke-width="1.8" stroke-linejoin="round"/><path d="M18 10 C22 16 34 16 38 10" stroke="#880e4f" stroke-width="2" fill="none"/><path d="M10 18 L8 24" stroke="#880e4f" stroke-width="2" stroke-linecap="round"/><path d="M46 18 L48 24" stroke="#880e4f" stroke-width="2" stroke-linecap="round"/><rect x="10" y="36" width="36" height="6" rx="2" fill="#880e4f" fill-opacity=".25" stroke="#880e4f" stroke-width="1.5"/><path d="M14 20 C12 26 12 32 14 38" stroke="white" stroke-width="1" opacity=".3" stroke-linecap="round"/>'),
     pieces:m=>[
      {id:'fr',n:'Front',q:'Cut x1 on fold',w:m.bust/2+1,h:m.frontL+.5,s:'tpf',t:['fold','grain','notch'],c:'#ad1457'},
      {id:'bk',n:'Back',q:'Cut x1 on fold',w:m.bust/2+.5,h:m.backL+.5,s:'tpb',t:['fold','grain'],c:'#c2185b'},
      {id:'nb',n:'Neck Binding',q:'Cut x1',w:m.bust/2+2,h:1.5,s:'rect',t:['grain'],c:'#880e4f'},
      {id:'hm',n:'Hem Band',q:'Cut x1',w:m.bust+1,h:2,s:'rect',t:['grain'],c:'#880e4f'}]},
    {id:'bralette_top',name:'Bralette',sub:'Triangle cups',
     icon:dSvg('<defs><linearGradient id="blt_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#fce4ec"/><stop offset="100%" stop-color="#f06292"/></linearGradient></defs><path d="M8 32 L20 12 L28 16 L36 12 L48 32 Z" fill="url(#blt_g)" stroke="#c2185b" stroke-width="1.8" stroke-linejoin="round"/><rect x="8" y="32" width="40" height="10" rx="3" fill="url(#blt_g)" stroke="#c2185b" stroke-width="1.5"/><path d="M10 30 L20 18 L27 20" stroke="white" stroke-width=".9" opacity=".5" stroke-linecap="round"/><line x1="8" y1="32" x2="2" y2="24" stroke="#880e4f" stroke-width="2" stroke-linecap="round"/><line x1="48" y1="32" x2="54" y2="24" stroke="#880e4f" stroke-width="2" stroke-linecap="round"/><circle cx="28" cy="31" r="2" fill="#880e4f" opacity=".6"/>'),
     pieces:m=>[
      {id:'cl',n:'Cup Left',q:'Cut x1',w:m.bust/4+cx(m.cup||'C')+.5,h:m.bust/6+cx(m.cup||'C'),s:'tri',t:['grain','notch'],c:'#ad1457'},
      {id:'cr',n:'Cup Right',q:'Cut x1 (mirror)',w:m.bust/4+cx(m.cup||'C')+.5,h:m.bust/6+cx(m.cup||'C'),s:'tri',t:['grain','notch'],c:'#ad1457'},
      {id:'bf',n:'Band',q:'Cut x1 on fold',w:m.bust/2+1,h:3,s:'rect',t:['fold','grain'],c:'#c2185b'},
      {id:'ti',n:'Neck Tie',q:'Cut x2',w:1,h:14,s:'rect',t:['grain'],c:'#880e4f'}]},
    {id:'squareneck',name:'Square Neck',sub:'Modern look',
     icon:dSvg('<defs><linearGradient id="sqn_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#fce4ec"/><stop offset="100%" stop-color="#e91e63"/></linearGradient></defs><path d="M18 10 L10 18 L8 24 L10 32 L12 40 L44 40 L46 32 L48 24 L46 18 L38 10 Z" fill="url(#sqn_g)" stroke="#c2185b" stroke-width="1.8" stroke-linejoin="round"/><path d="M18 10 L18 18 L38 18 L38 10" stroke="#880e4f" stroke-width="2.2" fill="none" stroke-linejoin="round"/><rect x="10" y="36" width="36" height="6" rx="2" fill="#880e4f" fill-opacity=".25" stroke="#880e4f" stroke-width="1.5"/><path d="M14 20 C12 26 12 32 14 38" stroke="white" stroke-width="1" opacity=".3" stroke-linecap="round"/>'),
     pieces:m=>[
      {id:'fr',n:'Front',q:'Cut x1 on fold',w:m.bust/2+1,h:m.frontL+.5,s:'tpf',t:['fold','grain','notch'],c:'#ad1457'},
      {id:'bk',n:'Back',q:'Cut x1 on fold',w:m.bust/2+.5,h:m.backL+.5,s:'tpb',t:['fold','grain'],c:'#c2185b'},
      {id:'nb',n:'Square Neck Binding',q:'Cut x1',w:m.bust/2+2,h:1.5,s:'rect',t:['grain'],c:'#880e4f'},
      {id:'hm',n:'Hem Band',q:'Cut x1',w:m.bust+1,h:2,s:'rect',t:['grain'],c:'#880e4f'}]}
  ]},

bodycon_dress:{label:'Bodycon Dress',tip:'<strong>Waist position</strong> and <strong>hip position</strong> create the curved side seam.',
  chips:['Scoop neck','V-neck','Square neck','Off-shoulder','Strapless','Side slit','Back zip','Lining'],
  sku:'Harmony Ultra Soft Double Knit — luxurious drape and stretch',
  fields:[{id:'bust',l:'Bust',h:'Fullest part',req:1,def:34,mn:24,mx:60},{id:'waist',l:'Waist',h:'Natural waist',req:1,def:28,mn:20,mx:52},{id:'hips',l:'Hips',h:'Fullest',req:1,def:38,mn:28,mx:66},{id:'shoulder',l:'Shoulder Width',h:'Shoulder to shoulder',req:1,def:14,mn:10,mx:20},{id:'frontL',l:'Front Length',h:'Shoulder to hem front',req:1,def:36,mn:20,mx:60},{id:'backL',l:'Back Length',h:'Shoulder to hem back',req:1,def:38,mn:20,mx:62},{id:'waistPos',l:'Waist Position',h:'Shoulder to natural waist',req:1,def:15,mn:10,mx:22},{id:'hipPos',l:'Hip Position',h:'Waist to fullest hip',req:1,def:8,mn:5,mx:12}],
  styles:[
    {id:'mini',name:'Mini',sub:'Above knee',
     icon:dSvg('<defs><linearGradient id="min_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#ff8a65"/><stop offset="100%" stop-color="#bf360c"/></linearGradient></defs><path d="M22 4 L20 12 L14 16 L14 26 C13 32 12 38 14 44 C16 50 22 54 28 54 C34 54 40 50 42 44 C44 38 43 32 42 26 L42 16 L36 12 L34 4 Z" fill="url(#min_g)" stroke="#bf360c" stroke-width="1.8" stroke-linejoin="round"/><line x1="22" y1="4" x2="21" y2="1" stroke="#8d1900" stroke-width="1.8" stroke-linecap="round"/><line x1="34" y1="4" x2="35" y2="1" stroke="#8d1900" stroke-width="1.8" stroke-linecap="round"/><path d="M22 4 L28 12 L34 4" stroke="#8d1900" stroke-width="2" fill="none" stroke-linejoin="round"/><path d="M14 28 Q28 24 42 28" stroke="white" stroke-width=".9" opacity=".4" fill="none"/>'),
     pieces:m=>[
      {id:'fr',n:'Front',q:'Cut x1 on fold',w:m.hips/4+1,h:m.frontL*.55+1,s:'drf',t:['fold','grain','notch'],c:'#e65100'},
      {id:'bk',n:'Back',q:'Cut x1 on fold',w:m.hips/4+1.25,h:m.backL*.55+1,s:'drb',t:['fold','grain','notch'],c:'#f57c00'},
      {id:'fc',n:'Neck Facing',q:'Cut x1',w:m.bust/2+1,h:2.25,s:'rarc',t:['grain'],c:'#bf360c'}]},
    {id:'midi',name:'Midi',sub:'Below knee',
     icon:dSvg('<defs><linearGradient id="mid_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#ff8a65"/><stop offset="100%" stop-color="#bf360c"/></linearGradient></defs><path d="M22 4 L20 12 L14 16 L14 26 C13 32 12 44 14 52 C16 58 22 62 28 62 C34 62 40 58 42 52 C44 44 43 32 42 26 L42 16 L36 12 L34 4 Z" fill="url(#mid_g)" stroke="#bf360c" stroke-width="1.8"/><path d="M22 4 L28 12 L34 4" stroke="#8d1900" stroke-width="2" fill="none" stroke-linejoin="round"/><line x1="22" y1="4" x2="21" y2="1" stroke="#8d1900" stroke-width="1.8" stroke-linecap="round"/><line x1="34" y1="4" x2="35" y2="1" stroke="#8d1900" stroke-width="1.8" stroke-linecap="round"/><path d="M14 28 Q28 24 42 28" stroke="white" stroke-width=".9" opacity=".4" fill="none"/>'),
     pieces:m=>[
      {id:'fr',n:'Front',q:'Cut x1 on fold',w:m.hips/4+1,h:m.frontL*.75+1,s:'drf',t:['fold','grain','notch'],c:'#e65100'},
      {id:'bk',n:'Back',q:'Cut x1 on fold',w:m.hips/4+1.25,h:m.backL*.75+1,s:'drb',t:['fold','grain','notch'],c:'#f57c00'},
      {id:'fc',n:'Neck Facing',q:'Cut x1',w:m.bust/2+1,h:2.25,s:'rarc',t:['grain'],c:'#bf360c'}]},
    {id:'maxibd',name:'Maxi',sub:'Floor length',
     icon:dSvg('<defs><linearGradient id="mxb_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#ff8a65"/><stop offset="100%" stop-color="#bf360c"/></linearGradient></defs><path d="M22 2 L20 10 L14 14 L14 26 C13 36 12 50 14 62 C15 66 20 70 28 70 C36 70 41 66 42 62 C44 50 43 36 42 26 L42 14 L36 10 L34 2 Z" fill="url(#mxb_g)" stroke="#bf360c" stroke-width="1.8"/><path d="M22 2 L28 10 L34 2" stroke="#8d1900" stroke-width="2" fill="none" stroke-linejoin="round"/><line x1="22" y1="2" x2="21" y2="0" stroke="#8d1900" stroke-width="1.8" stroke-linecap="round"/><line x1="34" y1="2" x2="35" y2="0" stroke="#8d1900" stroke-width="1.8" stroke-linecap="round"/><path d="M15 28 C14 40 14 52 15 60" stroke="white" stroke-width="1" opacity=".3" stroke-linecap="round"/>'),
     pieces:m=>[
      {id:'fr',n:'Front',q:'Cut x1 on fold',w:m.hips/4+1,h:m.frontL+1,s:'drf',t:['fold','grain','notch'],c:'#e65100'},
      {id:'bk',n:'Back',q:'Cut x1 on fold',w:m.hips/4+1.25,h:m.backL+1,s:'drb',t:['fold','grain','notch'],c:'#f57c00'},
      {id:'fc',n:'Neck Facing',q:'Cut x1',w:m.bust/2+1,h:2.25,s:'rarc',t:['grain'],c:'#bf360c'}]}
  ]},

maxi_dress:{label:'Maxi Dress',tip:'<strong>Full length</strong> from shoulder to floor is critical. Hem flare controls the sweep.',
  chips:['Spaghetti straps','Halter neck','Off-shoulder','V-neck','Empire waist','Wrap front','Side slit','Tiered skirt','Lining'],
  sku:'Harmony Ultra Soft Double Knit OR Jersey — fluid drape for maxi silhouettes',
  fields:[{id:'bust',l:'Bust',h:'Fullest part',req:1,def:34,mn:24,mx:60},{id:'waist',l:'Waist',h:'Natural waist',req:1,def:28,mn:20,mx:52},{id:'hips',l:'Hips',h:'Fullest',req:1,def:38,mn:28,mx:66},{id:'shoulder',l:'Shoulder Width',h:'Shoulder to shoulder',req:1,def:14,mn:10,mx:20},{id:'fullL',l:'Full Length',h:'Shoulder to floor/hem',req:1,def:56,mn:40,mx:68},{id:'waistPos',l:'Waist Position',h:'Shoulder to natural waist',req:1,def:15,mn:10,mx:22},{id:'hipPos',l:'Hip Position',h:'Waist to fullest hip',req:1,def:8,mn:5,mx:12},{id:'hemFlare',l:'Hem Flare',h:'Extra width at hem vs hip',req:0,def:8,mn:0,mx:30}],
  styles:[
    {id:'slipmaxi',name:'Slip Maxi',sub:'Minimalist',
     icon:dSvg('<defs><linearGradient id="slm_g" x1=".5" y1="0" x2=".6" y2="1"><stop offset="0%" stop-color="#bbdefb"/><stop offset="100%" stop-color="#1565c0"/></linearGradient></defs><line x1="20" y1="4" x2="20" y2="10" stroke="#0c3d8f" stroke-width="1.8" stroke-linecap="round"/><line x1="36" y1="4" x2="36" y2="10" stroke="#0c3d8f" stroke-width="1.8" stroke-linecap="round"/><path d="M18 10 L14 58 L42 58 L38 10 Z" fill="url(#slm_g)" stroke="#1255b0" stroke-width="1.8" stroke-linejoin="round"/><path d="M20 12 C22 16 34 16 36 12" stroke="white" stroke-width="1" opacity=".5" fill="none"/><path d="M16 20 C15 32 14 44 14 56" stroke="white" stroke-width="1" opacity=".25" stroke-linecap="round"/>'),
     pieces:m=>[
      {id:'fr',n:'Front',q:'Cut x1 on fold',w:m.hips/4+1,h:m.fullL+1,s:'drf',t:['fold','grain','notch'],c:'#1255b0'},
      {id:'bk',n:'Back',q:'Cut x1 on fold',w:m.hips/4+1.5,h:m.fullL+1.5,s:'drb',t:['fold','grain'],c:'#1769d4'},
      {id:'st',n:'Strap',q:'Cut x2',w:1,h:16,s:'rect',t:['grain'],c:'#0c3d8f'}]},
    {id:'empmaxi',name:'Empire Waist',sub:'High seam',
     icon:dSvg('<defs><linearGradient id="emp_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#e3f2fd"/><stop offset="100%" stop-color="#1565c0"/></linearGradient></defs><path d="M18 6 L16 16 L40 16 L38 6 C34 4 30 3 28 3 C26 3 22 4 18 6 Z" fill="#1976d2" stroke="#0d47a1" stroke-width="1.8"/><line x1="14" y1="16" x2="42" y2="16" stroke="#0d47a1" stroke-width="2.5"/><path d="M16 16 L8 60 L48 60 L40 16 Z" fill="url(#emp_g)" stroke="#1255b0" stroke-width="1.8" stroke-linejoin="round"/><path d="M18 22 C16 34 14 46 14 58" stroke="white" stroke-width="1" opacity=".25" stroke-linecap="round"/><line x1="18" y1="6" x2="18" y2="2" stroke="#0c3d8f" stroke-width="1.8" stroke-linecap="round"/><line x1="38" y1="6" x2="38" y2="2" stroke="#0c3d8f" stroke-width="1.8" stroke-linecap="round"/>'),
     pieces:m=>[
      {id:'fb',n:'Front Bodice',q:'Cut x1 on fold',w:m.bust/4+1,h:m.waistPos+2,s:'tpf',t:['fold','grain','notch'],c:'#1255b0'},
      {id:'bb',n:'Back Bodice',q:'Cut x1 on fold',w:m.bust/4+1,h:m.waistPos+2,s:'tpb',t:['fold','grain'],c:'#1769d4'},
      {id:'fs',n:'Front Skirt',q:'Cut x1 on fold',w:m.hips/4+1+(m.hemFlare||8)/2,h:m.fullL-m.waistPos+1,s:'drf',t:['fold','grain'],c:'#1255b0'},
      {id:'bs',n:'Back Skirt',q:'Cut x1 on fold',w:m.hips/4+1.5+(m.hemFlare||8)/2,h:m.fullL-m.waistPos+1.5,s:'drb',t:['fold','grain'],c:'#1769d4'},
      {id:'st',n:'Strap',q:'Cut x2',w:1.25,h:14,s:'rect',t:['grain'],c:'#0c3d8f'}]},
    {id:'tieredmaxi',name:'Tiered',sub:'Layered skirt',
     icon:dSvg('<defs><linearGradient id="tier_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#e3f2fd"/><stop offset="100%" stop-color="#1976d2"/></linearGradient></defs><path d="M20 4 L18 14 L38 14 L36 4 C32 2 28 2 28 2 C28 2 24 2 20 4 Z" fill="#1976d2" stroke="#0d47a1" stroke-width="1.8"/><path d="M16 14 L12 26 L44 26 L40 14 Z" fill="url(#tier_g)" stroke="#1255b0" stroke-width="1.5"/><path d="M10 26 L6 40 L50 40 L46 26 Z" fill="url(#tier_g)" stroke="#1255b0" stroke-width="1.5" opacity=".85"/><path d="M6 40 L4 56 L52 56 L50 40 Z" fill="url(#tier_g)" stroke="#1255b0" stroke-width="1.5" opacity=".7"/><line x1="20" y1="4" x2="20" y2="0" stroke="#0c3d8f" stroke-width="1.8" stroke-linecap="round"/><line x1="36" y1="4" x2="36" y2="0" stroke="#0c3d8f" stroke-width="1.8" stroke-linecap="round"/>'),
     pieces:m=>[
      {id:'fb',n:'Front Bodice',q:'Cut x1 on fold',w:m.bust/4+1,h:m.waistPos+2,s:'tpf',t:['fold','grain','notch'],c:'#1255b0'},
      {id:'bb',n:'Back Bodice',q:'Cut x1 on fold',w:m.bust/4+1,h:m.waistPos+2,s:'tpb',t:['fold','grain'],c:'#1769d4'},
      {id:'t1',n:'Tier 1',q:'Cut x2 on fold',w:m.hips/3,h:(m.fullL-m.waistPos)/3+1,s:'rect',t:['fold','grain'],c:'#1255b0'},
      {id:'t2',n:'Tier 2',q:'Cut x2 on fold',w:m.hips/3*1.4,h:(m.fullL-m.waistPos)/3+1,s:'rect',t:['fold','grain'],c:'#1769d4'},
      {id:'t3',n:'Tier 3',q:'Cut x2 on fold',w:m.hips/3*1.9,h:(m.fullL-m.waistPos)/3+1,s:'rect',t:['fold','grain'],c:'#93c4ff'},
      {id:'st',n:'Strap',q:'Cut x2',w:1.25,h:14,s:'rect',t:['grain'],c:'#0c3d8f'}]}
  ]},

night_dress:{label:'Nightgown / Slip Dress',tip:'<strong>Bust and hip</strong> determine ease. Slip dresses use 1&#8209;2" positive ease for comfort.',
  chips:['Spaghetti straps','V-neck','Lace trim','Ruffle hem','Bias cut','Empire waist','Side slit','Cowl neck'],
  sku:'Satin Charmeuse OR Stretch Lace — luxurious hand and drape for sleepwear',
  fields:[{id:'bust',l:'Bust',h:'Fullest part',req:1,def:34,mn:24,mx:60},{id:'waist',l:'Waist',h:'Natural waist',req:1,def:28,mn:20,mx:52},{id:'hips',l:'Hips',h:'Fullest',req:1,def:38,mn:28,mx:66},{id:'shoulder',l:'Shoulder Width',h:'Shoulder to shoulder',req:1,def:14,mn:10,mx:20},{id:'fullL',l:'Length',h:'Shoulder to hem',req:1,def:44,mn:28,mx:62},{id:'waistPos',l:'Waist Position',h:'Shoulder to natural waist',req:1,def:15,mn:10,mx:22}],
  styles:[
    {id:'classicslip',name:'Classic Slip',sub:'Simple straps',
     icon:dSvg('<defs><linearGradient id="cls_g" x1=".5" y1="0" x2=".6" y2="1"><stop offset="0%" stop-color="#fce4ec"/><stop offset="60%" stop-color="#f48fb1"/><stop offset="100%" stop-color="#880e4f"/></linearGradient></defs><line x1="18" y1="4" x2="18" y2="10" stroke="#880e4f" stroke-width="1.8" stroke-linecap="round"/><line x1="38" y1="4" x2="38" y2="10" stroke="#880e4f" stroke-width="1.8" stroke-linecap="round"/><path d="M16 10 L13 56 L43 56 L40 10 Z" fill="url(#cls_g)" stroke="#c2185b" stroke-width="1.8" stroke-linejoin="round"/><path d="M16 18 C18 22 38 22 40 18" stroke="white" stroke-width="1" opacity=".5" fill="none"/><path d="M14 52 C18 48 24 52 28 50 C32 48 38 52 42 50" stroke="#880e4f" stroke-width="1.5" fill="none"/>'),
     pieces:m=>[
      {id:'fr',n:'Front',q:'Cut x1 on fold',w:m.hips/4+1,h:m.fullL+1,s:'drf',t:['fold','grain','notch'],c:'#880e4f'},
      {id:'bk',n:'Back',q:'Cut x1 on fold',w:m.hips/4+1.25,h:m.fullL+1,s:'drb',t:['fold','grain'],c:'#c2185b'},
      {id:'stL',n:'Strap Left',q:'Cut x1',w:1,h:16,s:'rect',t:['grain'],c:'#880e4f'},
      {id:'stR',n:'Strap Right',q:'Cut x1',w:1,h:16,s:'rect',t:['grain'],c:'#880e4f'},
      {id:'fc',n:'Bodice Lining',q:'Cut x1 on fold',w:m.bust/4+.5,h:m.waistPos+1,s:'rarc',t:['fold','grain'],c:'#f8bbd0'}]},
    {id:'cowlslip',name:'Cowl Neck',sub:'Draped front',
     icon:dSvg('<defs><linearGradient id="cow_g" x1=".5" y1="0" x2=".6" y2="1"><stop offset="0%" stop-color="#fce4ec"/><stop offset="100%" stop-color="#c2185b"/></linearGradient></defs><path d="M16 10 C16 6 20 4 24 6 C26 10 30 10 32 6 C36 4 40 6 40 10" stroke="#880e4f" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M16 10 L13 56 L43 56 L40 10 Z" fill="url(#cow_g)" stroke="#c2185b" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 52 C18 48 24 52 28 50 C32 48 38 52 42 50" stroke="#880e4f" stroke-width="1.5" fill="none"/><path d="M17 14 C16 28 14 42 14 54" stroke="white" stroke-width="1" opacity=".25" stroke-linecap="round"/>'),
     pieces:m=>[
      {id:'fr',n:'Front (Cowl)',q:'Cut x1 on fold',w:m.hips/4+2,h:m.fullL+3,s:'drf',t:['fold','grain','notch'],c:'#880e4f'},
      {id:'bk',n:'Back',q:'Cut x1 on fold',w:m.hips/4+1.25,h:m.fullL+1,s:'drb',t:['fold','grain'],c:'#c2185b'},
      {id:'stL',n:'Strap Left',q:'Cut x1',w:1,h:16,s:'rect',t:['grain'],c:'#880e4f'},
      {id:'stR',n:'Strap Right',q:'Cut x1',w:1,h:16,s:'rect',t:['grain'],c:'#880e4f'}]}
    ,{id:'satinslip',name:'Satin Slip',sub:'Bias-cut satin',
     icon:dSvg('<defs><linearGradient id="dss" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#c8b8f0"/><stop offset="100%" stop-color="#6a3ab8"/></linearGradient></defs><path d="M26 9 L28 14 L38 14 L40 9 L34 5 Z" fill="url(#dss)" stroke="#4c2890" stroke-width="1.5"/><path d="M28 14 C24 18 22 24 22 32 L24 54 C28 57 40 57 44 54 L46 32 C46 24 44 18 40 14 Z" fill="url(#dss)" fill-opacity=".85" stroke="#4c2890" stroke-width="1.7"/>','0 0 68 60'),
     pieces:m=>[
      {id:'fr',n:'Front (bias cut)',q:'Cut x1 on fold',w:m.hips/4+1.5,h:m.fullL+3,s:'drf',t:['fold','grain','notch'],c:'#6a3ab8'},
      {id:'bk',n:'Back (bias cut)',q:'Cut x1 on fold',w:m.hips/4+1.5,h:m.fullL+3,s:'drb',t:['fold','grain','notch'],c:'#7b44c8'},
      {id:'st',n:'Spaghetti Strap',q:'Cut x4',w:1,h:m.bust/6+3,s:'rect',t:['grain'],c:'#9575cd'},
      {id:'li',n:'Lining Front',q:'Cut x1 on fold',w:m.bust/4+1,h:m.fullL/2+1,s:'drf',t:['fold','grain'],c:'#ede7f6'}
    ]}
    ,{id:'babydoll',name:'Babydoll',sub:'Short empire silhouette',
     icon:dSvg('<defs><linearGradient id="dbd" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#c8b8f0"/><stop offset="100%" stop-color="#6a3ab8"/></linearGradient></defs><path d="M26 9 L28 14 L38 14 L40 9 Z" fill="url(#dbd)" stroke="#4c2890" stroke-width="1.5"/><path d="M22 14 C18 20 18 28 20 34 L48 34 C50 28 50 20 46 14 Z" fill="url(#dbd)" stroke="#4c2890" stroke-width="1.7"/><path d="M18 34 L14 52 L54 52 L50 34 Z" fill="url(#dbd)" fill-opacity=".6" stroke="#4c2890" stroke-width="1.5"/>','0 0 68 56'),
     pieces:m=>[
      {id:'fb',n:'Bodice Front',q:'Cut x1 on fold',w:m.bust/4+1,h:m.waistPos+.75,s:'tpf',t:['fold','grain','notch'],c:'#6a3ab8'},
      {id:'bb',n:'Bodice Back',q:'Cut x1 on fold',w:m.bust/4+1,h:m.waistPos+.5,s:'tpb',t:['fold','grain','notch'],c:'#7b44c8'},
      {id:'fs',n:'Skirt Front',q:'Cut x1 on fold',w:m.hips/4+4,h:m.fullL-m.waistPos+1,s:'drf',t:['fold','grain'],c:'#9575cd'},
      {id:'bs',n:'Skirt Back',q:'Cut x1 on fold',w:m.hips/4+4,h:m.fullL-m.waistPos+1,s:'drb',t:['fold','grain'],c:'#7b44c8'},
      {id:'st',n:'Spaghetti Strap',q:'Cut x4',w:1,h:m.bust/6+3,s:'rect',t:['grain'],c:'#b39ddb'}
    ]}
  ]},

two_piece:{label:'Two-Piece Set',tip:'<strong>Waist and hip</strong> must coordinate between top and bottom for a matching set.',
  chips:['Crop top','Bandeau top','Bralette top','Off-shoulder','Ruched top','Elastic waist','High waist','Ruffled hem'],
  sku:'Synergy Nylon Lycra OR Rib Knit — coordinates beautifully as a matching set',
  fields:[{id:'bust',l:'Bust',h:'Fullest part',req:1,def:34,mn:24,mx:60},{id:'waist',l:'Waist',h:'Natural waist',req:1,def:28,mn:20,mx:52},{id:'hips',l:'Hips',h:'Fullest part',req:1,def:38,mn:28,mx:66},{id:'topL',l:'Top Length',h:'Shoulder to top hem',req:1,def:16,mn:10,mx:26},{id:'bottomL',l:'Bottom Length',h:'Waist to hem',req:1,def:18,mn:10,mx:36},{id:'shoulder',l:'Shoulder Width',h:'Shoulder to shoulder',req:1,def:14,mn:10,mx:20},{id:'skirtL',l:'Skirt Length',h:'Waist to skirt hem',req:0,def:18,mn:10,mx:40},{id:'inseam',l:'Inseam',h:'Crotch to ankle (palazzo)',req:0,def:28,mn:18,mx:38},{id:'rise',l:'Rise',h:'Waist to crotch, seated',req:0,def:10,mn:7,mx:14}],
  styles:[
    {id:'croptop_skirt',name:'Crop + Skirt',sub:'Classic set',
     icon:dSvg('<defs><linearGradient id="cts_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#e8f5e9"/><stop offset="100%" stop-color="#2e7d32"/></linearGradient></defs><rect x="10" y="6" width="36" height="18" rx="4" fill="url(#cts_g)" stroke="#1b5e20" stroke-width="1.8"/><path d="M12 10 C20 14 36 14 44 10" stroke="white" stroke-width="1" opacity=".5" fill="none"/><rect x="8" y="28" width="40" height="8" rx="3" fill="#1b5e20" fill-opacity=".4" stroke="#1b5e20" stroke-width="1.5"/><path d="M10 36 L8 56 L48 56 L46 36 Z" fill="url(#cts_g)" stroke="#2e7d32" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 42 C10 46 9 50 9 54" stroke="white" stroke-width="1" opacity=".25" stroke-linecap="round"/>'),
     pieces:m=>[
      {id:'tf',n:'Top Front',q:'Cut x1 on fold',w:m.bust/4+.75,h:m.topL+.5,s:'tpf',t:['fold','grain','notch'],c:'#077040'},
      {id:'tb',n:'Top Back',q:'Cut x1 on fold',w:m.bust/4+.75,h:m.topL+.5,s:'tpb',t:['fold','grain'],c:'#077040'},
      {id:'bf',n:'Bottom Front',q:'Cut x1 on fold',w:m.hips/4+1,h:m.bottomL+1,s:'drf',t:['fold','grain','notch'],c:'#0c9456'},
      {id:'bb',n:'Bottom Back',q:'Cut x1 on fold',w:m.hips/4+1.25,h:m.bottomL+1,s:'drb',t:['fold','grain','notch'],c:'#0c9456'},
      {id:'wb',n:'Waistband',q:'Cut x1',w:m.waist+2,h:3,s:'rect',t:['grain'],c:'#004d36'}]},
    {id:'bralette_shorts',name:'Bralette + Shorts',sub:'Sporty set',
     icon:dSvg('<defs><linearGradient id="bls_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#e8f5e9"/><stop offset="100%" stop-color="#388e3c"/></linearGradient></defs><path d="M8 22 L20 10 L28 14 L36 10 L48 22 Z" fill="url(#bls_g)" stroke="#2e7d32" stroke-width="1.8" stroke-linejoin="round"/><rect x="8" y="22" width="40" height="8" rx="3" fill="url(#bls_g)" stroke="#1b5e20" stroke-width="1.5"/><path d="M10 34 L8 48 L22 48 L28 40" fill="url(#bls_g)" stroke="#2e7d32" stroke-width="1.8" stroke-linejoin="round"/><path d="M46 34 L48 48 L34 48 L28 40" fill="url(#bls_g)" stroke="#2e7d32" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 34 Q28 38 48 34" stroke="#1b5e20" stroke-width="1.5" fill="none"/>'),
     pieces:m=>[
      {id:'cl',n:'Bra Cup L',q:'Cut x1',w:m.bust/4+cx('C')+.5,h:m.bust/6+cx('C'),s:'tri',t:['grain','notch'],c:'#077040'},
      {id:'cr',n:'Bra Cup R',q:'Cut x1 (mirror)',w:m.bust/4+cx('C')+.5,h:m.bust/6+cx('C'),s:'tri',t:['grain','notch'],c:'#077040'},
      {id:'bf',n:'Bra Band',q:'Cut x1 on fold',w:m.bust/2+1,h:3,s:'rect',t:['fold','grain'],c:'#0c9456'},
      {id:'sfl',n:'Short Front L',q:'Cut x1',w:m.hips/4+.75,h:m.bottomL+.5,s:'lgf',t:['grain','notch'],c:'#077040'},
      {id:'sfr',n:'Short Front R',q:'Cut x1 (mirror)',w:m.hips/4+.75,h:m.bottomL+.5,s:'lgf',t:['grain','notch'],c:'#077040'},
      {id:'sbl',n:'Short Back L',q:'Cut x1',w:m.hips/4+1,h:m.bottomL+1,s:'lgb',t:['grain','notch'],c:'#0c9456'},
      {id:'sbr',n:'Short Back R',q:'Cut x1 (mirror)',w:m.hips/4+1,h:m.bottomL+1,s:'lgb',t:['grain','notch'],c:'#0c9456'},
      {id:'wb',n:'Waistband',q:'Cut x1',w:m.waist+2,h:3,s:'rect',t:['grain'],c:'#004d36'}]}
    ,{id:'halter_set',name:'Halter Set',sub:'Halter top + mini skirt',
     icon:dSvg('<defs><linearGradient id="dhs" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#ffb88a"/><stop offset="100%" stop-color="#e05818"/></linearGradient></defs><path d="M28 5 L22 16 C20 16 18 18 18 22 L18 28 L38 28 L38 22 C38 18 36 16 34 16 L28 5 Z" fill="url(#dhs)" stroke="#b04210" stroke-width="1.7"/><rect x="18" y="34" width="20" height="16" rx="2" fill="url(#dhs)" fill-opacity=".75" stroke="#b04210" stroke-width="1.7"/>','0 0 56 54'),
     pieces:m=>[
      {id:'tf',n:'Top Front',q:'Cut x1 on fold',w:m.bust/4+.75,h:m.topL+.5,s:'tpf',t:['fold','grain','notch'],c:'#e05818'},
      {id:'tb',n:'Top Back',q:'Cut x1 on fold',w:m.bust/4+.75,h:m.topL+.5,s:'tpb',t:['fold','grain','notch'],c:'#d0491a'},
      {id:'ht',n:'Halter Tie',q:'Cut x2',w:m.bust/4+2,h:2,s:'rect',t:['grain'],c:'#ff8a65'},
      {id:'sf',n:'Skirt Front',q:'Cut x1 on fold',w:m.hips/4+1,h:m.skirtL+1,s:'skf',t:['fold','grain'],c:'#e05818'},
      {id:'sb',n:'Skirt Back',q:'Cut x1 on fold',w:m.hips/4+1,h:m.skirtL+1,s:'skb',t:['fold','grain'],c:'#d0491a'},
      {id:'wb',n:'Waistband',q:'Cut x1',w:m.waist+2,h:2,s:'rect',t:['fold','grain'],c:'#bf360c'}
    ]}
    ,{id:'palazzo_set',name:'Palazzo Set',sub:'Crop top + wide-leg pants',
     icon:dSvg('<defs><linearGradient id="dps" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#ffb88a"/><stop offset="100%" stop-color="#e05818"/></linearGradient></defs><rect x="18" y="6" width="20" height="14" rx="2" fill="url(#dps)" stroke="#b04210" stroke-width="1.7"/><path d="M18 24 L14 54 L28 54 L28 36 Z" fill="url(#dps)" fill-opacity=".8" stroke="#b04210" stroke-width="1.7"/><path d="M38 24 L42 54 L28 54 L28 36 Z" fill="url(#dps)" fill-opacity=".65" stroke="#b04210" stroke-width="1.5"/>','0 0 56 58'),
     pieces:m=>[
      {id:'tf',n:'Top Front',q:'Cut x1 on fold',w:m.bust/4+.75,h:m.topL+.5,s:'tpf',t:['fold','grain','notch'],c:'#e05818'},
      {id:'tb',n:'Top Back',q:'Cut x1 on fold',w:m.bust/4+.75,h:m.topL+.5,s:'tpb',t:['fold','grain','notch'],c:'#d0491a'},
      {id:'fp',n:'Front Pant',q:'Cut x2 mirror',w:m.hips/4+3,h:m.inseam+m.rise+1,s:'lgf',t:['grain','notch'],c:'#e05818'},
      {id:'bp',n:'Back Pant',q:'Cut x2 mirror',w:m.hips/4+3.5,h:m.inseam+m.rise+1,s:'lgb',t:['grain','notch'],c:'#d0491a'},
      {id:'wb',n:'Waistband',q:'Cut x1',w:m.waist+2,h:2.5,s:'rect',t:['fold','grain'],c:'#bf360c'}
    ]}
  ]},

skirt:{label:'Skirt',tip:'<strong>Skirt style</strong> determines piece shapes. A-line and circle need more fabric.',
  chips:['Elastic waist','Structured waistband','Side zip','Back zip','Lining','Pockets','Front slit','Ruffle hem'],
  sku:'Stretch Velvet OR Matte Nylon Spandex',
  fields:[{id:'waist',l:'Waist',h:'Natural waist',req:1,def:28,mn:20,mx:52},{id:'hips',l:'Hips',h:'Fullest part',req:1,def:38,mn:28,mx:66},{id:'hipDepth',l:'Hip Depth',h:'Waist to fullest hip',req:1,def:8,mn:5,mx:12},{id:'skirtL',l:'Skirt Length',h:'Waist to hem',req:1,def:18,mn:8,mx:42}],
  styles:[
    {id:'aline',name:'A-Line',sub:'Classic flare',
     icon:dSvg('<defs><linearGradient id="aln_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#e8f5e9"/><stop offset="100%" stop-color="#2e7d32"/></linearGradient></defs><rect x="14" y="4" width="28" height="12" rx="4" fill="#1b5e20" fill-opacity=".4" stroke="#1b5e20" stroke-width="2"/><path d="M14 16 L4 58 L52 58 L42 16 Z" fill="url(#aln_g)" stroke="#2e7d32" stroke-width="1.8" stroke-linejoin="round"/><path d="M16 22 C12 34 9 46 8 56" stroke="white" stroke-width="1" opacity=".3" stroke-linecap="round"/><path d="M40 22 C44 34 47 46 48 56" stroke="white" stroke-width="1" opacity=".3" stroke-linecap="round"/><line x1="14" y1="56" x2="52" y2="56" stroke="#1b5e20" stroke-width="2"/>'),
     pieces:m=>[
      {id:'fr',n:'Front Panel',q:'Cut x1 on fold',w:m.hips/4+1,h:m.skirtL+1,s:'skf',t:['fold','grain','notch'],c:'#1b5e20'},
      {id:'bk',n:'Back Panel',q:'Cut x1 on fold',w:m.hips/4+1.25,h:m.skirtL+1.5,s:'skb',t:['fold','grain','notch'],c:'#2e7d32'},
      {id:'wb',n:'Waistband',q:'Cut x1',w:m.waist+2,h:2.5,s:'rect',t:['grain'],c:'#004d40'}]},
    {id:'pencil',name:'Pencil',sub:'Fitted straight',
     icon:dSvg('<defs><linearGradient id="pen_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#e8f5e9"/><stop offset="100%" stop-color="#2e7d32"/></linearGradient></defs><rect x="14" y="4" width="28" height="12" rx="4" fill="#1b5e20" fill-opacity=".4" stroke="#1b5e20" stroke-width="2"/><path d="M14 16 L12 58 L44 58 L42 16 Z" fill="url(#pen_g)" stroke="#2e7d32" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 30 Q28 28 42 30" stroke="white" stroke-width=".9" opacity=".4" fill="none"/><path d="M13 48 Q28 46 43 48" stroke="white" stroke-width=".9" opacity=".3" fill="none"/><line x1="12" y1="56" x2="44" y2="56" stroke="#1b5e20" stroke-width="2"/>'),
     pieces:m=>[
      {id:'fr',n:'Front Panel',q:'Cut x1 on fold',w:m.hips/4+.5,h:m.skirtL+1,s:'skf',t:['fold','grain','notch'],c:'#1b5e20'},
      {id:'bk',n:'Back Panel',q:'Cut x1 on fold',w:m.hips/4+.75,h:m.skirtL+1.5,s:'skb',t:['fold','grain','notch'],c:'#2e7d32'},
      {id:'wb',n:'Waistband',q:'Cut x1',w:m.waist+2,h:2.5,s:'rect',t:['grain'],c:'#004d40'}]},
    {id:'circle',name:'Circle',sub:'Full flare',
     icon:dSvg('<defs><linearGradient id="cir_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#e8f5e9"/><stop offset="100%" stop-color="#388e3c"/></linearGradient></defs><rect x="14" y="2" width="28" height="10" rx="4" fill="#1b5e20" fill-opacity=".4" stroke="#1b5e20" stroke-width="2"/><path d="M14 12 L2 58 L54 58 L42 12 Z" fill="url(#cir_g)" stroke="#2e7d32" stroke-width="1.8" stroke-linejoin="round"/><path d="M15 18 C10 30 6 44 4 56" stroke="white" stroke-width="1" opacity=".3" stroke-linecap="round"/><path d="M41 18 C46 30 50 44 52 56" stroke="white" stroke-width="1" opacity=".3" stroke-linecap="round"/><line x1="2" y1="56" x2="54" y2="56" stroke="#1b5e20" stroke-width="2"/>'),
     pieces:m=>[
      {id:'fr',n:'Front Panel',q:'Cut x1 on fold',w:m.hips/4+3,h:m.skirtL+1,s:'skf',t:['fold','grain','notch'],c:'#1b5e20'},
      {id:'bk',n:'Back Panel',q:'Cut x1 on fold',w:m.hips/4+3.5,h:m.skirtL+1.5,s:'skb',t:['fold','grain','notch'],c:'#2e7d32'},
      {id:'wb',n:'Waistband',q:'Cut x1',w:m.waist+2,h:2.5,s:'rect',t:['grain'],c:'#004d40'}]},
    {id:'mini_skirt',name:'Mini',sub:'Above knee',
     icon:dSvg('<defs><linearGradient id="msk_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#e8f5e9"/><stop offset="100%" stop-color="#2e7d32"/></linearGradient></defs><rect x="14" y="4" width="28" height="12" rx="4" fill="#1b5e20" fill-opacity=".4" stroke="#1b5e20" stroke-width="2"/><path d="M14 16 L10 40 L46 40 L42 16 Z" fill="url(#msk_g)" stroke="#2e7d32" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 26 Q28 24 42 26" stroke="white" stroke-width=".9" opacity=".4" fill="none"/><line x1="10" y1="38" x2="46" y2="38" stroke="#1b5e20" stroke-width="2"/>'),
     pieces:m=>[
      {id:'fr',n:'Front Panel',q:'Cut x1 on fold',w:m.hips/4+1,h:m.skirtL*.45+1,s:'skf',t:['fold','grain','notch'],c:'#1b5e20'},
      {id:'bk',n:'Back Panel',q:'Cut x1 on fold',w:m.hips/4+1.25,h:m.skirtL*.45+1.5,s:'skb',t:['fold','grain','notch'],c:'#2e7d32'},
      {id:'wb',n:'Waistband',q:'Cut x1',w:m.waist+2,h:2.5,s:'rect',t:['grain'],c:'#004d40'}]}
  ]},

shorts:{label:'Shorts',tip:'<strong>Rise</strong> and <strong>inseam</strong> determine coverage. Bike shorts need negative ease.',
  chips:['Wide waistband','Fold-over waist','Side pocket','Hidden pocket','Phone pocket','Inner brief','Drawstring','Split hem'],
  sku:'Core Recycled Nylon Spandex OR Synergy Nylon Lycra',
  fields:[{id:'waist',l:'Waist',h:'Natural waist',req:1,def:28,mn:20,mx:52},{id:'hips',l:'Hips',h:'Fullest part',req:1,def:38,mn:28,mx:66},{id:'thigh',l:'Thigh',h:'Upper thigh fullest',req:1,def:24,mn:16,mx:38},{id:'rise',l:'Rise',h:'Waist to crotch front',req:1,def:10,mn:7,mx:16},{id:'inseam',l:'Inseam',h:'Crotch to hem',req:1,def:4,mn:1,mx:16}],
  styles:[
    {id:'biker',name:'Bike Short',sub:'Compression',
     icon:dSvg('<defs><linearGradient id="bik_g" x1="0" y1="0" x2=".3" y2="1"><stop offset="0%" stop-color="#546e7a"/><stop offset="100%" stop-color="#263238"/></linearGradient></defs><rect x="8" y="4" width="40" height="14" rx="5" fill="#37474f" stroke="#263238" stroke-width="2"/><path d="M8 18 L7 40 L22 40 L28 30" fill="url(#bik_g)" stroke="#263238" stroke-width="1.8" stroke-linejoin="round"/><path d="M48 18 L49 40 L34 40 L28 30" fill="url(#bik_g)" stroke="#37474f" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 18 L7 40" stroke="white" stroke-width="1.2" opacity=".2" stroke-linecap="round"/><line x1="7" y1="38" x2="22" y2="38" stroke="#546e7a" stroke-width="2.2"/><line x1="34" y1="38" x2="49" y2="38" stroke="#546e7a" stroke-width="2.2"/>'),
     pieces:m=>[
      {id:'fl',n:'Front L',q:'Cut x1',w:m.hips/4+.75,h:m.rise+m.inseam+1.5,s:'lgf',t:['grain','notch'],c:'#bf360c'},
      {id:'fr',n:'Front R',q:'Cut x1 (mirror)',w:m.hips/4+.75,h:m.rise+m.inseam+1.5,s:'lgf',t:['grain','notch'],c:'#bf360c'},
      {id:'bl',n:'Back L',q:'Cut x1',w:m.hips/4+1.25,h:m.rise+m.inseam+2,s:'lgb',t:['grain','notch'],c:'#e64a19'},
      {id:'br',n:'Back R',q:'Cut x1 (mirror)',w:m.hips/4+1.25,h:m.rise+m.inseam+2,s:'lgb',t:['grain','notch'],c:'#e64a19'},
      {id:'wb',n:'Waistband',q:'Cut x1',w:m.waist+2,h:3,s:'rect',t:['grain'],c:'#bf360c'}]},
    {id:'highwaistedshort',name:'High Waist',sub:'Wide band',
     icon:dSvg('<defs><linearGradient id="hws_g" x1="0" y1="0" x2=".3" y2="1"><stop offset="0%" stop-color="#546e7a"/><stop offset="100%" stop-color="#263238"/></linearGradient></defs><rect x="8" y="2" width="40" height="18" rx="5" fill="#455a64" stroke="#263238" stroke-width="2.2"/><path d="M8 20 L7 38 L22 38 L28 28" fill="url(#hws_g)" stroke="#263238" stroke-width="1.8" stroke-linejoin="round"/><path d="M48 20 L49 38 L34 38 L28 28" fill="url(#hws_g)" stroke="#37474f" stroke-width="1.8" stroke-linejoin="round"/><path d="M10 10 Q28 14 46 10" stroke="white" stroke-width="1" opacity=".3" fill="none"/>'),
     pieces:m=>[
      {id:'fl',n:'Front L',q:'Cut x1',w:m.hips/4+.75,h:m.rise+m.inseam+1.5,s:'lgf',t:['grain','notch'],c:'#bf360c'},
      {id:'fr',n:'Front R',q:'Cut x1 (mirror)',w:m.hips/4+.75,h:m.rise+m.inseam+1.5,s:'lgf',t:['grain','notch'],c:'#bf360c'},
      {id:'bl',n:'Back L',q:'Cut x1',w:m.hips/4+1.25,h:m.rise+m.inseam+2,s:'lgb',t:['grain','notch'],c:'#e64a19'},
      {id:'br',n:'Back R',q:'Cut x1 (mirror)',w:m.hips/4+1.25,h:m.rise+m.inseam+2,s:'lgb',t:['grain','notch'],c:'#e64a19'},
      {id:'wb',n:'High Waistband',q:'Cut x1',w:m.waist+2,h:6,s:'rect',t:['grain'],c:'#bf360c'}]},
    {id:'boardshort',name:'Board Short',sub:'Relaxed fit',
     icon:dSvg('<defs><linearGradient id="bds_g" x1="0" y1="0" x2=".3" y2="1"><stop offset="0%" stop-color="#607d8b"/><stop offset="100%" stop-color="#37474f"/></linearGradient></defs><rect x="8" y="4" width="40" height="14" rx="5" fill="#546e7a" stroke="#37474f" stroke-width="2"/><path d="M8 18 L6 42 L22 42 L28 32" fill="url(#bds_g)" stroke="#37474f" stroke-width="1.8" stroke-linejoin="round"/><path d="M48 18 L50 42 L34 42 L28 32" fill="url(#bds_g)" stroke="#455a64" stroke-width="1.8" stroke-linejoin="round"/><rect x="10" y="24" width="8" height="10" rx="2" fill="none" stroke="white" stroke-width="1.2" opacity=".35"/><line x1="6" y1="40" x2="22" y2="40" stroke="#78909c" stroke-width="2.2"/>'),
     pieces:m=>[
      {id:'fl',n:'Front L',q:'Cut x1',w:m.hips/4+1.25,h:m.rise+m.inseam+2,s:'lgf',t:['grain','notch'],c:'#bf360c'},
      {id:'fr',n:'Front R',q:'Cut x1 (mirror)',w:m.hips/4+1.25,h:m.rise+m.inseam+2,s:'lgf',t:['grain','notch'],c:'#bf360c'},
      {id:'bl',n:'Back L',q:'Cut x1',w:m.hips/4+1.5,h:m.rise+m.inseam+2.5,s:'lgb',t:['grain','notch'],c:'#e64a19'},
      {id:'br',n:'Back R',q:'Cut x1 (mirror)',w:m.hips/4+1.5,h:m.rise+m.inseam+2.5,s:'lgb',t:['grain','notch'],c:'#e64a19'},
      {id:'wb',n:'Waistband',q:'Cut x1',w:m.waist+2,h:3,s:'rect',t:['grain'],c:'#bf360c'}]}
  ]},

lingerie:{label:'Lingerie / Bodysuit',tip:'<strong>Torso girth</strong> determines snap placement. 10&#8209;15% negative ease. Needs 75%+ stretch.',
  chips:['Underwire','Removable padding','Sheer panels','Lace overlay','Satin lining','Snap crotch','Zipper back','Ribbon trim','Boning','Plunge','Demi cup'],
  sku:'Stretch Lace OR Satin-finish Spandex — sensual drape with functional stretch',
  fields:[{id:'bust',l:'Bust',h:'Fullest part',req:1,def:34,mn:24,mx:60},{id:'ubust',l:'Underbust',h:'Below bust',req:1,def:28,mn:20,mx:52},{id:'waist',l:'Waist',h:'Natural waist',req:1,def:28,mn:20,mx:52},{id:'hips',l:'Hips',h:'Fullest part',req:1,def:38,mn:28,mx:66},{id:'torsoG',l:'Torso Girth',h:'Shoulder to crotch to shoulder back',req:1,def:58,mn:46,mx:76},{id:'cup',l:'Cup Size',sel:['AA','A','B','C','D','DD/E','F','G+'],req:1,def:'C'}],
  styles:[
    {id:'bodysuit',name:'Bodysuit',sub:'Snap crotch',
     icon:dSvg('<defs><linearGradient id="bdy_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#fce4ec"/><stop offset="100%" stop-color="#e91e63"/></linearGradient></defs><path d="M20 10 L28 18 L36 10" stroke="#c2185b" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 12 C10 16 10 26 16 30 C20 32 28 30 28 26 L28 12 Z" fill="#f48fb1" fill-opacity=".5" stroke="#c2185b" stroke-width="1.8"/><path d="M40 12 C46 16 46 26 40 30 C36 32 28 30 28 26 L28 12 Z" fill="#f48fb1" fill-opacity=".5" stroke="#c2185b" stroke-width="1.8"/><path d="M16 30 C14 36 14 46 16 52 C18 56 22 58 28 58 C34 58 38 56 40 52 C42 46 42 36 40 30 Z" fill="url(#bdy_g)" stroke="#c2185b" stroke-width="1.8"/><circle cx="24" cy="58" r="2" stroke="#c2185b" stroke-width="1.5" fill="white"/><circle cx="28" cy="58" r="2" stroke="#c2185b" stroke-width="1.5" fill="white"/><circle cx="32" cy="58" r="2" stroke="#c2185b" stroke-width="1.5" fill="white"/>'),
     pieces:m=>[
      {id:'fr',n:'Front Body',q:'Cut x1 on fold',w:m.hips/4+.75,h:m.torsoG/2+.5,s:'suf',t:['fold','grain','notch'],c:'#c2185b'},
      {id:'bk',n:'Back Body',q:'Cut x1 on fold',w:m.hips/4+.75,h:m.torsoG/2-.5,s:'sub',t:['fold','grain','notch'],c:'#e91e63'},
      {id:'cl',n:'Cup Left',q:'Cut x1',w:m.bust/4+cx(m.cup)+.5,h:m.bust/6+cx(m.cup),s:'cup_round',t:['grain','notch'],c:'#880e4f'},
      {id:'cr',n:'Cup Right',q:'Cut x1 (mirror)',w:m.bust/4+cx(m.cup)+.5,h:m.bust/6+cx(m.cup),s:'cup_round',t:['grain','notch'],c:'#880e4f'},
      {id:'gu',n:'Crotch Gusset',q:'Cut x2',w:3,h:4,s:'rect',t:['grain'],c:'#f8bbd0'}]},
    {id:'teddy',name:'Teddy',sub:'Loose cut',
     icon:dSvg('<defs><linearGradient id="ted_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#fce4ec"/><stop offset="100%" stop-color="#f06292"/></linearGradient></defs><path d="M14 10 L28 6 L42 10 L44 28 C44 38 38 46 34 50 C32 52 30 54 28 54 C26 54 24 52 22 50 C18 46 12 38 12 28 Z" fill="url(#ted_g)" stroke="#c2185b" stroke-width="1.8" stroke-linejoin="round"/><path d="M16 10 L10 16 L14 18" stroke="#c2185b" stroke-width="1.8" stroke-linecap="round" fill="none"/><path d="M40 10 L46 16 L42 18" stroke="#c2185b" stroke-width="1.8" stroke-linecap="round" fill="none"/><path d="M20 26 Q28 30 36 26" stroke="white" stroke-width="1" opacity=".5" fill="none"/>'),
     pieces:m=>[
      {id:'fr',n:'Front Body',q:'Cut x1 on fold',w:m.hips/4+1.5,h:m.torsoG/2+1.5,s:'suf',t:['fold','grain','notch'],c:'#c2185b'},
      {id:'bk',n:'Back Body',q:'Cut x1 on fold',w:m.hips/4+1.5,h:m.torsoG/2+.5,s:'sub',t:['fold','grain','notch'],c:'#e91e63'},
      {id:'gu',n:'Crotch Gusset',q:'Cut x2',w:3,h:4,s:'rect',t:['grain'],c:'#f8bbd0'}]}
    ,{id:'chemise',name:'Chemise',sub:'Short slip',
     icon:dSvg('<defs><linearGradient id="dcm" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#f0b8d8"/><stop offset="100%" stop-color="#c02878"/></linearGradient></defs><path d="M26 8 L28 14 L38 14 L40 8 Z" fill="url(#dcm)" stroke="#981e5c" stroke-width="1.5"/><path d="M22 14 C18 20 18 28 20 36 L48 36 C50 28 50 20 46 14 Z" fill="url(#dcm)" stroke="#981e5c" stroke-width="1.7"/><path d="M20 36 L16 52 L52 52 L48 36 Z" fill="url(#dcm)" fill-opacity=".6" stroke="#981e5c" stroke-width="1.5"/>','0 0 68 56'),
     pieces:m=>[
      {id:'fr',n:'Front',q:'Cut x1 on fold',w:m.hips/4+1.5,h:m.torsoG/2+m.torsoG*.15+.75,s:'drf',t:['fold','grain','notch'],c:'#c02878'},
      {id:'bk',n:'Back',q:'Cut x1 on fold',w:m.hips/4+1.5,h:m.torsoG/2+m.torsoG*.15+.75,s:'drb',t:['fold','grain','notch'],c:'#ad1f6b'},
      {id:'st',n:'Spaghetti Strap',q:'Cut x4',w:1,h:m.bust/6+3,s:'rect',t:['grain'],c:'#f48fb1'},
      {id:'lc',n:'Lace Trim',q:'Cut x1',w:m.bust+2,h:2,s:'rect',t:['grain'],c:'#f8bbd9'}
    ]}
    ,{id:'lace_bodysuit',name:'Lace Bodysuit',sub:'All-lace fitted',
     icon:dSvg('<defs><linearGradient id="dlb" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#f0b8d8"/><stop offset="100%" stop-color="#c02878"/></linearGradient></defs><path d="M26 10 C24 14 22 20 22 28 L22 42 C25 46 34 48 34 48 C34 48 43 46 46 42 L46 28 C46 20 44 14 42 10 Z" fill="url(#dlb)" stroke="#981e5c" stroke-width="1.7"/><path d="M28 42 L28 52 L32 52 M40 42 L40 52 L36 52" stroke="#981e5c" stroke-width="1.5" fill="none"/><circle cx="26" cy="10" r="2.5" fill="url(#dlb)" stroke="#981e5c" stroke-width="1.3"/><circle cx="42" cy="10" r="2.5" fill="url(#dlb)" stroke="#981e5c" stroke-width="1.3"/>','0 0 68 56'),
     pieces:m=>[
      {id:'fr',n:'Front Body',q:'Cut x1 on fold',w:m.hips/4+.75,h:m.torsoG/2+.5,s:'suf',t:['fold','grain','notch'],c:'#c02878'},
      {id:'bk',n:'Back Body',q:'Cut x1 on fold',w:m.hips/4+.75,h:m.torsoG/2+.5,s:'sub',t:['fold','grain','notch'],c:'#ad1f6b'},
      {id:'cl',n:'Cup Lining L',q:'Cut x2 mirror',w:m.bust/4+.75,h:m.bust/6+1,s:'tri',t:['grain'],c:'#e91e8c'},
      {id:'gus',n:'Snap Gusset',q:'Cut x2',w:3,h:4.5,s:'rect',t:['grain'],c:'#f48fb1'},
      {id:'st',n:'Strap',q:'Cut x2',w:1,h:m.bust/6+3,s:'rect',t:['grain'],c:'#f8bbd9'}
    ]}
  ]},

costume:{label:'Costume / Couture',tip:'<strong>All measurements critical.</strong> Torso girth connects bodice to skirt. Add boning for structure.',
  chips:['Strapless','Halter','Princess seam','Boning','Underlining','Lining','Bustle','Peplum','Train','Corset lacing','Sequin overlay','Tulle underskirt'],
  sku:'Sequin on Mesh AND Stretch Lace — show-stopping stage presence',
  fields:[{id:'bust',l:'Bust',h:'Fullest part',req:1,def:34,mn:24,mx:60},{id:'waist',l:'Waist',h:'Natural waist',req:1,def:28,mn:20,mx:52},{id:'hips',l:'Hips',h:'Fullest part',req:1,def:38,mn:28,mx:66},{id:'torsoG',l:'Torso Girth',h:'Shoulder to crotch to shoulder back',req:1,def:58,mn:46,mx:76},{id:'shoulder',l:'Shoulder Width',h:'Across back',req:1,def:14,mn:10,mx:20},{id:'armhole',l:'Armhole Depth',h:'Shoulder to underarm',req:1,def:7,mn:4,mx:12},{id:'waistPos',l:'Waist Position',h:'Shoulder to natural waist',req:1,def:15,mn:10,mx:22},{id:'skirtL',l:'Skirt/Leg Length',h:'Waist to hem',req:1,def:28,mn:10,mx:52},{id:'cup',l:'Cup Size',sel:['A','B','C','D','DD/E','F','G+'],req:1,def:'C'}],
  styles:[
    {id:'ballgown',name:'Ball Gown',sub:'Full skirt',
     icon:dSvg('<defs><linearGradient id="bgn_g" x1=".5" y1="0" x2=".5" y2=".5"><stop offset="0%" stop-color="#ef9a9a"/><stop offset="100%" stop-color="#b71c1c"/></linearGradient><linearGradient id="bgn2" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#ffcdd2"/><stop offset="100%" stop-color="#ef9a9a"/></linearGradient></defs><path d="M18 4 L16 16 L40 16 L38 4 C34 2 30 1 28 1 C26 1 22 2 18 4 Z" fill="url(#bgn_g)" stroke="#b71c1c" stroke-width="1.8"/><line x1="14" y1="16" x2="42" y2="16" stroke="#7f0000" stroke-width="2.5"/><path d="M16 16 L4 60 L52 60 L40 16 Z" fill="url(#bgn2)" stroke="#b71c1c" stroke-width="1.8" stroke-linejoin="round"/><path d="M6 36 C16 34 40 34 50 36" stroke="#e57373" stroke-width="1.2" fill="none" opacity=".7"/><path d="M4 52 C14 50 42 50 52 52" stroke="#e57373" stroke-width="1" fill="none" opacity=".5"/>'),
     pieces:m=>[
      {id:'bfl',n:'Bodice Front L',q:'Cut x1',w:m.bust/4+cx(m.cup)+.25,h:m.waistPos+.5,s:'bdf',t:['grain','notch'],c:'#b71c1c'},
      {id:'bfr',n:'Bodice Front R',q:'Cut x1',w:m.bust/4+cx(m.cup)+.25,h:m.waistPos+.5,s:'bdf',t:['grain','notch'],c:'#b71c1c'},
      {id:'bbl',n:'Bodice Back L',q:'Cut x1',w:m.bust/4+.5,h:m.waistPos+.5,s:'bdb',t:['grain','notch'],c:'#c62828'},
      {id:'bbr',n:'Bodice Back R',q:'Cut x1',w:m.bust/4+.5,h:m.waistPos+.5,s:'bdb',t:['grain','notch'],c:'#c62828'},
      {id:'sf',n:'Skirt Front',q:'Cut x1 on fold',w:m.hips/4+3,h:m.skirtL+1,s:'skf',t:['fold','grain'],c:'#b71c1c'},
      {id:'sb',n:'Skirt Back',q:'Cut x1 on fold',w:m.hips/4+3.5,h:m.skirtL+1,s:'skb',t:['fold','grain'],c:'#c62828'},
      {id:'ul',n:'Underlining',q:'Match outer',w:m.bust/2+1,h:m.waistPos+.5,s:'rect',t:['grain'],c:'#ffcdd2'}]},
    {id:'mermaid',name:'Mermaid',sub:'Fitted to flare',
     icon:dSvg('<defs><linearGradient id="mer_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#ef9a9a"/><stop offset="100%" stop-color="#b71c1c"/></linearGradient></defs><path d="M20 4 L18 14 L38 14 L36 4 C32 2 28 1 28 1 C28 1 24 2 20 4 Z" fill="url(#mer_g)" stroke="#b71c1c" stroke-width="1.8"/><path d="M18 14 L16 38 L40 38 L38 14 Z" fill="url(#mer_g)" fill-opacity=".8" stroke="#b71c1c" stroke-width="1.8"/><path d="M16 38 L8 58 L48 58 L40 38 Z" fill="#ef9a9a" fill-opacity=".6" stroke="#b71c1c" stroke-width="1.8" stroke-linejoin="round"/><path d="M20 20 Q28 18 36 20" stroke="white" stroke-width=".9" opacity=".4" fill="none"/><line x1="14" y1="16" x2="42" y2="16" stroke="#7f0000" stroke-width="2"/>'),
     pieces:m=>[
      {id:'bfl',n:'Bodice Front L',q:'Cut x1',w:m.bust/4+cx(m.cup)+.25,h:m.waistPos+.5,s:'bdf',t:['grain','notch'],c:'#b71c1c'},
      {id:'bfr',n:'Bodice Front R',q:'Cut x1',w:m.bust/4+cx(m.cup)+.25,h:m.waistPos+.5,s:'bdf',t:['grain','notch'],c:'#b71c1c'},
      {id:'bbl',n:'Bodice Back L',q:'Cut x1',w:m.bust/4+.5,h:m.waistPos+.5,s:'bdb',t:['grain','notch'],c:'#c62828'},
      {id:'bbr',n:'Bodice Back R',q:'Cut x1',w:m.bust/4+.5,h:m.waistPos+.5,s:'bdb',t:['grain','notch'],c:'#c62828'},
      {id:'sf',n:'Fitted Skirt F',q:'Cut x1 on fold',w:m.hips/4+.5,h:(m.skirtL*.65)+1,s:'skf',t:['fold','grain'],c:'#b71c1c'},
      {id:'sb',n:'Fitted Skirt B',q:'Cut x1 on fold',w:m.hips/4+.75,h:(m.skirtL*.65)+1,s:'skb',t:['fold','grain'],c:'#c62828'},
      {id:'tr',n:'Trumpet Flare',q:'Cut x4',w:m.hips/4+4,h:m.skirtL*.4,s:'drf',t:['grain'],c:'#ef9a9a'}]},
    {id:'jumpsuit',name:'Jumpsuit',sub:'All-in-one',
     icon:dSvg('<defs><linearGradient id="jco_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#ef9a9a"/><stop offset="100%" stop-color="#b71c1c"/></linearGradient></defs><path d="M18 4 L16 16 L40 16 L38 4 C34 2 28 1 28 1 C28 1 22 2 18 4 Z" fill="url(#jco_g)" stroke="#b71c1c" stroke-width="1.8"/><path d="M16 16 L14 30 L26 30 L28 22 Z" fill="url(#jco_g)" stroke="#b71c1c" stroke-width="1.8" stroke-linejoin="round"/><path d="M40 16 L42 30 L30 30 L28 22 Z" fill="url(#jco_g)" stroke="#b71c1c" stroke-width="1.8" stroke-linejoin="round"/><line x1="14" y1="30" x2="42" y2="30" stroke="#7f0000" stroke-width="2"/><path d="M14 30 L12 56 L26 56 L28 42 Z" fill="url(#jco_g)" stroke="#b71c1c" stroke-width="1.8"/><path d="M42 30 L44 56 L30 56 L28 42 Z" fill="url(#jco_g)" stroke="#b71c1c" stroke-width="1.8"/>'),
     pieces:m=>[
      {id:'bfl',n:'Bodice Front L',q:'Cut x1',w:m.bust/4+cx(m.cup)+.25,h:m.waistPos+.5,s:'bdf',t:['grain','notch'],c:'#b71c1c'},
      {id:'bfr',n:'Bodice Front R',q:'Cut x1',w:m.bust/4+cx(m.cup)+.25,h:m.waistPos+.5,s:'bdf',t:['grain','notch'],c:'#b71c1c'},
      {id:'bbl',n:'Bodice Back L',q:'Cut x1',w:m.bust/4+.5,h:m.waistPos+.5,s:'bdb',t:['grain','notch'],c:'#c62828'},
      {id:'bbr',n:'Bodice Back R',q:'Cut x1',w:m.bust/4+.5,h:m.waistPos+.5,s:'bdb',t:['grain','notch'],c:'#c62828'},
      {id:'fll',n:'Front Leg L',q:'Cut x1',w:m.hips/4+.75,h:m.skirtL+1,s:'lgf',t:['grain','notch'],c:'#b71c1c'},
      {id:'flr',n:'Front Leg R',q:'Cut x1 (mirror)',w:m.hips/4+.75,h:m.skirtL+1,s:'lgf',t:['grain','notch'],c:'#b71c1c'},
      {id:'bll',n:'Back Leg L',q:'Cut x1',w:m.hips/4+1.25,h:m.skirtL+1.5,s:'lgb',t:['grain','notch'],c:'#c62828'},
      {id:'blr',n:'Back Leg R',q:'Cut x1 (mirror)',w:m.hips/4+1.25,h:m.skirtL+1.5,s:'lgb',t:['grain','notch'],c:'#c62828'}]}
  ]}
,
wrap_dress:{label:'Wrap Dress',tip:'<strong>Waist position</strong> and <strong>hip measurement</strong> shape the cross-front wrap. Add ease: at least 3" at bust for comfortable overlap.',
  chips:['Deep V wrap','Self-tie belt','Fixed belt','Ruffle hem','Long sleeve','Short sleeve','Cap sleeve','Sleeveless','Midi length','Maxi length','Lined bodice','Flutter sleeve'],
  sku:'Harmony Ultra Soft Double Knit OR Jersey Knit — fluid drape essential for wrap silhouette',
  fields:[
    {id:'bust',l:'Bust',h:'Fullest part',req:1,def:36,mn:24,mx:60},
    {id:'waist',l:'Waist',h:'Natural waist',req:1,def:28,mn:20,mx:52},
    {id:'hips',l:'Hips',h:'Fullest part',req:1,def:38,mn:28,mx:66},
    {id:'shoulder',l:'Shoulder Width',h:'Shoulder to shoulder',req:1,def:14,mn:10,mx:20},
    {id:'frontL',l:'Front Length',h:'Shoulder to hem front',req:1,def:40,mn:24,mx:62},
    {id:'backL',l:'Back Length',h:'Shoulder to hem back',req:1,def:42,mn:24,mx:64},
    {id:'waistPos',l:'Waist Position',h:'Shoulder to natural waist',req:1,def:15,mn:10,mx:22},
    {id:'sleeveL',l:'Sleeve Length',h:'Shoulder to cuff',req:0,def:0,mn:0,mx:24},
    {id:'tieLen',l:'Tie Length',h:'Each belt tie',req:0,def:28,mn:16,mx:44}
  ],
  styles:[
    {id:'shortwrap',name:'Short Sleeve',sub:'Classic wrap',
     icon:dSvg('<defs><linearGradient id="swr_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#e8eaf6"/><stop offset="100%" stop-color="#5e35b1"/></linearGradient></defs><path d="M18 8 L10 16 L12 20 L16 16 Z" fill="#ce93d8" fill-opacity=".6" stroke="#6a1b9a" stroke-width="1.8" stroke-linejoin="round"/><path d="M38 8 L46 16 L44 20 L40 16 Z" fill="#ce93d8" fill-opacity=".6" stroke="#6a1b9a" stroke-width="1.8" stroke-linejoin="round"/><path d="M16 16 L14 56 L30 56 Z" fill="url(#swr_g)" stroke="#4527a0" stroke-width="1.8" stroke-linejoin="round"/><path d="M40 16 L42 56 L26 56 Z" fill="url(#swr_g)" fill-opacity=".7" stroke="#4527a0" stroke-width="1.5" stroke-linejoin="round"/><path d="M18 8 C22 16 34 16 38 8" stroke="#4527a0" stroke-width="2" fill="none"/><line x1="28" y1="14" x2="28" y2="56" stroke="#4527a0" stroke-width="1" stroke-dasharray="2 2" opacity=".6"/>'),
     pieces:m=>[
      {id:'fl',n:'Front Left Panel',q:'Cut x1',w:m.bust/4+2.5,h:m.frontL+1,s:'drf',t:['grain','notch'],c:'#6a1b9a'},
      {id:'fr',n:'Front Right Panel',q:'Cut x1 (mirror)',w:m.bust/4+2.5,h:m.frontL+1,s:'drf',t:['grain','notch'],c:'#6a1b9a'},
      {id:'bk',n:'Back Panel',q:'Cut x1 on fold',w:m.hips/4+1,h:m.backL+1,s:'drb',t:['fold','grain','notch'],c:'#7b1fa2'},
      {id:'sl',n:'Sleeve',q:'Cut x2',w:(m.shoulder||14)/2+3,h:(m.sleeveL||8)+1,s:'lgf',t:['grain','notch'],c:'#4a148c'},
      {id:'ti',n:'Belt Tie',q:'Cut x2',w:2.5,h:m.tieLen||28,s:'rect',t:['grain'],c:'#9c27b0'},
      {id:'nb',n:'Neck Binding',q:'Cut x1',w:m.bust/2+4,h:1.5,s:'rarc',t:['grain'],c:'#9c27b0'}
    ]},
    {id:'sleevlesswrap',name:'Sleeveless',sub:'Minimal wrap',
     icon:dSvg('<defs><linearGradient id="slw_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#e8eaf6"/><stop offset="100%" stop-color="#5e35b1"/></linearGradient></defs><line x1="18" y1="6" x2="16" y2="14" stroke="#6a1b9a" stroke-width="1.8" stroke-linecap="round"/><line x1="38" y1="6" x2="40" y2="14" stroke="#6a1b9a" stroke-width="1.8" stroke-linecap="round"/><path d="M16 14 L14 56 L30 56 Z" fill="url(#slw_g)" stroke="#4527a0" stroke-width="1.8" stroke-linejoin="round"/><path d="M40 14 L42 56 L26 56 Z" fill="url(#slw_g)" fill-opacity=".7" stroke="#4527a0" stroke-width="1.5" stroke-linejoin="round"/><line x1="28" y1="13" x2="28" y2="56" stroke="#4527a0" stroke-width="1" stroke-dasharray="2 2" opacity=".6"/>'),
     pieces:m=>[
      {id:'fl',n:'Front Left Panel',q:'Cut x1',w:m.bust/4+2.5,h:m.frontL+1,s:'drf',t:['grain','notch'],c:'#6a1b9a'},
      {id:'fr',n:'Front Right Panel',q:'Cut x1 (mirror)',w:m.bust/4+2.5,h:m.frontL+1,s:'drf',t:['grain','notch'],c:'#6a1b9a'},
      {id:'bk',n:'Back Panel',q:'Cut x1 on fold',w:m.hips/4+1,h:m.backL+1,s:'drb',t:['fold','grain','notch'],c:'#7b1fa2'},
      {id:'ti',n:'Belt Tie',q:'Cut x2',w:2.5,h:m.tieLen||28,s:'rect',t:['grain'],c:'#9c27b0'},
      {id:'nb',n:'Neck/Arm Binding',q:'Cut x2',w:m.bust/2+4,h:1.5,s:'rarc',t:['grain'],c:'#9c27b0'}
    ]},
    {id:'longwrap',name:'Long Sleeve',sub:'Elegant wrap',
     icon:dSvg('<defs><linearGradient id="lwr_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#e8eaf6"/><stop offset="100%" stop-color="#5e35b1"/></linearGradient></defs><path d="M18 8 L6 20 L10 24 L16 16 Z" fill="#ce93d8" fill-opacity=".6" stroke="#6a1b9a" stroke-width="1.8" stroke-linejoin="round"/><path d="M38 8 L50 20 L46 24 L40 16 Z" fill="#ce93d8" fill-opacity=".6" stroke="#6a1b9a" stroke-width="1.8" stroke-linejoin="round"/><path d="M16 16 L14 56 L30 56 Z" fill="url(#lwr_g)" stroke="#4527a0" stroke-width="1.8" stroke-linejoin="round"/><path d="M40 16 L42 56 L26 56 Z" fill="url(#lwr_g)" fill-opacity=".7" stroke="#4527a0" stroke-width="1.5" stroke-linejoin="round"/><line x1="28" y1="14" x2="28" y2="56" stroke="#4527a0" stroke-width="1" stroke-dasharray="2 2" opacity=".6"/>'),
     pieces:m=>[
      {id:'fl',n:'Front Left Panel',q:'Cut x1',w:m.bust/4+2.5,h:m.frontL+1,s:'drf',t:['grain','notch'],c:'#6a1b9a'},
      {id:'fr',n:'Front Right Panel',q:'Cut x1 (mirror)',w:m.bust/4+2.5,h:m.frontL+1,s:'drf',t:['grain','notch'],c:'#6a1b9a'},
      {id:'bk',n:'Back Panel',q:'Cut x1 on fold',w:m.hips/4+1,h:m.backL+1,s:'drb',t:['fold','grain','notch'],c:'#7b1fa2'},
      {id:'sl',n:'Long Sleeve',q:'Cut x2',w:(m.shoulder||14)/2+3,h:(m.sleeveL||22)+1,s:'lgf',t:['grain','notch'],c:'#4a148c'},
      {id:'ti',n:'Belt Tie',q:'Cut x2',w:2.5,h:m.tieLen||28,s:'rect',t:['grain'],c:'#9c27b0'},
      {id:'nb',n:'Neck Binding',q:'Cut x1',w:m.bust/2+4,h:1.5,s:'rarc',t:['grain'],c:'#9c27b0'}
    ]},
    {id:'flutterwrap',name:'Flutter Sleeve',sub:'Romantic drape',
     icon:dSvg('<defs><linearGradient id="flw_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#e8eaf6"/><stop offset="100%" stop-color="#5e35b1"/></linearGradient></defs><path d="M16 14 C10 10 6 16 10 22 L16 18 Z" fill="#ce93d8" fill-opacity=".7" stroke="#6a1b9a" stroke-width="1.8" stroke-linejoin="round"/><path d="M40 14 C46 10 50 16 46 22 L40 18 Z" fill="#ce93d8" fill-opacity=".7" stroke="#6a1b9a" stroke-width="1.8" stroke-linejoin="round"/><path d="M16 18 L14 56 L30 56 Z" fill="url(#flw_g)" stroke="#4527a0" stroke-width="1.8" stroke-linejoin="round"/><path d="M40 18 L42 56 L26 56 Z" fill="url(#flw_g)" fill-opacity=".7" stroke="#4527a0" stroke-width="1.5" stroke-linejoin="round"/><line x1="28" y1="14" x2="28" y2="56" stroke="#4527a0" stroke-width="1" stroke-dasharray="2 2" opacity=".6"/>'),
     pieces:m=>[
      {id:'fl',n:'Front Left Panel',q:'Cut x1',w:m.bust/4+2.5,h:m.frontL+1,s:'drf',t:['grain','notch'],c:'#6a1b9a'},
      {id:'fr',n:'Front Right Panel',q:'Cut x1 (mirror)',w:m.bust/4+2.5,h:m.frontL+1,s:'drf',t:['grain','notch'],c:'#6a1b9a'},
      {id:'bk',n:'Back Panel',q:'Cut x1 on fold',w:m.hips/4+1,h:m.backL+1,s:'drb',t:['fold','grain','notch'],c:'#7b1fa2'},
      {id:'fs',n:'Flutter Sleeve',q:'Cut x4 on bias',w:(m.shoulder||14)/2+4,h:5,s:'skf',t:['grain'],c:'#9c27b0'},
      {id:'ti',n:'Belt Tie',q:'Cut x2',w:2.5,h:m.tieLen||28,s:'rect',t:['grain'],c:'#9c27b0'},
      {id:'nb',n:'Neck Binding',q:'Cut x1',w:m.bust/2+4,h:1.5,s:'rarc',t:['grain'],c:'#9c27b0'}
    ]}
  ]},

rash_guard:{label:'Rash Guard / Swim Top',tip:'<strong>Chest and torso length</strong> are key. Use 0–5% negative ease for fitted. Needs 60%+ stretch. UPF fabric recommended.',
  chips:['Long sleeve UPF 50+','Short sleeve','Tank','Zip front','Mock neck','Round neck','Flat lock seams','Thumb holes','Built-in bra','Chest panel','Side panels','Printed panels'],
  sku:'Synergy Nylon Lycra — chlorine-resistant, colour-fast, ideal for swim & surf',
  fields:[
    {id:'bust',l:'Chest / Bust',h:'Fullest part',req:1,def:34,mn:24,mx:60},
    {id:'waist',l:'Waist',h:'At hem',req:1,def:30,mn:22,mx:54},
    {id:'shoulder',l:'Shoulder Width',h:'Shoulder to shoulder',req:1,def:14,mn:10,mx:20},
    {id:'armhole',l:'Armhole Depth',h:'Shoulder to underarm',req:1,def:8,mn:5,mx:14},
    {id:'frontL',l:'Front Length',h:'Shoulder to hem',req:1,def:22,mn:14,mx:34},
    {id:'backL',l:'Back Length',h:'Shoulder to hem back',req:1,def:24,mn:14,mx:36},
    {id:'sleeveL',l:'Sleeve Length',h:'Shoulder to cuff',req:0,def:22,mn:0,mx:26},
    {id:'sleeveW',l:'Sleeve Width',h:'Bicep circumference',req:0,def:13,mn:8,mx:22}
  ],
  styles:[
    {id:'longsleeve_rg',name:'Long Sleeve',sub:'UPF 50+ coverage',
     icon:dSvg('<defs><linearGradient id="lrg_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#e3f2fd"/><stop offset="100%" stop-color="#0277bd"/></linearGradient></defs><path d="M20 6 L12 14 L6 36 L14 38 L18 22 L22 12 Z" fill="url(#lrg_g)" stroke="#01579b" stroke-width="1.8" stroke-linejoin="round"/><path d="M36 6 L44 14 L50 36 L42 38 L38 22 L34 12 Z" fill="url(#lrg_g)" stroke="#01579b" stroke-width="1.8" stroke-linejoin="round"/><path d="M22 12 L20 44 L36 44 L34 12 Z" fill="url(#lrg_g)" stroke="#01579b" stroke-width="1.8" stroke-linejoin="round"/><path d="M20 6 C22 2 34 2 36 6" stroke="#01579b" stroke-width="2.2" fill="none" stroke-linecap="round"/><line x1="28" y1="6" x2="28" y2="26" stroke="#0288d1" stroke-width="1.5" stroke-dasharray="2 2"/>'),
     pieces:m=>[
      {id:'fr',n:'Front Body',q:'Cut x1 on fold',w:m.bust/2+.75,h:m.frontL+.75,s:'tpf',t:['fold','grain','notch'],c:'#01579b'},
      {id:'bk',n:'Back Body',q:'Cut x1 on fold',w:m.bust/2+.75,h:m.backL+.75,s:'tpb',t:['fold','grain','notch'],c:'#0277bd'},
      {id:'slL',n:'Sleeve Left',q:'Cut x1',w:(m.sleeveW||13)/2+.5,h:(m.sleeveL||22)+1,s:'lgf',t:['grain','notch'],c:'#01579b'},
      {id:'slR',n:'Sleeve Right',q:'Cut x1 (mirror)',w:(m.sleeveW||13)/2+.5,h:(m.sleeveL||22)+1,s:'lgf',t:['grain','notch'],c:'#01579b'},
      {id:'cf',n:'Cuff',q:'Cut x2',w:(m.sleeveW||13)+1,h:2.5,s:'rect',t:['grain'],c:'#0288d1'},
      {id:'nb',n:'Neck Binding',q:'Cut x1',w:m.bust/2+2,h:1.25,s:'rarc',t:['grain'],c:'#0288d1'},
      {id:'hm',n:'Hem Band',q:'Cut x1',w:m.bust+1,h:2,s:'rect',t:['grain'],c:'#0288d1'}
    ]},
    {id:'shortsleeve_rg',name:'Short Sleeve',sub:'Classic surf top',
     icon:dSvg('<defs><linearGradient id="srg_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#e3f2fd"/><stop offset="100%" stop-color="#0277bd"/></linearGradient></defs><path d="M20 8 L12 18 L16 22 L20 14 Z" fill="url(#srg_g)" stroke="#01579b" stroke-width="1.8" stroke-linejoin="round"/><path d="M36 8 L44 18 L40 22 L36 14 Z" fill="url(#srg_g)" stroke="#01579b" stroke-width="1.8" stroke-linejoin="round"/><path d="M20 14 L18 44 L38 44 L36 14 Z" fill="url(#srg_g)" stroke="#01579b" stroke-width="1.8" stroke-linejoin="round"/><path d="M20 8 C22 4 34 4 36 8" stroke="#01579b" stroke-width="2" fill="none" stroke-linecap="round"/><line x1="28" y1="8" x2="28" y2="26" stroke="#0288d1" stroke-width="1.5" stroke-dasharray="2 2"/>'),
     pieces:m=>[
      {id:'fr',n:'Front Body',q:'Cut x1 on fold',w:m.bust/2+.75,h:m.frontL+.75,s:'tpf',t:['fold','grain','notch'],c:'#01579b'},
      {id:'bk',n:'Back Body',q:'Cut x1 on fold',w:m.bust/2+.75,h:m.backL+.75,s:'tpb',t:['fold','grain','notch'],c:'#0277bd'},
      {id:'slL',n:'Sleeve Left',q:'Cut x1',w:(m.sleeveW||13)/2+.5,h:(m.sleeveL||8)+1,s:'lgf',t:['grain','notch'],c:'#01579b'},
      {id:'slR',n:'Sleeve Right',q:'Cut x1 (mirror)',w:(m.sleeveW||13)/2+.5,h:(m.sleeveL||8)+1,s:'lgf',t:['grain','notch'],c:'#01579b'},
      {id:'nb',n:'Neck Binding',q:'Cut x1',w:m.bust/2+2,h:1.25,s:'rarc',t:['grain'],c:'#0288d1'},
      {id:'hm',n:'Hem Band',q:'Cut x1',w:m.bust+1,h:2,s:'rect',t:['grain'],c:'#0288d1'}
    ]},
    {id:'tank_rg',name:'Tank / Vest',sub:'No sleeve',
     icon:dSvg('<defs><linearGradient id="trg_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#e3f2fd"/><stop offset="100%" stop-color="#0288d1"/></linearGradient></defs><line x1="20" y1="6" x2="18" y2="12" stroke="#01579b" stroke-width="1.8" stroke-linecap="round"/><line x1="36" y1="6" x2="38" y2="12" stroke="#01579b" stroke-width="1.8" stroke-linecap="round"/><path d="M18 12 C22 18 34 18 38 12" stroke="#01579b" stroke-width="2" fill="none"/><path d="M18 12 L16 46 L40 46 L38 12 Z" fill="url(#trg_g)" stroke="#01579b" stroke-width="1.8" stroke-linejoin="round"/><path d="M18 30 Q28 27 38 30" stroke="white" stroke-width=".9" opacity=".4" fill="none"/>'),
     pieces:m=>[
      {id:'fr',n:'Front Body',q:'Cut x1 on fold',w:m.bust/2+.75,h:m.frontL+.75,s:'tpf',t:['fold','grain','notch'],c:'#01579b'},
      {id:'bk',n:'Back Body',q:'Cut x1 on fold',w:m.bust/2+.75,h:m.backL+.75,s:'tpb',t:['fold','grain','notch'],c:'#0277bd'},
      {id:'nb',n:'Neck Binding',q:'Cut x1',w:m.bust/2+2,h:1.25,s:'rarc',t:['grain'],c:'#0288d1'},
      {id:'ab',n:'Armhole Binding',q:'Cut x2',w:(m.armhole||8)*2+1,h:1.25,s:'rect',t:['grain'],c:'#0288d1'},
      {id:'hm',n:'Hem Band',q:'Cut x1',w:m.bust+1,h:2,s:'rect',t:['grain'],c:'#0288d1'}
    ]},
    {id:'zip_rg',name:'Zip Front',sub:'Easy on / off',
     icon:dSvg('<defs><linearGradient id="zrg_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#e3f2fd"/><stop offset="100%" stop-color="#0277bd"/></linearGradient></defs><path d="M20 6 L12 14 L6 38 L14 40 L18 22 L22 12 Z" fill="url(#zrg_g)" stroke="#01579b" stroke-width="1.8" stroke-linejoin="round"/><path d="M36 6 L44 14 L50 38 L42 40 L38 22 L34 12 Z" fill="url(#zrg_g)" stroke="#01579b" stroke-width="1.8" stroke-linejoin="round"/><path d="M22 12 L20 44 L36 44 L34 12 Z" fill="url(#zrg_g)" stroke="#01579b" stroke-width="1.8"/><path d="M20 6 C22 2 34 2 36 6" stroke="#01579b" stroke-width="2" fill="none"/><line x1="28" y1="6" x2="28" y2="44" stroke="#0277bd" stroke-width="2" stroke-linecap="round"/><rect x="26" y="16" width="4" height="6" rx="1" fill="#0277bd" opacity=".7"/>'),
     pieces:m=>[
      {id:'fl',n:'Front Left',q:'Cut x1',w:m.bust/4+.75,h:m.frontL+.75,s:'tpf',t:['grain','notch'],c:'#01579b'},
      {id:'fr',n:'Front Right',q:'Cut x1 (mirror)',w:m.bust/4+.75,h:m.frontL+.75,s:'tpf',t:['grain','notch'],c:'#01579b'},
      {id:'bk',n:'Back Body',q:'Cut x1 on fold',w:m.bust/2+.75,h:m.backL+.75,s:'tpb',t:['fold','grain','notch'],c:'#0277bd'},
      {id:'slL',n:'Sleeve Left',q:'Cut x1',w:(m.sleeveW||13)/2+.5,h:(m.sleeveL||22)+1,s:'lgf',t:['grain','notch'],c:'#01579b'},
      {id:'slR',n:'Sleeve Right',q:'Cut x1 (mirror)',w:(m.sleeveW||13)/2+.5,h:(m.sleeveL||22)+1,s:'lgf',t:['grain','notch'],c:'#01579b'},
      {id:'fp',n:'Front Placket',q:'Cut x2',w:2,h:m.frontL+.75,s:'rect',t:['grain'],c:'#0288d1'},
      {id:'cf',n:'Cuff',q:'Cut x2',w:(m.sleeveW||13)+1,h:2.5,s:'rect',t:['grain'],c:'#0288d1'},
      {id:'hm',n:'Hem Band',q:'Cut x1',w:m.bust+1,h:2,s:'rect',t:['grain'],c:'#0288d1'}
    ]}
  ]},
jumpsuit:{label:'Jumpsuit',tip:'<strong>Torso girth</strong> shoulder-to-crotch-to-shoulder is the critical measurement. Inseam and thigh determine the leg fit.',
  chips:['Sleeveless','Short sleeve','Long sleeve','Wide leg','Tapered leg','Utility pockets','Elastic waist','Zipper front'],
  sku:'Harmony Double Knit OR Recycled Nylon Spandex — fluid drape with stretch',
  fields:[
    {id:'bust',l:'Bust',req:1,def:34,mn:24,mx:60},
    {id:'waist',l:'Waist',req:1,def:28,mn:20,mx:52},
    {id:'hips',l:'Hips',req:1,def:38,mn:28,mx:66},
    {id:'torsoG',l:'Torso Girth *',h:'Shoulder to crotch to shoulder back',req:1,def:58,mn:46,mx:76},
    {id:'torsoF',l:'Torso Front',h:'Shoulder to crotch front',req:1,def:29,mn:22,mx:38},
    {id:'inseam',l:'Inseam',h:'Crotch to ankle',req:1,def:28,mn:18,mx:38},
    {id:'thigh',l:'Thigh',req:1,def:24,mn:16,mx:38}
  ,{id:'rise',l:'Rise',h:'Waist to crotch, seated',req:0,def:10,mn:7,mx:14}],
  styles:[
    {id:'sleeveless_jump',name:'Sleeveless',sub:'Classic column',
     icon:dSvg('<defs><linearGradient id="slj_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#dcedc8"/><stop offset="100%" stop-color="#33691e"/></linearGradient></defs><path d="M20 6 L18 14 L12 18 L14 26 L16 34 L28 36 L40 34 L42 26 L44 18 L38 14 L36 6 Z" fill="url(#slj_g)" stroke="#33691e" stroke-width="1.8"/><path d="M20 6 C22 12 34 12 36 6" stroke="#1b5e20" stroke-width="2" fill="none"/><path d="M16 34 L14 56 L22 56 L28 38" fill="url(#slj_g)" stroke="#33691e" stroke-width="1.8" stroke-linejoin="round"/><path d="M40 34 L42 56 L34 56 L28 38" fill="url(#slj_g)" stroke="#33691e" stroke-width="1.8" stroke-linejoin="round"/>'),
     pieces:m=>[
       {id:'fr',n:'Front Bodice',q:'Cut x1 on fold',w:m.hips/4+.75,h:m.torsoF*.45+.5,s:'tpf',t:['fold','grain','notch'],c:'#2e7d32'},
       {id:'bk',n:'Back Bodice',q:'Cut x1 on fold',w:m.hips/4+.75,h:(m.torsoG-m.torsoF)*.45+.5,s:'tpb',t:['fold','grain','notch'],c:'#388e3c'},
       {id:'fll',n:'Front Leg L',q:'Cut x1',w:m.thigh/2+.75,h:m.inseam+(m.torsoF*.55)+1.5,s:'lgf',t:['grain','notch'],c:'#2e7d32'},
       {id:'flr',n:'Front Leg R',q:'Cut x1 (mirror)',w:m.thigh/2+.75,h:m.inseam+(m.torsoF*.55)+1.5,s:'lgf',t:['grain','notch'],c:'#2e7d32'},
       {id:'bll',n:'Back Leg L',q:'Cut x1',w:m.thigh/2+1.25,h:m.inseam+((m.torsoG-m.torsoF)*.55)+2,s:'lgb',t:['grain','notch'],c:'#388e3c'},
       {id:'blr',n:'Back Leg R',q:'Cut x1 (mirror)',w:m.thigh/2+1.25,h:m.inseam+((m.torsoG-m.torsoF)*.55)+2,s:'lgb',t:['grain','notch'],c:'#388e3c'}
     ]},
    {id:'belted_jump',name:'Wide-Leg',sub:'Belted waist',
     icon:dSvg('<defs><linearGradient id="bej_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#dcedc8"/><stop offset="100%" stop-color="#33691e"/></linearGradient></defs><path d="M20 6 L18 20 L38 20 L36 6 C32 4 28 3 28 3 C28 3 24 4 20 6 Z" fill="url(#bej_g)" stroke="#33691e" stroke-width="1.8"/><rect x="16" y="20" width="24" height="6" rx="3" fill="#1b5e20" fill-opacity=".5" stroke="#1b5e20" stroke-width="1.5"/><path d="M16 26 L12 56 L22 56 L28 40" fill="url(#bej_g)" stroke="#33691e" stroke-width="1.8" stroke-linejoin="round"/><path d="M40 26 L44 56 L34 56 L28 40" fill="url(#bej_g)" stroke="#33691e" stroke-width="1.8" stroke-linejoin="round"/>'),
     pieces:m=>[
       {id:'fr',n:'Front Bodice',q:'Cut x1 on fold',w:m.bust/4+.5,h:m.torsoF*.42+.5,s:'tpf',t:['fold','grain','notch'],c:'#2e7d32'},
       {id:'bk',n:'Back Bodice',q:'Cut x1 on fold',w:m.bust/4+.5,h:(m.torsoG-m.torsoF)*.42+.5,s:'tpb',t:['fold','grain'],c:'#388e3c'},
       {id:'fll',n:'Front Wide Leg L',q:'Cut x1',w:m.hips/4+2.5,h:m.inseam+(m.torsoF*.58)+1.5,s:'lgf',t:['grain','notch'],c:'#2e7d32'},
       {id:'flr',n:'Front Wide Leg R',q:'Cut x1 (mirror)',w:m.hips/4+2.5,h:m.inseam+(m.torsoF*.58)+1.5,s:'lgf',t:['grain','notch'],c:'#2e7d32'},
       {id:'bll',n:'Back Wide Leg L',q:'Cut x1',w:m.hips/4+3,h:m.inseam+((m.torsoG-m.torsoF)*.58)+2,s:'lgb',t:['grain','notch'],c:'#388e3c'},
       {id:'blr',n:'Back Wide Leg R',q:'Cut x1 (mirror)',w:m.hips/4+3,h:m.inseam+((m.torsoG-m.torsoF)*.58)+2,s:'lgb',t:['grain','notch'],c:'#388e3c'},
       {id:'bl',n:'Belt',q:'Cut x1',w:m.waist+3,h:3.5,s:'rect',t:['grain'],c:'#1b5e20'}
     ]}
    ,{id:'strapless_jump',name:'Strapless',sub:'Off-shoulder',
     icon:dSvg('<defs><linearGradient id="dsj" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#ffd88a"/><stop offset="100%" stop-color="#d89018"/></linearGradient></defs><line x1="12" y1="16" x2="44" y2="16" stroke="#a87010" stroke-width="2.2"/><path d="M12 16 L12 30 L44 30 L44 16 Z" fill="url(#dsj)" stroke="#a87010" stroke-width="1.7"/><path d="M12 30 L34 60 L34 42 L33 42 L34 60 L22 60 C20 52 18 42 12 30 Z" fill="url(#dsj)" stroke="#a87010" stroke-width="1.7"/>','0 0 56 64'),
     pieces:m=>[
      {id:'fr',n:'Front Bodice',q:'Cut x1 on fold',w:m.bust/4+.75,h:m.torsoF*.42+.5,s:'suf',t:['fold','grain','notch'],c:'#d89018'},
      {id:'bk',n:'Back Bodice',q:'Cut x1 on fold',w:m.bust/4+.75,h:(m.torsoG-m.torsoF)*.42+.5,s:'sub',t:['fold','grain','notch'],c:'#c07810'},
      {id:'el',n:'Top Elastic',q:'Cut x1',w:m.bust+2,h:1.5,s:'rect',t:['grain'],c:'#a87010'},
      {id:'lfp',n:'Left Front Pant',q:'Cut x2 mirror',w:m.hips/4+1.5,h:m.inseam+m.rise*.8+.5,s:'lgf',t:['grain','notch'],c:'#d89018'},
      {id:'lbp',n:'Left Back Pant',q:'Cut x2 mirror',w:m.hips/4+2,h:m.inseam+m.rise+.5,s:'lgb',t:['grain','notch'],c:'#c07810'},
      {id:'gu',n:'Crotch Gusset',q:'Cut x1',w:3.5,h:5.5,s:'rect',t:['grain'],c:'#ffd54f'}
    ]}
    ,{id:'midi_jump',name:'Midi Jumpsuit',sub:'Belted midi length',
     icon:dSvg('<defs><linearGradient id="dmj" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#ffd88a"/><stop offset="100%" stop-color="#d89018"/></linearGradient></defs><path d="M27 8 L34 6 L41 8 C43 16 43 24 41 30 L42 36 C42 44 41 52 40 58 L36 58 L34 40 L32 40 L30 58 L26 58 C25 52 24 44 24 36 L25 30 C23 24 23 16 27 8 Z" fill="url(#dmj)" stroke="#a87010" stroke-width="1.7"/><line x1="23" y1="28" x2="43" y2="28" stroke="#a87010" stroke-width="2.2"/><rect x="30" y="26" width="8" height="4" rx="1" fill="#a87010" opacity=".5"/>','0 0 68 62'),
     pieces:m=>[
      {id:'fr',n:'Front Bodice',q:'Cut x1 on fold',w:m.bust/4+.5,h:m.torsoF*.42+.5,s:'tpf',t:['fold','grain','notch'],c:'#d89018'},
      {id:'bk',n:'Back Bodice',q:'Cut x1 on fold',w:m.bust/4+.5,h:(m.torsoG-m.torsoF)*.42+.5,s:'tpb',t:['fold','grain','notch'],c:'#c07810'},
      {id:'belt',n:'Belt',q:'Cut x1',w:m.waist+4,h:2.5,s:'rect',t:['grain'],c:'#a87010'},
      {id:'lfp',n:'Left Front Pant',q:'Cut x2 mirror',w:m.hips/4+2,h:m.inseam*.7+m.rise*.8+.5,s:'lgf',t:['grain','notch'],c:'#d89018'},
      {id:'lbp',n:'Left Back Pant',q:'Cut x2 mirror',w:m.hips/4+2.5,h:m.inseam*.7+m.rise+.5,s:'lgb',t:['grain','notch'],c:'#c07810'},
      {id:'gu',n:'Crotch Gusset',q:'Cut x1',w:3.5,h:5.5,s:'rect',t:['grain'],c:'#ffd54f'}
    ]}
  ]},
swim_dress:{label:'Swim Dress',tip:'<strong>Hip</strong> and <strong>dress length</strong> determine the skirt flare. Use chlorine-resistant stretch fabric with UPF rating.',
  chips:['Built-in brief','Underwire','Tummy panel','Ruffled skirt','Bandeau top','Halter neck','Side gathering'],
  sku:'Synergy Nylon Lycra — 70 colors, chlorine-resistant, 4-way stretch',
  fields:[
    {id:'bust',l:'Bust',req:1,def:36,mn:24,mx:60},
    {id:'waist',l:'Waist',req:1,def:30,mn:22,mx:54},
    {id:'hips',l:'Hips',req:1,def:40,mn:28,mx:68},
    {id:'torsoG',l:'Torso Girth *',h:'Shoulder to crotch to shoulder back',req:1,def:58,mn:46,mx:76},
    {id:'torsoF',l:'Torso Front',h:'Shoulder to crotch front',req:1,def:29,mn:22,mx:38},
    {id:'dressL',l:'Dress Length',h:'Shoulder to hem',req:1,def:34,mn:24,mx:52}
  ],
  styles:[
    {id:'tank_swim_dress',name:'Tank Style',sub:'Built-in brief',
     icon:dSvg('<defs><linearGradient id="tsd_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#b2dfdb"/><stop offset="100%" stop-color="#00695c"/></linearGradient></defs><path d="M20 8 C16 10 12 16 12 22 L12 30 L44 30 L44 22 C44 16 40 10 36 8 Z" fill="url(#tsd_g)" stroke="#00695c" stroke-width="1.8"/><line x1="22" y1="8" x2="20" y2="4" stroke="#004d40" stroke-width="1.8" stroke-linecap="round"/><line x1="34" y1="8" x2="36" y2="4" stroke="#004d40" stroke-width="1.8" stroke-linecap="round"/><line x1="10" y1="30" x2="46" y2="30" stroke="#004d40" stroke-width="2"/><path d="M12 30 L6 56 L50 56 L44 30 Z" fill="url(#tsd_g)" fill-opacity=".6" stroke="#00695c" stroke-width="1.8" stroke-linejoin="round"/>'),
     pieces:m=>[
       {id:'fb',n:'Front Bodice',q:'Cut x1 on fold',w:m.bust/4+.75,h:m.torsoF*.48+.75,s:'suf',t:['fold','grain','notch'],c:'#00695c'},
       {id:'bb',n:'Back Bodice',q:'Cut x1 on fold',w:m.bust/4+.75,h:(m.torsoG-m.torsoF)*.48+.75,s:'sub',t:['fold','grain','notch'],c:'#00796b'},
       {id:'fs',n:'Front Skirt',q:'Cut x1 on fold',w:m.hips/4+2,h:m.dressL-(m.torsoF*.48)+1,s:'drf',t:['fold','grain'],c:'#00695c'},
       {id:'bs',n:'Back Skirt',q:'Cut x1 on fold',w:m.hips/4+2.5,h:m.dressL-((m.torsoG-m.torsoF)*.48)+1,s:'drb',t:['fold','grain'],c:'#00796b'},
       {id:'br',n:'Brief Front',q:'Cut x1 on fold',w:m.hips/4+.5,h:7,s:'brif',t:['fold','grain','notch'],c:'#004d40'},
       {id:'brbk',n:'Brief Back',q:'Cut x1 on fold',w:m.hips/4+.5,h:5.5,s:'brib',t:['fold','grain','notch'],c:'#004d40'},
       {id:'gu',n:'Crotch Gusset',q:'Cut x2',w:3,h:5,s:'rect',t:['grain'],c:'var(--ok-bg)'}
     ]},
    {id:'ruffle_swim',name:'Ruffled Skirt',sub:'Playful flare',
     icon:dSvg('<defs><linearGradient id="rsw_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#b2dfdb"/><stop offset="100%" stop-color="#00695c"/></linearGradient></defs><path d="M20 8 C16 10 12 16 12 22 L12 30 L44 30 L44 22 C44 16 40 10 36 8 Z" fill="url(#rsw_g)" stroke="#00695c" stroke-width="1.8"/><line x1="10" y1="30" x2="46" y2="30" stroke="#004d40" stroke-width="2"/><path d="M8 30 L4 56 L52 56 L48 30 Z" fill="url(#rsw_g)" fill-opacity=".55" stroke="#00695c" stroke-width="1.8"/><path d="M6 42 C14 46 42 46 50 42" stroke="#00695c" stroke-width="1.5" fill="none" opacity=".7"/><line x1="20" y1="8" x2="18" y2="4" stroke="#004d40" stroke-width="1.8" stroke-linecap="round"/><line x1="36" y1="8" x2="38" y2="4" stroke="#004d40" stroke-width="1.8" stroke-linecap="round"/>'),
     pieces:m=>[
       {id:'fb',n:'Front Bodice',q:'Cut x1 on fold',w:m.bust/4+.75,h:m.torsoF*.48+.75,s:'suf',t:['fold','grain','notch'],c:'#00695c'},
       {id:'bb',n:'Back Bodice',q:'Cut x1 on fold',w:m.bust/4+.75,h:(m.torsoG-m.torsoF)*.48+.75,s:'sub',t:['fold','grain','notch'],c:'#00796b'},
       {id:'fs',n:'Front Skirt',q:'Cut x1 on fold',w:m.hips/4+3.5,h:m.dressL-(m.torsoF*.48)+1,s:'drf',t:['fold','grain'],c:'#00695c'},
       {id:'bs',n:'Back Skirt',q:'Cut x1 on fold',w:m.hips/4+4,h:m.dressL-((m.torsoG-m.torsoF)*.48)+1,s:'drb',t:['fold','grain'],c:'#00796b'},
       {id:'rf',n:'Ruffle Strip',q:'Cut x3',w:m.hips/2+8,h:4.5,s:'rect',t:['grain'],c:'var(--ok-bg)'},
       {id:'gu',n:'Crotch Gusset',q:'Cut x2',w:3,h:5,s:'rect',t:['grain'],c:'#004d40'}
     ]}
    ,{id:'halter_swim',name:'Halter Swim',sub:'Halter neck',
     icon:dSvg('<defs><linearGradient id="hsw_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#7fd6b8"/><stop offset="100%" stop-color="#1a9668"/></linearGradient></defs><path d="M28 4 L22 14 L14 22 L14 30 L42 30 L42 22 L34 14 L28 4 Z" fill="url(#hsw_g)" stroke="#0c6e4a" stroke-width="1.8"/><path d="M14 30 L8 54 L48 54 L42 30 Z" fill="url(#hsw_g)" fill-opacity=".6" stroke="#0c6e4a" stroke-width="1.8"/>','0 0 56 58'),
     pieces:m=>[
       {id:'fb',n:'Front Bodice',q:'Cut x1 on fold',w:m.bust/4+.75,h:m.torsoF*.48+.75,s:'suf',t:['fold','grain','notch'],c:'#00695c'},
       {id:'bb',n:'Back Bodice',q:'Cut x1 on fold',w:m.bust/4+.75,h:(m.torsoG-m.torsoF)*.48+.75,s:'sub',t:['fold','grain','notch'],c:'#00796b'},
       {id:'ht',n:'Halter Tie',q:'Cut x2',w:m.bust/4+2,h:2,s:'rect',t:['grain'],c:'var(--ok-bg)'},
       {id:'fs',n:'Front Skirt',q:'Cut x1 on fold',w:m.hips/4+2.5,h:m.dressL-(m.torsoF*.48)+1,s:'drf',t:['fold','grain'],c:'#00695c'},
       {id:'bs',n:'Back Skirt',q:'Cut x1 on fold',w:m.hips/4+2.5,h:m.dressL-((m.torsoG-m.torsoF)*.48)+1,s:'drb',t:['fold','grain'],c:'#00796b'},
       {id:'gu',n:'Crotch Gusset',q:'Cut x2',w:3,h:5,s:'rect',t:['grain'],c:'#004d40'}
     ]}
    ,{id:'bandeau_swim',name:'Bandeau Swim',sub:'Strapless bodice',
     icon:dSvg('<defs><linearGradient id="bsw_g" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#7fd6b8"/><stop offset="100%" stop-color="#1a9668"/></linearGradient></defs><line x1="10" y1="14" x2="46" y2="14" stroke="#004d40" stroke-width="2.2"/><rect x="10" y="14" width="36" height="16" fill="url(#bsw_g)" stroke="#0c6e4a" stroke-width="1.8"/><path d="M10 30 L6 54 L50 54 L46 30 Z" fill="url(#bsw_g)" fill-opacity=".6" stroke="#0c6e4a" stroke-width="1.8"/>','0 0 56 58'),
     pieces:m=>[
       {id:'fb',n:'Front Bandeau',q:'Cut x1 on fold',w:m.bust/4+.75,h:m.torsoF*.42+.75,s:'suf',t:['fold','grain','notch'],c:'#00695c'},
       {id:'bb',n:'Back Bandeau',q:'Cut x1 on fold',w:m.bust/4+.75,h:(m.torsoG-m.torsoF)*.42+.75,s:'sub',t:['fold','grain','notch'],c:'#00796b'},
       {id:'el',n:'Elastic Channel',q:'Cut x1',w:m.bust+2,h:1.5,s:'rect',t:['grain'],c:'#004d40'},
       {id:'fs',n:'Front Skirt',q:'Cut x1 on fold',w:m.hips/4+3,h:m.dressL-(m.torsoF*.42)+1,s:'drf',t:['fold','grain'],c:'#00695c'},
       {id:'bs',n:'Back Skirt',q:'Cut x1 on fold',w:m.hips/4+3,h:m.dressL-((m.torsoG-m.torsoF)*.42)+1,s:'drb',t:['fold','grain'],c:'#00796b'},
       {id:'gu',n:'Crotch Gusset',q:'Cut x2',w:3,h:5,s:'rect',t:['grain'],c:'#004d40'}
     ]}
  ]}
,
biker_shorts:{label:'Biker Shorts',tip:'<strong>Waist</strong> sets the waistband. <strong>Inseam</strong> determines the length — typically 4-7 inches.',
    chips:['Wide waistband','Compression','Moisture-wicking','Flat seams','4-way stretch','Side pockets','Hidden pocket','UPF 50+'],
    sku:'Power Lycra — compression fabric, 85/15 nylon lycra, 4-way stretch',
    fields:[{id:'waist',l:'Waist',h:'Natural waist',req:1,def:28,mn:22,mx:50},{id:'hips',l:'Hips',h:'Fullest point',req:1,def:38,mn:30,mx:60},{id:'inseam',l:'Inseam',h:'4-7" typical',req:1,def:5,mn:3,mx:9},{id:'rise',l:'Rise',h:'Waist to crotch',req:0,def:9,mn:7,mx:12}],
    styles:[
      {id:'bs_classic',name:'Classic Biker',sub:'Compression fit',
     icon:dSvg('<defs><linearGradient id="dbk1" x1="0" y1="0" x2=".3" y2="1"><stop offset="0%" stop-color="#42a5f5"/><stop offset="100%" stop-color="#0d47a1"/></linearGradient></defs><rect x="8" y="4" width="40" height="13" rx="5" fill="#1565c0" stroke="#0d47a1" stroke-width="1.8"/><path d="M8 17 L7 42 L22 42 L28 27" fill="url(#dbk1)" stroke="#0d47a1" stroke-width="1.8" stroke-linejoin="round"/><path d="M48 17 L49 42 L34 42 L28 27" fill="url(#dbk1)" stroke="#1565c0" stroke-width="1.8" stroke-linejoin="round"/><line x1="7" y1="39" x2="22" y2="39" stroke="#64b5f6" stroke-width="2.2"/><line x1="34" y1="39" x2="49" y2="39" stroke="#64b5f6" stroke-width="2.2"/>','0 0 56 56'),
     pieces:(m)=>[
        {id:'fb',n:'Front',q:'Cut x2 mirror',w:m.hips/4+1.5,h:m.inseam+m.rise*.8,s:'lgf',t:['grain','notch'],c:'#1565c0'},
        {id:'bb',n:'Back',q:'Cut x2 mirror',w:m.hips/4+2,h:m.inseam+m.rise,s:'lgb',t:['grain','notch'],c:'#0d47a1'},
        {id:'wb',n:'Waistband',q:'Cut x1',w:m.waist+1,h:3.5,s:'rect',t:['fold','grain'],c:'#1976d2'},
        {id:'gus',n:'Gusset',q:'Cut x1',w:3,h:4,s:'rect',t:['grain'],c:'#42a5f5'}
      ]},
      {id:'bs_pocket',name:'Pocket Biker',sub:'Side pockets',
     icon:dSvg('<defs><linearGradient id="dbk2" x1="0" y1="0" x2=".3" y2="1"><stop offset="0%" stop-color="#42a5f5"/><stop offset="100%" stop-color="#0d47a1"/></linearGradient></defs><rect x="8" y="4" width="40" height="13" rx="5" fill="#1565c0" stroke="#0d47a1" stroke-width="1.8"/><path d="M8 17 L7 42 L22 42 L28 27" fill="url(#dbk2)" stroke="#0d47a1" stroke-width="1.8" stroke-linejoin="round"/><path d="M48 17 L49 42 L34 42 L28 27" fill="url(#dbk2)" stroke="#1565c0" stroke-width="1.8" stroke-linejoin="round"/><rect x="10" y="22" width="8" height="12" rx="2" fill="white" fill-opacity=".25" stroke="white" stroke-width="1.4" opacity=".8"/><rect x="38" y="22" width="8" height="12" rx="2" fill="white" fill-opacity=".25" stroke="white" stroke-width="1.4" opacity=".8"/>','0 0 56 56'),
     pieces:(m)=>[
        {id:'fb',n:'Front',q:'Cut x2 mirror',w:m.hips/4+1.5,h:m.inseam+m.rise*.8,s:'lgf',t:['grain','notch'],c:'#1565c0'},
        {id:'bb',n:'Back',q:'Cut x2 mirror',w:m.hips/4+2.2,h:m.inseam+m.rise,s:'lgb',t:['grain','notch'],c:'#0d47a1'},
        {id:'pk',n:'Side Pocket Bag',q:'Cut x2',w:5,h:6,s:'rect',t:['grain'],c:'#1976d2'},
        {id:'wb',n:'Waistband',q:'Cut x1',w:m.waist+1,h:4,s:'rect',t:['fold','grain'],c:'#42a5f5'},
        {id:'gus',n:'Gusset',q:'Cut x1',w:3,h:4,s:'rect',t:['grain'],c:'#90caf9'}
      ]}
    ]},

  corset_top:{label:'Corset Top',tip:'<strong>Bust</strong> sets cup. <strong>Waist</strong> determines cinch. <strong>Torso</strong> length sets the bottom hem.',
    chips:['Boning channels','Lace-up back','Sweetheart neckline','Underwire','Modesty panel','Zip front','Hook & eye','Bustier style'],
    sku:'Duchess Satin / Brocade — structured woven, requires interfacing and boning',
    fields:[{id:'bust',l:'Bust',h:'Fullest part',req:1,def:36,mn:28,mx:54},{id:'waist',l:'Waist',h:'Natural waist',req:1,def:28,mn:22,mx:46},{id:'torsoF',l:'Torso Front',h:'Bust to waist',req:0,def:9,mn:7,mx:13},{id:'hips',l:'Hips',h:'Hip measurement',req:0,def:38,mn:30,mx:58}],
    styles:[
      {id:'ct_sweet',name:'Sweetheart Corset',sub:'Sweetheart neckline',
     icon:dSvg('<defs><linearGradient id="dct1" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#fce4ec"/><stop offset="100%" stop-color="#e91e63"/></linearGradient></defs><path d="M12 12 C12 8 16 4 20 8 C22 12 26 12 28 8 C30 12 34 12 36 8 C40 4 44 8 44 12 L42 34 C40 46 34 52 28 54 C22 52 16 46 14 34 L12 12 Z" fill="url(#dct1)" stroke="#c2185b" stroke-width="1.8" stroke-linejoin="round"/><line x1="20" y1="15" x2="19" y2="48" stroke="#f48fb1" stroke-width="1" opacity=".7"/><line x1="28" y1="14" x2="28" y2="52" stroke="#f48fb1" stroke-width="1" opacity=".7"/><line x1="36" y1="15" x2="37" y2="48" stroke="#f48fb1" stroke-width="1" opacity=".7"/>','0 0 56 56'),
     pieces:(m)=>[
        {id:'cf',n:'Center Front',q:'Cut x1',w:m.bust/8+1,h:m.torsoF+1,s:'drf',t:['grain','notch'],c:'#6a1b9a'},
        {id:'sf',n:'Side Front',q:'Cut x2 mirror',w:m.bust/8+.5,h:m.torsoF+1,s:'drf',t:['grain'],c:'#7b1fa2'},
        {id:'ss',n:'Side Seam',q:'Cut x2 mirror',w:m.bust/8+.5,h:m.torsoF+.5,s:'rect',t:['grain'],c:'#8e24aa'},
        {id:'cb',n:'Center Back',q:'Cut x2 mirror',w:m.bust/8+2,h:m.torsoF+1,s:'drb',t:['grain','notch'],c:'#9c27b0'},
        {id:'sw',n:'Sweetheart Piece',q:'Cut x2 mirror',w:m.bust/4+1,h:4,s:'rarc',t:['grain'],c:'#ab47bc'},
        {id:'bon',n:'Boning Channel',q:'Cut x8',w:.75,h:m.torsoF-.5,s:'rect',t:['grain'],c:'#ce93d8'}
      ]},
      {id:'ct_modern',name:'Modern Bustier',sub:'Straight neckline',
     icon:dSvg('<defs><linearGradient id="dct2" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#fce4ec"/><stop offset="100%" stop-color="#e91e63"/></linearGradient></defs><path d="M12 10 L44 10 L42 34 C40 46 34 52 28 54 C22 52 16 46 14 34 L12 10 Z" fill="url(#dct2)" stroke="#c2185b" stroke-width="1.8" stroke-linejoin="round"/><line x1="12" y1="10" x2="44" y2="10" stroke="#880e4f" stroke-width="2.2"/><line x1="20" y1="12" x2="19" y2="48" stroke="#f48fb1" stroke-width="1" opacity=".7"/><line x1="28" y1="12" x2="28" y2="52" stroke="#f48fb1" stroke-width="1" opacity=".7"/><line x1="36" y1="12" x2="37" y2="48" stroke="#f48fb1" stroke-width="1" opacity=".7"/><path d="M22 18 L34 22 M22 24 L34 28 M22 30 L34 34" stroke="#880e4f" stroke-width="1.2" opacity=".6"/>','0 0 56 56'),
     pieces:(m)=>[
        {id:'cf',n:'Center Front',q:'Cut x1',w:m.bust/6+1,h:m.torsoF+1,s:'drf',t:['grain','notch'],c:'#6a1b9a'},
        {id:'sf',n:'Side Panel',q:'Cut x2 mirror',w:m.bust/5+.5,h:m.torsoF+.5,s:'rect',t:['grain'],c:'#7b1fa2'},
        {id:'cb',n:'Center Back',q:'Cut x2 mirror',w:m.bust/8+2.5,h:m.torsoF+1,s:'drb',t:['grain','notch'],c:'#8e24aa'},
        {id:'wb',n:'Top Band',q:'Cut x1',w:m.bust+2,h:2,s:'rect',t:['grain'],c:'#ab47bc'},
        {id:'bon',n:'Boning Strip',q:'Cut x6',w:.75,h:m.torsoF,s:'rect',t:['grain'],c:'#ce93d8'}
      ]}
    ]},

  tennis_dress:{label:'Tennis Dress',tip:'<strong>Bust</strong> fits the bodice. <strong>Dress length</strong> determines hem — typically 14-18" from waist.',
    chips:['Built-in shorts','Polo collar','Pleated skirt','UV protection','Moisture-wicking','Side slits','Deep pockets','Compression lining'],
    sku:'Performance Piqué — moisture-wicking, UV50+, mechanical stretch',
    fields:[{id:'bust',l:'Bust',h:'Fullest part',req:1,def:34,mn:28,mx:52},{id:'waist',l:'Waist',h:'Natural waist',req:1,def:28,mn:22,mx:46},{id:'hips',l:'Hips',h:'Hip measure',req:1,def:38,mn:30,mx:56},{id:'dressL',l:'Dress Length',h:'Waist to hem',req:1,def:16,mn:12,mx:22},{id:'torsoF',l:'Bodice Length',h:'Shoulder to waist',req:0,def:14,mn:11,mx:18},{id:'inseam',l:'Short Inseam',h:'Built-in short inseam',req:0,def:3,mn:1,mx:8},{id:'rise',l:'Rise',h:'Waist to crotch, seated',req:0,def:10,mn:7,mx:14}],
    styles:[
      {id:'td_classic',name:'Classic Tennis',sub:'Pleated skirt',
     icon:dSvg('<defs><linearGradient id="dtd1" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#f3e5f5"/><stop offset="100%" stop-color="#8e24aa"/></linearGradient></defs><path d="M22 4 L20 11 L15 16 L17 23 L17 29 L39 29 L39 23 L41 16 L36 11 L34 4 Z" fill="url(#dtd1)" stroke="#6a1b9a" stroke-width="1.8"/><path d="M22 4 C24 9 32 9 34 4" stroke="#4a148c" stroke-width="1.8" fill="none"/><line x1="15" y1="29" x2="41" y2="29" stroke="#4a148c" stroke-width="1.8"/><path d="M17 29 L10 52 L46 52 L39 29 Z" fill="url(#dtd1)" fill-opacity=".65" stroke="#6a1b9a" stroke-width="1.8" stroke-linejoin="round"/><path d="M17 36 L15 50 M23 34 L22 51 M33 34 L34 51 M39 36 L41 50" stroke="#8e24aa" stroke-width="1" opacity=".5"/>','0 0 56 56'),
     pieces:(m)=>[
        {id:'bf',n:'Bodice Front',q:'Cut x1',w:m.bust/2+2,h:m.torsoF+1,s:'tpf',t:['grain','notch'],c:'#00897b'},
        {id:'bb',n:'Bodice Back',q:'Cut x1',w:m.bust/2+2,h:m.torsoF+.5,s:'tpb',t:['grain','notch'],c:'#00796b'},
        {id:'col',n:'Collar',q:'Cut x2',w:m.bust/4+1,h:3,s:'rect',t:['grain'],c:'#004d40'},
        {id:'sf',n:'Skirt Front',q:'Cut x1',w:m.hips/2+4,h:m.dressL+1,s:'drf',t:['grain'],c:'#26a69a'},
        {id:'sb',n:'Skirt Back',q:'Cut x1',w:m.hips/2+4,h:m.dressL+1,s:'drb',t:['grain'],c:'#00897b'},
        {id:'li',n:'Built-in Short',q:'Cut x2 mirror',w:m.hips/4+2,h:5,s:'lgf',t:['grain'],c:'#b2dfdb'}
      ]},
      {id:'td_wrap',name:'Wrap Skirt Tennis',sub:'Wrap skirt',
     icon:dSvg('<defs><linearGradient id="dtd2" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#f3e5f5"/><stop offset="100%" stop-color="#8e24aa"/></linearGradient></defs><path d="M22 4 L20 11 L15 16 L17 23 L17 29 L39 29 L39 23 L41 16 L36 11 L34 4 Z" fill="url(#dtd2)" stroke="#6a1b9a" stroke-width="1.8"/><path d="M22 4 C24 9 32 9 34 4" stroke="#4a148c" stroke-width="1.8" fill="none"/><line x1="15" y1="29" x2="41" y2="29" stroke="#4a148c" stroke-width="1.8"/><path d="M17 29 L12 52 L34 52 L28 29 Z" fill="url(#dtd2)" fill-opacity=".75" stroke="#6a1b9a" stroke-width="1.8" stroke-linejoin="round"/><path d="M28 29 L44 52 L24 52 Z" fill="url(#dtd2)" fill-opacity=".5" stroke="#6a1b9a" stroke-width="1.5" stroke-linejoin="round"/>','0 0 56 56'),
     pieces:(m)=>[
        {id:'bf',n:'Bodice Front',q:'Cut x1',w:m.bust/2+2,h:m.torsoF+1,s:'tpf',t:['grain','notch'],c:'#00897b'},
        {id:'bb',n:'Bodice Back',q:'Cut x1',w:m.bust/2+2,h:m.torsoF+.5,s:'tpb',t:['grain','notch'],c:'#00796b'},
        {id:'sw',n:'Wrap Skirt',q:'Cut x2',w:m.hips/2+6,h:m.dressL+1,s:'skf',t:['grain'],c:'#26a69a'},
        {id:'li',n:'Short Lining',q:'Cut x2 mirror',w:m.hips/4+2,h:5,s:'lgf',t:['grain'],c:'#b2dfdb'},
        {id:'wb',n:'Waistband',q:'Cut x1',w:m.waist+2,h:2,s:'rect',t:['grain','fold'],c:'#004d40'}
    ]}
    ,{id:'bk_hiwaist',name:'High-Waist Biker',sub:'Elevated waistband',
     icon:dSvg('<defs><linearGradient id="dbh" x1="0" y1="0" x2=".3" y2="1"><stop offset="0%" stop-color="#42a5f5"/><stop offset="100%" stop-color="#0d47a1"/></linearGradient></defs><rect x="8" y="2" width="40" height="18" rx="5" fill="#1565c0" stroke="#0d47a1" stroke-width="1.8"/><path d="M8 20 L7 44 L22 44 L28 29" fill="url(#dbh)" stroke="#0d47a1" stroke-width="1.8" stroke-linejoin="round"/><path d="M48 20 L49 44 L34 44 L28 29" fill="url(#dbh)" stroke="#1565c0" stroke-width="1.8" stroke-linejoin="round"/>','0 0 56 48'),
     pieces:(m)=>[
      {id:'fb',n:'Front',q:'Cut x2 mirror',w:m.hips/4+1.5,h:m.inseam+m.rise*.8,s:'lgf',t:['grain','notch'],c:'#1565c0'},
      {id:'bb',n:'Back',q:'Cut x2 mirror',w:m.hips/4+2,h:m.inseam+m.rise,s:'lgb',t:['grain','notch'],c:'#0d47a1'},
      {id:'wb',n:'Wide Waistband',q:'Cut x1',w:m.waist+1,h:5,s:'rect',t:['fold','grain'],c:'#1976d2'},
      {id:'gu',n:'Gusset',q:'Cut x1',w:3,h:4,s:'rect',t:['grain'],c:'#42a5f5'}
    ]}
    ,{id:'bk_crop',name:'Crop Biker',sub:'Above-knee length',
     icon:dSvg('<defs><linearGradient id="dbcr" x1="0" y1="0" x2=".3" y2="1"><stop offset="0%" stop-color="#42a5f5"/><stop offset="100%" stop-color="#0d47a1"/></linearGradient></defs><rect x="8" y="4" width="40" height="13" rx="5" fill="#1565c0" stroke="#0d47a1" stroke-width="1.8"/><path d="M8 17 L8 34 L22 34 L28 22" fill="url(#dbcr)" stroke="#0d47a1" stroke-width="1.8" stroke-linejoin="round"/><path d="M48 17 L48 34 L34 34 L28 22" fill="url(#dbcr)" stroke="#1565c0" stroke-width="1.8" stroke-linejoin="round"/>','0 0 56 38'),
     pieces:(m)=>[
      {id:'fb',n:'Front',q:'Cut x2 mirror',w:m.hips/4+1.5,h:(m.inseam*.6)+m.rise*.8,s:'lgf',t:['grain','notch'],c:'#1565c0'},
      {id:'bb',n:'Back',q:'Cut x2 mirror',w:m.hips/4+2,h:(m.inseam*.6)+m.rise,s:'lgb',t:['grain','notch'],c:'#0d47a1'},
      {id:'wb',n:'Waistband',q:'Cut x1',w:m.waist+1,h:3,s:'rect',t:['fold','grain'],c:'#1976d2'},
      {id:'pk',n:'Side Pocket',q:'Cut x2',w:5,h:6,s:'rect',t:['grain'],c:'#64b5f6'},
      {id:'gu',n:'Gusset',q:'Cut x1',w:3,h:4,s:'rect',t:['grain'],c:'#90caf9'}
    ]}
    ,{id:'ct_overbust',name:'Overbust Corset',sub:'Full bust coverage',
     icon:dSvg('<defs><linearGradient id="dco" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#fce4ec"/><stop offset="100%" stop-color="#e91e63"/></linearGradient></defs><path d="M12 8 C12 4 16 2 20 6 L28 10 L36 6 C40 2 44 4 44 8 L42 32 C40 44 34 50 28 52 C22 50 16 44 14 32 Z" fill="url(#dco)" stroke="#c2185b" stroke-width="1.8"/><line x1="28" y1="10" x2="28" y2="50" stroke="#f48fb1" stroke-width="1" opacity=".6"/>','0 0 56 54'),
     pieces:(m)=>[
      {id:'cf',n:'Center Front',q:'Cut x1',w:m.bust/8+1,h:m.torsoF+2,s:'drf',t:['grain','notch'],c:'#880e4f'},
      {id:'sf',n:'Side Front',q:'Cut x2 mirror',w:m.bust/8+.5,h:m.torsoF+1.5,s:'drf',t:['grain'],c:'#ad1457'},
      {id:'cp',n:'Cup Piece',q:'Cut x2 mirror',w:m.bust/4+1.5,h:m.bust/8+2,s:'rarc',t:['grain'],c:'#c2185b'},
      {id:'ss',n:'Side Seam',q:'Cut x2 mirror',w:m.bust/8+.5,h:m.torsoF+1,s:'rect',t:['grain'],c:'#d81b60'},
      {id:'cb',n:'Center Back',q:'Cut x2 mirror',w:m.bust/8+2.5,h:m.torsoF+1.5,s:'drb',t:['grain','notch'],c:'#e91e63'},
      {id:'bon',n:'Boning Channel',q:'Cut x10',w:.75,h:m.torsoF+.5,s:'rect',t:['grain'],c:'#f48fb1'}
    ]}
    ,{id:'ct_underbust',name:'Underbust Cincher',sub:'Below-bust cincher',
     icon:dSvg('<defs><linearGradient id="dcu" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#fce4ec"/><stop offset="100%" stop-color="#e91e63"/></linearGradient></defs><path d="M12 16 L44 16 L42 34 C40 44 34 48 28 50 C22 48 16 44 14 34 Z" fill="url(#dcu)" stroke="#c2185b" stroke-width="1.8"/><line x1="12" y1="16" x2="44" y2="16" stroke="#880e4f" stroke-width="2.2"/>','0 0 56 52'),
     pieces:(m)=>[
      {id:'cf',n:'Center Front',q:'Cut x1',w:m.bust/8+.5,h:m.torsoF*.6+1,s:'rect',t:['grain','notch'],c:'#880e4f'},
      {id:'sf',n:'Side Panel',q:'Cut x2 mirror',w:m.bust/6+.5,h:m.torsoF*.5+.5,s:'rect',t:['grain'],c:'#ad1457'},
      {id:'cb',n:'Center Back',q:'Cut x2 mirror',w:m.bust/8+2,h:m.torsoF*.6+1,s:'rect',t:['grain','notch'],c:'#c2185b'},
      {id:'bon',n:'Boning Strip',q:'Cut x8',w:.75,h:m.torsoF*.5,s:'rect',t:['grain'],c:'#f48fb1'},
      {id:'top',n:'Top Binding',q:'Cut x1',w:m.bust+2,h:1.5,s:'rect',t:['grain'],c:'var(--accent-soft)'}
    ]}
    ,{id:'td_racerback',name:'Racerback Tennis',sub:'Athletic racerback',
     icon:dSvg('<defs><linearGradient id="dtr" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#f3e5f5"/><stop offset="100%" stop-color="#8e24aa"/></linearGradient></defs><path d="M22 4 L20 10 L14 18 L18 26 L18 29 L38 29 L38 26 L42 18 L36 10 L34 4 Z" fill="url(#dtr)" stroke="#6a1b9a" stroke-width="1.8"/><path d="M22 4 C24 6 28 8 28 8 C28 8 32 6 34 4" stroke="#4a148c" stroke-width="1.8" fill="none"/><path d="M18 29 L12 52 L44 52 L38 29 Z" fill="url(#dtr)" fill-opacity=".65" stroke="#6a1b9a" stroke-width="1.8"/>','0 0 56 56'),
     pieces:(m)=>[
      {id:'bf',n:'Bodice Front',q:'Cut x1',w:m.bust/2+1.5,h:m.torsoF+1,s:'tpf',t:['grain','notch'],c:'#6a1b9a'},
      {id:'bb',n:'Bodice Back',q:'Cut x1',w:m.bust/2+1.5,h:m.torsoF+.5,s:'tpb',t:['grain','notch'],c:'#7b1fa2'},
      {id:'sf',n:'Skirt Front',q:'Cut x1',w:m.hips/2+3,h:m.dressL+1,s:'drf',t:['grain'],c:'#9c27b0'},
      {id:'sb',n:'Skirt Back',q:'Cut x1',w:m.hips/2+3,h:m.dressL+1,s:'drb',t:['grain'],c:'#8e24aa'},
      {id:'li',n:'Built-in Short',q:'Cut x2 mirror',w:m.hips/4+2,h:5,s:'lgf',t:['grain'],c:'#e1bee7'},
      {id:'am',n:'Armhole Binding',q:'Cut x2',w:m.bust/4+2,h:1.5,s:'rect',t:['grain'],c:'#ce93d8'}
    ]}
    ,{id:'td_polo',name:'Polo Tennis',sub:'Polo collar style',
     icon:dSvg('<defs><linearGradient id="dtp" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#f3e5f5"/><stop offset="100%" stop-color="#8e24aa"/></linearGradient></defs><path d="M22 4 L20 10 L15 16 L17 23 L17 29 L39 29 L39 23 L41 16 L36 11 L34 4 Z" fill="url(#dtp)" stroke="#6a1b9a" stroke-width="1.8"/><rect x="24" y="4" width="8" height="8" rx="1" fill="url(#dtp)" stroke="#4a148c" stroke-width="1.5"/><path d="M17 29 L11 52 L45 52 L39 29 Z" fill="url(#dtp)" fill-opacity=".65" stroke="#6a1b9a" stroke-width="1.8"/>','0 0 56 56'),
     pieces:(m)=>[
      {id:'bf',n:'Bodice Front',q:'Cut x1',w:m.bust/2+2,h:m.torsoF+1,s:'tpf',t:['grain','notch'],c:'#4a148c'},
      {id:'bb',n:'Bodice Back',q:'Cut x1',w:m.bust/2+2,h:m.torsoF+.5,s:'tpb',t:['grain','notch'],c:'#6a1b9a'},
      {id:'col',n:'Polo Collar',q:'Cut x2',w:m.bust/4+2,h:3.5,s:'rect',t:['fold','grain'],c:'#9c27b0'},
      {id:'slv',n:'Short Sleeve',q:'Cut x2',w:m.bust/4+1,h:m.bust/8+1,s:'rect',t:['grain','notch'],c:'#8e24aa'},
      {id:'sf',n:'Skirt Front',q:'Cut x1',w:m.hips/2+3,h:m.dressL+1,s:'drf',t:['grain'],c:'#ab47bc'},
      {id:'sb',n:'Skirt Back',q:'Cut x1',w:m.hips/2+3,h:m.dressL+1,s:'drb',t:['grain'],c:'#9c27b0'},
      {id:'li',n:'Built-in Short',q:'Cut x2 mirror',w:m.hips/4+2,h:5,s:'lgf',t:['grain'],c:'#e1bee7'}
    ]}
    ]},

  board_shorts:{label:'Board Shorts',tip:'<strong>Waist</strong> sets the waistband. <strong>Outseam</strong> is total length — typically 18-22 inches for mens cut.',
    chips:['Drawstring waist','Mesh lining','Velcro pocket','Quick-dry','UPF 50+','Side vents','Flat-lock seams','Water-repellent'],
    sku:'Recycled Polyester Twill — quick-dry, water-repellent, eco-friendly',
    fields:[{id:'waist',l:'Waist',h:'Natural waist',req:1,def:32,mn:24,mx:52},{id:'hips',l:'Hips',h:'Fullest point',req:1,def:40,mn:32,mx:60},{id:'outseam',l:'Outseam',h:'Total length',req:1,def:20,mn:16,mx:24},{id:'inseam',l:'Inseam',h:'Inner leg length',req:0,def:9,mn:6,mx:13}],
    styles:[
      {id:'bs_surf',name:'Classic Surf',sub:'Classic surf cut',
     icon:dSvg('<defs><linearGradient id="dbo1" x1="0" y1="0" x2=".3" y2="1"><stop offset="0%" stop-color="#4fc3f7"/><stop offset="100%" stop-color="#01579b"/></linearGradient></defs><rect x="8" y="5" width="40" height="12" rx="4" fill="#0288d1" stroke="#01579b" stroke-width="1.8"/><path d="M24 5 L24 11 L34 11" stroke="white" stroke-width="1.5" fill="none" opacity=".7" stroke-linecap="round"/><path d="M8 17 L6 42 L22 42 L28 28" fill="url(#dbo1)" stroke="#01579b" stroke-width="1.8" stroke-linejoin="round"/><path d="M48 17 L50 42 L34 42 L28 28" fill="url(#dbo1)" stroke="#0277bd" stroke-width="1.8" stroke-linejoin="round"/><line x1="6" y1="39" x2="22" y2="39" stroke="#4fc3f7" stroke-width="2.2"/><line x1="34" y1="39" x2="50" y2="39" stroke="#4fc3f7" stroke-width="2.2"/>','0 0 56 56'),
     pieces:(m)=>[
        {id:'fp',n:'Front Panel',q:'Cut x2 mirror',w:m.hips/4+2,h:m.outseam+1,s:'lgf',t:['grain','notch'],c:'#0277bd'},
        {id:'bp',n:'Back Panel',q:'Cut x2 mirror',w:m.hips/4+2.5,h:m.outseam+1,s:'lgb',t:['grain','notch'],c:'#01579b'},
        {id:'wb',n:'Waistband',q:'Cut x1',w:m.waist+2,h:3,s:'rect',t:['fold','grain'],c:'#0288d1'},
        {id:'pk',n:'Cargo Pocket',q:'Cut x2',w:6.5,h:7,s:'rect',t:['grain'],c:'#29b6f6'},
        {id:'ml',n:'Mesh Lining',q:'Cut x2 mirror',w:m.hips/4+1,h:m.inseam+2,s:'lgf',t:['grain'],c:'#b3e5fc'},
        {id:'fly',n:'Fly Facing',q:'Cut x1',w:3,h:5,s:'rect',t:['grain'],c:'#4fc3f7'}
      ]},
      {id:'bs_volley',name:'Volley Short',sub:'Short volley cut',
     icon:dSvg('<defs><linearGradient id="dbo2" x1="0" y1="0" x2=".3" y2="1"><stop offset="0%" stop-color="#4fc3f7"/><stop offset="100%" stop-color="#01579b"/></linearGradient></defs><rect x="8" y="6" width="40" height="12" rx="4" fill="#0288d1" stroke="#01579b" stroke-width="1.8"/><path d="M24 6 L24 12 L34 12" stroke="white" stroke-width="1.5" fill="none" opacity=".7" stroke-linecap="round"/><path d="M8 18 L7 34 L22 34 L28 24" fill="url(#dbo2)" stroke="#01579b" stroke-width="1.8" stroke-linejoin="round"/><path d="M48 18 L49 34 L34 34 L28 24" fill="url(#dbo2)" stroke="#0277bd" stroke-width="1.8" stroke-linejoin="round"/><rect x="10" y="22" width="7" height="8" rx="2" fill="none" stroke="white" stroke-width="1.2" opacity=".4"/><line x1="7" y1="31" x2="22" y2="31" stroke="#4fc3f7" stroke-width="2.2"/>','0 0 56 56'),
     pieces:(m)=>[
        {id:'fp',n:'Front',q:'Cut x2 mirror',w:m.hips/4+1.5,h:m.outseam*.8+1,s:'lgf',t:['grain','notch'],c:'#0277bd'},
        {id:'bp',n:'Back',q:'Cut x2 mirror',w:m.hips/4+2,h:m.outseam*.8+1,s:'lgb',t:['grain','notch'],c:'#01579b'},
        {id:'wb',n:'Elastic Waist',q:'Cut x1',w:m.waist+1.5,h:2.5,s:'rect',t:['fold','grain'],c:'#0288d1'},
        {id:'ml',n:'Mesh Lining',q:'Cut x2 mirror',w:m.hips/4+1,h:m.outseam*.6,s:'lgf',t:['grain'],c:'#b3e5fc'}
    ]}
    ,{id:'bs_cargo',name:'Cargo Board',sub:'Cargo pockets',
     icon:dSvg('<defs><linearGradient id="dbc" x1="0" y1="0" x2=".3" y2="1"><stop offset="0%" stop-color="#4fc3f7"/><stop offset="100%" stop-color="#01579b"/></linearGradient></defs><rect x="8" y="5" width="40" height="12" rx="4" fill="#0288d1" stroke="#01579b" stroke-width="1.8"/><path d="M8 17 L6 44 L22 44 L28 28" fill="url(#dbc)" stroke="#01579b" stroke-width="1.8" stroke-linejoin="round"/><path d="M48 17 L50 44 L34 44 L28 28" fill="url(#dbc)" stroke="#0277bd" stroke-width="1.8" stroke-linejoin="round"/><rect x="8" y="24" width="9" height="12" rx="2" fill="none" stroke="white" stroke-width="1.4" opacity=".5"/>','0 0 56 48'),
     pieces:(m)=>[
      {id:'fp',n:'Front Panel',q:'Cut x2 mirror',w:m.hips/4+2,h:m.outseam+1,s:'lgf',t:['grain','notch'],c:'#0277bd'},
      {id:'bp',n:'Back Panel',q:'Cut x2 mirror',w:m.hips/4+2.5,h:m.outseam+1,s:'lgb',t:['grain','notch'],c:'#01579b'},
      {id:'wb',n:'Waistband',q:'Cut x1',w:m.waist+2,h:3,s:'rect',t:['fold','grain'],c:'#0288d1'},
      {id:'cpf',n:'Cargo Pocket',q:'Cut x2',w:7,h:8.5,s:'rect',t:['grain'],c:'#29b6f6'},
      {id:'cpl',n:'Pocket Flap',q:'Cut x2',w:7,h:3,s:'rect',t:['grain'],c:'#4fc3f7'},
      {id:'fly',n:'Fly Facing',q:'Cut x1',w:3,h:5,s:'rect',t:['grain'],c:'#81d4fa'},
      {id:'ml',n:'Mesh Lining',q:'Cut x2 mirror',w:m.hips/4+1,h:m.inseam+2,s:'lgf',t:['grain'],c:'#e1f5fe'}
    ]}
    ,{id:'bs_compress',name:'Compression Board',sub:'Built-in liner',
     icon:dSvg('<defs><linearGradient id="dbco" x1="0" y1="0" x2=".3" y2="1"><stop offset="0%" stop-color="#4fc3f7"/><stop offset="100%" stop-color="#01579b"/></linearGradient></defs><rect x="8" y="5" width="40" height="12" rx="4" fill="#0288d1" stroke="#01579b" stroke-width="1.8"/><path d="M8 17 L6 44 L22 44 L28 28" fill="url(#dbco)" stroke="#01579b" stroke-width="1.8" stroke-linejoin="round"/><path d="M48 17 L50 44 L34 44 L28 28" fill="url(#dbco)" stroke="#0277bd" stroke-width="1.8" stroke-linejoin="round"/>','0 0 56 48'),
     pieces:(m)=>[
      {id:'fp',n:'Front Panel',q:'Cut x2 mirror',w:m.hips/4+2,h:m.outseam+1,s:'lgf',t:['grain','notch'],c:'#0277bd'},
      {id:'bp',n:'Back Panel',q:'Cut x2 mirror',w:m.hips/4+2.5,h:m.outseam+1,s:'lgb',t:['grain','notch'],c:'#01579b'},
      {id:'wb',n:'Waistband',q:'Cut x1',w:m.waist+2,h:3.5,s:'rect',t:['fold','grain'],c:'#0288d1'},
      {id:'cf',n:'Compression Front',q:'Cut x2 mirror',w:m.hips/4+.5,h:m.outseam*.6+1,s:'lgf',t:['grain'],c:'#81d4fa'},
      {id:'cb',n:'Compression Back',q:'Cut x2 mirror',w:m.hips/4+.75,h:m.outseam*.6+1,s:'lgb',t:['grain'],c:'#b3e5fc'},
      {id:'fly',n:'Fly Facing',q:'Cut x1',w:3,h:5,s:'rect',t:['grain'],c:'#4fc3f7'}
    ]}
    ]}
};

const GARMENT_ORDER=['bikini_top','bikini_bottom','one_piece','swim_dress','leggings','sports_bra','leotard','unitard','crop_top','bodycon_dress','maxi_dress','night_dress','two_piece','jumpsuit','skirt','shorts','lingerie','costume','wrap_dress','rash_guard','biker_shorts','corset_top','tennis_dress','board_shorts'];

// ===== STATE =====

const chr34='"';

function fmtIn(v){
  var n=parseFloat(v)||0;
  var s=(n>0?'+':n<0?'-':'')+(n===0?'0':Math.abs(n).toFixed(3).replace(/0+$/,'').replace(/\.$/,''));
  return s+'"';
}

function applyFitAdjustments(pieces,fit,m){
  if(!fit||!pieces||!pieces.length)return pieces;
  pieces.forEach(function(p){
    var id=(p.id||'').toLowerCase();
    var n=(p.n||'').toLowerCase();
    var isFB=/^(fr|fb|tf|bf|fl|cf)$/.test(id)||/front.?(bodice|body|panel|top)/.test(n);
    var isBB=/^(bk|bb|tb)$/.test(id)||/back.?(bodice|body|panel|top)/.test(n);
    var isFS=/^(fs|sf)$/.test(id)||/front.?skirt/.test(n);
    var isBS=/^(bs|sb)$/.test(id)||/back.?skirt/.test(n);
    var isFL=/^(fll|flr|fp|lfp)$/.test(id)||/front.?(leg|pant)/.test(n);
    var isBL=/^(bll|blr|bp|lbp)$/.test(id)||/back.?(leg|pant)/.test(n);
    var isWB=/wb/.test(id)||/waistband/.test(n);
    var isSL=/sl?v/.test(id)||/sleeve/.test(n);
    var isCup=/^(cl|cr|cf|cp)$/.test(id)||/cup/.test(n);
    var isGus=/gu/.test(id)||/gusset|crotch/.test(n);
    // Ease
    if(fit.ease!==0){
      var e=fit.ease*0.75;
      if(isFB||isBB)p.w=Math.max(p.w+e,3);
      if(isFL||isBL)p.w=Math.max(p.w+e*0.5,3);
      if(isFS||isBS)p.w=Math.max(p.w+e,3);
    }
    // FBA (Full Bust Adjustment)
    if(fit.fba!==0){
      if(isFB){p.w=Math.max(p.w+fit.fba*0.5,3);p.h=Math.max(p.h+fit.fba*0.25,3);}
      if(isCup){p.w=Math.max(p.w+fit.fba*0.375,1);p.h=Math.max(p.h+fit.fba*0.375,1);}
    }
    // Front length
    if(fit.frontLen!==0){
      if(isFB)p.h=Math.max(p.h+fit.frontLen,3);
      if(isFS)p.h=Math.max(p.h+fit.frontLen*0.5,4);
      if(isFL)p.h=Math.max(p.h+fit.frontLen*0.25,4);
    }
    // Back length (sway back)
    if(fit.backLen!==0){
      if(isBB)p.h=Math.max(p.h+fit.backLen,3);
      if(isBS)p.h=Math.max(p.h+fit.backLen*0.5,4);
      if(isBL)p.h=Math.max(p.h+fit.backLen*0.25,4);
    }
    // Rise
    if(fit.riseAdj!==0){
      if(isFB||isBB)p.h=Math.max(p.h+fit.riseAdj*0.5,3);
      if(isFL||isBL)p.h=Math.max(p.h+fit.riseAdj,4);
      if(isGus)p.h=Math.max(p.h+fit.riseAdj*0.5,2);
    }
    // Hip shape
    if(fit.hipAdj!==0){
      if(isFS||isBS)p.w=Math.max(p.w+fit.hipAdj*0.5,3);
      if(isFL||isBL)p.w=Math.max(p.w+fit.hipAdj*0.5,3);
      if(isWB)p.w=Math.max(p.w+fit.hipAdj*0.25,4);
    }
    // Shoulder/back width
    if(fit.shoulderAdj!==0){
      if(isBB)p.w=Math.max(p.w+fit.shoulderAdj*0.5,3);
      if(isSL)p.w=Math.max(p.w+fit.shoulderAdj*0.25,2);
    }
    // Leg length
    if(fit.legLen!==0){
      if(isFL||isBL)p.h=Math.max(p.h+fit.legLen,4);
    }
    // Asymmetry notes
    if(Math.abs(fit.asymShoulder)>0.0625&&(isFB||isBB)){
      var side=fit.asymShoulder>0?'left':'right';
      p._fitNote=(p._fitNote||'')+'Raise '+side+' shoulder '+Math.abs(fit.asymShoulder).toFixed(3)+'" ';
    }
    if(Math.abs(fit.asymHip)>0.0625&&(isFS||isBS||isFL||isBL)){
      var hipSide=fit.asymHip>0?'left':'right';
      p._fitNote=(p._fitNote||'')+'Raise '+hipSide+' side '+Math.abs(fit.asymHip).toFixed(3)+'" ';
    }
    // Round to nearest 1/8"
    p.w=Math.round(p.w*8)/8;
    p.h=Math.round(p.h*8)/8;
  });
  return pieces;
}

function readFit(){
  function fv(id){var el=document.getElementById(id);return el?parseFloat(el.value)||0:0;}
  return{ease:fv('fit_ease'),fba:fv('fit_fba'),frontLen:fv('fit_frontLen'),
    backLen:fv('fit_backLen'),riseAdj:fv('fit_riseAdj'),hipAdj:fv('fit_hipAdj'),
    shoulderAdj:fv('fit_shoulderAdj'),legLen:fv('fit_legLen'),
    asymShoulder:fv('fit_asymShoulder'),asymHip:fv('fit_asymHip')};
}

function resetFit(){
  ['fit_ease','fit_fba','fit_frontLen','fit_backLen','fit_riseAdj',
   'fit_hipAdj','fit_shoulderAdj','fit_legLen','fit_asymShoulder','fit_asymHip'].forEach(function(id){
    var el=document.getElementById(id);if(el)el.value=0;
    var vEl=document.getElementById(id+'_v');if(vEl)vEl.textContent='0';
  });
  S.fit={ease:0,fba:0,frontLen:0,backLen:0,riseAdj:0,hipAdj:0,shoulderAdj:0,legLen:0,asymShoulder:0,asymHip:0};
  var nb=document.getElementById('fitNotesBanner');if(nb)nb.style.display='none';
  toast_('Fit adjustments reset');
}

function renderFitNotes(){
  if(!S.ps)return;
  var nb=document.getElementById('fitNotesBanner');if(!nb)return;
  var notes=S.ps.filter(function(p){return p._fitNote;}).map(function(p){return '<b>'+p.n+'</b>: '+p._fitNote;}).join(' &nbsp;&middot;&nbsp; ');
  if(notes){nb.innerHTML='&#9986; Asymmetry notes: '+notes;nb.style.display='block';}
  else nb.style.display='none';
}

function mkFitSlider(label,id,min,max,step,leftLabel,rightLabel,fmtFn){
  var wrap=document.createElement('div');
  wrap.style.cssText='display:flex;align-items:center;gap:6px;margin-bottom:8px';
  var lbl=document.createElement('span');
  lbl.style.cssText='font-size:10px;color:var(--ink4);width:110px;flex-shrink:0';
  lbl.textContent=label;
  var ll=document.createElement('span');
  ll.style.cssText='font-size:9px;color:var(--ink5);width:48px;flex-shrink:0;text-align:right';
  ll.textContent=leftLabel;
  var inp=document.createElement('input');
  inp.type='range';inp.className='sl sl-b';inp.id=id;
  inp.min=min;inp.max=max;inp.step=step;inp.value=0;
  inp.style.flex='1';
  var rl=document.createElement('span');
  rl.style.cssText='font-size:9px;color:var(--ink5);width:36px;flex-shrink:0';
  rl.textContent=rightLabel;
  var val=document.createElement('span');
  val.id=id+'_v';val.className='sl-val sl-blue';val.textContent='0';
  inp.oninput=function(){val.textContent=(fmtFn||fmtIn)(this.value);};
  wrap.appendChild(lbl);wrap.appendChild(ll);wrap.appendChild(inp);wrap.appendChild(rl);wrap.appendChild(val);
  return wrap;
}

function renderFitCard(){
  var mount=document.getElementById('fitCardMount');if(!mount)return;
  mount.innerHTML='';
  var card=document.createElement('div');card.className='bcard';card.id='fitCard';

  // Header
  var hdr=document.createElement('div');
  hdr.style.cssText='display:flex;justify-content:space-between;align-items:center;margin-bottom:10px';
  var lbl=document.createElement('span');lbl.className='sec-label';lbl.style.margin='0';
  lbl.innerHTML='&#9986; Professional Fit Adjustments';
  var rst=document.createElement('button');
  rst.style.cssText='background:none;border:1px solid #dde5f0;border-radius:6px;padding:3px 10px;font-size:11px;color:var(--ink-4);cursor:pointer';
  rst.textContent='Reset all';rst.onclick=resetFit;
  hdr.appendChild(lbl);hdr.appendChild(rst);card.appendChild(hdr);

  // Info box
  var info=document.createElement('div');
  info.style.cssText='font-size:11px;color:var(--ink-3);line-height:1.55;margin-bottom:12px;background:var(--surface-2);padding:8px 10px;border-radius:6px;border-left:3px solid #1255b0';
  info.innerHTML='These adjustments are applied to your pattern pieces after drafting &mdash; the same corrections a professional patternmaker makes at a fitting. <b>Leave all at 0</b> for the standard fit from your measurements. Each step = 1/8".';
  card.appendChild(info);

  function addSection(title){
    var s=document.createElement('div');
    s.style.cssText='font-size:10px;font-weight:800;color:var(--ink);letter-spacing:.05em;margin:10px 0 6px';
    s.textContent=title;card.appendChild(s);
  }

  function fmtAsym(v){
    var n=parseFloat(v)||0;
    if(n===0)return'0';
    return(n>0?'L+':'R+')+Math.abs(n).toFixed(4).replace(/0+$/, '').replace(/\.$/, '')+'"';
  }

  addSection('EASE & FIT PREFERENCE');
  card.appendChild(mkFitSlider('Ease preference','fit_ease',-2,2,0.5,'Competition','Relaxed'));

  addSection('BUST');
  card.appendChild(mkFitSlider('Full / Flat bust (FBA)','fit_fba',-2,2,0.25,'Flat chest','Full bust'));

  addSection('TORSO LENGTH');
  card.appendChild(mkFitSlider('Front length','fit_frontLen',-1,1,0.125,'-1"','+1"'));
  card.appendChild(mkFitSlider('Back length (sway)','fit_backLen',-1,1,0.125,'-1"','+1"'));

  addSection('LOWER BODY');
  card.appendChild(mkFitSlider('Rise depth','fit_riseAdj',-1,1,0.125,'Short','Long'));
  card.appendChild(mkFitSlider('Hip shape','fit_hipAdj',-1,1,0.125,'Flat','Full'));
  card.appendChild(mkFitSlider('Leg length','fit_legLen',-1,1,0.125,'-1"','+1"'));

  addSection('BACK & SHOULDER');
  card.appendChild(mkFitSlider('Shoulder width','fit_shoulderAdj',-1,1,0.125,'Narrow','Broad'));

  addSection('ASYMMETRY CORRECTIONS');
  var asymNote=document.createElement('div');
  asymNote.style.cssText='font-size:10px;color:var(--ink-3);margin-bottom:8px;line-height:1.5';
  asymNote.innerHTML='Adds a sewing note to affected pattern pieces. Trim or add at the flagged seam during your muslin fitting.';
  card.appendChild(asymNote);
  card.appendChild(mkFitSlider('High shoulder (L−R)','fit_asymShoulder',-0.5,0.5,0.0625,'R higher','L higher',fmtAsym));
  card.appendChild(mkFitSlider('Hip tilt (L−R)','fit_asymHip',-0.5,0.5,0.0625,'R higher','L higher',fmtAsym));

  // Asymmetry notes banner
  var nb=document.createElement('div');nb.id='fitNotesBanner';
  nb.style.cssText='display:none;margin-top:10px;padding:8px 10px;background:var(--gold-soft);border-radius:6px;font-size:10px;color:var(--warn);border-left:3px solid #f0b400;line-height:1.6';
  card.appendChild(nb);

  mount.appendChild(card);
}

const S={g:'',design:'',m:{},ps:[],sel:null,grain:'vertical',sa:.5,fw:60,fab:'stretch',vis:{grid:1,sa:1,grain:1,notch:1},fit:{ease:0,fba:0,frontLen:0,backLen:0,riseAdj:0,hipAdj:0,shoulderAdj:0,legLen:0,asymShoulder:0,asymHip:0}};
const SA_MAP={1:.25,2:.5,3:.625,4:1},SA_LBL={1:'1/4"',2:'1/2"',3:'5/8"',4:'1"'};
const PPI=9;let zoom=1,drag=null,dO={x:0,y:0};

// ===== GARMENT GRID =====
function buildGarmentGrid(){
  const grid=document.getElementById('bgrid');
  if(!grid)return;
  if(grid.children.length>0)return; // already built
  GARMENT_ORDER.forEach(key=>{
    const cfg=DESIGNS[key];
    const btn=document.createElement('button');
    btn.className='gc';
    btn.onclick=()=>pickG(btn,key);
    btn.innerHTML=`<div class="gc-ico">${ICONS[key]||''}</div><span class="gc-name">${cfg.label}</span><span class="gc-sub">${cfg.styles.map(s=>s.name).join(' \u00b7 ')}</span>${['jumpsuit','swim_dress'].includes(key)?'<span class="gc-new">New</span>':''}`;
    grid.appendChild(btn);
  });
}

// ===== DESIGN GRID =====
function buildDesignGrid(key){
  const cfg=DESIGNS[key];
  const grid=document.getElementById('designGrid');
  grid.innerHTML='';
  cfg.styles.forEach(st=>{
    const btn=document.createElement('button');
    btn.className='dcard';
    btn.id='dcard_'+st.id;
    btn.onclick=()=>pickDesign(btn,st.id,key);
    btn.innerHTML=`<div class="dcard-ico">${STYLE_ICONS[st.id]||st.icon||''}</div><span class="dcard-name">${st.name}</span><span class="dcard-sub">${st.sub}</span>`;
    grid.appendChild(btn);
  });
}

// ===== PICK GARMENT =====
function pickG(el,key){
  document.querySelectorAll('.gc').forEach(c=>c.classList.remove('on'));
  el.classList.add('on');
  S.g=key;S.design='';
  const cfg=DESIGNS[key];
  document.getElementById('selTitle').textContent='Selected: '+cfg.label;
  document.getElementById('selBody').textContent='Now choose your design style on the next tab';
  document.getElementById('selCard').style.display='block';
  buildDesignGrid(key);
  renderM(key);
  renderChips(key);
  document.getElementById('genBtn').disabled=true;
  document.getElementById('pg2Next').disabled=true;
  document.getElementById('mH').innerHTML='Your <em>'+cfg.label+'</em> measurements';
  document.getElementById('mSub').textContent='All measurements in inches. Fields marked * are required.';
  const tip=document.getElementById('mtip');
  tip.innerHTML=cfg.tip;tip.style.display='block';
  // Clear AI desc result
  document.getElementById('aiDescResult').classList.remove('show');
  document.getElementById('aiDescInput').value='';
  toast_('Selected: '+cfg.label+' \u2014 now pick a design style');

  // Auto-advance to Design tab after 350ms
  setTimeout(function(){var tabs=document.querySelectorAll('.btab');if(tabs[1]){showTab(tabs[1],'pg2');}},350);

  if(typeof renderSketch==='function')renderSketch();
}

// ===== PICK DESIGN =====
function pickDesign(el,styleId,garmentKey){
  document.querySelectorAll('.dcard').forEach(c=>c.classList.remove('on'));
  el.classList.add('on');
  S.design=styleId;
  document.getElementById('pg2Next').disabled=false;
  document.getElementById('genBtn').disabled=false;
  const st=DESIGNS[garmentKey||S.g].styles.find(s=>s.id===styleId);
  if(st){
    document.getElementById('pg5Sub').textContent=`${DESIGNS[S.g].label} \u00b7 ${st.name} (${st.sub||''}) \u00b7 ${S.ps?S.ps.length+' pieces · ':''}Drag pieces \u00b7 Scroll to zoom`;
    toast_('Style: '+st.name+' \u2014 '+st.sub);
  }
}

// ===== AI DESCRIPTION =====
function runAIDesc(){
  const input=document.getElementById('aiDescInput').value.trim();
  if(!input){toast_('Type a description first');return;}
  if(!S.g){toast_('Select a garment first');return;}
  const cfg=DESIGNS[S.g];
  const desc=input.toLowerCase();
  
  // Keyword matching — finds the best style match from description
  var scores=cfg.styles.map(function(s){
    var score=0;
    var sName=(s.name+' '+(s.sub||'')+'  '+s.id).toLowerCase();
    // Score by word overlap
    desc.split(/s+/).forEach(function(word){
      if(word.length>2 && sName.indexOf(word)>=0) score+=3;
    });
    // Score by common design keywords
    var keywords={
      'open back':['openback','open_back','back'], 'halter':['halter'],
      'racerback':['racer','racerback'], 'strapless':['strapless','bandeau'],
      'high neck':['high','neck','turtleneck'], 'empire':['empire'],
      'wrap':['wrap'], 'flare':['flare','flared'], 'mini':['mini'],
      'long':['long','full','maxi','floor'], 'crop':['crop','short','brief'],
      'ruffle':['ruffle'], 'high waist':['high','waist','highwaist'],
      'one shoulder':['shoulder','asymm'], 'zipper':['zip','front'],
      'lace up':['lace','up'], 'cut out':['cut','out','side']
    };
    Object.keys(keywords).forEach(function(k){
      if(desc.indexOf(k)>=0){
        keywords[k].forEach(function(kw){ if(sName.indexOf(kw)>=0) score+=5; });
      }
    });
    return {s:s, score:score};
  }).sort(function(a,b){return b.score-a.score;});
  
  var best=scores[0];
  if(best && best.score>0){
    // Auto-select the best matching style
    var el=document.querySelector('[data-style="'+best.s.id+'"]');
    if(el) pickDesign(el, best.s.id, S.g);
    toast_('Best match: '+best.s.name+(best.s.sub?' — '+best.s.sub:''));
  } else {
    // Show top 3 options
    var top3=scores.slice(0,3).map(function(x){return x.s.name;}).join(', ');
    toast_('Try one of these: '+top3);
  }
}

function renderM(key){
  const cfg=DESIGNS[key];
  const wrap=document.getElementById('mfields');
  wrap.innerHTML='';
  let buf=[];
  cfg.fields.forEach((f,i)=>{
    const div=document.createElement('div');
    const lbl=document.createElement('div');
    lbl.className='mfl';
    lbl.innerHTML='<span>'+f.l+(f.req?'<span class="req">*</span>':'<span class="opt"> opt</span>')+'</span>'+(f.h?'<span class="mfl-hint">'+f.h+'</span>':'');
    let inp;
    if(f.sel){
      inp=document.createElement('select');inp.className='mi';inp.id='m_'+f.id;
      f.sel.forEach(o=>{const op=document.createElement('option');op.value=op.textContent=o;if(o===f.def)op.selected=true;inp.appendChild(op);});
    }else{
      inp=document.createElement('input');inp.className='mi';inp.type='number';inp.id='m_'+f.id;
      inp.value=f.def||'';inp.min=f.mn;inp.max=f.mx;inp.placeholder=String(f.def||'');
    }
    div.appendChild(lbl);div.appendChild(inp);buf.push(div);
    const last=i===cfg.fields.length-1,nextSel=!last&&cfg.fields[i+1]?.sel;
    if(buf.length===2||last||f.sel||nextSel){
      if(buf.length===1){const w=document.createElement('div');w.className='mrow1';w.appendChild(buf[0]);wrap.appendChild(w);}
      else{const w=document.createElement('div');w.className='mrow2';buf.forEach(d=>w.appendChild(d));wrap.appendChild(w);}
      buf=[];
    }
  });
}
function renderChips(key){
  const w=document.getElementById('schips');if(!w)return;w.innerHTML='';
  const rule = (typeof S!=='undefined' && S.design && STYLE_CHIP_RULES[S.design]) || null;
  let chips = DESIGNS[key].chips.slice();
  if(rule && rule.remove.length){
    chips = chips.filter(c => !rule.remove.some(r => c.toLowerCase().indexOf(r.toLowerCase())>=0));
  }
  chips.forEach(c=>{
    const b=document.createElement('button');b.className='chip';b.textContent=c;
    if(rule && rule.auto.some(a => c.toLowerCase().indexOf(a.toLowerCase())>=0)){
      b.classList.add('on');
      b.title='Included by your chosen design style';
    }
    b.onclick=()=>b.classList.toggle('on');
    w.appendChild(b);
  });
  if(rule && rule.remove.length){
    const note=document.createElement('div');
    note.style.cssText='width:100%;font-size:9.5px;color:var(--gold);margin-top:6px;letter-spacing:.03em';
    note.innerHTML='&#10022; Features tailored to your <strong>'+(DESIGNS[key].styles.find(s=>s.id===S.design)||{}).name+'</strong> design &mdash; conflicting options hidden, included ones pre-selected';
    w.appendChild(note);
  }
}
function bmfCx(cup){
  var map={'AA':0,'A':0.5,'B':1,'C':1.5,'D':2,'DD':2.5,'DD/E':2.5,'E':2.5,'F':3,'G':3.5,'G+':3.5};
  return map[cup]||1.5;
}
function readM(){
  const cfg=DESIGNS[S.g];if(!cfg)return{};
  const m={};
  cfg.fields.forEach(f=>{const el=document.getElementById('m_'+f.id);if(el)m[f.id]=f.sel?el.value:(parseFloat(el.value)||f.def||0);});
  m.sa=S.sa;
  // Derived measurements — ensure these are always available
  // regardless of which garment's fields were collected
  if(!m.torsoF)  m.torsoF  = m.torso||15.5;
  if(!m.torsoG)  m.torsoG  = m.torsoF?(m.torsoF*1.55):24;
  if(!m.torsoB)  m.torsoB  = m.torso||14;
  if(!m.dressL)  m.dressL  = m.fullL||57;
  if(!m.fullL)   m.fullL   = m.dressL||57;
  if(!m.skirtL)  m.skirtL  = m.fullL?m.fullL*0.38:22;
  if(!m.waistPos)m.waistPos= m.torsoF||15.5;
  if(!m.topL)    m.topL    = 7;
  if(!m.frontL)  m.frontL  = m.dressL||57;
  if(!m.backL)   m.backL   = (m.dressL||57)*0.97;
  if(!m.outseam) m.outseam = (m.rise||10)+(m.inseam||28);
  if(!m.shoulder)m.shoulder= 14;
  if(!m.sleeveL) m.sleeveL = m.inseam?m.inseam*0.85:24;
  if(!m.tieLen)  m.tieLen  = 18;
  if(!m.strapL)  m.strapL  = m.torsoF?m.torsoF*0.5:8;
  if(!m.bottomL) m.bottomL = m.fullL?m.fullL*0.38:22;
  if(!m.gussetL) m.gussetL = 5;
  if(!m.crotchL) m.crotchL = 5;
  if(!m.crotch)  m.crotch  = m.rise?m.rise*1.5:15;
  if(!m.armhole) m.armhole = m.bust?m.bust*0.22:8;
  if(!m.neckW)   m.neckW   = m.bust?m.bust*0.18:6.5;
  if(!m.bust)    m.bust    = 36;
  if(!m.waist)   m.waist   = 28;
  if(!m.hips)    m.hips    = 38;
  if(!m.rise)    m.rise    = 10;
  if(!m.inseam)  m.inseam  = 28;
  if(!m.cup)     m.cup     = 'C';
  if(!m.bandLen) m.bandLen = m.ubust||29;
  return m;
}

// ===== CANVAS SETUP =====
let cnv,ctx; // initialized in DOMContentLoaded
function rzCnv(){
  if(!cnv)return;
  const cw=document.getElementById('cwrap');
  cnv.width=Math.max(cw.clientWidth||620,S.fw*PPI*zoom+240);
  cnv.height=Math.max(520,1400);
  drawAll();
}
window.addEventListener('resize',rzCnv);

// ===== GENERATE =====
async function generate(){
  // Wait for tier detection — but cap wait at 3 seconds
  if (!BMF_TIER_READY) {
    try {
      await Promise.race([
        BMF_TIER_PROMISE,
        new Promise(function(r){ setTimeout(r, 3000); })
      ]);
    } catch(e) {}
  }

  // GATE LOGIC:
  // - Logged in (any tier) → ALWAYS allow. They have an account, they're a customer.
  // - Not logged in + under 10 free patterns → allow (free trial)
  // - Not logged in + 10+ patterns → show sign-in prompt
  if (BMF_USER) {
    // Logged in — no gate, always proceed
  } else if (BMF_GENS_USED >= GATES.free.gens) {
    showSignInPrompt();
    return;
  }

  if(!S.g){toast_('Select a garment first');return;}
  if(!S.design){toast_('Select a design style first');return;}
  nxt('pg5');
  document.getElementById('emp').classList.add('gone');
  const ov=document.getElementById('aiovl');ov.classList.add('show');
  const styleDef=DESIGNS[S.g].styles.find(s=>s.id===S.design);
  const steps=[
    ['Drafting '+styleDef.name+' pieces\u2026','Applying '+DESIGNS[S.g].label+' parametric formulas'],
    ['Seam allowances\u2026',SA_LBL[document.getElementById('saS').value]+' on all edges'],
    ['Grain lines & notches\u2026','Balance marks, fold lines, grain arrows'],
    ['AI layout optimizer\u2026','3-pass bin-packing for minimum fabric waste']
  ];
  for(const[h,p]of steps){document.getElementById('aiH').textContent=h;document.getElementById('aiP').textContent=p;await wait(300);}
  const m=readM();S.m=m;
  S.fit=readFit();
  S.ps=styleDef.pieces(m);
  applyFitAdjustments(S.ps,S.fit,m);
  // Initial position — left-to-right rows
  let x=55,y=36,rH=0,col=0;
  S.ps.forEach(p=>{
    p.sa=m.sa;
    p.wP=(p.w+p.sa*2)*PPI;
    p.hP=(p.h+p.sa*2)*PPI;
    p.rot=0;p.x=x;p.y=y;
    x+=p.wP+18;rH=Math.max(rH,p.hP);col++;
    if(col>=3){x=55;y+=rH+18;rH=0;col=0;}
  });
  ov.classList.remove('show');
  autoNest(true);
  renderPL();updStats();rzCnv();drawAll();
  bumpGenCount();
  if(typeof renderAdvisor==='function')renderAdvisor();
  getAI(m,DESIGNS[S.g],styleDef);
  var fitActive=Object.values(S.fit).some(function(v){return v!==0;});
  renderFitNotes();
  toast_('Pattern generated — '+styleDef.name+(fitActive?' · Fit adjustments applied':''));
}

// ===== 3-PASS NESTING ENGINE =====
function autoNest(showPanel){
  if(showPanel===undefined)showPanel=true;
  if(!S.ps||!S.ps.length){toast_('Generate a pattern first, then tap Auto Arrange');return;}
  // Skip explanation after first time
  if(showPanel&&!window._nestExplained){
    window._nestExplained=true;
    var ov=document.createElement('div');
    ov.id='bmfNestExplain';
    ov.style.cssText='position:fixed;inset:0;z-index:99999;background:rgba(6,15,40,.82);display:flex;align-items:center;justify-content:center;padding:20px';
    ov.innerHTML='<div style="background:var(--surface);border-radius:16px;max-width:380px;width:100%;padding:24px;text-align:center">'
      +'<div style="font-size:32px;margin-bottom:10px">&#129302;</div>'
      +'<div style="font-size:17px;font-weight:800;color:var(--ink);margin-bottom:10px">Auto Arrange</div>'
      +'<div style="font-size:13px;color:var(--ink-2);line-height:1.7;margin-bottom:14px;text-align:left">'
      +'Moves all your pattern pieces to use the least amount of fabric possible. '
      +'It tries hundreds of arrangements and picks the most efficient one.'
      +'</div>'
      +'<button id="bmfNestRunBtn" style="width:100%;padding:13px;background:var(--accent);color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:800;cursor:pointer;margin-bottom:8px">Run Auto Arrange &rarr;</button>'
      +'<button id="bmfNestCancelBtn" style="width:100%;padding:10px;background:none;border:none;color:var(--ink-4);font-size:12px;cursor:pointer">Cancel</button>'
      +'</div>';
    document.body.appendChild(ov);
    document.getElementById('bmfNestRunBtn').addEventListener('click',function(){
      ov.remove();
      doAutoNest();
    });
    document.getElementById('bmfNestCancelBtn').addEventListener('click',function(){
      ov.remove();
    });
    return;
  }
  doAutoNest();
}
function doAutoNest(){
  if(!S.ps||!S.ps.length){toast_('Generate a pattern first');return;}
  // Ensure wP/hP are set on all pieces — they may be missing if loaded from project
  var sa = S.sa||0.5;
  S.ps.forEach(function(p){
    if(!p.wP||!p.hP){
      p.sa = sa;
      p.wP = (p.w + sa*2) * PPI;
      p.hP = (p.h + sa*2) * PPI;
    }
    if(typeof p.rot === 'undefined') p.rot = 0;
    if(typeof p.x === 'undefined') p.x = 46;
    if(typeof p.y === 'undefined') p.y = 36;
  });
  try {
    var fwP=S.fw*PPI,mg=16,gut=8;
    var canRot=!['directional','sequin','velvet'].includes(S.fab);
    var best=runPasses(canRot,fwP,mg,gut);
    if(!best||!best.length){toast_('Could not arrange pieces — try again');return;}
    best.forEach(function(item){
      var p=S.ps.find(function(q){return q.id===item.id;});
      if(p){p.x=item.x;p.y=item.y;p.rot=item.rot;}
    });
    updStats();
    nxt('pg5');
    setTimeout(function(){
      rzCnv();drawAll();
      var eff=calcEff();
      showNP(eff);
      if(cnv){cnv.style.outline='3px solid #1255b0';setTimeout(function(){cnv.style.outline='';},1500);}
      toast_('Done! Pieces arranged — '+eff+'% efficiency.');
    },200);
  } catch(e) {
    console.error('Auto arrange error:', e);
    toast_('Auto arrange error — please regenerate your pattern and try again');
  }
}
function runPasses(canRot,fwP,mg,gut){
  const a=[...S.ps].sort((a,b)=>b.hP-a.hP);
  const b=[...S.ps].sort((a,b)=>(b.wP*b.hP)-(a.wP*a.hP));
  const c=[...S.ps].sort((a,b)=>b.wP-a.wP);
  const r1=sPack(a,canRot,fwP,mg,gut);
  const r2=sPack(b,canRot,fwP,mg,gut);
  const r3=sPack(c,canRot,fwP,mg,gut);
  const my=r=>(r.length?Math.max(...r.map(i=>i.y+i.h)):9999);
  const m1=my(r1),m2=my(r2),m3=my(r3);
  return m1<=m2&&m1<=m3?r1:m2<=m3?r2:r3;
}
function sPack(pieces,canRot,fwP,mg,gut){
  const result=[],shelves=[],sX=46+mg,maxW=fwP-mg*2;
  pieces.forEach(p=>{
    let w=p.wP,h=p.hP,rot=0;
    if(canRot&&h<w&&h<=maxW){[w,h]=[h,w];rot=90;}
    if(w>maxW&&canRot&&h<=maxW){[w,h]=[h,w];rot=90;}
    w=Math.min(w,maxW);
    let bS=null,bSc=Infinity;
    for(const s of shelves){const rem=sX+maxW-s.cx;if(rem>=w){const sc=Math.abs(s.h-h)*.65+(s.cx-sX)*.001;if(sc<bSc){bSc=sc;bS=s;}}}
    if(bS){result.push({id:p.id,x:bS.cx,y:bS.y,w,h,rot});bS.cx+=w+gut;bS.h=Math.max(bS.h,h);}
    else{const ny=shelves.length>0?Math.max(...shelves.map(s=>s.y+s.h))+gut:mg+28;shelves.push({y:ny,h,cx:sX+w+gut});result.push({id:p.id,x:sX,y:ny,w,h,rot});}
  });
  return result;
}
function calcEff(){
  if(!S.ps.length)return 0;
  let maxY=0;S.ps.forEach(p=>{maxY=Math.max(maxY,(p.y+p.hP)/PPI);});
  const pa=S.ps.reduce((s,p)=>s+p.w*p.h,0);
  return Math.min(97,Math.round(pa/(S.fw*maxY)*100));
}

// ===== NESTING RESULT PANEL =====
function showNP(eff){
  const ex=document.getElementById('nestPanel');if(ex)ex.remove();
  let maxY=0;S.ps.forEach(p=>{maxY=Math.max(maxY,(p.y+p.hP)/PPI);});
  const yds=(maxY/36).toFixed(2),buy=Math.ceil(yds*4)/4,waste=100-eff;
  const ec=eff>=85?'#077040':eff>=70?'#8f4500':'#a8001a';
  const panel=document.createElement('div');panel.id='nestPanel';
  panel.innerHTML=`<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:13px">
    <div style="font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--accent-deep)">\u29c1 AI Layout Result</div>
    <button onclick="document.getElementById('nestPanel').remove()" style="background:none;border:none;font-size:17px;color:var(--ink-3);cursor:pointer">\u2715</button>
  </div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin-bottom:14px">
    <div style="background:var(--surface-2);border:1.5px solid #93c4ff;border-radius:8px;padding:11px;text-align:center"><div style="font-size:24px;font-weight:700;color:${ec}">${eff}%</div><div style="font-size:9px;font-weight:800;text-transform:uppercase;color:var(--ink-3);margin-top:2px">Efficiency</div></div>
    <div style="background:var(--ok-bg);border:1.5px solid #5dc898;border-radius:8px;padding:11px;text-align:center"><div style="font-size:24px;font-weight:700;color:var(--ok)">${buy}</div><div style="font-size:9px;font-weight:800;text-transform:uppercase;color:var(--ink-3);margin-top:2px">Yards to Buy</div></div>
    <div style="background:var(--warn-bg);border:1.5px solid #f9a825;border-radius:8px;padding:11px;text-align:center"><div style="font-size:24px;font-weight:700;color:var(--warn)">${waste}%</div><div style="font-size:9px;font-weight:800;text-transform:uppercase;color:var(--ink-3);margin-top:2px">Waste</div></div>
  </div>
  <div style="font-size:11px;font-weight:800;color:var(--accent-deep);margin-bottom:8px">\ud83d\udcdd Cutting Instructions</div>
  <div style="font-size:12px;color:var(--ink-2);line-height:1.7;font-weight:500">${buildCI()}</div>
  <div style="margin-top:12px;padding-top:12px;border-top:1.5px solid #ccd6ee">
    <div style="font-size:11px;font-weight:800;color:var(--accent-deep);margin-bottom:7px">\u2728 Waste Reduction Tips</div>
    ${buildWT(eff)}
  </div>`;
  const pg5=document.getElementById('pg5'),cw=document.getElementById('cwrap');
  pg5.insertBefore(panel,cw);
  panel.scrollIntoView({behavior:'smooth',block:'nearest'});
}
function buildCI(){
  const fab=document.getElementById('fabType')?.value||'stretch';
  const sa=SA_LBL[document.getElementById('saS')?.value||2];
  const foldPs=S.ps.filter(p=>p.t?.includes('fold'));
  const mirrorPs=S.ps.filter(p=>p.q?.toLowerCase().includes('mirror'));
  let html='<ol style="padding-left:18px;margin:0">';
  html+=`<li style="margin-bottom:6px">Fold your <strong>${S.fw}" ${fab}</strong> fabric in half lengthwise, selvedges together. Grain runs <strong>${S.grain}</strong>.</li>`;
  if(foldPs.length)html+=`<li style="margin-bottom:6px">Place <strong>${foldPs.map(p=>p.n).join(', ')}</strong> on the <strong>fold edge</strong>. Pin firmly. Do NOT cut the fold.</li>`;
  html+=`<li style="margin-bottom:6px">All seam allowances are <strong>${sa}</strong>. Outer dashed line = cutting line. Solid shape = sewing line.</li>`;
  if(mirrorPs.length)html+=`<li style="margin-bottom:6px">Mirrored pieces: cut one, flip the pattern horizontally, cut the second as mirror image.</li>`;
  html+=`<li style="margin-bottom:6px">Cut <strong>notches</strong> as tiny 2\u20133mm outward snips at balance marks.</li>`;
  html+=`<li style="margin-bottom:6px">Use a rotary cutter with a fresh blade for clean cuts on stretch fabric.</li>`;
  html+='</ol>';return html;
}
function buildWT(eff){
  const tips=[];
  if(S.fw<60)tips.push('Buy <strong>60"+ wide fabric</strong> \u2014 wider fabric dramatically improves nesting efficiency.');
  if(eff<80)tips.push('Manually move <strong>small pieces into gaps</strong> \u2014 ties, gussets, and bindings often fit in corners.');
  tips.push('Layout ran <strong>3 sort strategies</strong> (height, area, width) and chose the best result automatically.');
  if(S.ps.some(p=>p.t?.includes('fold')))tips.push('Keep <strong>fold-on-line pieces</strong> snug against the left green guide for maximum usable width.');
  return tips.slice(0,4).map(t=>`<div style="display:flex;gap:7px;margin-bottom:5px"><span style="color:var(--ok);font-weight:800;flex-shrink:0">\u2713</span><span style="font-size:11px;color:var(--ink-2);font-weight:500">${t}</span></div>`).join('');
}

// ===== DRAW ENGINE =====
function drawAll(){
  if(!cnv||!ctx)return;
  const cw=Math.max(cnv.width,S.fw*PPI*zoom+240);
  if(cnv.width!==cw)cnv.width=cw;
  ctx.clearRect(0,0,cnv.width,cnv.height);
  ctx.fillStyle='#eef2ff';ctx.fillRect(0,0,cnv.width,cnv.height);
  // Grid
  if(S.vis.grid){
    const g=PPI*zoom;ctx.strokeStyle='rgba(18,85,176,.08)';ctx.lineWidth=.6;
    for(let x=0;x<cnv.width;x+=g){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,cnv.height);ctx.stroke();}
    for(let y=0;y<cnv.height;y+=g){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(cnv.width,y);ctx.stroke();}
  }
  // Fabric width guides
  const fw=S.fw*PPI*zoom;
  ctx.strokeStyle='rgba(7,112,64,.38)';ctx.lineWidth=2;ctx.setLineDash([7,5]);
  ctx.beginPath();ctx.moveTo(46,0);ctx.lineTo(46,cnv.height);ctx.stroke();
  ctx.beginPath();ctx.moveTo(46+fw,0);ctx.lineTo(46+fw,cnv.height);ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle='rgba(7,112,64,.85)';ctx.font='700 '+Math.round(12*zoom)+'px Georgia,serif';
  ctx.fillText('\u2190\u2014 '+S.fw+'" fabric width \u2014\u2192',54,Math.round(16*zoom));
  S.ps.forEach(p=>drawP(p));
}

function drawP(p){
  ctx.save();
  const pcx=(p.x+p.wP/2)*zoom,pcy=(p.y+p.hP/2)*zoom;
  ctx.translate(pcx,pcy);ctx.rotate(p.rot*Math.PI/180);
  const hw=p.wP*zoom/2,hh=p.hP*zoom/2;
  const sw=p.w*PPI*zoom/2,sh=p.h*PPI*zoom/2;
  const saW=p.sa*PPI*zoom;
  const isSel=p===S.sel;
  // SA dashed outline
  if(S.vis.sa){
    ctx.strokeStyle=hr(p.c,.3);ctx.lineWidth=.9;ctx.setLineDash([3,3]);
    ctx.beginPath();sh2(p.s,hw,hh);ctx.stroke();ctx.setLineDash([]);
  }
  // Fill
  ctx.fillStyle=hr(p.c,isSel?.22:.1);
  ctx.beginPath();sh2(p.s,sw,sh);ctx.fill();
  // Stroke
  ctx.strokeStyle=isSel?p.c:hr(p.c,.82);ctx.lineWidth=isSel?3:1.8;
  ctx.beginPath();sh2(p.s,sw,sh);ctx.stroke();
  // Grain arrow
  if(S.vis.grain){
    const gl=Math.min(sh,sw)*.55;
    const ga=(S.grain==='bias'?45:S.grain==='horizontal'?0:90)*Math.PI/180;
    ctx.strokeStyle=hr(p.c,.65);ctx.lineWidth=1.2;
    ctx.beginPath();ctx.moveTo(-Math.sin(ga)*gl,-Math.cos(ga)*gl);ctx.lineTo(Math.sin(ga)*gl,Math.cos(ga)*gl);ctx.stroke();
    arh(Math.sin(ga)*gl,Math.cos(ga)*gl,ga,p.c);
    arh(-Math.sin(ga)*gl,-Math.cos(ga)*gl,ga+Math.PI,p.c);
  }
  // Notches
  if(S.vis.notch&&p.t?.includes('notch')){
    ctx.strokeStyle=hr(p.c,.95);ctx.lineWidth=2;
    [[sw,0],[-sw,0],[0,sh]].forEach(([nx,ny])=>{
      ctx.beginPath();ctx.moveTo(nx-5,ny);ctx.lineTo(nx+5,ny);ctx.stroke();
      ctx.beginPath();ctx.moveTo(nx,ny-5);ctx.lineTo(nx,ny+5);ctx.stroke();
    });
  }
  // Fold line
  if(p.t?.includes('fold')){
    ctx.strokeStyle=hr(p.c,.4);ctx.lineWidth=1.2;ctx.setLineDash([2,2]);
    ctx.beginPath();ctx.moveTo(-hw+saW,-hh);ctx.lineTo(-hw+saW,hh);ctx.stroke();ctx.setLineDash([]);
    ctx.fillStyle=hr(p.c,.55);ctx.font='bold '+Math.max(8,Math.round(8*zoom))+'px Inter,sans-serif';
    ctx.save();ctx.translate(-hw+saW+3,-4);ctx.rotate(-Math.PI/2);ctx.fillText('FOLD',0,0);ctx.restore();
  }
  // Labels
  const fsz=Math.max(10,Math.round(11*zoom));
  ctx.textAlign='center';
  ctx.font='700 '+fsz+'px Georgia,serif';ctx.fillStyle=hr(p.c,1);
  ctx.fillText(p.n,0,Math.round(-12*zoom));
  ctx.font='600 '+Math.max(8,Math.round(9*zoom))+'px Inter,sans-serif';ctx.fillStyle='#192846';
  ctx.fillText(p.q,0,Math.round(5*zoom));
  ctx.fillText(p.w.toFixed(1)+'" \u00d7 '+p.h.toFixed(1)+'"',0,Math.round(18*zoom));
  // Selection handles
  if(isSel){
    ctx.strokeStyle=p.c;ctx.lineWidth=3;ctx.setLineDash([]);ctx.strokeRect(-hw,-hh,hw*2,hh*2);
    [[-hw,-hh],[hw,-hh],[hw,hh],[-hw,hh]].forEach(([hx,hy])=>{
      ctx.fillStyle='#fff';ctx.strokeStyle=p.c;ctx.lineWidth=2;
      ctx.fillRect(hx-5,hy-5,10,10);ctx.strokeRect(hx-5,hy-5,10,10);
    });
  }
  ctx.restore();
}

// ===== SHAPE RENDERER =====
// tri=triangle cup (apex top), cup_round=dome cup, brif=brief front, brib=brief back
// braz=brazilian back, suf/lef=swimsuit/leotard front, sub/leb=swimsuit/leotard back
// lgf=leg front, lgb=leg back, drf/skf/bdf/tpf=dress/skirt front
// drb/skb/bdb/tpb=dress/skirt back, rarc=arc band, oval=oval, racerb=racerback
// sweet=sweetheart, rect=rectangle
function sh2(t,hw,hh){
  switch(t){
    case 'tri':
      // Triangle bikini cup - apex top, flat base
      ctx.moveTo(0,-hh);ctx.lineTo(hw*.9,hh*.2);ctx.lineTo(hw*.65,hh);
      ctx.lineTo(-hw*.65,hh);ctx.lineTo(-hw*.9,hh*.2);ctx.closePath();break;
    case 'cup_round':
      // Dome cup - rounded top
      ctx.moveTo(-hw,-hh);ctx.quadraticCurveTo(0,-hh*1.32,hw,-hh);
      ctx.quadraticCurveTo(hw*.9,0,hw*.58,hh);ctx.lineTo(-hw*.58,hh);
      ctx.quadraticCurveTo(-hw*.9,0,-hw,-hh);ctx.closePath();break;
    case 'brif':
      ctx.moveTo(-hw,-hh);ctx.quadraticCurveTo(0,-hh*1.1,hw,-hh);
      ctx.quadraticCurveTo(hw*.5,hh*.2,hw*.3,hh);ctx.quadraticCurveTo(0,hh*1.1,-hw*.3,hh);
      ctx.quadraticCurveTo(-hw*.5,hh*.2,-hw,-hh);ctx.closePath();break;
    case 'brib':
      ctx.moveTo(-hw,-hh);ctx.quadraticCurveTo(0,-hh*1.05,hw,-hh);
      ctx.quadraticCurveTo(hw*.62,hh*.3,hw*.35,hh);ctx.quadraticCurveTo(0,hh*1.15,-hw*.35,hh);
      ctx.quadraticCurveTo(-hw*.62,hh*.3,-hw,-hh);ctx.closePath();break;
    case 'braz':
      // Very narrow Brazilian back
      ctx.moveTo(-hw,-hh);ctx.quadraticCurveTo(0,-hh*1.05,hw,-hh);
      ctx.quadraticCurveTo(hw*.38,hh*.2,hw*.14,hh);ctx.quadraticCurveTo(0,hh*1.22,-hw*.14,hh);
      ctx.quadraticCurveTo(-hw*.38,hh*.2,-hw,-hh);ctx.closePath();break;
    case 'suf':case 'lef':
      ctx.moveTo(-hw*.5,-hh);ctx.quadraticCurveTo(0,-hh*1.05,hw*.5,-hh);
      ctx.quadraticCurveTo(hw*.75,-hh*.5,hw,0);ctx.quadraticCurveTo(hw*.8,hh*.5,hw*.3,hh);
      ctx.quadraticCurveTo(0,hh*1.1,-hw*.3,hh);ctx.quadraticCurveTo(-hw*.8,hh*.5,-hw,0);
      ctx.quadraticCurveTo(-hw*.75,-hh*.5,-hw*.5,-hh);ctx.closePath();break;
    case 'sub':case 'leb':
      ctx.moveTo(-hw*.6,-hh);ctx.quadraticCurveTo(0,-hh*.92,hw*.6,-hh);
      ctx.quadraticCurveTo(hw*.82,-hh*.45,hw,0);ctx.quadraticCurveTo(hw*.85,hh*.5,hw*.3,hh);
      ctx.quadraticCurveTo(0,hh*1.12,-hw*.3,hh);ctx.quadraticCurveTo(-hw*.85,hh*.5,-hw,0);
      ctx.quadraticCurveTo(-hw*.82,-hh*.45,-hw*.6,-hh);ctx.closePath();break;
    case 'lgf':
      ctx.moveTo(-hw,-hh);ctx.quadraticCurveTo(0,-hh*1.04,hw,-hh);
      ctx.quadraticCurveTo(hw*1.05,0,hw*.55,hh);ctx.lineTo(-hw*.55,hh);
      ctx.quadraticCurveTo(-hw*1.05,0,-hw,-hh);ctx.closePath();break;
    case 'lgb':
      ctx.moveTo(-hw,-hh);ctx.quadraticCurveTo(0,-hh*1.08,hw,-hh);
      ctx.quadraticCurveTo(hw*1.09,0,hw*.62,hh);ctx.lineTo(-hw*.62,hh);
      ctx.quadraticCurveTo(-hw*1.09,0,-hw,-hh);ctx.closePath();break;
    case 'drf':case 'skf':case 'bdf':case 'tpf':
      ctx.moveTo(-hw*.75,-hh);ctx.lineTo(hw*.75,-hh);
      ctx.quadraticCurveTo(hw,-hh*.45,hw,0);ctx.lineTo(hw*1.06,hh);
      ctx.lineTo(-hw*1.06,hh);ctx.quadraticCurveTo(-hw,-hh*.45,-hw*.75,-hh);ctx.closePath();break;
    case 'drb':case 'skb':case 'bdb':case 'tpb':
      ctx.moveTo(-hw*.7,-hh);ctx.lineTo(hw*.7,-hh);
      ctx.quadraticCurveTo(hw,-hh*.4,hw,0);ctx.lineTo(hw*1.07,hh);
      ctx.lineTo(-hw*1.07,hh);ctx.quadraticCurveTo(-hw,-hh*.4,-hw*.7,-hh);ctx.closePath();break;
    case 'rarc':
      ctx.moveTo(-hw,-hh);ctx.quadraticCurveTo(0,-hh*1.12,hw,-hh);
      ctx.lineTo(hw,hh);ctx.lineTo(-hw,hh);ctx.closePath();break;
    case 'oval':
      ctx.ellipse(0,0,hw,hh,0,0,Math.PI*2);break;
    case 'racerb':
      // Narrows to a point at top center
      ctx.moveTo(-hw,-hh);ctx.lineTo(hw,-hh);
      ctx.quadraticCurveTo(hw*.55,-hh*.3,hw*.18,0);ctx.lineTo(hw*.18,hh);
      ctx.lineTo(-hw*.18,hh);ctx.lineTo(-hw*.18,0);
      ctx.quadraticCurveTo(-hw*.55,-hh*.3,-hw,-hh);ctx.closePath();break;
    case 'sweet':
      // Sweetheart — heart dip at top center
      ctx.moveTo(0,-hh*.55);
      ctx.quadraticCurveTo(-hw*.5,-hh*1.25,-hw,-hh*.48);
      ctx.quadraticCurveTo(-hw*.82,hh*.42,-hw*.38,hh);
      ctx.lineTo(hw*.38,hh);
      ctx.quadraticCurveTo(hw*.82,hh*.42,hw,-hh*.48);
      ctx.quadraticCurveTo(hw*.5,-hh*1.25,0,-hh*.55);ctx.closePath();break;
    default:ctx.rect(-hw,-hh,hw*2,hh*2);
  }
}

function arh(x,y,a,col){
  const s=6*zoom;ctx.save();ctx.translate(x,y);ctx.rotate(a);
  ctx.strokeStyle=col;ctx.lineWidth=1.2;ctx.beginPath();
  ctx.moveTo(0,0);ctx.lineTo(-s,-s*.5);ctx.moveTo(0,0);ctx.lineTo(-s,s*.5);
  ctx.stroke();ctx.restore();
}
function hr(h,a){
  if(!h||h.length<7)return 'rgba(18,85,176,'+a+')';
  const r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16);
  return 'rgba('+r+','+g+','+b+','+a+')';
}

// ===== CANVAS EVENTS =====
function hitTest(mx,my){
  for(let i=S.ps.length-1;i>=0;i--){
    const p=S.ps[i];
    if(mx>=p.x&&mx<=p.x+p.wP&&my>=p.y&&my<=p.y+p.hP)return p;
  }return null;
}
/* canvas listeners moved inside _init */


// ===== STATS =====
function updStats(){
  if(!S.ps.length)return;
  let maxY=0;S.ps.forEach(p=>{maxY=Math.max(maxY,(p.y+p.hP)/PPI);});
  const fw=S.fw,pa=S.ps.reduce((s,p)=>s+p.w*p.h,0),ta=fw*maxY;
  const eff=Math.min(97,Math.round(pa/ta*100));
  const yds=(maxY/36).toFixed(2);
  document.getElementById('sFW').textContent=fw+'"';
  document.getElementById('sFL').textContent=maxY.toFixed(1)+'"';
  var _sPA=document.getElementById('sPA');if(_sPA)_sPA.textContent=pa.toFixed(0)+' sq in';
  var _sWA=document.getElementById('sWA');if(_sWA)_sWA.textContent=(ta-pa).toFixed(0)+' sq in';
  document.getElementById('sEff').textContent=eff+'%';
  document.getElementById('eFill').style.width=eff+'%';
  document.getElementById('eFill').style.background=eff>80?'var(--green)':eff>65?'var(--warn)':'var(--red)';
  document.getElementById('sPC').textContent=S.ps.length;
  var _sSA=document.getElementById('sSA');if(_sSA)_sSA.textContent=SA_LBL[(document.getElementById('saS')||{}).value||2];
  var _sGr=document.getElementById('sGr');if(_sGr)_sGr.textContent=S.grain.charAt(0).toUpperCase()+S.grain.slice(1);
  document.getElementById('sYd').textContent=yds+' yds (buy '+Math.ceil(yds*4)/4+' yds)';
  document.getElementById('sSKU').textContent=DESIGNS[S.g]?.sku||'\u2014';
  const styleLabel=DESIGNS[S.g]?.styles.find(s=>s.id===S.design)?.name||S.design;
  document.getElementById('sDesign').textContent=(DESIGNS[S.g]?.label||'\u2014')+' \u00b7 '+styleLabel;
}

// ===== PIECES LIST =====
function renderPL(){
  var el=document.getElementById('rpPieces');
  if(!el||!S.ps.length)return;
  var shapeLabel={
    rect:'Rectangle','suf':'Swimsuit Front','sub':'Swimsuit Back',
    'lef':'Leotard Front','leb':'Leotard Back','lgf':'Leg Front','lgb':'Leg Back',
    'drf':'Dress Front','drb':'Dress Back','brif':'Brief Front','brib':'Brief Back',
    'tri':'Triangle Cup','cup_round':'Cup Dome','oval':'Oval','rarc':'Arc Band',
    'skf':'Skirt Front','skb':'Skirt Back','bdf':'Bodice Front','bdb':'Bodice Back',
    'sweet':'Sweetheart','racerb':'Racerback','braz':'Brazilian'
  };
  el.innerHTML=S.ps.map(function(p,i){
    var isSel=p===S.sel;
    var grainDir=S.grain==='bias'?'Bias (45°)':S.grain==='horizontal'?'Horizontal':'Vertical';
    var shapeName=shapeLabel[p.s]||p.s||'Custom';
    var hasGrain=p.t&&p.t.includes('grain');
    var hasFold=p.t&&p.t.includes('fold');
    var hasNotch=p.t&&p.t.includes('notch');
    var isMirror=p.q&&p.q.toLowerCase().includes('mirror');
    var area=(p.w*p.h/144).toFixed(2); // sq ft
    // SA dimensions — final cut size including seam allowance
    var cutW=(p.w+(p.sa||0.5)*2).toFixed(2);
    var cutH=(p.h+(p.sa||0.5)*2).toFixed(2);
    return '<div class="pc'+(isSel?' sel':'')+'" onclick="selP('+i+')" style="border:2px solid '+(isSel?p.c:'var(--border)')+';border-radius:10px;padding:10px 12px;margin-bottom:8px;background:'+(isSel?'var(--surface-2)':'var(--surface)')+';cursor:pointer;transition:all .15s">'
      // Header row: color dot + name + quantity
      +'<div style="display:flex;align-items:center;gap:7px;margin-bottom:6px">'
      +'<div style="width:12px;height:12px;border-radius:50%;background:'+p.c+';flex-shrink:0;box-shadow:0 1px 3px rgba(0,0,0,.2)"></div>'
      +'<span style="font-size:13px;font-weight:800;color:var(--ink);flex:1">'+p.n+'</span>'
      +'<span style="font-size:10px;font-weight:700;color:#fff;background:var(--accent);border-radius:10px;padding:2px 7px;white-space:nowrap">'+p.q+'</span>'
      +'</div>'
      // Finished dimensions
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-bottom:8px">'
      +'<div style="background:var(--surface-2);border-radius:6px;padding:6px 8px">'
      +'<div style="font-size:9px;font-weight:800;color:var(--ink-4);letter-spacing:.04em;margin-bottom:1px">FINISHED SIZE</div>'
      +'<div style="font-size:12px;font-weight:700;color:var(--ink)">'+p.w.toFixed(2)+'" &times; '+p.h.toFixed(2)+'"</div>'
      +'</div>'
      +'<div style="background:var(--ok-bg);border-radius:6px;padding:6px 8px">'
      +'<div style="font-size:9px;font-weight:800;color:var(--ink-4);letter-spacing:.04em;margin-bottom:1px">CUT SIZE (+SA)</div>'
      +'<div style="font-size:12px;font-weight:700;color:var(--ok)">'+cutW+'" &times; '+cutH+'"</div>'
      +'</div>'
      +'</div>'
      // Details row
      +'<div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px">'
      +(hasGrain?'<span style="font-size:10px;background:var(--surface-2);color:var(--accent);border-radius:5px;padding:2px 7px;font-weight:700">&#8597; '+grainDir+'</span>':'')
      +(hasFold?'<span style="font-size:10px;background:var(--ok-bg);color:var(--ok);border-radius:5px;padding:2px 7px;font-weight:700">&#9641; On Fold</span>':'')
      +(hasNotch?'<span style="font-size:10px;background:var(--warn-bg);color:var(--warn);border-radius:5px;padding:2px 7px;font-weight:700">&#9651; Notch</span>':'')
      +(isMirror?'<span style="font-size:10px;background:var(--violet-soft);color:var(--accent-2);border-radius:5px;padding:2px 7px;font-weight:700">&#10234; Mirror</span>':'')
      +'<span style="font-size:10px;background:var(--surface-2);color:var(--ink-3);border-radius:5px;padding:2px 7px">'+shapeName+'</span>'
      +'</div>'
      // SA info
      +'<div style="font-size:10px;color:var(--ink-4);margin-bottom:8px">'
      +'SA: '+(p.sa||0.5)+'" included &nbsp;&middot;&nbsp; '
      +area+' sq ft &nbsp;&middot;&nbsp; '
      +(hasFold?'Cut on fold — fold fabric first':'Cut to size shown')
      +'</div>'
      // Fit note if asymmetry
      +(p._fitNote?'<div style="font-size:10px;color:var(--warn);background:var(--gold-soft);border-radius:5px;padding:5px 8px;margin-bottom:8px;border-left:3px solid #f0b400">&#9986; '+p._fitNote+'</div>':'')
      // Action buttons
      +(isSel?'<div style="display:flex;gap:6px">'
        +'<button onclick="event.stopPropagation();rotateSel90()" style="flex:1;padding:6px;background:var(--surface-2);border:1px solid #c5d9f5;border-radius:6px;font-size:10px;font-weight:700;color:var(--accent);cursor:pointer">&#8635; Rotate 90°</button>'
        +'<button onclick="event.stopPropagation();flipSel()" style="flex:1;padding:6px;background:var(--surface-2);border:1px solid #c5d9f5;border-radius:6px;font-size:10px;font-weight:700;color:var(--accent);cursor:pointer">&#10234; Flip</button>'
        +'<button onclick="event.stopPropagation();centerSel()" style="flex:1;padding:6px;background:var(--surface-2);border:1px solid #c5d9f5;border-radius:6px;font-size:10px;font-weight:700;color:var(--accent);cursor:pointer">&#8982; Center</button>'
        +'</div>':'')
      +'</div>';
  }).join('');
}
function selP(i){S.sel=S.ps[i];renderPL();drawAll();nxt('pg5');}
function rotateSel90(){
  if(!S.sel){toast_('Select a piece first');return;}
  S.sel.rot=(S.sel.rot+90)%360;
  // Swap wP/hP for 90° increments
  var tmp=S.sel.wP;S.sel.wP=S.sel.hP;S.sel.hP=tmp;
  drawAll();renderPL();toast_('Rotated 90°');
}
function centerSel(){
  if(!S.sel){toast_('Select a piece first');return;}
  var fw=S.fw*PPI;
  S.sel.x=46+(fw/2)-(S.sel.wP/2);
  S.sel.y=60;
  drawAll();toast_('Piece centered on fabric');
}

// ===== AI NOTES =====
function getAI(m,cfg,styleDef){
  // Expert construction notes by garment category
  // Written by Blue Moon Fabrics patternmaking team for stretch fabrics
  var g = S.g || '';
  var styleId = S.design || '';
  var pcs = S.ps || [];
  var pcNames = pcs.map(function(p){return p.n;}).join(', ');
  var fabricSku = cfg.sku || 'stretch fabric';

  // ── FIT TIP by garment ──────────────────────────────────
  var fitTips = {
    leggings: 'For the best compression fit, cut 1–2" smaller than your hip measurement — stretch fabric recovers and will hug the body correctly at your entered measurements.',
    leotard: 'Check the crotch depth first by wearing and marking: the torso seam should sit at the natural waist with no pulling at the crotch.',
    bikini_top: 'Baste the cup pieces before sewing permanently — try on and adjust cup position before serging the side seams.',
    bikini_bottom: 'Use a narrow zigzag (1.5mm width, 2.5mm length) for all seams. Press the elastic slightly stretched when applying to the leg opening.',
    one_piece: 'Assemble the front and back bodice panels first, check the fit at the bust before attaching the leg panels.',
    swim_dress: 'Sew the skirt to the bodice before adding leg openings — it is much easier to control the gather evenly on a flat piece.',
    sports_bra: 'Apply the band under tension (stretch 15–20% while sewing) to ensure the finished band compresses correctly.',
    unitard: 'Leave one shoulder seam open until last — pull the garment on over the head, then close the final shoulder seam.',
    crop_top: 'Sew the band to the bottom hem stretched 10% — this creates a natural elastic finish without separate elastic.',
    bodycon_dress: 'Sew side seams with a 3-thread overlock for maximum stretch. Press all seams flat — do not press open on stretch fabric.',
    maxi_dress: 'Cut the skirt panels on the lengthwise grain for best drape. Interface the empire seam with clear elastic to prevent stretching out.',
    night_dress: 'Finish all edges with a rolled hem or lettuce edge for a clean finish on lightweight fabric.',
    two_piece: 'Make the bottom first and fit it before cutting the top — the waistline position affects both pieces.',
    jumpsuit: 'Assemble both legs first, then join at the crotch seam before attaching the bodice — much easier to control fit.',
    skirt: 'Stay-stitch the waist seam at 3/8" before applying the waistband to prevent the edge from stretching.',
    shorts: 'Sew the inseam before the crotch seam — this gives you a continuous seam to overlock cleanly.',
    lingerie: 'Use a narrow 2-thread overlock or flatlock for all seams. Apply lace trim last after all structural seams are done.',
    costume: 'Reinforce all high-stress points (crotch, underarm) with a second row of zigzag stitching inside the seam allowance.',
    wrap_dress: 'Stabilize the wrap tie attachment points with a small square of interfacing — wrap dresses take constant stress at the ties.',
    rash_guard: 'Sew flatlock seams (wrong sides together) for a completely flat finish against the skin — important for water sports.',
    biker_shorts: 'Apply the waistband with the seam at center back, not center front — it sits flatter and avoids visible seam lines.',
    corset_top: 'Install boning channels before the lining — press each channel flat before inserting the boning strip.',
    tennis_dress: 'Attach the built-in short first as a separate garment, then attach to the skirt — much cleaner than trying to do both at once.',
    board_shorts: 'Topstitch all seams from the outside at 1/4" — board shorts take water stress and topstitching prevents seam twist.'
  };

  // ── CONSTRUCTION SEQUENCE by garment ──────────────────────
  var sequences = {
    leggings: ['Sew inseam of each leg (front to back), overlock all seam allowances toward back.','Join legs at crotch seam — sew twice at the curve for durability.','Fold and attach waistband to waist edge, stretching band evenly.','Turn up hem allowance and topstitch with a twin needle or zigzag.'],
    leotard: ['Join front body to back body at shoulders, then side seams.','Attach crotch gusset to front body first, then back.','Apply leg opening elastic stretched 15% using a zigzag.','Finish neckline with binding or fold-over elastic.'],
    bikini_top: ['Sew cup pieces together (if applicable), press seams open.','Join cups to the main band, matching center front.','Attach ties or straps and topstitch all edges.','Apply any underwire casing last if included.'],
    bikini_bottom: ['Join front to back at side seams, overlock.','Apply waist elastic, stretching evenly around the full opening.','Apply leg elastic to both leg openings.','Attach crotch lining last — hand tack at corners.'],
    one_piece: ['Sew front body to back body at shoulders and sides.','Join front and back at crotch seam — reinforce with second pass.','Apply all elastics (leg, neck, back) before final fitting.','Add straps or closures last.'],
    sports_bra: ['Join front and back panels at side seams.','Attach the band at the bottom, stretched 15–20%.','Apply neck and arm elastics.','Attach straps at front and back.'],
    unitard: ['Sew front and back leg panels together at inseam.','Join bodice front and back at shoulders.','Attach bodice to leg panels at crotch seam.','Close one shoulder seam last — use as entry point.'],
    jumpsuit: ['Sew each leg: inseam first, then outer seam.','Join legs at crotch seam, reinforce curve.','Assemble bodice: shoulders and side seams.','Attach bodice to legs at waist seam, match side seams.'],
    maxi_dress: ['Sew bodice front and back, check fit at empire seam.','Join skirt panels at side seams, gather or ease to bodice.','Attach skirt to bodice at empire seam, reinforce.','Apply straps, neckline binding, and hem last.'],
    corset_top: ['Sew all boning channel strips and press flat.','Assemble panels in order front to back, insert boning.','Attach lining, press seams toward lining.','Apply closures (zipper, hooks) at center back.'],
    default: ['Cut all pieces and mark notches before sewing.','Sew all vertical seams first, then horizontal.','Apply elastics and finishing before closures.','Try on and adjust before final topstitching.']
  };

  // ── FABRIC TIP by sku keyword ──────────────────────────────
  var fabTips = [
    {key:'nylon lycra',    tip:'Use polyester thread — nylon thread has less stretch and will pop seams under tension. A 90/14 stretch needle prevents skipped stitches.'},
    {key:'power lycra',    tip:'Power fabrics are denser — use a slightly longer stitch (2.5mm) and test tension on a scrap before cutting your pattern pieces.'},
    {key:'foil',           tip:'Never press foil fabric directly — use a press cloth and minimal heat. Foil delaminates above 275°F.'},
    {key:'velvet',         tip:'Always cut velvet with the pile running the same direction on every piece — mix-up creates visible color variation in the finished garment.'},
    {key:'compression',    tip:'Compression fabric has memory — let it relax for 24 hours after cutting before sewing. Cold wash only to maintain compression level.'},
    {key:'ribbed',         tip:'Sew ribbed fabric with the ribs running vertically on all pieces for consistent stretch. Horizontal ribs distort under tension.'},
    {key:'mesh',           tip:'Use a fine needle (75/11) and minimal pressure foot pressure on mesh — coarse needles cause runs. A walking foot helps on open mesh.'},
    {key:'swim',           tip:'Chlorine-resistant nylon lycra does not need pre-washing. Cut notches instead of clips on curves — clips weaken narrow seam allowances.'},
    {key:'default',        tip:'Always test seam stretch on a fabric scrap first. Your stitch must stretch with the fabric — if it pops, lengthen the stitch or switch to overlock.'}
  ];

  var fit = fitTips[g] || 'Test fit with a muslin in similar weight fabric before cutting your final fabric.';
  var seq = sequences[g] || sequences.default;
  var fabKey = Object.keys(fabTips).find(function(k){ return fabricSku.toLowerCase().indexOf(k) >= 0; }) || 'default';
  var fab = fabTips.find(function(t){ return t.key === fabKey || t.key === 'default'; });

  // Display
  var aiTxt = document.getElementById('aiTxt');
  var sewCard = document.getElementById('sewCard');
  var sewSteps = document.getElementById('sewSteps');
  var fabEl = document.getElementById('aiFabTip');

  if(aiTxt) aiTxt.textContent = fit;
  if(sewSteps){
    sewSteps.innerHTML = seq.map(function(s,i){
      return '<div class="sstep"><span class="snum">'+(i+1)+'</span>'+s+'</div>';
    }).join('');
  }
  if(sewCard) sewCard.style.display = 'block';
  if(fabEl && fab) fabEl.textContent = fab.tip;
}


function renderProjectsList(){
  var el=document.getElementById('projectsList');
  if(!el)return;
  var projects=[];
  try{projects=JSON.parse(localStorage.getItem('bmf_projects')||'[]');}catch(e){}
  var limit=GATES[BMF_TIER].projects;
  var unlimited=!isFinite(limit);
  var html='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">'
    +'<div style="font-size:11px;color:var(--ink-3)">'+(unlimited?'Unlimited projects':projects.length+' of '+limit+' saved')+'</div>'
    +'<button onclick="saveProject()" style="padding:8px 14px;background:var(--accent);color:#fff;border:none;border-radius:8px;font-size:12px;font-weight:800;cursor:pointer">&#43; Save current pattern</button>'
    +'</div>';
  if(!projects.length){
    html+='<div style="text-align:center;padding:36px 20px;background:var(--surface-2);border-radius:12px;border:2px dashed #c5d9f5">'
      +'<div style="font-size:36px;margin-bottom:10px">&#128193;</div>'
      +'<div style="font-size:15px;font-weight:800;color:var(--ink);margin-bottom:8px">No saved projects yet</div>'
      +'<div style="font-size:13px;color:var(--ink-3);line-height:1.6;margin-bottom:16px">After you generate a pattern you like, tap <strong>Save current pattern</strong> above to keep it here. Come back anytime to reload it instantly.</div>'
      +'<button onclick="nxt(&quot;pg1&quot;)" style="padding:10px 20px;background:var(--accent);color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:800;cursor:pointer">Start a new pattern &rarr;</button>'
      +'</div>';
  } else {
    projects.forEach(function(proj){
      var date=new Date(proj.savedAt).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
      html+='<div style="border:1.5px solid #e0e8f4;border-radius:10px;padding:14px;margin-bottom:10px;background:var(--surface)">'
        +'<div style="display:flex;align-items:flex-start;gap:10px">';
      if(proj.sketchUrl&&proj.sketchUrl.length>10){
        html+='<img src="'+proj.sketchUrl+'" style="width:54px;height:70px;object-fit:cover;border-radius:6px;border:1px solid #e0e8f4;flex-shrink:0">';
      } else {
        html+='<div style="width:54px;height:70px;background:var(--surface-2);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">&#128248;</div>';
      }
      html+='<div style="flex:1;min-width:0">'
        +'<div style="font-size:13px;font-weight:800;color:var(--ink);margin-bottom:3px">'+proj.name+'</div>'
        +'<div style="font-size:11px;color:var(--ink-4);margin-bottom:8px">Saved '+date+' &middot; '+proj.pieceCount+' pieces</div>'
        +'<div style="display:flex;gap:6px">'
        +'<button onclick="loadProject(\''+proj.id+'\')" style="flex:1;padding:7px;background:var(--accent);color:#fff;border:none;border-radius:7px;font-size:12px;font-weight:700;cursor:pointer">&#9654; Load</button>'
        +'<button onclick="deleteProject(\''+proj.id+'\')" style="padding:7px 10px;background:var(--danger-bg);color:var(--danger);border:1px solid #ffcdd2;border-radius:7px;font-size:12px;cursor:pointer">&#128465;</button>'
        +'</div></div></div></div>';
    });
  }
  el.innerHTML=html;
}

function saveProject(){
  if(!S.g||!S.design||!S.ps||!S.ps.length){toast_('Generate a pattern first');return;}
  var existing=[];
  try{existing=JSON.parse(localStorage.getItem('bmf_projects')||'[]');}catch(e){}
  var limit=GATES[BMF_TIER].projects;
  if(!BMF_USER && existing.length>=limit&&!isFinite(limit)===false&&BMF_TIER!=='pro'){
    showUpgrade('projects',BMF_TIER==='free'?'studio':'pro','projects');return;
  }
  var gLabel=(DESIGNS[S.g]&&DESIGNS[S.g].label)||S.g;
  var sLabel=S.design;
  var sketchEl=document.getElementById('aiSketchImg');
  var proj={
    id:'p_'+Date.now(),
    name:gLabel+' — '+sLabel,
    garment:S.g,design:S.design,
    m:JSON.parse(JSON.stringify(S.m||{})),
    fit:JSON.parse(JSON.stringify(S.fit||{})),
    fab:S.fab,grain:S.grain,sa:S.sa,fw:S.fw,
    savedAt:new Date().toISOString(),
    pieceCount:S.ps.length,
    sketchUrl:(sketchEl&&sketchEl.src&&sketchEl.src.startsWith('data'))?'':((sketchEl&&sketchEl.src)||''),
    tier:BMF_TIER
  };
  existing.unshift(proj);
  if(existing.length>20)existing=existing.slice(0,20);
  try{localStorage.setItem('bmf_projects',JSON.stringify(existing));}catch(e){}
  toast_('Project saved: '+proj.name);
  renderProjectsList();
}

function loadProject(id){
  var projects=[];
  try{projects=JSON.parse(localStorage.getItem('bmf_projects')||'[]');}catch(e){}
  var proj=projects.find(function(p){return p.id===id;});
  if(!proj){toast_('Project not found');return;}
  S.g=proj.garment;S.design=proj.design;
  S.m=proj.m||{};
  S.fit=proj.fit||{ease:0,fba:0,frontLen:0,backLen:0,riseAdj:0,hipAdj:0,shoulderAdj:0,legLen:0,asymShoulder:0,asymHip:0};
  S.fab=proj.fab||'stretch';S.grain=proj.grain||'vertical';S.sa=proj.sa||0.5;S.fw=proj.fw||60;
  toast_('Loading: '+proj.name+'...');
  setTimeout(function(){try{generate();nxt('pg5');}catch(e){toast_('Reload error — check garment selection');}},300);
}

function deleteProject(id){
  var projects=[];
  try{projects=JSON.parse(localStorage.getItem('bmf_projects')||'[]');}catch(e){}
  projects=projects.filter(function(p){return p.id!==id;});
  try{localStorage.setItem('bmf_projects',JSON.stringify(projects));}catch(e){}
  renderProjectsList();
  toast_('Project deleted');
}

function bmfCloseOverlay(){
  Array.prototype.forEach.call(document.body.children, function(el){ if (el.style && el.style.position==='fixed' && String(el.style.zIndex)==='99999') el.remove(); });
}

function showSignInPrompt() {
  var old = document.getElementById('bmfSignInModal');
  if (old) old.remove();
  var wrap = document.createElement('div');
  wrap.id = 'bmfSignInModal';
  wrap.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(6,15,40,.88);display:flex;align-items:center;justify-content:center;padding:20px';
  wrap.innerHTML = '<div style="background:var(--surface);border-radius:16px;max-width:400px;width:100%;padding:28px 24px;text-align:center">'
    + '<div style="font-size:36px;margin-bottom:14px">&#128274;</div>'
    + '<div style="font-size:19px;font-weight:800;color:var(--ink);margin-bottom:8px">Sign in to continue</div>'
    + '<div style="font-size:13px;color:var(--ink-3);line-height:1.7;margin-bottom:20px">'
    + 'You have used your 10 free patterns. Sign in to your Blue Moon account to access your subscription, or subscribe to get unlimited patterns.'
    + '</div>'
    + '<a href="/account/login?return_url=/pages/custom-pattern-studio" style="display:block;padding:14px;background:linear-gradient(135deg,var(--accent),var(--accent-deep));color:#fff;border-radius:9px;font-weight:800;font-size:15px;text-decoration:none;margin-bottom:10px">Sign in to my account</a>'
    + '<a href="/products/pattern-studio-studio-plan" style="display:block;padding:12px;background:var(--surface-2);color:var(--accent);border-radius:9px;font-weight:700;font-size:13px;text-decoration:none;margin-bottom:10px">Subscribe — from $19.99/month</a>'
    + '<button onclick="document.getElementById(&quot;bmfSignInModal&quot;).remove()" style="width:100%;padding:10px;background:none;border:none;color:var(--ink-4);font-size:12px;cursor:pointer">Not now</button>'
    + '</div>';
  wrap.addEventListener('click', function(e){ if(e.target===wrap) wrap.remove(); });
  document.body.appendChild(wrap);
}


// ============================================================
// AI FABRIC PRINT PREVIEW
// ============================================================
function setPrint(text) {
  var el = document.getElementById('printDesc');
  if (el) { el.value = text; el.focus(); }
}

async function generatePrintPreview() {
  if (!S.g || !S.design) { toast_('Generate a pattern first, then come back here'); return; }
  var descEl = document.getElementById('printDesc');
  var desc = (descEl ? descEl.value.trim() : '') || 'colorful abstract print';

  var cfg = DESIGNS[S.g];
  var styleDef = cfg && cfg.styles && cfg.styles.find(function(s){ return s.id === S.design; });
  var garmentName = cfg ? cfg.label : S.g;
  var styleName = styleDef ? styleDef.name : S.design;
  var gender = typeof sketchGenderFor === 'function' ? sketchGenderFor(S.g) : 'female';

  var prompt = 'fashion illustration, flat fashion sketch, watercolor croquis, clean ink line art style. professional fashion design drawing. NOT photorealistic. NOT a photograph. white background. '
    + 'A ' + garmentName + ' in ' + styleName + ' silhouette, '
    + 'made entirely from fabric with ' + desc + ' print pattern. '
    + 'The fabric print is clearly visible across the entire garment. '
    + 'Full body ' + gender + ' fashion croquis. '
    + 'White background. Editorial fashion illustration quality. '
    + 'Show the fabric print in detail. No text or logos.';

  var loadEl = document.getElementById('printLoadingState');
  var resultEl = document.getElementById('printResultWrap');
  var errEl = document.getElementById('printErrorState');
  var btn = document.getElementById('printGenBtn');

  if (loadEl) loadEl.style.display = 'block';
  if (resultEl) resultEl.style.display = 'none';
  if (errEl) errEl.style.display = 'none';
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Generating...'; }

  try {
    // Try Imagen 4 proxy first (better quality)
    var proxyRes = await fetch((PS.renderApi||'/api/render'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context: psRenderContext({mode:'print', printDesc: desc}), aspect:'3:4' })
    });

    var imageUrl = null;

    if (proxyRes.ok) {
      var proxyData = await proxyRes.json();
      if (proxyData && proxyData.image) {
        imageUrl = proxyData.image; // base64 data URL from Imagen 4
      }
    }

    // Fallback to Pollinations if proxy fails
    if (!imageUrl) { throw new Error('render failed'); }

    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function() {
      var resultImg = document.getElementById('printResultImg');
      if (resultImg) resultImg.src = imageUrl;
      var lbl = document.getElementById('printResultLabel');
      if (lbl) lbl.textContent = garmentName + ' · ' + styleName + ' · ' + desc;
      if (loadEl) loadEl.style.display = 'none';
      if (resultEl) resultEl.style.display = 'block';
      if (btn) { btn.disabled = false; btn.textContent = '🎨 Generate Print Preview'; }
      toast_('Print preview ready!');
    };
    img.onerror = function() {
      if (loadEl) loadEl.style.display = 'none';
      if (errEl) errEl.style.display = 'block';
      if (btn) { btn.disabled = false; btn.textContent = '🎨 Generate Print Preview'; }
    };
    img.src = imageUrl;

  } catch(e) {
    if (loadEl) loadEl.style.display = 'none';
    if (errEl) errEl.style.display = 'block';
    if (btn) { btn.disabled = false; btn.textContent = '🎨 Generate Print Preview'; }
  }
}

function downloadPrintPreview() {
  var img = document.getElementById('printResultImg');
  if (!img || !img.src) { toast_('No preview to download'); return; }
  var a = document.createElement('a');
  a.href = img.src;
  a.download = 'bmf-print-preview-' + Date.now() + '.png';
  a.click();
  toast_('Downloading preview...');
}

// ===== VOICE =====




// ===== UI HELPERS =====
function showTab(btn,pg){
  document.querySelectorAll('.bpage').forEach(p=>p.classList.remove('show'));
  document.querySelectorAll('.btab').forEach(b=>b.classList.remove('on'));
  const el=document.getElementById(pg);if(el)el.classList.add('show');
  if(btn)btn.classList.add('on');window.scrollTo(0,0);
  if(pg==='pg8')refreshLook();
  if(pg==='pgF')renderSketch();
  if(pg==='pg7')updStats();
  if(pg==='pg6')renderPL();
  if(pg==='pgU')renderProjectsList();
  // Update page label and nav bar visibility
  var lbl=document.getElementById('bmfPageLabel');
  var labels={"pg1":"Step 1 of 5 — Choose Garment","pg2":"Step 2 of 5 — Design Style","pg3":"Step 3 of 5 — Measurements","pg4":"Step 4 of 5 — Options & Fit","pgF":"Step 5 of 5 — Choose Fabric","pg5":"Pattern Canvas","pg6":"Piece Details","pg7":"Fabric Stats","pg8":"AI Look","pgU":"My Projects","pgP":"AI Print Preview","pgH":"Guide"};
  if(lbl)lbl.textContent=labels[pg]||'';
  // Hide Back on first page, hide Next on last page
  var pgsAll=['pg1','pg2','pg3','pg4','pgF','pg5','pg6','pg7','pg8','pgU','pgH'];
  var curI=pgsAll.indexOf(pg);
  var backBtn=document.querySelector('#bmfNavBar button:first-child');
  var nextBtn=document.querySelector('#bmfNavBar button:last-child');
  if(backBtn)backBtn.style.visibility=curI===0?'hidden':'visible';
  if(nextBtn)nextBtn.style.visibility=curI===pgsAll.length-1?'hidden':'visible';
  // On pattern step pages (1-5), highlight Next button in blue; on pattern tab show green
  if(nextBtn){
    if(pg==='pgF'){nextBtn.textContent='Generate Pattern →';nextBtn.style.background='var(--ok)';}
    else{nextBtn.textContent='Next →';nextBtn.style.background='var(--accent)';}
  }
}
function nxt(pg){
  const pgs=['pg1','pg2','pg3','pg4','pgF','pg5','pg6','pg7','pg8','pgU','pgP','pgH'];
  const tabs=document.querySelectorAll('.btab');
  const i=pgs.indexOf(pg);if(i>=0)showTab(tabs[i],pg);
}
function pgStep(dir){
  const pgs=['pg1','pg2','pg3','pg4','pgF','pg5','pg6','pg7','pg8','pgU','pgP','pgH'];
  const tabs=document.querySelectorAll('.btab');
  var cur=0;
  for(var i=0;i<pgs.length;i++){
    var el=document.getElementById(pgs[i]);
    if(el&&el.classList.contains('show')){cur=i;break;}
  }
  var next=cur+dir;
  if(next<0||next>=pgs.length)return;
  // Special: going forward from Fabric (index 4) triggers generate
  if(dir===1 && pgs[cur]==='pgF'){
    generate();
    return;
  }
  showTab(tabs[next],pgs[next]);
  if(tabs[next])tabs[next].scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
}
function setGrain(el,g){
  S.grain=g;document.querySelectorAll('.gbtn').forEach(b=>b.classList.remove('on'));el.classList.add('on');
  if(S.ps.length)drawAll();
}
function setTool(t,el){['tSel','tMov'].forEach(id=>{const b=document.getElementById(id);if(b)b.classList.remove('on');});el.classList.add('on');}
function onSA(v){S.sa=SA_MAP[v];document.getElementById('saV').textContent=SA_LBL[v];}
function onFW(v){S.fw=parseInt(v);document.getElementById('fwV').textContent=v+'"';rzCnv();if(S.ps.length)updStats();}
function togV(k,el){S.vis[k]=S.vis[k]?0:1;el.classList.toggle('on',!!S.vis[k]);drawAll();}
function flipSel(){if(!S.sel){toast_('Select a piece first');return;}S.sel.rot=S.sel.rot===180?0:180;drawAll();toast_('Piece flipped');}
function fitV(){zoom=1;document.getElementById('zlbl').textContent='100%';drawAll();}
var _scrollMode=false;
function toggleScrollMode(btn){
  _scrollMode=!_scrollMode;
  if(btn){ btn.classList.toggle('on',_scrollMode); btn.innerHTML = _scrollMode ? '\u270b Move mode' : '\u2630 Scroll mode'; }
  var cw=document.getElementById('cwrap');
  if(cw){ cw.style.cursor=_scrollMode?'grab':'default'; }
  var sub=document.getElementById('pg5Sub');
  if(sub){ sub.innerHTML = _scrollMode
    ? 'Scroll mode \u2014 drag or swipe to move around the pattern \u00b7 tap \u270b to edit pieces again'
    : 'Drag pieces to rearrange \u00b7 Tap \u2630 to scroll the view \u00b7 Ctrl+scroll to zoom'; }
}
function scrollPattern(dir){
  var cw=document.getElementById('cwrap'); if(!cw)return;
  var step=Math.round(cw.clientHeight*0.7);
  cw.scrollBy({top:dir*step,behavior:'smooth'});
}
try{window.toggleScrollMode=toggleScrollMode;window.scrollPattern=scrollPattern;}catch(_e){}
function zIn(){zoom=Math.min(4,zoom+.2);document.getElementById('zlbl').textContent=Math.round(zoom*100)+'%';drawAll();}
function zOut(){zoom=Math.max(.18,zoom-.2);document.getElementById('zlbl').textContent=Math.round(zoom*100)+'%';drawAll();}
let paperSel='letter';
function openPrint(){if(!S.ps.length){toast_('Generate a pattern first');return;}document.getElementById('printModal').classList.add('show');}
function closePrint(){var m=document.getElementById('printModal'); if(m) m.classList.remove('show');}
function selPaper(el,type){paperSel=type;['paperLetter','paperLarge'].forEach(id=>document.getElementById(id).classList.remove('sel'));el.classList.add('sel');}
function doPrint(){
  closePrint();
  const ov=document.createElement('div');
  ov.style.cssText='position:fixed;top:0;left:0;right:0;background:var(--accent-deep);color:#fff;padding:11px 16px;text-align:center;z-index:9999;font-family:Inter,sans-serif;font-size:12px;font-weight:700;box-shadow:0 2px 10px rgba(0,0,0,.4)';
  ov.innerHTML='\ud83d\uddc8 PRINT AT 100% SCALE \u2014 Do not scale to fit &nbsp;<button onclick="this.parentElement.remove()" style="background:rgba(255,255,255,.18);border:none;color:#fff;padding:3px 9px;border-radius:4px;cursor:pointer;font-weight:700;margin-left:8px">\u2715</button>';
  document.body.appendChild(ov);
  setTimeout(()=>window.print(),400);
  setTimeout(()=>{if(ov.parentElement)ov.remove();},9000);
}
function saveCanvas(){
  if(!S.ps.length){toast_('Generate a pattern first');return;}
  closePrint();
  const tmp=document.createElement('canvas');tmp.width=cnv.width*2;tmp.height=cnv.height*2;
  const tc=tmp.getContext('2d');tc.scale(2,2);tc.drawImage(cnv,0,0);
  tc.fillStyle='rgba(18,85,176,.14)';tc.font='bold 13px Inter,sans-serif';tc.textAlign='right';
  const _styleLabel = DESIGNS[S.g]?.styles?.find(s=>s.id===S.design)?.name||S.design;
  tc.fillText('Blue Moon Fabrics Pattern Studio \u2014 '+(DESIGNS[S.g]?.label||'Pattern')+' · '+_styleLabel,cnv.width-10,cnv.height-10);
  const lk=document.createElement('a');
  const nm=((DESIGNS[S.g]?.label||'pattern').toLowerCase().replace(/\s+/g,'-'))+'-'+S.design;
  lk.download='bluemoon-'+nm+'-pattern.png';lk.href=tmp.toDataURL('image/png',1.0);lk.click();
  toast_('Pattern saved as PNG');
}
function toast_(msg,ms=2600){
  const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),ms);
}
function wait(ms){return new Promise(r=>setTimeout(r,ms));}


// ═══════════════════════════════════════════════════════
// FABRIC CATALOG (Blue Moon Fabrics)
// In production this would fetch from Shopify products API
// ═══════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════
// LIVE FABRIC CATALOG — pulls real Blue Moon fabrics from the store,
// same-origin, no auth. Collections lazy-load on demand. Each fabric
// variant maps to a real cart add + product link. Sketch color stays
// accurate via color-name→hex mapping.
// ═══════════════════════════════════════════════════════════════

// Collections shown in the app (start: the 3 that match the garments).
// To add more later, just extend this array — architecture already scales.
var LIVE_COLLECTIONS = [
  { handle:'swimwear',   label:'Swimwear',   cat:'Swim'  },
  { handle:'activewear', label:'Activewear', cat:'Active'},
  { handle:'dancewear',  label:'Dancewear',  cat:'Dance' }
];

var _liveCache = {};        // handle -> [fabric objects]
var _liveLoading = {};      // handle -> bool

// Map a Shopify color/variant name to a hex the sketch can render.
// Falls back to a neutral if unknown (sketch still works, just less exact).
var COLOR_NAME_HEX = {
  black:'#1a1a1a', white:'var(--surface-2)', ivory:'#f5f0e1', cream:'#f3ead6',
  red:'#c0202a', scarlet:'#c0202a', crimson:'#9e1b32', burgundy:'#6d1a2e', wine:'#5e1a2b', maroon:'#6d1a2e',
  pink:'#e86a9a', rose:'#d64f7f', fuchsia:'#c2185b', magenta:'#c2185b', hotpink:'#e63f8a', blush:'#f0b8c8',
  coral:'#ff6f5e', salmon:'#ff8c69', peach:'#ffb07a', tangerine:'#f28c1f', orange:'#f47b20', rust:'#a0522d',
  gold:'#c9a94a', mustard:'#d1a636', yellow:'#f2c94c', lemon:'#f5e050', chartreuse:'#b0c334',
  lime:'#7cb342', green:'#2e9e5b', kelly:'#2e9e5b', emerald:'#0c7a4a', forest:'#1a5632', olive:'#6b7233', mint:'#8fd4a8', sage:'#a6b98a', teal:'#12868c', jade:'#0c9456',
  turquoise:'#1ab6c4', aqua:'#38c6d4', cyan:'#2dd4e0',
  blue:'#1f6fd0', royal:'#1b4fd4', royalblue:'#1b4fd4', navy:'#1a2450', cobalt:'#1a44c4', sky:'#6db3e8', skyblue:'#6db3e8', denim:'#3b5b8c', periwinkle:'#8a9de8',
  purple:'#8138b8', violet:'#8138b8', lavender:'#b39ddb', plum:'#6a2c5b', eggplant:'#4a2340', orchid:'#c060c0',
  brown:'#7a4a2b', chocolate:'#4a2c1a', tan:'#c9a06a', beige:'#d8c4a0', khaki:'#b3a068', camel:'#c19a6b', nude:'#e3c4a8', taupe:'#a8967f',
  gray:'#8a8f96', grey:'#8a8f96', silver:'#c0c4c8', charcoal:'#3a3f45', slate:'#556070', gunmetal:'#4a4f56',
  nutmeg:'#8b5a2b', mango:'#f5a623', snow:'#fafafa'
};
function nameToHex(name){
  if(!name) return '#1255b0';
  var n = name.toLowerCase().replace(/[^a-z ]/g,'');
  // priority: specific/compound colors before generic bases
  var priority = ['navy','royal','sky','denim','cobalt','periwinkle','turquoise','emerald','forest','kelly','olive','sage','mint','jade','teal','burgundy','maroon','wine','crimson','scarlet','fuchsia','magenta','hotpink','blush','coral','salmon','tangerine','mustard','chartreuse','lavender','plum','eggplant','orchid','charcoal','slate','gunmetal','silver','chocolate','khaki','camel','taupe','nutmeg','mango'];
  for(var i=0;i<priority.length;i++){ if(n.indexOf(priority[i])>=0 && COLOR_NAME_HEX[priority[i]]) return COLOR_NAME_HEX[priority[i]]; }
  // then generic bases (longest first)
  var keys = Object.keys(COLOR_NAME_HEX).sort(function(a,b){return b.length-a.length;});
  for(var j=0;j<keys.length;j++){ if(n.indexOf(keys[j])>=0) return COLOR_NAME_HEX[keys[j]]; }
  return '#1255b0';
}

// Infer a "pattern" bucket the sketch understands from product title/tags.
function inferPattern(title){
  var t=(title||'').toLowerCase();
  if(t.indexOf('foil')>=0) return 'foil';
  if(t.indexOf('velvet')>=0) return 'velvet';
  if(t.indexOf('sequin')>=0) return 'sequin';
  if(t.indexOf('lace')>=0) return 'lace';
  if(t.indexOf('tropical')>=0) return 'tropical';
  if(t.indexOf('floral')>=0) return 'floral';
  if(t.indexOf('stripe')>=0) return 'stripe';
  if(t.indexOf('animal')>=0||t.indexOf('leopard')>=0||t.indexOf('zebra')>=0) return 'animal';
  return 'solid';
}

// Convert a Shopify product (+ its variants) into the app's fabric objects.
// One entry per COLOR variant so the customer buys the exact color they design in.
function productToFabrics(p, cat){
  var out=[];
  var pattern = inferPattern(p.title);
  var baseName = p.title.replace(/\s*\|\s*Blue Moon Fabrics\s*$/i,'').trim();
  (p.variants||[]).forEach(function(v){
    if(v.available===false) return; // skip out-of-stock colors
    var colorName = (v.title && v.title!=='Default Title') ? v.title : baseName;
    out.push({
      id: 'live_'+v.id,
      variantId: v.id,
      name: baseName + (v.title && v.title!=='Default Title' ? ' — '+v.title : ''),
      colorName: colorName,
      hex: nameToHex(colorName),
      color: nameToHex(colorName),
      category: cat,
      price: '$'+parseFloat(v.price).toFixed(2)+'/yd',
      desc: (p.product_type||'Fabric'),
      pattern: pattern,
      url: PS.shop+'/products/'+p.handle+'?variant='+v.id,
      img: (p.images && p.images[0] && p.images[0].src) ? p.images[0].src : null,
      live: true
    });
  });
  return out;
}

// Fetch a collection's fabrics live (same-origin JSON, paginated).
async function loadLiveCollection(handle, cat){
  if(_liveCache[handle]) return _liveCache[handle];
  if(_liveLoading[handle]) return [];
  _liveLoading[handle]=true;
  var all=[], page=1, MAX_PAGES=4; // up to 1000 products; plenty, keeps it fast
  try{
    while(page<=MAX_PAGES){
      var res = await fetch((PS.mode==='standalone' ? PS.fabricsApi+'?collection='+encodeURIComponent(handle)+'&page='+page : '/collections/'+handle+'/products.json?limit=250&page='+page), {headers:{'Accept':'application/json'}});
      if(!res.ok) break;
      var data = await res.json();
      var prods = data.products||[];
      if(!prods.length) break;
      prods.forEach(function(p){
        if((p.product_type||'').toLowerCase().indexOf('swatch')>=0) return; // skip color cards
        all = all.concat(productToFabrics(p, cat));
      });
      if(prods.length<250) break;
      page++;
    }
  }catch(e){ /* network hiccup -> return what we have */ }
  _liveLoading[handle]=false;
  _liveCache[handle]=all;
  return all;
}

// One-tap add the exact fabric variant to the Shopify cart.
async function addFabricToCart(variantId, qty){
  if (PS.mode === 'standalone') {
    window.open(PS.shop + '/cart/' + variantId + ':' + (qty||1), '_blank', 'noopener');
    if (typeof toast_==='function') toast_('Opening Blue Moon Fabrics cart…');
    return true;
  }
  try{
    var res = await fetch('/cart/add.js', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ items:[{ id: variantId, quantity: qty||1 }] })
    });
    if(res.ok){ if(typeof toast_==='function') toast_('Fabric added to cart ✓'); return true; }
  }catch(e){}
  if(typeof toast_==='function') toast_('Could not add — opening product page');
  return false;
}

try{
  window.LIVE_COLLECTIONS=LIVE_COLLECTIONS;
  window.loadLiveCollection=loadLiveCollection;
  window.addFabricToCart=addFabricToCart;
  window.nameToHex=nameToHex;
  window.productToFabrics=productToFabrics;
}catch(_e){}


const BMF_FABRICS=[
  // Nylon/Lycra - Swimwear
  {id:'syn1',name:'Synergy Nylon Lycra',color:'#1255b0',hex:'#1255b0',category:'Swim',price:'$12.99/yd',desc:'70 colors · 4-way stretch · chlorine-resistant',url:'https://bluemoonfabrics.com/collections/nylon-lycra',pattern:'solid',img:''},
  {id:'syn2',name:'Synergy Nylon Lycra - Tropical',color:'#0c9456',hex:'#22a65e',category:'Swim',price:'$13.99/yd',desc:'Tropical print · 4-way stretch · chlorine-resistant',url:'https://bluemoonfabrics.com/collections/nylon-lycra',pattern:'tropical',img:''},
  {id:'syn3',name:'Synergy Nylon Lycra - Floral',color:'#c2185b',hex:'#e91e63',category:'Swim',price:'$13.99/yd',desc:'Floral print · 4-way stretch',url:'https://bluemoonfabrics.com/collections/nylon-lycra',pattern:'floral',img:''},
  {id:'syn4',name:'Synergy Nylon Lycra - Stripe',color:'#1769d4',hex:'#42a5f5',category:'Swim',price:'$13.99/yd',desc:'Stripe print · directional · 4-way stretch',url:'https://bluemoonfabrics.com/collections/nylon-lycra',pattern:'stripe',img:''},
  {id:'syn5',name:'Synergy Nylon Lycra - Animal',color:'#8f4500',hex:'#a0522d',category:'Swim',price:'$13.99/yd',desc:'Animal print · 4-way stretch',url:'https://bluemoonfabrics.com/collections/nylon-lycra',pattern:'animal',img:''},
  // Matte Nylon
  {id:'mn1',name:'Matte Nylon Spandex Classic',color:'var(--ink-2)',hex:'#263238',category:'Activewear',price:'$11.99/yd',desc:'Opacity and shape retention · great for one-piece',url:'https://bluemoonfabrics.com/collections/nylon-spandex',pattern:'solid',img:''},
  {id:'mn2',name:'Matte Nylon - Dusty Rose',color:'#c2185b',hex:'#f48fb1',category:'Activewear',price:'$11.99/yd',desc:'Soft pink · perfect for sports bras',url:'https://bluemoonfabrics.com/collections/nylon-spandex',pattern:'solid',img:''},
  {id:'mn3',name:'Matte Nylon - Sage',color:'#2e7d32',hex:'#81c784',category:'Activewear',price:'$11.99/yd',desc:'Earthy sage green · trending in activewear',url:'https://bluemoonfabrics.com/collections/nylon-spandex',pattern:'solid',img:''},
  // Recycled
  {id:'rc1',name:'Core Recycled Nylon Spandex',color:'var(--ink-3)',hex:'#455a64',category:'Activewear',price:'$13.49/yd',desc:'Eco-certified · 4-way stretch · GOTS pending',url:'https://bluemoonfabrics.com/collections/recycled-fabrics',pattern:'solid',img:''},
  {id:'rc2',name:'Core Recycled - Coral',color:'#e64a19',hex:'#ff7043',category:'Activewear',price:'$13.49/yd',desc:'Vibrant coral · eco-certified recycled nylon',url:'https://bluemoonfabrics.com/collections/recycled-fabrics',pattern:'solid',img:''},
  // Mystique Foil
  {id:'mf1',name:'Mystique Foiled Spandex - Gold',color:'#f9a825',hex:'#ffd54f',category:'Dance/Stage',price:'$15.99/yd',desc:'Metallic gold foil · high-drama stage look',url:'https://bluemoonfabrics.com/collections/foil-spandex',pattern:'foil',img:''},
  {id:'mf2',name:'Mystique Foiled Spandex - Silver',color:'#8daad8',hex:'#b0bec5',category:'Dance/Stage',price:'$15.99/yd',desc:'Chrome silver foil · competition favourite',url:'https://bluemoonfabrics.com/collections/foil-spandex',pattern:'foil',img:''},
  {id:'mf3',name:'Mystique Foiled Spandex - Rose Gold',color:'#c2185b',hex:'#f48fb1',category:'Dance/Stage',price:'$15.99/yd',desc:'Rose gold foil · elegant stage presence',url:'https://bluemoonfabrics.com/collections/foil-spandex',pattern:'foil',img:''},
  // Velvet
  {id:'vl1',name:'Stretch Velvet - Midnight',color:'#0c3d8f',hex:'#1a237e',category:'Dance/Stage',price:'$16.99/yd',desc:'Deep navy velvet · rich nap · costumes & dance',url:'https://bluemoonfabrics.com/collections/stretch-velvet',pattern:'velvet',img:''},
  {id:'vl2',name:'Stretch Velvet - Burgundy',color:'#880e4f',hex:'#b71c1c',category:'Dance/Stage',price:'$16.99/yd',desc:'Deep red · crush velvet effect',url:'https://bluemoonfabrics.com/collections/stretch-velvet',pattern:'velvet',img:''},
  // Lace
  {id:'lc1',name:'Stretch Lace - Ivory',color:'#8f6500',hex:'#f5f0e0',category:'Lingerie',price:'$14.99/yd',desc:'Stretch lace · semi-sheer · lingerie & overlay',url:'https://bluemoonfabrics.com/collections/stretch-lace',pattern:'lace',img:''},
  {id:'lc2',name:'Stretch Lace - Black',color:'var(--ink-2)',hex:'var(--ink)',category:'Lingerie',price:'$14.99/yd',desc:'Classic black stretch lace · lingerie staple',url:'https://bluemoonfabrics.com/collections/stretch-lace',pattern:'lace',img:''},
  // Sequin
  {id:'sq1',name:'Sequin on Mesh - Gold',color:'#f9a825',hex:'#ffc107',category:'Dance/Stage',price:'$19.99/yd',desc:'All-over gold sequins on stretch mesh',url:'https://bluemoonfabrics.com/collections/sequin-fabric',pattern:'sequin',img:''},
  {id:'sq2',name:'Sequin on Mesh - Black',color:'var(--ink-2)',hex:'#263238',category:'Dance/Stage',price:'$19.99/yd',desc:'Classic black sequin · show-stopping',url:'https://bluemoonfabrics.com/collections/sequin-fabric',pattern:'sequin',img:''},
  // Harmony Double Knit
  {id:'hdk1',name:'Harmony Ultra Soft Double Knit',color:'#6a1b9a',hex:'#9c27b0',category:'Dresses',price:'$10.99/yd',desc:'Fluid drape · maxi & bodycon · no-fray edges',url:'https://bluemoonfabrics.com/collections/double-knit',pattern:'solid',img:''},
  {id:'hdk2',name:'Harmony Double Knit - Floral',color:'#ad1457',hex:'#e91e63',category:'Dresses',price:'$11.99/yd',desc:'Floral print · fluid drape · maxi dresses',url:'https://bluemoonfabrics.com/collections/double-knit',pattern:'floral',img:''},
  // Rib Knit
  {id:'rib1',name:'Two-Tone Rib Nylon',color:'#0c3d8f',hex:'#1565c0',category:'Activewear',price:'$12.49/yd',desc:'Ribbed texture · colour-blocked looks',url:'https://bluemoonfabrics.com/collections/rib-knit',pattern:'rib',img:''},
];

const FAB_CATS=['All','Swim','Activewear','Dance/Stage','Lingerie','Dresses'];
let selectedFabric=null,currentFabCat='All',currentFabSearch='';
// Combined pool: built-in fabrics + live-loaded fabrics from the store
let LIVE_FABRICS=[];
let currentLiveCollection=null;
function allFabrics(){ return LIVE_FABRICS.length ? LIVE_FABRICS.concat(BMF_FABRICS) : BMF_FABRICS; }
function fabById(id){ return allFabrics().find(f=>f.id===id); }

// ─── Build fabric grid ───
function buildFabricGrid(){
  // Build category pills
  const catEl=document.getElementById('fabCats');
  catEl.innerHTML=FAB_CATS.map(cat=>`<button class="fab-cat${cat==='All'?' on':''}" onclick="setFabCat(this,'${cat}')">${cat}</button>`).join('');
  renderFabricGrid();
}

function setFabCat(el,cat){
  currentFabCat=cat;
  document.querySelectorAll('.fab-cat').forEach(b=>b.classList.remove('on'));
  el.classList.add('on');
  renderFabricGrid();
}
function filterFabrics(q){currentFabSearch=q;renderFabricGrid();}

function renderFabricGrid(){
  const grid=document.getElementById('fabricGrid');
  const q=currentFabSearch.toLowerCase();
  const list=allFabrics().filter(f=>{
    const catOk=currentFabCat==='All'||f.category===currentFabCat;
    const qOk=!q||(f.name.toLowerCase().includes(q)||f.desc.toLowerCase().includes(q)||f.category.toLowerCase().includes(q));
    return catOk&&qOk;
  });
  if(!list.length){grid.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:32px;color:var(--txt3);font-size:13px;font-weight:600">No fabrics found &mdash; try a different search</div>';return;}
  grid.innerHTML=list.map(f=>`<div class="fab-card${selectedFabric?.id===f.id?' on':''}" id="fc_${f.id}" onclick="pickFabric('${f.id}')">
    <div class="fab-swatch-solid" style="background:${fabPatternBg(f)};position:relative">${fabPatternOverlay(f)}</div>
    <div class="fab-name">${f.name}</div>
    <div class="fab-price">${f.price} &middot; ${f.category}</div>
  </div>`).join('');
}

function fabPatternBg(f){
  switch(f.pattern){
    case 'stripe': return `repeating-linear-gradient(90deg,${f.hex} 0px,${f.hex} 8px,#fff 8px,#fff 16px)`;
    case 'foil': return `linear-gradient(135deg,${f.hex} 0%,#fff 40%,${f.hex} 60%,#fff 80%,${f.hex} 100%)`;
    case 'sequin': return `radial-gradient(circle at 30% 30%,${f.hex} 30%,transparent 30%),radial-gradient(circle at 70% 70%,${f.hex} 30%,transparent 30%)`;
    case 'lace': return '#fafafa';
    case 'velvet': return `linear-gradient(160deg,${f.hex} 0%,#000 60%,${f.hex} 100%)`;
    case 'tropical': return `linear-gradient(135deg,#22a65e 0%,#4fc3f7 50%,#ffb300 100%)`;
    case 'floral': return `radial-gradient(ellipse at 25% 25%,${f.hex} 15%,transparent 20%),radial-gradient(ellipse at 75% 75%,#4caf50 15%,transparent 20%),${f.hex}22`;
    case 'animal': return `repeating-linear-gradient(45deg,${f.hex} 0px,${f.hex} 6px,#c49a6c 6px,#c49a6c 12px)`;
    case 'rib': return `repeating-linear-gradient(0deg,${f.hex} 0px,${f.hex} 4px,${f.hex}88 4px,${f.hex}88 8px)`;
    default: return f.hex;
  }
}

function fabPatternOverlay(f){
  if(f.pattern==='lace')return `<svg style="position:absolute;inset:0;width:100%;height:100%;opacity:.4" viewBox="0 0 40 40"><circle cx="10" cy="10" r="4" stroke="${f.hex}" stroke-width="1.5" fill="none"/><circle cx="30" cy="10" r="4" stroke="${f.hex}" stroke-width="1.5" fill="none"/><circle cx="10" cy="30" r="4" stroke="${f.hex}" stroke-width="1.5" fill="none"/><circle cx="30" cy="30" r="4" stroke="${f.hex}" stroke-width="1.5" fill="none"/><circle cx="20" cy="20" r="4" stroke="${f.hex}" stroke-width="1.5" fill="none"/></svg>`;
  return '';
}

function pickFabric(id){
  selectedFabric=fabById(id);
  document.querySelectorAll('.fab-card').forEach(c=>c.classList.remove('on'));
  const card=document.getElementById('fc_'+id);
  if(card)card.classList.add('on');
  S.selectedFabric=selectedFabric;
  renderMockup();
  toast_('Fabric: '+selectedFabric.name);

  renderSketch();
}

// Lazy-load a store collection into the fabric grid (live inventory).
async function loadCollectionIntoGrid(btn, handle, cat){
  document.querySelectorAll('.live-coll').forEach(b=>b.classList.remove('on'));
  if(btn) btn.classList.add('on');
  var status=document.getElementById('liveCollStatus');
  currentLiveCollection=handle;
  if(status) status.textContent='Loading '+handle+'\u2026';
  try{
    var fabs = await loadLiveCollection(handle, cat);
    // merge into the live pool (dedupe by id)
    var seen={}; LIVE_FABRICS.forEach(f=>seen[f.id]=1);
    fabs.forEach(f=>{ if(!seen[f.id]){ LIVE_FABRICS.push(f); seen[f.id]=1; } });
    currentFabCat = cat;               // focus the grid on this collection
    currentFabSearch='';
    var srch=document.getElementById('fabricSearch'); if(srch) srch.value='';
    renderFabricGrid();
    if(status) status.textContent = fabs.length+' live fabrics';
  }catch(e){
    if(status) status.textContent='Could not load — using built-in fabrics';
  }
}

// Add the selected fabric's exact variant to the Shopify cart (live fabrics),
// or fall back to opening its product page (built-in fabrics).
async function addSelectedFabricToCart(){
  if(!selectedFabric){ toast_('Pick a fabric first'); return; }
  if(selectedFabric.variantId){
    var ok = await addFabricToCart(selectedFabric.variantId, 1);
    if(ok){
      // offer a quick path to cart
      setTimeout(function(){ if(confirm('Fabric added! Go to cart now?')) location.href='/cart'; }, 200);
      return;
    }
  }
  // fallback: open the product page
  window.open(selectedFabric.url || 'https://bluemoonfabrics.com', '_blank');
}
try{ window.loadCollectionIntoGrid=loadCollectionIntoGrid; window.addSelectedFabricToCart=addSelectedFabricToCart; }catch(_e){}

// ─── Live garment mockup ───
function renderMockup(){
  if(!selectedFabric)return;
  const ms=document.getElementById('mockupSection');ms.classList.add('show');
  document.getElementById('mockFabName').textContent='with '+selectedFabric.name;
  var _mkSp=document.getElementById('mockupSpinner');if(_mkSp)_mkSp.style.display='block';
  document.getElementById('mockupSvg').style.display='none';
  // Update info bar
  document.getElementById('mockSwatchMini').style.background=fabPatternBg(selectedFabric);
  document.getElementById('mockSelName').textContent=selectedFabric.name;
  document.getElementById('mockSelDetails').textContent=selectedFabric.price+' · '+selectedFabric.desc;
  document.getElementById('mockFabLink').href=selectedFabric.url||'https://bluemoonfabrics.com';
  var _ac=document.getElementById('mockAddCart'); if(_ac) _ac.style.display = selectedFabric.variantId ? 'inline-block' : 'none';
  // Render SVG mockup after a brief "loading" delay
  setTimeout(()=>{
    drawMockupSVG();
    var _mkSp2=document.getElementById('mockupSpinner');if(_mkSp2)_mkSp2.style.display='none';
    document.getElementById('mockupSvg').style.display='block';
  },420);
}

function drawMockupSVG(){
  const svg=document.getElementById('mockupSvg');
  const g=S.g||'bikini_top';
  const f=selectedFabric;
  const bg=fabPatternBg(f);
  const patId='mockPat_'+f.id;

  // Define SVG pattern fill based on fabric type
  let defs='',fill=`url(#${patId})`;
  if(f.pattern==='stripe'){
    defs=`<defs><pattern id="${patId}" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="8" height="16" fill="${f.hex}"/><rect x="8" width="8" height="16" fill="#fff"/></pattern></defs>`;
  } else if(f.pattern==='foil'){
    defs=`<defs><linearGradient id="${patId}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${f.hex}"/><stop offset="35%" stop-color="#fff" stop-opacity=".7"/><stop offset="60%" stop-color="${f.hex}"/><stop offset="85%" stop-color="#fff" stop-opacity=".5"/><stop offset="100%" stop-color="${f.hex}"/></linearGradient></defs>`;
  } else if(f.pattern==='lace'){
    defs=`<defs><pattern id="${patId}" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="#fafafa"/><circle cx="10" cy="10" r="5" stroke="${f.hex}" stroke-width="1" fill="none"/><circle cx="0" cy="0" r="5" stroke="${f.hex}" stroke-width="1" fill="none"/><circle cx="20" cy="0" r="5" stroke="${f.hex}" stroke-width="1" fill="none"/><circle cx="0" cy="20" r="5" stroke="${f.hex}" stroke-width="1" fill="none"/><circle cx="20" cy="20" r="5" stroke="${f.hex}" stroke-width="1" fill="none"/></pattern></defs>`;
  } else if(f.pattern==='velvet'){
    defs=`<defs><linearGradient id="${patId}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${f.hex}" stop-opacity=".85"/><stop offset="50%" stop-color="#000" stop-opacity=".3"/><stop offset="100%" stop-color="${f.hex}"/></linearGradient></defs>`;
  } else if(f.pattern==='sequin'){
    defs=`<defs><pattern id="${patId}" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="${f.hex}22"/><circle cx="4" cy="4" r="3" fill="${f.hex}" opacity=".85"/><circle cx="4" cy="4" r="1.5" fill="#fff" opacity=".5"/></pattern></defs>`;
  } else if(f.pattern==='tropical'){
    defs=`<defs><linearGradient id="${patId}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#22a65e"/><stop offset="50%" stop-color="#4fc3f7"/><stop offset="100%" stop-color="#ffb300"/></linearGradient></defs>`;
  } else if(f.pattern==='floral'){
    defs=`<defs><pattern id="${patId}" width="30" height="30" patternUnits="userSpaceOnUse"><rect width="30" height="30" fill="${f.hex}22"/><circle cx="15" cy="15" r="6" fill="${f.hex}" opacity=".8"/><circle cx="15" cy="15" r="3" fill="#fff" opacity=".6"/><circle cx="0" cy="0" r="4" fill="#4caf50" opacity=".7"/><circle cx="30" cy="0" r="4" fill="#4caf50" opacity=".7"/><circle cx="0" cy="30" r="4" fill="#4caf50" opacity=".7"/><circle cx="30" cy="30" r="4" fill="#4caf50" opacity=".7"/></pattern></defs>`;
  } else if(f.pattern==='animal'){
    defs=`<defs><pattern id="${patId}" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="#c49a6c"/><path d="M0 0 L10 10 L0 20" stroke="${f.hex}" stroke-width="4" fill="none"/><path d="M10 0 L20 10 L10 20" stroke="${f.hex}" stroke-width="4" fill="none"/></pattern></defs>`;
  } else if(f.pattern==='rib'){
    defs=`<defs><pattern id="${patId}" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="4" height="8" fill="${f.hex}"/><rect x="4" width="4" height="8" fill="${f.hex}88"/></pattern></defs>`;
  } else {
    fill=f.hex;
    defs='';
  }

  const paths=getMockupPaths(g);
  svg.innerHTML=defs+`<rect width="300" height="380" fill="#f2f5ff"/>
    <text x="150" y="354" text-anchor="middle" fill="#637899" font-size="10" font-family="Inter,sans-serif" font-weight="700">${(DESIGNS[g]?.label||'').toUpperCase()} MOCKUP &middot; ${f.name.toUpperCase()}</text>
    ${paths.map(p=>`<path d="${p}" fill="${fill}" stroke="${f.hex}" stroke-width="2"/>`).join('\n')}
    <text x="150" y="370" text-anchor="middle" fill="#93c4ff" font-size="9" font-family="Inter,sans-serif">Blue Moon Fabrics Pattern Studio</text>`;
}

function getMockupPaths(g){
  // SVG paths for each garment silhouette (scaled to 300x380 viewBox)
  const M={
    bikini_top:[
      'M80,300 L130,120 L150,300 Z',   // left cup
      'M220,300 L170,120 L150,300 Z',  // right cup
    ],
    bikini_bottom:['M60,120 C60,120 110,100 150,100 C190,100 240,120 240,120 L228,200 C228,200 210,230 150,230 C90,230 72,200 72,200 Z'],
    one_piece:['M90,40 C70,60 60,90 65,130 C68,155 80,168 90,185 C100,215 100,290 100,290 L200,290 C200,290 200,215 210,185 C220,168 232,155 235,130 C240,90 230,60 210,40 L180,20 C170,18 160,17 150,17 C140,17 130,18 120,20 Z'],
    leggings:['M70,20 L60,310 L130,310 L150,190 Z','M230,20 L240,310 L170,310 L150,190 Z','M70,20 L150,50 L230,20 L230,60 L70,60 Z'],
    sports_bra:['M50,220 L50,290 L250,290 L250,220 Z','M50,220 C50,150 85,90 120,90 C135,90 150,105 150,130 L150,220 Z','M250,220 C250,150 215,90 180,90 C165,90 150,105 150,130 L150,220 Z'],
    leotard:['M90,40 C70,60 60,90 65,130 C68,155 80,168 90,185 C100,215 100,290 100,290 L200,290 C200,290 200,215 210,185 C220,168 232,155 235,130 C240,90 230,60 210,40 L180,20 C170,18 160,17 150,17 C140,17 130,18 120,20 Z','M100,290 C85,270 72,250 64,225','M200,290 C215,270 228,250 236,225'],
    crop_top:['M80,60 L50,100 L78,120 L80,100 Z','M220,60 L250,100 L222,120 L220,100 Z','M80,60 C80,60 110,45 150,45 C190,45 220,60 220,60 L224,120 L220,200 L80,200 L76,120 Z'],
    bodycon_dress:['M90,30 C70,48 65,72 68,100 C70,118 80,130 88,148 C92,172 92,235 95,268 C97,290 110,310 150,310 C190,310 203,290 205,268 C208,235 208,172 212,148 C220,130 230,118 232,100 C235,72 230,48 210,30 Z'],
    maxi_dress:['M100,30 L100,100 L200,100 L200,30 C185,22 170,18 150,18 C130,18 115,22 100,30 Z','M100,100 L40,340 L260,340 L200,100 Z'],
    night_dress:['M95,30 L78,310 L222,310 L205,30 Z'],
    two_piece:['M80,40 L65,50 L55,65 L72,72 L72,120 L228,120 L228,72 L245,65 L235,50 L220,40 C200,55 178,62 150,62 C122,62 100,55 80,40 Z','M72,148 L55,270 L245,270 L228,148 Z'],
    skirt:['M80,30 L80,75 L220,75 L220,30 Z','M80,75 L30,310 L270,310 L220,75 Z'],
    shorts:['M70,30 L60,240 L130,240 L150,155 Z','M230,30 L240,240 L170,240 L150,155 Z','M70,30 L150,70 L230,30 L230,80 L70,80 Z'],
    lingerie:['M108,75 L150,130 L192,75 C185,50 170,40 150,40 C130,40 115,50 108,75 Z','M90,80 C70,95 70,130 90,148 C102,157 128,150 150,130 L150,80 Z','M210,80 C230,95 230,130 210,148 C198,157 172,150 150,130 L150,80 Z','M90,148 C80,178 78,225 88,268 C96,298 118,315 138,315 L162,315 C182,315 204,298 212,268 C222,225 220,178 210,148 Z'],
    costume:['M90,30 L90,100 L210,100 L210,30 C190,22 172,18 150,18 C128,18 110,22 90,30 Z','M90,100 L30,340 L270,340 L210,100 Z'],
    unitard:['M90,30 C70,50 65,80 68,115 L150,135 L232,115 C235,80 230,50 210,30 Z','M68,115 L48,330 L128,330 L150,210 Z','M232,115 L252,330 L172,330 L150,210 Z'],
    wrap_dress:['M110,25 C105,35 102,50 102,65 L100,330 L150,330 Z','M190,25 C195,35 198,50 198,65 L200,330 L150,330 Z','M90,25 L70,35 L82,50 L96,38 Z','M210,25 L230,35 L218,50 L204,38 Z','M102,65 L198,65 L196,75 L104,75 Z'],
    rash_guard:['M80,30 L50,55 L68,70 L72,50 Z','M220,30 L250,55 L232,70 L228,50 Z','M72,50 L68,230 L232,230 L228,50 Z','M80,30 C100,24 200,24 220,30 L222,45 L78,45 Z'],
  };
  return M[g]||M['bikini_top'];
}

// ═══════════════════════════════════════════════════════
// UPLOAD — image/specs analysis
// ═══════════════════════════════════════════════════════
let uploadedFile=null,uploadAnalysisResult=null;

function onFileDrop(e){
  e.preventDefault();
  document.getElementById('uploadZone').classList.remove('drag');
  const file=e.dataTransfer?.files?.[0];
  if(file)processUploadFile(file);
}
function onFileSelect(input){
  const file=input.files?.[0];
  if(file)processUploadFile(file);
}
function processUploadFile(file){
  uploadedFile=file;
  // Show preview for images
  if(file.type.startsWith('image/')){
    const reader=new FileReader();
    reader.onload=e=>{
      document.getElementById('uploadImg').src=e.target.result;
      document.getElementById('uploadPreview').style.display='block';
      try{ document.getElementById('uploadPreview').scrollIntoView({behavior:'smooth',block:'center'}); }catch(_e){}
    };
    reader.readAsDataURL(file);
  }
  analyzeUpload(file);
}

function analyzeUpload(file){
  document.getElementById('uploadSpinner').classList.add('show');
  document.getElementById('uploadAnalysis').classList.remove('show');
  // Photo analysis requires server-side processing — coming soon
  // For now, guide the user to manual entry
  setTimeout(function(){
    handleAnalysisResult({
      garmentType: '',
      styleId: '',
      notes: 'Photo upload analysis is coming soon. For now, select your garment and style manually — it only takes 30 seconds.',
      measurements:{bust:36,waist:28,hips:38},
      chips:[],
      fabricSuggestion:'',
      confidence:'low'
    });
    document.getElementById('uploadSpinner').classList.remove('show');
  }, 800);
}


function fileToBase64(file){
  return new Promise((res,rej)=>{
    const r=new FileReader();
    r.onload=()=>res(r.result.split(',')[1]);
    r.onerror=rej;
    r.readAsDataURL(file);
  });
}

function showUploadAnalysis(p){
  const box=document.getElementById('uploadAnalysis');
  const conf={'high':'🟢 High','medium':'🟡 Medium','low':'🔴 Low'}[p.confidence]||'';
  document.getElementById('uploadAnalysisText').innerHTML=`<strong>${conf} Confidence</strong> &mdash; ${p.summary||'Design analysed.'}`;
  // Fields
  const mfields=document.getElementById('uploadFields');
  const meas=p.measurements||{};
  mfields.innerHTML=Object.entries(meas).map(([k,v])=>`<div class="ua-field"><div class="ua-fl">${k}</div><div class="ua-fv">${v}"</div></div>`).join('');
  // Chips
  if(p.chips?.length){
    var _ucf=document.getElementById('uploadChipsFound');if(_ucf)_ucf.innerHTML='<strong>Detected features:</strong> '+p.chips.join(', ');
  }
  document.getElementById('uploadBtn').classList.add('show');
  box.classList.add('show');
  try{ box.scrollIntoView({behavior:'smooth',block:'center'}); }catch(_e){}
}

function applyUploadAnalysis(){
  const proj = newProject(true);
  if(uploadAnalysisResult?.garment) proj.name = (DESIGNS[uploadAnalysisResult.garment]?.label||'Design')+' Project';
  saveProjects();
  renderProjectList();
  if(!uploadAnalysisResult)return;
  const p=uploadAnalysisResult;
  // Set garment
  if(p.garment&&DESIGNS[p.garment]){
    S.g=p.garment;
    // Click the garment button
    const gcBtns=[...document.querySelectorAll('.gc')];
    for(const b of gcBtns){if(b.getAttribute('onclick')?.includes("'"+p.garment+"'")){b.classList.add('on');break;}}
    // Build design grid
    buildDesignGrid(p.garment);
    renderM(p.garment);
    renderChips(p.garment);
    const tip=document.getElementById('mtip');tip.innerHTML=DESIGNS[p.garment].tip;tip.style.display='block';
    // Try to match style
    if(p.style){
      const st=DESIGNS[p.garment].styles.find(s=>s.name.toLowerCase().includes(p.style.toLowerCase())||s.id.includes(p.style.toLowerCase()));
      if(st){
        S.design=st.id;
        setTimeout(()=>{const d=document.getElementById('dcard_'+st.id);if(d)pickDesign(d,st.id,p.garment);},100);
      }
    }
    // Apply measurements
    if(p.measurements){
      setTimeout(()=>{
        Object.entries(p.measurements).forEach(([k,v])=>{
          const el=document.getElementById('m_'+k);if(el&&el.type==='number')el.value=v;
        });
      },200);
    }
    // Apply chips
    if(p.chips?.length){
      setTimeout(()=>{
        document.querySelectorAll('#schips .chip').forEach(chip=>{
          if(p.chips.some(fc=>chip.textContent.toLowerCase().includes(fc.toLowerCase())))chip.classList.add('on');
        });
      },300);
    }
    document.getElementById('pg2Next').disabled=!S.design;
    document.getElementById('genBtn').disabled=!S.design;
    toast_('\u2713 Design applied! Review measurements then generate your pattern.');
    nxt('pg2');
  }
}

// ═══════════════════════════════════════════════════════
// DXF EXPORT — real AutoCAD R14 DXF
// ═══════════════════════════════════════════════════════
function saveDXF(){
  if(!requireTier('dxf','studio','dxf'))return;

  if(!S.ps.length){toast_('Generate a pattern first');return;}
  closePrint();
  const includeSA=document.getElementById('dxfSA')?.classList.contains('sel');
  const includeGrain=document.getElementById('dxfGrain')?.classList.contains('sel');
  const includeNotch=document.getElementById('dxfNotch')?.classList.contains('sel');
  const includeText=document.getElementById('dxfText')?.classList.contains('sel');
  const separate=document.getElementById('dxfSep')?.classList.contains('sel');

  if(separate){
    // Download one DXF per piece
    S.ps.forEach((p,i)=>{
      const dxf=buildDXF([p],{includeSA,includeGrain,includeNotch,includeText});
      const nm=(p.n||'piece').toLowerCase().replace(/\s+/g,'-');
      setTimeout(()=>downloadDXFFile(dxf,nm+'.dxf'),i*200);
    });
    toast_('Downloading '+S.ps.length+' DXF files');
  } else {
    const dxf=buildDXF(S.ps,{includeSA,includeGrain,includeNotch,includeText});
    const nm=((DESIGNS[S.g]?.label||'pattern').toLowerCase().replace(/\s+/g,'-'))+'-'+S.design;
    downloadDXFFile(dxf,'bluemoon-'+nm+'.dxf');
    toast_('DXF downloaded \u2014 open in Gerber, Lectra, or Illustrator');
  }
}

function downloadDXFFile(content,filename){
  const blob=new Blob([content],{type:'application/dxf'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();setTimeout(()=>a.remove(),1000);
  setTimeout(()=>URL.revokeObjectURL(url),2000);
}

// Build DXF R14 (AC1014) file from pattern pieces
// DXF uses inches. Each piece generates a LWPOLYLINE (closed) entity.
function buildDXF(pieces,opts={}){
  const {includeSA=true,includeGrain=true,includeNotch=true,includeText=true}=opts;
  let out='';

  // ── HEADER ──
  out+=`  0\nSECTION\n  2\nHEADER\n`;
  out+=`  9\n$ACADVER\n  1\nAC1014\n`;
  out+=`  9\n$INSUNITS\n 70\n     1\n`; // 1 = inches
  out+=`  9\n$MEASUREMENT\n 70\n     0\n`; // 0 = English
  out+=`  0\nENDSEC\n`;

  // ── TABLES (minimal) ──
  out+=`  0\nSECTION\n  2\nTABLES\n`;
  out+=`  0\nTABLE\n  2\nLTYPE\n 70\n     3\n`;
  out+=`  0\nLTYPE\n  2\nCONTINUOUS\n 70\n     0\n  3\nSolid line\n 72\n    65\n 73\n     0\n 40\n0.0\n`;
  out+=`  0\nLTYPE\n  2\nDASHED\n 70\n     0\n  3\nDashed _ _ _\n 72\n    65\n 73\n     2\n 40\n0.75\n 49\n0.5\n 49\n-0.25\n`;
  out+=`  0\nLTYPE\n  2\nCENTER\n 70\n     0\n  3\nCenter __ _ __\n 72\n    65\n 73\n     4\n 40\n2.0\n 49\n1.25\n 49\n-0.25\n 49\n0.25\n 49\n-0.25\n`;
  out+=`  0\nENDTAB\n`;
  out+=`  0\nTABLE\n  2\nLAYER\n 70\n     4\n`;
  out+=`  0\nLAYER\n  2\n0\n 70\n     0\n 62\n     7\n  6\nCONTINUOUS\n`;
  out+=`  0\nLAYER\n  2\nSEAM_LINES\n 70\n     0\n 62\n     5\n  6\nCONTINUOUS\n`;
  out+=`  0\nLAYER\n  2\nSEAM_ALLOWANCE\n 70\n     0\n 62\n     3\n  6\nDASHED\n`;
  out+=`  0\nLAYER\n  2\nGRAIN_LINES\n 70\n     0\n 62\n     6\n  6\nCENTER\n`;
  out+=`  0\nLAYER\n  2\nNOTCHES\n 70\n     0\n 62\n     1\n  6\nCONTINUOUS\n`;
  out+=`  0\nLAYER\n  2\nLABELS\n 70\n     0\n 62\n     7\n  6\nCONTINUOUS\n`;
  out+=`  0\nENDTAB\n`;
  out+=`  0\nENDSEC\n`;

  // ── ENTITIES ──
  out+=`  0\nSECTION\n  2\nENTITIES\n`;

  let offsetX=1,maxH=0,col=0;
  const colSpacing=2; // inches between pieces

  pieces.forEach(p=>{
    const ox=offsetX,oy=1;
    offsetX+=p.w+(includeSA?p.sa*2:0)+colSpacing;
    maxH=Math.max(maxH,p.h+(includeSA?p.sa*2:0));
    col++;
    if(col>=3){offsetX=1;col=0;}

    const sa=includeSA?p.sa:0;
    const hw=(p.w+sa*2)/2,hh=(p.h+sa*2)/2;
    const cx=ox+hw,cy=oy+hh;

    // Generate polyline vertices for this piece shape
    const verts=getDXFVerts(p.s,hw,hh,cx,cy);

    // ── Seam line (main shape, inner) ──
    const shw=p.w/2,shh=p.h/2;
    const innerVerts=getDXFVerts(p.s,shw,shh,cx,cy);
    out+=polylineEntity('SEAM_LINES',innerVerts,true);

    // ── Seam allowance boundary ──
    if(includeSA&&sa>0){
      out+=polylineEntity('SEAM_ALLOWANCE',verts,true,1); // 1=dashed
    }

    // ── Grain line ──
    if(includeGrain){
      const ga=S.grain==='bias'?45:S.grain==='horizontal'?0:90;
      const gl=Math.min(shw,shh)*0.55;
      const rad=ga*Math.PI/180;
      const x1=cx-Math.sin(rad)*gl,y1=cy-Math.cos(rad)*gl;
      const x2=cx+Math.sin(rad)*gl,y2=cy+Math.cos(rad)*gl;
      out+=`  0\nLINE\n  8\nGRAIN_LINES\n 10\n${x1.toFixed(4)}\n 20\n${y1.toFixed(4)}\n 30\n0.0\n 11\n${x2.toFixed(4)}\n 21\n${y2.toFixed(4)}\n 31\n0.0\n`;
      // Arrow heads
      out+=arrowDXF(x2,y2,ga,'GRAIN_LINES');
      out+=arrowDXF(x1,y1,ga+180,'GRAIN_LINES');
    }

    // ── Notches ──
    if(includeNotch&&p.t?.includes('notch')){
      // Notch at top center
      const nLen=0.25;
      out+=`  0\nLINE\n  8\nNOTCHES\n 10\n${(cx-nLen/2).toFixed(4)}\n 20\n${(cy+shh).toFixed(4)}\n 30\n0.0\n 11\n${(cx+nLen/2).toFixed(4)}\n 21\n${(cy+shh).toFixed(4)}\n 31\n0.0\n`;
      // Notch at side
      out+=`  0\nLINE\n  8\nNOTCHES\n 10\n${(cx+shw).toFixed(4)}\n 20\n${(cy-nLen/2).toFixed(4)}\n 30\n0.0\n 11\n${(cx+shw).toFixed(4)}\n 21\n${(cy+nLen/2).toFixed(4)}\n 31\n0.0\n`;
    }

    // ── Text labels ──
    if(includeText){
      out+=`  0\nTEXT\n  8\nLABELS\n 10\n${cx.toFixed(4)}\n 20\n${(cy-0.3).toFixed(4)}\n 30\n0.0\n 40\n0.18\n  1\n${p.n}\n 72\n1\n 73\n2\n 11\n${cx.toFixed(4)}\n 21\n${(cy-0.3).toFixed(4)}\n 31\n0.0\n`;
      out+=`  0\nTEXT\n  8\nLABELS\n 10\n${cx.toFixed(4)}\n 20\n${(cy+0.05).toFixed(4)}\n 30\n0.0\n 40\n0.12\n  1\n${p.q}\n 72\n1\n 73\n2\n 11\n${cx.toFixed(4)}\n 21\n${(cy+0.05).toFixed(4)}\n 31\n0.0\n`;
      out+=`  0\nTEXT\n  8\nLABELS\n 10\n${cx.toFixed(4)}\n 20\n${(cy+0.28).toFixed(4)}\n 30\n0.0\n 40\n0.10\n  1\n${p.w.toFixed(2)}" x ${p.h.toFixed(2)}"\n 72\n1\n 73\n2\n 11\n${cx.toFixed(4)}\n 21\n${(cy+0.28).toFixed(4)}\n 31\n0.0\n`;
    }

    // ── Fold line ──
    if(p.t?.includes('fold')){
      const fx=cx-hw+sa;
      out+=`  0\nLINE\n  8\nGRAIN_LINES\n 10\n${fx.toFixed(4)}\n 20\n${(cy-hh).toFixed(4)}\n 30\n0.0\n 11\n${fx.toFixed(4)}\n 21\n${(cy+hh).toFixed(4)}\n 31\n0.0\n`;
    }
  });

  // Title block
  out+=`  0\nTEXT\n  8\nLABELS\n 10\n1.0\n 20\n0.3\n 30\n0.0\n 40\n0.22\n  1\nBlue Moon Fabrics Pattern Studio &mdash; ${(DESIGNS[S.g]?.label||'Pattern')} / ${S.design}\n 72\n0\n`;

  out+=`  0\nENDSEC\n  0\nEOF\n`;
  return out;
}

// Get DXF polyline vertices for a shape type
function getDXFVerts(type,hw,hh,cx,cy){
  // Returns array of {x,y} points (all in inches, absolute coords)
  const V=(px,py)=>({x:cx+px,y:cy+py});
  switch(type){
    case 'tri':
      return [V(0,-hh),V(hw*.9,hh*.2),V(hw*.65,hh),V(-hw*.65,hh),V(-hw*.9,hh*.2)];
    case 'cup_round':
      return bezierToPolyline([[0,-hh],[hw*.5,-hh*1.32],[hw,-hh],[hw*.9,0],[hw*.6,hh],[0,hh+.01],[-hw*.6,hh],[-hw*.9,0],[-hw,-hh],[-hw*.5,-hh*1.32],[0,-hh]],cx,cy);
    case 'brif':
      return bezierToPolyline([[0,-hh],[hw*.5,-hh*1.1],[hw,-hh],[hw*.5,hh*.2],[hw*.3,hh],[0,hh*1.1],[-hw*.3,hh],[-hw*.5,hh*.2],[-hw,-hh],[0,-hh]],cx,cy);
    case 'brib':
      return bezierToPolyline([[0,-hh],[hw*.5,-hh],[hw,-hh],[hw*.62,hh*.3],[hw*.35,hh],[0,hh*1.15],[-hw*.35,hh],[-hw*.62,hh*.3],[-hw,-hh],[0,-hh]],cx,cy);
    case 'braz':
      return bezierToPolyline([[0,-hh],[hw*.5,-hh],[hw,-hh],[hw*.38,hh*.2],[hw*.14,hh],[0,hh*1.22],[-hw*.14,hh],[-hw*.38,hh*.2],[-hw,-hh],[0,-hh]],cx,cy);
    case 'lgf':
      return bezierToPolyline([[-hw,-hh],[0,-hh*1.04],[hw,-hh],[hw*1.05,0],[hw*.55,hh],[-hw*.55,hh],[-hw*1.05,0],[-hw,-hh]],cx,cy);
    case 'lgb':
      return bezierToPolyline([[-hw,-hh],[0,-hh*1.08],[hw,-hh],[hw*1.09,0],[hw*.62,hh],[-hw*.62,hh],[-hw*1.09,0],[-hw,-hh]],cx,cy);
    case 'racerb':
      return [V(-hw,-hh),V(hw,-hh),V(hw*.55,-hh*.3),V(hw*.18,0),V(hw*.18,hh),V(-hw*.18,hh),V(-hw*.18,0),V(-hw*.55,-hh*.3)];
    case 'sweet':
      return bezierToPolyline([[0,-hh*.55],[-hw*.5,-hh*1.25],[-hw,-hh*.48],[-hw*.82,hh*.42],[-hw*.38,hh],[hw*.38,hh],[hw*.82,hh*.42],[hw,-hh*.48],[hw*.5,-hh*1.25],[0,-hh*.55]],cx,cy);
    case 'oval':
      return ellipseToPolyline(cx,cy,hw,hh,16);
    default: // rect and all dress shapes
      return [V(-hw,-hh),V(hw,-hh),V(hw*1.06,hh),V(-hw*1.06,hh)];
  }
}

// Convert bezier control points to polyline (simplified, linear interpolation)
function bezierToPolyline(pts,cx,cy,steps=8){
  const result=[];
  for(let i=0;i<pts.length-1;i++){
    const [x0,y0]=pts[i];const [x1,y1]=pts[i+1];
    for(let t=0;t<1;t+=1/steps){
      result.push({x:cx+x0*(1-t)+x1*t,y:cy+y0*(1-t)+y1*t});
    }
  }
  const [lx,ly]=pts[pts.length-1];
  result.push({x:cx+lx,y:cy+ly});
  return result;
}
function ellipseToPolyline(cx,cy,rx,ry,n=16){
  const pts=[];
  for(let i=0;i<=n;i++){const a=i/n*Math.PI*2;pts.push({x:cx+Math.cos(a)*rx,y:cy+Math.sin(a)*ry});}
  return pts;
}
function polylineEntity(layer,verts,closed=true,ltype=0){
  let s=`  0\nLWPOLYLINE\n  8\n${layer}\n 90\n${verts.length}\n 70\n${closed?1:0}\n`;
  verts.forEach(v=>{s+=` 10\n${v.x.toFixed(4)}\n 20\n${v.y.toFixed(4)}\n`;});
  return s;
}
function arrowDXF(x,y,angle,layer){
  const rad=angle*Math.PI/180;const s=0.15;
  const ax=x-Math.sin(rad)*s*1.2-Math.cos(rad)*s*.5;
  const bx=x-Math.sin(rad)*s*1.2+Math.cos(rad)*s*.5;
  const ay=y-Math.cos(rad)*s*1.2-Math.sin(rad)*s*.5;
  const by=y-Math.cos(rad)*s*1.2+Math.sin(rad)*s*.5;
  return `  0\nLINE\n  8\n${layer}\n 10\n${x.toFixed(4)}\n 20\n${y.toFixed(4)}\n 30\n0.0\n 11\n${ax.toFixed(4)}\n 21\n${ay.toFixed(4)}\n 31\n0.0\n`
       + `  0\nLINE\n  8\n${layer}\n 10\n${x.toFixed(4)}\n 20\n${y.toFixed(4)}\n 30\n0.0\n 11\n${bx.toFixed(4)}\n 21\n${by.toFixed(4)}\n 31\n0.0\n`;
}

// ─── SVG Export ───
function saveSVG(){
  if(!requireTier('svg','studio','svg'))return;

  if(!S.ps.length){toast_('Generate a pattern first');return;}
  closePrint();
  const svgNS='http://www.w3.org/2000/svg';
  const sc=PPI*zoom;
  let minX=Infinity,minY=Infinity,maxX=0,maxY=0;
  S.ps.forEach(p=>{
    minX=Math.min(minX,p.x);minY=Math.min(minY,p.y);
    maxX=Math.max(maxX,p.x+p.wP);maxY=Math.max(maxY,p.y+p.hP);
  });
  const pad=20,W=(maxX-minX+pad*2)*zoom,H=(maxY-minY+pad*2)*zoom;
  let svgContent=`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="${svgNS}" width="${W.toFixed(1)}px" height="${H.toFixed(1)}px" viewBox="0 0 ${W.toFixed(1)} ${H.toFixed(1)}">
<title>Blue Moon Fabrics &mdash; ${DESIGNS[S.g]?.label||'Pattern'} / ${S.design}</title>
<rect width="${W}" height="${H}" fill="#eef2ff"/>
<text x="${pad}" y="${pad-4}" font-family="Arial,sans-serif" font-size="10" fill="#637899">Blue Moon Fabrics Pattern Studio &mdash; ${DESIGNS[S.g]?.label||''} &middot; ${S.design}</text>
`;
  S.ps.forEach(p=>{
    const pcx=((p.x-minX+pad)+p.wP/2)*zoom;
    const pcy=((p.y-minY+pad)+p.hP/2)*zoom;
    const hw=p.wP*zoom/2,hh=p.hP*zoom/2;
    const sw=p.w*PPI*zoom/2,sh=p.h*PPI*zoom/2;
    const verts=getDXFVerts(p.s,sw/sc,sh/sc,0,0);
    const ptStr=verts.map(v=>`${(pcx+v.x*sc).toFixed(2)},${(pcy+v.y*sc).toFixed(2)}`).join(' ');
    svgContent+=`<polygon points="${ptStr}" fill="${p.c}22" stroke="${p.c}" stroke-width="1.5"/>
<text x="${pcx.toFixed(1)}" y="${(pcy-8).toFixed(1)}" text-anchor="middle" font-family="Arial,sans-serif" font-size="${Math.max(9,11*zoom).toFixed(0)}" font-weight="bold" fill="${p.c}">${p.n}</text>
<text x="${pcx.toFixed(1)}" y="${(pcy+6).toFixed(1)}" text-anchor="middle" font-family="Arial,sans-serif" font-size="${Math.max(7,9*zoom).toFixed(0)}" fill="#374f78">${p.q}</text>
<text x="${pcx.toFixed(1)}" y="${(pcy+18).toFixed(1)}" text-anchor="middle" font-family="Arial,sans-serif" font-size="${Math.max(7,9*zoom).toFixed(0)}" fill="#637899">${p.w.toFixed(2)}" x ${p.h.toFixed(2)}"</text>
`;
  });
  svgContent+=`</svg>`;
  const blob=new Blob([svgContent],{type:'image/svg+xml'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  const nm=((DESIGNS[S.g]?.label||'pattern').toLowerCase().replace(/\s+/g,'-'))+'-'+S.design;
  a.download='bluemoon-'+nm+'.svg';a.href=url;a.click();
  setTimeout(()=>URL.revokeObjectURL(url),2000);
  toast_('SVG downloaded \u2014 open in Illustrator, Inkscape, or Cricut');
}

// ─── Export modal tab switching ───
function selExportTab(el,panelId){
  document.querySelectorAll('.pm-etab').forEach(b=>b.classList.remove('on'));
  document.querySelectorAll('.pm-export-panel').forEach(p=>p.classList.remove('show'));
  el.classList.add('on');
  document.getElementById(panelId).classList.add('show');
}


// ===== INIT =====

// ── PROJECT SYSTEM ────────────────────────────────────────────────────────────
let PROJECTS = JSON.parse(localStorage.getItem('ps_projects')||'[]');
let ACTIVE_PROJECT = null;

function saveProjects(){
  try{localStorage.setItem('ps_projects',JSON.stringify(PROJECTS));}catch(e){}
}

function newProject(fromUpload){
  const id = 'proj_'+Date.now();
  const proj = {
    id, 
    name: fromUpload ? 'Uploaded Design' : 'New Project',
    garment: S.g||'',
    design: S.design||'',
    measurements: Object.assign({},S.m),
    fabric: S.selectedFabric?.id||'',
    chips: [],
    grain: S.grain,
    sa: S.sa,
    fw: S.fw,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  PROJECTS.unshift(proj);
  ACTIVE_PROJECT = proj;
  saveProjects();
  renderProjectList();
  updateProjectBadge();
  toast_('\u2728 New project created');
  return proj;
}

function loadProject(id){
  const proj = PROJECTS.find(p=>p.id===id);
  if(!proj)return;
  ACTIVE_PROJECT = proj;
  S.g = proj.garment;
  S.design = proj.design;
  S.m = Object.assign({},proj.measurements);
  S.grain = proj.grain||'vertical';
  S.sa = proj.sa||.5;
  S.fw = proj.fw||60;
  if(proj.garment){
    renderM(proj.garment);
    renderChips(proj.garment);
    buildDesignGrid(proj.garment);
    if(proj.design){
      const d = document.getElementById('dcard_'+proj.design);
      if(d) pickDesign(d,proj.design,proj.garment);
    }
    document.querySelectorAll('.gc').forEach(b=>{
      if(b.getAttribute('onclick')?.includes("'"+proj.garment+"'"))b.classList.add('on');
    });
  }
  updateProjectBadge();
  renderProjectList();
  if(proj.garment){
    toast_('\u2713 Opened: '+proj.name);
    nxt('pg2'); // go straight to the design/review page where their work is visible
  } else {
    toast_('\u2713 Opened: '+proj.name+' \u2014 pick a garment to begin');
    nxt('pg1'); // empty project -> start at garment picker
  }
}

function saveCurrentToProject(){
  if(!ACTIVE_PROJECT)return;
  ACTIVE_PROJECT.garment = S.g;
  ACTIVE_PROJECT.design = S.design;
  ACTIVE_PROJECT.measurements = Object.assign({},S.m);
  ACTIVE_PROJECT.grain = S.grain;
  ACTIVE_PROJECT.sa = S.sa;
  ACTIVE_PROJECT.fw = S.fw;
  ACTIVE_PROJECT.updatedAt = new Date().toISOString();
  saveProjects();
  toast_('\u2713 Project saved');
}

function deleteProject(id,e){
  e.stopPropagation();
  PROJECTS = PROJECTS.filter(p=>p.id!==id);
  if(ACTIVE_PROJECT?.id===id)ACTIVE_PROJECT=null;
  saveProjects();
  renderProjectList();
  updateProjectBadge();
  toast_('Project deleted');
}

function renderProjectList(){
  var el=document.getElementById('projectList');
  if(!el)return;
  if(!PROJECTS.length){
    el.innerHTML='<div style="text-align:center;padding:20px;font-size:13px;color:var(--ink4)">No saved projects yet. Upload a design or tap + to start.</div>';
    return;
  }
  var html='';
  for(var i=0;i<PROJECTS.length;i++){
    var p=PROJECTS[i];
    var cfg=DESIGNS[p.garment];
    var gar=cfg?cfg.label:'Pattern';
    var d=new Date(p.updatedAt);
    var age=Math.floor((Date.now()-d)/864e5);
    var ageStr=age===0?'today':age===1?'yesterday':(age+'d ago');
    var isActive=ACTIVE_PROJECT&&ACTIVE_PROJECT.id===p.id;
    html+='<div class="proj-item'+(isActive?' active':'')+'" onclick="loadProject(\''+p.id+'\')" title="Tap to open this project">'+
      '<div class="proj-ico">&#128196;</div>'+
      '<div style="flex:1;min-width:0">'+
        '<div class="proj-name">'+p.name+'</div>'+
        '<div class="proj-meta">'+gar+' &bull; '+ageStr+'</div>'+
      '</div>'+
      '<span class="proj-open-hint">Open &#8250;</span>'+
      '<span class="proj-status '+(isActive?'active':'draft')+'">'+(isActive?'Active':'Draft')+'</span>'+
      '<button onclick="deleteProject(\''+p.id+'\',event)" style="background:none;border:none;cursor:pointer;color:var(--ink5);font-size:18px;padding:4px;margin-left:4px" title="Delete project">&times;</button>'+
    '</div>';
  }
  el.innerHTML=html;
}


function updateProjectBadge(){
  const el = document.getElementById('projBadgeName');
  if(el) el.textContent = ACTIVE_PROJECT ? ACTIVE_PROJECT.name : 'My Projects';
}

function openProjectPanel(){nxt('pgU');}

// Auto-save current state every 30 seconds if active project
setInterval(()=>{if(ACTIVE_PROJECT&&S.g)saveCurrentToProject();},30000);

var _initDone=false;
function _init(){
  if(_initDone)return;
  _initDone=true;
  cnv=document.getElementById('cnv');
  if(cnv){
    ctx=cnv.getContext('2d');
    cnv.addEventListener('mousedown',e=>{
      const r=cnv.getBoundingClientRect();
      const mx=(e.clientX-r.left)/zoom,my=(e.clientY-r.top)/zoom;
      const hit=hitTest(mx,my);
      S.sel=hit;if(hit){drag=hit;dO={x:mx-hit.x,y:my-hit.y};}
      renderPL();drawAll();
    });
    cnv.addEventListener('mousemove',e=>{
      if(!drag)return;const r=cnv.getBoundingClientRect();
      drag.x=(e.clientX-r.left)/zoom-dO.x;drag.y=(e.clientY-r.top)/zoom-dO.y;
      updStats();drawAll();
    });
    cnv.addEventListener('mouseup',()=>drag=null);
    cnv.addEventListener('touchstart',e=>{
      if(_scrollMode)return; // let the container scroll natively
      e.preventDefault();const t=e.touches[0];const r=cnv.getBoundingClientRect();
      const mx=(t.clientX-r.left)/zoom,my=(t.clientY-r.top)/zoom;
      const hit=hitTest(mx,my);
      S.sel=hit;if(hit){drag=hit;dO={x:mx-hit.x,y:my-hit.y};}
      renderPL();drawAll();
    },{passive:false});
    cnv.addEventListener('touchmove',e=>{
      if(_scrollMode)return; // native scroll handles movement
      e.preventDefault();if(!drag)return;const t=e.touches[0];const r=cnv.getBoundingClientRect();
      drag.x=(t.clientX-r.left)/zoom-dO.x;drag.y=(t.clientY-r.top)/zoom-dO.y;
      updStats();drawAll();
    },{passive:false});
    cnv.addEventListener('touchend',()=>drag=null);
    document.getElementById('cwrap').addEventListener('wheel',e=>{
      // Zoom ONLY when holding Ctrl/Cmd (or pinch-zoom on trackpad). Otherwise let the
      // wheel scroll the pattern normally so users can move up/down freely.
      if(e.ctrlKey||e.metaKey){
        e.preventDefault();
        zoom=Math.max(.18,Math.min(4,zoom+(e.deltaY<0?.13:-.13)));
        document.getElementById('zlbl').textContent=Math.round(zoom*100)+'%';drawAll();
      }
      // else: do nothing — native scroll of #cwrap handles up/down/left/right
    },{passive:false});
  }
  buildGarmentGrid();
  buildFabricGrid();
  renderProjectList();
  updateProjectBadge();
  setTimeout(()=>{rzCnv();drawAll();},300);
}
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',_init);
} else {
  _init();
}


// Boot subscription system
if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",initSubscription);}else{initSubscription();}


/* ══════════════════════════════════════════════════════════════
   DESIGNER SKETCH — fashion croquis of the garment in the fabric
   Free for all tiers. AI photo (Look tab) remains Pro.
   ══════════════════════════════════════════════════════════════ */

// Fabric texture defs, tinted by fabric hex — returns SVG <defs> inner
function sketchFabricDefs(f) {
  var hx = f ? f.hex : '#1255b0';
  function shade(hex, amt) {
    var n = parseInt(hex.slice(1), 16);
    var r = Math.min(255, Math.max(0, (n >> 16) + amt));
    var g = Math.min(255, Math.max(0, ((n >> 8) & 255) + amt));
    var b = Math.min(255, Math.max(0, (n & 255) + amt));
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
  }
  var lite = shade(hx, 55), dark = shade(hx, -45);
  var base =
    '<linearGradient id="skFab" x1="0" y1="0" x2="0.35" y2="1">' +
      '<stop offset="0%" stop-color="' + lite + '"/>' +
      '<stop offset="45%" stop-color="' + hx + '"/>' +
      '<stop offset="100%" stop-color="' + dark + '"/>' +
    '</linearGradient>';
  var pat = '';
  switch (f && f.pattern) {
    case 'stripe':
      pat = '<pattern id="skTex" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="none"/><rect width="7" height="14" fill="#ffffff" opacity=".28"/></pattern>'; break;
    case 'floral':
      pat = '<pattern id="skTex" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r="3.2" fill="#fff" opacity=".5"/><circle cx="19" cy="18" r="2.4" fill="#fff" opacity=".35"/><circle cx="7" cy="7" r="1.2" fill="' + dark + '" opacity=".6"/></pattern>'; break;
    case 'tropical':
      pat = '<pattern id="skTex" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M6 24 Q12 10 22 6 Q14 16 10 26 Z" fill="#fff" opacity=".3"/><path d="M20 28 Q24 20 28 18" stroke="#fff" stroke-width="1.4" fill="none" opacity=".35"/></pattern>'; break;
    case 'animal':
      pat = '<pattern id="skTex" width="24" height="24" patternUnits="userSpaceOnUse"><ellipse cx="6" cy="7" rx="4" ry="2.6" fill="' + dark + '" opacity=".55" transform="rotate(-18 6 7)"/><ellipse cx="18" cy="17" rx="3.4" ry="2.2" fill="' + dark + '" opacity=".5" transform="rotate(24 18 17)"/></pattern>'; break;
    case 'foil':
      pat = '<pattern id="skTex" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M0 10 L10 0" stroke="#ffffff" stroke-width="2.4" opacity=".45"/></pattern>'; break;
    case 'velvet':
      pat = '<pattern id="skTex" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="2.4" fill="' + dark + '" opacity=".22"/></pattern>'; break;
    case 'lace':
      pat = '<pattern id="skTex" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="8" cy="8" r="5" fill="none" stroke="#fff" stroke-width="1" opacity=".55"/><circle cx="8" cy="8" r="1.4" fill="#fff" opacity=".6"/><circle cx="0" cy="0" r="2" fill="#fff" opacity=".35"/><circle cx="16" cy="16" r="2" fill="#fff" opacity=".35"/></pattern>'; break;
    case 'sequin':
      pat = '<pattern id="skTex" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="2.6" fill="#fff" opacity=".55"/><circle cx="4" cy="4" r="1" fill="' + lite + '"/><circle cx="10" cy="10" r="2.2" fill="#fff" opacity=".4"/></pattern>'; break;
    case 'rib':
      pat = '<pattern id="skTex" width="7" height="7" patternUnits="userSpaceOnUse"><rect x="0" width="3" height="7" fill="' + dark + '" opacity=".3"/></pattern>'; break;
    default: // solid — subtle lycra sheen
      pat = '<linearGradient id="skTexG" x1="0" y1="0" x2="1" y2="0"><stop offset="35%" stop-color="#fff" stop-opacity="0"/><stop offset="50%" stop-color="#fff" stop-opacity=".28"/><stop offset="65%" stop-color="#fff" stop-opacity="0"/></linearGradient><pattern id="skTex" width="300" height="720" patternUnits="userSpaceOnUse"><rect width="300" height="720" fill="url(#skTexG)"/></pattern>';
  }
  var dim =
    '<linearGradient id="skShade" x1="0" y1="0" x2="1" y2="0">' +
      '<stop offset="0%" stop-color="#140f06" stop-opacity=".32"/>' +
      '<stop offset="26%" stop-color="#140f06" stop-opacity=".12"/>' +
      '<stop offset="52%" stop-color="#140f06" stop-opacity="0"/>' +
      '<stop offset="88%" stop-color="#140f06" stop-opacity="0"/>' +
      '<stop offset="100%" stop-color="#140f06" stop-opacity=".14"/>' +
    '</linearGradient>' +
    '<linearGradient id="skSheen" x1="0" y1="0" x2="1" y2="0">' +
      '<stop offset="36%" stop-color="#fff" stop-opacity="0"/>' +
      '<stop offset="46%" stop-color="#fff" stop-opacity=".26"/>' +
      '<stop offset="57%" stop-color="#fff" stop-opacity="0"/>' +
    '</linearGradient>';
  return base + pat + dim;
}

// ── Croquis: elegant 9-head fashion figure, pencil-sketch line art ──
// ── Croquis F4: attitude — tilted head, top-knot, berry lips, stride ──
var CROQUIS_INK = '#332a22';
function croquisSVG() {
  var I = CROQUIS_INK;
  return (
    '<ellipse cx="150" cy="695" rx="58" ry="8" fill="#d8cab2" opacity=".5"/><ellipse cx="150" cy="694" rx="30" ry="4.5" fill="#c3b296" opacity=".55"/>' +
    /* ── skin washes (separate per limb) ── */
    '<g fill="#f2dcc8" stroke="none">' +
      '<g transform="rotate(-4 150 52)"><ellipse cx="150" cy="50" rx="19" ry="24"/></g>' +
      '<path d="M144 72 C144 85 143 95 141 104 L159 104 C157 95 156 85 156 72 Z"/>' +
      '<path d="M122 110 C116 146 114 186 117 222 C119 254 124 294 130 330 L170 332 C176 296 181 258 183 226 C186 190 184 150 178 116 Z"/>' +
      '<path d="M105 112 C96 150 90 196 92 244 C94 292 98 344 101 382 L111 383 C109 336 106 284 107 236 C108 190 112 148 117 118 Z"/>' +
      '<path d="M181 122 C193 130 202 146 206 168 C209 190 207 214 199 234 C194 246 187 256 181 262 L172 253 C180 242 187 226 189 204 C191 180 187 156 177 136 Z"/>' +
      '<path d="M130 330 C122 348 116 370 115 394 C113 446 117 516 124 582 C128 620 133 650 137 666 L147 666 C147 608 147 518 147 418 L149 336 Z"/>' +
      '<path d="M170 332 C178 350 184 372 185 394 C186 436 182 462 176 484 C179 520 178 580 172 630 C169 648 166 660 164 666 L154 664 C156 610 157 540 156 486 C155 436 153 388 151 340 Z"/>' +
    '</g>' +
    /* side shading */
    '<g fill="#e0c2a6" opacity=".5" stroke="none">' +
      '<path d="M122 110 C116 146 114 186 117 222 C118 240 121 260 124 282 C121 252 120 210 122 168 C123 146 124 126 126 112 Z"/>' +
      '<path d="M130 336 C124 356 120 376 119 398 C118 440 120 490 124 542 C122 492 122 432 124 392 C125 372 127 352 130 336 Z"/>' +
      '<path d="M176 484 C179 520 178 578 173 626 C176 580 177 528 174 490 Z"/>' +
    '</g>' +
    /* ── hair: voluminous top-knot with attitude, tilted with the head ── */
    '<g transform="rotate(-4 150 52)" stroke="none">' +
      '<path d="M132 44 C129 28 138 22 150 22 C162 22 171 28 168 44 C170 50 169 57 167 62 C171 42 166 30 150 29 C134 30 129 42 133 62 C131 57 130 50 132 44 Z" fill="#241d17"/>' +
      '<ellipse cx="150" cy="16" rx="12" ry="9" fill="#241d17"/>' +
      '<path d="M141 13 C145 9 155 9 159 13 M139 18 C144 22 156 22 161 18" stroke="#3d3128" stroke-width="1" fill="none" opacity=".8"/>' +
      '<path d="M134 40 C132 48 132 56 134 63 C135 66 136 68 137 69 C134 60 133 49 135 41 Z" fill="#241d17"/>' +
      '<path d="M166 40 C168 48 168 56 166 63 C165 66 164 68 163 69 C166 60 167 49 165 41 Z" fill="#241d17"/>' +
    '</g>' +
    /* ── face: editorial features — lashes, berry lips, earring ── */
    '<g transform="rotate(-4 150 52)">' +
      '<path d="M131 46 C131 60 138 73 150 75 C162 73 169 60 169 46" fill="none" stroke="' + I + '" stroke-width="1.5" stroke-linecap="round"/>' +
      '<path d="M139 49 L146 48.4 M154 48.4 L161 49" stroke="' + I + '" stroke-width="1.9" stroke-linecap="round"/>' +
      '<path d="M140 46 C142 44.6 145 44.4 147 45.4 M153 45.4 C155 44.4 158 44.6 160 46" stroke="' + I + '" stroke-width=".9" opacity=".65" fill="none"/>' +
      '<path d="M149.6 53 L148.8 59.5 L151.4 59.8" stroke="' + I + '" stroke-width=".85" opacity=".6" fill="none"/>' +
      '<path d="M144.5 66 C147 64.4 149 64.2 150 65.4 C151 64.2 153 64.4 155.5 66 C153.5 69.2 146.5 69.2 144.5 66 Z" fill="#a8434e"/>' +
      '<circle cx="168.5" cy="57" r="1.7" fill="#c9a961"/>' +
      '<path d="M168.5 59 L168.5 62.5" stroke="#c9a961" stroke-width="1.1"/>' +
    '</g>' +
    /* ── contour ink ── */
    '<g fill="none" stroke="' + I + '" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M143 73 C143 86 142 96 140 104 M157 73 C157 86 158 96 160 104" stroke-width="1.3"/>' +
      /* shoulders TILTED: left high, right dropped */
      '<path d="M140 104 C129 106 113 106 104 110 M160 104 C171 108 187 113 196 119" stroke-width="2.1"/>' +
      /* L arm — elbow softly bent outward, gap from body */
      '<path d="M104 110 C95 148 89 196 91 244 C93 292 97 344 101 382" stroke-width="2.1"/>' +
      '<path d="M117 118 C110 158 106 210 107 250 C108 294 110 342 112 380" stroke-width="1.4"/>' +
      '<path d="M101 382 C98 394 101 404 107 406 C113 407 116 398 113 385 M104 386 L103 399 M108 387 L108 401" stroke-width="1.1"/>' +
      /* R arm — hand on hip */
      '<path d="M196 119 C207 131 213 149 214 170 C215 193 210 216 200 236 C195 246 188 255 181 262" stroke-width="2.1"/>' +
      '<path d="M179 128 C189 140 194 158 195 178 C196 199 192 218 184 234 C180 242 176 248 173 251" stroke-width="1.4"/>' +
      '<path d="M181 262 C177 267 172 270 167 270 C171 265 174 259 176 254 M176 261 L170 267 M179 257 L173 265" stroke-width="1.1"/>' +
      /* torso */
      '<path d="M122 110 C116 146 114 186 117 222 C119 254 124 294 130 332" stroke-width="2.1"/>' +
      '<path d="M178 116 C184 152 186 190 183 226 C181 258 176 298 170 334" stroke-width="2.1"/>' +
      '<path d="M134 154 C141 160 159 160 166 154" stroke-width=".9" opacity=".4"/>' +
      /* waist gesture stroke */
      '<path d="M124 220 C136 226 164 226 176 220" stroke-width=".9" opacity=".35"/>' +
      /* L leg — weight, straight strong */
      '<path d="M130 332 C122 350 116 370 115 394 C113 446 117 516 124 582 C128 620 133 650 137 666" stroke-width="2.1"/>' +
      '<path d="M149 336 C148 378 147 418 147 468 C147 538 147 608 147 662" stroke-width="1.4"/>' +
      /* R leg — striding: knee bent in, heel lifted */
      '<path d="M170 332 C178 350 184 372 185 394 C186 436 182 462 176 484 C179 520 178 578 172 628 C169 646 166 658 164 666" stroke-width="2.1"/>' +
      '<path d="M151 338 C153 384 154 428 155 480 C157 486 157 492 156 498 C157 548 157 606 155 660" stroke-width="1.4"/>' +
      '<path d="M158 480 C162 483 168 483 172 481" stroke-width=".85" opacity=".45"/>' +
      '<path d="M138 484 C142 487 146 487 148 485" stroke-width=".8" opacity=".4"/>' +
      /* feet: L pointed, R heel raised (toe down) */
      '<path d="M137 666 C135 676 138 684 147 686 L149 686 C150 680 149 672 147 664" stroke-width="1.25"/>' +
      '<path d="M164 666 C166 674 163 682 156 685 C154 686 153 685 153 683 C154 677 154 670 154 664" stroke-width="1.25"/>' +
    '</g>'
  );
}

// ── Croquis M1: male figure — broad shoulders, athletic stance ──
function croquisMaleSVG() {
  var I = CROQUIS_INK;
  return (
    '<ellipse cx="150" cy="695" rx="62" ry="8" fill="#d8cab2" opacity=".5"/><ellipse cx="150" cy="694" rx="32" ry="4.5" fill="#c3b296" opacity=".55"/>' +
    /* skin washes */
    '<g fill="#eed3ba" stroke="none">' +
      '<path d="M133 50 C133 32 167 32 167 50 C167 64 160 76 150 78 C140 76 133 64 133 50 Z"/>' +
      '<path d="M143 74 C143 86 142 96 140 105 L160 105 C158 96 157 86 157 74 Z"/>' +
      '<path d="M118 112 C112 150 111 190 114 226 C116 258 122 298 128 334 L172 334 C178 298 184 258 186 226 C189 190 188 150 182 112 Z"/>' +
      '<path d="M100 116 C92 154 88 200 90 248 C92 296 96 346 99 384 L110 385 C108 338 105 286 106 238 C107 192 110 150 114 120 Z"/>' +
      '<path d="M200 116 C208 154 212 200 210 248 C208 296 204 346 201 384 L190 385 C192 338 195 286 194 238 C193 192 190 150 186 120 Z"/>' +
      '<path d="M128 334 C122 352 118 374 117 398 C116 448 119 516 125 582 C128 620 133 650 137 666 L148 666 C148 608 148 518 148 420 L149 340 Z"/>' +
      '<path d="M172 334 C178 352 182 374 183 398 C184 448 181 516 175 582 C172 620 167 650 163 666 L152 666 C152 608 152 518 152 420 L151 340 Z"/>' +
    '</g>' +
    /* hair: short crop, clean fade */
    '<g stroke="none">' +
      '<path d="M133 48 C131 30 138 24 150 24 C162 24 169 30 167 48 C167 44 166 40 164 37 C160 33 140 33 136 37 C134 40 133 44 133 48 Z" fill="#2a221b"/>' +
      '<path d="M136 37 C140 33.5 160 33.5 164 37 C160 35 140 35 136 37 Z" fill="#3a2f26"/>' +
    '</g>' +
    /* face: minimal masculine — brow bar, jaw, neutral lips */
    '<g>' +
      '<path d="M133 48 C133 62 140 74 150 76 C160 74 167 62 167 48" fill="none" stroke="' + I + '" stroke-width="1.5"/>' +
      '<path d="M139 47 L146 46.6 M154 46.6 L161 47" stroke="' + I + '" stroke-width="1.7" stroke-linecap="round"/>' +
      '<path d="M149.5 51 L149 58.5 L151.5 58.8" stroke="' + I + '" stroke-width=".85" opacity=".6" fill="none"/>' +
      '<path d="M145.5 66 L154.5 66" stroke="' + I + '" stroke-width="1.2" opacity=".75" stroke-linecap="round"/>' +
      '<path d="M141 70 C144 73.5 156 73.5 159 70" stroke="' + I + '" stroke-width=".8" opacity=".4" fill="none"/>' +
    '</g>' +
    /* contours */
    '<g fill="none" stroke="' + I + '" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M141 74 C141 86 140 97 138 105 M159 74 C159 86 160 97 162 105" stroke-width="1.4"/>' +
      /* broad square shoulders */
      '<path d="M138 105 C126 106 108 108 99 115 M162 105 C174 106 192 108 201 115" stroke-width="2.2"/>' +
      /* arms both down, slight outward taper */
      '<path d="M99 115 C91 154 87 200 89 248 C91 296 95 346 99 384" stroke-width="2.1"/>' +
      '<path d="M114 120 C108 160 105 212 106 252 C107 296 108 344 110 382" stroke-width="1.4"/>' +
      '<path d="M201 115 C209 154 213 200 211 248 C209 296 205 346 201 384" stroke-width="2.1"/>' +
      '<path d="M186 120 C192 160 195 212 194 252 C193 296 192 344 190 382" stroke-width="1.4"/>' +
      '<path d="M99 384 C96 396 99 406 105 408 C111 409 114 400 111 387" stroke-width="1.1"/>' +
      '<path d="M201 384 C204 396 201 406 195 408 C189 409 186 400 189 387" stroke-width="1.1"/>' +
      /* torso: straight, lat taper */
      '<path d="M118 112 C112 150 111 190 114 226 C116 258 122 298 128 334" stroke-width="2.2"/>' +
      '<path d="M182 112 C188 150 189 190 186 226 C184 258 178 298 172 334" stroke-width="2.2"/>' +
      '<path d="M135 150 C141 155 159 155 165 150" stroke-width=".9" opacity=".45"/>' +
      '<path d="M150 112 L150 220 M138 190 C143 193 157 193 162 190" stroke-width=".8" opacity=".3"/>' +
      /* legs: athletic, parallel stance with calf definition */
      '<path d="M128 334 C122 352 118 374 117 398 C116 448 119 516 125 582 C128 620 133 650 137 666" stroke-width="2.2"/>' +
      '<path d="M149 340 C148 380 148 420 148 470 C148 540 148 610 148 662" stroke-width="1.4"/>' +
      '<path d="M172 334 C178 352 182 374 183 398 C184 448 181 516 175 582 C172 620 167 650 163 666" stroke-width="2.2"/>' +
      '<path d="M151 340 C152 380 152 420 152 470 C152 540 152 610 152 662" stroke-width="1.4"/>' +
      '<path d="M120 500 C123 512 124 526 124 538 M180 500 C177 512 176 526 176 538" stroke-width=".9" opacity=".45"/>' +
      '<path d="M137 486 C141 489 146 489 148 487 M152 487 C156 489 161 489 164 486" stroke-width=".8" opacity=".4"/>' +
      /* feet: grounded flat */
      '<path d="M137 666 C133 674 134 682 143 684 L149 684 L149 664" stroke-width="1.25"/>' +
      '<path d="M163 666 C167 674 166 682 157 684 L151 684 L151 664" stroke-width="1.25"/>' +
    '</g>'
  );
}

// ── Garment sketch overlays keyed by garment id ──
// Each returns SVG on the croquis grid. F = fill ref, D = detail ink
function garmentSketchPaths(key, styleId) {
  var F = 'fill="url(#skFab)" stroke="#2b2b35" stroke-width="2" stroke-linejoin="round"';
  var T = 'fill="url(#skTex)" stroke="none"';
  function b(d){ return '<path d="'+d+'" '+F+'/><path d="'+d+'" '+T+'/><path d="'+d+'" fill="url(#skShade)" stroke="none"/><path d="'+d+'" fill="url(#skSheen)" stroke="none"/>'; }
  function d(d2){ return '<path d="'+d2+'" fill="none" stroke="#2b2b35" stroke-width="1.3" opacity=".75"/>'; }
  function t(d2){ return '<path d="'+d2+'" fill="none" stroke="#2b2b35" stroke-width="1.1" opacity=".55"/>'; }
  var V = SKETCH_VARIANTS[key];
  if (!V) return '';
  var fn = (styleId && V[styleId]) || V[Object.keys(V)[0]];
  return fn(b, d, t);
}
var SKETCH_VARIANTS = {
  bikini_top: {
    triangle: function(b,d,t){ return b('M126 140 L148 174 L128 184 C118 174 116 154 126 140 Z')+b('M174 140 L152 174 L172 184 C182 174 184 154 174 140 Z')+d('M126 140 L146 96 M174 140 L154 96 M128 184 L172 184'); },
    bandeau: function(b,d,t){ return b('M122 146 C134 140 166 140 178 146 L176 176 C162 182 138 182 124 176 Z')+d('M146 146 L150 160 L154 146 M124 174 C140 180 160 180 176 174'); },
    halter: function(b,d,t){ return b('M126 140 L148 174 L128 184 C118 174 116 154 126 140 Z')+b('M174 140 L152 174 L172 184 C182 174 184 154 174 140 Z')+d('M126 140 C132 116 141 100 148 92 M174 140 C168 116 159 100 152 92 M128 184 L172 184')+d('M144 90 C147 87 153 87 156 90'); },
    underwire: function(b,d,t){ return b('M125 142 C130 134 140 134 147 142 L147 176 L127 182 C120 170 119 154 125 142 Z')+b('M175 142 C170 134 160 134 153 142 L153 176 L173 182 C180 170 181 154 175 142 Z')+d('M127 180 C134 188 144 188 147 180 M153 180 C156 188 166 188 173 180 M128 140 L146 98 M172 140 L154 98'); },
    longline: function(b,d,t){ return b('M126 140 L148 174 L128 184 C118 174 116 154 126 140 Z')+b('M174 140 L152 174 L172 184 C182 174 184 154 174 140 Z')+b('M128 184 L126 206 C138 214 162 214 174 206 L172 184 Z')+d('M126 140 L146 96 M174 140 L154 96'); },
  },
  bikini_bottom: {
    brief: function(b,d,t){ return b('M116 270 C130 278 170 278 184 270 L180 302 C172 328 158 342 150 344 C142 342 128 328 120 302 Z')+d('M116 270 C132 276 168 276 184 270'); },
    highwaist: function(b,d,t){ return b('M120 232 C134 240 166 240 180 232 L182 300 C174 328 158 342 150 344 C142 342 126 328 118 300 Z')+d('M120 240 C136 247 164 247 180 240'); },
    tiestring: function(b,d,t){ return b('M116 270 C130 278 170 278 184 270 L180 302 C172 328 158 342 150 344 C142 342 128 328 120 302 Z')+d('M116 270 C132 276 168 276 184 270')+d('M112 276 C107 272 104 276 107 281 C110 285 115 282 113 277 M188 276 C193 272 196 276 193 281 C190 285 185 282 187 277'); },
    brazilian: function(b,d,t){ return b('M122 272 C134 279 166 279 178 272 L173 300 C166 324 156 338 150 340 C144 338 134 324 127 300 Z')+d('M122 272 C136 278 164 278 178 272'); },
  },
  one_piece: {
    scoop: function(b,d,t){ return b('M126 128 L146 118 C148 130 152 130 154 118 L174 128 C184 170 186 220 182 262 C178 300 166 330 150 342 C134 330 122 300 118 262 C114 220 116 170 126 128 Z')+d('M126 128 L146 94 M174 128 L154 94 M146 118 C148 132 152 132 154 118'); },
    vneck: function(b,d,t){ return b('M126 128 L150 170  L174 128 C184 170 186 220 182 262 C178 300 166 330 150 342 C134 330 122 300 118 262 C114 220 116 170 126 128 Z')+d('M126 128 L150 170 L174 128 M126 128 L146 94 M174 128 L154 94'); },
    racerback: function(b,d,t){ return b('M132 126 L146 116 C148 128 152 128 154 116 L168 126 C180 170 183 220 180 262 C176 300 165 330 150 342 C135 330 124 300 120 262 C117 220 120 170 132 126 Z')+d('M132 126 C138 108 145 100 150 98 C155 100 162 108 168 126'); },
    cutout: function(b,d,t){ return b('M126 128 L146 118 C148 130 152 130 154 118 L174 128 C184 170 186 220 182 262 C178 300 166 330 150 342 C134 330 122 300 118 262 C114 220 116 170 126 128 Z')+d('M126 128 L146 94 M174 128 L154 94')+'<path d="M120 236 C126 242 126 252 121 258 M180 236 C174 242 174 252 179 258" stroke="#faf7f1" stroke-width="7" fill="none" stroke-linecap="round"/>'+d('M120 236 C126 242 126 252 121 258 M180 236 C174 242 174 252 179 258'); },
  },
  leggings: {
    fulllen: function(b,d,t){ return b('M120 240 C136 248 164 248 180 240 L184 300 C182 380 176 565 168 641 C166 649 164 653 163 655 L149 655 C150 595 150 520 150 450 L150 420 C151 500 152 597 153 655 L139 655 C136 597 130 500 122 380 C118 320 118 276 120 240 Z')+d('M120 252 C138 260 162 260 180 252'); },
    seveneighths: function(b,d,t){ return b('M120 240 C136 248 164 248 180 240 L184 300 C182 380 176 535 168 611 C166 619 164 623 163 625 L149 625 C150 565 150 520 150 450 L150 420 C151 500 152 567 153 625 L139 625 C136 567 130 500 122 380 C118 320 118 276 120 240 Z')+d('M120 252 C138 260 162 260 180 252')+t('M141 640 L147 640 M155 640 L161 640'); },
    capri: function(b,d,t){ return b('M120 240 C136 248 164 248 180 240 L184 300 C182 380 176 470 168 546 C166 554 164 558 163 560 L149 560 C150 500 150 520 150 450 L150 420 C151 500 152 502 153 560 L139 560 C136 502 130 500 122 380 C118 320 118 276 120 240 Z')+d('M120 252 C138 260 162 260 180 252'); },
    highwaistrep: function(b,d,t){ return b('M120 218 C136 226 164 226 180 218 L184 300 C182 380 176 565 168 641 C166 649 164 653 163 655 L149 655 C150 595 150 520 150 450 L150 420 C151 500 152 597 153 655 L139 655 C136 597 130 500 122 380 C118 320 118 254 120 218 Z')+d('M120 230 C138 238 162 238 180 230'); },
  },
  sports_bra: {
    scoopbra: function(b,d,t){ return b('M128 128 L146 120 C148 130 152 130 154 120 L172 128 C178 150 180 176 178 198 C160 208 140 208 122 198 C120 176 122 150 128 128 Z')+d('M128 128 L146 96 M172 128 L154 96 M122 198 C142 206 158 206 178 198'); },
    racerbra: function(b,d,t){ return b('M128 128 L146 120 C148 130 152 130 154 120 L172 128 C178 150 180 176 178 198 C160 208 140 208 122 198 C120 176 122 150 128 128 Z')+d('M146 120 C147 104 149 96 150 94 C151 96 153 104 154 120 M143 98 C146 95 154 95 157 98 M122 198 C142 206 158 206 178 198'); },
    longlinebra: function(b,d,t){ return b('M128 128 L146 120 C148 130 152 130 154 120 L172 128 C179 154 181 190 178 224 C158 234 142 234 122 224 C119 190 121 154 128 128 Z')+d('M128 128 L146 96 M172 128 L154 96 M123 218 C142 227 158 227 177 218 M124 196 C142 204 158 204 176 196'); },
  },
  leotard: {
    scoopleotard: function(b,d,t){ return b('M126 128 L146 118 C148 130 152 130 154 118 L174 128 C182 168 184 218 180 260 C176 294 166 324 150 338 C134 324 124 294 120 260 C116 218 118 168 126 128 Z')+d('M126 128 L146 94 M174 128 L154 94'); },
    highleotard: function(b,d,t){ return b('M126 128 L146 118 C148 128 152 128 154 118 L174 128 C182 168 184 218 180 260 C177 288 168 312 150 322 C132 312 123 288 120 260 C116 218 118 168 126 128 Z')+d('M126 128 L146 94 M174 128 L154 94 M120 300 C114 316 113 330 118 340 M180 300 C186 316 187 330 182 340'); },
    sweethrt: function(b,d,t){ return b('M128 138 C134 126 142 128 150 140 C158 128 166 126 172 138 C180 176 182 220 178 260 C174 296 164 326 150 338 C136 326 126 296 122 260 C118 220 120 176 128 138 Z')+d('M130 134 L146 98 M170 134 L154 98'); },
  },
  unitard: {
    tanktard: function(b,d,t){ return b('M126 126 L146 116 C148 128 152 128 154 116 L174 126 C182 168 184 218 180 258 L184 300 C182 400 174 520 166 615 C164 635 162 647 161 655 L147 655 L150 430 L153 655 L139 655 C134 560 126 420 120 300 L120 258 C116 218 118 168 126 126 Z')+d('M126 126 L146 92 M174 126 L154 92'); },
    longsleeve: function(b,d,t){ return b('M126 126 C132 120 168 120 174 126 C182 168 184 218 180 258 L184 300 C182 400 174 520 166 615 C164 635 162 647 161 655 L147 655 L150 430 L153 655 L139 655 C134 560 126 420 120 300 L120 258 C116 218 118 168 126 126 Z')+b('M124 128 C110 150 100 200 96 250 L107 252 C110 206 116 164 126 138 Z')+b('M176 128 C192 142 206 172 211 208 L200 214 C194 182 186 156 174 138 Z')+d('M126 126 C134 132 166 132 174 126'); },
  },
  crop_top: {
    fitted: function(b,d,t){ return b('M124 128 L150 116 L176 128 C182 154 184 184 182 214 C162 226 138 226 118 214 C116 184 118 154 124 128 Z')+d('M124 128 C110 134 104 146 102 160 M176 128 C190 134 196 146 198 160 M118 214 C140 226 160 226 182 214'); },
    bralette_top: function(b,d,t){ return b('M128 140 L148 172 L130 184 C120 172 120 152 128 140 Z')+b('M172 140 L152 172 L170 184 C180 172 180 152 172 140 Z')+d('M128 140 L146 98 M172 140 L154 98 M130 184 L170 184'); },
    squareneck: function(b,d,t){ return b('M124 128 L136 128 L136 146 L164 146 L164 128 L176 128 C182 154 184 184 182 214 C162 226 138 226 118 214 C116 184 118 154 124 128 Z')+d('M136 128 L136 146 L164 146 L164 128 M118 214 C140 226 160 226 182 214'); },
  },
  bodycon_dress: {
    mini: function(b,d,t){ return b('M124 128 L150 116 L176 128 C184 172 186 228 182 270 C186 320 188 398 186 462 C164 474 136 474 114 462 C112 398 114 320 118 270 C114 228 116 172 124 128 Z')+d('M124 128 L146 92 M176 128 L154 92 M118 270 C136 278 164 278 182 270 M114 458 L186 458'); },
    midi: function(b,d,t){ return b('M124 128 L150 116 L176 128 C184 172 186 228 182 270 C186 320 188 456 186 520 C164 532 136 532 114 520 C112 456 114 320 118 270 C114 228 116 172 124 128 Z')+d('M124 128 L146 92 M176 128 L154 92 M118 270 C136 278 164 278 182 270 M114 516 L186 516'); },
    maxibd: function(b,d,t){ return b('M124 128 L150 116 L176 128 C184 172 186 228 182 270 C186 320 188 546 186 610 C164 622 136 622 114 610 C112 546 114 320 118 270 C114 228 116 172 124 128 Z')+d('M124 128 L146 92 M176 128 L154 92 M118 270 C136 278 164 278 182 270 M114 606 L186 606'); },
  },
  maxi_dress: {
    slipmaxi: function(b,d,t){ return b('M126 132 C134 142 166 142 174 132 C181 190 186 300 190 430 C193 520 194 580 193 620 C164 634 136 634 107 620 C106 580 107 520 110 430 C114 300 119 190 126 132 Z')+d('M126 132 L143 94 M174 132 L157 94'); },
    empmaxi: function(b,d,t){ return b('M124 128 L150 116 L176 128 C180 148 182 168 182 186 L118 186 C118 168 120 148 124 128 Z')+b('M118 186 L182 186 C194 320 204 470 210 616 C172 636 128 636 90 616 C96 470 106 320 118 186 Z')+d('M124 128 L146 92 M176 128 L154 92 M118 186 L182 186'); },
    tieredmaxi: function(b,d,t){ return b('M124 128 L150 116 L176 128 C182 162 184 202 182 238 L118 238 C116 202 118 162 124 128 Z')+b('M118 238 L182 238 C192 340 200 470 206 616 C170 636 130 636 94 616 C100 470 108 340 118 238 Z')+d('M104 420 C136 434 164 434 196 420 M97 520 C133 536 167 536 203 520')+d('M124 128 L146 92 M176 128 L154 92 M118 238 L182 238'); },
  },
  night_dress: {
    classicslip: function(b,d,t){ return b('M124 132 C132 142 168 142 176 132 C184 192 190 302 194 432 C196 492 198 542 198 568 C166 584 134 584 102 568 C102 542 104 492 106 432 C110 302 116 192 124 132 Z')+d('M124 132 L143 94 M176 132 L157 94 M102 562 C112 554 122 564 132 556 C142 548 152 560 162 552 C172 544 182 556 192 548 L198 554'); },
    cowlslip: function(b,d,t){ return b('M124 132 C132 142 168 142 176 132 C184 192 190 302 194 432 C196 492 198 542 198 568 C166 584 134 584 102 568 C102 542 104 492 106 432 C110 302 116 192 124 132 Z')+d('M124 132 L143 94 M176 132 L157 94')+d('M132 136 C140 152 146 158 150 158 C154 158 160 152 168 136 M138 140 C144 152 148 156 150 156'); },
  },
  two_piece: {
    croptop_skirt: function(b,d,t){ return b('M124 130 L150 118 L176 130 C182 152 184 178 182 202 C162 212 138 212 118 202 C116 178 118 152 124 130 Z')+b('M116 268 L184 268 C190 320 194 380 196 434 C166 448 134 448 104 434 C106 380 110 320 116 268 Z')+d('M124 130 L146 94 M176 130 L154 94 M116 268 L184 268'); },
    bralette_shorts: function(b,d,t){ return b('M128 140 L148 172 L130 184 C120 172 120 152 128 140 Z')+b('M172 140 L152 172 L170 184 C180 172 180 152 172 140 Z')+b('M118 268 C134 276 166 276 182 268 L186 310 C187 342 187 372 185 396 L160 396 L152 320 L148 320 L140 396 L115 396 C113 372 113 342 114 310 Z')+d('M128 140 L146 98 M172 140 L154 98 M118 268 C136 275 164 275 182 268'); },
  },
  skirt: {
    aline: function(b,d,t){ return b('M120 246 C136 254 164 254 180 246 L188 300 C198 356 204 412 210 462 C168 476 132 476 90 462 C96 412 102 356 112 300 Z')+d('M120 258 C138 266 162 266 180 258'); },
    pencil: function(b,d,t){ return b('M120 246 C136 254 164 254 180 246 C182 300 183 360 182 420 C181 452 180 478 179 500 C160 510 140 510 121 500 C120 478 119 452 118 420 C117 360 118 300 120 246 Z')+d('M120 258 C138 266 162 266 180 258 M150 440 L150 502'); },
    circle: function(b,d,t){ return b('M120 246 C136 254 164 254 180 246 L208 300 C218 356 224 412 230 470 C188 484 112 484 70 470 C76 412 82 356 92 300 Z')+d('M120 258 C138 266 162 266 180 258')+d('M104 320 L86 450 M126 268 L114 480 M174 268 L186 480 M196 320 L214 450'); },
    mini_skirt: function(b,d,t){ return b('M120 246 C136 254 164 254 180 246 L184 300 C194 356 200 412 206 400 C164 414 136 414 94 400 C100 412 106 356 116 300 Z')+d('M120 258 C138 266 162 266 180 258'); },
  },
  shorts: {
    biker: function(b,d,t){ return b('M120 244 C136 252 164 252 180 244 L184 300 C185 426 185 450 183 466 L157 466 L152 330 L148 330 L143 466 L117 466 C115 450 115 426 116 300 Z')+d('M120 256 C138 264 162 264 180 256'); },
    highwaistedshort: function(b,d,t){ return b('M120 222 C136 230 164 230 180 222 L184 300 C185 380 185 404 183 420 L157 420 L152 308 L148 308 L143 420 L117 420 C115 404 115 380 116 300 Z')+d('M120 234 C138 242 162 242 180 234'); },
    boardshort: function(b,d,t){ return b('M120 248 C136 256 164 256 180 248 L190 300 C191 400 191 424 189 440 L163 440 L152 334 L148 334 L137 440 L111 440 C109 424 109 400 110 300 Z')+d('M120 260 C138 268 162 268 180 260')+d('M150 250 L150 272 L168 272'); },
  },
  lingerie: {
    bodysuit: function(b,d,t){ return b('M128 138 C134 128 142 130 150 142 C158 130 166 128 172 138 C180 176 182 222 178 262 C174 298 164 326 150 338 C136 326 126 298 122 262 C118 222 120 176 128 138 Z')+d('M129 134 L146 96 M171 134 L154 96 M150 142 L150 260 M126 330 C134 340 166 340 174 330'); },
    teddy: function(b,d,t){ return b('M128 136 C134 126 142 128 150 140 C158 128 166 126 172 136 C182 180 188 240 190 300 C191 330 190 352 188 366 L168 352 L150 368 L132 352 L112 366 C110 352 109 330 110 300 C112 240 118 180 128 136 Z')+d('M129 132 L146 96 M171 132 L154 96 M112 358 L126 348 L140 358 L150 350 L160 358 L174 348 L188 358'); },
  },
  costume: {
    ballgown: function(b,d,t){ return b('M124 126 L150 114 L176 126 C184 168 186 216 182 252 L118 252 C114 216 116 168 124 126 Z')+b('M118 252 L182 252 C202 352 220 480 232 640 C178 666 122 666 68 640 C80 480 98 352 118 252 Z')+d('M124 126 L146 88 M176 126 L154 88 M118 252 L182 252 M80 560 C128 580 172 580 220 560 M92 460 C132 476 168 476 208 460'); },
    mermaid: function(b,d,t){ return b('M124 126 L150 114 L176 126 C184 172 187 240 184 310 C182 370 178 430 172 480 C192 510 206 550 212 596 C172 618 128 618 88 596 C94 550 108 510 128 480 C122 430 118 370 116 310 C113 240 116 172 124 126 Z')+d('M124 126 L146 88 M176 126 L154 88 M118 300 C136 308 164 308 182 300 M128 480 C142 490 158 490 172 480'); },
    jumpsuit: function(b,d,t){ return b('M124 126 L150 114 L176 126 C182 168 184 218 180 258 L190 310 C192 420 190 540 186 645 L154 645 L151 420 L149 420 L146 645 L114 645 C110 540 108 420 110 310 L120 258 C116 218 118 168 124 126 Z')+d('M124 126 L146 88 M176 126 L154 88 M120 256 C138 264 162 264 180 256'); },
  },
  wrap_dress: {
    shortwrap: function(b,d,t){ return b('M124 128 L150 178 L176 128 C186 172 190 242 192 322 C195 402 196 414 195 470 C164 484 136 484 105 470 C104 414 105 402 108 322 C110 242 114 172 124 128 Z')+d('M124 128 L150 178 L176 128 M150 178 L108 322 M150 178 L192 322 M118 252 L124 262 M182 252 L176 262'); },
    sleevlesswrap: function(b,d,t){ return b('M124 128 L150 178 L176 128 C186 172 190 242 192 322 C195 402 196 464 195 520 C164 534 136 534 105 520 C104 464 105 402 108 322 C110 242 114 172 124 128 Z')+d('M124 128 L150 178 L176 128 M150 178 L108 322 M150 178 L192 322 M118 252 L124 262 M182 252 L176 262')+d('M124 128 L146 92 M176 128 L154 92'); },
    longwrap: function(b,d,t){ return b('M124 128 L150 178 L176 128 C186 172 190 242 192 322 C195 402 196 574 195 630 C164 644 136 644 105 630 C104 574 105 402 108 322 C110 242 114 172 124 128 Z')+d('M124 128 L150 178 L176 128 M150 178 L108 322 M150 178 L192 322 M118 252 L124 262 M182 252 L176 262'); },
    flutterwrap: function(b,d,t){ return b('M124 128 L150 178 L176 128 C186 172 190 242 192 322 C195 402 196 444 195 500 C164 514 136 514 105 500 C104 444 105 402 108 322 C110 242 114 172 124 128 Z')+d('M124 128 L150 178 L176 128 M150 178 L108 322 M150 178 L192 322 M118 252 L124 262 M182 252 L176 262')+b('M122 132 C108 142 98 162 94 186 L106 192 C110 170 116 150 126 138 Z')+b('M178 132 C194 146 205 170 209 198 L198 204 C192 180 184 158 174 142 Z'); },
  },
  rash_guard: {
    longsleeve_rg: function(b,d,t){ return b('M124 126 C132 132 168 132 176 126 C182 132 186 142 188 158 C190 220 189 290 186 338 C164 348 136 348 114 338 C111 290 110 220 112 158 C114 142 118 132 124 126 Z')+b('M124 126 C110 148 100 198 96 248 L108 250 C111 204 117 162 127 136 Z')+b('M176 130 C192 144 206 176 211 212 L200 218 C194 184 186 158 174 140 Z')+d('M124 126 C132 132 168 132 176 126 M150 134 L150 342'); },
    shortsleeve_rg: function(b,d,t){ return b('M124 126 C132 132 168 132 176 126 C182 132 186 142 188 158 C190 220 189 290 186 338 C164 348 136 348 114 338 C111 290 110 220 112 158 C114 142 118 132 124 126 Z')+b('M124 126 C114 138 107 156 103 176 L115 180 C119 162 124 148 130 138 Z')+b('M176 130 C188 140 197 158 202 180 L190 184 C185 166 179 152 172 140 Z')+d('M124 126 C132 132 168 132 176 126 M150 134 L150 342'); },
    tank_rg: function(b,d,t){ return b('M128 126 L146 118 C148 128 152 128 154 118 L172 126 C180 132 184 144 186 162 C188 222 187 292 184 338 C163 348 137 348 116 338 C113 292 112 222 114 162 C116 144 120 132 128 126 Z')+d('M128 126 L146 94 M172 126 L154 94'); },
    zip_rg: function(b,d,t){ return b('M124 126 C132 132 168 132 176 126 C182 132 186 142 188 158 C190 220 189 290 186 338 C164 348 136 348 114 338 C111 290 110 220 112 158 C114 142 118 132 124 126 Z')+b('M124 126 C110 148 100 198 96 248 L108 250 C111 204 117 162 127 136 Z')+b('M176 130 C192 144 206 176 211 212 L200 218 C194 184 186 158 174 140 Z')+d('M150 128 L150 236 M147 236 L153 236 M144 126 L144 136 M156 126 L156 136')+d('M148 132 L152 132 M148 152 L152 152 M148 172 L152 172 M148 192 L152 192 M148 212 L152 212'); },
  },
  jumpsuit: {
    sleeveless_jump: function(b,d,t){ return b('M124 126 L150 114 L176 126 C182 166 184 214 180 254 L188 300 C190 400 188 520 184 640 L156 640 L152 420 L148 420 L144 640 L116 640 C112 520 110 400 112 300 L120 254 C116 214 118 166 124 126 Z')+d('M124 126 L146 90 M176 126 L154 90 M120 252 C138 260 162 260 180 252'); },
    belted_jump: function(b,d,t){ return b('M124 126 L150 114 L176 126 C182 166 184 214 180 254 L188 300 C190 400 188 520 184 640 L156 640 L152 420 L148 420 L144 640 L116 640 C112 520 110 400 112 300 L120 254 C116 214 118 166 124 126 Z')+'<path d="M119 248 L181 248 L181 262 L119 262 Z" fill="#2b2b35" opacity=".9"/><rect x="143" y="247" width="14" height="16" rx="2.5" fill="none" stroke="#faf7f1" stroke-width="2"/>'+d('M124 126 L146 90 M176 126 L154 90'); },
  },
  swim_dress: {
    tank_swim_dress: function(b,d,t){ return b('M126 128 L146 118 C148 130 152 130 154 118 L174 128 C182 160 184 196 182 226 L118 226 C116 196 118 160 126 128 Z')+b('M118 226 L182 226 C190 280 194 330 196 372 C168 384 132 384 104 372 C106 330 110 280 118 226 Z')+d('M126 128 L146 94 M174 128 L154 94 M118 226 L182 226'); },
    ruffle_swim: function(b,d,t){ return b('M126 128 L146 118 C148 130 152 130 154 118 L174 128 C182 160 184 196 182 226 L118 226 C116 196 118 160 126 128 Z')+b('M118 226 L182 226 C190 280 194 330 196 372 C168 384 132 384 104 372 C106 330 110 280 118 226 Z')+d('M126 128 L146 94 M174 128 L154 94 M118 226 L182 226 M104 364 C114 354 124 370 134 360 C144 350 154 368 164 358 C174 348 184 366 196 356'); },
  },
  biker_shorts: {
    bs_classic: function(b,d,t){ return b('M120 244 C136 252 164 252 180 244 L184 300 C185 426 185 450 183 466 L157 466 L152 330 L148 330 L143 466 L117 466 C115 450 115 426 116 300 Z')+d('M120 256 C138 264 162 264 180 256')+d('M118 456 L142 456 M158 456 L182 456'); },
    bs_pocket: function(b,d,t){ return b('M120 244 C136 252 164 252 180 244 L184 300 C185 426 185 450 183 466 L157 466 L152 330 L148 330 L143 466 L117 466 C115 450 115 426 116 300 Z')+d('M120 256 C138 264 162 264 180 256')+'<rect x="120" y="300" width="15" height="32" rx="4" fill="none" stroke="#faf7f1" stroke-width="2" opacity=".9"/><rect x="165" y="300" width="15" height="32" rx="4" fill="none" stroke="#faf7f1" stroke-width="2" opacity=".9"/>'; },
  },
  corset_top: {
    ct_sweet: function(b,d,t){ return b('M126 134 C134 122 142 128 150 140 C158 128 166 122 174 134 C182 158 184 196 180 228 C162 242 138 242 120 228 C116 196 118 158 126 134 Z')+d('M134 138 L132 232 M150 142 L150 238 M166 138 L168 232 M138 162 L162 170 M138 186 L162 194 M138 210 L162 216'); },
    ct_modern: function(b,d,t){ return b('M124 138 L176 138 C182 162 184 198 180 228 C162 242 138 242 120 228 C116 198 118 162 124 138 Z')+d('M124 138 L176 138 M134 140 L132 232 M150 142 L150 238 M166 140 L168 232 M138 162 L162 170 M138 186 L162 194 M138 210 L162 216'); },
  },
  tennis_dress: {
    td_classic: function(b,d,t){ return b('M126 126 L150 116 L174 126 C182 158 184 192 182 222 L118 222 C116 192 118 158 126 126 Z')+b('M118 222 L182 222 C188 268 194 312 200 352 C168 366 132 366 100 352 C106 312 112 268 118 222 Z')+d('M126 126 L146 92 M174 126 L154 92 M118 222 L182 222 M116 250 L108 348 M134 236 L130 358 M150 232 L150 360 M166 236 L170 358 M184 250 L192 348'); },
    td_wrap: function(b,d,t){ return b('M126 126 L150 116 L174 126 C182 158 184 192 182 222 L118 222 C116 192 118 158 126 126 Z')+b('M118 222 L182 222 C188 268 194 312 200 352 C168 366 132 366 100 352 C106 312 112 268 118 222 Z')+d('M126 126 L146 92 M174 126 L154 92 M118 222 L182 222 M128 226 L196 350'); },
  },
  board_shorts: {
    bs_surf: function(b,d,t){ return b('M120 250 C136 258 164 258 180 250 L190 300 C191 396 191 420 189 436 L163 436 L152 336 L148 336 L137 436 L111 436 C109 420 109 396 110 300 Z')+d('M120 262 C138 270 162 270 180 262')+d('M150 254 L150 276 L170 276 M120 306 L138 306 L138 336 L120 336 Z'); },
    bs_volley: function(b,d,t){ return b('M120 250 C136 258 164 258 180 250 L190 300 C191 360 191 384 189 400 L163 400 L152 336 L148 336 L137 400 L111 400 C109 384 109 360 110 300 Z')+d('M120 262 C138 270 162 270 180 262')+d('M150 254 L150 274 L168 274'); },
  },
};



// ── Unisex: figure detection + manual override ──
var SKETCH_MALE_DEFAULT = { board_shorts: 1 };
var SKETCH_FEMALE_ONLY = {
  maxi_dress:1, bodycon_dress:1, night_dress:1, dress:1, gown:1, skirt:1,
  lingerie:1, corset_top:1, two_piece:1, swim_dress:1,
  bikini_top:1, bikini_bottom:1, sports_bra:1,
  wrap_dress:1
};
var _sketchGenderOverride = {};
function sketchGenderFor(g) {
  if (SKETCH_FEMALE_ONLY[g]) return 'f';
  if (_sketchGenderOverride[g]) return _sketchGenderOverride[g];
  return SKETCH_MALE_DEFAULT[g] ? 'm' : 'f';
}
function setSketchGender(gen) {
  if (typeof S === 'undefined' || !S.g) return;
  if (SKETCH_FEMALE_ONLY[S.g]) gen = 'f';
  _sketchGenderOverride[S.g] = gen;
  renderSketch();
}

// Contractor spec column — style, fabric, features, date
function specBlockSVG(cfg, styleDef, f) {
  var chips = [];
  try {
    chips = Array.prototype.slice.call(document.querySelectorAll('#schips .chip.on')).map(function(b){return b.textContent;}).slice(0,5);
  } catch(e) {}
  var y = 96;
  function line(label, val) {
    var s = '<text x="222" y="' + y + '" font-family="Georgia,serif" font-size="7" fill="#8a7758" letter-spacing=".12em">' + label + '</text>';
    y += 11;
    var words = String(val||'').split(' '), rows = [''], r = 0;
    words.forEach(function(w){ if ((rows[r]+' '+w).length > 15) { r++; rows[r]=w; } else rows[r] = (rows[r]?rows[r]+' ':'')+w; });
    rows.slice(0,2).forEach(function(rw){
      s += '<text x="222" y="' + y + '" font-family="Georgia,serif" font-size="8.5" font-weight="bold" fill="#4a3f2c">' + rw.replace(/&/g,'&amp;').replace(/</g,'&lt;') + '</text>';
      y += 11;
    });
    y += 5;
    return s;
  }
  var out = '<rect x="216" y="82" width="72" height="0" fill="none"/>';
  out += line('GARMENT', cfg.label);
  out += line('STYLE', styleDef ? styleDef.name : '—');
  out += line('FABRIC', f.name);
  if (chips.length) {
    out += '<text x="222" y="' + y + '" font-family="Georgia,serif" font-size="7" fill="#8a7758" letter-spacing=".12em">FEATURES</text>';
    y += 11;
    chips.forEach(function(ch){
      out += '<text x="222" y="' + y + '" font-family="Georgia,serif" font-size="7.5" fill="#4a3f2c">&#8226; ' + ch.replace(/&/g,'&amp;').replace(/</g,'&lt;') + '</text>';
      y += 10;
    });
    y += 5;
  }
  var dt = new Date();
  out += '<text x="222" y="' + y + '" font-family="Georgia,serif" font-size="7" fill="#a89a80">' + (dt.getMonth()+1) + '/' + dt.getDate() + '/' + dt.getFullYear() + '</text>';
  out += '<path d="M216 86 L216 ' + (y+4) + '" stroke="#dcc990" stroke-width=".8"/>';
  return out;
}

// ═══════════════════════════════════════════════════════════════
// COUTURE SKETCH — live AI fashion illustration, model-agnostic
// One config block switches image providers. Every generation calls it.
// Falls back to instant SVG croquis if the render fails.
// ═══════════════════════════════════════════════════════════════
var SKETCH_AI = {
  // provider 'proxy'  = paid Google Imagen via your secure Vercel proxy (couture quality, reliable).
  // provider 'pollinations' = free Flux fallback.
  provider: 'pollinations',
  proxyUrl: 'https://siamakconsulting.com/api/sketch',
  // Use Pollinations (reliable) with high-quality settings, proxy as optional enhancement
  generate: function(prompt) {
    var self=this;
    // Always try proxy first (returns base64 Imagen 4 image)
    return fetch(self.proxyUrl, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({prompt:prompt})
    }).then(function(r){
      if(!r.ok)throw new Error('proxy failed');
      return r.json();
    }).then(function(d){
      if(d&&d.image)return d.image;
      throw new Error('no image in proxy response');
    }).catch(function(){
      // Fallback: Pollinations with better settings for fashion sketches
      var seed=Math.floor(Math.random()*999999);
      return new Promise(function(resolve,reject){
        var stylePrefix='fashion illustration, flat fashion sketch, watercolor croquis, clean ink line art, white background, NOT photorealistic, NOT photo, fashion design drawing, hand-drawn, editorial sketch -- ';
        var styledPrompt=stylePrefix+prompt;
        var url='https://image.pollinations.ai/prompt/'+encodeURIComponent(styledPrompt)+'?width=512&height=768&model=flux&seed='+seed+'&nologo=true&negative=photorealistic,photo,3d render,hyperrealistic,photograph';
        var img=new Image();
        img.crossOrigin='anonymous';
        img.onload=function(){resolve(url);};
        img.onerror=function(){reject(new Error('pollinations failed'));};
        img.src=url;
      });
    })
  },
  build: function(prompt, seed) {
    return 'https://image.pollinations.ai/prompt/' + encodeURIComponent(prompt) +
           '?width=512&height=768&model=flux&seed=' + seed + '&nologo=true';
  }
};

// hex -> human color name so the image model paints the RIGHT color
function hexColorName(hex) {
  if (!hex || hex[0] !== '#' || hex.length < 7) return '';
  var r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  var max = Math.max(r,g,b), min = Math.min(r,g,b), d = max-min;
  var l = (max+min)/2;                    // 0..255 lightness
  var s = max===0 ? 0 : d/max;            // saturation 0..1
  // near-neutral: decide by lightness
  if (d < 20 || s < 0.22) {
    if (l > 230) return 'white';
    if (l > 170) return 'light grey';
    if (l > 95)  return 'grey';
    if (l > 45)  return 'charcoal';
    return 'black';
  }
  var h;
  if (max === r) h = ((g-b)/d) % 6; else if (max === g) h = (b-r)/d + 2; else h = (r-g)/d + 4;
  h = Math.round(h*60); if (h < 0) h += 360;
  var light = l > 200, dark = l < 82;
  var base;
  if (h < 12)       base = dark ? 'burgundy' : (light ? 'coral' : 'red');
  else if (h < 32)  base = (l < 130 ? 'brown' : (light ? 'peach' : 'orange'));
  else if (h < 45)  base = 'orange';
  else if (h < 62)  base = dark ? 'olive' : 'gold';
  else if (h < 78)  base = 'yellow-green';
  else if (h < 160) base = dark ? 'emerald green' : (light ? 'mint green' : 'green');
  else if (h < 195) base = 'teal';
  else if (h < 210) base = dark ? 'navy blue' : 'sky blue';
  else if (h < 250) base = dark ? 'navy blue' : (light ? 'light blue' : 'royal blue');
  else if (h < 290) base = dark ? 'deep purple' : 'purple';
  else if (h < 320) base = light ? 'orchid' : 'magenta';
  else              base = light ? 'pink' : (dark ? 'wine' : 'rose');
  // pink: magenta-family that is light, or bright vivid pink
  if ((h >= 300 || h < 8) && b > 90 && l > 120 && !dark) base = 'pink';
  return base;
}

// Concrete visual descriptions per garment so the AI draws the RIGHT silhouette,
// not a generic gown. Keyed by garment id.
var GARMENT_VISUAL = {
  bikini_top:'a bikini top only — two-piece swimwear, upper half only; bare midriff, bare stomach, bare legs fully visible; NO bottom garment shown',
  bikini_bottom:'bikini bottoms only — lower swimwear brief; bare midriff, bare stomach, bare legs; NO top garment shown',
  one_piece:'a one-piece maillot swimsuit — single-piece, high-cut leg openings, the torso is fully covered front and back, bare legs from hip down, bare shoulders',
  swim_dress:'a swim dress — a fitted swimsuit bodice (like a one-piece top) with a short attached flared mini-skirt; the skirt hits mid-thigh; bare legs below hem',
  leggings:'full-length leggings — skin-tight ankle-length athletic pants covering leg entirely; paired with a simple sports bra or crop top',
  sports_bra:'a sports bra — athletic compression bra-style top ending just below the chest; wide straps; bare midriff and stomach fully visible; NO full-length top',
  leotard:'a leotard — fitted one-piece dancewear with high-cut leg openings; covers torso only; legs completely bare from hip down; no skirt, no pants',
  unitard:'a unitard/catsuit — skin-tight single-piece covering the entire torso AND both legs to the ankle; no exposed skin on torso or legs',
  crop_top:'a crop top — a short top ending 2-4 inches above the natural waist; bare midriff clearly visible; NOT a full-length shirt',
  bodycon_dress:'a bodycon dress — a very tight body-hugging dress ending at the knee; covers torso and thighs; NOT a maxi, NOT a mini',
  maxi_dress:'a floor-length maxi dress — flowing fabric reaching the ankles or floor; full-length skirt; bare shoulders or straps visible at top',
  night_dress:'a slip nightgown or nightdress — delicate flowing sleepwear in satin or lace; spaghetti straps; hits mid-thigh to ankle; NOT daywear',
  two_piece:'a two-piece matching set — a crop top AND a separate bottom (skirt or shorts); bare midriff between top and bottom is visible',
  jumpsuit:'a jumpsuit — a single one-piece garment with a fitted bodice AND full-length trouser-style legs; NOT a leotard, NOT shorts',
  skirt:'a skirt — a waist-down garment only; bare midriff visible above waist; bare legs below hem; paired with a simple top',
  shorts:'athletic shorts — short bottoms ending 3-5 inches above knee; bare legs from mid-thigh down; paired with a simple top',
  lingerie:'lingerie — delicate intimate bra-and-brief set or bodysuit in lace or satin; for bedroom/boudoir context',
  costume:'a dramatic fantasy costume gown — theatrical, heavily embellished, floor-length, structured with dramatic silhouette',
  wrap_dress:'a wrap dress — crossover front creating a V-neckline, fabric wraps and ties at the natural waist; knee-length hem; flowing',
  rash_guard:'a rash guard — a long-sleeve tight athletic UPF swim top; covers arms and torso; worn with swim bottoms; sporty technical fabric',
  biker_shorts:'biker shorts — compression-fit shorts ending mid-thigh (4-7 inch inseam); NOT knee-length, NOT full leggings',
  corset_top:'a corset top — a structured boned bustier ending at the natural waist; visible boning channels or lace-up back; NOT a full dress',
  tennis_dress:'a tennis dress — a short athletic dress (14-18 inches below waist) with a flared pleated skirt; worn with built-in shorts underneath',
  board_shorts:'board shorts — loose-fit knee-length male swim shorts with a wide waistband; worn by a MALE model with bare chest and bare legs'
};

// Rich AI visual cues per style id so the render matches the exact cut chosen.
var STYLE_VISUAL = {
  // bikini tops
  triangle:'tiny triangle cups connected by thin string ties at the neck and back — minimal fabric coverage',
  bandeau:'strapless straight-across tube top with NO shoulder straps — held up by elastic only',
  halter:'neck-tie halter top — straps cross behind the neck, bare shoulders and back',
  underwire:'structured bra-style top with underwire and molded cups giving lift and shape',
  longline:'crop top extending down the ribcage with a wide horizontal band below the bust',
  // bikini bottoms
  brief:'full-coverage brief-cut bottom — moderate leg opening',
  highwaist:'high-waisted retro brief sitting above the natural waist, covering the navel',
  tiestring:'string-tie sides with decorative bows at both hips, minimal fabric',
  brazilian:'cheeky Brazilian cut with higher-cut leg openings showing more of the glute',
  // one-piece
  scoop:'wide rounded scoop neckline',
  vneck:'deep plunging V-neckline cut to the sternum',
  racerback:'narrow T-back straps forming a Y-shape between the shoulder blades',
  cutout:'side panels cut away at the waist revealing skin at the hips',
  // leggings
  fulllen:'full ankle-length leggings — skin-tight from waist to ankle',
  seveneighths:'7/8-length leggings ending mid-calf — slightly cropped',
  capri:'capri-length leggings ending just below the knee',
  // dresses / necklines
  slipmaxi:'bias-cut slip dress silhouette — spaghetti straps, fabric drapes on the bias',
  empire:'empire waist seam sits just below the bust, skirt flows from there',
  tiered:'three horizontal tiers of ruffled fabric cascading down the skirt',
  cowl:'softly draped cowl neckline pooling at the chest',
  classicslip:'classic slip nightgown with delicate spaghetti straps and a straight silhouette',
  cowlslip:'cowl neckline slip — fabric drapes forward from draped neckline',
  sweetheart:'sweetheart neckline — curved top edge dipping to a center point',
  highneck:'high mock-neck or turtleneck collar',
  // swim dress
  tank_swim_dress:'tank-style bodice with wide shoulder straps AND a short flared swim-skirt attached at the hip',
  ruffle_swim_dress:'fitted swimsuit bodice with a short ruffled layered swim-skirt',
  halter_swim:'halter-neck swim dress — straps tie behind the neck, flared mini swim-skirt',
  bandeau_swim:'strapless bandeau bodice top with a short flared swim-skirt',
  ruffle_swim:'fitted swim bodice with a ruffled flared skirt at the hip',
  // unitard
  tanktard:'tank-style unitard with wide shoulder straps, covers torso and full legs',
  longsleeve:'long-sleeve unitard covering arms, torso, and full legs to the ankle',
  zipfront_unitard:'front-zip catsuit with a center-front zipper running from neck to waist, sleeveless',
  openback_unitard:'open-back catsuit with a deeply plunged open back, criss-cross or halter straps',
  // night dress
  satinslip:'bias-cut satin slip nightgown with thin adjustable spaghetti straps',
  babydoll:'short babydoll nightie with empire waist and flared skirt ending at the upper thigh',
  // two piece
  croptop_skirt:'matching crop top paired with a mini or midi skirt — bare midriff visible',
  bralette_shorts:'bralette top paired with matching shorts or briefs — midriff exposed',
  halter_set:'halter-neck crop top paired with a mini skirt — neck ties, midriff bare',
  palazzo_set:'crop top paired with wide-leg palazzo pants — flowy trouser silhouette',
  // jumpsuit
  sleeveless_jump:'sleeveless jumpsuit with a fitted bodice and straight or wide-leg trousers',
  belted_jump:'wide-leg jumpsuit with a defining belt at the natural waist, relaxed trousers',
  strapless_jump:'strapless off-shoulder jumpsuit with a straight-across top and full-length legs',
  midi_jump:'belted midi-length jumpsuit — cropped trousers ending at mid-calf',
  // lingerie
  bodysuit:'fitted bodysuit with snap crotch — looks like a one-piece with high-cut legs',
  teddy:'loose-fitting teddy — a soft slip-style intimate bodysuit with lace or satin trim',
  chemise:'short satin or lace chemise slip ending at the upper thigh — lingerie sleepwear',
  lace_bodysuit:'all-lace fitted bodysuit with see-through lace panels, underwire cups, snap crotch',
  // corset top
  ct_sweet:'sweetheart-neckline corset top — curved sweetheart edge, visible boning channels',
  ct_modern:'modern bustier with a straight top edge, structured boning, no cups',
  ct_overbust:'overbust corset fully covering the bust with shaped cups and structured boning',
  ct_underbust:'underbust cincher corset sitting below the bust — bare above the corset top edge',
  // tennis dress
  td_classic:'classic tennis dress with a polo-style bodice and short pleated skirt',
  td_wrap:'tennis dress with a wrap-style pleated skirt tied at the waist',
  td_racerback:'racerback tennis dress — narrow Y-back straps and flared athletic skirt',
  td_polo:'polo-collar tennis dress with short sleeves and a flared short skirt',
  // board shorts
  bs_surf:'classic surf board shorts — loose-fit, knee-length, drawstring waist',
  bs_volley:'volley board shorts — shorter cut ending mid-thigh, fitted waistband',
  bs_cargo:'cargo board shorts — knee-length with two large patch cargo pockets at the thigh',
  bs_compress:'board shorts with a visible built-in compression liner peeking below the hem',
  // biker shorts
  bs_classic:'classic compression biker shorts — tight-fit ending mid-thigh with a wide waistband',
  bs_pocket:'biker shorts with side pockets on both thighs',
  bk_hiwaist:'high-waist biker shorts with an extra-wide waistband sitting above the natural waist',
  bk_crop:'above-knee biker shorts — shorter than standard, ending just above the knee',
  // skirts
  aline:'A-line flared skirt widening from waist to hem',
  pencil:'straight fitted pencil skirt hugging the hips',
  circle:'full circle skirt with dramatic flare',
  mini:'very short mini skirt ending well above mid-thigh',
  // sleeves
  longsleeve:'long fitted sleeves reaching the wrist',
  shortsleeve:'short sleeves ending at mid-bicep',
  sleeveless:'sleeveless — no sleeves, armholes visible',
  flutter:'flutter cap sleeves — short decorative sleeves fluttering at the shoulder',
  // costume / gown
  ballgown:'dramatic full ball-gown with a wide structured skirt and fitted bodice',
  mermaid:'fitted mermaid silhouette hugging the body and flaring at the knee',
  // wrap dress
  longsleeve:'long sleeve wrap dress with wrist-length sleeves',
  shortsleeve:'short sleeve wrap dress',
  sleeveless_wrap:'sleeveless wrap dress'
};

function sketchPrompt() {
  var cfg = DESIGNS[S.g];
  var styleDef = cfg && cfg.styles && cfg.styles.find(function(s){ return s.id === S.design; });
  var f = (typeof selectedFabric !== 'undefined' && selectedFabric) ? selectedFabric : { name:'lycra', hex:'#1255b0', pattern:'solid' };
  var gender = (typeof sketchGenderFor==='function' ? sketchGenderFor(S.g) : 'f');

  // ══════════════════════════════════════════════════════════
  // GROUND TRUTH: read actual pattern pieces (S.ps) to derive
  // exactly what construction details exist in this design.
  // This ensures sketch == pattern, always.
  // ══════════════════════════════════════════════════════════
  var ps = (typeof S !== 'undefined' && S.ps && S.ps.length) ? S.ps : [];
  var pieceNames = ps.map(function(p){ return (p.n||'').toLowerCase(); });

  function hasPiece(re) { return pieceNames.some(function(n){ return re.test(n); }); }

  var HAS_SLEEVE    = hasPiece(/sleeve/);
  var HAS_LONG_SLV  = hasPiece(/long.?sleeve|sleeve/) && !hasPiece(/short.?sleeve/);
  var HAS_SHORT_SLV = hasPiece(/short.?sleeve/);
  var HAS_ZIP       = hasPiece(/zip|placket/);
  var HAS_HALTER    = hasPiece(/halter|neck.?strap/);
  var HAS_BANDEAU   = hasPiece(/bandeau|elastic.?channel/);
  var HAS_SKIRT     = hasPiece(/skirt/);
  var HAS_RUFFLE    = hasPiece(/ruffle/);
  var HAS_BELT      = hasPiece(/belt/);
  var HAS_COLLAR    = hasPiece(/collar|polo/);
  var HAS_CUP       = hasPiece(/cup/);
  var HAS_BONING    = hasPiece(/boning/);
  var HAS_POCKET    = hasPiece(/pocket/);
  var HAS_BRIEF     = hasPiece(/brief/);
  var HAS_STRAP     = hasPiece(/spaghetti.?strap|shoulder.?strap|strap/) && !HAS_HALTER;
  var HAS_LINING    = hasPiece(/lining|liner|compression/);
  var HAS_WAISTBAND = hasPiece(/waistband/);
  var HAS_RACERBACK = hasPiece(/armhole.?binding/) || (styleDef && /racerback/i.test(styleDef.id+styleDef.name));
  var HAS_OPEN_BACK = hasPiece(/neck.?strap/) || (styleDef && /open.?back/i.test(styleDef.id+styleDef.name));
  var HAS_HALTER_TIE = hasPiece(/halter.?tie/); // swim dress halter = neck tie, NOT open back
  if (HAS_HALTER_TIE) { HAS_OPEN_BACK = false; HAS_HALTER = true; }
  var PIECE_COUNT   = ps.length;

  // ── Derive sleeve description from pieces ──
  var sleeveDesc = '';
  if (HAS_LONG_SLV)  sleeveDesc = 'long sleeves reaching the wrist';
  else if (HAS_SHORT_SLV) sleeveDesc = 'short sleeves ending at mid-bicep';
  else if (HAS_RACERBACK) sleeveDesc = 'racerback — narrow Y-shaped straps at the back, sleeveless';
  else if (HAS_HALTER && HAS_OPEN_BACK) sleeveDesc = 'halter neck straps crossed behind the neck, sleeveless, DEEPLY OPEN BACK';
  else if (HAS_HALTER)    sleeveDesc = 'halter neck — straps tie at the nape of the neck, shoulders bare, front neckline visible';
  else if (HAS_BANDEAU)   sleeveDesc = 'strapless — no straps at all, held by elastic';
  else if (HAS_STRAP)     sleeveDesc = 'thin spaghetti shoulder straps, sleeveless';
  else                    sleeveDesc = 'sleeveless — bare shoulders, no straps';

  // ── Derive neckline / back from pieces ──
  var backDesc = '';
  if (HAS_OPEN_BACK) backDesc = 'OPEN BACK — deeply plunged open back with criss-cross straps. ';
  else if (HAS_ZIP)  backDesc = 'front zipper running from neck to waist. ';
  else if (HAS_RACERBACK) backDesc = 'racerback cut at the back. ';

  // ── Derive bottom construction ──
  var bottomDesc = '';
  if (HAS_SKIRT && HAS_RUFFLE) bottomDesc = 'ruffled flared skirt attached at the hip';
  else if (HAS_SKIRT)           bottomDesc = 'short flared skirt attached at the hip, ending mid-thigh';
  else if (HAS_BRIEF)           bottomDesc = 'built-in brief underneath';
  else if (HAS_BELT)            bottomDesc = 'cinched with a visible belt at the waist';

  // ── Derive structural details ──
  var structDesc = '';
  if (HAS_BONING)  structDesc += 'visible boning channels running vertically. ';
  if (HAS_COLLAR)  structDesc += hasPiece(/polo/) ? 'polo collar at the neckline. ' : 'structured collar. ';
  if (HAS_CUP)     structDesc += 'structured cup panels. ';
  if (HAS_POCKET)  structDesc += 'visible pockets. ';
  if (HAS_LINING)  structDesc += 'compression lining layer visible at hem. ';
  if (HAS_WAISTBAND) structDesc += 'separate wide waistband. ';

  // ── Color ──
  var colorName = hexColorName(f.hex || f.color || '');
  var colorHex  = (f.hex || f.color || '').toUpperCase();
  var colorLine = colorName ? colorName + ' (' + colorHex + ')' : 'the fabric color';

  // ── Material ──
  var nm = (f.name || '').toLowerCase();
  var matWord = 'stretch fabric';
  if (nm.indexOf('velvet')>=0)   matWord='velvet';
  else if (nm.indexOf('lace')>=0) matWord='lace';
  else if (nm.indexOf('sequin')>=0) matWord='sequin';
  else if (nm.indexOf('foil')>=0 || f.pattern==='foil') matWord='metallic foil';
  else if (nm.indexOf('satin')>=0) matWord='satin';
  else if (nm.indexOf('lycra')>=0||nm.indexOf('spandex')>=0) matWord='spandex lycra';
  else if (nm.indexOf('pique')>=0||nm.indexOf('piqué')>=0) matWord='performance piqué';
  else if (nm.indexOf('nylon')>=0) matWord='nylon';
  else if (nm.indexOf('rib')>=0) matWord='ribbed nylon';

  // ── Print ──
  var printDesc = '';
  if (f.pattern==='tropical') printDesc='bold tropical leaf print — large monstera leaves in green and white';
  else if (f.pattern==='floral') printDesc='delicate floral print';
  else if (f.pattern==='stripe') printDesc='clean even stripes';
  else if (f.pattern==='animal') printDesc='animal print — leopard markings';
  else if (f.pattern==='sequin') printDesc='all-over shimmering sequins';
  else if (f.pattern==='foil')   printDesc='high-shine metallic foil, mirror-like sheen';
  else if (f.pattern==='velvet') printDesc='rich velvet, directional pile sheen';
  else if (f.pattern==='lace')   printDesc='semi-sheer stretch lace';
  else if (f.pattern==='rib')    printDesc='ribbed texture, visible vertical ribs';

  // ── Model description — gender + garment-appropriate body ──
  var g = S.g || '';
  var modelDesc;
  if (gender === 'm') {
    if (g==='board_shorts'||g==='rash_guard') modelDesc='tall athletic MALE model, toned bare chest, lean surfer build';
    else modelDesc='tall athletic MALE model, lean muscular build';
  } else {
    if (g==='lingerie'||g==='corset_top') modelDesc='tall slender FEMALE model, graceful hourglass figure';
    else if (g==='leotard'||g==='unitard'||g==='sports_bra') modelDesc='tall athletic FEMALE model, toned dancer build, hair pulled back';
    else if (g==='maxi_dress'||g==='bodycon_dress'||g==='wrap_dress') modelDesc='tall elegant FEMALE model, couture fashion proportion';
    else if (g==='bikini_top'||g==='bikini_bottom'||g==='one_piece'||g==='swim_dress') modelDesc='tall slender FEMALE model, athletic swimwear build';
    else modelDesc='tall slender FEMALE model, 9-head fashion proportion';
  }

  // ── Build the MUST clause from piece-derived facts ──
  var garmentCore = GARMENT_VISUAL[g] || ('a ' + (cfg ? cfg.label : g));
  var styleVis = (styleDef && STYLE_VISUAL[styleDef.id]) ? STYLE_VISUAL[styleDef.id] : '';

  // Piece-derived construction sentence
  var constructSentence = '';
  constructSentence += sleeveDesc ? 'Arms/shoulders: ' + sleeveDesc + '. ' : '';
  constructSentence += backDesc;
  constructSentence += bottomDesc ? 'Bottom: ' + bottomDesc + '. ' : '';
  constructSentence += structDesc;

  // Chips (user-selected features)
  var chips = [];
  try { document.querySelectorAll('#schips .chip.on').forEach(function(c){ chips.push(c.textContent.trim()); }); } catch(e){}
  var chipLine = chips.length ? 'Additional features: ' + chips.slice(0,4).join(', ') + '. ' : '';

  // ── Garment-specific MUST + MUSTNOT ──
  var MUST = '', MUSTNOT = '';

  if (g==='unitard'||g==='leotard') {
    var bodyDesc = g==='unitard'
      ? 'skin-tight full-body catsuit/unitard covering torso AND both legs neck to ankle'
      : 'leotard covering torso only, both legs completely bare from hip down';
    MUST = 'WEARING: a ' + colorLine + ' ' + matWord + ' ' + bodyDesc + '. ' + constructSentence;
    MUSTNOT = 'NOT a business suit. NOT street clothes. NOT a dress. NOT everyday clothing. ';
  } else if (g==='bikini_top') {
    MUST = 'WEARING: only a ' + colorLine + ' ' + matWord + ' bikini top. ' + constructSentence;
    MUSTNOT = 'Bare midriff, bare stomach, bare legs. NO bottom garment. NO one-piece. ';
  } else if (g==='bikini_bottom') {
    MUST = 'WEARING: only a ' + colorLine + ' ' + matWord + ' bikini bottom brief. ' + constructSentence;
    MUSTNOT = 'Bare midriff, bare stomach, bare legs. NO top garment shown. ';
  } else if (g==='sports_bra') {
    MUST = 'WEARING: only a ' + colorLine + ' ' + matWord + ' sports bra. ' + constructSentence;
    MUSTNOT = 'NOT a full shirt. Bare stomach and midriff must be visible. ';
  } else if (g==='one_piece') {
    MUST = 'WEARING: a ' + colorLine + ' ' + matWord + ' one-piece maillot swimsuit. ' + constructSentence;
    MUSTNOT = 'NOT a two-piece. NOT a dress. High-cut legs, bare legs from hip down. ';
  } else if (g==='swim_dress') {
    MUST = 'WEARING: a ' + colorLine + ' ' + matWord + ' swim dress — swimsuit bodice with an attached short swim-skirt ending at mid-thigh. ' + constructSentence;
    MUSTNOT = 'NOT a full-length dress. Skirt ends at mid-thigh only. ';
  } else if (g==='leggings') {
    MUST = 'WEARING: ' + colorLine + ' ' + matWord + ' full-length leggings. ' + constructSentence;
    MUSTNOT = 'NOT shorts. NOT jeans. Skin-tight, ankle-length. ';
  } else if (g==='crop_top') {
    MUST = 'WEARING: a ' + colorLine + ' ' + matWord + ' crop top ending above the navel. ' + constructSentence;
    MUSTNOT = 'NOT a full-length shirt. Bare midriff must be visible. ';
  } else if (g==='jumpsuit') {
    MUST = 'WEARING: a ' + colorLine + ' ' + matWord + ' jumpsuit — one-piece with bodice AND full-length trouser legs. ' + constructSentence;
    MUSTNOT = 'NOT a leotard. NOT two pieces. Full trouser legs to the ankle. ';
  } else if (g==='biker_shorts') {
    MUST = 'WEARING: ' + colorLine + ' ' + matWord + ' biker shorts ending at mid-thigh. ' + constructSentence;
    MUSTNOT = 'NOT full leggings. Ends at mid-thigh only. ';
  } else if (g==='corset_top') {
    MUST = 'WEARING: a ' + colorLine + ' ' + matWord + ' corset top ending at the natural waist. ' + constructSentence;
    MUSTNOT = 'NOT a full dress. Ends at waist only. ';
  } else if (g==='tennis_dress') {
    MUST = 'WEARING: a ' + colorLine + ' ' + matWord + ' short tennis dress, skirt ending 14-18 inches below waist. ' + constructSentence;
    MUSTNOT = 'NOT a maxi. NOT a midi. Very short athletic skirt. ';
  } else if (g==='board_shorts') {
    MUST = 'WEARING: ' + colorLine + ' ' + matWord + ' board shorts, loose-fit, ending at the knee. ' + constructSentence;
    MUSTNOT = 'MALE model, bare chest, bare legs. NOT a woman. NOT a shirt. ';
  } else if (g==='night_dress') {
    MUST = 'WEARING: a ' + colorLine + ' ' + matWord + ' slip nightgown — flowing sleepwear. ' + constructSentence;
    MUSTNOT = 'NOT daywear. NOT a party dress. Sleepwear only. ';
  } else if (g==='lingerie') {
    MUST = 'WEARING: ' + colorLine + ' ' + matWord + ' lingerie. ' + constructSentence;
    MUSTNOT = 'Tasteful boudoir style. NOT daywear. ';
  } else if (g==='two_piece') {
    MUST = 'WEARING: a ' + colorLine + ' ' + matWord + ' two-piece matching set — crop top AND separate bottom, bare midriff visible. ' + constructSentence;
    MUSTNOT = 'NOT a one-piece. Bare midriff between pieces. ';
  } else if (g==='maxi_dress') {
    MUST = 'WEARING: a ' + colorLine + ' ' + matWord + ' floor-length maxi dress reaching the ankles. ' + constructSentence;
    MUSTNOT = 'NOT a mini. NOT a midi. Reaches the floor. ';
  } else if (g==='bodycon_dress') {
    MUST = 'WEARING: a ' + colorLine + ' ' + matWord + ' bodycon dress — very tight, ending at the knee. ' + constructSentence;
    MUSTNOT = 'NOT a maxi. NOT a mini. Knee-length tight fit. ';
  } else if (g==='wrap_dress') {
    MUST = 'WEARING: a ' + colorLine + ' ' + matWord + ' wrap dress — V-neckline, tied at waist, knee-length. ' + constructSentence;
    MUSTNOT = 'NOT a maxi. Knee-length wrap front. ';
  } else if (g==='rash_guard') {
    var rgGender = gender==='m' ? 'MALE model, bare legs, ' : 'FEMALE model, ';
    MUST = 'WEARING: a ' + colorLine + ' ' + matWord + ' rash guard — long-sleeve athletic UPF swim top, ' + rgGender + 'with swim bottoms. ' + constructSentence;
    MUSTNOT = 'NOT a casual shirt. Technical swimwear. ';
  } else if (g==='skirt') {
    MUST = 'WEARING: a ' + colorLine + ' ' + matWord + ' skirt, waist-down only. ' + constructSentence;
    MUSTNOT = 'Bare midriff above. Paired with a simple top. ';
  } else if (g==='shorts') {
    MUST = 'WEARING: ' + colorLine + ' ' + matWord + ' athletic shorts ending above the knee. ' + constructSentence;
    MUSTNOT = 'NOT long pants. Bare legs from mid-thigh down. ';
  } else if (g==='costume') {
    MUST = 'WEARING: a dramatic ' + colorLine + ' ' + matWord + ' fantasy costume gown — theatrical, floor-length. ' + constructSentence;
    MUSTNOT = 'Highly embellished, dramatic silhouette. ';
  } else {
    MUST = 'WEARING: ' + garmentCore + ' in ' + colorLine + ' ' + matWord + '. ' + constructSentence;
    MUSTNOT = '';
  }

  // ── Gender statement (first line Imagen reads) ──
  var genderLine = gender==='m'
    ? 'DRAW A MALE MODEL ONLY. ' + modelDesc + '. '
    : 'DRAW A FEMALE MODEL ONLY. ' + modelDesc + '. ';

  // ── Color reinforcement ──
  var colorReinforce = colorName
    ? 'Garment color: ' + colorName + ' throughout — every panel is ' + colorName + '. '
      + (printDesc ? 'Surface texture: ' + printDesc + '. ' : '')
    : (printDesc ? 'Surface texture: ' + printDesc + '. ' : '');

  // ── Pose ──
  var poseLine = gender==='m'
    ? 'Full-body front-facing pose, weight on one leg, arms at sides. '
    : 'Full-body front-facing runway pose, one hip slightly forward. ';

  // ── Style visual (secondary reinforcement) ──
  var styleReinforce = styleVis ? 'Style specifically: ' + styleVis + '. ' : '';

  // ── Rendering ──
  var renderLine = 'Illustration style: professional fashion croquis — clean ink outlines, flat watercolor fill, plain white background, no shadows. ';

  // ── Hard negative ──
  var negLine = 'Do NOT show: business attire, suits, shirts, trousers, jeans, coats, street clothes, multiple figures, cropped body, photorealistic portrait, text, watermarks, background objects.';

  return genderLine + MUST + MUSTNOT + styleReinforce + colorReinforce + chipLine + poseLine + renderLine + negLine;
}


var _sketchSeed = null;
var _sketchToken = 0;
function renderSketch() {
  var host = document.getElementById('sketchSvgHost');
  var cap  = document.getElementById('sketchCaption');
  var panel= document.getElementById('sketchPanel');
  if (!host || !panel) return;
  if (typeof S === 'undefined' || !S.g) { panel.style.display = 'none'; return; }
  panel.style.display = 'block';
  var cfg = DESIGNS[S.g];
  var styleDef = cfg && cfg.styles.find(function(s){ return s.id === S.design; });
  var f = (typeof selectedFabric !== 'undefined' && selectedFabric) ? selectedFabric : { hex:'#1255b0', pattern:'solid', name:'Synergy Nylon Lycra' };
  if (cap) cap.textContent = cfg.label + (styleDef ? ' · ' + styleDef.name : '') + ' · ' + f.name;

  if (_sketchSeed === null) _sketchSeed = Math.floor(Math.random()*999999);
  var prompt = sketchPrompt();
  var url = SKETCH_AI.build(prompt, _sketchSeed);

  // loading state — elegant framed shimmer
  host.innerHTML =
    '<div style="position:relative;max-width:290px;margin:0 auto;aspect-ratio:300/720;border:1.4px solid #c9a961;border-radius:4px;background:linear-gradient(110deg,var(--surface),var(--surface-2),var(--surface));background-size:200% 100%;animation:skShimmer 1.6s linear infinite;display:flex;align-items:center;justify-content:center">' +
      '<div style="text-align:center;color:var(--gold);font-family:Georgia,serif;font-style:italic;font-size:14px">Illustrating your design…<br><span style="font-size:11px;opacity:.7">' + cfg.label + (styleDef?' · '+styleDef.name:'') + '</span></div>' +
    '</div>' +
    '<style>@keyframes skShimmer{to{background-position:-200% 0}}</style>';

  // token guards against a slow render overwriting a newer selection
  _sketchToken = (_sketchToken || 0) + 1;
  var myToken = _sketchToken;
  var settled = false;

  function showAI(finalUrl) {
    if (myToken !== _sketchToken) return;
    settled = true;
    host.innerHTML =
      '<div style="position:relative;max-width:290px;margin:0 auto">' +
        '<div style="border:1.4px solid #c9a961;border-radius:4px;overflow:hidden;background:var(--surface)">' +
          '<img id="sketchAIImg" src="' + finalUrl + '" alt="Couture sketch" style="width:100%;display:block"/>' +
        '</div>' +
        '<div style="text-align:center;font-family:Georgia,serif;font-style:italic;font-size:12px;color:var(--gold);margin-top:6px">Blue Moon Pattern Maker</div>' +
      '</div>';
  }

  function fallbackSVG(withRetry) {
    if (settled || myToken !== _sketchToken) return;
    settled = true;
    var cfg2 = DESIGNS[S.g];
    var styleDef2 = cfg2 && cfg2.styles.find(function(s){ return s.id === S.design; });
    var f2 = (typeof selectedFabric !== 'undefined' && selectedFabric) ? selectedFabric : { name:'your fabric' };
    var label = (cfg2?cfg2.label:'') + (styleDef2?' \u00b7 '+styleDef2.name:'') + (f2&&f2.name?' \u00b7 '+f2.name:'');
    // Croquis sketch drawn from the pattern data — always accurate, instant.
    renderSketchSVG();
  }

  // Patient render: up to MAX_TRIES attempts before dropping to the elegant retry card.
  // Uses SKETCH_AI.generate() which POSTs to the paid proxy (couture) and resolves to an image.
  // Croquis sketch drawn from the pattern data — no external image service.
  fallbackSVG(false);
}

function regenerateSketch() { _sketchSeed = Math.floor(Math.random()*999999); renderSketch(); }

// ── Fallback: the original instant vector croquis ──
// Hosted painted croquis figures (used as the elegant fallback base)
var CROQUIS_IMG = {
  f: 'https://cdn.shopify.com/s/files/1/0046/4234/0957/files/croquis_female.png?v=1783225832',
  m: 'https://cdn.shopify.com/s/files/1/0046/4234/0957/files/croquis_male.png?v=1783225832'
};
// figure geometry inside the 300x760 sketch viewBox
var CROQUIS_GEO = {
  f: { x: 48, w: 203, h: 760, cx: 150, shoulder:0.245, bust:0.30, waist:0.45, hip:0.54, crotch:0.575, hem:0.96 },
  m: { x: 31, w: 238, h: 760, cx: 150, shoulder:0.255, bust:0.31, waist:0.46, hip:0.55, crotch:0.585, hem:0.96 }
};

// ── Landmark remap: SVG-figure garment paths → professional PNG croquis ──
// Measured off the PNG pixels. viewBox 300x760. Female image is shifted left 30px so her body
// (drawn off-center in the PNG) sits on x=150; the male is already centered (~152).
// NOTE: the 238-wide image (CDN name croquis_male_1.png) is the FEMALE figure;
//       the 203-wide image (CDN name croquis_female_1.png) is the MALE figure.
var CROQUIS2 = {
  f: { url:'https://cdn.shopify.com/s/files/1/0046/4234/0957/files/croquis_male_1.png?v=1789191396', x:1, w:238,
       // [svgY, pngY]: strap-top, neckline, bust, underbust, waist, hip, crotch, knee, ankle, floor
       y:[[92,142],[128,175],[155,190],[186,208],[225,240],[290,300],[340,318],[470,520],[655,687],[686,733]],
       // torso/dress mapping: [pngY, centerX, xScale]
       body:[[142,148,1.00],[175,150,1.20],[190,150,1.17],[208,150,1.17],[240,150,1.08],[300,150,1.44],[318,150,1.45],[400,140,1.15],[520,142,1.10],[600,143,1.05],[687,148,1.00],[733,150,1.00]],
       // leg garments below the crotch: [pngY, svgOuterL, svgOuterR, pngOuterL, pngGapMid, pngOuterR]
       legs:[[318,118,184,100,150,200],[340,120,183,105,150,202],[400,122,182,100,137,175],[520,130,176,108,140,172],[600,134,172,124,140,156],[687,139,163,141,152,163],[733,139,163,137,150,163]],
       // arms: [pngY, centerX] from shoulder to wrist; ySpan = PNG shoulder→wrist
       armL:[[150,102],[200,93],[250,88],[300,79],[340,73],[385,78]], armR:[[150,198],[200,203],[250,205],[300,214],[340,214],[385,215]], armY:[150,235,385], armS:1.2 },
  m: { url:'https://cdn.shopify.com/s/files/1/0046/4234/0957/files/croquis_female_1.png?v=1789191396', x:48, w:203,
       y:[[92,140],[128,172],[155,195],[186,230],[225,270],[290,315],[340,345],[470,520],[655,690],[686,745]],
       body:[[140,152,1.05],[172,152,1.20],[195,152,1.28],[230,152,1.26],[270,152,1.24],[315,152,1.18],[345,152,1.22],[400,152,1.15],[520,152,1.08],[690,152,1.00],[745,152,1.00]],
       legs:[[345,118,184,110,155,198],[400,122,182,108,156,197],[520,130,176,127,157,190],[600,134,172,128,157,188],[690,139,163,133,157,180],[745,139,163,138,157,176]],
       armL:[[148,96],[200,78],[260,76],[320,70],[390,80]], armR:[[148,208],[200,225],[260,232],[320,228],[390,222]], armY:[148,235,388], armS:1.3 }
};
var LEG_GARMENTS = { leggings:1, unitard:1, jumpsuit:1, biker_shorts:1, shorts:1, board_shorts:1 };
function _lt(tab, v, ci, vi){
  var a,b;
  if (v <= tab[0][ci]) { a=tab[0]; b=tab[1]; }
  else if (v >= tab[tab.length-1][ci]) { a=tab[tab.length-2]; b=tab[tab.length-1]; }
  else { for (var i=1;i<tab.length;i++){ if (v <= tab[i][ci]) { a=tab[i-1]; b=tab[i]; break; } } }
  var t=(v-a[ci])/((b[ci]-a[ci])||1);
  return a[vi]+(b[vi]-a[vi])*t;
}
// SVG-figure arm centerlines: left arm hangs (y 110→382), right arm bends to the hip (y 119→262)
var SVG_TORSO = { L:[[110,122],[146,116],[186,114],[222,117],[254,119],[294,124],[332,130]], R:[[116,178],[152,184],[190,186],[226,183],[258,181],[298,176],[334,170]] };
var SVG_ARM = { L:{ky:[110,180,250],c:[[110,110],[150,107],[250,99],[382,106]]}, R:{ky:[119,184,214],c:[[119,187],[170,205],[236,192],[262,177]]} };
function remapPoint(x, y, G, legs){
  // sleeves: points clearly outside the SVG figure's torso outline (above the hip) belong to an arm
  if (y < 256 && (x < _lt(SVG_TORSO.L, y, 0, 1) - 6 || x > _lt(SVG_TORSO.R, y, 0, 1) + 7)) {
    var side = x < 150 ? 'L' : 'R', A = SVG_ARM[side], P = side==='L' ? G.armL : G.armR;
    var ky=A.ky, py=G.armY;                       // py = [shoulder, aboveElbow, wrist]
    var ay = y <= ky[1] ? py[0] + (y-ky[0])/(ky[1]-ky[0])*(py[1]-py[0]) : py[1] + (y-ky[1])/(ky[2]-ky[1])*(py[2]-py[1]);
    var ax = _lt(P, ay, 0, 1) + (x - _lt(A.c, y, 0, 1)) * G.armS;
    return [ax, ay];
  }
  var ny = _lt(G.y, y, 0, 1);
  var bx = _lt(G.body, ny, 0, 1) + (x-150)*_lt(G.body, ny, 0, 2);
  if (!legs || y < 330) return [bx, ny];
  var T=G.legs, sL=_lt(T,ny,0,1), sR=_lt(T,ny,0,2), pL=_lt(T,ny,0,3), pM=_lt(T,ny,0,4), pR=_lt(T,ny,0,5);
  var lx = x <= 150 ? pL + (x-sL)/(150-sL)*(pM-pL) : pM + (x-150)/(sR-150)*(pR-pM);
  var k = Math.min(1, (y-330)/40);
  return [bx + (lx-bx)*k, ny];
}
function remapSVG(frag, g, key){
  var G = CROQUIS2[g], legs = !!LEG_GARMENTS[key];
  return frag.replace(/ d="([^"]+)"/g, function(m, d){
    var out='', buf=[];
    (d.match(/[MLCQZ]|-?\d*\.?\d+/g)||[]).forEach(function(t){
      if (/[MLCQZ]/.test(t)) out += t;
      else { buf.push(parseFloat(t)); if (buf.length===2){ var p=remapPoint(buf[0],buf[1],G,legs); out+=p[0].toFixed(1)+' '+p[1].toFixed(1)+' '; buf=[]; } }
    });
    return ' d="'+out.trim()+'"';
  });
}

// Prefetch croquis PNGs as data URLs so the SVG can be rasterized for download (avoids canvas taint)
var _croquisData = {};
(function(){ ['f','m'].forEach(function(g){ try {
  fetch(CROQUIS2[g].url, {mode:'cors'}).then(function(r){ return r.blob(); }).then(function(b){
    var rd=new FileReader(); rd.onload=function(){ _croquisData[g]=rd.result; }; rd.readAsDataURL(b);
  }).catch(function(){});
} catch(e){} }); })();

function renderSketchSVG() {
  var host = document.getElementById('sketchSvgHost');
  if (!host || typeof S==='undefined' || !S.g) return;
  var cfg = DESIGNS[S.g];
  var styleDef = cfg && cfg.styles.find(function(s){ return s.id === S.design; });
  var f = (typeof selectedFabric !== 'undefined' && selectedFabric) ? selectedFabric : { hex:'#1255b0', pattern:'solid', name:'Synergy Nylon Lycra' };
  var g = (sketchGenderFor(S.g)==='m') ? 'm' : 'f';
  var G = CROQUIS2[g];
  var href = _croquisData[g] || G.url;
  var garment = remapSVG(garmentSketchPaths(S.g, S.design), g, S.g);
  var svg =
    '<svg id="sketchSvg" viewBox="0 0 300 760" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="width:100%;max-width:290px;display:block;margin:0 auto">' +
      '<defs>' + sketchFabricDefs(f) +
        '<radialGradient id="skPaper" cx="50%" cy="36%" r="80%"><stop offset="0%" stop-color="#fdfbf6"/><stop offset="100%" stop-color="#f3ecdf"/></radialGradient>' +
      '</defs>' +
      '<rect width="300" height="760" fill="url(#skPaper)"/>' +
      '<rect x="6" y="6" width="288" height="748" fill="none" stroke="#c9a961" stroke-width="1.4"/>' +
      '<image href="' + href + '" xlink:href="' + href + '" x="' + G.x + '" y="0" width="' + G.w + '" height="760" preserveAspectRatio="xMidYMid meet"/>' +
      garment +
      '<text x="150" y="757" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="9" fill="#b99a55" opacity=".8">Blue Moon Pattern Maker</text>' +
      specBlockSVG(cfg, styleDef, f) +
    '</svg>';
  host.innerHTML = svg;
}

// Draw a clean fabric-colored garment on the painted figure, by garment family + geometry.
function garmentOnFigure(key, styleId, f, geo) {
  var col = (f && f.hex) ? f.hex : '#1255b0';
  var cx = geo.cx, H = geo.h;
  function Y(t){ return t*H; }
  var fill = 'fill="'+col+'" fill-opacity="0.9" stroke="#2b2b35" stroke-width="1.5" stroke-linejoin="round"';
  var sheen = 'fill="#ffffff" fill-opacity="0.12" stroke="none"';
  var straps = '<path d="M'+(cx-24)+' '+Y(geo.bust)+' L'+(cx-16)+' '+Y(geo.shoulder)+' M'+(cx+24)+' '+Y(geo.bust)+' L'+(cx+16)+' '+Y(geo.shoulder)+'" stroke="'+col+'" stroke-width="3" fill="none"/>';
  var k = key||'';
  function onepiece(){
    return '<path d="M'+(cx-32)+' '+Y(geo.bust)+' Q'+cx+' '+(Y(geo.bust)-10)+' '+(cx+32)+' '+Y(geo.bust)+
      ' C'+(cx+34)+' '+Y(geo.waist)+' '+(cx+30)+' '+Y(geo.hip)+' '+(cx+20)+' '+Y(geo.crotch)+
      ' Q'+cx+' '+(Y(geo.crotch)+8)+' '+(cx-20)+' '+Y(geo.crotch)+
      ' C'+(cx-30)+' '+Y(geo.hip)+' '+(cx-34)+' '+Y(geo.waist)+' '+(cx-32)+' '+Y(geo.bust)+' Z" '+fill+'/>'+straps;
  }
  function brief(){
    return '<path d="M'+(cx-30)+' '+Y(geo.hip)+' Q'+cx+' '+(Y(geo.hip)-6)+' '+(cx+30)+' '+Y(geo.hip)+
      ' Q'+(cx+16)+' '+Y(geo.crotch+0.02)+' '+cx+' '+Y(geo.crotch+0.03)+
      ' Q'+(cx-16)+' '+Y(geo.crotch+0.02)+' '+(cx-30)+' '+Y(geo.hip)+' Z" '+fill+'/>';
  }
  function braTop(){
    return '<path d="M'+(cx-32)+' '+Y(geo.bust)+' Q'+cx+' '+(Y(geo.bust)-8)+' '+(cx+32)+' '+Y(geo.bust)+
      ' L'+(cx+26)+' '+Y(geo.bust+0.06)+' Q'+cx+' '+Y(geo.bust+0.08)+' '+(cx-26)+' '+Y(geo.bust+0.06)+' Z" '+fill+'/>'+straps;
  }
  function bottoms(){
    return '<path d="M'+(cx-30)+' '+Y(geo.hip)+' Q'+cx+' '+(Y(geo.hip)-6)+' '+(cx+30)+' '+Y(geo.hip)+
      ' C'+(cx+30)+' '+Y(0.72)+' '+(cx+22)+' '+Y(0.9)+' '+(cx+18)+' '+Y(0.94)+
      ' L'+(cx+4)+' '+Y(0.94)+' L'+cx+' '+Y(0.7)+' L'+(cx-4)+' '+Y(0.94)+
      ' L'+(cx-18)+' '+Y(0.94)+' C'+(cx-22)+' '+Y(0.9)+' '+(cx-30)+' '+Y(0.72)+' '+(cx-30)+' '+Y(geo.hip)+' Z" '+fill+'/>';
  }
  function fullLength(){
    return '<path d="M'+(cx-32)+' '+Y(geo.bust)+' Q'+cx+' '+(Y(geo.bust)-10)+' '+(cx+32)+' '+Y(geo.bust)+
      ' C'+(cx+34)+' '+Y(geo.waist)+' '+(cx+30)+' '+Y(geo.hip)+' '+(cx+28)+' '+Y(geo.hip)+
      ' C'+(cx+26)+' '+Y(0.74)+' '+(cx+20)+' '+Y(0.9)+' '+(cx+18)+' '+Y(0.95)+
      ' L'+(cx+4)+' '+Y(0.95)+' L'+cx+' '+Y(0.62)+' L'+(cx-4)+' '+Y(0.95)+
      ' L'+(cx-18)+' '+Y(0.95)+' C'+(cx-20)+' '+Y(0.9)+' '+(cx-26)+' '+Y(0.74)+' '+(cx-28)+' '+Y(geo.hip)+
      ' C'+(cx-30)+' '+Y(geo.hip)+' '+(cx-34)+' '+Y(geo.waist)+' '+(cx-32)+' '+Y(geo.bust)+' Z" '+fill+'/>'+straps;
  }
  function gown(){
    return '<path d="M'+(cx-32)+' '+Y(geo.bust)+' Q'+cx+' '+(Y(geo.bust)-10)+' '+(cx+32)+' '+Y(geo.bust)+
      ' C'+(cx+34)+' '+Y(geo.waist)+' '+(cx+44)+' '+Y(0.72)+' '+(cx+62)+' '+Y(geo.hem)+
      ' L'+(cx-62)+' '+Y(geo.hem)+' C'+(cx-44)+' '+Y(0.72)+' '+(cx-34)+' '+Y(geo.waist)+' '+(cx-32)+' '+Y(geo.bust)+' Z" '+fill+
      '/><path d="M'+cx+' '+Y(geo.bust+0.05)+' L'+cx+' '+Y(geo.hem-0.02)+'" stroke="#ffffff" stroke-opacity="0.15" stroke-width="6" fill="none"/>'+straps;
  }
  if (k.indexOf('bikini_bottom')>=0||k==='thong'||k.indexOf('brief')>=0) return brief();
  if (k.indexOf('bikini_top')>=0||k.indexOf('bra')>=0) return braTop();
  if (k.indexOf('legging')>=0||k.indexOf('short')>=0||k.indexOf('pant')>=0||k.indexOf('capri')>=0) return bottoms();
  if (k.indexOf('unitard')>=0||k.indexOf('catsuit')>=0||k.indexOf('bodysuit')>=0||k.indexOf('jumpsuit')>=0) return fullLength();
  if (k.indexOf('dress')>=0||k.indexOf('gown')>=0||k.indexOf('skirt')>=0) return gown();
  return onepiece();
}

// Clean fabric-colored garment silhouette for the fallback — hugs the croquis torso/legs
// by garment family, far more tasteful than the old per-style stick overlay.
function garmentSilhouette(key, styleId, f) {
  var col = (f && f.hex) ? f.hex : '#1255b0';
  var fill = 'fill="' + col + '" fill-opacity="0.92" stroke="#2b2b35" stroke-width="1.6" stroke-linejoin="round"';
  var sheen = 'fill="#ffffff" fill-opacity="0.14" stroke="none"';
  // garment family by key
  var k = key || '';
  function torsoOnePiece() {
    var d = 'M120 150 Q150 138 180 150 C186 190 184 250 176 300 C170 340 162 366 150 384 C138 366 130 340 124 300 C116 250 114 190 120 150 Z';
    return '<path d="'+d+'" '+fill+'/><path d="M134 175 Q150 182 166 175" '+sheen+'/><path d="'+d+'" '+sheen+'/>';
  }
  function bottoms() {
    var d = 'M122 300 Q150 292 178 300 C182 340 176 470 172 560 C170 620 166 680 162 700 L150 700 L150 470 L138 700 L126 700 C122 660 120 600 120 520 C119 430 119 350 122 300 Z';
    return '<path d="'+d+'" '+fill+'/>';
  }
  function briefTop() {
    var d = 'M120 150 Q150 138 180 150 L176 210 Q150 220 124 210 Z';
    return '<path d="'+d+'" '+fill+'/><path d="M134 168 Q150 174 166 168" '+sheen+'/>';
  }
  function fullLength() {
    var top = 'M120 150 Q150 138 180 150 C184 200 182 260 174 320 Q150 330 126 320 C118 260 116 200 120 150 Z';
    var legs = 'M126 320 Q150 330 174 320 C178 420 172 560 168 690 L156 690 L150 460 L144 690 L132 690 C128 560 122 420 126 320 Z';
    return '<path d="'+top+'" '+fill+'/><path d="'+legs+'" '+fill+'/>';
  }
  function dressFull() {
    var d = 'M120 150 Q150 138 180 150 C186 200 184 250 178 290 C196 420 205 560 210 690 L90 690 C95 560 104 420 122 290 C116 250 114 200 120 150 Z';
    return '<path d="'+d+'" '+fill+'/><path d="M150 200 L150 660" stroke="#ffffff" stroke-opacity="0.18" stroke-width="6" fill="none"/>';
  }
  if (k.indexOf('bikini_bottom')>=0 || k.indexOf('brief')>=0 || k==='thong') return briefTop();
  if (k.indexOf('bikini_top')>=0 || k.indexOf('bra')>=0) return briefTop();
  if (k.indexOf('legging')>=0 || k.indexOf('short')>=0 || k.indexOf('pant')>=0 || k.indexOf('capri')>=0) return bottoms();
  if (k.indexOf('unitard')>=0 || k.indexOf('catsuit')>=0 || k.indexOf('bodysuit')>=0 || k.indexOf('jumpsuit')>=0) return fullLength();
  if (k.indexOf('dress')>=0 || k.indexOf('gown')>=0 || k.indexOf('skirt')>=0) return dressFull();
  return torsoOnePiece(); // swimsuits, leotards, tops, corsets
}


function downloadSketch() {
  var aiImg = document.getElementById('sketchAIImg');
  if (aiImg && aiImg.src) {
    var a = document.createElement('a');
    a.href = aiImg.src; a.download = 'blue-moon-couture-sketch.jpg'; a.target = '_blank'; a.click();
    if (typeof toast_==='function') toast_('Sketch downloaded ✓');
    return;
  }
  var svgEl = document.getElementById('sketchSvg');
  if (!svgEl) { toast_('Pick a garment first'); return; }
  try {
    var xml = new XMLSerializer().serializeToString(svgEl);
    var cfg = DESIGNS[S.g];
    var f = (typeof selectedFabric !== 'undefined' && selectedFabric) ? selectedFabric : { name:'Synergy Nylon Lycra' };
    var img = new Image();
    var svgBlob = new Blob([xml], { type: 'image/svg+xml;charset=utf-8' });
    var url = URL.createObjectURL(svgBlob);
    img.onload = function() {
      var scale = 3;
      var cv = document.createElement('canvas');
      cv.width = 300 * scale; cv.height = 800 * scale;
      var cx = cv.getContext('2d');
      cx.fillStyle = '#faf7f1'; cx.fillRect(0, 0, cv.width, cv.height);
      cx.drawImage(img, 0, 0, 300 * scale, 760 * scale);
      cx.fillStyle = '#5d4e42';
      cx.font = '700 ' + (11 * scale) + 'px Georgia, serif';
      cx.textAlign = 'center';
      cx.fillText('BLUE MOON FABRICS — DESIGN SKETCH', cv.width / 2, 778 * scale);
      cx.font = (9 * scale) + 'px Georgia, serif';
      cx.fillText(cfg.label + ' · ' + f.name, cv.width / 2, 792 * scale);
      URL.revokeObjectURL(url);
      var a = document.createElement('a');
      a.download = 'bluemoon-pattern-maker-sketch-' + S.g + '.png';
      a.href = cv.toDataURL('image/png');
      a.click();
      toast_('Designer sketch downloaded');
    };
    img.src = url;
  } catch(e) { toast_('Sketch export failed'); }
}


/* ══════════════════════════════════════════════════════════════
   ATELIER ADVISOR — expert guidance after every pattern
   Built-in couture knowledge base + live AI enrichment
   ══════════════════════════════════════════════════════════════ */
var ADVISOR_KB = {
  construction: {
    swim: { needle:'75/11 stretch needle', stitch:'narrow zigzag (0.5–1.5mm width) or 3-thread serger', elastic:'3/8" rubber swim elastic — never cotton-wrapped, chlorine destroys it', tip:'Sew elastic at 0.9 ratio into leg openings so they hug without cutting; always line the gusset.' },
    active: { needle:'75/11 or 90/14 stretch needle', stitch:'coverstitch hems, 4-thread serger seams; triple zigzag on waistbands', elastic:'1"–1.5" plush-back elastic for waistbands', tip:'Topstitch seams flat with a twin needle to prevent chafe on high-motion pieces.' },
    dance: { needle:'70/10 stretch — foiled and sequin fabrics need fresh needles every project', stitch:'narrow zigzag; avoid unpicking foil (it scars)', elastic:'clear elastic in shoulder seams to stabilize', tip:'Cut foil and velvet in a single direction — nap and shine shift color between panels.' },
    lingerie: { needle:'65/9 or 70/10 microtex', stitch:'small zigzag (2.0 x 1.5); 3-step zigzag on elastic', elastic:'picot-edge lingerie elastic, plush side to skin', tip:'Use a strip of tissue under lace when sewing to stop the machine eating the net.' },
    dress: { needle:'75/11 stretch', stitch:'lightning stitch for seams; leave hems to relax 24h before coverstitching', elastic:'clear elastic to stabilize shoulder + waist seams', tip:'Double-knit holds structure — press seams with steam only, never drag the iron.' }
  },
  trends: {
    bikini_top:'SS26 runways lean 90s revival: high-gloss solids, ring hardware, and upside-down triangle silhouettes (Miu Miu, Jacquemus).',
    bikini_bottom:'High-cut legs and low-rise waists are back — the "pantsless" hip-line silhouette dominated Copenhagen and Miami swim weeks.',
    one_piece:'Sculptural one-pieces with strategic cutouts trend strongly; square necklines photographed best on SS26 runways.',
    swim_dress:'Swim dresses are having a modest-luxe moment — longer hemlines with high side slits, per Vogue\u2019s resort coverage.',
    leggings:'Flared and stirrup leggings overtook straight-leg in AW25\u201326; matte recycled nylon reads more premium than shine.',
    sports_bra:'Longline bras doubling as tops continue from the "gorpcore to studio" pipeline; strappy backs photograph best.',
    leotard:'Balletcore persists — sweetheart necklines and low scoop backs, worn with wrap skirts off-stage.',
    unitard:'The unitard is the sleeper hit of athleisure — one-and-done dressing; contrast side panels elongate the line.',
    crop_top:'Square necks and bra-top hybrids rule; visible topstitching in contrast thread is an easy trend hit.',
    bodycon_dress:'Ruched bodycon with asymmetric hems trended at NYFW; midi lengths outsold mini 2:1 in contemporary.',
    maxi_dress:'Column maxis and empire seams echo the "quiet luxury" runway wave; tiered versions for resort.',
    night_dress:'Slip dresses in lace-trimmed satin crossover from sleepwear to evening — bias drape is the whole look.',
    two_piece:'Matching sets remain the top-converting silhouette online; monochrome sets in rich jewel tones for AW26.',
    jumpsuit:'Utility jumpsuits with defined waists (belted, corseted) trended across Paris; wide legs, always.',
    skirt:'Circle and pleated midis dominate; drop-waist minis are the emerging youth signal from Copenhagen.',
    shorts:'Longer-inseam "long shorts" are fashion\u2019s current obsession — tailored, not baggy.',
    lingerie:'Boudoir-as-outerwear continues: visible lace bodysuits under blazers, per every major street-style roundup.',
    costume:'Stagewear leans maximal — mermaid silhouettes, liquid sequins, and 3D florals on recent tours.',
    wrap_dress:'The wrap dress is in a quiet renaissance — flutter sleeves and ankle lengths for resort 26.',
    rash_guard:'Surf-inspired zip rash guards crossed into streetwear; color-blocked retro panels are the look.',
    biker_shorts:'Biker shorts styled with oversized blazers remain a street-style staple; 7" inseam is the sweet spot.',
    corset_top:'Corsetry is fashion\u2019s defining structure story — exposed boning and hook-and-eye fronts everywhere from Mugler-revival to high street.',
    tennis_dress:'Tenniscore endures: pleated skirts with built-in shorts; cream + forest green is the palette.',
    board_shorts:'Board shorts went fashion via gender-fluid swim — longer 18" lengths in engineered prints.'
  },
  famCat: function(g) {
    if (['bikini_top','bikini_bottom','one_piece','swim_dress','rash_guard','board_shorts'].indexOf(g)>=0) return 'swim';
    if (['leggings','sports_bra','crop_top','biker_shorts','tennis_dress','shorts','unitard'].indexOf(g)>=0) return 'active';
    if (['leotard','costume'].indexOf(g)>=0) return 'dance';
    if (['lingerie','night_dress','corset_top'].indexOf(g)>=0) return 'lingerie';
    return 'dress';
  }
};

function buildAdvisorHTML(aiText) {
  var cfg = DESIGNS[S.g];
  var cat = ADVISOR_KB.famCat(S.g);
  var con = ADVISOR_KB.construction[cat];
  var trend = ADVISOR_KB.trends[S.g] || '';
  var f = (typeof selectedFabric!=='undefined' && selectedFabric) ? selectedFabric : null;
  var rows =
    '<div class="adv-row"><span class="adv-k">Needle</span><span class="adv-v">' + con.needle + '</span></div>' +
    '<div class="adv-row"><span class="adv-k">Stitch</span><span class="adv-v">' + con.stitch + '</span></div>' +
    '<div class="adv-row"><span class="adv-k">Elastic</span><span class="adv-v">' + con.elastic + '</span></div>' +
    '<div class="adv-row"><span class="adv-k">Atelier tip</span><span class="adv-v">' + con.tip + '</span></div>' +
    (f ? '<div class="adv-row"><span class="adv-k">Your fabric</span><span class="adv-v">' + f.name + ' — ' + f.desc + '</span></div>' : '');
  return (
    '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">' +
      '<span style="font-size:16px">&#10022;</span>' +
      '<div><div style="font-family:\'Cormorant Garamond\',Georgia,serif;font-size:17px;font-weight:700;color:var(--ink)">Atelier Advisor</div>' +
      '<div style="font-size:9.5px;color:var(--gold);letter-spacing:.08em;text-transform:uppercase">Construction &middot; Fit &middot; Trend intelligence</div></div>' +
    '</div>' +
    '<div class="adv-trend">&#128200; <strong>Trend:</strong> ' + trend + '</div>' +
    (STYLE_NOTES[S.design] ? '<div class="adv-trend" style="background:var(--ok-bg)">&#9998; <strong>' + ((cfg.styles.find(function(s){return s.id===S.design;})||{}).name||'Style') + ':</strong> ' + STYLE_NOTES[S.design] + '</div>' : '') +
    rows +
    '<div id="advAI" style="margin-top:10px">' + (aiText || '<button onclick="askAdvisorAI()" style="width:100%;padding:10px;background:var(--surface-warm);border:1.5px dashed #c9a961;border-radius:9px;font-size:11px;font-weight:700;color:var(--gold);cursor:pointer">&#10022; Ask the Advisor — personalized guidance for this exact pattern</button>') + '</div>'
  );
}

function renderAdvisor() {
  var host = document.getElementById('advisorPanel');
  if (!host || typeof S==='undefined' || !S.g || !S.ps || !S.ps.length) return;
  host.style.display = 'block';
  host.innerHTML = buildAdvisorHTML(null);
}

function askAdvisorAI() {
  var el = document.getElementById('advAI');
  if (!el) return;
  el.innerHTML = '<div style="text-align:center;padding:10px;font-size:11px;color:var(--gold)">&#10022; Consulting the atelier&hellip;</div>';
  var cfg = DESIGNS[S.g];
  var styleDef = cfg.styles.find(function(s){return s.id===S.design;}) || cfg.styles[0];
  var f = (typeof selectedFabric!=='undefined' && selectedFabric) ? selectedFabric : {name:'nylon lycra'};
  var mDesc = Object.keys(S.m||{}).filter(function(k){return k!=='sa';}).map(function(k){return k+': '+S.m[k]+'"';}).join(', ');
  var chipsOn = Array.prototype.slice.call(document.querySelectorAll('#schips .chip.on')).map(function(b){return b.textContent;}).join(', ') || 'none selected';
  var prompt = 'You are the head advisor at Blue Moon Fabrics pattern atelier — an expert in stretch-garment construction, fit, and current fashion trends (you follow Vogue, WWD, and the runway calendar). A designer drafted exactly this: a ' + styleDef.name + ' style ' + cfg.label + ' (and ONLY this garment — advise strictly on features this specific garment and style actually has; never mention necklines, sleeves, or components that do not exist on a ' + cfg.label + '), sewn in ' + f.name + ', with selected features: ' + chipsOn + ', measurements ' + mDesc + '. In under 130 words: 1) one fit insight specific to these numbers, 2) one construction move for the ' + styleDef.name + ' details that elevates it to boutique quality, 3) one current trend note for this exact garment category. Confident, warm, expert prose, no headers.';
  fetch((PS.adviseApi||'/api/advise'), {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt:prompt})})
    .then(function(r){ return r.ok ? r.json().then(function(j){return j.text;}) : Promise.reject(); })
    .then(function(t){
      t = (t||'').trim().slice(0, 1200);
      el.innerHTML = '<div style="background:var(--surface-warm);border:1.5px solid #e8dcc0;border-radius:9px;padding:12px;font-size:11.5px;line-height:1.65;color:var(--ink-2)">' + t.replace(/</g,'&lt;').replace(/\n/g,'<br>') + '<div style="margin-top:6px;font-size:8.5px;color:var(--gold);letter-spacing:.08em">AI-GENERATED GUIDANCE &middot; BLUE MOON ATELIER</div></div>';
    })
    .catch(function(){
      el.innerHTML = '<div style="background:var(--surface-warm);border:1.5px solid #e8dcc0;border-radius:9px;padding:12px;font-size:11px;color:var(--gold)">The live advisor is momentarily unavailable — the construction guide above has everything you need to sew this beautifully.</div>';
    });
}


/* ── iOS bookmark identity: inject into <head> at runtime ── */
(function(){
  try {
    var icoData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAIAAACyr5FlAAAABmJLR0QA/wD/AP+gvaeTAAAgAElEQVR4nNVdd3wVxfY/u7ckIR1CCQklofcSaQoiAiq9CKgUG9Yn6hN9Fuw+Hz67PxW7IKAovQqoCErvSJMmhF4CpJB+7+7O74+9uzt1d+9N8MF8bnJnzpwzMzvz3e+ZnZ3dKyU1+QeABBIAAOhfkp6QJCvulCUZCvZZeC1ElpmJZwkMqSaBZKhbRZEK+rclteR0So+hUAoBGRD2hbBcU98UIRQSI54CwjXM8swkIouiyiEMrTgAQmZBdlmIbhI/CwEAkrndgIWws5AwCyGOmDsSlB5pR5didgNnkKxvhBCZJgoIfRAgZCVpDfPLBTLYo0CUDecomCgDT8QR0qUzWcIcpyzZplBhS9imiI8HxMdD9x5ujogvQ1eUy6IBl+BChA09wj685lmQwUyEJds2Cesfsj94uVQr3PUeWTsr5RWCxFkACEDmid1hTQyQyLBvTx4CZYoeCQnH3KQHGheI+ZAKJqmw7SFxgBgJb4DtaUPADW7RwIGGoF6ieFZmgIPqa561OJ8LE9HpSCZtziP+8DPnqD0+uCe6mUVyCY0OQJgacMqhy+chg4wIoIPl4hU5o4prKNYMc5RlQsrV5RMJNVR2bOH+IGmY0/ig0MPHB9MwwdBaAiT4sIchLBbRfcVppOBEcEUbdNI1iwhPVC4TkUXIosHntYkRcinDiiKeEtUoW/IQdoodPrBCuKe4mcUAhRN4mgwhIVPOawx5WKKTxIE2eO4YYZpsgWzKDeyI5vLmHGxTCRNu6fYM6YY8qEOlzgO2E23xgWh7Q84eF7L9ULosyIw/J2RwQC9kEaeO4gCA211coPBZhCMkJqQ2xgIhtx5e1A15OOYiJl+MD0Cki2EgwgcKL/D1Q3BAYH3bNAkxEgdicEsbDtzAPZu5mlx1rymW9H+MAQJJonOwtBXlKlGalI4wSdoiQPo6lyExBZYEGatceI0IQEKhBTLzoLEaXeKDaCH1RRMJWSxitFhkMA7FPkmdSOJG2uHG7iLWKlO8CObOs3DTvDLDIw/Wm9ClsY4D4VYEhQDCRYjmEudgmWBfFGGYJMVFhqg3OCwSBm1QSRvc0P0pVMQNZEbCKYJkRcaABkSkbEmdT1RjWLhwJhbUUgQFEXw5y1Rw88FjiA8Lpv3Un9VOsrsQpUANsO0pxBt/UXeJ7fhtAwCQydLECGAqEOq4Jg8ywpKE0+QDEGf+AZw5I9FsEiUEBAwDHjq40xRElMxBBi20PT0cO8Q2yQEKUQ0T+EJ89LwACEAy/jOaEjsnoDSpSQmtQ89ZED7zQAhJWA3M3CIUQ8LJh15G6N4bImcbgM1C9GAz25CA6VG6N0RZDGIYwjDiJBQ41dlDJxza4J3qFOa4jSc0mUtZxCuC6/hsEE2RB4dL3HYBc5yiiYWpRp7N/OUNNoh4hKtjVz6DDMOERQbVp5QCnwkonnBBGwzmhbhhgCLjNXG6xN1Ug0I82SZqkU60aCPsJjE+KKH9tStVqT0ObNWQEBYIrG+ieQ7ICLtP6A4h60Jkki7KKpN7ulv/eFcrguKMI+ceBpO0Oy3CPEv4+GCnIMAsf5Hjx0EJrulEHhYmaFhYB8ROdzDYGE1kkEFHnNnULkk3Gk+5nYrqadqtcBQFjoaUccmDLoKxdewOG3xQaiSFCCECGEoQJ5NqpgkIGhNWycboU4TBOUYhMuxPFeYc4A1mWLSBzLbQbSOD/V3ZyiQPwcycKtglPrhnFc0T2OgLyEAXIsHHxsTMpmGBNYM+3rCQIepVp/UhvhXP1MbEkAnuyrq6+HFBHpykCD28CBcfHCGXQqwsTIqwj/tAWFGMwaixWQb0nZAh7gEqKSAG97RBHx9fR2bLQqwecfXLqggRQbZGhB6b84a7VMo9vXAIcCGCGE+CXH8sukDYF3mMCPumsswjd0CGA3eyEy8iUJxCjxEvlzdwmMxLHga5EiAxKx+UDjeJzJUMKklo8PT1g9BXPpDd2gYghMy1DSA2BiMJqwqY5pn/JDpTFPjnH51tRBlYCORhI4M9aQkF3vTcOckrGNPxGmn8NhaFC30ILRkCkGgV674XZ02MhAup4RofoOsALkShhS4CN4AMHWJliwICdZaEGxAT5XQxhwg5+u6QYQ8F2qFUAm2AeVcWE4nJI5Qkx5VOmjEU5fd169gQAFZv+iugqEQVJBrYCAcfFuPgQuBRiHmoOD3g/eOGMdjAQMkGFtgf2STKhIcMNuLACryZgBWhoEnjRlAmAICX7nEb8iCK5NKDlYz2+77/ZGyTzJoAsP/wuTvGTS4PKNbYh8xJbiAHnocP4LoYnULEEDEk+Do9P0i2uZQ1q0ZBgosMWshBBsMi5EldsVkqqYRXycpkGzMw2h5+EnXOytSRAQBNG9Ts0j6TOmbm3OJzKTWJDamFhHifhi5kkJmkh4Fc2+ADQJBhmvAvcc08/JKEbhuLDObowkKGYOwjHC+yTCPpDQkjIw9OrmlMwhtpRiYi+IOyZfgDm6OAwMUARS0Gi1C5TBdYDRR5GYSQqinlSA0iNahpQUAaQhroxyLJkiSDJEuyV/L4JNkne6MkCV9UFJzKFmHQQhoZ9BntYpbKHFvEtAEAXrynsWzHmYehh8gtWIbphu2H9/11tlnDWgDw56GzG7dnYwpW+YY1iQ+gZyQcNQBsSoE3OHRs5vWIRHQNFwc0WyA1oASKkFKmqUGevq6k6YhHagAMLUn2yb5ojy9W8hhnHV2+ABl2ABLrMCxCJh0ubqnjASZbSmj0gNmL+gECmXSRa34bXS9JAOD3ebp2bCQBrNn8V1DRjFol3E5Pks/QmjpAjiVXE1cG3tibTQIJIDrK16ppWv161eunV8uok1IjJSEmxp8QFx0d7QcEF3Iv/TBn1dKfN504lcOUE16QZK/HF+eJqkKhVrhCQwh5mvQlBuNxEGGOeSyKk6ykY66U0OgBIDqeGGBriPhPVBsxzrPLYSgAZ9TDwgeuz8lt07zOdR0bdm6f2appus/n0YU4j+YXFE/7/pdpM1dculQMlRgk2euP9fjjQrxXUWQQEjtkCBVYUkFYrpXU0+ZmH/NblAzHuRARgQIpQbob4K9/AO5NENIhgsvNo8IdDdSqntS/V+shfdvXr1MNuAEBQmjB0vX/fW9mbl4hX6ciAWlKeaESKPZGxcu+WNa/cD0F5STEAw+0PGyHIpxt6Ely9zkxH7TGiT/3xNDDGX4KG874AM71rXVxikgc4LMQYCHSpEGte+64rl+v1h6Z+zBwqAXHTub868Uvt+/8i6NTiQFpSlmBFCz1xiRKkrHqSA2JIaTGxxYZjlMN3thzMrjuBoBeIQV8DBzpgbESL5u6wIeRoPEBThSCqQG0aFz78Qd663MdYZAAAH5eue2ZlydfKiyxUazEgNRAsOiCJybR441mCAMqgAxbVrAi7kiFtLIWwcgLgnCdi4hdXOIDcJYyOYQojU8hFkQS4qIeHdvrjiGdPLJszZh5QdXQf975Ycp3P4tVLlNAamk+8sd6/fEUMsTXL8AbV7HHoVghfIeC/8PmHIw/sGShgrnocZp8uMIH7U0MjIAThYSybrqh1Uv/HFCtWhxzGUOH8qDy1ItfLV62iZf5dwQtUKxoqjc6EQAwwoCwkNGzQ+LTd6YBwFtTT/66JZ/RCSWJQqh/RIQ20JN2i2D84ed4E9vJBzjiA7BRp9Q4sw2MQgBA8vm9Tz98y5jh10qhgqwvFhyBoPLQEx+tWrOLyflbg6aUKWXIG51oiwzCv1BqT41OS0n0AcBTY9JD4HCeajhDh0qa8yP88UJmpdLeuQA7qGHhw6qWmm1gLgY4FAKQXjvpo9dHN29SO5TNYIL0gejZV775nyNDD5pSHiwr8EYlUv7FDTKYiQJPh2IFZyggUoYAwBNVtX1IhL8MDksaFq4WvngKfB3jj+cHJCDqJf/M0Diz1tQP78+omyLpxUggAehx86Pb6J9X3/7hu9m/wZUTNBVAkz1+AOC7EhAi43ROoG2TuOIy7a2pJ46eLqMN3S6IsTUiPCklNBxrdLr9qig7/I4KLvEBFBSAFnKUO7TL/PTNO+NjoyWsIZJEloIVsOSnLQ8/+QlcecEblSB5/VwvwHE6vOsXoNiAQxK2K2aUggUdRN4oorwWRXEU8bAMhtWKGAm3ZfifIeSiG4F52xNQh3YZk9+9V0eGJGFsQTGHwRnHT+Q8/fIUuCKDEigETb+3gIh+qBRkkCKOgsCh6IF6bgXxknjdZBm2Y+8OH8bxEYeAsExa3iiz1qQ37vRHeS3HYU41DEwA4J4FPf7cl4VFpXBlBoSUQCHlSsBa86gYMlzMUskIkZTx8ca+2aE1soV0Ehk+wIIAAQWKQkLy9NTkKe+PTYyPkYBwJRaFAE0bP8xds/WPy7wGWrGA1KCmlutRcHitWXjIICQ0GTOFMI5BxsbbyKDxQVbJ8lXk+CCE+B99VAgAkN/v/WjimOopCRJYnGGiAchpqc4iBQXFE9+fDVd80AIlgDSOKwFUEWSQY85ihfqHwxGAnnPQEcNOzBYVwwclRPgfLte/nx3Xv0WTNOuSlZxGc5njy+k/5+YXwRUfENJUpYzjSlhHEBky7KcauCY+5xAMv/VVWfhAtA6rhtXIUMjNN7YaNexaAIMbsMtUMJABEuFliopLv57xK1wlQVPKADQrLegr2ulUFBl8h6IreKKqtrMuAKmrSv7CBqZD7fmw08HUnNc2cGUAkOJio798Z2xcbJR54SrhEDGRgTGHV4acnNzOWQ01De0/dBquiiBJkuwlHT1O9S7urSD6rOJevxARnkPRo16g1zuRMUjWOqlxV4V5zCmki8Bc2nS5NgrAqAEAvWYa+gM0/qE+1asnABDIAB4y9IhHBr8X0molp9ZM6nFdC4TQgmVb4YoPSAmAJwoXGN/4ALpEBkUJwOiwyKAJRCZKonwHuJic0g7Iwb8I1HBNQo4AWjRJv31IF4kkFsB8ihU3oOORQdU0zahiaL9OcDUEhFSEFD1aSchgScIWGaTvl0kPz9+1RlhXAj7YKQh5XKT8iYf7mHt2TFeCL+pKTFwCUK1dq6BpmC+/sgNSg6wrMcat4siwnYQSCggQ5yn78Cen7vFBIi3UGBGFIAQAzRunXdexCeCAIDmDlUgAKgJFtQAxf+kWuEoC0hQjhniTjEpBBuVxhP5Fn/6QcwtLYqhiN2kRAOe2LSEBZo6CqwE9BSE0cWUAhP5x702yRM10QgGfeVDzj/MXLj33+nfDBnQEgFkLNy5cfhVMOPSANNU82cSuhBYy6m6QgfMTLrIUqFv2iNq6wxt7R3xg5SBm3wYjNHYWIwCglNNrV+vZrSUYlhZEMLDQLCKBBLBh68H5SzfPX7oZrsKAVAVkc/umKeU4+spABnNDDVOQ7ZSoiCv/YsWR5Tiso7EyhbNUSz7olixZJoeezyHYzAMAAPYfOsnTuzqChvSHzoV9Ffrmr3mEiQzMEpOFUuwbjO3HniqAvzmFqYd3eLSmCSZL3v+mLGACFx5mlp576MhZsdYVH5DmwpXYrHkAuEcGpYOXQbzZh7SvbHzQULA0CdBafNOmRb2MejUgonD46LnIDK+EYD1XLF5QvpzIsHS4t+zJSHj4YEcdO0quiyF4xSq2W5dmEGm4mH8ZnlD62wJCHAcBVkcaA4twIVBCd8igqyAjdpeyNpgS44OrBhYl0C4GBxMh75zVCHgBcaVkccXFZWKtKz4g8yKcIgx2kgHAjms4yEA2OviL8SsDH1zisXcxuLIFkegof6tm9YAJ1CIOXgCeU1xcztO7ugLZLXxXwiIDQSUhA5j9HBXEB+VNsGMjXUwI3FwKAQCEWreo5/cTr6QiNEiIILwF9KTqKg0EoeIuxPhmzi5DWFnIAGvOUQn44KqxmmRzmAmpHrOmogwrAKZO9ZKJktjYKK7F1RS4gw3sWHKHvBKQAdx1DqKBYeADAHeKfLQRR4UpU+cByjTAQbECLiRsEHHQsbHR7MFcNUGSmRkGRiSCscQRYQoJTQdkAGtIXsrSA08IbfHhcgrCUoU5/AREMurURJyGY1Rh/MclZrxqUjxjejUFHA6YiDqF9G+Ssy3NcJHBIRLHS1lwhw9aaFlYQhGYKH0EADVqJFnF06cPEJZkKXrPNKhfE67eYN1DEA02LidhZDvkDshgIqIf42GMMXwgU4Kd+ZQarWlXJtMBCMVhfoGADwo1AjFxHB8NMlLp47p6giRR7xznEgYA63fI8x7vFFxDXCZ19nFfjO+ED6BrIttEQsHAhyOFAA6R2CpR1qGRx8GcQUadhj5C0LRRGly9wbg1bksY7PI5kMo4G1NCR2SE4szyOa3qiA+XUxDcHDtUWj+UFRMTRZQqmFtQhGHW0CmrseA+/1UQJPDwYQFWd9LjLZxkRI4MEM85KHyQxMA2kcYHJSQvTEhqwfQRvyFsP6FQAynCCP1HUK1qQpOGteGqDDLdLeY39xKGO97cAaKpxQEZACCbtz2YbBAMpACYGBQsTYZCGIgg+tgQAgQlpeXmeFNQwG0QSRgIO5Gu79ICrsKAveYWhwFFDiLCYJGBeKcuBTig5bq5vk3QDh9gjw8gWQGYdgDZOC7fYAdmJItKyo0Bxw4BiyMMECZhmBFAMKR/F7gagyyTpzXQnWZPGKFhxUbIBhlcijKLMEksInw4TkFEFGLjZUKJ4uJSpggTLRx8mI1Ahmar5vWbNrzqpqWSNVWiCYMmEsD0Qt8EFRBCwIWWHGg5CQaZFdG16nEOPnA5Qwl2FEK1mgORM+fyLcSRziWkhGVRzGGWN2xQV7iqgiR7AFhYgMOgIkvOQwapTMtp6OAwkEUZdIn2+MBgGxaFYNkERI4eP0tYChwKmGgwJDhcRo24ITEhFq6WIIEkeXiwcEsYRM+7RQahQAGAvpR1wocQcWFSiANEso+doy9WzT6gCINkDjDjCGKrRN8zshdcJUGSPO5gAS4IA5PhI8Ve8WJx1nWwl7KCn9ezorZTELcUAgx0CIgcyT5jVYXTBksYiMhCOJgQ3Du6d7Xkq+Q+i+ThwQKYgXBDGAwCzI6j5GZZPEPuT4c64QO4+ACs3UAeFgcHVpwHkd37jpYHFBDjg8scgMX1T0J87DP/HA5XfJCsZxEoWDAE4JYwqHw3yKAVuO/nAB0fXDRZcQIfrinEHUTKysp37s02CYDAB0UYmLWJCbMCBDBsUNdr2vJ3HF4pQZJBksKBhRvCcEQGIkeZVQDZBdvQJVpxvosBq+VY6wQQwU2IArds3Y8j0MKHgDmsXJI8AKR3Xr8vPi4GrtRAXaTwe5KGBZaFfRFxSp05zx3nDzIAWwShGqaLEVII1WoyiyoQAYI1G/bghIHzh9kqZKlbaoQEAAHUSa/xxsv3wpUZJC8zimC13W0H4lZG1GbIHIY1dFZ5/EmtjFYC+TQy4HHzBS6UHEuJs0DCZNRbWiRS3YrlnM/r07tjUlKc+W4FIp+McJ+UxEPDzNpFJWU7dh3mZ/+vguRhbhAi8htxpJxxJZNInOUKGaGYx5/U0v71OnjcCSLUjxUwauQYOkIkIT62Q1ZT/G0LZhsIxAB5BNz6Abp2bnHqzMV9B47DFRIkyc0PBiLbXDpeIcIAyg/o4IDKw4d7CmEro3PPnL04ckRPCVtT5jKHDSAoxe5d2+zdd/TY8SvgeThJkiSPkYgYFlB5hAHMDAFMcEDF8MGo2Y2YW4gUFpU0blQns36qWSlOGDQfM7+xQjcTgUeW+9zU6VxO3v+YP0LIoM545isMWIB4yCEyZACAx5/Ugj/VEBKARObb8kSYEAEGJUePnx02uDsGDZsWCZJkkGWpx/VtS8vKd1zuX+8SBf0HafXAxwRUABbADj9iRp0phD/5YNwKHq8ECuGd4GxSDJGLFy+1bJFZL70mZ84BBPyoemwRIl3XqWXTxnXXbdxbXi7+5djKDlHRUaqKJEliz9FIYAH2fgQiJgwzznMreNwtPmzUgMP4IjzxUHI4+/SQgddLkmTbELI4W2gAAEKQWT/1ll4d/jxw7MzZiw7alRHatGrs9fqMnyZ1xAQ4wcJewSi/AsgAAI8/saXgQtANPoCEiBNJRASRCxcLkpMSWrXIYNvC/Q0NJ2CEAgJISIgd3K9rnfTqO3b+VVp2uR6vTUiIfXTcyLS0mit+3WhWTTaEklYEFoaGM/E4IAMQSHF1RwDg55oAB04UApUGEWBREhtbZf73r9eoniSRbWGdC9DQ4gV8sQAAAAoLS6bP/OW7mb8UFFTmjw4nJsQNG9Z72NDe5WWB0Xc/X1SM/3KDIyYYSXiwAP6Q63HCjosM3a0kGnstnWag4VAIP5dIuocIQDAYPH3mws09O3Kbg9fpkjb0YPa23++7pn3TO4b1TEqIO5eTl1fh13tkZqSNHtX/hQkPdMhq4fV6X3/jq7+OnDDrxL/ZBEfiDhZQKYSBlWIwRyjw1pWouN0E055CWAl3MIVWz44fddvwnpypKJCICSfgHWXG9x04tuznjRs37z10+KSmsSPHD7IsNWxQ55qsFr17dm7UqK55X3D23F8++uR7pj46wZc4w8JQciYM0VUJkJC15FJc3eH0ADvjQ5yFJV1DBHgo4Yyy3+eb8sWE5k3rY3WwM2TWThwQ00O4x0GQV1C0fceBw0dPZx89fez42UuXiguLSkpLygEgpkpUfFyV+ITYenVS69VLzaxfu3XrJomJcUBuWtt/4Ogjj00MBhWqHk5T6JQL6NjBAujhd3YltFwHB4jxwWRZUSfHYedlBBInIklNTfnms+erV09ip6IiVJhyEQPgfaJ/I7K7cCERR4SOFTHkOefz/jFuYk7ORfvKha2xUQvDj7ggDE691JwDQDz2LimEnwwbIlwxSABQVFSycfOem3t3ivL7+fXbl4GxAi3R48xZRCODwQoNESNZXFT65L/ePnGS+15DLiZ48grCwg1hYGVRco8/sbndZYibCaYDhUBEEAERG+TmFe7ac7h3r45erwdTpcuwcS90f1O7RiiJG4gwQCkvCzz17Hv792fb12wV56KZTrBgJELCwJI8wjDjOjjAbg5RORQCLiBiK8Ryzpy9sGXbnz2uz4qK8nMthLMdPSBBV+ETDhIWHOcippCiwpKnJ7y/e/chIMoT1CfI4xu4JZgICIOj5vElNAf+5DECCrHNJSXhEwngKMnJyVu7fme3bu1iq8Q44E0QqH6mMAEsLMAFRBBcuJg//l9v7dt/xLlKQTbHADnrWEkhLIA8WruJiF6jx5/YjDyn3eAD/haIiIShrLy8wlWrt7Vr3TglJcmlDR7obmNnISQsgEKDGcfwsW9/9pNPv0PMMxwAIcq6bLAAt8ig3UrFbrSyPj8CiHDVREIoKixZ/OMar9fbulUjxm05B4pWORMOwGBh61MAwaIlv738yqTCwmIXgBDlYliIHBYgHHvO/EaIDDAmpHqwmRNERCHAHSs7iQuU0HJNQ5u37j10+ES7Nk1iq4T9njh8CIh+Ip2LleRh5cL5/Ncnfv7DzGVOv/rj7FBIvDrCwn7eALbI4MSpOY3lVoxQcQphkq4gAuGjxMo6euzM3IWrPJLcskUDSZJduRZ8vmnKBBMOEBCGqqjz5v36wssfHQ6tjguqccpywgRPGDksgEUG9/6tFFtnKAC4wwcvGQZEWAWuBCJCSUihcaO6Dz0w7NrOrd2/2QfvOi6RcC9bNITWr//jq6/nMrCw9yZQUUw4OBEIBxZggwwAMMEB3KGt8I5ARhIGRECMEhsTAICGmXVGjex7U+8uHg/7RjyOPh8TRgYFC1VDGzfunDJ1wYED2S6gwKnVBSa4ckdYgC0yXMLCSuLgCEmoeETbeSKDiEhIy10CpUb1qj1u6NC/b7dGDeuaQs5QsHdYgA+LY8fP/Prrxp9+WXf6dI6gnWS5eMJ5XG3kFYQFcFHitBUIpNj0IcxQRUYhEBFEuGoiISdL4D0IabOmmV06tcpq37xly0Z+n1dI34xzQQjKA8G9e//avv3PDZt2Hjx4VNwqHurcAkKUxZsWVQgWhoYtYYTiSAeHHpzuxUe6V8OFExESiY2cn2s705CiovzNmmbUq1e7Tp1a9eqmplSrGhcbHRcXG1MlCgGUFJcVF5cUF5flnM89fuLMiRNnjx07vf9Adnl5gCxHOMYMGuyUbXNZquAqhw0LcEEY1n4OCxzADlLEFAIMRAQ6HEFkKLHTuRxvneThIJTjxlooDxcTwIUFKwmDMMzgNfKkkJr1i5BAZJnZCABAktgsIMdGr4b8CVJWh5KYx8lBCX4MotFm+0gCu4GseHBftK1P4WdWOiyAhoKwGQgAvFjCwAcgcmw4cEHGT4PqSSqXqc8NRMA1StijsmEGl4PnWEUEwbEE95hghK5hAeEThpnlZUQuKQQQMr1MxBBh1FghgRIQ4MA9VkShUrjFtUOJGBNQ6bAAljDM4OUNrRsKAdLLgGuIgBORgBgl4AIoYDtIFZ99RAAjG0DYZLihClZIwUKoEIrzCMOMM27FUsIhYkchLiACEREJ1VwBUMARK6ICL1+wR4N9XmRUAWHCgpqI8TW9GCoEFKIXRFMIJymGiEAiJBLgjbQAKMBghci/DBcqvLpdoM5ewyUmOMJOWY3Hjr4JAL6a/vOmbQd4OjZ+hMpFeFT/AUARiBBx8Py3z9BJhHBXx7aSB3nrzT2UJlefyuUpWJmI/tC24XzY0mza6NhIbq7ZZj43cPrz3lG9kxJjkxJjx47uLRoUK4moGYYIGQgAebGEcQb7Wn2w4dX7agrOOYQ0VSkpKDiRnb1x9YZp367dckENnaC+Vh+sf4lrWLZiUsOxvxeQjfBl3bltdv8MD6seXDXh0UEz8nU9f/cHDk7pUc26SaId+eKVa972v7X2eWEjqaAc/Xe/F946YPzSMxviu87c+o++5K8GovJDL97y6v9l8+7CyzUe/v7NNztFkdUHlz/58Ii5xVgNnqpN2w4fdE3PDg2a169WI97GMzcAACAASURBVCnaD0pxQcHJ7BM7tuxavHDdT/sLQ88scHjCU7Vpu+GDOvTsmNm8fgpme3zH5l2LF635aV+hgjsHOem6QVlFt3Y3Wq+eWvbJLeN+yzYfitBV5ZSHZ33ydifsQiS475nuEyadwCnQoPTYtIFEkyQJ5IQ2PVpkxCT3eXLsqIb60KFzv8x4eu5p5I2pWjuty83dB7evGiUBAFJz//z3PW+8u6MUAYCc2OaG5hkxSX2eumdUA9Pwh6fnng7m/LV824UgAMH4yfV6dU6NS2rzzOs9W+it1YpXfvzVlH1Kzu4d608EdbzKKZk3d6geU7vTaxM6Fc78+q21xUVH9q44KLe+oVlGTNIt4+/E6pr1zPwzKnk8iV2HvD9C+2+/5986oAm9jDelU88Gqb60Ma/delNVU0c7Pv2/HV7cU0KoIgCI6Xjnpu/7WLDWLv30wTff/qWc3bl946lQ/XLVJuNeu+/ZvmnxsoSCuZsW/jZ/85mLKLZhh86jBzdJ90tIKz20fN7jLy5Ze4HGn1yt6bjX7rdsF6yav/n0RYhr2KHz6MFNDds5j72wZO0FrVNWo7GjbwbJv+5gdsFxZdjzowen6a96C+6f/lafF7efJ9jCn9G5XZtq3rZ3PTK+1aF3n1m+M1iw67c9R/QnNckVIeZqBSFQL+38dcNOuWade82XrKHiI7sX/XhAH92vPl+86P23pg1N8YDkqdp8whsDfuo/a7cCoBXsXLlhp1yrzti7CcOlh/T3HFDTEZR37Jdlx6Sa8fdqPQ394LHNmxessdAOCLTzh5ctPeJpkjYedcjds33B0hCj7Fy5aadco849Y6y6sveadRlBqpl047sj4q0CuUE5v+mn8+Btdt2EoVpxWUlMTJwMAHKdIX2HTdoz7SxpJSUNub973bLSopAaAAoc2bh5wWYTlshTu/Ok7x4ZmeGTAFD58c/ue/3ZNZdCEJj106fzRi2e0q91TEzjviMXtKj70MhP55zEbbtMmjEOs/33s6sLNL3ls5Z9Mm/Mkin9W8fENO47emGLeg/eMWnOtoObth0MHZ03o+XjRmslX9PR//z+3GuDPjxkPAGMAMqzN27MBl9ZzwdR05yNy9b9FDQ7hnYx/JfUMjMAIHK1vGWzt+aEjlXyN2rVrRZ3uQKXcKcjNp5YJMQ8vah55Kdgw6KHn5y55LTQgAqBDSunZ4eGSoptNW5Mhp9U8DXrNe4Gz6aZq/8kOAqr1Js+7v8e1EcXQDs645tXVl/SrEmPlrth5pPfnlUAAKSoel0//nhAS59pW2fchw9htl+/sjpfs3oP5a7/Yfy3ZwzbbpM+HtTSJ+o0ADm20/hnvr491W83vQDebBKAeUmtTQ+S08XyYLklkGUJJcT5HhrR+MERjRLifOISEACyeokpllW2y7VDMEjVbpx/8Ls149KC2btnL9zxZ6HmPN/UQ+Dwl5P/DE0cJE+T2/v2ScLaI1XpPbZns9yNH845p4pqvmXY+CxjT7xyZt68/SV0QwNbF2z4K8SPUmybgRP6J0q6bR/K9kCx1V16G8q3zsds2w6cMCCBcpZqzrnjZca8wVO1338mvNM7CRtpeuJJd6wRZGYM7PGh5/pa9WidHvK4qHz/jlWn0Mh+9ftcX7vv9Wkj+6SLSyDKIVFir+zyvHe8gnBVyMkFS2afDRGjXLXjoyNqmbMLuW73x/vG7Z3x4wr2QfzQwcTeNKhtsvlep+LDmw5QKEIASDl4aFuR0US5Ss9B7VMkACn2pkHtMNu/Nu1XTRPTXjl4ELON7TkwK8VcjEAIAJQDC+96eu1xxcCHP+2eD597NquKhJfD6R8aJezPeNFNMSqISUiITa5WrWGb9ve+9MIPD9f1AgDS8veseOTR+XtV6yRGnBOaO1yiMXTBGXwFKTmrxzNPDJ/wxLAJTwx77qGsBjIYcGGuPMXEAQBQtHvStOwQNUq+a+7s0y1G14m69u6bO5Zv/+jb40H6+t9Ieupc09Jvnsrq6ZyTKq8a7cLxM+Y8VIpu0aClF4GnLml77oTK6zftwjHMNqZlw5YekkeRemzhx7dN3J1raElxjZ/98ol7G/qMxnLHAk8CQuAFQ1Nwo1UPcsY9rxy7BzdXcv/aO3/6nP9O26M7wBk/ZiOEEEg/LCu56zYQBLNM4RxFH0Rs6srqiw5JSs668ZksXEH9Q9gAbnnI0FEPzFyy9IHHhiRLAOBJ6/bogPmrZ+aiGp0fuzXl2MxJCy8gqCMoxJdU07reAa2ktIi7I10rLSrFCDwxubofkJpI2pZhtljLtbKiEsK2RhRAkFRDgd1fvT2m1r9n31+/igQAIFfPenvygznDPl58zsZRIMCQY7kV8coVAGinF33ef/jzfe94beTjX7497+A51VO1YZuxr7y2c+3rH9zRIEmCS0WBz2cd/GLWgUvF7NYYET1wA+FxmFbZjK525IsXqtYbEV9vRHy9EQntP18REOs6BXRxy0ezzhiePfrGsb3b+DytRvfr5d3/6dSDZfxmhz7iJ/4J/uDuE+PZuvSRjBoq/H3if/6xMCdoupeMnl9OHtUlnnv+c2BA/1KTaJ5YdvrIug17Vq/Ztmjuklcfe/raB1ZkKwgkqUpai/vefH3hPxtWcWg2d9UPASDQEHZqebxeYDsRoVCOptk4AzIEcjYs3/z7oRInX8KWpkcC26YuXWPMS72Nej52a7fHRqadX7JoxgnNrt5gwdlc7LSuEh0n08eCECApJq4KRhIF+TnlIluyxxACKYq0zcspZ9T0Fqrn5/xr4ovrCi330mbYjE/7NIvi+xFq9DlXK9jcmFcfAAA6t2LOFzuMeZYU3f6Bof0SWROiJqMMekRRaWmxeRJJ/sQ4fBeBWS+S4qskSKikJKDRpMJvJCrc/daj77+w/KL9Y0Y2QTu15qPFucaSVsLgf983NPHY11/tEr8SCgEgUI9t3xswm+apXSNN5rGgXLVeqnVmlu05tEcBUI9tI23TPVjh5qxCrsaxtdqAtwhBafakh978aG+Z2cXVu983683r0rxWY0R3PLhXK1zSI4213ONnVFNFiq7ZILTU4cKJIJBlyWPOKspyjpqrTJK3YeNaXk4hUtUGaTUg9+iJcgIB/FtIJBlIst/v9WGnr+tQuvLrn3cGDPLwewt/XTzloCIgLeO80oqWL9qRb56qsQ07NvawVOdt1Kh9nLnwWLJy0bYLCAEq/Im2NZFl1eRt3JhjizfJomoAAJS/+6V7P5p1whgvyZNx67iJt4TIRzCdoN0KByLUwVtxOblebY/lu5T8Mxc0p543DsCbMeGnmec+uTZGP4bg0d83GauH4Glyc+eWPlIfEMgpA/s39ebt+32fSpdG1cHcGvO0GLFu39TpA2MYQ5FbsXTUQys+/tWYFCpnpn+x6TyyaqEOzuzlCz/O+fAPg+i9qUOHNGJ+68WXNfjaRsa5W7xz0cQl+rIvuvDjbMy29tDBTTBbvVVe0nbhxMV5CFfh9bx6as24eyavMn2W5I+t4gHAl0+oWgCEP47ND6aZnHrTbfe3td7rfnHlquUXEUF9dmUiUl62csrynQbteZv0n/RS50zMp4I/pecTj77YRd7z7bJVJW5ayA62dS7ZfwAbe4QAaZcWfjjjy9m/fTfnt2mTvvt0R1C8MINVGjz6/mOfzTmhrzPImaPHvtw1XsY6MLnziHfGpHoBAFDgxPrHx83fFTByA9nvP/qpZTvmvpe7xcvWsUjJnW9/Z0xtw3bd44/M3RXAjlA8GSjdv+TOB+fvpDvQjgL0/RyIuIKVE9v0aJUZk9wy2RRKsZmtB/atpvn8CdVqtr722mG96lfz6ruB1LPrZ93z7JpzCEBObNOjRUZMEmnYamC/aub0BABArtE0zvRBAACBPfPufjZ19sTrG1eRQIpuc9dT24fm7Np1/Hi+6ouv2qRVZoMk9fDCz+/++HC5aSUntLmheQbdyJYD+1ajlpw89dLiJaCwQgdvSqdejVJ96ZkxklyzYf++Wnn+sZUbThchKN/7y5NP/oLrStUybu5UKyalXjWr5qjMzp0HV1PO7tyq33hTjq+5b3De3v888K+bUmOj6z8y9Z2seSvnbj6VC/ENr+k85tbmdfwS0soO/zLv8efn/X6OmBcpx1ffNyh378SHDNv3sub9OnfTqVyIb9ihC2Y75/EJ837PCa2tg1z1mpuapvtqNo2T5OoN+vS7Nr/w5OrVxzBW0fI3TB0xPvmnj2+o73XcM4sAgVQltQ82cPqd9zYfbPrP/YK74QghTSkvyr90+uSpfbv2/br897lrz4TW63xtPtj4msvb6GU/vlPnoXX4W1tj0luOuL1732sbt8xIqZkUEyVr5SVFOafO7Nmxe9mClTPXnyvBL/N8rT5Y/7LbW/YQXPL4vbfPLxXmx18/c/tj/bBb9sHdMzoPnEevbQIAgP/a+/fMuLk285wlQHDZ+PtGzCnCutmT0qLDiEEdenZo2DyjWo3EaB8oJQUFJ7OPb9/yx5KFq5ftucS8eh1Zti07jBjUsWeHhs0zUgzbfMP292W7LwXxEfV3nrL72eGxVoeo2fN69/hms7FOahCev/l9Lyx/uV01GbS8FcPaffBTkAMLPUhVUm8hlpg4u735ycp4UyBX014e1qbAMEt2DmHNZxlDO2tRHk+OuHKhBPODTj6FECDzFyslS5/wMmSuVWKlbArE2+du96iVg5hMl6Me8QC7D4j6dlBzmcXHBFfoCAtWwrnw85KqNvvOIVKIMMLwUMIeBhcrpBqhcvm2kSJu1JW+e4UwMAGVBQs9eEliuBwQEQsdUMKasAoCHcHROhRsEyKkGzdmAh0hJkTyyoSFnvRi0sqBCFj38LhqYIcSOtMRKMDrAhcjf1l8i/tCbQBhU45LTHA1w4OF/kU98SaYagghwpcwRAJuUWJl2gOFtbXRZENkjqYigBLbOgBClIXxQxhUAQwsWB3crSCEEbuYQoALEdbEkmBEwlUDMUrACSjAO2z3Q36556RO5TsDwiY3MqqAsGChj7XhVhBcHoiACyKhWhkBUNhC8PC3TEjd6kYGCCLLliq4wrBhoUdJt4LA8clHogg+RPhC/cFrcEAJhAMUTMcOAJebJ2zqrMCElMkNHxMQHizIOoC5WgHSy4AriAC7dGbjRLjuBnj6jrmYDgsXe6PKCg7c7srMoVDnKtxQBauGmBStILhaIbwMTyEUIicSHCXgTCds091NSIWj8Dddy4ZjziUJG/PIqIKR8GChfwnez2FVE86refgQASeUQJh0wprba7o0r8QQIYW4IAlbeeXBQg/c93NAJUAEWF8DApQQcjGdcA25hVDhypiQCkzckYSt3NmDMBInWOhJL7bV22bS4B4iUHGU+Dt2W/Fik7Sq0bFeCanBvDzFnxQTFSg5fvDErKkbP9tQiG8cju9+0/o3Gidlb+1z1yZrt5yn6pNTbnuqMefOaSgETi45Xrt/QxuFI49OKHz06cbpVaOr6M3IDZi/POutEl0wd97NWxsvewFXCEJcdLwczDl2bsXire/OO3NeRTHdeqx6ukH1qlFVZGXb1wtv++ps6KatFDX4pREvXxdXM0Y5f/HUWw/++N05bjsqiAlG6AwLQwmBrH/xdgSxEpsXJdhY6QKuJr+EwOY11w9e+m0OAADK2//AoK+aDljwxTFfZtsmz7499M2uMWDuuJFi+w/KqCaDt36TUW1lojTt4rtjPk3tPCn1uu/fOagBAAQO399tUmrnSandli0oA1BtFUpB2ba2+5BlRjMOPDjkm/YD9M/UYdMvKgCBzbjC/geHTG7R65uRs/KTG9W9a/yg7+6pHgVQumZVp8E/zyuQQPK1v+eW926O94Z6smzBq9M6//dI0da1PYawyLDtLuGTQbYlWKPgYGVuaCIeTQgHIlyUODbODUo48FdyT7w3+Ui+BpI3bsioRmmyAe30xiPbyyoC8MQPHJSRYBUWPL4/52SJuU0cEVVopYd25R09kHNStK9MKzu0K/eC6FFYQBd27Jm8qUhjWouUkrVT96wLIpA8zXo3aOohvIbkiRvwbJ+n2/gxtkTI0rDpAQwT4Z6cyBzaMGChJ+k9pOKnV3iSMIiEhxLOtjZRXVCeU3heAwDJWyO+VsgPyq36N41fsHHGWQQAyV2bD6xu4Fa9NOuNVd+fRBwYA4B6+r2nfv/PxFU/nBKgRz313r82rg1wmuFr3XXtF+2Sdv85bWuxSj1mpsc8kkdfK1I11SxQObdg6bliVYWoqg+/fuNtacYOS6RoqsY93lB7ULiYsKcKbt8Kh15m9UQb1YUSYeuZQ2XlBEpsgIJi0hJqegAABU8XhJ6Yj0kb1Ss4e96u6ctzFQApOn1032QPeYqz1fF3j9oomDmc5yHorpCi428e26qzrGnBolUz9+0LzYE0TS3Z/OXyf/2aHwgGpaTU11/PujYeABBoCvMTLQhrhIsOtOSUVniw4DoN9moFDAMJhLdFBBIEvEkruJqNIuyLuUiJTs18bmxmggQomP/dtANnNAQgJXdt3vPEvn4nlJwl+3aMvq6DT27Zv3n779ZuoXfeIUHcvQLIKa3mrGulx4N712FqCGmKpkoovsEn8+rHJPliJO30xi3//WL34v2lSqhADSmKphTMe+Pn+tV7P97E56/f5OMJecNePHgSqapqPGfMr9kmg5EjNwdISBCyUxA9mgA4i2CwovpRRCRu3A0uZ+jECFJSs0/njt06rdeghKI/1uyc8MjclzaXIwCQ4wYPSt28+NBZDamnDny/JYgAPGmNR3X02nRz+AEhhBDS1Jydt173Ua1OH6WP/O3HA4XYU64aUoKaGlAv/vnQrd8O/fxkgaLWapt5e6to7JF2hFQFIYCS8//34roFp8sUJZCc1ebzB2tVBUUznY+bniGycAHXRwuHjBlW1grAbrMPKQlzUyAAGFe/RI6IS4BsImaQv+/hoavWKlSO5MloNrJ1VK26d2wZBwAgR0sqAq9cpd/ghq+v33cBUT3CjZPNQAgh9nfrEVIDmgKaquq2yuFdD72JK2iaFtAUUFUVUHD3zA1fdr/l8QZyhzFtb1uzcvpZQ0cN6t2h5hx97tWY1DeaZ1WBjL7t308vlQKmW7HHNJcnRFaOVGGnYyZlnn9ydE42Ojyh3ZRKdGyCngoZyR0GNJG+nd1uwORrBk++ZvDk9oMWTT2LAKS4zi2G1uab2hSH1KCqBjRFJRuGADSkBjQ1qKoK3iB/i+bvDU/R32eAlICqBjVFQQCg5H8zPft8IICiku8fXiPWePolxBwIAKDkwL5x72YfLS/XNDmrZRWPpjr1A8sT5pC5HgJXY4clEQJkupUKQaQiKBHpcxUMndh6o7oXzVh0XjEzy05/t+RCEIHkrzWyf3UvYYIQUjRV0cgBxsvXtICmBHkKCKlBVQloqoJLPSnJNzaN9ujo0YKaEtA0VcdB/rq9Uw6UKopS68bGt6frzKQhRcFOdJSz7o9xU3MKggFNCagq+zAvr0MixESEsNCDFFPjBprkOQua3BVo/Ba8sxo/i5fp79h9xUvNrBXS3EDhhpU9Xj+sv9VPTm39zdfdeiRBwflT7z2yaPJJBAD+zt1Xvty0fpJPBoQCZWe2bhr+9J5sFfztuyx7qVFaUlScF0BTci+WbJny4/2LrNde+Ntes+T5TF0BaUr+xdIt0395cHGxBuBr337pv+rVSvbFegCpSn5eoFzvY4SQz5/4x5YuS6vOGp+eaijk5ZUt+/C3V7aihI6tf3w+rYaklRcF/tyal9IquWqirOQH/pi35eElJcaT2f4bH856v0eMtmNfj4ln8plV9FBA4HTaCIVh3uLnXBzp4NCDI0TsJBH/NqyVZXcPJNz7I5f7Vj0bbIYwTH3kpOA02JW1cVB8V1bHrNsdX6LbqsLbsJzWICyLHlyq+Y5j736o7IsKd8gjLSpCQIAAE1z9MGChB6e7suFBBNyhxEYOLoBCH4O4KDehEoc/zDKdAWGT6x4TXKGrHWK8h5rYpB1EhMIwUcJmAQkUTIEPA5tevhxeJkxUOcwAXJZcQUyAS1joAf/VBHAFEWCnIyyRQPgoASegYApu4cIt+W8JYUDBjVpYmODKI9k46DXMLtOmQHCBEtaEbbfTfjD6yCVutJKDq3FyZexceoSYABdUwUgMFsDcigNEGIkDkYAblIAroDCtD2tC6mrUHNFZ8eCmQBtA2JTgEhNcTT4s9MC8nS1ciJglRrIpECICCgi6oyIUUblQCKu0yABhk1VZGwdFd2XdQgRcEAlPmd/EimwgZZWpULnepSJgYsY/DEDY5FbixkFg3EooYFMNPkSgMlDCZtG5VJdJEsT3unnF+AY1qkXHyBKgsmUvT753GXZ/1Fv9yamjnmrskQAFi0tzju564L5127B3MMZ377vhrWZJRzbeMmYd9m5G8He6YcVLzbEF2eJF//nm2XVw7WOjPhtatXq0lpdbum3y7PtPtP2ZUCu3tpTGRBfMmXnT1qbLCYUAxEXHy0rOsdO/LNz47txT542tZbzl0MgAAZFjAriwIJIyLxsRSVebAnlCBC62e9n4UfwDCMGlX5Z3HPjT8jItqCCQom68rWUDj6UTe02b2zMkXffgd3M63Y0jA0CK7T+kYTUZvBnNR7UjnGlg02/XD1oY2gqau/eBgV8/u04F0P78/cD+/LwfXprWru+XY+bkl9Fqn7frq3++uHXaBQVQYNOq6wctwBQ+bX7jF3f8kJvUKOPup4bPuLemH3FvS7npBF6W3YYgWyF/XFjD0DZBTgZHEtmmQLo1oqbb9BFZrHJ66epiFaSopm3ubes1uihu4Ih6u387Uc4pEwEgT51mo7L03aYJgwZnJkq0AlmXVK93r7mv1ln/8szxP+eVC9VCnwvbd369qVCjKAEBChav/Wbn+iACydvs5sbNvGEdqaCjwtgkxgj1gXAz1oAAQI5oU2BFUOKSTsQ9iIKrZ+/aryDwJN56W6MUCQEgb2bLu9P/mrzafE8vtdvP03JAi/j560K7Tbu1GlidXzYAgBTdfsyQmfd6Pn5s/gc7S6kCqZ7wtr5h7VcdknbvnralWKXbiwAQeJCMVE0NauVBRsHlIYt2koLbnhf2uVCiq8t4wt6A12JuW0UHEBadsLaWjnJo1+QtQQSQ0LXd7XUlAF/XES1KFuzYGhAYxtQZ3Tswe872aUsvKgBSdN3RfavJ5F7RUPAk9n3mtlmP1Ppz+poFxxSOAudg8bo0pKmaqmiqigCk6ISbxrbqBEG1vGDVrD+NF+y6OAFckYSoq5lOdqNJwkKX4G6F3VqMGOOIiUSchdOJkFFIc61w4cwD5zSQfKl3Dk+rktLk3s7npiwpELzmXEru1qrn8T1zTgT/XLJnRxCBJLcc0LK9+ctZWJOk+LThfVLiPDF9nh78TNsoCSidkJpcve2cjU+d3fLkiS/b1ZXwahFSApoaQAmZk+bec2D5HV8OqnJ+4+bH7v9+7IJ8xQ4NeGeGu+slXKrgDyu7H1S4+zwiIhGhxDWd4AdmSyqFG7fPyNYQSHX6XvPPu9vW/23bTwWCHzOQ4wcPrr150YGzGqgn94V2m6Y3H9XJz+qi/P0vvPbnUQVJsbUee2fgg43pdSCdGJSz227t/E6tDu+m3/GrsaU01FpNC2pKULmw7x/Dpt/6xYkCRUtt22BE62jelTROD6KLjnA6UIgJ4BVCYAKDBdZzLhnGBQYNeRgzJvFxEjk8rCjnvp19ohSBHN/wsaHa93NPlwnK9GS0GNUm6rp/3rV18YPbFo16qpmkIgC5Sv8hofkKWa96asXy0W8fyVGRlFjnhXf73JaOP0iHkBrQ1ICmKvrZrRz+46E395+29p5qSAmoakBTFISCu2dt+PpguaLJHUa3H1HTKMSOHmx7Q9SNzpiIcHwddp/ziqgslDgCRYAVo02nlm1dkgsgSfmrt808IfrlDE+HQc2l6TPa9vssa8BnWQM+a9d/Tmi3aZc2Q9PwwhFCGtI0BOqhuYvv/OxYfjAop9R74+3re6dYSpoa1JSgqhJPw/latHx3RPXQllItENo1CAiCud98e/h8MID8yfcNrxnnjIZwTp4IMeHytAfguhVuiU6+RtQgIFASHlAoBUan6Mjbz/84/rWlD358IFe/jjRVTJqJrT/qhsLvFp4z93BC+alvF58PIgBfrZH9axpuQ9PUgKYEtNCoB3Z8s/jBWWeLgkFfeqMPJ3bsGG/uBg1oOjFgDfOmJPdqHONBCJD+pEJQU1SdqPPX7516oFRRg7V6NL4ttKXUEQ3insGpNKwhwDBBTSxYNTNI0dW6AIS9KRCct47ayEG0e9TeML53v1/HN6yR4iu/WLzu02/vW1ioWbfsowe/etcrXeNqJXqNFdI/Hny+8LEve/RIhoLzJ999eM7kEwgA/F16rny1ef0ErywhVF56euuGUTOTPn+uUe2qUbEe0JRg3sWiJW/Pen6DCp64Ac/1e79nnBe0ssLiravO1OycmprsryID0oJ5FwMBpJ82CPy+hD82X7u02swn0lOTfbEyaKqSn1e67KOVr27VEjq2Wfxceg1ZKyss27tw612zLwl+c1QElNDIirvLBmEAQF1qcaHDSBCABQ49uIWIJXSxddRGbmQ53PeI7LbI37mN1GbkIrVCjjoOmAACFiKHxUgwGflQk47QMPbyVHy7FyLz3Wwg5WjwQmQDdvmCU3uc0WCfy8WEyMQBFrqE904wO4gIhe5QYp8FJFZsdnlxD/jvpAr74A6XDqe1ywIriAngwkL/ctp9Di738jiiBMKhE1LBgVe4BXJDZaEnUk5yxQ1uaiFRUGmYoDVFu8/BiUiAMaTN8UaHs3uUq4CpkRNqBwu7Wi5nCIMV3GuKSMLGNjyqoCSi3eeMJDwioeoL92WBLrGCaXI6QbJJVTS4HZvwSnHUcUESNllh7xCz330OnLG3iMRJk5clphOuId1cJ02xgBO51QAAAEFJREFU1f9+ehohhbgmCVEWS7e2mljKze5zntB0n3YoERUSyrIFCmsrKseN/t8cwkUiM3QVBQQIMCHSZ08kBAD/D1hnwngkQADGAAAAAElFTkSuQmCC';
    [['apple-touch-icon', icoData], ['apple-touch-icon-precomposed', icoData], ['icon', icoData]].forEach(function(pair){
      var l = document.createElement('link'); l.rel = pair[0]; l.href = pair[1];
      if (pair[0]==='icon') l.type = 'image/png';
      document.head.appendChild(l);
    });
    var mt = document.createElement('meta'); mt.name = 'apple-mobile-web-app-title'; mt.content = 'Pattern Maker';
    document.head.appendChild(mt);
    var tc = document.createElement('meta'); tc.name = 'theme-color'; tc.content = 'var(--surface-2)';
    document.head.appendChild(tc);
  } catch(e) {}
})();



// ── Export all app functions ──
try{window._init=_init;}catch(_e){}
try{window.addCustomGradeSize=addCustomGradeSize;}catch(_e){}
try{window.adminLogoTap=adminLogoTap;}catch(_e){}
try{window.adminSetTier=adminSetTier;}catch(_e){}
try{window.analyzeUpload=analyzeUpload;}catch(_e){}
try{window.applyUploadAnalysis=applyUploadAnalysis;}catch(_e){}
try{window.arh=arh;}catch(_e){}
try{window.arrowDXF=arrowDXF;}catch(_e){}
try{window.askAdvisorAI=askAdvisorAI;}catch(_e){}
try{window.autoNest=autoNest;}catch(_e){}
try{window.b=b;}catch(_e){}
try{window.bezierToPolyline=bezierToPolyline;}catch(_e){}
try{window.bootStudio=bootStudio;}catch(_e){}
try{window.buildAdvisorHTML=buildAdvisorHTML;}catch(_e){}
try{window.buildCI=buildCI;}catch(_e){}
try{window.buildDXF=buildDXF;}catch(_e){}
try{window.buildDesignGrid=buildDesignGrid;}catch(_e){}
try{window.buildFabricGrid=buildFabricGrid;}catch(_e){}
try{window.buildGarmentGrid=buildGarmentGrid;}catch(_e){}
try{window.buildWT=buildWT;}catch(_e){}
try{window.bumpGenCount=bumpGenCount;}catch(_e){}
try{window.calcEff=calcEff;}catch(_e){}
try{window.canDo=canDo;}catch(_e){}
try{window.closePrint=closePrint;}catch(_e){}
try{window.croquisMaleSVG=croquisMaleSVG;}catch(_e){}
try{window.croquisSVG=croquisSVG;}catch(_e){}
try{window.d=d;}catch(_e){}
try{window.dSvg=dSvg;}catch(_e){}
try{window.deleteProject=deleteProject;}catch(_e){}
try{window.doPrint=doPrint;}catch(_e){}
try{window.downloadDXFFile=downloadDXFFile;}catch(_e){}
try{window.downloadLookImage=downloadLookImage;}catch(_e){}
try{window.downloadSketch=downloadSketch;}catch(_e){}
try{window.drawAll=drawAll;}catch(_e){}
try{window.drawMockupSVG=drawMockupSVG;}catch(_e){}
try{window.drawP=drawP;}catch(_e){}
try{window.ellipseToPolyline=ellipseToPolyline;}catch(_e){}
try{window.exportGradeCSV=exportGradeCSV;}catch(_e){}
try{window.exportGradeDXF=exportGradeDXF;}catch(_e){}
try{window.exportYieldCSV=exportYieldCSV;}catch(_e){}
try{window.fabPatternBg=fabPatternBg;}catch(_e){}
try{window.fabPatternOverlay=fabPatternOverlay;}catch(_e){}
try{window.fileToBase64=fileToBase64;}catch(_e){}
try{window.filterFabrics=filterFabrics;}catch(_e){}
try{window.fitV=fitV;}catch(_e){}
try{window.flipSel=flipSel;}catch(_e){}
try{window.garmentSketchPaths=garmentSketchPaths;}catch(_e){}
try{window.gchip=gchip;}catch(_e){}
try{window.generate=generate;}catch(_e){}
try{window.generateLookImage=generateLookImage;}catch(_e){}
try{window.renderSketch=renderSketch;}catch(_e){}
try{window.renderSketchSVG=renderSketchSVG;}catch(_e){}
try{window.regenerateSketch=regenerateSketch;}catch(_e){}
try{window.sketchPrompt=sketchPrompt;}catch(_e){}
try{window.getAI=getAI;}catch(_e){}
try{window.getDXFVerts=getDXFVerts;}catch(_e){}
try{window.getMockupPaths=getMockupPaths;}catch(_e){}
try{window.gradeFieldDelta=gradeFieldDelta;}catch(_e){}
try{window.gradeMeasurements=gradeMeasurements;}catch(_e){}
try{window.handleLogoTap=handleLogoTap;}catch(_e){}
try{window.hitTest=hitTest;}catch(_e){}
try{window.hr=hr;}catch(_e){}
try{window.initSubscription=initSubscription;}catch(_e){}
try{window.killThemeChrome=killThemeChrome;}catch(_e){}
try{window.line=line;}catch(_e){}
try{window.loadGenCount=loadGenCount;}catch(_e){}
try{window.loadProject=loadProject;}catch(_e){}
try{window.newProject=newProject;}catch(_e){}
try{window.nxt=nxt;}catch(_e){}
try{window.onFW=onFW;}catch(_e){}
try{window.onFileDrop=onFileDrop;}catch(_e){}
try{window.onFileSelect=onFileSelect;}catch(_e){}
try{window.onSA=onSA;}catch(_e){}
try{window.openGrading=openGrading;}catch(_e){}
try{window.openPrint=openPrint;}catch(_e){}
try{window.openProjectPanel=openProjectPanel;}catch(_e){}
try{window.pickDesign=pickDesign;}catch(_e){}
try{window.pickFabric=pickFabric;}catch(_e){}
try{window.pickG=pickG;}catch(_e){}
try{window.polylineEntity=polylineEntity;}catch(_e){}
try{window.processUploadFile=processUploadFile;}catch(_e){}
try{window.readM=readM;}catch(_e){}
try{window.refreshLook=refreshLook;}catch(_e){}
try{window.renderAdvisor=renderAdvisor;}catch(_e){}
try{window.renderChips=renderChips;}catch(_e){}
try{window.renderFabricGrid=renderFabricGrid;}catch(_e){}
try{window.renderGenCounter=renderGenCounter;}catch(_e){}
try{window.renderGradeModal=renderGradeModal;}catch(_e){}
try{window.renderM=renderM;}catch(_e){}
try{window.renderMockup=renderMockup;}catch(_e){}
try{window.renderPL=renderPL;}catch(_e){}
try{window.renderProjectList=renderProjectList;}catch(_e){}
try{window.renderSketch=renderSketch;}catch(_e){}
try{window.requireTier=requireTier;}catch(_e){}
try{window.runAIDesc=runAIDesc;}catch(_e){}
try{window.runPasses=runPasses;}catch(_e){}
try{window.rzCnv=rzCnv;}catch(_e){}
try{window.sPack=sPack;}catch(_e){}
try{window.saveCanvas=saveCanvas;}catch(_e){}
try{window.saveCurrentToProject=saveCurrentToProject;}catch(_e){}
try{window.saveDXF=saveDXF;}catch(_e){}
try{window.saveProjects=saveProjects;}catch(_e){}
try{window.saveSVG=saveSVG;}catch(_e){}
try{window.selExportTab=selExportTab;}catch(_e){}
try{window.selP=selP;}catch(_e){}
try{window.selPaper=selPaper;}catch(_e){}
try{window.setFabCat=setFabCat;}catch(_e){}
try{window.setGradeBase=setGradeBase;}catch(_e){}
try{window.setGrain=setGrain;}catch(_e){}
try{window.setSketchGender=setSketchGender;}catch(_e){}
try{window.setTool=setTool;}catch(_e){}
try{window.sh2=sh2;}catch(_e){}
try{window.shade=shade;}catch(_e){}
try{window.showAdminPanel=showAdminPanel;}catch(_e){}
try{window.showNP=showNP;}catch(_e){}
try{window.showTab=showTab;}catch(_e){}
try{window.showUpgrade=showUpgrade;}catch(_e){}
try{window.showUploadAnalysis=showUploadAnalysis;}catch(_e){}
try{window.showYieldPanel=showYieldPanel;}catch(_e){}
try{window.sketchFabricDefs=sketchFabricDefs;}catch(_e){}
try{window.sketchGenderFor=sketchGenderFor;}catch(_e){}
try{window.specBlockSVG=specBlockSVG;}catch(_e){}
try{window.startCheckout=startCheckout;}catch(_e){}
try{window.stepSum=stepSum;}catch(_e){}
try{window.t=t;}catch(_e){}
try{window.tierBtn=tierBtn;}catch(_e){}
try{window.toast_=toast_;}catch(_e){}
try{window.togV=togV;}catch(_e){}
try{window.toggleGradeSize=toggleGradeSize;}catch(_e){}
try{window.updStats=updStats;}catch(_e){}
try{window.updYieldCost=updYieldCost;}catch(_e){}
try{window.updateProjectBadge=updateProjectBadge;}catch(_e){}
try{window.wait=wait;}catch(_e){}
try{window.zIn=zIn;}catch(_e){}
try{window.zOut=zOut;}catch(_e){}
// ── Self-healing boot: works on hard load, deferred load, or late DOM ──
(function(){
  var booted = false;
  function bootStudio(){
    if (booted) return;
    var grid = document.getElementById('bgrid');
    if (!grid) return;               // DOM not present yet — keep retrying
    booted = true;
    try { if (typeof _init === 'function') _init(); } catch(e) { console.warn('BMF init:', e); }
    try { initSubscription(); } catch(e) {}
    try { if (grid.children.length === 0 && typeof buildG === 'function') buildG(); } catch(e) {}
  }
  bootStudio();
  if (!booted) {
    document.addEventListener('DOMContentLoaded', bootStudio);
    var tries = 0;
    var iv = setInterval(function(){
      bootStudio();
      if (booted || ++tries > 50) clearInterval(iv);
    }, 200);
  }
})();
/* ═══ PATTERN STUDIO — photoreal render client (appended by patch-engine) ═══ */
var PS_ACCOUNT = { user: null, profile: null, ready: false };
function psRenderContext(extra){
  var cfg = (typeof DESIGNS!=='undefined' && S.g) ? DESIGNS[S.g] : null;
  var st  = cfg && cfg.styles ? cfg.styles.find(function(s){return s.id===S.design;}) : null;
  var f   = (typeof selectedFabric!=='undefined' && selectedFabric) ? selectedFabric : null;
  var chips=[]; try{ document.querySelectorAll('#schips .chip.on').forEach(function(c){chips.push(c.textContent.trim());}); }catch(e){}
  var m = {}; try{ m = (typeof readM==='function') ? readM() : (S.m||{}); }catch(e){ m=S.m||{}; }
  var ctx = {
    garmentId: S.g, garment: cfg ? cfg.label : S.g, style: st ? st.name : S.design, styleSub: st ? (st.sub||'') : '',
    chips: chips,
    fabric: f ? { name:f.name, hex:f.hex||f.color, pattern:f.pattern, category:f.category, desc:(f.desc||'').slice(0,160), img:f.img||'' } : null,
    body: { bust:m.bust, waist:m.waist, hips:m.hips },
    fit: { ease: S.fit ? S.fit.ease : 0 },
    gender: psGender(),
    model: psDefaultModel(), setting: 'Clean studio', mode: 'photo'
  };
  for (var k in (extra||{})) ctx[k]=extra[k];
  return ctx;
}
/* rasterise the technical croquis (garment paths only; the CDN figure is dropped) so the model wears the drafted design */
function psSketchPNG(){
  return new Promise(function(res){
    try {
      var svg = document.querySelector('#sketchSvgHost svg'); if (!svg) return res(null);
      var cl = svg.cloneNode(true); cl.querySelectorAll('image').forEach(function(i){ i.remove(); });
      var vb = (cl.getAttribute('viewBox')||'0 0 300 760').split(/\s+/).map(Number); var w = vb[2]||300, h = vb[3]||760;
      cl.setAttribute('width', w); cl.setAttribute('height', h); cl.setAttribute('xmlns','http://www.w3.org/2000/svg');
      var bg = document.createElementNS('http://www.w3.org/2000/svg','rect'); bg.setAttribute('width','100%'); bg.setAttribute('height','100%'); bg.setAttribute('fill','#ffffff'); cl.insertBefore(bg, cl.firstChild);
      var blob = new Blob([new XMLSerializer().serializeToString(cl)], {type:'image/svg+xml;charset=utf-8'}); var url = URL.createObjectURL(blob);
      var img = new Image(); img.onload = function(){ try { var cv=document.createElement('canvas'); var sc=Math.min(2, 900/h); cv.width=w*sc; cv.height=h*sc; var x=cv.getContext('2d'); x.fillStyle='#fff'; x.fillRect(0,0,cv.width,cv.height); x.drawImage(img,0,0,cv.width,cv.height); res(cv.toDataURL('image/jpeg', 0.85)); } catch(e){ res(null); } URL.revokeObjectURL(url); };
      img.onerror = function(){ URL.revokeObjectURL(url); res(null); }; img.src = url;
    } catch(e) { res(null); }
  });
}
async function psRender(ctx, aspect){
  if (!ctx.sketch) { try { ctx.sketch = await psSketchPNG(); } catch(e) {} }
  var r = await fetch((PS.renderApi||'/api/render'), { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ context: ctx, aspect: aspect||'3:4' }) });
  var j = await r.json().catch(function(){return {};});
  if (!r.ok || !j.image) throw new Error((j && (j.error + (j.detail? ': '+[].concat(j.detail).join(' | '):''))) || ('HTTP '+r.status));
  return j;
}
/* ── model gender: 'f' | 'm' — shared by croquis, render panel and Look tab ── */
var PS_MODELS = {
  f: [['woman_25_diverse','Woman · 25'],['woman_30_athletic','Woman · athletic'],['woman_40_curvy','Woman · curvy'],['woman_20_petite','Woman · petite'],['woman_50_elegant','Woman · 50+']],
  m: [['man_28_athletic','Man · athletic'],['man_25_slim','Man · slim'],['man_32_muscular','Man · muscular'],['man_40_plus','Man · plus-size'],['man_50_distinguished','Man · 50+']]
};
function psGenderAllowed(){ return !(typeof SKETCH_FEMALE_ONLY!=='undefined' && S.g && SKETCH_FEMALE_ONLY[S.g]); }
function psGender(){ var g = (typeof sketchGenderFor==='function' && S.g) ? sketchGenderFor(S.g) : 'f'; return g==='m' ? 'm' : 'f'; }
function psDefaultModel(){ return PS_MODELS[psGender()][0][0]; }
function psSetGender(g){
  if (g==='m' && !psGenderAllowed()) { toast_('This garment is drafted on a women\'s block'); g='f'; }
  if (typeof setSketchGender==='function') setSketchGender(g);   // re-draws the croquis on the matching figure
  psSyncGenderUI();
}
function psSyncGenderUI(){
  var g = psGender(), allowed = psGenderAllowed();
  document.querySelectorAll('.ps-gender').forEach(function(w){
    w.querySelectorAll('button').forEach(function(b){ b.classList.toggle('on', b.dataset.g===g); b.disabled = (b.dataset.g==='m' && !allowed); });
    w.title = allowed ? '' : 'Drafted on a women\'s block';
  });
  ['psRenderModel','look-model-sel'].forEach(function(id){
    var sel=document.getElementById(id); if(!sel) return;
    var cur=sel.value; sel.innerHTML='';
    PS_MODELS[g].forEach(function(o){ var op=document.createElement('option'); op.value=o[0]; op.textContent=o[1]; sel.appendChild(op); });
    if ([].some.call(sel.options,function(o){return o.value===cur;})) sel.value=cur;
  });
}
function psGenderToggleHTML(){ return '<div class="ps-gender" role="group" aria-label="Model"><button type="button" data-g="f" onclick="psSetGender(\'f\')">Woman</button><button type="button" data-g="m" onclick="psSetGender(\'m\')">Man</button></div>'; }
/* Look tab: put the toggle above its form and swap the model list */
function psMountLookGender(){
  var sel=document.getElementById('look-model-sel'); if(!sel || document.getElementById('psLookGender')) return;
  var holder=document.createElement('div'); holder.id='psLookGender'; holder.style.marginBottom='10px'; holder.innerHTML=psGenderToggleHTML();
  var card=sel.closest('[style*="border-radius"]') || sel.parentElement.parentElement; card.insertBefore(holder, card.firstChild);
}
/* Fabric-step panel: "Render on model" */
function psEnsureRenderPanel(){
  var panel = document.getElementById('sketchPanel'); if (!panel) return null;
  var box = document.getElementById('psRenderBox');
  if (box) return box;
  box = document.createElement('div'); box.id='psRenderBox';
  box.innerHTML =
    '<div class="ps-render-head">'
    + '<div><div class="ps-render-title">&#10022; See it on a model</div><div class="ps-render-sub">Photoreal look built from your garment, style, construction details, measurements and the exact fabric you picked</div></div>'
    + '<div class="ps-render-ctl">'
    + psGenderToggleHTML()
    + '<select id="psRenderModel" class="mi"></select>'
    + '<select id="psRenderSetting" class="mi"><option value="Clean studio">Studio</option><option value="runway">Runway</option><option value="beach">Beach</option><option value="street">Street</option><option value="cosplay">Cosplay booth</option></select>'
    + '<button type="button" id="psRenderBtn" class="btn-next" onclick="psRenderOnModel()">Render &#8594;</button>'
    + '</div></div>'
    + '<div id="psRenderStage" class="ps-render-stage"><div class="ps-render-empty"><div class="ps-render-cta"><button type="button" class="btn-next" onclick="psRenderOnModel()">&#10022; Render on model</button></div>Uses the fabric you selected above. About 20&ndash;40 seconds.</div></div>';
  // the photoreal render leads; the technical croquis folds underneath
  var det = document.createElement('details'); det.className='ps-croquis';
  det.innerHTML = '<summary><span>&#9998; Technical croquis &amp; spec sheet</span><i>flat sketch for the cutter</i></summary>';
  var keep = Array.prototype.slice.call(panel.childNodes); keep.forEach(function(n){ det.appendChild(n); });
  panel.appendChild(box); panel.appendChild(det);
  psSyncGenderUI();
  return box;
}
async function psRenderOnModel(){
  if (!S.g || !S.design) { toast_('Choose a garment and a design style first'); return; }
  var box = psEnsureRenderPanel(); if (!box) return;
  var stage = document.getElementById('psRenderStage'), btn = document.getElementById('psRenderBtn');
  var model = (document.getElementById('psRenderModel')||{}).value, setting=(document.getElementById('psRenderSetting')||{}).value;
  btn.disabled = true; btn.textContent = 'Rendering…';
  stage.innerHTML = '<div class="ps-render-loading"><div class="ai-spin"></div><div>Dressing the model in <b>'+(selectedFabric?selectedFabric.name:'your fabric')+'</b>…</div></div>';
  try {
    var ctx = psRenderContext({ model: model, setting: setting, mode: 'photo' });
    var out = await psRender(ctx, '3:4');
    window.__psLastRender = out.image;
    stage.innerHTML = '<img class="ps-render-img" src="'+out.image+'" alt="Rendered look">'
      + '<div class="ps-render-meta"><span>'+ctx.garment+' · '+ctx.style+(ctx.fabric?' · '+ctx.fabric.name:'')+(out.usedFabricPhoto?' · real fabric photo used':'')+'</span>'
      + '<span><button type="button" class="btn-back" onclick="psDownloadRender()">Download</button> <button type="button" class="btn-back" onclick="psRenderOnModel()">Re-render</button></span></div>';
    toast_('Look rendered ✓');
  } catch (e) {
    stage.innerHTML = '<div class="ps-render-empty" style="color:var(--danger)">Render failed — '+(e.message||'try again')+'</div>';
  }
  btn.disabled = false; btn.textContent = 'Render →';
}
function psDownloadRender(){ if(!window.__psLastRender)return; var a=document.createElement('a'); a.href=window.__psLastRender; a.download='pattern-studio-look.png'; document.body.appendChild(a); a.click(); a.remove(); }
/* keep the panel alive whenever the sketch re-renders */
(function(){ var _rs = window.renderSketch; if (typeof _rs==='function') window.renderSketch = function(){ _rs.apply(this, arguments); try{ psEnsureRenderPanel(); psSyncGenderUI(); }catch(e){} }; })();
(function(){ var _rl = window.refreshLook; if (typeof _rl==='function') window.refreshLook = function(){ _rl.apply(this, arguments); try{ psMountLookGender(); psSyncGenderUI(); }catch(e){} }; })();

/* ═══ PATTERN STUDIO — accounts, cloud projects, plan gating, billing (appended by patch-engine) ═══ */
var PS_SB = null; PS_ACCOUNT = (typeof PS_ACCOUNT==='object' && PS_ACCOUNT) ? PS_ACCOUNT : { user: null, profile: null, ready: false };
var PS_PLAN_PRICE = '$35 / month';
(function(){
  try {
    if (window.supabase && PS.supabaseUrl && PS.supabaseAnonKey) {
      PS_SB = window.supabase.createClient(PS.supabaseUrl, PS.supabaseAnonKey, { db: { schema: 'studio' }, auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
    }
  } catch (e) { console.warn('supabase init failed', e); }
})();
function psIsPro(){ if (typeof PS_ACCOUNT!=='object'||!PS_ACCOUNT) return false; var p = PS_ACCOUNT.profile; if (!p) return false; if (p.plan === 'admin') return true; return p.plan === 'pro' && (['active','trialing'].indexOf(p.subscription_status) >= 0 || (p.current_period_end && new Date(p.current_period_end) > new Date())); }
function psIsAdmin(){ if (typeof PS_ACCOUNT!=='object'||!PS_ACCOUNT) return false; var p = PS_ACCOUNT.profile; return !!(p && (p.plan === 'admin' || (PS_ACCOUNT.user && PS_ACCOUNT.user.email === 'siamakk2@gmail.com'))); }
function psApplyTier(){
  if (typeof PS_ACCOUNT!=='object'||!PS_ACCOUNT) window.PS_ACCOUNT = { user:null, profile:null, ready:false };
  // free tier: draft, nest, croquis, PNG, 3 renders, local projects. pro: everything.
  GATES.free = { gens: Infinity, dxf:false, svg:false, nest:true, grade:false, look:true, projects:3 };
  GATES.pro  = { gens: Infinity, dxf:true,  svg:true,  nest:true, grade:true,  look:true, projects:Infinity };
  if (psIsPro()) { BMF_TIER = 'pro'; BMF_USER = { email: PS_ACCOUNT.user.email, tags: 'ps-pro' }; }
  else { BMF_TIER = 'free'; BMF_USER = null; }
  BMF_GENS_USED = 0; BMF_TIER_READY = true; if (BMF_TIER_RESOLVE) BMF_TIER_RESOLVE(BMF_TIER);
  psRenderAccountUI();
}
/* ── account UI in the top bar ── */
function psRenderAccountUI(){
  var bar = document.querySelector('.ps-actions'); if (!bar) return;
  var el = document.getElementById('psAcct'); if (!el) { el = document.createElement('div'); el.id = 'psAcct'; bar.insertBefore(el, bar.firstChild); }
  if (!PS_SB) { el.innerHTML = ''; return; }
  if (!PS_ACCOUNT) return;
  if (!PS_ACCOUNT.user) {
    el.innerHTML = '<button type="button" class="project-badge ps-signin" onclick="psOpenSignIn()">Sign in</button><button type="button" class="ps-pro-btn" onclick="psShowPricing()">Go Pro · $35/mo</button>';
  } else {
    var pro = psIsPro(), p = PS_ACCOUNT.profile || {}, left = Math.max(0, (p.renders_free_limit||3) - (p.renders_used||0));
    el.innerHTML = '<div class="ps-user"><button type="button" class="project-badge" onclick="psToggleMenu()"><span class="ps-avatar">'+(PS_ACCOUNT.user.email||'?').slice(0,1).toUpperCase()+'</span><span class="ps-plan '+(pro?'pro':'free')+'">'+(pro?(psIsAdmin()?'ADMIN':'PRO'):'FREE · '+left+' render'+(left===1?'':'s')+' left')+'</span></button>'
      + '<div class="ps-menu" id="psMenu"><div class="ps-menu-mail">'+PS_ACCOUNT.user.email+'</div>'
      + (pro ? '<button onclick="psPortal()">Manage billing</button>' : '<button class="hot" onclick="psShowPricing()">Upgrade to Pro — $35/mo</button>')
      + '<button onclick="nxt(\'pgU\');psToggleMenu(false)">My projects</button>'
      + (psIsAdmin() ? '<a href="/admin">Admin dashboard</a>' : '')
      + '<button onclick="psSignOut()">Sign out</button></div></div>';
  }
}
function psToggleMenu(force){ var m = document.getElementById('psMenu'); if (!m) return; var on = typeof force==='boolean' ? force : !m.classList.contains('open'); m.classList.toggle('open', on); }
document.addEventListener('click', function(e){ if (!e.target.closest || !e.target.closest('.ps-user')) psToggleMenu(false); });

/* ── sign in (magic link) ── */
function psOpenSignIn(msg){
  if (!PS_SB) { toast_('Accounts are not configured yet'); return; }
  var old = document.getElementById('psSignIn'); if (old) old.remove();
  var ov = document.createElement('div'); ov.id = 'psSignIn'; ov.className = 'ps-modal';
  ov.innerHTML = '<div class="ps-modal-box"><button class="ps-modal-x" onclick="document.getElementById(\'psSignIn\').remove()">×</button>'
    + '<div class="ps-modal-eyebrow">Pattern Studio</div><h3>Sign in or create your account</h3>'
    + '<p>'+(msg||'Free account: 3 photoreal renders, saved patterns on this device. No password — we email you a one-tap link.')+'</p>'
    + '<form onsubmit="return psSendLink(event)"><input type="email" id="psEmail" class="mi" placeholder="you@studio.com" required autocomplete="email"><button type="submit" class="btn-next" id="psSendBtn">Email me a sign-in link →</button></form>'
    + '<div id="psSignInNote" class="ps-note"></div></div>';
  document.body.appendChild(ov); setTimeout(function(){ var i=document.getElementById('psEmail'); if(i) i.focus(); }, 50);
}
async function psSendLink(e){
  e.preventDefault(); var email = (document.getElementById('psEmail').value||'').trim(); var btn = document.getElementById('psSendBtn'), note = document.getElementById('psSignInNote');
  btn.disabled = true; btn.textContent = 'Sending…';
  try {
    var r = await PS_SB.auth.signInWithOtp({ email: email, options: { emailRedirectTo: location.origin + '/?signedin=1#pgU' } });
    if (r.error) throw r.error;
    note.innerHTML = '<b>Check your inbox.</b> We sent a sign-in link to <b>'+email+'</b>. Open it on this device to come straight back here.';
    btn.textContent = 'Link sent ✓';
  } catch (err) { note.innerHTML = '<span style="color:var(--danger)">'+(err.message||'Could not send the link')+'</span>'; btn.disabled = false; btn.textContent = 'Email me a sign-in link →'; }
  return false;
}
async function psSignOut(){ try { await PS_SB.auth.signOut(); } catch(e){} PS_ACCOUNT.user = null; PS_ACCOUNT.profile = null; psApplyTier(); toast_('Signed out'); }
async function psLoadProfile(){
  try { var r = await PS_SB.rpc('ensure_profile'); if (!r.error && r.data) PS_ACCOUNT.profile = Array.isArray(r.data) ? r.data[0] : r.data; } catch(e){}
  psApplyTier();
}
async function psBoot(){
  if (!PS_SB) { psApplyTier(); return; }
  try { var s = await PS_SB.auth.getSession(); PS_ACCOUNT.user = s.data.session ? s.data.session.user : null; } catch(e){}
  if (PS_ACCOUNT.user) { await psLoadProfile(); psSyncProjects(); } else psApplyTier();
  PS_SB.auth.onAuthStateChange(function(ev, session){
    var was = PS_ACCOUNT.user && PS_ACCOUNT.user.id;
    PS_ACCOUNT.user = session ? session.user : null;
    if (PS_ACCOUNT.user && PS_ACCOUNT.user.id !== was) { psLoadProfile().then(function(){ psSyncProjects(); var m=document.getElementById('psSignIn'); if(m) m.remove(); toast_('Signed in as '+PS_ACCOUNT.user.email); try{ if(/signedin=1/.test(location.search)) { history.replaceState(null,'',location.pathname+location.hash); } }catch(e){} }); }
    else if (!PS_ACCOUNT.user) { PS_ACCOUNT.profile = null; psApplyTier(); }
  });
  PS_ACCOUNT.ready = true;
}

/* ── pricing / upgrade ── */
function psShowPricing(feature){
  var old = document.getElementById('psPricing'); if (old) old.remove();
  var why = { dxf:'DXF export for cutters', svg:'SVG vector export', grade:'Size runs XS–3XL', look:'More photoreal renders', projects:'Unlimited cloud projects', render:'More photoreal renders' }[feature];
  var ov = document.createElement('div'); ov.id = 'psPricing'; ov.className = 'ps-modal';
  ov.innerHTML = '<div class="ps-modal-box ps-pricing"><button class="ps-modal-x" onclick="document.getElementById(\'psPricing\').remove()">×</button>'
    + '<div class="ps-modal-eyebrow">'+(why ? why+' is a Pro feature' : 'Pattern Studio Pro')+'</div><h3>Everything, for <em>'+PS_PLAN_PRICE+'</em></h3>'
    + '<ul class="ps-perks"><li><b>Unlimited photoreal renders</b> — women’s and men’s models, real fabric</li><li><b>DXF &amp; SVG export</b> — send straight to cutters and factories</li><li><b>Size runs</b> — grade XS–3XL with yardage per size</li><li><b>Cloud projects</b> — unlimited, on every device</li><li><b>All 24 garments, 90 styles</b>, drafting, nesting, yardage</li></ul>'
    + '<button class="btn-next ps-cta" onclick="psCheckout()">Start Pro — '+PS_PLAN_PRICE+' →</button>'
    + '<div class="ps-note">Cancel anytime from Manage billing. Free plan keeps drafting, croquis, PNG and 3 renders.</div></div>';
  document.body.appendChild(ov);
}
window.showUpgrade = function(feature){ psShowPricing(feature); };
async function psCheckout(){
  if (!PS_ACCOUNT.user) { var m=document.getElementById('psPricing'); if(m) m.remove(); psOpenSignIn('Sign in first so your Pro plan is attached to your account.'); return; }
  try {
    var s = await PS_SB.auth.getSession(); var token = s.data.session && s.data.session.access_token;
    var r = await fetch('/api/checkout', { method:'POST', headers:{ 'Content-Type':'application/json', 'Authorization':'Bearer '+token }, body: JSON.stringify({ returnTo: location.origin + '/?upgraded=1' }) });
    var j = await r.json(); if (!r.ok || !j.url) throw new Error(j.error || 'Checkout unavailable');
    location.href = j.url;
  } catch (e) { toast_(e.message || 'Checkout failed'); }
}
async function psPortal(){
  try { var s = await PS_SB.auth.getSession(); var token = s.data.session && s.data.session.access_token;
    var r = await fetch('/api/portal', { method:'POST', headers:{ 'Authorization':'Bearer '+token } }); var j = await r.json(); if (!r.ok || !j.url) throw new Error(j.error||'Portal unavailable'); location.href = j.url;
  } catch (e) { toast_(e.message); }
}

/* ── render quota (server-enforced for signed-in users) ── */
(function(){
  var _render = window.psRender;
  window.psRender = async function(ctx, aspect){
    if (PS_SB && PS_ACCOUNT.user) {
      var q = await PS_SB.rpc('consume_render'); var d = q.data || {};
      if (q.error) console.warn(q.error);
      else if (!d.ok) { psShowPricing('render'); throw new Error('You’ve used your 3 free renders — Pro is unlimited.'); }
      var out = await _render(ctx, aspect);
      psLoadProfile();
      try { PS_SB.from('renders').insert({ user_id: PS_ACCOUNT.user.id, garment: ctx.garment, style: ctx.style, fabric: ctx.fabric && ctx.fabric.name, model: ctx.model, setting: ctx.setting, image_url: await psThumb(out.image, 360), prompt: (out.prompt||'').slice(0, 2000), qa: out.qa || null, model_used: out.model }).then(function(){}); } catch(e){}
      return out;
    }
    // anonymous: one render, then ask for a free account
    var used = parseInt(localStorage.getItem('ps_anon_renders')||'0', 10);
    if (used >= 1) { psOpenSignIn('You’ve seen one render. Create a free account for 3 more — Pro is unlimited.'); throw new Error('Sign in to keep rendering'); }
    var out2 = await _render(ctx, aspect); localStorage.setItem('ps_anon_renders', String(used+1)); return out2;
  };
})();
function psThumb(dataUrl, w){ return new Promise(function(res){ try { var img=new Image(); img.onload=function(){ var c=document.createElement('canvas'); var h=Math.round(w*img.height/img.width); c.width=w; c.height=h; c.getContext('2d').drawImage(img,0,0,w,h); res(c.toDataURL('image/jpeg',.8)); }; img.onerror=function(){res(null)}; img.src=dataUrl; } catch(e){ res(null); } }); }

/* ── unified projects: local mirror + cloud when signed in ── */
function psLocalProjects(){ try { return JSON.parse(localStorage.getItem('bmf_projects')||'[]'); } catch(e){ return []; } }
function psSetLocalProjects(list){ try { localStorage.setItem('bmf_projects', JSON.stringify(list.slice(0, 50))); } catch(e){} }
function psSnapshotProject(existing){
  var cfg = DESIGNS[S.g]; var st = cfg && cfg.styles.find(function(s){return s.id===S.design;});
  var chips=[]; try{ document.querySelectorAll('#schips .chip.on').forEach(function(c){chips.push(c.textContent.trim());}); }catch(e){}
  var f = (typeof selectedFabric!=='undefined' && selectedFabric) ? selectedFabric : null;
  return {
    id: (existing && existing.id) || ('p_'+Date.now()),
    name: (existing && existing.name) || ((cfg?cfg.label:S.g)+' — '+(st?st.name:S.design)+(f?' · '+f.name:'')),
    garment: S.g, design: S.design, m: JSON.parse(JSON.stringify(S.m||{})), fit: JSON.parse(JSON.stringify(S.fit||{})),
    fab: S.fab, grain: S.grain, sa: S.sa, fw: S.fw, fabricId: f ? f.id : '', chips: chips, gender: (typeof psGender==='function')?psGender():'f',
    savedAt: new Date().toISOString(), pieceCount: (S.ps||[]).length, thumb: window.__psLastRenderThumb || null
  };
}
window.saveProject = async function(){
  if(!S.g||!S.design){ toast_('Pick a garment and style first'); return; }
  var list = psLocalProjects();
  if (!psIsPro() && list.length >= GATES.free.projects && !list.some(function(p){return p.garment===S.g&&p.design===S.design;})) { psShowPricing('projects'); return; }
  var proj = psSnapshotProject(null);
  if (!proj.thumb && window.__psLastRender) { try { proj.thumb = await psThumb(window.__psLastRender, 160); } catch(e){} }
  list.unshift(proj); psSetLocalProjects(list);
  toast_('Saved: '+proj.name);
  if (PS_SB && PS_ACCOUNT.user) {
    var cfg = DESIGNS[S.g]; var st = cfg && cfg.styles.find(function(s){return s.id===S.design;});
    var r = await PS_SB.from('projects').upsert({ user_id: PS_ACCOUNT.user.id, local_id: proj.id, name: proj.name, garment: cfg?cfg.label:S.g, style: st?st.name:S.design, fabric: proj.fabricId, data: proj, thumb: proj.thumb }, { onConflict: 'user_id,local_id' });
    if (r.error) console.warn('cloud save failed', r.error); else toast_('Synced to your cloud projects ✓');
  }
  renderProjectsList();
};
window.loadProject = function(id){
  var proj = psLocalProjects().find(function(p){return p.id===id;}); if(!proj){ toast_('Project not found'); return; }
  S.g = proj.garment; S.design = proj.design; S.m = proj.m||{}; S.fit = proj.fit||S.fit; S.fab = proj.fab||'stretch'; S.grain = proj.grain||'vertical'; S.sa = proj.sa||.5; S.fw = proj.fw||60;
  try {
    if (typeof renderM==='function') renderM(proj.garment); if (typeof renderChips==='function') renderChips(proj.garment); if (typeof buildDesignGrid==='function') buildDesignGrid(proj.garment);
    var d = document.getElementById('dcard_'+proj.design); if (d && typeof pickDesign==='function') pickDesign(d, proj.design, proj.garment);
    document.querySelectorAll('.gc').forEach(function(b){ b.classList.toggle('on', (b.getAttribute('onclick')||'').indexOf("'"+proj.garment+"'")>=0); });
    Object.keys(proj.m||{}).forEach(function(k){ var el=document.getElementById('m_'+k); if(el) el.value=proj.m[k]; });
    (proj.chips||[]).forEach(function(t){ document.querySelectorAll('#schips .chip').forEach(function(c){ if(c.textContent.trim()===t) c.classList.add('on'); }); });
    if (proj.fabricId && typeof pickFabric==='function') { try { pickFabric(proj.fabricId); } catch(e){} }
    if (proj.gender && typeof setSketchGender==='function') setSketchGender(proj.gender);
  } catch(e){ console.warn(e); }
  toast_('Opened: '+proj.name);
  setTimeout(function(){ try { generate(); nxt('pg5'); } catch(e){ nxt('pg2'); } }, 250);
};
window.deleteProject = async function(id, e){
  if (e && e.stopPropagation) e.stopPropagation();
  psSetLocalProjects(psLocalProjects().filter(function(p){return p.id!==id;}));
  if (PS_SB && PS_ACCOUNT.user) { try { await PS_SB.from('projects').delete().match({ user_id: PS_ACCOUNT.user.id, local_id: id }); } catch(e){} }
  renderProjectsList(); toast_('Project deleted');
};
async function psSyncProjects(){
  if (!PS_SB || !PS_ACCOUNT.user) return;
  try {
    var r = await PS_SB.from('projects').select('local_id,name,data,updated_at').order('updated_at', { ascending:false }); if (r.error) return;
    var local = psLocalProjects(); var byId = {}; local.forEach(function(p){ byId[p.id]=p; });
    (r.data||[]).forEach(function(row){ var p = row.data || {}; p.id = row.local_id || p.id; p.name = row.name || p.name; if (!byId[p.id]) { local.push(p); byId[p.id]=p; } });
    local.sort(function(a,b){ return (b.savedAt||'').localeCompare(a.savedAt||''); }); psSetLocalProjects(local);
    // push local-only projects up (pro only)
    if (psIsPro()) { var cloudIds = {}; (r.data||[]).forEach(function(x){ cloudIds[x.local_id]=1; });
      var missing = local.filter(function(p){ return !cloudIds[p.id]; }).slice(0, 20);
      for (var i=0;i<missing.length;i++){ var p=missing[i]; var cfg=DESIGNS[p.garment]; await PS_SB.from('projects').upsert({ user_id: PS_ACCOUNT.user.id, local_id: p.id, name: p.name, garment: cfg?cfg.label:p.garment, style: p.design, fabric: p.fabricId||'', data: p, thumb: p.thumb||null }, { onConflict:'user_id,local_id' }); } }
    renderProjectsList();
  } catch(e){ console.warn('sync', e); }
}
window.renderProjectsList = function(){
  var el = document.getElementById('projectsList'); if (!el) return;
  var projects = psLocalProjects(); var pro = psIsPro(); var signed = !!PS_ACCOUNT.user;
  var html = '<div class="ps-proj-head"><div>'+(pro ? '<b>Cloud projects</b> · unlimited · synced to your account' : signed ? '<b>Projects on this device</b> · '+projects.length+' of '+GATES.free.projects+' · <a href="#" onclick="psShowPricing(\'projects\');return false">Go Pro for cloud sync</a>' : '<b>Projects on this device</b> · '+projects.length+' of '+GATES.free.projects+' · <a href="#" onclick="psOpenSignIn();return false">Sign in</a> to keep them')+'</div>'
    + '<button class="btn-next" onclick="saveProject()">+ Save current pattern</button></div>';
  if (!projects.length) html += '<div class="ps-proj-empty"><div class="ps-proj-empty-ico">&#9998;</div><b>No saved projects yet</b><p>Generate a pattern, then save it here. Pro members get every project on every device.</p><button class="btn-back" onclick="nxt(\'pg1\')">Start a new pattern →</button></div>';
  else html += '<div class="ps-proj-grid">' + projects.map(function(p){ var cfg=DESIGNS[p.garment]; var d=new Date(p.savedAt||Date.now()).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
      return '<div class="ps-proj" onclick="loadProject(\''+p.id+'\')">'+(p.thumb?'<img src="'+p.thumb+'" alt="">':'<div class="ps-proj-ph">'+(cfg&&typeof ICONS!=='undefined'&&ICONS[p.garment]?ICONS[p.garment]:'&#9998;')+'</div>')
        + '<div class="ps-proj-body"><div class="ps-proj-name">'+(p.name||'Untitled')+'</div><div class="ps-proj-meta">'+d+' · '+(p.pieceCount||0)+' pieces</div></div>'
        + '<button class="ps-proj-del" title="Delete" onclick="deleteProject(\''+p.id+'\',event)">&times;</button></div>'; }).join('') + '</div>';
  el.innerHTML = html;
};
(function(){ var _r = window.psRenderOnModel; })();
// remember last render thumb for project cards
(function(){ var _d = Object.getOwnPropertyDescriptor(window, '__psLastRender'); var val = window.__psLastRender; Object.defineProperty(window, '__psLastRender', { get: function(){ return val; }, set: function(v){ val = v; if (v) psThumb(v, 160).then(function(t){ window.__psLastRenderThumb = t; }); }, configurable: true }); })();
// boot after the engine mounted
setTimeout(psBoot, 0);
