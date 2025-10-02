import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function IntroPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleExit = () => {
      navigate("/catalogo"); // ✅ va al catálogo
    };

    // Salida con click o movimiento de mouse
    window.addEventListener("click", handleExit);
    window.addEventListener("mousemove", handleExit);

    return () => {
      window.removeEventListener("click", handleExit);
      window.removeEventListener("mousemove", handleExit);
    };
  }, [navigate]);

  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      <video
        autoPlay
        muted
        playsInline
        loop   // 🔹 se repite hasta que haya interacción
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      >
        <source src="/intro.mp4" type="video/mp4" />
        Tu navegador no soporta videos en HTML5.
      </video>
    </div>
  );
}

export default IntroPage;



