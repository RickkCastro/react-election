import { useEffect, useState } from 'react';
import CandidateCard from '../components/CandidateCard';
import Header from '../components/Header';
import Main from '../components/Main';
import SelectInput from '../components/SelectInput';
import {
  apiGetAllCandidates,
  apiGetAllCities,
  apiGetElections,
} from '../services/apiServices';

export default function ElectionsPage() {
  const [cities, setCities] = useState([]);
  const [currentCitie, setCurrentCitie] = useState({});

  const [allCandidates, setAllCandidates] = useState([]);
  const [citiesCandidates, setCitiesCandidates] = useState([]);

  useEffect(() => {
    async function getCities() {
      const cities = await apiGetAllCities();
      cities.sort((a, b) => a.name.localeCompare(b.name));

      setCities(cities);
      setCurrentCitie(cities[0]);
    }

    async function getAllCandidates() {
      const candidates = await apiGetAllCandidates();
      candidates.sort((a, b) => a.name.localeCompare(b.name));

      setAllCandidates(candidates);
    }

    getCities();
    getAllCandidates();
  }, []);

  useEffect(() => {
    async function getElections() {
      const elections = await apiGetElections(currentCitie.id);
      elections.sort((a, b) =>
        a.votes > b.votes ? -1 : a.votes < b.votes ? 1 : 0
      );

      let newCandidates = elections.flatMap(e => {
        return allCandidates
          .filter(candidate => candidate.id === e.candidateId)
          .map(candidate => {
            const percent = (e.votes * 100) / currentCitie.presence;
            return { ...candidate, votes: e.votes, percent };
          });
      });

      setCitiesCandidates(newCandidates);
    }

    getElections();
  }, [currentCitie, allCandidates]);

  function handleCitieChange(newCitieId) {
    const newCitie = cities.find(c => c.id === newCitieId);
    setCurrentCitie(newCitie);
  }

  return (
    <>
      <Header>react-elections</Header>

      <Main>
        <div className="text-center flex justify-center">
          <SelectInput
            selectDescription="Escolha o município"
            selectOptions={cities}
            onSelectChange={handleCitieChange}
          />
        </div>

        <div className="border flex  flex-col items-center">
          <h1 className="font-semibold text-lg my-2">
            Eleição em {currentCitie.name}
          </h1>

          <div className="space-x-4 my-2">
            <span>
              <strong>Total de eleitores: </strong>
              {currentCitie.votingPopulation}
            </span>
            <span>
              <strong>Abstenção: </strong>
              {currentCitie.absence}
            </span>
            <span>
              <strong>Comparecimento: </strong>
              {currentCitie.presence}
            </span>
          </div>

          <span className="my-2 font-semibold">
            {citiesCandidates.length} candidatos
          </span>

          <div className="flex flex-wrap justify-center my-2">
            {citiesCandidates.map((candidate, index) => {
              return (
                <CandidateCard
                  key={candidate.id}
                  elected={index === 0 ? true : false}
                >
                  {candidate}
                </CandidateCard>
              );
            })}
          </div>
        </div>
      </Main>
    </>
  );
}
