import React from 'react'

class QuantSpectrumBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chartLoaded: false,
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));

    var component = this;

    // Load the chart API
    return jQuery.ajax({
      dataType: "script",
      cache: true,
      url: "https://www.google.com/jsapi",
    })
      .done(function () {
        google.load("visualization", "1", {
          packages:["corechart"],
          callback: function () {
            component.drawChart();
            component.setState({chartLoaded: true})
          },
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.chartLoaded) {
      if (prevProps.spectrumData != this.props.spectrumData) {
        this.drawChart();
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  drawChart() {
    if (!this.state.chartLoaded) { return; }

    var data = new google.visualization.DataTable();

    data.addColumn('number', 'mz');
    data.addColumn('number', 'Intensity');
    data.addColumn({'type': 'string', 'role': 'style'})
    data.addColumn({'type': 'string', 'role': 'annotation'})

    var quantMz = this.props.quantMz
    var minMZ = Math.round(2 * Math.min.apply(null, quantMz)) / 2 - 1
    var maxMZ = Math.round(2 * Math.max.apply(null, quantMz)) / 2 + 1
    var ppm = this.props.ppm

    if (this.props.spectrumData.length > 0) {
      data.addRows([[minMZ, 0, null, null]])

      let indices = quantMz.map(
        function(qmz) {
          let errs = this.props.spectrumData.map(
            peak => 1e6 * Math.abs(qmz - peak.mz) / peak.mz
          )

          if (errs.every(val => val > ppm))
            return null

          return errs.indexOf(Math.min.apply(Math, errs))
        }.bind(this)
      )

      this.props.spectrumData.forEach(function(peak, index) {
        var mz = peak.mz
        var into = peak.into
        var name = ''
        let found = (indices.indexOf(index) != -1)
        let style = ''

        if (found) {
          style = 'point {size: 5; fill-color: #5CB85C; visible: true}'
        } else {
          style = 'point {size: 5; fill-color: #5CB85C; visible: false}'
        }

        data.addRows([
          [mz, 0, null, null],
          [mz, into, style, name],
          [mz, 0, null, null]
        ])
      })

      data.addRows([[maxMZ, 0, null, null]])
    }

    var options = {
      title: 'Quantification',
      hAxis: {
        // title: 'mz',
        gridlines: { color: 'transparent' },
        minValue: this.props.spectrumData.length > 0 ? minMZ : 0,
        maxValue: this.props.spectrumData.length > 0 ? maxMZ : 100,
      },
      vAxis: {
        // title: 'Intensity'
        gridlines: { color: 'transparent' },
        format: 'scientific',
        maxValue: this.props.spectrumData.length > 0 ? null : 100,
      },
      chartArea: { left: "15%", bottom: "15%", width: "75%", height: "75%" },
      annotations: { textStyle: { }, stemColor: 'none' },
      legend: 'none',
      tooltip: {trigger: 'none'},
      explorer: {
        actions: ['dragToZoom', 'rightClickToReset'],
        axis: 'horizontal',
        maxZoomIn: 0.00001,
      },
    };

    var chart = new google.visualization.LineChart(
      document.getElementById('quantGoogleChart')
    );

    chart.draw(data, options);
  }

  handleResize() {
    this.drawChart();
  }

  render() {
    return (
      <div>
        <div id="quantGoogleChart" />
      </div>
    );
  }
}

QuantSpectrumBox.propTypes = {
  ppm: React.PropTypes.number,
  quantMz: React.PropTypes.arrayOf(React.PropTypes.number),
  spectrumData: React.PropTypes.array,
}

QuantSpectrumBox.defaultProps = {
  ppm: 20,
  quantMz: [0, 1],
  spectrumData: [],
}

module.exports = QuantSpectrumBox
