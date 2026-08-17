import { newsItems } from './news';
import type { NewsItem } from './news';

type NewsItemWithCardTitle = NewsItem & { cardTitle: string };

const geneticTestingArticle = {
  id: 'md-2026-08-17-genetic-testing-life-insurance-underwriting',
  slug: 'genetic-testing-life-insurance-underwriting',
  title: 'Your DNA Can Warn You About Disease. Should Life Insurers Be Allowed to Use It?',
  cardTitle: 'Genetic Testing and Life Insurance Underwriting',
  summary:
    'As genetic testing becomes more common, life insurers face a difficult question: when does medical information become fair underwriting evidence, and when does it discourage people from seeking preventive healthcare?',
  publishedAt: '2026-08-17',
  publishedAtLabel: 'August 17, 2026',
  readingTime: '7 min read',
  featured: true,
  source: 'LifeForge Market Desk',
  tag: 'Underwriting & Risk',
  secondaryCategory: 'Privacy & Consumer Protection',
  auditStatus: 'Current',
  sourceStatus: 'verified',
  sourceName:
    'WSJ Buy Side consumer explainer, NHGRI GINA context, NCOIL model-law context, and Florida statutory example verified from public source pages.',
  sourceDate: '2025-August 2026',
  seoTitle: 'Genetic Testing and Life Insurance Underwriting | LifeForgePrep',
  metaDescription:
    'Genetic testing can reveal future health risks. Market Desk explains why life insurers’ use of genetic information raises questions about underwriting, privacy, adverse selection, and consumer protection.',
  openGraphTitle: 'Your DNA Can Warn You About Disease. Should Life Insurers Be Allowed to Use It?',
  openGraphDescription:
    'As genetic testing becomes common, life insurers face a difficult question: when is genetic information fair underwriting evidence, and when does it discourage preventive healthcare?',
  relatedTopics: [
    'life insurance',
    'genetic testing',
    'underwriting',
    'privacy',
    'medical records',
    'consumer protection',
    'adverse selection',
    'regulation',
    'market conduct',
    'professional practice'
  ],
  tags: [
    'life insurance',
    'genetic testing',
    'underwriting',
    'privacy',
    'medical records',
    'consumer protection',
    'adverse selection',
    'regulation',
    'market conduct',
    'professional practice'
  ],
  relatedSlugs: [
    'ai-underwriting-faster-application-trust-problem',
    'ai-underwriting-faster-applications-trust-questions',
    'compliance-insurance-value-proposition',
    'life-insurance-sales-gofundme-protection-gap',
    'insurance-commissions-mis-selling-client-interest'
  ],
  sources: [
    {
      name: 'Wall Street Journal / Buy Side — Can Life Insurance Companies Use Genetic-Testing Results? (August 17, 2026)',
      url: 'https://www.wsj.com/buyside/personal-finance/life-insurance/genetic-testing-in-life-insurance'
    },
    {
      name: 'National Human Genome Research Institute — Genetic Information Nondiscrimination Act / Genetic Discrimination',
      url: 'https://www.genome.gov/about-genomics/policy-issues/Genetic-Discrimination'
    },
    {
      name: 'National Council of Insurance Legislators — NCOIL Model Act Regarding Life Insurers’ Use of Genetic Information (adopted April 19, 2026)',
      url: 'https://ncoil.org/resource/ncoil-model-act-regarding-life-insurers-use-of-genetic-information-draft-as-of-10-14-25/'
    },
    {
      name: 'Florida Senate — Genetic information for insurance purposes, Fla. Stat. § 627.4301 (state-law context)',
      url: 'https://www.flsenate.gov/Laws/Statutes/2025/627.4301'
    }
  ],
  whatHappened:
    'WSJ Buy Side reported on how life insurers may use genetic-testing results in underwriting depending on state law, especially when genetic information appears in medical records. The topic has become more urgent as states consider new limits and NCOIL has adopted model-law language for life insurers’ use of genetic information.',
  marketDeskView:
    'Life insurers need accurate information to price risk fairly. But genetic information is different from an ordinary diagnosis because it can signal possible future illness before disease exists. The market needs clear rules that protect consumers without destroying the basic logic of risk-based underwriting.',
  whyAdvisorsShouldCare:
    'Advisors should understand that genetic testing can create underwriting, privacy and market-conduct questions. They should not give legal or medical advice, but they should help clients understand application disclosures, medical-record access and when specialized guidance may be needed.',
  learnerConnection:
    'This topic connects to underwriting, medical records, privacy, adverse selection, consumer protection, regulation, disclosure, market conduct and professional judgment.',
  keyPoints: [
    'Genetic information may be treated differently from ordinary medical evidence because it can point to future risk before disease exists.',
    'GINA protects health insurance and employment, but it does not generally protect life, disability or long-term care insurance applicants.',
    'State law varies, and genetic information included in medical records may be treated differently from direct-to-consumer test results.',
    'The professional issue is balancing fair risk classification, adverse selection, privacy, prevention and clear consumer disclosure.'
  ],
  bodySections: [
    {
      paragraphs: [
        'A genetic test can tell someone they may be at higher risk of developing a serious disease.',
        'That knowledge can be powerful.',
        'It may encourage earlier screening, better treatment decisions, family planning, lifestyle changes, or preventive care.',
        'But in life insurance, the same information raises a harder question:',
        'If a person learns something about their future health, should a life insurer be allowed to use that information when deciding whether to offer coverage or what premium to charge?',
        'This is no longer a distant ethical debate.',
        'As genetic testing becomes more common, the boundary between medical privacy and insurance underwriting is becoming harder to manage.'
      ]
    },
    {
      heading: 'Why Life Insurers Care About Genetic Information',
      paragraphs: [
        'Life insurance underwriting is based on risk selection.',
        'An insurer agrees to pay a death benefit if the insured dies while the policy is in force. To price that promise, the insurer evaluates information that may affect life expectancy.',
        'That can include age, sex, smoking status, medical history, prescription history, family history, occupation, hobbies, financial information, and other data depending on the application and jurisdiction.',
        'From the insurer’s perspective, genetic information may look like another form of health information.',
        'If a genetic test suggests a materially higher risk of serious illness, the insurer may argue that it should be able to consider that information in order to price coverage fairly.',
        'Otherwise, applicants who know they carry a high-risk genetic marker may buy more insurance than they otherwise would, while the insurer is legally prevented from using the same information. That is the classic concern of adverse selection.',
        'The insurer’s argument is not irrational.',
        'Insurance works only if risks can be assessed, pooled, priced, and managed.',
        'But genetic information is not exactly the same as a diagnosis.'
      ]
    },
    {
      heading: 'Prediction Is Not the Same as Disease',
      paragraphs: [
        'A diagnosis tells us something has happened.',
        'A genetic marker may tell us something could happen.',
        'That distinction matters.',
        'Some genetic findings strongly indicate future disease. Others show only elevated probability. Some risks can be reduced by treatment, screening, surgery, medication, or lifestyle changes. Some people with a genetic predisposition never develop the condition.',
        'If underwriting treats a genetic marker as if it were a current illness, consumers may be penalized for information that is uncertain, incomplete, or preventable.',
        'That creates a public-health problem.',
        'People may avoid genetic testing because they fear it could affect their ability to buy life insurance, disability insurance, or long-term care insurance.',
        'That is not a small concern.',
        'A person should not have to choose between learning useful medical information and preserving future access to insurance.'
      ]
    },
    {
      heading: 'The Legal Gap Consumers Often Miss',
      paragraphs: [
        'Many consumers have heard of genetic nondiscrimination protections and assume genetic information cannot be used against them.',
        'That assumption can be wrong.',
        'In the United States, federal genetic nondiscrimination protections are strongest in health insurance and employment. Life insurance, disability insurance, and long-term care insurance are treated differently and are often governed by state law.',
        'That creates a patchwork system.',
        'In some states, life insurers may be restricted from requesting or using genetic information. In others, genetic information already included in medical records may be available during underwriting.',
        'This difference matters because a consumer may not understand when genetic information becomes part of a medical record.',
        'A direct-to-consumer genetic test may sit outside traditional medical records. But if a person discusses the result with a doctor and receives medical-grade testing or follow-up, that information may become part of the records reviewed during a life insurance application, depending on state law.',
        'The issue is not just whether a person took a test.',
        'The issue is where the result lives, who can access it, and how it may be interpreted.'
      ]
    },
    {
      heading: 'The Underwriting Trade-Off',
      paragraphs: [
        'This topic creates a real conflict between fairness to applicants and fairness to the insurance pool.',
        'One version of fairness says consumers should not be punished for seeking preventive health information, especially when a genetic result is not the same as a disease.',
        'Another version of fairness says insurers should not be forced to ignore material information that applicants may already know.',
        'Both concerns are legitimate.',
        'If insurers use genetic information too aggressively, people may avoid testing and lose opportunities for prevention.',
        'If insurers are prohibited from using all genetic information, applicants with known high-risk results may buy larger amounts of coverage without the insurer being able to price that risk.',
        'The policy challenge is finding a boundary that protects consumers without making underwriting impossible.'
      ]
    },
    {
      heading: 'Why Disclosure Matters',
      paragraphs: [
        'Whatever rule a state chooses, the consumer should not be surprised.',
        'That is the core market-conduct issue.',
        'Applicants should understand whether the insurer can request genetic information, whether it can use genetic test results already in medical records, whether family history is treated differently from genetic testing, whether direct-to-consumer test results are considered, whether the rule differs for life, disability and long-term care insurance, whether the applicant has rights under state law, and whether an adverse underwriting decision can be explained.',
        'The worst outcome is not only an unfavorable underwriting decision.',
        'The worst outcome is a consumer discovering too late that a preventive health decision created an insurance consequence they did not understand.'
      ]
    },
    {
      heading: 'The Advisor’s Role',
      paragraphs: [
        'Most advisors are not genetic counselors, lawyers, or medical experts.',
        'They should not pretend to be.',
        'But advisors do have a professional responsibility to understand that genetic testing can raise underwriting and privacy issues.',
        'A good advisor should avoid giving legal or medical advice, while still encouraging clients to understand the insurance implications of medical records, testing, and application timing.',
        'That does not mean telling people to avoid medical care.',
        'It means helping them ask better questions before they apply.',
        'For example, a client may need to think about recent medical testing, whether anything in the medical record may affect underwriting, what information the insurer may request, whether state law provides specific genetic-information protections, and whether legal, medical, or genetic-counseling advice is needed before making decisions.',
        'The advisor’s job is not to hide information from the insurer.',
        'The advisor’s job is to help the client understand the process before the application begins.'
      ]
    },
    {
      heading: 'Why This Matters for LifeForgePrep Learners',
      paragraphs: [
        'This is exactly the kind of issue that turns exam knowledge into professional judgment.',
        'A learner may understand the definition of underwriting.',
        'But professional practice requires more.',
        'The real-world question is not only: what information can the insurer use?',
        'It is also whether the client should understand how that information may affect them, whether use of that information could create unfair discrimination, whether absence of that information could create adverse selection, what must be disclosed, and when privacy becomes a market-conduct issue.',
        'This is why ethics, compliance, underwriting, and consumer protection cannot be separated.'
      ]
    },
    {
      heading: 'Market Desk View',
      paragraphs: [
        'Life insurers need underwriting information. That is not controversial.',
        'The harder question is whether genetic information should be treated as ordinary medical evidence.',
        'In Market Desk’s view, genetic information deserves special care because it sits between prediction, diagnosis, privacy, and prevention.',
        'A genetic result may be relevant to risk. But it may also be uncertain, medically manageable, or unrelated to whether a person currently has a disease.',
        'The industry should not create incentives for people to avoid testing that could improve their health.',
        'At the same time, regulators should recognize that life insurance depends on risk classification. If rules ignore adverse selection entirely, costs may shift to other policyholders.',
        'The best path is not a slogan.',
        'It is clear law, clear disclosure, careful underwriting, and strong consumer protections.'
      ]
    },
    {
      heading: 'Why It Matters',
      paragraphs: [
        'For consumers, this issue affects whether preventive medical knowledge could influence future insurance access.',
        'For advisors, it highlights the importance of process, disclosure, documentation, and knowing when to refer a client for legal or medical guidance.',
        'For insurers, it raises questions about fairness, risk selection, adverse selection, and public trust.',
        'For regulators, it shows why privacy rules must keep pace with medical technology.',
        'Genetic testing is becoming easier.',
        'Life insurance underwriting is becoming more data-driven.',
        'The market now has to decide how much of the future an insurer should be allowed to price today.'
      ]
    }
  ],
  whatItMeans:
    'Genetic testing highlights the tension between fair risk classification, medical privacy, prevention, consumer protection and adverse selection in life insurance underwriting.',
  llqpAngle:
    'Learners should connect this story to underwriting evidence, medical records, privacy, adverse selection, disclosure, market conduct, consumer protection and professional judgment.'
} as unknown as NewsItemWithCardTitle;

const alreadyRegistered = newsItems.some((item) => item.slug === geneticTestingArticle.slug);

if (!alreadyRegistered) {
  newsItems.forEach((item) => {
    item.featured = false;
  });
  newsItems.unshift(geneticTestingArticle);
}
