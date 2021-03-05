import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FilterBtn from './Components/FilterBtn';
import FilterDropdown from './Components/FilterDropdown';
import ProjectCard from './Components/ProjectCard';
import { FilterBtnData } from './Components/FilterBtnData';
import { sortData } from './Components/FilterBtnData';
import { arrowIcon } from '../../Config';
import { mainListAPI } from '../../Config';

export default function Main({ history }) {
  const [menuIdx, setMenuIdx] = useState(-1);
  const [isDropDownView, setDropDownView] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({
    category: 'all',
    status: 'all',
    achieve: 'all',
    money: 'all',
    sort: 'popular',
  });
  const [selectedFilterIdx, setSelectedFilterIdx] = useState({
    category: 0,
    status: 0,
    achieve: 0,
    money: 0,
    sort: 0,
  });
  const [projectData, setProjectData] = useState({ count: 0, results: [] });
  const [isWindowBottom, setIsWindowBottom] = useState(false);
  const [currentItemIdx, setCurrentItemIdx] = useState(0);
  const [currentLimit, setCurrentLimit] = useState(9);
  let limit = 9;

  const showMenu = id => {
    if (isDropDownView && menuIdx !== id) {
      setDropDownView(true);
      setMenuIdx(id);
    } else {
      setMenuIdx(id);
      setDropDownView(!isDropDownView);
    }
  };

  const makeQueryString = filterList => {
    let makeQuery = '?';
    for (let i in filterList) {
      if (filterList[i] !== 'all') {
        if (makeQuery.includes('=')) {
          makeQuery += `&${i}=${filterList[i]}`;
        } else {
          makeQuery += `${i}=${filterList[i]}`;
        }
      }
    }
    return makeQuery;
  };

  const addFilter = (query, data, idx) => {
    const newFilter = { ...selectedFilter };
    newFilter[query] = data;
    setSelectedFilter(newFilter);
    const newFilterIdx = { ...selectedFilterIdx };
    newFilterIdx[query] = idx;
    setSelectedFilterIdx(newFilterIdx);
  };

  useEffect(() => {
    const makeQuery = makeQueryString(selectedFilter);
    history.push(makeQuery);
  }, [history, selectedFilter]);

  const resetFilter = () => {
    setSelectedFilter({
      category: 'all',
      status: 'all',
      achieve: 'all',
      money: 'all',
      sort: 'popular',
    });
    setSelectedFilterIdx({
      category: 0,
      status: 0,
      achieve: 0,
      money: 0,
      sort: 0,
    });
    setDropDownView(false);
    setCurrentItemIdx(0);
    setCurrentLimit(9);
    history.push('/');
  };

  const getProjectData = modifier => {
    if (modifier === 'last') {
      alert('더이상 데이터가 없습니다.');
    } else if (modifier === 'inf') {
      console.log('inf');
      fetch(
        `${mainListAPI}${window.location.search}&offset=${currentItemIdx}&limit=${limit}`,
      )
        .then(res => res.json())
        .then(res => {
          setProjectData(prev => ({
            count: res.count,
            results: [...prev.results, ...res.results],
          }));
        });
    } else if (modifier === 'query') {
      console.log('query');
      fetch(`${mainListAPI}${window.location.search}&offset=0&limit=${limit}`)
        .then(res => res.json())
        .then(res => {
          setProjectData({
            count: res.count,
            results: [...res.results],
          });
        });
    } else if (modifier === 'lastOffset') {
      console.log('lastoffset');
      fetch(
        `${mainListAPI}${
          window.location.search
        }&offset=${currentItemIdx}&limit=${
          projectData.count - projectData.results.length
        }`,
      )
        .then(res => res.json())
        .then(res => {
          setProjectData(prev => ({
            count: res.count,
            results: [...prev.results, ...res.results],
          }));
        });
    }
  };
  console.log(
    `${mainListAPI}${window.location.search}&offset=${currentItemIdx}&limit=${currentLimit}`,
  );
  console.log(projectData);
  useEffect(() => {
    getProjectData('query');
  }, [window.location.search]);

  useEffect(() => {
    getProjectData();
    window.addEventListener('scroll', infiniteScroll);
    return () => window.removeEventListener('scroll', infiniteScroll);
  }, []);

  const infiniteScroll = () => {
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
    );

    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop,
    );
    let clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight > scrollHeight - 0.1) {
      setIsWindowBottom(true);
    } else {
      setIsWindowBottom(false);
    }
  };

  useEffect(() => {
    if (isWindowBottom) {
      let itemIdx = currentItemIdx + 9;

      if (itemIdx + currentLimit === projectData.count) {
        getProjectData('last');
      } else if (itemIdx + currentLimit > projectData.count) {
        getProjectData('lastOffset');
      } else {
        setCurrentItemIdx(itemIdx);
        getProjectData('inf');
      }
    }
  }, [isWindowBottom]);

  return (
    <>
      <Filterbar>
        <FilterWrap>
          <FilterLeft>
            {FilterBtnData.map(data => {
              return (
                <FilterBtn key={data.id} clicked={() => showMenu(data.id)}>
                  {selectedFilter[data.query] === 'all'
                    ? data.name
                    : data.subTab[selectedFilterIdx[data.query]]['name']}
                  <img alt="arrow_image" src={arrowIcon} />
                  {isDropDownView && menuIdx === data.id && (
                    <FilterDropdown
                      subTabData={data.subTab}
                      addFilter={addFilter}
                    />
                  )}
                </FilterBtn>
              );
            })}
          </FilterLeft>
          <FilterBtn clicked={resetFilter}>필터 초기화</FilterBtn>
        </FilterWrap>
      </Filterbar>
      <ProjectWrap>
        <ProjectHeader>
          <div>
            <span>{projectData?.count}</span>개의 프로젝트가 있습니다.
          </div>
          {sortData.map(data => {
            return (
              <FilterBtn key={data.id} clicked={() => showMenu(data.id)}>
                {/* {data.subTab[selectedFilterIdx[data.query]]['name']} */}
                {selectedFilter[data.query] === 'all'
                  ? data.name
                  : data.subTab[selectedFilterIdx[data.query]]['name']}
                <img alt="arrow_image" src={arrowIcon} />
                {isDropDownView && menuIdx === data.id && (
                  <FilterDropdown
                    subTabData={data.subTab}
                    addFilter={addFilter}
                  />
                )}
              </FilterBtn>
            );
          })}
        </ProjectHeader>
        <ProjectContent>
          {projectData?.results.map((data, idx) => {
            return (
              <ProjectCard
                key={data.idx}
                id={data.project_uri}
                name={data.name}
                thumbnail={data.thumbnail_url}
                category={data.category}
                author={data.user}
                summary={data.summary}
                currnetAmount={data.total_amount}
                fundingRate={data.achieved_rate}
                limitDate={data.days_left}
                isLike={data.isLike}
              />
            );
          })}
        </ProjectContent>
      </ProjectWrap>
    </>
  );
}

const Filterbar = styled.div`
  margin-top: 66px;
  height: 54px;
  background-color: white;
  /* box-shadow: 0 6px 6px -4px lightgray; */
  border-bottom: 1px solid rgb(230, 230, 230);
`;

const FilterWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1000px;
  margin: 0 auto;
  padding-top: 10px;
`;

const FilterLeft = styled.div`
  display: flex;
`;

const ProjectWrap = styled.div`
  width: 1000px;
  height: 2000px;
  margin: 0 auto;
`;

const ProjectHeader = styled.header`
  display: flex;
  justify-content: space-between;
  margin: 0px auto;
  padding: 14px 0px;
  font-size: 16px;
  line-height: 27px;

  span {
    color: ${props => props.theme.fontPointColor};
  }
`;

const ProjectContent = styled.section`
  display: flex;
  flex-flow: wrap;
`;
