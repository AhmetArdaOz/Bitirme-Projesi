import {NavLink,Outlet} from "react-router-dom";
import MainBar from "../components/AppBar";
import {Container} from "@mui/material";

export default  function RootLayout(){
    return(
        <div className="root-layout">
        <MainBar/>
        <Container maxWidth="false" disableGutters="true">
            <main>
                <Outlet/>
            </main>
        </Container>

        </div>
    )
}