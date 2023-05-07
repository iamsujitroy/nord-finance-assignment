import "./Home.css";
import { useEffect, useReducer } from "react";
import axios from "axios";
import Pagination from "../../components/Paginzation/Pagination";
import loadingIcon from "../../assets/gif/loading.gif";

function reducer(state, action) {
  switch (action.type) {
    case "setPeopleList":
      return { ...state, peopleList: action.payload };
    case "setPage":
      return { ...state, page: action.payload };
    case "setTotalPage":
      return { ...state, totalPage: action.payload };
    case "setSearchInput":
      return { ...state, searchInput: action.payload };
    case "setResultType":
      return { ...state, resultType: action.payload };
    case "setLoading":
      return { ...state, loading: action.payload };
    case "setSerialNumberSort":
      return { ...state, serialNumberSort: action.payload };
    case "setNameSort":
      return { ...state, nameSort: action.payload };
    case "setHeightNumberSort":
      return { ...state, heightNumberSort: action.payload };
    case "setMassNumberSort":
      return { ...state, massNumberSort: action.payload };
    default:
      throw new Error();
  }
}

export default function Home() {
  const initialState = {
    peopleList: [],
    page: 1,
    totalPage: 0,
    searchInput: "",
    resultType: "normal",
    loading: true,
    serialNumberSort: false,
    nameSort: false,
    heightNumberSort: false,
    massNumberSort: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  //* to fetch people data
  async function fetchData(url) {
    dispatch({ type: "setLoading", payload: true });
    const response = await axios.get(url);
    if (response.status) {
      //* make loading false
      dispatch({ type: "setLoading", payload: false });
      //* set people list
      dispatch({ type: "setPeopleList", payload: response?.data?.results });
      //* set total page count
      const totalPeopelCount = response?.data?.count;
      const totalPageCount = totalPeopelCount / 10;
      //* if if page contain
      if (totalPageCount > Math.floor(totalPageCount)) {
        dispatch({
          type: "setTotalPage",
          payload: Math.floor(totalPageCount) + 1,
        });
      } else {
        dispatch({ type: "setTotalPage", payload: totalPageCount });
      }
    }
  }

  // * this is how i have tried to fetch data of response routes
  // async function testFunction(url) {
  //   const response = await axios.get(url);
  //   response.data.results.forEach(async (people) => {
  //     const homeWorldResponse = await axios.get(people.homeworld);
  //     people.homeworld = await homeWorldResponse.data.name;
  //     dispatch({ type: "setPeopleList", payload: [...state.peopleList, people] });
  //     console.log(state.peopleList)
  //     console.log(people);
  //   });
  // }
  // useEffect(() => {testFunction("https://swapi.dev/api/people/?page=2")}, [])
  


  //* sort by name
  useEffect(() => {
    if (state.nameSort) {
      const sortedData = state.peopleList.sort((a, b) => {
        if (a.name < b.name) {
          return -1; // a should come before b
        } else if (a.name > b.name) {
          return 1; // b should come before a
        } else {
          return 0; // no change
        }
      });
      dispatch({ type: "setPeopleList", payload: sortedData });
    } else {
      dispatch({ type: "setPeopleList", payload: state.peopleList.reverse() });
    }
  }, [state.nameSort]);
  //* sort by height
  useEffect(() => {
    if (state.heightNumberSort) {
      const sortedData = state.peopleList.sort(
        (a, b) => Number(a.height) - Number(b.height)
      );
      dispatch({ type: "setPeopleList", payload: sortedData });
    } else {
      dispatch({ type: "setPeopleList", payload: state.peopleList.reverse() });
    }
  }, [state.heightNumberSort]);
  //* sort by mass
  useEffect(() => {
    if (state.massNumberSort) {
      const sortedData = state.peopleList.sort(
        (a, b) => Number(a.mass) - Number(b.mass)
      );
      dispatch({ type: "setPeopleList", payload: sortedData });
    } else {
      dispatch({ type: "setPeopleList", payload: state.peopleList.reverse() });
    }
  }, [state.massNumberSort]);
  //* fetch data if page changes or clears the input field
  useEffect(() => {
    const url =
      state.resultType === "search"
        ? `https://swapi.dev/api/people/?search=${state.searchInput}&page=${state.page}`
        : `https://swapi.dev/api/people/?page=${state.page}`;
    fetchData(url);
  }, [state.page, state.resultType]);

  //* to handle the search action
  const handleSearch = (e) => {
    e.preventDefault();
    fetchData(
      `https://swapi.dev/api/people/?search=${state.searchInput}&page=${state.page}`
    );
    dispatch({ type: "setResultType", payload: "search" });
    dispatch({ type: "setPage", payload: 1 });
  };
  //* to handle the search clear action
  const handleSearchClear = () => {
    dispatch({ type: "setSearchInput", payload: "" });
    dispatch({ type: "setResultType", payload: "normal" });
    dispatch({ type: "setPage", payload: 1 });
  };

  //! i need to show it conditianlly. on both condition(if/else). that's y i have stored in a variable
  const taleBody = state.peopleList.map((item, index) => (
    <tr key={item.url}>
      <td>{(state.page - 1) * 10 + (index + 1)}</td>
      <td>{item.name}</td>
      <td>{item.height}</td>
      <td>{item.mass}</td>
      <td>{item.hair_color}</td>
      <td>{item.skin_color}</td>
      <td>{item.eye_color}</td>
      <td>{item.birth_year}</td>
      <td>{item.gender}</td>
      <td>{item.homeworld}</td>
      <td>on progress</td>
      <td>on progress</td>
      <td>on progress</td>
      <td>on progress</td>
    </tr>
  ));

  return (
    <main className="home">
      <h1 className="header">List of People</h1>
      <div className="content-wrapper">
        <div className="search-container">
          <form className="search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search Name..."
              onChange={(e) =>
                dispatch({ type: "setSearchInput", payload: e.target.value })
              }
              required
            />
            <button
              type="reset"
              className={`clear-btn ${
                state.searchInput === "" ? "clear-btn--hide" : ""
              }`}
              onClick={handleSearchClear}
            >
              <i className="fa fa-times" aria-hidden="true" />
            </button>
            <button type="submit" className="search-btn">
              <i className="fa fa-search" aria-hidden="true" />
            </button>
          </form>
        </div>
        {!state.loading ? (
          <>
            <div className="table-parent-container">
              <div className="table-container">
                <table className="user-table">
                  <thead>
                    <tr>
                      <th
                        className="pointer"
                        onClick={() =>
                          dispatch({
                            type: "setSerialNumberSort",
                            payload: !state.serialNumberSort,
                          })
                        }
                      >
                        Sr. No.
                        <span className="sort-btn">
                          {!state.serialNumberSort ? "🔽" : "🔼"}
                        </span>
                      </th>
                      <th
                        className="pointer"
                        onClick={() =>
                          dispatch({
                            type: "setNameSort",
                            payload: !state.nameSort,
                          })
                        }
                      >
                        Name
                        <span className="sort-btn">
                          {!state.nameSort ? "🔽" : "🔼"}
                        </span>
                      </th>
                      <th
                        className="pointer"
                        onClick={() =>
                          dispatch({
                            type: "setHeightNumberSort",
                            payload: !state.heightNumberSort,
                          })
                        }
                      >
                        Height
                        <span className="sort-btn">
                          {!state.heightNumberSort ? "🔽" : "🔼"}
                        </span>
                      </th>
                      <th
                        className="pointer"
                        onClick={() =>
                          dispatch({
                            type: "setMassNumberSort",
                            payload: !state.massNumberSort,
                          })
                        }
                      >
                        Mass
                        <span className="sort-btn">
                          {!state.massNumberSort ? "🔽" : "🔼"}
                        </span>
                      </th>
                      <th>Hair Color</th>
                      <th>Skin Color</th>
                      <th>Eye Color</th>
                      <th>DOB</th>
                      <th>Gender</th>
                      <th>Homeworld</th>
                      <th>Films</th>
                      <th>Species</th>
                      <th>Vehicles</th>
                      <th>Starships</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.serialNumberSort ? taleBody.reverse() : taleBody}
                  </tbody>
                </table>
              </div>
            </div>
            <Pagination
              currentPage={state.page}
              setCurrentPage={(value) =>
                dispatch({ type: "setPage", payload: value })
              }
              totalPage={state.totalPage}
            />
          </>
        ) : (
          <div className="loading">
            <img src={loadingIcon} alt="loading..." />
          </div>
        )}
      </div>
    </main>
  );
}
