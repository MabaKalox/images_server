import React, {Fragment} from 'react';
import MyGallery from "../MyGallery";
import './style.scss';

function App() {

    return (
        <Fragment>
            <header>

            </header>
            <main style={{display: 'grid'}} role="main" className="App">
                <MyGallery/>
            </main>
            <footer>

            </footer>
        </Fragment>
    )
}

export default App;
