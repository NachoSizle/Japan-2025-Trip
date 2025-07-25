

/**
 * Chat Fuse.js todo‑en‑uno para el itinerario de Japón 2025
 * =========================================================
 * Este helper responde preguntas sobre el viaje usando búsqueda semántica y reglas custom.
 *
 * 🏗️ Arquitectura:
 * - PWA offline, sin LLM. Todo el razonamiento es local y seguro.
 * - Usa Fuse.js para fallback semántico y búsqueda difusa.
 * - Los datos de vuelos están en flights.json, el itinerario en itinerario.json.
 *
 * 📚 Responde a:
 *   • Duración, fechas de inicio/fin, ciudades, días en ciudad, llegada.
 *   • Planes de un día, hora/día de actividad.
 *   • Vuelos (ida/vuelta – hora, nº, aerolínea, ruta).
 *   • Restaurantes SIN GLUTEN por ciudad / día y actividades con opción GF.
 *   • Alias de ciudades: Tokyo↔Tokio, Kyoto↔Kioto (ignora mayúsculas/acentos).
 *   • Fallback semántico Fuse.js para preguntas libres.
 *
 * ⚙️ Helpers clave:
 * - getLLMResponse: función principal, recibe la pregunta y responde.
 * - findDiasCiudad, searchActividad, gfEnCiudad, todasGf: utilidades para filtrar y buscar.
 * - getVuelo: obtiene vuelo de ida o vuelta según dirección.
 *
 * 🧩 Tipos:
 * - Dia, Actividad, Comida: estructura del itinerario.
 * - Vuelo, VueloSegment, etc: estructura de flights.json.
 *
 * 📝 Ver también: docs/tareas_pendientes.md
 */

import Fuse from "fuse.js";
import itinerary from "../data/itinerario.json";
import flightsData from "../data/flights.json";

// ---------- Tipos mínimos (ajusta a tu JSON real) ----------
export interface Comida {
  nombre: string;
  glutenFree?: boolean;
  [key: string]: any;
}
export interface Actividad {
  hora?: string;
  actividad?: string;
  descripcion?: string;
  [key: string]: any;
}
export interface Dia {
  dia: number;
  fecha: string;
  ciudad: string;
  titulo: string;
  descripcion?: string;
  actividades?: Actividad[];
  comidas?: Comida[];
  notas?: string;
  [key: string]: any;
}

// --- Vuelos ---
export interface VueloFromTo {
  city: string;
  airport: string;
  departure_time?: string;
  arrival_time?: string;
}
export interface VueloStopover {
  city: string;
  airport: string;
  arrival_time: string;
  departure_time: string;
}
export interface VueloSegment {
  flight_number: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  tracking_url?: string;
}
export interface VueloBaggage {
  checked?: string;
  hand?: string;
  personal_item?: string;
}
export interface Vuelo {
  direction: "ida" | "vuelta";
  flight_id: string;
  from: VueloFromTo;
  stopover?: VueloStopover;
  to: VueloFromTo;
  airline: string;
  flight_segments: VueloSegment[];
  baggage?: VueloBaggage;
  notes?: string;
  [key: string]: any;
}


export interface Hotel {
  ciudad: string;
  hotel?: string;
  direccion?: string;
  check_in?: string;
  check_out?: string;
  [key: string]: any;
}
const dias: Dia[] = Array.isArray(itinerary.dias) ? itinerary.dias as Dia[] : [];
const vuelos: Vuelo[] = Array.isArray(flightsData.flights) ? flightsData.flights as Vuelo[] : [];
// const hoteles: Hotel[] = Array.isArray(itinerary.alojamientos) ? itinerary.alojamientos as Hotel[] : [];

// Helpers para vuelos
const getVuelo = (direction: "ida" | "vuelta"): Vuelo | undefined => vuelos.find((v: Vuelo) => v.direction === direction);

// ---------- Normalización y alias ----------
const aliasMap: Record<string,string> = {
  tokyo: "tokio", tokio: "tokio",
  kyoto: "kioto", kioto: "kioto",
  osaka: "osaka"
};
const normalize = (s:string)=>s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,"");
const baseCity = (raw:string)=>aliasMap[normalize(raw)] ?? normalize(raw);
const cap = (s:string)=>s.charAt(0).toUpperCase()+s.slice(1);

// ---------- Fuse.js índice ----------
const fuse = new Fuse<Dia>(dias,{
  keys:["ciudad","titulo","descripcion","actividades.actividad","actividades.descripcion","notas"],
  threshold:0.4,
  includeScore:true
});

// ---------- Helpers ----------
const findDiasCiudad = (c:string)=>dias.filter(d=>baseCity(d.ciudad)===c);
function searchActividad(keyword:string){
  const kw = normalize(keyword);
  for(const d of dias){
    for(const a of d.actividades??[]){
      if(normalize(`${a.actividad??""} ${a.descripcion??""}`).includes(kw)) return {d,a};
    }
  }
  return null;
}
function gfEnCiudad(c:string){
  const out:{d:Dia;c:Comida}[]=[];
  for(const d of dias) if(baseCity(d.ciudad)===c) for(const com of d.comidas??[]) if(com.glutenFree) out.push({d,c:com});
  return out;
}
function todasGf(){
  const res:{d:Dia;c:Comida}[]=[];
  for(const d of dias) for(const com of d.comidas??[]) if(com.glutenFree) res.push({d,c:com});
  return res;
}
// const hotelCiudad = (c:string)=>hoteles.find((h: Hotel)=>baseCity(h.ciudad)===c);

// ---------- Función principal ----------
export async function getLLMResponse(question:string):Promise<string>{
  const q = question.toLowerCase();

  // Duración / fechas
  if(dias.length && /duraci[oó]n.*viaje|cu[aá]nt[oa]s? d[ií]as.*viaje/.test(q)) return `El viaje dura ${dias.length} días, del ${dias[0].fecha} al ${dias[dias.length-1].fecha}.`;
  if(dias.length && /cu[aá]ndo.*(inicia|comienza|empieza).*viaje|fecha.*inicio/.test(q)) return `Empieza el ${dias[0].fecha}.`;
  if(dias.length && /cu[aá]ndo.*(termina|acaba|finaliza).*viaje|fecha.*fin/.test(q)) return `Termina el ${dias[dias.length-1].fecha}.`;

  // Ciudades
  const uniqueCities = dias.length ? [...new Set(dias.map(d=>cap(baseCity(d.ciudad))))] : [];
  if(uniqueCities.length && /cu[aá]ntas? ciudades/.test(q)) return `Visitarás ${uniqueCities.length} ciudades: ${uniqueCities.join(", ")}.`;
  if(uniqueCities.length && /qu[eé] ciudades/.test(q)) return `Las ciudades son: ${uniqueCities.join(", ")}.`;

  // Días en ciudad
  const mCityDays=q.match(/cu[aá]nt[oa]s? d[ií]as?.* en ([a-záéíóúü\- ]+)/);
  if(mCityDays){
    const cBase=baseCity(mCityDays[1]);
    const arr=findDiasCiudad(cBase);
    return arr.length?`Estarás en ${cap(cBase)} ${arr.length} día(s):\n`+arr.map(d=>`- Día ${d.dia} (${d.fecha})`).join("\n"): `No hay ${cap(cBase)} en el itinerario.`;
  }

  // Llegada a ciudad
  const mArr=q.match(/qu[eé] d[ií]a.*(llegamos?|estaremos?).*(?:en |a )([a-záéíóúü\- ]+)/);
  if(mArr){
    const cBase=baseCity(mArr[2]);
    const d=findDiasCiudad(cBase)[0];
    return d?`Llegas a ${cap(cBase)} el Día ${d.dia} (${d.fecha}).`:`No hay ${cap(cBase)} en el itinerario.`;
  }

  // Plan de un día
  const mDia=q.match(/(?:d[ií]a|dia)\s*(\d{1,2})/);
  if(/qu[eé].*(hacemos|planes|hay)/.test(q)&&mDia){
    const num=Number(mDia[1]); const d=dias.find(x=>x.dia===num);
    if(d){
      let rep=`Día ${d.dia} (${d.fecha}) — ${d.ciudad}: ${d.titulo}`;
      if(d.actividades?.length) rep+="\nActividades:"+d.actividades.map(a=>`\n- ${a.hora? a.hora+" — ":""}${a.actividad??a.descripcion??""}`).join("");
      if(d.comidas?.length) rep+="\nComidas:"+d.comidas.map(c=>`\n- ${c.nombre}${c.glutenFree?" (GF)":""}`).join("");
      return rep;
    }
  }

  // Hora / día de actividad
  const mHora=q.match(/a qu[eé] hora.*(?:el |la |los |las )?(.*)/);
  if(mHora){
    const kw=mHora[1].trim();
    const f=searchActividad(kw);
    if(f?.a?.hora) return `${cap(f.a.actividad??kw)} es el Día ${f.d.dia} a las ${f.a.hora}.`;
  }
  const mActDay=q.match(/en qu[eé] d[ií]a.*(?:visitamos?|vamos a|hacemos?).* (.*)/);
  if(mActDay){
    const kw=mActDay[1].trim();
    const f=searchActividad(kw);
    if(f) return `${cap(f.a.actividad??kw)} está programado para el Día ${f.d.dia} (${f.d.fecha}) en ${f.d.ciudad}.`;
  }

  // Restaurantes sin gluten
  const mGF=q.match(/(?:d[oó]nde|restaurantes?|comer).*sin gluten.*(?:en |en la ciudad de )?([a-záéíóúü\- ]+)/);
  if(mGF){
    const cBase=baseCity(mGF[1]);
    const list=gfEnCiudad(cBase);
    return list.length?`Opciones sin gluten en ${cap(cBase)}:`+list.map(x=>`\n- ${x.c.nombre} (Día ${x.d.dia})`).join(""):`No tengo restaurantes sin gluten en ${cap(cBase)}.`;
  }
  if(/(actividades?|d[ií]as?).*(sin|libre de) gluten/.test(q)){
    const all=todasGf();
    return all.length?`Días con restaurantes sin gluten:`+all.map(x=>`\n- Día ${x.d.dia} (${x.d.ciudad}): ${x.c.nombre}`).join(""):`No hay actividades con opción sin gluten.`;  
  }

  // Vuelos
  if(/vuelo de ida|vuelo de salida|primer vuelo/.test(q)){
    const v = getVuelo("ida");
    if(!v) return "No hay datos del vuelo de ida.";
    if(/n[uú]mero/.test(q)) return `El número de vuelo de ida es ${v.flight_segments?.map((fs: VueloSegment)=>fs.flight_number).join(" + ") ?? "desconocido"}.`;
    if(/a qu[eé] hora/.test(q)) return `El vuelo de ida sale de ${v.from.city} a las ${v.from.departure_time?.slice(11,16)}.`;
    return `Vuelo de ida: ${v.airline} (${v.flight_segments?.map((fs: VueloSegment)=>fs.flight_number).join(" + ")}) el ${v.from.departure_time?.slice(0,10)} de ${v.from.city} a ${v.to.city}, salida ${v.from.departure_time?.slice(11,16)} llegada ${v.to.arrival_time?.slice(11,16)}.`;
  }
  if(/vuelo de vuelta|regreso|retorno/.test(q)){
    const v = getVuelo("vuelta");
    if(!v) return "No hay datos del vuelo de vuelta.";
    if(/n[uú]mero/.test(q)) return `El número de vuelo de vuelta es ${v.flight_segments?.map((fs: VueloSegment)=>fs.flight_number).join(" + ") ?? "desconocido"}.`;
    if(/a qu[eé] hora/.test(q)) return `El vuelo de vuelta sale de ${v.from.city} a las ${v.from.departure_time?.slice(11,16)}.`;
    return `Vuelo de vuelta: ${v.airline} (${v.flight_segments?.map((fs: VueloSegment)=>fs.flight_number).join(" + ")}) el ${v.from.departure_time?.slice(0,10)} de ${v.from.city} a ${v.to.city}, salida ${v.from.departure_time?.slice(11,16)} llegada ${v.to.arrival_time?.slice(11,16)}.`;
  }

  // Hoteles
  // const mHotel=q.match(/d[oó]nde nos alojamos? (?:en |en la ciudad de )?([a-záéíóúü\- ]+)/);
  // if(mHotel){
  //   const cBase=baseCity(mHotel[1]);
  //   const h=hotelCiudad(cBase);
  //   return h?`Alojamiento en ${cap(cBase)}: ${h.hotel??"(sin nombre)"}, dirección ${h.direccion??"desconocida"}.`:`No hay alojamiento registrado en ${cap(cBase)}.`;
  // }
  // const mCheck=q.match(/(?:check[- ]?(in|out)).*en ([a-záéíóúü\- ]+)/);
  // if(mCheck){
  //   const tipo=mCheck[1]=="out"?"check_out":"check_in";
  //   const cBase=baseCity(mCheck[2]);
  //   const h=hotelCiudad(cBase);
  //   if(!h||!h[tipo]) return `No tengo la hora de ${mCheck[1]} para ${cap(cBase)}.`;
  //   return `El ${mCheck[1]} en ${cap(cBase)} es a las ${h[tipo]}.`;
  // }

  // Fallback semántico Fuse.js
  const res=fuse.search(question);
  if(res.length){
    const b=res[0].item;
    let rep=`Día ${b.dia} (${b.fecha}) — ${b.ciudad}: ${b.titulo}`;
    if(b.actividades?.length) rep+="\nActividades:"+b.actividades.map(a=>`\n- ${a.hora? a.hora+" — ":""}${a.actividad??a.descripcion??""}`).join("");
    if(b.comidas?.length) rep+="\nComidas:"+b.comidas.map(c=>`\n- ${c.nombre}${c.glutenFree?" (GF)":""}`).join("");
    return rep;
  }

  return "No encuentro esa información en tu itinerario.";
}
