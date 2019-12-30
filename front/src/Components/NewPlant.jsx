import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

function NewPlant() {
  const [form, setForm] = useState({
    name: '',
    spray: 1,
    description: '',
    picture: null,
    plantCreated: false,
  });

  const handleSubmit = () => {
    axios.post('http://localhost:8000/plants/', {
      name: form.name,
      spray: form.spray,
      description: form.description,
      picture: form.picture
    }).then((result) => {
      console.log(result);
      setForm({ plantCreated: true });
    });
  }

  return (
    <>
      {form.plantCreated ? <Redirect to="/" /> : null}
      <div className="card m-5">
        <div className="file-upload-wrapper">
          <input type="file" id="input-file-now" className="file-upload" />
        </div>
        <div className="card-body">
          <div className="form-group">
            <label>Nom de votre plante</label>
            <input
              type="text"
              className="form-control"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })} />
          </div>
          <div className="form-group">
            <label>Fréquence d'arrosage</label>
            <select
              className="form-control"
              value={form.spray}
              onChange={(event) => setForm({ ...form, spray: event.target.value })}
            >
              {Array.from(Array(30)).map((_, index) => {
                return <option key={index} value={index + 1}>{index + 1}</option>
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Informations complémentaires</label>
            <input
              type="text"
              className="form-control"
              value={form.description}
              onChange={(event) => { setForm({ ...form, description: event.target.value }) }} />
          </div>

          <button
            type="submit"
            className="btn btn-outline-success"
            onClick={handleSubmit}
          >
            Ajouter
          </button>
        </div>
      </div>
    </>
  );
}

export default NewPlant;
