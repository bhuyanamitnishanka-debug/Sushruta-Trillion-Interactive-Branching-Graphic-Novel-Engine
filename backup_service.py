import os
import json
from datetime import datetime
try:
    from flask import Flask, request, jsonify
except ImportError:
    # Fallback dummy shims if flask is not yet installed in host environment
    class Flask:
        def __init__(self, *args, **kwargs): pass
        def route(self, *args, **kwargs): return lambda f: f
        def run(self, *args, **kwargs): pass
    def jsonify(x): return x
    request = None

app = Flask(__name__)

# Establish storage layout path rules
BACKUP_DIR = os.path.join(os.getcwd(), "gemini_flask_backups")
os.makedirs(BACKUP_DIR, exist_ok=True)

@app.route('/api/v1/backup/telemetry', methods=['POST'])
def ingest_telemetry_backup():
    """
    Ingests and saves data packets from the primary simulation service core.
    """
    try:
        # Ingest incoming simulation log packet
        payload = request.get_json() if request else {}
        if not payload:
            return jsonify({"status": "ERROR", "message": "Null payload received"}), 400
            
        # Extract metadata identifiers for file tracking
        class_executed = payload.get("class_executed", "unknown_class")
        codename = payload.get("formulation_metadata", {}).get("codename", "unnamed_formulation")
        
        # Build atomic timestamp and file structure layout keys
        timestamp_str = datetime.now().strftime("%Y%m%d_%H%M%S_%f")
        filename = f"backup_{class_executed}_{codename}_{timestamp_str}.json"
        target_path = os.path.join(BACKUP_DIR, filename)
        
        # Inject archival telemetry metadata properties
        archive_wrapper = {
            "backup_id": f"ARK-{timestamp_str}",
            "archived_at": str(datetime.now()),
            "payload_data": payload
        }
        
        # Write to local storage block atomically
        with open(target_path, 'w') as backup_file:
            json.dump(archive_wrapper, backup_file, indent=2)
            
        return jsonify({
            "status": "SUCCESS",
            "archive_id": archive_wrapper["backup_id"],
            "target_destination": filename,
            "message": "Telemetry matrix backup written successfully to Gemini-Flask workspace storage."
        }), 201

    except Exception as e:
        return jsonify({"status": "CRASH", "message": f"Backup System Internal Error: {str(e)}"}), 500

@app.route('/api/v1/backup/status', methods=['GET'])
def get_backup_status_summary():
    """
    Aggregates metrics for files currently backed up in the directory.
    """
    try:
        files = [f for f in os.listdir(BACKUP_DIR) if f.endswith('.json')]
        return jsonify({
            "backup_directory": BACKUP_DIR,
            "total_archived_records": len(files),
            "archived_manifest": sorted(files)
        }), 200
    except Exception as e:
        return jsonify({"status": "ERROR", "message": str(e)}), 500

if __name__ == "__main__":
    # Runs the local Flask synchronization node on dedicated port 8080
    app.run(host="127.0.0.1", port=8080, debug=True)
