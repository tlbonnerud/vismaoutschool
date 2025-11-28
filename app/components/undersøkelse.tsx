'use client'
import React, { useState } from 'react';
import Selection from './ui/selection';

export default function Undersøkelse() {
  const [elev, setElev] = useState({
    school: '',
    likeSchool: null,
    
    // Sosialt - nåsituasjon
    useBreaksOutside: null,
    sportsInBreaks: null,
    boardGamesInClass: null,
    classActivitiesOutside: null,
    peopleParty: null,
    partyOpportunity: null,
    cantinaSocializing: null,
    teachersEncourageSocial: null,
    
    // Sosialt - ønsker
    wantBreaksOutside: null,
    wantSportsInBreaks: null,
    wantBoardGames: null,
    wantClassTimeOutside: null,
    wantPartyEnvironment: null,
    wantToParty: null,
    wantCantinaSocial: null,
    wantTeacherActivities: null,
    wantShopInBreaks: null,
    preferCenter: null,
    
    // Læringsmiljø - nåsituasjon
    goodLearningEnvironment: null,
    peopleRaiseHands: null,
    studentsWork: null,
    everyoneWantsGoodGrades: null,
    gradePressure: null,
    teachersGood: null,
    canTalkToTeacherAboutGrades: null,
    canTalkToAdultsAtSchool: null,
    shamefulBadGrades: null,
    gymTeachersStrict: null,
    gymTeacherFocusPerformance: null,
    
    // Læringsmiljø - ønsker
    wantEveryoneToWantSuccess: null,
    wantPeopleRaiseHands: null,
    wantStudentsWork: null,
    wantEveryoneWantGoodGrades: null,
    wantGradePressure: null,
    wantGoodTeachers: null,
    wantTalkToTeacherAboutGrades: null,
    wantTalkToAdultsAtSchool: null,
    wantShamefulBadGrades: null,
    wantStrictGymTeachers: null,
    wantGymTeacherFocusPerformance: null,
    
    // Fysisk
    hasCantine: null,
    hasSportsCourt: null,
    hasSeatingArea: null,
    shopNearby: null,
    schoolInCityCenter: null
  });

  const handleInputChange = (name: string, value: any) => {
    setElev(prev => ({
      ...prev,
      [name]: value
    }));
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
    
    // Kombiner med eksisterende elev data
    const combinedData = {
      ...elev,
      ...data
    };
    
    console.log('Form submitted with all data:', combinedData);
    
    // Her kan du sende data til database senere
    // await sendSurveyData(combinedData);
  };
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">spørre undersøkelse</h1>
            <p>her skal du svare på en spørreunderskelse om skolen din og deg</p>
            
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}> 
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="school">Hva heter skolen din?</label>
                    <input 
                        type="text" 
                        id="school" 
                        name="school" 
                        value={elev.school}
                        onChange={(e) => handleInputChange('school', e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2" 
                    />
                </div>
                
                <Selection 
                    type="yesno" 
                    label="Liker du skolen din?" 
                    name="likeSchool" 
                />

                {/* Sosialt */}
                <h2 className="text-xl font-semibold mt-8 mb-4">Sosialt</h2>
                
                <Selection type="yesno" label="Bruker folk friminutter ute?" name="useBreaksOutside" />
                <Selection type="yesno" label="Ser du folk eller spiller du selv forball/basket eller lignende i friminutt?" name="sportsInBreaks" />
                <Selection type="yesno" label="Brettspill i klasserom i friminutt?" name="boardGamesInClass" />
                <Selection type="yesno" label="Gjør klassen noe felles utenfor skolen?" name="classActivitiesOutside" />
                <Selection type="yesno" label="Opplever du at folk fester?" name="peopleParty" />
                <Selection type="yesno" label="Opplever du at de fleste får muligheten til å være på neon fester, om det er fester?" name="partyOpportunity" />
                <Selection type="yesno" label="Sitter folk i kantina under friminutt som er sosial greie?" name="cantinaSocializing" />
                <Selection type="yesno" label="Er lærere motiverende til sosiale aktiviter?" name="teachersEncourageSocial" />
                
                <Selection type="yesno" label="Ønsker du å bruke friminutter ute?" name="wantBreaksOutside" />
                <Selection type="yesno" label="Ønsker du å spille basket/forball eller lignende i friminutt?" name="wantSportsInBreaks" />
                <Selection type="yesno" label="Ønsker du å spille brettspill i klasserom i friminutt?" name="wantBoardGames" />
                <Selection type="yesno" label="Ønsker du å bruke tid med klassen utenfor skolen?" name="wantClassTimeOutside" />
                <Selection type="yesno" label="Ønsker festmiljø på skolen?" name="wantPartyEnvironment" />
                <Selection type="yesno" label="Ønsker du å være på fester?" name="wantToParty" />
                <Selection type="yesno" label="Ønsker du å spise lunsj og henge med venner/andre i kantina?" name="wantCantinaSocial" />
                <Selection type="yesno" label="Ønsker du at lærere skal aktivisere klassen med felles aktiviteter?" name="wantTeacherActivities" />
                <Selection type="yesno" label="Ønsker du å gå på butikken i friminutt?" name="wantShopInBreaks" />
                <Selection type="yesno" label="Foretrekker du sentrum over nærområde?" name="preferCenter" />

                {/* Læringsmiljø */}
                <h2 className="text-xl font-semibold mt-8 mb-4">Læringsmiljø</h2>
                
                <Selection type="yesno" label="Er læringsmiljøet bra?" name="goodLearningEnvironment" />
                <Selection type="yesno" label="Rekker folk opp hånda i timen?" name="peopleRaiseHands" />
                <Selection type="yesno" label="Føler du at elever jobber når lærere ber om det?" name="studentsWork" />
                <Selection type="yesno" label="Føler du at alle ønsker bra karakterer?" name="everyoneWantsGoodGrades" />
                <Selection type="yesno" label="Er det karakterpress?" name="gradePressure" />
                <Selection type="yesno" label="Er lærere flinke?" name="teachersGood" />
                <Selection type="yesno" label="Føler du at du kan snakke med læreren din om karakterer og mål?" name="canTalkToTeacherAboutGrades" />
                <Selection type="yesno" label="Føler du at du kan snakke med noen voksne på skolen om du ikke har det så bra?" name="canTalkToAdultsAtSchool" />
                <Selection type="yesno" label="Føler du at det er kleint eller skamfult å få dårlige karakterer?" name="shamefulBadGrades" />
                <Selection type="yesno" label="Er gymlærere 'strenge'?" name="gymTeachersStrict" />
                <Selection type="yesno" label="Er gymlærer opptatt av innsats eller prestering?" name="gymTeacherFocusPerformance" />
                
                <Selection type="yesno" label="Vil du at alle skal ønske å være flinke på skolen?" name="wantEveryoneToWantSuccess" />
                <Selection type="yesno" label="Ønsker du at folk rekker opp hånda i timen?" name="wantPeopleRaiseHands" />
                <Selection type="yesno" label="Ønsker du at elever jobber når lærere ber om det?" name="wantStudentsWork" />
                <Selection type="yesno" label="Ønsker du at alle skal ønske bra karakterer?" name="wantEveryoneWantGoodGrades" />
                <Selection type="yesno" label="Ønsker du karakterpress?" name="wantGradePressure" />
                <Selection type="yesno" label="Ønsker du at lærere skal være flinke?" name="wantGoodTeachers" />
                <Selection type="yesno" label="Ønsker du å kunne snakke med læreren din om karakterer og mål?" name="wantTalkToTeacherAboutGrades" />
                <Selection type="yesno" label="Ønsker du å kunne snakke med noen voksne på skolen om du ikke har det så bra?" name="wantTalkToAdultsAtSchool" />
                <Selection type="yesno" label="Ønsker du at det skal være kleint eller skamfult å få dårlige karakterer?" name="wantShamefulBadGrades" />
                <Selection type="yesno" label="Ønsker du at gymlærere skal være 'strenge'?" name="wantStrictGymTeachers" />
                <Selection type="yesno" label="Ønsker du at gymlærer skal være opptatt av innsats eller prestering?" name="wantGymTeacherFocusPerformance" />

                {/* Fysisk */}
                <h2 className="text-xl font-semibold mt-8 mb-4">Fysisk</h2>
                
                <Selection type="yesno" label="Har dere kantine?" name="hasCantine" />
                <Selection type="yesno" label="Har dere basket/forball bane?" name="hasSportsCourt" />
                <Selection type="yesno" label="Har dere plasser å sitte i eventuell skolegård?" name="hasSeatingArea" />
                <Selection type="yesno" label="Er det butikk i nærområdet?" name="shopNearby" />
                <Selection type="yesno" label="Er skolen midt i byen?" name="schoolInCityCenter" />
                
                <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Send inn
                </button>
            </form>
        </div>
    );
}