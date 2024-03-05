import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./components/Pagination/Pagination";
import FilterList from "./components/FilterList/FilterList";
import Responses from "./components/Responses/Responses";
import Loader from "./components/Loader/Loader";
import FormControl from "./components/FormControl/FormControl";
import FormHeader from "./components/FormHeader/FormHeader";

const App = () => {
  const [formId, setFormId] = useState("cLZojxk94ous");
  const [filters, setFilters] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/${formId}/questions`
        );
        setQuestions(response.data.questions);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchFilteredResponses();
    fetchQuestions();
  }, []);

  const fetchFilteredResponses = async (page = 1) => {
    setPage(page);
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:4000/${formId}/filteredResponses`,
        {
          params: { filters: JSON.stringify(filters), page: page },
        }
      );
      setResponses(response.data.responses);
      setPageCount(response.data.pageCount);
    } catch (error) {
      console.error(error);
      setError("Error fetching responses. Please try again later.");
    }
    setLoading(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchFilteredResponses(page);
  };

  const addFilter = () => {
    setFilters([...filters, { id: "", condition: "equals", value: "" }]);
  };

  const removeFilter = (index) => {
    const newFilters = [...filters];
    newFilters.splice(index, 1);
    setFilters(newFilters);
  };

  const handleFilterChange = (index, field, value) => {
    const newFilters = [...filters];
    newFilters[index][field] = value;
    setFilters(newFilters);
  };

  return (
    <div className="container">
      <form onSubmit={handleFormSubmit}>
        <FormHeader formId={formId} setFormId={setFormId} />
        <FilterList
          filters={filters}
          questions={questions}
          handleFilterChange={handleFilterChange}
          removeFilter={removeFilter}
        />
        <FormControl addFilter={addFilter} />
      </form>

      {error && <p className="has-text-danger">{error}</p>}

      {loading ? (
        <Loader />
      ) : (
        <>
          <Responses responses={responses} />
          <Pagination
            page={page}
            pageCount={pageCount}
            fetchFilteredResponses={fetchFilteredResponses}
          />
        </>
      )}
    </div>
  );
};

export default App;
