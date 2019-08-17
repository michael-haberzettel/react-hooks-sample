import * as React from 'react';
import styled from 'styled-components';

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

const StyledArticlesFilters = styled.div`
    background-color:#EEE;
    border:1px solid silver;
    width:200px;
    padding:4px;
`;

const ArticlesFilters: React.FC<IArticlesFiltersProps> = props => {
    return <StyledArticlesFilters>
        <em>Filtres :</em>
        <p>
            {Object
                .values(props.filters)
                .map(filter => (
                    <React.Fragment key={filter.name} >
                        <input type="checkbox"
                            checked={filter.isChecked}
                            onChange={input => props.onChangeFilter(filter.name, input.target.checked)} />
                        {filter.name}<br />
                    </React.Fragment>
                ))
            }
        </p>
    </StyledArticlesFilters>
}

export default ArticlesFilters;


