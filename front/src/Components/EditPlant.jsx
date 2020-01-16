import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './EditPlant.css';

function EditList({ match }) {
  const [editForm, setEditForm] = useState({
    id: null,
    name: '',
    spray: 1,
    description: '',
    picture: null,
    isSubmit: false,
  });

  const { idPlant } = match.params;

  useEffect(() => {
    axios.get(`http://localhost:8000/plants/${idPlant}`)
      .then((res) => {
        setEditForm(res.data);
      });
  }, []);

  const handleSubmit = () => {
    axios.put(`http://localhost:8000/plants/${idPlant}`, {
      name: editForm.name,
      spray: editForm.spray,
      description: editForm.description,
      picture: editForm.picture
    }).then((result) => {
      console.log(result);
      setEditForm({ isSubmit: true });
    });
  }

  return (
    <div className="editPlant">
      <div className="card m-5">
        <img src={`http://localhost:8000/uploads/${editForm.picture}`} alt={editForm.picture} />
        <label for="file" class="label-file">Choisir une image</label>
        <input id="file" class="input-file" type="file"></input>
        <div className="card-body">
          <div className="form-group">
            <label>Nom de votre plante</label>
            <input
              type="text"
              className="form-control"
              value={editForm.name}
              onChange={(event) => setEditForm({ ...editForm, name: event.target.value })} />
          </div>
          <div className="form-group">
            <label>Fréquence d'arrosage</label>
            <select
              className="form-control"
              value={editForm.spray}
              onChange={(event) => setEditForm({ ...editForm, spray: event.target.value })}
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
              value={editForm.description}
              onChange={(event) => { setEditForm({ ...editForm, description: event.target.value }) }} />
          </div>

          <button
            type="submit"
            className="btn btn-outline-success"
            onClick={handleSubmit}
          >
            Ajouter
        </button>
          {editForm.isSubmit ? <Redirect to="/" /> : null}
        </div>
      </div>
    </div>
  );
}

export default EditList;
