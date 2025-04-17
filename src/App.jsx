import Weather from "./pages/Weather";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-blue-200 px-4">
      <h1 className="text-4xl font-bold text-blue-700 mb-8 drop-shadow-lg">This is a Weather App</h1>
      <Weather />
    </div>
  );
}

export default App;