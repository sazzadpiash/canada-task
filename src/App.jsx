import AuthProvider from "./authContext";
import GlobalProvider from "./globalContext";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./main";
import SnackBar from "./components/SnackBar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <AuthProvider>
                <GlobalProvider>
                    <Router>
                        <Main />
                        <SnackBar></SnackBar>
                    </Router>
                </GlobalProvider>
            </AuthProvider>
        </DndProvider>
    );
}

export default App;
