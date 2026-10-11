import {readCatalog, csv, headers, unavailable} from '../_lib/free-tools.mjs';
export async function onRequestGet() {
  try {
    return new Response(csv(await readCatalog()), {headers:{...headers, 'Content-Type':'text/csv; charset=utf-8'}});
  } catch { return unavailable(); }
}
