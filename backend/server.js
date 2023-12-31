const express = require('express');
const cors = require('cors');

// for taking the csv file in
const fs = require('fs');

// lodash and csv parsing for Q6, might also be useful for other Qs!
const lodash = require('lodash');
const parser = require('csv-parse/sync');
const csv = require('csv-parser');

// minheap for Q7
const MinHeap = require('heap-js').Heap;

// path to the csv file
const csvFilePath = './Assets/Global_YouTube_Statistics_v1.csv';

const app = express();

// Add the cors middleware
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send({ body: "hello world!!!" });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// endpoint for q1
app.get('/q1', (req, res) => {
  fs.readFile(csvFilePath, (err, fileData) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading CSV file');
    }

    const data = parser.parse(fileData, { columns: true });

    const genreViews = {};
    data.forEach((row) => {
      if (!genreViews[row.channel_type]) {
        genreViews[row.channel_type] = 0;
      }
      genreViews[row.channel_type] += parseInt(row['video views']);
    });

    const sortedGenres = Object.entries(genreViews)
      .map(([genre, views]) => ({ genre, views }))
      .sort((a, b) => b.views - a.views);

    const labels = sortedGenres.map((genre) => genre.genre);
    const datasets = sortedGenres.map((genre, i) => ({
      label: genre.genre,
      data: genre.views,
      backgroundColor: `hsl(${(i * 360) / sortedGenres.length}, 100%, 50%)`,
    }));

    const finalData = {
      labels: labels,
      datasets: datasets,
    };

    res.status(200).send(finalData);
  });
});



// endpoint for q2
app.get('/q2', (req, res) => {
  fs.readFile(csvFilePath, (err, fileData) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading CSV file');
    }

    const data = parser.parse(fileData, { columns: true });

    // Aggregate by genre
    const genreCounts = {};
    data.forEach(row => {
      if (!genreCounts[row.channel_type]) {
        genreCounts[row.channel_type] = 0;
      }
      genreCounts[row.channel_type]++;
    });

    // Map to array
    let sortedGenres = Object.entries(genreCounts)
      .map(([genre, count]) => ({ genre, count }))
      .sort((a, b) => b.count - a.count);

    // Top 5, 10, and all
    const top5 = sortedGenres.slice(0, 5);
    const top10 = sortedGenres.slice(0, 10);
    const topAll = sortedGenres;

    // Extract labels and data for all datasets
    const top5Labels = top5.map(g => g.genre);
    const top5Data = top5.map(g => g.count);

    const top10Labels = top10.map(g => g.genre);
    const top10Data = top10.map(g => g.count);

    const topAllLabels = topAll.map(g => g.genre);
    const topAllData = topAll.map(g => g.count);

    // Function to generate colors
    const generateColors = (length) => {
      const colors = [];
      for (let i = 0; i < length; i++) {
        colors.push(`hsl(${(i * 360) / length}, 100%, 50%)`);
      }
      return colors;
    };

    // Map datasets with unique colors for each
    const top5Dataset = {
      labels: top5Labels,
      datasets: [{
        data: top5Data,
        backgroundColor: generateColors(top5Labels.length),
      }]
    };

    const top10Dataset = {
      labels: top10Labels,
      datasets: [{
        data: top10Data,
        backgroundColor: generateColors(top10Labels.length),
      }]
    };

    const topAllDataset = {
      labels: topAllLabels,
      datasets: [{
        data: topAllData,
        backgroundColor: generateColors(topAllLabels.length),
      }]
    };

    res.status(200).send({
      top5: top5Dataset,
      top10: top10Dataset,
      topAll: topAllDataset
    });
  });
});



// endpoint for q5
app.get('/q5', (req, res) => {
  fs.readFile(csvFilePath, (err, fileData) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading CSV file');
    }

    const data = parser.parse(fileData, { columns: true });

    const genreSubscribers = {};
    data.forEach((row) => {
      if (!genreSubscribers[row.channel_type]) {
        genreSubscribers[row.channel_type] = 0;
      }
      genreSubscribers[row.channel_type] += parseInt(row.subscribers);
    });

    const sortedGenres = Object.entries(genreSubscribers)
      .map(([genre, subscribers]) => ({ genre, subscribers }))
      .sort((a, b) => b.subscribers - a.subscribers);

    const labels = sortedGenres.map((genre) => genre.genre);

    const datasets = sortedGenres.map((genre, i) => ({
      label: genre.genre,
      data: genre.subscribers,
      backgroundColor: `hsl(${(i * 360) / sortedGenres.length}, 100%, 50%)`,
    }));

    const chartData = {
      labels,
      datasets,
    };

    res.status(200).send(chartData);
  });
});





// endpoint for Q6
app.get('/q6', (req, res) => {

  // take the csv file in
  fs.readFile(csvFilePath, (err, fileData) => {
    if (err) {
      console.error(err);
      res.status(500).send({ body: "error reading csv file!" });
      return;
    }

    // parse the csv file into an array of objects
    const data = parser.parse(fileData, { columns: true });

    // for Q6 we're getting:
    // a list of unique genres
    const uniqueGenres = lodash.uniqBy(data, 'channel_type').map(row => { return row.channel_type });
    console.log(uniqueGenres);

    // the min and max years
    const minYear = 2005; // yt was founded in 2005
    const maxYear = lodash.maxBy(data, 'created_year').created_year;
    // console.log(minYear, maxYear);

    // counts of each genre by year
    let genreCountsByYear = [];
    for (let i = 0; i < uniqueGenres.length; i++) {

      // get all the rows with the current genre
      const rowsOfGenre = data.filter(row => { return row.channel_type === uniqueGenres[i] });

      // get the counts of each genre by year with buckets for each year
      let yearCounts = Array(maxYear - minYear + 1).fill(0);
      for (let j = 0; j < rowsOfGenre.length; j++) {
        if ((rowsOfGenre[j].created_year - minYear) < 0) continue;
        yearCounts[rowsOfGenre[j].created_year - minYear]++;
      }

      // add the genre and counts to the array
      genreCountsByYear.push({ genre: uniqueGenres[i], counts: yearCounts });
    }

    // todo: sort the arrays into chartJS format
    // year labels from 2005 to 2022
    const labels = Array(maxYear - minYear + 1).fill(0).map((_, i) => { return i + minYear });

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
    res.status(200).send({ dataForDisplay });

    // res.status(200).send({body: "hello world from question 6!!!"});
  });
});

// endpoint for Q7
app.get('/q7', (req, res) => {

  // take the csv file in
  fs.readFile(csvFilePath, (err, fileData) => {
    if (err) {
      console.error(err);
      res.status(500).send({ body: "error reading csv file!" });
      return;
    }

    // parse csv into an array of objects
    const data = parser.parse(fileData, { columns: true });

    // get an array of unique countries'
    // const uniqueCountries = lodash.uniqBy(data, 'Country').map(row => { return row.Country });
    // console.log(uniqueCountries, uniqueCountries.length);

    // group rows by countries
    const groupedByCountry = lodash.groupBy(data, 'Country'); // this is now an aggregated object {<country>: [rows]}

    /**
     * For each country:
     * - For each row:
     *  - get the avg. of highest and lowest yearly earnings
     *  - Add this avg to this country's total
     *  - Keep track and update the highest earning channel
     * - return an object containing: country name, channel (row) counts, total earnings and highest earning channel
     * - push this object to an array
     * 
     * hint from copilot: use a min heap with 10 slots to keep track of the highest earning channels
     * if the current channel's earning is higher than the lowest earning channel in the heap, replace it
     */

    // for each country
    let topTenCountries = new MinHeap();
    Object.entries(groupedByCountry).forEach(([country, rows]) => {

      let bestRow = rows[0];
      // calculate the total channel earnings of this country
      const totalEarnings = rows.reduce((sum, row) => {
        let high = Number(row.highest_yearly_earnings) || 0;
        let low = Number(row.lowest_yearly_earnings) || 0;
        let earning = (high + low) / 2;

        // update the best earning channel of this country
        if (earning > (Number(bestRow.highest_yearly_earnings) + Number(bestRow.lowest_yearly_earnings)) / 2) {
          bestRow = row;
        }

        return sum + earning;
      }, 0)

      let countryResult = {
        country: country,
        channelCounts: rows.length,
        totalYearlyEarnings: parseInt(totalEarnings),
        avgYearlyEarnings: parseInt(totalEarnings / rows.length),
        bestChannel: { name: bestRow.Title, avgYearlyEarnings: (Number(bestRow.highest_yearly_earnings) + Number(bestRow.lowest_yearly_earnings)) / 2 }
      };

      if (topTenCountries.size() < 10) {
        topTenCountries.push(countryResult);
      } else if (countryResult.totalYearlyEarnings > topTenCountries.peek().totalYearlyEarnings) {
        topTenCountries.pop();
        topTenCountries.push(countryResult);
      }
    });

    const dataForDisplay = topTenCountries.toArray().sort((a, b) => b.totalYearlyEarnings - a.totalYearlyEarnings);
    // append the rank to each country
    for (let i = 0; i < dataForDisplay.length; i++) {
      dataForDisplay[i].rank = i + 1;
    }

    // sort an array of the names of the top 10 countries by the way
    const top = dataForDisplay.map(country => { return country.country });
    console.log(top);

    res.status(200).send({ dataForDisplay: dataForDisplay, topTenCountries: top });
  });
});


//endpoint for Question 3
app.get('/q3/:category', (req, res) => {

  const countryCounts = new Map();
  const category = req.params.category

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {

      if(row.category === category){
          if(countryCounts.has(row.Country)){
              countryCounts.set(row.Country, countryCounts.get(row.Country) + 1)
          }
          else{
              countryCounts.set(row.Country, 1)
          }
      }

    })
    .on('end', () => {
      for( let [k, v] of countryCounts.entries()){
        if ( k === "United States")
          countryCounts.set("United States of America", countryCounts.get(k))
      }
      countryCounts.delete("United States")
      const data = Array.from([...countryCounts.entries()].sort(
                              (a, b) => b[1] - a[1]).slice(0,5));
      res.json(data);
    });

});


// endpoint for Question 4
app.get('/q4/:category', (req, res) => {

  const countryCounts = new Map();
  const category = req.params.category
  var otherTotal = 0;
  const theData = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {

      if(row.category === category){
          if(countryCounts.has(row.Country)){
              countryCounts.set(row.Country, countryCounts.get(row.Country) + 1)
          }
          else{
              countryCounts.set(row.Country, 1)
          }
      }

    })
    .on('end', () => {
      const data = Array.from([...countryCounts.entries()].sort(
                              (a, b) => b[1] - a[1]));
      
      for(let i=6; i< data.length; i++){
        otherTotal += data[i][1]
      }
      for(let i=0; i<6; i++){
        theData.push(data[i]);
      }
      theData.push(['Other', otherTotal])

      console.log(theData);
      res.json(theData);
    });

});