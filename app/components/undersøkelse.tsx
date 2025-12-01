'use client'
import React, { useState } from 'react';
import Selection from './ui/selection';

export default function Undersøkelse() {
  const [skole, setSkole] = useState({
    name: '', // Skolens navn
    
    // Sosialt - nåsituasjon (I = is/er)
    pauseUteI: {id: 1, value: 0},
    sportIPauseI: {id: 2, value: 0},
    brettspillIKlasseI: {id: 3, value: 0},
    klasseAktiviteterUtenforI: {id: 4, value: 0},
    festingI: {id: 5, value: 0},
    festMulighetI: {id: 6, value: 0},
    kantinaSosialI: {id: 7, value: 0},
    laererMotiverendeI: {id: 8, value: 0},
    
    // Læringsmiljø - nåsituasjon (I = is/er)
    laeringsmiljoI: {id: 9, value: 0},
    handOppI: {id: 10, value: 0},
    elevJobberI: {id: 11, value: 0},
    alleVilBraKarakterI: {id: 12, value: 0},
    karakterpressI: {id: 13, value: 0},
    laererFlinkeI: {id: 14, value: 0},
    snakkeOmKarakterI: {id: 15, value: 0},
    snakkeVoksneI: {id: 16, value: 0},
    skamDaarligKarakterI: {id: 17, value: 0},
    gymlaererStrengeI: {id: 18, value: 0},
    gymlaererInnsatsI: {id: 19, value: 0},
    
    // Fysisk - nåsituasjon (I = is/er)
    kantineI: {id: 20, value: 0},
    sportbaneI: {id: 21, value: 0},
    sitteplasserI: {id: 22, value: 0},
    butikkNaerI: {id: 23, value: 0},
    sentrumSkolenI: {id: 24, value: 0}
  });

  const [elev, setElev] = useState({
    school: '',
    likeSchool: null,
    
    // Sosialt - ønsker (W = want/ønsker)
    pauseUteW: {id: 1, value: null},
    sportIPauseW: {id: 2, value: null},
    brettspillIKlasseW: {id: 3, value: null},
    klasseAktiviteterUtenforW: {id: 4, value: null},
    festMiljoW: {id: 5, value: null},
    festDeltakelseW: {id: 6, value: null},
    kantinaSosialW: {id: 7, value: null},
    laererAktiviteterW: {id: 8, value: null},
    butikkIPauseW: {id: 25, value: null},
    sentrumW: {id: 26, value: null},
    
    // Læringsmiljø - ønsker (W = want/ønsker)
    alleVilBraKarakterW: {id: 9, value: null},
    handOppW: {id: 10, value: null},
    elevJobberW: {id: 11, value: null},
    alleOnskerBraKarakterW: {id: 12, value: null},
    karakterpressW: {id: 13, value: null},
    laererFlinkeW: {id: 14, value: null},
    snakkeOmKarakterW: {id: 15, value: null},
    snakkeVoksneW: {id: 16, value: null},
    skamDaarligKarakterW: {id: 17, value: null},
    gymlaererStrengeW: {id: 18, value: null},
    gymlaererInnsatsW: {id: 19, value: null},

    // Fysisk - ønsker (W = want/ønsker)
    kantineW: {id: 20, value: null},
    sportbaneW: {id: 21, value: null},
    sitteplasserW: {id: 22, value: null},
    butikkNaerW: {id: 23, value: null},
    sentrumSkolenW: {id: 24, value: null}
  });

  // Hjelpefunksjon for å konvertere data tilbake til "yes"/"no" for visning
  const getDisplayValue = (name: string): string => {
    let value;
    if (name.endsWith('I')) {
      value = (skole as any)[name];
    } else if (name.endsWith('W')) {
      value = (elev as any)[name];
    } else if (name === 'likeSchool') {
      value = elev.likeSchool;
    }
    
    if (typeof value === 'object' && value !== null && 'value' in value) {
      const objValue = value.value;
      
      // For skole data (1/-1/0 format)
      if (name.endsWith('I')) {
        if (objValue === 1) return "yes";
        if (objValue === -1) return "no";
        return "";
      }
      // For elev data (true/false/null format)
      else {
        if (objValue === true) return "yes";
        if (objValue === false) return "no";
        return "";
      }
    }
    
    // For direkte verdier som likeSchool
    if (value === true) return "yes";
    if (value === false) return "no";
    if (value === 1) return "yes";
    if (value === -1) return "no";
    return "";
  };

  const handleInputChange = (name: string, value: any) => {
    let convertedValue = value;
    
    // Sjekk om feltet tilhører skole (ender med "I") eller elev (ender med "W")
    if (name.endsWith('I')) {
      // For skole data: konverter til 1, 0, -1 format
      if (value === "yes") convertedValue = 1;
      else if (value === "no") convertedValue = -1;
      else convertedValue = 0; // default
      
      // Oppdater skole state
      setSkole(prev => ({
        ...prev,
        [name]: {
          ...(prev[name as keyof typeof prev] as any),
          value: convertedValue
        }
      }));
    } else if (name.endsWith('W')) {
      // For elev data: konverter til true/false/null format
      if (value === "yes") convertedValue = true;
      else if (value === "no") convertedValue = false;
      else convertedValue = null; // default
      
      // Oppdater elev state
      setElev(prev => ({
        ...prev,
        [name]: {
          ...(prev[name as keyof typeof prev] as any),
          value: convertedValue
        }
      }));
    } else if (name === 'schoolName') {
      // Oppdater skolens navn
      setSkole(prev => ({
        ...prev,
        name: value
      }));
    } else {
      // For andre felt som school, likeSchool
      if (value === "yes") convertedValue = true;
      else if (value === "no") convertedValue = false;
      else convertedValue = null;
      
      setElev(prev => ({
        ...prev,
        [name]: convertedValue
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Hent FormData fra skjemaet
    const formData = new FormData(e.target as HTMLFormElement);
    const data: any = {};
    
    // Konverter FormData til object
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    
    console.log('Skole data:', skole);
    console.log('Elev data:', elev);
    console.log('Form data:', data);
    
    // Her kan du sende data til database senere
    // await sendSurveyData({ skole, elev, formData: data });
  };
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">spørre undersøkelse</h1>
            <p>her skal du svare på en spørreunderskelse om skolen din og deg</p>
            
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}> 
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="schoolName">Hva heter skolen din?</label>
                    <input 
                        type="text" 
                        id="schoolName" 
                        name="schoolName" 
                        value={skole.name}
                        onChange={(e) => handleInputChange('schoolName', e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2" 
                        placeholder="Skriv inn skolens navn"
                    />
                </div>
                
                <Selection 
                    type="yesno" 
                    label="Liker du skolen din?" 
                    name="likeSchool"
                    value={getDisplayValue('likeSchool')}
                    onChange={(value) => handleInputChange('likeSchool', value)}
                />

                {/* Sosialt - Nåsituasjon */}
                <h2 className="text-xl font-semibold mt-8 mb-4">Sosialt - Hvordan er det nå?</h2>
                
                <Selection type="yesno" label="Bruker folk friminutter ute?" name="pauseUteI" value={getDisplayValue('pauseUteI')} onChange={(value) => handleInputChange('pauseUteI', value)} />
                <Selection type="yesno" label="Ser du folk eller spiller du selv fotball/basketball eller lignende i friminutt?" name="sportIPauseI" value={getDisplayValue('sportIPauseI')} onChange={(value) => handleInputChange('sportIPauseI', value)} />
                <Selection type="yesno" label="Spiller folk brettspill i klasserom i friminutt?" name="brettspillIKlasseI" value={getDisplayValue('brettspillIKlasseI')} onChange={(value) => handleInputChange('brettspillIKlasseI', value)} />
                <Selection type="yesno" label="Gjør klassen din noe felles aktiviteter utenfor skolen?" name="klasseAktiviteterUtenforI" value={getDisplayValue('klasseAktiviteterUtenforI')} onChange={(value) => handleInputChange('klasseAktiviteterUtenforI', value)} />
                <Selection type="yesno" label="Opplever du at folk på skolen fester?" name="festingI" value={getDisplayValue('festingI')} onChange={(value) => handleInputChange('festingI', value)} />
                <Selection type="yesno" label="Får de fleste muligheten til å være på fester hvis det er fester?" name="festMulighetI" value={getDisplayValue('festMulighetI')} onChange={(value) => handleInputChange('festMulighetI', value)} />
                <Selection type="yesno" label="Sitter folk i kantina under friminutt for å sosialisere?" name="kantinaSosialI" value={getDisplayValue('kantinaSosialI')} onChange={(value) => handleInputChange('kantinaSosialI', value)} />
                <Selection type="yesno" label="Er lærerne motiverende til sosiale aktiviteter?" name="laererMotiverendeI" value={getDisplayValue('laererMotiverendeI')} onChange={(value) => handleInputChange('laererMotiverendeI', value)} />
                
                {/* Sosialt - Ønsker */}
                <h2 className="text-xl font-semibold mt-8 mb-4">Sosialt - Hva ønsker du?</h2>
                
                <Selection type="yesno" label="Ønsker du å bruke friminutter ute?" name="pauseUteW" value={getDisplayValue('pauseUteW')} onChange={(value) => handleInputChange('pauseUteW', value)} />
                <Selection type="yesno" label="Ønsker du å spille fotball/basketball eller lignende i friminutt?" name="sportIPauseW" value={getDisplayValue('sportIPauseW')} onChange={(value) => handleInputChange('sportIPauseW', value)} />
                <Selection type="yesno" label="Ønsker du å spille brettspill i klasserom i friminutt?" name="brettspillIKlasseW" value={getDisplayValue('brettspillIKlasseW')} onChange={(value) => handleInputChange('brettspillIKlasseW', value)} />
                <Selection type="yesno" label="Ønsker du å ha felles aktiviteter med klassen utenfor skolen?" name="klasseAktiviteterUtenforW" value={getDisplayValue('klasseAktiviteterUtenforW')} onChange={(value) => handleInputChange('klasseAktiviteterUtenforW', value)} />
                <Selection type="yesno" label="Ønsker du at det skal være festmiljø på skolen?" name="festMiljoW" value={getDisplayValue('festMiljoW')} onChange={(value) => handleInputChange('festMiljoW', value)} />
                <Selection type="yesno" label="Ønsker du å være med på fester?" name="festDeltakelseW" value={getDisplayValue('festDeltakelseW')} onChange={(value) => handleInputChange('festDeltakelseW', value)} />
                <Selection type="yesno" label="Ønsker du å spise lunsj og henge med venner/andre i kantina?" name="kantinaSosialW" value={getDisplayValue('kantinaSosialW')} onChange={(value) => handleInputChange('kantinaSosialW', value)} />
                <Selection type="yesno" label="Ønsker du at lærere skal arrangere felles sosiale aktiviteter for klassen?" name="laererAktiviteterW" value={getDisplayValue('laererAktiviteterW')} onChange={(value) => handleInputChange('laererAktiviteterW', value)} />
                <Selection type="yesno" label="Ønsker du å kunne gå på butikken i friminutt?" name="butikkIPauseW" value={getDisplayValue('butikkIPauseW')} onChange={(value) => handleInputChange('butikkIPauseW', value)} />
                <Selection type="yesno" label="Foretrekker du at skolen ligger i sentrum framfor i nærområdet?" name="sentrumW" value={getDisplayValue('sentrumW')} onChange={(value) => handleInputChange('sentrumW', value)} />

                {/* Læringsmiljø - Nåsituasjon */}
                <h2 className="text-xl font-semibold mt-8 mb-4">Læringsmiljø - Hvordan er det nå?</h2>
                
                <Selection type="yesno" label="Er læringsmiljøet på skolen bra?" name="laeringsmiljoI" value={getDisplayValue('laeringsmiljoI')} onChange={(value) => handleInputChange('laeringsmiljoI', value)} />
                <Selection type="yesno" label="Rekker folk opp hånda i timen?" name="handOppI" value={getDisplayValue('handOppI')} onChange={(value) => handleInputChange('handOppI', value)} />
                <Selection type="yesno" label="Føler du at elevene jobber når lærere ber om det?" name="elevJobberI" value={getDisplayValue('elevJobberI')} onChange={(value) => handleInputChange('elevJobberI', value)} />
                <Selection type="yesno" label="Føler du at alle ønsker bra karakterer?" name="alleVilBraKarakterI" value={getDisplayValue('alleVilBraKarakterI')} onChange={(value) => handleInputChange('alleVilBraKarakterI', value)} />
                <Selection type="yesno" label="Er det karakterpress på skolen?" name="karakterpressI" value={getDisplayValue('karakterpressI')} onChange={(value) => handleInputChange('karakterpressI', value)} />
                <Selection type="yesno" label="Er lærerne flinke?" name="laererFlinkeI" value={getDisplayValue('laererFlinkeI')} onChange={(value) => handleInputChange('laererFlinkeI', value)} />
                <Selection type="yesno" label="Føler du at du kan snakke med læreren din om karakterer og mål?" name="snakkeOmKarakterI" value={getDisplayValue('snakkeOmKarakterI')} onChange={(value) => handleInputChange('snakkeOmKarakterI', value)} />
                <Selection type="yesno" label="Føler du at du kan snakke med noen voksne på skolen hvis du ikke har det så bra?" name="snakkeVoksneI" value={getDisplayValue('snakkeVoksneI')} onChange={(value) => handleInputChange('snakkeVoksneI', value)} />
                <Selection type="yesno" label="Føler du at det er kleint eller skamfult å få dårlige karakterer?" name="skamDaarligKarakterI" value={getDisplayValue('skamDaarligKarakterI')} onChange={(value) => handleInputChange('skamDaarligKarakterI', value)} />
                <Selection type="yesno" label="Er gymlærerne strenge?" name="gymlaererStrengeI" value={getDisplayValue('gymlaererStrengeI')} onChange={(value) => handleInputChange('gymlaererStrengeI', value)} />
                <Selection type="yesno" label="Er gymlæreren opptatt av innsats eller prestasjon?" name="gymlaererInnsatsI" value={getDisplayValue('gymlaererInnsatsI')} onChange={(value) => handleInputChange('gymlaererInnsatsI', value)} />
                
                {/* Læringsmiljø - Ønsker */}
                <h2 className="text-xl font-semibold mt-8 mb-4">Læringsmiljø - Hva ønsker du?</h2>
                
                <Selection type="yesno" label="Vil du at alle skal ønske å være flinke på skolen?" name="alleVilBraKarakterW" value={getDisplayValue('alleVilBraKarakterW')} onChange={(value) => handleInputChange('alleVilBraKarakterW', value)} />
                <Selection type="yesno" label="Ønsker du at folk skal rekke opp hånda i timen?" name="handOppW" value={getDisplayValue('handOppW')} onChange={(value) => handleInputChange('handOppW', value)} />
                <Selection type="yesno" label="Ønsker du at elever skal jobbe når lærere ber om det?" name="elevJobberW" value={getDisplayValue('elevJobberW')} onChange={(value) => handleInputChange('elevJobberW', value)} />
                <Selection type="yesno" label="Ønsker du at alle skal ønske bra karakterer?" name="alleOnskerBraKarakterW" value={getDisplayValue('alleOnskerBraKarakterW')} onChange={(value) => handleInputChange('alleOnskerBraKarakterW', value)} />
                <Selection type="yesno" label="Ønsker du karakterpress på skolen?" name="karakterpressW" value={getDisplayValue('karakterpressW')} onChange={(value) => handleInputChange('karakterpressW', value)} />
                <Selection type="yesno" label="Ønsker du at lærerne skal være flinke?" name="laererFlinkeW" value={getDisplayValue('laererFlinkeW')} onChange={(value) => handleInputChange('laererFlinkeW', value)} />
                <Selection type="yesno" label="Ønsker du å kunne snakke med læreren din om karakterer og mål?" name="snakkeOmKarakterW" value={getDisplayValue('snakkeOmKarakterW')} onChange={(value) => handleInputChange('snakkeOmKarakterW', value)} />
                <Selection type="yesno" label="Ønsker du å kunne snakke med noen voksne på skolen hvis du ikke har det så bra?" name="snakkeVoksneW" value={getDisplayValue('snakkeVoksneW')} onChange={(value) => handleInputChange('snakkeVoksneW', value)} />
                <Selection type="yesno" label="Ønsker du at det skal være kleint eller skamfult å få dårlige karakterer?" name="skamDaarligKarakterW" value={getDisplayValue('skamDaarligKarakterW')} onChange={(value) => handleInputChange('skamDaarligKarakterW', value)} />
                <Selection type="yesno" label="Ønsker du at gymlærerne skal være strenge?" name="gymlaererStrengeW" value={getDisplayValue('gymlaererStrengeW')} onChange={(value) => handleInputChange('gymlaererStrengeW', value)} />
                <Selection type="yesno" label="Ønsker du at gymlæreren skal være opptatt av innsats eller prestasjon?" name="gymlaererInnsatsW" value={getDisplayValue('gymlaererInnsatsW')} onChange={(value) => handleInputChange('gymlaererInnsatsW', value)} />

                {/* Fysisk - Nåsituasjon */}
                <h2 className="text-xl font-semibold mt-8 mb-4">Fysiske forhold - Hvordan er det nå?</h2>
                
                <Selection type="yesno" label="Har dere kantine på skolen?" name="kantineI" value={getDisplayValue('kantineI')} onChange={(value) => handleInputChange('kantineI', value)} />
                <Selection type="yesno" label="Har dere basketball- eller fotballbane?" name="sportbaneI" value={getDisplayValue('sportbaneI')} onChange={(value) => handleInputChange('sportbaneI', value)} />
                <Selection type="yesno" label="Har dere plasser å sitte i skolegården?" name="sitteplasserI" value={getDisplayValue('sitteplasserI')} onChange={(value) => handleInputChange('sitteplasserI', value)} />
                <Selection type="yesno" label="Er det butikk i nærområdet til skolen?" name="butikkNaerI" value={getDisplayValue('butikkNaerI')} onChange={(value) => handleInputChange('butikkNaerI', value)} />
                <Selection type="yesno" label="Ligger skolen midt i byen?" name="sentrumSkolenI" value={getDisplayValue('sentrumSkolenI')} onChange={(value) => handleInputChange('sentrumSkolenI', value)} />

                {/* Fysisk - Ønsker */}
                <h2 className="text-xl font-semibold mt-8 mb-4">Fysiske forhold - Hva ønsker du?</h2>
                
                <Selection type="yesno" label="Ønsker du at skolen skal ha kantine?" name="kantineW" value={getDisplayValue('kantineW')} onChange={(value) => handleInputChange('kantineW', value)} />
                <Selection type="yesno" label="Ønsker du at skolen skal ha basketball- eller fotballbane?" name="sportbaneW" value={getDisplayValue('sportbaneW')} onChange={(value) => handleInputChange('sportbaneW', value)} />
                <Selection type="yesno" label="Ønsker du at skolen skal ha flere plasser å sitte i skolegården?" name="sitteplasserW" value={getDisplayValue('sitteplasserW')} onChange={(value) => handleInputChange('sitteplasserW', value)} />
                <Selection type="yesno" label="Ønsker du at det skal være butikk i nærområdet til skolen?" name="butikkNaerW" value={getDisplayValue('butikkNaerW')} onChange={(value) => handleInputChange('butikkNaerW', value)} />
                <Selection type="yesno" label="Ønsker du at skolen skal ligge midt i byen?" name="sentrumSkolenW" value={getDisplayValue('sentrumSkolenW')} onChange={(value) => handleInputChange('sentrumSkolenW', value)} />
                
                <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Send inn
                </button>
            </form>
        </div>
    );
}