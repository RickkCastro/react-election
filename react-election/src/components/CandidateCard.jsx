export default function CandidateCard({
  children: candidate,
  elected = false,
}) {
  const color = elected ? 'text-green-500' : 'text-yellow-500';

  return (
    <div className="shadow-lg m-3 flex items-center justify-between flex-col p-3 w-60 h-60">
      <div className="flex w-full justify-between">
        <img
          src={`/img/${candidate.username}.png`}
          alt={candidate.username} //src/img/antman.png
          className="border w-20 h-20 rounded-full"
        />

        <div className="flex flex-col items-center">
          <p className={`text-lg ${color}`}>{candidate.percent.toFixed(2)}%</p>
          <p className="text-sm">{candidate.votes} votos</p>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h1 className="text-xl font-semibold my-5">{candidate.name}</h1>
        <p className={`${color}`}>{elected ? 'Eleito' : 'Não eleito'}</p>
      </div>
    </div>
  );
}
