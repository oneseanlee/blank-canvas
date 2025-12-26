import pandas as pd
import plotly.graph_objects as go
import plotly.express as px
from plotly.subplots import make_subplots

# Load the Excel file
df = pd.read_excel('/home/ubuntu/vibe_coding_prompts_library.xlsx')

# Category breakdown
category_counts = df['Category'].value_counts().sort_values(ascending=False)

# Get top 15 categories
top_categories = category_counts.head(15)
other_count = category_counts.iloc[15:].sum()
if other_count > 0:
    top_categories['Other Categories'] = other_count

# Create bar chart for top categories
fig = go.Figure()

fig.add_trace(go.Bar(
    y=top_categories.index,
    x=top_categories.values,
    orientation='h',
    marker=dict(
        color='#4472C4',
        line=dict(color='#2C4E8C', width=1)
    ),
    text=top_categories.values,
    textposition='auto',
))

fig.update_layout(
    title={
        'text': 'Vibe Coding Prompts Library - Top Categories',
        'x': 0.5,
        'xanchor': 'center',
        'font': {'size': 20, 'color': '#2C4E8C', 'family': 'Arial Black'}
    },
    xaxis_title='Number of Prompts',
    yaxis_title='Category',
    height=600,
    template='plotly_white',
    font=dict(size=12),
    yaxis=dict(autorange="reversed"),
    showlegend=False,
    margin=dict(l=250, r=50, t=80, b=50)
)

fig.write_html('/home/ubuntu/prompts_category_breakdown.html', include_plotlyjs='cdn')
print("✓ Created category breakdown visualization: ~/prompts_category_breakdown.html")

# Create summary statistics
total_prompts = len(df)
total_categories = df['Category'].nunique()
prompt_types = df['Prompt Type'].value_counts()

print(f"\n{'='*60}")
print("FINAL LIBRARY STATISTICS")
print(f"{'='*60}")
print(f"📊 Total Prompts: {total_prompts}")
print(f"📁 Total Categories: {total_categories}")
print(f"🏆 Top 3 Categories:")
for i, (cat, count) in enumerate(category_counts.head(3).items(), 1):
    print(f"   {i}. {cat}: {count} prompts")

print(f"\n📝 Prompt Types:")
for ptype, count in prompt_types.items():
    if ptype:  # Only show non-empty types
        print(f"   • {ptype}: {count} prompts")

# Tool compatibility analysis
all_tools = []
for tools in df['Tool Compatibility'].dropna():
    if isinstance(tools, str):
        all_tools.extend([t.strip() for t in tools.split(',') if t.strip()])

from collections import Counter
tool_counts = Counter(all_tools)

print(f"\n🛠️ Tool Compatibility (Top 5):")
for tool, count in tool_counts.most_common(5):
    print(f"   • {tool}: {count} prompts")

print(f"\n{'='*60}")

