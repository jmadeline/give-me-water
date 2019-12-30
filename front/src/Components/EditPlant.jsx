import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

function EditList() {
  const [editForm, seteditForm] = useState({
    name: '',
    spray: 1,
    description: '',
    picture: null,
    isSubmit: false,
  });

  const handleSubmit = () => {
    axios.put('http://localhost:8000/plants/', {
      name: editForm.name,
      spray: editForm.spray,
      description: editForm.description,
      picture: editForm.picture
    }).then((result) => {
      console.log(result);
      seteditForm({ isSubmit: true });
    });
  }

  return (
    <>
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
              value={editForm.name}
              onChange={(event) => seteditForm({ ...editForm, name: event.target.value })} />
          </div>
          <div className="form-group">
            <label>Fréquence d'arrosage</label>
            <select
              className="form-control"
              value={editForm.spray}
              onChange={(event) => seteditForm({ ...editForm, spray: event.target.value })}
            >
              <option value={1} >1</option>
              <option value={2} >2</option>
              <option value={3} >3</option>
              <option value={4} >4</option>
              <option value={5} >5</option>
              <option value={6} >6</option>
              <option value={7} >7</option>
              <option value={8} >8</option>
              <option value={9} >9</option>
              <option value={10} >10</option>
              <option value={11} >11</option>
              <option value={12} >12</option>
              <option value={13} >13</option>
              <option value={14} >14</option>
              <option value={15} >15</option>
              <option value={16} >16</option>
              <option value={17} >17</option>
              <option value={18} >18</option>
              <option value={19} >19</option>
              <option value={20} >20</option>
              <option value={21} >21</option>
              <option value={22} >22</option>
              <option value={23} >23</option>
              <option value={24} >24</option>
              <option value={25} >25</option>
              <option value={26} >26</option>
              <option value={27} >27</option>
              <option value={28} >28</option>
              <option value={29} >29</option>
              <option value={30} >30</option>
            </select>
          </div>
          <div className="form-group">
            <label>Informations complémentaires</label>
            <input
              type="text"
              className="form-control"
              value={editForm.description}
              onChange={(event) => { seteditForm({ ...editForm, description: event.target.value }) }} />
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
    </>
  );
}

export default EditList;
