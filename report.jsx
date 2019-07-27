const React = require('react')
const ReactPivot = require('react-pivot')
const createReactClass = require('create-react-class')

const rows = require('./data.json')

const dimensions = [
  {value: 'date', title: 'Date', className: 'react-pivot-date'},
  {value: 'host', title: 'Host'}
]

const reduce = function (row, memo) {
  if (row.type === 'impression') memo.impressions = ++memo.impressions || 1
  if (row.type === 'display') memo.displays = ++memo.displays || 1
  if (row.type === 'load') memo.loads = ++memo.loads || 1
  return memo
}

const calculations = [
  {
    title: 'Impression',
    value: 'impressions',
    template: value => value.toString()
  },
  {
    title: 'Loads',
    value: 'loads',
    template: value => value.toString()
  },
  {
    title: 'Displays',
    value: 'displays',
    template: value => value.toString()
  },
  {
    title: 'Load Rate',
    value: row => (row.loads / row.impressions) * 100,
    template: value => value.toFixed(1) + '%'
  },
  {
    title: 'Display Rate',
    value: row => (row.displays / row.loads) * 100,
    template: value => value.toFixed(1) + '%',
    className: 'react-pivot-display-date'
  }
]

module.exports = createReactClass({
  render () {
    return (
      <div>
        <ReactPivot
          rows={rows}
          dimensions={dimensions}
          calculations={calculations}
          reduce={reduce}
          activeDimensions={['Date', 'Host']}
          nPaginateRows={25}
        />
      </div>
    )
  }
})
