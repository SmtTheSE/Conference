import os
import sys

base_dir = '/Users/m2/Downloads/Conference-master'
files = [
    'doc.txt',
    'ByteMe_Abstract.md',
    'Datathon_Project-Properties-Dataset-/docs/SYNERGIA_2026_Research_Paper.md',
    'Datathon_Project-Properties-Dataset-/docs/TECHNICAL_IMPLEMENTATION_DETAIL.md',
    'Datathon_Project-Properties-Dataset-/docs/research_paper_guide.md',
    'Datathon_Project-Properties-Dataset-/docs/investment_scanner_guide.md',
    'Datathon_Project-Properties-Dataset-/docs/data_authenticity_audit.md',
    'Datathon_Project-Properties-Dataset-/docs/MARKET_AUDIT_LOG.md',
    'Datathon_Project-Properties-Dataset-/Synergia2026_Intelligence_Testing_Questions.txt',
    'Datathon_Project-Properties-Dataset-/README.md',
    'ByteMe_Presentation_Script.md'
]

consolidated = []
consolidated.append("# BYTEME PROJECT - CONSOLIDATED DOCUMENTATION\n\n")

for f in files:
    path = os.path.join(base_dir, f)
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as file:
            content = file.read()
            consolidated.append(f"================================================================================\n")
            consolidated.append(f"                             SOURCE: {os.path.basename(f)}\n")
            consolidated.append(f"================================================================================\n\n")
            consolidated.append(content)
            consolidated.append("\n\n")

out_path = os.path.join(base_dir, 'Consolidated_ByteMe_Project.txt')
with open(out_path, 'w', encoding='utf-8') as out:
    out.write("".join(consolidated))

print(f"Consolidated file created at {out_path}")
