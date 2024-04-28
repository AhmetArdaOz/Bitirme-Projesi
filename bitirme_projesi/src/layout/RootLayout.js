import {NavLink,Outlet} from "react-router-dom";
import MainBar from "../components/AppBar";
import {AppBar, Container} from "@mui/material";

export default  function RootLayout(){
    return(
        <div className="root-layout">
        <Container maxWidth="false" disableGutters="true">
            <main>
                <AppBar></AppBar>
                <Outlet/>
            </main>
        </Container>
        </div>
    )
}