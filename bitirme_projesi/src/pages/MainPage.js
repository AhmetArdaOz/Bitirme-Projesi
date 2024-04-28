import React from "react";
import "../styling/MainPage.css";
import Listed from "../components/list/Listed";
import Featured from "../components/featured/Featured";


export default function MainPage() {

    return (
        <div className="home">
            <Featured></Featured>
            <Listed></Listed>
            <Listed></Listed>
            <Listed></Listed>
            <Listed></Listed>
        </div>
    );
}
