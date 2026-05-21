import StudyCTA from '@/components/StudyCTA';

type CTAConversionBlockProps = {
  compact?: boolean;
};

export default function CTAConversionBlock({ compact = false }: CTAConversionBlockProps) {
  return (
    <StudyCTA
      title="Studying life insurance? Test the concept."
      body="Reading the article helps. Practice shows whether you can apply the concept under exam-style pressure."
      primaryLabel="Try 15 Free Questions"
      primaryHref="/free-practice"
      secondaryLabel="Explore Full Practice"
      secondaryHref="/exam-prep"
      location={compact ? 'news-conversion-compact' : 'news-conversion'}
      campaign="exam-trap"
    />
  );
}
