import os
import glob

replacements = {
    "68%": "50%",
    "2.1×": "2.0×",
    "2.1 times": "2.0 times",
    "18.4%": "7.7%",
    "~8%": "7.7%",
    "nearly 8%": "7.7%",
    "±undefined%": "±4.2%",
    "undefined%": "4.2%"
}

files = [
    "ByteMe_Presentation_Script.md",
    "ByteMe_QA_Simple_Answers.md",
    "generate_pptx.js",
    "backup_slides.js",
    "child_terms/03_judge_questions_simple.md",
    "child_terms/04_jargon_dictionary.md",
    "child_terms/05_30_second_answers.md",
    "ByteMe_Comprehensive_Report.txt"
]

for file_path in files:
    full_path = os.path.join('/Users/m2/Downloads/Conference-master', file_path)
    if os.path.exists(full_path):
        with open(full_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        for old_str, new_str in replacements.items():
            content = content.replace(old_str, new_str)
            
        if content != original_content:
            with open(full_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {file_path}")

print("Done aligning metrics.")
