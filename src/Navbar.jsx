
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

function Navbar({handleSubmit , query , setQuery}) {
  return (
    <>
     <nav>
        <h3>Image World</h3>
        <div className="search">
        <TextField id="outlined-basic" label="Search" variant="outlined" style={{width:"100%"}}
             value={query}
             onChange={(e) => setQuery(e.currentTarget.value)}
        />
        <Button variant="outlined" onClick={handleSubmit} style={{backgroundColor:"rgb(46, 112, 46)" , color:"rgb(182, 177, 177)"}}>Search</Button>
        </div>
     </nav>
    </>
  )
}

export default Navbar