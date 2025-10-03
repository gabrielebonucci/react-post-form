import axios from "axios";
import React, { useState } from "react";

function MyMain() {
  const [formData, setFormData] = useState({
    // Stato unico per gestire tutti i campi del form
    author: "",
    title: "",
    body: "",
    public: false,
  });

  //funziona per gestire il cambiamento di ogni input

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  //funzione per gestire l'invio del form
  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = "https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts";
    console.log("Dati inviati:", formData);

    axios
      .post(apiUrl, formData)
      .then((response) => {
        console.log("Post creato", response.data);
        setFormData({
          author: "",
          title: "",
          body: "",
          public: false,
        });
      })
      .catch((error) => {
        console.error("c'è stato un errore durante l'invio", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light ">
      <div>
        <label htmlFor="author" className="form-label">
          Autore
        </label>
        <input
          type="text"
          id="author"
          name="author"
          className="form-control"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </div>
      {/* titolo */}
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Titolo
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="form-control"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      {/* Testo del post */}
      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Testo del Post
        </label>
        <textarea
          id="body"
          name="body"
          className="form-control"
          rows="5"
          value={formData.body}
          onChange={handleChange}
          required
        />
      </div>
      {/* Checkbox pubblico */}
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          id="public"
          name="public"
          className="form-check-input"
          checked={formData.public}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="public">
          Rendi questo post pubblico
        </label>
      </div>
      {/* bottone di invio */}
      <button type="submit" className="btn btn-primary">
        Crea Post
      </button>
    </form>
  );
}
export default MyMain;
