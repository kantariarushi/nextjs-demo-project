"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import styles from "./signin.module.css";  // Importing the new CSS module

export default function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);  // Add loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);  // Set loading to true when the form is submitted

        const result = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        setLoading(false);  // Reset loading state after the response is received

        if (result?.error) {
            setError(result.error);
        } else {
            window.location.href = "/";
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles["form-card"]}>
                <h1 className={styles.title}>Sign In</h1> {/* Use the local class for the title */}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className={styles.label}>Username</label> {/* Add local class to label */}
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className={styles.input}
                        />
                    </div>
                    <div>
                        <label className={styles.label}>Password</label> {/* Add local class to label */}
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={styles.input}
                        />
                    </div>
                    {error && <p className={styles["error-message"]}>{error}</p>}
                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? (
                            <div className={styles.loader}></div> // Loader inside the button
                        ) : (
                            "Sign In"
                        )}
                    </button> {/* Add local class to button */}
                </form>
            </div>
        </div>
    );
}
