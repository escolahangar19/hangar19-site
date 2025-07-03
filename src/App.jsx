import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

const zodiacImages = [
  "https://upload.wikimedia.org/wikipedia/commons/4/4b/Zodiac_CH-601_HD_-_N601JZ.jpg",
  "https://cdn.jetphotos.com/full/6/33815_1649382115.jpg",
  "https://www.sportaviationmagazine.com/wp-content/uploads/2017/06/zodiac-ch601.jpg"
];

function Home() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold mb-4">Escola de Aviação Hangar 19</h1>
      <p className="text-lg mb-6">Formando os pilotos do futuro com excelência e segurança.</p>
      <img src={zodiacImages[0]} alt="Zodiac CH601 HD" className="mx-auto rounded-xl shadow-md max-h-96" />
    </div>
  );
}

function About() {
  return (
    <div className="p-10">
      <h2 className="text-3xl font-semibold mb-2">Sobre a Escola</h2>
      <p className="mb-4">A Hangar 19 é uma escola de aviação dedicada à formação de pilotos com alto padrão técnico, segurança e ética.</p>
      <img src={zodiacImages[1]} alt="Zodiac CH601 HD" className="rounded-xl shadow-md max-w-xl" />
    </div>
  );
}

function Courses() {
  return (
    <div className="p-10">
      <h2 className="text-3xl font-semibold mb-4">Cursos</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>Piloto Privado (PP)</li>
        <li>Piloto Comercial (PC)</li>
        <li>Instrutor de Voo (INVA)</li>
        <li>Simulador e Teórico EAD</li>
      </ul>
      <img src={zodiacImages[2]} alt="Zodiac CH601 HD" className="rounded-xl shadow-md max-w-xl" />
    </div>
  );
}

function Contact() {
  return (
    <div className="p-10">
      <h2 className="text-3xl font-semibold mb-2">Contato</h2>
      <p>Email: contato@hangar19.com.br</p>
      <p>Telefone: (31) 99999-9999</p>
    </div>
  );
}

function Login({ setAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    if (email === "aluno@hangar19.com" && password === "1234") {
      setAuthenticated(true);
    } else {
      alert("Credenciais inválidas.");
    }
  }

  return (
    <div className="p-10 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Área do Aluno - Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" />
        <input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Entrar</button>
      </form>
    </div>
  );
}

function Dashboard() {
  const [file, setFile] = useState(null);
  const [calendar, setCalendar] = useState("2025-07-01");
  const [message, setMessage] = useState("");

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-4">Painel do Aluno</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>📚 Acesso ao Material do Curso</li>
        <li>📝 Notas e Avaliações</li>
        <li>🗣️ Fórum de Discussão</li>
        <li>📨 Contato com Professores e Administração</li>
        <li>📅 Calendário de Aulas</li>
        <li>📤 Upload de Trabalhos e Provas</li>
      </ul>

      <div className="mb-4">
        <label className="block font-semibold">Enviar Trabalho / Prova:</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mt-2" />
        {file && <p className="mt-1 text-sm">Arquivo selecionado: {file.name}</p>}
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Calendário:</label>
        <input type="date" value={calendar} onChange={(e) => setCalendar(e.target.value)} className="mt-2 border p-2 rounded" />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Fórum:</label>
        <textarea
          placeholder="Escreva uma mensagem para professores ou colegas..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button className="bg-green-600 text-white px-4 py-2 mt-2 rounded">Enviar</button>
      </div>

      <img src={zodiacImages[0]} alt="Zodiac CH601 HD" className="rounded-xl shadow-md max-w-xl" />
    </div>
  );
}

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <div className="flex flex-col gap-4">
        <nav className="bg-gray-100 shadow p-4 flex justify-between">
          <div className="font-bold">Hangar 19</div>
          <div className="space-x-4">
            <button onClick={() => (window.location.href = "/")}>Home</button>
            <button onClick={() => (window.location.href = "/about")}>Sobre</button>
            <button onClick={() => (window.location.href = "/courses")}>Cursos</button>
            <button onClick={() => (window.location.href = "/contact")}>Contato</button>
            <button onClick={() => (window.location.href = "/login")}>Área do Aluno</button>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
          <Route path="/dashboard" element={authenticated ? <Dashboard /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}
