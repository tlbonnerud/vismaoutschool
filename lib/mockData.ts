// Mock data for schools with default values using the existing data types from compareData.ts

export interface SchoolData {
  name: string;
  // Sosialt - nåsituasjon (I = is/er)
  pauseUteI: { id: number; value: number };
  sportIPauseI: { id: number; value: number };
  brettspillIKlasseI: { id: number; value: number };
  klasseAktiviteterUtenforI: { id: number; value: number };
  festingI: { id: number; value: number };
  festMulighetI: { id: number; value: number };
  kantinaSosialI: { id: number; value: number };
  laererMotiverendeI: { id: number; value: number };
  // Læringsmiljø - nåsituasjon (I = is/er)
  laeringsmiljoI: { id: number; value: number };
  handOppI: { id: number; value: number };
  elevJobberI: { id: number; value: number };
  alleVilBraKarakterI: { id: number; value: number };
  karakterpressI: { id: number; value: number };
  laererFlinkeI: { id: number; value: number };
  snakkeOmKarakterI: { id: number; value: number };
  snakkeVoksneI: { id: number; value: number };
  skamDaarligKarakterI: { id: number; value: number };
  gymlaererStrengeI: { id: number; value: number };
  gymlaererInnsatsI: { id: number; value: number };
  // Fysisk - nåsituasjon (I = is/er)
  kantineI: { id: number; value: number };
  sportbaneI: { id: number; value: number };
  sitteplasserI: { id: number; value: number };
  butikkNaerI: { id: number; value: number };
  sentrumSkolenI: { id: number; value: number };
}

export interface ElevData {
  name: string;
  school: string;
  likeSchool: boolean | null;
  // Sosialt - ønsker (W = want/ønsker)
  pauseUteW: { id: number; value: boolean | null };
  sportIPauseW: { id: number; value: boolean | null };
  brettspillIKlasseW: { id: number; value: boolean | null };
  klasseAktiviteterUtenforW: { id: number; value: boolean | null };
  festMiljoW: { id: number; value: boolean | null };
  festDeltakelseW: { id: number; value: boolean | null };
  kantinaSosialW: { id: number; value: boolean | null };
  laererAktiviteterW: { id: number; value: boolean | null };
  butikkIPauseW: { id: number; value: boolean | null };
  sentrumW: { id: number; value: boolean | null };
  // Læringsmiljø - ønsker (W = want/ønsker)
  bralæringsmiljø: { id: number; value: boolean | null };
  handOppW: { id: number; value: boolean | null };
  elevJobberW: { id: number; value: boolean | null };
  alleOnskerBraKarakterW: { id: number; value: boolean | null };
  karakterpressW: { id: number; value: boolean | null };
  laererFlinkeW: { id: number; value: boolean | null };
  snakkeOmKarakterW: { id: number; value: boolean | null };
  snakkeVoksneW: { id: number; value: boolean | null };
  skamDaarligKarakterW: { id: number; value: boolean | null };
  gymlaererStrengeW: { id: number; value: boolean | null };
  gymlaererInnsatsW: { id: number; value: boolean | null };
  // Fysisk - ønsker (W = want/ønsker)
  kantineW: { id: number; value: boolean | null };
  sportbaneW: { id: number; value: boolean | null };
  sitteplasserW: { id: number; value: boolean | null };
  butikkNaerW: { id: number; value: boolean | null };
  sentrumSkolenW: { id: number; value: boolean | null };
}

// Mock schools with different characteristics
export const mockSchools: SchoolData[] = [
  {
    name: "Oslo Katedralskole",
    pauseUteI: { id: 1, value: 8 },
    sportIPauseI: { id: 2, value: 3 },
    brettspillIKlasseI: { id: 3, value: 5 },
    klasseAktiviteterUtenforI: { id: 4, value: 7 },
    festingI: { id: 5, value: 6 },
    festMulighetI: { id: 6, value: 5 },
    kantinaSosialI: { id: 7, value: 9 },
    laererMotiverendeI: { id: 8, value: 7 },
    laeringsmiljoI: { id: 9, value: 8 },
    handOppI: { id: 10, value: 6 },
    elevJobberI: { id: 11, value: 9 },
    alleVilBraKarakterI: { id: 12, value: 10 },
    karakterpressI: { id: 13, value: 7 },
    laererFlinkeI: { id: 14, value: 8 },
    snakkeOmKarakterI: { id: 15, value: 6 },
    snakkeVoksneI: { id: 16, value: 7 },
    skamDaarligKarakterI: { id: 17, value: -3 },
    gymlaererStrengeI: { id: 18, value: 4 },
    gymlaererInnsatsI: { id: 19, value: 8 },
    kantineI: { id: 20, value: 9 },
    sportbaneI: { id: 21, value: 5 },
    sitteplasserI: { id: 22, value: 7 },
    butikkNaerI: { id: 23, value: 10 },
    sentrumSkolenI: { id: 24, value: 10 }
  },
  {
    name: "Frogner Videregående",
    pauseUteI: { id: 1, value: 6 },
    sportIPauseI: { id: 2, value: 8 },
    brettspillIKlasseI: { id: 3, value: 2 },
    klasseAktiviteterUtenforI: { id: 4, value: 5 },
    festingI: { id: 5, value: 8 },
    festMulighetI: { id: 6, value: 7 },
    kantinaSosialI: { id: 7, value: 6 },
    laererMotiverendeI: { id: 8, value: 5 },
    laeringsmiljoI: { id: 9, value: 6 },
    handOppI: { id: 10, value: 4 },
    elevJobberI: { id: 11, value: 5 },
    alleVilBraKarakterI: { id: 12, value: 6 },
    karakterpressI: { id: 13, value: 3 },
    laererFlinkeI: { id: 14, value: 7 },
    snakkeOmKarakterI: { id: 15, value: 5 },
    snakkeVoksneI: { id: 16, value: 6 },
    skamDaarligKarakterI: { id: 17, value: -5 },
    gymlaererStrengeI: { id: 18, value: 7 },
    gymlaererInnsatsI: { id: 19, value: 6 },
    kantineI: { id: 20, value: 8 },
    sportbaneI: { id: 21, value: 9 },
    sitteplasserI: { id: 22, value: 6 },
    butikkNaerI: { id: 23, value: 7 },
    sentrumSkolenI: { id: 24, value: 5 }
  },
  {
    name: "Hartvig Nissen",
    pauseUteI: { id: 1, value: 7 },
    sportIPauseI: { id: 2, value: 4 },
    brettspillIKlasseI: { id: 3, value: 6 },
    klasseAktiviteterUtenforI: { id: 4, value: 8 },
    festingI: { id: 5, value: 9 },
    festMulighetI: { id: 6, value: 8 },
    kantinaSosialI: { id: 7, value: 8 },
    laererMotiverendeI: { id: 8, value: 6 },
    laeringsmiljoI: { id: 9, value: 7 },
    handOppI: { id: 10, value: 5 },
    elevJobberI: { id: 11, value: 6 },
    alleVilBraKarakterI: { id: 12, value: 7 },
    karakterpressI: { id: 13, value: 4 },
    laererFlinkeI: { id: 14, value: 7 },
    snakkeOmKarakterI: { id: 15, value: 7 },
    snakkeVoksneI: { id: 16, value: 8 },
    skamDaarligKarakterI: { id: 17, value: -6 },
    gymlaererStrengeI: { id: 18, value: 3 },
    gymlaererInnsatsI: { id: 19, value: 7 },
    kantineI: { id: 20, value: 7 },
    sportbaneI: { id: 21, value: 4 },
    sitteplasserI: { id: 22, value: 8 },
    butikkNaerI: { id: 23, value: 9 },
    sentrumSkolenI: { id: 24, value: 8 }
  },
  {
    name: "Persbråten Videregående",
    pauseUteI: { id: 1, value: 9 },
    sportIPauseI: { id: 2, value: 10 },
    brettspillIKlasseI: { id: 3, value: 3 },
    klasseAktiviteterUtenforI: { id: 4, value: 6 },
    festingI: { id: 5, value: 4 },
    festMulighetI: { id: 6, value: 4 },
    kantinaSosialI: { id: 7, value: 5 },
    laererMotiverendeI: { id: 8, value: 8 },
    laeringsmiljoI: { id: 9, value: 7 },
    handOppI: { id: 10, value: 7 },
    elevJobberI: { id: 11, value: 7 },
    alleVilBraKarakterI: { id: 12, value: 5 },
    karakterpressI: { id: 13, value: -2 },
    laererFlinkeI: { id: 14, value: 6 },
    snakkeOmKarakterI: { id: 15, value: 6 },
    snakkeVoksneI: { id: 16, value: 7 },
    skamDaarligKarakterI: { id: 17, value: -8 },
    gymlaererStrengeI: { id: 18, value: 8 },
    gymlaererInnsatsI: { id: 19, value: 9 },
    kantineI: { id: 20, value: 6 },
    sportbaneI: { id: 21, value: 10 },
    sitteplasserI: { id: 22, value: 8 },
    butikkNaerI: { id: 23, value: 3 },
    sentrumSkolenI: { id: 24, value: -5 }
  },
  {
    name: "Elvebakken Videregående",
    pauseUteI: { id: 1, value: 5 },
    sportIPauseI: { id: 2, value: 2 },
    brettspillIKlasseI: { id: 3, value: 8 },
    klasseAktiviteterUtenforI: { id: 4, value: 4 },
    festingI: { id: 5, value: 3 },
    festMulighetI: { id: 6, value: 3 },
    kantinaSosialI: { id: 7, value: 7 },
    laererMotiverendeI: { id: 8, value: 9 },
    laeringsmiljoI: { id: 9, value: 9 },
    handOppI: { id: 10, value: 8 },
    elevJobberI: { id: 11, value: 10 },
    alleVilBraKarakterI: { id: 12, value: 9 },
    karakterpressI: { id: 13, value: 5 },
    laererFlinkeI: { id: 14, value: 9 },
    snakkeOmKarakterI: { id: 15, value: 8 },
    snakkeVoksneI: { id: 16, value: 9 },
    skamDaarligKarakterI: { id: 17, value: -4 },
    gymlaererStrengeI: { id: 18, value: 2 },
    gymlaererInnsatsI: { id: 19, value: 5 },
    kantineI: { id: 20, value: 8 },
    sportbaneI: { id: 21, value: 3 },
    sitteplasserI: { id: 22, value: 9 },
    butikkNaerI: { id: 23, value: 8 },
    sentrumSkolenI: { id: 24, value: 7 }
  }
];

// Default user/student with pre-filled survey responses
export const defaultUser: ElevData = {
  name: "Ola Nordmann",
  school: "Ungdomsskolen",
  likeSchool: true,
  // Sosialt - ønsker (W = want/ønsker)
  pauseUteW: { id: 1, value: true },
  sportIPauseW: { id: 2, value: true },
  brettspillIKlasseW: { id: 3, value: false },
  klasseAktiviteterUtenforW: { id: 4, value: true },
  festMiljoW: { id: 5, value: true },
  festDeltakelseW: { id: 6, value: true },
  kantinaSosialW: { id: 7, value: true },
  laererAktiviteterW: { id: 8, value: false },
  butikkIPauseW: { id: 25, value: true },
  sentrumW: { id: 26, value: true },
  // Læringsmiljø - ønsker (W = want/ønsker)
  bralæringsmiljø: { id: 9, value: true },
  handOppW: { id: 10, value: true },
  elevJobberW: { id: 11, value: true },
  alleOnskerBraKarakterW: { id: 12, value: true },
  karakterpressW: { id: 13, value: false },
  laererFlinkeW: { id: 14, value: true },
  snakkeOmKarakterW: { id: 15, value: true },
  snakkeVoksneW: { id: 16, value: true },
  skamDaarligKarakterW: { id: 17, value: false },
  gymlaererStrengeW: { id: 18, value: false },
  gymlaererInnsatsW: { id: 19, value: true },
  // Fysisk - ønsker (W = want/ønsker)
  kantineW: { id: 20, value: true },
  sportbaneW: { id: 21, value: true },
  sitteplasserW: { id: 22, value: true },
  butikkNaerW: { id: 23, value: true },
  sentrumSkolenW: { id: 24, value: true }
};

// Labels for displaying survey questions
export const questionLabels: Record<string, string> = {
  pauseUteW: "Ønsker å bruke friminutter ute",
  sportIPauseW: "Ønsker å spille fotball/basketball i friminutt",
  brettspillIKlasseW: "Ønsker å spille brettspill i klasserom",
  klasseAktiviteterUtenforW: "Ønsker felles aktiviteter utenfor skolen",
  festMiljoW: "Ønsker festmiljø på skolen",
  festDeltakelseW: "Ønsker å være med på fester",
  kantinaSosialW: "Ønsker å spise lunsj og henge i kantina",
  laererAktiviteterW: "Ønsker at lærere arrangerer sosiale aktiviteter",
  butikkIPauseW: "Ønsker å kunne gå på butikken i friminutt",
  sentrumW: "Foretrekker skole i sentrum",
  bralæringsmiljø: "Ønsker bra læringsmiljø",
  handOppW: "Ønsker at folk rekker opp hånda i timen",
  elevJobberW: "Ønsker at elever jobber når lærere ber om det",
  alleOnskerBraKarakterW: "Ønsker at alle ønsker bra karakterer",
  karakterpressW: "Ønsker karakterpress på skolen",
  laererFlinkeW: "Ønsker flinke lærere",
  snakkeOmKarakterW: "Ønsker å kunne snakke med læreren om karakterer",
  snakkeVoksneW: "Ønsker å kunne snakke med voksne om problemer",
  skamDaarligKarakterW: "Ønsker at det er skamfullt med dårlige karakterer",
  gymlaererStrengeW: "Ønsker strenge gymlærere",
  gymlaererInnsatsW: "Ønsker at gymlærer fokuserer på innsats",
  kantineW: "Ønsker kantine på skolen",
  sportbaneW: "Ønsker basketball- eller fotballbane",
  sitteplasserW: "Ønsker sitteplasser i skolegården",
  butikkNaerW: "Ønsker butikk i nærområdet",
  sentrumSkolenW: "Ønsker at skolen ligger i sentrum"
};
