import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export const analyzeSymptoms = async (data: any) => {
  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    throw new Error("Gemini API Key is missing. Please check your environment variables.");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

  const prompt = `
    You are a premium medical assistant named MEDAI. 
    Analyze the following symptoms and patient data to provide a structured, professional, and trustworthy guidance report.
    
    PATIENT DATA:
    - Age: ${data.age || 'Not specified'}
    - Sex: ${data.sex || 'Not specified'}
    - Symptoms: ${data.description || 'No description provided'}
    - Duration: ${data.duration || 'Not specified'}
    - Severity: ${data.severity || '5'}/10
    - Existing Conditions: ${Array.isArray(data.conditions) ? data.conditions.join(', ') : 'None'}
    - Allergies: ${Array.isArray(data.allergies) ? data.allergies.join(', ') : 'None'}
    - Tags: ${Array.isArray(data.tags) ? data.tags.join(', ') : 'None'}
    - Red Flags: ${Array.isArray(data.redFlags) ? data.redFlags.join(', ') : 'None'}
    
    STRICT GUIDELINES:
    1. This is health information, NOT a diagnosis or prescription. 
    2. Use "possible / could be / common causes include..." never claim certainty.
    3. If symptoms suggest emergency (chest pain, breathing trouble, fainting, etc.), set Risk Level to HIGH and prioritize emergency advice.
    4. Provide educational info on medicines, NO dosages.
    5. Tone: professional, supportive, concise.
    6. ALWAYS return ONLY a valid JSON object. No markdown formatting.

    OUTPUT FORMAT (JSON):
    {
      "summary": "Full clear overview of symptoms",
      "riskLevel": "Low | Medium | High",
      "riskReason": "Why this risk level was chosen",
      "possibleCauses": [
        { "cause": "Common condition name", "confidence": "Percentage range" }
      ],
      "actions": ["Immediate steps the user can take"],
      "homeCare": ["Safe home remedies"],
      "toAvoid": ["Things that might worsen the condition"],
      "urgentSigns": ["Signs that mean they should stop home care and see a doctor"],
      "recommendedTests": ["General diagnostic tests for reference"],
      "medicineInfo": "General educational info about common OTC meds for this, with strict disclaimer",
      "emergencyMode": true | false
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Brute force JSON extraction
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');

    if (start !== -1 && end !== -1) {
      const jsonStr = text.substring(start, end + 1);
      try {
        return JSON.parse(jsonStr);
      } catch (parseErr) {
        console.error("JSON Parse Error. Raw text:", text);
        throw new Error("Failed to parse medical report.");
      }
    }

    console.error("No JSON found in response:", text);
    throw new Error("The AI failed to generate a structured report. Please try describing your symptoms differently.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const extractMedicineInfo = async (ocrText: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

  const prompt = `
    Extract medicine details from this OCR text: "${ocrText}"
    Return a list of medicine details in JSON format.
    Include: Name, Strength (mg/ml), Form (Tablet/Syrup), Manufacturer, Generic Name, Uses, How it works, Safety warnings, Side effects, Interactions.
    
    FORMAT (JSON):
    [
      {
        "name": "...",
        "generic": "...",
        "strength": "...",
        "form": "...",
        "uses": "...",
        "warnings": ["..."],
        "sideEffects": ["..."],
        "interactions": ["..."]
      }
    ]
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  return jsonMatch ? JSON.parse(jsonMatch[0]) : [];
};
