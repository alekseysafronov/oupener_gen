import Generator from '../components/Generator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-12">
          Dating Opener Generator
        </h1>
        <Generator />
      </div>
    </main>
  );
}
