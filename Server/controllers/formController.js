const axios = require("axios");

const apiKey =
  "sk_prod_TfMbARhdgues5AuIosvvdAC9WsA5kXiZlW8HZPaRDlIbCpSpLsXBeZO7dCVZQwHAY3P4VSBPiiC33poZ1tdUj2ljOzdTCCOSpUZ_3912";

exports.getQuestions = async (req, res) => {
  const formId = req.params.formId;
  try {
    const response = await axios.get(
      `https://api.fillout.com/v1/api/forms/${formId}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
      }
    );
    res.json({ questions: response.data.questions });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getFilteredResponses = async (req, res) => {
  const formId = req.params.formId;
  const filters = req.query.filters ? JSON.parse(req.query.filters) : [];
  if (!formId) {
    return res.status(400).json({ error: "Form ID is required" });
  }
  try {
    const response = await axios.get(
      `https://api.fillout.com/v1/api/forms/${formId}/submissions`,
      { headers: { Authorization: `Bearer ${apiKey}` } }
    );

    const filteredResponses = response.data.responses.filter((submission) => {
      return filters.every((filter) => {
        const question = submission.questions.find((q) => q.name === filter.id);
        if (!question) {
          return false;
        }
        const questionValue = question.value;
        switch (filter.condition) {
          case "equals":
            return questionValue == filter.value;
          case "does_not_equal":
            return questionValue !== filter.value;
          case "greater_than":
            return questionValue > filter.value;
          case "less_than":
            return questionValue < filter.value;
          default:
            return true;
        }
      });
    });

    const page = parseInt(req.query.page) || 1;
    const pageSize = 6;
    const pageCount = Math.ceil(filteredResponses.length / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, filteredResponses.length);

    const paginatedResponses = filteredResponses.slice(startIndex, endIndex);

    res.json({
      totalResponses: filteredResponses.length,
      pageCount: pageCount,
      currentPage: page,
      responses: paginatedResponses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
