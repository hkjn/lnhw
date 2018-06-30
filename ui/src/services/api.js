import axios from 'axios';

export function getPerson () {
    return axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const persons = res.data;
        alert(persons[0])
      })
}
