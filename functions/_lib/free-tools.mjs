// One public data source. Reviewed changes on main reach the directory without a site redeploy.
const source = 'https://raw.githubusercontent.com/manishiitg/free-agent-tools/main/src/free_agent_tools/catalog.json';
export const headers = {
  'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
};
export async function readCatalog() {
  const response = await fetch(source, {cf: {cacheTtl: 300, cacheEverything: true}});
  if (!response.ok) throw new Error('Catalog source unavailable');
  const data = await response.json();
  if (data.schema_version !== 1 || !Array.isArray(data.providers) || !Array.isArray(data.categories)) throw new Error('Invalid catalog source');
  return data;
}
export function unavailable() {
  return new Response('Catalog temporarily unavailable. Please try again.', {status:502, headers:{...headers, 'Cache-Control':'no-store', 'Content-Type':'text/plain; charset=utf-8'}});
}
export function csv(data) {
  const fields = ['id','name','categories','offer_kind','allowance','conditions','sources','last_verified','last_reviewed','status','mcp_support','mcp_setup','agentworks_catalog_name'];
  const escape = value => {
    let text = String(value ?? '');
    if (/^[=+@\-\t\r]/.test(text)) text = "'" + text;
    return /[",\n\r]/.test(text) ? '"' + text.replaceAll('"', '""') + '"' : text;
  };
  const rows = data.providers.map(p => [p.id,p.name,p.categories.join('; '),p.offer.kind,p.offer.summary,p.offer.conditions.join('; '),p.sources.map(s=>s.url).join('; '),p.last_verified,p.last_reviewed,p.status,p.mcp.support,p.mcp.setup_url,p.mcp.agentworks_connector]);
  return [fields,...rows].map(row=>row.map(escape).join(',')).join('\n') + '\n';
}
