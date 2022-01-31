
export default function Filter({temperaments, handleFilter, handleFilterAdded}){
  return (
    <div type="Filter">
      <select onChange={e => handleFilter(e)}>
        <option value="All">All Temperaments</option>
        {temperaments?.map(t=> <option key={t.id} value={t.name}>{t.name}</option>)}
      </select>
      <select type="Breed_Source" onChange={e => handleFilterAdded(e)}>
        <option value="All">All Sources</option>
        <option value="Added">Added</option>
        <option value="Existent">Existent</option>
      </select>
    </div>
  );
}