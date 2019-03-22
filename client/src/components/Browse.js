import React, { useState, useEffect } from 'react';

import Footer from './Footer';
import { getSearchQuery } from '../services/Search.Services';
import ImageItem from '../containers/ImageItem';
import UserItem from '../containers/UserItem';
import styled from 'styled-components';

const queryString = require("query-string");

const Container = styled.div`
  padding: 40px;
  background: #333;
`;

const FilterBar = styled.div`
  height: 36px;
  width: 100%;
`;

const ResultGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;
`;

function Browse(props) {
    const [q, setQ] = useState("");
    const [data, setData] = useState([]);
    const [isReady, setIsReady] = useState(false);
    let { history } = props;
    const values = queryString.parse(props.location.search);

    const loadData = () => {
        let { q } = values;
        setQ(q);
        getSearchQuery(q).then(({ status, data }) => {
            if (status === 200) {
                setData(data);
                setIsReady(true);
            }
        });
    };
    useEffect(() => {
        if (!isReady) {
            loadData();
        }
    });

    return (
        <div>
            <Container>
                <FilterBar />
                <ResultGrid>
                    {data &&
                        data.map((item, index) => {
                            let { type, _id } = item;
                            if (type === "user") {
                                return <UserItem history={history} _id={_id} key={index} />;
                            }
                        })}
                </ResultGrid>
            </Container>
            <div style={{marginTop: '30px', background: '#333'}} />
            <Footer />
        </div>
    );
}

export default Browse;