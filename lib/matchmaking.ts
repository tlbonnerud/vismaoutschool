// Matchmaking algorithm that calculates school compatibility scores
import { SchoolData, ElevData } from './mockData';

export interface SchoolScore {
  school: SchoolData;
  score: number;
  maxScore: number;
  percentage: number;
}

// Mapping between elev (student) preference IDs and school attribute IDs
const idMapping: Record<number, number> = {
  1: 1,   // pauseUteW -> pauseUteI
  2: 2,   // sportIPauseW -> sportIPauseI
  3: 3,   // brettspillIKlasseW -> brettspillIKlasseI
  4: 4,   // klasseAktiviteterUtenforW -> klasseAktiviteterUtenforI
  5: 5,   // festMiljoW -> festingI
  6: 6,   // festDeltakelseW -> festMulighetI
  7: 7,   // kantinaSosialW -> kantinaSosialI
  8: 8,   // laererAktiviteterW -> laererMotiverendeI
  9: 9,   // bralæringsmiljø -> laeringsmiljoI
  10: 10, // handOppW -> handOppI
  11: 11, // elevJobberW -> elevJobberI
  12: 12, // alleOnskerBraKarakterW -> alleVilBraKarakterI
  13: 13, // karakterpressW -> karakterpressI
  14: 14, // laererFlinkeW -> laererFlinkeI
  15: 15, // snakkeOmKarakterW -> snakkeOmKarakterI
  16: 16, // snakkeVoksneW -> snakkeVoksneI
  17: 17, // skamDaarligKarakterW -> skamDaarligKarakterI
  18: 18, // gymlaererStrengeW -> gymlaererStrengeI
  19: 19, // gymlaererInnsatsW -> gymlaererInnsatsI
  20: 20, // kantineW -> kantineI
  21: 21, // sportbaneW -> sportbaneI
  22: 22, // sitteplasserW -> sitteplasserI
  23: 23, // butikkNaerW -> butikkNaerI
  24: 24, // sentrumSkolenW -> sentrumSkolenI
  25: 23, // butikkIPauseW -> butikkNaerI (similar concept)
  26: 24, // sentrumW -> sentrumSkolenI (similar concept)
};

// Calculate compatibility score between a student and a school
export function calculateScore(elev: ElevData, skole: SchoolData): number {
  let score = 0;
  
  // Get all preference fields from the student (fields ending with W)
  const elevEntries = Object.entries(elev).filter(([key]) => key.endsWith('W'));
  
  // Get all school attribute fields (fields ending with I)
  const skoleValues = Object.entries(skole)
    .filter(([key]) => key.endsWith('I'))
    .reduce((acc, [, value]) => {
      if (typeof value === 'object' && value !== null && 'id' in value) {
        acc[(value as { id: number }).id] = (value as { id: number; value: number }).value;
      }
      return acc;
    }, {} as Record<number, number>);
  
  elevEntries.forEach(([, value]) => {
    if (typeof value === 'object' && value !== null && 'id' in value && 'value' in value) {
      const elevItem = value as { id: number; value: boolean | null };
      const mappedId = idMapping[elevItem.id] || elevItem.id;
      const skoleValue = skoleValues[mappedId];
      
      if (skoleValue !== undefined && elevItem.value !== null) {
        if (elevItem.value === true) {
          // Student wants this - positive school value is good
          if (skoleValue > 0) {
            score += 1;
          } else if (skoleValue < 0) {
            score -= 1;
          }
        } else if (elevItem.value === false) {
          // Student doesn't want this - negative school value is good
          if (skoleValue > 0) {
            score -= 1;
          } else if (skoleValue < 0) {
            score += 1;
          }
        }
      }
    }
  });
  
  return score;
}

// Calculate scores for all schools and return sorted by best match
export function rankSchools(elev: ElevData, schools: SchoolData[]): SchoolScore[] {
  const maxPossibleScore = Object.entries(elev)
    .filter(([key]) => key.endsWith('W'))
    .filter(([, value]) => {
      if (typeof value === 'object' && value !== null && 'value' in value) {
        return (value as { value: boolean | null }).value !== null;
      }
      return false;
    }).length;
  
  const scores = schools.map(school => {
    const rawScore = calculateScore(elev, school);
    return {
      school,
      score: rawScore,
      maxScore: maxPossibleScore,
      percentage: Math.round(((rawScore + maxPossibleScore) / (2 * maxPossibleScore)) * 100)
    };
  });
  
  // Sort by percentage (highest first)
  return scores.sort((a, b) => b.percentage - a.percentage);
}
