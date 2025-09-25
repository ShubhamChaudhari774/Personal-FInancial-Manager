from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict
import random

app = FastAPI(title="Finance AI Service")


class Suggestion(BaseModel):
    category: str
    suggestion: str
    estimated_savings: float


@app.get("/health")
def health():
    return {"ok": True}


@app.get("/analyze", response_model=List[Suggestion])
def analyze():
    # Placeholder logic; real app would receive user transactions and analyze
    sample_categories = ["Dining", "Groceries", "Entertainment", "Shopping", "Transport", "Utilities"]
    chosen = random.sample(sample_categories, k=3)
    out: List[Suggestion] = []
    for c in chosen:
        out.append(
            Suggestion(
                category=c,
                suggestion=f"Reduce {c} spending by 10% using budget caps and alternatives.",
                estimated_savings=round(random.uniform(10, 60), 2),
            )
        )
    return out

