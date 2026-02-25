

## Export All Prompts to Excel

### What this does
Add a "Download Excel" button to the dashboard that generates and downloads an Excel spreadsheet containing all prompts currently loaded in the app, organized with proper formatting.

### How it works
The app already loads all prompts from `public/database_export.xlsx` into memory. We will add a button in the `UnifiedHeader` component that:

1. Takes the currently loaded prompts data
2. Generates a well-formatted Excel file client-side using the `xlsx` library (already installed)
3. Triggers a browser download of the file

### Technical Details

**File to modify: `components/vibe-coding-bible.tsx`**
- Add an "Export Excel" button (download icon) in the header/toolbar area
- Create an `exportToExcel` function that:
  - Converts the `data.prompts` array into a structured worksheet with columns: Title/Use Case, Prompt, Category, Usage Phase, Tool Compatibility, Prompt Type, Description, Tags
  - Adds a Summary sheet with category and phase breakdowns
  - Uses `XLSX.writeFile` to trigger the download as `vibe_coding_bible_prompts.xlsx`

**File to modify: `components/layout/UnifiedHeader.tsx`**
- Add an export/download button to the header toolbar alongside existing controls
- Accept an `onExportExcel` callback prop

### Output format
The downloaded Excel will have:
- **Sheet 1 "All Prompts"**: Every prompt with columns for Use Case, Prompt Text, Category, Usage Phase, Tool Compatibility, Prompt Type, Description
- **Sheet 2 "Summary"**: Breakdown by category and usage phase with counts

