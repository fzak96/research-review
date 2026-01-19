/**
 * Type definitions for tax determination JSON structure
 */

export interface Citation {
  source_id: string;
  pinpoint: string;
  quote: string;
  translated_quote?: string;
}

export interface Jurisdiction {
  jurisdiction_name: string;
  level_name: string;
  level_number: number;
  country_iso: string;
  parent_jurisdiction_hierarchy: string[];
  jurisdiction_fips: string;
}

export interface VerticalDefinition {
  description: string;
  citations: Citation[];
}

export interface Vertical {
  label: string;
  definition: VerticalDefinition;
  tax_types_at_this_level: string[];
  tax_names: string[];
}

export interface Rate {
  rate_type: string;
  amount: number;
  unit: string;
  applies_to: string[];
  citations: Citation[];
}

export interface StandardRate extends Rate {
  // Standard rate specific fields
}

export interface ReducedRate extends Rate {
  name: string;
  conditions: string[];
  effective_start_date: string;
  effective_end_date: string;
}

export interface Exemption {
  name: string;
  applies_to: string[];
  conditions: string[];
  effective_start_date: string;
  effective_end_date: string;
  citations: Citation[];
}

export interface Provision {
  standard_rate: StandardRate;
  reduced_rates: ReducedRate[];
  exemptions: Exemption[];
}

export interface Source {
  id: string;
  docId: string;
  url: string;
  title: string;
  snippet: string;
  author: string;
  publisher: string;
  publishedAt: string;
  updatedAt: string;
  accessedAt: string;
  score: number | null;
}

export interface TaxResearchOutput {
  title: string;
  jurisdiction: Jurisdiction;
  vertical: Vertical;
  provision: Provision;
  evaluation?: {
    confidence_score: string;
    reasoning: string;
  };
  jurisdictional_applicability?: {
    applicable_at_current_jurisdiction_level: string;
    should_dig: boolean;
    next_applicable_level: string;
    reason: string;
  };
  sources: Source[];
}
