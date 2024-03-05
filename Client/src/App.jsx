import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./components/Pagination/Pagination";
import FilterList from "./components/FilterList/FilterList";

const App = () => {
  const [formId, setFormId] = useState("cLZojxk94ous");
  const [filters, setFilters] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

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

  return (
    <div className="container">
      <form onSubmit={handleFormSubmit}>
        <div className="field">
          <label htmlFor="formId" className="label">
            Form ID:
          </label>
          <div className="control">
            <input
              type="text"
              id="formId"
              className="input"
              value={formId}
              onChange={(e) => setFormId(e.target.value)}
              required
              disabled
            />
          </div>
        </div>

        <FilterList
          filters={filters}
          questions={questions}
          handleFilterChange={handleFilterChange}
          removeFilter={removeFilter}
        />

        <div className="field is-grouped">
          <div className="control">
            <button
              type="button"
              className="button is-info"
              onClick={addFilter}
            >
              Add Filter
            </button>
          </div>
          <div className="control">
            <button type="submit" className="button is-info">
              Fetch Responses
            </button>
          </div>
        </div>

        <Pagination
          page={page}
          pageCount={pageCount}
          fetchFilteredResponses={fetchFilteredResponses}
        />
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="has-text-danger">{error}</p>}

      <div className="columns is-multiline">
        {responses.map((submission, index) => (
          <div key={index} className="column is-one-third">
            <div className="box">
              <div className="content">
                <p>
                  <strong>Submission ID:</strong> {submission.submissionId}
                </p>
                <p>
                  <strong>Submission Date:</strong>{" "}
                  {submission.submissionTime.split("T")[0]}
                </p>
                <ul>
                  {submission.questions.map((question, idx) => (
                    <li key={idx}>
                      <strong>{question.name}:</strong> {question.value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
