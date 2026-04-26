import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const { action, topic, keywords } = await responseToJson(req)

        if (action === 'generate') {
            // Simulated AI Content Generation
            // In a real production app, you would use OpenAI, Anthropic, or Google Gemini here.
            
            const html = generateHospitalContent(topic, keywords)
            
            return NextResponse.json({
                success: true,
                data: html
            })
        }

        return NextResponse.json({ success: false, error: 'Invalid action' })
    } catch (error) {
        console.error('AI Route Error:', error)
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
    }
}

async function responseToJson(req: Request) {
    return await req.json()
}

function generateHospitalContent(topic: string, keywords: string) {
    // A sophisticated template generator that mimics AI output for hospital contexts
    const kwList = keywords ? keywords.split(',').map(k => k.trim()) : []
    
    return `
        <h2>Understanding ${topic}</h2>
        <p>In the rapidly evolving landscape of modern healthcare, ${topic} has emerged as a significant area of interest for both patients and medical professionals. This comprehensive guide explores the key aspects, benefits, and considerations related to this topic.</p>
        
        <div data-type="info">
            <strong>Medical Insight:</strong> When considering ${topic}, it is essential to consult with specialized healthcare providers who can provide personalized guidance based on individual clinical profiles.
        </div>

        <h3>The Importance of ${topic} in Modern Medicine</h3>
        <p>Current clinical research indicates that ${topic} plays a crucial role in improving patient outcomes. By focusing on ${kwList.length > 0 ? kwList.join(', ') : 'evidence-based practices'}, healthcare systems can deliver more precise and effective treatments.</p>

        <div data-type="callout">
            "The integration of advanced ${topic} protocols has revolutionized how we approach complex surgical and therapeutic interventions, leading to faster recovery times and enhanced patient satisfaction."
        </div>

        <h3>Key Benefits and Considerations</h3>
        <p>While the advantages of ${topic} are numerous, patients should be aware of several factors:</p>
        <ul>
            <li><strong>Precision Diagnosis:</strong> Utilizing state-of-the-art diagnostic tools to ensure accuracy.</li>
            <li><strong>Minimally Invasive Options:</strong> Prioritizing techniques that reduce physical trauma and recovery time.</li>
            <li><strong>Personalized Care Plans:</strong> Tailoring interventions to the unique needs of every patient.</li>
        </ul>

        <div data-type="divider-title">Next Steps for Patients</div>
        <p>If you or a loved one are interested in learning more about how ${topic} can impact your health journey at Stork Hospitals, we encourage you to schedule a consultation with our department experts. Our team is dedicated to providing world-class care using the latest medical innovations.</p>
        
        <p>[faq_section]</p>
    `
}
