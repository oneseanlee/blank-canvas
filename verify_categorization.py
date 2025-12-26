import pandas as pd

df = pd.read_excel('/home/ubuntu/vibe_coding_prompts_library_organized.xlsx', sheet_name=None)

print("=" * 70)
print("VERIFYING TAB CATEGORIZATION")
print("=" * 70)

# Check START HERE tab
print("\n🎯 START HERE - PRE-SESSION SETUP:")
print("-" * 70)
if '🎯 START HERE - Pre-Session Setu' in df:
    start_df = df['🎯 START HERE - Pre-Session Setu']
    for idx, row in start_df.iterrows():
        print(f"\n{idx+1}. {row['Use Case'][:70]}")
        print(f"   Category: {row['Category']}")

# Check Visual Design tab
print("\n" + "=" * 70)
print("🎨 VISUAL DESIGN & MODERN AESTHETICS:")
print("-" * 70)
if '🎨 Visual Design & Modern Aesthe' in df:
    design_df = df['🎨 Visual Design & Modern Aesthe']
    for idx, row in design_df.iterrows():
        print(f"\n{idx+1}. {row['Use Case'][:70]}")
        print(f"   Category: {row['Category']}")

# Check Interactive Elements tab
print("\n" + "=" * 70)
print("🚀 INTERACTIVE & IMMERSIVE ELEMENTS:")
print("-" * 70)
if '🚀 Interactive & Immersive Eleme' in df:
    interactive_df = df['🚀 Interactive & Immersive Eleme']
    for idx, row in interactive_df.iterrows():
        print(f"\n{idx+1}. {row['Use Case'][:70]}")
        print(f"   Category: {row['Category']}")

# Check Other Specialized Prompts - see what's there
print("\n" + "=" * 70)
print("📋 OTHER SPECIALIZED PROMPTS (Sample - First 10):")
print("-" * 70)
if '📋 Other Specialized Prompts' in df:
    other_df = df['📋 Other Specialized Prompts']
    print(f"Total in this tab: {len(other_df)} prompts\n")
    for idx, row in other_df.head(10).iterrows():
        print(f"{idx+1}. {row['Use Case'][:65]}")
        print(f"   Category: {row['Category']}")
        print()

# Check what categories are in "Other"
print("\n" + "=" * 70)
print("CATEGORIES IN 'OTHER SPECIALIZED PROMPTS':")
print("-" * 70)
if '📋 Other Specialized Prompts' in df:
    other_df = df['📋 Other Specialized Prompts']
    categories = other_df['Category'].value_counts()
    for cat, count in categories.items():
        print(f"  • {cat}: {count} prompts")

# Check Award-Winning Homepage Designs sample
print("\n" + "=" * 70)
print("✨ AWARD-WINNING HOMEPAGE DESIGNS (Sample - First 5):")
print("-" * 70)
if '✨ Award-Winning Homepage Design' in df:
    homepage_df = df['✨ Award-Winning Homepage Design']
    for idx, row in homepage_df.head(5).iterrows():
        print(f"\n{idx+1}. {row['Use Case'][:70]}")
        print(f"   Category: {row['Category']}")

