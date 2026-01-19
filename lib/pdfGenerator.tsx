import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { TaxResearchOutput, Citation, Source } from '@/types';

// Improved PDF styles with better hierarchy and reduced white space
const styles = StyleSheet.create({
  page: {
    padding: 35,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 18,
    paddingBottom: 12,
    borderBottom: '2 solid #1f2937',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#111827',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 11,
    color: '#4b5563',
    marginTop: 2,
  },
  section: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 4,
    border: '1 solid #e5e7eb',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#111827',
    letterSpacing: -0.3,
    borderBottom: '1 solid #d1d5db',
    paddingBottom: 6,
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 8,
    color: '#1f2937',
    letterSpacing: -0.2,
  },
  label: {
    fontSize: 8,
    color: '#6b7280',
    marginBottom: 4,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  text: {
    fontSize: 10,
    color: '#374151',
    marginBottom: 6,
    lineHeight: 1.5,
  },
  boldText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 6,
  },
  rateValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
    marginTop: 4,
  },
  rateType: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  list: {
    marginLeft: 12,
    marginTop: 6,
  },
  listItem: {
    fontSize: 10,
    color: '#374151',
    marginBottom: 4,
    lineHeight: 1.5,
  },
  citationCard: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#ffffff',
    border: '1 solid #d1d5db',
    borderRadius: 3,
  },
  citationSource: {
    fontSize: 8,
    color: '#6b7280',
    marginBottom: 6,
    backgroundColor: '#f3f4f6',
    padding: 4,
    borderRadius: 3,
    fontWeight: 'bold',
  },
  blockquote: {
    fontSize: 10,
    color: '#374151',
    fontStyle: 'italic',
    paddingLeft: 10,
    borderLeft: '3 solid #0ea5e9',
    marginTop: 4,
    marginBottom: 6,
    backgroundColor: '#f9fafb',
    padding: 8,
    lineHeight: 1.5,
  },
  translation: {
    fontSize: 9,
    color: '#1e40af',
    marginTop: 6,
    padding: 6,
    backgroundColor: '#dbeafe',
    borderLeft: '3 solid #3b82f6',
    borderRadius: 3,
    lineHeight: 1.5,
  },
  badge: {
    fontSize: 9,
    padding: 4,
    backgroundColor: '#e0f2fe',
    color: '#0369a1',
    borderRadius: 3,
    marginRight: 6,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  gridItem: {
    flex: 1,
    marginRight: 12,
  },
  sourceCard: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#ffffff',
    border: '1 solid #d1d5db',
    borderRadius: 3,
  },
  sourceId: {
    fontSize: 8,
    color: '#6b7280',
    marginBottom: 6,
    backgroundColor: '#f3f4f6',
    padding: 4,
    borderRadius: 3,
    fontWeight: 'bold',
  },
  sourceTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 6,
    lineHeight: 1.4,
  },
  sourceText: {
    fontSize: 9,
    color: '#374151',
    marginBottom: 4,
    lineHeight: 1.5,
  },
  standardBadge: {
    fontSize: 9,
    padding: 5,
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    borderRadius: 3,
    fontWeight: 'bold',
  },
  rateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  rateInfo: {
    flex: 1,
  },
});

// PDF Components (always expanded, verbatim text)
const PDFCitationCard: React.FC<{ citation: Citation; index: number }> = ({ citation }) => (
  <View style={styles.citationCard}>
    <View style={styles.citationSource}>
      <Text>Source: {citation.source_id}</Text>
      {citation.pinpoint && <Text> • Pinpoint: {citation.pinpoint}</Text>}
    </View>
    <Text style={styles.blockquote} wrap>
      {citation.quote}
    </Text>
    {citation.translated_quote && (
      <View style={styles.translation}>
        <Text style={{ fontWeight: 'bold', marginBottom: 4, fontSize: 9 }}>Translation:</Text>
        <Text wrap style={{ fontSize: 9 }}>{citation.translated_quote}</Text>
      </View>
    )}
  </View>
);

const PDFCitationsPanel: React.FC<{ citations: Citation[]; title?: string }> = ({ 
  citations, 
  title = 'Citations' 
}) => {
  if (!citations || citations.length === 0) {
    return null;
  }

  // Deduplicate citations
  const uniqueCitations = citations.filter((citation, index, self) =>
    index === self.findIndex((c) => c.quote === citation.quote)
  );

  return (
    <View style={{ marginTop: 12 }}>
      <Text style={styles.subsectionTitle}>
        {title} ({uniqueCitations.length})
      </Text>
      {uniqueCitations.map((citation, index) => (
        <PDFCitationCard key={index} citation={citation} index={index} />
      ))}
    </View>
  );
};

const PDFAppliesToList: React.FC<{ items: string[] }> = ({ items }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <View style={{ marginTop: 8 }}>
      <Text style={styles.label}>Applies To</Text>
      <View style={styles.list}>
        {items.map((item, index) => (
          <Text key={index} style={styles.listItem} wrap>
            • {item}
          </Text>
        ))}
      </View>
    </View>
  );
};

const PDFJurisdictionSummary: React.FC<{ jurisdiction: TaxResearchOutput['jurisdiction'] }> = ({ 
  jurisdiction 
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Jurisdiction</Text>
    <View style={styles.grid}>
      <View style={styles.gridItem}>
        <Text style={styles.label}>Country Name</Text>
        <Text style={styles.boldText}>{jurisdiction.jurisdiction_name}</Text>
      </View>
      <View style={styles.gridItem}>
        <Text style={styles.label}>Level</Text>
        <Text style={styles.boldText}>{jurisdiction.level_name}</Text>
      </View>
      <View style={styles.gridItem}>
        <Text style={styles.label}>ISO Code</Text>
        <Text style={styles.boldText}>{jurisdiction.country_iso}</Text>
      </View>
    </View>
  </View>
);

const PDFVerticalSection: React.FC<{ vertical: TaxResearchOutput['vertical'] }> = ({ vertical }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Vertical</Text>
    
    <View style={{ marginBottom: 10 }}>
      <Text style={styles.label}>Label</Text>
      <Text style={styles.boldText}>{vertical.label.replace(/_/g, ' ')}</Text>
    </View>

    <View style={{ marginBottom: 10 }}>
      <Text style={styles.label}>Definition</Text>
      <Text style={styles.text} wrap>
        {vertical.definition.description}
      </Text>
    </View>

    {vertical.tax_names && vertical.tax_names.length > 0 && (
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.label}>Tax Names</Text>
        <View style={styles.tagContainer}>
          {vertical.tax_names.map((name, index) => (
            <Text key={index} style={styles.badge}>
              {name}
            </Text>
          ))}
        </View>
      </View>
    )}

    {vertical.definition.citations && vertical.definition.citations.length > 0 && (
      <PDFCitationsPanel citations={vertical.definition.citations} />
    )}
  </View>
);

const PDFRateCard: React.FC<{ 
  rate: TaxResearchOutput['provision']['standard_rate'] | TaxResearchOutput['provision']['reduced_rates'][0];
  isStandard?: boolean;
}> = ({ rate, isStandard = false }) => {
  const rateLabel = isStandard ? 'Standard Rate' : (rate as TaxResearchOutput['provision']['reduced_rates'][0]).name;
  const rateValue = `${rate.amount}${rate.unit || '%'}`;
  const conditions = (rate as TaxResearchOutput['provision']['reduced_rates'][0]).conditions || [];

  return (
    <View style={styles.section}>
      <View style={styles.rateHeader}>
        <View style={styles.rateInfo}>
          <Text style={styles.subsectionTitle} wrap>{rateLabel}</Text>
          <Text style={styles.rateValue}>{rateValue}</Text>
          {rate.rate_type && (
            <Text style={styles.rateType}>{rate.rate_type.toLowerCase()}</Text>
          )}
        </View>
        {isStandard && (
          <View style={styles.standardBadge}>
            <Text>Standard</Text>
          </View>
        )}
      </View>

      <PDFAppliesToList items={rate.applies_to} />

      {conditions.length > 0 && (
        <View style={{ marginTop: 10 }}>
          <Text style={styles.label}>Conditions</Text>
          <View style={styles.list}>
            {conditions.map((condition, index) => (
              <Text key={index} style={styles.listItem} wrap>
                • {condition}
              </Text>
            ))}
          </View>
        </View>
      )}

      <PDFCitationsPanel citations={rate.citations} />
    </View>
  );
};

const PDFProvisionSection: React.FC<{ provision: TaxResearchOutput['provision'] }> = ({ provision }) => (
  <View>
    <Text style={styles.sectionTitle}>Provision</Text>
    
    <PDFRateCard rate={provision.standard_rate} isStandard={true} />

    {provision.reduced_rates && provision.reduced_rates.length > 0 && (
      <View style={{ marginTop: 10 }}>
        <Text style={styles.subsectionTitle}>
          Reduced Rates ({provision.reduced_rates.length})
        </Text>
        {provision.reduced_rates.map((reducedRate, index) => (
          <PDFRateCard key={index} rate={reducedRate} isStandard={false} />
        ))}
      </View>
    )}

    {provision.exemptions && provision.exemptions.length > 0 && (
      <View style={{ marginTop: 10 }}>
        <Text style={styles.subsectionTitle}>
          Exemptions ({provision.exemptions.length})
        </Text>
        {provision.exemptions.map((exemption, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.subsectionTitle} wrap>
              {exemption.name}
            </Text>

            <PDFAppliesToList items={exemption.applies_to} />

            {exemption.conditions && exemption.conditions.length > 0 && (
              <View style={{ marginTop: 8 }}>
                <Text style={styles.label}>Conditions</Text>
                <View style={styles.list}>
                  {exemption.conditions.map((condition, i) => (
                    <Text key={i} style={styles.listItem} wrap>
                      • {condition}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            <PDFCitationsPanel citations={exemption.citations} />
          </View>
        ))}
      </View>
    )}
  </View>
);

const PDFSourceCard: React.FC<{ source: Source; index: number }> = ({ source }) => (
  <View style={styles.sourceCard}>
    <View style={styles.sourceId}>
      <Text>{source.id}</Text>
    </View>
    <Text style={styles.sourceTitle} wrap>
      {source.title}
    </Text>
    {source.url && (
      <Text style={styles.sourceText} wrap>
        <Text style={{ fontWeight: 'bold' }}>URL: </Text>
        {source.url}
      </Text>
    )}
    {source.snippet && (
      <Text style={styles.sourceText} wrap>
        <Text style={{ fontWeight: 'bold' }}>Snippet: </Text>
        {source.snippet}
      </Text>
    )}
    {source.author && (
      <Text style={styles.sourceText} wrap>
        <Text style={{ fontWeight: 'bold' }}>Author: </Text>
        {source.author}
      </Text>
    )}
    {source.publisher && (
      <Text style={styles.sourceText} wrap>
        <Text style={{ fontWeight: 'bold' }}>Publisher: </Text>
        {source.publisher}
      </Text>
    )}
    {source.publishedAt && (
      <Text style={styles.sourceText}>
        <Text style={{ fontWeight: 'bold' }}>Published: </Text>
        {new Date(source.publishedAt).toLocaleDateString()}
      </Text>
    )}
    {source.accessedAt && (
      <Text style={styles.sourceText}>
        <Text style={{ fontWeight: 'bold' }}>Accessed: </Text>
        {new Date(source.accessedAt).toLocaleDateString()}
      </Text>
    )}
  </View>
);

const PDFSourcesSection: React.FC<{ sources: Source[] }> = ({ sources }) => {
  if (!sources || sources.length === 0) {
    return null;
  }

  // Deduplicate sources by id
  const uniqueSources = sources.filter((source, index, self) =>
    index === self.findIndex((s) => s.id === source.id)
  );

  // Sort sources by ID numerically (c1, c2, c3, etc.)
  const sortedSources = [...uniqueSources].sort((a, b) => {
    // Extract numeric part from ID (e.g., "c1" -> 1, "c2" -> 2)
    const getNumericId = (id: string) => {
      const match = id.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    };
    return getNumericId(a.id) - getNumericId(b.id);
  });

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Sources ({sortedSources.length})</Text>
      {sortedSources.map((source, index) => (
        <PDFSourceCard key={source.id} source={source} index={index} />
      ))}
    </View>
  );
};

// Main PDF Document Component
export const TaxResearchPDF: React.FC<{ data: TaxResearchOutput }> = ({ data }) => {
  const taxType = data.vertical.tax_types_at_this_level?.[0] || 'VAT';
  const verticalLabel = data.vertical.label.replace(/_/g, ' ');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{data.jurisdiction.jurisdiction_name}</Text>
          <Text style={styles.subtitle}>
            {taxType} • {verticalLabel}
          </Text>
          {data.evaluation && (
            <Text style={[styles.subtitle, { marginTop: 4 }]}>
              Confidence: {data.evaluation.confidence_score}
            </Text>
          )}
        </View>

        <PDFJurisdictionSummary jurisdiction={data.jurisdiction} />
        <PDFVerticalSection vertical={data.vertical} />
        <PDFProvisionSection provision={data.provision} />
        {data.sources && data.sources.length > 0 && (
          <PDFSourcesSection sources={data.sources} />
        )}
      </Page>
    </Document>
  );
};
