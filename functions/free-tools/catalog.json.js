import {readCatalog, headers, unavailable} from '../_lib/free-tools.mjs';
export async function onRequestGet() {
  try {
    return new Response(JSON.stringify(await readCatalog()), {headers:{...headers, 'Content-Type':'application/json; charset=utf-8'}});
  } catch { return unavailable(); }
}
