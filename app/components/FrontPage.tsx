{/* front-page */ }

const FrontPage = () => {
   return (
      <div className="min-h-screen w-full bg-[#2A2958] flex items-center justify-center p-6">
         <div className="max-w-4xl w-full bg-[#B2F7FF] dark:bg-[#B2F7FF] rounded-[30px] shadow-xl p-8">

            {/* Image with black padding */}
            <div className="bg-black p-4 rounded-[40px] overflow-hidden mb-10">
               <img
                  src="https://lindastade.com/wp-content/uploads/2022/10/ShutterstockBasic_489605152-1280x640.jpg"
                  alt="frontpage"
                  className="w-full h-[350px] object-cover rounded-[30px]"
               />
            </div>

            {/* Welcome Card */}
            <div className="bg-white dark:bg-white rounded-[30px] p-10 shadow-md mb-10">
               <h1 className="text-5xl font-extrabold mb-6 text-center text-[#000000]">
                  Velkommen til oss!
               </h1>

               <h3 className="text-lg mb-8 text-center text-[#000000]">
                  Dette er forsiden til Figma Outschool prosjektet.
                  Vennligst logg inn for å gå videre.
               </h3>

               {/* Login Button */}
               <a
                  href="/login"
                  className="bg-[#2A2958] hover:bg-[#2A2958] text-white font-semibold py-3 px-6 rounded-lg transition-colors block w-[60%] mx-auto text-center"
               >
                  Gå til innlogging
               </a>
            </div>

            {/* About Us Card */}
            <div className="bg-white dark:bg-white rounded-[30px] p-10 shadow-md">
               <h2 className="text-4xl font-bold text-center mb-6 text-[#000000]">
                  Om oss
               </h2>

               <p className="text-lg leading-relaxed text-[#000000] text-center">
                  Figma Outschool er en digital plattform som gir elever på ungdomsskolen
                  muligheten til å oppleve en annen skolehverdag i en kort periode på
                  <strong> 1–5 dager</strong>. Vi har laget en trygg og strukturert løsning
                  som gjør det mulig for enkeltpersoner å gjennomføre et midlertidig skolebytte.
                  <br /><br />
                  Gjennom nettsiden matcher vi elever fra ulike skoler som ønsker å bytte
                  skole med hverandre i en kort periode. Byttet skjer alltid i samarbeid
                  med <strong>rådgivere og skoler</strong>, slik at både elevens trygghet og
                  skolegangen blir ivaretatt på en god måte.
                  <br /><br />
                  Formålet med prosjektet er å gi ungdom muligheten til å bli kjent med nye
                  miljøer og læringsmåter, utvikle seg sosialt, se hverdagen fra et nytt
                  perspektiv og få større forståelse for hvordan andre har det på skolen.
                  <br /><br />
                  All kommunikasjon mellom elev, rådgiver og skole foregår via plattformen vår,
                  slik at prosessen er <strong>oversiktlig, trygg og enkel for alle parter</strong>.
                  <br /><br />
                  Figma Outschool er laget <strong>av ungdom, for ungdom</strong>, med fokus på
                  trygghet, utvikling og nye opplevelser.
               </p>
            </div>

         </div>
      </div>
   );
};

export default FrontPage;
