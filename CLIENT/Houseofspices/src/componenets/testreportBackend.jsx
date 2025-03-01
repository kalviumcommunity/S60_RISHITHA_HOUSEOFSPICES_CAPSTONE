import React, { useEffect, useState } from "react";

const TestBackend = () => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/test-results") // Adjust the URL based on your backend port
      .then((response) => response.json())
      .then((data) => setReport(data))
      .catch((error) => console.error("Error fetching test report:", error));
  }, []);

  return (
    <div>
      <h1>Test Report</h1>
      {report ? (
        <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
          {JSON.stringify(report, null, 2)}
        </pre>
      ) : (
        <p>Loading test report...</p>
      )}
    </div>
  );
};

export default TestBackend;
