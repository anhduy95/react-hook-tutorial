import React, { useState, useEffect } from 'react';
import './App.css';
import queryString from 'query-string';
import PostList from './components/PostList';
import Pagination from './components/Pagination';
import PostFiltersForm from './components/PostFiltersForm';

function App() {
  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRow: 1
  });
  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
    title_like: '',
  })
  useEffect(() => {
    async function fetchPostList() {
      const paramString = queryString.stringify(filters);
      const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramString}`;
      const reponse = await fetch(requestUrl);
      const reponseJson = await reponse.json();
      const { data, pagination } = reponseJson;
      setPostList(data);
      setPagination(pagination);
    }
    fetchPostList();
  }, [filters]);
  function handlePageChange(newPage) {
    setFilters({
      ...filters,
      _page: newPage,
    })
  };
  function handleFiltersChange(newFilters) {
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm
    })
  }
  return (
    <div className="App">
      <h2>React Hook - Tutorial</h2>
      <PostFiltersForm onSubmit={handleFiltersChange} />
      <PostList posts={postList} />
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
