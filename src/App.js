import React, {useState} from 'react';
import ReactPaginate from 'react-paginate';
import Loader from "./Loader/Loader";
import Table from "./Table/Table";
import DetailRowView from "./DetailRowView/DetailRowView";
import ModeSelector from "./ModeSelector/ModeSelector";
import TableSearch from "./TableSearch/TableSearch";
import _ from 'lodash';


function App() {
  const [mode,setMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);

  const [sort, setSort] = useState('asc'); //desc
  const [sortField, setSortField] = useState('id');
  const [row,setRow] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);

  const [search, setSearch] = useState('');

  async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();

    setData(_.orderBy(data, sortField, sort));
    setLoading(false);
  }

  const onSort = (sortField) => {
    const clonedData = data.concat();
    const sortType = sort === 'asc' ? 'desc' : 'asc';

    const orderedData = _.orderBy(clonedData, sortField, sortType);

    setData(orderedData);
    setSort(sortType);
    setSortField(sortField);
  };

  const onRowSelect = (row) => {
    setRow(row);
  };

  const modeSelectHandler = (url) => {
    setMode(true);
    setLoading(true);
    fetchData(url);
  }

  const pageChangeHandler = ({selected}) => {
    setCurrentPage(selected);
  };

  const searchHandler = (search) => {
    setSearch(search);
    setCurrentPage(0);
  };

  const getFilteredData = () => {
    if (!search) {
      return data
    }

    return data.filter(item => {
      return item['firstName'].toLowerCase().includes(search.toLowerCase())
        || item['lastName'].toLowerCase().includes(search.toLowerCase())
        || item['email'].toLowerCase().includes(search.toLowerCase())
    });
  };

  const pageSize = 50;
  const filteredData = getFilteredData();
  const displayData = _.chunk(filteredData, pageSize)[currentPage];
  const pageCount = Math.ceil(filteredData.length / pageSize);

  if (!mode) {
    return (
        <div className="container">
          <ModeSelector onSelect={modeSelectHandler}/>
        </div>
    );
  }

  return (
    <div className="container">
      { loading ? <Loader /> :
          <>
            <TableSearch onSearch={searchHandler}/>
            <Table data={displayData} sort={sort} sortField={sortField} onSort={onSort} onRowSelect={onRowSelect}/>
          </>
      }
      { data.length > pageSize ? <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={pageChangeHandler}
          containerClassName={'pagination'}
          activeClassName={'active'}
          pageClassName='page-item'
          pageLinkClassName='page-link'
          previousClassName='page-item'
          nextClassName='page-item'
          previousLinkClassName='page-link'
          nextLinkClassName='page-link'
          forcePage={currentPage}
      /> : null }
      { row ? <DetailRowView person={row}/> : null}
    </div>
  );
}

export default App;
