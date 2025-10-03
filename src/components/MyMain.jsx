import axios from "axios";
import { useState } from "react"

function MyMain() {
    const [formData, setFormData] = useState({
    // Stato unico per gestire tutti i campi del form.
        author: "",
        title: "",
        body: "",
        public: false
    });

    //funziona per gestire il cambiamento di ogni input 

    const HandleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    //funzione per gestire l'invio del form 
    const handleSubmit = (e) => {
        e.preventDefault();
        const apiUrl = "https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts";
        console.log("Dati inviati:", formData);

        axios.post(apiUrl, formData)
        .then(response => {
            console.log("Post creato",response.data);
            setFormData({
                author:"",
                title:"",
                body:"",
                public: false
            });
        })
            .catch(error => {
                console.error("c'è stato un errore durante l'invio", error);
            });
    };
}