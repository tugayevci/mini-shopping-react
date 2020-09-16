import { Grid } from '@material-ui/core'
import React, { Dispatch, useEffect } from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { getFilters, setFilters, FilterActions } from '../../redux/actions/filterActions'
import { setBackdropStatus, BackdropStatusActions } from '../../redux/actions/backdropActions'
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

  const filterDispatch = useDispatch<Dispatch<FilterActions>>()
  const backdropDispatch = useDispatch<Dispatch<BackdropStatusActions>>()

  //Tek seçim yapılabilen filtre için kullanılır
  const singleFilterHandler = async (key: any, name: any) => {
    backdropDispatch(setBackdropStatus(true)) //backdrop true

    const tempFilter = { key, values: [name] } //geçici filtre

    let isExist = selectedFilters.find((x) => x.key === key) //Filtre daha önce eklendi mi?
    if (isExist) {
      //Filtre daha önce eklendiyse, o filtreyi bul ve geçici filtre ile değiştir.
      let tempFilters = selectedFilters
      let index = tempFilters.findIndex((x) => x.key === key)
      tempFilters[index] = tempFilter
      filterDispatch(await setFilters([...tempFilters]))
    } else {
      //Filtre daha önce eklenmediyse, geçici filtreyi ekle.
      filterDispatch(await setFilters([...selectedFilters, tempFilter]))
    }
    backdropDispatch(setBackdropStatus(false)) //backdrop false
  }

  //Birden fazla seçim yapılabilen filtre için kullanılır
  //Eğer daha önce aynı key ve name değerleri birebir aynı filtre eklendiyse bu filtreyi çıkarır.

  const multipleFilterHandler = async (key: any, name: any) => {
    backdropDispatch(setBackdropStatus(true)) //backdrop true

    let tempFilter = { key, values: [name] } //geçici filtre

    let tempFilters = selectedFilters
    const filterIndex = selectedFilters.findIndex((x) => x.key === key && x.values.includes(name)) //Bu filtre (key ve name) daha önce eklendi mi?
    const keyIndex = selectedFilters.findIndex((x) => x.key === key) //Bu filtre (key) daha önce eklendi mi?

    //Eğer bu filtre (key ve name) yoksa;
    if (filterIndex < 0) {
      //Eğer bu filtre (key) varsa;
      if (keyIndex >= 0) {
        tempFilter = { key, values: [...tempFilters[keyIndex].values, name] }
        tempFilters[keyIndex] = tempFilter
        filterDispatch(await setFilters([...tempFilters]))
      } else {
        //Eğer bu filtre (key) yoksa;
        filterDispatch(await setFilters([...tempFilters, tempFilter]))
      }
    } else {
      //Eğer bu filtre (key ve name) daha önce eklendiyse;

      if (keyIndex >= 0) {
        //Eğer bu filtre (key) daha önce eklendiyse

        //Seçilmiş filtrelerden geçici filtreyi çıkarır.
        tempFilter = { key, values: [...tempFilters[keyIndex].values].filter((x) => x !== name) }
        tempFilters.splice(filterIndex, 1)

        //Eğer ki filtrenin values değeri boş ise seçilmiş filtrelerden bu filtreyi(key) tamamen çıkarır.
        if (tempFilter.values.length === 0) {
          filterDispatch(await setFilters([...tempFilters]))
        } else {
          filterDispatch(await setFilters([...tempFilters, tempFilter]))
        }
      } else {
        tempFilters.splice(filterIndex, 1)
        filterDispatch(await setFilters([...tempFilters]))
      }
    }
    backdropDispatch(setBackdropStatus(false)) //backdrop false
  }

  useEffect(() => {
    filterDispatch(getFilters())
  }, [filterDispatch])

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
                  row
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
                <FormGroup row>
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
        } else return <React.Fragment key={i}></React.Fragment>
      })}
      <Grid item xs={12}>
        <Button onClick={async () => filterDispatch(await setFilters([]))} variant='contained' color='primary'>
          Clear Filter
        </Button>
      </Grid>
    </Grid>
  )
}

export default FilterArea
