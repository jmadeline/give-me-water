import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function PlantList() {
  const [plants, setPlants] = useState([{
    id: null,
    name: '',
    spary: null,
    description: '',
    picture: null,
  }]);

  useEffect(() => {
    axios.get('http://localhost:8000/plants')
      .then((res) => {
        setPlants(res.data);
        console.log(res.data);
      });
  }, []);

  const deletingPlant = (idPlant) => {
    axios.delete(`http://localhost:8000/plants/${idPlant}`)
      .then((res) => {
        console.log(res);
      });
  }

  return (
    <>
      {plants.map((plant) => (
        <div key={plant.id} className="card m-5">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={`http://localhost:8000/uploads/${plant.picture}`} className="card-img" alt={plant.picture} />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <Link to="editplant">
                  <h5 className="card-title">{plant.name}</h5>
                  <p className="card-text">{plant.description}</p>
                </Link>
                <button type="button" className="btn btn-outline-primary">Arroser</button>
                <button type="button" className="btn btn-outline-danger" onClick={(e) => deletingPlant(plant.id)}>Dead</button>
              </div>
            </div>
          </div>
        </div>
      ))
      }
      <Link to="/newplant">
        <button type="button" className="btn btn-outline-success m-5">Ajouter une plante</button>
      </Link>
    </>
  );
}

export default PlantList;
