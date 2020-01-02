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
      });
  }, []);

  return (
    <>
      {plants.map((plant) => (
        <Link to="editplant">
          <div key={plant.id} className="card m-5">
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src={plant.picture} className="card-img" alt={plant.picture} />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{plant.name}</h5>
                  <p className="card-text">{plant.description}</p>
                  <button type="button" className="btn btn-outline-primary">Arroser</button>
                  <button type="button" className="btn btn-outline-danger">Dead</button>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
      <Link to="/newplant">
        <button type="button" className="btn btn-outline-success m-5">Ajouter une plante</button>
      </Link>
    </>
  );
}

export default PlantList;
