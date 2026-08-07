function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "20px", color: "#2c3e50" }}>
        Bienvenido a <span style={{ color: "#1abc9c" }}>Sublimación Bogotá</span>
      </h1>
      <h2 style={{ fontSize: "2rem", marginBottom: "15px", color: "#34495e" }}>
        ¿En qué vamos a trabajar hoy?
      </h2>
      <h3 style={{ fontSize: "1.5rem", color: "#7f8c8d" }}>
        Usa el menú lateral para navegar entre los diferentes módulos.
      </h3>
    </div>
  );
}

export default Home;