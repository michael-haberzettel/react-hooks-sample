import * as React from 'react';
import { BlocArticlesFilters, FiltersList } from './atoms';

interface IArticlesFiltersProps {
    filters: IFiltersProps;
    onChangeFilter: (filterName: string, newState: boolean) => void;
}

interface IFiltersProps {
    [key: string]: {
        name: string;
        isChecked: boolean;
    }
}

const ArticlesFilters: React.FC<IArticlesFiltersProps> = props => {
    return <BlocArticlesFilters>
        <em>Filtres :</em>
        <FiltersList>
            {Object
                .values(props.filters)
                .map(filter => (
                    <div key={filter.name} >
                        <input type="checkbox"
                            checked={filter.isChecked}
                            onChange={input => props.onChangeFilter(filter.name, input.target.checked)} />
                        {filter.name}<br />
                    </div>
                ))
            }
        </FiltersList>
    </BlocArticlesFilters>
}

export default ArticlesFilters;


