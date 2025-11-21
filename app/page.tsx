import UserManagement from "./components/UserManagement";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4">
      <main className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Visma Outschool - User Management
        </h1>
        <UserManagement />
      </main>
    </div>
  );
}
