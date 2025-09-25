from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import defaultdict

app = FastAPI(title="AI Spending Analyzer")

class Transaction(BaseModel):
    category: str
    amount: float
    date: str

class AnalyzeRequest(BaseModel):
    transactions: List[Transaction]

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/analyze")
async def analyze(req: AnalyzeRequest) -> Dict[str, Any]:
    totals: Dict[str, float] = defaultdict(float)
    for t in req.transactions:
        totals[t.category] += float(t.amount)

    ranked = sorted(totals.items(), key=lambda kv: kv[1], reverse=True)
    top = ranked[:3]

    suggestions = []
    for category, total in top:
        suggested_cut_pct = 0.10
        estimated_savings = round(total * suggested_cut_pct, 2)
        suggestions.append({
            "category": category,
            "suggestion": f"Reduce discretionary spending in {category} by 10%",
            "estimated_savings": estimated_savings,
        })

    return {
        "summary": {
            "categories": [{"category": c, "total": round(v, 2)} for c, v in ranked]
        },
        "recommendations": suggestions
    }
