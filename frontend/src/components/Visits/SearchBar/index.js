import _ from 'lodash'
import React, {useState, useEffect} from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import axios from 'axios'


const initialState = {
  loading: false,
  results: [],
  value: '',
}

function exampleReducer(state, action) {
  switch (action.type) {
    case 'CLEAN_QUERY':
      return initialState
    case 'START_SEARCH':
      return { ...state, loading: true, value: action.query }
    case 'FINISH_SEARCH':
      return { ...state, loading: false, results: action.results }
    case 'UPDATE_SELECTION':
      return { ...state, value: action.selection }

    default:
      throw new Error()
  }
}

function SearchBar() {
  const [state, dispatch] = React.useReducer(exampleReducer, initialState)
  const { loading, results, value } = state
  const [source, setSource] = useState([]);

  useEffect(async () => {
      const res = await axios(
          'http://localhost:9000/api/plates/'
      )
      setSource(res.data);
  }, [])

  const timeoutRef = React.useRef()
  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current)
    dispatch({ type: 'START_SEARCH', query: data.value })

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' })
        return
      }
      console.log("Searching")
      const re = new RegExp(_.escapeRegExp(data.value), 'i')
      const isMatch = (result) => re.test(result.plate_number)
      let results = _.filter(source, isMatch);
      console.log(results)
      let resultsTransform = results.map(result => {
          return {
                "title": result.plate_number, 
                "plate_id": result.plate_id,
                "renderer": ({title, plate_id}) => {
                    return (
                        <div>
                            <div style={{backgroundColor:"red"}}>{title}</div>
                            <div style={{backgroundColor:"green"}}>{plate_id}</div>
                        </div>
                    )
                }}
      })

      dispatch({
        type: 'FINISH_SEARCH',
        results: resultsTransform,
      })
    }, 300)
  }, [source])
  
  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <Grid>
      <Grid.Column width={6}>
        <Search
          loading={loading}
          onResultSelect={(e, data) =>
            dispatch({ type: 'UPDATE_SELECTION', selection: data.result.plate_number})
          }
          onSearchChange={handleSearchChange}
          results={results}
          value={value}
        />
      </Grid.Column>

      <Grid.Column width={10}>
        <Segment>
          <Header>State</Header>
          <pre style={{ overflowX: 'auto' }}>
            {JSON.stringify({ loading, results, value }, null, 2)}
          </pre>
          <Header>Options</Header>
          <pre style={{ overflowX: 'auto' }}>
            {JSON.stringify(source, null, 2)}
          </pre>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default SearchBar