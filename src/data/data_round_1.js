    // --- ROUND 1: INTERMEDIATE (B2) - LENGTH NORMALIZED ---
const round1Data = {
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