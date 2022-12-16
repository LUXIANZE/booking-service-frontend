import {createBrowserRouter} from "react-router-dom";
import {WelcomePage} from "../modules/welcome/WelcomePage";
import {PublicUserPage} from "../modules/public-user/PublicUserPage";

export const router = createBrowserRouter([{
    path: "/",
    element: <WelcomePage/>,
}, {
    path: "/public-users",
    element: <PublicUserPage/>
}
]);