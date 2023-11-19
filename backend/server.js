const express = require('express');
const cors = require('cors');

// for taking the csv file in
const fs = require('fs');

// lodash for Q6, might also be useful for other Qs!
const lodash = require('lodash');
const parser = require('csv-parse/sync');

// path to the csv file
const csvFilePath = './Assets/Global_YouTube_Statistics_v1.csv';

const app = express();

// Add the cors middleware
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send({body: "hello world!!!"});
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// endpoint for Q6
app.get('/q6', (req, res) => {
  
  // take the csv file in
  fs.readFile(csvFilePath, (err, fileData) => {
    if (err) {
      console.error(err);
      res.status(500).send({body: "error reading csv file!"});
      return;
    }

    // parse the csv file into an array of objects
    const data = parser.parse(fileData, {columns: true});

    // for Q6 we're getting:
    // a list of unique genres
    const uniqueGenres = lodash.uniqBy(data, 'channel_type').map(row => {return row.channel_type});
    console.log(uniqueGenres);

    // the min and max years
    const minYear = 2005; // yt was founded in 2005
    const maxYear = lodash.maxBy(data, 'created_year').created_year;
    // console.log(minYear, maxYear);

    // counts of each genre by year
    let genreCountsByYear = [];
    for (let i = 0; i < uniqueGenres.length; i++) {
      
      // get all the rows with the current genre
      const rowsOfGenre = data.filter(row => {return row.channel_type === uniqueGenres[i]});
      
      // get the counts of each genre by year with buckets for each year
      let yearCounts = Array(maxYear - minYear + 1).fill(0);
      for (let j = 0; j < rowsOfGenre.length; j++) {
        if ((rowsOfGenre[j].created_year - minYear) < 0) continue;
        yearCounts[rowsOfGenre[j].created_year - minYear]++;
      }

      // add the genre and counts to the array
      genreCountsByYear.push({genre: uniqueGenres[i], counts: yearCounts});
    }

    // todo: sort the arrays into chartJS format
    // year labels from 2005 to 2022
    const labels = Array(maxYear - minYear + 1).fill(0).map((_, i) => {return i + minYear});

    // datasets for each genre
    const datasets = [];
    for (let i = 0; i < genreCountsByYear.length; i++) {
      datasets.push({
        label: genreCountsByYear[i].genre,
        data: genreCountsByYear[i].counts,
        // give colors for each of the 14 genres, from red to purple
        backgroundColor: `hsl(${(i * 360 / 14) % 360}, 100%, 50%)`,
      });
    }

    const dataForDisplay = {
      labels: labels,
      datasets: datasets,
    }

    // console.log(genreCountsByYear);
    // return the results
    res.status(200).send({dataForDisplay});

    // res.status(200).send({body: "hello world from question 6!!!"});
  });
});