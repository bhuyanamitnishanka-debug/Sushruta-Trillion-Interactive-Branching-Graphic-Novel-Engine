#!/usr/bin/env bash
# Exit immediately if a command exits with a non-zero status
set -e

DB_FILE="simulation_db.json"

echo "========================================================="
echo "SUSHRUTA-TRILLION: ATOMIC JSON DATA DEDUPLICATION TOOL"
echo "========================================================="
# 1. Verify existence of database file
if [ ! -f "$DB_FILE" ]; then
    echo "❌ Error: High-fidelity database storage file ($DB_FILE) not found."
    exit 1
fi

echo "🔍 Scanning log records inside $DB_FILE for duplicate instances..."
# 2. Execute inline Python parsing matrix to isolate unique payloads safely
python3 -c "
import json
from datetime import datetime

try:
    with open('$DB_FILE', 'r') as f:
        data = json.load(f)
    
    records = data.get('records', [])
    initial_count = len(records)
    
    # Tracking dictionary to isolate unique combinations
    unique_records = {}
    
    for record in records:
        codename = record.get('formulation_metadata', {}).get('codename', 'UNKNOWN')
        med_class = record.get('class_executed', 'UNKNOWN')
        # Create a unique composite validation signature key
        signature = f'{codename}::{med_class}'
        
        # If entry does not exist or has a more recent timestamp, update record snapshot
        unique_records[signature] = record

    # Reassemble compressed dataset arrays
    data['records'] = list(unique_records.values())
    final_count = len(data['records'])
    duplicates_removed = initial_count - final_count

    # Write back clean data array atomically
    with open('$DB_FILE', 'w') as f:
        json.dump(data, f, indent=2)
        
    print(f'🟢 Deduplication Complete: Processed {initial_count} items.')
    print(f'🧹 Cleared {duplicates_removed} redundant log file duplicate packets.')
    print(f'📊 Net clean production records saved to disk: {final_count}.')

except Exception as e:
    print(f'❌ In-line JSON parser failure: {str(e)}')
    exit(1)
"
echo "========================================================="
