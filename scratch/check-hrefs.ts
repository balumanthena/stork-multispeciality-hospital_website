import { TREATMENTS_MASTER } from "../src/lib/data/treatments";

const items = TREATMENTS_MASTER.filter(t => ["pldd", "tubectomy", "carpal"].some(k => t.name.toLowerCase().includes(k)));
console.log(items.map(t => ({ name: t.name, href: t.href })));
