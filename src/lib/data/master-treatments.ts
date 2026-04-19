import { TREATMENTS_MASTER, slugify as unifiedSlugify } from "./treatments"

export const MASTER_TREATMENTS = TREATMENTS_MASTER.map(t => t.name)

export const slugify = unifiedSlugify
