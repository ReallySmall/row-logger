import * as $ from 'jquery';
import * as materialize from 'materialize-css';
import { RowingStatLineChart } from '../modules/charts';

$(document).ready(() => {

  	$('.js-data-chart').each((index, chart) => {
  		const $chart = $(chart);
  		const rowingStatLineChart = new RowingStatLineChart(
  											chart, 
  											parseInt($chart.data('constant'), 10), 
  											$chart.data('strokes'), 
  											parseInt($chart.data('sample-point'), 10)
  										);
  	});

  	$('.js-fade').each((index, fade) => {
  		setTimeout(()=>{
  			$(fade).fadeOut('slow');
  		}, 2000);
  	});

    $('.js-toggle').each((index, toggle) => {
      $(toggle).on('click', event => {

        event.preventDefault();

        const toggleId: string = $(toggle).data('toggle-id');
        const $relatedElement = $(toggleId);

        $relatedElement.toggleClass('hide');

      });
    });

    $('.js-delete').on('click', event => {
      if(confirm('Are you sure you want to delete this?')){
        return true;
      } else {
        event.preventDefault();
      }
    });

    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: false // Close upon selecting a date,
    });

});