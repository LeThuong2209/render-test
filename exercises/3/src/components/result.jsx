import Country from "./Country";

const Result = ({ dataCountry, onClick }) => {
  if (!dataCountry) {
    return;
  }

  if (dataCountry.length === 0) {
    return <div>No matching result.</div>;
  }

  if (dataCountry.length > 10) {
    return <div>Too many matches, specify another filter.</div>;
  }

  if (dataCountry.length === 1) {
    const country = dataCountry[0];
    return (
      <div>
        <Country
          name={country.name.common}
          capital={country.capital}
          languages={country.languages}
          flags={country.flags}
        />
      </div>
    );
  }

  return (
    <ul>
      {dataCountry.map((data) => {
        return (
          <div>
            <p>
              <li key={data.name.common}>{data.name.common}</li>
              <button onClick={() => onClick(data)}>Show</button>
            </p>
          </div>
        );
      })}
    </ul>
  );
};
export default Result;
