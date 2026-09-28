import os
import json
from datetime import datetime

DB_FILE = "simulation_db.json"

class JSONDatabaseConnector:
    @staticmethod
    def initialize_db():
        """Ensures the storage file exists with an optimized schema structure."""
        if not os.path.exists(DB_FILE):
            with open(DB_FILE, 'w') as f:
                json.dump({"metadata": {"created_at": str(datetime.now())}, "records": []}, f, indent=2)

    @staticmethod
    def save_record(simulation_output: dict):
        """Appends a valid simulation block with an atomic network timestamp."""
        JSONDatabaseConnector.initialize_db()
        
        with open(DB_FILE, 'r+') as f:
            data = json.load(f)
            
            # Enrich simulation with exact historical timestamp strings
            simulation_output["saved_at"] = str(datetime.now())
            data["records"].append(simulation_output)
            
            # Reset file pointer and rewrite securely
            f.seek(0)
            json.dump(data, f, indent=2)
            f.truncate()
        return True

    @staticmethod
    def get_system_analytics():
        """Aggregates security clearance alerts across your portfolio logs."""
        JSONDatabaseConnector.initialize_db()
        
        with open(DB_FILE, 'r') as f:
            data = json.load(f)
            records = data.get("records", [])
            
            total = len(records)
            approved = sum(1 for r in records if r.get("cross_interaction_validator", {}).get("safety_clearance_status") == "APPROVED")
            warnings = sum(1 for r in records if "WARNING" in r.get("cross_interaction_validator", {}).get("safety_clearance_status", ""))
            critical = sum(1 for r in records if "CRITICAL" in r.get("cross_interaction_validator", {}).get("safety_clearance_status", ""))
            
            return {
                "total_simulations_computed": total,
                "safety_distribution": {
                    "APPROVED": approved,
                    "WARNINGS": warnings,
                    "CRITICAL_FAILURES": critical
                },
                "recent_records": records[-10:] if records else []
            }
