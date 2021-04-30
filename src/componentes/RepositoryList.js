import React, { useEffect, useState } from 'react';
import AppLauncherSection from '@salesforce/design-system-react/components/app-launcher/section';
import AppLauncherTile from '@salesforce/design-system-react/components/app-launcher/tile';
import Spinner from '@salesforce/design-system-react/components/spinner';


import Button from '@salesforce/design-system-react/components/button';
import Search from '@salesforce/design-system-react/components/input/search';
import { api } from '../services/api'
/* eslint-disable react/react-in-jsx-scope */

 export function RepositoryList(){

    const [ repositories, setRepositories] = useState([])
    const [ total, setTotal ] = useState(-1)
    const [ page, setPage] = useState(1);
    const [ filter, setFilter ] = useState('')

    useEffect(()=>{
        api.get('https://maels.herokuapp.com/meals', {
            params: {
                page,
                filter
            }
        })
        .then(data => {
            setRepositories(data.data.meals)
            setTotal(data.data.total)

            if(filter) setPage(1)
        })
    }, [page, filter])



    let ArrayButtos = []

    for(let i=0; i<= Math.floor(total / 9) ; i++){

        ArrayButtos.push(
            <Button
                Key={i}
                onClick={()=> setPage(i+1)}
            >
                {i+1}
            </Button>
        )
    }

    return (

        <div className="meal">
            <Search  className="search"
                onChange={(event) => {
                    setFilter(event.target.value);
                }}
                assistiveText={{ label: 'Find an app' }}
            />

            <AppLauncherSection title="Meals">

            </AppLauncherSection>
            { total === 0 && (
                <div style={{ position: 'relative', height: '5rem' }}>
				<Spinner
					size="large"
					variant="brand"
					assistiveText={{ label: 'Main Frame Loading...' }}
				/>
			    </div>
            ) }

            <div className="wrapper">
                { repositories && repositories.map(meal =>
                    <AppLauncherTile
                        key={meal.idMeal}
                        title={meal.strMeal}
                        iconNode={
                            <img width="90"  src={meal.strMealThumb} alt="Minha Figura"></img>
                        }
                        description={meal.strInstructions}
                    />
                )}
             </div>
            {ArrayButtos}
        </div>
    );
}
