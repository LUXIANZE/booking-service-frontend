import React, {useEffect} from "react";
import {useSearchParams} from "react-router-dom";

export const BookingPage: React.FC = () => {
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const selectedSessionId = searchParams.get('selectedSessionId');
        console.log(selectedSessionId);
    }, [searchParams]);

    return <>
        <div onClick={() => {
            console.log(searchParams);
        }
        }>click
        </div>
    </>;
};