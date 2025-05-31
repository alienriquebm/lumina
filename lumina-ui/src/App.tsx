import { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);

    try {
      const interpretRes = await fetch("http://localhost:3000/mcp/interpret", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const interpretData = await interpretRes.json();

      const parsed = JSON.parse(interpretData.response); // 👈 Parseamos la string
      console.log("🔍 JSON interpretado:", parsed);

      const executeRes = await fetch("http://localhost:3000/mcp/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });

      const executeData = await executeRes.json();
      setResult(executeData); // 👈 Mostrar el resultado
    } catch (err) {
      console.error("❌ Error:", err);
      setResult({ error: "Algo salió mal" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-4">💡 Lumina Prompt UI</h1>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Escribe aquí lo que quieres que Lumina haga..."
        className="w-full h-40 p-4 bg-gray-800 text-white rounded resize-none"
      />

      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded"
        disabled={loading}
      >
        {loading ? "Interpretando..." : "Interpretar"}
      </button>

      {result && (
        <div className="mt-6 bg-gray-800 p-4 rounded overflow-auto max-h-[300px]">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
