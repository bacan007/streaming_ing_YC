import React from "react";
import { BrowserRouter } from 'react-router-dom';

 const App = () => (
     <div id="bodyContainer">
       <div>
         <List />
       </div>
       <div>
         <Post />
       </div>
     </div>
 );

function App() {
  return (
      <div className="App">
          <Routes>
            <Route path="/" element={ <Posts/> } />
            <Route path="/rent/:id" element={ <Rent/> } />
            <Route path="/buy/:id" element={ <Buy/> } />
            <Route path="*" element={ <App/> } />
            <Route element={ <PageNotFound/>} />
          </Routes>
      </div>
  );
}

export default App;
