import {createBrowserRouter} from "react-router-dom";
import {WelcomePage} from "../modules/welcome/WelcomePage";
import {PublicUserPage} from "../modules/public-user/PublicUserPage";
import {SessionPage} from "../modules/session/SessionPage";
import React from "react";
import {BookingPage} from "../modules/booking/BookingPage";

export const router = createBrowserRouter([{
    path: "/",
    element: <WelcomePage/>,
}, {
    path: "/public-users",
    element: <PublicUserPage/>
}, {
    path: "/sessions",
    element: <SessionPage/>
}, {
    path: "/booking",
    element: <BookingPage/>
}, {
    path: "/*",
    element: <>Fallback</>
}
]);