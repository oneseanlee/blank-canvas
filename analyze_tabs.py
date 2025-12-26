import pandas as pd

df = pd.read_csv('/home/ubuntu/tab_assignments_debug.csv')

print("=" * 70)
print("TAB ASSIGNMENT ANALYSIS")
print("=" * 70)

# Show distribution
tab_counts = df['Tab'].value_counts()
print(f"\n📊 Prompts per tab:")
for tab, count in tab_counts.items():
    percentage = (count / len(df)) * 100
    print(f"  {tab:50s} - {count:3d} prompts ({percentage:5.1f}%)")

# Check START HERE tab contents
print("\n" + "=" * 70)
print("🎯 START HERE TAB CONTENTS:")
print("=" * 70)
start_here = df[df['Tab'] == '🎯 START HERE - Pre-Session Setup']
for idx, row in start_here.iterrows():
    print(f"\n{idx+1}. USE CASE: {row['Use Case'][:80]}")
    print(f"   CATEGORY: {row['Category']}")
    print(f"   PROMPT TYPE: {row['Prompt Type']}")

# Check Award-Winning Homepage tab - show first 5
print("\n" + "=" * 70)
print("✨ AWARD-WINNING HOMEPAGE DESIGNS TAB (First 5):")
print("=" * 70)
homepage = df[df['Tab'] == '✨ Award-Winning Homepage Designs'].head(5)
for idx, row in homepage.iterrows():
    print(f"\n{idx+1}. USE CASE: {row['Use Case'][:80]}")
    print(f"   CATEGORY: {row['Category']}")

# Check UI/UX Excellence tab - show first 5
print("\n" + "=" * 70)
print("💎 UI/UX EXCELLENCE TAB (First 5):")
print("=" * 70)
uiux = df[df['Tab'] == '💎 UI/UX Excellence'].head(5)
for idx, row in uiux.iterrows():
    print(f"\n{idx+1}. USE CASE: {row['Use Case'][:80]}")
    print(f"   CATEGORY: {row['Category']}")

# Check which categories ended up in each major tab
print("\n" + "=" * 70)
print("CATEGORIES IN MAJOR TABS:")
print("=" * 70)

major_tabs = ['✨ Award-Winning Homepage Designs', '💎 UI/UX Excellence', 
              '🎯 Conversion & Funnel Optimization', '📄 Landing Pages & Lead Generation']

for tab in major_tabs:
    tab_df = df[df['Tab'] == tab]
    categories = tab_df['Category'].value_counts()
    print(f"\n{tab}:")
    for cat, count in categories.items():
        print(f"  • {cat}: {count}")

