// src/data/gameData.js

// --- ROUND 1 DATA (B2) ---
export const round1 = {
    passages: [
        { 
            id: 1, 
            title: "TEXT 1: THE HISTORY OF CHOCOLATE", 
            content: `<div class="news-wrapper"><div class="news-body"><p>The origins of chocolate can be traced back to the <span class="adj-word">ancient</span> Olmecs of southern Mexico. Unlike the <span class="adj-word">sweet</span> treat we know today, they consumed cacao as a <span class="adj-word">bitter</span>, <span class="adj-word">frothy</span> drink mixed with spices. <span class="connector">Later</span>, the Mayans revered chocolate as a <span class="adj-word core">sacred</span> gift from the gods, using cacao beans as a form of <span class="adj-word">valuable</span> currency.</p><p>When chocolate arrived in Europe in the 16th century, it was initially a <span class="adj-word">luxury</span> reserved for the <span class="adj-word">wealthy</span> elite. <span class="connector">However</span>, the invention of the steam engine in the Industrial Revolution allowed for <span class="adj-word">mass</span> production. <span class="connector">Consequently</span>, chocolate became <span class="adj-word junk">affordable</span> to the general public, transforming from a <span class="adj-word">ritualistic</span> beverage into a <span class="adj-word">global</span> commodity.</p></div></div>` 
        },
        { 
            id: 2, 
            title: "TEXT 2: ELECTRIC VEHICLES", 
            content: `<div class="academic-text"><p>Electric Vehicles (EVs) are often hailed as the <span class="adj-word core">primary</span> solution to reducing <span class="adj-word">automotive</span> carbon emissions. By replacing the internal combustion engine with an <span class="adj-word">electric</span> motor, EVs produce zero tailpipe pollutants. <span class="connector">Moreover</span>, they offer a <span class="adj-word">quieter</span> driving experience and lower <span class="adj-word">maintenance</span> costs due to fewer <span class="adj-word">moving</span> parts.</p><p><span class="connector">However</span>, challenges remain. The production of EV batteries requires <span class="adj-word junk">intensive</span> mining for lithium and cobalt, which raises <span class="adj-word">ethical</span> and <span class="adj-word">environmental</span> concerns. <span class="connector">Furthermore</span>, the <span class="adj-word junk">limited</span> availability of charging stations creates "range anxiety" for drivers. <span class="connector">Therefore</span>, a <span class="adj-word">complete</span> transition requires not just better cars, but a <span class="adj-word">holistic</span> upgrade of infrastructure.</p></div>` 
        },
        { 
            id: 3, 
            title: "TEXT 3: THE 4-DAY WORK WEEK", 
            content: `<div class="transcript-box"><div class="speech-bubble guest"><span class="speaker">ANALYST REPORT</span><p>The concept of a four-day work week is gaining <span class="adj-word">significant</span> traction. Proponents argue that reducing work hours can actually <span class="adj-word core">increase</span> productivity by preventing burnout. <span class="connector">For instance</span>, a trial in Iceland showed that employees maintained the <span class="adj-word">same</span> output while reporting <span class="adj-word">lower</span> stress levels.</p><p><span class="connector">Conversely</span>, business owners worry about the <span class="adj-word junk">operational</span> costs. Industries that require <span class="adj-word">continuous</span> coverage, like healthcare or customer support, would need to hire <span class="adj-word">additional</span> staff to fill the gaps. <span class="connector">Thus</span>, while the model benefits office workers, it may not be <span class="adj-word junk">universally</span> applicable to all sectors.</p></div></div>` 
        },
        { 
            id: 4, 
            title: "TEXT 4: OCEAN PLASTIC", 
            content: `<div class="log-wrapper"><div class="log-header">// ENVIRONMENTAL LOG</div><div class="log-body"><div class="log-entry">Plastic pollution in the ocean has reached <span class="adj-word">crisis</span> levels. The "Great Pacific Garbage Patch" is a <span class="adj-word">massive</span> accumulation of debris floating between Hawaii and California. <span class="connector">Crucially</span>, the danger is not just the <span class="adj-word">visible</span> trash, but the <span class="adj-word core">microplastics</span>.</p><p>These <span class="adj-word">tiny</span> particles are ingested by marine life, entering the food chain and <span class="adj-word">eventually</span> reaching humans. <span class="connector">Although</span> cleanup efforts are underway, they are merely a <span class="adj-word junk">temporary</span> fix. <span class="connector">Ultimately</span>, the only <span class="adj-word">viable</span> solution is to stop plastic waste at the <span class="adj-word">source</span>.</p></div></div>` 
        }
    ],
    questions: [
        // TEXT 1: CHOCOLATE
        { 
            tId: 1, 
            q: "1. How did the Olmecs originally consume cacao?", 
            opts: [
                "A. They processed beans into sweet bars like modern candy.", 
                "B. They drank a bitter, frothy beverage mixed with spices.", 
                "C. They used only the leaves for medicinal tea, not beans.", 
                "D. They mixed powder with animal fat for high-energy food.", 
                "E. They strictly forbade eating cacao, using it only for trade."
            ], 
            ans: 1 // B
        },
        { 
            tId: 1, 
            q: "2. How did the Mayans view cacao beans?", 
            opts: [
                "A. As a sacred gift from gods and valuable currency.", 
                "B. As a common weed that damaged their important crops.", 
                "C. As a dangerous substance forbidden to the common people.", 
                "D. As a fuel source for burning in temple fires.", 
                "E. As a cheap material for reinforcing mud brick walls."
            ], 
            ans: 0 // A
        },
        { 
            tId: 1, 
            q: "3. What allowed chocolate to become accessible to the public?", 
            opts: [
                "A. The discovery of a faster-growing cacao tree in Europe.", 
                "B. A royal decree by the King that subsidized prices.", 
                "C. Mass production enabled by the steam engine invention.", 
                "D. The sudden collapse of the Mayan empire's trade routes.", 
                "E. The discovery of vast sugar plantations in the Caribbean."
            ], 
            ans: 2 // C
        },
        { 
            tId: 1, 
            q: "4. Before the Industrial Revolution, who consumed chocolate in Europe?", 
            opts: [
                "A. It was a common ration given freely to soldiers.", 
                "B. It was used exclusively for religious ceremonies in church.", 
                "C. It was considered a peasant food due to taste.", 
                "D. It was a luxury reserved for the wealthy elite.", 
                "E. It was completely unknown to anyone outside of Spain."
            ], 
            ans: 3 // D
        },
        { 
            tId: 1, 
            q: "5. What does the word 'commodity' imply in the text?", 
            opts: [
                "A. A rare historical artifact found only in museums.", 
                "B. A religious object used specifically for spiritual worship.", 
                "C. A controlled substance regulated strictly by the government.", 
                "D. A specific type of medicine used for curing illnesses.", 
                "E. A widely available commercial product bought and sold."
            ], 
            ans: 4 // E
        },

        // TEXT 2: EVs
        { 
            tId: 2, 
            q: "6. What is the primary environmental benefit of EVs?", 
            opts: [
                "A. They are significantly faster than traditional gas cars.", 
                "B. They produce zero tailpipe pollutants during operation.", 
                "C. They have a futuristic design appealing to youth.", 
                "D. They are immune to most common car accidents.", 
                "E. They can fly short distances in heavy traffic."
            ], 
            ans: 1 // B
        },
        { 
            tId: 2, 
            q: "7. Why do EVs have lower maintenance costs?", 
            opts: [
                "A. Because mechanics offer special government-subsidized discounts.", 
                "B. Because they have fewer moving parts than engines.", 
                "C. Because the tires are made of durable material.", 
                "D. Because they do not require any brake fluid.", 
                "E. Because manufacturers pay for repairs for the vehicle."
            ], 
            ans: 1 // B
        },
        { 
            tId: 2, 
            q: "8. What is the main ethical concern regarding EV batteries?", 
            opts: [
                "A. The batteries are prone to overheating in summer.", 
                "B. The batteries are too heavy for road infrastructure.", 
                "C. Intensive mining for lithium and cobalt materials.", 
                "D. The factories utilize undocumented labor in assembly.", 
                "E. The batteries emit low levels of harmful radiation."
            ], 
            ans: 2 // C
        },
        { 
            tId: 2, 
            q: "9. What causes 'range anxiety' for drivers?", 
            opts: [
                "A. Driving too fast on the highway losing control.", 
                "B. The fear that the car battery might explode.", 
                "C. Getting lost in a new city without GPS.", 
                "D. Limited availability of charging stations on roads.", 
                "E. Being hit by another vehicle while parking."
            ], 
            ans: 3 // D
        },
        { 
            tId: 2, 
            q: "10. What is required for a complete transition to EVs?", 
            opts: [
                "A. Banning all gasoline-powered cars immediately by law.", 
                "B. Making gasoline illegal to purchase at stations.", 
                "C. Forcing all citizens to move into urban centers.", 
                "D. Providing free electric cars to every household.", 
                "E. A holistic upgrade of infrastructure and grid."
            ], 
            ans: 4 // E
        },

        // TEXT 3: WORK WEEK
        { 
            tId: 3, 
            q: "11. What is the main argument for a 4-day work week?", 
            opts: [
                "A. It prevents burnout and increases overall productivity.", 
                "B. It leads to significantly lower salaries for workers.", 
                "C. It creates more opportunities for office social events.", 
                "D. It allows for longer lunch breaks during work.", 
                "E. It causes increased confusion among management staff."
            ], 
            ans: 0 // A
        },
        { 
            tId: 3, 
            q: "12. What did the Iceland trial show regarding output?", 
            opts: [
                "A. Employees doubled their output by working weekends.", 
                "B. Output remained the same with lower stress.", 
                "C. Companies saved money by closing the office.", 
                "D. Employees quit their jobs to start businesses.", 
                "E. People took longer vacations without asking permission."
            ], 
            ans: 1 // B
        },
        { 
            tId: 3, 
            q: "13. Why are business owners concerned about this model?", 
            opts: [
                "A. They dislike changing established traditions.", 
                "B. They want their employees to suffer.", 
                "C. Operational costs and hiring additional staff.", 
                "D. They worry the office will be empty.", 
                "E. They believe computers cannot handle it."
            ], 
            ans: 2 // C
        },
        { 
            tId: 3, 
            q: "14. Which sector faces difficulty with this model?", 
            opts: [
                "A. Creative arts and graphic design firms.", 
                "B. Software development and programming companies.", 
                "C. Freelance writing and journalism agencies.", 
                "D. Industries requiring continuous coverage like healthcare.", 
                "E. Academic research and university departments."
            ], 
            ans: 3 // D
        },
        { 
            tId: 3, 
            q: "15. The word 'universally' suggests the model is:", 
            opts: [
                "A. A perfect solution for every single person.", 
                "B. Only suitable for space travel industries.", 
                "C. Mandatory by law in all developed nations.", 
                "D. A bad idea that should be abandoned.", 
                "E. Not suitable for application in every sector."
            ], 
            ans: 4 // E
        },

        // TEXT 4: OCEAN PLASTIC
        { 
            tId: 4, 
            q: "16. What is the 'Great Pacific Garbage Patch'?", 
            opts: [
                "A. A massive accumulation of debris in the ocean.", 
                "B. A new volcanic island forming near Hawaii.", 
                "C. A protected marine reserve where fishing is banned.", 
                "D. A popular tourist destination for cruise ships.", 
                "E. A secret military base disguised as a trash pile."
            ], 
            ans: 0 // A
        },
        { 
            tId: 4, 
            q: "17. Why are microplastics dangerous?", 
            opts: [
                "A. Because they are invisible to the naked eye.", 
                "B. Because they clog the engines of fishing boats.", 
                "C. They enter the food chain and reach humans.", 
                "D. Because they change the color of ocean water.", 
                "E. Because they smell bad and ruin the beaches."
            ], 
            ans: 2 // C
        },
        { 
            tId: 4, 
            q: "18. How does the text describe current cleanup efforts?", 
            opts: [
                "A. A permanent solution that will fix the problem.", 
                "B. A complete waste of time and resources.", 
                "C. Merely a temporary fix, not a solution.", 
                "D. Extremely profitable for the companies involved.", 
                "E. Fully automated by advanced robotic systems."
            ], 
            ans: 2 // C
        },
        { 
            tId: 4, 
            q: "19. What is the only 'viable' solution?", 
            opts: [
                "A. Filter the ocean water using giant nets.", 
                "B. Send all the trash into outer space.", 
                "C. Burn all the plastic on giant barges.", 
                "D. Stop plastic waste at the source.", 
                "E. Invent a new type of fish that eats plastic."
            ], 
            ans: 3 // D
        },
        { 
            tId: 4, 
            q: "20. What does 'accumulation' mean?", 
            opts: [
                "A. A sudden explosion or expansion of materials.", 
                "B. A type of industrial cleaning process.", 
                "C. A reduction in the size of the particles.", 
                "D. A scientific experiment conducted at sea.", 
                "E. A gradual gathering or collection of material."
            ], 
            ans: 4 // E
        }
    ]
};

// --- ROUND 2 DATA (C1) ---
export const round2 = {
    passages: [
        { 
            id: 1, 
            title: "TEXT 1: THE ALGORITHMIC BOSS", 
            content: `<div class="academic-text">
                <p>The rise of the "gig economy"—characterized by short-term contracts and freelance work—has sparked intense debate regarding the future of labor. Advocates highlight the <span class="adj-word">unparalleled</span> flexibility it offers, allowing workers to dictate their own schedules and escape the rigid 9-to-5 structure. <span class="connector">However</span>, critics argue that this freedom comes at a <span class="adj-word">steep</span> price: the erosion of <span class="adj-word core">stability</span>. Without a fixed employer, gig workers are often classified as independent contractors, stripping them of fundamental rights like health insurance, paid leave, and collective bargaining power.</p>
                <p>A more <span class="adj-word">insidious</span> issue is "algorithmic management." Unlike a human supervisor who might understand a sick day or a traffic delay, gig platforms use opaque algorithms to assign tasks and rate performance. If a worker's acceptance rate drops below a certain percentage, they may be "de-platformed" (fired) automatically without recourse. This creates a <span class="adj-word junk">precarious</span> environment where the boss is invisible, omniscient, and totally unresponsive to human nuance.</p>
                <p><span class="connector">Consequently</span>, sociologists argue that what appears to be entrepreneurial independence is actually a form of <span class="adj-word">hyper-regulated</span> labor. The worker bears all the risks of the market (vehicle maintenance, insurance, downtime) while the platform retains total control over pricing and distribution. <span class="connector">Therefore</span>, unless labor laws evolve to recognize this new category of "dependent contractor," the gig economy risks reverting to a digital form of <span class="adj-word">feudalism</span>.</p>
            </div>` 
        },
        { 
            id: 2, 
            title: "TEXT 2: THE SPRAWL PARADOX", 
            content: `<div class="news-wrapper"><div class="news-body">
                <p>Urban sprawl refers to the <span class="adj-word">uncontrolled</span> expansion of urban areas into the surrounding countryside, driven by the desire for <span class="adj-word">spacious</span> suburban living. While individual families seek the quiet of the suburbs, the collective result is often detrimental. The most immediate impact is environmental: sprawl enforces a dependency on private vehicles, leading to <span class="adj-word">elevated</span> carbon emissions and severe traffic congestion. <span class="connector">Furthermore</span>, the construction of low-density housing fragments wildlife habitats, threatening local biodiversity more than high-density cities do.</p>
                <p>Economically, sprawl is deceptively expensive. Building roads, sewage lines, and power grids for spread-out populations costs significantly more per capita than in compact urban centers. Municipalities often find themselves in a "<span class="adj-word">growth</span> Ponzi scheme," where they approve new developments just to collect the initial fees to pay for the maintenance of older infrastructure. <span class="connector">Eventually</span>, the tax base cannot support the sprawling network, leading to municipal <span class="adj-word">bankruptcy</span>.</p>
                <p><span class="connector">In contrast</span>, "Smart Growth" initiatives propose <span class="adj-word">high-density</span>, walkable cities with robust public transit. These designs foster social interaction and reduce the ecological footprint. <span class="connector">Thus</span>, curbing sprawl requires a <span class="adj-word">radical</span> shift in city planning philosophy—moving away from car-centric expansion toward human-centric <span class="adj-word core">consolidation</span>.</p>
            </div></div>` 
        },
        { 
            id: 3, 
            title: "TEXT 3: THE BLACK BOX OF AI", 
            content: `<div class="log-wrapper"><div class="log-header">// MEDICAL JOURNAL</div><div class="log-body">
                <div class="log-entry">Artificial Intelligence is revolutionizing diagnostics, with algorithms now analyzing X-rays and MRI scans with greater <span class="adj-word">accuracy</span> than human radiologists. <span class="connector">Crucially</span>, AI can detect <span class="adj-word">subtle</span> patterns in patient data—such as minute retinal changes—that predict diseases like Alzheimer's years before symptoms appear. This predictive capability promises a new era of preventative medicine.</p>
                <p><span class="connector">However</span>, the integration of AI raises the "Black Box" problem. Deep learning models often cannot explain <em>how</em> they reached a specific conclusion; they simply output a probability. In a high-stakes medical setting, this lack of <span class="adj-word">interpretability</span> is dangerous. If an AI recommends a risky surgery based on a correlation that a human doctor cannot see or understand, it creates an <span class="adj-word junk">ethical</span> deadlock regarding trust and consent.</p>
                <p><span class="connector">Furthermore</span>, the question of <span class="adj-word">liability</span> remains unsolved. If an autonomous algorithm makes a fatal error, who is responsible: the doctor who trusted it, the engineer who coded it, or the hospital that bought it? <span class="connector">Therefore</span>, experts argue that AI should serve strictly as an <span class="adj-word">assistive</span> tool to augment human judgment, rather than a replacement for it.</p>
            </div></div>` 
        },
        { 
            id: 4, 
            title: "TEXT 4: THE WEAPONIZATION OF NOSTALGIA", 
            content: `<div class="academic-text">
                <p>Historically, nostalgia was classified as a <span class="adj-word">neurological</span> disorder, akin to depression, believed to be caused by "demons" in the brain. <span class="connector">Conversely</span>, modern psychology views it as a <span class="adj-word core">restorative</span> resource. When individuals face <span class="adj-word">existential</span> threats, loneliness, or rapid societal change, recalling fond memories provides <span class="adj-word">psychological</span> comfort and stability. Research indicates that "productive nostalgia" boosts social connectedness and self-esteem.</p>
                <p><span class="connector">However</span>, there is a dark side: "restorative nostalgia." This variant does not merely recall the past but seeks to <span class="adj-word">reconstruct</span> it. It often relies on a sanitized, mythical version of history that never actually existed. Political movements frequently weaponize this sentiment, promising to return a nation to a "Golden Age." This can lead to <span class="adj-word junk">exclusionary</span> rhetoric, where the "good old days" are defined by who is left out.</p>
                <p><span class="connector">Ultimately</span>, the danger lies in dwelling excessively on the past, which hinders one's ability to adapt to the present. <span class="connector">Thus</span>, nostalgia is most beneficial when used as an emotional anchor to weather storms, rather than a map to steer the ship backward. It should be a bridge to the future, not a <span class="adj-word">retreat</span> from it.</p>
            </div>` 
        }
    ],
    questions: [
        // --- TEXT 1: GIG ECONOMY ---
        { 
            tId: 1, 
            q: "1. What is the primary benefit mentioned by advocates?", 
            opts: [
                "A. It provides a guaranteed income stream that is significantly higher than traditional corporate employment contracts in most sectors.", 
                "B. It offers unparalleled flexibility to dictate one's own schedule.", 
                "C. It offers comprehensive medical benefits and paid vacation time that exceeds what is typically mandated by government labor laws.", 
                "D. It ensures long-term career stability through legally binding contracts that prevent sudden termination without cause.", 
                "E. It allows workers to form powerful unions that can negotiate better wages directly with the platform owners."
            ], 
            ans: 1 // B (Short, hidden by A and C)
        },
        { 
            tId: 1, 
            q: "2. How does 'algorithmic management' differ from human supervision?", 
            opts: [
                "A. It is significantly more lenient and forgiving of mistakes than a human manager would be.", 
                "B. It uses opaque algorithms to fire workers automatically without recourse.", 
                "C. It provides detailed, personalized feedback to help the worker improve their skills over time.", 
                "D. It allows workers to appeal decisions to a neutral third-party arbitration committee.", 
                "E. It focuses solely on rewarding high performance rather than punishing low acceptance rates."
            ], 
            ans: 1 // B (Middle length)
        },
        { 
            tId: 1, 
            q: "3. Sociologists argue that the gig economy risks becoming:", 
            opts: [
                "A. A digital form of feudalism.", 
                "B. A utopian society where every worker is a wealthy business owner.", 
                "C. A completely unregulated free market with no government oversight whatsoever.", 
                "D. A traditional manufacturing economy based on physical goods.", 
                "E. A state-controlled system where the government sets all prices."
            ], 
            ans: 0 // A (Shortest, effectively hidden)
        },
        { 
            tId: 1, 
            q: "4. Why is the gig environment described as 'precarious'?", 
            opts: [
                "A. Because the physical working conditions are often unregulated and frequently lead to severe bodily injuries.", 
                "B. Because the boss is invisible and unresponsive to human nuance.", 
                "C. Because workers are constantly fighting each other physically to secure the best contracts.", 
                "D. Because the software platforms are unstable and crash, causing loss of data.", 
                "E. Because the government is constantly trying to shut down these companies."
            ], 
            ans: 1 // B (Medium length, hidden by A)
        },
        { 
            tId: 1, 
            q: "5. What new legal category does the author suggest?", 
            opts: [
                "A. Full-time salaried employee with benefits.", 
                "B. Completely independent entrepreneur.", 
                "C. Dependent contractor.", 
                "D. Government-subsidized volunteer worker.", 
                "E. International digital nomad visa holder."
            ], 
            ans: 2 // C (Shortest, hidden)
        },

        // --- TEXT 2: URBAN SPRAWL ---
        { 
            tId: 2, 
            q: "6. The 'Growth Ponzi Scheme' refers to municipalities:", 
            opts: [
                "A. Illegally stealing tax money from the federal government to pay themselves.", 
                "B. Approving new developments to pay for old infrastructure.", 
                "C. Investing municipal pension funds into high-risk stock market portfolios.", 
                "D. Refusing to build any new roads in order to save money.", 
                "E. Paying citizens cash bonuses to move out of the city center."
            ], 
            ans: 1 // B (Medium, hidden by A and C)
        },
        { 
            tId: 2, 
            q: "7. Why is sprawl environmentally worse than high-density cities?", 
            opts: [
                "A. It enforces a dependency on private vehicles.", 
                "B. It involves planting too many non-native trees which disrupts the local ecosystem balance.", 
                "C. It consumes vast amounts of water for maintaining private swimming pools and golf courses.", 
                "D. It generates excessive noise pollution that disturbs migrating bird patterns.", 
                "E. It encourages the spread of dangerous invasive species into residential neighborhoods."
            ], 
            ans: 0 // A (Shortest, hidden by B and C)
        },
        { 
            tId: 2, 
            q: "8. What is the core proposal of 'Smart Growth' initiatives?", 
            opts: [
                "A. Constructing wider highways to accommodate more cars and reduce traffic jams.", 
                "B. Creating high-density, walkable cities with public transit.", 
                "C. Banning all new construction to permanently preserve the natural landscape.", 
                "D. Forcing the entire population to move into rural agricultural communities.", 
                "E. Building underground tunnel networks to replace surface roads completely."
            ], 
            ans: 1 // B (Medium, hidden by A and C)
        },
        { 
            tId: 2, 
            q: "9. Why is sprawl considered 'deceptively expensive'?", 
            opts: [
                "A. Because the initial cost of buying land in the suburbs is higher than in the city.", 
                "B. Because building infrastructure for spread-out populations costs more per capita.", 
                "C. Because the price of gasoline is constantly rising due to global inflation.", 
                "D. Because suburban houses are generally larger and require more electricity.", 
                "E. Because local governments tax suburban residents at a much higher rate."
            ], 
            ans: 1 // B (Long, but similar to A and C)
        },
        { 
            tId: 2, 
            q: "10. Curbing sprawl requires a shift toward:", 
            opts: [
                "A. Human-centric consolidation.", 
                "B. Aggressive car-centric expansion.", 
                "C. Traditional agricultural development.", 
                "D. Heavy industrial manufacturing.", 
                "E. Digital remote work policies."
            ], 
            ans: 0 // A (Shortest, hidden)
        },

        // --- TEXT 3: AI IN MEDICINE ---
        { 
            tId: 3, 
            q: "11. The 'Black Box' problem refers to:", 
            opts: [
                "A. The extremely high financial cost of purchasing advanced medical AI licenses.", 
                "B. The inability of AI to explain how it reached a conclusion.", 
                "C. A specific hardware device used to scan patients' brains for tumors.", 
                "D. The risk of the hospital's central server being hacked by cybercriminals.", 
                "E. The dark, claustrophobic environment inside an MRI machine."
            ], 
            ans: 1 // B (Medium, hidden by A)
        },
        { 
            tId: 3, 
            q: "12. How does AI demonstrate its predictive capability?", 
            opts: [
                "A. By completely replacing human surgeons in the operating room during complex procedures.", 
                "B. By detecting subtle patterns in data to predict diseases years in advance.", 
                "C. By automatically calculating the most efficient financial budget for the hospital.", 
                "D. By scheduling appointments for thousands of patients simultaneously without error.", 
                "E. By 3D printing replacement organs using biological material."
            ], 
            ans: 1 // B (Long, but A is longer)
        },
        { 
            tId: 3, 
            q: "13. Why is the issue of liability considered unsolved?", 
            opts: [
                "A. Because doctors stubbornly refuse to admit when they have made a mistake.", 
                "B. Because it is unclear who is responsible if an autonomous algorithm makes an error.", 
                "C. Because patients are legally prohibited from suing hospitals that use AI.", 
                "D. Because insurance companies refuse to cover any procedures involving robotics.", 
                "E. Because the software engineers claim they have diplomatic immunity."
            ], 
            ans: 1 // B (Long, hidden by A and D)
        },
        { 
            tId: 3, 
            q: "14. Experts argue that AI should serve as:", 
            opts: [
                "A. A complete replacement for human doctors.", 
                "B. An assistive tool to augment judgment.", 
                "C. The primary decision maker in emergencies.", 
                "D. A tool strictly for billing and administration.", 
                "E. A research tool not to be used on humans."
            ], 
            ans: 1 // B (Medium)
        },
        { 
            tId: 3, 
            q: "15. What creates the 'ethical deadlock' regarding trust?", 
            opts: [
                "A. The high cost of the technology excludes poor patients from access.", 
                "B. Trusting a recommendation based on correlations humans cannot understand.", 
                "C. The AI system refusing to treat patients with certain pre-existing conditions.", 
                "D. Robots physically taking jobs away from human nurses and staff.", 
                "E. Patients being irrationally afraid of any new technology."
            ], 
            ans: 1 // B (Long, hidden by A)
        },

        // --- TEXT 4: NOSTALGIA ---
        { 
            tId: 4, 
            q: "16. 'Restorative nostalgia' is dangerous because:", 
            opts: [
                "A. It seeks to reconstruct a mythical version of history that never existed.", 
                "B. It causes people to lose their memory of recent events.", 
                "C. It is only experienced by older generations who vote.", 
                "D. It is caused by a serious neurological disorder.", 
                "E. It prevents people from enjoying modern art."
            ], 
            ans: 0 // A (Long, hidden by others)
        },
        { 
            tId: 4, 
            q: "17. Political movements often weaponize nostalgia to:", 
            opts: [
                "A. Promote rapid technological progress.", 
                "B. Promise a return to a 'Golden Age'.", 
                "C. Encourage multicultural integration.", 
                "D. Reduce government spending significantly.", 
                "E. Reform the national education system."
            ], 
            ans: 1 // B (Shortest, hidden)
        },
        { 
            tId: 4, 
            q: "18. Historically, nostalgia was viewed as:", 
            opts: [
                "A. A helpful coping mechanism for stress.", 
                "B. A neurological disorder akin to depression.", 
                "C. A sign of genius and creativity.", 
                "D. A religious experience sent by God.", 
                "E. A form of artistic expression."
            ], 
            ans: 1 // B (Medium)
        },
        { 
            tId: 4, 
            q: "19. The text suggests nostalgia should act as:", 
            opts: [
                "A. A map to steer the ship backward.", 
                "B. An anchor to weather storms.", 
                "C. A weapon to use against enemies.", 
                "D. A wall to block out the future.", 
                "E. A permanent state of mind."
            ], 
            ans: 1 // B (Shortest, hidden)
        },
        { 
            tId: 4, 
            q: "20. What hinders the ability to adapt to the present?", 
            opts: [
                "A. Losing one's memory of the past.", 
                "B. Dwelling excessively on the past.", 
                "C. Spending too much money on antiques.", 
                "D. Reading too many history books.", 
                "E. Refusing to use modern technology."
            ], 
            ans: 1 // B (Medium)
        }
    ]
};

// --- ROUND 3 DATA (BOSS) ---
export const round3 = {
    passages: [
        { 
            id: 1, 
            title: "TEXT 1: ARTIFICIAL CONSCIOUSNESS", 
            content: `<div class="academic-text">
                <p>The quest to create Artificial General Intelligence (AGI) has reignited the ancient philosophical debate regarding the nature of consciousness. Functionalists argue that if a machine can <span class="adj-word">perfectly</span> simulate human behavior—passing the Turing Test with ease—it must be considered conscious. They posit that the "mind" is simply software running on the "hardware" of the brain; <span class="connector">therefore</span>, a silicon substrate could theoretically support the same <span class="adj-word">subjective</span> experience as biological neurons. This view dismisses the "biological chauvinism" that insists consciousness requires organic matter.</p>
                <p><span class="connector">Conversely</span>, proponents of the "Hard Problem" of consciousness, led by David Chalmers, contend that mere information processing does not equate to <span class="adj-word core">sentience</span>. A computer might calculate that fire is hot and display a "pain" alert, but that is <span class="adj-word">fundamentally</span> distinct from <em>feeling</em> the searing sensation of a burn. This creates the "Zombie Argument": a being could be behaviorally <span class="adj-word">indistinguishable</span> from a human yet possess zero inner life, operating purely on syntactic manipulation without semantic understanding.</p>
                <p><span class="connector">Ultimately</span>, the distinction may lie in the integration of information. Integrated Information Theory (IIT) suggests that consciousness is not about output, but about the <span class="adj-word">complexity</span> of the internal network. Under this framework, current LLMs (Large Language Models) are likely "philosophical zombies"—<span class="adj-word">sophisticated</span> mimics that predict text without comprehending the reality behind the symbols. <span class="connector">Thus</span>, true AGI may require a <span class="adj-word junk">radical</span> architectural departure from current deep learning paradigms.</p>
            </div>` 
        },
        { 
            id: 2, 
            title: "TEXT 2: THE GREAT FILTER", 
            content: `<div class="log-wrapper"><div class="log-header">// ASTROBIOLOGY FILE</div><div class="log-body">
                <div class="log-entry">The Fermi Paradox highlights a disturbing silence: in a universe billions of years old with infinite chances for life, why have we not encountered alien civilizations? The "Great Filter" hypothesis offers a <span class="adj-word">chilling</span> solution. It proposes that there is an evolutionary barrier—a probability wall—that is <span class="adj-word">extremely</span> difficult for life to overcome. This filter eliminates almost all species before they can become <span class="adj-word core">interstellar</span> civilizations.</div>
                <br>
                <div class="log-entry">The crucial question for humanity is: is the Filter <em>behind</em> us or <em>ahead</em> of us? If it is behind us, it means the emergence of complex life (or intelligence) is <span class="adj-word">astronomically</span> rare, and we are the lucky survivors. We are <span class="adj-word">unique</span> and likely alone in the galaxy. This, strangely, is the <span class="adj-word">optimistic</span> view, implying our future is open.</div>
                <br>
                <div class="log-entry"><span class="connector">However</span>, if the Filter is ahead of us, the implications are <span class="adj-word junk">catastrophic</span>. It suggests that advanced civilizations inevitably destroy themselves—perhaps through nuclear war, engineered pandemics, or AI misalignment—before colonizing other stars. In this scenario, finding ruins of alien cities on Mars would be the <span class="adj-word">worst</span> possible news, as it would confirm that the Filter lies in our future and our extinction is <span class="adj-word">statistically</span> probable.</div>
            </div></div>` 
        },
        { 
            id: 3, 
            title: "TEXT 3: HYPERINFLATIONARY SPIRALS", 
            content: `<div class="academic-text">
                <p>Hyperinflation is distinct from normal inflation not merely in magnitude, but in the <span class="adj-word">psychological</span> collapse of confidence it represents. It typically begins when a government, unable to tax its citizens or borrow from markets, resorts to printing money to finance a deficit. Initially, this may seem like a <span class="adj-word">harmless</span> stopgap. <span class="connector">However</span>, as the money supply expands faster than economic output, prices rise. If the public expects <em>further</em> printing, the "velocity of money" accelerates—people spend cash <span class="adj-word core">immediately</span> to avoid losing value.</p>
                <p>This creates a vicious feedback loop. As the currency depreciates, tax revenues (collected in nominal terms) become <span class="adj-word">worthless</span> by the time they reach the treasury. To cover this <em>new</em> gap, the government prints even more, causing prices to double in days or even hours. <span class="connector">Historically</span>, this ends only when the currency is abandoned entirely, often wiping out the <span class="adj-word">savings</span> of the middle class.</p>
                <p>The Weimar Republic (1923) and Zimbabwe (2008) serve as grim case studies. In both instances, the crisis was not purely monetary but <span class="adj-word">institutional</span>. Hyperinflation is fundamentally a political failure—a breach of the social contract where the state chooses to <span class="adj-word junk">cannibalize</span> the economy rather than enforce fiscal discipline. <span class="connector">Therefore</span>, stabilization requires not just a new currency, but a restoration of <span class="adj-word">credibility</span>.</p>
            </div>` 
        },
        { 
            id: 4, 
            title: "TEXT 4: RESTORING THE PAST", 
            content: `<div class="transcript-box"><div class="speech-bubble guest"><span class="speaker">DR. ROSSI</span>
                <p>The conservation of ancient frescoes is a delicate balance between <span class="adj-word">preservation</span> and <span class="adj-word">intervention</span>. In the 19th century, restorers often prioritized aesthetic "completeness," painting over damaged areas to make the image look new. <span class="connector">Today</span>, this approach is considered <span class="adj-word junk">unethical</span>. Modern conservation adheres to the principle of "reversibility": any material added to the artwork must be <span class="adj-word">removable</span> by future generations without harming the original layer.</p>
                <p>Science has revolutionized this field. We now use laser ablation to remove centuries of <span class="adj-word">soot</span> and grime without touching the pigment. <span class="connector">Additionally</span>, nanotechnology allows us to inject <span class="adj-word core">calcium</span> hydroxide nanoparticles into the crumbling plaster, re-calcifying the wall and restoring its <span class="adj-word">structural</span> integrity from the inside out.</p>
                <p><span class="connector">Nevertheless</span>, controversy remains regarding the "cleaning" of the Sistine Chapel. Critics argue that removing the dark layers stripped away the shadows Michelangelo <span class="adj-word">intentionally</span> applied secco (on dry plaster). <span class="connector">Thus</span>, every restoration decision is essentially an <span class="adj-word">interpretive</span> act, risking the alteration of the artist's true intent in the name of saving it.</p>
            </div></div>` 
        }
    ],
    questions: [
        // --- TEXT 1: AI CONSCIOUSNESS ---
        { 
            tId: 1, 
            q: "1. Functionalists believe that a machine is conscious if it:", 
            opts: [
                "A. Contains specific biological neurons derived from organic matter found in human brains.", 
                "B. Can perfectly simulate human behavior and pass the Turing Test with ease.", 
                "C. Demonstrates a profound understanding of the deep semantic meaning behind words.", 
                "D. Possesses a spiritual soul given by a higher power beyond science.", 
                "E. Operates on a complex hardware system fundamentally different from silicon chips."
            ], 
            ans: 1 // B (Middle length)
        },
        { 
            tId: 1, 
            q: "2. The 'Zombie Argument' illustrates a scenario where a being:", 
            opts: [
                "A. Is technically dead but brought back to life by advanced technology.", 
                "B. Has deep, complex emotions but cannot express them verbally to others.", 
                "C. Acts human but lacks any internal subjective experience.", 
                "D. Tries to destroy humanity due to a catastrophic error in programming.", 
                "E. Is capable of feeling physical pain but never experiences true joy."
            ], 
            ans: 2 // C (Shortest option, heavily camouflaged by longer A, B, D)
        },
        { 
            tId: 1, 
            q: "3. Integrated Information Theory (IIT) suggests consciousness depends on:", 
            opts: [
                "A. The sheer speed of the processor outputting data to the user.", 
                "B. The complexity of the internal network integration.", 
                "C. The ability to speak multiple human languages fluently and naturally.", 
                "D. The visual realism and expressiveness of the robot's facial features.", 
                "E. The total amount of electricity consumed by the brain's hardware."
            ], 
            ans: 1 // B (Short, hidden between long A & C)
        },
        { 
            tId: 1, 
            q: "4. Why are current LLMs described as 'philosophical zombies'?", 
            opts: [
                "A. They consume far too much energy to be environmentally sustainable long-term.", 
                "B. They move slowly and clumsily like the monsters in horror movies.", 
                "C. They mimic text prediction without comprehending reality.", 
                "D. They are secretly designed to hack into secure government databases.", 
                "E. They stubbornly refuse to answer direct philosophical questions posed by users."
            ], 
            ans: 2 // C (Middle length)
        },
        { 
            tId: 1, 
            q: "5. The text concludes that true AGI might require:", 
            opts: [
                "A. A radical architectural departure from deep learning.", 
                "B. Significantly more data to be fed into the current training models.", 
                "C. Much faster computer chips to process information at higher speeds.", 
                "D. A complete international ban on all artificial intelligence research.", 
                "E. Integrating actual biological brain tissue into the computer circuits."
            ], 
            ans: 0 // A (Shortest, but D and E are very long to distract)

        },

        // --- TEXT 2: THE GREAT FILTER ---
        { 
            tId: 2, 
            q: "6. The 'Great Filter' hypothesis attempts to explain:", 
            opts: [
                "A. Why the universe is expanding at an accelerating rate today.", 
                "B. How life originally began in the oceans of planet Earth.", 
                "C. The lack of contact with alien civilizations.", 
                "D. The complex process of filtering water on the planet Mars.", 
                "E. Why humans are the only species that developed complex language."
            ], 
            ans: 2 // C (Shortest, hidden by long D and E)
        },
        { 
            tId: 2, 
            q: "7. If the Filter is 'behind' us, the text implies that:", 
            opts: [
                "A. We are certainly doomed to extinction in the very near future.", 
                "B. Complex life is astronomically rare and we are lucky.", 
                "C. Advanced aliens are already watching us from a safe distance.", 
                "D. We have already destroyed our original home planet long ago.", 
                "E. The universe is actually teeming with intelligent life forms everywhere."
            ], 
            ans: 1 // B (Middle length)
        },
        { 
            tId: 2, 
            q: "8. Finding alien ruins on Mars would be 'bad news' because:", 
            opts: [
                "A. It would prove that aliens are hostile invaders coming for us.", 
                "B. It would suggest the Filter is ahead of us.", 
                "C. It would introduce dangerous, unknown bacteria to the Earth's ecosystem.", 
                "D. It would cause mass panic and hysteria among the general public.", 
                "E. It would cost far too much money to excavate properly."
            ], 
            ans: 1 // B (Shortest, hidden by very long A and C)
        },
        { 
            tId: 2, 
            q: "9. If the Filter is ahead, civilizations likely end by:", 
            opts: [
                "A. Running out of essential food and water resources on their planet.", 
                "B. Being eaten by a superior galactic predator species from space.", 
                "C. Destroying themselves before colonizing other stars.", 
                "D. Freezing to death when their local sun eventually dies out.", 
                "E. Becoming bored with existence and stopping all technological progress."
            ], 
            ans: 2 // C (Middle length)
        },
        { 
            tId: 2, 
            q: "10. The 'optimistic' view presented in the text is that:", 
            opts: [
                "A. We are unique and our future is open.", 
                "B. Benevolent aliens will come to save us from ourselves eventually.", 
                "C. Future technology will easily solve all of our current problems.", 
                "D. We can upload our minds to computers to live forever.", 
                "E. The universe is actually very small and safe for us."
            ], 
            ans: 0 // A (Shortest, hidden by very long B and C)

        },

        // --- TEXT 3: HYPERINFLATION ---
        { 
            tId: 3, 
            q: "11. Hyperinflation is characterized distinctively by:", 
            opts: [
                "A. A slight, manageable increase in the price of daily bread.", 
                "B. A psychological collapse of confidence in currency.", 
                "C. The government lowering tax rates for every citizen in the country.", 
                "D. An unexpected increase in the value of personal savings accounts.", 
                "E. A massive surplus of cheap goods available in the supermarkets."
            ], 
            ans: 1 // B (Middle length)
        },
        { 
            tId: 3, 
            q: "12. What accelerates the 'velocity of money'?", 
            opts: [
                "A. People responsibly saving their cash for future long-term investments.", 
                "B. The government burning physical money to reduce the total supply.", 
                "C. Public expectation of further money printing.", 
                "D. Banks offering extremely high interest rates on all deposits.", 
                "E. Foreign countries buying the local currency to stabilize the market."
            ], 
            ans: 2 // C (Shortest, hidden by long A and E)
        },
        { 
            tId: 3, 
            q: "13. Why do tax revenues become 'worthless' during the spiral?", 
            opts: [
                "A. Because citizens protest and refuse to pay them illegally.", 
                "B. Because the currency depreciates before reaching the treasury.", 
                "C. Because the government stops collecting taxes entirely to help people.", 
                "D. Because the official tax rate is set far too low.", 
                "E. Because the computer systems fail to track the incoming payments."
            ], 
            ans: 1 // B (Longest, but A and C are also long)
        },
        { 
            tId: 3, 
            q: "14. The text describes hyperinflation as a failure of:", 
            opts: [
                "A. The complex banking computer software systems used by the state.", 
                "B. International trade agreements, tariffs, and global shipping logistics.", 
                "C. Politics and the social contract.", 
                "D. The weather patterns affecting crucial crop harvests in the country.", 
                "E. The physical printing presses running out of ink and paper."
            ], 
            ans: 2 // C (Shortest, camouflaged by very long A and B)
        },
        { 
            tId: 3, 
            q: "15. Stabilization requires a restoration of:", 
            opts: [
                "A. Institutional credibility and fiscal discipline.", 
                "B. The absolute power of the monarchy and the royal family.", 
                "C. A primitive barter system using gold coins instead of paper.", 
                "D. Significantly higher taxes imposed on the poorest citizens.", 
                "E. Printing even more money to pay off all debts immediately."
            ], 
            ans: 0 // A (Shortest, hidden by long B and E)

        },

        // --- TEXT 4: ART RESTORATION ---
        { 
            tId: 4, 
            q: "16. The modern principle of 'reversibility' means that:", 
            opts: [
                "A. Paintings should be hung upside down periodically to rest the canvas.", 
                "B. Added materials must be removable without damage.", 
                "C. Restorers should strictly use only traditional oil-based paints.", 
                "D. The artist's signature must be erased and re-signed.", 
                "E. Only original tools from the era can be used."
            ], 
            ans: 1 // B (Middle length)
        },
        { 
            tId: 4, 
            q: "17. How did 19th-century restorers differ from modern ones?", 
            opts: [
                "A. They prioritized aesthetic completeness over authenticity.", 
                "B. They refused to touch any damaged artworks due to fear.", 
                "C. They used advanced lasers to clean the paintings safely.", 
                "D. They worked only on marble sculptures, never on frescoes.", 
                "E. They were all trained in chemistry before touching art."
            ], 
            ans: 0 // A (Longest, but E is close)
        },
        { 
            tId: 4, 
            q: "18. Nanotechnology allows conservators to:", 
            opts: [
                "A. Create a perfect high-resolution digital copy of the painting.", 
                "B. Inject nanoparticles to re-calcify the wall.", 
                "C. Change the colors of the fresco to look much brighter.", 
                "D. Freeze the painting to kill all bacteria instantly.", 
                "E. Clone the artwork onto a brand new canvas automatically."
            ], 
            ans: 1 // B (Middle length)
        },
        { 
            tId: 4, 
            q: "19. The controversy over the Sistine Chapel involves:", 
            opts: [
                "A. The extremely high cost of the tickets sold to tourists.", 
                "B. The potential removal of intentional shadows.", 
                "C. The use of incorrect paint colors by Michelangelo himself.", 
                "D. The damage caused by camera flashes from visitors.", 
                "E. The controversial religious themes depicted in the artwork."
            ], 
            ans: 1 // B (Shortest, hidden by long A and C)
        },
        { 
            tId: 4, 
            q: "20. Dr. Rossi concludes that every restoration is essentially:", 
            opts: [
                "A. A complete waste of time and money for the museum.", 
                "B. An interpretive act risking the artist's intent.", 
                "C. A strictly scientific experiment with absolutely no risks involved.", 
                "D. A purely mechanical process that machines can do.", 
                "E. A simple cleaning job that anyone can perform."
            ], 
            ans: 1 // B (Middle length)
        }
    ]
};