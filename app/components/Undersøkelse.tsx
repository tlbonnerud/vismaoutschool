'use client'
import React from 'react';
import { useStudent } from '@/app/(dashboard)/(loggedin)/dashboard/schools/context/StudentContext';
import { useRouter } from 'next/navigation';

// Selection component with onChange support
interface SelectionProps {
   type: 'yesno' | 'grade';
   label: string;
   name: string;
   value: boolean | null;
   onChange: (name: string, value: boolean | null) => void;
}

function SelectionWithValue({ type, label, name, value, onChange }: SelectionProps) {
   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const val = e.target.value;
      if (val === '') {
         onChange(name, null);
      } else if (val === 'yes') {
         onChange(name, true);
      } else {
         onChange(name, false);
      }
   };

   const selectValue = value === null ? '' : value ? 'yes' : 'no';

   return (
      <div>
         <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300" htmlFor={name}>{label}</label>
         {type === 'yesno' ? (
            <select
               id={name}
               name={name}
               value={selectValue}
               onChange={handleChange}
               className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
               <option value="">Velg et alternativ</option>
               <option value="yes">Ja</option>
               <option value="no">Nei</option>
            </select>
         ) : (
            <select id={name} name={name} className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
               <option value="">Velg karakter</option>
               {[1, 2, 3, 4, 5, 6].map((grade) => (
                  <option key={grade} value={grade}>{grade}</option>
               ))}
            </select>
         )}
      </div>
   );
}

export default function Undersøkelse() {
   const { student, updatePreference } = useStudent();
   const router = useRouter();

   const handleInputChange = (name: string, value: boolean | string | null) => {
      updatePreference(name as keyof typeof student, value);
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted', student);
      // Navigate to matchmaking page after submission
      router.push('/dashboard/matchmaking');
   };

   return (
      <div>
         <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">📝 Spørreundersøkelse</h1>
         <p className="text-gray-600 dark:text-gray-300">Her skal du svare på en spørreundersøkelse om deg selv og hva du ønsker i en skole. Svarene dine brukes til å finne skoler som passer deg!</p>

         <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
               <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300" htmlFor="currentSchool">Hva heter din nåværende skole?</label>
               <input
                  type="text"
                  id="currentSchool"
                  name="currentSchool"
                  value={student.currentSchool}
                  onChange={(e) => handleInputChange('currentSchool', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="F.eks. Berg skole"
               />
            </div>

            <div>
               <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300" htmlFor="name">Hva heter du?</label>
               <input
                  type="text"
                  id="name"
                  name="name"
                  value={student.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Ditt navn"
               />
            </div>

            {/* Sosialt - ønsker */}
            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">🎉 Sosialt - Hva ønsker du?</h2>

            <SelectionWithValue type="yesno" label="Ønsker du å bruke friminutter ute?" name="wantBreaksOutside" value={student.wantBreaksOutside} onChange={handleInputChange} />
            <SelectionWithValue type="yesno" label="Ønsker du å spille basket/fotball eller lignende i friminutt?" name="wantSportsInBreaks" value={student.wantSportsInBreaks} onChange={handleInputChange} />
            <SelectionWithValue type="yesno" label="Ønsker du å spille brettspill i klasserom i friminutt?" name="wantBoardGames" value={student.wantBoardGames} onChange={handleInputChange} />
            <SelectionWithValue type="yesno" label="Ønsker du å bruke tid med klassen utenfor skolen?" name="wantClassTimeOutside" value={student.wantClassTimeOutside} onChange={handleInputChange} />
            <SelectionWithValue type="yesno" label="Ønsker du festmiljø på skolen?" name="wantPartyEnvironment" value={student.wantPartyEnvironment} onChange={handleInputChange} />
            <SelectionWithValue type="yesno" label="Ønsker du å være på fester?" name="wantToParty" value={student.wantToParty} onChange={handleInputChange} />
            <SelectionWithValue type="yesno" label="Ønsker du å spise lunsj og henge med venner i kantina?" name="wantCantinaSocial" value={student.wantCantinaSocial} onChange={handleInputChange} />
            <SelectionWithValue type="yesno" label="Ønsker du at lærere skal aktivisere klassen med felles aktiviteter?" name="wantTeacherActivities" value={student.wantTeacherActivities} onChange={handleInputChange} />
            <SelectionWithValue type="yesno" label="Ønsker du å gå på butikken i friminutt?" name="wantShopInBreaks" value={student.wantShopInBreaks} onChange={handleInputChange} />
            <SelectionWithValue type="yesno" label="Foretrekker du sentrum over nærområde?" name="preferCenter" value={student.preferCenter} onChange={handleInputChange} />

            {/* Læringsmiljø - ønsker */}
            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">📚 Læringsmiljø - Hva ønsker du?</h2>

            <SelectionWithValue type="yesno" label="Vil du at alle skal ønske å være flinke på skolen?" name="wantEveryoneToWantSuccess" value={student.wantEveryoneToWantSuccess} onChange={handleInputChange} />
            <SelectionWithValue type="yesno" label="Ønsker du at folk rekker opp hånda i timen?" name="wantPeopleRaiseHands" value={student.wantPeopleRaiseHands} onChange={handleInputChange} />
            <SelectionWithValue type="yesno" label="Ønsker du at elever jobber når lærere ber om det?" name="wantStudentsWork" value={student.wantStudentsWork} onChange={handleInputChange} />
            <SelectionWithValue type="yesno" label="Ønsker du at alle skal ønske bra karakterer?" name="wantEveryoneWantGoodGrades" value={student.wantEveryoneWantGoodGrades} onChange={handleInputChange} />
            <SelectionWithValue type="yesno" label="Ønsker du karakterpress?" name="wantGradePressure" value={student.wantGradePressure} onChange={handleInputChange} />
            <SelectionWithValue type="yesno" label="Ønsker du at lærere skal være flinke?" name="wantGoodTeachers" value={student.wantGoodTeachers} onChange={handleInputChange} />
            <SelectionWithValue type="yesno" label="Ønsker du å kunne snakke med læreren om karakterer og mål?" name="wantTalkToTeacherAboutGrades" value={student.wantTalkToTeacherAboutGrades} onChange={handleInputChange} />
            <SelectionWithValue type="yesno" label="Ønsker du å kunne snakke med voksne på skolen om du ikke har det så bra?" name="wantTalkToAdultsAtSchool" value={student.wantTalkToAdultsAtSchool} onChange={handleInputChange} />
            <SelectionWithValue type="yesno" label="Ønsker du at det skal være kleint eller skamfullt å få dårlige karakterer?" name="wantShamefulBadGrades" value={student.wantShamefulBadGrades} onChange={handleInputChange} />
            <SelectionWithValue type="yesno" label="Ønsker du at gymlærere skal være 'strenge'?" name="wantStrictGymTeachers" value={student.wantStrictGymTeachers} onChange={handleInputChange} />
            <SelectionWithValue type="yesno" label="Ønsker du at gymlærer skal fokusere på prestasjon?" name="wantGymTeacherFocusPerformance" value={student.wantGymTeacherFocusPerformance} onChange={handleInputChange} />

            {/* Fysisk - ønsker */}
            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">🏫 Fasiliteter - Hva ønsker du?</h2>

            <SelectionWithValue type="yesno" label="Ønsker du at skolen har kantine?" name="wantCantine" value={student.wantCantine} onChange={handleInputChange} />
            <SelectionWithValue type="yesno" label="Ønsker du at skolen har basket/fotballbane?" name="wantSportsCourt" value={student.wantSportsCourt} onChange={handleInputChange} />
            <SelectionWithValue type="yesno" label="Ønsker du sitteplasser i skolegården?" name="wantSeatingArea" value={student.wantSeatingArea} onChange={handleInputChange} />

            <div className="pt-6 flex gap-4">
               <button type="submit" className="flex-1 bg-[#2A2958] hover:bg-[#3a3978] text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  ✨ Se mine skoleanbefalinger
               </button>
            </div>
         </form>
      </div>
   );
}
