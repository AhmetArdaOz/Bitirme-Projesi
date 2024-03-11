import {Outlet,useLocation} from "react-router-dom";
import MainBar from "../components/AppBar";
import {Container} from "@mui/material";

export default  function RootLayout(){
    const location = useLocation();
    const hideAppbar =location.pathname ==="/" || location.pathname ==="/signup"
    return(
        <div className="root-layout">
            {!hideAppbar && <MainBar/>}
        <Container>
            <main>
                <Outlet/>
            </main>
        </Container>

        </div>
    )
}