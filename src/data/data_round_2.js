    // --- ROUND 2: ADVANCED (C1) - CAMO-MAX DISTRACTORS ---
const round2Data = {
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