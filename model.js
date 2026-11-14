export const STORAGE_KEY='gymtracker.v1';
export const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
export const uid=()=>crypto.randomUUID();
export function initialState(){const names=[['Bench press','Chest'],['Incline dumbbell press','Chest'],['Push-up','Chest'],['Pull-up','Back'],['Lat pulldown','Back'],['Barbell row','Back'],['Shoulder press','Shoulders'],['Lateral raise','Shoulders'],['Biceps curl','Arms'],['Triceps pushdown','Arms'],['Squat','Legs'],['Leg press','Legs'],['Plank','Core']];const exercises=names.map(([name,group],i)=>({id:`e${i}`,name,group,equipment:'',notes:'',description:'',secondary:'',type:'Compound'}));const plans=[['Push day',[0,1,6,9]],['Pull day',[3,4,5,8]],['Leg day',[10,11]],['Full body',[0,5,10,12]]].map(([name,ids],i)=>({id:`p${i}`,name,description:'',items:ids.map(n=>({exerciseId:`e${n}`,name:exercises[n].name,sets:3,reps:10,weight:0}))}));return {version:1,profile:{name:'Ahmad Shah',email:'',weightUnit:'kg',waterUnit:'ml'},settings:{theme:'teal',density:'compact',weekStart:1,timeFormat:'24',workoutReminder:true,waterReminder:true,weeklySummary:true},goals:{workouts:5,water:3000,weight:60},exercises,plans,water:[],weights:[],sessions:[],active:null};}
export function loadState(storage){const raw=storage.getItem(STORAGE_KEY);if(!raw)return initialState();const s=JSON.parse(raw);if(s.version!==1||!['exercises','plans','water','weights','sessions'].every(k=>Array.isArray(s[k]))||!s.profile||!s.settings||!s.goals)throw new Error('Saved data could not be read. Your existing data has not been overwritten.');return s;}
export function persist(storage,state){storage.setItem(STORAGE_KEY,JSON.stringify(state));}
export function number(value,label,min=0,max=100000,integer=false){const n=Number(value);if(String(value).trim()===''||!Number.isFinite(n)||n<min||n>max||(integer&&!Number.isInteger(n)))throw new Error(`${label} must be ${integer?'a whole number':'a number'} between ${min} and ${max}.`);return n;}
export function validDate(value){if(!/^\d{4}-\d{2}-\d{2}$/.test(value)||Number.isNaN(Date.parse(value+'T12:00:00'))||new Date(value+'T12:00:00Z').toISOString().slice(0,10)!==value||value>today())throw new Error('Choose a valid date that is not in the future.');return value;}
export const volume=session=>session.items.reduce((sum,x)=>sum+x.sets*x.reps*x.weight,0);
export function weekDates(offset=0,start=1){const d=new Date(today()+'T12:00:00');d.setDate(d.getDate()-((d.getDay()-start+7)%7)+offset*7);return Array.from({length:7},(_,i)=>{const x=new Date(d);x.setDate(x.getDate()+i);return `${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,'0')}-${String(x.getDate()).padStart(2,'0')}`;});}
export function completeSession(s,items,now=Date.now()){if(!s.active)throw new Error('Start a session first.');if(!items.length)throw new Error('Record at least one completed exercise.');const session={id:uid(),planName:s.active.planName,date:s.active.date,startedAt:s.active.startedAt,duration:Math.max(0,Math.floor((now-s.active.startedAt)/1000)),items:structuredClone(items)};s.sessions.push(session);s.active=null;return session;}
export const countInDates=(sessions,dates)=>{const set=new Set(dates);return sessions.filter(s=>set.has(s.date)).length;};
export function weeklyTrend(sessions,start=1){const thisWeek=countInDates(sessions,weekDates(0,start)),lastWeek=countInDates(sessions,weekDates(-1,start)),diff=thisWeek-lastWeek;return {thisWeek,lastWeek,diff,trend:diff>0?'up':diff<0?'down':'same'};}
export function monthlyCount(sessions,offset=0,now=new Date()){const d=new Date(now.getFullYear(),now.getMonth()+offset,1),key=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;return sessions.filter(s=>typeof s.date==='string'&&s.date.startsWith(key+'-')).length;}
export const goalPercent=(current,goal)=>{const g=Number(goal),c=Number(current);return g>0&&Number.isFinite(c)&&c>0?Math.min(100,Math.round(c/g*100)):0;};
export const recentSessions=(sessions,limit=4)=>[...sessions].sort((a,b)=>b.date.localeCompare(a.date)||(b.startedAt||0)-(a.startedAt||0)).slice(0,limit);
export const API_BASE='http://127.0.0.1:8000',TOKEN_KEY='gymtracker.token',WATER_GOAL_KEY='gymtracker.waterGoal',DEFAULT_WATER_GOAL=2500,QUICK_ADD_AMOUNTS=[250,500,750];
export class AuthError extends Error{constructor(message='You are not logged in. Sign in to track water.'){super(message);this.name='AuthError';}}
const read=(storage,key)=>{try{return storage.getItem(key);}catch{return null;}};
export const getToken=storage=>read(storage,TOKEN_KEY)||null;
export function getWaterGoal(storage){const n=Number(read(storage,WATER_GOAL_KEY));return Number.isInteger(n)&&n>=1&&n<=20000?n:DEFAULT_WATER_GOAL;}
export function setWaterGoal(storage,value){const n=number(value,'Daily water goal',1,20000,true);storage.setItem(WATER_GOAL_KEY,String(n));return n;}
export async function apiRequest(path,{method='GET',body,token,fetchImpl=globalThis.fetch,base=API_BASE}={}){
  if(!token)throw new AuthError();
  let res;
  try{res=await fetchImpl(base+path,{method,headers:{Authorization:`Bearer ${token}`,...(body?{'Content-Type':'application/json'}:{})},body:body?JSON.stringify(body):undefined});}
  catch{throw new Error(`Could not reach the server at ${base}. Is the backend running?`);}
  if(res.status===401||res.status===403)throw new AuthError('Your session has expired. Please sign in again.');
  if(!res.ok){let detail='';try{const j=await res.json();detail=typeof j.detail==='string'?j.detail:'';}catch{}throw new Error(detail||`Request failed (${res.status}).`);}
  return res.json();
}
export const normalizeEntry=e=>({id:e.id,amount:Number(e.amount_ml)||0,date:e.date,createdAt:e.created_at});
export function normalizeToday(data){const entries=(data?.entries||[]).map(normalizeEntry).sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt)));return {date:data?.date||today(),total:Number(data?.total_ml)||0,entries};}
export const normalizeHistory=rows=>(Array.isArray(rows)?rows:[]).map(r=>({date:r.date,total:Number(r.total_ml)||0})).sort((a,b)=>b.date.localeCompare(a.date));
export const fetchWaterToday=(token,opts={})=>apiRequest('/api/water/today',{...opts,token}).then(normalizeToday);
export const fetchWaterHistory=(token,days=7,opts={})=>apiRequest(`/api/water/history?days=${days}`,{...opts,token}).then(normalizeHistory);
export const addWaterEntry=(token,amountMl,opts={})=>apiRequest('/api/water',{...opts,token,method:'POST',body:{amount_ml:number(amountMl,'Water amount',1,5000,true)}}).then(normalizeEntry);
export async function logWaterAndRefresh(token,amountMl,opts={}){await addWaterEntry(token,amountMl,opts);const [todayData,history]=await Promise.all([fetchWaterToday(token,opts),fetchWaterHistory(token,7,opts)]);return {today:todayData,history};}
export const formatHistoryDay=(date,now=today())=>{if(date===now)return 'Today';const y=new Date(now+'T12:00:00');y.setDate(y.getDate()-1);if(date===`${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,'0')}-${String(y.getDate()).padStart(2,'0')}`)return 'Yesterday';return new Date(date+'T12:00:00').toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'});};
