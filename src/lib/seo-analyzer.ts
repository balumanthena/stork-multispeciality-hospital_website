export interface SEOAnalysisResult {
    score: number
    status: 'Poor' | 'Average' | 'Good'
    wordCount: number
    keywordDensity: number
    suggestions: { text: string; status: 'pass' | 'fail' | 'warn' }[]
}

export function analyzeSEO(
    title: string,
    description: string,
    content: string,
    keyword: string
): SEOAnalysisResult {
    const suggestions: { text: string; status: 'pass' | 'fail' | 'warn' }[] = []
    let score = 0
    let totalChecks = 0

    const addCheck = (passed: boolean | 'warn', failText: string, passText: string) => {
        totalChecks += 1
        if (passed === true) {
            score += 1
            suggestions.push({ text: passText, status: 'pass' })
        } else if (passed === 'warn') {
            score += 0.5
            suggestions.push({ text: failText, status: 'warn' })
        } else {
            suggestions.push({ text: failText, status: 'fail' })
        }
    }

    // 1. Title Length
    const titleLen = title.length
    if (titleLen === 0) {
        addCheck(false, "Title is missing.", "")
    } else if (titleLen >= 50 && titleLen <= 60) {
        addCheck(true, "", "Title length is optimal (50-60 chars).")
    } else if (titleLen > 60) {
        addCheck('warn', "Title is too long (over 60 chars).", "")
    } else {
        addCheck('warn', "Title is too short (under 50 chars).", "")
    }

    // 2. Meta Description Length
    const descLen = description.length
    if (descLen === 0) {
        addCheck(false, "Meta description is missing.", "")
    } else if (descLen >= 140 && descLen <= 155) {
        addCheck(true, "", "Meta description length is optimal (140-155 chars).")
    } else if (descLen > 155) {
        addCheck('warn', "Meta description is too long (over 155 chars).", "")
    } else {
        addCheck('warn', "Meta description is too short (under 140 chars).", "")
    }

    // Content processing
    const contentLower = content.toLowerCase()
    const keywordLower = keyword.toLowerCase().trim()
    const titleLower = title.toLowerCase()
    const descLower = description.toLowerCase()

    // Strip HTML for word count
    const textOnly = content.replace(/<[^>]*>?/gm, ' ')
    const words = textOnly.split(/\s+/).filter(w => w.length > 0)
    const wordCount = words.length

    // 3. Focus Keyword Presence
    let density = 0;
    if (!keywordLower) {
        addCheck(false, "Focus keyword is not set.", "")
    } else {
        // Keyword in Title
        addCheck(
            titleLower.includes(keywordLower),
            "Focus keyword is missing from the title.",
            "Focus keyword appears in the title."
        )

        // Keyword in Meta Description
        addCheck(
            descLower.includes(keywordLower),
            "Focus keyword is missing from the meta description.",
            "Focus keyword appears in the meta description."
        )

        // Keyword in Content
        const keywordCountInContent = (contentLower.match(new RegExp(keywordLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length
        if (keywordCountInContent === 0) {
            addCheck(false, "Focus keyword is missing from the content.", "")
        } else {
            // Density check
            density = (keywordCountInContent / wordCount) * 100
            if (density < 0.5) {
                addCheck('warn', `Keyword density is too low (${density.toFixed(2)}%). Use it more often.`, "")
            } else if (density > 2.5) {
                addCheck('warn', `Keyword density is too high (${density.toFixed(2)}%). Avoid keyword stuffing.`, "")
            } else {
                addCheck(true, "", `Keyword density is good (${density.toFixed(2)}%).`)
            }
        }
    }

    // 4. Content Length
    if (wordCount < 300) {
        addCheck(false, `Content is too short (${wordCount} words). Minimum recommended is 300 words.`, "")
    } else {
        addCheck(true, "", `Content length is good (${wordCount} words).`)
    }

    // 5. Internal/External Links
    const hasLinks = /<a /i.test(content)
    addCheck(hasLinks, "No links found in the content. Add internal or external links.", "Content contains links.")

    // 6. Headings Structure
    const hasH2 = /<h2/i.test(content)
    const hasH3 = /<h3/i.test(content)
    if (hasH2 || hasH3) {
        addCheck(true, "", "Content uses structured headings (H2/H3).")
    } else {
        addCheck('warn', "No H2 or H3 headings found. Use headings to structure your content.", "")
    }

    // Calculate final score
    const finalScore = Math.round((score / totalChecks) * 100) || 0
    let status: 'Poor' | 'Average' | 'Good' = 'Poor'
    
    if (finalScore >= 80) status = 'Good'
    else if (finalScore >= 50) status = 'Average'

    return {
        score: finalScore,
        status,
        wordCount,
        keywordDensity: density,
        suggestions: suggestions.sort((a, b) => {
            // Sort: fails first, warns second, passes last
            const rank = { fail: 0, warn: 1, pass: 2 }
            return rank[a.status] - rank[b.status]
        })
    }
}
