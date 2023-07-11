import React, { useState } from "react";
import "./Start.css";
import Nav from "../Nav";

const Profile = () => {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    address: "",
    phoneNumber: "",
  });

  const [medicalHistory, setMedicalHistory] = useState({
    allergies: "",
    chronicConditions: "",
    surgeries: "",
    familyHistory: "",
  });

  const [medications, setMedications] = useState({
    currentMedications: "",
    dosageFrequency: "",
  });

  const [lifestyle, setLifestyle] = useState({
    smokingStatus: "",
    alcoholConsumption: "",
    dietPreferences: "",
  });

  const handlePersonalInfoChange = (e) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleMedicalHistoryChange = (e) => {
    setMedicalHistory({
      ...medicalHistory,
      [e.target.name]: e.target.value,
    });
  };

  const handleMedicationsChange = (e) => {
    setMedications({
      ...medications,
      [e.target.name]: e.target.value,
    });
  };

  const handleLifestyleChange = (e) => {
    setLifestyle({
      ...lifestyle,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form data to the server or perform any other necessary actions
    const patientData = {
      personalInfo,
      medicalHistory,
      medications,
      lifestyle,
    };
    console.log("Submitted data:", patientData);

    // Send patientData to the backend server for storing in the MongoDB database
    fetch("/api/patient-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data stored successfully in the database:", data);
        // Handle any success messages or UI updates as needed
      })
      .catch((error) => {
        console.error("Error storing data in the database:", error);
        // Handle any error messages or UI updates as needed
      });
  };

  return (
    // <div className="flex flex-col ">
    <div className="flex flex-col justify-center items-center w-full">
      <Nav />
      <div className=" justify-center items-center min-h-screen p-8 bg-gradient-to-br from-orange-500 via-orange-400 to-orange-300 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between flex-grow pb-4">
          {/* Personal Information */}
          <h3 className="text-xl font-bold">Personal Information</h3>
          <label htmlFor="fullName" className="block">
            Full Name:
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={personalInfo.fullName}
            onChange={handlePersonalInfoChange}
            required
            className="border rounded px-2 py-1"
          />
          <br />

          <label htmlFor="dateOfBirth" className="block">
            Date of Birth:
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={personalInfo.dateOfBirth}
            onChange={handlePersonalInfoChange}
            required
            className="border rounded px-2 py-1 flex-none w-64"
          />

          <label className="block">Gender:</label>
          <div className="space-x-4">
            <label htmlFor="male" className="inline-flex items-center">
              <input
                type="radio"
                id="male"
                name="gender"
                value="Male"
                checked={personalInfo.gender === "Male"}
                onChange={handlePersonalInfoChange}
                required
                className="form-radio"
              />
              <span className="ml-2">Male</span>
            </label>
            <label htmlFor="female" className="inline-flex items-center">
              <input
                type="radio"
                id="female"
                name="gender"
                value="Female"
                checked={personalInfo.gender === "Female"}
                onChange={handlePersonalInfoChange}
                required
                className="form-radio"
              />
              <span className="ml-2">Female</span>
            </label>
            <label htmlFor="other" className="inline-flex items-center">
              <input
                type="radio"
                id="other"
                name="gender"
                value="Other"
                checked={personalInfo.gender === "Other"}
                onChange={handlePersonalInfoChange}
                required
                className="form-radio"
              />
              <span className="ml-2">Other</span>
            </label>
          </div>

          <label className="block">Marital Status:</label>
          <div className="space-x-4">
            <label htmlFor="married" className="inline-flex items-center">
              <input
                type="radio"
                id="married"
                name="maritalStatus"
                value="Married"
                checked={personalInfo.maritalStatus === "Married"}
                onChange={handlePersonalInfoChange}
                required
                className="form-radio"
              />
              <span className="ml-2">Married</span>
            </label>
            <label htmlFor="unmarried" className="inline-flex items-center">
              <input
                type="radio"
                id="unmarried"
                name="maritalStatus"
                value="Unmarried"
                checked={personalInfo.maritalStatus === "Unmarried"}
                onChange={handlePersonalInfoChange}
                required
                className="form-radio"
              />
              <span className="ml-2">Unmarried</span>
            </label>
            <label htmlFor="divorced" className="inline-flex items-center">
              <input
                type="radio"
                id="divorced"
                name="maritalStatus"
                value="Divorced"
                checked={personalInfo.maritalStatus === "Divorced"}
                onChange={handlePersonalInfoChange}
                required
                className="form-radio"
              />
              <span className="ml-2">Divorced</span>
            </label>
          </div>

          <br />

          <label htmlFor="address" className="block">
            Address:
          </label>
          <textarea
            id="address"
            name="address"
            value={personalInfo.address}
            onChange={handlePersonalInfoChange}
            required
            className="border rounded px-2 py-1 flex-grow"
          />
          <br />

          <label htmlFor="phoneNumber" className="block">
            Phone Number:
          </label>
          <div className="flex">
            <input
              type="tel"
              id="countryCode"
              name="countryCode"
              value={personalInfo.countryCode}
              onChange={handlePersonalInfoChange}
              required
              className="border rounded px-2 py-1 mr-2 w-20"
              pattern="[0-9]+"
            />
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={personalInfo.phoneNumber}
              onChange={(e) => {
                const phoneNumber = e.target.value.replace(/\D/g, "");
                setPersonalInfo((prevInfo) => ({
                  ...prevInfo,
                  phoneNumber,
                }));
              }}
              required
              className="border rounded px-2 py-1 "
              pattern="[0-9]+"
            />
          </div>

          <br />

          {/* Medical History */}
          <h3 className="text-xl font-bold">Medical History</h3>
          <label htmlFor="allergies" className="block">
            Allergies:
          </label>
          <textarea
            id="allergies"
            name="allergies"
            value={medicalHistory.allergies}
            onChange={handleMedicalHistoryChange}
            required
            className="border rounded px-2 py-1 flex-grow"
          />
          <br />

          <label htmlFor="chronicConditions" className="block">
            Chronic Conditions:
          </label>
          <textarea
            id="chronicConditions"
            name="chronicConditions"
            value={medicalHistory.chronicConditions}
            onChange={handleMedicalHistoryChange}
            className="border rounded px-2 py-1 flex-grow"
          />
          <br />

          <label htmlFor="surgeries" className="block">
            Past Surgeries or Hospitalizations:
          </label>
          <textarea
            id="surgeries"
            name="surgeries"
            value={medicalHistory.surgeries}
            onChange={handleMedicalHistoryChange}
            className="border rounded px-2 py-1 flex-grow"
          />
          <br />

          <label htmlFor="familyHistory" className="block">
            Family Medical History:
          </label>
          <textarea
            id="familyHistory"
            name="familyHistory"
            value={medicalHistory.familyHistory}
            onChange={handleMedicalHistoryChange}
            className="border rounded px-2 py-1 flex-grow"
          />
          <br />

          {/* Medications */}
          <h3 className="text-xl font-bold">Medications</h3>
          <label htmlFor="currentMedications" className="block">
            Current Medications:
          </label>
          <textarea
            id="currentMedications"
            name="currentMedications"
            value={medications.currentMedications}
            onChange={handleMedicationsChange}
            className="border rounded px-2 py-1 flex-grow"
          />
          <br />

          <label htmlFor="dosageFrequency" className="block">
            Dosage and Frequency:
          </label>
          <input
            type="text"
            id="dosageFrequency"
            name="dosageFrequency"
            value={medications.dosageFrequency}
            onChange={handleMedicationsChange}
            className="border rounded px-2 py-1 flex-grow"
          />
          <br />

          {/* Lifestyle and Habits */}
          <h3 className="text-xl font-bold">Lifestyle and Habits</h3>
          <label htmlFor="smokingStatus" className="block">
            Smoking Status:
          </label>
          <input
            type="text"
            id="smokingStatus"
            name="smokingStatus"
            value={lifestyle.smokingStatus}
            onChange={handleLifestyleChange}
            className="border rounded px-2 py-1"
          />
          <br />

          <label htmlFor="alcoholConsumption" className="block">
            Alcohol Consumption:
          </label>
          <input
            type="text"
            id="alcoholConsumption"
            name="alcoholConsumption"
            value={lifestyle.alcoholConsumption}
            onChange={handleLifestyleChange}
            className="border rounded px-2 py-1"
          />
          <br />

          <label htmlFor="dietPreferences" className="block">
            Diet Preferences or Restrictions:
          </label>
          <input
            type="text"
            id="dietPreferences"
            name="dietPreferences"
            value={lifestyle.dietPreferences}
            onChange={handleLifestyleChange}
            className="border rounded px-2 py-1 flex-grow"
          />
          <br />

          {/* Add more fields as needed */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
