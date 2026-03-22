import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import "./index.css";

const supabase = createClient(
  "https://jtxdyfeodgkggylmvpqz.supabase.co",
  "A_SUA_ANON_KEY"
);

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      setLoading(false);
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth event:", event);
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error.message);
      return;
    }

    setSession(null);
  };

  if (loading) {
    return (
      <div className="auth-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="auth-container">
      {!session ? (
        <>
          <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
            PairSystems
          </h2>
          <p style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            Sign in today for NoTee Log
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
        </>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h2>✅ Login successful!</h2>

          <p>
            <strong>Access Token:</strong>
          </p>
          <textarea
            value={session.access_token ?? ""}
            readOnly
            style={{ width: "100%", height: "100px" }}
          />

          <p>
            <strong>Refresh Token:</strong>
          </p>
          <textarea
            value={session.refresh_token ?? ""}
            readOnly
            style={{ width: "100%", height: "100px" }}
          />

          <button
            onClick={handleLogout}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              marginTop: "20px",
              backgroundColor: "#dc2626",
              color: "white",
              fontWeight: "600",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}