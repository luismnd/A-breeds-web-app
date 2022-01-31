
export default function Sorter({handleSorter}){
    return (
        <div>
        <select id="sorter" onChange={e=>handleSorter(e)}>
            <optgroup id="sortByName" label="By Name" type="Name">
                <option value="name_ascending">Ascending Aa-zZ</option>
                <option value="name_descending">Descending Zz-aA</option>
            </optgroup>
            <optgroup id="sortByWeight" label="By Weight" type="Weight">
                <option value="weight_ascending">Ascending -+</option>
                <option value="weight_descending">Descending +-</option>
            </optgroup>
        </select>
        </div>
    );
};