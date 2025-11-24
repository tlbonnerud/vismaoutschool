{/* front-page */}

const FrontPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
            <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Welcome to Our Application</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 text-center px-4">
                dette er forsiden til Figma Outschool prosjektet. Vennligst logg inn for å få gå videre
            </p>
            <a
                href="/login"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
                Go to Login
            </a>
        </div>
    );
}
export default FrontPage;