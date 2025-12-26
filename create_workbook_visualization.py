import pandas as pd
import plotly.graph_objects as go
from plotly.subplots import make_subplots

# Load workbook data
df = pd.read_excel('/home/ubuntu/vibe_coding_prompts_library_organized.xlsx', sheet_name=None)

# Get sheet info (exclude guide)
sheets_data = []
for sheet_name, sheet_df in df.items():
    if '📚' not in sheet_name:
        count = len(sheet_df)
        sheets_data.append({
            'name': sheet_name,
            'count': count
        })

sheets_df = pd.DataFrame(sheets_data)

# Create horizontal bar chart
fig = go.Figure()

# Color scheme based on priority
colors = []
for i, name in enumerate(sheets_df['name']):
    if '🎯 START' in name:
        colors.append('#DC2626')  # Red for START HERE
    elif i < 5:  # First 5 are design-focused
        colors.append('#3B82F6')  # Blue for priority design tabs
    elif 'Conversion' in name or 'Landing' in name:
        colors.append('#10B981')  # Green for conversion
    elif 'Feature' in name:
        colors.append('#F59E0B')  # Orange for features
    else:
        colors.append('#6B7280')  # Gray for others

fig.add_trace(go.Bar(
    y=sheets_df['name'],
    x=sheets_df['count'],
    orientation='h',
    marker=dict(
        color=colors,
        line=dict(color='rgba(0,0,0,0.3)', width=1)
    ),
    text=sheets_df['count'],
    textposition='auto',
    textfont=dict(size=11, color='white', family='Arial Black'),
    hovertemplate='%{y}<br>%{x} prompts<extra></extra>'
))

fig.update_layout(
    title={
        'text': 'Vibe Coding Prompts Library - Tab Organization',
        'x': 0.5,
        'xanchor': 'center',
        'font': {'size': 22, 'color': '#1F2937', 'family': 'Arial Black'}
    },
    xaxis_title='Number of Prompts',
    yaxis_title='',
    height=700,
    template='plotly_white',
    font=dict(size=11),
    yaxis=dict(autorange="reversed"),
    showlegend=False,
    margin=dict(l=280, r=50, t=80, b=50),
    plot_bgcolor='rgba(249,250,251,1)'
)

# Add annotations for priority levels
fig.add_annotation(
    text="🎯 ESSENTIAL START",
    xref="paper", yref="paper",
    x=1.02, y=0.98,
    showarrow=False,
    font=dict(size=10, color='#DC2626', family='Arial'),
    bgcolor='rgba(220,38,38,0.1)',
    bordercolor='#DC2626',
    borderwidth=1,
    borderpad=4
)

fig.add_annotation(
    text="⭐ PRIORITY DESIGN TABS",
    xref="paper", yref="paper",
    x=1.02, y=0.85,
    showarrow=False,
    font=dict(size=10, color='#3B82F6', family='Arial'),
    bgcolor='rgba(59,130,246,0.1)',
    bordercolor='#3B82F6',
    borderwidth=1,
    borderpad=4
)

fig.add_annotation(
    text="💚 CONVERSION FOCUSED",
    xref="paper", yref="paper",
    x=1.02, y=0.55,
    showarrow=False,
    font=dict(size=10, color='#10B981', family='Arial'),
    bgcolor='rgba(16,185,129,0.1)',
    bordercolor='#10B981',
    borderwidth=1,
    borderpad=4
)

fig.write_html('/home/ubuntu/workbook_structure_visualization.html', include_plotlyjs='cdn')
print("✓ Created workbook structure visualization")

# Create prompt type distribution pie chart
all_sheets_combined = pd.concat([sheet_df for name, sheet_df in df.items() if '📚' not in name])
prompt_types = all_sheets_combined['Prompt Type'].value_counts()

fig2 = go.Figure(data=[go.Pie(
    labels=prompt_types.index,
    values=prompt_types.values,
    hole=0.4,
    marker=dict(
        colors=['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'],
        line=dict(color='white', width=2)
    ),
    textinfo='label+percent',
    textfont=dict(size=12, family='Arial'),
    hovertemplate='%{label}<br>%{value} prompts (%{percent})<extra></extra>'
)])

fig2.update_layout(
    title={
        'text': 'Prompt Types Distribution Across Library',
        'x': 0.5,
        'xanchor': 'center',
        'font': {'size': 20, 'color': '#1F2937', 'family': 'Arial Black'}
    },
    height=500,
    template='plotly_white',
    showlegend=True,
    legend=dict(
        orientation="v",
        yanchor="middle",
        y=0.5,
        xanchor="left",
        x=1.1,
        font=dict(size=11)
    )
)

fig2.write_html('/home/ubuntu/prompt_types_distribution.html', include_plotlyjs='cdn')
print("✓ Created prompt types distribution chart")

# Create category distribution for design tabs
design_tabs = ['✨ Award-Winning Homepage Design', '🎨 Visual Design & Modern Aesthe', 
               '🚀 Interactive & Immersive Eleme', '💎 UI-UX Excellence']

design_prompts = pd.concat([df[tab] for tab in design_tabs if tab in df])
design_categories = design_prompts['Category'].value_counts().head(15)

fig3 = go.Figure(data=[go.Bar(
    x=design_categories.values,
    y=design_categories.index,
    orientation='h',
    marker=dict(
        color='#3B82F6',
        line=dict(color='#1E40AF', width=1)
    ),
    text=design_categories.values,
    textposition='auto',
    textfont=dict(color='white', size=10, family='Arial Black')
)])

fig3.update_layout(
    title={
        'text': 'Top 15 Categories in Design-Focused Tabs',
        'x': 0.5,
        'xanchor': 'center',
        'font': {'size': 20, 'color': '#1F2937', 'family': 'Arial Black'}
    },
    xaxis_title='Number of Prompts',
    yaxis_title='',
    height=600,
    template='plotly_white',
    font=dict(size=10),
    yaxis=dict(autorange="reversed"),
    margin=dict(l=250, r=50, t=80, b=50)
)

fig3.write_html('/home/ubuntu/design_categories_breakdown.html', include_plotlyjs='cdn')
print("✓ Created design categories breakdown")

# Summary statistics
print("\n" + "=" * 70)
print("VISUALIZATION SUMMARY")
print("=" * 70)
print(f"Total tabs visualized: {len(sheets_df)}")
print(f"Total prompts: {sheets_df['count'].sum()}")
print(f"Average prompts per tab: {sheets_df['count'].mean():.1f}")
print(f"Largest tab: {sheets_df.loc[sheets_df['count'].idxmax(), 'name']} ({sheets_df['count'].max()} prompts)")
print(f"Smallest tab: {sheets_df.loc[sheets_df['count'].idxmin(), 'name']} ({sheets_df['count'].min()} prompts)")

print("\n📊 Created 3 visualizations:")
print("  1. workbook_structure_visualization.html - Complete tab breakdown")
print("  2. prompt_types_distribution.html - Prompt types pie chart")
print("  3. design_categories_breakdown.html - Design-focused categories")

