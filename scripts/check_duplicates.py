#!/usr/bin/env python3
"""
Sushruta-Trillion Database Maintenance Utility: Duplicate Record Inspector & De-duplicator
Scans simulation_db.json for duplicate transaction payloads, reports collision frequency,
and optionally strips redundant entries atomically.
"""

import os
import sys
import json
import hashlib
from datetime import datetime

DB_FILE = os.environ.get("SIMULATION_DB", "simulation_db.json")

def generate_fingerprint(record: dict) -> str:
    """Generates a canonical hash for simulation payloads excluding timestamps."""
    canonical_data = {
        "class_executed": record.get("class_executed"),
        "formulation_metadata": record.get("formulation_metadata"),
        "simulation_pathways": record.get("simulation_pathways") or record.get("optics_output") or record.get("optics_telemetry"),
        "cross_interaction_validator": record.get("cross_interaction_validator")
    }
    encoded = json.dumps(canonical_data, sort_keys=True, default=str).encode("utf-8")
    return hashlib.sha256(encoded).hexdigest()

def check_and_deduplicate(auto_fix: bool = False):
    if not os.path.exists(DB_FILE):
        print(f"⚠️ Target database file '{DB_FILE}' does not exist.")
        return 0

    with open(DB_FILE, "r") as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError as e:
            print(f"❌ Corrupt JSON in {DB_FILE}: {e}")
            return 1

    records = data.get("records", [])
    total_records = len(records)
    seen_hashes = set()
    unique_records = []
    duplicate_count = 0

    for idx, rec in enumerate(records):
        fp = generate_fingerprint(rec)
        if fp in seen_hashes:
            duplicate_count += 1
            class_name = rec.get("class_executed", "unknown")
            codename = rec.get("formulation_metadata", {}).get("codename", "unnamed")
            print(f"  [COLLISION #{duplicate_count}] Index {idx}: Class='{class_name}', Codename='{codename}'")
        else:
            seen_hashes.add(fp)
            unique_records.append(rec)

    print("=" * 60)
    print(f"DATABASE DUPLICATE AUDIT REPORT: {DB_FILE}")
    print("=" * 60)
    print(f"Total Simulation Records Scanned: {total_records}")
    print(f"Unique Canonical Payloads:       {len(unique_records)}")
    print(f"Duplicate / Colliding Entries:   {duplicate_count}")

    if duplicate_count == 0:
        print("✅ Zero duplicates detected. Database integrity is 100% pristine.")
        return 0

    if auto_fix:
        # Create atomic backup first
        backup_path = f"{DB_FILE}.bak_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        with open(backup_path, "w") as bkp:
            json.dump(data, bkp, indent=2)
        print(f"📦 Pre-deduplication backup preserved: {backup_path}")

        data["records"] = unique_records
        with open(DB_FILE, "w") as f:
            json.dump(data, f, indent=2)
        print(f"✨ Pruned {duplicate_count} redundant records. Clean database saved.")
    else:
        print("💡 Run with '--fix' flag to automatically strip redundant collisions.")

    return 0

if __name__ == "__main__":
    fix_flag = "--fix" in sys.argv or "-f" in sys.argv
    sys.exit(check_and_deduplicate(auto_fix=fix_flag))
