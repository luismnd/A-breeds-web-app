import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getDetail } from '../../Redux/actions'
import { Link } from 'react-router-dom'

export default function Detail(props){
    const { id } = useParams();
    const { detail } = useSelector(state=>state);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDetail(id));
    },[dispatch, id]);

    console.log(detail)
    return (
        <>
            {detail.length>0?
                <div>
                    <Link to="/home">
                        <button>Go back Home</button>
                    </Link>
                    <h2>Breed name: {detail[0].name}</h2>
                    <img src={detail[0].image} alt={detail[0].name} width="200px" height="200px"/>
                    <h3>Minimun weight: {detail[0].weight} kg</h3>
                    <h3>Height range: {detail[0].height} cm</h3>
                    <h3>Life span: {detail[0].life_span}</h3>
                    <h3>Temperaments:</h3>
                    {detail[0].temperament?.map(t=>{return <ul key={t}>{t}</ul>})}
                </div>
            :   <h2>Loading...</h2>
            }
        </>
    );
};

