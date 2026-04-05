export const annuityTimeline = [
  {
    title: '1. You deposit money',
    body: 'You give the insurer a lump sum or a series of deposits. That money becomes the basis for future annuity benefits.'
  },
  {
    title: '2. The contract defines the payout rules',
    body: 'The annuity type, payout start date, guarantee period, refund option, and survivor choices determine how income is paid and what happens if death occurs early.'
  },
  {
    title: '3. Income begins',
    body: 'The insurer starts making payments according to the contract. Some annuities pay for life, some pay for a fixed period, and some pay for joint lives.'
  }
] as const;

export const annuityReasons = [
  'They want more predictable income in retirement.',
  'They are worried about outliving their savings.',
  'They want to turn part of a lump sum into a monthly payment stream.',
  'They want a contract that can include guarantees for a spouse or minimum period.'
] as const;

export const riskCards = [
  {
    title: 'The buyer gives up some flexibility',
    body: 'Once money is committed to an annuity, the future outcome depends on the contract. That means less control than simply leaving cash in a bank or investment account.'
  },
  {
    title: 'The insurer takes longevity risk',
    body: 'If the annuitant lives much longer than expected, the insurer may pay more income than the original deposit would have produced without pooling risk across many buyers.'
  },
  {
    title: 'The buyer keeps early-death risk unless options are added',
    body: 'If death happens early, a pure life annuity can pay out less than the original premium unless there is a guarantee period, refund feature, or survivor design.'
  }
] as const;

export const annuityTypeComparison = [
  {
    title: 'Life annuity',
    body: 'Pays income for as long as the annuitant lives. It is strongest for protecting against outliving money, but it can leave less for an estate if death happens early.'
  },
  {
    title: 'Term-certain annuity',
    body: 'Pays income for a fixed period such as 10 or 20 years. It is more predictable for a set timeframe, but it does not protect against living past the chosen term.'
  },
  {
    title: 'Joint life annuity',
    body: 'Pays while either spouse or partner is still alive, depending on the contract. It is often used when household income continuity matters more than the highest initial payment.'
  }
] as const;

export const outcomeFeatures = [
  {
    title: 'Guarantee period',
    body: 'A minimum payout period. If death happens before the period ends, payments usually continue to a beneficiary for the rest of that guaranteed term.'
  },
  {
    title: 'Cash refund or installment refund',
    body: 'A feature designed to return some or all of the unpaid purchase amount if death happens before enough income has been received.'
  },
  {
    title: 'Survivor option',
    body: 'A feature that keeps payments going to a surviving spouse or partner, often at 100 percent or a reduced level such as 60 percent or 75 percent.'
  },
  {
    title: 'Certain period plus life',
    body: 'A hybrid approach where payments continue for life but also come with a guaranteed minimum number of years.'
  }
] as const;

export const annuityExamples = [
  {
    title: 'Life annuity example',
    body: 'A 65-year-old uses $100,000 to buy a life annuity. The monthly payment is based on age, interest rates, and contract features. If that person dies after 2 years, total payments received could be less than $100,000 unless a guarantee period or refund option was added. If that person lives to 100, total payments may exceed the original deposit by a wide margin.'
  },
  {
    title: '20-year certain annuity example',
    body: 'A 65-year-old uses $100,000 to buy a 20-year certain annuity. Payments continue for 20 years whether the person lives the whole period or not. If death happens after 2 years, the remaining years of payments generally continue to the beneficiary or estate. But if the person lives beyond the 20-year term, payments stop when the contract term ends.'
  }
] as const;

export const comparisonRows = [
  {
    feature: 'Payment duration',
    life: 'For life of one annuitant',
    termCertain: 'For a fixed number of years',
    jointLife: 'For as long as one of two annuitants is alive'
  },
  {
    feature: 'Risk of dying early',
    life: 'Higher unless guarantees or refunds are added',
    termCertain: 'Lower because remaining payments usually continue',
    jointLife: 'Lower for the household when one survivor remains'
  },
  {
    feature: 'Risk of outliving income',
    life: 'Low, because payments continue for life',
    termCertain: 'Higher, because payments stop at the end of the term',
    jointLife: 'Low for the covered couple, because payments continue while either lives'
  },
  {
    feature: 'Estate value',
    life: 'Can be limited if death is early and no refund feature applies',
    termCertain: 'Usually stronger if death happens during the term',
    jointLife: 'Often secondary to spousal income protection'
  },
  {
    feature: 'Spousal protection',
    life: 'Not built in unless a separate option is added',
    termCertain: 'Only if the beneficiary or structure supports it',
    jointLife: 'Built for ongoing income to the surviving spouse or partner'
  },
  {
    feature: 'Predictability',
    life: 'Predictable for life, but total value depends on lifespan',
    termCertain: 'Predictable for a known period',
    jointLife: 'Predictable for the household, though initial payment may be lower'
  }
] as const;

export const whatHappensIfItems = [
  {
    question: 'I die after 2 years?',
    answer: 'With a pure life annuity, payments may stop immediately at death. With a guarantee period, refund feature, or term-certain structure, payments or value may continue to a beneficiary or estate.'
  },
  {
    question: 'I live to 100?',
    answer: 'A life annuity can keep paying for as long as you live, which is why it is often described as a longevity-risk product. A term-certain annuity stops when the term ends even if you are still alive.'
  },
  {
    question: 'I want my spouse protected?',
    answer: 'A joint life annuity or a survivor option is usually the structure to examine. These features trade some initial payment level for stronger income continuity after one spouse dies.'
  },
  {
    question: 'I want payments for a guaranteed minimum period?',
    answer: 'Ask about a guarantee period or a life annuity with a certain period. That can help avoid the harshest early-death outcome.'
  },
  {
    question: 'I want my estate to receive something if I die early?',
    answer: 'Ask whether the contract includes a cash refund, installment refund, or another death-before-payout-complete feature. Not every annuity includes this automatically.'
  }
] as const;

export const pros = [
  'Can create predictable retirement income from a lump sum.',
  'Can protect against the risk of living longer than expected.',
  'Can be structured to include spousal or minimum-period protection.',
  'Can simplify a portion of retirement cash-flow planning.'
] as const;

export const cons = [
  'Can leave less to an estate if death happens early.',
  'Can be hard to compare because payout options change the outcome.',
  'Can reduce flexibility once funds are committed.',
  'Can include fees, lower liquidity, or feature tradeoffs depending on the contract.'
] as const;

export const buyerQuestions = [
  'Is this a life annuity, term-certain annuity, joint life annuity, or another structure?',
  'When do payments start, and how long can they continue?',
  'What happens if death happens early?',
  'Is there a guarantee period, refund option, or survivor feature?',
  'What is guaranteed and what depends on assumptions or contract design?',
  'How does this fit with the rest of the retirement-income plan?' 
] as const;
