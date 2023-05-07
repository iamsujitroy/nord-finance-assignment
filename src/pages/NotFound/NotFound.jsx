import { useEffect } from "react";
import "./NotFound.css";
import axios from "axios";

export default function NotFound() {
  useEffect(() => {
    const fetchData = async () => {
      // axios.get("https://swapi.dev/api/people/").then((res) => {
      //   console.log(res.data.results);
      //   res.data.results.map((people) => {
      //     people.films.map(film=>
      //       console.log(film)
      //       // axios.get(film).then(filmsRes=> console.log(filmsRes.data.title))
      //       )
      //   });
      // });

        // axios.get("https://swapi.dev/api/people/").then((res) => {
        //   const data = res.data.results.map(people=>{
        //     return people.films.map(film=>{
        //       return axios.get(film)
        //     })
        //   })
        //   console.log(data);
        // })

    //   axios
    //     .get("https://swapi.dev/api/people/")
    //     .then((res) => {
    //       const data = res.data.results.map((people) => {
    //         return Promise.all(people.films.map((film) => axios.get(film)));
    //       });
    //       Promise.all(data.flat()).then((responses) => {
    //         const films = responses.map((response) => response.data);
    //         console.log(films);
    //       });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });

    // const data = axios.get("https://swapi.dev/api/people/");
    // console.log(data);

      try {
        const response = await axios.get("https://swapi.dev/api/people/");
        const peoples = response.data.results;
        const peopleAfterFetch = peoples.map(async people=>{
          const peopleFilms = await axios.all(people.films)
          // console.log(peopleFilms);
        })
        console.log(peopleAfterFetch);
      } catch (error) {
        console.log(error);
      }
      
    };

    fetchData();
  }, []);

  return <div>NotFound</div>;
}
