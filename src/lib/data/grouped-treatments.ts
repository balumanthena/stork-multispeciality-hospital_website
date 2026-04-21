import { cache } from 'react'
import { HARDCODED_TREATMENTS } from './hardcoded-treatments'
import { GroupedTreatmentCategory } from './types'

export type { GroupedTreatmentCategory, BodyRegion } from './types'

export const getGroupedTreatments = cache(async () => {
    return HARDCODED_TREATMENTS as GroupedTreatmentCategory[]
})
