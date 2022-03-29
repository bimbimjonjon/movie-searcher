
import {  createTheme ,ThemeProvider  } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

const darkTheme = createTheme({
    palette :{
        type :'dark',
    }
})

const CustomPagination = ({setPage , numbleOfPages = 20 }) => {
    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0,0)
    }

    return (
        <div style ={{
            width : '100%',
            display : 'flex',
            justifyContent : 'center',
            marginTop :10
        }}
        
        >
            <ThemeProvider theme = {darkTheme}>
                <Pagination 
                count = {numbleOfPages}
                onChange = {
                    (e) => handlePageChange(e.target.textContent)                   
                } 
                color = "primary"/>
            </ThemeProvider>
        </div>
    )
}

export default CustomPagination
