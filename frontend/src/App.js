import React, { useState } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({
    Id: 1,
    MSSubClass: 20,
    MSZoning: 'RL',
    LotFrontage: 65,
    LotArea: 8450,
    Street: 'Pave',
    LotShape: 'Reg',
    LandContour: 'Lvl',
    Utilities: 'AllPub',
    LotConfig: 'Inside',
    LandSlope: 'Gtl',
    Neighborhood: 'NAmes',
    Condition1: 'Norm',
    Condition2: 'Norm',
    BldgType: '1Fam',
    HouseStyle: '1Story',
    OverallQual: 5,
    OverallCond: 5,
    YearBuilt: 2003,
    YearRemodAdd: 2003,
    RoofStyle: 'Gable',
    RoofMatl: 'CompShg',
    Exterior1st: 'VinylSd',
    Exterior2nd: 'VinylSd',
    MasVnrType: 'BrkFace',
    MasVnrArea: 196,
    ExterQual: 'Gd',
    ExterCond: 'TA',
    Foundation: 'PConc',
    BsmtQual: 'Gd',
    BsmtCond: 'TA',
    BsmtExposure: 'No',
    BsmtFinType1: 'GLQ',
    BsmtFinSF1: 706,
    BsmtFinType2: 'Unf',
    BsmtFinSF2: 0,
    BsmtUnfSF: 150,
    TotalBsmtSF: 856,
    Heating: 'GasA',
    HeatingQC: 'Ex',
    CentralAir: 'Y',
    Electrical: 'SBrkr',
    '1stFlrSF': 856,
    '2ndFlrSF': 854,
    LowQualFinSF: 0,
    GrLivArea: 1710,
    BsmtFullBath: 1,
    BsmtHalfBath: 0,
    FullBath: 2,
    HalfBath: 1,
    BedroomAbvGr: 3,
    KitchenAbvGr: 1,
    KitchenQual: 'Gd',
    TotRmsAbvGrd: 8,
    Functional: 'Typ',
    Fireplaces: 1,
    FireplaceQu: 'TA',
    GarageType: 'Attchd',
    GarageYrBlt: 2003,
    GarageFinish: 'RFn',
    GarageCars: 2,
    GarageArea: 548,
    GarageQual: 'TA',
    GarageCond: 'TA',
    PavedDrive: 'Y',
    WoodDeckSF: 0,
    OpenPorchSF: 61,
    EnclosedPorch: 0,
    '3SsnPorch': 0,
    ScreenPorch: 0,
    PoolArea: 0,
    MiscVal: 0,
    MoSold: 2,
    YrSold: 2008,
    SaleType: 'WD',
    SaleCondition: 'Normal'
  });

  const [price, setPrice] = useState(null);
  const [csvPredictions, setCsvPredictions] = useState([]);

  const handleChange = e => {
    const val = isNaN(e.target.value) ? e.target.value : Number(e.target.value);
    setForm({ ...form, [e.target.name]: val });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('https://house-pre-backend.onrender.com/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setPrice(data.predicted_price);
  };

  const handleCSVUpload = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("https://house-pre-backend.onrender.com/predict-csv", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    setCsvPredictions(data);
  };

  return (
    <div className="App">
      <h1>🏡 House Price Predictor</h1>
      
      <form onSubmit={handleSubmit}>
        {Object.entries(form).map(([key, val]) => (
          <div key={key}>
            <label>{key}</label>
            <input
              name={key}
              value={val}
              onChange={handleChange}
              type={typeof val === 'number' ? 'number' : 'text'}
            />
          </div>
        ))}
        <button type="submit">Predict</button>
      </form>

      {price && <h2>Estimated Price: ${price}</h2>}

      <hr />

      <h3>📄 Upload CSV for Bulk Prediction</h3>
      <input type="file" accept=".csv" onChange={handleCSVUpload} />
      
      {csvPredictions.length > 0 && (
        <div>
          <h3>CSV Predictions:</h3>
          <ul>
            {csvPredictions.map((row, idx) => (
              <li key={idx}>Row {idx + 1}: ${row.PredictedPrice.toFixed(2)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
