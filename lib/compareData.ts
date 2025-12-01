let skole = {
    // Sosialt - nåsituasjon (I = is/er)
    pauseUteI: {id: 1, value: 5},
    sportIPauseI: {id: 2, value: -3},
    brettspillIKlasseI: {id: 3, value: 2},
    klasseAktiviteterUtenforI: {id: 4, value: -7},
    festingI: {id: 5, value: 8},
    festMulighetI: {id: 6, value: -2},
    kantinaSosialI: {id: 7, value: 4},
    laererMotiverendeI: {id: 8, value: -5},
    
    // Læringsmiljø - nåsituasjon (I = is/er)
    laeringsmiljoI: {id: 9, value: 6},
    handOppI: {id: 10, value: -4},
    elevJobberI: {id: 11, value: 7},
    alleVilBraKarakterI: {id: 12, value: 9},
    karakterpressI: {id: 13, value: -8},
    laererFlinkeI: {id: 14, value: 3},
    snakkeOmKarakterI: {id: 15, value: -1},
    snakkeVoksneI: {id: 16, value: 0},
    skamDaarligKarakterI: {id: 17, value: -6},
    gymlaererStrengeI: {id: 18, value: 10},
    gymlaererInnsatsI: {id: 19, value: 2},
    
    // Fysisk - nåsituasjon (I = is/er)
    kantineI: {id: 20, value: 4},
    sportbaneI: {id: 21, value: 8},
    sitteplasserI: {id: 22, value: -3},
    butikkNaerI: {id: 23, value: 2},
    sentrumSkolenI: {id: 24, value: -9}
}

let elev = {
    // Sosialt - ønsker (W = want/ønsker)
    pauseUteW: {id: 1, value: true},
    sportIPauseW: {id: 2, value: true},
    brettspillIKlasseW: {id: 3, value: false},
    klasseAktiviteterUtenforW: {id: 4, value: true},
    festMiljoW: {id: 5, value: true},
    festDeltakelseW: {id: 6, value: true},
    kantinaSosialW: {id: 7, value: true},
    laererAktiviteterW: {id: 8, value: false},
    butikkIPauseW: {id: 25, value: false},
    sentrumW: {id: 26, value: true},
    
    // Læringsmiljø - ønsker (W = want/ønsker)
    bralæringsmiljø: {id: 9, value: true},
    handOppW: {id: 10, value: true},
    elevJobberW: {id: 11, value: true},
    alleOnskerBraKarakterW: {id: 12, value: true},
    karakterpressW: {id: 13, value: true},
    laererFlinkeW: {id: 14, value: true},
    snakkeOmKarakterW: {id: 15, value: true},
    snakkeVoksneW: {id: 16, value: true},
    skamDaarligKarakterW: {id: 17, value: false},
    gymlaererStrengeW: {id: 18, value: true},
    gymlaererInnsatsW: {id: 19, value: true},

    
    // Fysisk - ønsker (W = want/ønsker)
    kantineW: {id: 20, value: true},
    sportbaneW: {id: 21, value: true},
    sitteplasserW: {id: 22, value: false},
    butikkNaerW: {id: 23, value: true},
    sentrumSkolenW: {id: 24, value: true}
}

let score = 0;

const elevMap = () => {
    // Reset score
    score = 0;
    
    // Konverter elev object til array av verdier
    const elevValues = Object.values(elev);
    
    elevValues.forEach((item) => {
        // Finn matchende skole-verdi basert på ID
        const skoleEntry = Object.values(skole).find(skoleItem => skoleItem.id === item.id);
        
        if (skoleEntry) {
            if (item.value === true) {
                // Hvis eleven ønsker dette og skolen har positiv verdi: legg til 1
                // Hvis eleven ønsker dette og skolen har negativ verdi: trekk fra 1
                if (skoleEntry.value > 0) {
                    score += 1;
                } else if (skoleEntry.value < 0) {
                    score -= 1;
                }else {
                    // Skoleverdi er 0, ingen endring i score
                }
            } else if (item.value === false) {
                // Hvis eleven IKKE ønsker dette og skolen har positiv verdi: trekk fra 1
                // Hvis eleven IKKE ønsker dette og skolen har negativ verdi: legg til 1
                if (skoleEntry.value > 0) {
                    score -= 1;
                } else if (skoleEntry.value < 0) {
                    score += 1;
                }else {
                    // Skoleverdi er 0, ingen endring i score 
                    }
            }
        }
    });
    
    return score;
}

// Test funksjonen
const resultat = elevMap();
console.log("Skole data:", skole);
console.log("Elev data:", elev);
console.log("Final score:", resultat);

