import React, { useState, useEffect } from "react";
import Nav from "../Nav";
import Footer from "../Footer";

const Physicians = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const API_ENDPOINT = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    // Fetch doctors from the backend
    // Replace the API_ENDPOINT with the actual endpoint to fetch doctors
    fetch(API_ENDPOINT)
      .then((response) => response.json())
      .then((data) => setDoctors(data))
      .catch((error) => console.log(error));
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilter = (e) => {
    setSelectedSpecialty(e.target.value);
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const nameMatch = doctor.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const specialtyMatch =
      selectedSpecialty === "" || doctor.specialty === selectedSpecialty;
    return nameMatch && specialtyMatch;
  });

  return (
    <div>
      <Nav />
      <div className=" shadow-2xl shadow-slate-400 w-full container mx-auto px-4 justify-center items-center min-h-screen p-8 bg-gradient-to-br  from-stone-200 via-stone-100 to-stone-50 rounded-lg">
        <h1 className="text-3xl font-bold my-4 text-center">Doctor Listings</h1>
        <div className="flex items-center mb-4">
          <label htmlFor="search" className="mr-2">
            Search:
          </label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by name"
            className="border border-green-300 text-lg py-1 rounded-md px-2"
          />
        </div>

        <div className="flex items-center mb-4">
          <label htmlFor="specialty" className="mr-2">
            Filter by Specialty:
          </label>
          <select
            id="specialty"
            value={selectedSpecialty}
            onChange={handleFilter}
            className="border border-green-300 text-lg py-1 rounded-md px-2">
            <option value="">All Specialties</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
            <option value="Ophthalmologist">Ophthalmologist</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Obstetrician/Gynecologist (OB/GYN)">
              Obstetrician/Gynecologist (OB/GYN)
            </option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Psychiatrist">Psychiatrist</option>
            <option value="Dentist">Dentist</option>
          </select>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="flex flex-col items-center rounded-lg shadow-2xl hover:bg-green-200">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-48 h-48 object-contain mb-2"
              />
              <div className="text-center">
                <h2 className="text-lg font-bold">{doctor.name}</h2>
                <p className="text-sm text-gray-500">
                  Specialty: {doctor.specialty}
                </p>
                <p className="text-sm">{doctor.description}</p>
                <p className="text-sm">Contact: {doctor.contact}</p>
                <p className="text-sm">Location: {doctor.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Physicians;
