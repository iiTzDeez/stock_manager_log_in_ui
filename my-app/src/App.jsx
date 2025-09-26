import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import "./index.css"; // garante que importas o CSS

const supabase = createClient(
  "https://jtxdyfeodgkggylmvpqz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0eGR5ZmVvZGdrZ2d5bG12cHF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3NTI1MDIsImV4cCI6MjA3NDMyODUwMn0.Tr7PdgEZbjTB_Sz1_q2xKbNbGtaUmGw9AiVIJXmORf0"
);

export default function App() {
  return (
    <div className="auth-container">
      <img src="/logo.png" alt="Logo" width="200" />
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
        PairSystems
      </h2>
      <p style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        Sign in today for PairSys DataLog
      </p>

      <Auth
        supabaseClient={supabase}
        providers={["google", "facebook", "twitter"]}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "hsla(153, 53%, 38%, 1.00)",
                brandAccent: "hsla(153, 53%, 38%, 1.00)",
              },
              radii: {
                borderRadiusButton: "6px",
                input: "6px",
              },
            },
          },
        }}
        theme="dark"
      />
    </div>
  );
}
