import React from "react";

const Responses = ({ responses }) => {
  return (
    <div className="columns is-multiline mt-5 mb-6">
      {responses.map((submission, index) => (
        <div key={index} className="column is-one-third ">
          <div className="box p-6">
            <div className="content ">
              <p>
                <strong>Submission ID:</strong> {submission.submissionId}
              </p>
              <p>
                <strong>Submission Date:</strong>
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
  );
};

export default Responses;
