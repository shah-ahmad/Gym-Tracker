// Schematic muscle maps, drawn as SVG so highlights follow exercise selection.
const catalog={
 'bench press':{primary:'Pectoralis major (chest)',secondary:'Anterior deltoids, triceps',equipment:'Barbell and flat bench',targets:['chest'],assist:['shoulders','triceps'],description:'A horizontal pressing exercise focused on the chest.',notes:'Keep your feet planted and use a controlled range of motion.'},
 'incline dumbbell press':{primary:'Upper pectoralis major',secondary:'Anterior deltoids, triceps',equipment:'Dumbbells and incline bench',targets:['upper-chest'],assist:['shoulders','triceps'],description:'An incline pressing movement emphasizing the upper chest.'},
 'push-up':{primary:'Pectoralis major (chest)',secondary:'Triceps, anterior deltoids, core',equipment:'Body weight',targets:['chest'],assist:['shoulders','triceps','abs'],description:'A body-weight horizontal press with the trunk held stable.'},
 'pull-up':{primary:'Latissimus dorsi (lats)',secondary:'Biceps, middle back, forearms',equipment:'Pull-up bar',targets:['lats'],assist:['biceps','upper-back'],back:true,description:'A vertical pulling movement focused on the lats.'},
 'lat pulldown':{primary:'Latissimus dorsi (lats)',secondary:'Biceps, middle back',equipment:'Cable pulldown machine',targets:['lats'],assist:['biceps','upper-back'],back:true,description:'A cable-based vertical pull focused on the lats.'},
 'barbell row':{primary:'Lats, rhomboids, middle trapezius',secondary:'Rear deltoids, biceps, spinal erectors',equipment:'Barbell',targets:['lats','upper-back'],assist:['shoulders','biceps','lower-back'],back:true,description:'A horizontal pulling exercise for the middle back and lats.'},
 'shoulder press':{primary:'Anterior and middle deltoids',secondary:'Triceps, upper chest',equipment:'Dumbbells or barbell',targets:['shoulders'],assist:['triceps','upper-chest'],description:'An overhead press focused on the shoulders.'},
 'lateral raise':{primary:'Middle deltoids',secondary:'Upper trapezius',equipment:'Dumbbells or cable',targets:['shoulders'],assist:['upper-back'],description:'An arm-raising exercise emphasizing the side of the shoulders.',type:'Isolation'},
 'biceps curl':{primary:'Biceps brachii',secondary:'Brachialis, brachioradialis',equipment:'Dumbbells or barbell',targets:['biceps'],assist:['forearms'],description:'An elbow-flexion exercise focused on the front of the upper arm.',type:'Isolation'},
 'triceps pushdown':{primary:'Triceps brachii',secondary:'Forearm stabilizers',equipment:'Cable machine',targets:['triceps'],assist:['forearms'],back:true,description:'A cable elbow-extension exercise focused on the back of the upper arm.',type:'Isolation'},
 'squat':{primary:'Quadriceps, gluteus maximus',secondary:'Adductors, spinal erectors, core',equipment:'Body weight or barbell',targets:['quads','glutes'],assist:['adductors','lower-back','abs'],description:'A squat pattern that trains the thighs and hips.'},
 'leg press':{primary:'Quadriceps, gluteus maximus',secondary:'Adductors',equipment:'Leg press machine',targets:['quads','glutes'],assist:['adductors'],description:'A supported pressing movement for the thighs and hips.'},
 'plank':{primary:'Rectus abdominis, transverse abdominis',secondary:'Obliques, glutes, shoulder stabilizers',equipment:'Body weight or mat',targets:['abs'],assist:['obliques','glutes','shoulders'],description:'An isometric trunk-stability exercise.',type:'Isometric'}
};
const fallback={Chest:['chest'],Back:['lats','upper-back'],Shoulders:['shoulders'],Arms:['biceps','triceps'],Legs:['quads','glutes'],Core:['abs','obliques']};
export function muscleInfo(exercise){return catalog[exercise.name.toLowerCase().trim()]||{primary:exercise.group,secondary:'Not specified',equipment:'Not specified',targets:fallback[exercise.group]||[],assist:[],description:'Muscle-group overview for this custom exercise.'};}
function shape(id,d,info,extra=''){const primary=info.targets.includes(id)||(id==='upper-chest'&&info.targets.includes('chest'));const secondary=info.assist.includes(id);return `<path class="muscle-region ${primary?'muscle-primary':secondary?'muscle-secondary':''}" d="${d}" ${extra}/>`;}
export function muscleDiagram(info){
 const one=back=>{
  const p=(id,d)=>shape(id,d,info);
  const mirror=markup=>markup+`<g transform="translate(240 0) scale(-1 1)">${markup}</g>`;
  const outline='M105 51 L104 66 Q94 72 79 76 Q62 81 57 102 L48 137 L32 180 L25 205 L19 217 L20 232 L25 235 L28 222 L32 230 L36 226 L36 210 L43 191 L61 165 L72 141 L78 126 Q84 148 81 170 L76 196 Q70 219 77 254 L86 286 L84 309 L92 354 L92 375 L82 389 Q81 397 94 398 L108 391 L110 374 L108 345 L113 313 L111 288 L120 232 L129 288 L127 313 L132 345 L130 374 L132 391 L146 398 Q159 397 158 389 L148 375 L148 354 L156 309 L154 286 L163 254 Q170 219 164 196 L159 170 Q156 148 162 126 L168 141 L179 165 L197 191 L204 210 L204 226 L208 230 L212 222 L215 235 L220 232 L221 217 L215 205 L208 180 L192 137 L183 102 Q178 81 161 76 Q146 72 136 66 L135 51';
  let muscles='';
  muscles+=mirror(p('shoulders','M79 79 Q61 82 59 106 L77 112 Q82 97 96 89 Z'));
  muscles+=mirror(p(back?'triceps':'biceps','M60 110 Q53 128 50 142 L61 156 Q73 143 76 117 Z'));
  muscles+=mirror(p('forearms','M49 148 L35 183 L31 204 L41 194 L58 166 Z'));
  if(back){
   muscles+=mirror(p('upper-back','M106 65 L85 79 L82 100 L114 119 L117 77 Z'));
   muscles+=mirror(p('lats','M82 105 L114 124 L116 170 L89 154 Z'));
   muscles+=mirror(p('lower-back','M94 156 L116 176 L117 202 L87 189 Z'));
   muscles+=mirror(p('glutes','M84 193 Q102 186 117 204 L117 231 Q95 243 79 229 Z'));
   muscles+=mirror(p('hamstrings','M79 236 Q97 248 115 237 L108 281 L93 289 Z'));
   muscles+=mirror(p('calves','M92 299 L107 298 L109 322 L101 355 L93 345 Z'));
  }else{
   muscles+=mirror(p('upper-chest','M94 82 Q110 78 117 88 L117 100 L82 100 Z'));
   muscles+=mirror(p('chest','M82 102 L117 102 L117 122 Q98 133 79 116 Z'));
   muscles+=mirror(p('abs','M100 131 L117 130 L117 149 L99 149 Z M99 153 L117 153 L117 171 L101 171 Z M103 175 L117 175 L117 195 L108 192 Z'));
   muscles+=mirror(p('obliques','M83 126 L95 135 L96 171 L104 193 L87 179 Z'));
   muscles+=mirror(p('quads','M81 205 Q96 199 108 217 L106 250 L99 280 L88 278 L78 244 Z'));
   muscles+=mirror(p('adductors','M110 212 L118 225 L110 267 L105 275 Z'));
   muscles+=mirror(p('calves','M89 297 L100 292 L108 309 L100 344 L94 353 Z'));
  }
  return `<svg viewBox="0 0 240 420" role="img" aria-label="${back?'Back':'Front'} muscle map"><path class="body-outline" d="${outline}"/><path class="body-outline" d="M105 51 Q94 42 98 23 Q99 6 120 6 Q141 6 142 23 Q146 42 135 51 L129 59 L111 59 Z"/>${muscles}<path class="body-lines" d="M120 80V199 M83 286Q95 296 108 287 M132 287Q145 296 157 286 M92 370L107 372 M133 372L148 370"/></svg>`;
 };
 return `<section class="muscle-visual" aria-label="Target muscle illustration"><div class="muscle-map-pair"><figure>${one(false)}<figcaption>Front</figcaption></figure><figure>${one(true)}<figcaption>Back</figcaption></figure></div><div class="muscle-legend"><span><i class="primary-dot"></i>Primary muscles</span><span><i class="secondary-dot"></i>Supporting muscles</span></div><p class="diagram-caption">Schematic overview. Emphasis varies with technique and equipment.</p></section>`;
}
