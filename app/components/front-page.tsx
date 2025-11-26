{/* front-page */}
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

                    <h3 className="text-lg leading-relaxed text-[#000000] text-center">
                        Dette er en placeholder-tekst som beskriver organisasjonen, prosjektet 
                        eller teamet deres. Her kan dere skrive om hva dere gjør, hvorfor 
                        dere startet prosjektet, og hva målene deres er fremover.  
                        <br /><br />
                        Dere kan også legge til mer detaljer, som verdier, visjon, eller hva 
                        brukerne kan forvente når de utforsker tjenesten deres.
                    </h3>
                </div>

            </div>
        </div>
    );
};

export default FrontPage;
