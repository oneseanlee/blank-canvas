import plotly.graph_objects as go
from plotly.subplots import make_subplots

print("=" * 80)
print("CREATING BEFORE/AFTER VISUALIZATION")
print("=" * 80)

# Before and After data
before_tabs = [
    "🎯 START HERE", "✨ Homepage Design", "🎨 Visual Design", "🚀 Interactive",
    "💎 UI/UX", "🎯 Conversion", "📄 Landing Pages", "💰 E-commerce",
    "📊 Dashboard", "📱 Social Proof", "📧 Marketing", "🔗 API",
    "⚡ Performance", "🔍 SEO", "🧪 Testing", "🛠️ Features", "📋 Other"
]

before_counts = [4, 40, 1, 2, 24, 18, 15, 3, 7, 4, 4, 3, 9, 5, 3, 40, 21]

after_tabs = before_tabs[:15] + ["🏁 Finalization ⭐ NEW!"] + before_tabs[15:]
after_counts = before_counts[:15] + [30] + before_counts[15:]

# Create side-by-side comparison
fig = make_subplots(
    rows=1, cols=2,
    subplot_titles=('Before: 203 Prompts', 'After: 233 Prompts (+30 New!)'),
    horizontal_spacing=0.15
)

# Before (left)
fig.add_trace(
    go.Bar(
        y=before_tabs,
        x=before_counts,
        orientation='h',
        marker=dict(color='#94A3B8', line=dict(color='#64748B', width=1)),
        text=before_counts,
        textposition='auto',
        textfont=dict(color='white', size=10, family='Arial Black'),
        hovertemplate='%{y}<br>%{x} prompts<extra></extra>',
        showlegend=False
    ),
    row=1, col=1
)

# After (right) - highlight new tab
colors_after = ['#3B82F6' if tab == '🏁 Finalization ⭐ NEW!' else '#10B981' 
                for tab in after_tabs]

fig.add_trace(
    go.Bar(
        y=after_tabs,
        x=after_counts,
        orientation='h',
        marker=dict(color=colors_after, line=dict(color='rgba(0,0,0,0.3)', width=1)),
        text=after_counts,
        textposition='auto',
        textfont=dict(color='white', size=10, family='Arial Black'),
        hovertemplate='%{y}<br>%{x} prompts<extra></extra>',
        showlegend=False
    ),
    row=1, col=2
)

# Update layout
fig.update_layout(
    title={
        'text': 'Vibe Coding Bible: Before vs After Update',
        'x': 0.5,
        'xanchor': 'center',
        'font': {'size': 24, 'color': '#1F2937', 'family': 'Arial Black'}
    },
    height=900,
    template='plotly_white',
    font=dict(size=10),
    showlegend=False
)

# Update axes
fig.update_yaxes(autorange="reversed", row=1, col=1)
fig.update_yaxes(autorange="reversed", row=1, col=2)
fig.update_xaxes(title_text="Number of Prompts", row=1, col=1)
fig.update_xaxes(title_text="Number of Prompts", row=1, col=2)

# Add annotation for new tab
fig.add_annotation(
    text="✨ NEW TAB ADDED!<br>30 Finalization Prompts",
    xref="paper", yref="paper",
    x=1.02, y=0.5,
    showarrow=True,
    arrowhead=2,
    arrowsize=1,
    arrowwidth=2,
    arrowcolor="#3B82F6",
    ax=40,
    ay=0,
    font=dict(size=12, color='#3B82F6', family='Arial Black'),
    bgcolor='rgba(59,130,246,0.1)',
    bordercolor='#3B82F6',
    borderwidth=2,
    borderpad=8
)

fig.write_html('/home/ubuntu/before_after_comparison.html', include_plotlyjs='cdn')
print("✓ Created before/after comparison chart")

# Create category breakdown for new tab
categories = [
    'Mobile Optimization', 'Functionality Testing', 'Design Enhancement',
    'Conversion Optimization', 'Accessibility & Performance', 'Overall Polish & UX'
]
counts = [5, 5, 5, 4, 4, 7]
colors_cat = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899']

fig2 = go.Figure(data=[go.Pie(
    labels=categories,
    values=counts,
    hole=0.4,
    marker=dict(colors=colors_cat, line=dict(color='white', width=2)),
    textinfo='label+value',
    textfont=dict(size=12, family='Arial'),
    hovertemplate='%{label}<br>%{value} prompts<br>(%{percent})<extra></extra>'
)])

fig2.update_layout(
    title={
        'text': '🏁 Project Finalization & Polish<br>30 Prompts by Category',
        'x': 0.5,
        'xanchor': 'center',
        'font': {'size': 20, 'color': '#1F2937', 'family': 'Arial Black'}
    },
    height=600,
    template='plotly_white',
    showlegend=True,
    legend=dict(
        orientation="v",
        yanchor="middle",
        y=0.5,
        xanchor="left",
        x=1.1,
        font=dict(size=11)
    ),
    annotations=[dict(
        text='30<br>Prompts',
        x=0.5, y=0.5,
        font_size=24,
        font_family='Arial Black',
        font_color='#1F2937',
        showarrow=False
    )]
)

fig2.write_html('/home/ubuntu/finalization_categories_breakdown.html', include_plotlyjs='cdn')
print("✓ Created category breakdown chart")

# Create stats comparison
fig3 = go.Figure()

categories_stats = ['Total Tabs', 'Content Prompts', 'Categories Covered']
before_stats = [18, 203, 17]
after_stats = [19, 233, 23]  # Added 6 new categories

x = ['Before Update', 'After Update']

fig3.add_trace(go.Bar(
    name='Total Tabs',
    x=x,
    y=[18, 19],
    marker_color='#3B82F6',
    text=[18, '19 (+1)'],
    textposition='auto',
    textfont=dict(color='white', size=14, family='Arial Black')
))

fig3.add_trace(go.Bar(
    name='Content Prompts',
    x=x,
    y=[203, 233],
    marker_color='#10B981',
    text=[203, '233 (+30)'],
    textposition='auto',
    textfont=dict(color='white', size=14, family='Arial Black')
))

fig3.add_trace(go.Bar(
    name='Categories',
    x=x,
    y=[17, 23],
    marker_color='#F59E0B',
    text=[17, '23 (+6)'],
    textposition='auto',
    textfont=dict(color='white', size=14, family='Arial Black')
))

fig3.update_layout(
    title={
        'text': 'Vibe Coding Bible: Statistics Comparison',
        'x': 0.5,
        'xanchor': 'center',
        'font': {'size': 22, 'color': '#1F2937', 'family': 'Arial Black'}
    },
    barmode='group',
    height=500,
    template='plotly_white',
    yaxis_title='Count',
    legend=dict(
        orientation="h",
        yanchor="bottom",
        y=1.02,
        xanchor="center",
        x=0.5,
        font=dict(size=12)
    )
)

fig3.write_html('/home/ubuntu/stats_comparison.html', include_plotlyjs='cdn')
print("✓ Created statistics comparison chart")

print("\n" + "=" * 80)
print("VISUALIZATIONS COMPLETE")
print("=" * 80)
print("\n📊 Created 3 visualizations:")
print("  1. before_after_comparison.html - Side-by-side tab comparison")
print("  2. finalization_categories_breakdown.html - New prompts by category")
print("  3. stats_comparison.html - Overall statistics comparison")
print("\n✅ All visualizations saved!")

