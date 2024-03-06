import "./Forms.css";

export default function FormError({ error }) {
    return (
        <div className="error-container">
            {error && <span className="error-message">{error}</span>}
        </div>
    )
}
