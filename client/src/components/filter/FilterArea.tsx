import { Grid } from '@material-ui/core'
import React, { Dispatch, useEffect } from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { getFilters, setFilters, FilterActions } from '../../redux/actions/filterActions'
import { AppState } from '../../redux/reducers/rootReducer'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@material-ui/core/Button/Button'
import FormGroup from '@material-ui/core/FormGroup/FormGroup'
import Checkbox from '@material-ui/core/Checkbox/Checkbox'

const useStyles = makeStyles(() => ({
  typographyStyles: {
    flex: 1,
  },
  containerStyle: {
    marginTop: 5,
  },
}))

const FilterArea = () => {
  const filters = useSelector((state: AppState) => state.filter.filters)
  const selectedFilters = useSelector((state: AppState) => state.filter.selectedFilters)
  console.log('selectedFilters', selectedFilters)

  const filterDispatch = useDispatch<Dispatch<FilterActions>>()

  const singleFilterHandler = (key: any, name: any) => {
    const tempFilter = { key, values: [name] }

    let temp = selectedFilters.find((x) => x.key === key)
    if (temp) {
      let tempFilters = selectedFilters
      let index = tempFilters.findIndex((x) => x.key === key)
      tempFilters[index] = tempFilter
      filterDispatch(setFilters([...tempFilters]))
    } else {
      filterDispatch(setFilters([...selectedFilters, tempFilter]))
    }
  }

  const multipleFilterHandler = (key: any, name: any) => {
    let tempFilter = { key, values: [name] }

    let tempFilters = selectedFilters
    let filterIndex = selectedFilters.findIndex((x) => x.key === key && x.values.includes(name))
    const keyIndex = selectedFilters.findIndex((x) => x.key === key)

    if (filterIndex < 0) {
      if (keyIndex >= 0) {
        console.log('keyIndex', keyIndex)
        console.log('tempFilters[keyIndex].name', tempFilters[keyIndex])
        tempFilter = { key, values: [...tempFilters[keyIndex].values, name] }
        tempFilters[keyIndex] = tempFilter
        filterDispatch(setFilters([...tempFilters]))
      } else {
        filterDispatch(setFilters([...tempFilters, tempFilter]))
      }
    } else {
      if (keyIndex >= 0) {
        tempFilter = { key, values: [...tempFilters[keyIndex].values].filter((x) => x !== name) }
        tempFilters.splice(filterIndex, 1)

        if (tempFilter.values.length === 0) {
          filterDispatch(setFilters([...tempFilters]))
        } else {
          filterDispatch(setFilters([...tempFilters, tempFilter]))
        }
      } else {
        tempFilters.splice(filterIndex, 1)
        filterDispatch(setFilters([...tempFilters]))
      }
    }
  }

  useEffect(() => {
    filterDispatch(getFilters())
  }, [filterDispatch])

  console.log('filters', filters)
  const classes = useStyles()

  return (
    <Grid container direction='column' spacing={4} className={classes.containerStyle}>
      {filters.map((mainFilter, i) => {
        if (mainFilter.type === 'single') {
          return (
            <Grid key={i} item xs={12}>
              <FormControl component='fieldset'>
                <FormLabel component='legend'>{mainFilter.name}</FormLabel>
                <RadioGroup
                  aria-label={mainFilter.name}
                  name={mainFilter.name}
                  value={
                    selectedFilters.find((selectedFilter) => selectedFilter.key === mainFilter.key)
                      ? selectedFilters.find((selectedFilter) => selectedFilter.key === mainFilter.key).values[0]
                      : null
                  }
                  onChange={(e) => singleFilterHandler(mainFilter.key, e.target.value)}
                >
                  {mainFilter.values.map((filterValue: any, j: number) => (
                    <FormControlLabel key={j} value={filterValue.key} control={<Radio />} label={filterValue.name} />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          )
        } else if (mainFilter.type === 'multiple') {
          return (
            <Grid key={i} item xs={12}>
              <FormControl component='fieldset'>
                <FormLabel component='legend'>{mainFilter.name}</FormLabel>
                <FormGroup>
                  {mainFilter.values.map((filterValue: any, j: number) => (
                    <FormControlLabel
                      key={j}
                      value={filterValue.key}
                      control={
                        <Checkbox
                          checked={
                            selectedFilters.findIndex((selectedFilter) => selectedFilter.values.includes(filterValue.key)) === -1 ? false : true
                          }
                          onChange={(e) => multipleFilterHandler(mainFilter.key, e.target.value)}
                          name={mainFilter.name}
                          color='primary'
                        />
                      }
                      label={filterValue.name}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Grid>
          )
        } else return <></>
      })}
      <Grid item xs={12}>
        <Button onClick={() => filterDispatch(setFilters([]))} size='small' color='primary'>
          Clear Filter
        </Button>
      </Grid>
    </Grid>
  )
}

export default FilterArea
