import React from "react";
import "../styling/MainPage.css";
import Listed from "../components/list/Listed";


export default function MainPage() {

    return (
        <div className="home">
            <Listed></Listed>
            <Listed></Listed>
            <Listed></Listed>
            <Listed></Listed>
        </div>
    );
}
