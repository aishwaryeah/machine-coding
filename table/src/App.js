import { useMemo, useState } from "react";
import "./styles.css";
import {users} from "./constants/tableData";

const PAGE_SIZE = 5;

function App() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);

  /*
    Search + Filter + Sort
  */
  const processedUsers = useMemo(() => {
    let result = [...users];

    // 1. Search
    if (search.trim()) {
      const query = search.toLowerCase().trim();

      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
    }

    // 2. Filter
    if (department !== "All") {
      result = result.filter(
        (user) => user.department === department
      );
    }

    // 3. Sort
    if (sortConfig.key) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (typeof aValue === "string") {
          const comparison = aValue.localeCompare(bValue);

          return sortConfig.direction === "asc"
            ? comparison
            : -comparison;
        }

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }

        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }

        return 0;
      });
    }

    return result;
  }, [search, department, sortConfig]);

  /*
    Pagination
  */
  const totalPages = Math.ceil(
    processedUsers.length / PAGE_SIZE
  );

  const startIndex = (currentPage - 1) * PAGE_SIZE;

  const paginatedUsers = processedUsers.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  /*
    Sorting handler
  */
  const handleSort = (key) => {
    setCurrentPage(1);

    setSortConfig((previous) => {
      if (previous.key === key) {
        return {
          key,
          direction:
            previous.direction === "asc" ? "desc" : "asc",
        };
      }

      return {
        key,
        direction: "asc",
      };
    });
  };

  /*
    Search handler
  */
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  /*
    Filter handler
  */
  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
    setCurrentPage(1);
  };

  /*
    Reset everything
  */
  const handleReset = () => {
    setSearch("");
    setDepartment("All");
    setSortConfig({
      key: null,
      direction: "asc",
    });
    setCurrentPage(1);
  };

  /*
    Sort icon
  */
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return "↕";
    }

    return sortConfig.direction === "asc"
      ? "↑"
      : "↓";
  };

  return (
    <div className="app">
      <div className="container">

        <h1>Employee Table</h1>

        {/* Controls */}

        <div className="controls">

          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={handleSearch}
          />

          <select
            value={department}
            onChange={handleDepartmentChange}
          >
            <option value="All">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
          </select>

          <button onClick={handleReset}>
            Reset
          </button>

        </div>

        {/* Table */}

        <div className="table-wrapper">

          <table>

            <thead>
              <tr>

                <th>
                  ID
                </th>

                <th
                  onClick={() => handleSort("name")}
                  className="sortable"
                >
                  Name {getSortIcon("name")}
                </th>

                <th>
                  Email
                </th>

                <th>
                  Department
                </th>

                <th
                  onClick={() => handleSort("age")}
                  className="sortable"
                >
                  Age {getSortIcon("age")}
                </th>

                <th
                  onClick={() => handleSort("salary")}
                  className="sortable"
                >
                  Salary {getSortIcon("salary")}
                </th>

              </tr>
            </thead>

            <tbody>

              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <tr key={user.id}>

                    <td>{user.id}</td>

                    <td>{user.name}</td>

                    <td>{user.email}</td>

                    <td>{user.department}</td>

                    <td>{user.age}</td>

                    <td>
                      ${user.salary.toLocaleString()}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="empty"
                  >
                    No users found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* Pagination */}

        {processedUsers.length > 0 && (
          <div className="pagination">

            <button
              onClick={() =>
                setCurrentPage((page) => page - 1)
              }
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((page) => page + 1)
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;