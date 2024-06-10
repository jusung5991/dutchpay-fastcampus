import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {CreateGroup} from "./components/CreateGroup";
import {AddMembers} from "./components/AddMembers";
import {ExpenseMain} from "./components/ExpenseMain";
import {RecoilRoot} from "recoil";
import "bootstrap/dist/css/bootstrap.min.css"
import {ROUTE} from "./route";

function App() {
    return (
        <BrowserRouter>
            <RecoilRoot>
                <Routes>
                    <Route path={"/"} element={<Navigate to={ROUTE.CREATE_GROUP} />} />
                    <Route path={ROUTE.CREATE_GROUP} element={<CreateGroup/>} />
                    <Route path={ROUTE.ADD_MEMBERS} element={<AddMembers />} />
                    <Route path={ROUTE.EXPENSE_MAIN} element={<ExpenseMain />} />
                </Routes>
            </RecoilRoot>
        </BrowserRouter>
    );
}

export default App;
