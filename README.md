# Tax Research Review UI

A reviewer-focused UI for browsing and verifying tax determination JSON data with legal citations.

## Features

- **Jurisdiction Summary**: Displays country, level, and ISO code
- **Vertical Section**: Shows tax vertical definition and tax names
- **Provision Section**: 
  - Standard rate with applies-to list and citations
  - Reduced rates with conditions and citations
- **Citation Management**: 
  - Expandable/collapsible citations
  - Deduplication of identical quotes
  - Translation support
  - Source ID tracking

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── globals.css       # Global styles with Tailwind
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main page component
├── components/
│   ├── AppliesToList.tsx      # Expandable applies-to list
│   ├── CitationCard.tsx       # Individual citation card
│   ├── CitationsPanel.tsx     # Citations container with deduplication
│   ├── JurisdictionSummary.tsx # Jurisdiction info card
│   ├── ProvisionSection.tsx   # Main provision section
│   ├── RateCard.tsx           # Rate display card
│   └── VerticalSection.tsx    # Vertical definition section
├── types/
│   └── index.ts          # TypeScript type definitions
└── italy_output_lean.json # Sample data (hardcoded)
```

## Component Architecture

All components are functional React components with minimal state management. Each component:

- Receives raw JSON slices as props
- Contains no hardcoded tax logic
- Is designed for future extensibility (source resolution, comments, flags)

## Future Extensions

The UI is structured to easily support:

- Source resolution (source_id → source metadata lookup)
- Reviewer comments
- Confidence indicators
- Flags for verification status
- Linking to full legal source pages

## Technology Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React 18** - UI library
